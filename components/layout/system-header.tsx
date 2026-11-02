"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { sound } from "@/lib/sound";

const NAV_ITEMS = [
  { id: "home", label: "Home", href: "/" },
  { id: "work", label: "Work", href: "/work" },
  { id: "writing", label: "Writing", href: "/writing" },
  { id: "about", label: "About", href: "/about" },
  { id: "contact", label: "Contact", href: "/contact" },
];

export function SystemHeader() {
  const pathname = usePathname();
  const progressRef = useRef<HTMLDivElement | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [mode1984, setMode1984] = useState(false);

  useEffect(() => {
    setIsMuted(sound.getMuted());
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    if (
      typeof CSS !== "undefined" &&
      !CSS.supports("animation-timeline", "scroll()")
    ) {
      const updateProgress = () => {
        const progressEl = progressRef.current;
        if (!progressEl) return;
        const scrollable =
          document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = window.scrollY;
        const ratio =
          scrollable > 0 ? Math.min(1, Math.max(0, scrolled / scrollable)) : 0;
        progressEl.style.transform = `scaleX(${ratio})`;
      };

      updateProgress();
      window.addEventListener("scroll", updateProgress, { passive: true });
      window.addEventListener("resize", updateProgress, { passive: true });
      return () => {
        window.removeEventListener("scroll", updateProgress);
        window.removeEventListener("resize", updateProgress);
      };
    }
  }, []);

  const toggle1984Mode = () => {
    sound.playPop();
    const next = !mode1984;
    setMode1984(next);
    document.documentElement.classList.toggle("mode-1984", next);
  };

  const isItemActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      <div id="scroll-progress" ref={progressRef} aria-hidden="true" />

      <header className="sticky top-0 z-40 w-full py-3.5 px-3 sm:px-8 pointer-events-none">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-2">
          {/* 1. Separate rounded matte box for naksh.cc (desktop/tablet only) */}
          <Link
            href="/"
            onClick={() => sound.playClick()}
            className="hidden md:inline-flex pointer-events-auto matte-box rounded-xl px-3.5 py-2 items-center gap-2 font-mono text-xs text-[var(--text)] hover:border-[var(--accent)] transition-colors shrink-0"
          >
            <span
              className="inline-block size-2 rounded-[3px] bg-[var(--accent)]"
              aria-hidden="true"
            />
            <span className="font-medium">naksh.cc</span>
          </Link>

          {/* 2. Separate rounded matte box for the navigation bar */}
          <nav
            aria-label="Primary"
            className="pointer-events-auto matte-box rounded-xl p-1 flex items-center justify-between sm:justify-center gap-0.5 flex-1 md:flex-initial max-w-full overflow-x-auto scrollbar-none"
          >
            {NAV_ITEMS.map((item) => {
              const active = isItemActive(item.href);
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => sound.playClick()}
                  className={`relative px-2.5 sm:px-3 py-1.5 sm:py-1 rounded-lg font-mono text-[11px] transition-colors shrink-0 text-center ${
                    active
                      ? "text-[var(--bg)] font-medium"
                      : "text-[var(--text-muted)] hover:text-[var(--text)]"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="header-active-route"
                      className="absolute inset-0 rounded-lg bg-[var(--accent)] -z-10"
                      transition={{
                        type: "spring",
                        stiffness: 420,
                        damping: 32,
                      }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* 3. Separate small rounded matte squares for 1984 (desktop) and sound button */}
          <div className="pointer-events-auto flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={toggle1984Mode}
              aria-pressed={mode1984}
              title="Toggle 1984 1-bit pixel mode"
              className={`hidden md:inline-flex matte-box rounded-xl px-2.5 h-8 font-mono text-[11px] transition-colors cursor-pointer items-center justify-center ${
                mode1984
                  ? "bg-[var(--accent)] text-[var(--bg)] border-[var(--accent)] font-semibold"
                  : "text-[var(--text-muted)] hover:border-[var(--accent)] hover:text-[var(--text)]"
              }`}
            >
              1984
            </button>

            <button
              type="button"
              onClick={() => setIsMuted(sound.toggleMute())}
              aria-label={isMuted ? "Unmute sound effects" : "Mute sound effects"}
              title={isMuted ? "Sound muted" : "Sound active"}
              className="matte-box rounded-xl size-8 inline-flex items-center justify-center text-[var(--text-muted)] hover:border-[var(--accent)] hover:text-[var(--text)] transition-colors cursor-pointer"
            >
              {isMuted ? (
                <VolumeX className="size-3.5" aria-hidden="true" />
              ) : (
                <Volume2
                  className="size-3.5 text-[var(--accent)]"
                  aria-hidden="true"
                />
              )}
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
