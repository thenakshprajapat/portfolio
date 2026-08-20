import React from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { TrajectoryMap } from "@/components/sections/trajectory-map";

export const metadata = {
  title: "Journey — Naksh",
  description: "Milestones, university studies, and independent development path.",
};

export default function JourneyPage() {
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

      <TrajectoryMap />
    </main>
  );
}
