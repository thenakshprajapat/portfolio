"use client";

import { motion } from "framer-motion";
import { FlaskConical, Sparkles } from "lucide-react";
import Link from "next/link";
import { TiltCard } from "@/components/ui/tilt-card";

const EXPERIMENTS = [
  {
    title: "E-Commerce Platform",
    description: "Exploring the possibilities of modern e-commerce with AI-powered recommendations.",
    type: "Visual",
    status: "Active",
    gradient: "from-green-500 to-emerald-500",
  },
];

const STATUS_COLORS = {
  Active: "bg-green-500/20 text-green-700 border-green-500/30",
  Paused: "bg-yellow-500/20 text-yellow-700 border-yellow-500/30",
  Archived: "bg-gray-500/20 text-gray-700 border-gray-500/30",
};

export default function LabPage() {
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
            <FlaskConical className="w-4 h-4" />
            Experiments
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            The <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Lab</span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-3xl leading-relaxed">
            Here be dragons. Unfinished thoughts, broken CSS, and half-baked AI models.
            If it's polished, it's in{" "}
            <Link href="/work" className="text-primary font-mono px-2 py-1 bg-primary/10 rounded hover:bg-primary/20 transition-colors cursor-pointer border border-primary/20">work</Link>.
            If it's interesting, it's here.
          </p>
        </motion.div>

        {/* Experiments Grid */}
        <div className="grid md:grid-cols-1 lg:grid-cols-1 max-w-2xl gap-6">
          {EXPERIMENTS.map((exp, index) => (
            <motion.div
              key={exp.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <TiltCard tiltStrength={5}>
                <div className="group h-full p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl relative overflow-hidden">
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${exp.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

                  <div className="relative z-10 space-y-4">
                    {/* Status & Type */}
                    <div className="flex items-center justify-between">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium border ${
                          STATUS_COLORS[exp.status as keyof typeof STATUS_COLORS]
                        }`}
                      >
                        {exp.status}
                      </span>
                      <span className="text-xs font-mono text-muted-foreground">
                        {exp.type}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                      {exp.title}
                    </h3>

                    {/* Description */}
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        {/* Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="p-8 rounded-2xl bg-secondary/50 border border-border"
        >
          <div className="flex gap-4">
            <Sparkles className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold mb-2">Experimental Zone</h3>
              <p className="text-muted-foreground leading-relaxed">
                These projects are in various states of completion. Some may never be finished.
                Others might evolve into something worth shipping. That's the nature of exploration.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
