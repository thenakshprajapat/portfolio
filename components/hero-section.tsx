"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowDownRight, Terminal, Sparkles, Send, Command } from "lucide-react";
import Link from "next/link";
import { sound } from "@/lib/sound";

export function HeroSection({ onOpenCommand }: { onOpenCommand: () => void }) {
  const scrollTo = (id: string) => {
    sound.playClick();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex flex-col justify-center items-start pt-28 pb-16 px-6 sm:px-12 max-w-6xl mx-auto overflow-hidden"
    >
      {/* Subtle Background Glow Accent (Electric Blue / Linear style) */}
      <div className="pointer-events-none absolute -top-40 right-0 w-[550px] h-[550px] rounded-full bg-blue-600/10 blur-[130px] -z-10" />
      <div className="pointer-events-none absolute top-1/2 -left-40 w-[400px] h-[400px] rounded-full bg-sky-500/5 blur-[120px] -z-10" />

      {/* Top Status Beacon */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="mb-8"
      >
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
          </span>
          <span className="text-xs font-mono text-zinc-300">
            Available for internships &amp; systems engineering
          </span>
          <span className="text-zinc-600">•</span>
          <span className="text-xs font-mono text-zinc-400">18 y/o CS</span>
        </div>
      </motion.div>

      {/* Large Statement Title */}
      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="text-[2.75rem] sm:text-6xl md:text-7xl lg:text-[5.25rem] font-bold tracking-tight text-white leading-[1.06] mb-8"
      >
        Building software,{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-white">
          systems
        </span>
        , and a future worth documenting.
      </motion.h1>

      {/* Sub-narrative introduction */}
      <motion.p
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="text-lg sm:text-xl md:text-2xl text-zinc-400 max-w-2xl leading-relaxed font-normal mb-10"
      >
        Hi, I&apos;m <span className="text-zinc-100 font-medium">Naksh Prajapati</span>. Computer Science
        student &amp; aspiring <span className="text-blue-400 font-medium">Android OS / AOSP developer</span>.
        I study the layers beneath the UI — kernels, IPC mechanisms, and high-craft product architecture.
      </motion.p>

      {/* Actions / CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-wrap items-center gap-4"
      >
        <button
          onClick={() => scrollTo("projects")}
          onMouseEnter={() => sound.playPop()}
          className="group relative inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-white text-zinc-950 font-medium text-sm transition-all duration-200 hover:bg-zinc-200 active:scale-[0.98] shadow-lg shadow-white/5"
        >
          <span>View Projects</span>
          <ArrowDownRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
        </button>

        <button
          onClick={() => scrollTo("contact")}
          onMouseEnter={() => sound.playPop()}
          className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl border border-white/10 bg-white/[0.04] text-zinc-300 font-medium text-sm backdrop-blur-sm transition-all duration-200 hover:bg-white/[0.08] hover:text-white hover:border-white/20 active:scale-[0.98]"
        >
          <Send className="w-4 h-4 text-blue-400" />
          <span>Contact Me</span>
        </button>

        <button
          onClick={() => {
            sound.playPop();
            onOpenCommand();
          }}
          className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl border border-white/5 bg-transparent text-zinc-500 font-mono text-xs hover:text-zinc-300 hover:border-white/15 transition-all"
        >
          <Command className="w-3.5 h-3.5 text-zinc-400" />
          <span className="hidden sm:inline">Press</span>
          <kbd className="px-1.5 py-0.5 bg-white/5 border border-white/10 rounded text-[10px]">⌘K</kbd>
        </button>
      </motion.div>

      {/* Subtle Micro-Ticker / Current Focus pill */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="mt-14 pt-8 border-t border-white/[0.06] w-full flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-zinc-500"
      >
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-blue-400" />
          <span>CURRENT FOCUS:</span>
          <span className="text-zinc-300">Android OS Internals • Binder IPC • Linux Kernel • C++</span>
        </div>
        <div className="flex items-center gap-3">
          <span>Based in Bengaluru, India</span>
          <span className="text-zinc-600">•</span>
          <span className="text-zinc-400">GMT+5:30</span>
        </div>
      </motion.div>
    </section>
  );
}
