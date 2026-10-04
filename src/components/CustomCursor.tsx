"use client";

import { useEffect, useRef, useState } from "react";

interface ThrusterSpark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  size: number;
}

export default function CustomCursor() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  useEffect(() => {
    // Check if device supports hover and fine pointer (desktop)
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!mediaQuery.matches || reducedMotionQuery.matches) {
      setIsTouchDevice(true);
      return;
    }

    setIsTouchDevice(false);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isTouchDevice || !mounted) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = false;
    let cursorType: "default" | "pointer" | "project" = "default";
    let isMouseDown = false;

    // Actual mouse target coordinates
    let mouseX = -100;
    let mouseY = -100;

    // Robot companion physics state
    let robotX = -100;
    let robotY = -100;
    let vx = 0;
    let vy = 0;
    let tilt = 0;

    // Animation clocks & expressions
    let time = 0;
    let blinkTimer = 0;
    let isBlinking = false;
    let antennaPulse = 0;
    let happySquish = 1;

    // Thruster exhaust particle system
    const sparks: ThrusterSpark[] = [];

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        robotX = mouseX + 22;
        robotY = mouseY - 22;
      }

      // Check hover targets
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const projectEl = target.closest("[data-cursor='project']");
      const buttonEl = target.closest(
        "button, a, input, select, textarea, [role='button'], [data-cursor='pointer']"
      );

      if (projectEl) {
        cursorType = "project";
      } else if (buttonEl) {
        cursorType = "pointer";
      } else {
        cursorType = "default";
      }
    };

    const handleMouseDown = () => {
      isMouseDown = true;
      happySquish = 0.78;
    };

    const handleMouseUp = () => {
      isMouseDown = false;
      happySquish = 1.15;
    };

    const handleMouseLeave = () => {
      isVisible = false;
    };

    const handleMouseEnter = () => {
      isVisible = true;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // Main 60-120fps Render Loop
    const render = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      ctx.clearRect(0, 0, width, height);

      if (isVisible) {
        time += 0.05;
        antennaPulse += 0.1;

        // Reset squish smoothly
        happySquish += (1 - happySquish) * 0.15;

        // Blinking logic: Blinks every ~3.5 seconds
        blinkTimer += 1;
        if (blinkTimer > 180) {
          isBlinking = true;
          if (blinkTimer > 192) {
            isBlinking = false;
            blinkTimer = Math.random() * 40; // reset with slight variance
          }
        }

        // Target offset: Floating gently to the upper-right of mouse pointer
        // When inspecting a project, the robot gets closer to scan it
        const targetOffsetX = cursorType === "project" ? 36 : 24;
        const targetOffsetY = cursorType === "project" ? -34 : -26;

        // Organic hover oscillation (breathing / anti-grav bobbing)
        const hoverBobY = Math.sin(time * 3) * 4;
        const hoverBobX = Math.cos(time * 2) * 2;

        const targetX = mouseX + targetOffsetX + hoverBobX;
        const targetY = mouseY + targetOffsetY + hoverBobY;

        // Smooth physics inertia (spring follow)
        const spring = cursorType === "pointer" ? 0.22 : 0.16;
        const damping = 0.72;

        const ax = (targetX - robotX) * spring;
        const ay = (targetY - robotY) * spring;

        vx = (vx + ax) * damping;
        vy = (vy + ay) * damping;

        robotX += vx;
        robotY += vy;

        // Dynamic banking tilt when flying left/right
        const targetTilt = Math.max(-0.45, Math.min(0.45, vx * 0.035));
        tilt += (targetTilt - tilt) * 0.2;

        // Emit thruster exhaust particles
        const speed = Math.sqrt(vx * vx + vy * vy);
        const emitChance = speed > 1.5 ? 0.75 : 0.3;
        if (Math.random() < emitChance) {
          const thrusterX = robotX - Math.sin(tilt) * 12;
          const thrusterY = robotY + Math.cos(tilt) * 14;
          sparks.push({
            x: thrusterX + (Math.random() - 0.5) * 6,
            y: thrusterY + (Math.random() - 0.5) * 4,
            vx: -vx * 0.25 + (Math.random() - 0.5) * 1.5,
            vy: 1.5 + Math.random() * 2,
            alpha: 0.9,
            size: 1.5 + Math.random() * 2.5,
          });
        }

        // 1. Draw Thruster Ion Exhaust Sparks
        for (let i = sparks.length - 1; i >= 0; i--) {
          const s = sparks[i];
          s.x += s.vx;
          s.y += s.vy;
          s.alpha -= 0.04;
          s.size = Math.max(0.2, s.size * 0.96);

          if (s.alpha <= 0) {
            sparks.splice(i, 1);
            continue;
          }

          ctx.save();
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 59, 48, ${s.alpha})`;
          ctx.shadowBlur = 6;
          ctx.shadowColor = "rgba(227, 27, 35, 0.8)";
          ctx.fill();
          ctx.restore();
        }

        // 2. Draw Precision Pointer Reticle at Exact Mouse Location
        ctx.save();
        // Ambient soft red halo under mouse
        const mouseGlow = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 35);
        mouseGlow.addColorStop(0, "rgba(227, 27, 35, 0.25)");
        mouseGlow.addColorStop(1, "rgba(227, 27, 35, 0)");
        ctx.fillStyle = mouseGlow;
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 35, 0, Math.PI * 2);
        ctx.fill();

        // High-tech crisp crosshair reticle
        const reticleRadius = cursorType === "pointer" ? 8 : 5;
        ctx.strokeStyle = cursorType === "pointer" ? "#FF3B30" : "rgba(255, 255, 255, 0.6)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, reticleRadius, 0, Math.PI * 2);
        ctx.stroke();

        // Center pinpoint dot
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = "#FF3B30";
        ctx.shadowBlur = 6;
        ctx.shadowColor = "#FF3B30";
        ctx.fill();

        // 3. Holographic Leash / Tether Beam between Robot & Cursor
        ctx.beginPath();
        ctx.moveTo(mouseX, mouseY);
        ctx.lineTo(robotX, robotY);
        ctx.strokeStyle = "rgba(227, 27, 35, 0.15)";
        ctx.setLineDash([2, 5]);
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.restore();

        // 4. Draw Project Scanner Hologram Badge
        if (cursorType === "project") {
          ctx.save();
          // Holographic projection beam from robot visor down towards cursor
          const beamGrad = ctx.createLinearGradient(robotX, robotY, mouseX, mouseY);
          beamGrad.addColorStop(0, "rgba(227, 27, 35, 0.35)");
          beamGrad.addColorStop(1, "rgba(255, 59, 48, 0.05)");

          ctx.beginPath();
          ctx.moveTo(robotX - 10, robotY);
          ctx.lineTo(mouseX + 25, mouseY);
          ctx.lineTo(mouseX - 25, mouseY);
          ctx.closePath();
          ctx.fillStyle = beamGrad;
          ctx.fill();

          // Interactive Hologram HUD Box
          const hudX = robotX + 26;
          const hudY = robotY - 10;
          ctx.beginPath();
          ctx.roundRect(hudX - 6, hudY - 14, 76, 26, 6);
          ctx.fillStyle = "rgba(17, 17, 22, 0.92)";
          ctx.shadowBlur = 15;
          ctx.shadowColor = "rgba(227, 27, 35, 0.6)";
          ctx.fill();

          ctx.strokeStyle = "rgba(255, 59, 48, 0.7)";
          ctx.lineWidth = 1;
          ctx.stroke();

          ctx.font = "bold 10px monospace";
          ctx.fillStyle = "#FFFFFF";
          ctx.shadowBlur = 0;
          ctx.fillText("VIEW ↗", hudX + 8, hudY + 3);
          ctx.restore();
        }

        // 5. Draw THE ROBOT PET
        ctx.save();
        ctx.translate(robotX, robotY);
        ctx.rotate(tilt);
        ctx.scale(1, happySquish);

        // Anti-Gravity Jet Thruster Flare (at bottom of body)
        const flameHeight = 7 + (speed * 0.4) + Math.sin(time * 15) * 2;
        const thrusterGrad = ctx.createRadialGradient(0, 12, 1, 0, 12 + flameHeight, 9);
        thrusterGrad.addColorStop(0, "#FFFFFF");
        thrusterGrad.addColorStop(0.3, "#FF3B30");
        thrusterGrad.addColorStop(0.8, "rgba(227, 27, 35, 0.4)");
        thrusterGrad.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.beginPath();
        ctx.ellipse(0, 13 + flameHeight / 2, 4, flameHeight, 0, 0, Math.PI * 2);
        ctx.fillStyle = thrusterGrad;
        ctx.fill();

        // Jet nozzle rim
        ctx.beginPath();
        ctx.roundRect(-4.5, 11, 9, 3, 1.5);
        ctx.fillStyle = "#33333E";
        ctx.fill();

        // Side Winglets / Aero Fins
        const wingFlap = Math.sin(time * 6) * 1.5;
        // Left Ear / Wing
        ctx.beginPath();
        ctx.moveTo(-13, -2);
        ctx.lineTo(-20, -5 + wingFlap);
        ctx.lineTo(-14, 5);
        ctx.closePath();
        ctx.fillStyle = "#1E1E28";
        ctx.strokeStyle = "rgba(227, 27, 35, 0.6)";
        ctx.lineWidth = 1;
        ctx.fill();
        ctx.stroke();

        // Right Ear / Wing
        ctx.beginPath();
        ctx.moveTo(13, -2);
        ctx.lineTo(20, -5 - wingFlap);
        ctx.lineTo(14, 5);
        ctx.closePath();
        ctx.fillStyle = "#1E1E28";
        ctx.strokeStyle = "rgba(227, 27, 35, 0.6)";
        ctx.lineWidth = 1;
        ctx.fill();
        ctx.stroke();

        // Top Antenna
        ctx.beginPath();
        ctx.moveTo(0, -12);
        ctx.lineTo(0, -21);
        ctx.strokeStyle = "#555566";
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Antenna Blinking LED Light (beacon)
        const beaconBrightness = (Math.sin(antennaPulse * 4) + 1) / 2;
        ctx.beginPath();
        ctx.arc(0, -22, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = cursorType === "pointer" ? "#FF3B30" : `rgba(255, 59, 48, ${0.4 + beaconBrightness * 0.6})`;
        ctx.shadowBlur = 8 + beaconBrightness * 6;
        ctx.shadowColor = "#FF3B30";
        ctx.fill();

        // Main Robot Capsule Body
        ctx.beginPath();
        ctx.roundRect(-13, -12, 26, 24, 11);
        // Gradient metallic graphite chassis
        const bodyGrad = ctx.createLinearGradient(-13, -12, 13, 12);
        bodyGrad.addColorStop(0, "#23232F");
        bodyGrad.addColorStop(0.5, "#15151D");
        bodyGrad.addColorStop(1, "#0D0D12");
        ctx.fillStyle = bodyGrad;
        ctx.shadowBlur = 12;
        ctx.shadowColor = "rgba(0, 0, 0, 0.8)";
        ctx.fill();

        // Red Accent Racing Stripe on side
        ctx.beginPath();
        ctx.roundRect(-13, 3, 26, 2, 1);
        ctx.fillStyle = "#E31B23";
        ctx.fill();

        // Chassis Outer Stroke Highlight
        ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
        ctx.lineWidth = 1;
        ctx.stroke();

        // Black Glass Visor Screen
        ctx.beginPath();
        ctx.roundRect(-10, -8, 20, 13, 5);
        ctx.fillStyle = "#050508";
        ctx.fill();
        ctx.strokeStyle = "rgba(255, 59, 48, 0.3)";
        ctx.lineWidth = 0.8;
        ctx.stroke();

        // Visor glass sheen highlight
        ctx.beginPath();
        ctx.ellipse(-4, -5.5, 4, 1.2, -0.2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
        ctx.fill();

        // LED DIGITAL EYES
        ctx.shadowBlur = 7;
        ctx.shadowColor = "#FF3B30";

        // Eye gaze tracking (pupils look toward cursor direction)
        const eyeLookX = Math.max(-1.5, Math.min(1.5, (mouseX - robotX) * 0.05));
        const eyeLookY = Math.max(-1.5, Math.min(1.5, (mouseY - robotY) * 0.05));

        if (isBlinking) {
          // Blinking: Thin line eyes
          ctx.strokeStyle = "#FF3B30";
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(-6, -1);
          ctx.lineTo(-2, -1);
          ctx.moveTo(2, -1);
          ctx.lineTo(6, -1);
          ctx.stroke();
        } else if (isMouseDown) {
          // Clicked / Mouse Down: Playful happy winks (> <)
          ctx.strokeStyle = "#FFFFFF";
          ctx.lineWidth = 1.4;
          // Left >
          ctx.beginPath();
          ctx.moveTo(-6, -3);
          ctx.lineTo(-3, -1);
          ctx.lineTo(-6, 1);
          // Right <
          ctx.moveTo(6, -3);
          ctx.lineTo(3, -1);
          ctx.lineTo(6, 1);
          ctx.stroke();
        } else if (cursorType === "pointer") {
          // Hovering Button/Link: Excited / Happy arched eyes (^ ^)
          ctx.strokeStyle = "#FF3B30";
          ctx.lineWidth = 1.6;
          // Left ^
          ctx.beginPath();
          ctx.moveTo(-6, 0);
          ctx.lineTo(-4, -3);
          ctx.lineTo(-2, 0);
          // Right ^
          ctx.moveTo(2, 0);
          ctx.lineTo(4, -3);
          ctx.lineTo(6, 0);
          ctx.stroke();
        } else if (cursorType === "project") {
          // Hovering Project: Concentrated Cyber Scanner Visor
          ctx.beginPath();
          ctx.arc(-4, -1, 2.5, 0, Math.PI * 2);
          ctx.arc(4, -1, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = "#FF3B30";
          ctx.fill();

          // High-tech scanning horizontal laser line
          const scanY = -6 + ((time * 18) % 10);
          ctx.beginPath();
          ctx.moveTo(-8, scanY);
          ctx.lineTo(8, scanY);
          ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
          ctx.lineWidth = 0.8;
          ctx.stroke();
        } else {
          // Default State: Cute luminous cyber round eyes looking at cursor
          ctx.beginPath();
          ctx.ellipse(-4 + eyeLookX, -1 + eyeLookY, 2.2, 2.8, 0, 0, Math.PI * 2);
          ctx.ellipse(4 + eyeLookX, -1 + eyeLookY, 2.2, 2.8, 0, 0, Math.PI * 2);
          ctx.fillStyle = "#FF3B30";
          ctx.fill();

          // Cute white specular highlight inside eyes
          ctx.beginPath();
          ctx.arc(-4.5 + eyeLookX, -1.8 + eyeLookY, 0.8, 0, Math.PI * 2);
          ctx.arc(3.5 + eyeLookX, -1.8 + eyeLookY, 0.8, 0, Math.PI * 2);
          ctx.fillStyle = "#FFFFFF";
          ctx.fill();
        }

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isTouchDevice, mounted]);

  if (!mounted || isTouchDevice) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50 w-full h-full"
      aria-hidden="true"
    />
  );
}
