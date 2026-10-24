"use client";

import { profileData } from "@/data/profile";
import {
  ArrowLeft,
  CheckCircle2,
  Compass,
  GraduationCap,
  Hammer,
  Milestone,
  Sparkles,
} from "lucide-react";

interface JourneyDetailViewProps {
  onClose: () => void;
}

export function JourneyDetailView({ onClose }: JourneyDetailViewProps) {
  const { journey } = profileData;

  return (
    <div className="space-y-8 text-zinc-200">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-400">
          <Compass className="w-4 h-4" />
          <span>Learning & Building Journey</span>
        </div>
        <span className="text-xs font-mono text-zinc-400">
          Editable Trajectory
        </span>
      </div>

      <div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
          From Foundations to Deployable Products
        </h2>
        <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-normal">
          An honest chronicle of growth as a software engineering student and pragmatic product creator.
        </p>
      </div>

      {/* Timeline List */}
      <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-2 sm:before:left-3 before:top-3 before:bottom-3 before:w-[2px] before:bg-gradient-to-b before:from-cyan-500 before:via-indigo-500 before:to-zinc-800">
        {journey.map((item, idx) => (
          <div key={idx} className="relative group/step">
            {/* Pulsing Timeline Node */}
            <span className="absolute -left-[27px] sm:-left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#0e1017] border-2 border-cyan-400 shadow-md shadow-cyan-500/20" />

            <div className="p-5 sm:p-6 rounded-3xl bg-white/[0.02] border border-white/[0.06] space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-mono text-cyan-400 font-semibold">
                  {item.period}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                  {item.badge}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">
                  {item.role}
                </h3>
                <p className="text-xs font-mono text-zinc-400">
                  {item.organization}
                </p>
              </div>

              <p className="text-sm text-zinc-300 leading-relaxed font-normal">
                {item.description}
              </p>

              {/* Highlights */}
              <div className="pt-2 space-y-2 border-t border-white/[0.04]">
                <div className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                  Key Milestones & Architectural Learnings:
                </div>
                {item.highlights.map((h, hIdx) => (
                  <div key={hIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
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
