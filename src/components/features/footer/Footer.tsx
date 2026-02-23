"use client";

import { Github, Linkedin, Youtube, Mail, MapPin } from "lucide-react";
import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white pt-24 pb-12 relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-20">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                {">_"} Tushar Vashishth
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Building scalable digital experiences with modern technologies.
              Always learning, always coding.
            </p>
            <div className="flex gap-4">
              <Link
                href="https://github.com/tusharvashishth"
                target="_blank"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Github className="w-5 h-5" />
              </Link>
              <Link
                href="https://linkedin.com/in/tusharvashishth"
                target="_blank"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </Link>
              <Link
                href="https://youtube.com/@tusharvashishth"
                target="_blank"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </Link>
            </div>

            <div className="pt-4 space-y-2">
              <a
                href="mailto:tusharvashisth4@gmail.com"
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4" /> tusharvashisth4@gmail.com
              </a>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <MapPin className="w-4 h-4" /> Greater Noida, India
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-white/10 mb-12"></div>

        {/* Big Text */}
        <div className="relative flex justify-center items-center mb-12 select-none overflow-hidden">
          <h1 className="text-[10vw] md:text-[11vw] font-black leading-none text-white/5 tracking-tighter whitespace-nowrap">
            TUSHAR VASHISHTH
          </h1>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-sm text-gray-500">
          <p>&copy; {currentYear} Tushar Vashishth. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
