"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Radio,
  Mail,
  Twitter,
  Github,
  Linkedin,
  MapPin,
  Clock,
  ArrowLeft,
  Copy,
  Check,
  ExternalLink,
  Cpu,
  Activity,
} from "lucide-react";
import Link from "next/link";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { FloatingNav } from "@/components/floating-nav";
import { CommandMenu } from "@/components/command-menu";
import { Footer } from "@/components/footer";
import { sound } from "@/lib/sound";

export default function SignalPage() {
  const [commandOpen, setCommandOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [timeString, setTimeString] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        new Intl.DateTimeFormat("en-GB", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
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
    <main className="relative min-h-screen bg-[#0a0a0a] text-zinc-100 selection:bg-blue-600/30 selection:text-white">
      <div className="noise-overlay" />
      <FloatingNav onOpenCommand={() => setCommandOpen(true)} />
      <CommandMenu isOpen={commandOpen} setIsOpen={setCommandOpen} />

      <div className="pt-32 pb-24 px-6 sm:px-12 max-w-4xl mx-auto">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Signal Radar Header */}
        <div className="space-y-6 mb-12">
          <div className="flex items-center gap-3">
            <div className="relative flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500" />
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white">
              Signal &amp; Status
            </h1>
          </div>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed font-normal">
            Channel Status: <span className="text-emerald-400 font-semibold">Live &amp; Active</span>.
            Currently exploring low-level Android OS systems, Binder IPC, and open to high-impact internships or collaborative research.
          </p>

          <div className="flex flex-wrap gap-3 text-xs font-mono">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-zinc-300">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Available for 2026/2027 Roles</span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-zinc-300">
              <MapPin className="w-3.5 h-3.5 text-blue-400" />
              <span>Bengaluru, India (Open to Remote / Relocation)</span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-zinc-300">
              <Clock className="w-3.5 h-3.5 text-blue-400" />
              <span className="tabular-nums">{timeString || "02:56:00"} (IST GMT+5:30)</span>
            </div>
          </div>
        </div>

        {/* Channels Grid */}
        <div className="grid gap-4">
          <SpotlightCard className="p-6" enableSound>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">Direct Transmission</h3>
                  <p className="text-xs font-mono text-zinc-400">hello@nakshdev.tech</p>
                </div>
              </div>
              <button
                onClick={copyEmail}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-zinc-200 transition-colors"
              >
                {copied ? "Copied!" : "Copy Email"}
              </button>
            </div>
          </SpotlightCard>

          <SpotlightCard className="p-6" enableSound>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400">
                  <Twitter className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">X / Twitter</h3>
                  <p className="text-xs font-mono text-zinc-400">@iDevNaksh</p>
                </div>
              </div>
              <a
                href="https://twitter.com/idevnaksh"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </SpotlightCard>

          <SpotlightCard className="p-6" enableSound>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
                  <Github className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">GitHub</h3>
                  <p className="text-xs font-mono text-zinc-400">github.com/thenakshprajapat</p>
                </div>
              </div>
              <a
                href="https://github.com/thenakshprajapat"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </SpotlightCard>
        </div>
      </div>

      <Footer />
    </main>
  );
}
