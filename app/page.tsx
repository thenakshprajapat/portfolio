"use client";

import React, { useState } from "react";
import { FloatingNav } from "@/components/floating-nav";
import { HeroSection } from "@/components/hero-section";
import { ProofBento } from "@/components/proof-bento";
import { Footer } from "@/components/footer";
import { CommandMenu } from "@/components/command-menu";
import { CursorFollower } from "@/components/ui/cursor-follower";
import { LiquidBackground } from "@/components/ui/liquid-background";

export default function Home() {
  const [commandOpen, setCommandOpen] = useState(false);

  return (
    <main className="relative min-h-screen bg-[var(--background)] text-[var(--foreground)] selection:bg-emerald-500/30 selection:text-white transition-colors">
      {/* Smooth Flowing Liquid Ambient Background */}
      <LiquidBackground />

      {/* Custom Magnetic Cursor */}
      <CursorFollower />

      {/* Subtle Noise Texture Overlay */}
      <div className="noise-overlay" />

      {/* Floating Navigation Dock */}
      <FloatingNav onOpenCommand={() => setCommandOpen(true)} />

      {/* Command Palette (⌘K) */}
      <CommandMenu isOpen={commandOpen} setIsOpen={setCommandOpen} />

      {/* 1. Hero Section (Developer Introduction) */}
      <HeroSection onOpenCommand={() => setCommandOpen(true)} />

      {/* 2. Signals & Proof Bento Grid (Live Pulse) */}
      <ProofBento />

      {/* 3. Grand Expansive Footer */}
      <Footer />
    </main>
  );
}
