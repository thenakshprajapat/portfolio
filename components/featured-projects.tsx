"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import { TiltCard } from "./ui/tilt-card";

interface Project {
  title: string;
  description: string;
  image?: string;
  tags: string[];
  github?: string;
  link?: string;
  color: string;
}

const FEATURED_PROJECTS: Project[] = [
  {
    title: "Contacts App",
    description: "A real-time contacts management application built to explore Firebase capabilities, featuring live synchronization, CRUD operations, and cloud storage integration.",
    tags: ["React", "Firebase", "Real-time Sync", "Cloud Storage"],
    github: "https://github.com/thenakshprajapat/contacts-firebase",
    link: "https://contacts-firebase-app.vercel.app/",
    color: "from-orange-500 to-red-500",
  },
  {
    title: "CS Resources Hub",
    description: "A curated learning platform that removes internet clutter, helping beginners learn computer science through structured, high-quality resources.",
    tags: ["Next.js", "Tailwind", "UX Design"],
    github: "https://github.com/thenakshprajapat/edtech-cs/",
    link: "https://thenakshprajapat.github.io/edtech-cs/",
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Paper Analyzer",
    description: "An intelligent tool that analyzes exam papers to identify patterns and high-weightage topics, helping students study smarter.",
    tags: ["Python", "NLP", "Data Analysis"],
    github: "https://github.com/thenakshprajapat/paper-analyzer",
    link: "https://paper-analyzer.streamlit.app/",
    color: "from-purple-500 to-pink-500",
  },
];

export function FeaturedProjects() {
  return (
    <section className="py-20 px-6 md:px-20 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            Featured <span className="bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">Work</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Selected projects that showcase my approach to solving real problems through thoughtful design and clean code.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {FEATURED_PROJECTS.slice(0, 3).map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <TiltCard tiltStrength={3} className="h-full">
                <div className="group h-full p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-2xl relative overflow-hidden">
                  {/* Gradient background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                  
                  {/* Color accent */}
                  <div className={`absolute top-0 left-0 w-2 h-full bg-gradient-to-b ${project.color}`} />

                  <div className="relative z-10">
                    {/* Title */}
                    <h3 className="text-3xl font-bold mb-4 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-full bg-secondary text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex gap-4">
                      {project.github && (
                        <Link
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
                        >
                          <Github className="w-4 h-4" />
                          Code
                        </Link>
                      )}
                      {project.link && (
                        <Link
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
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



        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link
            href="/work"
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            View All Projects
            <ExternalLink className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
