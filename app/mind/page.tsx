"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, Calendar, Clock, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { FloatingNav } from "@/components/floating-nav";
import { CommandMenu } from "@/components/command-menu";
import { Footer } from "@/components/footer";

const ESSAYS = [
  {
    id: "aosp-systems-2026",
    title: "Why AOSP & Systems Engineering Is the Most Underrated Discipline in 2026",
    excerpt:
      "While the web converges on high-level abstractions and wrappers, the enduring leverage belongs to engineers who understand the kernel, IPC mechanisms, and memory allocators.",
    date: "Aug 2026",
    readTime: "6 min read",
    category: "Systems & AOSP",
  },
  {
    id: "learning-in-public",
    title: "Learning in Public: The Compounding ROI of Documenting Early",
    excerpt:
      "Hiding your ignorance is the slowest way to learn. The internet rewards engineers who share messy first iterations and document breakthroughs in the open.",
    date: "Jul 2026",
    readTime: "4 min read",
    category: "Growth & Learning",
  },
  {
    id: "code-as-medium-thought",
    title: "Code as a Medium for Thought: Structuring Mental Models",
    excerpt:
      "Programming is rarely about typing syntax. It is a formal discipline for breaking down ambiguous problems into deterministic, resilient state machines.",
    date: "Jun 2026",
    readTime: "5 min read",
    category: "Philosophy",
  },
  {
    id: "binder-ipc-deep-dive",
    title: "Deconstructing Android's Binder IPC from First Principles",
    excerpt:
      "How Android achieves ultra-fast, secure inter-process communication using Linux shared memory, parcel serialization, and driver ioctls.",
    date: "May 2026",
    readTime: "8 min read",
    category: "Systems & AOSP",
  },
];

export default function MindPage() {
  const [commandOpen, setCommandOpen] = useState(false);

  return (
    <main className="relative min-h-screen bg-[#0a0a0a] text-zinc-100 selection:bg-blue-600/30 selection:text-white">
      <div className="noise-overlay" />
      <FloatingNav onOpenCommand={() => setCommandOpen(true)} />
      <CommandMenu isOpen={commandOpen} setIsOpen={setCommandOpen} />

      <div className="pt-32 pb-24 px-6 sm:px-12 max-w-5xl mx-auto">
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
            <BookOpen className="w-3.5 h-3.5" />
            <span>Mind Garden &amp; Notes</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
            Engineering Essays &amp; Thoughts
          </h1>
          <p className="text-zinc-400 mt-2 text-sm sm:text-base max-w-2xl">
            A stream of consciousness exploring operating system primitives, computational models, and the compounding craft of learning in public.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ESSAYS.map((essay, idx) => (
            <motion.div
              key={essay.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
            >
              <Link href="/#writing">
                <SpotlightCard className="p-6 sm:p-7 flex flex-col justify-between h-full group" enableSound>
                  <div>
                    <div className="flex items-center justify-between gap-4 mb-4">
                      <span className="text-[11px] font-mono text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2.5 py-0.5 rounded">
                        {essay.category}
                      </span>
                      <div className="flex items-center gap-3 text-xs font-mono text-zinc-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {essay.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {essay.readTime}
                        </span>
                      </div>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                      {essay.title}
                    </h2>

                    <p className="text-sm text-zinc-400 leading-relaxed line-clamp-3">
                      {essay.excerpt}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-zinc-400 group-hover:text-white transition-colors">
                    <span>Read in Garden</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </SpotlightCard>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
