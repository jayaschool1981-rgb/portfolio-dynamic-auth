import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ On mount, check if token exists
  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");

    if (token && username) {
      setUser({ username });
    }
    setLoading(false);
  }, []);

  // ✅ Login — store JWT in localStorage
  const login = ({ username, token }) => {
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
    setUser({ username });
  };

  // ✅ Logout — clear everything
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
