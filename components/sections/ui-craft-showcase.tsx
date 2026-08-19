"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Smartphone,
  Layers,
  Sparkles,
  Volume2,
  CheckCircle2,
  RefreshCw,
  Sliders,
  Zap,
} from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { sound } from "@/lib/sound";

export function UICraftShowcase() {
  const [activeTab, setActiveTab] = useState("Gestures");
  const [toggleState, setToggleState] = useState(true);
  const [sheetDismissed, setSheetDismissed] = useState(false);
  const [optimisticCount, setOptimisticCount] = useState(42);
  const [isLiking, setIsLiking] = useState(false);

  const handleLike = () => {
    sound.playSuccess();
    setIsLiking(true);
    setOptimisticCount((prev) => prev + 1);
    setTimeout(() => setIsLiking(false), 400);
  };

  const handleTabChange = (tab: string) => {
    sound.playClick();
    setActiveTab(tab);
  };

  return (
    <section id="craft" className="py-24 px-6 max-w-5xl mx-auto border-t border-[var(--border)]">
      <div className="space-y-12">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-500 tracking-wider uppercase">
            <Sparkles className="size-3.5" />
            <span>Interactive UI Lab</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[var(--foreground)]">
            UI Motion &amp; Interaction Craft
          </h2>
          <p className="text-base text-[var(--muted)] max-w-xl">
            Live interactive explorations in Android gesture curves, fluid spring physics, tactile audio haptics, and zero-jank interaction design.
          </p>
        </div>

        {/* 3 Interactive UI Showcase Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: 120Hz Gesture Spring */}
          <SpotlightCard className="p-7 rounded-3xl flex flex-col justify-between h-full space-y-6" enableSound>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-emerald-500 font-semibold bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
                  Android UI Physics
                </span>
                <Smartphone className="size-4 text-[var(--muted)]" />
              </div>

              <h3 className="text-lg font-bold text-[var(--foreground)]">
                Elastic Spring Dismissal
              </h3>
              <p className="text-xs text-[var(--muted)] leading-relaxed">
                Drag the interactive sheet card below. Experience velocity-damped spring snapping.
              </p>

              {/* Interactive Draggable Mini Sheet */}
              <div className="h-32 rounded-2xl bg-[var(--secondary)] border border-[var(--border)] relative overflow-hidden flex items-center justify-center p-3">
                <AnimatePresence>
                  {!sheetDismissed ? (
                    <motion.div
                      drag="y"
                      dragConstraints={{ top: -30, bottom: 60 }}
                      onDragEnd={(_, info) => {
                        if (info.offset.y > 40) {
                          sound.playPop();
                          setSheetDismissed(true);
                        } else {
                          sound.playClick();
                        }
                      }}
                      className="w-full py-3 px-4 rounded-xl bg-[var(--card)] border border-[var(--border)] shadow-md cursor-grab active:cursor-grabbing flex items-center justify-between text-xs"
                    >
                      <span className="font-semibold text-[var(--foreground)]">Swipe down to dismiss</span>
                      <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                    </motion.div>
                  ) : (
                    <button
                      onClick={() => {
                        sound.playSuccess();
                        setSheetDismissed(false);
                      }}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[var(--card)] border border-emerald-500/30 text-xs font-mono text-emerald-500 font-semibold shadow-sm"
                    >
                      <RefreshCw className="size-3" />
                      <span>Reopen Sheet</span>
                    </button>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="pt-3 border-t border-[var(--border)] text-[11px] font-mono text-[var(--muted)] flex justify-between">
              <span>Touch velocity tracking</span>
              <span className="text-emerald-500 font-medium">120Hz Smooth</span>
            </div>
          </SpotlightCard>

          {/* Card 2: Tactile Audio Haptics */}
          <SpotlightCard className="p-7 rounded-3xl flex flex-col justify-between h-full space-y-6" enableSound>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-teal-400 font-semibold bg-teal-500/10 border border-teal-500/20 px-2.5 py-0.5 rounded-full">
                  Tactile Audio
                </span>
                <Volume2 className="size-4 text-[var(--muted)]" />
              </div>

              <h3 className="text-lg font-bold text-[var(--foreground)]">
                Web Audio Synthesizer
              </h3>
              <p className="text-xs text-[var(--muted)] leading-relaxed">
                Zero-asset audio feedback synthesized live with Web Audio API oscillators.
              </p>

              {/* Sound Test Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  onClick={() => sound.playClick()}
                  className="py-2.5 px-3 rounded-xl bg-[var(--secondary)] hover:bg-[var(--card-hover)] border border-[var(--border)] text-xs font-semibold text-[var(--foreground)] transition-all active:scale-95"
                >
                  Click Harmonic
                </button>
                <button
                  onClick={() => sound.playPop()}
                  className="py-2.5 px-3 rounded-xl bg-[var(--secondary)] hover:bg-[var(--card-hover)] border border-[var(--border)] text-xs font-semibold text-[var(--foreground)] transition-all active:scale-95"
                >
                  Pop Tone
                </button>
                <button
                  onClick={() => sound.playSuccess()}
                  className="col-span-2 py-2.5 px-3 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-xs font-semibold text-emerald-500 transition-all active:scale-95 flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="size-3.5" />
                  <span>Success Arpeggio</span>
                </button>
              </div>
            </div>

            <div className="pt-3 border-t border-[var(--border)] text-[11px] font-mono text-[var(--muted)] flex justify-between">
              <span>0ms Latency</span>
              <span className="text-teal-400 font-medium">Pure Native Audio</span>
            </div>
          </SpotlightCard>

          {/* Card 3: Fluid Segmented Control & Optimistic State */}
          <SpotlightCard className="p-7 rounded-3xl flex flex-col justify-between h-full space-y-6" enableSound>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-cyan-400 font-semibold bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-0.5 rounded-full">
                  Micro-Animations
                </span>
                <Layers className="size-4 text-[var(--muted)]" />
              </div>

              <h3 className="text-lg font-bold text-[var(--foreground)]">
                Fluid Segmented Tabs
              </h3>
              <p className="text-xs text-[var(--muted)] leading-relaxed">
                Shared layout spring physics with instant optimistic count reconciliation.
              </p>

              {/* Segmented Pill Tabs */}
              <div className="p-1 rounded-2xl bg-[var(--secondary)] border border-[var(--border)] flex items-center relative">
                {["Gestures", "Physics", "State"].map((tab) => {
                  const isActive = activeTab === tab;
                  return (
                    <button
                      key={tab}
                      onClick={() => handleTabChange(tab)}
                      className={`relative flex-1 py-1.5 text-xs font-semibold transition-colors z-10 ${
                        isActive ? "text-[var(--foreground)]" : "text-[var(--muted)] hover:text-[var(--foreground)]"
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="active-tab-bubble"
                          className="absolute inset-0 rounded-xl bg-[var(--card)] border border-[var(--border-highlight)] shadow-sm -z-10"
                          transition={{ type: "spring", stiffness: 450, damping: 30 }}
                        />
                      )}
                      {tab}
                    </button>
                  );
                })}
              </div>

              {/* Optimistic Like Counter Button */}
              <button
                onClick={handleLike}
                className="w-full py-2.5 px-3 rounded-xl bg-[var(--secondary)] hover:border-cyan-500/40 border border-[var(--border)] flex items-center justify-between text-xs font-mono transition-all active:scale-98"
              >
                <span className="text-[var(--muted)]">Optimistic Metric:</span>
                <span className="font-bold text-cyan-400 flex items-center gap-1">
                  <span>{optimisticCount} Stars</span>
                  {isLiking && <span className="size-1.5 rounded-full bg-cyan-400 animate-ping" />}
                </span>
              </button>
            </div>

            <div className="pt-3 border-t border-[var(--border)] text-[11px] font-mono text-[var(--muted)] flex justify-between">
              <span>Framer Motion Spring</span>
              <span className="text-cyan-400 font-medium">LayoutId Sync</span>
            </div>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
}
