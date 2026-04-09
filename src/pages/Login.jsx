import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, user } = useAuth();
  const navigate = useNavigate();

  // Only redirect if user is already logged in
  React.useEffect(() => {
    if (user) {
      navigate('/', { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    console.log('Submitting login form...');
    
    const result = await login(email, password);
    
    if (result.success) {
      console.log('Login successful, redirecting...');
      navigate('/');
    } else {
      console.log('Login failed:', result.error);
      setError(result.error);
    }
    
    setLoading(false);
  };

  // Don't render login form if user is already logged in
  if (user) {
    return <div className="container mt-3">Redirecting...</div>;
  }

  return (
    <div className="form-container">
      <h2 className="text-center mb-2">Sign In</h2>
      
      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
          />
        </div>
        
        <button 
          type="submit" 
          className="btn btn-primary w-100"
          disabled={loading}
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
        
        <div className="text-center mt-2">
          <Link to="/register" className="text-primary">
            Don't have an account? Register
          </Link>
        </div>
        
        <div className="text-center mt-2">
          <p className="text-muted" style={{fontSize: '14px'}}>
            Test Account: admin@example.com / admin123
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;