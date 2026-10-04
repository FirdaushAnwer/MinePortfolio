"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [phase, setPhase] = useState<"logo" | "line" | "name" | "exit">("logo");

  useEffect(() => {
    // Phase 1: Logo fades in (0-300ms)
    const t1 = setTimeout(() => setPhase("line"), 300);
    // Phase 2: Line expands (300-650ms)
    const t2 = setTimeout(() => setPhase("name"), 650);
    // Phase 3: Name appears (650-1050ms)
    const t3 = setTimeout(() => setPhase("exit"), 1050);
    // Phase 4: Slide up and complete (1250ms)
    const t4 = setTimeout(() => {
      onComplete();
    }, 1300);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "exit" && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{
            y: "-100%",
            transition: { duration: 0.65, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] },
          }}
          className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-[#050505] text-white select-none pointer-events-auto"
        >
          {/* Subtle background glow */}
          <div className="absolute w-[450px] h-[450px] rounded-full bg-[#E31B23]/10 blur-[120px] pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center">
            {/* MF. Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="text-6xl sm:text-7xl font-black tracking-tighter flex items-baseline font-mono"
            >
              <span>MF</span>
              <span className="text-[#E31B23] animate-pulse">.</span>
            </motion.div>

            {/* Expanding Red Line */}
            <div className="w-48 sm:w-64 h-[2px] bg-white/10 my-4 overflow-hidden rounded-full">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: phase === "logo" ? 0 : 1 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                className="h-full bg-gradient-to-r from-[#9F0D16] via-[#E31B23] to-[#FF3B30] origin-center"
              />
            </div>

            {/* Name */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: phase === "name" ? 1 : 0,
                y: phase === "name" ? 0 : 10,
              }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase text-zinc-400"
            >
              Md Firdaush
            </motion.div>
          </div>

          <div className="absolute bottom-8 text-[11px] font-mono tracking-widest text-zinc-600 uppercase">
            Init // Portfolio v2026
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
