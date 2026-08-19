"use client";

import React, { useState } from "react";
import { ArrowLeft, FlaskConical, Code2, Cloud, Terminal } from "lucide-react";
import Link from "next/link";
import { SystemHeader } from "@/components/layout/system-header";
import { CommandMenu } from "@/components/command-menu";
import { PhysicsSandbox } from "@/components/sections/physics-sandbox";
import { SystemFooter } from "@/components/layout/system-footer";

const TECH_CATEGORIES = [
  {
    title: "Core Languages & Systems",
    description: "Foundational programming languages and algorithm problem-solving.",
    icon: Code2,
    items: [
      { name: "C / C++", level: "Core Strength", note: "Pointers, memory layout, STL & performance" },
      { name: "Python", level: "Fluent", note: "Scripting, NLP pipelines & automation" },
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
  const [commandOpen, setCommandOpen] = useState(false);

  return (
    <main className="relative min-h-screen bg-[var(--background)] text-[var(--foreground)] architectural-grid transition-colors">
      <SystemHeader onOpenCommand={() => setCommandOpen(true)} />
      <CommandMenu isOpen={commandOpen} setIsOpen={setCommandOpen} />

      <div className="pt-24 pb-4 px-4 sm:px-8 max-w-7xl mx-auto font-mono text-xs">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[var(--muted)] hover:text-[var(--foreground)] transition-colors uppercase"
        >
          <ArrowLeft className="size-3.5" />
          <span>← Back to Systems Manifesto</span>
        </Link>
      </div>

      {/* Physics Sandbox Section */}
      <PhysicsSandbox />

      {/* Curated Stack Matrix */}
      <section className="py-20 px-4 sm:px-8 max-w-7xl mx-auto border-b border-[var(--border)] crosshair-corner">
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[var(--border)] pb-6">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs text-emerald-500 uppercase tracking-widest mb-1.5">
                <FlaskConical className="size-3.5" />
                <span>[LAB // CURATED STACK]</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[var(--foreground)]">
                Technologies &amp; Systems Tooling
              </h2>
              <p className="text-xs sm:text-sm text-[var(--muted)] max-w-2xl mt-1.5 leading-relaxed">
                Disciplines, frameworks, and environments Naksh uses to build software and experiment.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TECH_CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              return (
                <div
                  key={cat.title}
                  className="p-6 sm:p-7 rounded-sm border border-[var(--border)] bg-[var(--card)] space-y-4 flex flex-col justify-between"
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
                          className="p-2.5 rounded-sm bg-[var(--secondary)] border border-[var(--border)] space-y-0.5"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-[var(--foreground)] text-[11px]">{item.name}</span>
                            <span className="text-[9px] px-1.5 py-0.5 rounded-sm bg-[var(--card)] border border-[var(--border)] text-[var(--muted)] uppercase">
                              {item.level}
                            </span>
                          </div>
                          <p className="text-[10px] text-[var(--muted)]">{item.note}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[var(--border)] font-mono text-[10px] text-[var(--muted)]">
                    <span>STATUS: ACTIVE PROFICIENCY</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <SystemFooter />
    </main>
  );
}
