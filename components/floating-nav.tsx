"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Volume2,
  VolumeX,
  Menu,
  X,
  Command,
  Sun,
  Moon,
} from "lucide-react";
import Link from "next/link";
import { sound } from "@/lib/sound";

const NAV_ITEMS = [
  { href: "/", label: "Overview" },
  { href: "/work", label: "Work" },
  { href: "/mind", label: "Mind" },
  { href: "/journey", label: "Journey" },
  { href: "/lab", label: "Lab & Stack" },
  { href: "/contact", label: "Contact" },
];

export function FloatingNav({ onOpenCommand }: { onOpenCommand: () => void }) {
  const pathname = usePathname();
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isDark, setIsDark] = useState<boolean>(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    setIsMuted(sound.getMuted());
    const darkActive = document.documentElement.classList.contains("dark");
    setIsDark(darkActive);
  }, []);

  const toggleTheme = () => {
    sound.playClick();
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const handleNavClick = (href: string) => {
    sound.playClick();
    setMobileMenuOpen(false);
  };

  const toggleSound = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  return (
    <header className="fixed top-5 inset-x-0 z-40 flex justify-center px-4 pointer-events-none">
      <div className="pointer-events-auto flex items-center justify-between gap-2 sm:gap-4 px-3.5 sm:px-4 py-2 rounded-full border border-[var(--border)] bg-[var(--card)]/80 backdrop-blur-2xl shadow-xl shadow-black/5 dark:shadow-black/80 max-w-4xl w-full">
        {/* Brand / Logo */}
        <Link
          href="/"
          onClick={() => handleNavClick("/")}
          className="flex items-center gap-2 px-2 py-1 text-sm font-semibold text-[var(--foreground)] tracking-tight hover:text-emerald-500 transition-colors"
        >
          <span className="size-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981]" />
          <span className="font-mono text-xs sm:text-sm font-semibold tracking-tight">naksh.dev</span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-0.5">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => handleNavClick(item.href)}
                className={`relative px-3 py-1.5 rounded-full text-xs font-mono transition-colors ${
                  isActive ? "text-[var(--foreground)] font-semibold" : "text-[var(--muted)] hover:text-[var(--foreground)]"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-nav-pill"
                    className="absolute inset-0 rounded-full bg-[var(--secondary)] border border-[var(--border-highlight)] -z-10"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Controls: Theme Toggle, Sound & Command Palette */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Theme Switcher Toggle */}
          <button
            onClick={toggleTheme}
            aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            className="p-1.5 sm:p-2 rounded-full bg-[var(--secondary)] border border-[var(--border)] text-[var(--muted)] hover:text-[var(--foreground)] hover:border-[var(--border-highlight)] transition-colors"
          >
            {isDark ? <Sun className="size-3.5 text-amber-400" /> : <Moon className="size-3.5 text-emerald-600" />}
          </button>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            aria-label={isMuted ? "Unmute sound effects" : "Mute sound effects"}
            title={isMuted ? "Unmute sound effects" : "Mute sound effects"}
            className="p-1.5 sm:p-2 rounded-full bg-[var(--secondary)] border border-[var(--border)] text-[var(--muted)] hover:text-[var(--foreground)] hover:border-[var(--border-highlight)] transition-colors"
          >
            {isMuted ? <VolumeX className="size-3.5" /> : <Volume2 className="size-3.5 text-emerald-500" />}
          </button>

          {/* Search Trigger */}
          <button
            onClick={() => {
              sound.playPop();
              onOpenCommand();
            }}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--secondary)] hover:border-[var(--border-highlight)] border border-[var(--border)] text-xs font-mono text-[var(--foreground)] transition-colors"
          >
            <Command className="size-3 text-[var(--muted)]" />
            <span>Search</span>
            <kbd className="px-1.5 py-0.5 rounded bg-black/10 dark:bg-black/40 text-[10px] text-[var(--muted)] border border-[var(--border)] font-mono">
              ⌘K
            </kbd>
          </button>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full bg-[var(--secondary)] border border-[var(--border)] text-[var(--foreground)]"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="pointer-events-auto md:hidden fixed top-18 inset-x-4 p-5 rounded-3xl border border-[var(--border)] bg-[var(--card)]/95 backdrop-blur-2xl shadow-2xl space-y-1.5"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className={`w-full flex items-center justify-between px-4 py-2.5 rounded-2xl text-left text-sm font-mono transition-colors ${
                    isActive
                      ? "bg-emerald-500/15 text-emerald-500 font-semibold border border-emerald-500/25"
                      : "text-[var(--foreground)] hover:bg-[var(--secondary)]"
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="size-1.5 rounded-full bg-emerald-500" />}
                </Link>
              );
            })}

            <div className="pt-3 mt-2 border-t border-[var(--border)] flex items-center justify-between px-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCommand();
                }}
                className="flex items-center gap-2 text-xs font-mono text-[var(--muted)]"
              >
                <Command className="size-3.5" />
                <span>Command Palette (⌘K)</span>
              </button>

              <button
                onClick={toggleTheme}
                className="flex items-center gap-1.5 text-xs font-mono text-[var(--muted)]"
              >
                {isDark ? <Sun className="size-3.5 text-amber-400" /> : <Moon className="size-3.5 text-emerald-600" />}
                <span>{isDark ? "Light" : "Dark"}</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
