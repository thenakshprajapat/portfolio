import React from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { MindDispatches } from "@/components/sections/mind-dispatches";

export const metadata = {
  title: "Mind — Naksh",
  description: "Thoughts, philosophy, and notes on software engineering.",
};

export default function MindPage() {
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

      <MindDispatches />
    </main>
  );
}
