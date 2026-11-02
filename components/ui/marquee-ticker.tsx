"use client";

import React from "react";

interface MarqueeTickerProps {
  items?: { label: string }[];
  speed?: number;
  direction?: "left" | "right";
  className?: string;
}

const DEFAULT_SKILLS = [
  { label: "Next.js 16" },
  { label: "React 19" },
  { label: "TypeScript" },
  { label: "Python" },
  { label: "Capacitor 8" },
  { label: "Android" },
  { label: "Tailwind CSS" },
  { label: "IndexedDB" },
  { label: "Firestore" },
  { label: "Tesseract OCR" },
  { label: "OpenCV" },
];

export function MarqueeTicker({
  items = DEFAULT_SKILLS,
  speed = 34,
  direction = "left",
  className = "",
}: MarqueeTickerProps) {
  const doubled = [...items, ...items];
  const duration = `${speed}s`;

  return (
    <div
      aria-label="Technologies used"
      className={`max-w-6xl mx-auto px-4 sm:px-8 my-2 ${className}`}
    >
      <div
        className="relative overflow-hidden rounded-xl matte-box py-2.5 flex items-center select-none"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        }}
      >
        <div
          className="flex items-center whitespace-nowrap"
          style={{
            animation: `marquee ${duration} linear infinite`,
            animationDirection: direction === "right" ? "reverse" : "normal",
            willChange: "transform",
          }}
        >
          {doubled.map((item, i) => (
            <span key={i} className="inline-flex items-center gap-4 px-3">
              <span className="font-mono text-xs font-normal tracking-wide text-[var(--text-muted)] hover:text-[var(--text)] transition-colors">
                {item.label}
              </span>
              <span
                className="inline-block size-1 rounded-full bg-[var(--accent)]/70"
                aria-hidden="true"
              />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
