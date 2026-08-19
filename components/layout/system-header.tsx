"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Menu, X, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { sound } from "@/lib/sound";

const NAV = [
  { id: "work", label: "Work", href: "/#work" },
  { id: "about", label: "About", href: "/#about" },
  { id: "writing", label: "Writing", href: "/#writing" },
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
  }, []);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Section observer for home page
  useEffect(() => {
    if (pathname !== "/") return;

    const ids = ["hero", "work", "about", "writing", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [pathname]);

  const handleNavClick = (id: string, href: string) => {
    sound.playClick();
    setMobileOpen(false);

    if (pathname === "/") {
      const targetEl = document.getElementById(id);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: "smooth" });
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
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled || mobileOpen
            ? "glass-nav shadow-lg shadow-black/40"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-8 h-14 sm:h-16 flex items-center justify-between gap-4">
          {/* Brand */}
          <button
            onClick={handleBrandClick}
            className="flex items-center gap-2.5 font-bold text-base hover:text-sky-400 transition-colors shrink-0 group text-left cursor-pointer"
          >
            <span className="relative flex size-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
              <span className="relative inline-flex rounded-full size-2 bg-sky-400" />
            </span>
            <span className="text-[var(--foreground)] tracking-tight">Naksh</span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV.map((item) => {
              const active = pathname === "/" ? activeSection === item.id : pathname.includes(item.id);
              return (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.id, item.href)}
                  className={`relative px-4 py-1.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                    active
                      ? "text-[var(--foreground)] font-semibold"
                      : "text-[var(--muted)] hover:text-[var(--foreground)]"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border-strong)]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMuted(sound.toggleMute())}
              aria-label="Toggle audio"
              className="p-2 rounded-lg text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface-hover)] transition-all cursor-pointer"
            >
              {isMuted ? (
                <VolumeX className="size-4" />
              ) : (
                <Volume2 className="size-4 text-sky-400" />
              )}
            </button>

            <button
              onClick={() => handleNavClick("contact", "/#contact")}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[var(--foreground)] text-[var(--background)] text-xs font-bold hover:bg-sky-400 hover:text-[#040914] transition-all shadow-md shadow-sky-500/10 cursor-pointer"
            >
              <span>Get In Touch</span>
              <ArrowUpRight className="size-3.5" />
            </button>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              className="md:hidden p-2 rounded-lg text-[var(--foreground)] hover:bg-[var(--surface-hover)] transition-all cursor-pointer"
            >
              {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-black/75 backdrop-blur-sm md:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 glass-nav flex flex-col md:hidden shadow-2xl"
            >
              <div className="flex items-center justify-between p-5 border-b border-[var(--border)]">
                <span className="font-bold text-[var(--foreground)]">Naksh</span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-lg text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
                >
                  <X className="size-5" />
                </button>
              </div>

              <nav className="flex flex-col gap-1 p-4 flex-1">
                <button
                  onClick={handleBrandClick}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium text-left transition-all ${
                    activeSection === "hero"
                      ? "bg-sky-500/15 text-sky-400 font-semibold"
                      : "text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface-hover)]"
                  }`}
                >
                  Home
                </button>
                {NAV.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => handleNavClick(item.id, item.href)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium text-left transition-all ${
                      activeSection === item.id
                        ? "bg-sky-500/15 text-sky-400 font-semibold"
                        : "text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface-hover)]"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>

              <div className="p-4 border-t border-[var(--border)]">
                <button
                  onClick={() => handleNavClick("contact", "/#contact")}
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-sky-400 text-[#040914] font-bold text-sm"
                >
                  <span>hey@naksh.cc</span>
                  <ArrowUpRight className="size-4" />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
