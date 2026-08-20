"use client";

import React, { useState } from "react";
import {
  ExternalLink,
  Github,
  Layers,
  Sparkles,
  Plus,
} from "lucide-react";
import { sound } from "@/lib/sound";

const PROJECTS = [
  {
    id: "contacts-sync",
    number: "01",
    category: "Realtime Systems",
    year: "2026",
    title: "Contacts Realtime Sync Engine",
    description:
      "A distributed contact manager built on Firestore snapshot listeners, supporting optimistic local state updates, network partition tolerance, and sub-60ms mutation latency.",
    tags: ["React 19", "Firebase Firestore", "TypeScript", "Tailwind CSS"],
    github: "https://github.com/thenakshprajapat/contacts-firebase",
    live: "https://contacts-firebase-app.vercel.app/",
    liveLabel: "Open Live App",
    accent: "text-cyan-400 border-cyan-500/25 bg-cyan-500/10",
  },
  {
    id: "paper-analyzer",
    number: "02",
    category: "Python & NLP Intelligence",
    year: "2025",
    title: "Paper Analyzer — Pattern AI",
    description:
      "Automated NLP engine that ingests historical exam papers, performs regex extraction and semantic topic clustering, and generates statistical revision heatmaps of recurring exam patterns.",
    tags: ["Python", "NLP", "Topic Modeling", "Streamlit", "Data Analysis"],
    github: "https://github.com/thenakshprajapat/paper-analyzer",
    live: "https://paper-analyzer.streamlit.app/",
    liveLabel: "Open Live App",
    accent: "text-indigo-400 border-indigo-500/25 bg-indigo-500/10",
  },
  {
    id: "cs-hub",
    number: "03",
    category: "Systems & Open Source",
    year: "2025",
    title: "CS Resources Hub — Zero-Noise",
    description:
      "A distraction-free directory categorizing foundational CS learning paths (Systems, DSA, Web, OS) with clean UX, curated roadmaps, and zero commercial affiliate clutter.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Open Source"],
    github: "https://github.com/thenakshprajapat/edtech-cs",
    live: "https://thenakshprajapat.github.io/edtech-cs/",
    liveLabel: "Browse Hub",
    accent: "text-amber-400 border-amber-500/25 bg-amber-500/10",
  },
];

export function ArtifactDeck() {
  const [contacts, setContacts] = useState([
    { id: 1, name: "Sarah Lin", role: "Frontend Lead", sync: "Synced" },
    { id: 2, name: "David Chen", role: "Distributed Systems", sync: "Synced" },
  ]);
  const [adding, setAdding] = useState(false);

  const addContact = () => {
    if (adding) return;
    sound.playClick();
    setAdding(true);
    const newId = Date.now();
    setContacts((p) => [{ id: newId, name: "Alex Rivera", role: "Contributor", sync: "Syncing…" }, ...p]);
    setTimeout(() => {
      setContacts((p) => p.map((c) => (c.id === newId ? { ...c, sync: "Done (<60ms)" } : c)));
      setAdding(false);
      sound.playSuccess();
    }, 500);
  };

  return (
    <section id="work" className="py-16 sm:py-20 px-6 sm:px-12 max-w-5xl mx-auto">
      <div className="space-y-12">
        {/* Section Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 tracking-wider uppercase">
            <Layers className="size-3.5" />
            <span>Featured Engineering</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--foreground)] tracking-tight">
            Selected Builds &amp; Architectures
          </h2>
          <p className="text-[var(--muted)] text-sm max-w-lg leading-relaxed">
            Real production applications, distributed state engines, and open-source platforms built solo.
          </p>
        </div>

        {/* Project Cards */}
        <div className="space-y-6">
          {/* Card 1: Contacts Sync */}
          <div className="craft-card p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-2xl font-bold text-cyan-400">{PROJECTS[0].number}</span>
                  <span className={`text-xs font-mono px-2.5 py-0.5 rounded-full border font-medium ${PROJECTS[0].accent}`}>
                    {PROJECTS[0].category}
                  </span>
                  <span className="text-xs font-mono text-[var(--muted)]">{PROJECTS[0].year}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[var(--foreground)] tracking-tight">
                  {PROJECTS[0].title}
                </h3>
                <p className="text-sm text-[var(--muted)] max-w-2xl leading-relaxed">
                  {PROJECTS[0].description}
                </p>
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                <a
                  href={PROJECTS[0].github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playPop()}
                  className="p-2.5 rounded-full border border-[var(--border)] bg-[var(--surface-elevated)] hover:border-cyan-500/40 text-[var(--muted)] hover:text-cyan-400 transition-all"
                  title="GitHub Repository"
                >
                  <Github className="size-4" />
                </a>
                <a
                  href={PROJECTS[0].live}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playPop()}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-cyan-400 text-[#07080c] hover:bg-cyan-300 font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-cyan-500/10"
                >
                  <span>{PROJECTS[0].liveLabel}</span>
                  <ExternalLink className="size-3.5" />
                </a>
              </div>
            </div>

            {/* Interactive Live Sync Simulation Box */}
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-4 sm:p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[var(--foreground)]">
                  <span className="size-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span>Live Optimistic Sync Engine</span>
                </div>
                <button
                  onClick={addContact}
                  disabled={adding}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[var(--surface)] border border-[var(--border)] hover:border-cyan-400 text-xs font-mono text-cyan-400 font-semibold transition-colors disabled:opacity-50 cursor-pointer"
                >
                  <Plus className="size-3.5" />
                  <span>Test Write</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {contacts.slice(0, 2).map((c) => (
                  <div key={c.id} className="flex items-center justify-between p-3 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
                    <div>
                      <p className="text-xs font-bold text-[var(--foreground)]">{c.name}</p>
                      <p className="text-[11px] text-[var(--muted)]">{c.role}</p>
                    </div>
                    <span
                      className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border ${
                        c.sync.includes("Sync")
                          ? "bg-amber-500/10 text-amber-300 border-amber-500/30 animate-pulse"
                          : "bg-cyan-500/10 text-cyan-400 border-cyan-500/30"
                      }`}
                    >
                      {c.sync}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-1 border-t border-[var(--border)]">
              {PROJECTS[0].tags.map((t) => (
                <span key={t} className="px-3 py-1 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)] text-xs font-mono text-[var(--muted)]">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Card 2: Paper Analyzer */}
          <div className="craft-card p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-2xl font-bold text-indigo-400">{PROJECTS[1].number}</span>
                  <span className={`text-xs font-mono px-2.5 py-0.5 rounded-full border font-medium ${PROJECTS[1].accent}`}>
                    {PROJECTS[1].category}
                  </span>
                  <span className="text-xs font-mono text-[var(--muted)]">{PROJECTS[1].year}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[var(--foreground)] tracking-tight">
                  {PROJECTS[1].title}
                </h3>
                <p className="text-sm text-[var(--muted)] max-w-2xl leading-relaxed">
                  {PROJECTS[1].description}
                </p>
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                <a
                  href={PROJECTS[1].github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playPop()}
                  className="p-2.5 rounded-full border border-[var(--border)] bg-[var(--surface-elevated)] hover:border-indigo-500/40 text-[var(--muted)] hover:text-indigo-400 transition-all"
                  title="GitHub Repository"
                >
                  <Github className="size-4" />
                </a>
                <a
                  href={PROJECTS[1].live}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playPop()}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-indigo-500 text-white hover:bg-indigo-400 font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-md"
                >
                  <span>{PROJECTS[1].liveLabel}</span>
                  <ExternalLink className="size-3.5" />
                </a>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-1 border-t border-[var(--border)]">
              {PROJECTS[1].tags.map((t) => (
                <span key={t} className="px-3 py-1 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)] text-xs font-mono text-[var(--muted)]">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Card 3: CS Hub */}
          <div className="craft-card p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-2xl font-bold text-amber-400">{PROJECTS[2].number}</span>
                  <span className={`text-xs font-mono px-2.5 py-0.5 rounded-full border font-medium ${PROJECTS[2].accent}`}>
                    {PROJECTS[2].category}
                  </span>
                  <span className="text-xs font-mono text-[var(--muted)]">{PROJECTS[2].year}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[var(--foreground)] tracking-tight">
                  {PROJECTS[2].title}
                </h3>
                <p className="text-sm text-[var(--muted)] max-w-2xl leading-relaxed">
                  {PROJECTS[2].description}
                </p>
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                <a
                  href={PROJECTS[2].github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playPop()}
                  className="p-2.5 rounded-full border border-[var(--border)] bg-[var(--surface-elevated)] hover:border-amber-500/40 text-[var(--muted)] hover:text-amber-400 transition-all"
                  title="GitHub Repository"
                >
                  <Github className="size-4" />
                </a>
                <a
                  href={PROJECTS[2].live}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playPop()}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-amber-400 text-[#07080c] hover:bg-amber-300 font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-md"
                >
                  <span>{PROJECTS[2].liveLabel}</span>
                  <ExternalLink className="size-3.5" />
                </a>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-1 border-t border-[var(--border)]">
              {PROJECTS[2].tags.map((t) => (
                <span key={t} className="px-3 py-1 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)] text-xs font-mono text-[var(--muted)]">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
