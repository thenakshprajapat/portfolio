"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeft, MapPin, Clock, Mail, ArrowUpRight, Activity } from "lucide-react";
import Link from "next/link";
import { SystemHeader } from "@/components/layout/system-header";
import { CommandMenu } from "@/components/command-menu";
import { TelemetryPulse } from "@/components/sections/telemetry-pulse";
import { SystemFooter } from "@/components/layout/system-footer";
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
          hour12: false,
        }).format(now)
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText("thenakshprajapat@gmail.com");
    setCopied(true);
    sound.playSuccess();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="relative min-h-screen bg-[var(--background)] text-[var(--foreground)] architectural-grid transition-colors">
      <SystemHeader onOpenCommand={() => setCommandOpen(true)} />
      <CommandMenu isOpen={commandOpen} setIsOpen={setCommandOpen} />

      <div className="pt-24 pb-4 px-4 sm:px-8 max-w-7xl mx-auto font-mono text-xs">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[var(--muted)] hover:text-[var(--foreground)] transition-colors uppercase"
        >
          <ArrowLeft className="size-3.5" />
          <span>← Back to Systems Manifesto</span>
        </Link>
      </div>

      {/* Signal Telemetry Header */}
      <section className="py-12 px-4 sm:px-8 max-w-7xl mx-auto border-b border-[var(--border)] crosshair-corner">
        <div className="space-y-6">
          <div className="flex items-center gap-2 font-mono text-xs text-emerald-500 uppercase tracking-widest">
            <Activity className="size-3.5" />
            <span>[SIGNAL // LIVE TELEMETRY]</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[var(--foreground)]">
            Channel Status &amp; Coordinates
          </h1>

          <p className="text-sm sm:text-base text-[var(--muted)] max-w-3xl leading-relaxed">
            Active building, investigating UI motion physics, and open to technical discourse. Direct email and social streams below.
          </p>

          <div className="flex flex-wrap gap-3 font-mono text-xs">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-sm bg-[var(--secondary)] border border-[var(--border)] text-[var(--foreground)]">
              <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>STATUS: ONLINE &amp; RESPONSIVE</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-sm bg-[var(--secondary)] border border-[var(--border)] text-[var(--foreground)]">
              <MapPin className="size-3 text-emerald-500" />
              <span>JAIPUR, INDIA (26.91°N, 75.78°E)</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-sm bg-[var(--secondary)] border border-[var(--border)] text-[var(--foreground)]">
              <Clock className="size-3 text-emerald-500" />
              <span className="tabular-nums">TIME: {timeString || "05:00:00"} IST</span>
            </div>
          </div>
        </div>
      </section>

      {/* Telemetry Stream */}
      <TelemetryPulse />

      <SystemFooter />
    </main>
  );
}
