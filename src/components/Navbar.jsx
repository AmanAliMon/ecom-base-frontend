import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import './Navbar.css';
import { User, ShoppingCart, MapPin, Search, Heart } from 'lucide-react';

const navLinks = [
  ['HOME', '/'],
  ['SHOP', '/products'],
  ['WOMEN', '/products?collection=women'],
  ['MEN', '/products?collection=men'],
  ['LUXURY', '/products?collection=luxury'],
];

const Navbar = () => {
  const { user, logout } = useAuth();
  const { items } = useCart();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchCategory, setSearchCategory] = useState("all");

  const cartItemCount =
    items?.reduce((sum, item) => sum + item.quantity, 0) || 0;

const handleSearch = (e) => {
  e.preventDefault();
  if (searchQuery.trim()) {
    const params = new URLSearchParams();
    params.append("q", searchQuery.trim()); // Use 'q' not 'search'
    if (searchCategory !== "all") {
      params.append("category", searchCategory);
    }
    navigate(`/search?${params.toString()}`);
  }
};
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch(e);
    }
  };

  return (
    <nav className="w-full bg-white font-tenor">
      {/* 1. Top Utility Bar */}
      <div className="bg-copper text-white px-6 md:px-16 py-2.5 flex justify-between items-center text-[13px] tracking-wide">
        <div className="font-light">Welcome to our online store!</div>
        <div className="flex items-center gap-6">
          <span className="cursor-pointer">English (USD) ▼</span>
          <span className="w-[1px] h-3 bg-white/30"></span>
          {user ? (
            <button onClick={() => logout()} className="hover:underline">
              Logout
            </button>
          ) : (
            <Link to="/login" className="hover:underline">
              Login or Register
            </Link>
          )}
        </div>
      </div>

      {/* 2. Middle Row: Brand, Search, & Icons */}
      <div className="flex flex-col md:flex-row justify-between items-center px-6 md:px-16 pt-8 gap-6">
        {/* Brand Logo */}
        <Link to="/" className="flex flex-col items-start group">
          <span className="text-5xl font-bold tracking-[0.1em] text-dark-coffee leading-none">
            RÜYA
          </span>
          <span className="text-[13.2px] tracking-[0.2em] uppercase text-gray-500 mt-1.5">
            Perfume Store
          </span>
        </Link>

        {/* Search Bar Group */}
        <form
          onSubmit={handleSearch}
          className="flex w-full max-w-[700px] border border-gray-200 rounded-sm overflow-hidden h-12"
        >
          <input
            type="text"
            placeholder="Search here..."
            className="flex-1 px-5 text-sm outline-none placeholder:text-gray-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <select
            className="bg-gray-50 border-l hidden md:block border-gray-200 px-4 text-sm text-gray-600 outline-none cursor-pointer nav-select"
            value={searchCategory}
            onChange={(e) => setSearchCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="women">Women</option>
            <option value="men">Men</option>
            <option value="luxury">Luxury</option>
            <option value="accessories">Accessories</option>
          </select>
          <button
            type="submit"
            className="bg-copper px-6 flex items-center justify-center hover:bg-dark-coffee transition-colors"
          >
            <Search className="text-white w-6 h-6" />
          </button>
        </form>

        {/* Action Icons */}
        <div className="flex items-center gap-4">
          <Link
            to="/profile"
            className="p-3 rounded-sm hover:bg-gray-50 transition-colors"
          >
            <User className="text-dark-coffee w-6 h-6" />
          </Link>
          <Link
            to="/cart"
            className="relative p-3 rounded-sm hover:bg-gray-50 transition-colors"
          >
            <ShoppingCart className="text-dark-coffee w-6 h-6" />
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
            className={`nav-link-custom ${label === "SALE" ? "text-red-600 font-bold" : ""}`}
          >
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
};;

export default Navbar;