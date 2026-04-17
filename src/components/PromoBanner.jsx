import React from "react";
import { ArrowRight, Sparkles, Gift, Clock, Star } from "lucide-react";
import { Link } from "react-router-dom";

const PromoBanners = () => {
  return (
    <>
      {/* Row 2: Full Width Premium Banner */}
      <div className="relative bg-gradient-to-r from-[#B3793F] via-[#B3793F] to-[#B3793F] my-10 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-64 h-64 border border-white/20 rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 border border-white/20 rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-white/10 rounded-full"></div>
        </div>

        {/* Glowing Orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--dark-coffe)]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[var(--dark-coffe)]/5 rounded-full blur-3xl"></div>

        {/* Decorative Bottle Shapes */}
        <div className="absolute left-[5%] top-1/2 -translate-y-1/2 hidden lg:block">
          <div className="relative">
            <div className="w-16 h-24 border-2 border-white/10 rounded-t-3xl rounded-b-lg"></div>
            <div className="w-8 h-8 border-2 border-white/10 rounded-full absolute -top-4 left-4"></div>
          </div>
        </div>
        <div className="absolute right-[5%] top-1/2 -translate-y-1/2 hidden lg:block">
          <div className="relative transform rotate-12">
            <div className="w-20 h-28 border-2 border-white/10 rounded-t-3xl rounded-b-lg"></div>
            <div className="w-10 h-10 border-2 border-white/10 rounded-full absolute -top-5 left-5"></div>
          </div>
        </div>

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-6 md:px-16 py-4 md:py-14 text-center">
          {/* Flash Sale Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <Clock className="w-4 h-4 text-[var(--dark-coffe)]" />
            <span className="text-[10px] font-medium uppercase tracking-wider text-white/80">
              Limited Time Offer
            </span>
            <Sparkles className="w-3 h-3 text-yellow-400" />
          </div>

          {/* Main Title */}
          <h2 className="text-4xl md:text-6xl font-light tracking-wide text-white mb-3">
            New Collection
          </h2>
          <h3 className="text-5xl md:text-7xl font-bold text-[var(--dark-coffee)] mb-6">
            Arrived
          </h3>

          {/* Description */}
          <div className="max-w-md mx-auto mb-5">
            <p className="text-white/50 text-sm mb-1">
              Ready to elevate your fragrance game?
            </p>
            <p className="text-white/80 text-lg font-light">
              Come & shop with us today!
            </p>
          </div>

          {/* Price Card */}
          <div className="inline-flex flex-col items-center bg-white/5 backdrop-blur-sm px-8 py-4 border border-white/10">
            <span className="text-white/40 text-xs uppercase tracking-wider mb-1">
              Starting from
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold text-[var(--dark-coffee)]">
                $45
              </span>
              <span className="text-white/40 text-lg">.00</span>
            </div>
            <Link
              to="/products"
              className="inline-flex mt-3 items-center ml-5 gap-3 px-7 py-3 bg-[var(--dark-coffee)] text-white text-sm uppercase tracking-wider hover:bg-opacity-90 transition-all duration-300 group shadow-lg hover:shadow-xl"
            >
              Shop Now
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* CTA Button */}
        </div>
      </div>
    </>
  );
};

export default PromoBanners;
