"use client";

import React, { useState, useEffect, useMemo } from "react";
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
  Coffee,
  Cpu,
  Flame,
} from "lucide-react";
import { AnimatedCounter } from "@/components/ui/animated-counter";

interface ContribCell {
  date: string;
  count: number;
  level: number;
}

const TECH_STACK = [
  { icon: Smartphone, label: "Android UI", color: "text-sky-400" },
  { icon: Terminal, label: "C / C++", color: "text-indigo-400" },
  { icon: Code2, label: "React & Next.js", color: "text-cyan-300" },
  { icon: Layers, label: "Firebase & Cloud", color: "text-amber-400" },
  { icon: Sparkles, label: "Python & NLP", color: "text-emerald-400" },
  { icon: Cpu, label: "Motion Physics", color: "text-violet-400" },
];

const MILESTONES = [
  {
    period: "2025 — Present",
    title: "Independent Development & JECRC CS",
    subtitle: "Jaipur, India",
    icon: GraduationCap,
    accent: "border-sky-500/30 bg-sky-500/10",
    textColor: "text-sky-400",
    description: "Building production mobile & web applications solo. Deep focus on Android UI motion mechanics and C++ systems.",
  },
  {
    period: "2025",
    title: "The Independent Pivot",
    subtitle: "Autonomous path",
    icon: ArrowUpRight,
    accent: "border-indigo-500/30 bg-indigo-500/10",
    textColor: "text-indigo-400",
    description: "Transitioned from RV University to focus 100% on self-directed engineering, rapid shipping, and deep technical mastery.",
  },
  {
    period: "2022 — 2024",
    title: "St. Paul's Senior Secondary School",
    subtitle: "Pali (PCB + Computer Science)",
    icon: Code2,
    accent: "border-[var(--border)] bg-[var(--surface-elevated)]",
    textColor: "text-[var(--muted)]",
    description: "Started programming with C++ memory structures, object-oriented concepts, and computational problem solving.",
  },
];

function Heatmap({ weeks, loading }: { weeks: ContribCell[][]; loading: boolean }) {
  const [hovered, setHovered] = useState<{ date: string; count: number } | null>(null);

  const getCellColor = (level: number) => {
    switch (level) {
      case 1:
        return "bg-sky-950/80 border-sky-900/60";
      case 2:
        return "bg-sky-800/80 border-sky-700/70";
      case 3:
        return "bg-sky-500 border-sky-400";
      case 4:
        return "bg-sky-300 border-white";
      default:
        return "bg-[var(--surface-elevated)] border-[var(--border)]";
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs font-mono text-[var(--muted)]">
        <span className="text-[var(--foreground)] font-semibold flex items-center gap-1.5">
          <GitBranch className="size-3.5 text-sky-400" />
          GitHub Commit Matrix
        </span>
        <span>
          {loading ? "Syncing API…" : hovered ? `${hovered.count} commits on ${hovered.date}` : "Hover cell to inspect"}
        </span>
      </div>
      <div className="overflow-x-auto pb-1">
        <div className="flex gap-[3.5px] min-w-[320px]">
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-[3.5px]">
              {week.map((c, di) => (
                <div
                  key={di}
                  onMouseEnter={() => setHovered({ date: c.date, count: c.count })}
                  onMouseLeave={() => setHovered(null)}
                  className={`w-[10px] h-[10px] rounded-sm border transition-transform hover:scale-125 cursor-pointer ${getCellColor(
                    c.level
                  )}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2 text-[10px] font-mono text-[var(--muted)] pt-1">
        <span>Less active</span>
        {[0, 1, 2, 3, 4].map((l) => (
          <span key={l} className={`w-2.5 h-2.5 rounded-sm border inline-block ${getCellColor(l)}`} />
        ))}
        <span>More active</span>
      </div>
    </div>
  );
}

export function AboutBento() {
  const [stats, setStats] = useState<{ total: number; publicRepos: number; weeks: ContribCell[][] | null } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    fetch("/api/github")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (alive && d) {
          setStats({
            total: d?.contributions?.total ?? 57,
            publicRepos: d?.publicRepos ?? 10,
            weeks: d?.contributions?.weeks ?? null,
          });
        }
      })
      .catch(() => {})
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, []);

  const weeks = useMemo((): ContribCell[][] => {
    if (stats?.weeks?.length) {
      const all = stats.weeks;
      return all.slice(Math.max(0, all.length - 26));
    }
    const fb: ContribCell[][] = [];
    const today = new Date();
    for (let w = 25; w >= 0; w--) {
      const wk: ContribCell[] = [];
      for (let d = 0; d < 7; d++) {
        const t = new Date(today);
        t.setDate(today.getDate() - (w * 7 + (6 - d)));
        wk.push({ date: t.toISOString().split("T")[0], count: 0, level: 0 });
      }
      fb.push(wk);
    }
    return fb;
  }, [stats]);

  const total = stats?.total ?? 57;
  const repos = stats?.publicRepos ?? 10;

  return (
    <section id="about" className="py-16 sm:py-24 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto space-y-12 sm:space-y-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-2"
        >
          <span className="text-xs font-mono uppercase text-sky-400 tracking-widest">About Me</span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[var(--foreground)]">
            Independent Developer & <span className="gradient-text">Craft</span>
          </h2>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Identity & Core Philosophy */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 bento-card p-6 sm:p-8 flex flex-col gap-6 bg-[var(--surface)] border-[var(--border-strong)]"
          >
            <p className="text-lg sm:text-xl font-semibold text-[var(--foreground)] leading-snug">
              I build and ship solo —{" "}
              <span className="gradient-accent-text font-bold">turning ideas into working software</span>.
            </p>
            <p className="text-sm text-[var(--muted)] leading-relaxed">
              Based in Jaipur. I focus on the intersection of Android UI motion mechanics, 120Hz gesture response, systems programming in C++, and realtime distributed web apps.
            </p>
            <p className="text-sm text-[var(--muted)] leading-relaxed">
              No bloated process, no endless committee meetings — just clean code, rapid iteration, and software that feels alive in your hands.
            </p>

            {/* Stack grid */}
            <div className="space-y-2.5">
              <span className="text-xs font-mono uppercase text-[var(--muted)] tracking-wider">Core Arsenal</span>
              <div className="grid grid-cols-3 gap-2">
                {TECH_STACK.map(({ icon: Icon, label, color }) => (
                  <div
                    key={label}
                    className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border)] hover:border-sky-500/40 transition-colors"
                  >
                    <Icon className={`size-4 ${color}`} />
                    <span className="text-[10px] font-mono text-[var(--muted)] text-center leading-tight">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Indie Developer Badge */}
            <div className="mt-auto p-4 rounded-2xl border border-sky-500/20 bg-sky-500/5 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Flame className="size-4 text-sky-400" />
                  <span className="text-xs font-mono font-bold text-sky-400 uppercase">Independent Trajectory</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 font-semibold">Active</span>
              </div>
              <p className="text-xs text-[var(--muted)] leading-relaxed">
                Focused on shipping standalone software products, custom Android motion architectures, and high-performance apps.
              </p>
            </div>
          </motion.div>

          {/* Stats, Heatmap & Timeline */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            {/* Stats row */}
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bento-card p-5 sm:p-6 space-y-1 bg-[var(--surface)]"
              >
                <div className="flex items-center gap-1.5 text-xs font-mono text-[var(--muted)] mb-2">
                  <GitBranch className="size-3.5 text-sky-400" />
                  <span>Annual Commits</span>
                </div>
                <div className="text-3xl sm:text-4xl font-bold font-mono text-[var(--foreground)]">
                  <AnimatedCounter target={total} suffix="+" duration={1400} />
                </div>
                <p className="text-xs text-[var(--muted)]">verified GitHub activity</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bento-card p-5 sm:p-6 space-y-1 bg-[var(--surface)]"
              >
                <div className="flex items-center gap-1.5 text-xs font-mono text-[var(--muted)] mb-2">
                  <Github className="size-3.5 text-indigo-400" />
                  <span>Public Repos</span>
                </div>
                <div className="text-3xl sm:text-4xl font-bold font-mono text-[var(--foreground)]">
                  <AnimatedCounter target={repos} suffix="" duration={1200} />
                </div>
                <a
                  href="https://github.com/thenakshprajapat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-sky-400 hover:text-sky-300 font-mono flex items-center gap-1 mt-1"
                >
                  @thenakshprajapat <ArrowUpRight className="size-3" />
                </a>
              </motion.div>
            </div>

            {/* Heatmap Card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="bento-card p-5 sm:p-6 bg-[var(--surface)]"
            >
              <Heatmap weeks={weeks} loading={loading} />
            </motion.div>

            {/* Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bento-card p-5 sm:p-6 space-y-5 bg-[var(--surface)]"
            >
              <span className="text-xs font-mono uppercase text-[var(--muted)] tracking-wider">Milestones & Journey</span>
              <div className="space-y-0">
                {MILESTONES.map((m, i) => {
                  const Icon = m.icon;
                  return (
                    <div key={i} className="relative flex gap-3 sm:gap-4">
                      {i < MILESTONES.length - 1 && (
                        <div className="absolute left-[17px] top-10 bottom-0 w-px bg-[var(--border)]" />
                      )}
                      <div className={`flex-shrink-0 size-9 rounded-full border ${m.accent} flex items-center justify-center mt-0.5`}>
                        <Icon className={`size-3.5 ${m.textColor}`} />
                      </div>
                      <div className="pb-5 flex-1 min-w-0">
                        <div className="flex items-baseline justify-between gap-2 flex-wrap">
                          <h4 className="text-sm font-bold text-[var(--foreground)] leading-tight">{m.title}</h4>
                          <span className={`text-[10px] font-mono font-bold ${m.textColor} shrink-0`}>{m.period}</span>
                        </div>
                        <p className="text-[11px] text-[var(--muted)] mt-0.5 mb-1">{m.subtitle}</p>
                        <p className="text-[11px] text-[var(--muted)] leading-relaxed">{m.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
