import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import { Search } from "lucide-react";

const SearchResults = () => {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Get search query from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("q");
    setSearchQuery(query || "");
  }, [location.search]);

  // Fetch and filter products
  useEffect(() => {
    const fetchProducts = async () => {
      if (!searchQuery) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const API_URL = process.env.REACT_APP_API_URL || "";
        const response = await axios.get(`${API_URL}/api/products`);

        let allProducts = response.data;
        if (response.data.products) allProducts = response.data.products;

        // Filter products that CONTAIN the search term (not exact match)
        const filtered = allProducts.filter((product) => {
          const searchLower = searchQuery.toLowerCase();
          return (
            product.name?.toLowerCase().includes(searchLower) ||
            product.description?.toLowerCase().includes(searchLower) ||
            product.category?.toLowerCase().includes(searchLower)
          );
        });

        console.log("Search results:", filtered.length);
        setProducts(filtered);
      } catch (error) {
        console.error("Error:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchQuery]);

  // Show search form if no query
  if (!searchQuery) {
    return (
      <div className="min-h-screen bg-[#faf8f5] py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <Search className="w-20 h-20 mx-auto mb-6 text-gray-300" />
          <h1 className="text-2xl font-light mb-4">
            What are you looking for?
          </h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const input = e.target.querySelector("input");
              if (input.value.trim()) {
                window.location.href = `/search?q=${encodeURIComponent(input.value.trim())}`;
              }
            }}
          >
            <input
              type="text"
              placeholder="Search for perfumes..."
              className="w-full px-6 py-4 border border-[#ede8e0] focus:outline-none focus:border-[var(--dark-coffe)] text-lg"
              autoFocus
            />
            <button
              type="submit"
              className="mt-4 px-8 py-3 bg-[var(--dark-coffe)] text-white"
            >
              Search
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-[var(--dark-coffe)] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // No results
  if (products.length === 0) {
    return (
      <div className="min-h-screen bg-[#faf8f5] py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Search className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <h2 className="text-xl font-light mb-2">No products found</h2>
          <p className="text-gray-500 mb-6">
            We couldn't find anything matching "{searchQuery}"
          </p>
          <Link to="/search" className="text-[var(--dark-coffe)] underline">
            Try another search
          </Link>
        </div>
      </div>
    );
  }

  // Show results
  return (
    <div className="min-h-screen bg-[#faf8f5] py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-light">Search Results</h1>
          <p className="text-gray-500 mt-2">
            Found {products.length} result{products.length !== 1 ? "s" : ""} for
            "{searchQuery}"
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <Link
              key={product.id || product._id}
              to={`/product/${product.id || product._id}`}
              className="group bg-white border border-[#ede8e0] hover:shadow-lg transition-all"
            >
              <div className="bg-[#f5f1eb] h-80 overflow-hidden">
                <img
                  src={
                    product.image ||
                    "https://placehold.co/400x500/f5f1eb/b8976a?text=Perfume"
                  }
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium mb-2">{product.name}</h3>
                <p className="text-[var(--dark-coffe)] font-semibold">
                  ${product.price}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
