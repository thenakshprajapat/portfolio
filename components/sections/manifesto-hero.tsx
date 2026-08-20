"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Github,
  Twitter,
  Linkedin,
  Mail,
  ArrowDown,
  ArrowUpRight,
  MapPin,
  Sparkles,
  Smartphone,
  Terminal,
  Layers,
} from "lucide-react";
import { sound } from "@/lib/sound";

const SOCIALS = [
  { icon: Github, href: "https://github.com/thenakshprajapat", label: "GitHub" },
  { icon: Twitter, href: "https://twitter.com/idevnaksh", label: "X / Twitter" },
  { icon: Linkedin, href: "https://linkedin.com/in/thenakshprajapat", label: "LinkedIn" },
  { icon: Mail, href: "mailto:hey@naksh.cc", label: "Email" },
];

const CRAFT_PILLARS = [
  {
    icon: Smartphone,
    title: "Android UI & 120Hz Motion",
    desc: "Physics-based spring curves, choreographed gestures, and perceived touch latency reduction.",
  },
  {
    icon: Terminal,
    title: "C++ & Systems Foundations",
    desc: "Cache-conscious memory layout, performance architectures, and algorithmic speed.",
  },
  {
    icon: Layers,
    title: "Distributed Realtime Web",
    desc: "Optimistic local state, real-time snapshot sync, and zero-jank frontend interactions.",
  },
];

export function ManifestoHero() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () =>
      setTime(
        new Intl.DateTimeFormat("en-US", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }).format(new Date())
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const scrollTo = (id: string) => {
    sound.playPop();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative pt-24 sm:pt-32 pb-12 sm:pb-16 px-6 sm:px-10 max-w-4xl mx-auto">
      {/* Background Soft Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[400px] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none -z-10" />

      <div className="space-y-8 sm:space-y-10">
        {/* Top Status Pill */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-wrap items-center gap-2.5"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--surface-elevated)] border border-[var(--border)] text-xs font-mono text-[var(--foreground)]">
            <span className="relative flex size-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full size-2 bg-emerald-400" />
            </span>
            <MapPin className="size-3 text-emerald-500" />
            <span>Jaipur, India</span>
            <span className="text-[var(--muted-foreground)]">•</span>
            <span className="tabular-nums text-emerald-600 dark:text-emerald-400">{time || "IST"}</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--surface)] border border-[var(--border)] text-xs font-mono text-[var(--muted)]">
            <Sparkles className="size-3 text-emerald-500" />
            <span>Available for projects</span>
          </div>
        </motion.div>

        {/* Main Headline (Refined, Less Bold, Smaller) */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="space-y-3"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[var(--foreground)] leading-[1.12]">
            Hey, I&apos;m <span className="gradient-green-text">Naksh</span>.
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-[var(--muted)] font-normal leading-snug">
            Software engineer building applications with obsession over{" "}
            <span className="text-[var(--foreground)] font-medium underline decoration-emerald-500/30 underline-offset-4">
              Android UI motion mechanics
            </span>
            , fluid gesture response, and C++ systems.
          </p>
        </motion.div>

        {/* Clean Concise About */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="space-y-3 text-sm sm:text-base text-[var(--muted)] leading-relaxed max-w-2xl"
        >
          <p>
            I&apos;m an independent developer based in Jaipur. I build standalone applications with attention to zero-jank frame rendering, distributed optimistic state, and tactile physics.
          </p>
        </motion.div>

        {/* Social Links & Primary CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-[var(--border)]"
        >
          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => scrollTo("work")}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-emerald-500 text-white font-mono text-xs font-medium uppercase tracking-wider hover:bg-emerald-600 transition-all shadow-md shadow-emerald-500/15 cursor-pointer"
            >
              <span>Explore Builds</span>
              <ArrowDown className="size-3" />
            </button>

            <button
              onClick={() => scrollTo("contact")}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full border border-[var(--border-strong)] bg-[var(--surface)] text-[var(--foreground)] font-mono text-xs font-medium uppercase tracking-wider hover:border-emerald-500 hover:text-emerald-500 transition-all cursor-pointer"
            >
              <span>Get in Touch</span>
              <ArrowUpRight className="size-3" />
            </button>
          </div>

          {/* Direct Social Links */}
          <div className="flex items-center gap-1.5">
            {SOCIALS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playPop()}
                aria-label={label}
                title={label}
                className="p-2.5 rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] hover:text-emerald-500 hover:border-emerald-500/40 transition-all cursor-pointer"
              >
                <Icon className="size-3.5" />
              </a>
            ))}
          </div>
        </motion.div>

        {/* 3 Core Craft Focus Pillars */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-4"
        >
          {CRAFT_PILLARS.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="rounded-2xl p-5 bg-[var(--card)] border border-[var(--border)] hover:border-emerald-500/30 transition-all space-y-2.5 shadow-sm"
            >
              <div className="size-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
                <Icon className="size-3.5" />
              </div>
              <h3 className="text-sm font-semibold text-[var(--foreground)]">{title}</h3>
              <p className="text-xs text-[var(--muted)] leading-relaxed">{desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
