"use client";

import { motion, type Variants } from "framer-motion";
import { Award, FolderCheck, TrendingUp, Sparkles, CheckCircle } from "lucide-react";
import { ACHIEVEMENTS } from "@/data/portfolioData";

export default function AchievementsSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
  };

  const ICONS = [Award, FolderCheck, TrendingUp];

  return (
    <section
      id="achievements"
      className="relative w-full py-24 sm:py-32 bg-[#050505] border-t border-white/5"
      aria-label="Milestones and Academic Achievements"
    >
      {/* Background glow */}
      <div className="absolute right-1/3 top-1/4 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(227,27,35,0.08)_0%,transparent_70%)] blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        <div className="flex flex-col gap-12">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-xs font-mono tracking-widest text-[#FF3B30] uppercase mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E31B23]" />
                05 / ACHIEVEMENTS
              </span>
              <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
                Progress that <br />
                <span className="text-zinc-500">keeps moving.</span>
              </h2>
            </div>

            <p className="max-w-md text-sm text-zinc-400 font-normal leading-relaxed">
              Academic excellence combined with active engineering production and non-stop skill expansion.
            </p>
          </div>

          {/* Three Large Achievement Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8"
          >
            {ACHIEVEMENTS.map((item, idx) => {
              const Icon = ICONS[idx] || Sparkles;
              return (
                <motion.div
                  key={item.category}
                  variants={cardVariants}
                  whileHover={{ y: -8 }}
                  className="group relative p-8 rounded-3xl bg-[#0B0B0F] border border-white/10 hover:border-[#E31B23]/50 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-lg hover:shadow-[0_15px_35px_-10px_rgba(227,27,35,0.25)]"
                >
                  {/* Decorative top accent glow */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#E31B23]/10 rounded-full blur-2xl group-hover:bg-[#E31B23]/20 transition-colors pointer-events-none" />

                  <div>
                    {/* Top Row: Icon & Category */}
                    <div className="flex items-center justify-between mb-8">
                      <div className="p-3.5 rounded-2xl bg-white/[0.04] group-hover:bg-[#E31B23]/15 border border-white/5 group-hover:border-[#E31B23]/30 text-zinc-300 group-hover:text-[#FF3B30] transition-all duration-300">
                        <Icon className="w-6 h-6" />
                      </div>

                      <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 border border-white/10 px-3 py-1 rounded-full bg-white/[0.02]">
                        {item.category}
                      </span>
                    </div>

                    {/* Metric Counter & Title */}
                    <div className="text-4xl sm:text-5xl font-black font-mono tracking-tight text-white group-hover:text-[#FF3B30] transition-colors mb-2">
                      {item.metric}
                    </div>

                    <h3 className="text-xl font-bold text-white mb-3">
                      {item.title}
                    </h3>

                    <p className="text-sm text-zinc-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Card Footer Badge */}
                  <div className="mt-8 pt-6 border-t border-white/5 flex items-center gap-2 text-xs font-mono text-zinc-300">
                    <CheckCircle className="w-4 h-4 text-[#FF3B30]" />
                    <span>{item.badge}</span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
