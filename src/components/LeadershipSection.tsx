"use client";

import { motion, type Variants } from "framer-motion";
import {
  ShieldCheck,
  Users2,
  Terminal,
  ArrowUpRight,
  Code,
  Zap,
  Sparkles,
  Trophy,
  Cpu,
} from "lucide-react";
import { LEADERSHIP, LeadershipItem } from "@/data/portfolioData";

export default function LeadershipSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
  };

  return (
    <section
      id="leadership"
      className="relative w-full py-24 sm:py-32 bg-[#050505] border-t border-white/5"
      aria-label="Student Leadership and Technical Communities"
    >
      {/* Background glow */}
      <div className="absolute left-1/3 top-1/2 w-[550px] h-[550px] bg-[radial-gradient(circle,rgba(227,27,35,0.08)_0%,transparent_70%)] blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        <div className="flex flex-col gap-16">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-xs font-mono tracking-widest text-[#FF3B30] uppercase mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E31B23]" />
                04 / LEADERSHIP
              </span>
              <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
                Leading from <br />
                <span className="text-zinc-500">the campus.</span>
              </h2>
            </div>

            <p className="max-w-md text-sm text-zinc-400 font-normal leading-relaxed">
              Fostering student initiative, bridging departmental communication, and anchoring technical hackathon culture at Sri Siddhartha School of Engineering.
            </p>
          </div>

          {/* Interactive Vertical Timeline */}
          <div className="relative">
            {/* Central Vertical Timeline Spine */}
            <div className="absolute left-4 sm:left-1/2 top-4 bottom-4 w-[2px] -translate-x-1/2 bg-gradient-to-b from-[#E31B23] via-white/20 to-white/5" />

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              className="flex flex-col gap-10 sm:gap-14"
            >
              {LEADERSHIP.map((item, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <motion.div
                    key={item.role}
                    variants={itemVariants}
                    className={`relative flex flex-col sm:flex-row items-start sm:items-center ${
                      isEven ? "sm:flex-row-reverse" : ""
                    }`}
                  >
                    {/* Timeline Node Dot */}
                    <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#0E0E14] border-2 border-[#E31B23] flex items-center justify-center z-10 shadow-[0_0_12px_rgba(227,27,35,0.6)]">
                      <div className="w-2.5 h-2.5 rounded-full bg-white" />
                    </div>

                    {/* Timeline Card */}
                    <div
                      className={`ml-12 sm:ml-0 w-full sm:w-[calc(50%-40px)] ${
                        isEven ? "sm:pr-4" : "sm:pl-4"
                      }`}
                    >
                      <div
                        className={`p-6 sm:p-7 rounded-2xl bg-[#0B0B0F] border ${
                          item.isHighlighted
                            ? "border-[#E31B23]/50 shadow-[0_10px_30px_rgba(227,27,35,0.18)]"
                            : "border-white/10 hover:border-white/20"
                        } transition-all duration-300 group`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs font-mono font-bold text-[#FF3B30] tracking-wider uppercase">
                            {item.year}
                          </span>
                          {item.organization && (
                            <span className="text-[11px] font-mono text-zinc-500">
                              {item.organization.split("·")[0]}
                            </span>
                          )}
                        </div>

                        <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#FF3B30] transition-colors">
                          {item.role}
                        </h3>

                        <p className="text-xs sm:text-sm text-zinc-400 mt-2 leading-relaxed">
                          {item.description}
                        </p>

                        <div className="mt-4 pt-4 border-t border-white/5 flex flex-col gap-2">
                          {item.highlights.map((h, i) => (
                            <div key={i} className="flex items-start gap-2 text-xs text-zinc-300">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#E31B23] mt-1.5 shrink-0" />
                              <span>{h}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* CODE CRACKERS Dedicated Feature Unit (Requirement 23) */}
          <div className="mt-8 rounded-3xl p-6 sm:p-10 bg-gradient-to-br from-[#0E0E16] via-[#09090D] to-[#12080A] border border-[#E31B23]/40 relative overflow-hidden shadow-[0_20px_50px_rgba(227,27,35,0.15)]">
            {/* Subtle radar / technical scanline background */}
            <div className="absolute inset-0 bg-tech-dots opacity-15 pointer-events-none" />
            <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-[#E31B23]/10 blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="flex flex-col max-w-xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E31B23]/15 border border-[#E31B23]/30 text-xs font-mono text-[#FF3B30] mb-4 self-start">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>STUDENT TECHNICAL COMMUNITY · SSSE</span>
                </div>

                <h3 className="text-3xl sm:text-5xl font-black tracking-tight text-white flex items-baseline">
                  <span>CODE CRACKERS</span>
                  <span className="text-[#FF3B30]">_</span>
                </h3>

                <p className="text-sm sm:text-base text-zinc-300 mt-4 leading-relaxed">
                  A high-velocity student coding initiative driving competitive algorithmic problem solving, hands-on hackathons, and technical peer mentorship at Sri Siddhartha School of Engineering.
                </p>
              </div>

              {/* Activities Matrix Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full lg:max-w-lg">
                {[
                  { title: "Hackathons", desc: "Sprint builds & problem solving", icon: Trophy },
                  { title: "Blind Coding", desc: "Syntactic mastery without feedback", icon: Code },
                  { title: "Debugging", desc: "Live code forensics & bug fixes", icon: Zap },
                  { title: "Coding Events", desc: "Departmental tech symposiums", icon: Terminal },
                  { title: "Tech Challenges", desc: "Algorithmic speed races", icon: Cpu },
                  { title: "Skill Building", desc: "Peer workshops & modern toolchains", icon: Sparkles },
                ].map((act) => {
                  const Icon = act.icon;
                  return (
                    <div
                      key={act.title}
                      className="p-3.5 rounded-xl bg-white/[0.03] hover:bg-[#E31B23]/10 border border-white/5 hover:border-[#E31B23]/30 transition-all duration-200 flex flex-col justify-between"
                    >
                      <div className="p-1.5 rounded-lg bg-white/5 text-[#FF3B30] w-fit mb-2">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">{act.title}</div>
                        <div className="text-[10px] text-zinc-400 mt-0.5 leading-snug">{act.desc}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
