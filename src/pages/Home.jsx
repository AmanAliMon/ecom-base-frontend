import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./Home.styles";
import Hero from "./Hero";
import Features from "./Features";
import ProductGrid from "./Product";
import PromoBanner from "../components/PromoBanner";
import CategoryBanners from "./Category";
import TestimonialCarousel from "../components/Testimonial";

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/products`)
      .then((res) => {
        const products = res.data;
        setFeaturedProducts(products.slice(0, 4));
        setNewArrivals(products.slice(4, 8));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Add newsletter signup logic
    console.log("Newsletter signup:", email);
    setEmail("");
    alert("Thank you for subscribing!");
  };

  return (
    <div>
      {/* Hero Section */}
      <Hero />

      {/* Features Bar */}
      <Features />

      {/* Category Banners */}
      <CategoryBanners />

      {/* Promo Banners (3 cards) */}
      <PromoBanner />

      {/* Featured Products */}
      <ProductGrid
        products={featuredProducts}
        loading={loading}
        title="Featured Products"
        subtitle="Our Selection"
      />

      {/* Parallax Quote Section */}
      <div
        className="w-full bg-fixed bg-center bg-cover flex items-center justify-center"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1512568448817-19918a994770?w=1600")',
        }}
      >
        <div className="text-center bg-white/90 backdrop-blur-sm p-12 md:p-20 max-w-2xl mx-6">
          <h2 className="text-4xl font-tenor tracking-[0.2em] mb-6 text-[#1a1a1a]">
            The Art of Perfumery
          </h2>
          <p className="text-gray-600 italic mb-8 leading-relaxed">
            "A perfume is like a piece of clothing, a message, a way of
            presenting oneself, a costume that according to the person who wears
            it."
          </p>
          <Link
            to="/about"
            className="text-xs font-bold tracking-[0.3em] uppercase border-b-2 border-[var(--dark-coffe)] pb-1 hover:text-[var(--dark-coffe)] transition-colors"
          >
            Discover Our Story
          </Link>
        </div>
      </div>

      {/* New Arrivals */}
      {newArrivals.length > 0 && (
        <ProductGrid
          products={newArrivals}
          loading={loading}
          title="New Arrivals"
          subtitle="Just Dropped"
        />
      )}

      {/* Instagram Feed Teaser */}
      <div className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm uppercase tracking-wider text-gray-500 mb-2">
            Follow Us
          </p>
          <h2 className="text-3xl font-light tracking-wide uppercase mb-4">
            @MDADSolutions
          </h2>
          <p className="text-gray-600 mb-8">
            Tag your photos with #MDAD for a chance to be featured
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <a
                key={i}
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block aspect-square bg-[#f5f1eb] hover:opacity-80 transition-opacity"
              >
                <img
                  src={`/insta${i}.png`}
                  alt={`Instagram post ${i}`}
                  className="w-full h-full object-cover"
                />
              </a>
            ))}
          </div>
        </div>
      </div>

<TestimonialCarousel></TestimonialCarousel>
    </div>
  );
};

export default Home;
 