"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, Sparkles } from "lucide-react";
import Link from "next/link";
import { TiltCard } from "@/components/ui/tilt-card";

const PROJECTS = [
  {
    title: "Contacts App",
    description:
      "Hypothesis: Can I master Firebase fundamentals by building a practical, real-world application? Experiment: Created a contacts management app with full CRUD operations, real-time synchronization, and cloud storage—all powered by Firebase. Result: Gained hands-on experience with Firestore, authentication, and real-time listeners. Learned that Firebase makes complex backend functionality surprisingly accessible, but proper data modeling is crucial for performance.",
    tags: ["React", "Firebase", "Real-time Sync", "Cloud Storage", "Firestore"],
    year: "2026",
    github: "https://github.com/thenakshprajapat/contacts-firebase",
    link: "https://contacts-firebase-app.vercel.app/",
    gradient: "from-orange-500 to-red-500",
  },
  {
    title: "CS Resources for Beginners",
    description:
      "Hypothesis: Can a complete beginner learn computer science faster if the internet clutter is removed and only the best curated resources remain? Experiment: Built a structured learning hub with categorized links, starter roadmaps, and clean UI to reduce friction and overwhelm. Result: Early testers reported spending less time searching and more time learning. Learned that simplicity isn't basic — it's leverage.",
    tags: ["Next.js", "Tailwind", "Content Curation", "Beginner-Friendly UX"],
    year: "2025",
    github: "https://github.com/thenakshprajapat/edtech-cs/",
    link: "https://thenakshprajapat.github.io/edtech-cs/",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "Portfolio for Rohit",
    description:
      "Hypothesis: Can a personal portfolio feel more like a living identity than a PDF on the web? Experiment: Designed and developed a clean, responsive portfolio showcasing Rohit's skills, projects, and story using a minimal, distraction-free layout and reusable components. Result: He now has a professional online presence that speaks for him — even when he isn't there. Learned that building for others requires listening more than coding.",
    tags: ["Next.js", "Tailwind", "Responsive Design", "UI/UX", "Deployment"],
    year: "2024",
    github: "https://github.com/thenakshprajapat/rohit-portfolio",
    link: "https://rohitprajapat.vercel.app/",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    title: "Paper Analyzer",
    description:
      "Hypothesis: Can students predict important exam topics by analyzing past question papers instead of blindly guessing? Experiment: Built a tool that ingests question papers, extracts questions, groups them by topics, and highlights the most frequently asked areas so students know what actually matters. Result: Made it easier to spot high-weightage chapters and patterns across years. Learned that good exam prep isn't about studying everything — it's about studying what repeats.",
    tags: ["Python", "NLP", "Data Analysis", "Exam Tools"],
    year: "2025",
    github: "https://github.com/thenakshprajapat/paper-analyzer",
    link: "https://paper-analyzer.streamlit.app/",
    gradient: "from-orange-500 to-yellow-500",
  },
];

export default function WorkPage() {
  return (
    <div className="min-h-screen px-6 md:px-20 max-w-7xl mx-auto pt-32 pb-20">
      <div className="space-y-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20">
            <Sparkles className="w-4 h-4" />
            Selected Projects
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            Work that <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">matters</span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-3xl leading-relaxed">
            A collection of products, experiments, and tools built to solve real problems.
            Each project is a stepping stone in my evolution as a builder.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="space-y-8">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <TiltCard tiltStrength={3}>
                <div className="group relative p-8 md:p-10 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-2xl overflow-hidden">
                  {/* Gradient background on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                  
                  {/* Year badge */}
                  <div className="absolute top-8 right-8 px-3 py-1 rounded-full bg-secondary text-sm font-mono text-muted-foreground">
                    {project.year}
                  </div>

                  <div className="relative z-10 space-y-6">
                    {/* Title */}
                    <h2 className="text-3xl md:text-4xl font-bold group-hover:text-primary transition-colors pr-20">
                      {project.title}
                    </h2>

                    {/* Description */}
                    <p className="text-muted-foreground leading-relaxed text-lg">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-full bg-secondary text-sm font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex gap-4 pt-4">
                      {project.github && (
                        <Link
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground font-medium transition-all duration-300"
                        >
                          <Github className="w-4 h-4" />
                          View Code
                        </Link>
                      )}
                      {project.link && (
                        <Link
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:shadow-lg hover:scale-105 transition-all duration-300"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Live Demo
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
