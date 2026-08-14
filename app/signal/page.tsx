"use client";

import React, { useState, useEffect } from "react";
import {
  Mail,
  MapPin,
  Clock,
  ArrowLeft,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { FloatingNav } from "@/components/floating-nav";
import { CommandMenu } from "@/components/command-menu";
import { Footer } from "@/components/footer";
import { CursorFollower } from "@/components/ui/cursor-follower";
import { LiquidBackground } from "@/components/ui/liquid-background";
import { sound } from "@/lib/sound";

export default function SignalPage() {
  const [commandOpen, setCommandOpen] = useState(false);
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

  const copyEmail = () => {
    navigator.clipboard.writeText("hello@nakshdev.tech");
    setCopied(true);
    sound.playSuccess();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="relative min-h-screen bg-[var(--background)] text-[var(--foreground)] selection:bg-emerald-500/30 selection:text-white transition-colors">
      <LiquidBackground />
      <CursorFollower />
      <div className="noise-overlay" />
      <FloatingNav onOpenCommand={() => setCommandOpen(true)} />
      <CommandMenu isOpen={commandOpen} setIsOpen={setCommandOpen} />

      <div className="pt-28 pb-20 px-6 sm:px-12 max-w-4xl mx-auto">
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
          >
            <ArrowLeft className="size-3.5" />
            <span>Back to Overview</span>
          </Link>
        </div>

        {/* Signal Header */}
        <div className="space-y-4 mb-10">
          <div className="flex items-center gap-2.5">
            <div className="relative flex size-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full size-3 bg-emerald-500 shadow-[0_0_8px_#10b981]" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--foreground)]">
              Signal &amp; Status
            </h1>
          </div>

          <p className="text-base sm:text-lg text-[var(--foreground)] leading-relaxed font-normal">
            Channel Status: <span className="text-emerald-500 font-semibold">Live &amp; Active</span>.
            Building projects, exploring Android UI animation physics, and always happy to chat with developers and interesting people.
          </p>

          <div className="flex flex-wrap gap-2.5 text-xs font-mono">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--secondary)] border border-[var(--border)] text-[var(--foreground)]">
              <span className="size-2 rounded-full bg-emerald-500" />
              <span>Available for Projects &amp; Tech Chats</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--secondary)] border border-[var(--border)] text-[var(--foreground)]">
              <MapPin className="size-3 text-emerald-500" />
              <span>Jaipur, India</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--secondary)] border border-[var(--border)] text-[var(--foreground)]">
              <Clock className="size-3 text-emerald-500" />
              <span className="tabular-nums">{timeString || "05:00:00 PM"} (IST GMT+5:30)</span>
            </div>
          </div>
        </div>

        {/* Channels Grid */}
        <div className="grid gap-3.5">
          <SpotlightCard className="p-6 rounded-3xl" enableSound>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500">
                  <Mail className="size-4 sm:size-5" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-semibold text-[var(--foreground)]">Direct Inbox</h3>
                  <p className="text-xs font-mono text-[var(--muted)] mt-0.5">hello@nakshdev.tech</p>
                </div>
              </div>
              <button
                onClick={copyEmail}
                className="px-3.5 py-2 rounded-2xl bg-[var(--secondary)] hover:border-[var(--border-highlight)] border border-[var(--border)] text-xs font-mono text-[var(--foreground)] transition-colors"
              >
                {copied ? "Copied!" : "Copy Email"}
              </button>
            </div>
          </SpotlightCard>

          <SpotlightCard className="p-6 rounded-3xl" enableSound>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-[var(--secondary)] border border-[var(--border)] text-[var(--foreground)]">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4 sm:size-5">
                    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-semibold text-[var(--foreground)]">X / Twitter</h3>
                  <p className="text-xs font-mono text-[var(--muted)] mt-0.5">@iDevNaksh</p>
                </div>
              </div>
              <a
                href="https://twitter.com/idevnaksh"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-2xl bg-[var(--secondary)] hover:border-[var(--border-highlight)] border border-[var(--border)] text-[var(--foreground)] transition-colors"
              >
                <ArrowUpRight className="size-4" />
              </a>
            </div>
          </SpotlightCard>

          <SpotlightCard className="p-6 rounded-3xl" enableSound>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-[var(--secondary)] border border-[var(--border)] text-[var(--foreground)]">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4 sm:size-5">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-semibold text-[var(--foreground)]">GitHub</h3>
                  <p className="text-xs font-mono text-[var(--muted)] mt-0.5">github.com/thenakshprajapat</p>
                </div>
              </div>
              <a
                href="https://github.com/thenakshprajapat"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-2xl bg-[var(--secondary)] hover:border-[var(--border-highlight)] border border-[var(--border)] text-[var(--foreground)] transition-colors"
              >
                <ArrowUpRight className="size-4" />
              </a>
            </div>
          </SpotlightCard>
        </div>
      </div>

      <Footer />
    </main>
  );
}
