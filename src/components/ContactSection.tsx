"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Copy, Check, MessageSquare, MapPin, Sparkles } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";
import { PERSONAL_INFO } from "@/data/portfolioData";

export default function ContactSection() {
  const [messageDraft, setMessageDraft] = useState("");
  const [copied, setCopied] = useState(false);

  const handleCopyAndConnect = () => {
    if (!messageDraft.trim()) {
      window.open(PERSONAL_INFO.linkedinUrl, "_blank");
      return;
    }

    navigator.clipboard.writeText(messageDraft);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      window.open(PERSONAL_INFO.linkedinUrl, "_blank");
    }, 1200);
  };

  return (
    <section
      id="contact"
      className="relative w-full py-28 sm:py-36 bg-[#050505] border-t border-white/5 overflow-hidden"
      aria-label="Connect and Collaborate"
    >
      {/* Dramatic slow red radial glow behind section */}
      <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/3 w-[700px] h-[500px] bg-[radial-gradient(ellipse,rgba(227,27,35,0.22)_0%,rgba(159,13,22,0.06)_50%,transparent_75%)] blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Section Label */}
          <span className="text-xs font-mono tracking-widest text-[#FF3B30] uppercase mb-4 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E31B23]" />
            06 / CONTACT
          </span>

          {/* Dramatic Heading */}
          <h2 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-[-0.04em] text-white leading-none">
            LET&apos;S BUILD <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-500">
              SOMETHING GREAT
            </span>
            <span className="text-[#FF3B30]">.</span>
          </h2>

          <p className="mt-6 sm:mt-8 text-base sm:text-xl text-zinc-400 font-normal max-w-2xl leading-relaxed">
            Have a project, hackathon idea, technical collaboration or student initiative? Let&apos;s connect.
          </p>

          {/* Primary Action Buttons */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            {/* LinkedIn ↗ */}
            <a
              href={PERSONAL_INFO.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-[#9F0D16] via-[#E31B23] to-[#FF3B30] text-white font-semibold text-base tracking-tight shadow-[0_0_30px_rgba(227,27,35,0.45)] hover:shadow-[0_0_45px_rgba(227,27,35,0.7)] hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <LinkedinIcon className="w-5 h-5" />
              <span>LinkedIn</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>

            {/* GitHub ↗ */}
            <a
              href={PERSONAL_INFO.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#111116] hover:bg-white/10 border border-white/15 hover:border-white/30 text-white font-semibold text-base transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <GithubIcon className="w-5 h-5" />
              <span>GitHub</span>
              <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
          </div>

          {/* Interactive LinkedIn Quick-Draft Composer */}
          <div className="mt-14 w-full max-w-xl p-6 sm:p-8 rounded-3xl bg-[#0B0B0F]/90 border border-white/10 text-left shadow-2xl relative">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                <MessageSquare className="w-4 h-4 text-[#FF3B30]" />
                <span>Quick Connect Note (LinkedIn DM)</span>
              </div>
              <span className="text-[11px] font-mono text-zinc-500">1-Click Dispatch</span>
            </div>

            <textarea
              value={messageDraft}
              onChange={(e) => setMessageDraft(e.target.value)}
              placeholder="Hi Md Firdaush, I saw your portfolio and would like to discuss a hackathon / project collaboration..."
              rows={3}
              className="w-full bg-[#050505] border border-white/10 focus:border-[#E31B23] rounded-xl p-4 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-[#E31B23] transition-all resize-none"
            />

            <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-[11px] text-zinc-500 flex items-center gap-1.5 self-start sm:self-auto">
                <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                Tumakuru, Karnataka, India
              </span>

              <button
                type="button"
                onClick={handleCopyAndConnect}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-[#E31B23] text-white text-xs font-mono font-medium transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied! Opening LinkedIn...</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy &amp; Open LinkedIn ↗</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
