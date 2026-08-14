"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export function LiquidBackground() {
  const mouseGlowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mouseX = -500;
    let mouseY = -500;
    let currentX = -500;
    let currentY = -500;
    let animId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const update = () => {
      // Very smooth, subtle cursor following
      currentX += (mouseX - currentX) * 0.05;
      currentY += (mouseY - currentY) * 0.05;

      if (mouseGlowRef.current) {
        mouseGlowRef.current.style.transform = `translate3d(${currentX - 180}px, ${currentY - 180}px, 0)`;
      }
      animId = requestAnimationFrame(update);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    update();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
    >
      {/* 1. Subtle, Small Interactive Cursor Light Glow */}
      <div
        ref={mouseGlowRef}
        className="absolute top-0 left-0 size-[360px] rounded-full bg-gradient-to-br from-emerald-500/10 via-teal-400/6 to-transparent blur-[90px] will-change-transform opacity-60 dark:opacity-75"
      />

      {/* 2. Gentle Upper Floating Liquid Stream Orb */}
      <motion.div
        animate={{
          x: [0, 50, -40, 0],
          y: [0, -35, 30, 0],
          scale: [1, 1.08, 0.94, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[8%] left-[20%] size-[360px] sm:size-[440px] rounded-full bg-gradient-to-br from-emerald-500/12 via-teal-500/8 to-transparent blur-[105px] dark:from-emerald-500/16 dark:via-teal-500/10"
      />

      {/* 3. Subtle Lower Right Floating Stream Glow */}
      <motion.div
        animate={{
          x: [0, -45, 35, 0],
          y: [0, 40, -30, 0],
          scale: [1, 0.92, 1.06, 1],
        }}
        transition={{
          duration: 26,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[45%] right-[15%] size-[380px] sm:size-[460px] rounded-full bg-gradient-to-bl from-teal-400/10 via-emerald-400/7 to-transparent blur-[110px] dark:from-teal-400/14 dark:via-emerald-400/9"
      />
    </div>
  );
}
