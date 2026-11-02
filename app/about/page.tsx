import { AboutBento } from "@/components/sections/about-bento";

export const metadata = {
  title: "About · Naksh Prajapati",
  description: "About Naksh Prajapati, computer science student and developer in Jaipur, India.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <AboutBento />
    </main>
  );
}
