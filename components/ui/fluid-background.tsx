"use client";

import { useEffect, useRef } from "react";

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

    // 4 ambient emerald & mint glowing light centers
    const lights = [
      { x: W * 0.5, y: H * 0.35, vx: 0, vy: 0, r: Math.min(W, H) * 0.45, color: "rgba(16, 185, 129, 0.07)", targetLag: 0.04 },
      { x: W * 0.45, y: H * 0.4, vx: 0, vy: 0, r: Math.min(W, H) * 0.38, color: "rgba(52, 211, 153, 0.05)", targetLag: 0.02 },
      { x: W * 0.8, y: H * 0.2, vx: -0.15, vy: 0.1, r: Math.min(W, H) * 0.35, color: "rgba(20, 184, 166, 0.06)", targetLag: 0 },
      { x: W * 0.2, y: H * 0.8, vx: 0.12, vy: -0.1, r: Math.min(W, H) * 0.35, color: "rgba(5, 150, 105, 0.05)", targetLag: 0 },
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

      lights.forEach((l) => {
        if (l.targetLag > 0) {
          l.x += (mx - l.x) * l.targetLag;
          l.y += (my - l.y) * l.targetLag;
        } else {
          l.x += l.vx;
          l.y += l.vy;
          if (l.x < -l.r * 0.5) { l.x = -l.r * 0.5; l.vx = Math.abs(l.vx); }
          if (l.x > W + l.r * 0.5) { l.x = W + l.r * 0.5; l.vx = -Math.abs(l.vx); }
          if (l.y < -l.r * 0.5) { l.y = -l.r * 0.5; l.vy = Math.abs(l.vy); }
          if (l.y > H + l.r * 0.5) { l.y = H + l.r * 0.5; l.vy = -Math.abs(l.vy); }
        }

        const grad = ctx!.createRadialGradient(l.x, l.y, 0, l.x, l.y, l.r);
        grad.addColorStop(0, l.color);
        grad.addColorStop(1, "rgba(0,0,0,0)");

        ctx!.beginPath();
        ctx!.arc(l.x, l.y, l.r, 0, Math.PI * 2);
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
      style={{ filter: "blur(60px)", opacity: 0.95 }}
    />
  );
}
