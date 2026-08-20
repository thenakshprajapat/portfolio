"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Github,
  ChevronLeft,
  ChevronRight,
  Layers,
  Pause,
  Plus,
  ArrowUpRight,
} from "lucide-react";
import { sound } from "@/lib/sound";

interface Project {
  id: string;
  number: string;
  category: string;
  year: string;
  title: string;
  description: string;
  tags: string[];
  github: string;
  live: string;
  liveLabel: string;
  accentColor: string;
  borderColor: string;
  bgGlow: string;
  interactiveType?: "sync" | "nlp" | "hub";
}

const PROJECTS: Project[] = [
  {
    id: "contacts-sync",
    number: "01",
    category: "Realtime Systems & UI",
    year: "2026",
    title: "Contacts Realtime Sync Engine",
    description:
      "A distributed, zero-jank contact manager architected on Firestore snapshot listeners. Features optimistic local state writes, automatic offline cache reconciliation, and sub-60ms mutation latency.",
    tags: ["React 19", "Firebase Firestore", "TypeScript", "Tailwind CSS"],
    github: "https://github.com/thenakshprajapat/contacts-firebase",
    live: "https://contacts-firebase-app.vercel.app/",
    liveLabel: "Open Live App",
    accentColor: "text-emerald-500 dark:text-emerald-400",
    borderColor: "border-emerald-500/30",
    bgGlow: "from-emerald-500/10 to-transparent",
    interactiveType: "sync",
  },
  {
    id: "paper-analyzer",
    number: "02",
    category: "Python & NLP Intelligence",
    year: "2025",
    title: "Paper Analyzer — Pattern AI",
    description:
      "Automated natural language processing pipeline that parses historical examination papers, performs regex pattern extraction, clusters recurrent conceptual topics, and charts predictive revision heatmaps.",
    tags: ["Python", "NLP", "Topic Modeling", "Streamlit", "Data Science"],
    github: "https://github.com/thenakshprajapat/paper-analyzer",
    live: "https://paper-analyzer.streamlit.app/",
    liveLabel: "Launch Analyzer",
    accentColor: "text-teal-500 dark:text-teal-400",
    borderColor: "border-teal-500/30",
    bgGlow: "from-teal-500/10 to-transparent",
    interactiveType: "nlp",
  },
  {
    id: "cs-hub",
    number: "03",
    category: "Systems & Open Source",
    year: "2025",
    title: "CS Resources Hub — Zero-Noise",
    description:
      "Distraction-free educational index mapping core computer science foundations — Operating Systems, Distributed Systems, Low-Level C++ Memory, and Web Architecture — with zero ads or commercial clutter.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Open Source"],
    github: "https://github.com/thenakshprajapat/edtech-cs",
    live: "https://thenakshprajapat.github.io/edtech-cs/",
    liveLabel: "Explore Hub",
    accentColor: "text-emerald-600 dark:text-emerald-300",
    borderColor: "border-emerald-500/30",
    bgGlow: "from-emerald-500/10 to-transparent",
    interactiveType: "hub",
  },
];

export function GlidingWorkShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  // Mini interactive state for contact sync project
  const [contacts, setContacts] = useState([
    { id: 1, name: "Sarah Lin", role: "Frontend Lead", sync: "Synced" },
    { id: 2, name: "David Chen", role: "Distributed Systems", sync: "Synced" },
  ]);
  const [addingContact, setAddingContact] = useState(false);

  const total = PROJECTS.length;

  const nextSlide = useCallback(() => {
    sound.playPop();
    setActiveIndex((prev) => (prev + 1) % total);
    setProgress(0);
  }, [total]);

  const prevSlide = useCallback(() => {
    sound.playPop();
    setActiveIndex((prev) => (prev - 1 + total) % total);
    setProgress(0);
  }, [total]);

  const goToSlide = (index: number) => {
    if (index === activeIndex) return;
    sound.playClick();
    setActiveIndex(index);
    setProgress(0);
  };

  // 5-second smooth automatic glider with progress bar
  useEffect(() => {
    if (isPaused) return;

    const intervalTime = 50;
    const totalTime = 5000;
    const step = (intervalTime / totalTime) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          nextSlide();
          return 0;
        }
        return prev + step;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  const addSimulatedContact = () => {
    if (addingContact) return;
    sound.playClick();
    setAddingContact(true);
    const newId = Date.now();
    setContacts((p) => [{ id: newId, name: "Elena Rostova", role: "Kernel Dev", sync: "Syncing…" }, ...p]);
    setTimeout(() => {
      setContacts((p) => p.map((c) => (c.id === newId ? { ...c, sync: "Done (<50ms)" } : c)));
      setAddingContact(false);
      sound.playSuccess();
    }, 550);
  };

  return (
    <section id="work" className="py-16 sm:py-24 px-4 sm:px-8 max-w-5xl mx-auto relative select-none">
      {/* Section Title */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-14">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-500 uppercase tracking-wider">
            <Layers className="size-3" />
            <span>Featured Engineering</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-[var(--foreground)]">
            Selected <span className="gradient-green-text">Builds</span>
          </h2>
          <p className="text-xs sm:text-sm text-[var(--muted)] max-w-md leading-relaxed">
            Real production architectures, distributed realtime engines, and systems built solo.
          </p>
        </div>

        {/* Carousel Controls */}
        <div className="flex items-center gap-2.5">
          <div
            onClick={() => setIsPaused(!isPaused)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--surface-elevated)] border border-[var(--border)] text-xs font-mono text-[var(--muted)] hover:text-[var(--foreground)] transition-colors cursor-pointer"
            title={isPaused ? "Glider Paused - Click to resume" : "Auto-gliding every 5s - Click to pause"}
          >
            <div className="relative size-2.5 flex items-center justify-center">
              {isPaused ? (
                <Pause className="size-2.5 text-amber-500" />
              ) : (
                <span className="size-1.5 rounded-full bg-emerald-500 animate-ping" />
              )}
            </div>
            <span>5s Glider {isPaused ? "(Paused)" : ""}</span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={prevSlide}
              aria-label="Previous project"
              className="p-2 rounded-full bg-[var(--surface-elevated)] border border-[var(--border)] text-[var(--muted)] hover:text-[var(--foreground)] hover:border-emerald-500/40 transition-all cursor-pointer"
            >
              <ChevronLeft className="size-3.5" />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next project"
              className="p-2 rounded-full bg-[var(--surface-elevated)] border border-[var(--border)] text-[var(--muted)] hover:text-[var(--foreground)] hover:border-emerald-500/40 transition-all cursor-pointer"
            >
              <ChevronRight className="size-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 3D Gliding Carousel Container */}
      <div
        className="relative min-h-[480px] sm:min-h-[450px] flex items-center justify-center glider-container"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="relative w-full max-w-3xl flex items-center justify-center">
          {PROJECTS.map((project, index) => {
            const diff = (index - activeIndex + total) % total;
            const isCenter = diff === 0;
            const isLeft = diff === total - 1 || (activeIndex === 0 && index === total - 1);
            const isRight = diff === 1 || (activeIndex === total - 1 && index === 0);

            let transformStyle = "";
            let zIndex = 10;
            let opacity = 0;
            let filter = "blur(8px)";
            let pointerEvents: "auto" | "none" = "none";

            if (isCenter) {
              transformStyle = "translateX(0%) scale(1)";
              zIndex = 30;
              opacity = 1;
              filter = "blur(0px)";
              pointerEvents = "auto";
            } else if (isLeft) {
              transformStyle = "translateX(-24%) scale(0.88) rotateY(5deg)";
              zIndex = 20;
              opacity = 0.35;
              filter = "blur(5px)";
              pointerEvents = "auto";
            } else if (isRight) {
              transformStyle = "translateX(24%) scale(0.88) rotateY(-5deg)";
              zIndex = 20;
              opacity = 0.35;
              filter = "blur(5px)";
              pointerEvents = "auto";
            }

            return (
              <motion.div
                key={project.id}
                onClick={() => !isCenter && goToSlide(index)}
                style={{
                  transform: transformStyle,
                  zIndex,
                  opacity,
                  filter,
                  pointerEvents,
                }}
                className={`absolute inset-x-0 mx-auto max-w-2xl rounded-3xl p-6 sm:p-8 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] bg-[var(--card)] border ${
                  isCenter ? project.borderColor : "border-[var(--border)]"
                } shadow-xl overflow-hidden`}
              >
                {/* Background Glow */}
                <div
                  className={`absolute -top-20 -right-20 size-60 rounded-full bg-gradient-to-br ${project.bgGlow} blur-3xl pointer-events-none`}
                />

                <div className="relative z-10 space-y-5">
                  {/* Top Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--border)] pb-4">
                    <div className="flex items-center gap-2.5">
                      <span className={`font-mono text-2xl font-semibold ${project.accentColor}`}>
                        {project.number}
                      </span>
                      <div className="h-3.5 w-px bg-[var(--border)]" />
                      <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-[var(--surface-elevated)] border border-[var(--border)] text-[var(--foreground)]">
                        {project.category}
                      </span>
                      <span className="text-xs font-mono text-[var(--muted)]">{project.year}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => {
                          e.stopPropagation();
                          sound.playPop();
                        }}
                        className="p-2 rounded-full bg-[var(--surface-elevated)] border border-[var(--border)] hover:border-emerald-500/40 text-[var(--muted)] hover:text-emerald-500 transition-colors"
                        title="View Source on GitHub"
                      >
                        <Github className="size-3.5" />
                      </a>
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => {
                          e.stopPropagation();
                          sound.playPop();
                        }}
                        className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-emerald-500 text-white font-mono text-[11px] font-medium uppercase tracking-wider hover:bg-emerald-600 transition-all shadow-sm"
                      >
                        <span>{project.liveLabel}</span>
                        <ArrowUpRight className="size-3" />
                      </a>
                    </div>
                  </div>

                  {/* Project Title & Description */}
                  <div className="space-y-2">
                    <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-[var(--foreground)]">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed max-w-xl">
                      {project.description}
                    </p>
                  </div>

                  {/* Interactive Simulation */}
                  {project.interactiveType === "sync" && (
                    <div className="rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)] p-3.5 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-500 font-medium">
                          <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span>Live Optimistic Sync Engine</span>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            addSimulatedContact();
                          }}
                          disabled={addingContact}
                          className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-[var(--surface)] border border-emerald-500/30 hover:border-emerald-500 text-[11px] font-mono text-emerald-500 font-medium transition-all disabled:opacity-50 cursor-pointer"
                        >
                          <Plus className="size-3" />
                          <span>Simulate Mutation</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {contacts.slice(0, 2).map((c) => (
                          <div
                            key={c.id}
                            className="flex items-center justify-between p-2.5 rounded-xl bg-[var(--surface)] border border-[var(--border)]"
                          >
                            <div>
                              <p className="text-xs font-medium text-[var(--foreground)]">{c.name}</p>
                              <p className="text-[10px] font-mono text-[var(--muted)]">{c.role}</p>
                            </div>
                            <span
                              className={`text-[9px] font-mono px-2 py-0.5 rounded-full border ${
                                c.sync.includes("Sync")
                                  ? "bg-amber-500/10 text-amber-500 border-amber-500/30 animate-pulse"
                                  : "bg-emerald-500/10 text-emerald-500 border-emerald-500/30"
                              }`}
                            >
                              {c.sync}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tech Stack Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-1 border-t border-[var(--border)]">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded-full bg-[var(--surface-elevated)] border border-[var(--border)] text-[11px] font-mono text-[var(--muted)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Progress Dots & Timeline Bar */}
      <div className="flex flex-col items-center gap-2.5 mt-8 sm:mt-10">
        <div className="flex items-center gap-1.5">
          {PROJECTS.map((p, i) => (
            <button
              key={p.id}
              onClick={() => goToSlide(i)}
              aria-label={`Go to project ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                i === activeIndex
                  ? "w-6 bg-emerald-500 shadow-sm shadow-emerald-500/40"
                  : "w-1.5 bg-[var(--border-strong)] hover:bg-[var(--muted)]"
              }`}
            />
          ))}
        </div>

        {/* Dynamic 5s Line Progress */}
        <div className="w-36 h-0.5 bg-[var(--border)] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </section>
  );
}
