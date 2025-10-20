import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthProvider";

// ✅ Automatically detect environment
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "https://portfolio-dynamic-auth.onrender.com";

export default function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      // ✅ Use dynamic backend URL
      const res = await axios.post(`${API_BASE_URL}/api/login`, formData);

      if (res.data.success) {
        setMessage("✅ Login successful! Redirecting...");

        // ✅ Save user in global context
        login({
          username: res.data.username,
          token: res.data.token,
        });

        setTimeout(() => navigate("/dashboard"), 1000);
      } else {
        setMessage(res.data.message || "Invalid credentials");
      }
    } catch (err) {
      console.error("❌ Login error:", err);
      setMessage(err.response?.data?.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 to-purple-900">
      <div className="bg-white/10 backdrop-blur-md p-10 rounded-2xl shadow-2xl w-96">
        <h2 className="text-3xl font-bold text-white text-center mb-8">
          Welcome Back 👋
        </h2>

        {message && (
          <p className="text-center text-sm text-yellow-300 mb-4">{message}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition-all disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
