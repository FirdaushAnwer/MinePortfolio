"use client";

import { useState } from "react";
import Preloader from "@/components/Preloader";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import GitHubSection from "@/components/GitHubSection";
import LeadershipSection from "@/components/LeadershipSection";
import AchievementsSection from "@/components/AchievementsSection";
import CertificationsSection from "@/components/CertificationsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  const [preloaderDone, setPreloaderDone] = useState(false);

  return (
    <SmoothScroll>
      {/* Cinematic Initial Preloader */}
      {!preloaderDone && <Preloader onComplete={() => setPreloaderDone(true)} />}

      {/* Desktop Custom Cursor & Ambient Glow */}
      <CustomCursor />

      {/* Floating Navigation Bar */}
      <Navbar />

      <main className="flex min-h-screen flex-col bg-[#050505] text-[#FFFFFF] overflow-x-hidden">
        {/* Hero Section */}
        <HeroSection />

        {/* 01 / ABOUT */}
        <AboutSection />

        {/* 02 / SKILLS */}
        <SkillsSection />

        {/* 03 / PROJECTS */}
        <ProjectsSection />

        {/* GITHUB OPEN SOURCE */}
        <GitHubSection />

        {/* 04 / LEADERSHIP & CODE CRACKERS */}
        <LeadershipSection />

        {/* 05 / ACHIEVEMENTS */}
        <AchievementsSection />

        {/* CERTIFICATIONS */}
        <CertificationsSection />

        {/* 06 / CONTACT */}
        <ContactSection />
      </main>

      {/* Minimal Footer */}
      <Footer />
    </SmoothScroll>
  );
}
