"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ExternalLink,
  Github,
  FolderGit2,
  Sparkles,
  ArrowRight,
  Code2,
  Cpu,
  Layers,
  ChevronRight,
} from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { sound } from "@/lib/sound";

interface ProjectCaseStudy {
  id: string;
  title: string;
  subtitle: string;
  category: "Systems & OS" | "Web & Cloud" | "AI & NLP";
  year: string;
  problem: string;
  solution: string;
  impact: string;
  tags: string[];
  github?: string;
  link?: string;
  accentColor: string;
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
    problem:
      "Most contact management applications suffer from sync conflicts when multiple devices write simultaneously, or feel sluggish due to waiting for network round-trips.",
    solution:
      "Engineered an offline-first architecture utilizing React and Firebase Firestore snapshot listeners. Implemented optimistic UI mutations, idempotent CRUD operations, and structured cloud asset pipelines.",
    impact:
      "Achieved sub-100ms UI response times across devices, robust offline queuing, and gained deep mastery of distributed state synchronization.",
    tags: ["React", "Firebase", "Firestore", "Real-Time Sync", "Cloud Storage", "Tailwind CSS"],
    github: "https://github.com/thenakshprajapat/contacts-firebase",
    link: "https://contacts-firebase-app.vercel.app/",
    accentColor: "from-blue-500 to-indigo-500",
    glowColor: "rgba(0, 102, 255, 0.2)",
    architectureHighlights: [
      "Real-time snapshot listener synchronization",
      "Optimistic UI updates with offline persistence",
      "Strict Firestore security rules & index optimization",
    ],
  },
  {
    id: "aosp-internals",
    title: "AOSP & Android OS Systems Lab",
    subtitle: "Low-level research on Binder IPC, HAL, and Android Framework services",
    category: "Systems & OS",
    year: "2026",
    problem:
      "Modern Android development often stays on the high-level UI layer, leaving a massive knowledge gap in how the OS, Binder IPC, and HAL actually coordinate underneath.",
    solution:
      "Created an experimental system lab investigating AOSP internals, tracing IPC serialization via Binder, testing custom system service daemons, and profiling Linux kernel resource tunables.",
    impact:
      "Built working mental models and C++/Java prototypes for OS-level mechanics, laying the foundation for future work on core Android platforms and custom ROMs.",
    tags: ["AOSP", "C++", "Java", "Linux Kernel", "Binder IPC", "ADB / Fastboot"],
    github: "https://github.com/thenakshprajapat",
    accentColor: "from-sky-500 to-blue-600",
    glowColor: "rgba(56, 189, 248, 0.2)",
    architectureHighlights: [
      "Binder IPC transaction profiling & serialization",
      "System service lifecycle & Android HAL analysis",
      "Kernel governor & memory allocation experiments",
    ],
  },
  {
    id: "paper-analyzer",
    title: "Paper Analyzer — Exam Pattern Intelligence",
    subtitle: "NLP-powered question paper intelligence uncovering recurring syllabus patterns",
    category: "AI & NLP",
    year: "2025",
    problem:
      "Students preparing for university examinations blindly read hundreds of textbook pages without knowing the statistical weightage or repetition frequency of exam topics.",
    solution:
      "Developed a Python NLP intelligence application that extracts questions from historical university papers, models topics semantically, and calculates frequency heatmaps for exam prep.",
    impact:
      "Allowed peers to isolate high-yield chapters and recurring concepts with 80% higher revision efficiency. Deployed live on Streamlit Cloud.",
    tags: ["Python", "NLP", "Topic Modeling", "Streamlit", "Data Analysis", "RegEx"],
    github: "https://github.com/thenakshprajapat/paper-analyzer",
    link: "https://paper-analyzer.streamlit.app/",
    accentColor: "from-amber-500 to-orange-500",
    glowColor: "rgba(245, 158, 11, 0.2)",
    architectureHighlights: [
      "Automated document text extraction & cleaning",
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
    problem:
      "Beginners entering Computer Science face overwhelming internet noise, commercial SEO spam, and unstructured roadmaps that cause analysis paralysis.",
    solution:
      "Architected a distraction-free learning directory categorizing foundational CS paths (Systems, DSA, Web, OS) with clean UX, curated roadmaps, and zero advertisement overhead.",
    impact:
      "Used actively by university juniors; eliminated resource hunting time and created a single reliable launchpad for computer science foundations.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "UI/UX", "Open Source"],
    github: "https://github.com/thenakshprajapat/edtech-cs/",
    link: "https://thenakshprajapat.github.io/edtech-cs/",
    accentColor: "from-blue-600 to-cyan-500",
    glowColor: "rgba(37, 99, 235, 0.2)",
    architectureHighlights: [
      "Lightweight static architecture for near-instant loads",
      "Structured learning path taxonomy & search filtering",
      "Community-driven markdown resource registry",
    ],
  },
  {
    id: "rohit-portfolio",
    title: "Rohit Portfolio — Bespoke Identity",
    subtitle: "Clean, high-craft personal web identity built for client storytelling",
    category: "Web & Cloud",
    year: "2024",
    problem:
      "Generic template portfolios fail to reflect unique developer capability, presenting clunky animations and poor typography hierarchy.",
    solution:
      "Designed and implemented a bespoke, minimal portfolio utilizing Next.js, fluid spacing tokens, reusable component architecture, and responsive performance optimizations.",
    impact:
      "Delivered a polished digital presence representing client work with zero fluff, strengthening practical freelance and client engineering skills.",
    tags: ["Next.js", "Tailwind CSS", "Responsive UI", "Vercel"],
    github: "https://github.com/thenakshprajapat/rohit-portfolio",
    link: "https://rohitprajapat.vercel.app/",
    accentColor: "from-purple-500 to-pink-500",
    glowColor: "rgba(168, 85, 247, 0.2)",
    architectureHighlights: [
      "Component-driven design system with fluid typography",
      "Responsive accessibility & zero layout shift",
      "Vercel Edge deployment with automated previews",
    ],
  },
];

export function FeaturedProjects() {
  const [filter, setFilter] = useState<string>("All");

  const filteredProjects =
    filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  return (
    <section id="projects" className="py-24 px-6 sm:px-12 max-w-6xl mx-auto">
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
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Case Studies &amp; Engineering Work</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Featured Projects
          </h2>
          <p className="text-zinc-400 mt-2 text-sm sm:text-base max-w-xl">
            Selected systems, tools, and platforms engineered with clear intent. Structured by problem, architecture, and impact.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2">
          {["All", "Systems & OS", "Web & Cloud", "AI & NLP"].map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setFilter(cat);
                sound.playClick();
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                filter === cat
                  ? "bg-white text-zinc-950 font-medium shadow-sm"
                  : "bg-white/[0.04] text-zinc-400 hover:text-white hover:bg-white/[0.08] border border-white/[0.06]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Projects Stack */}
      <div className="space-y-8">
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
          >
            <SpotlightCard
              className="p-6 sm:p-8"
              glowColor={project.glowColor}
              enableSound
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-6">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2.5 py-0.5 rounded">
                      {project.category}
                    </span>
                    <span className="text-xs font-mono text-zinc-500">{project.year}</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    {project.title}
                  </h3>
                  <p className="text-sm text-zinc-400 max-w-2xl font-normal">
                    {project.subtitle}
                  </p>
                </div>

                {/* External Action Links */}
                <div className="flex items-center gap-3 shrink-0">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-medium text-zinc-300 hover:text-white transition-all"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>Code</span>
                    </a>
                  )}
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-medium text-white shadow-sm shadow-blue-500/20 transition-all hover:scale-[1.02]"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Live App</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Case Study Details: Problem → Architecture → Impact */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-white/[0.06]">
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] space-y-1.5">
                  <span className="text-[11px] font-mono uppercase text-zinc-400 tracking-wider">
                    01. Problem
                  </span>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    {project.problem}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] space-y-1.5">
                  <span className="text-[11px] font-mono uppercase text-blue-400 tracking-wider">
                    02. Architecture &amp; Solution
                  </span>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    {project.solution}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] space-y-1.5">
                  <span className="text-[11px] font-mono uppercase text-emerald-400 tracking-wider">
                    03. Impact &amp; Mastered
                  </span>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    {project.impact}
                  </p>
                </div>
              </div>

              {/* Architecture Highlights & Tags */}
              <div className="mt-6 pt-4 border-t border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/[0.06] text-[11px] font-mono text-zinc-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="text-[11px] font-mono text-zinc-500">
                  Case Study Complete
                </div>
              </div>
            </SpotlightCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
