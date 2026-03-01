"use client";

import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";

interface AnimatedThemeTogglerProps {
  className?: string;
}

export function AnimatedThemeToggler({ className }: AnimatedThemeTogglerProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
      className={cn(
        "relative inline-flex h-10 w-20 items-center rounded-full border border-border bg-muted p-1 transition-colors",
        className,
      )}
    >
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className={cn(
          "absolute h-8 w-8 rounded-full bg-background shadow-sm",
          isDark ? "translate-x-10" : "translate-x-0",
        )}
      />

      <span className="relative z-10 flex w-full items-center justify-between px-1 text-muted-foreground">
        <Sun
          className={cn(
            "h-4 w-4 transition-opacity",
            isDark ? "opacity-50" : "opacity-100",
          )}
        />
        <Moon
          className={cn(
            "h-4 w-4 transition-opacity",
            isDark ? "opacity-100" : "opacity-50",
          )}
        />
      </span>
    </button>
  );
}
