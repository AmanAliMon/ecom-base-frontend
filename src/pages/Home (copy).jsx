import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const styles = {
    // Hero Section
    hero: {
      position: 'relative',
      height: '90vh',
      minHeight: '600px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      textAlign: 'center',
      overflow: 'hidden'
    },
    heroOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.3)',
      zIndex: 1
    },
    heroContent: {
      position: 'relative',
      zIndex: 2,
      maxWidth: '800px',
      padding: '0 20px'
    },
    heroTitle: {
      fontSize: 'clamp(40px, 8vw, 80px)',
      fontWeight: '300',
      letterSpacing: '8px',
      marginBottom: '20px',
      textTransform: 'uppercase'
    },
    heroSubtitle: {
      fontSize: 'clamp(18px, 3vw, 24px)',
      fontWeight: '300',
      marginBottom: '40px',
      opacity: 0.9
    },
    heroButton: {
      padding: '15px 40px',
      fontSize: '16px',
      textTransform: 'uppercase',
      letterSpacing: '2px',
      background: 'transparent',
      border: '2px solid white',
      color: 'white',
      cursor: 'pointer',
      transition: 'all 0.3s',
      textDecoration: 'none',
      display: 'inline-block'
    },

    // Categories
    categories: {
      padding: '80px 20px',
      maxWidth: '1200px',
      margin: '0 auto'
    },
    sectionTitle: {
      textAlign: 'center',
      fontSize: '36px',
      fontWeight: '300',
      letterSpacing: '4px',
      marginBottom: '50px',
      textTransform: 'uppercase'
    },
    categoryGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '30px'
    },
    categoryCard: {
      position: 'relative',
      height: '400px',
      overflow: 'hidden',
      cursor: 'pointer',
      borderRadius: '8px'
    },
    categoryImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      transition: 'transform 0.6s'
    },
    categoryOverlay: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      padding: '30px',
      background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
      color: 'white'
    },
    categoryTitle: {
      fontSize: '28px',
      fontWeight: '400',
      marginBottom: '10px',
      letterSpacing: '2px'
    },
    categoryLink: {
      color: 'white',
      textDecoration: 'none',
      fontSize: '14px',
      textTransform: 'uppercase',
      letterSpacing: '2px',
      borderBottom: '2px solid white',
      paddingBottom: '5px'
    },

    // Featured Products
    featured: {
      padding: '80px 20px',
      background: '#fafafa'
    },
    productGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '40px',
      maxWidth: '1200px',
      margin: '0 auto'
    },
    productCard: {
      background: 'white',
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
      transition: 'transform 0.3s, box-shadow 0.3s',
      textDecoration: 'none',
      color: 'inherit',
      display: 'block'
    },
    productImageContainer: {
      position: 'relative',
      height: '350px',
      overflow: 'hidden'
    },
    productImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      transition: 'transform 0.6s'
    },
    productBadge: {
      position: 'absolute',
      top: '20px',
      left: '20px',
      background: '#c0392b',
      color: 'white',
      padding: '5px 12px',
      fontSize: '12px',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      borderRadius: '3px'
    },
    productInfo: {
      padding: '25px',
      textAlign: 'center'
    },
    productName: {
      fontSize: '18px',
      fontWeight: '400',
      marginBottom: '10px',
      letterSpacing: '1px'
    },
    productPrice: {
      fontSize: '20px',
      color: '#c0392b',
      fontWeight: '500',
      marginBottom: '15px'
    },
    productButton: {
      padding: '10px 25px',
      background: 'transparent',
      border: '1px solid #333',
      color: '#333',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      fontSize: '12px',
      cursor: 'pointer',
      transition: 'all 0.3s'
    },

    // Offer Banner
    offerBanner: {
      padding: '100px 20px',
      background: 'linear-gradient(135deg, #f5af19 0%, #f12711 100%)',
      color: 'white',
      textAlign: 'center'
    },
    offerContent: {
      maxWidth: '600px',
      margin: '0 auto'
    },
    offerTitle: {
      fontSize: 'clamp(30px, 5vw, 50px)',
      fontWeight: '300',
      letterSpacing: '4px',
      marginBottom: '20px'
    },
    offerText: {
      fontSize: '18px',
      marginBottom: '30px',
      opacity: 0.9,
      lineHeight: '1.6'
    },
    offerCode: {
      display: 'inline-block',
      padding: '15px 40px',
      background: 'rgba(255,255,255,0.2)',
      border: '2px dashed white',
      fontSize: '24px',
      letterSpacing: '4px',
      marginBottom: '30px'
    },

    // Newsletter
    newsletter: {
      padding: '80px 20px',
      textAlign: 'center',
      background: '#2c3e50',
      color: 'white'
    },
    newsletterTitle: {
      fontSize: '28px',
      fontWeight: '300',
      letterSpacing: '3px',
      marginBottom: '15px'
    },
    newsletterText: {
      fontSize: '16px',
      marginBottom: '30px',
      opacity: 0.8
    },
    newsletterForm: {
      display: 'flex',
      maxWidth: '500px',
      margin: '0 auto',
      gap: '10px'
    },
    newsletterInput: {
      flex: 1,
      padding: '15px',
      border: 'none',
      fontSize: '16px',
      background: 'rgba(255,255,255,0.1)',
      color: 'white'
    },
    newsletterButton: {
      padding: '15px 30px',
      background: 'white',
      color: '#2c3e50',
      border: 'none',
      fontSize: '14px',
      textTransform: 'uppercase',
      letterSpacing: '2px',
      cursor: 'pointer',
      fontWeight: 'bold'
    },

    // Features
    features: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '30px',
      padding: '60px 20px',
      maxWidth: '1200px',
      margin: '0 auto'
    },
    featureCard: {
      textAlign: 'center',
      padding: '30px'
    },
    featureIcon: {
      fontSize: '40px',
      marginBottom: '20px'
    },
    featureTitle: {
      fontSize: '18px',
      fontWeight: '500',
      marginBottom: '10px',
      textTransform: 'uppercase',
      letterSpacing: '2px'
    },
    featureText: {
      fontSize: '14px',
      color: '#666',
      lineHeight: '1.6'
    }
  };

  const categories = [
    { name: "Women's Perfume", image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=600", link: "/products" },
    { name: "Men's Cologne", image: "https://images.unsplash.com/photo-1523293182086-3c5b1d23dce2?w=600", link: "/products" },
    { name: "Luxury Collection", image: "https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=600", link: "/products" }
  ];

  return (
    <div>
      {/* Hero Section */}
      <div style={styles.hero}>
        <div style={styles.heroOverlay}></div>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>Stelina</h1>
          <p style={styles.heroSubtitle}>Discover Your Signature Scent</p>
          <Link to="/products" style={styles.heroButton}>
            Shop Collection
          </Link>
        </div>
      </div>

      {/* Features */}
      <div style={styles.features}>
        <div style={styles.featureCard}>
          <div style={styles.featureIcon}>🚚</div>
          <h3 style={styles.featureTitle}>Free Shipping</h3>
          <p style={styles.featureText}>On all orders over $50</p>
        </div>
        <div style={styles.featureCard}>
          <div style={styles.featureIcon}>💎</div>
          <h3 style={styles.featureTitle}>Authentic Products</h3>
          <p style={styles.featureText}>100% genuine fragrances</p>
        </div>
        <div style={styles.featureCard}>
          <div style={styles.featureIcon}>🎁</div>
          <h3 style={styles.featureTitle}>Gift Wrapping</h3>
          <p style={styles.featureText}>Complimentary luxury packaging</p>
        </div>
        <div style={styles.featureCard}>
          <div style={styles.featureIcon}>↩️</div>
          <h3 style={styles.featureTitle}>Easy Returns</h3>
          <p style={styles.featureText}>30-day hassle-free returns</p>
        </div>
      </div>

      {/* Categories */}
      <div style={styles.categories}>
        <h2 style={styles.sectionTitle}>Shop by Category</h2>
        <div style={styles.categoryGrid}>
          {categories.map((category, index) => (
            <Link to={category.link} key={index} style={styles.categoryCard}>
              <img 
                src={category.image} 
                alt={category.name}
                style={styles.categoryImage}
              />
              <div style={styles.categoryOverlay}>
                <h3 style={styles.categoryTitle}>{category.name}</h3>
                <span style={styles.categoryLink}>Shop Now →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div style={styles.featured}>
        <h2 style={styles.sectionTitle}>Featured Products</h2>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>Loading...</div>
        ) : (
          <div style={styles.productGrid}>
            {featuredProducts.map((product) => (
              <Link to={`/product/${product._id || product.id}`} key={product._id || product.id} style={styles.productCard}>
                <div style={styles.productImageContainer}>
                  <img 
                    src={product.image || 'https://placehold.co/400x500/png'} 
                    alt={product.name}
                    style={styles.productImage}
                  />
                  {product.stock < 10 && product.stock > 0 && (
                    <span style={styles.productBadge}>Low Stock</span>
                  )}
                </div>
                <div style={styles.productInfo}>
                  <h3 style={styles.productName}>{product.name}</h3>
                  <p style={styles.productPrice}>${product.price}</p>
                  <button style={styles.productButton}>Add to Cart</button>
                </div>
              </Link>
            ))}
          </div>
        )}
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <Link to="/products" style={styles.heroButton}>View All Products</Link>
        </div>
      </div>

      {/* Special Offer */}
      <div style={styles.offerBanner}>
        <div style={styles.offerContent}>
          <h2 style={styles.offerTitle}>Limited Time Offer</h2>
          <p style={styles.offerText}>
            Get 20% off on your first purchase of any luxury fragrance.<br />
            Experience the essence of elegance.
          </p>
          <div style={styles.offerCode}>WELCOME20</div>
          <br />
          <Link to="/products" style={styles.heroButton}>Shop Now</Link>
        </div>
      </div>

      {/* Newsletter */}
      <div style={styles.newsletter}>
        <h3 style={styles.newsletterTitle}>Stay in the Loop</h3>
        <p style={styles.newsletterText}>
          Subscribe to receive updates, access to exclusive deals, and more.
        </p>
        <div style={styles.newsletterForm}>
          <input 
            type="email" 
            placeholder="Enter your email address" 
            style={styles.newsletterInput}
          />
          <button style={styles.newsletterButton}>Subscribe</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
