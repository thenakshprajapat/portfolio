"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Menu, X, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { sound } from "@/lib/sound";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const NAV = [
  { id: "hero", label: "Overview", href: "/#hero" },
  { id: "work", label: "Work", href: "/#work" },
  { id: "signal", label: "Activity", href: "/#signal" },
  { id: "mind", label: "Writing", href: "/#mind" },
  { id: "contact", label: "Contact", href: "/#contact" },
];

export function SystemHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMuted, setIsMuted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    setIsMuted(sound.getMuted());
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Section observer for active state on home page
  useEffect(() => {
    if (pathname !== "/") return;
    const ids = ["hero", "work", "signal", "mind", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { threshold: 0.25 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [pathname]);

  const handleNav = (id: string, href: string) => {
    sound.playClick();
    setMobileOpen(false);
    if (pathname === "/") {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    router.push(href);
  };

  const handleBrandClick = () => {
    sound.playClick();
    setMobileOpen(false);
    if (pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      router.push("/");
    }
  };

  return (
    <>
      <header className="fixed top-4 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
        <div
          className={`pointer-events-auto flex items-center justify-between gap-3 px-3.5 py-2 rounded-full border transition-all duration-300 max-w-3xl w-full ${
            scrolled
              ? "glass-nav shadow-xl shadow-black/20"
              : "glass-nav shadow-md shadow-black/10"
          }`}
        >
          {/* Brand */}
          <button
            onClick={handleBrandClick}
            className="flex items-center gap-2 px-2 py-1 text-xs font-semibold text-[var(--foreground)] tracking-tight hover:text-emerald-500 transition-colors cursor-pointer group"
          >
            <span className="relative flex size-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full size-2 bg-emerald-400" />
            </span>
            <span className="font-mono tracking-tight group-hover:text-emerald-500">
              naksh.cc
            </span>
          </button>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV.map((item) => {
              const active = pathname === "/" ? activeSection === item.id : pathname.includes(item.id);
              return (
                <button
                  key={item.label}
                  onClick={() => handleNav(item.id, item.href)}
                  className={`relative px-3 py-1 rounded-full text-xs font-mono transition-all cursor-pointer ${
                    active
                      ? "text-emerald-500 font-medium"
                      : "text-[var(--muted)] hover:text-[var(--foreground)]"
                  }`}
                >
                  {active && (
                    <motion.div
                      layoutId="header-active-pill"
                      className="absolute inset-0 rounded-full bg-emerald-500/10 border border-emerald-500/20 -z-10"
                      transition={{ type: "spring", stiffness: 450, damping: 35 }}
                    />
                  )}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Controls: Audio + Theme Toggle + Contact CTA */}
          <div className="flex items-center gap-1.5">
            {/* Theme Toggle (Light / Dark) */}
            <ThemeToggle />

            {/* Audio Toggle */}
            <button
              onClick={() => setIsMuted(sound.toggleMute())}
              aria-label="Toggle haptic audio"
              title={isMuted ? "Sound is muted" : "Sound is active"}
              className="p-2 rounded-full bg-[var(--surface-elevated)] border border-[var(--border)] text-[var(--muted)] hover:text-[var(--foreground)] hover:border-emerald-500/30 transition-all cursor-pointer"
            >
              {isMuted ? <VolumeX className="size-3.5" /> : <Volume2 className="size-3.5 text-emerald-500" />}
            </button>

            <button
              onClick={() => handleNav("contact", "/#contact")}
              className="hidden sm:inline-flex items-center gap-1 h-7 px-3.5 rounded-full bg-emerald-500 text-white hover:bg-emerald-600 font-mono text-[11px] font-medium uppercase tracking-wider transition-all shadow-sm cursor-pointer"
            >
              <span>Say Hi</span>
              <ArrowUpRight className="size-3" />
            </button>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-full bg-[var(--surface-elevated)] border border-[var(--border)] text-[var(--foreground)]"
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm md:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-[var(--card)] border-l border-[var(--border)] flex flex-col md:hidden shadow-2xl p-6"
            >
              <div className="flex items-center justify-between pb-4 border-b border-[var(--border)] mb-6">
                <span className="font-mono font-medium text-sm text-[var(--foreground)]">naksh.cc</span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-1.5 rounded-full text-[var(--muted)] hover:text-[var(--foreground)]"
                >
                  <X className="size-5" />
                </button>
              </div>

              <nav className="flex flex-col gap-2 flex-1">
                {NAV.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => handleNav(item.id, item.href)}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-2xl text-xs font-mono text-left transition-all ${
                      activeSection === item.id
                        ? "bg-emerald-500/10 text-emerald-500 font-medium border border-emerald-500/20"
                        : "text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface-elevated)]"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>

              <div className="pt-4 border-t border-[var(--border)]">
                <button
                  onClick={() => handleNav("contact", "/#contact")}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-full bg-emerald-500 text-white font-mono font-medium text-xs uppercase tracking-wider shadow-md"
                >
                  <span>Transmit Message</span>
                  <ArrowUpRight className="size-3.5" />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
