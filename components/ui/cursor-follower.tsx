"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CursorFollower() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 450, mass: 0.5 };
  const smoothX = useSpring(rawX, springConfig);
  const smoothY = useSpring(rawY, springConfig);

  useEffect(() => {
    // Only enable on fine pointer (desktop mouse)
    if (typeof window === "undefined" || !window.matchMedia("(pointer: fine)").matches) {
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Check if hovering over interactive elements
      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable = Boolean(
          target.closest("button, a, input, textarea, select, [role='button'], [data-interactive='true'], .spotlight-card")
        );
        setIsHovered(isClickable);
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [isVisible, rawX, rawY]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden="true">
      {/* Smooth Trailing Ring in Emerald Green */}
      <motion.div
        className="fixed top-0 left-0 rounded-full"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
          width: isHovered ? 48 : 28,
          height: isHovered ? 48 : 28,
          backgroundColor: isHovered ? "rgba(16, 185, 129, 0.08)" : "transparent",
          borderColor: isHovered ? "rgba(16, 185, 129, 0.7)" : "rgba(16, 185, 129, 0.35)",
          borderWidth: "1px",
        }}
        transition={{ type: "spring", damping: 25, stiffness: 350 }}
      />

      {/* Center Precise Dot */}
      <motion.div
        className="fixed top-0 left-0 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.8)]"
        style={{
          x: rawX,
          y: rawY,
          translateX: "-50%",
          translateY: "-50%",
          width: isHovered ? 6 : 4.5,
          height: isHovered ? 6 : 4.5,
        }}
      />
    </div>
  );
}
