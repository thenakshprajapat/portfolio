"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Github, Sparkles, FolderGit2 } from "lucide-react";
import Link from "next/link";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { FloatingNav } from "@/components/floating-nav";
import { CommandMenu } from "@/components/command-menu";
import { Footer } from "@/components/footer";

const ALL_PROJECTS = [
  {
    title: "Contacts Realtime Sync Engine",
    subtitle: "High-reliability distributed contact manager with Firestore & optimistic listeners",
    category: "Web & Cloud",
    year: "2026",
    problem:
      "Contact management applications frequently run into sync conflicts or feel sluggish due to waiting for network round-trips.",
    solution:
      "Engineered an offline-first architecture utilizing React and Firebase Firestore snapshot listeners. Implemented optimistic UI mutations, idempotent CRUD operations, and structured cloud asset pipelines.",
    impact:
      "Achieved sub-100ms UI response times across devices, robust offline queuing, and gained deep mastery of distributed state synchronization.",
    tags: ["React", "Firebase", "Firestore", "Real-Time Sync", "Cloud Storage", "Tailwind CSS"],
    github: "https://github.com/thenakshprajapat/contacts-firebase",
    link: "https://contacts-firebase-app.vercel.app/",
    glowColor: "rgba(0, 102, 255, 0.2)",
  },
  {
    title: "AOSP & Android OS Systems Lab",
    subtitle: "Low-level research on Binder IPC, HAL, and Android Framework services",
    category: "Systems & OS",
    year: "2026",
    problem:
      "Modern Android development often stays on the high-level UI layer, leaving a massive knowledge gap in how the OS, Binder IPC, and HAL coordinate underneath.",
    solution:
      "Created an experimental system lab investigating AOSP internals, tracing IPC serialization via Binder, testing custom system service daemons, and profiling Linux kernel resource tunables.",
    impact:
      "Built working mental models and C++/Java prototypes for OS-level mechanics, laying the foundation for future work on core Android platforms and custom ROMs.",
    tags: ["AOSP", "C++", "Java", "Linux Kernel", "Binder IPC", "ADB / Fastboot"],
    github: "https://github.com/thenakshprajapat",
    glowColor: "rgba(56, 189, 248, 0.2)",
  },
  {
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
    glowColor: "rgba(245, 158, 11, 0.2)",
  },
  {
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
    glowColor: "rgba(37, 99, 235, 0.2)",
  },
  {
    title: "Rohit Portfolio — Bespoke Identity",
    subtitle: "Clean, high-craft personal web identity built for client storytelling",
    category: "Web & Cloud",
    year: "2024",
    problem:
      "Generic template portfolios fail to reflect individual developer capability, presenting clunky animations and poor typography hierarchy.",
    solution:
      "Designed and implemented a bespoke, minimal portfolio utilizing Next.js, fluid spacing tokens, reusable component architecture, and responsive performance optimizations.",
    impact:
      "Delivered a polished digital presence representing client work with zero fluff, strengthening practical freelance and client engineering skills.",
    tags: ["Next.js", "Tailwind CSS", "Responsive UI", "Vercel"],
    github: "https://github.com/thenakshprajapat/rohit-portfolio",
    link: "https://rohitprajapat.vercel.app/",
    glowColor: "rgba(168, 85, 247, 0.2)",
  },
];

export default function WorkPage() {
  const [commandOpen, setCommandOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState<string>("All");

  const filtered =
    selectedTag === "All"
      ? ALL_PROJECTS
      : ALL_PROJECTS.filter((p) => p.category === selectedTag);

  return (
    <main className="relative min-h-screen bg-[#0a0a0a] text-zinc-100 selection:bg-blue-600/30 selection:text-white">
      <div className="noise-overlay" />
      <FloatingNav onOpenCommand={() => setCommandOpen(true)} />
      <CommandMenu isOpen={commandOpen} setIsOpen={setCommandOpen} />

      <div className="pt-32 pb-24 px-6 sm:px-12 max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-white/[0.08] pb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-blue-400 tracking-wider uppercase mb-2">
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>Full Archive &amp; Systems</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
              All Engineering Work
            </h1>
            <p className="text-zinc-400 mt-2 text-sm sm:text-base max-w-2xl">
              A comprehensive archive of production applications, low-level system experiments, and tooling built by Naksh Prajapati.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {["All", "Systems & OS", "Web & Cloud", "AI & NLP"].map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  selectedTag === tag
                    ? "bg-white text-zinc-950 font-medium shadow-sm"
                    : "bg-white/[0.04] text-zinc-400 hover:text-white hover:bg-white/[0.08] border border-white/[0.06]"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* List */}
        <div className="space-y-6">
          {filtered.map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
            >
              <SpotlightCard className="p-6 sm:p-8" glowColor={project.glowColor} enableSound>
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-4">
                  <div>
                    <div className="flex items-center gap-2.5 mb-2">
                      <span className="text-[11px] font-mono uppercase text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2.5 py-0.5 rounded">
                        {project.category}
                      </span>
                      <span className="text-xs font-mono text-zinc-500">{project.year}</span>
                    </div>
                    <h2 className="text-2xl font-bold text-white">{project.title}</h2>
                    <p className="text-sm text-zinc-400 mt-1">{project.subtitle}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-medium text-zinc-300 hover:text-white transition-all"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>Source</span>
                      </a>
                    )}
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-medium text-white shadow-sm shadow-blue-500/20 transition-all"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-white/[0.06] text-xs text-zinc-300">
                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                    <span className="text-[10px] font-mono uppercase text-zinc-400 block mb-1">Problem</span>
                    {project.problem}
                  </div>
                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                    <span className="text-[10px] font-mono uppercase text-blue-400 block mb-1">Solution</span>
                    {project.solution}
                  </div>
                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                    <span className="text-[10px] font-mono uppercase text-emerald-400 block mb-1">Impact</span>
                    {project.impact}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/[0.06] flex flex-wrap gap-2">
                  {project.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.05] text-[10px] font-mono text-zinc-400"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
