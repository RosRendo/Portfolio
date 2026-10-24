"use client";

import { skillGroups } from "@/data/skills";
import {
  ArrowLeft,
  CheckCircle2,
  Cpu,
  Database,
  Layers,
  LayoutGrid,
  Sparkles,
  Terminal,
} from "lucide-react";

interface SkillsDetailViewProps {
  onClose: () => void;
  onSelectProject?: (slug: string) => void;
}

export function SkillsDetailView({ onClose, onSelectProject }: SkillsDetailViewProps) {
  const groupIcons = {
    backend: Terminal,
    database: Database,
    frontend: LayoutGrid,
    infrastructure: Cpu,
  };

  return (
    <div className="space-y-8 text-zinc-200">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400">
          <Cpu className="w-4 h-4" />
          <span>Technical Stack & Systems Matrix</span>
        </div>
        <span className="text-xs font-mono text-zinc-400">
          Grouped by Engineering Domain
        </span>
      </div>

      <div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
          Engineering Tooling & Core Competencies
        </h2>
        <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-normal">
          An honest, hands-on toolset built through building full-stack products, architecting APIs, and relational modeling.
        </p>
      </div>

      {/* Domain Groups */}
      <div className="space-y-6">
        {skillGroups.map((group) => {
          const Icon = groupIcons[group.id] || Terminal;
          return (
            <div
              key={group.id}
              className="p-5 sm:p-6 rounded-3xl bg-white/[0.02] border border-white/[0.06] space-y-4"
            >
              <div className="flex items-center justify-between gap-3 border-b border-white/[0.06] pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-white">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">
                      {group.title}
                    </h3>
                    <p className="text-xs text-zinc-400 font-mono">
                      {group.subtitle}
                    </p>
                  </div>
                </div>

                <span className="text-xs font-mono text-zinc-400">
                  {group.skills.length} competencies
                </span>
              </div>

              {/* Skills Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {group.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04] hover:border-white/10 transition-colors space-y-2"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="text-sm font-semibold text-white">
                        {skill.name}
                      </div>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-white/[0.05] border border-white/10 text-zinc-300">
                        {skill.level}
                      </span>
                    </div>

                    <p className="text-xs text-zinc-300 leading-relaxed">
                      {skill.description}
                    </p>

                    {/* Applied In Tags */}
                    <div className="pt-2 flex items-center gap-1.5 flex-wrap">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                        Applied in:
                      </span>
                      {skill.appliedIn.map((item) => (
                        <span
                          key={item}
                          className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.06] text-[11px] font-mono text-zinc-300"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Return button */}
      <div className="pt-6 border-t border-white/10 flex items-center justify-between">
        <button
          type="button"
          onClick={onClose}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.06] hover:bg-white/10 border border-white/10 text-xs font-mono text-zinc-200 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Card World</span>
        </button>

        <span className="text-xs font-mono text-zinc-400">
          Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/20 text-zinc-300">Esc</kbd> to return
        </span>
      </div>
    </div>
  );
}
