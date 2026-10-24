"use client";

import Image from "next/image";
import { Project, projectsData } from "@/data/projects";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Database,
  ExternalLink,
  Layers,
  Server,
  ShieldAlert,
  Sparkles,
  Workflow,
} from "lucide-react";
import { GitHubIcon } from "@/components/icons/SocialIcons";

interface ProjectDetailViewProps {
  project: Project;
  onClose: () => void;
  onSelectProject?: (project: Project) => void;
}

export function ProjectDetailView({ project, onClose, onSelectProject }: ProjectDetailViewProps) {
  const currentIdx = projectsData.findIndex((p) => p.id === project.id);
  const nextIdx = (currentIdx + 1) % projectsData.length;
  const nextProject = projectsData[nextIdx];
  return (
    <div className="space-y-8 text-zinc-200">
      {/* Top action bar inside modal */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <span
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: project.accentColor }}
          />
          <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">
            {project.category}
          </span>
          <span
            className="px-2.5 py-0.5 rounded-full text-[11px] font-mono border font-medium"
            style={{
              backgroundColor: `${project.accentColor}15`,
              borderColor: `${project.accentColor}40`,
              color: project.accentColor,
            }}
          >
            {project.status}
          </span>
        </div>

        {/* Live and GitHub links */}
        <div className="flex items-center gap-3">
          {project.links.demo && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-mono font-medium shadow-md transition-colors"
            >
              <span>Live Preview</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/10 border border-white/10 text-white text-xs font-mono transition-colors"
            >
              <GitHubIcon className="w-3.5 h-3.5" />
              <span>Source Code</span>
            </a>
          )}
        </div>
      </div>

      {/* Main Title & Tagline */}
      <div>
        <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white mb-2">
          {project.title}
        </h2>
        <p className="text-base sm:text-lg text-zinc-300 font-normal leading-relaxed">
          {project.tagline}
        </p>
      </div>

      {/* High-res Image Preview */}
      <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-white/15 shadow-2xl shadow-black/90">
        <Image
          src={project.image}
          alt={`${project.title} Interface`}
          fill
          sizes="(max-width: 1200px) 100vw, 1000px"
          className="object-cover"
          priority
        />
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {project.metrics.map((m, idx) => (
          <div
            key={idx}
            className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.08]"
          >
            <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">
              {m.label}
            </div>
            <div className="text-sm sm:text-base font-semibold text-white mt-1">
              {m.value}
            </div>
          </div>
        ))}
      </div>

      {/* Overview, Problem & Solution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-indigo-400 font-semibold">
            <ShieldAlert className="w-4 h-4" /> The Problem
          </div>
          <p className="text-sm text-zinc-300 leading-relaxed">
            {project.problem}
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
            <Sparkles className="w-4 h-4" /> The Engineering Solution
          </div>
          <p className="text-sm text-zinc-300 leading-relaxed">
            {project.solution}
          </p>
        </div>
      </div>

      {/* Key Features List */}
      <div className="space-y-3">
        <h3 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-indigo-400" /> Key Features & Capabilities
        </h3>
        <div className="grid grid-cols-1 gap-2.5">
          {project.keyFeatures.map((feat, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-start gap-3"
            >
              <span className="w-5 h-5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 flex items-center justify-center text-xs font-mono shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <span className="text-sm text-zinc-300 leading-relaxed font-normal">
                {feat}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Architecture Deep Dive */}
      <div className="space-y-4 pt-4 border-t border-white/10">
        <div className="flex items-center gap-2.5">
          <Workflow className="w-5 h-5 text-indigo-400" />
          <h3 className="text-lg font-bold tracking-tight text-white">
            System Architecture & Data Flow
          </h3>
        </div>
        <p className="text-sm text-zinc-300 leading-relaxed">
          {project.architecture.overview}
        </p>

        {/* Sequenced Flow Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {project.architecture.diagramSteps.map((step, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1.5"
            >
              <div className="text-xs font-mono text-indigo-400 font-semibold">
                Step 0{idx + 1}
              </div>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                {step}
              </p>
            </div>
          ))}
        </div>

        {/* Architecture Components Table */}
        <div className="rounded-2xl border border-white/10 overflow-hidden mt-4">
          <div className="bg-white/[0.03] px-4 py-2.5 border-b border-white/10 text-xs font-mono uppercase tracking-wider text-zinc-400">
            System Tier Breakdown
          </div>
          <div className="divide-y divide-white/[0.06]">
            {project.architecture.components.map((c, idx) => (
              <div
                key={idx}
                className="p-3.5 sm:px-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs sm:text-sm"
              >
                <div className="font-semibold text-white">{c.name}</div>
                <div className="text-zinc-400 text-xs sm:text-sm sm:max-w-md">{c.role}</div>
                <div className="font-mono text-xs text-indigo-300 bg-indigo-500/10 px-2.5 py-1 rounded-md border border-indigo-500/20 self-start sm:self-auto">
                  {c.tech}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Engineering Challenges & Decisions */}
      <div className="space-y-4 pt-4 border-t border-white/10">
        <h3 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-indigo-400" /> Challenges & Architectural Tradeoffs
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {project.challenges.map((c, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-2"
            >
              <div className="text-xs font-mono uppercase tracking-wider text-rose-400 font-semibold">
                Challenge: {c.challenge}
              </div>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                {c.solution}
              </p>
            </div>
          ))}

          {project.decisions.map((d, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-2"
            >
              <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
                Decision: {d.title}
              </div>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                {d.reasoning}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Tech Stack Matrix */}
      <div className="space-y-4 pt-4 border-t border-white/10">
        <h3 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
          <Cpu className="w-5 h-5 text-indigo-400" /> Technologies Applied
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {project.techStack.map((group, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-2"
            >
              <div className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">
                {group.category}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-zinc-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Next Case Study Teaser Card */}
      {nextProject && onSelectProject && (
        <div className="pt-8 border-t border-white/10">
          <div className="text-xs font-mono uppercase tracking-wider text-zinc-500 mb-3">
            Next Engineering Case Study:
          </div>
          <div
            onClick={() => onSelectProject(nextProject)}
            className="group cursor-pointer p-6 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-indigo-500/40 hover:bg-white/[0.05] transition-all flex items-center justify-between"
            role="button"
            tabIndex={0}
          >
            <div>
              <span className="text-xs font-mono text-indigo-400 font-semibold">
                {nextProject.category}
              </span>
              <h4 className="text-xl sm:text-2xl font-bold text-white group-hover:text-indigo-200 transition-colors mt-0.5">
                {nextProject.title}
              </h4>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1 line-clamp-1">
                {nextProject.tagline}
              </p>
            </div>
            <div className="w-11 h-11 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center text-white group-hover:bg-indigo-600 group-hover:scale-105 transition-all shadow-md shrink-0 ml-4">
              <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </div>
      )}

      {/* Bottom Close / Return Action */}
      <div className="pt-8 border-t border-white/10 flex items-center justify-between">
        <button
          type="button"
          onClick={onClose}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.06] hover:bg-white/10 border border-white/10 text-xs font-mono text-zinc-200 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to 3D Cards</span>
        </button>

        <span className="text-xs font-mono text-zinc-400">
          Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/20 text-zinc-300">Esc</kbd> to return
        </span>
      </div>
    </div>
  );
}
