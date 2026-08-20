"use client";

import React from "react";
import { ArrowLeft, FlaskConical, Code2, Cloud, Terminal } from "lucide-react";
import Link from "next/link";
import { UICraftShowcase } from "@/components/sections/ui-craft-showcase";

const TECH_CATEGORIES = [
  {
    title: "Core Languages & Systems",
    description: "Foundational programming languages and low-level problem solving.",
    icon: Code2,
    items: [
      { name: "C / C++", level: "Core Strength", note: "Pointers, memory layout, STL & performance" },
      { name: "Python", level: "Fluent", note: "NLP pipelines, scripting & automation" },
      { name: "DSA", level: "Active Practice", note: "Data structures & algorithmic problem solving" },
      { name: "Java", level: "Familiar", note: "Object-oriented fundamentals & Android basics" },
    ],
  },
  {
    title: "Web & Cloud Platform",
    description: "Building responsive, modern, full-stack web applications and deployments.",
    icon: Cloud,
    items: [
      { name: "Modern Web Development", level: "Daily Driver", note: "Next.js, React 19, Tailwind CSS, TypeScript" },
      { name: "Firebase", level: "Production", note: "Firestore, real-time sync, auth & cloud rules" },
      { name: "Vercel", level: "Deployment", note: "Serverless functions, edge routing & CI/CD" },
    ],
  },
  {
    title: "Developer Tools & Environment",
    description: "Command-line workflows, version control, and Unix operating environments.",
    icon: Terminal,
    items: [
      { name: "Linux", level: "Environment", note: "Bash, shell scripting, POSIX tools & processes" },
      { name: "GitHub", level: "Daily Workflow", note: "Git version control, PRs & open source" },
    ],
  },
];

export default function LabPage() {
  return (
    <main className="pt-24 pb-20 min-h-screen">
      <div className="px-6 sm:px-12 max-w-5xl mx-auto font-mono text-xs mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[var(--muted)] hover:text-[var(--foreground)] transition-colors uppercase"
        >
          <ArrowLeft className="size-3.5" />
          <span>← Back to Overview</span>
        </Link>
      </div>

      {/* UI Motion Craft Lab */}
      <UICraftShowcase />

      {/* Curated Stack Matrix */}
      <section className="py-16 px-6 sm:px-12 max-w-5xl mx-auto border-t border-[var(--border)]">
        <div className="space-y-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-mono text-xs text-emerald-500 uppercase tracking-widest">
              <FlaskConical className="size-3.5" />
              <span>Curated Stack Matrix</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[var(--foreground)]">
              Technologies &amp; Systems Tooling
            </h2>
            <p className="text-xs sm:text-sm text-[var(--muted)] max-w-2xl leading-relaxed">
              Disciplines, frameworks, and environments Naksh uses to build software and experiment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TECH_CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              return (
                <div
                  key={cat.title}
                  className="p-6 rounded-3xl border border-[var(--border)] bg-[var(--card)] space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-2.5 font-mono text-xs text-[var(--muted)] border-b border-[var(--border)] pb-2.5">
                      <Icon className="size-4 text-emerald-500" />
                      <span className="text-[var(--foreground)] font-bold uppercase">{cat.title}</span>
                    </div>

                    <p className="text-xs text-[var(--muted)] leading-relaxed">{cat.description}</p>

                    <div className="space-y-2 pt-2 font-mono text-xs">
                      {cat.items.map((item) => (
                        <div
                          key={item.name}
                          className="p-2.5 rounded-2xl bg-[var(--secondary)] border border-[var(--border)] space-y-0.5"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-[var(--foreground)] text-[11px]">{item.name}</span>
                            <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-[var(--card)] border border-[var(--border)] text-[var(--muted)] uppercase">
                              {item.level}
                            </span>
                          </div>
                          <p className="text-[10px] text-[var(--muted)]">{item.note}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[var(--border)] font-mono text-[10px] text-[var(--muted)]">
                    <span>ACTIVE PROFICIENCY</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
