"use client";

import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import {
  Code2,
  Coffee,
  FileCode2,
  Layout,
  Palette,
  Globe,
  Smartphone,
  Binary,
  GitBranch,
  Database,
  Terminal,
} from "lucide-react";
import { GithubIcon } from "@/components/Icons";
import { SKILLS, SkillItem } from "@/data/portfolioData";

const ICON_MAP: Record<string, React.ElementType> = {
  Code2,
  Coffee,
  FileCode2,
  Layout,
  Palette,
  Globe,
  Smartphone,
  Binary,
  GitBranch,
  Github: GithubIcon,
  Database,
  Terminal,
};

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<"all" | "languages" | "web-mobile" | "tools-dsa">("all");

  const filteredSkills =
    activeCategory === "all"
      ? SKILLS
      : SKILLS.filter((s) => s.category === activeCategory);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
  };

  return (
    <section
      id="skills"
      className="relative w-full py-24 sm:py-32 bg-[#050505] border-t border-white/5"
      aria-label="Technical Skills and Toolset"
    >
      {/* Background Ambience */}
      <div className="absolute left-1/4 bottom-10 w-[450px] h-[450px] bg-[radial-gradient(circle,rgba(227,27,35,0.06)_0%,transparent_70%)] blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        <div className="flex flex-col gap-12">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-xs font-mono tracking-widest text-[#FF3B30] uppercase mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E31B23]" />
                02 / SKILLS
              </span>
              <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
                Tools I use <br />
                <span className="text-zinc-500">to build.</span>
              </h2>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2 bg-[#111116] p-1.5 rounded-xl border border-white/10 self-start md:self-auto">
              {[
                { id: "all", label: "All Technologies" },
                { id: "languages", label: "Core Languages" },
                { id: "web-mobile", label: "Web & Mobile" },
                { id: "tools-dsa", label: "DSA & Tools" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id as typeof activeCategory)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-medium font-mono uppercase tracking-wider transition-all duration-200 ${
                    activeCategory === tab.id
                      ? "bg-[#E31B23] text-white shadow-[0_0_12px_rgba(227,27,35,0.4)]"
                      : "text-zinc-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Technology Chips Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            {filteredSkills.map((skill) => {
              const IconComponent = ICON_MAP[skill.iconName] || Terminal;
              return (
                <motion.div
                  key={skill.name}
                  variants={itemVariants}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="group relative p-5 rounded-2xl bg-[#0B0B0F]/90 border border-white/10 hover:border-[#E31B23]/50 hover:bg-[#111116] transition-all duration-300 shadow-sm hover:shadow-[0_10px_25px_-5px_rgba(227,27,35,0.25)] flex flex-col justify-between overflow-hidden"
                >
                  {/* Subtle top indicator bar on hover */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF3B30] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      {/* Icon with movement on hover */}
                      <div className="p-2.5 rounded-xl bg-white/[0.04] group-hover:bg-[#E31B23]/15 border border-white/5 group-hover:border-[#E31B23]/30 text-zinc-300 group-hover:text-[#FF3B30] transition-all duration-300 transform group-hover:translate-x-1 group-hover:-translate-y-1">
                        <IconComponent className="w-5 h-5" />
                      </div>

                      <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 group-hover:text-zinc-400">
                        {skill.category.replace("-", " & ")}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white group-hover:text-[#FF3B30] transition-colors">
                      {skill.name}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                      {skill.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-zinc-500 group-hover:text-zinc-300">
                      Applied in Projects
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-600 group-hover:bg-[#FF3B30] group-hover:shadow-[0_0_8px_#FF3B30] transition-all" />
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
