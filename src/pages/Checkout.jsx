import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

const stripePromise = loadStripe('your_stripe_publishable_key');

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { items, total, clearCart } = useCart();
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [shipping, setShipping] = useState({
    name: '', address: '', city: '', state: '', zip: '', country: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    
    setLoading(true);
    try {
      // Create payment intent
      const { data: { clientSecret } } = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/create-payment-intent`,
        { amount: total },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Confirm payment
      const { error: paymentError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: elements.getElement(CardElement) }
      });

      if (paymentError) throw paymentError;

      // Create order
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/orders`,
        {
          items: items.map(item => ({
            productId: item._id,
            quantity: item.quantity,
            price: item.price
          })),
          total,
          shippingAddress: shipping
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      clearCart();
      navigate('/order-success');
    } catch (error) {
      console.error(error);
      alert('Payment failed: ' + error.message);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Shipping Information</h2>
        <div className="grid grid-cols-1 gap-4">
          <input type="text" placeholder="Full Name" required className="border p-2 rounded"
            value={shipping.name} onChange={e => setShipping({...shipping, name: e.target.value})} />
          <input type="text" placeholder="Address" required className="border p-2 rounded"
            value={shipping.address} onChange={e => setShipping({...shipping, address: e.target.value})} />
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="City" required className="border p-2 rounded"
              value={shipping.city} onChange={e => setShipping({...shipping, city: e.target.value})} />
            <input type="text" placeholder="State" required className="border p-2 rounded"
              value={shipping.state} onChange={e => setShipping({...shipping, state: e.target.value})} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="ZIP Code" required className="border p-2 rounded"
              value={shipping.zip} onChange={e => setShipping({...shipping, zip: e.target.value})} />
            <input type="text" placeholder="Country" required className="border p-2 rounded"
              value={shipping.country} onChange={e => setShipping({...shipping, country: e.target.value})} />
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Payment Details</h2>
        <div className="border p-4 rounded">
          <CardElement />
        </div>
      </div>

      <button 
        type="submit" 
        disabled={!stripe || loading}
        className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 disabled:bg-gray-400"
      >
        {loading ? 'Processing...' : `Pay $${total.toFixed(2)}`}
      </button>
    </form>
  );
};

const Checkout = () => {
  const { total } = useCart();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
};

export default Checkout;