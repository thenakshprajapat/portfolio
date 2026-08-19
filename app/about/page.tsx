import { AboutBento } from "@/components/sections/about-bento";

export const metadata = {
  title: "About — Naksh",
  description: "A bit about me, what I work on, and where I've been.",
};

export default function AboutPage() {
  return (
    <main className="pt-14 sm:pt-16 min-h-screen">
      <AboutBento />
    </main>
  );
}
