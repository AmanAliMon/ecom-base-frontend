import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="stelina-footer">
      <div className="stelina-footer__container">
        
        {/* Top Section - Newsletter */}
        <div className="stelina-footer__newsletter">
          <div className="stelina-footer__newsletter-content">
            <h3 className="stelina-footer__newsletter-title">Join Our Newsletter</h3>
            <p className="stelina-footer__newsletter-text">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
          </div>
          <div className="stelina-footer__newsletter-form">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="stelina-footer__input"
            />
            <button className="stelina-footer__btn">Subscribe</button>
          </div>
        </div>

        {/* Divider */}
        <div className="stelina-footer__divider"></div>

        {/* Main Footer Content */}
        <div className="stelina-footer__main">
          
          {/* Column 1 - Brand */}
          <div className="stelina-footer__column stelina-footer__column--brand">
            <h2 className="stelina-footer__logo">STELINA</h2>
            <p className="stelina-footer__tagline">Essence of Luxury</p>
            <p className="stelina-footer__description">
              Discover your signature scent from our curated collection of premium fragrances.
            </p>
            <div className="stelina-footer__social">
              <a href="#" className="stelina-footer__social-link" aria-label="Facebook">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </a>
              <a href="#" className="stelina-footer__social-link" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="18" cy="6" r="1.5" />
                </svg>
              </a>
              <a href="#" className="stelina-footer__social-link" aria-label="Twitter">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                </svg>
              </a>
              <a href="#" className="stelina-footer__social-link" aria-label="Pinterest">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 7c-2.76 0-5 2.24-5 5 0 2.12 1.32 3.93 3.18 4.66-.04-.4-.08-1.02.02-1.46.09-.37.6-2.54.6-2.54s-.15-.3-.15-.75c0-.7.41-1.22.91-1.22.43 0 .64.32.64.71 0 .43-.28 1.08-.42 1.68-.12.5.25.91.75.91.9 0 1.6-1.16 1.6-2.53 0-1.04-.7-1.82-1.98-1.82-1.45 0-2.35 1.08-2.35 2.29 0 .42.12.71.32.94.09.11.1.2.07.31-.03.1-.09.33-.12.42-.04.16-.13.22-.24.16-.67-.27-1.08-1.12-1.08-2.03 0-1.51 1.27-3.32 3.8-3.32 2.03 0 3.37 1.44 3.37 2.99 0 2.05-1.14 3.58-2.82 3.58-.55 0-1.07-.29-1.25-.62 0 0-.3 1.13-.36 1.35-.11.4-.32.8-.52 1.11.47.14.97.22 1.48.22 2.76 0 5-2.24 5-5 0-2.76-2.24-5-5-5z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div className="stelina-footer__column">
            <h4 className="stelina-footer__heading">Shop</h4>
            <ul className="stelina-footer__list">
              <li className="stelina-footer__list-item">
                <Link to="/products" className="stelina-footer__link">All Products</Link>
              </li>
              <li className="stelina-footer__list-item">
                <Link to="/products?category=women" className="stelina-footer__link">Women's Perfume</Link>
              </li>
              <li className="stelina-footer__list-item">
                <Link to="/products?category=men" className="stelina-footer__link">Men's Cologne</Link>
              </li>
              <li className="stelina-footer__list-item">
                <Link to="/products?category=luxury" className="stelina-footer__link">Luxury Collection</Link>
              </li>
              <li className="stelina-footer__list-item">
                <Link to="/products?filter=new" className="stelina-footer__link">New Arrivals</Link>
              </li>
              <li className="stelina-footer__list-item">
                <Link to="/products?filter=sale" className="stelina-footer__link">Sale</Link>
              </li>
            </ul>
          </div>

          {/* Column 3 - Support */}
          <div className="stelina-footer__column">
            <h4 className="stelina-footer__heading">Support</h4>
            <ul className="stelina-footer__list">
              <li className="stelina-footer__list-item">
                <Link to="/help" className="stelina-footer__link">Help Center</Link>
              </li>
              <li className="stelina-footer__list-item">
                <Link to="/shipping" className="stelina-footer__link">Shipping Information</Link>
              </li>
              <li className="stelina-footer__list-item">
                <Link to="/returns" className="stelina-footer__link">Returns & Exchanges</Link>
              </li>
              <li className="stelina-footer__list-item">
                <Link to="/track-order" className="stelina-footer__link">Track Your Order</Link>
              </li>
              <li className="stelina-footer__list-item">
                <Link to="/size-guide" className="stelina-footer__link">Size Guide</Link>
              </li>
              <li className="stelina-footer__list-item">
                <Link to="/faq" className="stelina-footer__link">FAQ</Link>
              </li>
            </ul>
          </div>

          {/* Column 4 - Company */}
          <div className="stelina-footer__column">
            <h4 className="stelina-footer__heading">Company</h4>
            <ul className="stelina-footer__list">
              <li className="stelina-footer__list-item">
                <Link to="/about" className="stelina-footer__link">About Us</Link>
              </li>
              <li className="stelina-footer__list-item">
                <Link to="/blog" className="stelina-footer__link">Blog</Link>
              </li>
              <li className="stelina-footer__list-item">
                <Link to="/careers" className="stelina-footer__link">Careers</Link>
              </li>
              <li className="stelina-footer__list-item">
                <Link to="/press" className="stelina-footer__link">Press</Link>
              </li>
              <li className="stelina-footer__list-item">
                <Link to="/sustainability" className="stelina-footer__link">Sustainability</Link>
              </li>
              <li className="stelina-footer__list-item">
                <Link to="/affiliate" className="stelina-footer__link">Affiliate Program</Link>
              </li>
            </ul>
          </div>

          {/* Column 5 - Contact */}
          <div className="stelina-footer__column">
            <h4 className="stelina-footer__heading">Contact</h4>
            <ul className="stelina-footer__list stelina-footer__list--contact">
              <li className="stelina-footer__list-item stelina-footer__contact-item">
                <svg className="stelina-footer__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:hello@stelina.com" className="stelina-footer__link">hello@stelina.com</a>
              </li>
              <li className="stelina-footer__list-item stelina-footer__contact-item">
                <svg className="stelina-footer__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+1234567890" className="stelina-footer__link">+1 (234) 567-890</a>
              </li>
              <li className="stelina-footer__list-item stelina-footer__contact-item">
                <svg className="stelina-footer__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="stelina-footer__text">123 Luxury Lane, Suite 100<br />New York, NY 10001</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="stelina-footer__divider"></div>

        {/* Bottom Bar */}
        <div className="stelina-footer__bottom">
          <p className="stelina-footer__copyright">
            © {new Date().getFullYear()} STELINA. All rights reserved.
          </p>
          <div className="stelina-footer__legal">
            <Link to="/privacy" className="stelina-footer__legal-link">Privacy Policy</Link>
            <span className="stelina-footer__separator">|</span>
            <Link to="/terms" className="stelina-footer__legal-link">Terms of Service</Link>
            <span className="stelina-footer__separator">|</span>
            <Link to="/cookies" className="stelina-footer__legal-link">Cookie Policy</Link>
          </div>
          <div className="stelina-footer__payment">
            <span className="stelina-footer__payment-icon">VISA</span>
            <span className="stelina-footer__payment-icon">MC</span>
            <span className="stelina-footer__payment-icon">AMEX</span>
            <span className="stelina-footer__payment-icon">PAYPAL</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;