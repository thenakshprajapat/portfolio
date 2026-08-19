"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X, Sparkles } from "lucide-react";
import { sound } from "@/lib/sound";

interface Essay {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  content: string;
}

const ESSAYS: Essay[] = [
  {
    id: "independent-shipping",
    title: "Building independently taught me more than any tutorial ever did.",
    excerpt:
      "When there's no team to hide behind, you have to understand the entire stack — from pixel physics to distributed database state.",
    date: "Aug 2026",
    readTime: "4 min",
    category: "Independent Building",
    content: `When you build software alone, you don't get the luxury of siloing yourself.

You can't say "I only do frontend" when your database listener fails to sync offline state. You can't say "I only write logic" when your gesture choreographies drop frames on a real device.

Building independently forces you into uncomfortable territory immediately:
1. **End-to-end accountability**: When an animation stutters or a network call hangs, you can't blame an API spec. You have to profile it, debug the call stack, and fix it.
2. **First-principles problem solving**: You stop copying stack traces and start understanding why memory is allocated a certain way in C++, or how the Android Choreographer renders VSYNC pulses.
3. **Speed of iteration**: There are no 45-minute standups or PR review queues. You have an intuition, you prototype it, you test it, you ship it.

The best way to get good at software isn't reading about architecture in the abstract. It's building complete things from scratch until the abstractions become second nature.`,
  },
  {
    id: "explaining-tech",
    title: "If you can't explain it simply, you probably don't understand it yet.",
    excerpt:
      "Trying to explain a technical concept in plain English is the fastest way to expose the gaps in your own understanding.",
    date: "Jul 2026",
    readTime: "3 min",
    category: "Mental Models",
    content: `There's a version of understanding something where you nod along while reading documentation. And there's a version where you can explain the core mechanism on a whiteboard with zero jargon.

Those are completely different things.

I thought I understood how Android touch dispatching worked until I tried explaining how MotionEvents bubble through ViewGroups to someone else. Within thirty seconds, I realized I only knew the buzzwords, not the actual mechanism.

So I dug into the source code, traced the event loop, built a minimal test case, and worked backwards from first principles.

Whenever I learn something new — whether it's Firestore snapshot listeners, C++ memory alignment, or spring-damping formulas — I force myself to write a 3-sentence summary in plain English.

If you can't summarize a complex system simply, you haven't broken it down to its fundamentals yet.`,
  },
  {
    id: "building-over-credentials",
    title: "Nobody asked to see my grades. They asked to see what I built.",
    excerpt:
      "At some point I stopped trying to collect certificates and just focused on building software that works. That made all the difference.",
    date: "Jun 2026",
    readTime: "4 min",
    category: "Execution",
    content: `Early on, it's easy to get trapped in the credential game — chasing the next certificate, worrying about university rankings, or collecting badges.

Then I started shipping real code, and my entire view changed.

When you show someone a contact manager with sub-60ms optimistic sync that actually works on their phone, or an NLP tool that clusters exam topics in real time, the conversation changes immediately.

Nobody asks what your test score was. They ask:
- How did you handle network partition tolerance?
- Why did you choose spring damping over cubic-bezier curves for that transition?
- How did you profile the frame pacing?

Building real software forces you to answer real questions.

Stop waiting until you feel "ready." Start building small, functional things and push them to GitHub. The code speaks for itself.`,
  },
];

export function MindDispatches() {
  const [selected, setSelected] = useState<Essay | null>(null);

  return (
    <section id="writing" className="py-16 sm:py-24 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto space-y-10 sm:space-y-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-2"
        >
          <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase text-sky-400 tracking-widest">
            <Sparkles className="size-3" />
            <span>Developer Notes</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[var(--foreground)]">
            Perspectives & <span className="gradient-text">Writing</span>
          </h2>
          <p className="text-sm text-[var(--muted)] max-w-sm leading-relaxed">
            Short notes on independent software engineering, building systems, and craft.
          </p>
        </motion.div>

        <div className="divide-y divide-[var(--border)]">
          {ESSAYS.map((essay, i) => (
            <motion.div
              key={essay.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              onClick={() => {
                sound.playPop();
                setSelected(essay);
              }}
              className="group flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 py-6 sm:py-7 -mx-4 px-4 rounded-2xl cursor-pointer hover:bg-[var(--surface-hover)] transition-all"
            >
              <span className="text-4xl sm:text-5xl font-bold font-mono text-[var(--border-strong)] group-hover:text-sky-400 transition-colors shrink-0 sm:w-16">
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="flex-1 min-w-0 space-y-1.5">
                <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono text-[var(--muted)]">
                  <span className="text-sky-400 font-semibold">{essay.category}</span>
                  <span>·</span>
                  <span>{essay.date}</span>
                  <span>·</span>
                  <span>{essay.readTime} read</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-[var(--foreground)] group-hover:text-sky-300 transition-colors leading-snug">
                  {essay.title}
                </h3>
                <p className="text-sm text-[var(--muted)] line-clamp-2 leading-relaxed hidden sm:block">
                  {essay.excerpt}
                </p>
              </div>

              <div className="shrink-0 size-9 sm:size-10 rounded-full border border-[var(--border)] group-hover:border-sky-400 group-hover:bg-sky-400 flex items-center justify-center transition-all self-start sm:self-center">
                <ArrowUpRight className="size-4 text-[var(--muted)] group-hover:text-[#040914] transition-colors" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Reader Modal */}
      <AnimatePresence>
        {selected && (
          <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                sound.playClick();
                setSelected(null);
              }}
              className="fixed inset-0 bg-black/85 backdrop-blur-xl"
            />
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
              className="relative w-full sm:max-w-xl max-h-[90vh] sm:max-h-[82vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl border border-[var(--border-strong)] bg-[var(--surface)] p-6 sm:p-10 z-10 shadow-2xl"
            >
              <div className="sm:hidden w-10 h-1 rounded-full bg-[var(--border-strong)] mx-auto mb-5" />

              <button
                onClick={() => {
                  sound.playClick();
                  setSelected(null);
                }}
                className="absolute top-5 right-5 p-2 rounded-full text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface-elevated)] transition-colors cursor-pointer"
              >
                <X className="size-4" />
              </button>

              <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono text-[var(--muted)] mb-3">
                <span className="text-sky-400 font-semibold">{selected.category}</span>
                <span>·</span>
                <span>{selected.date}</span>
                <span>·</span>
                <span>{selected.readTime}</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-6 pr-8 leading-tight text-[var(--foreground)]">
                {selected.title}
              </h2>

              <div className="text-sm sm:text-base text-[var(--muted)] leading-relaxed space-y-4 border-t border-[var(--border)] pt-6 whitespace-pre-line [&>p]:text-[var(--foreground)]">
                {selected.content}
              </div>

              <div className="mt-8 pt-4 border-t border-[var(--border)] flex items-center justify-between text-xs text-[var(--muted)]">
                <span>Naksh · Independent Developer</span>
                <a href="mailto:hey@naksh.cc" className="text-sky-400 hover:underline">
                  hey@naksh.cc
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
