"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star, GitFork, ArrowUpRight, FolderGit2, RefreshCw, Terminal } from "lucide-react";
import { GithubIcon } from "@/components/Icons";
import { PERSONAL_INFO } from "@/data/portfolioData";

interface RepoItem {
  id?: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
}

interface ProfileData {
  name: string;
  login: string;
  avatar_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  location: string | null;
}

// Fallback verified data directly from official FirdaushAnwer profile
const FALLBACK_PROFILE: ProfileData = {
  name: "Md Firdaush",
  login: "FirdaushAnwer",
  avatar_url: "https://avatars.githubusercontent.com/u/207341998?v=4",
  bio: "🎓 BE Computer Science student · 💻 Interested in full-stack development · 📱 Building Android applications with Kotlin · 🤖 Exploring AI/ML",
  public_repos: 8,
  followers: 1,
  following: 0,
  location: "Bengaluru / Tumakuru, Karnataka",
};

const FALLBACK_REPOS: RepoItem[] = [
  {
    name: "Green-Meter",
    description: "Personal Carbon FootPrint Tracker For College Students",
    html_url: "https://github.com/FirdaushAnwer/Green-Meter",
    stargazers_count: 0,
    forks_count: 0,
    language: "JavaScript",
    updated_at: "2026-09-08T05:34:32Z",
  },
  {
    name: "CodeCollab",
    description: "Real-time collaborative code editor and peer review workspace for students",
    html_url: "https://github.com/FirdaushAnwer/CodeCollab",
    stargazers_count: 0,
    forks_count: 0,
    language: "HTML / JS",
    updated_at: "2026-08-21T18:28:48Z",
  },
  {
    name: "KISAN-SWAP-ANDROID-APP-FOR-FARMER",
    description: "Fully Localized Android App For Farmers Of Karnataka with regional localization",
    html_url: "https://github.com/FirdaushAnwer/KISAN-SWAP-ANDROID-APP-FOR-FARMER",
    stargazers_count: 0,
    forks_count: 0,
    language: "Kotlin",
    updated_at: "2026-04-28T15:44:23Z",
  },
  {
    name: "KisanSwap-Android-Application",
    description: "Real-time crop data monitoring with prediction and detection telemetry",
    html_url: "https://github.com/FirdaushAnwer/KisanSwap-Android-Application",
    stargazers_count: 0,
    forks_count: 0,
    language: "Kotlin",
    updated_at: "2026-04-27T16:33:49Z",
  },
  {
    name: "AI-Driven-Mail-Route-Simulator",
    description: "AI emergency and disrupted route re-optimizer for postal transit hubs",
    html_url: "https://github.com/FirdaushAnwer/AI-Driven-Mail-Route-Simulator",
    stargazers_count: 1,
    forks_count: 0,
    language: "JavaScript",
    updated_at: "2025-12-15T09:42:11Z",
  },
  {
    name: "Attendance-Tracker-",
    description: "Student attendance compliance monitor and timetable management portal",
    html_url: "https://github.com/FirdaushAnwer/Attendance-Tracker-",
    stargazers_count: 2,
    forks_count: 0,
    language: "JavaScript",
    updated_at: "2025-12-13T06:37:15Z",
  },
];

export default function GitHubSection() {
  const [profile, setProfile] = useState<ProfileData>(FALLBACK_PROFILE);
  const [repos, setRepos] = useState<RepoItem[]>(FALLBACK_REPOS);
  const [isLoading, setIsLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    let isSubscribed = true;

    async function fetchGitHubData() {
      try {
        const [profileRes, reposRes] = await Promise.all([
          fetch("https://api.github.com/users/FirdaushAnwer"),
          fetch("https://api.github.com/users/FirdaushAnwer/repos?sort=updated&per_page=6"),
        ]);

        if (profileRes.ok && reposRes.ok) {
          const profileData = await profileRes.json();
          const reposData = await reposRes.json();

          if (isSubscribed && Array.isArray(reposData)) {
            setProfile(profileData);
            setRepos(reposData);
            setIsLive(true);
          }
        }
      } catch (e) {
        // Graceful fallback to verified static profile
        console.warn("GitHub API rate limit or network offline, using verified fallback cache.");
      } finally {
        if (isSubscribed) setIsLoading(false);
      }
    }

    fetchGitHubData();

    return () => {
      isSubscribed = false;
    };
  }, []);

  return (
    <section
      id="github"
      className="relative w-full py-24 sm:py-32 bg-[#050505] border-t border-white/5"
      aria-label="GitHub Repositories and Open Source"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        <div className="flex flex-col gap-12">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-xs font-mono tracking-widest text-[#FF3B30] uppercase mb-3 flex items-center gap-2">
                <GithubIcon className="w-4 h-4 text-[#FF3B30]" />
                OPEN SOURCE REPOSITORIES
              </span>
              <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
                Code on <br />
                <span className="text-zinc-500">GitHub.</span>
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono bg-white/5 border border-white/10 text-zinc-400">
                <span className={`w-2 h-2 rounded-full ${isLive ? "bg-emerald-500 animate-pulse" : "bg-[#FF3B30]"}`} />
                {isLive ? "Live GitHub Sync" : "Verified Profile"}
              </span>

              <a
                href={PERSONAL_INFO.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-[#E31B23]/15 border border-white/10 hover:border-[#E31B23]/40 text-xs font-mono font-medium text-white transition-colors"
              >
                <span>@{profile.login}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#FF3B30]" />
              </a>
            </div>
          </div>

          {/* Profile Overview Card */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#0B0B0F] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-5">
              <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-white/15 bg-zinc-900 shrink-0">
                <Image
                  src={profile.avatar_url}
                  alt={profile.name}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>

              <div>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <h3 className="text-xl font-bold text-white">{profile.name}</h3>
                  <span className="text-xs font-mono text-zinc-400">@{profile.login}</span>
                </div>
                <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-xl leading-relaxed whitespace-pre-line">
                  {profile.bio}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6 border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-8 shrink-0">
              <div className="flex flex-col items-center">
                <span className="text-2xl font-black font-mono text-white">
                  {profile.public_repos}
                </span>
                <span className="text-[11px] font-mono uppercase text-zinc-500">Repositories</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl font-black font-mono text-white">
                  {profile.followers}
                </span>
                <span className="text-[11px] font-mono uppercase text-zinc-500">Follower</span>
              </div>
            </div>
          </div>

          {/* Repositories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {repos.map((repo) => (
              <motion.a
                key={repo.name}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -4 }}
                className="group p-5 rounded-xl bg-[#0B0B0F]/90 border border-white/10 hover:border-[#E31B23]/50 transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-[0_10px_25px_-5px_rgba(227,27,35,0.2)]"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 text-zinc-400 group-hover:text-[#FF3B30] transition-colors">
                      <FolderGit2 className="w-4 h-4" />
                      <span className="text-sm font-bold font-mono text-white group-hover:text-[#FF3B30] transition-colors truncate max-w-[200px]">
                        {repo.name}
                      </span>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
                  </div>

                  <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed min-h-[32px]">
                    {repo.description || "Public software repository by Md Firdaush on GitHub."}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono text-zinc-500">
                  <span className="flex items-center gap-1.5 text-zinc-300">
                    <span className="w-2 h-2 rounded-full bg-[#E31B23]" />
                    {repo.language || "Code"}
                  </span>

                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-zinc-500" />
                      {repo.stargazers_count}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork className="w-3.5 h-3.5 text-zinc-500" />
                      {repo.forks_count}
                    </span>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>

          {/* Profile CTA */}
          <div className="flex justify-center mt-2">
            <a
              href={PERSONAL_INFO.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#111116] hover:bg-[#E31B23]/15 border border-white/10 hover:border-[#E31B23]/40 text-xs sm:text-sm font-medium text-white transition-all shadow-sm"
            >
              <GithubIcon className="w-4 h-4" />
              <span>Explore All Repositories on GitHub</span>
              <ArrowUpRight className="w-4 h-4 text-[#FF3B30]" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
