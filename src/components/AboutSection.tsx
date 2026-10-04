"use client";

import { motion, type Variants } from "framer-motion";
import { Award, BookOpen, Calendar, MapPin, Terminal, Users, Cpu } from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolioData";

export default function AboutSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
  };

  return (
    <section
      id="about"
      className="relative w-full py-24 sm:py-32 bg-[#050505] border-t border-white/5"
      aria-label="About Md Firdaush"
    >
      {/* Background Accent glow */}
      <div className="absolute right-0 top-1/3 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(227,27,35,0.08)_0%,transparent_70%)] blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col gap-12"
        >
          {/* Section Header */}
          <div className="flex flex-col items-start">
            <span className="text-xs font-mono tracking-widest text-[#FF3B30] uppercase mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E31B23]" />
              01 / ABOUT
            </span>

            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-tight">
              Student. <br />
              <span className="text-zinc-500">Builder. </span>
              <span className="text-white">Leader.</span>
            </h2>
          </div>

          {/* Grid Layout: Left Narrative & Highlights, Right Glass Panel */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Narrative Context */}
            <motion.div variants={itemVariants} className="lg:col-span-6 flex flex-col gap-6">
              <p className="text-lg sm:text-xl text-zinc-300 font-normal leading-relaxed">
                {PERSONAL_INFO.aboutBio}
              </p>

              <div className="flex flex-col gap-4 text-sm text-zinc-400 leading-relaxed">
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="p-2 rounded-lg bg-[#E31B23]/10 text-[#FF3B30] shrink-0 mt-0.5">
                    <Terminal className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-white block font-medium">Practical Engineering</strong>
                    Developing web and mobile systems that solve real campus, environmental, and community challenges.
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="p-2 rounded-lg bg-[#E31B23]/10 text-[#FF3B30] shrink-0 mt-0.5">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-white block font-medium">Campus Leadership</strong>
                    Serving as General Secretary, Class Representative, and organizing tech challenges via Code Crackers.
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="p-2 rounded-lg bg-[#E31B23]/10 text-[#FF3B30] shrink-0 mt-0.5">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-white block font-medium">Technical Agility</strong>
                    Fast iteration across C, Java, full-stack JavaScript architectures, and problem solving.
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Premium Glass-Style Information Panel */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-6 p-6 sm:p-8 rounded-2xl glass-panel relative overflow-hidden"
            >
              {/* Subtle panel header bar */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  <span className="ml-2 text-xs font-mono text-zinc-500">profile_overview.json</span>
                </div>
                <span className="text-[11px] font-mono text-[#FF3B30] uppercase">
                  Verified Data
                </span>
              </div>

              {/* Statistics Grid */}
              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                {/* 2024 */}
                <div className="p-4 rounded-xl bg-[#050505]/60 border border-white/5 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-zinc-500 mb-2">
                    <span className="text-xs font-mono uppercase">Commencement</span>
                    <Calendar className="w-4 h-4 text-[#FF3B30]" />
                  </div>
                  <div>
                    <div className="text-3xl font-black font-mono text-white tracking-tight">2024</div>
                    <div className="text-xs text-zinc-400 mt-1">Started B.E. (CSE)</div>
                  </div>
                </div>

                {/* 2028 */}
                <div className="p-4 rounded-xl bg-[#050505]/60 border border-white/5 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-zinc-500 mb-2">
                    <span className="text-xs font-mono uppercase">Target</span>
                    <BookOpen className="w-4 h-4 text-[#FF3B30]" />
                  </div>
                  <div>
                    <div className="text-3xl font-black font-mono text-white tracking-tight">2028</div>
                    <div className="text-xs text-zinc-400 mt-1">Expected Graduation</div>
                  </div>
                </div>

                {/* 2nd-4th */}
                <div className="p-4 rounded-xl bg-[#050505]/60 border border-white/5 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-zinc-500 mb-2">
                    <span className="text-xs font-mono uppercase">Academics</span>
                    <Award className="w-4 h-4 text-[#FF3B30]" />
                  </div>
                  <div>
                    <div className="text-3xl font-black font-mono text-white tracking-tight">2nd–4th</div>
                    <div className="text-xs text-zinc-400 mt-1">Semester Rank Achievement</div>
                  </div>
                </div>

                {/* SSSE */}
                <div className="p-4 rounded-xl bg-[#050505]/60 border border-white/5 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-zinc-500 mb-2">
                    <span className="text-xs font-mono uppercase">Campus</span>
                    <MapPin className="w-4 h-4 text-[#FF3B30]" />
                  </div>
                  <div>
                    <div className="text-3xl font-black font-mono text-white tracking-tight">SSSE</div>
                    <div className="text-xs text-zinc-400 mt-1">Tumakuru, Karnataka</div>
                  </div>
                </div>
              </div>

              {/* Institution Footnote */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-zinc-400 font-mono">
                <span>Sri Siddhartha School of Engineering</span>
                <span className="text-zinc-600">// Karnataka, India</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
