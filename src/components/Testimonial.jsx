import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const TestimonialCarousel = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah M.",
      text: "The most exquisite fragrance I've ever worn. Lasts all day and I get compliments everywhere I go.",
      rating: 5,
    },
    {
      id: 2,
      name: "Jennifer K.",
      text: "Absolutely divine! This perfume has become my signature scent. The longevity is unmatched.",
      rating: 5,
    },
    {
      id: 3,
      name: "Michael R.",
      text: "Bought this for my wife and she hasn't stopped wearing it. The packaging is beautiful too!",
      rating: 5,
    },
    {
      id: 4,
      name: "Amanda L.",
      text: "Such a unique and sophisticated scent. It's become a staple in my daily rotation.",
      rating: 4,
    },
    {
      id: 5,
      name: "David C.",
      text: "Worth every penny. The quality is exceptional and the scent evolution is incredible.",
      rating: 5,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1,
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <div className="py-16 bg-white">
      <div className="max-w-4xl mx-auto text-center px-4">
        {/* Stars */}
        <div className="flex justify-center gap-1 mb-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <span
              key={i}
              className={`text-xl ${
                i <= current.rating
                  ? "text-[var(--dark-coffe)]"
                  : "text-gray-200"
              }`}
            >
              ★
            </span>
          ))}
        </div>

        {/* Quote - Only text changes, no animation on dots */}
        <p className="text-xl italic text-gray-600 mb-6 transition-opacity duration-300">
          "{current.text}"
        </p>

        {/* Author */}
        <p className="text-sm uppercase tracking-wider text-[#1a1a1a] mb-8">
          — {current.name}
        </p>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4">
          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:border-[var(--dark-coffe)] hover:bg-[#faf8f5] transition-all duration-300"
          >
            <ChevronLeft className="w-4 h-4 text-gray-500" />
          </button>

          {/* DOTS - STATIC, NOT MOVING */}
          <div className="flex gap-2 mx-4">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`transition-all duration-300 rounded-full ${
                  idx === currentIndex
                    ? "w-2 h-2 bg-[var(--dark-coffe)]"
                    : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
                }`}
                style={{
                  backgroundColor:
                    idx === currentIndex ? "var(--dark-coffe)" : undefined,
                }}
              />
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:border-[var(--dark-coffe)] hover:bg-[#faf8f5] transition-all duration-300"
          >
            <ChevronRight className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCarousel;
