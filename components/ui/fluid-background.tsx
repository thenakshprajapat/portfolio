"use client";

import { useEffect, useRef } from "react";

interface Pulse {
  x: number;
  y: number;
  radius: number;
  alpha: number;
}

export function FluidBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let W = window.innerWidth;
    let H = window.innerHeight;
    let targetX = W * 0.5;
    let targetY = H * 0.4;
    let currentX = targetX;
    let currentY = targetY;
    let time = 0;
    let raf = 0;
    const pulses: Pulse[] = [];

    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
    };
    resize();

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const onMouseDown = (e: MouseEvent) => {
      if (prefersReducedMotion) return;
      pulses.push({
        x: e.clientX,
        y: e.clientY,
        radius: 10,
        alpha: 0.7,
      });
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches[0]) {
        targetX = e.touches[0].clientX;
        targetY = e.touches[0].clientY;
        if (!prefersReducedMotion) {
          pulses.push({
            x: e.touches[0].clientX,
            y: e.touches[0].clientY,
            radius: 10,
            alpha: 0.7,
          });
        }
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("resize", resize, { passive: true });

    const SPACING = 64;

    const renderFrame = () => {
      time += 0.012;
      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;

      // Deep near-black background fill
      ctx.fillStyle = "#040404";
      ctx.fillRect(0, 0, W, H);

      // 1. Soft cursor-following ambient circular aura
      const auraGrad = ctx.createRadialGradient(
        currentX,
        currentY,
        0,
        currentX,
        currentY,
        Math.min(W, H) * 0.45
      );
      auraGrad.addColorStop(0, "rgba(255, 90, 31, 0.045)");
      auraGrad.addColorStop(0.5, "rgba(255, 90, 31, 0.015)");
      auraGrad.addColorStop(1, "rgba(4, 4, 4, 0)");
      ctx.fillStyle = auraGrad;
      ctx.fillRect(0, 0, W, H);

      // 2. Fluid organic circular wave rings that breathe and drift gently
      const ringCount = 3;
      for (let idx = 0; idx < ringCount; idx++) {
        const baseR = Math.min(W, H) * (0.18 + idx * 0.13);
        const centerX = W * 0.5 + (currentX - W * 0.5) * (0.18 - idx * 0.04) + Math.cos(time * 0.7 + idx) * 28;
        const centerY = H * 0.45 + (currentY - H * 0.45) * (0.18 - idx * 0.04) + Math.sin(time * 0.6 + idx) * 22;

        ctx.beginPath();
        const steps = 90;
        for (let s = 0; s <= steps; s++) {
          const angle = (s / steps) * Math.PI * 2;
          const wave =
            Math.sin(angle * 3 + time * 1.4 + idx) * 12 +
            Math.cos(angle * 5 - time * 1.1) * 7;
          const r = baseR + wave;
          const px = centerX + Math.cos(angle) * r;
          const py = centerY + Math.sin(angle) * r;
          if (s === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.strokeStyle =
          idx === 0
            ? "rgba(255, 90, 31, 0.09)"
            : idx === 1
            ? "rgba(255, 90, 31, 0.05)"
            : "rgba(236, 234, 228, 0.035)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // 3. Interactive grid of 0s and 1s
      const cols = Math.ceil(W / SPACING) + 1;
      const rows = Math.ceil(H / SPACING) + 1;

      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = '400 10px "JetBrains Mono", monospace';

      for (let r = 0; r < rows; r++) {
        const baseY = r * SPACING;
        for (let c = 0; c < cols; c++) {
          const baseX = c * SPACING;
          const dx = baseX - currentX;
          const dy = baseY - currentY;
          const dist = Math.hypot(dx, dy);

          const proximity = Math.max(0, 1 - dist / 200);

          let pulseBoost = 0;
          for (let i = 0; i < pulses.length; i++) {
            const p = pulses[i];
            const pDist = Math.abs(Math.hypot(baseX - p.x, baseY - p.y) - p.radius);
            if (pDist < 36) {
              pulseBoost = Math.max(pulseBoost, (1 - pDist / 36) * p.alpha);
            }
          }

          const intensity = Math.min(1, proximity * 0.8 + pulseBoost);

          const shiftFactor = prefersReducedMotion ? 0 : proximity * 3.5;
          const angle = Math.atan2(dy, dx);
          const x = baseX + Math.cos(angle) * shiftFactor;
          const y = baseY + Math.sin(angle) * shiftFactor;

          const baseBit = ((r * 31 + c * 17) & 1) === 0 ? "0" : "1";
          const bit = intensity > 0.45 ? (baseBit === "0" ? "1" : "0") : baseBit;

          if (intensity > 0.08) {
            ctx.fillStyle = `rgba(255, 90, 31, ${(0.14 + intensity * 0.55).toFixed(3)})`;
            ctx.fillText(bit, x, y);
          } else {
            ctx.fillStyle = "rgba(236, 234, 228, 0.045)";
            ctx.fillText(bit, x, y);
          }
        }
      }

      // 4. Expanding circular click ripples
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        ctx.strokeStyle = `rgba(255, 90, 31, ${(p.alpha * 0.35).toFixed(3)})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.stroke();

        p.radius += 5;
        p.alpha *= 0.94;
        if (p.alpha < 0.02) {
          pulses.splice(i, 1);
        }
      }

      if (!prefersReducedMotion) {
        raf = requestAnimationFrame(renderFrame);
      }
    };

    renderFrame();

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none"
    />
  );
}
