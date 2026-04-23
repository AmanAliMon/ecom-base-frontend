import React from "react";
import { ShoppingBag, Star, Sparkles, ChevronRight } from "lucide-react";

const Hero = () => {
  return (
    <div className="min-h-screen bg-white flex items-center">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Content */}
          <div>
            <div className="inline-flex items-center gap-2 bg-copper px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-3 h-3 text-white" />
              <span className="text-[10px] tracking-[3px] text-white text-bold uppercase">
                New Arrival
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-[#1a1a1a] mb-6 leading-tight">
              The Essence of
              <br />
              <span className="font-medium">
                Luxury{" "}
                <span className="text-[var(--dark-coffee)]">Fragrance</span>
              </span>
            </h1>

            <p className="text-gray-500 leading-relaxed mb-8 text-base max-w-md">
              Discover our curated collection of exquisite perfumes crafted from
              the finest ingredients. Each scent tells a unique story.
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              <button className="bg-dark-coffee text-white px-8 py-3 text-sm uppercase tracking-wider hover:bg-[var(--dark-coffee)] transition-colors flex items-center gap-2">
                <ShoppingBag className="w-4 h-4" />
                Shop Now
              </button>
              <button className="border border-[#ede8e0] px-8 py-3 text-sm uppercase tracking-wider hover:border-[var(--dark-coffee)] transition-colors">
                Discover Collection
              </button>
            </div>

            <div className="flex items-center gap-4 pt-4 border-t border-[#ede8e0]">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-copper text-copper" />
                ))}
              </div>
              <span className="text-sm text-gray-500">245 reviews</span>
            </div>
          </div>

          {/* Right - Perfume Bottle */}
          <div className="flex justify-center">
            <img
              src="/placeholders/hero.png"
              style={{width:"150% !important",height:"150%"}}
              alt="Luxury Perfume"
              className="w-full max-w-sm drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
