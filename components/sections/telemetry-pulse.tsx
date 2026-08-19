"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  GitBranch,
  ArrowUpRight,
  Users,
  Terminal,
  Radio,
  Code2,
  Layers,
  CheckCircle2,
} from "lucide-react";
import { sound } from "@/lib/sound";

interface ContribCell {
  date: string;
  count: number;
  level: number;
}

interface GitHubStats {
  username: string;
  name: string;
  publicRepos: number;
  followers: number;
  contributions: {
    total: number;
    days: ContribCell[];
    weeks: ContribCell[][] | null;
  };
  latestRepo: {
    name: string;
    url: string;
    description: string;
    language: string;
    stars: number;
  };
}

export function TelemetryPulse() {
  const [githubStats, setGithubStats] = useState<GitHubStats | null>(null);
  const [loadingGithub, setLoadingGithub] = useState<boolean>(true);
  const [hoveredCell, setHoveredCell] = useState<{ date: string; count: number } | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function loadGitHub() {
      try {
        const res = await fetch("/api/github");
        if (res.ok) {
          const data = await res.json();
          if (isMounted) setGithubStats(data);
        }
      } catch (err) {
        console.error("Telemetry GitHub fetch error:", err);
      } finally {
        if (isMounted) setLoadingGithub(false);
      }
    }
    loadGitHub();
    return () => {
      isMounted = false;
    };
  }, []);

  const totalContributions = githubStats?.contributions?.total ?? 57;
  const publicReposCount = githubStats?.publicRepos ?? 10;
  const latestRepo = githubStats?.latestRepo ?? {
    name: "contacts-firebase",
    url: "https://github.com/thenakshprajapat/contacts-firebase",
    description: "High-reliability distributed contact manager with Firestore",
    language: "TypeScript",
    stars: 1,
  };

  const displayWeeks: ContribCell[][] = useMemo(() => {
    if (githubStats?.contributions?.weeks && githubStats.contributions.weeks.length > 0) {
      const allWeeks = githubStats.contributions.weeks;
      return allWeeks.slice(Math.max(0, allWeeks.length - 36));
    }

    const fallback: ContribCell[][] = [];
    const today = new Date();
    for (let w = 35; w >= 0; w--) {
      const week: ContribCell[] = [];
      for (let d = 0; d < 7; d++) {
        const target = new Date(today);
        target.setDate(today.getDate() - (w * 7 + (6 - d)));
        week.push({
          date: target.toISOString().split("T")[0],
          count: 0,
          level: 0,
        });
      }
      fallback.push(week);
    }
    return fallback;
  }, [githubStats]);

  const getCellColor = (level: number) => {
    switch (level) {
      case 1:
        return "bg-emerald-950/80 border border-emerald-900/50";
      case 2:
        return "bg-emerald-700/80 border border-emerald-600/60";
      case 3:
        return "bg-emerald-500 border border-emerald-400";
      case 4:
        return "bg-emerald-300 border border-emerald-200";
      default:
        return "bg-black/5 dark:bg-white/[0.04] border border-black/5 dark:border-white/[0.04]";
    }
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "";
    try {
      return new Date(dateStr).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <section
      id="telemetry"
      className="py-20 px-4 sm:px-8 max-w-7xl mx-auto border-b border-[var(--border)] crosshair-corner"
    >
      <div className="space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[var(--border)] pb-6">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-emerald-500 uppercase tracking-widest mb-1.5">
              <Activity className="size-3.5" />
              <span>[SECTION 03 // TELEMETRY &amp; LEADERSHIP]</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[var(--foreground)]">
              Engineering Stream &amp; DevSphere Core
            </h2>
            <p className="text-xs sm:text-sm text-[var(--muted)] max-w-2xl mt-1.5 leading-relaxed">
              Verified public repository commit activity and community leadership initiatives across developer ecosystems.
            </p>
          </div>

          <div className="font-mono text-xs text-[var(--muted)]">
            <span>LIVE API STREAM VERIFIED</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Live GitHub Engineering Heatmap (Span 7) */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-sm border border-[var(--border)] bg-[var(--card)] space-y-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between font-mono text-xs text-[var(--muted)] border-b border-[var(--border)] pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <GitBranch className="size-3.5 text-emerald-500" />
                  <span className="text-[var(--foreground)] font-semibold uppercase">
                    GitHub Commit Activity
                  </span>
                </div>
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

              <div className="flex items-baseline justify-between gap-4 mb-4">
                <div>
                  <span className="text-2xl sm:text-3xl font-bold font-mono text-[var(--foreground)]">
                    {totalContributions}
                  </span>
                  <span className="text-xs font-mono text-[var(--muted)] ml-2">
                    contributions in last 365 days
                  </span>
                </div>
                <span className="text-xs font-mono text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-sm font-semibold">
                  {publicReposCount} Public Repos
                </span>
              </div>

              {/* Heatmap Grid */}
              <div className="overflow-x-auto pb-2 pt-1 scrollbar-none">
                <div className="flex gap-1 min-w-[520px]">
                  {displayWeeks.map((week, wIdx) => (
                    <div key={wIdx} className="flex flex-col gap-1">
                      {week.map((cell, dIdx) => (
                        <div
                          key={dIdx}
                          onMouseEnter={() => {
                            setHoveredCell({ date: cell.date, count: cell.count });
                            sound.playPop();
                          }}
                          onMouseLeave={() => setHoveredCell(null)}
                          className={`w-3 h-3 rounded-none transition-transform hover:scale-125 cursor-pointer ${getCellColor(
                            cell.level
                          )}`}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Heatmap Colophon */}
            <div className="pt-3 border-t border-[var(--border)] flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] text-[var(--muted)]">
              <span>
                {hoveredCell
                  ? `${hoveredCell.count} commits on ${formatDate(hoveredCell.date)}`
                  : loadingGithub
                  ? "Syncing GitHub API endpoint..."
                  : "Hover squares for commit timestamp"}
              </span>

              <div className="flex items-center gap-1.5">
                <span>Less</span>
                <span className="size-2 rounded-none bg-black/5 dark:bg-white/[0.04]" />
                <span className="size-2 rounded-none bg-emerald-950" />
                <span className="size-2 rounded-none bg-emerald-700" />
                <span className="size-2 rounded-none bg-emerald-500" />
                <span className="size-2 rounded-none bg-emerald-300" />
                <span>More</span>
              </div>
            </div>
          </div>

          {/* Right Column: DevSphere Core Member Spotlight (Span 5) */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-sm border border-[var(--border)] bg-[var(--card)] space-y-5 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between font-mono text-xs text-[var(--muted)] border-b border-[var(--border)] pb-3">
                <div className="flex items-center gap-2">
                  <Users className="size-3.5 text-emerald-500" />
                  <span className="text-[var(--foreground)] font-semibold uppercase">
                    DevSphere Leadership
                  </span>
                </div>
                <span className="text-emerald-500 font-semibold uppercase">CORE MEMBER</span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-[var(--foreground)] tracking-tight">
                Technical Contributor, PR &amp; Developer Relations
              </h3>
              <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed font-normal">
                Active Core Member at DevSphere driving technical initiatives, developer outreach, and large-scale builder gatherings.
              </p>

              {/* DevSphere Event Highlights */}
              <div className="space-y-2 pt-2 font-mono text-xs">
                <div className="p-3 rounded-sm border border-[var(--border)] bg-[var(--secondary)] space-y-1">
                  <div className="flex items-center gap-2 text-[var(--foreground)] font-semibold">
                    <Radio className="size-3 text-emerald-500" />
                    <span>Perplexity Comet Developer Meetup</span>
                  </div>
                  <p className="text-[11px] text-[var(--muted)] leading-relaxed">
                    Organized premier gathering for AI builders, founders, and system engineers.
                  </p>
                </div>

                <div className="p-3 rounded-sm border border-[var(--border)] bg-[var(--secondary)] space-y-1">
                  <div className="flex items-center gap-2 text-[var(--foreground)] font-semibold">
                    <Code2 className="size-3 text-cyan-400" />
                    <span>GitHub Education Workshops</span>
                  </div>
                  <p className="text-[11px] text-[var(--muted)] leading-relaxed">
                    Collaborated on hands-on open-source workshops and student developer bootcamps.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between font-mono text-xs text-[var(--muted)]">
              <span>Community Impact</span>
              <a
                href="#trajectory"
                onClick={() => sound.playClick()}
                className="text-emerald-500 hover:text-emerald-400 font-semibold"
              >
                View Full Timeline ↓
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
