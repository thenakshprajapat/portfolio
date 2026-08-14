"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Clock, ArrowUpRight, X } from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { sound } from "@/lib/sound";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: "Networking & Community" | "Communication & Craft" | "Youth & Engineering";
  content: string;
}

const ARTICLES: Article[] = [
  {
    id: "networking-in-tech",
    title: "Why Meeting People & Networking Accelerates Everything",
    excerpt:
      "Code compiles on machines, but momentum compounds through people. Why reaching out, discussing ideas, and building a circle of curious builders is the highest-ROI habit you can form.",
    date: "Aug 2026",
    readTime: "5 min read",
    category: "Networking & Community",
    content: `When I first started programming, I assumed building software was an isolated craft. You sit in a room, write lines of code, and push them to a repository.

Over the past couple of years, hosting tech sessions, organizing developer events like Perplexity Comet and GitHub Education meetups, and constantly talking to builders, my entire perspective shifted: **the best engineering ideas are born in conversation.**

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
      "If you cannot explain a technical concept simply, you don't truly understand it yet. Why sharing what you learn makes you a dramatically sharper programmer.",
    date: "Jul 2026",
    readTime: "4 min read",
    category: "Communication & Craft",
    content: `There is a common misconception in software engineering that using dense jargon signifies intelligence. In reality, the best engineers are the ones who can break down complex ideas into crisp, intuitive analogies.

Whenever I learn a new technology — whether it's how Android choreographs frame rendering, how Firebase handles snapshot listeners, or how C++ allocates memory — I try to explain it to someone else.

### Why Teaching Compounds Your Code:
- **Instant Vulnerability Discovery**: You quickly realize the exact boundaries of your own understanding the moment you try to explain it without looking at notes.
- **De-cluttering Thought**: Teaching forces you to strip away non-essential noise and focus purely on first principles.
- **Building Community**: Sharing knowledge builds trust. When you teach openly, you invite critique, constructive feedback, and mutual growth.

Great code solves technical problems; great communication connects technology to humans.`,
  },
  {
    id: "programming-new-youth",
    title: "Programming in the New Youth: Building Over Credentials",
    excerpt:
      "The modern era belongs to young programmers who build, ship, and experiment with software because they genuinely love programming, not because of a checklist.",
    date: "Jun 2026",
    readTime: "5 min read",
    category: "Youth & Engineering",
    content: `Programming among the new generation of developers is experiencing a fundamental renaissance. We have access to open-source ecosystems, global communities, and tools that allow anyone with curiosity and an internet connection to ship real software.

The biggest distinction I see between programmers who stagnate and those who thrive comes down to one variable: **genuine curiosity**.

### What Matters Most:
1. **Building Real Things**: Reading theory without writing code is like reading about swimming without jumping into the pool. You learn 10x faster when you have a tangible problem you are trying to solve.
2. **Caring About How Software Feels**: It's not enough for code to merely function; we should care about responsiveness, micro-animations, interaction smoothness, and perceived quality.
3. **Iterating Without Fear**: Dropping assumptions, building messy first prototypes, and improving them iteratively is how real mastery is built.

Programming is an art form of thought. Build things because you love the craft.`,
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
    <section id="writing" className="py-16 px-6 sm:px-12 max-w-5xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
      >
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-500 tracking-wider uppercase mb-2">
            <BookOpen className="size-3.5" />
            <span>Mind Garden &amp; Essays</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--foreground)] tracking-tight">
            Writing &amp; Thoughts
          </h2>
          <p className="text-[var(--muted)] mt-2 text-sm max-w-lg leading-relaxed">
            Notes and essays on networking, talking, teaching technology, and programming in the new youth.
          </p>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap gap-2">
          {["All", "Networking & Community", "Communication & Craft", "Youth & Engineering"].map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                sound.playClick();
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all ${
                activeCategory === cat
                  ? "bg-[var(--foreground)] text-[var(--background)] font-semibold shadow-sm"
                  : "bg-[var(--secondary)] text-[var(--muted)] hover:text-[var(--foreground)] border border-[var(--border)]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {filteredArticles.map((article, idx) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.08 }}
          >
            <div onClick={() => openArticle(article)} className="cursor-pointer h-full">
              <SpotlightCard className="p-6 sm:p-7 flex flex-col justify-between h-full group rounded-3xl" enableSound>
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3.5">
                    <span className="text-[11px] font-mono text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full font-medium">
                      {article.category}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs font-mono text-[var(--muted)]">
                      <Clock className="size-3" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-[var(--foreground)] mb-2 group-hover:text-emerald-500 transition-colors leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>

                <div className="mt-5 pt-3.5 border-t border-[var(--border)] flex items-center justify-between text-xs font-mono text-[var(--muted)] group-hover:text-[var(--foreground)] transition-colors">
                  <span>Read Essay</span>
                  <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-emerald-500" />
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
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl border border-[var(--border)] bg-[var(--card)] p-7 sm:p-10 shadow-2xl z-10 scrollbar-thin text-[var(--foreground)]"
            >
              {/* Close button */}
              <button
                onClick={closeArticle}
                className="absolute top-6 right-6 p-2 rounded-2xl bg-[var(--secondary)] border border-[var(--border)] text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
                aria-label="Close modal"
              >
                <X className="size-4" />
              </button>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono text-[var(--muted)] mb-3">
                <span className="text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full font-medium">
                  {selectedArticle.category}
                </span>
                <span>•</span>
                <span>{selectedArticle.date}</span>
                <span>•</span>
                <span>{selectedArticle.readTime}</span>
              </div>

              {/* Title */}
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[var(--foreground)] tracking-tight mb-5 pr-8 leading-tight">
                {selectedArticle.title}
              </h2>

              {/* Content */}
              <div className="text-[var(--foreground)] leading-relaxed space-y-3.5 text-sm sm:text-base border-t border-[var(--border)] pt-5 whitespace-pre-line font-normal">
                {selectedArticle.content}
              </div>

              {/* Author footer */}
              <div className="mt-8 pt-4 border-t border-[var(--border)] flex items-center justify-between text-xs font-mono text-[var(--muted)]">
                <span>Written by Naksh</span>
                <span>Jaipur, India</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
