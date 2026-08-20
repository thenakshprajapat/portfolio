"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function IntroLoader() {
  const [show, setShow] = useState(true);
  const [step, setStep] = useState(0);

  useEffect(() => {
    // Check if user already saw intro in current session
    const seen = sessionStorage.getItem("naksh_intro_seen");
    if (seen) {
      setShow(false);
      return;
    }

    const t1 = setTimeout(() => setStep(1), 300);
    const t2 = setTimeout(() => setStep(2), 1000);
    const t3 = setTimeout(() => {
      setShow(false);
      sessionStorage.setItem("naksh_intro_seen", "1");
    }, 2400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const skipIntro = () => {
    setShow(false);
    sessionStorage.setItem("naksh_intro_seen", "1");
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -16, filter: "blur(8px)" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[999] bg-[var(--background)] flex flex-col items-center justify-center p-6 select-none cursor-pointer"
          onClick={skipIntro}
        >
          {/* Subtle Ambient Green Glow */}
          <div className="absolute size-80 rounded-full bg-emerald-500/10 blur-[100px] pointer-events-none -top-10 -left-10 animate-pulse" />
          <div className="absolute size-80 rounded-full bg-teal-500/10 blur-[100px] pointer-events-none -bottom-10 -right-10 animate-pulse" />

          <div className="relative z-10 max-w-lg w-full text-center space-y-4">
            {/* Live Indicator Dot */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--surface-elevated)] border border-[var(--border)] text-[11px] font-mono text-emerald-500"
            >
              <span className="size-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>Jaipur, India • 2026</span>
            </motion.div>

            {/* Main Greeting */}
            <div className="overflow-hidden min-h-[44px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                {step >= 1 && (
                  <motion.h1
                    key="name"
                    initial={{ y: 20, opacity: 0, filter: "blur(6px)" }}
                    animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                    exit={{ y: -20, opacity: 0, filter: "blur(6px)" }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="text-2xl sm:text-4xl font-semibold tracking-tight text-[var(--foreground)] font-sans"
                  >
                    hi, i&apos;m <span className="gradient-green-text">naksh</span>
                  </motion.h1>
                )}
              </AnimatePresence>
            </div>

            {/* Subtext */}
            <div className="overflow-hidden min-h-[28px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                {step >= 2 && (
                  <motion.p
                    key="craft"
                    initial={{ y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="text-xs sm:text-sm text-[var(--muted)] font-mono"
                  >
                    independent software engineer &amp; ui craftsman
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Minimal Progress Line */}
            <div className="w-28 h-[2px] bg-[var(--border)] rounded-full mx-auto overflow-hidden mt-4">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2.2, ease: "easeInOut" }}
                className="h-full bg-gradient-to-r from-emerald-400 to-teal-500"
              />
            </div>

            <p className="text-[10px] font-mono text-[var(--muted-foreground)] pt-1">
              click anywhere to enter
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
