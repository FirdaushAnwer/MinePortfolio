"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, CheckCircle2, X, ExternalLink, ShieldCheck, BookOpen } from "lucide-react";
import { CERTIFICATIONS, CertificateItem } from "@/data/portfolioData";

export default function CertificationsSection() {
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedCert(null);
    };

    if (selectedCert) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedCert]);

  return (
    <section
      id="certifications"
      className="relative w-full py-24 sm:py-32 bg-[#050505] border-t border-white/5"
      aria-label="Professional Certifications"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        <div className="flex flex-col gap-12">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-xs font-mono tracking-widest text-[#FF3B30] uppercase mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E31B23]" />
                CERTIFICATIONS
              </span>
              <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
                Verified skills <br />
                <span className="text-zinc-500">&amp; credentials.</span>
              </h2>
            </div>

            <p className="max-w-md text-sm text-zinc-400 font-normal leading-relaxed">
              Standardized assessments and curriculum certifications completed across foundational algorithms, software engineering, and mobile development.
            </p>
          </div>

          {/* Certificate Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CERTIFICATIONS.map((cert) => (
              <motion.div
                key={cert.id}
                whileHover={{ y: -8 }}
                onClick={() => setSelectedCert(cert)}
                className="group relative p-6 rounded-2xl bg-[#0B0B0F] border border-white/10 hover:border-[#E31B23]/50 transition-all duration-300 flex flex-col justify-between cursor-pointer shadow-sm hover:shadow-[0_12px_30px_-5px_rgba(227,27,35,0.25)] overflow-hidden"
              >
                {/* Subtle top red glow bar on hover */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF3B30] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2.5 rounded-xl bg-white/[0.04] group-hover:bg-[#E31B23]/15 border border-white/5 group-hover:border-[#E31B23]/30 text-zinc-300 group-hover:text-[#FF3B30] transition-colors">
                      <Award className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 px-2.5 py-0.5 rounded-md bg-white/5">
                      {cert.platform}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-[#FF3B30] transition-colors leading-snug">
                    {cert.title}
                  </h3>

                  <div className="text-xs text-[#FF3B30] font-mono mt-1 font-medium">
                    {cert.skill}
                  </div>

                  <p className="text-xs text-zinc-400 mt-3 line-clamp-3 leading-relaxed">
                    {cert.description}
                  </p>
                </div>

                {/* View Details Button Trigger */}
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-zinc-400 group-hover:text-white">
                  <span>View Details</span>
                  <span className="w-6 h-6 rounded-full bg-white/5 group-hover:bg-[#E31B23] flex items-center justify-center transition-colors text-white">
                    →
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Certificate Modal */}
      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCert(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="cert-modal-title"
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              className="relative w-full max-w-lg bg-[#0E0E14] border border-white/15 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.9)] z-10 flex flex-col gap-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-[#E31B23]/15 text-[#FF3B30] border border-[#E31B23]/30">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                      {selectedCert.platform}
                    </span>
                    <h3 id="cert-modal-title" className="text-xl sm:text-2xl font-bold text-white">
                      {selectedCert.title}
                    </h3>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedCert(null)}
                  className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Close Certificate Details"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div>
                <div className="text-xs font-mono text-[#FF3B30] mb-2 uppercase tracking-wide">
                  Verified Skill Core
                </div>
                <div className="text-sm font-semibold text-white mb-2">
                  {selectedCert.skill}
                </div>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  {selectedCert.description}
                </p>
              </div>

              {/* Topics / Curriculum Breakdown */}
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                <div className="text-xs font-mono uppercase text-zinc-400 mb-3 flex items-center gap-2">
                  <BookOpen className="w-3.5 h-3.5 text-[#FF3B30]" />
                  Curriculum Competencies Verified
                </div>
                <div className="flex flex-col gap-2">
                  {selectedCert.topics.map((topic, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-zinc-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{topic}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs font-mono text-zinc-500">
                <span>Issuer: {selectedCert.platform}</span>
                <span className="text-emerald-400 font-bold">✓ Coursework Verified</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
