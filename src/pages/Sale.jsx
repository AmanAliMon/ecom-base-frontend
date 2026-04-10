import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Buttons from './Buttons';
import { useCart } from '../context/CartContext';
import { 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  Tag, 
  Gift, 
  Sparkles,
  Flame,
  ArrowRight,
  Truck,
  Shield,
  Percent
} from 'lucide-react';

const Sales = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { addToCart } = useCart();

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/products`)
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  // Dynamic sale products (filter products with discount or low stock as "sale")
  const saleProducts = useMemo(() => {
    return products
      .filter(p => p.stock > 0)
      .map(p => ({
        ...p,
        originalPrice: p.price * 1.2, // Mock original price (20% higher)
        discount: 20
      }))
      .slice(0, 8);
  }, [products]);

  // Flash deals - dynamic from products
  const flashDeals = useMemo(() => {
    return products
      .filter(p => p.stock > 0 && p.stock < 20) // Low stock items as flash deals
      .slice(0, 3)
      .map((p, index) => ({
        ...p,
        originalPrice: p.price * (1.3 - index * 0.05), // 30%, 25%, 20% off
        salePrice: p.price,
        discount: Math.round((1 - p.price / (p.price * (1.3 - index * 0.05))) * 100),
        endTime: new Date(Date.now() + (index + 2) * 60 * 60 * 1000) // 2, 3, 4 hours
      }));
  }, [products]);

  // Bundle offers - create from products
  const bundleOffers = useMemo(() => {
    if (products.length < 4) return [];
    
    const bundle1Products = products.slice(0, 2);
    const bundle2Products = products.slice(2, 5);
    
    return [
      {
        id: 'bundle1',
        title: "Date Night Duo",
        description: `${bundle1Products[0]?.name || 'Rose Elixir'} + ${bundle1Products[1]?.name || 'Oud Mystique'}`,
        products: bundle1Products,
        originalPrice: bundle1Products.reduce((sum, p) => sum + (p.price * 1.2), 0),
        bundlePrice: bundle1Products.reduce((sum, p) => sum + p.price, 0) * 0.85,
        image: bundle1Products[0]?.image || 'https://placehold.co/600x300/f5f1eb/b8976a?text=Bundle'
      },
      {
        id: 'bundle2',
        title: "Fresh & Clean Set",
        description: `${bundle2Products[0]?.name || 'Citrus'} + ${bundle2Products[1]?.name || 'Ocean'} + ${bundle2Products[2]?.name || 'Linen'}`,
        products: bundle2Products,
        originalPrice: bundle2Products.reduce((sum, p) => sum + (p.price * 1.2), 0),
        bundlePrice: bundle2Products.reduce((sum, p) => sum + p.price, 0) * 0.80,
        image: bundle2Products[0]?.image || 'https://placehold.co/600x300/f5f1eb/b8976a?text=Bundle'
      }
    ];
  }, [products]);

  // Category deals with actual product counts
  const categoryDeals = useMemo(() => {
    const categories = [...new Set(products.map(p => p.category).filter(Boolean))];
    const discounts = [30, 25, 20, 15];
    
    return categories.slice(0, 4).map((cat, index) => ({
      name: cat,
      discount: `${discounts[index]}% OFF`,
      count: products.filter(p => p.category === cat).length,
      color: index === 0 ? 'from-pink-50 to-rose-50' :
             index === 1 ? 'from-blue-50 to-indigo-50' :
             index === 2 ? 'from-purple-50 to-violet-50' :
             'from-amber-50 to-yellow-50',
      icon: index === 0 ? '👩' : index === 1 ? '👨' : index === 2 ? '✨' : '💎'
    }));
  }, [products]);

  // Hero carousel slides
  const carouselSlides = [
    {
      title: "Summer Sale",
      subtitle: "Up to 50% Off",
      description: `Discover your signature scent among ${products.length}+ fragrances`,
      badge: "Limited Time",
      color: "from-[#1a1a2e] to-[#2d2d4a]",
      cta: "/products"
    },
    {
      title: "Bundle & Save",
      subtitle: `From $${Math.min(...products.map(p => p.price)) || 59}.99`,
      description: "Mix and match your favorite perfumes",
      badge: "Best Value",
      color: "from-[#2d1a1a] to-[#4a2d2d]",
      cta: "/products"
    },
    {
      title: "Free Gift Wrapping",
      subtitle: "On Orders $75+",
      description: "Make your gift extra special with our luxury packaging",
      badge: "Gift",
      color: "from-[#1a2d1a] to-[#2d4a2d]",
      cta: "/products"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length);
  };

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  // Working Countdown Timer Component
  const CountdownTimer = ({ endTime }) => {
    const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
    const [isExpired, setIsExpired] = useState(false);

    useEffect(() => {
      const calculateTimeLeft = () => {
        const difference = endTime - new Date();
        
        if (difference <= 0) {
          setIsExpired(true);
          return { hours: 0, minutes: 0, seconds: 0 };
        }
        
        setIsExpired(false);
        return {
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        };
      };

      setTimeLeft(calculateTimeLeft());
      const timer = setInterval(() => {
        setTimeLeft(calculateTimeLeft());
      }, 1000);

      return () => clearInterval(timer);
    }, [endTime]);

    if (isExpired) {
      return <span className="text-xs text-red-500 font-medium">Expired</span>;
    }

    return (
      <div className="flex gap-1 text-xs font-mono">
        <span className="bg-[#1a1a1a] text-white px-2 py-1 rounded">
          {String(timeLeft.hours).padStart(2, '0')}
        </span>
        <span className="text-gray-400">:</span>
        <span className="bg-[#1a1a1a] text-white px-2 py-1 rounded">
          {String(timeLeft.minutes).padStart(2, '0')}
        </span>
        <span className="text-gray-400">:</span>
        <span className="bg-[#1a1a1a] text-white px-2 py-1 rounded">
          {String(timeLeft.seconds).padStart(2, '0')}
        </span>
      </div>
    );
  };

  // Handle bundle purchase
  const handleBundlePurchase = (bundle) => {
    bundle.products.forEach(product => {
      addToCart(product);
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-[var(--dark-coffe)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500 uppercase tracking-wider text-sm">Loading deals...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      {/* Hero Carousel */}
      <div className="relative h-[500px] overflow-hidden">
        <div 
          className="flex h-full transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {carouselSlides.map((slide, index) => (
            <div key={index} className="min-w-full h-full relative">
              <div className={`absolute inset-0 bg-gradient-to-r ${slide.color} opacity-90`}></div>
              <div className="absolute inset-0 flex items-center">
                <div className="max-w-7xl mx-auto px-8 w-full">
                  <div className="max-w-lg">
                    <span className="inline-block px-4 py-1 bg-[var(--dark-coffe)] text-white text-xs uppercase tracking-wider mb-4">
                      {slide.badge}
                    </span>
                    <h2 className="text-5xl md:text-6xl font-light text-white mb-4">
                      {slide.title}
                    </h2>
                    <p className="text-3xl text-[var(--dark-coffe)] font-semibold mb-4">
                      {slide.subtitle}
                    </p>
                    <p className="text-white/80 text-lg mb-8">
                      {slide.description}
                    </p>
                    <Link 
                      to={slide.cta}
                      className="inline-block px-8 py-3 bg-white text-[#1a1a1a] text-sm uppercase tracking-wider hover:bg-[var(--dark-coffe)] hover:text-white transition-all duration-300"
                    >
                      Shop Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Controls */}
        <button 
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-sm text-white rounded-full flex items-center justify-center hover:bg-white/40 transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-sm text-white rounded-full flex items-center justify-center hover:bg-white/40 transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Carousel Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {carouselSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all ${
                currentSlide === index 
                  ? 'w-8 bg-white' 
                  : 'w-2 bg-white/50 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Flash Deals Section */}
        {flashDeals.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <Flame className="w-6 h-6 text-red-500" />
              <h2 className="text-2xl font-light tracking-wide uppercase">Flash Deals</h2>
              <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full animate-pulse">
                Ending Soon
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {flashDeals.map((deal) => (
                <div key={deal._id} className="bg-white border border-[#ede8e0] p-5 group hover:shadow-lg transition-shadow">
                  <Link to={`/product/${deal._id}`} className="block">
                    <div className="relative mb-4">
                      <img 
                        src={deal.image || 'https://placehold.co/400x400/f5f1eb/b8976a?text=Perfume'} 
                        alt={deal.name}
                        className="w-full h-48 object-cover"
                      />
                      <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                        -{deal.discount}%
                      </span>
                    </div>
                    
                    <p className="text-[10px] text-[var(--dark-coffe)] uppercase tracking-wider mb-1">Stelina</p>
                    <h3 className="text-lg font-medium mb-2 group-hover:text-[var(--dark-coffe)] transition-colors">
                      {deal.name}
                    </h3>
                  </Link>
                  
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl text-[var(--dark-coffe)] font-semibold">
                      ${deal.salePrice?.toFixed(2)}
                    </span>
                    <span className="text-sm text-gray-400 line-through">
                      ${deal.originalPrice?.toFixed(2)}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span>Ends in:</span>
                    </div>
                    <CountdownTimer endTime={deal.endTime} />
                  </div>

                  <Buttons.CartButton 
                    product={{ ...deal, price: deal.salePrice }}
                    variant="primary"
                    size="md"
                    fullWidth={true}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Category Deals */}
        {categoryDeals.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-light tracking-wide uppercase mb-8 text-center">
              Shop by Category & Save
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categoryDeals.map((category, index) => (
                <Link 
                  key={index}
                  to={`/products?collection=${encodeURIComponent(category.name)}`}
                  className={`bg-gradient-to-br ${category.color} border border-[#ede8e0] p-6 text-center group hover:shadow-md transition-shadow`}
                >
                  <span className="text-4xl mb-3 block">{category.icon}</span>
                  <h3 className="text-sm font-medium mb-1">{category.name}</h3>
                  <p className="text-xs text-gray-500 mb-2">{category.count} products</p>
                  <span className="inline-block px-3 py-1 bg-[var(--dark-coffe)] text-white text-xs rounded-full">
                    {category.discount}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Bundle Offers */}
        {bundleOffers.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <Gift className="w-6 h-6 text-[var(--dark-coffe)]" />
              <h2 className="text-2xl font-light tracking-wide uppercase">Bundle & Save More</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {bundleOffers.map((bundle) => {
                const savings = bundle.originalPrice - bundle.bundlePrice;
                const savingsPercent = Math.round((savings / bundle.originalPrice) * 100);
                
                return (
                  <div key={bundle.id} className="bg-white border border-[#ede8e0] p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <img 
                        src={bundle.image} 
                        alt={bundle.title}
                        className="w-full md:w-48 h-32 object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="text-xl font-medium mb-2">{bundle.title}</h3>
                        <p className="text-sm text-gray-500 mb-3">{bundle.description}</p>
                        
                        <div className="flex items-baseline gap-3 mb-3">
                          <span className="text-2xl text-[var(--dark-coffe)] font-semibold">
                            ${bundle.bundlePrice.toFixed(2)}
                          </span>
                          <span className="text-sm text-gray-400 line-through">
                            ${bundle.originalPrice.toFixed(2)}
                          </span>
                          <span className="text-sm text-green-600 font-medium">
                            Save ${savings.toFixed(2)} ({savingsPercent}%)
                          </span>
                        </div>
                        
                        <button 
                          onClick={() => handleBundlePurchase(bundle)}
                          className="text-sm uppercase tracking-wider text-[#1a1a1a] border-b border-[#1a1a1a] pb-1 hover:text-[var(--dark-coffe)] hover:border-[var(--dark-coffe)] transition-colors"
                        >
                          Add Bundle to Cart →
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Sale Products Grid */}
        {saleProducts.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <Tag className="w-6 h-6 text-[var(--dark-coffe)]" />
                <h2 className="text-2xl font-light tracking-wide uppercase">All Sale Items</h2>
              </div>
              <Link 
                to="/products"
                className="text-sm text-gray-500 hover:text-[var(--dark-coffe)] flex items-center gap-1"
              >
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {saleProducts.map((product) => (
                <div key={product._id} className="bg-white border border-[#ede8e0] p-4 group hover:shadow-md transition-shadow">
                  <Link to={`/product/${product._id}`}>
                    <div className="relative mb-3">
                      <img 
                        src={product.image || 'https://placehold.co/300x300/f5f1eb/b8976a?text=Perfume'} 
                        alt={product.name}
                        className="w-full h-40 object-cover"
                      />
                      <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] px-2 py-0.5 rounded">
                        -{product.discount}%
                      </span>
                    </div>
                    
                    <p className="text-[10px] text-[var(--dark-coffe)] uppercase tracking-wider mb-1">Stelina</p>
                    <h4 className="text-sm font-medium mb-1 group-hover:text-[var(--dark-coffe)] transition-colors">
                      {product.name}
                    </h4>
                  </Link>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <p className="text-lg text-[var(--dark-coffe)] font-semibold">
                      ${product.price?.toFixed(2)}
                    </p>
                    <p className="text-xs text-gray-400 line-through">
                      ${product.originalPrice?.toFixed(2)}
                    </p>
                  </div>
                  
                  <Buttons.CartButton 
                    product={product}
                    variant="outline"
                    size="sm"
                    fullWidth={true}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Features Banner */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-[#ede8e0] pt-12">
          <div className="flex items-center gap-3">
            <Truck className="w-5 h-5 text-[var(--dark-coffe)]" />
            <div>
              <p className="text-sm font-medium">Free Shipping</p>
              <p className="text-xs text-gray-500">On orders over $50</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-[var(--dark-coffe)]" />
            <div>
              <p className="text-sm font-medium">Secure Payment</p>
              <p className="text-xs text-gray-500">100% protected transactions</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Percent className="w-5 h-5 text-[var(--dark-coffe)]" />
            <div>
              <p className="text-sm font-medium">Price Match</p>
              <p className="text-xs text-gray-500">Find it lower? We'll match it</p>
            </div>
          </div>
        </div>

        {/* Newsletter Banner */}
        <div className="mt-12 bg-[#1a1a1a] text-white p-12 text-center">
          <Sparkles className="w-8 h-8 text-[var(--dark-coffe)] mx-auto mb-4" />
          <h3 className="text-2xl font-light mb-3">Never Miss a Deal</h3>
          <p className="text-gray-400 mb-6 max-w-md mx-auto">
            Subscribe to get exclusive offers, early access to sales, and 10% off your first order.
          </p>
          <form className="flex max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Your email address"
              className="flex-1 px-4 py-3 bg-white/10 border border-white/20 text-white placeholder-gray-400 outline-none focus:border-[var(--dark-coffe)]"
              required
            />
            <button 
              type="submit"
              className="px-6 py-3 bg-[var(--dark-coffe)] text-white text-sm uppercase tracking-wider hover:opacity-90 transition-opacity"
            >
              Subscribe
            </button>
          </form>
          <p className="text-xs text-gray-500 mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sales;