"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { skillGroups, SkillItem, SkillGroup } from "@/data/skills";
import { profileData } from "@/data/profile";
import { sound } from "@/lib/sound";
import { SoundToggle } from "@/components/portfolio/SoundToggle";
import { TechIcon, getTechBrandColor } from "@/components/common/TechIcon";
import {
  ArrowLeft,
  ArrowUpRight,
  Terminal,
  Database,
  LayoutGrid,
  Cpu,
  Layers,
  Sparkles,
  FileDown,
  Compass,
  Search,
  Wrench,
  ShieldAlert,
} from "lucide-react";

const groupIcons: Record<string, typeof Terminal> = {
  backend: Terminal,
  database: Database,
  frontend: LayoutGrid,
  infrastructure: Cpu,
  tools: Wrench,
};

const groupThemeColors: Record<string, { badge: string; border: string; glow: string; text: string }> = {
  backend: {
    badge: "bg-indigo-500/10 text-indigo-300 border-indigo-500/30",
    border: "border-indigo-500/20",
    glow: "rgba(99, 102, 241, 0.15)",
    text: "text-indigo-400",
  },
  database: {
    badge: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
    border: "border-emerald-500/20",
    glow: "rgba(16, 185, 129, 0.15)",
    text: "text-emerald-400",
  },
  frontend: {
    badge: "bg-cyan-500/10 text-cyan-300 border-cyan-500/30",
    border: "border-cyan-500/20",
    glow: "rgba(6, 182, 212, 0.15)",
    text: "text-cyan-400",
  },
  infrastructure: {
    badge: "bg-amber-500/10 text-amber-300 border-amber-500/30",
    border: "border-amber-500/20",
    glow: "rgba(245, 158, 11, 0.15)",
    text: "text-amber-400",
  },
  tools: {
    badge: "bg-purple-500/10 text-purple-300 border-purple-500/30",
    border: "border-purple-500/20",
    glow: "rgba(168, 85, 247, 0.15)",
    text: "text-purple-400",
  },
};

export function SkillsDedicatedPage() {
  const [selectedGroup, setSelectedGroup] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const totalSkillsCount = useMemo(() => {
    return skillGroups.reduce((acc, g) => acc + g.skills.length, 0);
  }, []);

  const filteredGroups = useMemo(() => {
    return skillGroups
      .map((group) => {
        if (selectedGroup !== "all" && group.id !== selectedGroup) {
          return null;
        }

        const filteredSkills = group.skills.filter((skill) => {
          if (!searchQuery.trim()) return true;
          const query = searchQuery.toLowerCase();
          return (
            skill.name.toLowerCase().includes(query) ||
            skill.description.toLowerCase().includes(query) ||
            skill.appliedIn.some((tag) => tag.toLowerCase().includes(query)) ||
            skill.level.toLowerCase().includes(query)
          );
        });

        if (filteredSkills.length === 0) return null;

        return {
          ...group,
          skills: filteredSkills,
        };
      })
      .filter(Boolean) as SkillGroup[];
  }, [selectedGroup, searchQuery]);

  return (
    <div className="min-h-screen bg-[#07080f] text-white selection:bg-cyan-500/30 selection:text-white relative overflow-x-hidden font-sans">
      {/* ---------------- ATMOSPHERIC LIGHTING & ACCENT GLOWS ---------------- */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] rounded-full pointer-events-none -z-10"
        style={{
          background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)",
        }}
      />
      <div
        className="fixed bottom-0 right-10 w-[700px] h-[500px] rounded-full pointer-events-none -z-10"
        style={{
          background: "radial-gradient(circle, rgba(6,182,212,0.10) 0%, transparent 70%)",
        }}
      />
      <div className="fixed inset-0 bg-[radial-gradient(#ffffff04_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none -z-10 opacity-70" />

      {/* ---------------- STICKY TOP MINIMAL NAVBAR ---------------- */}
      <header className="sticky top-0 z-40 px-6 sm:px-10 lg:px-16 py-5 backdrop-blur-xl bg-[#07080f]/80 border-b border-white/[0.08] flex items-center justify-between">
        {/* Left: Navigation back */}
        <div className="flex items-center gap-4">
          <Link
            href="/"
            onClick={() => sound.playClose()}
            className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-zinc-400 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>HOME</span>
          </Link>

          <span className="opacity-25 hidden sm:inline">•</span>

          <Link
            href="/projects"
            onClick={() => sound.playOpen()}
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-zinc-400 hover:text-white transition-colors"
          >
            <Compass className="w-3.5 h-3.5 text-cyan-400" />
            <span>PROJECTS</span>
          </Link>

          <span className="opacity-25 hidden md:inline">•</span>

          <Link
            href="/about"
            onClick={() => sound.playOpen()}
            className="hidden md:inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-zinc-400 hover:text-white transition-colors"
          >
            <span>ABOUT</span>
          </Link>
        </div>

        {/* Center: Identity & Page Title */}
        <div className="flex items-center gap-2.5 text-xs font-mono text-zinc-400">
          <span className="font-bold text-white uppercase">{profileData.name}</span>
          <span className="opacity-30">•</span>
          <span className="text-cyan-400 font-semibold hidden sm:inline">SKILLS & SYSTEMS MATRIX</span>
        </div>

        {/* Right: Sound & Contact */}
        <div className="flex items-center gap-4">
          <SoundToggle />

          <a
            href={profileData.contact.cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playOpen()}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/20 bg-white/[0.05] hover:bg-white/15 text-xs font-mono transition-colors"
          >
            <FileDown className="w-3.5 h-3.5" />
            <span>CV</span>
          </a>

          <Link
            href="/contact"
            onClick={() => sound.playTab()}
            className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-cyan-300 hover:text-white transition-colors"
          >
            <span>CONTACT</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </header>

      {/* ---------------- MAIN CONTAINER ---------------- */}
      <main className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 py-12 sm:py-16 space-y-12">
        {/* HERO TITLE SECTION */}
        <section className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono uppercase tracking-wider">
            <Cpu className="w-3.5 h-3.5 animate-pulse" />
            <span>Technical Capabilities & Architecture Matrix</span>
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Tools, Protocols & Engineering Stack
            </h1>
            <p className="text-base sm:text-lg text-zinc-400 max-w-3xl leading-relaxed font-normal">
              An honest, production-tested toolkit verified directly from my active engineering CV: designing relational schemas, crafting resilient REST APIs, securing multi-role access control, and deploying containerized microservices.
            </p>
          </div>

          {/* Quick Metrics Banner */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-1">
              <span className="text-xs font-mono uppercase text-zinc-400">Total Competencies</span>
              <div className="text-2xl font-bold font-mono text-cyan-400">{totalSkillsCount}</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-1">
              <span className="text-xs font-mono uppercase text-zinc-400">Primary Focus</span>
              <div className="text-sm font-semibold text-white">Full-Stack & Backend</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-1">
              <span className="text-xs font-mono uppercase text-zinc-400">Core Runtime</span>
              <div className="text-sm font-semibold text-emerald-400">Node.js · TypeScript</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-1">
              <span className="text-xs font-mono uppercase text-zinc-400">Primary Database</span>
              <div className="text-sm font-semibold text-indigo-400">PostgreSQL + Prisma</div>
            </div>
          </div>
        </section>

        {/* ---------------- FILTER & SEARCH BAR ---------------- */}
        <section className="p-2 sm:p-3 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-md flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Domain tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            <button
              type="button"
              onClick={() => {
                sound.playTab();
                setSelectedGroup("all");
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono transition-all flex items-center gap-1.5 shrink-0 ${
                selectedGroup === "all"
                  ? "bg-white text-black font-semibold shadow-lg shadow-white/10"
                  : "text-zinc-400 hover:text-white hover:bg-white/[0.05]"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>All Domains ({totalSkillsCount})</span>
            </button>

            {skillGroups.map((group) => {
              const Icon = groupIcons[group.id] || Terminal;
              const isActive = selectedGroup === group.id;
              return (
                <button
                  key={group.id}
                  type="button"
                  onClick={() => {
                    sound.playTab();
                    setSelectedGroup(group.id);
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-mono transition-all flex items-center gap-1.5 shrink-0 ${
                    isActive
                      ? "bg-cyan-400 text-black font-semibold shadow-lg shadow-cyan-400/20"
                      : "text-zinc-400 hover:text-white hover:bg-white/[0.05]"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{group.title.split(" ")[0]} ({group.skills.length})</span>
                </button>
              );
            })}
          </div>

          {/* Search input */}
          <div className="relative shrink-0 md:w-64">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by skill, tag..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs font-mono text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400/50 transition-colors"
            />
          </div>
        </section>

        {/* ---------------- DOMAIN GROUPS & CARDS GRID ---------------- */}
        <section className="space-y-10">
          {filteredGroups.length === 0 ? (
            <div className="text-center py-16 px-4 rounded-3xl border border-white/[0.08] bg-white/[0.02] space-y-3">
              <ShieldAlert className="w-8 h-8 text-zinc-500 mx-auto" />
              <div className="text-sm font-semibold text-zinc-300">No matching skills found</div>
              <p className="text-xs text-zinc-500 max-w-sm mx-auto font-mono">
                Try searching for another keyword or reset the domain filter above.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedGroup("all");
                  setSearchQuery("");
                }}
                className="mt-2 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-mono text-white transition-colors"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            filteredGroups.map((group) => {
              const Icon = groupIcons[group.id] || Terminal;
              const theme = groupThemeColors[group.id] || groupThemeColors.backend;

              return (
                <div
                  key={group.id}
                  className="p-6 sm:p-8 rounded-3xl bg-white/[0.02] border border-white/[0.08] space-y-6 relative overflow-hidden"
                >
                  {/* Subtle top glow bar for this domain */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px] opacity-70"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${theme.glow}, transparent)`,
                    }}
                  />

                  {/* Header for Domain */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-white">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                          {group.title}
                        </h2>
                        <p className="text-xs text-zinc-400 font-mono">
                          {group.subtitle}
                        </p>
                      </div>
                    </div>

                    <span className="self-start sm:self-center px-3 py-1 rounded-full text-xs font-mono bg-white/[0.04] border border-white/[0.08] text-zinc-400">
                      {group.skills.length} competencies
                    </span>
                  </div>

                  {/* Skills Grid with Official Brand Logos */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {group.skills.map((skill) => {
                      const brandColor = getTechBrandColor(skill.name);
                      return (
                        <div
                          key={skill.name}
                          className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-white/15 transition-all duration-200 space-y-3 group flex flex-col justify-between"
                        >
                          <div className="space-y-3">
                            {/* Top: Skill Icon + Name & Proficiency badge */}
                            <div className="flex items-start justify-between gap-2.5">
                              <div className="flex items-center gap-2.5">
                                <div
                                  className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center p-1.5 shrink-0 group-hover:border-white/20 transition-colors"
                                  style={{
                                    boxShadow: `0 0 12px ${brandColor}15`,
                                  }}
                                >
                                  <TechIcon name={skill.name} className="w-5 h-5" />
                                </div>
                                <h3 className="text-sm sm:text-base font-semibold text-white group-hover:text-cyan-300 transition-colors leading-tight">
                                  {skill.name}
                                </h3>
                              </div>

                              <span
                                className={`px-2 py-0.5 rounded-full text-[9px] font-mono border uppercase tracking-wider shrink-0 ${
                                  skill.level === "Core Stack"
                                    ? "bg-cyan-500/10 text-cyan-300 border-cyan-500/30"
                                    : skill.level === "Advanced"
                                    ? "bg-indigo-500/10 text-indigo-300 border-indigo-500/30"
                                    : "bg-white/[0.05] text-zinc-300 border-white/10"
                                }`}
                              >
                                {skill.level}
                              </span>
                            </div>

                            {/* Middle: Honest Description */}
                            <p className="text-xs text-zinc-400 leading-relaxed font-normal">
                              {skill.description}
                            </p>
                          </div>

                          {/* Bottom: Applied In Highlights */}
                          <div className="pt-3 border-t border-white/[0.05] flex items-center gap-1.5 flex-wrap">
                            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">
                              Applied:
                            </span>
                            {skill.appliedIn.map((item) => (
                              <span
                                key={item}
                                className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.08] text-[10.5px] font-mono text-zinc-300 group-hover:border-white/15 transition-colors"
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })
          )}
        </section>

        {/* ---------------- HOW I INTEGRATE TECH (ETHOS BANNER) ---------------- */}
        <section className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-indigo-950/30 via-[#07080f] to-cyan-950/20 border border-white/[0.08] space-y-6">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-400">
            <Sparkles className="w-4 h-4" />
            <span>Architecture & Practical Philosophy</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="space-y-2">
              <div className="text-sm font-bold text-white font-mono">01. Relational Rigor</div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Before writing frontends or API controllers, database schemas, foreign keys, and status machines are defined in PostgreSQL to prevent silent data integrity bugs.
              </p>
            </div>
            <div className="space-y-2">
              <div className="text-sm font-bold text-white font-mono">02. Type Safety First</div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Strict TypeScript and Zod schemas across client and server boundaries ensure runtime parameters and contracts remain deterministic under real usage.
              </p>
            </div>
            <div className="space-y-2">
              <div className="text-sm font-bold text-white font-mono">03. Deterministic Ops</div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Applications are packaged in lightweight multi-stage Docker images and deployed on Linux VPS with reverse proxies and SSL for production readiness.
              </p>
            </div>
          </div>
        </section>

        {/* ---------------- BOTTOM FOOTER & CALL TO ACTION ---------------- */}
        <footer className="pt-10 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs font-mono text-zinc-400">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              onClick={() => sound.playClose()}
              className="inline-flex items-center gap-2 text-zinc-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Canvas</span>
            </Link>

            <span className="opacity-30">•</span>

            <Link
              href="/projects"
              onClick={() => sound.playOpen()}
              className="text-zinc-300 hover:text-white transition-colors"
            >
              View Projects
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <span>Ready to build together?</span>
            <Link
              href="/contact"
              onClick={() => sound.playTab()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-400 text-black font-bold hover:bg-cyan-300 transition-colors"
            >
              <span>Get in Touch</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </footer>
      </main>
    </div>
  );
}
