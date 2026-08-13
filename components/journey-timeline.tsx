"use client";

import React from "react";
import { motion } from "framer-motion";
import { Milestone, Terminal, BookOpen, GraduationCap, Cpu, Compass, CheckCircle2 } from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";

interface MilestoneItem {
  year: string;
  phase: string;
  title: string;
  description: string;
  icon: React.ElementType;
  highlights: string[];
  isCurrent?: boolean;
}

const MILESTONES: MilestoneItem[] = [
  {
    year: "2021 — 2022",
    phase: "The Early Spark",
    title: "Android Modding, Linux CLI & Curiosity",
    description:
      "Started by tinkering with Android custom ROMs, unlocking bootloaders, flashing TWRP, and configuring kernel governors. What started as curiosity turned into a deep fascination with how operating systems control hardware.",
    icon: Terminal,
    highlights: ["First Linux terminal commands", "TWRP recovery & custom ROM deployments", "Hardware kernel tuning experiments"],
  },
  {
    year: "2023",
    phase: "Core Foundations",
    title: "Structured Programming & Computational Thinking",
    description:
      "Transitioned from tinkering to systematic software engineering. Learned Python, JavaScript, and data structures. Realized that programming isn't just about syntax — it's about modeling complex logic and handling edge cases.",
    icon: BookOpen,
    highlights: ["Python automation & scripting", "Algorithms & time complexity fundamentals", "First fullstack web applications"],
  },
  {
    year: "2024",
    phase: "University & Shipping",
    title: "Computer Science Degree & Product Engineering",
    description:
      "Enrolled in University for Computer Science. Started building and shipping real products for peers and clients, including the Contacts Sync Engine and the CS Resources Zero-Noise platform.",
    icon: GraduationCap,
    highlights: ["Formal CS curriculum & OS coursework", "Shipped production apps with Firebase & Next.js", "Client portfolio engineering engagements"],
  },
  {
    year: "2025 — 2026 (Present)",
    phase: "Current Vector",
    title: "AOSP Architecture, Binder IPC & Systems Deep-Dive",
    description:
      "Doubling down on low-level systems engineering. Studying the Android Open Source Project (AOSP) internals, Binder IPC, HAL, Linux kernel drivers, and modern C++/Rust.",
    icon: Cpu,
    highlights: ["AOSP framework & system services research", "IPC serialization & performance profiling", "Active open source documentation & GitHub shipping"],
    isCurrent: true,
  },
  {
    year: "The Horizon",
    phase: "Future Goal",
    title: "Core Android OS & Platform Systems Engineer",
    description:
      "Working towards engineering foundational platform software, core operating systems, and kernel-level subsystems that run seamlessly on millions of devices worldwide.",
    icon: Compass,
    highlights: ["Contributing to foundational AOSP modules", "Systems software at global scale", "Engineering high-reliability OS primitives"],
  },
];

export function JourneyTimeline() {
  return (
    <section id="journey" className="py-24 px-6 sm:px-12 max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-14"
      >
        <div className="flex items-center gap-2 text-xs font-mono text-blue-400 tracking-wider uppercase mb-2">
          <Milestone className="w-3.5 h-3.5" />
          <span>The Narrative &amp; Evolution</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Journey &amp; Milestones
        </h2>
        <p className="text-zinc-400 mt-2 text-sm sm:text-base max-w-xl">
          From flashing custom ROMs as a teenager to studying AOSP system services at university. A progression built on curiosity and craft.
        </p>
      </motion.div>

      {/* Timeline List */}
      <div className="relative border-l border-white/[0.08] ml-4 sm:ml-8 space-y-12 pl-6 sm:pl-10">
        {MILESTONES.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative"
            >
              {/* Timeline Indicator Dot */}
              <div
                className={`absolute -left-[35px] sm:-left-[51px] top-1.5 flex h-7 w-7 items-center justify-center rounded-full border ${
                  item.isCurrent
                    ? "border-blue-500 bg-blue-600 text-white shadow-lg shadow-blue-500/40"
                    : "border-white/10 bg-[#121214] text-zinc-400"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
              </div>

              {/* Card Container */}
              <SpotlightCard className="p-6 sm:p-7" enableSound>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-mono font-medium text-blue-400 tracking-wider uppercase">
                    {item.phase}
                  </span>
                  <div className="flex items-center gap-2">
                    {item.isCurrent && (
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                        Current Focus
                      </span>
                    )}
                    <span className="text-xs font-mono text-zinc-500">{item.year}</span>
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                  {item.title}
                </h3>

                <p className="text-sm text-zinc-300 leading-relaxed mb-4">
                  {item.description}
                </p>

                {/* Bullet Highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-4 border-t border-white/[0.06]">
                  {item.highlights.map((highlight) => (
                    <div key={highlight} className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                      <span className="truncate">{highlight}</span>
                    </div>
                  ))}
                </div>
              </SpotlightCard>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
