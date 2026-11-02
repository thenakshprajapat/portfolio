"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { sound } from "@/lib/sound";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
}

function TiltCard({ children, className = "" }: TiltCardProps) {
  const cardRef = useRef<HTMLElement | null>(null);
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 260, damping: 24 });
  const springY = useSpring(mouseY, { stiffness: 260, damping: 24 });

  const rotateX = useTransform(springY, [-0.5, 0.5], [3.5, -3.5]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-3.5, 3.5]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(nx);
    mouseY.set(ny);
    setGlare({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
      opacity: 0.1,
    });
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setGlare((g) => ({ ...g, opacity: 0 }));
  };

  return (
    <motion.article
      ref={cardRef}
      data-cursor="VIEW"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
      }}
      className={`group relative rounded-2xl matte-box hover:border-[var(--accent)]/60 transition-colors overflow-hidden ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-200"
        style={{
          opacity: glare.opacity,
          background: `radial-gradient(circle 220px at ${glare.x}% ${glare.y}%, rgba(255, 90, 31, 0.18), transparent 75%)`,
        }}
      />
      <div className="relative z-10 h-full flex flex-col justify-between p-5 sm:p-6">
        {children}
      </div>
    </motion.article>
  );
}

const PROJECTS = [
  {
    num: "01",
    title: "Mausam (मौसम)",
    subtitle: "Weather platform for India",
    description:
      "Weather platform with 8 persona dashboards (farmers, commuters, parents, athletes, coastal communities, travelers, events, and health), English and Hindi voice warnings, Doppler radar, and an Android APK build.",
    note: "34°C · Dry NW wind · Ideal window for mustard harvest",
    tags: ["Next.js 16", "React 19", "TypeScript", "Tailwind v4", "Capacitor 8", "PWA"],
    live: "https://mausam-homepage.vercel.app",
    repo: "https://github.com/thenakshprajapat/mausam_homepage",
  },
  {
    num: "02",
    title: "Money Tracker",
    subtitle: "Offline-first personal finance",
    description:
      "Personal expense ledger built around Indian currency formatting (₹1,00,000.00). Stores amounts as integer paise to avoid floating-point errors, links self-transfers as one record, and locks old transactions with Firestore rules.",
    note: "Integer paise storage · Firestore rule locks · Unit tested",
    tags: ["React 18", "TypeScript", "Vite", "Firebase Firestore", "IndexedDB"],
    live: "https://moneytracker-olive.vercel.app",
    repo: "https://github.com/thenakshprajapat/money_tracker",
  },
  {
    num: "03",
    title: "Studio / Today",
    subtitle: "Habit tracker & task manager",
    description:
      "Browser-based habit tracker and daily task manager. Computes streaks directly from activity logs rather than stored counters, with a 90-day activity grid, keyboard navigation, and JSON export and import.",
    note: "90-day activity grid · Keyboard-first · Vitest streak tests",
    tags: ["React", "TypeScript", "Vite", "Tailwind v4", "Dexie.js (IndexedDB)"],
    live: "https://habitstudio.vercel.app",
    repo: "https://github.com/thenakshprajapat/habitsAndTasks_manager",
  },
  {
    num: "04",
    title: "Paper Analyzer",
    subtitle: "Exam question pattern analyzer",
    description:
      "Scans past question papers to find chapters, topics, and recurring patterns. Uses Tesseract OCR for image-heavy pages and physics diagrams, batch PDF processing, the Google Gemini API, and Plotly charts.",
    note: "Diagram OCR · Batch PDF processing · Interactive charts",
    tags: ["Python", "Streamlit", "Flask", "Gemini API", "Tesseract OCR", "Plotly"],
    live: "https://paper-analyzer.streamlit.app",
    repo: "https://github.com/thenakshprajapat/paper-analyzer",
  },
  {
    num: "05",
    title: "OmniVision AI",
    subtitle: "Object detection prototype",
    description:
      "Live webcam object detection running in both a native desktop window and a web dashboard, backed by a REST and WebSocket API and a CLI for images and video.",
    note: "Desktop & web dashboard · REST + WebSocket API · CLI",
    tags: ["YOLOv8 Nano", "FastAPI", "WebSockets", "OpenCV", "Python"],
    live: undefined,
    repo: "https://github.com/thenakshprajapat/yolo_model_test",
  },
  {
    num: "06",
    title: "Zariya",
    subtitle: "E-commerce storefront",
    description:
      "Client-side e-commerce storefront built with React, TypeScript, and Vite with responsive product browsing and cart management.",
    note: "Fast client-side catalog and storefront UI",
    tags: ["React", "TypeScript", "Vite"],
    live: "https://zariya-phi.vercel.app",
    repo: "https://github.com/thenakshprajapat/zariya_ecommerce",
  },
];

interface GlidingWorkShowcaseProps {
  limit?: number;
}

export function GlidingWorkShowcase({ limit }: GlidingWorkShowcaseProps) {
  const displayed = limit ? PROJECTS.slice(0, limit) : PROJECTS;
  const isPreview = Boolean(limit && limit < PROJECTS.length);

  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="py-14 sm:py-20 px-4 sm:px-8 max-w-6xl mx-auto"
    >
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div className="space-y-1">
          <span className="mono-label text-[var(--accent)]">Work</span>
          <h2
            id="work-heading"
            className="text-xl sm:text-2xl font-semibold tracking-tight text-[var(--text)]"
          >
            {isPreview ? "Selected projects" : "All projects"}
          </h2>
        </div>

        {isPreview && (
          <Link
            href="/work"
            onClick={() => sound.playClick()}
            className="group inline-flex items-center gap-1.5 font-mono text-xs text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
          >
            <span>See all 6 projects</span>
            <ArrowRight
              className="size-3.5 transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayed.map((proj) => (
          <TiltCard key={proj.num}>
            <div className="space-y-4">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-[var(--accent)] font-medium">
                  {proj.num}
                </span>
                <div className="flex items-center gap-3">
                  {proj.live && (
                    <a
                      href={proj.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => sound.playPop()}
                      className="text-[var(--accent)] hover:underline inline-flex items-center gap-1"
                    >
                      <span>Live</span>
                      <ArrowUpRight className="size-3" aria-hidden="true" />
                    </a>
                  )}
                  <a
                    href={proj.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.playClick()}
                    className="text-[var(--text-muted)] hover:text-[var(--text)] inline-flex items-center gap-1"
                  >
                    <span>GitHub</span>
                    <ArrowUpRight className="size-3" aria-hidden="true" />
                  </a>
                </div>
              </div>

              <div className="space-y-1">
                <h3 className="text-lg font-semibold tracking-tight text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
                  {proj.title}
                </h3>
                <p className="font-mono text-[11px] text-[var(--text-dim)]">
                  {proj.subtitle}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                {proj.description}
              </p>

              <div className="px-3 py-2 rounded-xl bg-black/40 border border-[var(--border)] font-mono text-[11px] text-[var(--text-muted)]">
                {proj.note}
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-4 mt-4 border-t border-[var(--border)] font-mono text-[10px] text-[var(--text-muted)]">
              {proj.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-md bg-white/[0.03] border border-[var(--border)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </TiltCard>
        ))}
      </div>
    </section>
  );
}
