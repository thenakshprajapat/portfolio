import { ArtifactDeck } from "@/components/sections/artifact-deck";

export const metadata = {
  title: "Work — Naksh",
  description: "Things I've actually built and shipped.",
};

export default function WorkPage() {
  return (
    <main className="pt-14 sm:pt-16 min-h-screen">
      <ArtifactDeck />
    </main>
  );
}
