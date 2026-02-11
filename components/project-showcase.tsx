"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const projects = [
    {
        id: 1,
        title: "Neural Sync",
        category: "AI Interface",
        description: "A brain-computer interface visualization dashboard that simplifies complex data streams.",
        image: "/project1.jpg", // Placeholder - text description will do if image missing or I'll use a color block
        color: "bg-chart-1",
        tags: ["React", "TypeScript", "D3.js"]
    },
    {
        id: 2,
        title: "Void Terminal",
        category: "Dev Tools",
        description: "High-performance command line infrastructure for modern web development workflows.",
        image: "/project2.jpg",
        color: "bg-chart-2",
        tags: ["Rust", "Tauri", "Next.js"]
    },
    {
        id: 3,
        title: "Echo Chamber",
        category: "Audio Engine",
        description: "Spatial audio synthesis engine running entirely in the browser using Web Audio API.",
        image: "/project3.jpg",
        color: "bg-chart-3",
        tags: ["Web Audio", "Three.js", "Recoil"]
    },
    {
        id: 4,
        title: "Prism UI",
        category: "Design System",
        description: "A comprehensive design system for building accessible and beautiful web applications.",
        image: "/project4.jpg",
        color: "bg-chart-4",
        tags: ["Figma", "Storybook", "Radix UI"]
    }
];

export function ProjectShowcase() {
    return (
        <section id="projects" className="py-32 px-6 md:px-20 bg-background relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-20"
                >
                    <span className="text-primary font-mono text-sm tracking-wider uppercase mb-2 block">Selected Work</span>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                        Featured <span className="text-muted-foreground">Projects</span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    {projects.map((project, index) => (
                        <ProjectCard key={project.id} project={project} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function ProjectCard({ project, index }: { project: any, index: number }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="group relative flex flex-col gap-6"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Visual Container */}
            <div className={`relative aspect-[4/3] w-full overflow-hidden rounded-2xl ${project.color}/10 border border-border/50`}>
                <div className={`absolute inset-0 bg-gradient-to-br ${project.color}/20 to-transparent opacity-50 transition-opacity duration-500 group-hover:opacity-100`} />

                {/* Placeholder visual since we don't have real images yet */}
                <div className="absolute inset-4 rounded-xl bg-background/50 backdrop-blur-sm border border-white/10 flex items-center justify-center overflow-hidden">
                    <div className={`w-32 h-32 rounded-full ${project.color} blur-[60px] opacity-40 group-hover:scale-150 transition-transform duration-700`} />
                    <span className="relative z-10 text-2xl font-bold text-foreground/20 font-mono tracking-widest">{`0${index + 1}`}</span>
                </div>
            </div>

            <div className="space-y-3">
                <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                        <span className="text-xs font-mono text-primary tracking-widest uppercase">{project.category}</span>
                        <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                            {project.title}
                        </h3>
                    </div>
                    <div className="p-2 rounded-full border border-border/50 text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300">
                        <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </div>
                </div>

                <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                    {project.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                    {project.tags.map((tag: string) => (
                        <span key={tag} className="px-2.5 py-1 text-xs rounded-full bg-secondary text-secondary-foreground font-medium">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
