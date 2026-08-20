"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Smartphone,
  Layers,
  Sparkles,
  RefreshCw,
  Sliders,
  Zap,
} from "lucide-react";
import { sound } from "@/lib/sound";

export function UICraftShowcase() {
  const [sheetDismissed, setSheetDismissed] = useState(false);
  const [activeCurve, setActiveCurve] = useState("spring");
  const [toggleState, setToggleState] = useState(true);

  return (
    <section id="lab" className="py-16 sm:py-20 px-6 sm:px-12 max-w-5xl mx-auto">
      <div className="space-y-10">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 tracking-wider uppercase">
            <Sparkles className="size-3.5" />
            <span>Interactive Motion Lab</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[var(--foreground)]">
            Android UI &amp; Gesture Sandbox
          </h2>
          <p className="text-[var(--muted)] text-sm max-w-xl leading-relaxed">
            Live interactive simulations exploring velocity-damped spring snapping, haptic audio feedback, and perceived touch latency.
          </p>
        </div>

        {/* 3 Interactive Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: Spring Dismissal Sheet */}
          <div className="craft-card p-6 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-cyan-400 font-semibold bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-0.5 rounded-full">
                  120Hz Physics
                </span>
                <Smartphone className="size-4 text-[var(--muted)]" />
              </div>

              <h3 className="text-base font-bold text-[var(--foreground)]">
                Elastic Spring Sheet
              </h3>
              <p className="text-xs text-[var(--muted)] leading-relaxed">
                Drag the card below downwards. Experience momentum velocity snapping.
              </p>

              {/* Draggable mini sheet */}
              <div className="h-32 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)] relative overflow-hidden flex items-center justify-center p-3">
                <AnimatePresence>
                  {!sheetDismissed ? (
                    <motion.div
                      drag="y"
                      dragConstraints={{ top: -20, bottom: 50 }}
                      onDragEnd={(_, info) => {
                        if (info.offset.y > 35) {
                          sound.playPop();
                          setSheetDismissed(true);
                        } else {
                          sound.playClick();
                        }
                      }}
                      className="w-full py-3 px-4 rounded-xl bg-[var(--surface)] border border-[var(--border-strong)] shadow-md cursor-grab active:cursor-grabbing flex items-center justify-between text-xs font-mono"
                    >
                      <span className="font-semibold text-[var(--foreground)]">Swipe down ↓</span>
                      <span className="size-2 rounded-full bg-cyan-400 animate-pulse" />
                    </motion.div>
                  ) : (
                    <button
                      onClick={() => {
                        sound.playSuccess();
                        setSheetDismissed(false);
                      }}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[var(--surface)] border border-cyan-500/40 text-xs font-mono text-cyan-400 font-semibold shadow-sm cursor-pointer"
                    >
                      <RefreshCw className="size-3" />
                      <span>Reset Sheet</span>
                    </button>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between text-[11px] font-mono text-[var(--muted)]">
              <span>Android Choreographer</span>
              <span className="text-cyan-400 font-bold">120 FPS</span>
            </div>
          </div>

          {/* Card 2: Curve dynamics */}
          <div className="craft-card p-6 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-indigo-400 font-semibold bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-0.5 rounded-full">
                  Motion Curves
                </span>
                <Sliders className="size-4 text-[var(--muted)]" />
              </div>

              <h3 className="text-base font-bold text-[var(--foreground)]">
                Damping Dynamics
              </h3>
              <p className="text-xs text-[var(--muted)] leading-relaxed">
                Compare linear easing vs critically-damped spring transitions.
              </p>

              {/* Curve buttons */}
              <div className="flex gap-2">
                {["spring", "linear"].map((c) => (
                  <button
                    key={c}
                    onClick={() => {
                      sound.playPop();
                      setActiveCurve(c);
                    }}
                    className={`flex-1 py-1.5 rounded-xl font-mono text-xs font-semibold capitalize border transition-all cursor-pointer ${
                      activeCurve === c
                        ? "bg-indigo-500/20 text-indigo-300 border-indigo-500/40"
                        : "bg-[var(--surface-elevated)] text-[var(--muted)] border-[var(--border)]"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>

              <div className="h-16 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)] flex items-center px-4 relative overflow-hidden">
                <motion.div
                  key={activeCurve}
                  initial={{ x: 0 }}
                  animate={{ x: 180 }}
                  transition={
                    activeCurve === "spring"
                      ? { type: "spring", stiffness: 300, damping: 15, repeat: Infinity, repeatType: "reverse" }
                      : { duration: 1, ease: "linear", repeat: Infinity, repeatType: "reverse" }
                  }
                  className="size-8 rounded-xl bg-indigo-500 shadow-md shadow-indigo-500/30 flex items-center justify-center text-white"
                >
                  <Zap className="size-4" />
                </motion.div>
              </div>
            </div>

            <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between text-[11px] font-mono text-[var(--muted)]">
              <span>Curve profile</span>
              <span className="text-indigo-400 font-bold capitalize">{activeCurve}</span>
            </div>
          </div>

          {/* Card 3: Tactile Feedback */}
          <div className="craft-card p-6 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-amber-400 font-semibold bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-full">
                  Audio Haptics
                </span>
                <Layers className="size-4 text-[var(--muted)]" />
              </div>

              <h3 className="text-base font-bold text-[var(--foreground)]">
                Perceived State Feedback
              </h3>
              <p className="text-xs text-[var(--muted)] leading-relaxed">
                Synthetic WebAudio haptic feedback for micro-interactions.
              </p>

              <div className="h-28 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)] flex flex-col items-center justify-center gap-3">
                <button
                  onClick={() => {
                    sound.playClick();
                    setToggleState(!toggleState);
                  }}
                  className={`w-14 h-8 rounded-full p-1 transition-colors cursor-pointer ${
                    toggleState ? "bg-amber-400" : "bg-[var(--surface)] border border-[var(--border)]"
                  }`}
                >
                  <motion.div
                    animate={{ x: toggleState ? 24 : 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="size-6 rounded-full bg-[#07080c] shadow-sm"
                  />
                </button>
                <span className="text-[10px] font-mono text-[var(--muted)]">
                  {toggleState ? "State: ENABLED" : "State: DISABLED"}
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between text-[11px] font-mono text-[var(--muted)]">
              <span>Feedback latency</span>
              <span className="text-amber-400 font-bold">&lt; 5ms</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
