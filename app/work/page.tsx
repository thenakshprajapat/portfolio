import { GlidingWorkShowcase } from "@/components/sections/gliding-work-showcase";

export const metadata = {
  title: "Work — Naksh",
  description: "Things I've actually built and shipped.",
};

export default function WorkPage() {
  return (
    <main className="pt-20 sm:pt-28 min-h-screen">
      <GlidingWorkShowcase />
    </main>
  );
}
