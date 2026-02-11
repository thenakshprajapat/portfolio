"use client";

import { motion } from "framer-motion";
import { Brain, Calendar, Clock, BookOpen, Sparkles } from "lucide-react";
import { TiltCard } from "@/components/ui/tilt-card";

const THOUGHTS = [
  {
    id: "1",
    date: "2024-03-15",
    title: "Learning in Public",
    preview:
      "Why hiding your ignorance is the slowest way to learn. The internet rewards vulnerability when it's paired with curiosity.",
    readTime: "4 min",
    category: "Growth",
    gradient: "from-blue-500 to-purple-500",
  },
  {
    id: "2",
    date: "2024-02-28",
    title: "Code as a Medium for Thought",
    preview:
      "Programming isn't just about building products. It's a way to structure logic, handle edge cases in reasoning, and model the world.",
    readTime: "6 min",
    category: "Engineering",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    id: "3",
    date: "2024-01-10",
    title: "The Future of Interfaces",
    preview:
      "Moving beyond screens. How AI agents and ambient computing will dissolve the friction between intent and action.",
    readTime: "5 min",
    category: "Design",
    gradient: "from-cyan-500 to-blue-500",
  },
];

export default function MindPage() {
  return (
    <div className="min-h-screen px-6 md:px-20 max-w-6xl mx-auto pt-32 pb-20">
      <div className="space-y-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20">
            <Brain className="w-4 h-4" />
            Thoughts & Ideas
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            Mind <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Garden</span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-3xl leading-relaxed">
            A stream of consciousness. Notes on engineering, design, and the future.
            Ideas planted here are continuously evolving.
          </p>
        </motion.div>

        {/* Thoughts Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {THOUGHTS.map((thought, index) => (
            <motion.div
              key={thought.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <TiltCard tiltStrength={5}>
                <div className="group h-full p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl relative overflow-hidden cursor-pointer">
                  {/* Gradient overlay on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${thought.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

                  <div className="relative z-10 space-y-4">
                    {/* Category badge */}
                    <div className="flex items-center justify-between">
                      <span className="inline-block px-3 py-1 rounded-full bg-secondary text-xs font-medium">
                        {thought.category}
                      </span>
                      <BookOpen className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl md:text-3xl font-bold group-hover:text-primary transition-colors">
                      {thought.title}
                    </h2>

                    {/* Preview */}
                    <p className="text-muted-foreground leading-relaxed">
                      {thought.preview}
                    </p>

                    {/* Meta info */}
                    <div className="flex items-center gap-4 text-sm text-muted-foreground pt-4 border-t border-border">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(thought.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {thought.readTime}
                      </div>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        {/* Coming Soon Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="p-12 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20 text-center">
            <Sparkles className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h3 className="text-2xl font-bold mb-2">More Coming Soon</h3>
            <p className="text-muted-foreground">
              New ideas are being cultivated. Check back soon for fresh thoughts.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
