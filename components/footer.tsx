"use client";

import React, { useState, useEffect } from "react";
import {
  ArrowUp,
  ArrowUpRight,
  Mail,
  Sparkles,
  Terminal,
  Clock,
  MapPin,
  Check,
  Copy,
} from "lucide-react";
import Link from "next/link";
import { sound } from "@/lib/sound";

export function Footer() {
  const [copied, setCopied] = useState(false);
  const [timeString, setTimeString] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        new Intl.DateTimeFormat("en-US", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }).format(now)
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    sound.playClick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("hello@nakshdev.tech");
    setCopied(true);
    sound.playSuccess();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--card)]/60 backdrop-blur-xl pt-16 pb-12 px-6 sm:px-12 mt-20">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Top Grand CTA Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-8 rounded-3xl border border-[var(--border)] bg-[var(--card)] shadow-sm">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-mono uppercase text-emerald-500 font-semibold tracking-wider">
                Open for conversations &amp; projects
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--foreground)]">
              Let&apos;s build something great together.
            </h3>
            <p className="text-xs sm:text-sm text-[var(--muted)] max-w-md">
              Whether you want to discuss Android UI, collaborate on an open-source tool, or just talk tech.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={copyEmail}
              onMouseEnter={() => sound.playPop()}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[var(--secondary)] hover:border-[var(--border-highlight)] border border-[var(--border)] text-xs font-mono text-[var(--foreground)] transition-all font-medium"
            >
              {copied ? (
                <>
                  <Check className="size-3.5 text-emerald-500" />
                  <span className="text-emerald-500 font-semibold">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="size-3.5 text-[var(--muted)]" />
                  <span>hello@nakshdev.tech</span>
                </>
              )}
            </button>

            <Link
              href="/contact"
              onMouseEnter={() => sound.playPop()}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[var(--foreground)] text-[var(--background)] hover:bg-emerald-500 hover:text-black font-mono text-xs font-semibold uppercase tracking-wider transition-all duration-200 shadow-sm"
            >
              <span>Get In Touch</span>
              <ArrowUpRight className="size-3.5" />
            </Link>
          </div>
        </div>

        {/* Multi-Column Sitemap Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-6">
          {/* Column 1: Navigation */}
          <div className="space-y-3">
            <p className="text-xs font-mono uppercase text-[var(--foreground)] font-semibold tracking-wider">
              Navigation
            </p>
            <ul className="space-y-2 text-xs font-mono text-[var(--muted)]">
              <li>
                <Link href="/" className="hover:text-[var(--foreground)] transition-colors">
                  Overview
                </Link>
              </li>
              <li>
                <Link href="/work" className="hover:text-[var(--foreground)] transition-colors">
                  Work Archive
                </Link>
              </li>
              <li>
                <Link href="/mind" className="hover:text-[var(--foreground)] transition-colors">
                  Mind Garden
                </Link>
              </li>
              <li>
                <Link href="/journey" className="hover:text-[var(--foreground)] transition-colors">
                  Journey
                </Link>
              </li>
              <li>
                <Link href="/lab" className="hover:text-[var(--foreground)] transition-colors">
                  Lab &amp; Stack
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[var(--foreground)] transition-colors">
                  Direct Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Projects */}
          <div className="space-y-3">
            <p className="text-xs font-mono uppercase text-[var(--foreground)] font-semibold tracking-wider">
              Featured Work
            </p>
            <ul className="space-y-2 text-xs font-mono text-[var(--muted)]">
              <li>
                <a
                  href="https://contacts-firebase-app.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--foreground)] inline-flex items-center gap-1 transition-colors"
                >
                  <span>Contacts Sync Engine</span>
                  <ArrowUpRight className="size-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://paper-analyzer.streamlit.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--foreground)] inline-flex items-center gap-1 transition-colors"
                >
                  <span>Paper Analyzer</span>
                  <ArrowUpRight className="size-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://thenakshprajapat.github.io/edtech-cs/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--foreground)] inline-flex items-center gap-1 transition-colors"
                >
                  <span>CS Resources Hub</span>
                  <ArrowUpRight className="size-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Mind Garden */}
          <div className="space-y-3">
            <p className="text-xs font-mono uppercase text-[var(--foreground)] font-semibold tracking-wider">
              Mind Garden
            </p>
            <ul className="space-y-2 text-xs font-mono text-[var(--muted)]">
              <li>
                <Link href="/mind" className="hover:text-[var(--foreground)] transition-colors">
                  Networking in Tech
                </Link>
              </li>
              <li>
                <Link href="/mind" className="hover:text-[var(--foreground)] transition-colors">
                  Teaching Tech in Plain English
                </Link>
              </li>
              <li>
                <Link href="/mind" className="hover:text-[var(--foreground)] transition-colors">
                  Programming in New Youth
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Verified Profiles */}
          <div className="space-y-3">
            <p className="text-xs font-mono uppercase text-[var(--foreground)] font-semibold tracking-wider">
              Connect
            </p>
            <ul className="space-y-2 text-xs font-mono text-[var(--muted)]">
              <li>
                <a
                  href="https://github.com/thenakshprajapat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-500 inline-flex items-center gap-1 transition-colors"
                >
                  <span>GitHub</span>
                  <ArrowUpRight className="size-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com/idevnaksh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-500 inline-flex items-center gap-1 transition-colors"
                >
                  <span>X / Twitter</span>
                  <ArrowUpRight className="size-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/in/thenakshprajapat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-500 inline-flex items-center gap-1 transition-colors"
                >
                  <span>LinkedIn</span>
                  <ArrowUpRight className="size-3" />
                </a>
              </li>
              <li>
                <Link href="/signal" className="hover:text-emerald-500 transition-colors">
                  Live Signal Status
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[var(--muted)]">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-emerald-500" />
            <span className="text-[var(--foreground)] font-semibold">Naksh</span>
            <span>•</span>
            <span>Jaipur, India</span>
            <span>•</span>
            <span className="tabular-nums text-[var(--foreground)]">{timeString || "05:00:00 PM"} IST</span>
          </div>

          <div className="flex items-center gap-4">
            <span>Designed with craft &amp; Next.js</span>
            <button
              onClick={scrollToTop}
              onMouseEnter={() => sound.playPop()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--secondary)] hover:border-[var(--border-highlight)] border border-[var(--border)] text-[var(--foreground)] transition-all"
            >
              <span>Back to top</span>
              <ArrowUp className="size-3 text-emerald-500" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
