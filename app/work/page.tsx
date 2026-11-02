import { GlidingWorkShowcase } from "@/components/sections/gliding-work-showcase";

export const metadata = {
  title: "Work · Naksh Prajapati",
  description: "Six web, Android, and Python projects built by Naksh Prajapati.",
};

export default function WorkPage() {
  return (
    <main className="min-h-screen">
      <GlidingWorkShowcase />
    </main>
  );
}
