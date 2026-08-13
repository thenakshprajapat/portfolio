"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Calendar, Clock, ArrowUpRight, X, Sparkles, Tag } from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { sound } from "@/lib/sound";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: "Systems & AOSP" | "Growth & Learning" | "Philosophy";
  content: string;
}

const ARTICLES: Article[] = [
  {
    id: "aosp-systems-2026",
    title: "Why AOSP & Systems Engineering Is the Most Underrated Discipline",
    excerpt:
      "While the web converges on high-level abstractions and wrappers, the enduring leverage belongs to engineers who understand the kernel, IPC mechanisms, and memory allocators.",
    date: "Aug 2026",
    readTime: "6 min read",
    category: "Systems & AOSP",
    content: `When most developers start building, they gravitate towards high-level UI frameworks. It's understandable: feedback loops are instant, and you can ship an interface in an afternoon.

However, as software scales, the abstractions begin to leak. Why does a transaction drop frames? Why does memory pressure trigger an aggressive OOM killer? How does a broadcast securely reach a background daemon without leaking privilege?

These questions cannot be answered by looking at JavaScript or high-level wrappers. They are answered by diving into the Android Open Source Project (AOSP) — understanding Binder IPC, the Hardware Abstraction Layer (HAL), Linux cgroups, and memory allocators.

### The Leverage of Low-Level Understanding
1. **Predictable Performance**: When you know how system services serialize parcels and manage thread pools, you write client code that never blocks the main thread.
2. **First-Principles Debugging**: Instead of guessing why an OS error occurred, you can trace system call logs through logcat and strace.
3. **Future Resilience**: Frameworks change every two years; operating system principles remain constant for decades.

Mastering the low-level is not about abandoning high-level product design — it is about having the superpowers to build tools that are indestructible.`,
  },
  {
    id: "learning-in-public",
    title: "Learning in Public: The Compounding ROI of Documenting Early",
    excerpt:
      "Hiding your ignorance is the slowest way to learn. The internet rewards engineers who share messy first iterations and document breakthroughs in the open.",
    date: "Jul 2026",
    readTime: "4 min read",
    category: "Growth & Learning",
    content: `There is a common trap among engineering students: the desire to keep projects private until they are 'perfect'. 

The problem with waiting for perfection is that software is never done. In the process of waiting, you miss out on the most powerful feedback mechanism in existence: public critique.

### Why Shipping Publicly Compounds:
- **Proof of Work over Credentials**: A public Git commit history showcasing 200+ commits and real problem-solving speaks louder than a GPA.
- **Serendipity Vehicle**: When you write about a tricky Android Binder issue or a Firebase sync bug, you become a magnet for peers and senior engineers solving the exact same problem.
- **Clarity of Thought**: If you cannot explain a technical concept in a concise markdown note, you don't truly understand it yet.

Build, document the messy middle, and ship early.`,
  },
  {
    id: "code-as-medium-thought",
    title: "Code as a Medium for Thought: Structuring Mental Models",
    excerpt:
      "Programming is rarely about typing syntax. It is a formal discipline for breaking down ambiguous problems into deterministic, resilient state machines.",
    date: "Jun 2026",
    readTime: "5 min read",
    category: "Philosophy",
    content: `Before I learned to code, thinking was largely qualitative. Problems felt amorphous, and solutions were often vague intuitions.

Programming forces a cognitive transformation. To write code that executes reliably, you are forced to:
1. Identify all invariant states.
2. Handle unexpected edge conditions (network drops, invalid inputs, concurrent writes).
3. Design clear interfaces that isolate complexity.

In many ways, learning computer science is learning epistemology. It gives you a toolkit to model the physical and digital world with high fidelity.`,
  },
  {
    id: "binder-ipc-deep-dive",
    title: "Deconstructing Android's Binder IPC from First Principles",
    excerpt:
      "How Android achieves ultra-fast, secure inter-process communication using Linux shared memory, parcel serialization, and driver ioctls.",
    date: "May 2026",
    readTime: "8 min read",
    category: "Systems & AOSP",
    content: `In Linux, traditional IPC mechanisms like pipes, sockets, and System V shared memory exist. Why did Android build Binder?

### The Core Problem:
Mobile devices require high security (sandbox isolation per app) combined with near-zero latency for system calls like window management, audio playback, and sensor data. Traditional UNIX sockets require multiple memory copies between kernel and user space.

### Binder's Genius:
1. **Single Memory Copy**: Binder uses the \`/dev/binder\` kernel driver to map memory once, copying data directly from the caller's user space into the receiving process's address space.
2. **Built-in UID Verification**: The kernel driver injects the caller's Linux UID/PID into the transaction, preventing process impersonation.
3. **Reference Counting**: Objects across processes are automatically reference counted and garbage collected when clients disconnect.

Understanding Binder demystifies why Android acts the way it does.`,
  },
];

export function WritingSection() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filteredArticles =
    activeCategory === "All"
      ? ARTICLES
      : ARTICLES.filter((a) => a.category === activeCategory);

  const openArticle = (article: Article) => {
    sound.playPop();
    setSelectedArticle(article);
  };

  const closeArticle = () => {
    sound.playClick();
    setSelectedArticle(null);
  };

  return (
    <section id="writing" className="py-24 px-6 sm:px-12 max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
      >
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-blue-400 tracking-wider uppercase mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Notes, Learnings &amp; Engineering Garden</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Writing &amp; Thoughts
          </h2>
          <p className="text-zinc-400 mt-2 text-sm sm:text-base max-w-xl">
            Essays and technical notes documenting my understanding of systems, software design, and growth.
          </p>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap gap-2">
          {["All", "Systems & AOSP", "Growth & Learning", "Philosophy"].map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                sound.playClick();
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                activeCategory === cat
                  ? "bg-white text-zinc-950 font-medium shadow-sm"
                  : "bg-white/[0.04] text-zinc-400 hover:text-white hover:bg-white/[0.08] border border-white/[0.06]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredArticles.map((article, idx) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.08 }}
          >
            <div onClick={() => openArticle(article)} className="cursor-pointer h-full">
              <SpotlightCard className="p-6 sm:p-7 flex flex-col justify-between h-full group" enableSound>
                <div>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <span className="text-[11px] font-mono text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2.5 py-0.5 rounded">
                      {article.category}
                    </span>
                    <div className="flex items-center gap-3 text-xs font-mono text-zinc-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {article.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {article.readTime}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                    {article.title}
                  </h3>

                  <p className="text-sm text-zinc-400 leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-zinc-400 group-hover:text-white transition-colors">
                  <span>Read Article</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </SpotlightCard>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Reader Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeArticle}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-2xl border border-white/10 bg-[#121214] p-6 sm:p-10 shadow-2xl z-10 scrollbar-thin"
            >
              {/* Close button */}
              <button
                onClick={closeArticle}
                className="absolute top-6 right-6 p-2 rounded-xl bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-zinc-400 mb-4">
                <span className="text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2.5 py-0.5 rounded">
                  {selectedArticle.category}
                </span>
                <span>•</span>
                <span>{selectedArticle.date}</span>
                <span>•</span>
                <span>{selectedArticle.readTime}</span>
              </div>

              {/* Title */}
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-6 pr-10">
                {selectedArticle.title}
              </h2>

              {/* Content */}
              <div className="text-zinc-300 leading-relaxed space-y-4 text-sm sm:text-base border-t border-white/[0.08] pt-6 whitespace-pre-line font-normal">
                {selectedArticle.content}
              </div>

              {/* Author footer */}
              <div className="mt-10 pt-6 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-zinc-500">
                <span>Written by Naksh Prajapati</span>
                <span>Bengaluru, India</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
