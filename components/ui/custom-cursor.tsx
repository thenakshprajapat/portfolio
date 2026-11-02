"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * CustomCursor:
 * - Tracks pointer coordinates with two Framer Motion springs:
 *   1) A fast spring (stiffness: 480) for the center dot.
 *   2) A softer trailing spring (stiffness: 240) for the outer ring.
 * - Detects `[data-cursor="VIEW"]` on project cards to expand into an orange pill reading "VIEW".
 * - Automatically disables on touch devices and when prefers-reduced-motion is enabled.
 */
export function CustomCursor() {
  const [cursorMode, setCursorMode] = useState<"default" | "link" | "view">("default");
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [enabled, setEnabled] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Fast spring for the inner pinpoint dot
  const dotX = useSpring(mouseX, { damping: 26, stiffness: 480, mass: 0.35 });
  const dotY = useSpring(mouseY, { damping: 26, stiffness: 480, mass: 0.35 });

  // Trailing spring for the outer ring / "VIEW" badge
  const ringX = useSpring(mouseX, { damping: 28, stiffness: 240, mass: 0.65 });
  const ringY = useSpring(mouseY, { damping: 28, stiffness: 240, mass: 0.65 });

  useEffect(() => {
    const checkEnvironment = () => {
      const hasFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const manualReduced = document.documentElement.classList.contains("reduce-motion");
      const isDesktopWidth = window.innerWidth >= 768;
      setEnabled(hasFinePointer && !prefersReduced && !manualReduced && isDesktopWidth);
    };

    checkEnvironment();
    window.addEventListener("resize", checkEnvironment, { passive: true });
    return () => window.removeEventListener("resize", checkEnvironment);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      if (target.closest('[data-cursor="VIEW"]')) {
        setCursorMode("view");
      } else if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.getAttribute("data-cursor-hover") === "true"
      ) {
        setCursorMode("link");
      } else {
        setCursorMode("default");
      }
    };

    const handleEnter = () => setIsVisible(true);
    const handleLeave = () => setIsVisible(false);
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    document.addEventListener("mousemove", handleMove, { passive: true });
    document.addEventListener("mouseenter", handleEnter);
    document.addEventListener("mouseleave", handleLeave);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseenter", handleEnter);
      document.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [enabled, isVisible, mouseX, mouseY]);

  if (!enabled) return null;

  const isView = cursorMode === "view";
  const isLink = cursorMode === "link";

  return (
    <>
      {/* Outer trailing ring that morphs into a "VIEW" badge over project cards */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed z-[9998] rounded-full flex items-center justify-center font-mono text-[10px] font-bold tracking-[0.14em]"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible ? 1 : 0,
        }}
        animate={{
          width: isView ? 68 : isLink ? 44 : 28,
          height: isView ? 68 : isLink ? 44 : 28,
          backgroundColor: isView
            ? "rgba(255, 90, 31, 0.95)"
            : isLink
            ? "rgba(255, 90, 31, 0.12)"
            : "rgba(255, 90, 31, 0)",
          border: isView
            ? "1px solid #FF5A1F"
            : isLink
            ? "1px solid rgba(255, 90, 31, 0.8)"
            : "1px solid rgba(242, 239, 233, 0.25)",
          scale: isClicking ? 0.88 : 1,
        }}
        transition={{ duration: 0.16, ease: "easeOut" }}
      >
        {isView && <span className="text-[#0a0a0a] select-none">VIEW</span>}
      </motion.div>

      {/* Inner pinpoint dot */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed z-[9999] rounded-full"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible && !isView ? 1 : 0,
        }}
        animate={{
          width: isClicking ? 4 : 6,
          height: isClicking ? 4 : 6,
          backgroundColor: "#FF5A1F",
        }}
        transition={{ duration: 0.1 }}
      />
    </>
  );
}
