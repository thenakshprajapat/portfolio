"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  Github,
  FolderGit2,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
} from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { sound } from "@/lib/sound";

interface ProjectCaseStudy {
  id: string;
  title: string;
  subtitle: string;
  category: "Web & Cloud" | "AI & NLP";
  year: string;
  summary: string;
  problem: string;
  solution: string;
  impact: string;
  tags: string[];
  github?: string;
  link?: string;
  glowColor: string;
  architectureHighlights: string[];
}

const PROJECTS: ProjectCaseStudy[] = [
  {
    id: "contacts-sync",
    title: "Contacts Realtime Sync Engine",
    subtitle: "High-reliability distributed contact manager with Firestore & optimistic listeners",
    category: "Web & Cloud",
    year: "2026",
    summary:
      "Engineered an offline-first architecture utilizing React and Firebase Firestore snapshot listeners, supporting optimistic mutations, multi-device conflict resolution, and sub-100ms UI response times.",
    problem:
      "Most contact applications suffer from sync latency or clunky UI lockups when multiple devices write simultaneously.",
    solution:
      "Implemented idempotent CRUD operations, real-time snapshot listeners with local cache fallback, and structured cloud asset pipelines.",
    impact:
      "Achieved sub-100ms optimistic UI mutations, resilient offline queuing, and zero data loss across concurrent edits.",
    tags: ["React", "Firebase", "Firestore", "Real-Time Sync", "Cloud Storage", "Tailwind CSS"],
    github: "https://github.com/thenakshprajapat/contacts-firebase",
    link: "https://contacts-firebase-app.vercel.app/",
    glowColor: "rgba(16, 185, 129, 0.16)",
    architectureHighlights: [
      "Real-time snapshot listener synchronization",
      "Optimistic UI updates with offline persistence",
      "Strict Firestore security rules & index optimization",
    ],
  },
  {
    id: "paper-analyzer",
    title: "Paper Analyzer — Exam Pattern Intelligence",
    subtitle: "NLP-powered question paper intelligence uncovering recurring syllabus patterns",
    category: "AI & NLP",
    year: "2025",
    summary:
      "A Python NLP intelligence platform that extracts text from historical university examination papers, performs semantic topic clustering, and generates statistical revision heatmaps for students.",
    problem:
      "Students preparing for exams blindly read hundreds of textbook pages without knowing the statistical weightage or repetition frequency of exam topics.",
    solution:
      "Built automated document text extraction pipelines, regex parsing, and semantic topic modeling to calculate chapter frequency scores.",
    impact:
      "Allowed peers to isolate high-yield chapters with 80% higher revision efficiency. Deployed live on Streamlit Cloud.",
    tags: ["Python", "NLP", "Topic Modeling", "Streamlit", "Data Analysis"],
    github: "https://github.com/thenakshprajapat/paper-analyzer",
    link: "https://paper-analyzer.streamlit.app/",
    glowColor: "rgba(245, 158, 11, 0.16)",
    architectureHighlights: [
      "Automated PDF document text extraction & regex cleaning",
      "Semantic topic grouping & frequency clustering",
      "Interactive Streamlit dashboard for real-time analysis",
    ],
  },
  {
    id: "cs-resources",
    title: "CS Resources Hub — Zero-Noise Learning",
    subtitle: "Curated learning platform removing internet clutter for beginner engineers",
    category: "Web & Cloud",
    year: "2025",
    summary:
      "Architected a distraction-free learning directory categorizing foundational CS paths (Systems, DSA, Web, OS) with clean UX, curated roadmaps, and zero commercial SEO bloat.",
    problem:
      "Beginners entering Computer Science face overwhelming internet noise, commercial SEO spam, and unstructured roadmaps that cause analysis paralysis.",
    solution:
      "Constructed a lightweight static architecture for near-instant loads, structured learning path taxonomies, and community markdown contributions.",
    impact:
      "Used actively by university peers; eliminated resource hunting time and created a single reliable launchpad for computer science foundations.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "UI/UX", "Open Source"],
    github: "https://github.com/thenakshprajapat/edtech-cs/",
    link: "https://thenakshprajapat.github.io/edtech-cs/",
    glowColor: "rgba(16, 185, 129, 0.16)",
    architectureHighlights: [
      "Lightweight static architecture for near-instant loads",
      "Structured learning path taxonomy & search filtering",
      "Community-driven markdown resource registry",
    ],
  },
];

export function FeaturedProjects() {
  const [filter, setFilter] = useState<string>("All");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredProjects =
    filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  const toggleExpand = (id: string) => {
    sound.playClick();
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="projects" className="py-16 px-6 sm:px-12 max-w-5xl mx-auto">
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
            <FolderGit2 className="size-3.5" />
            <span>Featured Case Studies</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--foreground)] tracking-tight">
            Engineering Work
          </h2>
          <p className="text-[var(--muted)] mt-2 text-sm max-w-lg leading-relaxed">
            Selected applications and tools built by Naksh. Structured by problem, engineered solution, and real-world impact.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2">
          {["All", "Web & Cloud", "AI & NLP"].map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setFilter(cat);
                sound.playClick();
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all ${
                filter === cat
                  ? "bg-[var(--foreground)] text-[var(--background)] font-semibold shadow-sm"
                  : "bg-[var(--secondary)] text-[var(--muted)] hover:text-[var(--foreground)] border border-[var(--border)]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Projects Stack */}
      <div className="space-y-6">
        {filteredProjects.map((project, index) => {
          const isExpanded = expandedId === project.id;
          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <SpotlightCard
                className="p-7 sm:p-9 rounded-3xl group"
                glowColor={project.glowColor}
                enableSound
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5 mb-5">
                  <div className="space-y-2.5">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="text-xs font-mono uppercase tracking-wider text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full font-medium">
                        {project.category}
                      </span>
                      <span className="text-xs font-mono text-[var(--muted)]">{project.year}</span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-[var(--foreground)] tracking-tight">
                      {project.title}
                    </h3>
                    <p className="text-sm text-[var(--foreground)]/80 max-w-2xl leading-relaxed font-normal">
                      {project.summary}
                    </p>
                  </div>

                  {/* External Action Links */}
                  <div className="flex items-center gap-2.5 shrink-0 pt-1 lg:pt-0">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onMouseEnter={() => sound.playPop()}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[var(--secondary)] hover:border-[var(--border-highlight)] border border-[var(--border)] text-xs font-medium text-[var(--foreground)] transition-all shadow-sm"
                      >
                        <Github className="size-3.5" />
                        <span>Source</span>
                      </a>
                    )}
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onMouseEnter={() => sound.playPop()}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-xs font-semibold text-black shadow-md shadow-emerald-500/20 transition-all hover:scale-[1.02]"
                      >
                        <ExternalLink className="size-3.5" />
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Architecture Highlights Bullets */}
                <div className="mt-5 pt-5 border-t border-[var(--border)] grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {project.architectureHighlights.map((highlight, hIdx) => (
                    <div key={hIdx} className="flex items-start gap-2 p-3 rounded-2xl bg-[var(--secondary)] border border-[var(--border)]">
                      <CheckCircle2 className="size-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-xs text-[var(--foreground)] leading-snug">{highlight}</span>
                    </div>
                  ))}
                </div>

                {/* Deep Dive Collapsible Section */}
                <div className="mt-5 pt-3.5 border-t border-[var(--border)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded-lg bg-[var(--secondary)] border border-[var(--border)] text-[11px] font-mono text-[var(--muted)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => toggleExpand(project.id)}
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-500 hover:text-emerald-400 transition-colors self-start sm:self-auto font-medium"
                  >
                    <span>{isExpanded ? "Hide Details" : "Inspect Case Study"}</span>
                    {isExpanded ? <ChevronUp className="size-3.5" /> : <ChevronDown className="size-3.5" />}
                  </button>
                </div>

                {/* Expanded Deep-Dive Content */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden pt-5"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 p-4 rounded-2xl bg-[var(--secondary)] border border-[var(--border)]">
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono uppercase text-[var(--muted)] tracking-wider">
                            01. Problem Space
                          </span>
                          <p className="text-xs text-[var(--foreground)] leading-relaxed">
                            {project.problem}
                          </p>
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono uppercase text-emerald-500 tracking-wider font-semibold">
                            02. Engineered Solution
                          </span>
                          <p className="text-xs text-[var(--foreground)] leading-relaxed">
                            {project.solution}
                          </p>
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono uppercase text-teal-500 tracking-wider font-semibold">
                            03. Result &amp; Impact
                          </span>
                          <p className="text-xs text-[var(--foreground)] leading-relaxed">
                            {project.impact}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </SpotlightCard>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
