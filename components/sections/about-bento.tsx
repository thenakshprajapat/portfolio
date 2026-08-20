"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Github,
  GitBranch,
  Code2,
  Smartphone,
  Terminal,
  Layers,
  Sparkles,
  ArrowUpRight,
  GraduationCap,
  Cpu,
} from "lucide-react";
import { AnimatedCounter } from "@/components/ui/animated-counter";

const TECH_STACK = [
  { icon: Smartphone, label: "Android UI", color: "text-emerald-500" },
  { icon: Terminal, label: "C / C++", color: "text-teal-500" },
  { icon: Code2, label: "React & Next.js", color: "text-emerald-600 dark:text-emerald-400" },
  { icon: Layers, label: "Firebase & Cloud", color: "text-amber-500" },
  { icon: Sparkles, label: "Python & NLP", color: "text-emerald-500" },
  { icon: Cpu, label: "Motion Physics", color: "text-teal-600 dark:text-teal-400" },
];

const MILESTONES = [
  {
    period: "2025 — Present",
    title: "Independent Engineering & JECRC CS",
    subtitle: "Jaipur, India",
    icon: GraduationCap,
    accent: "border-emerald-500/30 bg-emerald-500/10",
    textColor: "text-emerald-500",
    description: "Building production mobile & web applications solo. Deep focus on Android UI motion mechanics, spring dynamics, and C++ systems.",
  },
  {
    period: "2025",
    title: "The Independent Pivot",
    subtitle: "Autonomous Path",
    icon: ArrowUpRight,
    accent: "border-teal-500/30 bg-teal-500/10",
    textColor: "text-teal-500",
    description: "Transitioned from RV University to focus 100% on self-directed engineering, rapid shipping, and deep technical mastery.",
  },
  {
    period: "2022 — 2024",
    title: "St. Paul's Senior Secondary School",
    subtitle: "Pali (PCB + Computer Science)",
    icon: Code2,
    accent: "border-[var(--border)] bg-[var(--surface-elevated)]",
    textColor: "text-[var(--muted)]",
    description: "Started programming with C++ memory structures, object-oriented concepts, and algorithmic problem solving.",
  },
];

export function AboutBento() {
  const [stats, setStats] = useState<{ total: number; publicRepos: number } | null>(null);

  useEffect(() => {
    let alive = true;
    fetch("/api/github")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (alive && d) {
          setStats({
            total: d?.contributions?.total ?? 294,
            publicRepos: d?.publicRepos ?? 10,
          });
        }
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  const total = stats?.total ?? 294;
  const repos = stats?.publicRepos ?? 10;

  return (
    <section id="about" className="py-16 sm:py-24 px-6 sm:px-10 max-w-5xl mx-auto space-y-10 sm:space-y-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="space-y-2"
      >
        <span className="text-xs font-mono uppercase text-emerald-500 tracking-widest">About Me</span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[var(--foreground)]">
          Independent Developer &amp; <span className="gradient-green-text">Craft</span>
        </h1>
        <p className="text-[var(--muted)] text-xs sm:text-sm max-w-lg leading-relaxed">
          The story, engineering mindset, and foundational pillars behind my work.
        </p>
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Philosophy & Arsenal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-6 rounded-3xl p-6 sm:p-8 bg-[var(--card)] border border-[var(--border)] flex flex-col gap-5 shadow-sm"
        >
          <h2 className="text-lg sm:text-xl font-semibold text-[var(--foreground)] leading-snug">
            I build and ship solo —{" "}
            <span className="gradient-green-text">turning technical intuition into living software</span>.
          </h2>
          <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed">
            Based in Jaipur, India. I focus on the intersection of Android UI motion mechanics, 120Hz gesture response, systems programming in C++, and realtime distributed web applications.
          </p>
          <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed">
            No bloated process, no endless committee meetings — just clean code, rapid iteration, and software that feels alive in your hands.
          </p>

          {/* Stack grid */}
          <div className="space-y-2.5 pt-2">
            <span className="text-xs font-mono uppercase text-[var(--muted)] tracking-wider">Core Arsenal</span>
            <div className="grid grid-cols-3 gap-2">
              {TECH_STACK.map(({ icon: Icon, label, color }) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-1.5 p-3 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)] hover:border-emerald-500/40 transition-colors"
                >
                  <Icon className={`size-4 ${color}`} />
                  <span className="text-[10px] font-mono text-[var(--muted)] text-center leading-tight">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right Column: Verified Stats & Milestones */}
        <div className="lg:col-span-6 flex flex-col gap-5">
          {/* Stats row */}
          <div className="grid grid-cols-2 gap-3.5">
            <div className="rounded-2xl p-5 bg-[var(--card)] border border-[var(--border)] space-y-1 shadow-sm">
              <div className="flex items-center gap-1.5 text-xs font-mono text-[var(--muted)] mb-1">
                <GitBranch className="size-3 text-emerald-500" />
                <span>Annual Commits</span>
              </div>
              <div className="text-2xl sm:text-3xl font-semibold font-mono text-[var(--foreground)]">
                <AnimatedCounter target={total} suffix="+" duration={1400} />
              </div>
              <p className="text-[11px] text-[var(--muted)]">verified GitHub activity</p>
            </div>

            <div className="rounded-2xl p-5 bg-[var(--card)] border border-[var(--border)] space-y-1 shadow-sm">
              <div className="flex items-center gap-1.5 text-xs font-mono text-[var(--muted)] mb-1">
                <Github className="size-3 text-teal-500" />
                <span>Public Repos</span>
              </div>
              <div className="text-2xl sm:text-3xl font-semibold font-mono text-[var(--foreground)]">
                <AnimatedCounter target={repos} suffix="" duration={1200} />
              </div>
              <a
                href="https://github.com/thenakshprajapat"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-emerald-500 hover:underline font-mono flex items-center gap-1 mt-0.5"
              >
                @thenakshprajapat <ArrowUpRight className="size-3" />
              </a>
            </div>
          </div>

          {/* Timeline Card */}
          <div className="rounded-3xl p-6 sm:p-7 bg-[var(--card)] border border-[var(--border)] space-y-4 flex-1 shadow-sm">
            <span className="text-xs font-mono uppercase text-[var(--muted)] tracking-wider">Milestones &amp; Journey</span>
            <div className="space-y-3.5">
              {MILESTONES.map((m, i) => {
                const Icon = m.icon;
                return (
                  <div key={i} className="relative flex gap-3.5">
                    {i < MILESTONES.length - 1 && (
                      <div className="absolute left-[15px] top-8 bottom-0 w-px bg-[var(--border)]" />
                    )}
                    <div className={`flex-shrink-0 size-8 rounded-full border ${m.accent} flex items-center justify-center mt-0.5`}>
                      <Icon className={`size-3 ${m.textColor}`} />
                    </div>
                    <div className="pb-3 flex-1 min-w-0">
                      <div className="flex items-baseline justify-between gap-2 flex-wrap">
                        <h4 className="text-xs font-semibold text-[var(--foreground)] leading-tight">{m.title}</h4>
                        <span className={`text-[10px] font-mono font-medium ${m.textColor} shrink-0`}>{m.period}</span>
                      </div>
                      <p className="text-[11px] text-[var(--muted)] mt-0.5 mb-0.5">{m.subtitle}</p>
                      <p className="text-[11px] text-[var(--muted)] leading-relaxed">{m.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
