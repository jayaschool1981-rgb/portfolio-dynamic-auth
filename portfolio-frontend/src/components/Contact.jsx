'use client';
import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope, FaInstagram, FaFacebook, FaPhoneAlt } from "react-icons/fa";

export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-transparent relative overflow-hidden">
      <div className="max-w-5xl mx-auto text-center px-6 md:px-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold mb-6"
        >
          Let’s Connect
        </motion.h2>

        <p className="text-gray-400 max-w-2xl mx-auto mb-10">
          I’m open to collaborations, freelance opportunities, or AI-driven projects.  
          Let’s build something intelligent together.
        </p>

        {/* Contact Icons */}
        <div className="flex justify-center flex-wrap gap-8">
          {/* GitHub */}
          <a
            href="https://github.com/jayaschool1981-rgb"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-cyan-400 transition transform hover:scale-110"
            title="GitHub"
          >
            <FaGithub size={32} />
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/om-barvekar-88185629a/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-violet-400 transition transform hover:scale-110"
            title="LinkedIn"
          >
            <FaLinkedin size={32} />
          </a>

          {/* Gmail */}
          <a
            href="mailto:ombarvekar64@gmail.com"
            className="text-gray-400 hover:text-cyan-400 transition transform hover:scale-110"
            title="Gmail"
          >
            <FaEnvelope size={32} />
          </a>

          {/* Phone */}
          <a
            href="tel:+918830196250"
            className="text-gray-400 hover:text-violet-400 transition transform hover:scale-110"
            title="Call Me"
          >
            <FaPhoneAlt size={30} />
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/barvekaromjalindar/?hl=en"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-pink-400 transition transform hover:scale-110"
            title="Instagram"
          >
            <FaInstagram size={32} />
          </a>

          {/* Facebook */}
          <a
            href="https://www.facebook.com/om.baravekar/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-400 transition transform hover:scale-110"
            title="Facebook"
          >
            <FaFacebook size={32} />
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-20 border-t border-gray-700/40 py-6 text-center text-sm text-gray-500">
        <p>
          © {new Date().getFullYear()} <span className="text-white font-medium">Om Barvekar</span> |
          Built with <span className="text-cyan-400">Next.js</span>, <span className="text-violet-400">Tailwind</span> & ❤️
        </p>
      </footer>

      {/* Background Gradient Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-r from-cyan-500/10 via-violet-500/10 to-blue-500/10 rounded-full blur-3xl opacity-50 pointer-events-none animate-pulse"></div>
    </section>
  );
}
