"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FlaskConical, ArrowLeft, Terminal, Cpu, Layers } from "lucide-react";
import Link from "next/link";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { FloatingNav } from "@/components/floating-nav";
import { CommandMenu } from "@/components/command-menu";
import { Footer } from "@/components/footer";

const LAB_EXPERIMENTS = [
  {
    title: "AOSP Binder IPC Profiler",
    description: "Tracing Parcel serialization overhead across process sandboxes using strace and custom Linux kernel ftrace hooks.",
    status: "Active Research",
    tag: "Systems & C++",
  },
  {
    title: "NLP Exam Pattern Intelligence Engine",
    description: "Parsing university past question papers to calculate statistical frequency and recurrence probability for exam revision.",
    status: "Active Lab",
    tag: "Python & NLP",
  },
  {
    title: "Contacts Offline-First Sync Driver",
    description: "Experimenting with optimistic local indexedDB caching and conflict-free replicated data types (CRDTs).",
    status: "Completed Prototype",
    tag: "Distributed State",
  },
];

export default function LabPage() {
  const [commandOpen, setCommandOpen] = useState(false);

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

        <div className="mb-12 border-b border-white/[0.08] pb-8">
          <div className="flex items-center gap-2 text-xs font-mono text-blue-400 tracking-wider uppercase mb-2">
            <FlaskConical className="w-3.5 h-3.5" />
            <span>Experimental Sandbox</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
            Systems &amp; AI Lab
          </h1>
          <p className="text-zinc-400 mt-2 text-sm sm:text-base max-w-2xl">
            Unfinished experiments, benchmark scripts, and low-level prototypes. If it&apos;s finished and production-ready, it lives in <Link href="/#projects" className="text-blue-400 underline underline-offset-4">Featured Work</Link>.
          </p>
        </div>

        <div className="grid gap-4">
          {LAB_EXPERIMENTS.map((exp, idx) => (
            <motion.div
              key={exp.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
            >
              <SpotlightCard className="p-6" enableSound>
                <div className="flex items-center justify-between gap-4 mb-2">
                  <span className="text-[11px] font-mono text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2.5 py-0.5 rounded">
                    {exp.tag}
                  </span>
                  <span className="text-xs font-mono text-zinc-500">{exp.status}</span>
                </div>
                <h2 className="text-xl font-bold text-white mb-1.5">{exp.title}</h2>
                <p className="text-sm text-zinc-400 leading-relaxed">{exp.description}</p>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
