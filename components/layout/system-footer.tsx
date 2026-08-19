"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import Link from "next/link";
import { sound } from "@/lib/sound";

export function SystemFooter() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () =>
      setTime(
        new Intl.DateTimeFormat("en-US", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
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

  return (
    <footer className="relative z-10 border-t border-[var(--border)] py-8 sm:py-10 px-5 sm:px-8 bg-[var(--background)]">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--muted)]">
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-3">
          <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[var(--foreground)] font-semibold">Naksh</span>
          <span>·</span>
          <span>Jaipur, India</span>
          <span>·</span>
          <span className="tabular-nums font-mono text-[var(--foreground)]">{time || "IST"}</span>
          <span className="hidden sm:inline">·</span>
          <a href="mailto:hey@naksh.cc" className="hidden sm:inline text-sky-400 hover:underline font-mono">
            hey@naksh.cc
          </a>
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          <Link href="/#work" className="hover:text-[var(--foreground)] transition-colors">
            Work
          </Link>
          <Link href="/#about" className="hover:text-[var(--foreground)] transition-colors">
            About
          </Link>
          <Link href="/#writing" className="hover:text-[var(--foreground)] transition-colors">
            Writing
          </Link>
          <Link href="/#contact" className="hover:text-[var(--foreground)] transition-colors">
            Contact
          </Link>
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1 text-[var(--foreground)] hover:text-sky-400 transition-colors font-semibold cursor-pointer"
          >
            <span>Top</span>
            <ArrowUp className="size-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
