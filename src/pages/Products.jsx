import React, { useState, useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import axios from 'axios';
import Buttons from './Buttons';
import { Filter, X } from 'lucide-react';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const { addToCart } = useCart();
  
  // URL Search Params
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Extract unique categories from products
  const categories = useMemo(() => {
    const cats = products.map(p => p.category).filter(Boolean);
    return ['All', ...new Set(cats)];
  }, [products]);

  // Validate and get initial category from URL
  const getValidInitialCategory = () => {
    const collectionParam = searchParams.get('collection');
    
    // If no param, return 'All'
    if (!collectionParam) return 'All';
    
    // If products haven't loaded yet, keep the param (will validate after load)
    if (products.length === 0) return collectionParam;
    
    // Check if category exists (case-insensitive)
    const categoryExists = categories.some(
      cat => cat.toLowerCase() === collectionParam.toLowerCase()
    );
    
    // Return valid category or fallback to 'All'
    return categoryExists ? collectionParam : 'All';
  };

  const [selectedCategory, setSelectedCategory] = useState(getValidInitialCategory);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/products`)
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  // Validate category after products load
  useEffect(() => {
    if (products.length > 0) {
      const collectionParam = searchParams.get('collection');
      
      if (collectionParam) {
        const categoryExists = categories.some(
          cat => cat.toLowerCase() === collectionParam.toLowerCase()
        );
        
        if (!categoryExists) {
          // Invalid category - reset to All
          setSelectedCategory('All');
          searchParams.delete('collection');
          setSearchParams(searchParams);
        } else {
          // Valid category - ensure it's set
          setSelectedCategory(collectionParam);
        }
      }
    }
  }, [products, categories, searchParams, setSearchParams]);

  // Sync URL when category changes
  useEffect(() => {
    if (selectedCategory === 'All') {
      searchParams.delete('collection');
    } else {
      searchParams.set('collection', selectedCategory);
    }
    setSearchParams(searchParams);
  }, [selectedCategory, searchParams, setSearchParams]);

  // Update selected category when URL changes (browser back/forward)
  useEffect(() => {
    const param = searchParams.get('collection');
    if (param && categories.some(cat => cat.toLowerCase() === param.toLowerCase())) {
      if (param !== selectedCategory) {
        setSelectedCategory(param);
      }
    } else if (!param && selectedCategory !== 'All') {
      setSelectedCategory('All');
    }
  }, [searchParams, categories, selectedCategory]);

  // Filter products by selected category
  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'All') return products;
    
    // Case-insensitive filtering
    return products.filter(product => 
      product.category?.toLowerCase() === selectedCategory.toLowerCase()
    );
  }, [products, selectedCategory]);

  // Count products per category (case-insensitive grouping)
  const categoryCounts = useMemo(() => {
    const counts = {};
    products.forEach(product => {
      if (product.category) {
        const normalizedCategory = product.category;
        counts[normalizedCategory] = (counts[normalizedCategory] || 0) + 1;
      }
    });
    return counts;
  }, [products]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setShowMobileFilter(false);
  };

  // Find the display name for selected category (preserves original case)
  const getSelectedCategoryDisplay = () => {
    if (selectedCategory === 'All') return 'All';
    const match = categories.find(
      cat => cat.toLowerCase() === selectedCategory.toLowerCase()
    );
    return match || selectedCategory;
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;

  const displayCategory = getSelectedCategoryDisplay();

  return (
    <div className="py-16 px-4 bg-[#faf8f5] min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <p className="text-sm uppercase tracking-wider text-gray-500 text-center mb-2">
          Explore Our
        </p>
        <h1 className="text-4xl font-light tracking-wide text-center uppercase mb-8">
          All Products
        </h1>

        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-6">
          <button
            onClick={() => setShowMobileFilter(!showMobileFilter)}
            className="flex items-center gap-2 px-4 py-2 border border-[#ede8e0] bg-white text-sm uppercase tracking-wider hover:bg-[#faf8f5] transition-colors"
          >
            <Filter className="w-4 h-4" />
            Filter by Category
            {selectedCategory !== 'All' && (
              <span className="ml-2 bg-[var(--dark-coffe)] text-white px-2 py-0.5 text-xs rounded-full">
                1
              </span>
            )}
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Category Sidebar */}
          <div className={`
            lg:block lg:w-64 lg:flex-shrink-0
            ${showMobileFilter ? 'block' : 'hidden'}
            transition-all duration-300
          `}>
            <div className="bg-white border border-[#ede8e0] p-6 sticky top-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-[#1a1a1a]">
                  Categories
                </h3>
                {selectedCategory !== 'All' && (
                  <button
                    onClick={() => handleCategoryChange('All')}
                    className="text-xs text-gray-500 hover:text-[var(--dark-coffe)] flex items-center gap-1"
                  >
                    <X className="w-3 h-3" />
                    Clear
                  </button>
                )}
              </div>

              <ul className="space-y-1">
                {categories.map(category => {
                  const isSelected = category.toLowerCase() === selectedCategory.toLowerCase();
                  
                  return (
                    <li key={category}>
                      <button
                        onClick={() => handleCategoryChange(category)}
                        className={`
                          w-full text-left px-3 py-2 text-sm transition-colors rounded
                          ${isSelected
                            ? 'bg-[#f5f1eb] text-[#1a1a1a] font-medium border-l-2 border-[var(--dark-coffe)]' 
                            : 'text-gray-600 hover:bg-[#faf8f5] hover:text-[#1a1a1a]'
                          }
                        `}
                      >
                        <span className="flex items-center justify-between">
                          <span>{category}</span>
                          <span className={`
                            text-xs px-2 py-0.5 rounded-full
                            ${isSelected
                              ? 'bg-[var(--dark-coffe)] text-white' 
                              : 'bg-[#f5f1eb] text-gray-600'
                            }
                          `}>
                            {category === 'All' 
                              ? products.length 
                              : categoryCounts[category] || 0
                            }
                          </span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Results Info */}
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-gray-500">
                Showing <span className="font-semibold text-[#1a1a1a]">{filteredProducts.length}</span> product{filteredProducts.length !== 1 ? 's' : ''}
                {selectedCategory !== 'All' && (
                  <span className="ml-2">
                    in <span className="font-semibold text-[var(--dark-coffe)]">{displayCategory}</span>
                  </span>
                )}
              </p>

              {/* Active Filter Badge (Mobile) */}
              {selectedCategory !== 'All' && (
                <button
                  onClick={() => handleCategoryChange('All')}
                  className="lg:hidden flex items-center gap-1 px-3 py-1 bg-[#f5f1eb] text-[#1a1a1a] text-xs rounded-full border border-[#ede8e0]"
                >
                  {displayCategory}
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-16 bg-white border border-[#ede8e0]">
                <p className="text-gray-500 mb-4">No products found in this category.</p>
                <button
                  onClick={() => handleCategoryChange('All')}
                  className="text-[var(--dark-coffe)] underline text-sm uppercase tracking-wider"
                >
                  View All Products
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-7">
                {filteredProducts.map((product) => {
                  const id = product._id || product.id;

                  return (
                    <div
                      key={id}
                      className="bg-white border border-[#ede8e0] overflow-hidden transition-all duration-300"
                      style={{
                        transform: hoveredCard === id ? 'translateY(-4px)' : 'none',
                        boxShadow: hoveredCard === id ? '0 8px 30px rgba(0,0,0,0.1)' : 'none',
                      }}
                      onMouseEnter={() => setHoveredCard(id)}
                      onMouseLeave={() => setHoveredCard(null)}
                    >
                      <Link to={`/product/${id}`} className="block">
                        <div className="relative h-[280px] overflow-hidden bg-[#f5f1eb]">
                          <img
                            src={product.image || 'https://placehold.co/400x500/f5f1eb/b8976a?text=Perfume'}
                            alt={product.name}
                            className="w-full h-full object-cover transition-transform duration-600 hover:scale-105"
                          />

                          {product.stock < 10 && product.stock > 0 && (
                            <span className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 text-[10px] uppercase tracking-wider">
                              Low Stock
                            </span>
                          )}
                          
                          {product.stock === 0 && (
                            <span className="absolute top-4 left-4 bg-gray-800 text-white px-3 py-1 text-[10px] uppercase tracking-wider">
                              Sold Out
                            </span>
                          )}
                        </div>
                      </Link>

                      <div className="p-5 text-center">
                        <p className="text-[10px] tracking-[2px] text-[var(--dark-coffe)] uppercase mb-1.5">
                          Stelina
                        </p>

                        <Link to={`/product/${id}`}>
                          <h2 className="text-base font-normal mb-1 text-[#1a1a1a] tracking-wide hover:text-[var(--dark-coffe)] transition-colors">
                            {product.name}
                          </h2>
                        </Link>

                        <p className="text-xs text-gray-500 mb-2">{product.category}</p>

                        <p className="text-lg text-[var(--dark-coffe)] font-semibold mb-4">
                          ${product.price}
                        </p>

                        <Buttons.CartButton 
                          product={product}
                          variant="outline"
                          size="md"
                          fullWidth={true}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;