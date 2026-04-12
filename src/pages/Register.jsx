import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  UserPlus,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import Buttons from "./Buttons";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  // Password strength indicators
  const [passwordFocused, setPasswordFocused] = useState(false);
  const hasMinLength = password.length >= 6;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const passwordsMatch = password === confirmPassword && password !== "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!email || !password || !confirmPassword) {
      return setError("All fields are required");
    }

    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    if (password.length < 6) {
      return setError("Password must be at least 6 characters long");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return setError("Please enter a valid email address");
    }

    setLoading(true);

    const result = await register(email, password);

    if (result.success) {
      navigate("/");
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] py-16 px-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-[11px] tracking-[3px] text-[var(--dark-coffe)] uppercase mb-2">
            Stelina
          </p>
          <h1 className="text-3xl md:text-4xl font-light tracking-wide text-[#1a1a1a] mb-3">
            Create Account
          </h1>
          <p className="text-gray-500 text-sm">
            Join Stelina for a luxurious experience
          </p>
        </div>

        {/* Register Form */}
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
            <div className="mb-3">
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
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                  required
                  placeholder="Create a password"
                />
                <button
                  type="button"
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

            {/* Password Strength Indicator */}
            {passwordFocused && password && (
              <div className="mb-4 p-3 bg-[#f5f1eb] border border-[#ede8e0]">
                <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">
                  Password Requirements:
                </p>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    {hasMinLength ? (
                      <CheckCircle className="w-3 h-3 text-green-600" />
                    ) : (
                      <div className="w-3 h-3 border border-gray-300 rounded-full" />
                    )}
                    <span
                      className={`text-xs ${hasMinLength ? "text-green-600" : "text-gray-500"}`}
                    >
                      At least 6 characters
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {hasUpperCase ? (
                      <CheckCircle className="w-3 h-3 text-green-600" />
                    ) : (
                      <div className="w-3 h-3 border border-gray-300 rounded-full" />
                    )}
                    <span
                      className={`text-xs ${hasUpperCase ? "text-green-600" : "text-gray-500"}`}
                    >
                      Uppercase letter
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {hasLowerCase ? (
                      <CheckCircle className="w-3 h-3 text-green-600" />
                    ) : (
                      <div className="w-3 h-3 border border-gray-300 rounded-full" />
                    )}
                    <span
                      className={`text-xs ${hasLowerCase ? "text-green-600" : "text-gray-500"}`}
                    >
                      Lowercase letter
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {hasNumber ? (
                      <CheckCircle className="w-3 h-3 text-green-600" />
                    ) : (
                      <div className="w-3 h-3 border border-gray-300 rounded-full" />
                    )}
                    <span
                      className={`text-xs ${hasNumber ? "text-green-600" : "text-gray-500"}`}
                    >
                      Number
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Confirm Password Field */}
            <div className="mb-6">
              <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className={`w-full pl-10 pr-12 py-3 border bg-white focus:outline-none focus:border-[var(--dark-coffe)] transition-colors text-sm ${
                    confirmPassword && !passwordsMatch
                      ? "border-red-500"
                      : "border-[#ede8e0]"
                  }`}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {confirmPassword && !passwordsMatch && (
                <p className="text-xs text-red-500 mt-1">
                  Passwords do not match
                </p>
              )}
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
                  Creating Account...
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4" />
                  Create Account
                </>
              )}
            </Buttons.Primary>
          </form>

          {/* Login Link */}
          <div className="mt-6 pt-6 border-t border-[#ede8e0] text-center">
            <p className="text-sm text-gray-500 mb-3">
              Already have an account?
            </p>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-sm text-[var(--dark-coffe)] hover:underline"
            >
              Sign in to your account
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Benefits */}
        <div className="mt-6 p-4 bg-[#f5f1eb] border border-[#ede8e0]">
          <p className="text-xs uppercase tracking-wider text-center text-gray-500 mb-3">
            Benefits of joining
          </p>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <CheckCircle className="w-4 h-4 text-[var(--dark-coffe)]" />
              <span>Exclusive member discounts</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <CheckCircle className="w-4 h-4 text-[var(--dark-coffe)]" />
              <span>Early access to new collections</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <CheckCircle className="w-4 h-4 text-[var(--dark-coffe)]" />
              <span>Free shipping on orders over $50</span>
            </div>
          </div>
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

export default Register;
