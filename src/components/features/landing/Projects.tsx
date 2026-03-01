"use client";

import { motion } from "framer-motion";
import { GitFork, Star, Laptop2 } from "lucide-react";
import Link from "next/link";

const projects = [
  {
    title: "Threads_clone",
    description: "Threads clone built with full-stack TypeScript architecture.",
    language: "TypeScript",
    languageColor: "bg-sky-500",
    stars: 18,
    forks: 5,
    github: "https://github.com/tusharvashishth/Threads_clone",
  },
  {
    title: "Nextjs_Authentication",
    description:
      "Production-ready Next.js authentication flow and auth utilities.",
    language: "TypeScript",
    languageColor: "bg-sky-500",
    stars: 14,
    forks: 9,
    github: "https://github.com/tusharvashishth/Nextjs_Authentication",
  },
  {
    title: "threads_app_clone",
    description: "Mobile-first social feed clone with real-time interactions.",
    language: "Dart",
    languageColor: "bg-cyan-500",
    stars: 7,
    forks: 7,
    github: "https://github.com/tusharvashishth/threads_app_clone",
  },
  {
    title: "daily-dev-clone",
    description:
      "Daily.dev style experience with Laravel + Next.js and Reverb realtime updates.",
    language: "PHP",
    languageColor: "bg-indigo-500",
    stars: 36,
    forks: 20,
    github: "https://github.com/tusharvashishth/daily-dev-clone",
  },
  {
    title: "Devops",
    description:
      "CI/CD deployment workflow for shipping full-stack projects to production.",
    language: "YAML",
    languageColor: "bg-emerald-500",
    stars: 15,
    forks: 16,
    github: "https://github.com/tusharvashishth/Devops",
  },
];

export function Projects() {
  return (
    <section id="projects" className="py-2 px-6 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4 flex items-center gap-4">
          <Laptop2 className="w-10 h-10" />
          Open Source Projects
        </h2>
        <p className="text-muted-foreground max-w-2xl text-lg">
          GitHub-style pinned repositories view.
        </p>
      </motion.div>

      <div className="rounded-2xl border border-border bg-card p-5 md:p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-xl font-semibold">Pinned</h3>
          <Link
            href="https://github.com/tusharvashishth?tab=repositories"
            target="_blank"
            className="text-sm text-primary hover:underline"
          >
            View all repos
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((project) => (
            <article
              key={project.title}
              className="rounded-xl border border-border p-4 bg-background/60"
            >
              <div className="flex items-center justify-between gap-3">
                <Link
                  href={project.github}
                  target="_blank"
                  className="font-semibold text-primary hover:underline"
                >
                  {project.title}
                </Link>
                <span className="text-xs rounded-full px-2 py-0.5 border border-border text-muted-foreground">
                  Public
                </span>
              </div>

              <p className="text-sm text-muted-foreground mt-2 min-h-10">
                {project.description}
              </p>

              <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-2">
                  <span
                    className={`size-2.5 rounded-full ${project.languageColor}`}
                  />
                  {project.language}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Star className="size-3.5" />
                  {project.stars}
                </span>
                <span className="inline-flex items-center gap-1">
                  <GitFork className="size-3.5" />
                  {project.forks}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
