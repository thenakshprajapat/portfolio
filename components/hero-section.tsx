"use client";

import React from "react";
import { motion } from "framer-motion";
import { Terminal, Mail, ArrowUpRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { sound } from "@/lib/sound";

export function HeroSection({ onOpenCommand }: { onOpenCommand: () => void }) {
  return (
    <section
      id="hero"
      className="relative min-h-[86vh] flex flex-col justify-center items-start pt-28 pb-16 px-6 sm:px-12 max-w-5xl mx-auto"
    >
      <div className="relative z-10 flex h-full grow flex-col justify-center gap-7 w-full">
        {/* Top Status Beacon */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex w-fit items-center gap-2.5 rounded-full border border-[var(--border)] bg-[var(--card)]/80 py-1.5 pl-3 pr-4 backdrop-blur-md shadow-sm">
            <div className="relative size-2">
              <div className="absolute size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <div className="size-full rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
            </div>
            <p className="text-xs font-mono text-[var(--foreground)]">
              Building software &amp; exploring technology
            </p>
            <span className="text-[var(--muted)]">•</span>
            <p className="text-xs font-mono text-[var(--muted)]">Jaipur, IN</p>
          </div>
        </motion.div>

        {/* Developer-Tuned Statement Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-1"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[var(--foreground)] leading-[1.18]">
            Hi, I&apos;m{" "}
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-green-500">
              Naksh.
            </span>
            <br />
            I build software and explore what makes interfaces{" "}
            <span className="italic font-normal text-[var(--muted)]">feel alive.</span>
          </h1>
        </motion.div>

        {/* Narrative Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-2.5 max-w-2xl text-sm sm:text-base text-[var(--muted)] leading-relaxed font-normal"
        >
          <p>
            I&apos;m a programmer who loves building things, exploring technology, and understanding why certain software simply feels better to use.
          </p>
          <p>
            I&apos;m particularly fascinated by <span className="text-[var(--foreground)] font-medium">Android UI</span> — the tiny details, fluid animations, gesture responsiveness, and perceived smoothness that make an interface feel responsive and polished. Outside of code, I love meeting developers, networking, and teaching what I learn.
          </p>
        </motion.div>

        {/* Action Row: Small Circular Social Buttons + Compact Get In Touch CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center gap-3 pt-2"
        >
          {/* GitHub Circular Button */}
          <a
            aria-label="GitHub Profile"
            href="https://github.com/thenakshprajapat"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => sound.playPop()}
            className="size-10 sm:size-11 rounded-full flex items-center justify-center border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] shadow-sm transition-all duration-200 hover:border-emerald-500 hover:text-emerald-500 hover:scale-105 active:scale-95"
            title="GitHub"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4 sm:size-5">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
          </a>

          {/* LinkedIn Circular Button */}
          <a
            aria-label="LinkedIn Profile"
            href="https://linkedin.com/in/thenakshprajapat"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => sound.playPop()}
            className="size-10 sm:size-11 rounded-full flex items-center justify-center border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] shadow-sm transition-all duration-200 hover:border-emerald-500 hover:text-emerald-500 hover:scale-105 active:scale-95"
            title="LinkedIn"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4 sm:size-5">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>

          {/* X (Twitter) Circular Button */}
          <a
            aria-label="X Profile"
            href="https://twitter.com/idevnaksh"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => sound.playPop()}
            className="size-10 sm:size-11 rounded-full flex items-center justify-center border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] shadow-sm transition-all duration-200 hover:border-emerald-500 hover:text-emerald-500 hover:scale-105 active:scale-95"
            title="X / Twitter"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4 sm:size-4.5">
              <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
            </svg>
          </a>

          {/* Email Direct Circular Button */}
          <a
            aria-label="Direct Email"
            href="mailto:hello@nakshdev.tech"
            onMouseEnter={() => sound.playPop()}
            className="size-10 sm:size-11 rounded-full flex items-center justify-center border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] shadow-sm transition-all duration-200 hover:border-emerald-500 hover:text-emerald-500 hover:scale-105 active:scale-95"
            title="Email"
          >
            <Mail className="size-4 sm:size-4.5" />
          </a>

          {/* Compact Primary CTA Button */}
          <Link
            href="/contact"
            onMouseEnter={() => sound.playPop()}
            className="group relative flex items-center justify-center gap-1.5 h-10 sm:h-11 px-5 rounded-full border border-[var(--border)] bg-[var(--foreground)] text-[var(--background)] hover:bg-emerald-500 hover:text-black font-mono text-xs font-semibold uppercase tracking-wider transition-all duration-200 hover:scale-[1.02] active:scale-98 shadow-sm ml-1"
          >
            <span>Get In Touch</span>
            <ArrowUpRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </motion.div>

        {/* Bottom Focus & Geo Ticker */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="mt-8 pt-6 border-t border-[var(--border)] w-full flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[var(--muted)]"
        >
          <div className="flex items-center gap-2">
            <Terminal className="size-3.5 text-emerald-500" />
            <span className="font-semibold text-[var(--foreground)]">FOCUS:</span>
            <span>Android UI Motion • C++ • Modern Web • Python • Firebase</span>
          </div>
          <div className="flex items-center gap-2">
            <span>Jaipur, India</span>
            <span>•</span>
            <span className="text-[var(--foreground)]">GMT+5:30</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
