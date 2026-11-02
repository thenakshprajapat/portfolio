"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sliders, Mic, Radio, Volume2, ShieldCheck, X, Check } from "lucide-react";
import { sound } from "@/lib/sound";

export function CathodeHero() {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [configOpen, setConfigOpen] = useState(false);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  // Studio configuration state
  const [selectedMic, setSelectedMic] = useState("Cathode SM-7 Dynamic");
  const [selectedArm, setSelectedArm] = useState("Articulated Low-Profile Arm");
  const [selectedDeck, setSelectedDeck] = useState("Hexa-Fader DSP Mixer");

  // Track cursor relative to window center with smooth lerp damping
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      targetRef.current = {
        x: Math.max(-1, Math.min(1, (e.clientX - cx) / cx)),
        y: Math.max(-1, Math.min(1, (e.clientY - cy) / cy)),
      };
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) {
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        targetRef.current = {
          x: Math.max(-1, Math.min(1, (e.touches[0].clientX - cx) / cx)),
          y: Math.max(-1, Math.min(1, (e.touches[0].clientY - cy) / cy)),
        };
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    const tick = () => {
      const DAMPING = 0.08;
      currentRef.current.x += (targetRef.current.x - currentRef.current.x) * DAMPING;
      currentRef.current.y += (targetRef.current.y - currentRef.current.y) * DAMPING;

      setCoords({
        x: currentRef.current.x,
        y: currentRef.current.y,
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Waveform canvas animation on the isometric monitor
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let phase = 0;
    let animId = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;
      const mid = h * 0.52;

      // Draw oscilloscope grid lines
      ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, mid);
      ctx.lineTo(w, mid);
      ctx.stroke();

      // Main primary glowing audio wave
      ctx.beginPath();
      ctx.strokeStyle = "rgba(255, 255, 255, 0.95)";
      ctx.shadowColor = "rgba(255, 255, 255, 0.75)";
      ctx.shadowBlur = 6;
      ctx.lineWidth = 1.6;

      for (let x = 0; x < w - 24; x += 1.5) {
        // Compound harmonics wave
        const env = Math.sin((x / (w - 24)) * Math.PI); // envelope fade at edges
        const wave1 = Math.sin(x * 0.09 + phase) * 14;
        const wave2 = Math.sin(x * 0.22 - phase * 1.6) * 6;
        const wave3 = Math.cos(x * 0.04 + phase * 0.8) * 4;
        const y = mid + (wave1 + wave2 + wave3) * env;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Secondary subtle amber harmonic wave
      ctx.beginPath();
      ctx.strokeStyle = "rgba(255, 205, 120, 0.6)";
      ctx.shadowColor = "rgba(255, 205, 120, 0.5)";
      ctx.shadowBlur = 4;
      ctx.lineWidth = 1;

      for (let x = 0; x < w - 24; x += 2) {
        const env = Math.sin((x / (w - 24)) * Math.PI);
        const wave = Math.sin(x * 0.14 - phase * 1.2) * 9;
        const y = mid + wave * env;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // VU meter bars on the right
      ctx.shadowBlur = 0;
      const barX = w - 18;
      const bars = 6;
      for (let i = 0; i < bars; i++) {
        const barH = 5;
        const barY = h - 16 - i * (barH + 2);
        const pulse = Math.sin(phase * 3 + i * 0.7);
        const active = pulse > -0.2 - i * 0.15;
        ctx.fillStyle = active
          ? i >= 4
            ? "rgba(255, 120, 100, 0.9)"
            : "rgba(255, 255, 255, 0.85)"
          : "rgba(255, 255, 255, 0.15)";
        ctx.fillRect(barX, barY, 12, barH);
      }

      phase += 0.06;
      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  const handleCtaClick = () => {
    sound.playPop();
    setConfigOpen(true);
  };

  // Compute 3D isometric tilt and pan
  const rotX = 14 - coords.y * 12;
  const rotY = -18 + coords.x * 18;
  const rotZ = -coords.x * 2.5;
  const panX = coords.x * 25;
  const panY = coords.y * 18;

  // Dynamic cursor highlight position
  const lightX = 50 + coords.x * 22;
  const lightY = 46 + coords.y * 20;

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] sm:min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#070707] text-[#EDEDED] select-none pt-20 pb-16 px-4 sm:px-8"
      style={{
        backgroundImage: `
          radial-gradient(circle 650px at ${lightX}% ${lightY}%, rgba(255, 255, 255, 0.04), transparent 75%),
          radial-gradient(ellipse 90% 80% at 50% 50%, transparent 40%, rgba(7, 7, 7, 0.92) 85%, #070707 100%)
        `,
      }}
    >
      {/* Viewport Dark Vignette Border */}
      <div className="absolute inset-0 pointer-events-none z-20 shadow-[inset_0_0_120px_rgba(0,0,0,0.9)]" />

      {/* Main Container: Left 3D Isometric Centerpiece, Right Hero Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-4">
        
        {/* LEFT / CENTER: Interactive 3D Wireframe Studio Equipment */}
        <div className="lg:col-span-7 xl:col-span-7 flex items-center justify-center relative perspective-[1200px]">
          <div
            className="w-full max-w-[620px] aspect-[4/3] relative transition-transform duration-75 ease-out cursor-grab active:cursor-grabbing"
            style={{
              transformStyle: "preserve-3d",
              transform: `perspective(1200px) rotateX(${rotX}deg) rotateY(${rotY}deg) rotateZ(${rotZ}deg) translate3d(${panX}px, ${panY}px, 0)`,
            }}
          >
            {/* SVG Isometric Studio Composition */}
            <svg
              viewBox="0 0 820 620"
              className="w-full h-full overflow-visible drop-shadow-[0_20px_40px_rgba(0,0,0,0.85)]"
              style={{ transformStyle: "preserve-3d" }}
            >
              <defs>
                {/* Glow Filters */}
                <filter id="softGlow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="amberGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="8" result="blur" />
                  <feColorMatrix
                    type="matrix"
                    values="1 0 0 0 1  0 0.8 0 0 0.8  0 0 0.4 0 0.4  0 0 0 1 0"
                  />
                  <feMerge>
                    <feMergeNode />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="ledGlow" x="-80%" y="-80%" width="260%" height="260%">
                  <feGaussianBlur stdDeviation="3.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                {/* Linear Gradients for Wireframe Depth */}
                <linearGradient id="chassisGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#141414" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#0b0b0b" stopOpacity="0.95" />
                </linearGradient>
                <linearGradient id="bevelGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#222222" />
                  <stop offset="100%" stopColor="#0d0d0d" />
                </linearGradient>
                <linearGradient id="wireStroke" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(255, 255, 255, 0.45)" />
                  <stop offset="100%" stopColor="rgba(255, 255, 255, 0.15)" />
                </linearGradient>
                <linearGradient id="armStroke" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(255, 255, 255, 0.6)" />
                  <stop offset="100%" stopColor="rgba(255, 255, 255, 0.22)" />
                </linearGradient>
              </defs>

              {/* ── LAYER 1: Isometric Floor Grid (translateZ: 0px) ── */}
              <g style={{ transform: "translateZ(0px)" }}>
                {/* Isometric Grid Lines */}
                {Array.from({ length: 11 }).map((_, i) => {
                  const offset = (i - 5) * 44;
                  return (
                    <React.Fragment key={`grid-${i}`}>
                      {/* Isometric diagonals A */}
                      <line
                        x1={140 + offset}
                        y1={450 - offset * 0.58}
                        x2={490 + offset}
                        y2={250 - offset * 0.58}
                        stroke="rgba(255, 255, 255, 0.05)"
                        strokeWidth="1"
                        strokeDasharray="2 6"
                      />
                      {/* Isometric diagonals B */}
                      <line
                        x1={200 + offset}
                        y1={210 + offset * 0.58}
                        x2={550 + offset}
                        y2={410 + offset * 0.58}
                        stroke="rgba(255, 255, 255, 0.05)"
                        strokeWidth="1"
                        strokeDasharray="2 6"
                      />
                    </React.Fragment>
                  );
                })}

                {/* Isometric Crosshair Points / Dots */}
                {[-3, -2, -1, 0, 1, 2, 3].map((ix) =>
                  [-3, -2, -1, 0, 1, 2, 3].map((iy) => {
                    const px = 360 + ix * 56 - iy * 48;
                    const py = 380 + ix * 32 + iy * 28;
                    if (px < 100 || px > 650 || py < 180 || py > 540) return null;
                    return (
                      <g key={`cross-${ix}-${iy}`}>
                        <line
                          x1={px - 3}
                          y1={py}
                          x2={px + 3}
                          y2={py}
                          stroke="rgba(255, 255, 255, 0.16)"
                          strokeWidth="1"
                        />
                        <line
                          x1={px}
                          y1={py - 3}
                          x2={px}
                          y2={py + 3}
                          stroke="rgba(255, 255, 255, 0.16)"
                          strokeWidth="1"
                        />
                      </g>
                    );
                  })
                )}
              </g>

              {/* ── LAYER 2: Twin Coiled Audio Cables (translateZ: 14px) ── */}
              <g style={{ transform: "translateZ(14px)" }}>
                {/* Curved looping cables on floor */}
                <path
                  d="M 440,320 C 500,280 540,330 480,380 C 440,410 470,440 520,415"
                  stroke="rgba(255, 255, 255, 0.18)"
                  strokeWidth="3.5"
                  fill="none"
                  strokeLinecap="round"
                />
                <path
                  d="M 452,328 C 508,290 546,338 490,388 C 450,418 480,448 530,422"
                  stroke="rgba(255, 255, 255, 0.1)"
                  strokeWidth="2.5"
                  fill="none"
                  strokeLinecap="round"
                />
                {/* Cable Terminators / Ferrites */}
                <ellipse cx="440" cy="320" rx="7" ry="4" fill="#141414" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
                <ellipse cx="525" cy="418" rx="8" ry="5" fill="#141414" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
              </g>

              {/* ── LAYER 3: Audio Mixer Production Deck (translateZ: 28px) ── */}
              <g style={{ transform: "translateZ(28px)" }}>
                {/* Mixer Shadow Base */}
                <polygon
                  points="260,390 480,260 580,320 360,450"
                  fill="none"
                  stroke="rgba(0, 0, 0, 0.8)"
                  strokeWidth="8"
                />

                {/* Mixer Chassis Lower Bevel (Side / Thickness) */}
                <polygon
                  points="260,390 360,450 360,466 260,406"
                  fill="url(#bevelGrad)"
                  stroke="rgba(255, 255, 255, 0.22)"
                  strokeWidth="1.2"
                />
                <polygon
                  points="360,450 580,320 580,336 360,466"
                  fill="#0c0c0c"
                  stroke="rgba(255, 255, 255, 0.22)"
                  strokeWidth="1.2"
                />

                {/* Mixer Top Face Plate */}
                <polygon
                  points="260,390 480,260 580,320 360,450"
                  fill="url(#chassisGrad)"
                  stroke="url(#wireStroke)"
                  strokeWidth="1.4"
                />

                {/* Top Section Division Line */}
                <line
                  x1="380"
                  y1="320"
                  x2="465"
                  y2="370"
                  stroke="rgba(255, 255, 255, 0.14)"
                  strokeWidth="1"
                />

                {/* 6 Rotary Control Knobs (Left Half) */}
                {[
                  { cx: 315, cy: 370 },
                  { cx: 345, cy: 350 },
                  { cx: 375, cy: 330 },
                  { cx: 340, cy: 395 },
                  { cx: 370, cy: 375 },
                  { cx: 400, cy: 355 },
                ].map((k, idx) => (
                  <g key={`knob-${idx}`}>
                    {/* Knob outer ring */}
                    <ellipse
                      cx={k.cx}
                      cy={k.cy}
                      rx="9"
                      ry="5.5"
                      fill="#181818"
                      stroke="rgba(255, 255, 255, 0.42)"
                      strokeWidth="1"
                    />
                    {/* Knob inner rim */}
                    <ellipse
                      cx={k.cx}
                      cy={k.cy - 2}
                      rx="6.5"
                      ry="4"
                      fill="#222222"
                      stroke="rgba(255, 255, 255, 0.65)"
                      strokeWidth="1"
                    />
                    {/* Knob pointer tick */}
                    <line
                      x1={k.cx}
                      y1={k.cy - 2}
                      x2={k.cx + (idx % 2 === 0 ? 3 : -2)}
                      y2={k.cy - 5}
                      stroke="#EDEDED"
                      strokeWidth="1.2"
                    />
                  </g>
                ))}

                {/* 4 Illuminated Trigger Pads (Sound Pads) */}
                {[
                  { x: 310, y: 418 },
                  { x: 336, y: 403 },
                  { x: 336, y: 432 },
                  { x: 362, y: 417 },
                ].map((p, idx) => (
                  <g key={`pad-${idx}`}>
                    <polygon
                      points={`${p.x},${p.y} ${p.x + 18},${p.y - 11} ${p.x + 32},${p.y - 3} ${p.x + 14},${p.y + 8}`}
                      fill={idx === 0 ? "rgba(255, 255, 255, 0.12)" : "rgba(255, 255, 255, 0.04)"}
                      stroke={idx === 0 ? "rgba(255, 255, 255, 0.75)" : "rgba(255, 255, 255, 0.28)"}
                      strokeWidth="1"
                    />
                  </g>
                ))}

                {/* 6 Vertical Channel Faders with Caps (Right Half) */}
                {[0, 1, 2, 3, 4, 5].map((f) => {
                  const startX = 420 + f * 22;
                  const startY = 370 - f * 13;
                  const endX = 475 + f * 22;
                  const endY = 403 - f * 13;
                  const capPos = 0.25 + (f * 0.12) % 0.6;
                  const capX = startX + (endX - startX) * capPos;
                  const capY = startY + (endY - startY) * capPos;

                  return (
                    <g key={`fader-${f}`}>
                      {/* Fader Track Slot */}
                      <line
                        x1={startX}
                        y1={startY}
                        x2={endX}
                        y2={endY}
                        stroke="rgba(255, 255, 255, 0.25)"
                        strokeWidth="1.8"
                      />
                      {/* Track Ticks */}
                      <line
                        x1={startX - 2}
                        y1={startY - 1}
                        x2={startX + 2}
                        y2={startY + 1}
                        stroke="rgba(255, 255, 255, 0.2)"
                        strokeWidth="1"
                      />
                      <line
                        x1={endX - 2}
                        y1={endY - 1}
                        x2={endX + 2}
                        y2={endY + 1}
                        stroke="rgba(255, 255, 255, 0.2)"
                        strokeWidth="1"
                      />
                      {/* Fader Cap (thumb tab) */}
                      <polygon
                        points={`${capX - 5},${capY - 1} ${capX + 5},${capY - 7} ${capX + 7},${capY - 5} ${capX - 3},${capY + 1}`}
                        fill="#282828"
                        stroke="#EDEDED"
                        strokeWidth="1.2"
                      />
                    </g>
                  );
                })}
              </g>

              {/* ── LAYER 4: "ON AIR" Lightbox Indicator (translateZ: 38px) ── */}
              <g style={{ transform: "translateZ(38px)" }}>
                {/* Lightbox Upright Enclosure */}
                <polygon
                  points="470,140 560,195 560,310 470,255"
                  fill="#0c0c0c"
                  stroke="rgba(255, 255, 255, 0.22)"
                  strokeWidth="1.2"
                />
                {/* Lightbox Side Depth */}
                <polygon
                  points="470,140 458,147 458,262 470,255"
                  fill="#141414"
                  stroke="rgba(255, 255, 255, 0.18)"
                  strokeWidth="1"
                />

                {/* Glowing "ON AIR" Sign Box */}
                <polygon
                  points="480,165 550,207 550,235 480,193"
                  fill="rgba(255, 195, 110, 0.12)"
                  stroke="rgba(255, 210, 130, 0.75)"
                  strokeWidth="1.4"
                  filter="url(#amberGlow)"
                />

                {/* ON AIR Illuminated Text */}
                <text
                  x="512"
                  y="204"
                  fill="#FFF2D6"
                  fontSize="12"
                  fontWeight="bold"
                  letterSpacing="2.5"
                  textAnchor="middle"
                  transform="skewY(30) scale(1, 0.88)"
                  filter="url(#amberGlow)"
                >
                  ON AIR
                </text>

                {/* Lower Acoustic Panel Matrix (2x3) */}
                {[0, 1, 2].map((r) =>
                  [0, 1].map((c) => {
                    const bx = 482 + c * 34;
                    const by = 212 + r * 14 + c * 19;
                    return (
                      <polygon
                        key={`panel-${r}-${c}`}
                        points={`${bx},${by} ${bx + 26},${by + 15} ${bx + 26},${by + 24} ${bx},${by + 9}`}
                        fill="rgba(255, 255, 255, 0.02)"
                        stroke="rgba(255, 255, 255, 0.16)"
                        strokeWidth="0.8"
                      />
                    );
                  })
                )}
              </g>

              {/* ── LAYER 5: Waveform Display Monitor (translateZ: 50px) ── */}
              <g style={{ transform: "translateZ(50px)" }}>
                {/* Monitor Desk Mount Pedestal */}
                <polygon
                  points="250,320 280,302 280,360 250,378"
                  fill="#121212"
                  stroke="rgba(255, 255, 255, 0.25)"
                  strokeWidth="1"
                />
                <polygon
                  points="280,302 305,316 305,374 280,360"
                  fill="#0e0e0e"
                  stroke="rgba(255, 255, 255, 0.18)"
                  strokeWidth="1"
                />

                {/* Monitor Bevel Outer Frame */}
                <polygon
                  points="220,230 330,165 330,285 220,350"
                  fill="#0d0d0d"
                  stroke="rgba(255, 255, 255, 0.38)"
                  strokeWidth="1.4"
                />
                {/* Monitor Screen Inset */}
                <polygon
                  points="228,240 322,185 322,277 228,332"
                  fill="#070a08"
                  stroke="rgba(255, 255, 255, 0.2)"
                  strokeWidth="1"
                />

                {/* ForeignObject: Live Canvas Waveform inside the Isometric Screen */}
                <foreignObject
                  x="228"
                  y="185"
                  width="100"
                  height="145"
                  transform="matrix(0.92, -0.52, 0, 0.88, 30, 160)"
                  className="pointer-events-none"
                >
                  <div className="w-[110px] h-[78px] flex flex-col justify-between p-1 bg-black/50 border border-white/10 rounded-sm">
                    {/* Header */}
                    <div className="flex items-center justify-between text-[7px] font-mono text-white/60">
                      <span className="flex items-center gap-1">
                        <span className="size-1 rounded-full bg-red-500 animate-pulse" />
                        <span>REC</span>
                      </span>
                      <span>48kHz / 24b</span>
                    </div>

                    {/* Canvas Waveform */}
                    <canvas
                      ref={canvasRef}
                      width={104}
                      height={50}
                      className="w-full h-[48px] block"
                    />

                    {/* Footer Meter Ticker */}
                    <div className="flex justify-between text-[6px] font-mono text-white/40">
                      <span>CH 01</span>
                      <span>-12dB FS</span>
                    </div>
                  </div>
                </foreignObject>
              </g>

              {/* ── LAYER 6: Articulated Boom Arm & Broadcast Mic (translateZ: 72px) ── */}
              <g style={{ transform: "translateZ(72px)" }}>
                {/* Base Desk Clamp */}
                <polygon
                  points="160,440 210,410 226,420 176,450"
                  fill="#161616"
                  stroke="rgba(255, 255, 255, 0.35)"
                  strokeWidth="1.2"
                />
                <polygon
                  points="160,440 176,450 176,464 160,454"
                  fill="#0f0f0f"
                  stroke="rgba(255, 255, 255, 0.2)"
                  strokeWidth="1"
                />
                <polygon
                  points="176,450 226,420 226,434 176,464"
                  fill="#0b0b0b"
                  stroke="rgba(255, 255, 255, 0.2)"
                  strokeWidth="1"
                />

                {/* Glowing White Circular LED Indicator on Clamp Base */}
                <circle
                  cx="174"
                  cy="444"
                  r="3.5"
                  fill="#FFFFFF"
                  filter="url(#ledGlow)"
                />
                <circle
                  cx="174"
                  cy="444"
                  r="6"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.5)"
                  strokeWidth="0.8"
                />

                {/* Base Swivel Turret */}
                <ellipse cx="192" cy="422" rx="9" ry="5.5" fill="#121212" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="1" />
                <ellipse cx="192" cy="416" rx="9" ry="5.5" fill="#1c1c1c" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="1" />
                <line x1="192" y1="416" x2="192" y2="400" stroke="url(#armStroke)" strokeWidth="4" strokeLinecap="round" />

                {/* Lower Articulated Arm Segment (Twin Parallel Tubes) */}
                <line x1="190" y1="400" x2="190" y2="240" stroke="url(#armStroke)" strokeWidth="2.8" strokeLinecap="round" />
                <line x1="196" y1="400" x2="196" y2="240" stroke="url(#armStroke)" strokeWidth="2.8" strokeLinecap="round" />
                
                {/* Cross Reinforcement Pins */}
                <line x1="190" y1="360" x2="196" y2="360" stroke="#EDEDED" strokeWidth="1" />
                <line x1="190" y1="300" x2="196" y2="300" stroke="#EDEDED" strokeWidth="1" />

                {/* Center Elbow Hinge Pivot Joint */}
                <circle cx="193" cy="236" r="9" fill="#141414" stroke="rgba(255, 255, 255, 0.6)" strokeWidth="1.4" />
                <circle cx="193" cy="236" r="3.5" fill="#2a2a2a" stroke="#EDEDED" strokeWidth="1" />

                {/* Upper Boom Arm (Angling Down Towards Mic) */}
                <line x1="195" y1="234" x2="310" y2="152" stroke="url(#armStroke)" strokeWidth="3" strokeLinecap="round" />
                <line x1="199" y1="239" x2="314" y2="157" stroke="url(#armStroke)" strokeWidth="2.2" strokeLinecap="round" />

                {/* Cable Wrap around upper arm */}
                <path
                  d="M 193,246 Q 230,220 248,198 Q 280,180 312,154"
                  stroke="rgba(255, 255, 255, 0.2)"
                  strokeWidth="1.8"
                  fill="none"
                />

                {/* Mic Pivot Joint / Yoke Mount */}
                <circle cx="313" cy="154" r="8" fill="#181818" stroke="#EDEDED" strokeWidth="1.2" />
                <line x1="313" y1="154" x2="334" y2="182" stroke="url(#armStroke)" strokeWidth="3.2" />

                {/* Suspension Yoke Fork Bracket */}
                <path
                  d="M 326,170 C 334,165 348,172 352,185 L 358,206"
                  stroke="rgba(255, 255, 255, 0.55)"
                  strokeWidth="2"
                  fill="none"
                />

                {/* Broadcast Microphone (Shure SM7B Style) */}
                {/* Angled at ~45 degrees pointing forward-down */}
                <g transform="translate(340, 180) rotate(42)">
                  {/* Rear XLR Connector & Cable Entry */}
                  <line x1="-30" y1="0" x2="-18" y2="0" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="3" />
                  <rect x="-18" y="-7" width="8" height="14" rx="2" fill="#181818" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />

                  {/* Main Microphone Metal Chassis Body */}
                  <rect
                    x="-10"
                    y="-12"
                    width="44"
                    height="24"
                    rx="3"
                    fill="#121212"
                    stroke="#EDEDED"
                    strokeWidth="1.4"
                  />

                  {/* Body Wireframe Ribs / Longitudinal Rings */}
                  <line x1="0" y1="-12" x2="0" y2="12" stroke="rgba(255, 255, 255, 0.35)" strokeWidth="1" />
                  <line x1="12" y1="-12" x2="12" y2="12" stroke="rgba(255, 255, 255, 0.35)" strokeWidth="1" />
                  <line x1="24" y1="-12" x2="24" y2="12" stroke="rgba(255, 255, 255, 0.35)" strokeWidth="1" />
                  <line x1="-10" y1="0" x2="34" y2="0" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1" strokeDasharray="3 3" />

                  {/* Foam Windscreen / Acoustic Grille Front Capsule */}
                  <path
                    d="M 34,-11 C 46,-10 60,-6 64,0 C 60,6 46,10 34,11 Z"
                    fill="#1e1e1e"
                    stroke="#EDEDED"
                    strokeWidth="1.4"
                  />
                  {/* Windscreen faceted acoustic lines */}
                  <ellipse cx="44" cy="0" rx="4" ry="8" fill="none" stroke="rgba(255, 255, 255, 0.35)" strokeWidth="1" />
                  <ellipse cx="54" cy="0" rx="3" ry="5" fill="none" stroke="rgba(255, 255, 255, 0.35)" strokeWidth="1" />
                </g>
              </g>
            </svg>
          </div>
        </div>

        {/* RIGHT: Hero Copy & CTA */}
        <div className="lg:col-span-5 xl:col-span-5 flex flex-col justify-center items-start lg:pl-6 space-y-6 sm:space-y-7">
          {/* Meta / Index Tag */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-xs sm:text-sm font-mono tracking-[0.2em] text-[#7E7E7E]"
          >
            02 / 09
          </motion.div>

          {/* Main Heading: "Every Word, Kept Warm" style */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="space-y-1"
          >
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-bold tracking-tight text-[#EDEDED] leading-[1.08]">
              Every Word,<br />Kept Warm
            </h1>
          </motion.div>

          {/* Subtext / Body: Muted gray, light weight, concise leading */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-sm sm:text-base text-[#858585] font-normal leading-relaxed max-w-md"
          >
            Studio capture for people who record in the room they actually live in.
          </motion.p>

          {/* Primary CTA: Pill button with white bg, black text, right arrow */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="pt-2"
          >
            <button
              onClick={handleCtaClick}
              className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#FFFFFF] text-[#000000] font-medium text-xs sm:text-sm tracking-tight hover:bg-[#EAEAEA] hover:shadow-[0_0_28px_rgba(255,255,255,0.3)] transition-all cursor-pointer"
            >
              <span>Configure a studio</span>
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>
        </div>
      </div>

      {/* Bottom-left Hint: "— MOVE TO ORBIT" */}
      <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-10 z-20 flex items-center gap-2 text-[11px] font-mono tracking-[0.25em] text-[#666666] uppercase pointer-events-none">
        <span>— MOVE TO ORBIT</span>
      </div>

      {/* Interactive Studio Configurator Drawer Modal */}
      <AnimatePresence>
        {configOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setConfigOpen(false)}
              className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg bg-[#0e0e0e] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-[#EDEDED]"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#888888]">
                    CATHODE STUDIO ARCHITECTURE
                  </span>
                  <h3 className="text-xl font-bold tracking-tight text-[#EDEDED]">
                    Configure Your Studio
                  </h3>
                </div>
                <button
                  onClick={() => setConfigOpen(false)}
                  className="p-2 rounded-full border border-white/10 hover:border-white/30 text-white/60 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="size-4" />
                </button>
              </div>

              {/* Options */}
              <div className="space-y-4">
                {/* 1. Microphone Module */}
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-white/50 flex items-center gap-1.5">
                    <Mic className="size-3.5 text-white/80" />
                    <span>Transducer Module</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { name: "Cathode SM-7 Dynamic", spec: "Directional cardioid" },
                      { name: "Cathode RE-20 Capsule", spec: "Zero proximity effect" },
                    ].map((mic) => (
                      <button
                        key={mic.name}
                        onClick={() => {
                          sound.playClick();
                          setSelectedMic(mic.name);
                        }}
                        className={`p-3 rounded-2xl text-left border text-xs transition-all cursor-pointer ${
                          selectedMic === mic.name
                            ? "bg-white/10 border-white text-white font-medium shadow-sm"
                            : "bg-white/3 border-white/10 text-white/60 hover:border-white/20"
                        }`}
                      >
                        <div className="font-semibold">{mic.name}</div>
                        <div className="text-[11px] text-white/40">{mic.spec}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Boom Arm Mount */}
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-white/50 flex items-center gap-1.5">
                    <Radio className="size-3.5 text-white/80" />
                    <span>Mechanical Suspension</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { name: "Articulated Low-Profile Arm", spec: "Internal gas spring" },
                      { name: "Overhead Heavy Counterweight", spec: "Dual broadcast swivel" },
                    ].map((arm) => (
                      <button
                        key={arm.name}
                        onClick={() => {
                          sound.playClick();
                          setSelectedArm(arm.name);
                        }}
                        className={`p-3 rounded-2xl text-left border text-xs transition-all cursor-pointer ${
                          selectedArm === arm.name
                            ? "bg-white/10 border-white text-white font-medium shadow-sm"
                            : "bg-white/3 border-white/10 text-white/60 hover:border-white/20"
                        }`}
                      >
                        <div className="font-semibold">{arm.name}</div>
                        <div className="text-[11px] text-white/40">{arm.spec}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Audio Console Deck */}
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-white/50 flex items-center gap-1.5">
                    <Sliders className="size-3.5 text-white/80" />
                    <span>DSP Audio Surface</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { name: "Hexa-Fader DSP Mixer", spec: "6 motorized faders" },
                      { name: "Compact Quad Interface", spec: "Zero-latency monitor" },
                    ].map((deck) => (
                      <button
                        key={deck.name}
                        onClick={() => {
                          sound.playClick();
                          setSelectedDeck(deck.name);
                        }}
                        className={`p-3 rounded-2xl text-left border text-xs transition-all cursor-pointer ${
                          selectedDeck === deck.name
                            ? "bg-white/10 border-white text-white font-medium shadow-sm"
                            : "bg-white/3 border-white/10 text-white/60 hover:border-white/20"
                        }`}
                      >
                        <div className="font-semibold">{deck.name}</div>
                        <div className="text-[11px] text-white/40">{deck.spec}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center justify-between gap-3 border-t border-white/10">
                <span className="text-xs font-mono text-white/50">
                  Ready to deploy
                </span>
                <button
                  onClick={() => {
                    sound.playPop();
                    setConfigOpen(false);
                    const el = document.getElementById("contact");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="px-5 py-2.5 rounded-full bg-white text-black font-semibold text-xs tracking-tight hover:bg-neutral-200 transition-colors cursor-pointer"
                >
                  Lock In & Transmit
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
