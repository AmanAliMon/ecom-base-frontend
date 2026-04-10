import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import axios from 'axios';
import Buttons from './Buttons';
import { ChevronLeft, Minus, Plus, ShoppingCart, Truck, Shield, RotateCcw } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const { addToCart, items } = useCart();

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/products/${id}`)
      .then(res => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  // Get current cart quantity for this product
  const getCartQuantity = () => {
    const existingItem = items.find(item => 
      item._id === product?._id || item.id === product?.id
    );
    return existingItem ? existingItem.quantity : 0;
  };

  const handleQuantityChange = (delta) => {
    const newQty = quantity + delta;
    if (newQty >= 1 && newQty <= product?.stock) {
      setQuantity(newQty);
    }
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  const cartQuantity = getCartQuantity();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-[var(--dark-coffe)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500 uppercase tracking-wider text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center">
        <div className="text-center py-16">
          <h2 className="text-2xl font-light text-[#1a1a1a] mb-4">Product Not Found</h2>
          <Link to="/products" className="text-[var(--dark-coffe)] underline text-sm uppercase tracking-wider">
            Return to Shop
          </Link>
        </div>
      </div>
    );
  }

  // Mock additional images (in real app, these would come from product data)
  const productImages = [
    product.image || 'https://placehold.co/600x600/f5f1eb/b8976a?text=Perfume',
    product.image || 'https://placehold.co/600x600/f5f1eb/b8976a?text=Perfume',
    product.image || 'https://placehold.co/600x600/f5f1eb/b8976a?text=Perfume',
  ];

  return (
    <div className="min-h-screen bg-[#faf8f5] py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-8">
          <Link to="/" className="text-gray-400 hover:text-[var(--dark-coffe)] transition-colors">
            Home
          </Link>
          <span className="text-gray-400">/</span>
          <Link to="/products" className="text-gray-400 hover:text-[var(--dark-coffe)] transition-colors">
            Products
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-[#1a1a1a]">{product.name}</span>
        </nav>

        {/* Back Button (Mobile) */}
        <button
          onClick={() => navigate(-1)}
          className="md:hidden flex items-center gap-2 text-sm text-gray-500 mb-6 hover:text-[var(--dark-coffe)] transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </button>

        <div className="bg-white border border-[#ede8e0] p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Left Column - Images */}
            <div>
              {/* Main Image */}
              <div className="relative bg-[#f5f1eb] rounded-lg overflow-hidden mb-4">
                <img
                  src={productImages[activeImage]}
                  alt={product.name}
                  className="w-full h-[400px] md:h-[500px] object-cover"
                />
                
                {/* Stock Badges */}
                {product.stock < 10 && product.stock > 0 && (
                  <span className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 text-[10px] uppercase tracking-wider">
                    Low Stock - Only {product.stock} left
                  </span>
                )}
                
                {product.stock === 0 && (
                  <span className="absolute top-4 left-4 bg-gray-800 text-white px-3 py-1 text-[10px] uppercase tracking-wider">
                    Sold Out
                  </span>
                )}
              </div>

              {/* Thumbnail Images */}
              <div className="flex gap-3">
                {productImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`relative w-20 h-20 rounded overflow-hidden border-2 transition-all ${
                      activeImage === index 
                        ? 'border-[var(--dark-coffe)]' 
                        : 'border-transparent hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column - Product Info */}
            <div className="flex flex-col">
              {/* Brand */}
              <p className="text-[11px] tracking-[3px] text-[var(--dark-coffe)] uppercase mb-2">
                Stelina
              </p>

              {/* Product Name */}
              <h1 className="text-3xl md:text-4xl font-light tracking-wide text-[#1a1a1a] mb-3">
                {product.name}
              </h1>

              {/* Price */}
              <p className="text-2xl text-[var(--dark-coffe)] font-semibold mb-4">
                ${product.price}
              </p>

              {/* Category */}
              <Link 
                to={`/products?collection=${product.category}`}
                className="text-sm text-gray-500 hover:text-[var(--dark-coffe)] transition-colors mb-4 inline-block"
              >
                Category: <span className="font-medium">{product.category}</span>
              </Link>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed mb-6 text-sm">
                {product.description}
              </p>

              {/* Stock Status */}
              <div className="mb-6">
                <p className="text-sm">
                  <span className="text-gray-500">Availability:</span>{' '}
                  {product.stock > 0 ? (
                    <span className="text-green-600 font-medium">In Stock ({product.stock} available)</span>
                  ) : (
                    <span className="text-red-600 font-medium">Out of Stock</span>
                  )}
                </p>
              </div>

              {/* Cart Status (if item in cart) */}
              {cartQuantity > 0 && (
                <div className="mb-6 p-4 bg-[#f5f1eb] border border-[#ede8e0] rounded">
                  <p className="text-sm text-[#1a1a1a] flex items-center gap-2">
                    <ShoppingCart className="w-4 h-4 text-[var(--dark-coffe)]" />
                    <span>
                      <span className="font-semibold">{cartQuantity}</span> item{cartQuantity !== 1 ? 's' : ''} in your cart
                    </span>
                  </p>
                </div>
              )}

              {/* Quantity Selector */}
              {product.stock > 0 && (
                <div className="mb-6">
                  <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">
                    Quantity
                  </label>
                  <div className="flex items-center border border-[#ede8e0] w-fit">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                      className="w-10 h-10 flex items-center justify-center hover:bg-[#f5f1eb] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-14 text-center text-sm font-medium">
                      {quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(1)}
                      disabled={quantity >= product.stock}
                      className="w-10 h-10 flex items-center justify-center hover:bg-[#f5f1eb] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-3 mb-8">
                <Buttons.CartButton
                  product={product}
                  quantity={quantity}
                  variant="primary"
                  size="lg"
                  fullWidth={true}
                  disabled={product.stock === 0}
                />
                
                <button
                  onClick={() => navigate('/cart')}
                  className="w-full py-3 border-2 border-[#1a1a1a] text-[#1a1a1a] text-sm uppercase tracking-wider hover:bg-[#1a1a1a] hover:text-white transition-all duration-300 font-medium"
                >
                  {cartQuantity > 0 ? `View Cart (${cartQuantity})` : 'View Cart'}
                </button>
              </div>

              {/* Features */}
              <div className="border-t border-[#ede8e0] pt-6 space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Truck className="w-4 h-4 text-[var(--dark-coffe)]" />
                  <span>Free shipping on orders over $50</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Shield className="w-4 h-4 text-[var(--dark-coffe)]" />
                  <span>100% authentic products guaranteed</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <RotateCcw className="w-4 h-4 text-[var(--dark-coffe)]" />
                  <span>30-day hassle-free returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;