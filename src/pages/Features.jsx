import React from "react";
import { Shield, Truck, Gift, RotateCcw } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Truck,
      title: "Free Shipping",
      description: "On all orders over $99",
    },
    {
      icon: Shield,
      title: "Authentic Products",
      description: "100% Genuine Fragrances",
    },
    {
      icon: Gift,
      title: "Luxury Packaging",
      description: "Complimentary gift wrapping",
    },
    {
      icon: RotateCcw,
      title: "Easy Returns",
      description: "30-day hassle-free returns",
    },
  ];

  return (
    <div className="bg-white py-12 pt-0">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 rounded-lg border border-transparent hover:border-[#ede8e0] transition-all duration-300 hover:shadow-md group"
            >
              {/* Large Icon Circle */}
              <div className="w-20 h-20 rounded-full bg-[#f5f1eb] flex items-center justify-center mb-4 group-hover:bg-[#2A1B10] transition-all duration-300">
                <feature.icon
                  className="w-10 h-10 text-[#2A1B10] group-hover:text-white transition-colors duration-300"
                  strokeWidth={1.5}
                />
              </div>

              {/* Title */}
              <h4 className="text-[14px] font-bold tracking-widest uppercase text-[#1a1a1a] mb-2">
                {feature.title}
              </h4>

              {/* Description */}
              <p className="text-[13px] text-gray-500">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
