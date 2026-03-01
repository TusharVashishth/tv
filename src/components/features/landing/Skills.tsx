"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Marquee } from "@/components/ui/marquee";
import { ShineBorder } from "../../ui/shine-border";

const skills = [
  "Node.js",
  "Next.js",
  "TypeScript",
  "AWS",
  "Docker",
  "PostgreSQL",
  "Redis",
  "GraphQL",
  "Generative AI",
  "System Design",
  "CI/CD",
  "Microservices",
];

const projects = [
  "Threads_clone",
  "Support Agent",
  "threads_app_clone",
  "daily-dev-clone",
  "Devops",
];

const commandBriefs = [
  { command: "help", description: "Show all available commands" },
  { command: "profile", description: "See Tushar's details" },
  { command: "skills", description: "List technical skills" },
  { command: "projects", description: "List highlighted projects" },
  { command: "experiences", description: "Career summary" },
  { command: "focus", description: "Current focus areas" },
  { command: "contact", description: "Email and location" },
  { command: "socials", description: "GitHub, LinkedIn, YouTube" },
  { command: "achievements", description: "Impact highlights" },
  { command: "clear", description: "Clear terminal output" },
];

const knownCommands = commandBriefs.map((item) => item.command);

type TerminalLine = {
  id: number;
  text: string;
  tone: "input" | "output" | "accent" | "error";
};

const fallbackLines = [
  "That command is so secret even I forgot to deploy it.",
  "Command not found. My keyboard says try `help` before we panic.",
  "Nice try. Even `sudo` cannot unlock that command here.",
  "I checked with production. It also said: nope.",
];

export function Skills() {
  const [terminalLines, setTerminalLines] = useState<TerminalLine[]>([]);
  const [streamQueue, setStreamQueue] = useState<TerminalLine[]>([]);
  const [activeLine, setActiveLine] = useState<TerminalLine | null>(null);
  const [activeWordCount, setActiveWordCount] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyCursor, setHistoryCursor] = useState<number>(-1);
  const lineIdRef = useRef(0);
  const terminalBodyRef = useRef<HTMLDivElement | null>(null);
  const hasBootedRef = useRef(false);

  const nextLineId = () => {
    lineIdRef.current += 1;
    return lineIdRef.current;
  };

  const queueLines = (lines: Omit<TerminalLine, "id">[]) => {
    if (lines.length === 0) {
      return;
    }

    setStreamQueue((prev) => [
      ...prev,
      ...lines.map((line) => ({
        id: nextLineId(),
        ...line,
      })),
    ]);
  };

  const runCommand = (commandValue: string): Omit<TerminalLine, "id">[] => {
    const normalized = commandValue.trim().toLowerCase();

    if (!normalized) {
      return [];
    }

    if (normalized === "help" || normalized === "commands") {
      return [
        {
          tone: "accent",
          text: "Available commands:",
        },
        ...commandBriefs.map((item) => ({
          tone: "output" as const,
          text: `• ${item.command.padEnd(12, " ")} ${item.description}`,
        })),
      ];
    }

    if (normalized === "profile" || normalized === "person") {
      return [
        {
          tone: "accent",
          text: "Tushar Vashishth — Tech Lead & Full-Stack Engineer",
        },
        {
          tone: "output",
          text: "He builds secure, high-performance systems with Node.js, Next.js, AWS, and AI workflows.",
        },
      ];
    }

    if (normalized === "skills" || normalized === "techstack") {
      return [
        {
          tone: "accent",
          text: "Core skills:",
        },
        ...skills.map((skill) => ({
          tone: "output" as const,
          text: `✓ ${skill}`,
        })),
      ];
    }

    if (normalized === "projects") {
      return [
        {
          tone: "accent",
          text: "Highlighted projects:",
        },
        ...projects.map((project) => ({
          tone: "output" as const,
          text: `→ ${project}`,
        })),
      ];
    }

    if (
      normalized === "experiences" ||
      normalized === "experience" ||
      normalized === "experices"
    ) {
      return [
        {
          tone: "accent",
          text: "Experience snapshot:",
        },
        {
          tone: "output",
          text: "Tech Lead focused on scalable product architecture and reliability-first engineering.",
        },
        {
          tone: "output",
          text: "Hands-on leadership across full-stack delivery, cloud systems, and DevOps execution.",
        },
      ];
    }

    if (normalized === "focus") {
      return [
        {
          tone: "accent",
          text: "Current focus areas:",
        },
        {
          tone: "output",
          text: "• System Design • Cloud Architecture (AWS) • Next.js & Node.js • Fintech & AI Solutions",
        },
      ];
    }

    if (normalized === "socials") {
      return [
        {
          tone: "accent",
          text: "Social links:",
        },
        {
          tone: "output",
          text: "GitHub: github.com/tusharvashishth",
        },
        {
          tone: "output",
          text: "LinkedIn: linkedin.com/in/tushar-vashishth-b15998172",
        },
        {
          tone: "output",
          text: "YouTube: youtube.com/@codingWithTushar",
        },
      ];
    }

    if (normalized === "contact") {
      return [
        {
          tone: "accent",
          text: "Contact:",
        },
        {
          tone: "output",
          text: "Email: tusharvashisth4@gmail.com",
        },
        {
          tone: "output",
          text: "Location: Greater Noida, India",
        },
      ];
    }

    if (normalized === "achievements") {
      return [
        {
          tone: "accent",
          text: "Highlights:",
        },
        {
          tone: "output",
          text: "Built and shipped high-scale systems handling millions of monthly transactions.",
        },
        {
          tone: "output",
          text: "Grew codingWithTushar YouTube channel to 10,755+ subscribers.",
        },
      ];
    }

    if (normalized === "date") {
      return [
        {
          tone: "output",
          text: `Server time: ${new Date().toLocaleString()}`,
        },
      ];
    }

    if (normalized === "clear") {
      setTerminalLines([]);
      setStreamQueue([]);
      setActiveLine(null);
      setActiveWordCount(0);
      return [];
    }

    const randomLine =
      fallbackLines[Math.floor(Math.random() * fallbackLines.length)];

    return [
      {
        tone: "error",
        text: `bash: ${normalized}: command not found`,
      },
      {
        tone: "output",
        text: randomLine,
      },
    ];
  };

  const submitCommand = () => {
    const trimmedCommand = inputValue.trim();

    if (!trimmedCommand) {
      return;
    }

    setTerminalLines((prev) => [
      ...prev,
      {
        id: nextLineId(),
        tone: "input",
        text: `$ ${trimmedCommand}`,
      },
    ]);

    setHistory((prev) => [...prev, trimmedCommand]);
    setHistoryCursor(-1);
    queueLines(runCommand(trimmedCommand));
    setInputValue("");
  };

  const activeLineText = useMemo(() => {
    if (!activeLine) {
      return "";
    }

    const words = activeLine.text.split(" ");
    return words.slice(0, activeWordCount).join(" ");
  }, [activeLine, activeWordCount]);

  useEffect(() => {
    if (hasBootedRef.current) {
      return;
    }

    hasBootedRef.current = true;

    queueLines([
      {
        tone: "accent",
        text: "Last login: now on portfolio-shell",
      },
      {
        tone: "output",
        text: "Run `help` to explore available commands.",
      },
      {
        tone: "output",
        text: "Tip: try `profile`, `skills`, `projects`, `experiences`.",
      },
    ]);
  }, []);

  useEffect(() => {
    if (activeLine || streamQueue.length === 0) {
      return;
    }

    const [nextLine, ...rest] = streamQueue;
    setActiveLine(nextLine);
    setActiveWordCount(0);
    setStreamQueue(rest);
  }, [activeLine, streamQueue]);

  useEffect(() => {
    if (!activeLine) {
      return;
    }

    const words = activeLine.text.split(" ");
    let nextCount = 0;
    let isCancelled = false;
    const timers: number[] = [];

    const streamWord = () => {
      if (isCancelled) {
        return;
      }

      nextCount += 1;
      setActiveWordCount(Math.min(nextCount, words.length));

      if (nextCount >= words.length) {
        const finalizeTimer = window.setTimeout(() => {
          if (isCancelled) {
            return;
          }

          setTerminalLines((existing) => [...existing, activeLine]);
          setActiveLine(null);
          setActiveWordCount(0);
        }, 55);

        timers.push(finalizeTimer);
        return;
      }

      const nextTimer = window.setTimeout(streamWord, 55);
      timers.push(nextTimer);
    };

    const initialTimer = window.setTimeout(streamWord, 55);
    timers.push(initialTimer);

    return () => {
      isCancelled = true;
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [activeLine]);

  useEffect(() => {
    if (!terminalBodyRef.current) {
      return;
    }

    terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
  }, [terminalLines, activeLineText]);

  const lineToneClassName = (tone: TerminalLine["tone"]) => {
    if (tone === "input") {
      return "text-primary";
    }

    if (tone === "accent") {
      return "text-emerald-600 dark:text-emerald-400";
    }

    if (tone === "error") {
      return "text-red-500";
    }

    return "text-foreground";
  };

  return (
    <section className="py-2 px-6 max-w-6xl mx-auto flex flex-col items-center justify-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
          Skills Terminal
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          Run commands like{" "}
          <span className="font-semibold text-foreground">profile</span>,{" "}
          <span className="font-semibold text-foreground">skills</span>, and{" "}
          <span className="font-semibold text-foreground">projects</span>.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative w-full flex items-center justify-center"
      >
        <div className="relative w-full max-w-4xl rounded-xl border border-border bg-card shadow-sm overflow-hidden">
          <ShineBorder
            borderWidth={1.5}
            duration={16}
            shineColor={["#7c3aed", "#22d3ee", "#a855f7"]}
          />

          <div className="border-b border-border px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="size-2.5 rounded-full bg-red-500" />
              <span className="size-2.5 rounded-full bg-yellow-500" />
              <span className="size-2.5 rounded-full bg-green-500" />
            </div>
            <p className="text-xs text-muted-foreground font-mono">
              tushar@portfolio:~
            </p>
          </div>

          <div
            ref={terminalBodyRef}
            className="h-105 overflow-y-auto p-4 font-mono text-sm bg-background"
          >
            <div className="space-y-1.5">
              {terminalLines.map((line) => (
                <p key={line.id} className={lineToneClassName(line.tone)}>
                  {line.text}
                </p>
              ))}

              {activeLine && (
                <p className={lineToneClassName(activeLine.tone)}>
                  {activeLineText}
                </p>
              )}

              <div className="flex items-center gap-2 text-primary">
                <span>$</span>
                <input
                  value={inputValue}
                  onChange={(event) => setInputValue(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      submitCommand();
                      return;
                    }

                    if (event.key === "ArrowUp") {
                      event.preventDefault();
                      if (history.length === 0) {
                        return;
                      }
                      const nextIndex =
                        historyCursor === -1
                          ? history.length - 1
                          : Math.max(0, historyCursor - 1);
                      setHistoryCursor(nextIndex);
                      setInputValue(history[nextIndex]);
                      return;
                    }

                    if (event.key === "ArrowDown") {
                      event.preventDefault();
                      if (history.length === 0 || historyCursor === -1) {
                        return;
                      }
                      const nextIndex = historyCursor + 1;
                      if (nextIndex >= history.length) {
                        setHistoryCursor(-1);
                        setInputValue("");
                        return;
                      }
                      setHistoryCursor(nextIndex);
                      setInputValue(history[nextIndex]);
                      return;
                    }

                    if (event.key === "Tab") {
                      event.preventDefault();
                      const normalized = inputValue.trim().toLowerCase();
                      if (!normalized) {
                        return;
                      }
                      const firstMatch = knownCommands.find((item) =>
                        item.startsWith(normalized),
                      );
                      if (firstMatch) {
                        setInputValue(firstMatch);
                      }
                    }
                  }}
                  spellCheck={false}
                  autoComplete="off"
                  className="w-full bg-transparent text-foreground outline-hidden placeholder:text-muted-foreground"
                  placeholder="Type a command and press Enter"
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="w-full mt-4"
      >
        <Marquee pauseOnHover className="[--duration:34s] py-2">
          <p className="font-mono text-xs md:text-sm text-muted-foreground whitespace-nowrap">
            commands: help • profile • skills • projects • experiences • focus •
            socials • contact • achievements • clear
          </p>
        </Marquee>
      </motion.div>
    </section>
  );
}
