import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthProvider";

// ✅ API base URL (local + deployed)
const API_BASE_URL =
  import.meta.env.VITE_API_BASE || "http://localhost:3000/api";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  // ==========================
  // HANDLE INPUT CHANGE
  // ==========================
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ==========================
  // HANDLE SUBMIT
  // ==========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      return setMessage("⚠️ Please fill all fields");
    }

    setMessage("");
    setLoading(true);

    try {
      const res = await axios.post(
        `${API_BASE_URL}/login`,
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const { token, user } = res.data;

      // ✅ SAFETY CHECK (VERY IMPORTANT)
      if (!user) {
        throw new Error("User data missing from server");
      }

      login({
        username: user.name || "User", // fallback safety
        token: token,
      });

      setMessage("✅ Login successful!");

      navigate("/dashboard");

    } catch (err) {
      console.error("❌ Login error:", err);

      const errorMsg =
        err.response?.data?.message ||
        err.message ||
        "Something went wrong";

      setMessage(`❌ ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-black px-4">

      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-white/10">

        {/* TITLE */}
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Welcome Back 👋
        </h2>

        {/* MESSAGE */}
        {message && (
          <p className="text-center text-sm mb-4 text-yellow-300">
            {message}
          </p>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* EMAIL */}
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          {/* PASSWORD */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition-all duration-200 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* FOOTER */}
        <p className="text-center text-xs text-gray-400 mt-6">
          Secure login powered by JWT 🔐
        </p>
      </div>
    </div>
  );
}