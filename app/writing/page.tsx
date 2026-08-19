import { MindDispatches } from "@/components/sections/mind-dispatches";

export const metadata = {
  title: "Writing — Naksh",
  description: "Short essays on programming, people, and building things.",
};

export default function WritingPage() {
  return (
    <main className="pt-14 sm:pt-16 min-h-screen">
      <MindDispatches />
    </main>
  );
}
