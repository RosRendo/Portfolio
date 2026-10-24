"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { profileData } from "@/data/profile";
import { Project, projectsData } from "@/data/projects";
import { sound } from "@/lib/sound";
import { GitHubIcon, LinkedInIcon } from "@/components/icons/SocialIcons";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  CheckCircle2,
  Compass,
  Copy,
  Cpu,
  FileDown,
  Layers,
  Mail,
  MapPin,
  Server,
  Sparkles,
  Terminal,
  Workflow,
  X,
} from "lucide-react";

interface PersonalIdentityViewProps {
  onClose: () => void;
  onSelectProject?: (project: Project) => void;
}

export function PersonalIdentityView({
  onClose,
  onSelectProject,
}: PersonalIdentityViewProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(profileData.contact.email);
    sound.playSuccess();
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2400);
  };

  return (
    <div className="space-y-8 text-zinc-200">
      {/* ---------------- 1. EDITORIAL HEADER & METADATA ---------------- */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          {/* Monogram Seal */}
          <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center font-mono font-extrabold text-indigo-300 text-lg shadow-inner">
            {profileData.monogram}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono tracking-widest uppercase text-indigo-400 font-semibold">
                {profileData.profileId}
              </span>
              <span className="text-zinc-600">•</span>
              <span className="text-[11px] font-mono uppercase text-zinc-400">
                Digital Identity & Dossier
              </span>
            </div>
            <p className="text-xs text-zinc-400 font-mono">
              {profileData.tagline} — {profileData.subtagline}
            </p>
          </div>
        </div>

        {/* Status indicator */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-emerald-300 font-medium">
            Available for Select Roles & Projects
          </span>
        </div>
      </div>

      {/* ---------------- 2. HERO IDENTITY & SIGNATURE PHILOSOPHY ---------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Avatar & Identity lockup */}
        <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-5 p-6 rounded-3xl bg-white/[0.02] border border-white/10">
          <div className="flex items-start gap-4">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-indigo-500/40 shadow-xl shadow-indigo-500/15 shrink-0">
              <Image
                src="/images/avatar.jpg"
                alt="ROS RENDO developer portrait"
                fill
                sizes="96px"
                className="object-cover"
                priority
              />
            </div>

            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase bg-indigo-500/15 border border-indigo-500/30 text-indigo-300">
                <Sparkles className="w-2.5 h-2.5" /> Independent Builder
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-sans">
                {profileData.name}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-300 font-mono">
                {profileData.role}
              </p>
              <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-mono pt-1">
                <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                <span>Phnom Penh, Cambodia (UTC+7)</span>
              </div>
            </div>
          </div>

          {/* Quick Connect & CV Action Row */}
          <div className="pt-2 border-t border-white/10 space-y-2.5 w-full">
            {/* Copy Email Button */}
            <div
              onClick={handleCopyEmail}
              className="cursor-pointer flex items-center justify-between p-2.5 rounded-xl bg-white/[0.04] border border-white/10 hover:border-indigo-500/40 hover:bg-indigo-500/[0.08] transition-all"
              title="Click to copy email address"
            >
              <div className="flex items-center gap-2 min-w-0">
                <Mail className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span className="text-xs font-mono text-zinc-200 truncate">
                  {profileData.contact.email}
                </span>
              </div>
              <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/10 text-zinc-300 flex items-center gap-1">
                {copiedEmail ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3 text-zinc-400" />
                    <span>Copy</span>
                  </>
                )}
              </span>
            </div>

            {/* Social handles + CV */}
            <div className="grid grid-cols-3 gap-2">
              <a
                href={profileData.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-white/20 hover:bg-white/[0.06] text-xs font-mono text-zinc-300 transition-all"
              >
                <GitHubIcon className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>

              <a
                href={profileData.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-white/20 hover:bg-white/[0.06] text-xs font-mono text-sky-400 transition-all"
              >
                <LinkedInIcon className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
              </a>

              <a
                href={profileData.contact.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-indigo-600/20 border border-indigo-500/40 hover:bg-indigo-600/30 text-xs font-mono text-indigo-300 transition-all font-medium"
              >
                <FileDown className="w-3.5 h-3.5" />
                <span>CV PDF</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right: Personal Signature Philosophy Banner */}
        <div className="lg:col-span-7 flex flex-col justify-between p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-indigo-950/40 via-[#0e1017] to-black border border-indigo-500/30 shadow-2xl relative overflow-hidden h-full">
          {/* Subtle background glow & watermark */}
          <div className="absolute -top-16 -right-16 w-56 h-56 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -right-6 font-mono text-[90px] font-black text-white/[0.03] select-none pointer-events-none">
            R.
          </div>

          <div className="space-y-3 relative z-10">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-indigo-400 font-semibold">
              <Compass className="w-4 h-4" />
              <span>Core Engineering Ethos</span>
            </div>

            <blockquote className="text-lg sm:text-xl md:text-2xl font-serif italic text-white leading-snug tracking-tight">
              &ldquo;{profileData.personalPhilosophy}&rdquo;
            </blockquote>

            <p className="text-xs sm:text-sm text-zinc-400 font-mono leading-relaxed pt-1">
              Software engineering student and independent product builder focused on
              translating complex requirements into deployable architectures, resilient
              backend schemas, and tactile, motion-driven user interfaces.
            </p>
          </div>

          <div className="pt-4 mt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-zinc-400 relative z-10">
            <span className="text-indigo-300 font-medium">
              FOCUS: {profileData.focusTag}
            </span>
            <span className="text-zinc-500">
              LOCATION: {profileData.locationTag}
            </span>
          </div>
        </div>
      </div>

      {/* ---------------- 3. ASYMMETRIC EDITORIAL BODY ---------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-2">
        {/* Left Column (5 cols): Story & Exploration */}
        <div className="lg:col-span-5 space-y-6">
          {/* My Story */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">
              <Terminal className="w-3.5 h-3.5 text-indigo-400" />
              <span>My Story & Drive</span>
            </div>

            <div className="space-y-3 text-sm text-zinc-300 leading-relaxed font-sans">
              {profileData.bio.story.map((paragraph, idx) => (
                <p key={idx} className="bg-white/[0.015] p-3.5 rounded-2xl border border-white/[0.06]">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* What I'm Exploring */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
              <Cpu className="w-3.5 h-3.5" />
              <span>What I&apos;m Exploring</span>
            </div>

            <div className="space-y-2">
              {profileData.exploring.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs font-mono text-zinc-300"
                >
                  <span className="text-indigo-400 font-bold">›</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (7 cols): How I Build (Pipeline) & Selected Work */}
        <div className="lg:col-span-7 space-y-6">
          {/* How I Build Pipeline */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-indigo-400 font-semibold">
                <Workflow className="w-3.5 h-3.5" />
                <span>How I Build: Architecture to Deployment</span>
              </div>
              <span className="text-[11px] font-mono text-zinc-500">
                4-Stage Pipeline
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {profileData.howIBuild.map((step) => (
                <div
                  key={step.stage}
                  className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/15 transition-colors space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-indigo-400">
                      STAGE {step.stage}
                    </span>
                    <span className="text-xs font-semibold text-white">
                      {step.title}
                    </span>
                  </div>

                  <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                    {step.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {step.tools.map((tool, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-white/[0.03] text-zinc-300 border border-white/[0.06]"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Selected Work (Direct Interactive Project Launchers) */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-zinc-300 font-semibold">
                <Layers className="w-3.5 h-3.5 text-indigo-400" />
                <span>Selected Shipped Work</span>
              </div>
              <span className="text-[11px] font-mono text-indigo-400">
                Click to inspect architecture ↗
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {projectsData.map((project) => (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => {
                    sound.playOpen();
                    if (onSelectProject) onSelectProject(project);
                  }}
                  className="group text-left p-3.5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.08] hover:border-indigo-500/50 transition-all flex flex-col justify-between h-36 relative overflow-hidden"
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span
                        className="text-[10px] font-mono uppercase font-semibold"
                        style={{ color: project.accentColor }}
                      >
                        {project.category}
                      </span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white transition-colors group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                    <div className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">
                      {project.title}
                    </div>
                  </div>

                  <div className="text-[11px] font-mono text-zinc-400 truncate">
                    {project.techStack.flatMap((ts) => ts.items).slice(0, 3).join(" • ")}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ---------------- 4. FOOTER RETURN BAR ---------------- */}
      <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-zinc-500">
        <button
          type="button"
          onClick={() => {
            sound.playClose();
            onClose();
          }}
          className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-semibold transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to 3D Cards</span>
        </button>

        <div className="flex items-center gap-3">
          <span>ROS RENDO • ARCHITECTURE TO DEPLOYMENT</span>
          <span>•</span>
          <span>
            Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/15 text-zinc-300">Esc</kbd>
          </span>
        </div>
      </div>
    </div>
  );
}
