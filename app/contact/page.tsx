"use client";

import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { FloatingNav } from "@/components/floating-nav";
import { CommandMenu } from "@/components/command-menu";
import { ContactTerminal } from "@/components/contact-terminal";
import { Footer } from "@/components/footer";
import { CursorFollower } from "@/components/ui/cursor-follower";
import { LiquidBackground } from "@/components/ui/liquid-background";

export default function ContactPage() {
  const [commandOpen, setCommandOpen] = useState(false);

  return (
    <main className="relative min-h-screen bg-[var(--background)] text-[var(--foreground)] selection:bg-emerald-500/30 selection:text-white transition-colors">
      <LiquidBackground />
      <CursorFollower />
      <div className="noise-overlay" />
      <FloatingNav onOpenCommand={() => setCommandOpen(true)} />
      <CommandMenu isOpen={commandOpen} setIsOpen={setCommandOpen} />

      <div className="pt-28 pb-4 px-6 sm:px-12 max-w-5xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
        >
          <ArrowLeft className="size-3.5" />
          <span>Back to Overview</span>
        </Link>
      </div>

      <ContactTerminal />

      <Footer />
    </main>
  );
}
