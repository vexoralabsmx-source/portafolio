"use client";
import { useEffect, useState } from "react";
import { FiGithub, FiDownload, FiBook, FiUsers, FiEye, FiArrowDown, FiStar, FiGitBranch, FiExternalLink } from "react-icons/fi";
import TrackedLink from "@/components/TrackedLink";
import Cursor from "@/components/Cursor";

function CountUp({ target, suffix = "" }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!target) return;
    let start = 0;
    const duration = 1200;
    const step = 16;
    const increment = target / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) { setVal(target); clearInterval(timer); }
      else setVal(Math.floor(start));
    }, step);
    return () => clearInterval(timer);
  }, [target]);
  return <>{val.toLocaleString()}{suffix}</>;
}

const GITHUB_USER = "Saarangggg";
const GITHUB_REPO = "Saarangggg/nextjs-cinematic-portfolio";

export default function OpenSourceView() {
  const [stats, setStats] = useState(null);
  const [ghRepo, setGhRepo] = useState(null);
  const [ghUser, setGhUser] = useState(null);

  useEffect(() => {
    fetch("/api/analytics/stats")
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (data) setStats(data); })
      .catch(() => {});

    fetch(`https://api.github.com/repos/${GITHUB_REPO}`)
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (data) setGhRepo(data); })
      .catch(() => {});

    fetch(`https://api.github.com/users/${GITHUB_USER}`)
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (data) setGhUser(data); })
      .catch(() => {});
  }, []);

  const downloads  = stats?.totalDownloads ?? 0;
  const repoViews  = stats?.clicksByLabel?.find?.(c => c._id === "Open Source Repository")?.count ?? 0;
  const totalVisits = stats?.totalVisits ?? 0;
  const stars = ghRepo?.stargazers_count ?? 0;
  const forks = ghRepo?.forks_count ?? 0;

  return (
    <main className="min-h-screen pt-32 pb-20 px-6 md:px-20 flex flex-col items-center justify-center relative overflow-hidden">
      <Cursor />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#e1251b]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-3xl w-full text-center flex flex-col items-center">
        <div className="w-20 h-20 bg-bone/5 border border-bone/10 rounded-full flex items-center justify-center mb-8">
          <FiGithub size={40} className="text-[#e1251b]" />
        </div>

        <h1 className="text-bone text-5xl md:text-7xl font-black tracking-tighter mb-6">
          Open Source <br/>
          <span className="text-bone/30">Initiative</span>
        </h1>

        <p className="text-bone/50 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto mb-10">
          This portfolio is entirely open-source. My goal is to help other developers build premium, high-end cinematic experiences by studying the code, animations, and architecture used here.
        </p>

        {/* ── GitHub Profile Card ── */}
        <a
          href={`https://github.com/${GITHUB_USER}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center gap-4 bg-bone/[0.03] hover:bg-bone/[0.06] border border-bone/8 rounded-2xl p-4 mb-6 transition-all duration-300 group text-left"
        >
          {ghUser?.avatar_url ? (
            <img src={ghUser.avatar_url} alt={GITHUB_USER} className="w-12 h-12 rounded-full border border-bone/10" />
          ) : (
            <div className="w-12 h-12 rounded-full bg-bone/5 border border-bone/10 flex items-center justify-center">
              <FiGithub size={20} className="text-bone/30" />
            </div>
          )}
          <div className="flex-1 min-w-0 text-left">
            <p className="text-bone font-bold text-sm">{ghUser?.name || GITHUB_USER}</p>
            <p className="text-bone/30 text-xs truncate">{ghUser?.bio || `github.com/${GITHUB_USER}`}</p>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <div className="flex items-center gap-1.5 text-bone/40">
              <FiStar size={13} className="text-yellow-400" />
              <span className="text-sm font-bold text-bone">{ghRepo ? stars.toLocaleString() : <span className="text-bone/20">—</span>}</span>
            </div>
            <div className="flex items-center gap-1.5 text-bone/40">
              <FiGitBranch size={13} />
              <span className="text-sm font-bold text-bone">{ghRepo ? forks.toLocaleString() : <span className="text-bone/20">—</span>}</span>
            </div>
            <FiExternalLink size={13} className="text-bone/20 group-hover:text-[#e1251b] transition-colors" />
          </div>
        </a>

        {/* ── Live Stats ── */}
        <div className="w-full grid grid-cols-3 gap-3 mb-12">
          {[
            { icon: FiArrowDown, label: "Downloads",    value: downloads,   suffix: "+" },
            { icon: FiEye,       label: "Repo Views",   value: repoViews,   suffix: "+" },
            { icon: FiUsers,     label: "Site Visits",  value: totalVisits, suffix: "+" },
          ].map(({ icon: Icon, label, value, suffix }) => (
            <div key={label} className="flex flex-col items-center gap-1.5 py-5 px-3 bg-bone/[0.03] border border-bone/8 rounded-2xl">
              <Icon size={14} className="text-[#e1251b] mb-1" />
              <span className="text-bone font-black text-2xl md:text-3xl tracking-tighter">
                {stats ? <CountUp target={value} suffix={suffix} /> : <span className="text-bone/20 animate-pulse">—</span>}
              </span>
              <span className="text-[9px] uppercase tracking-[0.35em] text-bone/25 font-medium">{label}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
          <TrackedLink
            href="https://github.com/Saarangggg/nextjs-cinematic-portfolio"
            isExternal={true}
            target="_blank"
            rel="noopener noreferrer"
            label="Open Source Repository"
            className="w-full sm:w-auto px-8 py-4 bg-bone text-black font-black text-[11px] uppercase tracking-[0.2em] rounded-full hover:scale-105 transition-transform duration-300 flex items-center justify-center gap-3"
          >
            <FiGithub size={16} />
            View Repository
          </TrackedLink>

          <TrackedLink
            href="https://github.com/Saarangggg/nextjs-cinematic-portfolio/archive/refs/heads/main.zip"
            isExternal={true}
            target="_blank"
            rel="noopener noreferrer"
            label="Open Source Download"
            className="w-full sm:w-auto px-8 py-4 bg-transparent border border-bone/10 text-bone font-bold text-[11px] uppercase tracking-[0.2em] rounded-full hover:bg-bone/5 transition-colors duration-300 flex items-center justify-center gap-3"
          >
            <FiDownload size={16} />
            Download Source
          </TrackedLink>

          <TrackedLink
            href="/open-source/docs"
            label="Open Source Docs"
            className="w-full sm:w-auto px-8 py-4 bg-[#e1251b]/10 border border-[#e1251b]/20 text-[#e1251b] font-bold text-[11px] uppercase tracking-[0.2em] rounded-full hover:bg-[#e1251b]/20 transition-colors duration-300 flex items-center justify-center gap-3"
          >
            <FiBook size={16} />
            Documentation
          </TrackedLink>
        </div>

        <div className="mt-20 pt-10 border-t border-bone/5 w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="p-6 bg-bone/[0.02] border border-bone/5 rounded-3xl hover:bg-bone/[0.04] transition-colors">
              <h3 className="text-bone font-bold mb-2">Modern Stack</h3>
              <p className="text-bone/40 text-sm">Built with Next.js App Router, React, and Tailwind CSS for optimal performance.</p>
            </div>
            <div className="p-6 bg-bone/[0.02] border border-bone/5 rounded-3xl hover:bg-bone/[0.04] transition-colors">
              <h3 className="text-bone font-bold mb-2">Cinematic Motion</h3>
              <p className="text-bone/40 text-sm">Smooth, high-end animations powered by GSAP and custom WebGL components.</p>
            </div>
            <div className="p-6 bg-bone/[0.02] border border-bone/5 rounded-3xl hover:bg-bone/[0.04] transition-colors">
              <h3 className="text-bone font-bold mb-2">Admin Dashboard</h3>
              <p className="text-bone/40 text-sm">Includes a secure, hidden admin panel connected to a robust database.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
