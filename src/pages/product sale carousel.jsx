import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, ShoppingBag, Sparkles } from 'lucide-react';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const products = [
    {
      id: 1,
      name: "Radiance Serum",
      price: "$59.50",
      originalPrice: "$89.00",
      description: "A potent blend of hyaluronic acid and vitamin C that delivers deep hydration and a natural, lit-from-within glow.",
      benefits: ["24H Hydration", "Brightening", "Anti-Aging"],
      image: "https://placehold.co/600x600/f5f1eb/b8976a?text=Serum",
      badge: "Bestseller"
    },
    {
      id: 2,
      name: "Glowing Serum",
      price: "$59.50",
      originalPrice: "$89.00",
      description: "Lightweight formula absorbs instantly, leaving skin smooth, plump, and radiant without any greasy residue.",
      benefits: ["Fast Absorbing", "Non-Greasy", "Cruelty-Free"],
      image: "https://placehold.co/600x600/f5f1eb/b8976a?text=Glowing+Serum",
      badge: "New"
    }
  ];

  const currentProduct = products[currentSlide];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % products.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [products.length]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? products.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % products.length);
  };

  return (
    <div className="relative min-h-screen bg-white overflow-hidden">
      {/* Left Edge Navigation - Rotated Text */}
      <div className="fixed left-6 top-1/2 -translate-y-1/2 -rotate-90 origin-left hidden lg:block z-20">
        <div className="flex items-center gap-8">
          {["Serums", "Skincare", "Beauty"].map((item, idx) => (
            <a
              key={idx}
              href="#"
              className="text-[10px] tracking-[3px] text-gray-400 hover:text-[var(--dark-coffe)] transition-colors uppercase"
            >
              {item}
            </a>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 min-h-screen flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full py-20">
          
          {/* LEFT COLUMN - Visual */}
          <div className="relative order-2 lg:order-1">
            {/* Background Shape */}
            <div className="absolute -top-10 -left-10 w-[90%] h-[90%] bg-[#fdf5f0] rounded-[40px] -z-0"></div>
            
            {/* Secondary Background Shape for depth */}
            <div className="absolute -bottom-8 -right-8 w-[70%] h-[70%] bg-[#faf0ea] rounded-[30px] -z-0"></div>
            
            {/* Product Image Container */}
            <div className="relative z-10 transform transition-all duration-500 hover:scale-105">
              <img
                src={currentProduct.image}
                alt={currentProduct.name}
                className="w-full max-w-md mx-auto drop-shadow-2xl"
                style={{
                  filter: "drop-shadow(0 20px 25px -5px rgba(0, 0, 0, 0.1)) drop-shadow(0 10px 10px -5px rgba(0, 0, 0, 0.04))"
                }}
              />
            </div>

            {/* Badge */}
            {currentProduct.badge && (
              <div className="absolute top-8 right-8 lg:top-12 lg:right-12 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm z-20">
                <span className="text-[10px] tracking-[2px] text-[var(--dark-coffe)] uppercase font-medium">
                  {currentProduct.badge}
                </span>
              </div>
            )}

            {/* Navigation Arrows - Positioned near image on mobile */}
            <div className="flex items-center justify-center gap-4 mt-8 lg:hidden">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-full border border-[#ede8e0] flex items-center justify-center hover:border-[var(--dark-coffe)] transition-all duration-300"
              >
                <ChevronLeft className="w-4 h-4 text-gray-500" />
              </button>
              <div className="flex gap-2">
                {products.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`transition-all duration-300 rounded-full ${
                      idx === currentSlide
                        ? "w-6 h-1.5 bg-[var(--dark-coffe)]"
                        : "w-1.5 h-1.5 bg-gray-300"
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-full border border-[#ede8e0] flex items-center justify-center hover:border-[var(--dark-coffe)] transition-all duration-300"
              >
                <ChevronRight className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN - Content */}
          <div className="order-1 lg:order-2">
            {/* Subtle label */}
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-3 h-3 text-[var(--dark-coffe)]" />
              <span className="text-[10px] tracking-[3px] text-[var(--dark-coffe)] uppercase">
                Premium Skincare
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-wide text-[#1a1a1a] mb-4 leading-tight">
              {currentProduct.name}
            </h1>

            {/* Description */}
            <p className="text-gray-500 leading-relaxed mb-6 text-sm md:text-base max-w-md">
              {currentProduct.description}
            </p>

            {/* Benefits Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {currentProduct.benefits.map((benefit, idx) => (
                <span
                  key={idx}
                  className="text-[11px] tracking-wide text-gray-500 bg-[#f5f1eb] px-3 py-1 rounded-full"
                >
                  {benefit}
                </span>
              ))}
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mb-8">
              <span className="text-3xl font-semibold text-[#1a1a1a]">
                {currentProduct.price}
              </span>
              <span className="text-gray-400 line-through text-sm">
                {currentProduct.originalPrice}
              </span>
              <span className="text-[11px] tracking-[2px] text-green-600 bg-green-50 px-2 py-1 rounded">
                -33%
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button className="group bg-[#1a1a1a] text-white px-8 py-3 text-sm uppercase tracking-wider hover:bg-[var(--dark-coffe)] transition-all duration-300 flex items-center justify-center gap-2">
                <ShoppingBag className="w-4 h-4" />
                Buy Now — {currentProduct.price}
              </button>
              
              <button className="text-gray-500 text-sm uppercase tracking-wider hover:text-[var(--dark-coffe)] transition-colors duration-300 border-b border-transparent hover:border-[var(--dark-coffe)] pb-0.5">
                Explore Ingredients
              </button>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center gap-6 pt-4 border-t border-[#ede8e0]">
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 fill-[var(--dark-coffe)] text-[var(--dark-coffe)]" />
                <Star className="w-3 h-3 fill-[var(--dark-coffe)] text-[var(--dark-coffe)]" />
                <Star className="w-3 h-3 fill-[var(--dark-coffe)] text-[var(--dark-coffe)]" />
                <Star className="w-3 h-3 fill-[var(--dark-coffe)] text-[var(--dark-coffe)]" />
                <Star className="w-3 h-3 fill-[var(--dark-coffe)] text-[var(--dark-coffe)]" />
                <span className="text-xs text-gray-500 ml-2">2,000+ reviews</span>
              </div>
              <div className="w-px h-4 bg-[#ede8e0]"></div>
              <div className="text-xs text-gray-500">✨ 30-day guarantee</div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Navigation Dots - Static at bottom */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex items-center gap-3">
        {products.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`transition-all duration-300 rounded-full ${
              idx === currentSlide
                ? "w-2 h-2 bg-[var(--dark-coffe)]"
                : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;