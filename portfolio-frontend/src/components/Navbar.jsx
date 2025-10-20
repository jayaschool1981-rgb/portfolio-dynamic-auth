import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthProvider";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/30 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between text-white">
        <h1 className="text-lg md:text-xl font-bold tracking-wide">
          Om Barvekar <span className="text-cyan-400">Portfolio</span>
        </h1>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <a href="#projects" className="hover:text-cyan-400 transition">
            Projects
          </a>
          <a href="#skills" className="hover:text-cyan-400 transition">
            Skills
          </a>
          <a href="#contact" className="hover:text-cyan-400 transition">
            Contact
          </a>

          {user && (
            <div className="flex items-center gap-3">
              <span className="text-gray-300 text-sm">👋 {user.username}</span>
              <button
                onClick={handleLogout}
                className="ml-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm font-semibold transition shadow-md hover:shadow-red-500/30"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
