"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FlaskConical, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { FloatingNav } from "@/components/floating-nav";
import { CommandMenu } from "@/components/command-menu";
import { ToolboxSection } from "@/components/toolbox-section";
import { Footer } from "@/components/footer";
import { CursorFollower } from "@/components/ui/cursor-follower";
import { LiquidBackground } from "@/components/ui/liquid-background";

const LAB_EXPERIMENTS = [
  {
    title: "Android 120Hz Gesture Physics",
    description: "Prototyping fluid spring-damping curves, touch velocity tracking, and zero-jank sheet dismissal animations.",
    status: "Active Lab",
    tag: "Android UI & Motion",
    badgeColor: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  },
  {
    title: "NLP Exam Pattern Intelligence",
    description: "Parsing university past question papers to calculate statistical frequency and recurrence probability for exam revision.",
    status: "Completed Tool",
    tag: "Python & NLP",
    badgeColor: "bg-teal-500/10 text-teal-500 border-teal-500/20",
  },
  {
    title: "Contacts Offline-First Sync Driver",
    description: "Experimenting with optimistic local caching, Firestore snapshot reconciliation, and network partition recovery.",
    status: "Completed Prototype",
    tag: "Firebase & Cloud",
    badgeColor: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  },
];

export default function LabPage() {
  const [commandOpen, setCommandOpen] = useState(false);

  return (
    <main className="relative min-h-screen bg-[var(--background)] text-[var(--foreground)] selection:bg-emerald-500/30 selection:text-white">
      <LiquidBackground />
      <CursorFollower />
      <div className="noise-overlay" />
      <FloatingNav onOpenCommand={() => setCommandOpen(true)} />
      <CommandMenu isOpen={commandOpen} setIsOpen={setCommandOpen} />

      <div className="pt-28 pb-6 px-6 sm:px-12 max-w-5xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
        >
          <ArrowLeft className="size-3.5" />
          <span>Back to Overview</span>
        </Link>
      </div>

      {/* 1. Curated Stack & Technologies */}
      <ToolboxSection />

      {/* 2. Experimental Sandbox */}
      <section className="py-16 px-6 sm:px-12 max-w-5xl mx-auto border-t border-[var(--border)]">
        <div className="mb-10">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-500 tracking-wider uppercase mb-2">
            <FlaskConical className="size-3.5" />
            <span>Experimental Sandbox</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--foreground)] tracking-tight">
            Active Experiments &amp; Prototypes
          </h2>
          <p className="text-[var(--muted)] mt-2 text-sm max-w-lg">
            In-progress explorations in UI motion physics, data parsing, and distributed web synchronization.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {LAB_EXPERIMENTS.map((exp, idx) => (
            <motion.div
              key={exp.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
            >
              <SpotlightCard className="p-6 sm:p-7 flex flex-col justify-between h-full rounded-3xl" enableSound>
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className={`text-[11px] font-mono border px-2.5 py-0.5 rounded-full font-medium ${exp.badgeColor}`}>
                      {exp.tag}
                    </span>
                    <span className="text-xs font-mono text-[var(--muted)]">{exp.status}</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[var(--foreground)] mb-1.5">{exp.title}</h3>
                  <p className="text-xs text-[var(--muted)] leading-relaxed">{exp.description}</p>
                </div>

                <div className="mt-5 pt-3.5 border-t border-[var(--border)] text-[11px] font-mono text-[var(--muted)]">
                  <span>Lab Prototype</span>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
