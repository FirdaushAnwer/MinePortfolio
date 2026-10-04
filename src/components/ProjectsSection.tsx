"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { ArrowUpRight, X, CheckCircle2, Layers, AlertCircle, Sparkles } from "lucide-react";
import { GithubIcon } from "@/components/Icons";
import { PROJECTS, ProjectItem } from "@/data/portfolioData";

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedProject(null);
      }
    };

    if (selectedProject) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedProject]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
  };

  return (
    <section
      id="projects"
      className="relative w-full py-24 sm:py-32 bg-[#050505] border-t border-white/5"
      aria-label="Engineered Projects and Concepts"
    >
      {/* Background glow */}
      <div className="absolute right-1/4 top-1/4 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(227,27,35,0.08)_0%,transparent_70%)] blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        <div className="flex flex-col gap-12">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-xs font-mono tracking-widest text-[#FF3B30] uppercase mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E31B23]" />
                03 / PROJECTS
              </span>
              <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
                Ideas into <br />
                <span className="text-zinc-500">working products.</span>
              </h2>
            </div>

            <p className="max-w-md text-sm text-zinc-400 font-normal leading-relaxed">
              Explorations spanning agricultural logistics, intelligent emergency navigation, student tools, and collaborative developer platforms.
            </p>
          </div>

          {/* Large Cinematic Project Cards Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            {PROJECTS.map((project) => (
              <motion.div
                key={project.id}
                variants={cardVariants}
                whileHover={{ y: -8 }}
                onClick={() => setSelectedProject(project)}
                data-cursor="project"
                className="group relative rounded-2xl bg-[#0B0B0F] border border-white/10 hover:border-[#E31B23]/50 overflow-hidden cursor-pointer transition-all duration-300 shadow-lg hover:shadow-[0_12px_35px_-8px_rgba(227,27,35,0.3)] flex flex-col justify-between"
              >
                {/* Image Container with 1.04 zoom on hover */}
                <div className="relative w-full aspect-[16/10] bg-[#111116] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={`${project.title} Concept Interface`}
                    fill
                    className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0F] via-transparent to-transparent opacity-80" />

                  {/* Project index badge */}
                  <div className="absolute top-4 left-4 px-2.5 py-1 rounded-md bg-[#050505]/80 backdrop-blur-md border border-white/10 text-[11px] font-mono text-zinc-300">
                    {project.number}
                  </div>

                  {/* Floating Action Arrow */}
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-center text-white group-hover:bg-[#E31B23] group-hover:border-[#FF3B30] transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Tags */}
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-white/5 text-zinc-400 group-hover:text-zinc-200 group-hover:bg-[#E31B23]/10 border border-white/5 group-hover:border-[#E31B23]/25 transition-all duration-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h3 className="text-xl font-bold text-white group-hover:text-[#FF3B30] transition-colors leading-snug">
                      {project.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-zinc-400 mt-2 line-clamp-3 leading-relaxed">
                      {project.shortDesc}
                    </p>
                  </div>

                  {/* Card Footer */}
                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-zinc-500 group-hover:text-zinc-300">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#FF3B30]" />
                      Explore Architecture
                    </span>
                    <span className="text-[#FF3B30] font-bold">Details ↗</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Cinematic Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
            {/* Backdrop with blur & light dismiss */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Modal Dialog Card */}
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-project-title"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-[#0E0E14] border border-white/15 rounded-2xl sm:rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col z-10"
            >
              {/* Modal Top Header Bar */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0A0A0F]">
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 rounded bg-[#E31B23]/15 text-[#FF3B30] font-mono text-xs font-bold">
                    CONCEPT {selectedProject.number}
                  </span>
                  <span className="text-xs font-mono text-zinc-400 hidden sm:inline">
                    // ARCHITECTURE_SPECIFICATION
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Close Project Details"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Body */}
              <div className="overflow-y-auto p-6 sm:p-8 flex flex-col gap-6">
                {/* Title & Tags */}
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    {selectedProject.tags.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-0.5 rounded-full text-xs font-mono uppercase tracking-wider bg-white/5 text-zinc-300 border border-white/10"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <h3
                    id="modal-project-title"
                    className="text-2xl sm:text-4xl font-black text-white tracking-tight"
                  >
                    {selectedProject.title}
                  </h3>
                </div>

                {/* Project Screenshot / Visual Preview */}
                <div className="relative w-full aspect-video rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 bg-[#050505]">
                  <Image
                    src={selectedProject.image}
                    alt={`${selectedProject.title} full UI screenshot`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 896px"
                    className="object-cover"
                    priority
                  />
                </div>

                {/* Overview Narrative */}
                <div className="p-4 sm:p-5 rounded-xl bg-white/[0.02] border border-white/5">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[#FF3B30]" />
                    Project Overview
                  </h4>
                  <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                    {selectedProject.overview}
                  </p>
                </div>

                {/* Problem & Solution Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {/* Problem */}
                  <div className="p-5 rounded-xl bg-red-950/15 border border-red-900/30">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-red-400 mb-2 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-[#FF3B30]" />
                      Problem Statement
                    </h4>
                    <p className="text-sm text-zinc-300 leading-relaxed">
                      {selectedProject.problem}
                    </p>
                  </div>

                  {/* Solution */}
                  <div className="p-5 rounded-xl bg-zinc-900/40 border border-white/10">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-400 mb-2 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      Engineering Solution
                    </h4>
                    <p className="text-sm text-zinc-300 leading-relaxed">
                      {selectedProject.solution}
                    </p>
                  </div>
                </div>

                {/* Technologies Used */}
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-3">
                    Technologies &amp; Architecture
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 rounded-lg text-xs font-mono bg-white/5 border border-white/10 text-zinc-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer with Official GitHub Link */}
              <div className="px-6 py-4 border-t border-white/10 bg-[#0A0A0F] flex flex-wrap items-center justify-between gap-4">
                <span className="text-xs text-zinc-500 font-mono">
                  Concept by Md Firdaush // SSSE
                </span>

                <div className="flex items-center gap-3">
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#E31B23] hover:bg-[#FF3B30] text-white text-xs font-semibold tracking-wider uppercase transition-colors shadow-[0_0_15px_rgba(227,27,35,0.4)]"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>View on GitHub</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>

                  <button
                    type="button"
                    onClick={() => setSelectedProject(null)}
                    className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 text-xs font-medium transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
