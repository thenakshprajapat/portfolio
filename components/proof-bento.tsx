"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Clock,
  GitBranch,
  ArrowUpRight,
  Sparkles,
  Music,
  Activity,
  ArrowRight,
  FolderGit2,
  Smartphone,
  Layers,
} from "lucide-react";
import Link from "next/link";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { sound } from "@/lib/sound";

// Simulated 34-week realistic contribution pattern
const WEEKS_COUNT = 34;
const DAYS_PER_WEEK = 7;

function generateHeatmapData() {
  const data: number[][] = [];
  for (let w = 0; w < WEEKS_COUNT; w++) {
    const week: number[] = [];
    for (let d = 0; d < DAYS_PER_WEEK; d++) {
      const rand = Math.random();
      if (rand < 0.35) week.push(0);
      else if (rand < 0.65) week.push(1);
      else if (rand < 0.85) week.push(2);
      else if (rand < 0.95) week.push(3);
      else week.push(4);
    }
    data.push(week);
  }
  return data;
}

const HEATMAP = generateHeatmapData();

export function ProofBento() {
  const [timeString, setTimeString] = useState<string>("");
  const [hoveredCell, setHoveredCell] = useState<{ count: number } | null>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      setTimeString(new Intl.DateTimeFormat("en-US", options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const getCellColor = (level: number) => {
    switch (level) {
      case 1:
        return "bg-emerald-950/70 border border-emerald-900/40";
      case 2:
        return "bg-emerald-700/80 border border-emerald-600/50";
      case 3:
        return "bg-emerald-500 border border-emerald-400/60 shadow-sm shadow-emerald-500/30";
      case 4:
        return "bg-emerald-300 border border-emerald-200 shadow-md shadow-emerald-300/50";
      default:
        return "bg-black/5 dark:bg-white/[0.04] border border-black/5 dark:border-white/[0.04]";
    }
  };

  return (
    <section id="proof" className="py-20 px-6 sm:px-12 max-w-5xl mx-auto">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="mb-10"
      >
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-500 tracking-wider uppercase mb-2">
          <Activity className="size-3.5" />
          <span>Proof of Work &amp; Live Pulse</span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--foreground)] tracking-tight">
          Signals, Stats &amp; Current Vector
        </h2>
        <p className="text-[var(--muted)] mt-2 text-sm max-w-lg leading-relaxed">
          Building and sharing what I learn. Real projects, UI experiments, and daily development cadence.
        </p>
      </motion.div>

      {/* Bento Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-5">
        {/* 1. Location / Interactive Map Radar (Span 4) */}
        <SpotlightCard className="md:col-span-4 p-6 flex flex-col justify-between rounded-3xl group" enableSound>
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--secondary)] px-3 py-1 text-xs font-mono uppercase tracking-widest text-[var(--foreground)]">
                <MapPin className="size-3.5 text-emerald-500" />
                <span>Location</span>
              </div>
              <span className="text-[11px] font-mono text-[var(--muted)]">26.9124° N, 75.7873° E</span>
            </div>

            {/* Stylized Radar Visualization */}
            <div className="relative my-3 flex h-32 w-full items-center justify-center overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--secondary)]">
              {/* Radar Rings */}
              <div className="absolute size-24 rounded-full border border-emerald-500/20 animate-ping opacity-25" />
              <div className="absolute size-16 rounded-full border border-emerald-500/30" />
              <div className="absolute size-8 rounded-full border border-emerald-500/40 bg-emerald-500/10" />
              
              {/* Center Beacon Pin */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="size-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_#10b981]" />
              </div>
              
              <div className="absolute bottom-2 left-2.5 text-[11px] font-mono text-[var(--foreground)] bg-[var(--card)]/90 px-2 py-0.5 rounded-lg border border-[var(--border)]">
                Jaipur, Rajasthan
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between text-xs font-mono text-[var(--muted)]">
            <span>India Standard Time (IST)</span>
            <span className="text-emerald-500 font-medium">Open to Relocation</span>
          </div>
        </SpotlightCard>

        {/* 2. Social Quick-Access Tiles (Span 8) */}
        <div className="md:col-span-8 grid grid-cols-3 gap-4 sm:gap-5">
          {/* X (Twitter) Tile */}
          <a
            href="https://twitter.com/idevnaksh"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => sound.playPop()}
            className="group relative flex aspect-square flex-col justify-between overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--card)] p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/5"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-[var(--muted)] group-hover:text-emerald-500 transition-colors">
                X
              </span>
              <ArrowUpRight className="size-3.5 text-[var(--muted)] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--foreground)]" />
            </div>
            <div className="flex items-center justify-center my-auto">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-8 text-[var(--foreground)] transition-transform duration-200 group-hover:scale-110">
                <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
              </svg>
            </div>
            <p className="text-[11px] font-mono text-[var(--muted)] truncate">@idevnaksh</p>
          </a>

          {/* LinkedIn Tile */}
          <a
            href="https://linkedin.com/in/thenakshprajapat"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => sound.playPop()}
            className="group relative flex aspect-square flex-col justify-between overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--card)] p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/5"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-[var(--muted)] group-hover:text-emerald-500 transition-colors">
                LinkedIn
              </span>
              <ArrowUpRight className="size-3.5 text-[var(--muted)] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--foreground)]" />
            </div>
            <div className="flex items-center justify-center my-auto">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-8 text-[var(--foreground)] transition-transform duration-200 group-hover:scale-110">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </div>
            <p className="text-[11px] font-mono text-[var(--muted)] truncate">Naksh</p>
          </a>

          {/* GitHub Tile */}
          <a
            href="https://github.com/thenakshprajapat"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => sound.playPop()}
            className="group relative flex aspect-square flex-col justify-between overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--card)] p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/5"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-[var(--muted)] group-hover:text-emerald-500 transition-colors">
                GitHub
              </span>
              <ArrowUpRight className="size-3.5 text-[var(--muted)] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--foreground)]" />
            </div>
            <div className="flex items-center justify-center my-auto">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-8 text-[var(--foreground)] transition-transform duration-200 group-hover:scale-110">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
            </div>
            <p className="text-[11px] font-mono text-[var(--muted)] truncate">@thenakshprajapat</p>
          </a>
        </div>

        {/* 3. Featured Interest Card: Android UI Smoothness & Motion (Span 7) */}
        <SpotlightCard className="md:col-span-7 p-6 sm:p-7 flex flex-col justify-between rounded-3xl group" enableSound>
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--secondary)] px-3 py-1 text-xs font-mono uppercase tracking-widest text-[var(--foreground)]">
                <Smartphone className="size-3.5 text-emerald-500" />
                <span>Interface Craft</span>
              </div>
              <span className="text-xs font-mono text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full font-medium">
                Android UI &amp; Motion
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-[var(--foreground)] tracking-tight mt-2">
              Fluid Animations, Gestures &amp; UI Smoothness
            </h3>
            <p className="text-xs sm:text-sm text-[var(--muted)] mt-1.5 leading-relaxed">
              Fascinated by the details that make software feel responsive and alive: choreographing 120Hz gesture transitions, spring physics, perceived latency reduction, and polished interaction states.
            </p>

            {/* Interaction Chips */}
            <div className="mt-5 space-y-2">
              <div className="flex items-center gap-2.5 p-3 rounded-2xl border border-[var(--border)] bg-[var(--secondary)] shadow-sm transition-all duration-200 group-hover:border-emerald-500/30">
                <Sparkles className="size-3.5 text-emerald-500 shrink-0" />
                <div className="min-w-0 text-xs font-mono">
                  <span className="text-[var(--foreground)] font-medium">Choreographed Gestures</span>
                  <span className="text-[var(--muted)]"> — frame-perfect spring animations &amp; feedback</span>
                </div>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-2xl border border-[var(--border)] bg-[var(--secondary)] shadow-sm text-xs font-mono text-[var(--muted)]">
                <Layers className="size-3.5 text-teal-500 shrink-0" />
                <span>Perceived performance &amp; zero-jank interaction design</span>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-[var(--border)] flex items-center justify-between text-xs font-mono text-[var(--muted)]">
            <span>Experimentation &amp; Craft</span>
            <Link
              href="/lab"
              className="text-emerald-500 hover:text-emerald-400 inline-flex items-center gap-1 font-medium"
            >
              <span>Explore Lab &amp; Stack</span>
              <ArrowUpRight className="size-3.5" />
            </Link>
          </div>
        </SpotlightCard>

        {/* 4. Live Digital Clock & Status (Span 5) */}
        <SpotlightCard className="md:col-span-5 p-6 sm:p-7 flex flex-col justify-between rounded-3xl group" enableSound>
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--secondary)] px-3 py-1 text-xs font-mono uppercase tracking-widest text-[var(--foreground)]">
                <Clock className="size-3.5 text-emerald-500" />
                <span>Local Time</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[11px] font-mono text-emerald-500 uppercase tracking-wider font-semibold">
                  Online &amp; Coding
                </span>
              </div>
            </div>

            <div className="my-5">
              <p className="text-3xl sm:text-4xl font-mono font-light tracking-tight text-[var(--foreground)] tabular-nums">
                {timeString || "04:45:00 PM"}
              </p>
              <p className="text-xs text-[var(--muted)] font-mono mt-1.5">
                Asia/Kolkata (GMT+5:30) • Jaipur
              </p>
            </div>
          </div>

          <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between text-xs font-mono text-[var(--muted)]">
            <span>Communication Vector</span>
            <span className="text-[var(--foreground)] font-medium">Quick to Reply</span>
          </div>
        </SpotlightCard>

        {/* 5. Spotify / Deep Work Focus Mode Equalizer (Span 4) */}
        <SpotlightCard className="md:col-span-4 p-5 sm:p-6 flex flex-col justify-between rounded-3xl group" enableSound>
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--secondary)] px-3 py-1 text-xs font-mono uppercase tracking-widest text-[var(--foreground)]">
                <Music className="size-3.5 text-[#1DB954]" />
                <span>Focus Mode</span>
              </div>
              <span className="text-[11px] font-mono text-[var(--muted)]">Live Audio</span>
            </div>

            {/* Sound Wave Animation Bars */}
            <div className="my-3 flex items-center gap-1.5 h-10 px-4 rounded-2xl bg-[var(--secondary)] border border-[var(--border)]">
              {[0.4, 0.9, 0.6, 1, 0.7, 0.4, 0.8, 0.5, 0.9, 0.3, 0.7, 0.5].map((h, i) => (
                <motion.div
                  key={i}
                  animate={{
                    scaleY: [h, 0.2 + ((i * 3) % 8) / 10, h],
                  }}
                  transition={{
                    duration: 1 + (i % 4) * 0.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="flex-1 rounded-full bg-[#1DB954] origin-bottom h-6"
                />
              ))}
            </div>

            <div className="space-y-0.5">
              <p className="text-xs sm:text-sm font-semibold text-[var(--foreground)]">Programming Flow State</p>
              <p className="text-[11px] text-[var(--muted)] font-mono">Lo-Fi Beats &amp; Synthwave</p>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-[var(--border)] flex items-center justify-between text-xs font-mono text-[var(--muted)]">
            <span>Spotify</span>
            <span className="text-[#1DB954] font-medium">Active</span>
          </div>
        </SpotlightCard>

        {/* 6. GitHub Contribution Pulse Heatmap (Span 8) */}
        <SpotlightCard className="md:col-span-8 p-5 sm:p-6 flex flex-col justify-between rounded-3xl group" enableSound>
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--secondary)] px-3 py-1 text-xs font-mono uppercase tracking-widest text-[var(--foreground)]">
                <GitBranch className="size-3.5 text-emerald-500" />
                <span>GitHub Engineering Pulse</span>
              </div>
              <a
                href="https://github.com/thenakshprajapat"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-[var(--muted)] hover:text-[var(--foreground)] inline-flex items-center gap-1 transition-colors"
              >
                <span>@thenakshprajapat</span>
                <ArrowUpRight className="size-3.5" />
              </a>
            </div>

            <div className="my-1">
              <p className="text-xs sm:text-sm text-[var(--foreground)] font-medium mb-2.5">
                <span className="text-emerald-500 font-bold">294+ contributions</span> in the last year
              </p>

              {/* Heatmap Grid */}
              <div className="overflow-x-auto pb-1 pt-0.5 scrollbar-none">
                <div className="flex gap-1.5 min-w-[500px]">
                  {HEATMAP.map((week, wIdx) => (
                    <div key={wIdx} className="flex flex-col gap-1.5">
                      {week.map((level, dIdx) => (
                        <div
                          key={dIdx}
                          onMouseEnter={() => {
                            setHoveredCell({ count: level * 3 });
                          }}
                          onMouseLeave={() => setHoveredCell(null)}
                          className={`w-3 h-3 rounded-sm transition-all duration-200 cursor-pointer hover:scale-125 ${getCellColor(
                            level
                          )}`}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-[var(--border)] flex items-center justify-between text-xs font-mono text-[var(--muted)]">
            <div className="flex items-center gap-2">
              <span>Less</span>
              <div className="flex gap-1">
                <span className="size-2 rounded-sm bg-black/10 dark:bg-white/5 border border-[var(--border)]" />
                <span className="size-2 rounded-sm bg-emerald-950 border border-emerald-900/40" />
                <span className="size-2 rounded-sm bg-emerald-700" />
                <span className="size-2 rounded-sm bg-emerald-500" />
                <span className="size-2 rounded-sm bg-emerald-300" />
              </div>
              <span>More</span>
            </div>

            <span>
              {hoveredCell ? `${hoveredCell.count} commits on this day` : "Consistent daily cadence"}
            </span>
          </div>
        </SpotlightCard>

        {/* 7. Standout "Discover All Projects" Link Card (Span 12) */}
        <Link
          href="/work"
          onMouseEnter={() => sound.playPop()}
          className="md:col-span-12 group relative flex items-center justify-between overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--card)] px-7 py-5 transition-all duration-200 hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/5"
        >
          <div className="flex items-center gap-3.5">
            <div className="p-2.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500">
              <FolderGit2 className="size-4 sm:size-5" />
            </div>
            <div>
              <p className="text-sm sm:text-base font-semibold text-[var(--foreground)] group-hover:text-emerald-500 transition-colors">
                Explore All Engineering Projects &amp; Experiments
              </p>
              <p className="text-xs font-mono text-[var(--muted)]">
                Contacts Sync Engine, NLP Paper Analyzer, CS Resources Hub
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-500 font-semibold shrink-0">
            <span className="hidden sm:inline">View Projects</span>
            <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </div>
        </Link>
      </div>
    </section>
  );
}
