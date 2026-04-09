import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  return (
    <section className="relative flex flex-col md:flex-row items-center justify-between min-h-[85vh] bg-stelina-bg px-6 md:px-[10%] font-tenor overflow-hidden">
      
      {/* Hero Left: Content */}
      <div className="flex-1 z-10 py-12 md:py-0 animate-fade-in">
        <p className="text-stelina-gold uppercase tracking-[0.3em] text-sm font-semibold mb-4">
          Take a Perfume
        </p>
        
        <h1 className="text-4xl md:text-7xl uppercase leading-[1.1] mb-6 text-stelina-dark">
          Up To 25% Off <br />
          <span className="font-bold">Order Now</span>
        </h1>
        
        <div className="flex flex-col mb-10">
          <p className="text-gray-500 uppercase text-xs tracking-widest mb-1">Save Price:</p>
          <span className="text-3xl md:text-4xl text-stelina-gold font-medium">$170.00</span>
        </div>

        <Link 
          to="/products" 
          className="inline-block bg-dark text-white px-12 py-4 uppercase text-xs tracking-widest font-bold border border-dark hover:bg-transparent hover:text-dark transition-all duration-300"
        >
          Shop Now
        </Link>
      </div>

      {/* Hero Right: Product Image */}
      <div className="flex-1 flex justify-center items-center relative h-full w-full">
        {/* Soft Gold Background Glow */}
        <div className="absolute w-[300px] h-[300px] md:w-[550px] md:h-[550px] bg-stelina-gold opacity-[0.07] rounded-full blur-3xl" />
        
        <div className="relative z-10 hero-image-wrapper">
          <img 
            src="/placeholders/hero.png" 
            alt="Luxury Stelina Perfume" 
            className="max-h-[450px] md:max-h-[650px] object-contain drop-shadow-2xl"
            onError={(e) => { e.target.src = 'https://i.ibb.co/Gxcp7px/perfume-placeholder.png'; }}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;