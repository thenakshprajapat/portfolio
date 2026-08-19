"use client";

import React, { useState, useEffect } from "react";
import { Users, GitBranch, ArrowUpRight } from "lucide-react";
import { sound } from "@/lib/sound";

const MILESTONES = [
  {
    period: "Current",
    title: "JECRC University, Jaipur",
    subtitle: "Computer Science Undergraduate",
    description:
      "Focusing on practical software engineering, Android UI motion physics, algorithms, and active open-source building.",
  },
  {
    period: "2025",
    title: "The Independent Pivot",
    subtitle: "Stepping away from RV University",
    description:
      "Made the deliberate decision to leave RV University after one year to accelerate my independent learning curve, engineering output, and practical software craft.",
  },
  {
    period: "2024 — 2025",
    title: "DevSphere — Core Member",
    subtitle: "Technical Contributor, PR & Events",
    description:
      "Drove developer relations, public outreach, and technical event execution. Co-organized the premier Perplexity Comet developer meetup and interactive workshops with GitHub Education.",
  },
  {
    period: "2022 — 2024",
    title: "St. Paul's School, Pali",
    subtitle: "Secondary Education (PCB + CS)",
    description:
      "Studied Physics, Chemistry, Biology, and Computer Science — cultivating an early passion for programming, logic, and problem-solving.",
  },
];

export function TrajectoryMap() {
  const [githubStats, setGithubStats] = useState<{ total: number; publicRepos: number } | null>(null);

  useEffect(() => {
    async function loadStats() {
      try {
        const res = await fetch("/api/github");
        if (res.ok) {
          const data = await res.json();
          setGithubStats({
            total: data?.contributions?.total ?? 57,
            publicRepos: data?.publicRepos ?? 10,
          });
        }
      } catch {}
    }
    loadStats();
  }, []);

  return (
    <section id="about" className="py-20 px-6 max-w-4xl mx-auto border-t border-[var(--border)]">
      <div className="space-y-12">
        {/* Header */}
        <div className="space-y-2">
          <span className="text-xs font-mono uppercase text-emerald-500 tracking-wider">
            Background &amp; Story
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--foreground)]">
            Journey &amp; Leadership
          </h2>
          <p className="text-base text-[var(--muted)] max-w-xl">
            A self-directed path through university studies, deliberate pivots, and developer community leadership.
          </p>
        </div>

        {/* DevSphere Highlight & GitHub Quick Pill */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-500">
              <Users className="size-4" />
              <span className="font-semibold uppercase">DevSphere Core Member</span>
            </div>
            <h4 className="text-base font-bold text-[var(--foreground)]">
              Developer Relations &amp; Events
            </h4>
            <p className="text-xs text-[var(--muted)] leading-relaxed">
              Co-organized the Perplexity Comet meetup and student developer bootcamps in collaboration with GitHub Education.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-[var(--muted)]">
              <span className="flex items-center gap-2 text-emerald-500">
                <GitBranch className="size-4" />
                <span className="font-semibold uppercase">GitHub Stream</span>
              </span>
              <a
                href="https://github.com/thenakshprajapat"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playPop()}
                className="hover:text-[var(--foreground)] inline-flex items-center gap-1 transition-colors"
              >
                <span>@thenakshprajapat</span>
                <ArrowUpRight className="size-3" />
              </a>
            </div>
            <h4 className="text-base font-bold text-[var(--foreground)]">
              {githubStats ? `${githubStats.total} commits in the last year` : "Active open-source contributor"}
            </h4>
            <p className="text-xs text-[var(--muted)] leading-relaxed">
              {githubStats ? `${githubStats.publicRepos} public repositories with continuous updates.` : "Continuous updates and open-source explorations."}
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div className="space-y-6">
          {MILESTONES.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] space-y-2 hover:border-[var(--border-hover)] transition-colors"
            >
              <div className="flex items-center justify-between gap-2 text-xs font-mono text-[var(--muted)]">
                <span className="text-emerald-500 font-semibold">{item.period}</span>
                <span>{item.subtitle}</span>
              </div>
              <h3 className="text-lg font-bold text-[var(--foreground)]">
                {item.title}
              </h3>
              <p className="text-sm text-[var(--muted)] leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
