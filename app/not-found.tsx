"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, RefreshCw } from "lucide-react";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { sound } from "@/lib/sound";

export default function NotFound() {
  const [bits, setBits] = useState<number[]>([1, 0, 0, 1, 0, 1, 0, 0]);

  const toggleBit = (index: number) => {
    sound.playPop();
    setBits((prev) => prev.map((b, i) => (i === index ? (b === 1 ? 0 : 1) : b)));
  };

  const decimalValue = bits.reduce(
    (acc, bit, idx) => acc + bit * Math.pow(2, 7 - idx),
    0
  );

  return (
    <main className="min-h-[78vh] px-4 sm:px-8 max-w-4xl mx-auto py-16 flex flex-col justify-center space-y-8">
      <div className="space-y-3">
        <div className="flex items-center gap-2 font-mono text-xs text-[var(--accent)]">
          <span className="inline-block size-2 rounded-sm bg-[var(--accent)]" aria-hidden="true" />
          <span>404 · Page not found</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--text)]">
          This page <span className="text-[var(--accent)]">doesn&apos;t exist.</span>
        </h1>

        <p className="text-xs sm:text-sm text-[var(--text-muted)] max-w-md">
          The page you requested isn&apos;t on naksh.cc. Flip the 8-bit register
          below or head back home.
        </p>
      </div>

      {/* Interactive 8-Bit Register Element */}
      <div className="p-5 sm:p-6 rounded-2xl matte-box max-w-lg space-y-4 font-mono">
        <div className="flex items-center justify-between text-xs border-b border-[var(--border)] pb-2.5">
          <span className="text-[var(--text-muted)]">
            8-bit register (click bits to flip)
          </span>
          <span className="text-[var(--accent)] font-semibold">
            DEC: {decimalValue} · 0x{decimalValue.toString(16).toUpperCase().padStart(2, "0")}
          </span>
        </div>

        <div className="grid grid-cols-8 gap-2">
          {bits.map((bit, i) => (
            <button
              key={i}
              type="button"
              onClick={() => toggleBit(i)}
              className={`h-10 rounded-lg border text-sm font-semibold transition-transform active:scale-95 cursor-pointer ${
                bit === 1
                  ? "bg-[var(--accent)] border-[var(--accent)] text-[var(--bg)]"
                  : "bg-[var(--bg)] border-[var(--border-strong)] text-[var(--text-muted)] hover:border-[var(--accent)]"
              }`}
            >
              {bit}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between text-[11px] text-[var(--text-dim)] pt-1">
          <span>
            {decimalValue === 0
              ? "Register cleared"
              : "Toggle all bits to 0 to clear"}
          </span>
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              setBits([0, 0, 0, 0, 0, 0, 0, 0]);
            }}
            className="inline-flex items-center gap-1 text-[var(--accent)] hover:underline cursor-pointer"
          >
            <RefreshCw className="size-3" aria-hidden="true" />
            <span>Zero bits</span>
          </button>
        </div>
      </div>

      <div>
        <MagneticButton strength={0.15}>
          <Link
            href="/"
            onClick={() => sound.playPop()}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--accent)] text-[var(--bg)] font-mono text-xs font-semibold hover:bg-[var(--accent-hover)] transition-colors"
          >
            <ArrowLeft className="size-3.5" aria-hidden="true" />
            <span>Back to home</span>
          </Link>
        </MagneticButton>
      </div>
    </main>
  );
}
