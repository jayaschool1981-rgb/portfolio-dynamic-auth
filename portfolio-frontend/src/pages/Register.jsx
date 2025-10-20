import React, { useState } from "react";

// ✅ Password validation regex (secure)
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;

// ✅ Automatically detects backend (local or deployed)
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "https://portfolio-dynamic-auth.onrender.com";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // ✅ Password validation
    if (!PASSWORD_REGEX.test(password)) {
      setError(
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character."
      );
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Registration failed");

      setSuccess("✅ Registered successfully! You can now log in.");
      setUsername("");
      setPassword("");
    } catch (err) {
      setError(err.message || "Something went wrong");
    }
  }

  return (
    <div className="register-page min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-900 to-purple-900 text-white">
      <h2 className="text-3xl font-bold mb-6">Create Your Account</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-96 space-y-4"
      >
        <label className="block text-sm font-medium text-gray-300">
          Username
        </label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none"
          placeholder="Enter username"
          required
        />

        <label className="block text-sm font-medium text-gray-300">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none"
          placeholder="Enter password"
          required
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition-all"
        >
          Register
        </button>

        {error && <p className="text-red-400 text-center">{error}</p>}
        {success && <p className="text-green-400 text-center">{success}</p>}
      </form>
    </div>
  );
}
