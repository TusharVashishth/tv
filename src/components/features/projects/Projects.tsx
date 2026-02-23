"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink, FolderGit2 } from "lucide-react";
import Link from "next/link";

const projects = [
  {
    title: "AI-powered Support Bot",
    description:
      "Developed an intelligent bot using Node.js and OpenAI's tool-calling capabilities to provide real-time, data-driven answers to user queries.",
    tech: ["Node.js", "OpenAI", "Vercel SDK", "TypeScript"],
    github: "https://github.com/tusharvashishth",
    live: "#",
  },
  {
    title: "Fintech Payment Gateway",
    description:
      "Architected real-money fintech payment platforms from the ground up, managing up to 1M+ monthly transactions with 99.99% uptime.",
    tech: ["Next.js", "AWS", "Redis", "PostgreSQL"],
    github: "https://github.com/tusharvashishth",
    live: "#",
  },
  {
    title: "Doctor Appointment App",
    description:
      "Developed a doctor appointment application enabling users to schedule, book appointments, and connect with doctors via video calls.",
    tech: ["React", "Node.js", "WebRTC", "MongoDB"],
    github: "https://github.com/tusharvashishth",
    live: "#",
  },
  {
    title: "E-commerce Platform",
    description:
      "Enhanced the user checkout experience in an existing Laravel-based e-commerce platform, resulting in a 30% improvement in overall accessibility.",
    tech: ["Laravel", "PHP", "MySQL", "Vue.js"],
    github: "https://github.com/tusharvashishth",
    live: "#",
  },
];

export function Projects() {
  return (
    <section className="py-24 px-6 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-4 flex items-center gap-4">
          <FolderGit2 className="w-10 h-10 text-purple-400" />
          Open Source Projects
        </h2>
        <p className="text-gray-400 max-w-2xl text-lg">
          A collection of projects I&apos;ve built, ranging from AI bots to
          scalable fintech platforms.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_40px_-10px_rgba(168,85,247,0.2)]"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-purple-500/10 rounded-xl text-purple-400">
                <FolderGit2 className="w-8 h-8" />
              </div>
              <div className="flex gap-4">
                <Link
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-purple-400 transition-colors"
                >
                  <Github className="w-6 h-6" />
                </Link>
                <Link
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-purple-400 transition-colors"
                >
                  <ExternalLink className="w-6 h-6" />
                </Link>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors">
              {project.title}
            </h3>
            <p className="text-gray-400 mb-8 line-clamp-3 leading-relaxed">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-3 mt-auto">
              {project.tech.map((tech, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-sm font-medium text-purple-200/80 bg-purple-500/10 rounded-full border border-purple-500/20"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
