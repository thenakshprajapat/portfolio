"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMouse, setIsMouse] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 24, stiffness: 450, mass: 0.4 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const trailX = useSpring(mouseX, { damping: 32, stiffness: 220, mass: 0.7 });
  const trailY = useSpring(mouseY, { damping: 32, stiffness: 220, mass: 0.7 });

  useEffect(() => {
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      setIsMouse(true);
    }
  }, []);

  useEffect(() => {
    if (!isMouse) return;

    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleEnter = () => setIsVisible(true);
    const handleLeave = () => setIsVisible(false);
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleHoverStart = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.getAttribute("data-cursor-hover") === "true"
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mousemove", handleHoverStart);
    document.addEventListener("mouseenter", handleEnter);
    document.addEventListener("mouseleave", handleLeave);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mousemove", handleHoverStart);
      document.removeEventListener("mouseenter", handleEnter);
      document.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [mouseX, mouseY, isVisible, isMouse]);

  if (!isMouse) return null;

  return (
    <>
      {/* Trailing aura ring */}
      <motion.div
        className="pointer-events-none fixed z-[9998] rounded-full"
        style={{
          x: trailX,
          y: trailY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible ? 1 : 0,
        }}
        animate={{
          width: isHovering ? 46 : 30,
          height: isHovering ? 46 : 30,
          background: isHovering
            ? "rgba(56, 189, 248, 0.14)"
            : "rgba(241, 245, 249, 0.05)",
          border: isHovering
            ? "1px solid rgba(56, 189, 248, 0.5)"
            : "1px solid rgba(241, 245, 249, 0.18)",
        }}
        transition={{ duration: 0.18 }}
      />

      {/* Center pinpoint dot */}
      <motion.div
        ref={cursorRef}
        className="pointer-events-none fixed z-[9999] rounded-full"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible ? 1 : 0,
        }}
        animate={{
          width: isClicking ? 5 : isHovering ? 6 : 7,
          height: isClicking ? 5 : isHovering ? 6 : 7,
          background: isHovering ? "#38bdf8" : "#f1f5f9",
          scale: isClicking ? 0.75 : 1,
        }}
        transition={{ duration: 0.12 }}
      />
    </>
  );
}
