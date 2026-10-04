"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";
import { PERSONAL_INFO } from "@/data/portfolioData";
import FuturisticOrb from "./FuturisticOrb";

export default function HeroSection() {
  const handleScrollToProjects = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById("projects");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex items-center justify-center pt-24 pb-16 sm:py-28 overflow-hidden bg-[#050505]"
      aria-label="Introduction and Hero"
    >
      {/* Background Ambience: Technical Grid & Radial Red Glow */}
      <div className="absolute inset-0 bg-tech-grid opacity-25 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(227,27,35,0.18)_0%,rgba(159,13,22,0.05)_45%,transparent_70%)] blur-[90px] pointer-events-none" />
      
      {/* Technical HUD crosshairs */}
      <div className="absolute top-8 left-8 text-[10px] font-mono text-zinc-600 tracking-widest hidden sm:block select-none">
        LOC // 13.3409° N, 77.1010° E [TUMAKURU, KARNATAKA]
      </div>
      <div className="absolute top-8 right-8 text-[10px] font-mono text-zinc-600 tracking-widest hidden sm:block select-none">
        STATUS // ACTIVE_DEVELOPMENT
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center">
          {/* Main Hero Content (7-8 cols on desktop) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-8 flex flex-col items-start"
          >
            {/* Engineering Badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111116] border border-white/10 text-zinc-300 text-xs sm:text-xs font-mono font-medium tracking-wide mb-6 shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-[#E31B23] animate-pulse" />
              <span>COMPUTER SCIENCE &amp; ENGINEERING · 2024—2028</span>
            </motion.div>

            {/* Cinematic Hero Typography */}
            <div className="flex flex-col tracking-[-0.06em] sm:tracking-[-0.07em] lg:tracking-[-0.08em] font-black leading-[0.92] select-none text-[52px] sm:text-[80px] md:text-[96px] lg:text-[108px] xl:text-[116px]">
              <motion.div variants={itemVariants} className="text-white">
                I BUILD.
              </motion.div>
              <motion.div variants={itemVariants} className="stroke-text">
                I LEAD.
              </motion.div>
              <motion.div variants={itemVariants} className="text-white flex items-baseline">
                <span>I INNOVATE</span>
                <span className="text-[#E31B23]">.</span>
              </motion.div>
            </div>

            {/* Supporting Bio */}
            <motion.p
              variants={itemVariants}
              className="mt-6 sm:mt-8 max-w-2xl text-base sm:text-lg text-zinc-400 font-normal leading-relaxed"
            >
              {PERSONAL_INFO.heroBio}
            </motion.p>

            {/* Call To Action Buttons */}
            <motion.div
              variants={itemVariants}
              className="mt-8 sm:mt-10 flex flex-wrap items-center gap-3 sm:gap-4"
            >
              <a
                href="#projects"
                onClick={handleScrollToProjects}
                className="group relative inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 rounded-full bg-gradient-to-r from-[#9F0D16] via-[#E31B23] to-[#FF3B30] text-white font-semibold text-sm sm:text-base tracking-tight shadow-[0_0_25px_rgba(227,27,35,0.4)] hover:shadow-[0_0_35px_rgba(227,27,35,0.65)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
              >
                <span>Explore Projects</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <a
                href={PERSONAL_INFO.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 rounded-full bg-[#111116] hover:bg-white/10 border border-white/10 hover:border-white/25 text-white font-medium text-sm sm:text-base transition-all duration-300"
              >
                <LinkedinIcon className="w-4 h-4 text-[#0077B5]" />
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white transition-colors" />
              </a>

              <a
                href={PERSONAL_INFO.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 rounded-full bg-[#111116] hover:bg-white/10 border border-white/10 hover:border-white/25 text-white font-medium text-sm sm:text-base transition-all duration-300"
              >
                <GithubIcon className="w-4 h-4 text-zinc-300" />
                <span>GitHub</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white transition-colors" />
              </a>
            </motion.div>

            {/* Hero Statistics */}
            <motion.div
              variants={itemVariants}
              className="mt-12 sm:mt-16 pt-8 border-t border-white/10 w-full grid grid-cols-3 gap-4 sm:gap-8 max-w-xl"
            >
              <div className="flex flex-col">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-black font-mono tracking-tight text-white flex items-baseline">
                  <span>3</span>
                  <span className="text-[#FF3B30]">+</span>
                </div>
                <div className="text-xs sm:text-sm text-zinc-400 font-medium mt-1">
                  Leadership roles
                </div>
              </div>

              <div className="flex flex-col">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-black font-mono tracking-tight text-white flex items-baseline">
                  <span>6</span>
                  <span className="text-[#FF3B30]">+</span>
                </div>
                <div className="text-xs sm:text-sm text-zinc-400 font-medium mt-1">
                  Project concepts
                </div>
              </div>

              <div className="flex flex-col">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-black font-mono tracking-tight text-white">
                  2028
                </div>
                <div className="text-xs sm:text-sm text-zinc-400 font-medium mt-1">
                  Expected graduation
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Futuristic Abstract Orb (Visible on Desktop / Tablet) */}
          <div className="lg:col-span-4 hidden lg:flex items-center justify-center relative">
            <FuturisticOrb />
          </div>
        </div>
      </div>
    </section>
  );
}
