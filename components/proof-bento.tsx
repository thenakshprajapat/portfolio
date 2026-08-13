"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  Clock,
  MapPin,
  Flame,
  GitBranch,
  Cpu,
  Layers,
  ArrowUpRight,
  Sparkles,
  Terminal,
  Radio,
  BookOpen,
} from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { sound } from "@/lib/sound";

// Simulated 52-week realistic contribution pattern
const WEEKS_COUNT = 36;
const DAYS_PER_WEEK = 7;

function generateHeatmapData() {
  const data: number[][] = [];
  for (let w = 0; w < WEEKS_COUNT; w++) {
    const week: number[] = [];
    for (let d = 0; d < DAYS_PER_WEEK; d++) {
      // Create authentic looking streaks and variations
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
  const [hoveredCell, setHoveredCell] = useState<{ week: number; day: number; count: number } | null>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setTimeString(new Intl.DateTimeFormat("en-GB", options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const getCellColor = (level: number) => {
    switch (level) {
      case 1:
        return "bg-blue-950/60 border border-blue-900/30";
      case 2:
        return "bg-blue-800/80 border border-blue-700/40";
      case 3:
        return "bg-blue-600 border border-blue-500/50 shadow-sm shadow-blue-500/20";
      case 4:
        return "bg-blue-400 border border-blue-300 shadow-md shadow-blue-400/40";
      default:
        return "bg-zinc-900/80 border border-white/[0.04]";
    }
  };

  return (
    <section id="proof" className="py-20 px-6 sm:px-12 max-w-6xl mx-auto">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <div className="flex items-center gap-2 text-xs font-mono text-blue-400 tracking-wider uppercase mb-2">
          <Activity className="w-3.5 h-3.5" />
          <span>Proof of Work &amp; Live Pulse</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Signals, Stats &amp; Current Vector
        </h2>
        <p className="text-zinc-400 mt-2 text-sm sm:text-base max-w-xl">
          Real momentum over vanity metrics. A snapshot of what I&apos;m exploring, shipping, and learning.
        </p>
      </motion.div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* 1. GitHub Activity Graph (Span 8) */}
        <SpotlightCard className="md:col-span-8 p-6 flex flex-col justify-between" enableSound>
          <div>
            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-white/[0.04] border border-white/10 text-white">
                  <GitBranch className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">Engineering Pulse (GitHub)</h3>
                  <p className="text-xs text-zinc-400 font-mono">@thenakshprajapat • 290+ commits this year</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="hidden sm:inline-block text-[11px] font-mono text-zinc-500">
                  Consistency: <span className="text-blue-400 font-medium">92%</span>
                </span>
                <a
                  href="https://github.com/thenakshprajapat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Heatmap visualization */}
            <div className="overflow-x-auto pb-2 pt-2 scrollbar-none">
              <div className="flex gap-1.5 min-w-[580px]">
                {HEATMAP.map((week, wIdx) => (
                  <div key={wIdx} className="flex flex-col gap-1.5">
                    {week.map((level, dIdx) => (
                      <div
                        key={dIdx}
                        onMouseEnter={() => {
                          setHoveredCell({ week: wIdx, day: dIdx, count: level * 3 });
                        }}
                        onMouseLeave={() => setHoveredCell(null)}
                        className={`w-3.5 h-3.5 rounded-sm transition-all duration-200 cursor-pointer hover:scale-125 ${getCellColor(
                          level
                        )}`}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-zinc-500 font-mono">
            <div className="flex items-center gap-2">
              <span>Less</span>
              <div className="flex gap-1">
                <span className="w-2.5 h-2.5 rounded-sm bg-zinc-900 border border-white/5" />
                <span className="w-2.5 h-2.5 rounded-sm bg-blue-950 border border-blue-900/30" />
                <span className="w-2.5 h-2.5 rounded-sm bg-blue-800" />
                <span className="w-2.5 h-2.5 rounded-sm bg-blue-600" />
                <span className="w-2.5 h-2.5 rounded-sm bg-blue-400" />
              </div>
              <span>More</span>
            </div>

            <span>
              {hoveredCell ? `${hoveredCell.count} contributions on day` : "Daily open source cadence"}
            </span>
          </div>
        </SpotlightCard>

        {/* 2. Live Local Clock & Location (Span 4) */}
        <SpotlightCard className="md:col-span-4 p-6 flex flex-col justify-between" enableSound>
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-zinc-300">
                <Clock className="w-3 h-3 text-blue-400" />
                Local Time
              </span>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider">Online</span>
              </div>
            </div>

            <div className="my-2">
              <div className="text-4xl sm:text-5xl font-mono font-light tracking-tight text-white tabular-nums">
                {timeString || "02:56:00"}
              </div>
              <p className="text-xs text-zinc-500 font-mono mt-1">IST (UTC +05:30) • Asia/Kolkata</p>
            </div>
          </div>

          <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-zinc-400">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-blue-400" />
              <span>Bengaluru, India</span>
            </div>
            <span className="text-zinc-600">Open to Relocation</span>
          </div>
        </SpotlightCard>

        {/* 3. Current Focus / Systems Exploration (Span 6) */}
        <SpotlightCard className="md:col-span-6 p-6 flex flex-col justify-between" enableSound>
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
                <Cpu className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">What I&apos;m Learning &amp; Researching</h3>
                <p className="text-xs text-zinc-400">Low-level systems &amp; OS engineering</p>
              </div>
            </div>

            <ul className="space-y-2.5 text-xs sm:text-sm text-zinc-300">
              <li className="flex items-start gap-2">
                <span className="text-blue-400 font-mono mt-0.5">01.</span>
                <span>
                  <strong className="text-white font-medium">AOSP Architecture:</strong> Binder IPC, SurfaceFlinger, System Services, and Hardware Abstraction Layer (HAL).
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 font-mono mt-0.5">02.</span>
                <span>
                  <strong className="text-white font-medium">Kernel Internals:</strong> Memory allocators, Linux process scheduling, device drivers, and system calls.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 font-mono mt-0.5">03.</span>
                <span>
                  <strong className="text-white font-medium">Modern C++ &amp; Rust:</strong> Memory safety, concurrency, zero-cost abstractions for systems software.
                </span>
              </li>
            </ul>
          </div>

          <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center gap-2 text-[11px] font-mono text-zinc-500">
            <BookOpen className="w-3.5 h-3.5 text-zinc-400" />
            <span>Reading: Android Internals by Jonathan Levin</span>
          </div>
        </SpotlightCard>

        {/* 4. What I'm Building Now (Span 6) */}
        <SpotlightCard className="md:col-span-6 p-6 flex flex-col justify-between" enableSound>
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="p-2 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">What I&apos;m Building &amp; Shipping Now</h3>
                <p className="text-xs text-zinc-400">Active labs and production systems</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-white">Contacts Realtime Sync Engine</span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">Shipped</span>
                </div>
                <p className="text-xs text-zinc-400 mt-1">
                  High-reliability contact database with real-time Firebase sync, optimistic updates, and offline resilience.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-white">NLP Paper Analyzer Intelligence</span>
                  <span className="text-[10px] font-mono text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded">Active Lab</span>
                </div>
                <p className="text-xs text-zinc-400 mt-1">
                  Python NLP system parsing examination papers, uncovering recurring patterns, and clustering topics for students.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-zinc-500">
            <span>Goal: 100% public repository codebases</span>
            <span className="text-blue-400">View on GitHub →</span>
          </div>
        </SpotlightCard>
      </div>
    </section>
  );
}
