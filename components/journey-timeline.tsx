"use client";

import React from "react";
import { motion } from "framer-motion";
import { Milestone, Laptop, Compass, Users, GraduationCap } from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";

interface MilestoneItem {
  id: string;
  year: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  icon: React.ElementType;
  badge?: string;
}

const MILESTONES: MilestoneItem[] = [
  {
    id: "jecrc-university",
    year: "Current",
    title: "JECRC University, Jaipur",
    subtitle: "Undergraduate Computer Science",
    description:
      "Continuing formal Computer Science studies with a sharp, disciplined focus on software development, Android UI mechanics, algorithms, and active open-source experimentation.",
    tags: ["Jaipur", "Computer Science", "Algorithms", "Android UI", "Active Building"],
    icon: Laptop,
    badge: "Current Chapter",
  },
  {
    id: "dropped-out-rvu",
    year: "2025",
    title: "The Pivot & Independent Focus",
    subtitle: "Dropping Out of RV University",
    description:
      "Made the deliberate decision to step away from RV University after one year to take complete ownership of my learning curve, engineering output, and practical software craft.",
    tags: ["Decision Point", "Self-Directed Learning", "Execution"],
    icon: Compass,
    badge: "The Turning Point",
  },
  {
    id: "devsphere",
    year: "2024 — 2025",
    title: "DevSphere Community Leadership",
    subtitle: "Developer Events & Educational Sessions",
    description:
      "Founded and led DevSphere: hosted a premier community event for Perplexity Comet, organized developer tech sessions, and conducted a workshop in collaboration with GitHub Education.",
    tags: ["Perplexity Comet", "GitHub Education", "Tech Sessions", "Community"],
    icon: Users,
    badge: "Community & Speaking",
  },
  {
    id: "rv-university",
    year: "2024",
    title: "RV University, Bengaluru",
    subtitle: "Computer Science Foundation (Year 1)",
    description:
      "Studied computer science foundations in Bengaluru, immersing myself in the city's tech ecosystem, hackathons, and software culture.",
    tags: ["Bengaluru", "Foundations", "Networking"],
    icon: GraduationCap,
  },
  {
    id: "st-pauls-school",
    year: "2022 — 2024",
    title: "St. Paul's School, Pali",
    subtitle: "High School (PCB + CS)",
    description:
      "Completed secondary education with a rigorous combination of Physics, Chemistry, Biology, and Computer Science — developing an early passion for logic and programming.",
    tags: ["PCB + CS", "Early Programming", "Logic Foundations"],
    icon: Milestone,
  },
];

export function JourneyTimeline() {
  return (
    <section id="journey" className="py-16 px-6 sm:px-12 max-w-5xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="mb-12"
      >
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-500 tracking-wider uppercase mb-2">
          <Milestone className="size-3.5" />
          <span>Timeline &amp; Milestones</span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--foreground)] tracking-tight">
          Journey &amp; Education
        </h2>
        <p className="text-[var(--muted)] mt-2 text-sm max-w-lg leading-relaxed">
          From early PCB+CS roots in Pali to community leadership at DevSphere and university studies.
        </p>
      </motion.div>

      {/* Timeline Node Tree */}
      <div className="relative pl-6 sm:pl-9 border-l border-[var(--border)] space-y-10">
        {MILESTONES.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="relative"
            >
              {/* Glowing Node Dot on Timeline Line */}
              <div className="absolute -left-[31px] sm:-left-[43px] top-6 flex items-center justify-center size-7 sm:size-8 rounded-full bg-[var(--card)] border border-[var(--border)] shadow-sm">
                <Icon className="size-3.5 text-emerald-500" />
              </div>

              {/* Card Container */}
              <SpotlightCard className="p-6 sm:p-8 rounded-3xl" enableSound>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2.5">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-mono text-emerald-500 font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                      {item.year}
                    </span>
                    {item.badge && (
                      <span className="text-[11px] font-mono text-teal-500 bg-teal-500/10 border border-teal-500/20 px-2.5 py-0.5 rounded-full font-medium">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-mono text-[var(--muted)]">{item.subtitle}</span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-[var(--foreground)] tracking-tight mb-2">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed mb-5 font-normal">
                  {item.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-3.5 border-t border-[var(--border)]">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 rounded-lg bg-[var(--secondary)] border border-[var(--border)] text-[11px] font-mono text-[var(--muted)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </SpotlightCard>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
