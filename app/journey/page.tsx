"use client";

import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { SystemHeader } from "@/components/layout/system-header";
import { CommandMenu } from "@/components/command-menu";
import { TrajectoryMap } from "@/components/sections/trajectory-map";
import { SystemFooter } from "@/components/layout/system-footer";

export default function JourneyPage() {
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

      <TrajectoryMap />

      <SystemFooter />
    </main>
  );
}
