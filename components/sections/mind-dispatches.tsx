"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X, BookOpen } from "lucide-react";
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
    id: "networking-in-tech",
    title: "Why Meeting People & Networking Accelerates Everything",
    excerpt:
      "Code compiles on machines, but momentum compounds through people. Why reaching out and discussing ideas is the highest-ROI habit you can form.",
    date: "Aug 2026",
    readTime: "5 min",
    category: "Community & Craft",
    content: `When I first started programming, I assumed building software was an isolated craft. You sit in a room, write lines of code, and push them to a repository.

As I began reaching out to builders, discussing ideas openly, and constantly talking to programmers who care about craft, my entire perspective shifted: the best engineering ideas are born in conversation.

### The Compounding Power of People:
1. **Unlocking Hidden Perspective**: Talking to other programmers exposes you to mental models and design patterns you would never encounter in standard documentation.
2. **Serendipity Vehicle**: When you are genuinely curious about other people's work, opportunities, collaborations, and friendships emerge naturally.
3. **Energy is Contagious**: Surrounding yourself with people who actually care about craft, smoothness, and building things pushes you to elevate your own standard.

Never hide behind your monitor. Reach out to people doing interesting work, ask questions, and share your perspective.`,
  },
  {
    id: "art-of-talking-tech",
    title: "Talking, Teaching & Explaining Technology in Plain English",
    excerpt:
      "If you cannot explain a technical concept simply, you don't truly understand it yet. Why sharing what you learn makes you a sharper programmer.",
    date: "Jul 2026",
    readTime: "4 min",
    category: "Communication",
    content: `There is a common misconception in software engineering that using dense jargon signifies intelligence. In reality, the best engineers are the ones who can break down complex ideas into crisp, intuitive analogies.

Whenever I learn a new technology — whether it's how Android choreographs frame rendering, how Firebase handles snapshot listeners, or how C++ allocates memory — I try to explain it to someone else.

### Why Teaching Compounds Your Code:
- **Instant Vulnerability Discovery**: You quickly realize the exact boundaries of your own understanding the moment you try to explain it without looking at notes.
- **De-cluttering Thought**: Teaching forces you to strip away non-essential noise and focus purely on first principles.
- **Building Trust**: Sharing knowledge openly invites constructive feedback and mutual growth.

Great code solves technical problems; great communication connects technology to humans.`,
  },
  {
    id: "programming-new-youth",
    title: "Programming in the New Youth: Building Over Credentials",
    excerpt:
      "The modern era belongs to young programmers who build, ship, and experiment with software because they genuinely love programming, not because of a checklist.",
    date: "Jun 2026",
    readTime: "5 min",
    category: "Youth & Engineering",
    content: `Programming among the new generation of developers is experiencing a fundamental renaissance. We have access to open-source ecosystems, global communities, and tools that allow anyone with curiosity and an internet connection to ship real software.

The biggest distinction I see between programmers who stagnate and those who thrive comes down to one variable: genuine curiosity.

### What Matters Most:
1. **Building Real Things**: Reading theory without writing code is like reading about swimming without jumping into the pool. You learn 10x faster when you have a tangible problem you are trying to solve.
2. **Caring About How Software Feels**: It's not enough for code to merely function; we should care about responsiveness, micro-animations, interaction smoothness, and perceived quality.
3. **Iterating Without Fear**: Dropping assumptions, building prototypes, and improving them iteratively is how real mastery is built.

Programming is an art form of thought. Build things because you love the craft.`,
  },
];

export function MindDispatches() {
  const [selectedEssay, setSelectedEssay] = useState<Essay | null>(null);

  const openEssay = (essay: Essay) => {
    sound.playPop();
    setSelectedEssay(essay);
  };

  const closeEssay = () => {
    sound.playClick();
    setSelectedEssay(null);
  };

  return (
    <section id="mind" className="py-16 sm:py-24 px-6 sm:px-10 max-w-4xl mx-auto">
      <div className="space-y-10">
        {/* Section Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-500 uppercase tracking-wider">
            <BookOpen className="size-3" />
            <span>Thoughts &amp; Perspectives</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-[var(--foreground)]">
            Dispatches &amp; <span className="gradient-green-text">Essays</span>
          </h2>
          <p className="text-[var(--muted)] text-xs sm:text-sm max-w-md leading-relaxed">
            Notes on programming philosophy, human connection, and autonomous software engineering.
          </p>
        </div>

        {/* Essay Cards List */}
        <div className="space-y-3.5">
          {ESSAYS.map((essay) => (
            <div
              key={essay.id}
              onClick={() => openEssay(essay)}
              className="group rounded-3xl p-6 bg-[var(--card)] border border-[var(--border)] hover:border-emerald-500/40 transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-5 cursor-pointer shadow-sm"
            >
              <div className="space-y-2 flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[var(--muted)]">
                  <span className="text-emerald-500 font-medium">{essay.category}</span>
                  <span>•</span>
                  <span>{essay.date}</span>
                  <span>•</span>
                  <span>{essay.readTime}</span>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-[var(--foreground)] group-hover:text-emerald-500 transition-colors leading-snug">
                  {essay.title}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--muted)] line-clamp-2 leading-relaxed">
                  {essay.excerpt}
                </p>
              </div>

              <div className="size-9 rounded-full border border-[var(--border)] bg-[var(--surface-elevated)] group-hover:border-emerald-500/40 group-hover:bg-emerald-500/10 flex items-center justify-center transition-all shrink-0 self-start sm:self-center">
                <ArrowUpRight className="size-3.5 text-[var(--muted)] group-hover:text-emerald-500 transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reader Modal */}
      <AnimatePresence>
        {selectedEssay && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeEssay}
              className="fixed inset-0 bg-black/70 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8 shadow-2xl z-10 space-y-5"
            >
              <button
                onClick={closeEssay}
                className="absolute top-5 right-5 p-2 rounded-full text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface-elevated)] transition-colors cursor-pointer"
              >
                <X className="size-4" />
              </button>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-mono text-[var(--muted)]">
                  <span className="text-emerald-500 font-medium">{selectedEssay.category}</span>
                  <span>•</span>
                  <span>{selectedEssay.date}</span>
                  <span>•</span>
                  <span>{selectedEssay.readTime} read</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-[var(--foreground)] pr-8 leading-snug">
                  {selectedEssay.title}
                </h2>
              </div>

              <div className="text-xs sm:text-sm text-[var(--foreground)] leading-relaxed space-y-3.5 border-t border-[var(--border)] pt-5 whitespace-pre-line font-normal">
                {selectedEssay.content}
              </div>

              <div className="pt-3.5 border-t border-[var(--border)] flex items-center justify-between text-xs font-mono text-[var(--muted)]">
                <span>Written by Naksh Prajapati</span>
                <span className="text-emerald-500">hey@naksh.cc</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
