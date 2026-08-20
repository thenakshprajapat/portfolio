"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  as?: "div" | "a" | "button";
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  "aria-label"?: string;
}

export function MagneticButton({
  children,
  className = "",
  strength = 0.3,
  as = "div",
  href,
  target,
  rel,
  onClick,
  type,
  disabled,
  "aria-label": ariaLabel,
}: MagneticButtonProps) {
  const ref = useRef<any>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    setPosition({ x: dx * strength, y: dy * strength });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const motionProps = {
    ref,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    animate: { x: position.x, y: position.y },
    transition: { type: "spring" as const, stiffness: 200, damping: 18, mass: 0.5 },
    className,
  };

  if (as === "button") {
    return (
      <motion.button
        {...motionProps}
        onClick={onClick}
        type={type}
        disabled={disabled}
        aria-label={ariaLabel}
      >
        {children}
      </motion.button>
    );
  }

  if (as === "a") {
    return (
      <motion.a
        {...motionProps}
        href={href}
        target={target}
        rel={rel}
        onClick={onClick}
        aria-label={ariaLabel}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.div {...motionProps} onClick={onClick}>
      {children}
    </motion.div>
  );
}
