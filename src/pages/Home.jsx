import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from "./Home.styles";
import Hero from './Hero';
import Features from './Features';
import ProductGrid from './Product';
import PromoBanner from '../components/PromoBanner';
import CategoryBanners from './Category';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/products`)
      .then(res => {
        const products = res.data;
        setFeaturedProducts(products.slice(0, 4));
        setNewArrivals(products.slice(4, 8));
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching products:', err);
        setLoading(false);
      });
  }, []);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Add newsletter signup logic
    console.log('Newsletter signup:', email);
    setEmail('');
    alert('Thank you for subscribing!');
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
        className="w-full h-[500px] bg-fixed bg-center bg-cover flex items-center justify-center" 
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1512568448817-19918a994770?w=1600")' }}
      >
        <div className="text-center bg-white/90 backdrop-blur-sm p-12 md:p-20 max-w-2xl mx-6">
          <h2 className="text-4xl font-tenor tracking-[0.2em] mb-6 text-[#1a1a1a]">
            The Art of Perfumery
          </h2>
          <p className="text-gray-600 italic mb-8 leading-relaxed">
            "A perfume is like a piece of clothing, a message, a way of presenting oneself, 
            a costume that according to the person who wears it."
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

      {/* Special Offer Banner */}
      <div style={styles.offerBanner}>
        <p style={styles.offerTag}>Limited Time</p>
        <h2 style={styles.offerTitle}>Exclusive Welcome Offer</h2>
        <p style={styles.offerText}>
          Get 20% off on your first purchase of any luxury fragrance.<br />
          Experience the essence of elegance.
        </p>
        <div style={styles.offerCode}>WELCOME20</div>
        <br />
        <Link to="/products" style={styles.offerButton}>
          Shop Now
        </Link>
      </div>

      {/* Instagram Feed Teaser */}
      <div className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm uppercase tracking-wider text-gray-500 mb-2">
            Follow Us
          </p>
          <h2 className="text-3xl font-light tracking-wide uppercase mb-4">
            @StelinaPerfumes
          </h2>
          <p className="text-gray-600 mb-8">
            Tag your photos with #StelinaScent for a chance to be featured
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
                  src={`https://placehold.co/400x400/f5f1eb/b8976a?text=Instagram+${i}`}
                  alt={`Instagram post ${i}`}
                  className="w-full h-full object-cover"
                />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div style={styles.newsletter}>
        <h3 style={styles.newsletterTitle}>Stay in the Loop</h3>
        <p style={styles.newsletterText}>
          Subscribe to receive updates, access to exclusive deals, and 10% off your first order.
        </p>
        <form onSubmit={handleNewsletterSubmit} style={styles.newsletterForm}>
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.newsletterInput}
            required
          />
          <button type="submit" style={styles.newsletterButton}>
            Subscribe
          </button>
        </form>
        <p className="text-xs text-gray-400 mt-4">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
      <div className="py-16 bg-white">
  <div className="max-w-4xl mx-auto text-center px-4">
    <div className="flex justify-center gap-1 mb-4">
      {[1,2,3,4,5].map(i => (
        <span key={i} className="text-[var(--dark-coffe)] text-xl">★</span>
      ))}
    </div>
    <p className="text-xl italic text-gray-600 mb-6">
      "The most exquisite fragrance I've ever worn. Lasts all day and I get compliments everywhere I go."
    </p>
    <p className="text-sm uppercase tracking-wider">— Sarah M.</p>
  </div>
</div>
      <div className="border-t border-[#ede8e0] py-12">

  <div className="max-w-7xl mx-auto px-4">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
      <div>
        <div className="text-3xl mb-3">🌿</div>
        <h4 className="text-sm uppercase tracking-wider mb-2">Sustainable</h4>
        <p className="text-xs text-gray-500">Eco-friendly packaging</p>
      </div>
      <div>
        <div className="text-3xl mb-3">🤲</div>
        <h4 className="text-sm uppercase tracking-wider mb-2">Cruelty Free</h4>
        <p className="text-xs text-gray-500">Never tested on animals</p>
      </div>
      <div>
        <div className="text-3xl mb-3">🎨</div>
        <h4 className="text-sm uppercase tracking-wider mb-2">Artisanal</h4>
        <p className="text-xs text-gray-500">Hand-crafted in small batches</p>
      </div>
    </div>
  </div>
</div>
    </div>
  );
};

export default Home;