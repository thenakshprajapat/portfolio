"use client";

import React from "react";
import { motion } from "framer-motion";
import { Wrench, Terminal, Code2, Cloud } from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";

interface TechItem {
  name: string;
  level: string;
  note: string;
}

const TECH_CATEGORIES = [
  {
    title: "Core Languages & Systems",
    description: "Foundational programming languages and algorithm problem-solving.",
    icon: Code2,
    accent: "text-emerald-500",
    items: [
      { name: "C / C++", level: "Core Strength", note: "Pointers, memory layout, STL & performance" },
      { name: "Python", level: "Fluent", note: "Scripting, NLP pipelines & automation" },
      { name: "DSA", level: "Active Practice", note: "Data structures & algorithmic problem solving" },
      { name: "A lil bit of Java", level: "Familiar", note: "Object-oriented fundamentals & Android basics" },
    ],
  },
  {
    title: "Web & Cloud Platform",
    description: "Building responsive, modern, full-stack web applications and deployments.",
    icon: Cloud,
    accent: "text-teal-500",
    items: [
      { name: "Modern Web Development", level: "Daily Driver", note: "Next.js, React, Tailwind CSS, TypeScript" },
      { name: "Firebase", level: "Production", note: "Firestore, real-time sync, auth & cloud rules" },
      { name: "Vercel", level: "Deployment", note: "Serverless functions, edge routing & CI/CD" },
    ],
  },
  {
    title: "Developer Tools & Environment",
    description: "Command-line workflows, version control, and Unix operating environments.",
    icon: Terminal,
    accent: "text-emerald-500",
    items: [
      { name: "Linux", level: "Environment", note: "Bash, shell scripting, POSIX tools & processes" },
      { name: "GitHub", level: "Daily Workflow", note: "Git version control, PRs & open source" },
    ],
  },
];

export function ToolboxSection() {
  return (
    <section id="toolbox" className="py-16 px-6 sm:px-12 max-w-5xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="mb-12"
      >
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-500 tracking-wider uppercase mb-2">
          <Wrench className="size-3.5" />
          <span>Curated Technologies</span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--foreground)] tracking-tight">
          Lab &amp; Stack
        </h2>
        <p className="text-[var(--muted)] mt-2 text-sm max-w-lg leading-relaxed">
          Technologies and tools Naksh uses to build software, experiment, and solve problems.
        </p>
      </motion.div>

      {/* 3 Categories Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {TECH_CATEGORIES.map((category, catIdx) => {
          const Icon = category.icon;
          return (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: catIdx * 0.08 }}
            >
              <SpotlightCard className="p-6 sm:p-7 flex flex-col justify-between h-full rounded-3xl group" enableSound>
                <div>
                  <div className="flex items-center gap-3 mb-3.5">
                    <div className="p-2.5 rounded-2xl bg-[var(--secondary)] border border-[var(--border)]">
                      <Icon className={`size-4.5 ${category.accent}`} />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-[var(--foreground)]">{category.title}</h3>
                      <span className="text-[11px] font-mono text-[var(--muted)]">Curated Stack</span>
                    </div>
                  </div>

                  <p className="text-xs text-[var(--muted)] mb-5 leading-relaxed">
                    {category.description}
                  </p>

                  <div className="space-y-2.5">
                    {category.items.map((tech) => (
                      <div
                        key={tech.name}
                        className="p-3 rounded-2xl bg-[var(--secondary)] border border-[var(--border)] transition-all group-hover:border-[var(--border-highlight)]"
                      >
                        <div className="flex items-center justify-between gap-2 mb-0.5">
                          <span className="text-xs sm:text-sm font-semibold text-[var(--foreground)]">{tech.name}</span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[var(--card)] border border-[var(--border)] text-[var(--muted)] font-medium">
                            {tech.level}
                          </span>
                        </div>
                        <p className="text-[11px] text-[var(--muted)] font-mono">{tech.note}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 pt-3.5 border-t border-[var(--border)] text-[11px] font-mono text-[var(--muted)]">
                  <span>Stack Tier 01</span>
                </div>
              </SpotlightCard>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
