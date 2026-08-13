"use client";

import React, { useRef, useState } from "react";
import { sound } from "@/lib/sound";

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  enableSound?: boolean;
}

export function SpotlightCard({
  children,
  className = "",
  glowColor = "rgba(0, 102, 255, 0.15)",
  enableSound = false,
  ...props
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => {
    setOpacity(1);
    if (enableSound) sound.playPop();
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#111113] transition-all duration-300 hover:border-white/[0.18] ${className}`}
      {...props}
    >
      {/* Subtle background radial spotlight */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-0"
        style={{
          opacity,
          background: `radial-gradient(500px circle at ${position.x}px ${position.y}px, ${glowColor}, transparent 70%)`,
        }}
      />
      {/* Border glow highlight */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl border border-white/20 transition-opacity duration-300 z-10"
        style={{
          opacity,
          maskImage: `radial-gradient(220px circle at ${position.x}px ${position.y}px, black, transparent 80%)`,
          WebkitMaskImage: `radial-gradient(220px circle at ${position.x}px ${position.y}px, black, transparent 80%)`,
        }}
      />
      <div className="relative z-10 h-full w-full">{children}</div>
    </div>
  );
}
