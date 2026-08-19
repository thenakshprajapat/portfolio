"use client";

import { useEffect, useRef } from "react";

interface Blob {
  x: number;
  y: number;
  vx: number;
  vy: number;
  tx: number;
  ty: number;
  r: number;
  r0: string; // inner color stop
  r1: string; // outer color stop
  springK: number;
  damp: number;
  driftX: number;
  driftY: number;
}

export function FluidBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let W = window.innerWidth;
    let H = window.innerHeight;
    let mx = W * 0.5;
    let my = H * 0.4;
    let raf = 0;

    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
    };
    resize();

    // Soothing deep cyan, indigo, and subtle violet ambient fluid blobs
    const blobs: Blob[] = [
      {
        x: W * 0.5, y: H * 0.4,
        vx: 0, vy: 0,
        tx: W * 0.5, ty: H * 0.4,
        r: Math.min(W, H) * 0.5,
        r0: "rgba(56, 189, 248, 0.12)",
        r1: "rgba(56, 189, 248, 0)",
        springK: 0.05, damp: 0.88,
        driftX: 0, driftY: 0,
      },
      {
        x: W * 0.52, y: H * 0.45,
        vx: 0, vy: 0,
        tx: W * 0.5, ty: H * 0.4,
        r: Math.min(W, H) * 0.4,
        r0: "rgba(129, 140, 248, 0.12)",
        r1: "rgba(129, 140, 248, 0)",
        springK: 0.035, damp: 0.92,
        driftX: 0, driftY: 0,
      },
      {
        x: W * 0.15, y: H * 0.75,
        vx: 0.2, vy: -0.15,
        tx: 0, ty: 0,
        r: Math.min(W, H) * 0.45,
        r0: "rgba(30, 58, 138, 0.14)",
        r1: "rgba(30, 58, 138, 0)",
        springK: 0, damp: 1,
        driftX: 0.2, driftY: -0.15,
      },
      {
        x: W * 0.85, y: H * 0.25,
        vx: -0.18, vy: 0.22,
        tx: 0, ty: 0,
        r: Math.min(W, H) * 0.4,
        r0: "rgba(14, 116, 144, 0.12)",
        r1: "rgba(14, 116, 144, 0)",
        springK: 0, damp: 1,
        driftX: -0.18, driftY: 0.22,
      },
      {
        x: W * 0.45, y: H * 0.9,
        vx: 0.1, vy: -0.2,
        tx: 0, ty: 0,
        r: Math.min(W, H) * 0.35,
        r0: "rgba(52, 211, 153, 0.08)",
        r1: "rgba(52, 211, 153, 0)",
        springK: 0, damp: 1,
        driftX: 0.1, driftY: -0.2,
      },
    ];

    const onMouseMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) {
        mx = e.touches[0].clientX;
        my = e.touches[0].clientY;
      }
    };

    document.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("resize", resize, { passive: true });

    function tick() {
      ctx!.clearRect(0, 0, W, H);

      blobs.forEach((b, i) => {
        if (i < 2) {
          b.tx = mx;
          b.ty = my;
          const dx = b.tx - b.x;
          const dy = b.ty - b.y;
          b.vx = b.vx * b.damp + dx * b.springK;
          b.vy = b.vy * b.damp + dy * b.springK;
          b.x += b.vx;
          b.y += b.vy;
        } else {
          b.x += b.vx;
          b.y += b.vy;
          if (b.x < -b.r * 0.5) { b.x = -b.r * 0.5; b.vx = Math.abs(b.driftX); }
          if (b.x > W + b.r * 0.5) { b.x = W + b.r * 0.5; b.vx = -Math.abs(b.driftX); }
          if (b.y < -b.r * 0.5) { b.y = -b.r * 0.5; b.vy = Math.abs(b.driftY); }
          if (b.y > H + b.r * 0.5) { b.y = H + b.r * 0.5; b.vy = -Math.abs(b.driftY); }
        }

        const grad = ctx!.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
        grad.addColorStop(0, b.r0);
        grad.addColorStop(0.5, b.r0.replace(/[\d.]+\)$/, "0.04)"));
        grad.addColorStop(1, b.r1);

        ctx!.beginPath();
        ctx!.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx!.fillStyle = grad;
        ctx!.fill();
      });

      raf = requestAnimationFrame(tick);
    }

    tick();

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ filter: "blur(60px)", opacity: 0.9 }}
    />
  );
}
