import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from "./Home.styles"
import Hero from './Hero';
import Features from './Features'
import ProductGrid from './Product'
import CategoryBanners from './Category'
const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(res => {
        setFeaturedProducts(res.data.slice(0, 4));
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching products:', err);
        setLoading(false);
      });
  }, []);


  const categories = [
    {
      name: "Women's Perfume",
      image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=600',
      link: '/products',
    },
    {
      name: "Men's Cologne",
      image: 'https://images.unsplash.com/photo-1523293182086-3c5b1d23dce2?w=600',
      link: '/products',
    },
    {
      name: 'Luxury Collection',
      image: 'https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=600',
      link: '/products',
    },
  ];

  return (
    <div>
<Hero></Hero>
 <Features></Features>
 <CategoryBanners />

<ProductGrid products={featuredProducts} loading={loading} />


<div className="w-full h-[500px] bg-fixed bg-center bg-cover flex items-center justify-center" 
           style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1512568448817-19918a994770?w=1600")' }}>
        <div className="text-center bg-white/90 p-12 md:p-20 max-w-2xl mx-6">
          <h2 className="text-4xl font-tenor tracking-[0.2em] mb-6">The Art of Perfumery</h2>
          <p className="text-gray-600 italic mb-8 leading-relaxed">
            "A perfume is like a piece of clothing, a message, a way of presenting oneself, a costume that according to the person who wears it."
          </p>
          <Link to="/about" className="text-xs font-bold tracking-[0.3em] uppercase border-b-2 border-stelina-gold pb-1">
            Discover Our Story
          </Link>
        </div>
      </div>



  
      {/* ── Featured Products ────────────────────────── */}
      <div style={styles.featured}>
        <p style={styles.sectionTag}>Our Selection</p>
        <h2 style={styles.sectionTitle}>Featured Products</h2>
        <div style={{ marginBottom: '50px' }} />

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px', color: '#888', fontFamily: 'sans-serif' }}>
            Loading...
          </div>
        ) : (
          <div style={styles.productGrid}>
            {featuredProducts.map((product) => (
              <Link
                to={`/product/${product._id || product.id}`}
                key={product._id || product.id}
                style={{
                  ...styles.productCard,
                  transform: hoveredCard === (product._id || product.id) ? 'translateY(-4px)' : 'none',
                  boxShadow: hoveredCard === (product._id || product.id) ? '0 8px 30px rgba(0,0,0,0.1)' : 'none',
                }}
                onMouseEnter={() => setHoveredCard(product._id || product.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div style={styles.productImageContainer}>
                  <img
                    src={product.image || 'https://placehold.co/400x500/f5f1eb/b8976a?text=Perfume'}
                    alt={product.name}
                    style={styles.productImage}
                  />
                  {product.stock < 10 && product.stock > 0 && (
                    <span style={styles.productBadge}>Low Stock</span>
                  )}
                </div>
                <div style={styles.productInfo}>
                  <p style={styles.productBrand}>Stelina</p>
                  <h3 style={styles.productName}>{product.name}</h3>
                  <p style={styles.productPrice}>${product.price}</p>
                  <button
                    style={styles.productButton}
                    onMouseEnter={e => { e.currentTarget.style.background = '#1a1a1a'; e.currentTarget.style.color = 'white'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#1a1a1a'; }}
                  >
                    Add to Cart
                  </button>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div style={styles.viewAllWrap}>
          <Link to="/products" style={styles.viewAllBtn}>View All Products</Link>
        </div>
      </div>

      {/* ── Special Offer ────────────────────────────── */}
      <div style={styles.offerBanner}>
        <p style={styles.offerTag}>Limited Time</p>
        <h2 style={styles.offerTitle}>Exclusive Welcome Offer</h2>
        <p style={styles.offerText}>
          Get 20% off on your first purchase of any luxury fragrance.<br />
          Experience the essence of elegance.
        </p>
        <div style={styles.offerCode}>WELCOME20</div>
        <br />
        <Link to="/products" style={styles.offerButton}>Shop Now</Link>
      </div>

      {/* ── Newsletter ───────────────────────────────── */}
      <div style={styles.newsletter}>
        <h3 style={styles.newsletterTitle}>Stay in the Loop</h3>
        <p style={styles.newsletterText}>
          Subscribe to receive updates, access to exclusive deals, and more.
        </p>
        <div style={styles.newsletterForm}>
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={styles.newsletterInput}
          />
          <button style={styles.newsletterButton}>Subscribe</button>
        </div>
      </div>

    </div>
  );
};

export default Home;