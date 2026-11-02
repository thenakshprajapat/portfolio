"use client";

import React, { useEffect, useRef, useState } from "react";

const INDIA_COORDS: [number, number][] = [
  [34.5, 74.5], [33.0, 76.5], [31.2, 75.8], [29.8, 77.5],
  [28.6, 77.2], [26.91, 75.78], // Jaipur
  [27.1, 72.0], [24.8, 71.2], [23.0, 69.6], [21.5, 70.2],
  [21.1, 72.8], [19.07, 72.87], [17.4, 73.3], [15.4, 73.8],
  [12.9, 74.8], [10.0, 76.2], [8.08, 77.53],
  [9.9, 78.1], [11.9, 79.8], [13.08, 80.27], [15.8, 80.4],
  [17.7, 83.3], [19.8, 85.8], [21.5, 87.3], [22.57, 88.36],
  [24.8, 88.0], [26.1, 89.8], [26.2, 91.7], [27.5, 94.2],
  [25.6, 93.8], [24.0, 91.8], [26.8, 84.5], [28.2, 81.2],
  [25.3, 82.9], [23.2, 77.4], [21.1, 79.0], [17.38, 78.48],
  [12.97, 77.59], [18.52, 73.85], [23.02, 72.57], [26.84, 80.94],
  [25.59, 85.13], [30.73, 76.77],
];

const JAIPUR_LAT = 26.9124;
const JAIPUR_LON = 75.7873;

function latLonToXYZ(latDeg: number, lonDeg: number, radius: number) {
  const lat = (latDeg * Math.PI) / 180;
  const lon = (lonDeg * Math.PI) / 180;
  return {
    x: radius * Math.cos(lat) * Math.sin(lon),
    y: -radius * Math.sin(lat),
    z: radius * Math.cos(lat) * Math.cos(lon),
  };
}

function rotatePoint(
  p: { x: number; y: number; z: number },
  rotX: number,
  rotY: number
) {
  const cosY = Math.cos(rotY);
  const sinY = Math.sin(rotY);
  const x1 = p.x * cosY + p.z * sinY;
  const z1 = -p.x * sinY + p.z * cosY;

  const cosX = Math.cos(rotX);
  const sinX = Math.sin(rotX);
  const y2 = p.y * cosX - z1 * sinX;
  const z2 = p.y * sinX + z1 * cosX;

  return { x: x1, y: y2, z: z2 };
}

export function IndiaGlobe3D() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const check = () => {
      const reduced =
        window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
        document.documentElement.classList.contains("reduce-motion");
      setReducedMotion(reduced);
    };
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId = 0;
    let mouseTargetX = 0;
    let mouseTargetY = 0;
    let mouseCurrentX = 0;
    let mouseCurrentY = 0;
    let spinOffset = 0;

    const updateTargetFromClient = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      mouseTargetX = Math.max(-1, Math.min(1, (clientX - cx) / (rect.width * 0.6)));
      mouseTargetY = Math.max(-1, Math.min(1, (clientY - cy) / (rect.height * 0.6)));
    };

    const handleMouseMove = (e: MouseEvent) => {
      updateTargetFromClient(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        updateTargetFromClient(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    canvas.addEventListener("touchmove", handleTouchMove, { passive: true });

    const render = () => {
      const W = canvas.width;
      const H = canvas.height;
      const cx = W / 2;
      const cy = H / 2;
      const R = Math.min(W, H) * 0.39;

      mouseCurrentX += (mouseTargetX - mouseCurrentX) * 0.07;
      mouseCurrentY += (mouseTargetY - mouseCurrentY) * 0.07;
      spinOffset += 0.003;

      const baseRotY = -(76 * Math.PI) / 180 + Math.sin(spinOffset) * 0.22 + mouseCurrentX * 0.55;
      const baseRotX = (20 * Math.PI) / 180 + Math.cos(spinOffset * 0.7) * 0.08 + mouseCurrentY * 0.35;

      ctx.clearRect(0, 0, W, H);

      // Outer globe rim
      ctx.strokeStyle = "rgba(236, 234, 228, 0.14)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.stroke();

      // Latitude parallels
      for (let lat = -60; lat <= 60; lat += 20) {
        ctx.beginPath();
        let started = false;
        for (let lon = -180; lon <= 180; lon += 6) {
          const p3 = rotatePoint(latLonToXYZ(lat, lon, R), baseRotX, baseRotY);
          if (p3.z > -R * 0.05) {
            const sx = cx + p3.x;
            const sy = cy + p3.y;
            if (!started) {
              ctx.moveTo(sx, sy);
              started = true;
            } else {
              ctx.lineTo(sx, sy);
            }
          } else {
            started = false;
          }
        }
        ctx.strokeStyle =
          lat === 20
            ? "rgba(255, 90, 31, 0.22)"
            : "rgba(236, 234, 228, 0.08)";
        ctx.stroke();
      }

      // Longitude meridians
      for (let lon = -180; lon < 180; lon += 20) {
        ctx.beginPath();
        let started = false;
        for (let lat = -80; lat <= 80; lat += 6) {
          const p3 = rotatePoint(latLonToXYZ(lat, lon, R), baseRotX, baseRotY);
          if (p3.z > -R * 0.05) {
            const sx = cx + p3.x;
            const sy = cy + p3.y;
            if (!started) {
              ctx.moveTo(sx, sy);
              started = true;
            } else {
              ctx.lineTo(sx, sy);
            }
          } else {
            started = false;
          }
        }
        ctx.strokeStyle =
          lon === 80
            ? "rgba(255, 90, 31, 0.22)"
            : "rgba(236, 234, 228, 0.08)";
        ctx.stroke();
      }

      // Tilted orbital ring
      ctx.beginPath();
      for (let a = 0; a <= 360; a += 5) {
        const rad = (a * Math.PI) / 180;
        const orbitR = R * 1.18;
        const ox = orbitR * Math.cos(rad);
        const oy = orbitR * Math.sin(rad) * 0.34;
        const oz = orbitR * Math.sin(rad) * 0.92;
        const p3 = rotatePoint({ x: ox, y: oy, z: oz }, baseRotX * 0.5, mouseCurrentX * 0.3);
        const sx = cx + p3.x;
        const sy = cy + p3.y;
        if (a === 0) ctx.moveTo(sx, sy);
        else ctx.lineTo(sx, sy);
      }
      ctx.strokeStyle = "rgba(255, 90, 31, 0.26)";
      ctx.setLineDash([3, 5]);
      ctx.stroke();
      ctx.setLineDash([]);

      // India subcontinent mesh
      const projectedIndia: { x: number; y: number; z: number }[] = [];
      for (let i = 0; i < INDIA_COORDS.length; i++) {
        const [lat, lon] = INDIA_COORDS[i];
        const p3 = rotatePoint(latLonToXYZ(lat, lon, R), baseRotX, baseRotY);
        if (p3.z > 0) {
          projectedIndia.push({ x: cx + p3.x, y: cy + p3.y, z: p3.z });
        }
      }

      ctx.strokeStyle = "rgba(255, 90, 31, 0.42)";
      ctx.lineWidth = 1;
      for (let i = 0; i < projectedIndia.length; i++) {
        for (let j = i + 1; j < projectedIndia.length; j++) {
          const dist = Math.hypot(
            projectedIndia[i].x - projectedIndia[j].x,
            projectedIndia[i].y - projectedIndia[j].y
          );
          if (dist < R * 0.26) {
            ctx.beginPath();
            ctx.moveTo(projectedIndia[i].x, projectedIndia[i].y);
            ctx.lineTo(projectedIndia[j].x, projectedIndia[j].y);
            ctx.stroke();
          }
        }
      }

      for (const pt of projectedIndia) {
        ctx.fillStyle = "rgba(236, 234, 228, 0.75)";
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // Jaipur Pin
      const jaipur3D = rotatePoint(
        latLonToXYZ(JAIPUR_LAT, JAIPUR_LON, R),
        baseRotX,
        baseRotY
      );
      if (jaipur3D.z > 0) {
        const jx = cx + jaipur3D.x;
        const jy = cy + jaipur3D.y;
        const pulseR = 6 + ((Math.sin(spinOffset * 16) + 1) * 0.5) * 8;

        ctx.strokeStyle = "rgba(255, 90, 31, 0.65)";
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(jx, jy, pulseR, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = "#FF5A1F";
        ctx.beginPath();
        ctx.arc(jx, jy, 3.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "rgba(255, 90, 31, 0.9)";
        ctx.font = '500 10px "JetBrains Mono", monospace';
        ctx.fillText("Jaipur", jx + 10, jy + 3);
      }

      rafId = requestAnimationFrame(render);
    };

    render();
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("touchmove", handleTouchMove);
    };
  }, [reducedMotion]);

  if (reducedMotion) {
    return (
      <div className="w-full py-6 flex items-center justify-center">
        <svg
          viewBox="0 0 160 160"
          role="img"
          aria-label="Wireframe globe centered on Jaipur, India"
          className="size-36"
        >
          <circle
            cx="80"
            cy="80"
            r="64"
            fill="none"
            stroke="rgba(236,234,228,0.16)"
            strokeWidth="1"
          />
          <ellipse
            cx="80"
            cy="80"
            rx="64"
            ry="24"
            fill="none"
            stroke="rgba(236,234,228,0.1)"
            strokeWidth="1"
          />
          <ellipse
            cx="80"
            cy="80"
            rx="30"
            ry="64"
            fill="none"
            stroke="rgba(255,90,31,0.3)"
            strokeWidth="1"
          />
          <circle cx="92" cy="62" r="4" fill="#FF5A1F" />
          <circle
            cx="92"
            cy="62"
            r="10"
            fill="none"
            stroke="#FF5A1F"
            strokeWidth="1"
          />
        </svg>
      </div>
    );
  }

  return (
    <div className="w-full h-64 sm:h-80 flex items-center justify-center">
      <canvas
        ref={canvasRef}
        width={420}
        height={320}
        aria-label="Interactive 3D wireframe globe centered on Jaipur, India"
        className="w-full h-full object-contain touch-pan-y"
      />
    </div>
  );
}
