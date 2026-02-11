import { Brain } from "lucide-react";

const THOUGHTS = [
  {
    date: "2024-03-15",
    title: "Learning in Public",
    preview: "Why hiding your ignorance is the slowest way to learn. The internet rewards vulnerability when it's paired with curiosity."
  },
  {
    date: "2024-02-28",
    title: "Code as a Medium for Thought",
    preview: "Programming isn't just about building products. It's a way to structure logic, handle edge cases in reasoning, and model the world."
  },
  {
    date: "2024-01-10",
    title: "The Future of Interfaces",
    preview: "Moving beyond screens. How AI agents and ambient computing will dissolve the friction between intent and action."
  }
];

export default function MindPage() {
  return (
    <div className="min-h-screen px-6 md:px-20 max-w-4xl mx-auto pt-24 pb-20">
      <div className="space-y-12">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Brain className="w-8 h-8 text-muted-foreground" />
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">Mind</h1>
          </div>
          <p className="text-muted-foreground text-lg">
            A stream of consciousness. Notes on engineering, design, and the future.
          </p>
        </div>

        <div className="relative border-l border-white/10 ml-3 space-y-12">
          {THOUGHTS.map((thought, i) => (
            <div key={i} className="relative pl-8 group">
              <span className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-white/20 group-hover:bg-white transition-colors" />
              <div className="space-y-2">
                <span className="text-xs font-mono text-muted-foreground">{thought.date}</span>
                <h2 className="text-2xl font-bold group-hover:text-primary transition-colors cursor-pointer">
                  {thought.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {thought.preview}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
