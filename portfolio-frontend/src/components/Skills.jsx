'use client';
import React from "react";
import { motion } from "framer-motion";
import { FaReact, FaNodeJs, FaAws, FaJava, FaPython, FaGitAlt, FaDatabase } from "react-icons/fa";
import { SiMongodb, SiTensorflow, SiKeras, SiHtml5, SiCss3, SiJavascript } from "react-icons/si";

export default function Skills() {
  const skills = [
    { name: "AI & ML", icon: <SiTensorflow size={26} />, desc: "Deep learning, ML model building, TensorFlow, Keras" },
    { name: "Python", icon: <FaPython size={26} />, desc: "Scripting, automation, Flask, APIs" },
    { name: "Java", icon: <FaJava size={26} />, desc: "OOP, GUI apps (JavaFX), backend logic" },
    { name: "React.js", icon: <FaReact size={26} />, desc: "Frontend with hooks, routing, responsive design" },
    { name: "Node.js", icon: <FaNodeJs size={26} />, desc: "Express backend, REST APIs" },
    { name: "MongoDB", icon: <SiMongodb size={26} />, desc: "NoSQL database design & queries" },
    { name: "AWS & Cloud", icon: <FaAws size={26} />, desc: "EC2, S3, deployment & scaling" },
    { name: "HTML / CSS / JS", icon: <SiHtml5 size={26} />, desc: "Modern web layouts & responsive UI" },
    { name: "Git & GitHub", icon: <FaGitAlt size={26} />, desc: "Version control, branching, CI/CD" },
    { name: "Database Systems", icon: <FaDatabase size={26} />, desc: "SQL, normalization, analytics" },
  ];

  return (
    <section id="skills" className="max-w-6xl mx-auto px-6 md:px-12 py-16">
      <h2 className="text-3xl font-bold mb-8">Skills</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {skills.map((s, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="glass p-6 rounded-lg flex flex-col gap-3 border border-cyan-400/10 hover:border-cyan-400/30 transition"
          >
            <div className="text-cyan-400">{s.icon}</div>
            <h3 className="font-semibold">{s.name}</h3>
            <p className="text-sm text-gray-400">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
