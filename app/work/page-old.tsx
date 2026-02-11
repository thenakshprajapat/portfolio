import { ProjectCard } from "@/components/features/project-card";

const PROJECTS = [
  {
  title: "CS Resources for Beginners",
  description:
    "Hypothesis: Can a complete beginner learn computer science faster if the internet clutter is removed and only the best curated resources remain? Experiment: Built a structured learning hub with categorized links, starter roadmaps, and clean UI to reduce friction and overwhelm. Result: Early testers reported spending less time searching and more time learning. Learned that simplicity isn't basic — it's leverage.",
  tags: ["Next.js", "Tailwind", "Content Curation", "Beginner-Friendly UX"],
  year: "2025",
  github: "https://github.com/thenakshprajapat/edtech-cs/",
  link: "https://thenakshprajapat.github.io/edtech-cs/"
}
,

  {
  title: "Portfolio for Rohit",
  description:
    "Hypothesis: Can a personal portfolio feel more like a living identity than a PDF on the web? Experiment: Designed and developed a clean, responsive portfolio showcasing Rohit's skills, projects, and story using a minimal, distraction-free layout and reusable components. Result: He now has a professional online presence that speaks for him — even when he isn’t there. Learned that building for others requires listening more than coding.",
  tags: ["Next.js", "Tailwind", "Responsive Design", "UI/UX", "Deployment"],
  year: "2024",
  github: "https://github.com/thenakshprajapat/rohit-portfolio",
  link: "https://rohitprajapat.vercel.app/"
}
,
  {
  title: "Paper Analyzer",
  description:
    "Hypothesis: Can students predict important exam topics by analyzing past question papers instead of blindly guessing? Experiment: Built a tool that ingests question papers, extracts questions, groups them by topics, and highlights the most frequently asked areas so students know what actually matters. Result: Made it easier to spot high-weightage chapters and patterns across years. Learned that good exam prep isn’t about studying everything — it’s about studying what repeats.",
  tags: ["Python", "NLP", "Data Analysis", "Exam Tools"],
  year: "2025",
  github: "https://github.com/thenakshprajapat/paper-analyzer",
  link: "https://paper-analyzer.streamlit.app/"
}

];

export default function WorkPage() {
  return (
    <div className="min-h-screen px-6 md:px-20 max-w-7xl mx-auto pt-24 pb-20">
      <div className="space-y-12">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">Selected Work</h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            A collection of products, experiments, and tools built to solve real problems.
            Each project is a stepping stone in my evolution as a builder.
          </p>
        </div>

        <div className="grid gap-6">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
      </div>
    </div>
  );
}
