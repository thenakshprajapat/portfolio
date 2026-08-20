import { IntroLoader } from "@/components/ui/intro-loader";
import { ManifestoHero } from "@/components/sections/manifesto-hero";
import { GlidingWorkShowcase } from "@/components/sections/gliding-work-showcase";
import { TelemetryPulse } from "@/components/sections/telemetry-pulse";
import { MindDispatches } from "@/components/sections/mind-dispatches";
import { TransmissionTerminal } from "@/components/sections/transmission-terminal";

export default function Home() {
  return (
    <main className="space-y-4 sm:space-y-8 pb-12">
      {/* 1. Cinematic Clean Intro Loader */}
      <IntroLoader />

      {/* 2. Spacious, Uncongested Hero (Hey I'm Naksh, About & Socials) */}
      <ManifestoHero />

      {/* 3. 5-Second 3D Gliding Work Showcase (Center Focused & Blurred Sides) */}
      <GlidingWorkShowcase />

      {/* 4. Activity & Verified Cadence */}
      <TelemetryPulse />

      {/* 5. Editorial Perspectives & Thoughts */}
      <MindDispatches />

      {/* 6. Direct Contact Channel */}
      <TransmissionTerminal />
    </main>
  );
}
