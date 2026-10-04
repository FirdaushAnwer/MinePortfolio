"use client";

import { useEffect, useRef } from "react";

export default function FuturisticOrb() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let angleX = 0;
    let angleY = 0;
    let angleZ = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    // Generate rings with 3D spherical points
    const ringCount = 5;
    const pointsPerRing = 48;
    const radius = 135;

    const render = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const centerX = width / 2;
      const centerY = height / 2;

      ctx.clearRect(0, 0, width, height);

      // Slow rotation
      angleX += 0.003;
      angleY += 0.005;
      angleZ += 0.002;

      // Draw subtle core red glow
      const gradient = ctx.createRadialGradient(
        centerX,
        centerY,
        10,
        centerX,
        centerY,
        radius * 1.3
      );
      gradient.addColorStop(0, "rgba(227, 27, 35, 0.22)");
      gradient.addColorStop(0.5, "rgba(227, 27, 35, 0.06)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 1.3, 0, Math.PI * 2);
      ctx.fill();

      // Draw geometric rings in 3D perspective
      for (let r = 0; r < ringCount; r++) {
        const ringAngleOffset = (r * Math.PI) / ringCount;
        ctx.beginPath();

        let firstPoint = true;

        for (let i = 0; i <= pointsPerRing; i++) {
          const theta = (i * 2 * Math.PI) / pointsPerRing;

          // 3D coordinates on tilted ring
          const x0 = radius * Math.cos(theta);
          const y0 = radius * Math.sin(theta) * Math.cos(ringAngleOffset);
          const z0 = radius * Math.sin(theta) * Math.sin(ringAngleOffset);

          // Apply rotation X
          const y1 = y0 * Math.cos(angleX) - z0 * Math.sin(angleX);
          const z1 = y0 * Math.sin(angleX) + z0 * Math.cos(angleX);

          // Apply rotation Y
          const x2 = x0 * Math.cos(angleY) + z1 * Math.sin(angleY);
          const z2 = -x0 * Math.sin(angleY) + z1 * Math.cos(angleY);

          // Perspective projection
          const fov = 380;
          const scale = fov / (fov + z2);
          const projX = centerX + x2 * scale;
          const projY = centerY + y1 * scale;

          if (firstPoint) {
            ctx.moveTo(projX, projY);
            firstPoint = false;
          } else {
            ctx.lineTo(projX, projY);
          }

          // Draw small technical nodes at certain vertices
          if (i % 6 === 0) {
            const alpha = Math.max(0.1, (z2 + radius) / (2 * radius));
            ctx.save();
            ctx.fillStyle = r === 1 ? `rgba(255, 59, 48, ${alpha})` : `rgba(255, 255, 255, ${alpha * 0.8})`;
            ctx.beginPath();
            ctx.arc(projX, projY, 1.8 * scale, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          }
        }

        ctx.strokeStyle =
          r === 0
            ? "rgba(227, 27, 35, 0.45)"
            : r === 2
            ? "rgba(255, 255, 255, 0.22)"
            : "rgba(255, 255, 255, 0.12)";
        ctx.lineWidth = r === 0 ? 1.5 : 1;
        ctx.stroke();
      }

      // Draw outer equatorial HUD markers
      ctx.strokeStyle = "rgba(227, 27, 35, 0.18)";
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 12]);
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 1.25, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center pointer-events-none select-none">
      <canvas
        ref={canvasRef}
        className="w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] lg:w-[480px] lg:h-[480px]"
        aria-hidden="true"
      />
    </div>
  );
}
