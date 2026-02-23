"use client";

import { motion } from "framer-motion";
import {
  Code2,
  Database,
  Server,
  Cloud,
  Cpu,
  Layers,
  Terminal,
  Globe,
  Box,
  Workflow,
} from "lucide-react";

const skills = [
  {
    name: "Node.js",
    icon: Server,
    radius: "8rem",
    duration: "15s",
    delay: "0s",
  },
  {
    name: "Next.js",
    icon: Globe,
    radius: "8rem",
    duration: "15s",
    delay: "-7.5s",
  },
  {
    name: "TypeScript",
    icon: Code2,
    radius: "13rem",
    duration: "25s",
    delay: "0s",
  },
  {
    name: "AWS",
    icon: Cloud,
    radius: "13rem",
    duration: "25s",
    delay: "-8.3s",
  },
  {
    name: "Docker",
    icon: Box,
    radius: "13rem",
    duration: "25s",
    delay: "-16.6s",
  },
  {
    name: "PostgreSQL",
    icon: Database,
    radius: "18rem",
    duration: "35s",
    delay: "0s",
  },
  {
    name: "Redis",
    icon: Layers,
    radius: "18rem",
    duration: "35s",
    delay: "-8.75s",
  },
  {
    name: "GraphQL",
    icon: Workflow,
    radius: "18rem",
    duration: "35s",
    delay: "-17.5s",
  },
  {
    name: "Generative AI",
    icon: Cpu,
    radius: "18rem",
    duration: "35s",
    delay: "-26.25s",
  },
];

export function Skills() {
  return (
    <section className="py-24 px-6 max-w-6xl mx-auto flex flex-col items-center justify-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-4">
          Skills & Technologies
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          A universe of tools and technologies I use to build scalable,
          high-performance applications.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative w-full max-w-[800px] aspect-square flex items-center justify-center"
      >
        <div className="orbit-scene">
          {/* Center Sun */}
          <div className="orbit-center z-10">
            <Terminal className="w-10 h-10 text-white" />
          </div>

          {/* Orbit Rings */}
          <div
            className="orbit-ring"
            style={{ width: "16rem", height: "16rem" }}
          ></div>
          <div
            className="orbit-ring"
            style={{ width: "26rem", height: "26rem" }}
          ></div>
          <div
            className="orbit-ring"
            style={{ width: "36rem", height: "36rem" }}
          ></div>

          {/* Planets (Skills) */}
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <div
                key={index}
                className="orbit-item"
                style={
                  {
                    "--orbit-duration": skill.duration,
                    "--orbit-delay": skill.delay,
                  } as React.CSSProperties
                }
              >
                <div
                  className="orbit-planet group relative cursor-pointer hover:scale-110 transition-transform"
                  style={
                    {
                      "--orbit-radius": skill.radius,
                      "--orbit-duration": skill.duration,
                    } as React.CSSProperties
                  }
                >
                  <Icon className="w-5 h-5 text-purple-200" />

                  {/* Tooltip */}
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900/90 text-purple-100 text-xs px-3 py-1.5 rounded-md whitespace-nowrap border border-purple-500/30 pointer-events-none">
                    {skill.name}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
