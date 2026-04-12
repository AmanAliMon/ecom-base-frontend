import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, CreditCard } from 'lucide-react';

const Cart = () => {
  const { items, removeFromCart, updateQuantity, total } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#faf8f5] py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white border border-[#ede8e0] p-12 md:p-16">
            <ShoppingBag className="w-16 h-16 mx-auto mb-6 text-gray-300" />
            <h2 className="text-2xl font-light text-[#1a1a1a] mb-3">Your cart is empty</h2>
            <p className="text-gray-500 mb-8 text-sm">Looks like you haven't added anything to your cart yet.</p>
            <Link 
              to="/products" 
              className="inline-flex items-center gap-2 px-8 py-3 bg-[var(--dark-coffe)] text-white text-sm uppercase tracking-wider hover:bg-opacity-90 transition-all duration-300"
            >
              Continue Shopping
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf8f5] py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-10">
          <p className="text-[11px] tracking-[3px] text-[var(--dark-coffe)] uppercase mb-2">
            Stelina
          </p>
          <h1 className="text-3xl md:text-4xl font-light tracking-wide text-[#1a1a1a]">
            Shopping Cart
          </h1>
          <p className="text-gray-500 text-sm mt-2">
            {items.length} item{items.length !== 1 ? 's' : ''} in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-[#ede8e0]">
              {/* Table Header */}
              <div className="hidden md:grid grid-cols-12 gap-4 p-4 border-b border-[#ede8e0] text-xs uppercase tracking-wider text-gray-500">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Price</div>
                <div className="col-span-2 text-right">Total</div>
              </div>

              {/* Cart Items */}
              {items.map((item) => (
                <div key={item._id || item.id} className="p-4 border-b border-[#ede8e0] last:border-0">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                    {/* Product Info */}
                    <div className="md:col-span-6 flex gap-4">
                      <div className="w-20 h-20 bg-[#f5f1eb] flex-shrink-0 overflow-hidden">
                        <img 
                          src={item.image || 'https://placehold.co/400x500/f5f1eb/b8976a?text=Perfume'} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium text-[#1a1a1a] text-sm mb-1">{item.name}</h3>
                        <p className="text-[11px] text-gray-400 uppercase tracking-wider">Stelina</p>
                        <button 
                          onClick={() => removeFromCart(item._id || item.id)}
                          className="flex items-center gap-1 text-red-500 text-xs mt-2 hover:text-red-700 transition-colors md:hidden"
                        >
                          <Trash2 className="w-3 h-3" />
                          Remove
                        </button>
                      </div>
                    </div>

                    {/* Quantity */}
                    <div className="md:col-span-2 flex items-center justify-start md:justify-center">
                      <div className="flex items-center border border-[#ede8e0] w-fit">
                        <button 
                          onClick={() => updateQuantity(item._id || item.id, Math.max(1, item.quantity - 1))}
                          className="w-8 h-8 flex items-center justify-center hover:bg-[#f5f1eb] transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-10 text-center text-sm font-medium">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item._id || item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-[#f5f1eb] transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="md:col-span-2 text-left md:text-right">
                      <p className="text-sm text-gray-600">${item.price.toFixed(2)}</p>
                    </div>

                    {/* Total */}
                    <div className="md:col-span-2 flex justify-between items-center md:justify-end">
                      <p className="font-medium text-[#1a1a1a] text-sm">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      <button 
                        onClick={() => removeFromCart(item._id || item.id)}
                        className="hidden md:flex text-gray-400 hover:text-red-500 transition-colors ml-4"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Continue Shopping Link */}
              <div className="p-4 border-t border-[#ede8e0]">
                <Link 
                  to="/products" 
                  className="inline-flex items-center gap-2 text-sm text-[var(--dark-coffe)] hover:underline"
                >
                  <ArrowRight className="w-4 h-4 rotate-180" />
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-[#ede8e0] p-6 sticky top-24">
              <h2 className="text-lg font-light tracking-wide text-[#1a1a1a] border-b border-[#ede8e0] pb-3 mb-4">
                Order Summary
              </h2>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="text-[#1a1a1a]">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Shipping</span>
                  <span className="text-[#1a1a1a]">Calculated at checkout</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Tax</span>
                  <span className="text-[#1a1a1a]">Calculated at checkout</span>
                </div>
              </div>

              <div className="border-t border-[#ede8e0] pt-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-base font-medium text-[#1a1a1a]">Total</span>
                  <span className="text-xl font-semibold text-[var(--dark-coffe)]">
                    ${total.toFixed(2)}
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-1">Taxes and shipping calculated at checkout</p>
              </div>

              <Link 
                to="/checkout"
                className="flex items-center justify-center gap-2 w-full py-3 bg-[var(--dark-coffe)] text-white text-sm uppercase tracking-wider hover:bg-opacity-90 transition-all duration-300"
              >
                <CreditCard className="w-4 h-4" />
                Proceed to Checkout
              </Link>

              {/* Payment Methods */}
              <div className="mt-6 pt-4 border-t border-[#ede8e0]">
                <p className="text-[10px] uppercase tracking-wider text-gray-400 text-center mb-3">
                  Secure Payment Methods
                </p>
                <div className="flex justify-center gap-3">
                  <span className="text-xs text-gray-500">Visa</span>
                  <span className="text-xs text-gray-500">Mastercard</span>
                  <span className="text-xs text-gray-500">Amex</span>
                  <span className="text-xs text-gray-500">PayPal</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;