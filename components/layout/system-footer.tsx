"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, ArrowUpRight, Github, Twitter, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import { sound } from "@/lib/sound";

interface NameTranslation {
  name: string;
  lang: string;
  label: string;
}

const NAME_TRANSLATIONS: NameTranslation[] = [
  { name: "Naksh Prajapati", lang: "English", label: "EN" },
  { name: "नक्ष प्रजापति", lang: "हिन्दी", label: "HI" },
  { name: "نکش پرجاپتی", lang: "اردو", label: "UR" },
  { name: "Naksh Prajapati", lang: "Français", label: "FR" },
  { name: "纳克什 普拉贾帕蒂", lang: "中文", label: "ZH" },
  { name: "ナクシュ・プラジャパティ", lang: "日本語", label: "JA" },
];

export function SystemFooter() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [time, setTime] = useState("");

  // Cycle name through different languages every 2.8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % NAME_TRANSLATIONS.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  // Update IST time
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

  const scrollToTop = () => {
    sound.playClick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentTranslation = NAME_TRANSLATIONS[currentIdx];

  return (
    <footer className="relative z-10 border-t border-[var(--border)] bg-[var(--background-subtle)] pt-16 sm:pt-20 pb-10 overflow-hidden">
      {/* Background Soft Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 size-[500px] rounded-full bg-gradient-to-t from-emerald-500/10 via-teal-500/5 to-transparent blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 sm:px-10 space-y-12 sm:space-y-14 relative z-10">
        {/* Call to Action Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[var(--border)] pb-12">
          <div className="space-y-2.5 max-w-lg">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-500 font-semibold">
              Initiate Collaboration
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-[var(--foreground)] leading-tight">
              Have an ambitious project in mind?
            </h2>
            <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed">
              Whether you need high-performance Android UI gesture engineering, distributed web systems, or autonomous product development — let&apos;s build it.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <a
              href="mailto:hey@naksh.cc"
              onClick={() => sound.playPop()}
              className="inline-flex items-center gap-1.5 px-6 py-3 rounded-full bg-emerald-500 text-white font-mono text-xs font-medium uppercase tracking-wider hover:bg-emerald-600 transition-all shadow-md shadow-emerald-500/20"
            >
              <span>hey@naksh.cc</span>
              <ArrowUpRight className="size-3.5" />
            </a>

            <button
              onClick={scrollToTop}
              className="p-3 rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] hover:text-[var(--foreground)] hover:border-emerald-500/40 transition-colors cursor-pointer"
              title="Back to Top"
            >
              <ArrowUp className="size-3.5" />
            </button>
          </div>
        </div>

        {/* Big Kinetic Multilingual Name Display (Refined scale & weight) */}
        <div className="py-6 sm:py-8 border-b border-[var(--border)]">
          <div className="flex items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-xs font-mono text-[var(--muted)] uppercase tracking-widest">
                Identity &amp; Origin
              </span>
            </div>

            {/* Language Tag Badge */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[var(--surface)] border border-[var(--border)] text-xs font-mono text-emerald-500">
              <span className="font-semibold">{currentTranslation.label}</span>
              <span className="text-[var(--muted-foreground)]">•</span>
              <span className="text-[var(--muted)]">{currentTranslation.lang}</span>
            </div>
          </div>

          {/* Animated Name Text (Refined sizing: text-3xl to text-6xl, medium weight) */}
          <div className="min-h-[60px] sm:min-h-[90px] md:min-h-[110px] flex items-center overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTranslation.name + currentTranslation.lang}
                initial={{ y: 30, opacity: 0, filter: "blur(6px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                exit={{ y: -30, opacity: 0, filter: "blur(6px)" }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="w-full"
              >
                <span className="block text-3xl sm:text-5xl md:text-6xl font-medium tracking-tight text-[var(--foreground)] hover:text-emerald-500 transition-colors select-none leading-none">
                  {currentTranslation.name}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom Metadata & Social Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-[var(--muted)]">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5">
            <span className="text-[var(--foreground)] font-medium">Naksh Prajapati</span>
            <span>•</span>
            <span>Jaipur, India (IST)</span>
            <span>•</span>
            <span className="tabular-nums text-emerald-500">{time || "06:00:00 PM"}</span>
            <span>•</span>
            <span>&copy; {new Date().getFullYear()}</span>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/#work" className="hover:text-emerald-500 transition-colors">
              Work
            </Link>
            <Link href="/#mind" className="hover:text-emerald-500 transition-colors">
              Dispatches
            </Link>
            <Link href="/about" className="hover:text-emerald-500 transition-colors">
              About
            </Link>
            <Link href="/contact" className="hover:text-emerald-500 transition-colors">
              Contact
            </Link>
            <div className="h-3 w-px bg-[var(--border)]" />
            <a
              href="https://github.com/thenakshprajapat"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-500 transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://twitter.com/idevnaksh"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-500 transition-colors"
            >
              X
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
