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
  Coffee,
  Smartphone,
  Terminal,
  Layers,
  Zap,
  Code2,
} from "lucide-react";
import { MarqueeTicker } from "@/components/ui/marquee-ticker";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { sound } from "@/lib/sound";

const SKILLS_TAPE = [
  { label: "Independent Developer" },
  { label: "Android UI & 120fps Motion" },
  { label: "C / C++ Systems" },
  { label: "React 19 & Next.js" },
  { label: "Firebase & Firestore" },
  { label: "Python" },
  { label: "Physics-based Gestures" },
  { label: "TypeScript" },
  { label: "Solo Full-Stack" },
  { label: "Clean Code Craft" },
];

const SOCIALS = [
  { icon: Github, href: "https://github.com/thenakshprajapat", label: "GitHub" },
  { icon: Twitter, href: "https://twitter.com/idevnaksh", label: "Twitter" },
  { icon: Linkedin, href: "https://linkedin.com/in/thenakshprajapat", label: "LinkedIn" },
  { icon: Mail, href: "mailto:hey@naksh.cc", label: "Email" },
];

const HIGHLIGHT_CARDS = [
  {
    icon: Smartphone,
    title: "Android UI & Motion",
    desc: "120Hz gesture response, spring physics, and fluid interactions engineered for maximum smoothness.",
    tag: "Primary Focus",
    tagColor: "bg-sky-500/10 text-sky-400 border-sky-500/20",
  },
  {
    icon: Terminal,
    title: "C++ & Systems",
    desc: "Memory management, algorithmic optimization, and deep understanding of how hardware executes code.",
    tag: "Core Foundation",
    tagColor: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
  },
  {
    icon: Layers,
    title: "End-to-End Shipping",
    desc: "Taking ideas from blank canvas to production web and mobile apps with realtime backend pipelines.",
    tag: "Solo Builder",
    tagColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  },
];

function LetterByLetter({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <>
      {text.split("").map((c, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: delay + i * 0.05, ease: [0.23, 1, 0.32, 1] }}
        >
          {c === " " ? "\u00A0" : c}
        </motion.span>
      ))}
    </>
  );
}

export function ManifestoHero() {
  const [time, setTime] = useState("");
  const [coffeeCount, setCoffeeCount] = useState(3);

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

  const incrementCoffee = () => {
    sound.playSuccess();
    setCoffeeCount((c) => c + 1);
  };

  const scrollTo = (id: string) => {
    sound.playPop();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-between pt-20 sm:pt-24 pb-10 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 w-[750px] h-[350px] bg-gradient-to-b from-sky-500/10 via-indigo-500/5 to-transparent blur-[100px] -z-10" />

      {/* Grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03] -z-10"
        style={{
          backgroundImage:
            "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative z-10 px-5 sm:px-8 lg:px-12 max-w-6xl mx-auto w-full">
        {/* Top meta badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center gap-3 mb-8"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--surface-elevated)] border border-[var(--border-strong)] text-xs font-mono text-[var(--foreground)] shadow-sm">
            <span className="relative flex size-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
              <span className="relative inline-flex rounded-full size-2 bg-sky-500" />
            </span>
            <MapPin className="size-3 text-sky-400" />
            <span>Jaipur, India</span>
            <span className="text-[var(--muted-foreground)]">·</span>
            <span className="tabular-nums text-sky-300 font-medium">{time || "IST"}</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--surface)] border border-[var(--border)] text-xs font-mono text-[var(--muted)]">
            <Zap className="size-3 text-amber-400" />
            <span>Role: Independent Developer</span>
          </div>
        </motion.div>

        {/* Main Headline & Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-8 space-y-6">
            <div>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="block text-sm sm:text-base font-mono text-[var(--muted)] tracking-wide mb-2"
              >
                Independent Developer
              </motion.span>
              <h1 className="text-[clamp(3.2rem,8vw,7rem)] font-bold tracking-[-0.03em] leading-[0.95] text-[var(--foreground)]">
                <LetterByLetter text="Naksh." delay={0.3} />
              </h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="text-lg sm:text-xl text-[var(--muted)] max-w-2xl leading-relaxed"
            >
              I build and ship software independently. Obsessed with{" "}
              <span className="text-[var(--foreground)] font-semibold">Android UI motion</span>,
              interaction physics, and low-level systems. I turn raw ideas into finished, high-performance products.
            </motion.p>

            {/* Action buttons & Socials */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <MagneticButton
                as="button"
                onClick={() => scrollTo("work")}
                strength={0.2}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[var(--foreground)] text-[var(--background)] font-bold text-sm hover:bg-sky-400 hover:text-[#040914] shadow-lg shadow-sky-500/10 transition-all cursor-pointer"
              >
                <span>View Projects</span>
                <ArrowDown className="size-4" />
              </MagneticButton>

              <MagneticButton
                as="button"
                onClick={() => scrollTo("contact")}
                strength={0.2}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-[var(--border-strong)] bg-[var(--surface)] text-[var(--foreground)] text-sm font-semibold hover:border-sky-400 hover:text-sky-400 transition-all cursor-pointer"
              >
                <span>Let&apos;s Talk</span>
                <ArrowUpRight className="size-4" />
              </MagneticButton>

              <div className="flex items-center gap-2 pl-2">
                {SOCIALS.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.playPop()}
                    aria-label={label}
                    className="p-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] hover:text-sky-400 hover:border-sky-500/40 transition-all"
                  >
                    <Icon className="size-4" />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Independent Developer Live Status Card with interactive coffee widget */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="lg:col-span-4"
          >
            <div className="bento-card p-6 space-y-5 bg-gradient-to-br from-[var(--surface-elevated)] to-[var(--surface)] border-[var(--border-strong)] shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-[var(--border)]">
                <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[var(--foreground)]">
                  <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                  Independent Builder Mode
                </div>
                <span className="text-[10px] font-mono text-[var(--muted)]">2026</span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between py-1 border-b border-[var(--border)]">
                  <span className="text-[var(--muted)]">Role</span>
                  <span className="font-mono font-bold text-sky-400">Independent Developer</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-[var(--border)]">
                  <span className="text-[var(--muted)]">Focus</span>
                  <span className="font-mono font-medium text-[var(--foreground)]">Android Motion & Systems</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-[var(--border)]">
                  <span className="text-[var(--muted)]">Contact</span>
                  <a href="mailto:hey@naksh.cc" className="font-mono text-sky-400 hover:underline">
                    hey@naksh.cc
                  </a>
                </div>
              </div>

              {/* Interactive Coffee Widget */}
              <div className="p-3.5 rounded-xl bg-[var(--surface)] border border-[var(--border)] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="size-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                    <Coffee className="size-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono font-bold text-[var(--foreground)]">
                      Coffee done
                    </div>
                    <div className="text-[10px] font-mono text-[var(--muted)]">
                      {coffeeCount} cups brewed
                    </div>
                  </div>
                </div>
                <button
                  onClick={incrementCoffee}
                  className="px-2.5 py-1 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border-strong)] hover:border-amber-400 text-[10px] font-mono font-semibold text-amber-400 transition-colors cursor-pointer"
                  title="Click to brew another cup"
                >
                  +1 Cup
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Feature pillars */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-14"
        >
          {HIGHLIGHT_CARDS.map(({ icon: Icon, title, desc, tag, tagColor }) => (
            <div key={title} className="bento-card p-5 space-y-3 bg-[var(--surface)] hover:border-sky-500/30 transition-all">
              <div className="flex items-center justify-between">
                <div className="size-9 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border)] flex items-center justify-center text-sky-400">
                  <Icon className="size-4" />
                </div>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${tagColor}`}>
                  {tag}
                </span>
              </div>
              <h3 className="text-sm font-bold text-[var(--foreground)]">{title}</h3>
              <p className="text-xs text-[var(--muted)] leading-relaxed">{desc}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Marquee ticker */}
      <div className="border-t border-[var(--border)] bg-[var(--surface)]/70 backdrop-blur-sm py-3.5 mt-16">
        <MarqueeTicker
          items={SKILLS_TAPE}
          speed={36}
          separator="✦"
          itemClassName="text-[var(--muted)] text-xs font-mono tracking-wider uppercase hover:text-sky-300 transition-colors"
        />
      </div>
    </section>
  );
}
