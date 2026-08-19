import { ManifestoHero } from "@/components/sections/manifesto-hero";
import { ArtifactDeck } from "@/components/sections/artifact-deck";
import { AboutBento } from "@/components/sections/about-bento";
import { MindDispatches } from "@/components/sections/mind-dispatches";
import { TransmissionTerminal } from "@/components/sections/transmission-terminal";

export default function Home() {
  return (
    <main className="space-y-12 sm:space-y-20 pb-20">
      {/* 1. Rich Interactive Hero with Live Status & Pillars */}
      <ManifestoHero />

      {/* 2. Interactive Projects Carousel */}
      <ArtifactDeck />

      {/* 3. Story, Stack, GitHub Activity & Timeline */}
      <AboutBento />

      {/* 4. Thoughts & Short Essays */}
      <MindDispatches />

      {/* 5. Contact Terminal */}
      <TransmissionTerminal />
    </main>
  );
}
