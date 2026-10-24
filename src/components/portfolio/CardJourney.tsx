"use client";

import { motion } from "framer-motion";
import { sound } from "@/lib/sound";
import { profileData } from "@/data/profile";
import { ArrowUpRight, Compass, Milestone, Sparkles } from "lucide-react";

interface CardJourneyProps {
  onOpen: () => void;
}

export function CardJourney({ onOpen }: CardJourneyProps) {
  const { journey } = profileData;

  return (
    <motion.div
      layoutId="card-journey"
      onClick={() => {
        sound.playOpen();
        onOpen();
      }}
      onMouseEnter={() => sound.playHover()}
      className="card-specular group cursor-pointer rounded-3xl p-6 sm:p-7 flex flex-col justify-between relative overflow-hidden transition-all duration-300 hover:-translate-y-1"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          sound.playOpen();
          onOpen();
        }
      }}
      aria-label="Open Journey and Experience Timeline"
    >
      <div className="ambient-glow -top-20 -right-20 w-52 h-52 bg-cyan-500/15 group-hover:opacity-30" />

      <div>
        {/* Header */}
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-lg font-semibold tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                Experience & Journey
              </h3>
              <p className="text-xs text-zinc-400 font-mono">
                Student & independent builder path
              </p>
            </div>
          </div>

          <div className="w-9 h-9 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-zinc-400 group-hover:text-white group-hover:border-cyan-500/40 group-hover:bg-cyan-500/10 transition-all">
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>

        <p className="text-sm text-zinc-300 leading-relaxed mb-4">
          An authentic engineering journey — from computer science fundamentals to shipping production-ready web apps and backend services.
        </p>

        {/* Mini timeline nodes */}
        <div className="relative pl-4 space-y-4 before:absolute before:left-1 before:top-2 before:bottom-2 before:w-[2px] before:bg-white/10">
          {journey.slice(0, 2).map((step, idx) => (
            <div key={idx} className="relative group/node">
              {/* Dot */}
              <span className="absolute -left-[19px] top-1.5 w-2 h-2 rounded-full bg-cyan-400 ring-4 ring-[#11131c]" />

              <div className="text-xs font-mono text-cyan-300 font-medium">
                {step.period}
              </div>
              <div className="text-sm font-semibold text-white">
                {step.role}
              </div>
              <p className="text-xs text-zinc-400 font-mono line-clamp-1 mt-0.5">
                {step.organization}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer trigger */}
      <div className="pt-4 mt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-cyan-400/90 group-hover:text-cyan-300">
        <span>Inspect Milestones & Learnings</span>
        <span className="text-[11px] opacity-70 group-hover:opacity-100">Click to expand</span>
      </div>
    </motion.div>
  );
}
