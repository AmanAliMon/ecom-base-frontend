import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import './Navbar.css';

      const navLinks = [
  ['HOME', '/'],
  ['SHOP', '/products'],
  ['WOMEN', '/collection/women'],
  ['MEN', '/collection/men'],
  ['LUXURY', '/collection/luxury'],
  ['GIFT SETS', '/collection/gift-sets'],
  ['ACCESSORIES', '/collection/accessories'],
  ['SALE', '/sale']
];


const Navbar = () => {
  const { user, logout } = useAuth();
  const { items } = useCart();
  const navigate = useNavigate();

  const cartItemCount = items?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return (
    <nav className="w-full bg-white font-tenor">
      {/* 1. Top Utility Bar */}
      <div className="bg-dark-coffee text-white px-6 md:px-16 py-2.5 flex justify-between items-center text-[13px] tracking-wide">
        <div className="font-light">Welcome to our online store!</div>
        <div className="flex items-center gap-6">
          <span className="cursor-pointer">English (USD) ▼</span>
          <span className="w-[1px] h-3 bg-white/30"></span>
          {user ? (
            <button onClick={() => logout()} className="hover:underline">Logout</button>
          ) : (
            <Link to="/login" className="hover:underline">Login or Register</Link>
          )}
        </div>
      </div>

      {/* 2. Middle Row: Brand, Search, & Icons */}
      <div className="flex flex-col md:flex-row justify-between items-center px-6 md:px-16 py-8 border-b border-gray-100 gap-6">
        {/* Brand Logo */}
        <Link to="/" className="flex flex-col items-start group">
          <span className="text-4xl font-bold tracking-[0.1em] text-black leading-none">LA MDADE</span>
          <span className="text-[11px] tracking-[0.2em] uppercase text-gray-500 mt-1.5">Perfume Store</span>
        </Link>

        {/* Search Bar Group */}
        <div className="flex w-full max-w-[700px] border border-gray-200 rounded-sm overflow-hidden h-12">
          <input 
            type="text" 
            placeholder="Search here..." 
            className="flex-1 px-5 text-sm outline-none placeholder:text-gray-400"
          />
          <select className="bg-gray-50 border-l border-gray-200 px-4 text-sm text-gray-600 outline-none cursor-pointer">
            <option>Accessories</option>
            <option>Women</option>
            <option>Men</option>
          </select>
          <button className="bg-dark-coffee px-6 flex items-center justify-center hover:bg-[#a38963] transition-colors">
            <span className="text-white text-lg">🔍</span>
          </button>
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-4">
          <Link to="/profile" className="p-3 border border-gray-200 rounded-sm hover:bg-gray-50 transition-colors">
             <span className="text-blue-600 text-xl">👤</span>
          </Link>
          <Link to="/cart" className="relative p-3 border border-gray-200 rounded-sm hover:bg-gray-50 transition-colors">
            <span className="text-orange-500 text-xl">🛒</span>
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-dark-coffee text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold border-2 border-white">
                {cartItemCount}
              </span>
            )}
          </Link>
          <button className="p-3 border border-gray-200 rounded-sm hover:bg-gray-50 md:hidden">
            <span className="text-xl">☰</span>
          </button>
        </div>
      </div>

      {/* 3. Bottom Row: Categories Navigation */}

<div className="hidden md:flex items-center gap-10 px-16 py-5 overflow-x-auto no-scrollbar">
  {navLinks.map(([label, url]) => (
    <Link 
      key={label} 
      to={url} 
      className={`nav-link-custom ${label === 'SALE' ? 'text-red-600 font-bold' : ''}`}
    >
      {label}
    </Link>
  ))}
</div>
    </nav>
  );
};

export default Navbar;