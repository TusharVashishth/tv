"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Youtube } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { AuroraText } from "@/components/ui/aurora-text";
import { Meteors } from "@/components/ui/meteors";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

export function Hero() {
  return (
    <section className="relative max-w-7xl mx-auto px-6 py-10 md:py-14">
      <div className="relative overflow-hidden rounded-3xl border border-border bg-card/60 p-6 md:p-10 lg:p-12">
        <Meteors number={20} className="opacity-40" />

        <div className="relative z-10 mb-10 flex items-center justify-between">
          <span className="text-3xl font-black text-primary">TV</span>
          <AnimatedThemeToggler duration={1000} />
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 items-center gap-10 lg:gap-14">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="space-y-6 text-center lg:text-left order-1"
          >
            <p className="text-xl text-muted-foreground">- Hi 👋 I'm</p>

            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[0.95]">
              Tushar
              <br />
              <AuroraText
                colors={["#7c3aed", "#8b5cf6", "#a855f7", "#c084fc", "cyan"]}
              >
                Vashishth
              </AuroraText>
            </h1>

            <h2 className="text-2xl md:text-3xl font-semibold leading-tight">
              Tech Lead & Full-Stack Engineer
            </h2>

            <p className="text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0">
              I architect secure, high-performance systems with Node.js,
              Next.js, AWS, and AI workflows—shipping products that scale to
              millions of monthly transactions with reliability first.
            </p>

            <div className="flex items-center justify-center lg:justify-start gap-4 text-muted-foreground">
              <Link
                href="https://github.com/tusharvashishth"
                target="_blank"
                className="transition-colors hover:text-foreground"
              >
                <Github className="w-8 h-8" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/tushar-vashishth-b15998172"
                target="_blank"
                className="transition-colors hover:text-foreground"
              >
                <Linkedin className="w-8 h-8" />
              </Link>
              <Link
                href="https://youtube.com/@codingwithtushar?si=ixmhhl3LzPBt-L1v"
                target="_blank"
                className="transition-colors hover:text-foreground"
              >
                <Youtube className="w-8 h-8" />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="relative flex items-end justify-center order-2"
          >
            <div className="absolute inset-x-8 -bottom-8 h-40 bg-primary/25 blur-[90px] rounded-full pointer-events-none" />
            <Image
              src="/me.webp"
              width={650}
              height={760}
              alt="Tushar Vashishth"
              className="w-75 md:w-full max-w-140 object-contain relative z-10"
              priority
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
