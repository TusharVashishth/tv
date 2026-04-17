"use client";

import { Github, Linkedin, Youtube, Mail, MapPin } from "lucide-react";
import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background text-foreground pt-20 pb-10 relative overflow-hidden border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="text-2xl font-bold text-primary">
                {">_"} Tushar Vashishth
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Tech Lead building secure and scalable products with Next.js,
              Node.js, AWS, and modern cloud architecture.
            </p>
            <div className="flex gap-4">
              <Link
                href="https://github.com/tusharvashishth"
                target="_blank"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="w-5 h-5" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/tushar-vashishth-b15998172"
                target="_blank"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </Link>
              <Link
                href="https://www.youtube.com/@tushar.vashishth"
                target="_blank"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Quick Links</h3>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link
                href="#"
                className="hover:text-foreground transition-colors"
              >
                Home
              </Link>
              <Link
                href="#projects"
                className="hover:text-foreground transition-colors"
              >
                Projects
              </Link>
              <Link
                href="#"
                className="hover:text-foreground transition-colors"
              >
                Skills
              </Link>
              <Link
                href="#"
                className="hover:text-foreground transition-colors"
              >
                YouTube
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Focus Areas</h3>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <span>System Design</span>
              <span>Cloud Architecture (AWS)</span>
              <span>Next.js & Node.js</span>
              <span>Fintech & AI Solutions</span>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Contact</h3>
            <div className="space-y-2">
              <a
                href="mailto:tusharvashisth4@gmail.com"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="w-4 h-4" /> tusharvashisth4@gmail.com
              </a>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" /> Greater Noida, India
              </div>
              <a
                href="https://www.youtube.com/@tushar.vashishth"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Youtube className="w-4 h-4" /> tushar.vashishth
              </a>
            </div>
          </div>
        </div>

        <div className="h-px w-full bg-border mb-12"></div>

        <div className="relative flex justify-center items-center mb-10 select-none overflow-hidden">
          <h1 className="text-[8vw] md:text-[8vw] lg:text-[6vw] font-black leading-none text-primary/10 dark:text-primary/20 tracking-tighter whitespace-nowrap">
            TUSHAR VASHISHTH
          </h1>
          <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent"></div>
        </div>

        <div className="flex  justify-center items-center gap-4 text-sm text-muted-foreground">
          <p>&copy; {currentYear} Tushar Vashishth. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
