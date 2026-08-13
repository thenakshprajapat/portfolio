"use client";

import React, { useState } from "react";
import { FloatingNav } from "@/components/floating-nav";
import { HeroSection } from "@/components/hero-section";
import { ProofBento } from "@/components/proof-bento";
import { FeaturedProjects } from "@/components/featured-projects";
import { JourneyTimeline } from "@/components/journey-timeline";
import { WritingSection } from "@/components/writing-section";
import { ToolboxSection } from "@/components/toolbox-section";
import { ContactTerminal } from "@/components/contact-terminal";
import { Footer } from "@/components/footer";
import { CommandMenu } from "@/components/command-menu";

export default function Home() {
  const [commandOpen, setCommandOpen] = useState(false);

  return (
    <main className="relative min-h-screen bg-[#0a0a0a] text-zinc-100 selection:bg-blue-600/30 selection:text-white">
      {/* Subtle Noise Texture Overlay */}
      <div className="noise-overlay" />

      {/* Floating Navigation Dock */}
      <FloatingNav onOpenCommand={() => setCommandOpen(true)} />

      {/* Command Palette (⌘K) */}
      <CommandMenu isOpen={commandOpen} setIsOpen={setCommandOpen} />

      {/* 1. Hero Section */}
      <HeroSection onOpenCommand={() => setCommandOpen(true)} />

      {/* 2. Proof & Live Pulse Bento */}
      <ProofBento />

      {/* 3. Featured Projects (Case Studies) */}
      <FeaturedProjects />

      {/* 4. Journey Timeline */}
      <JourneyTimeline />

      {/* 5. Writing & Notes */}
      <WritingSection />

      {/* 6. Curated Toolbox */}
      <ToolboxSection />

      {/* 7. Contact Terminal */}
      <ContactTerminal />

      {/* Footer */}
      <Footer />
    </main>
  );
}
