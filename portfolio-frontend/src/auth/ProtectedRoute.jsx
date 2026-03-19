import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useContext(AuthContext);

  // ==========================
  // ⏳ SHOW LOADING STATE
  // ==========================
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 to-purple-900 text-white">
        <div className="animate-pulse text-xl font-semibold">
          Checking authentication...
        </div>
      </div>
    );
  }

  // ==========================
  // 🔐 REDIRECT IF NOT LOGGED IN
  // ==========================
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // ==========================
  // ✅ ALLOW ACCESS
  // ==========================
  return children;
}