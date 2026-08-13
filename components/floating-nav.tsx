"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  FolderGit2,
  BookOpen,
  Milestone,
  Wrench,
  Send,
  Command,
  Volume2,
  VolumeX,
  Menu,
  X,
  Activity,
} from "lucide-react";
import Link from "next/link";
import { sound } from "@/lib/sound";

const NAV_ITEMS = [
  { id: "hero", label: "Overview" },
  { id: "proof", label: "Proof" },
  { id: "projects", label: "Projects" },
  { id: "journey", label: "Journey" },
  { id: "writing", label: "Writing" },
  { id: "toolbox", label: "Toolbox" },
  { id: "contact", label: "Contact" },
];

export function FloatingNav({ onOpenCommand }: { onOpenCommand: () => void }) {
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    setIsMuted(sound.getMuted());

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const item of NAV_ITEMS) {
        const element = document.getElementById(item.id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    sound.playClick();
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const toggleSound = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  return (
    <header className="fixed top-5 inset-x-0 z-40 flex justify-center px-4 pointer-events-none">
      <div className="pointer-events-auto flex items-center justify-between gap-2 sm:gap-4 px-3 sm:px-4 py-2 rounded-full border border-white/[0.08] bg-[#121214]/80 backdrop-blur-xl shadow-2xl shadow-black/80 max-w-4xl w-full">
        {/* Brand / Logo */}
        <button
          onClick={() => scrollTo("hero")}
          className="flex items-center gap-2 px-2 py-1 text-sm font-semibold text-white tracking-tight hover:text-blue-400 transition-colors"
        >
          <span className="w-2 h-2 rounded-full bg-blue-500 shadow-sm shadow-blue-500/80" />
          <span className="font-mono text-xs sm:text-sm">naksh.dev</span>
        </button>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`relative px-3 py-1.5 rounded-full text-xs font-mono transition-colors ${
                  isActive ? "text-white font-medium" : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-nav-pill"
                    className="absolute inset-0 rounded-full bg-white/[0.08] border border-white/[0.12] -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Controls: Sound & Command Palette */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={toggleSound}
            aria-label={isMuted ? "Unmute sound effects" : "Mute sound effects"}
            className="p-2 rounded-full bg-white/[0.03] border border-white/[0.06] text-zinc-400 hover:text-white hover:bg-white/[0.08] transition-colors"
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-blue-400" />}
          </button>

          <button
            onClick={() => {
              sound.playPop();
              onOpenCommand();
            }}
            className="hidden sm:flex items-center gap-2 px-2.5 py-1.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] text-xs font-mono text-zinc-300 transition-colors"
          >
            <Command className="w-3 h-3 text-zinc-400" />
            <span>Search</span>
            <kbd className="px-1.5 py-0.2 rounded bg-black/40 text-[10px] text-zinc-400 border border-white/5">
              ⌘K
            </kbd>
          </button>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full bg-white/[0.03] border border-white/[0.06] text-zinc-300"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="pointer-events-auto md:hidden fixed top-20 inset-x-4 p-4 rounded-2xl border border-white/10 bg-[#121214]/95 backdrop-blur-2xl shadow-2xl space-y-1"
        >
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-left text-sm font-mono transition-colors ${
                activeSection === item.id
                  ? "bg-blue-600/15 text-blue-400 font-medium border border-blue-500/20"
                  : "text-zinc-300 hover:bg-white/5"
              }`}
            >
              <span>{item.label}</span>
              {activeSection === item.id && <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />}
            </button>
          ))}

          <div className="pt-2 mt-2 border-t border-white/[0.08] flex items-center justify-between px-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCommand();
              }}
              className="flex items-center gap-2 text-xs font-mono text-zinc-400"
            >
              <Command className="w-3.5 h-3.5" />
              <span>Command Palette (⌘K)</span>
            </button>
          </div>
        </motion.div>
      )}
    </header>
  );
}
