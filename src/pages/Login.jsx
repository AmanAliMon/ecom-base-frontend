import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LogIn, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import Buttons from './Buttons'
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login, user } = useAuth();
  const navigate = useNavigate();

  // Only redirect if user is already logged in
  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    console.log("Submitting login form...");

    const result = await login(email, password);

    if (result.success) {
      console.log("Login successful, redirecting...");
      navigate("/");
    } else {
      console.log("Login failed:", result.error);
      setError(result.error);
    }

    setLoading(false);
  };

  // Don't render login form if user is already logged in
  if (user) {
    return (
      <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-[var(--dark-coffe)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500 uppercase tracking-wider text-sm">
            Redirecting...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf8f5] py-16 px-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-[11px] tracking-[3px] text-[var(--dark-coffe)] uppercase mb-2">
            Stelina
          </p>
          <h1 className="text-3xl md:text-4xl font-light tracking-wide text-[#1a1a1a] mb-3">
            Welcome Back
          </h1>
          <p className="text-gray-500 text-sm">Sign in to continue shopping</p>
        </div>

        {/* Login Form */}
        <div className="bg-white border border-[#ede8e0] p-6 md:p-8">
          {error && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded">
              <p className="text-red-600 text-sm text-center">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="mb-5">
              <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  className="w-full pl-10 pr-4 py-3 border border-[#ede8e0] bg-white focus:outline-none focus:border-[var(--dark-coffe)] transition-colors text-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="mb-6">
              <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full pl-10 pr-12 py-3 border border-[#ede8e0] bg-white focus:outline-none focus:border-[var(--dark-coffe)] transition-colors text-sm"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
</button>
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="text-right mb-6">
              <Link
                to="/forgot-password"
                className="text-xs text-gray-400 hover:text-[var(--dark-coffe)] transition-colors"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Submit Button */}
            <Buttons.Primary

              type="submit"
              className="w-full py-3 bg-[var(--dark-coffe)] text-white text-sm uppercase tracking-wider hover:bg-opacity-90 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Signing In...
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  Sign In
                </>
              )}
                            </Buttons.Primary>

          </form>

          {/* Register Link */}
          <div className="mt-6 pt-6 border-t border-[#ede8e0] text-center">
            <p className="text-sm text-gray-500 mb-3">Don't have an account?</p>
            <Link
              to="/register"
              className="inline-flex items-center gap-2 text-sm text-[var(--dark-coffe)] hover:underline"
            >
              Create an account
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Test Account Info */}
        <div className="mt-6 p-4 bg-[#f5f1eb] border border-[#ede8e0]">
          <p className="text-xs uppercase tracking-wider text-center text-gray-500 mb-2">
            Test Account
          </p>
          <p className="text-sm text-center text-gray-600">
            admin@example.com / Admin123!@#
          </p>
          <p className="text-xs text-center text-gray-400 mt-2">
            * For testing purposes only
          </p>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link
            to="/"
            className="text-xs text-gray-400 hover:text-[var(--dark-coffe)] transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
