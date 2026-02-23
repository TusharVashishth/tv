"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Youtube } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col md:flex-row items-center justify-between gap-12 px-6 py-20 max-w-7xl mx-auto overflow-hidden">
      {/* Text Content (Left Side) - Content First on Mobile */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex-1 text-center md:text-left space-y-8 z-10 order-1"
      >
        <div className="inline-block px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300 backdrop-blur-sm shadow-sm">
          #Software Engineer
        </div>

        <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white leading-[0.95]">
          Tushar <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            Vashishth
          </span>
        </h1>

        <p className="text-xl text-gray-400 leading-relaxed max-w-2xl font-medium">
          Tech Lead & Software Engineer. I build{" "}
          <span className="text-white">
            "Secure, High-Performance Architectures"
          </span>{" "}
          with Node.js, Next.js, and AWS. Transforming complex problems into
          elegant solutions.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-6 pt-4 justify-center md:justify-start">
          <div className="flex gap-4 items-center">
            <Link
              href="https://github.com/tusharvashishth"
              target="_blank"
              className="p-3 bg-white/5 rounded-full hover:bg-white/10 border border-white/10 transition-all hover:border-purple-500/50 hover:scale-110"
            >
              <Github className="w-6 h-6 text-white" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/tushar-vashishth-b15998172"
              target="_blank"
              className="p-3 bg-white/5 rounded-full hover:bg-white/10 border border-white/10 transition-all hover:border-blue-500/50 hover:scale-110"
            >
              <Linkedin className="w-6 h-6 text-white" />
            </Link>
            <Link
              href="https://youtube.com/@codingwithtushar?si=ixmhhl3LzPBt-L1v"
              target="_blank"
              className="p-3 bg-white/5 rounded-full hover:bg-white/10 border border-white/10 transition-all hover:border-red-500/50 hover:scale-110"
            >
              <Youtube className="w-6 h-6 text-white" />
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Image Side (Right Side) - Image second and smaller on mobile */}
      <div className="relative group flex-1 flex justify-center md:justify-end mt-12 md:mt-0 order-2">
        {/* Warm Lamp Effect - Top Right Glow that follows background */}
        <div className="absolute -top-20 -right-20 w-[600px] h-[600px] bg-orange-500/20 rounded-full blur-[150px] -z-20 pointer-events-none hidden md:block animate-pulse-slow"></div>
        <div className="absolute top-0 right-0 w-80 h-80 bg-orange-400/30 rounded-full blur-[100px] -z-10 mix-blend-screen pointer-events-none hidden md:block"></div>

        {/* Warm Light Effect - Golden/Orange Glow behind subject */}
        <div className="absolute top-1/4 left-10 w-80 h-80 bg-orange-500/30 rounded-full blur-[120px] -z-10 mix-blend-screen opacity-80 pointer-events-none"></div>
        <div className="absolute -top-10 right-10 w-60 h-60 bg-purple-500/20 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative z-10"
        >
          <div className="relative">
            <Image
              src="/me.webp"
              width={550}
              height={550}
              alt="Tushar Vashishth"
              className="w-[280px] md:w-[550px] object-contain drop-shadow-2xl relative z-10 mask-image-gradient-bottom"
              priority
              style={{ filter: "drop-shadow(0 0 20px rgba(0,0,0,0.5))" }}
            />
            {/* Gradient Mask to fade bottom of image into black */}
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black via-black/80 to-transparent z-20 pointer-events-none"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
