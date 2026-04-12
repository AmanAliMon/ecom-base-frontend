import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import {
  User,
  Mail,
  Package,
  Heart,
  MapPin,
  LogOut,
  ChevronRight,
  Edit2,
  Save,
  X,
  ShoppingBag,
} from "lucide-react";

const getOrderStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case "delivered":
      return "bg-green-100 text-green-800";
    case "shipped":
      return "bg-blue-100 text-blue-800";
    case "processing":
      return "bg-yellow-100 text-yellow-800";
    case "cancelled":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const OrderItem = React.memo(({ order }) => (
  <div className="border border-[#ede8e0] p-4 hover:shadow-sm transition-shadow">
    <div className="flex flex-wrap justify-between items-start mb-3">
      <div>
        <p className="text-xs text-gray-400">
          Order #{order._id?.slice(-8) || order.id?.slice(-8)}
        </p>
        <p className="text-sm text-gray-500 mt-1">
          {order.createdAt
            ? new Date(order.createdAt).toLocaleDateString()
            : "Recent order"}
        </p>
      </div>
      <div
        className={`px-3 py-1 rounded-full text-xs font-medium ${getOrderStatusColor(order.status)}`}
      >
        {order.status || "Pending"}
      </div>
    </div>

    <div className="space-y-2 mb-3">
      {order.items?.slice(0, 2).map((item, idx) => (
        <div key={idx} className="flex justify-between text-sm">
          <span className="text-gray-600">
            {item.product?.name || item.name || "Product"} x{item.quantity}
          </span>
          <span className="text-[#1a1a1a]">
            ${((item.price || 0) * (item.quantity || 0)).toFixed(2)}
          </span>
        </div>
      ))}
      {order.items?.length > 2 && (
        <p className="text-xs text-gray-400">
          + {order.items.length - 2} more items
        </p>
      )}
    </div>

    <div className="flex justify-between items-center pt-3 border-t border-[#ede8e0]">
      <span className="font-medium text-[#1a1a1a]">
        Total: ${(order.total || 0).toFixed(2)}
      </span>
      <Link
        to={`/orders/${order._id || order.id}`}
        className="text-xs text-[var(--dark-coffe)] hover:underline flex items-center gap-1"
      >
        View Details <ChevronRight className="w-3 h-3" />
      </Link>
    </div>
  </div>
));

const Profile = () => {
  const { user, logout, loading: authLoading } = useAuth(); // Remove isAuthenticated
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("orders");
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [editedPhone, setEditedPhone] = useState("");
  const [editedAddress, setEditedAddress] = useState("");

  const ordersCount = useMemo(() => orders.length, [orders]);

  // Redirect if no user (after auth loads)
  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login");
    }
  }, [user, authLoading, navigate]);

  // Fetch orders - only if user exists
  useEffect(() => {
    const abortController = new AbortController();

    const fetchOrders = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setLoading(false);
          return;
        }

        const API_URL = process.env.REACT_APP_API_URL || "";
        const response = await axios.get(`${API_URL}/api/orders`, {
          headers: { Authorization: `Bearer ${token}` },
          signal: abortController.signal,
          timeout: 10000,
        });

        let ordersData = response.data;
        if (response.data.orders) ordersData = response.data.orders;
        if (response.data.success && response.data.orders)
          ordersData = response.data.orders;

        setOrders(Array.isArray(ordersData) ? ordersData : []);
      } catch (error) {
        if (error.name !== "AbortError" && error.name !== "CanceledError") {
          console.error("Error fetching orders:", error);
          setOrders([]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();

    return () => abortController.abort();
  }, [user]); // Only depend on user, not isAuthenticated

  // Load user profile data
  useEffect(() => {
    if (user) {
      setEditedName(user.name || "");
      setEditedPhone(user.phone || "");
      setEditedAddress(user.address || "");
    }
  }, [user]);

  const handleLogout = useCallback(() => {
    logout();
    navigate("/");
  }, [logout, navigate]);

  const handleSaveProfile = useCallback(async () => {
    // Here you would make API call to update profile
    setIsEditing(false);
    alert("Profile updated successfully!");
  }, []);

  // Show loading state while checking auth
  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-[var(--dark-coffe)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500 uppercase tracking-wider text-sm">
            Loading profile...
          </p>
        </div>
      </div>
    );
  }

  // If no user, don't render (will redirect)
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#faf8f5] py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-[11px] tracking-[3px] text-[var(--dark-coffe)] uppercase mb-2">
            My Account
          </p>
          <h1 className="text-3xl md:text-4xl font-light tracking-wide text-[#1a1a1a]">
            Profile
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-[#ede8e0] p-6 sticky top-24">
              <div className="text-center mb-6">
                <div className="w-24 h-24 mx-auto mb-3 rounded-full bg-[#f5f1eb] flex items-center justify-center">
                  <User className="w-12 h-12 text-[var(--dark-coffe)]" />
                </div>
                <h3 className="font-medium text-[#1a1a1a]">
                  {user?.name || user?.email?.split("@")[0] || "Customer"}
                </h3>
                <p className="text-xs text-gray-400 mt-1">{user?.email}</p>
              </div>

              <nav className="space-y-1">
                {[
                  { id: "orders", label: "My Orders", icon: Package },
                  { id: "profile", label: "Personal Info", icon: User },
                  { id: "addresses", label: "Addresses", icon: MapPin },
                  { id: "wishlist", label: "Wishlist", icon: Heart },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 text-sm transition-colors ${
                      activeTab === tab.id
                        ? "bg-[#f5f1eb] text-[var(--dark-coffe)]"
                        : "text-gray-600 hover:bg-[#f5f1eb] hover:text-[var(--dark-coffe)]"
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                    {tab.id === "orders" && ordersCount > 0 && (
                      <span className="ml-auto text-xs">({ordersCount})</span>
                    )}
                  </button>
                ))}
              </nav>

              <div className="border-t border-[#ede8e0] mt-6 pt-6">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            </div>
          </div>

          {/* Main Content - Orders Tab */}
          <div className="lg:col-span-3">
            {activeTab === "orders" && (
              <div className="bg-white border border-[#ede8e0] p-6">
                <h2 className="text-lg font-light tracking-wide text-[#1a1a1a] mb-6">
                  Order History {ordersCount > 0 && `(${ordersCount})`}
                </h2>

                {loading ? (
                  <div className="text-center py-12">
                    <div className="w-12 h-12 border-2 border-[var(--dark-coffe)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-500 text-sm">Loading orders...</p>
                  </div>
                ) : orders.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                    <p className="text-gray-500 mb-4">
                      You haven't placed any orders yet
                    </p>
                    <Link
                      to="/products"
                      className="inline-block px-6 py-2 bg-[var(--dark-coffe)] text-white text-sm uppercase tracking-wider hover:bg-opacity-90 transition-colors"
                    >
                      Start Shopping
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.slice(0, 5).map((order) => (
                      <OrderItem key={order._id || order.id} order={order} />
                    ))}
                    {orders.length > 5 && (
                      <div className="text-center pt-4">
                        <button className="text-sm text-[var(--dark-coffe)] hover:underline">
                          Load More Orders ({orders.length - 5} remaining)
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div className="bg-white border border-[#ede8e0] p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-light tracking-wide text-[#1a1a1a]">
                    Personal Information
                  </h2>
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center gap-2 text-sm text-[var(--dark-coffe)] hover:underline"
                    >
                      <Edit2 className="w-4 h-4" />
                      Edit
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={handleSaveProfile}
                        className="flex items-center gap-2 text-sm text-green-600 hover:underline"
                      >
                        <Save className="w-4 h-4" />
                        Save
                      </button>
                      <button
                        onClick={() => setIsEditing(false)}
                        className="flex items-center gap-2 text-sm text-red-600 hover:underline"
                      >
                        <X className="w-4 h-4" />
                        Cancel
                      </button>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1">
                      Email Address
                    </label>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <Mail className="w-4 h-4 text-gray-400" />
                      {user?.email}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1">
                      Full Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        className="w-full px-3 py-2 border border-[#ede8e0] focus:outline-none focus:border-[var(--dark-coffe)] text-sm"
                        placeholder="Enter your name"
                      />
                    ) : (
                      <p className="text-sm text-gray-700">
                        {user?.name || "Not specified"}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1">
                      Phone Number
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={editedPhone}
                        onChange={(e) => setEditedPhone(e.target.value)}
                        className="w-full px-3 py-2 border border-[#ede8e0] focus:outline-none focus:border-[var(--dark-coffe)] text-sm"
                        placeholder="Enter your phone number"
                      />
                    ) : (
                      <p className="text-sm text-gray-700">
                        {user?.phone || "Not specified"}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === "addresses" && (
              <div className="bg-white border border-[#ede8e0] p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-light tracking-wide text-[#1a1a1a]">
                    Saved Addresses
                  </h2>
                </div>

                <div className="border border-[#ede8e0] p-4">
                  {editedAddress ? (
                    <p className="text-sm text-gray-600 whitespace-pre-wrap">
                      {editedAddress}
                    </p>
                  ) : (
                    <p className="text-sm text-gray-400">
                      No address saved yet
                    </p>
                  )}
                  <button
                    onClick={() => setIsEditing(true)}
                    className="mt-3 text-sm text-[var(--dark-coffe)] hover:underline"
                  >
                    {editedAddress ? "Edit Address" : "Add Address"}
                  </button>
                </div>
              </div>
            )}

            {/* Wishlist Tab */}
            {activeTab === "wishlist" && (
              <div className="bg-white border border-[#ede8e0] p-6">
                <h2 className="text-lg font-light tracking-wide text-[#1a1a1a] mb-6">
                  My Wishlist
                </h2>

                <div className="text-center py-12">
                  <Heart className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p className="text-gray-500 mb-4">Your wishlist is empty</p>
                  <Link
                    to="/products"
                    className="inline-block px-6 py-2 bg-[var(--dark-coffe)] text-white text-sm uppercase tracking-wider hover:bg-opacity-90 transition-colors"
                  >
                    Explore Products
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
