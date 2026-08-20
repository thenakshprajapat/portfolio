"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Activity,
  GitBranch,
  ArrowUpRight,
  MapPin,
  Clock,
} from "lucide-react";
import { sound } from "@/lib/sound";

interface ContribCell {
  date: string;
  count: number;
  level: number;
}

export function TelemetryPulse() {
  const [githubStats, setGithubStats] = useState<{
    total: number;
    publicRepos: number;
    weeks: ContribCell[][] | null;
  } | null>(null);
  const [timeString, setTimeString] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        new Intl.DateTimeFormat("en-US", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }).format(now)
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let isMounted = true;
    async function loadGitHub() {
      try {
        const res = await fetch("/api/github");
        if (res.ok) {
          const data = await res.json();
          if (isMounted) {
            setGithubStats({
              total: data?.contributions?.total ?? 294,
              publicRepos: data?.publicRepos ?? 10,
              weeks: data?.contributions?.weeks ?? null,
            });
          }
        }
      } catch (err) {
        console.error("GitHub fetch error:", err);
      }
    }
    loadGitHub();
    return () => {
      isMounted = false;
    };
  }, []);

  const totalContributions = githubStats?.total ?? 294;

  const displayWeeks = useMemo(() => {
    if (githubStats?.weeks && githubStats.weeks.length > 0) {
      const allWeeks = githubStats.weeks;
      return allWeeks.slice(Math.max(0, allWeeks.length - 28));
    }

    const fallback: ContribCell[][] = [];
    const today = new Date();
    for (let w = 27; w >= 0; w--) {
      const week: ContribCell[] = [];
      for (let d = 0; d < 7; d++) {
        const target = new Date(today);
        target.setDate(today.getDate() - (w * 7 + (6 - d)));
        const mockLevel = (w * 7 + d) % 5 === 0 ? 3 : (w * 7 + d) % 3 === 0 ? 2 : (w * 7 + d) % 2 === 0 ? 1 : 0;
        week.push({
          date: target.toISOString().split("T")[0],
          count: mockLevel > 0 ? mockLevel * 2 : 0,
          level: mockLevel,
        });
      }
      fallback.push(week);
    }
    return fallback;
  }, [githubStats]);

  const getCellColor = (level: number) => {
    switch (level) {
      case 1:
        return "bg-emerald-950/80 border-emerald-900/40 dark:bg-emerald-950/80";
      case 2:
        return "bg-emerald-700/80 border-emerald-600/50";
      case 3:
        return "bg-emerald-500 border-emerald-400/60 shadow-sm shadow-emerald-500/20";
      case 4:
        return "bg-emerald-300 border-emerald-100 shadow-sm shadow-emerald-300/40";
      default:
        return "bg-[var(--surface-elevated)] border-[var(--border)]";
    }
  };

  return (
    <section id="signal" className="py-16 sm:py-24 px-6 sm:px-10 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-10 space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-500 uppercase tracking-wider">
          <Activity className="size-3" />
          <span>Cadence &amp; Signal</span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[var(--foreground)] tracking-tight">
          Development <span className="gradient-green-text">Activity</span>
        </h2>
        <p className="text-[var(--muted)] text-xs sm:text-sm max-w-md leading-relaxed">
          Verifiable GitHub contributions, active production shipping, and local environment coordinates.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* GitHub Commits Card */}
        <div className="md:col-span-8 rounded-3xl p-6 bg-[var(--card)] border border-[var(--border)] flex flex-col justify-between space-y-5 shadow-sm">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[var(--surface-elevated)] border border-[var(--border)] text-xs font-mono text-[var(--foreground)]">
                <GitBranch className="size-3 text-emerald-500" />
                <span>GitHub Matrix</span>
              </div>
              <a
                href="https://github.com/thenakshprajapat"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playPop()}
                className="text-xs font-mono text-[var(--muted)] hover:text-emerald-500 inline-flex items-center gap-1 transition-colors"
              >
                <span>@thenakshprajapat</span>
                <ArrowUpRight className="size-3" />
              </a>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-xl sm:text-2xl font-semibold font-mono text-[var(--foreground)]">
                  {totalContributions}+ Commits
                </p>
                <p className="text-[11px] font-mono text-[var(--muted)]">
                  Verified public repository activity
                </p>
              </div>

              {/* Heatmap Matrix */}
              <div className="overflow-x-auto pb-1 pt-0.5 scrollbar-none">
                <div className="flex gap-1.5 min-w-[420px]">
                  {displayWeeks.map((week, wi) => (
                    <div key={wi} className="flex flex-col gap-1.5">
                      {week.map((c, di) => (
                        <div
                          key={di}
                          title={`${c.date}: ${c.count} commits`}
                          className={`w-2.5 h-2.5 rounded-sm transition-all duration-200 cursor-pointer hover:scale-125 border ${getCellColor(
                            c.level
                          )}`}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between text-xs font-mono text-[var(--muted)]">
            <span>Cadence</span>
            <span className="text-emerald-500 font-medium">Daily Engineering Streak</span>
          </div>
        </div>

        {/* Location & Time Card */}
        <div className="md:col-span-4 rounded-3xl p-6 bg-[var(--card)] border border-[var(--border)] flex flex-col justify-between space-y-5 shadow-sm">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[var(--surface-elevated)] border border-[var(--border)] text-xs font-mono text-[var(--foreground)]">
                <MapPin className="size-3 text-emerald-500" />
                <span>Coordinates</span>
              </div>
              <span className="text-[10px] font-mono text-[var(--muted)]">26.91° N, 75.78° E</span>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-lg sm:text-xl font-semibold text-[var(--foreground)]">Jaipur, India</p>
                <p className="text-xs font-mono text-emerald-500">Asia/Kolkata (IST)</p>
              </div>

              <div className="p-3 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)] space-y-0.5">
                <div className="flex items-center gap-1.5 text-xs font-mono text-[var(--muted)]">
                  <Clock className="size-3 text-emerald-500" />
                  <span>Local Time</span>
                </div>
                <p className="text-xl font-mono font-medium text-[var(--foreground)] tabular-nums">
                  {timeString || "06:00:00 PM"}
                </p>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between text-xs font-mono text-[var(--muted)]">
            <span>Response</span>
            <span className="text-emerald-500 font-medium">Sub-24 Hours</span>
          </div>
        </div>
      </div>
    </section>
  );
}
