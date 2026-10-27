"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";
import { PERSONAL_INFO } from "@/data/portfolioData";

// Drop your transparent-background PNG here (e.g., after running bg-removal).
// The component renders a styled placeholder when the file is absent so the
// rest of the layout is always correct.
const HERO_PHOTO_SRC = "/digital-id-badge-hanging.png";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const [reducedMotion, setReducedMotion] = useState(false);
  const [photoError, setPhotoError] = useState(false);

  // Detect prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      setReducedMotion(mq.matches);
      if (videoRef.current) {
        mq.matches ? videoRef.current.pause() : videoRef.current.play().catch(() => {});
      }
    };
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Parallax on mousemove (desktop)
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (reducedMotion) return;
      const { innerWidth: W, innerHeight: H } = window;
      const dx = (e.clientX / W - 0.5) * 2;
      const dy = (e.clientY / H - 0.5) * 2;
      if (bgRef.current) {
        bgRef.current.style.transform = `translate(${dx * -14}px, ${dy * -10}px) scale(1.06)`;
      }
      if (photoRef.current) {
        photoRef.current.style.transform = `translate(${dx * 22}px, ${dy * 14}px)`;
      }
    },
    [reducedMotion]
  );

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    section.addEventListener("mousemove", handleMouseMove);
    return () => section.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  // Scroll parallax
  useEffect(() => {
    if (reducedMotion) return;
    const onScroll = () => {
      const y = window.scrollY;
      if (bgRef.current) {
        bgRef.current.style.transform = `translateY(${y * 0.35}px) scale(1.06)`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [reducedMotion]);

  const handleScrollToProjects = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen w-full flex items-center overflow-hidden bg-[#050505]"
      aria-label="Introduction and Hero"
    >
      {/* Video Background */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-0 will-change-transform"
        style={{ transition: "transform 0.08s linear" }}
        aria-hidden="true"
      >
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          poster="/hero-poster.jpg"
          preload="none"
          aria-hidden="true"
        >
          {/* Drop a compressed city-night-walk.mp4 in /public/ and uncomment: */}
          {/* <source src="/hero-bg.mp4" type="video/mp4" /> */}
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/80 via-[#050505]/60 to-[#050505]/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/95 via-[#050505]/50 to-transparent" />
      </div>

      <div className="absolute inset-0 z-[1] bg-tech-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[radial-gradient(circle,rgba(227,27,35,0.15)_0%,rgba(159,13,22,0.04)_45%,transparent_70%)] blur-[100px] pointer-events-none z-[1]" />

      <div className="absolute top-8 left-8 text-[10px] font-mono text-zinc-600 tracking-widest hidden sm:block select-none z-[2]">
        LOC // 13.3409 N, 77.1010 E [TUMAKURU, KARNATAKA]
      </div>
      <div className="absolute top-8 right-8 text-[10px] font-mono text-zinc-600 tracking-widest hidden sm:block select-none z-[2]">
        STATUS // ACTIVE_DEVELOPMENT
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 w-full relative z-10 pt-28 pb-16 sm:py-32 lg:py-0 lg:min-h-screen lg:flex lg:items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 items-center w-full">

          {/* Text column */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 xl:col-span-7 flex flex-col items-start"
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111116]/80 backdrop-blur-sm border border-white/10 text-zinc-300 text-xs font-mono font-medium tracking-wide mb-6 shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-[#E31B23] animate-pulse" />
              <span>COMPUTER SCIENCE &amp; ENGINEERING &#xB7; 2024&#x2014;2028</span>
            </motion.div>

            <div
              className="flex flex-col tracking-[-0.06em] sm:tracking-[-0.07em] lg:tracking-[-0.08em] font-black leading-[0.90] select-none text-[54px] sm:text-[82px] md:text-[100px] lg:text-[110px] xl:text-[118px]"
              aria-label="I BUILD. I LEAD. I INNOVATE."
            >
              <motion.div variants={itemVariants} className="text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.9)]">
                I BUILD.
              </motion.div>
              <motion.div variants={itemVariants} className="stroke-text drop-shadow-[0_2px_20px_rgba(0,0,0,0.9)]">
                I LEAD.
              </motion.div>
              <motion.div variants={itemVariants} className="text-white flex items-baseline drop-shadow-[0_2px_20px_rgba(0,0,0,0.9)]">
                <span>I INNOVATE</span>
                <span className="text-[#E31B23]">.</span>
              </motion.div>
            </div>

            <motion.p
              variants={itemVariants}
              className="mt-6 sm:mt-8 max-w-xl text-base sm:text-lg text-zinc-300 font-normal leading-relaxed"
            >
              {PERSONAL_INFO.heroBio}
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="mt-8 sm:mt-10 flex flex-wrap items-center gap-3 sm:gap-4"
            >
              <a
                href={PERSONAL_INFO.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                id="hero-cta-lets-talk"
                className="group relative inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 rounded-full bg-gradient-to-r from-[#9F0D16] via-[#E31B23] to-[#FF3B30] text-white font-semibold text-sm sm:text-base tracking-tight shadow-[0_0_25px_rgba(227,27,35,0.45)] hover:shadow-[0_0_40px_rgba(227,27,35,0.7)] hover:scale-[1.03] active:scale-[0.97] transition-all duration-300"
              >
                <Sparkles className="w-4 h-4" />
                <span>Let&apos;s Talk</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <a
                href="#projects"
                onClick={handleScrollToProjects}
                id="hero-cta-explore"
                className="group inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 rounded-full bg-[#111116]/70 backdrop-blur-sm hover:bg-white/10 border border-white/10 hover:border-white/25 text-white font-medium text-sm sm:text-base transition-all duration-300"
              >
                <span>Explore Projects</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white transition-colors" />
              </a>

              <a
                href={PERSONAL_INFO.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                id="hero-cta-linkedin"
                className="group inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 rounded-full bg-[#111116]/70 backdrop-blur-sm hover:bg-white/10 border border-white/10 hover:border-white/25 text-white font-medium text-sm sm:text-base transition-all duration-300"
              >
                <LinkedinIcon className="w-4 h-4 text-[#0077B5]" />
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white transition-colors" />
              </a>

              <a
                href={PERSONAL_INFO.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                id="hero-cta-github"
                className="group inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 rounded-full bg-[#111116]/70 backdrop-blur-sm hover:bg-white/10 border border-white/10 hover:border-white/25 text-white font-medium text-sm sm:text-base transition-all duration-300"
              >
                <GithubIcon className="w-4 h-4 text-zinc-300" />
                <span>GitHub</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white transition-colors" />
              </a>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mt-12 sm:mt-16 pt-8 border-t border-white/10 w-full grid grid-cols-3 gap-4 sm:gap-8 max-w-xl"
            >
              <div className="flex flex-col">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-black font-mono tracking-tight text-white flex items-baseline">
                  <span>3</span>
                  <span className="text-[#FF3B30]">+</span>
                </div>
                <div className="text-xs sm:text-sm text-zinc-400 font-medium mt-1">Leadership roles</div>
              </div>
              <div className="flex flex-col">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-black font-mono tracking-tight text-white flex items-baseline">
                  <span>6</span>
                  <span className="text-[#FF3B30]">+</span>
                </div>
                <div className="text-xs sm:text-sm text-zinc-400 font-medium mt-1">Project concepts</div>
              </div>
              <div className="flex flex-col">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-black font-mono tracking-tight text-white">
                  2028
                </div>
                <div className="text-xs sm:text-sm text-zinc-400 font-medium mt-1">Expected graduation</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Photo column - Hanging Digital ID Badge */}
          <div className="lg:col-span-5 xl:col-span-5 flex items-start justify-center order-first lg:order-last lg:relative self-stretch -mt-20 sm:-mt-24 lg:-mt-28 pointer-events-none">
            <motion.div
              ref={photoRef}
              initial={{ opacity: 0, y: -40, rotate: -2 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-20 will-change-transform w-full flex flex-col items-center pointer-events-auto"
              style={{
                transition: "transform 0.12s ease-out",
                transformOrigin: "top center",
              }}
            >
              {/* Pure Hanging ID Badge with extended high-res strap suspended from top of webpage */}
              <div className="relative w-[270px] sm:w-[310px] lg:w-[340px] aspect-[896/1850] max-h-[700px] lg:max-h-[760px] flex items-start justify-center">
                {/* Purple ambient back-glow behind the badge */}
                <div className="absolute top-[68%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[380px] h-[360px] sm:h-[420px] bg-[radial-gradient(ellipse_at_center,rgba(147,51,234,0.35)_0%,rgba(88,28,135,0.12)_55%,transparent_75%)] blur-3xl pointer-events-none -z-10" />

                <Image
                  src={HERO_PHOTO_SRC}
                  alt="Md Firdaush - Hanging Developer ID Badge"
                  fill
                  priority
                  sizes="(max-width: 640px) 270px, (max-width: 1024px) 310px, 340px"
                  className="object-contain object-top select-none filter contrast-[1.03] drop-shadow-[0_20px_45px_rgba(0,0,0,0.9)]"
                  onError={() => setPhotoError(true)}
                />
              </div>
            </motion.div>
          </div>

        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none z-10"
        aria-hidden="true"
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="text-[10px] font-mono text-zinc-600 tracking-[0.2em] uppercase">Scroll</span>
        <motion.div
          animate={reducedMotion ? {} : { y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-zinc-600 to-transparent"
        />
      </motion.div>
    </section>
  );
}
