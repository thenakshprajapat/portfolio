import { FlaskConical } from "lucide-react";

const EXPERIMENTS = [
  {
    title: "E-Commerce Platform",
    description: "Exploring the possibilities of e-commerce.",
    type: "Visual",
    status: "Active"
  },
  {
    title: "Neural Network from Scratch",
    description: "Building a simple NN using only NumPy to understand the math.",
    type: "AI/ML",
    status: "Archived"
  },
  {
    title: "3D Portfolio Concept",
    description: "Three.js playground testing performance limits.",
    type: "3D",
    status: "Paused"
  },
  {
    title: "Rust CLI Tools",
    description: "Rewriting common Unix utilities in Rust for speed.",
    type: "Systems",
    status: "Active"
  }
];

export default function LabPage() {
  return (
    <div className="min-h-screen px-6 md:px-20 max-w-7xl mx-auto pt-24 pb-20">
      <div className="space-y-12">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <FlaskConical className="w-8 h-8 text-muted-foreground" />
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">The Lab</h1>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Here be dragons. Unfinished thoughts, broken CSS, and half-baked AI models. 
            If it’s polished, it’s in <span className="text-foreground font-mono">/work</span>. 
            If it’s interesting, it’s here.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {EXPERIMENTS.map((exp, i) => (
            <div 
              key={i}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all hover:-translate-y-1"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-mono px-2 py-1 rounded-full bg-white/10 text-muted-foreground">
                  {exp.type}
                </span>
                <span className={`text-xs font-mono px-2 py-1 rounded-full border ${
                  exp.status === 'Active' ? 'border-green-500/50 text-green-500' : 
                  'border-white/10 text-muted-foreground'
                }`}>
                  {exp.status}
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2">{exp.title}</h3>
              <p className="text-muted-foreground text-sm">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
