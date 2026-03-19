import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ==========================
  // ✅ LOAD USER FROM STORAGE
  // ==========================
  useEffect(() => {
  try {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser && storedUser !== "undefined") {
      setUser(JSON.parse(storedUser));
    }
  } catch (error) {
    console.error("Auth load error:", error);
    localStorage.removeItem("user"); // cleanup bad data
  } finally {
    setLoading(false);
  }
}, []);

  // ==========================
  // ✅ LOGIN FUNCTION
  // ==========================
  const login = ({ token, user }) => {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user)); // ✅ FIX
  setUser(user);
};

  // ==========================
  // ✅ LOGOUT FUNCTION
  // ==========================
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}