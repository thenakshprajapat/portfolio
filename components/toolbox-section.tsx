"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Wrench, Terminal, Cpu, Smartphone, Globe, Database, Sparkles } from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { sound } from "@/lib/sound";

interface ToolGroup {
  id: string;
  category: string;
  subtitle: string;
  icon: React.ElementType;
  tools: {
    name: string;
    description: string;
    status: "Primary" | "Active Research" | "Production Ready";
  }[];
}

const TOOLBOX_DATA: ToolGroup[] = [
  {
    id: "systems",
    category: "Systems & Low-Level OS",
    subtitle: "Memory hierarchy, IPC mechanisms, and POSIX primitives",
    icon: Cpu,
    tools: [
      {
        name: "C / C++",
        description: "Android JNI bindings, memory management, and OS-level experiments",
        status: "Primary",
      },
      {
        name: "Rust",
        description: "Zero-cost abstractions, memory safety, and high-performance CLI tools",
        status: "Active Research",
      },
      {
        name: "Linux Kernel & Bash",
        description: "Process scheduling, system calls, shell automation, and cgroups",
        status: "Production Ready",
      },
    ],
  },
  {
    id: "android",
    category: "Android OS & Mobile Platforms",
    subtitle: "AOSP architecture, framework services, and native engineering",
    icon: Smartphone,
    tools: [
      {
        name: "AOSP Architecture",
        description: "Binder IPC, SurfaceFlinger, Hardware Abstraction Layer (HAL)",
        status: "Active Research",
      },
      {
        name: "Kotlin & Android SDK",
        description: "Modern declarative Android, Jetpack Compose, and coroutines",
        status: "Primary",
      },
      {
        name: "ADB & Fastboot",
        description: "Flashing custom recoveries, partition management, and logcat tracing",
        status: "Production Ready",
      },
    ],
  },
  {
    id: "web",
    category: "Web & Product Engineering",
    subtitle: "High-craft interfaces, fluid typography, and performant state",
    icon: Globe,
    tools: [
      {
        name: "TypeScript",
        description: "Strict typing, complex generic models, and scalable architectures",
        status: "Primary",
      },
      {
        name: "Next.js & React",
        description: "Server components, edge routing, performance tuning, and hydration",
        status: "Production Ready",
      },
      {
        name: "Tailwind CSS & Motion",
        description: "Design systems, fluid spacing, micro-interactions, and glassmorphism",
        status: "Primary",
      },
    ],
  },
  {
    id: "infra",
    category: "Data, NLP & Infrastructure",
    subtitle: "Distributed state, text intelligence, and reliable deployments",
    icon: Database,
    tools: [
      {
        name: "Firebase & Firestore",
        description: "Real-time snapshot synchronization, offline indexing, security rules",
        status: "Production Ready",
      },
      {
        name: "Python (NLP & Data)",
        description: "Text extraction pipelines, statistical topic modeling, automation",
        status: "Production Ready",
      },
      {
        name: "Git & Linux Toolchains",
        description: "Trunk-based workflow, open-source git hygiene, automated CI/CD",
        status: "Primary",
      },
    ],
  },
];

export function ToolboxSection() {
  const [selectedGroup, setSelectedGroup] = useState<string>("all");

  const displayData =
    selectedGroup === "all"
      ? TOOLBOX_DATA
      : TOOLBOX_DATA.filter((g) => g.id === selectedGroup);

  return (
    <section id="toolbox" className="py-24 px-6 sm:px-12 max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
      >
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-blue-400 tracking-wider uppercase mb-2">
            <Wrench className="w-3.5 h-3.5" />
            <span>Technologies &amp; Systems Craft</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Curated Toolbox
          </h2>
          <p className="text-zinc-400 mt-2 text-sm sm:text-base max-w-xl">
            A deliberate stack chosen for depth and leverage — categorized by actual engineering discipline rather than a generic logo cloud.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2">
          {[
            { id: "all", label: "All Layers" },
            { id: "systems", label: "Systems & OS" },
            { id: "android", label: "Android & Mobile" },
            { id: "web", label: "Web & UI" },
            { id: "infra", label: "Data & Infra" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setSelectedGroup(item.id);
                sound.playClick();
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                selectedGroup === item.id
                  ? "bg-white text-zinc-950 font-medium shadow-sm"
                  : "bg-white/[0.04] text-zinc-400 hover:text-white hover:bg-white/[0.08] border border-white/[0.06]"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {displayData.map((group, gIdx) => {
          const Icon = group.icon;
          return (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: gIdx * 0.08 }}
            >
              <SpotlightCard className="p-6 sm:p-7 flex flex-col justify-between h-full" enableSound>
                <div>
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/[0.06]">
                    <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white tracking-tight">
                        {group.category}
                      </h3>
                      <p className="text-xs text-zinc-400">{group.subtitle}</p>
                    </div>
                  </div>

                  {/* Tools list */}
                  <div className="space-y-3">
                    {group.tools.map((tool) => (
                      <div
                        key={tool.name}
                        className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:border-white/[0.1] transition-colors"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-sm font-semibold text-white">
                            {tool.name}
                          </span>
                          <span
                            className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                              tool.status === "Primary"
                                ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                                : tool.status === "Active Research"
                                ? "bg-sky-500/10 text-sky-400 border-sky-500/20"
                                : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            }`}
                          >
                            {tool.status}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                          {tool.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/[0.06] text-[11px] font-mono text-zinc-500 flex items-center justify-between">
                  <span>Battle-tested in real projects</span>
                  <span className="text-zinc-400">Continuous Growth</span>
                </div>
              </SpotlightCard>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
