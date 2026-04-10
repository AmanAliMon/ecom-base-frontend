import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('products'); // Changed default to products
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    image: 'https://placehold.co/400x400/png',
    category: '',
    stock: ''
  });

  useEffect(() => {
    if (!isAdmin()) {
      navigate('/');
      return;
    }
    fetchProducts();
    fetchOrders();
  }, [navigate, isAdmin]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/products`);
      console.log('Products fetched:', res.data);
      setProducts(res.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching products:', err);
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/orders/all`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(res.data);
    } catch (err) {
      console.error('Error fetching orders:', err);
    }
  };

  const addProduct = async (e) => {
    e.preventDefault();
    console.log('Adding product:', newProduct);
    
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/products`, {
        ...newProduct,
        price: parseFloat(newProduct.price),
        stock: parseInt(newProduct.stock)
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      console.log('Product added:', response.data);
      alert('✅ Product added successfully!');
      
      // Clear form
      setNewProduct({
        name: '',
        description: '',
        price: '',
        image: 'https://placehold.co/400x400/png',
        category: '',
        stock: ''
      });
      
      // Refresh product list
      fetchProducts();
    } catch (err) {
      console.error('Error adding product:', err);
      alert('❌ Failed to add product: ' + (err.response?.data?.error || err.message));
    }
  };

  const deleteProduct = async (id) => {
    if (window.confirm('Delete this product?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`${process.env.REACT_APP_API_URL}/api/products/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert('✅ Product deleted!');
        fetchProducts();
      } catch (err) {
        console.error('Error deleting product:', err);
        alert('❌ Failed to delete product');
      }
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h2>Loading Admin Dashboard...</h2>
      </div>
    );
  }

  // Styles
  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px'
    },
    tabs: {
      display: 'flex',
      gap: '5px',
      marginBottom: '30px',
      borderBottom: '3px solid #e0e0e0'
    },
    tab: {
      padding: '12px 24px',
      background: 'none',
      border: 'none',
      fontSize: '16px',
      fontWeight: 'bold',
      cursor: 'pointer',
      color: '#666',
      borderBottom: '3px solid transparent',
      marginBottom: '-3px'
    },
    activeTab: {
      color: '#3498db',
      borderBottom: '3px solid #3498db'
    },
    form: {
      background: '#f8f9fa',
      padding: '30px',
      borderRadius: '12px',
      marginBottom: '40px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    },
    formTitle: {
      marginTop: 0,
      marginBottom: '20px',
      color: '#2c3e50'
    },
    input: {
      width: '100%',
      padding: '10px',
      border: '2px solid #ddd',
      borderRadius: '6px',
      fontSize: '14px',
      marginBottom: '15px',
      boxSizing: 'border-box'
    },
    textarea: {
      width: '100%',
      padding: '10px',
      border: '2px solid #ddd',
      borderRadius: '6px',
      fontSize: '14px',
      marginBottom: '15px',
      minHeight: '100px',
      boxSizing: 'border-box'
    },
    row: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '15px'
    },
    button: {
      padding: '12px 24px',
      background: '#3498db',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      fontSize: '16px',
      fontWeight: 'bold',
      cursor: 'pointer',
      width: '100%'
    },
    productCard: {
      background: 'white',
      padding: '20px',
      borderRadius: '8px',
      marginBottom: '15px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      border: '1px solid #e0e0e0'
    },
    productHeader: {
      display: 'flex',
      gap: '20px',
      marginBottom: '15px'
    },
    productImage: {
      width: '100px',
      height: '100px',
      objectFit: 'cover',
      borderRadius: '8px'
    },
    deleteButton: {
      padding: '8px 16px',
      background: '#e74c3c',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      marginTop: '10px'
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={{ color: '#2c3e50', marginBottom: '30px' }}>🛍️ Admin Dashboard</h1>
      
      {/* Tabs */}
      <div style={styles.tabs}>
        <button 
          onClick={() => setActiveTab('products')}
          style={{...styles.tab, ...(activeTab === 'products' ? styles.activeTab : {})}}
        >
          📦 Products ({products.length})
        </button>
        <button 
          onClick={() => setActiveTab('orders')}
          style={{...styles.tab, ...(activeTab === 'orders' ? styles.activeTab : {})}}
        >
          📋 Orders ({orders.length})
        </button>
      </div>

      {/* Products Tab */}
      {activeTab === 'products' && (
        <div>
          {/* Add Product Form */}
          <div style={styles.form}>
            <h2 style={styles.formTitle}>➕ Add New Product</h2>
            
            <form onSubmit={addProduct}>
              <input
                type="text"
                placeholder="Product Name *"
                value={newProduct.name}
                onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                required
                style={styles.input}
              />
              
              <textarea
                placeholder="Product Description *"
                value={newProduct.description}
                onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                required
                style={styles.textarea}
              />
              
              <div style={styles.row}>
                <input
                  type="number"
                  placeholder="Price ($) *"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                  required
                  step="0.01"
                  min="0"
                  style={styles.input}
                />
                
                <input
                  type="number"
                  placeholder="Stock Quantity *"
                  value={newProduct.stock}
                  onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                  required
                  min="0"
                  style={styles.input}
                />
              </div>
              
              <div style={styles.row}>
                <input
                  type="text"
                  placeholder="Category * (e.g., Electronics, Clothing)"
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                  required
                  style={styles.input}
                />
                
                <input
                  type="text"
                  placeholder="Image URL"
                  value={newProduct.image}
                  onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                  style={styles.input}
                />
              </div>
              
              <button type="submit" style={styles.button}>
                Add Product
              </button>
            </form>
          </div>

          {/* Products List */}
          <h2 style={{ marginBottom: '20px', color: '#2c3e50' }}>📋 All Products</h2>
          
          {products.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', background: '#f8f9fa', borderRadius: '8px' }}>
              <p style={{ color: '#666', fontSize: '18px' }}>No products yet. Add your first product above! 👆</p>
            </div>
          ) : (
            products.map(product => (
              <div key={product._id || product.id} style={styles.productCard}>
                <div style={styles.productHeader}>
                  <img 
                    src={product.image || 'https://placehold.co/100x100/png'} 
                    alt={product.name}
                    style={styles.productImage}
                    onError={(e) => e.target.src = 'https://placehold.co/100x100/png'}
                  />
                  <div style={{ flex: 1 }}>
                    <h3 style={{ margin: '0 0 10px 0', color: '#2c3e50' }}>{product.name}</h3>
                    <p style={{ margin: '0 0 10px 0', color: '#666' }}>{product.description}</p>
                    <div style={{ display: 'flex', gap: '20px' }}>
                      <span><strong>💰 Price:</strong> ${product.price}</span>
                      <span><strong>📊 Stock:</strong> {product.stock}</span>
                      <span><strong>🏷️ Category:</strong> {product.category}</span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => deleteProduct(product._id || product.id)}
                  style={styles.deleteButton}
                >
                  🗑️ Delete Product
                </button>
              </div>
            ))
          )}
        </div>
      )}

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <div>
          <h2 style={{ marginBottom: '20px', color: '#2c3e50' }}>📦 All Orders</h2>
          
          {orders.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', background: '#f8f9fa', borderRadius: '8px' }}>
              <p style={{ color: '#666', fontSize: '18px' }}>No orders yet</p>
            </div>
          ) : (
            orders.map(order => (
              <div key={order._id || order.id} style={styles.productCard}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <strong>Order #{order._id?.slice(-6) || order.id}</strong>
                  <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                </div>
                <p><strong>Customer:</strong> {order.userId?.email || 'N/A'}</p>
                <p><strong>Total:</strong> ${order.total?.toFixed(2)}</p>
                <p><strong>Status:</strong> {order.status}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
