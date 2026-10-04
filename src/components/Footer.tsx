"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolioData";

export default function Footer() {
  const handleScrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-[#050505] border-t border-white/5 py-12 text-zinc-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Brand & Copyright */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-xs font-mono">
          <Link
            href="#home"
            onClick={handleScrollToTop}
            className="text-white font-bold tracking-tighter hover:text-[#FF3B30] transition-colors"
          >
            MF.
          </Link>
          <span className="hidden sm:inline text-zinc-700">|</span>
          <span>© 2026 Md Firdaush.</span>
          <span className="text-zinc-400">Built with curiosity.</span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-6 text-xs font-mono">
          <a
            href={PERSONAL_INFO.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors flex items-center gap-1 group"
          >
            <span>GitHub</span>
            <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          <a
            href={PERSONAL_INFO.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors flex items-center gap-1 group"
          >
            <span>LinkedIn</span>
            <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          <a
            href="#home"
            onClick={handleScrollToTop}
            className="hover:text-white transition-colors text-zinc-600 hover:text-zinc-300"
          >
            Back to Top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
