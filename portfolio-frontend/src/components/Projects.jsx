'use client';
import React from "react";
import { motion } from "framer-motion";

export default function Projects() {
  const projects = [
    {
      title: "AI-Based Autonomous Navigation System",
      desc: "An AI-powered robotic navigation system using Raspberry Pi and NVIDIA Jetson Nano. It integrates YOLO object detection, lane detection (OpenCV), ultrasonic obstacle sensing, and A* path planning for autonomous movement.",
      tech: ["Python", "YOLO", "OpenCV", "TensorFlow", "Jetson Nano"],
      link: "https://github.com/jayaschool1981-rgb/AI-Based-Autonomous-Navigation-System",
      image: "/projects/AI-navigation.webp",
    },
    {
      title: "VybeRide",
      desc: "A JavaFX-based intelligent ride-sharing app with secure authentication, dynamic ride-matching, and Firebase integration for real-time data sync.",
      tech: ["Java", "JavaFX", "Firebase"],
      link: "https://github.com/jayaschool1981-rgb/VybeRide-JavaFX",
      image: "/projects/VIBERIDE.jpg",
    },
    {
      title: "Accident Alert Server",
      description:
        "A real-time accident alert and emergency response server built using Node.js and Express. It processes IoT crash sensor data, triggers instant alerts via APIs, and integrates with SMS/GPS systems for faster emergency handling.",
      link: "https://github.com/jayaschool1981-rgb/accident-alert-server",
      image: "/projects/car-accident.jpeg",
      tech: ["Node.js", "Express.js", "IoT", "API", "Emergency System"], // ✅ renamed
    },



  ];

  return (
    <section id="projects" className="max-w-6xl mx-auto px-6 md:px-12 py-16">
      <h2 className="text-3xl font-bold mb-8">Projects</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((p, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -6 }}
            className="glass p-5 rounded-xl border border-violet-400/20 hover:border-cyan-400/40 transition"
          >
            <div className="relative w-full h-56 overflow-hidden rounded-lg mb-4">
              <img
                src={p.image}
                alt={p.title}
                className="object-cover w-full h-full opacity-90 hover:opacity-100 transition"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-70"></div>
            </div>

            <h3 className="text-xl font-semibold text-cyan-300">{p.title}</h3>
            <p className="text-gray-400 mt-2">{p.desc}</p>

            <div className="mt-3 flex gap-2 flex-wrap">
              {p.tech.map((t, idx) => (
                <span
                  key={idx}
                  className="text-xs bg-slate-800 px-2 py-1 rounded-md border border-slate-600"
                >
                  {t}
                </span>
              ))}
            </div>

            <a
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-sm text-cyan-400 hover:underline"
            >
              View on GitHub →
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
