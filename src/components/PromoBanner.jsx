import React from 'react';
import { Link } from 'react-router-dom';
import './PromoBanners.css';

const PromoBanners = () => {
  return (
    <div className="stelina-promo-container">
      
      {/* Row 1: Two Cards */}
      <div className="stelina-row-top">
        
        {/* LEFT CARD: TOP STAFF PICK */}
        <div className="stelina-card">
          <span className="stelina-card-label">TOP STAFF PICK</span>
          <h2 className="stelina-card-title">Best Collection</h2>
          <p className="stelina-card-text">Proin interdum magna primis id consequat</p>
          <Link to="/products" className="stelina-shop-link">SHOP NOW</Link>
          
          <div className="stelina-bottle-image">
            <div className="stelina-bottle-square"></div>
          </div>
        </div>
        
        {/* RIGHT CARD: MAYBE YOU'VE EARNED IT */}
        <div className="stelina-card stelina-card-right">
          <h2 className="stelina-card-title stelina-card-title--small">Maybe You've Earned It</h2>
          <p className="stelina-card-code">Use code: <strong>STELINA</strong> Get 25% Off for all items!</p>
          <Link to="/products" className="stelina-shop-link">SHOP NOW</Link>
          
          <div className="stelina-bottle-image">
            <div className="stelina-bottle-tall"></div>
          </div>
        </div>
      </div>
      
      {/* Row 2: Full Width Dark Banner */}
      <div className="stelina-banner-bottom">
        
        <div className="stelina-banner-decoration stelina-bottle-left"></div>
        <div className="stelina-banner-decoration stelina-bottle-right"></div>
        <div className="stelina-banner-decoration stelina-bottle-far-right"></div>
        
        <div className="stelina-banner-content">
          <h2 className="stelina-banner-title">Collection Arrived</h2>
          <p className="stelina-banner-text">You have no items & Are you ready to use? come & shop with us!</p>
          <p className="stelina-banner-price">Price from: <span>$45.00</span></p>
          <Link to="/products" className="stelina-banner-link">SHOP NOW</Link>
        </div>
        
      </div>
      
    </div>
  );
};

export default PromoBanners;