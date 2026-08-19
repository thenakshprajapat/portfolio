"use client";

import React from "react";

export function AmbientGlow() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
    >
      {/* Top subtle ambient beam */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-emerald-500/12 via-teal-500/5 to-transparent blur-[120px] rounded-full" />
      
      {/* Middle subtle accent */}
      <div className="absolute top-[40%] -right-40 w-[500px] h-[300px] bg-emerald-500/8 blur-[130px] rounded-full" />

      {/* Bottom accent */}
      <div className="absolute bottom-10 -left-40 w-[500px] h-[300px] bg-teal-500/8 blur-[130px] rounded-full" />
    </div>
  );
}
