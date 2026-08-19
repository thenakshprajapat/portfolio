"use client";

import React from "react";

interface MarqueeTickerProps {
  items: { label: string; icon?: string }[];
  speed?: number;
  direction?: "left" | "right";
  className?: string;
  itemClassName?: string;
  separator?: string;
}

export function MarqueeTicker({
  items,
  speed = 35,
  direction = "left",
  className = "",
  itemClassName = "",
  separator = "✦",
}: MarqueeTickerProps) {
  // Double the items for seamless infinite loop
  const doubled = [...items, ...items];
  const duration = `${speed}s`;

  return (
    <div
      className={`relative overflow-hidden flex items-center ${className}`}
      style={{ maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)" }}
    >
      <div
        className="flex items-center gap-0 whitespace-nowrap"
        style={{
          animation: `marquee ${duration} linear infinite`,
          animationDirection: direction === "right" ? "reverse" : "normal",
          willChange: "transform",
        }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-6 px-4">
            {item.icon && (
              <span className="text-base">{item.icon}</span>
            )}
            <span className={`text-sm font-medium tracking-wide ${itemClassName}`}>
              {item.label}
            </span>
            <span className="text-[var(--accent)] text-xs opacity-60">{separator}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
