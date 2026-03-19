import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Projects from "../components/Projects";
import Skills from "../components/Skills";
import Contact from "../components/Contact";
import { AuthContext } from "../auth/AuthProvider";

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 to-purple-900 text-white relative overflow-hidden">

      {/* 🔝 Navbar */}
      <Navbar />

      {/* 👤 Welcome Banner */}
      <div className="flex justify-between items-center px-8 py-4 bg-white/10 backdrop-blur-md border-b border-white/10">
        <h2 className="text-lg md:text-xl font-semibold">
          Welcome, <span className="text-indigo-300">{user?.username || "User"}</span> 👋
        </h2>

        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-sm font-medium transition-all"
        >
          Logout
        </button>
      </div>

      {/* 🧠 Main Content */}
      <main className="space-y-16 px-4 md:px-8 py-10">
        <Hero />
        <Projects />
        <Skills />
        <Contact />
      </main>

      {/* 🔻 Footer */}
      <footer className="text-center text-sm text-gray-400 py-6 border-t border-white/10">
        © {new Date().getFullYear()} Om Barvekar • All rights reserved
      </footer>
    </div>
  );
}