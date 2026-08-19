"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  Github,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  BarChart3,
  BookOpen,
  Plus,
  Sparkles,
} from "lucide-react";
import { sound } from "@/lib/sound";

const PROJECTS = [
  {
    id: 1,
    number: "01",
    category: "Web & Distributed State",
    year: "2026",
    title: "Contacts Sync App",
    description:
      "Built this because I kept losing contacts across devices and got annoyed enough to fix it. Uses Firestore snapshot listeners for sub-60ms optimistic updates and real-time cross-device sync.",
    tags: ["React 19", "Firebase", "Firestore", "TypeScript", "Realtime"],
    github: "https://github.com/thenakshprajapat/contacts-firebase",
    live: "https://contacts-firebase-app.vercel.app/",
    liveLabel: "Open Live App",
    accentRgb: "56, 189, 248",
    badgeColor: "bg-sky-500/10 text-sky-400 border-sky-500/20",
    demo: "contacts",
  },
  {
    id: 2,
    number: "02",
    category: "Python & NLP",
    year: "2025",
    title: "Paper Analyzer",
    description:
      "Made this for a friend who was cramming for finals. It reads past exam papers, clusters recurring question patterns with NLP, and generates a statistical study roadmap of high-probability topics.",
    tags: ["Python", "NLP", "Streamlit", "Topic Modeling", "Regex"],
    github: "https://github.com/thenakshprajapat/paper-analyzer",
    live: "https://paper-analyzer.streamlit.app/",
    liveLabel: "Open Live App",
    accentRgb: "129, 140, 248",
    badgeColor: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
    demo: "paper",
  },
  {
    id: 3,
    number: "03",
    category: "Open Source & Systems",
    year: "2025",
    title: "CS Resources Hub",
    description:
      "A curated, zero-noise repository of foundational CS learning tracks — Systems, DSA, Web, and OS. No commercial affiliate links or SEO clutter, just high-signal guides for serious learners.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Open Source"],
    github: "https://github.com/thenakshprajapat/edtech-cs",
    live: "https://thenakshprajapat.github.io/edtech-cs/",
    liveLabel: "Browse Hub",
    accentRgb: "52, 211, 153",
    badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    demo: "cs",
  },
];

/* ─── Inline interactive demos ────────────────────────────── */
function ContactsDemo() {
  const [contacts, setContacts] = useState([
    { id: 1, name: "Sarah Lin", role: "Frontend Engineer", sync: "Synced" },
    { id: 2, name: "David Chen", role: "Distributed Systems", sync: "Synced" },
  ]);
  const [busy, setBusy] = useState(false);

  const add = () => {
    if (busy) return;
    sound.playClick();
    setBusy(true);
    const nid = Date.now();
    setContacts((p) => [{ id: nid, name: "Alex Rivera", role: "Contributor", sync: "Syncing…" }, ...p]);
    setTimeout(() => {
      setContacts((p) => p.map((c) => (c.id === nid ? { ...c, sync: "Done (<60ms)" } : c)));
      setBusy(false);
      sound.playSuccess();
    }, 500);
  };

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--secondary)] p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[var(--foreground)]">
          <span className="size-1.5 rounded-full bg-sky-400 animate-pulse" />
          Live Optimistic Sync Engine
        </div>
        <button
          onClick={add}
          disabled={busy}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[var(--surface)] border border-[var(--border-strong)] hover:border-sky-400 text-xs font-mono text-sky-400 font-semibold transition-colors disabled:opacity-50 cursor-pointer"
        >
          <Plus className="size-3.5" /> Test Write
        </button>
      </div>
      <div className="space-y-2">
        {contacts.slice(0, 3).map((c) => (
          <div key={c.id} className="flex items-center justify-between p-2.5 rounded-lg bg-[var(--card)] border border-[var(--border)]">
            <div>
              <p className="text-xs font-bold text-[var(--foreground)]">{c.name}</p>
              <p className="text-[11px] text-[var(--muted)]">{c.role}</p>
            </div>
            <span
              className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border ${
                c.sync.includes("Sync")
                  ? "bg-amber-500/10 text-amber-300 border-amber-500/30 animate-pulse"
                  : "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
              }`}
            >
              {c.sync}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PaperDemo() {
  const [topic, setTopic] = useState("Operating Systems");
  const data: Record<string, { pct: number; note: string }> = {
    "Operating Systems": { pct: 32, note: "Paging & deadlocks recur annually" },
    "Data Structures": { pct: 28, note: "Binary search trees & graph traversals" },
    "Computer Networks": { pct: 22, note: "TCP/IP sliding window & subnetting" },
    "Database Systems": { pct: 18, note: "B+ trees & 3NF normalization" },
  };
  const curr = data[topic];
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--secondary)] p-4 space-y-3">
      <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[var(--foreground)]">
        <BarChart3 className="size-3.5 text-indigo-400" />
        Exam Topic Frequency Analysis
      </div>
      <div className="flex flex-wrap gap-1.5">
        {Object.keys(data).map((t) => (
          <button
            key={t}
            onClick={() => {
              setTopic(t);
              sound.playPop();
            }}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all cursor-pointer ${
              topic === t
                ? "bg-indigo-500 text-white font-bold"
                : "bg-[var(--card)] text-[var(--muted)] border border-[var(--border)] hover:text-[var(--foreground)]"
            }`}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs font-mono">
          <span className="text-[var(--muted)]">Calculated weight:</span>
          <span className="font-bold text-indigo-400">{curr.pct}%</span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-[var(--card)] overflow-hidden">
          <motion.div
            animate={{ width: `${curr.pct * 3}%` }}
            transition={{ duration: 0.35 }}
            className="h-full rounded-full bg-indigo-500"
          />
        </div>
        <p className="text-[11px] text-[var(--muted)]">{curr.note}</p>
      </div>
    </div>
  );
}

function CSDemo() {
  const [path, setPath] = useState("Systems");
  const paths: Record<string, string[]> = {
    Systems: ["C/C++ memory model & pointers", "POSIX processes & inter-thread signals", "Linux kernel virtual filesystem"],
    DSA: ["Asymptotic Big-O complexity", "Balanced trees & shortest paths", "Dynamic programming patterns"],
    Web: ["React 19 Server Components", "Firestore snapshot sync", "Modern CSS layout engine"],
    OS: ["Paging, TLB & cache hierarchy", "Mutexes & semaphore deadlocks", "File system inodes"],
  };
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--secondary)] p-4 space-y-3">
      <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[var(--foreground)]">
        <BookOpen className="size-3.5 text-emerald-400" />
        Curated Learning Tracks
      </div>
      <div className="flex flex-wrap gap-1.5">
        {Object.keys(paths).map((p) => (
          <button
            key={p}
            onClick={() => {
              setPath(p);
              sound.playPop();
            }}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all cursor-pointer ${
              path === p
                ? "bg-emerald-500 text-[#040914] font-bold"
                : "bg-[var(--card)] text-[var(--muted)] border border-[var(--border)] hover:text-[var(--foreground)]"
            }`}
          >
            {p}
          </button>
        ))}
      </div>
      <div className="space-y-1.5">
        {paths[path].map((item, i) => (
          <div key={i} className="flex items-center gap-2 p-2.5 rounded-lg bg-[var(--card)] border border-[var(--border)] text-xs text-[var(--foreground)]">
            <CheckCircle2 className="size-3.5 text-emerald-400 shrink-0" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const DEMOS: Record<string, React.FC> = { contacts: ContactsDemo, paper: PaperDemo, cs: CSDemo };

const AUTO_MS = 5000;

export function ArtifactDeck() {
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState(1);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const total = PROJECTS.length;

  const go = useCallback(
    (idx: number, d: number) => {
      setDir(d);
      setCurrent(idx);
      sound.playPop();
    },
    []
  );

  const next = useCallback(() => go((current + 1) % total, 1), [current, go, total]);
  const prev = useCallback(() => go((current - 1 + total) % total, -1), [current, go, total]);

  useEffect(() => {
    timer.current = setTimeout(next, AUTO_MS);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [current, next]);

  const proj = PROJECTS[current];
  const Demo = DEMOS[proj.demo];
  const prevIdx = (current - 1 + total) % total;
  const nextIdx = (current + 1) % total;

  return (
    <section id="work" className="py-16 sm:py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 sm:mb-14 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"
        >
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase text-sky-400 tracking-widest">
              <Sparkles className="size-3" />
              <span>Selected Work</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[var(--foreground)]">
              Featured <span className="gradient-text">Engineering Projects</span>
            </h2>
            <p className="text-sm text-[var(--muted)] max-w-lg leading-relaxed">
              Real projects built with deep attention to gesture physics, performance, and architecture.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              {PROJECTS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => go(i, i > current ? 1 : -1)}
                  className={`rounded-full transition-all duration-300 cursor-pointer ${
                    i === current
                      ? "w-6 h-2 bg-sky-400"
                      : "w-2 h-2 bg-[var(--border-strong)] hover:bg-[var(--muted)]"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={prev}
              className="p-2 rounded-xl border border-[var(--border)] text-[var(--muted)] hover:text-[var(--foreground)] hover:border-sky-500/50 transition-all cursor-pointer"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              onClick={next}
              className="p-2 rounded-xl border border-[var(--border)] text-[var(--muted)] hover:text-[var(--foreground)] hover:border-sky-500/50 transition-all cursor-pointer"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Carousel */}
      <div className="relative flex items-center justify-center gap-4 sm:gap-6 px-4 sm:px-8">
        {/* Prev — blurred preview */}
        <div className="hidden sm:block w-[240px] lg:w-[290px] flex-shrink-0 pointer-events-none select-none">
          <div className="opacity-35 scale-90 origin-right blur-[2px] transition-all duration-500">
            <MiniCard project={PROJECTS[prevIdx]} />
          </div>
        </div>

        {/* Center — active */}
        <div className="flex-1 min-w-0 max-w-2xl">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={proj.id}
              custom={dir}
              variants={{
                enter: (d: number) => ({ x: d > 0 ? 80 : -80, opacity: 0, scale: 0.97 }),
                center: { x: 0, opacity: 1, scale: 1 },
                exit: (d: number) => ({ x: d > 0 ? -80 : 80, opacity: 0, scale: 0.97 }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
              className="bento-card relative overflow-hidden bg-[var(--surface)] border-[var(--border-strong)]"
              style={{ boxShadow: `0 10px 40px rgba(${proj.accentRgb}, 0.08)` }}
            >
              <div
                className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none"
                style={{
                  background: `radial-gradient(circle, rgba(${proj.accentRgb}, 0.12) 0%, transparent 70%)`,
                  filter: "blur(40px)",
                }}
              />

              <div className="relative p-6 sm:p-8 space-y-5">
                <div>
                  <div className="flex flex-wrap items-center gap-2.5 mb-2.5">
                    <span className="font-mono text-3xl font-bold text-[var(--border-strong)] select-none">
                      {proj.number}
                    </span>
                    <span className={`text-xs font-mono font-semibold px-2.5 py-1 rounded-full border ${proj.badgeColor}`}>
                      {proj.category}
                    </span>
                    <span className="text-xs font-mono text-[var(--muted)]">{proj.year}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[var(--foreground)] tracking-tight leading-snug mb-2">
                    {proj.title}
                  </h3>
                  <p className="text-sm text-[var(--muted)] leading-relaxed max-w-lg">{proj.description}</p>
                </div>

                <Demo />

                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[var(--border)]">
                  <div className="flex flex-wrap gap-1.5">
                    {proj.tags.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-0.5 rounded-lg bg-[var(--secondary)] border border-[var(--border)] text-[11px] text-[var(--muted)] font-mono"
                      >
                        {t}
                      </span>
                    ))}
                    {proj.tags.length > 3 && (
                      <span className="text-[11px] text-[var(--muted)] font-mono">
                        +{proj.tags.length - 3}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href={proj.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => sound.playPop()}
                      className="p-2 rounded-lg border border-[var(--border)] bg-[var(--secondary)] text-[var(--muted)] hover:text-[var(--foreground)] hover:border-sky-500/40 transition-all"
                    >
                      <Github className="size-4" />
                    </a>
                    <a
                      href={proj.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => sound.playPop()}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[var(--foreground)] text-[var(--background)] text-xs font-bold hover:bg-sky-400 hover:text-[#040914] transition-all shadow-md"
                    >
                      <span>{proj.liveLabel}</span>
                      <ExternalLink className="size-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Next — blurred preview */}
        <div className="hidden sm:block w-[240px] lg:w-[290px] flex-shrink-0 pointer-events-none select-none">
          <div className="opacity-35 scale-90 origin-left blur-[2px] transition-all duration-500">
            <MiniCard project={PROJECTS[nextIdx]} />
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8 mt-8">
        <div className="h-1 bg-[var(--surface-elevated)] rounded-full overflow-hidden border border-[var(--border)]">
          <motion.div
            key={current}
            className="h-full bg-sky-400 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: AUTO_MS / 1000, ease: "linear" }}
          />
        </div>
        <div className="flex justify-between mt-2 text-[10px] font-mono text-[var(--muted)]">
          <span>
            {proj.number} / {String(total).padStart(2, "0")}
          </span>
          <span>auto-advancing · tap controls to pause</span>
        </div>
      </div>
    </section>
  );
}

function MiniCard({ project }: { project: typeof PROJECTS[0] }) {
  return (
    <div className="bento-card p-5 space-y-3 bg-[var(--surface)]">
      <div className="flex items-center gap-2">
        <span className="font-mono text-2xl font-bold text-[var(--border-strong)]">{project.number}</span>
        <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${project.badgeColor}`}>
          {project.category}
        </span>
      </div>
      <h3 className="text-base font-bold text-[var(--foreground)] leading-snug">{project.title}</h3>
      <p className="text-xs text-[var(--muted)] line-clamp-2 leading-relaxed">{project.description}</p>
    </div>
  );
}
