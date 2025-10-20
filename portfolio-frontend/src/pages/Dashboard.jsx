import React from "react";
import Navbar from "../components/Navbar"; // ✅ add this line
import Hero from "../components/Hero";
import Projects from "../components/Projects";
import Skills from "../components/Skills";
import Contact from "../components/Contact";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-darkbg text-white relative overflow-hidden">
      <Navbar />   {/* ✅ Navbar appears at top */}
      <Hero />
      <Projects />
      <Skills />
      <Contact />
    </div>
  );
}
