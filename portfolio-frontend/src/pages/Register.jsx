import React, { useState } from "react";

// 🔐 Strong password regex
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;

// ✅ API base (same as login)
const API_BASE_URL =
  import.meta.env.VITE_API_BASE || "http://localhost:3000/api";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // ==========================
  // HANDLE INPUT
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

    const { name, email, password } = formData;

    setError("");
    setSuccess("");

    // ✅ Basic validation
    if (!name || !email || !password) {
      return setError("⚠️ All fields are required");
    }

    // ✅ Password validation
    if (!PASSWORD_REGEX.test(password)) {
      return setError(
        "Password must be 8+ chars with uppercase, lowercase, number & special character"
      );
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      }

      setSuccess("✅ Registered successfully! Redirecting to login...");

      // Reset form
      setFormData({
        name: "",
        email: "",
        password: "",
      });

      // Redirect to login
      setTimeout(() => {
        window.location.href = "/login";
      }, 1200);

    } catch (err) {
      console.error("❌ Register error:", err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-black px-4">
      
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-white/10">
        
        {/* TITLE */}
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Create Your Account 🚀
        </h2>

        {/* ERROR */}
        {error && (
          <p className="text-center text-sm mb-4 text-red-400">{error}</p>
        )}

        {/* SUCCESS */}
        {success && (
          <p className="text-center text-sm mb-4 text-green-400">{success}</p>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* NAME */}
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

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
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {/* FOOTER */}
        <p className="text-center text-xs text-gray-400 mt-6">
          Secure signup with encrypted password 🔐
        </p>
      </div>
    </div>
  );
}