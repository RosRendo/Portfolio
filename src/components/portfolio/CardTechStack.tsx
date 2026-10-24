"use client";

import { motion } from "framer-motion";
import { sound } from "@/lib/sound";
import { skillGroups } from "@/data/skills";
import { ArrowUpRight, Cpu, Database, LayoutGrid, Terminal } from "lucide-react";

interface CardTechStackProps {
  onOpen: () => void;
}

export function CardTechStack({ onOpen }: CardTechStackProps) {
  const icons = {
    backend: Terminal,
    database: Database,
    frontend: LayoutGrid,
    infrastructure: Cpu,
  };

  return (
    <motion.div
      layoutId="card-skills"
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
      aria-label="Open Technical Skills and Stack Matrix"
    >
      <div className="ambient-glow -bottom-16 -left-16 w-52 h-52 bg-emerald-500/15 group-hover:opacity-30" />

      <div>
        {/* Header */}
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-lg font-semibold tracking-tight text-white group-hover:text-emerald-300 transition-colors">
                Technical Stack
              </h3>
              <p className="text-xs text-zinc-400 font-mono">
                Architecture, persistence & protocols
              </p>
            </div>
          </div>

          <div className="w-9 h-9 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-zinc-400 group-hover:text-white group-hover:border-emerald-500/40 group-hover:bg-emerald-500/10 transition-all">
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>

        <p className="text-sm text-zinc-300 leading-relaxed mb-5">
          Curated full-stack engineering toolset. Focused on backend reliability, relational data integrity, and responsive frontend systems.
        </p>

        {/* Layered stack preview cards */}
        <div className="grid grid-cols-2 gap-2.5 mb-2">
          {skillGroups.map((group) => {
            const IconComponent = icons[group.id] || Terminal;
            return (
              <div
                key={group.id}
                className="p-3 rounded-2xl bg-white/[0.02] border border-white/[0.06] group-hover:border-white/15 transition-all"
              >
                <div className="flex items-center gap-2 mb-2">
                  <IconComponent className="w-3.5 h-3.5 text-zinc-400 group-hover:text-emerald-400 transition-colors" />
                  <span className="text-xs font-semibold text-zinc-200 truncate">
                    {group.id === "frontend"
                      ? "Frontend"
                      : group.id === "backend"
                      ? "Backend"
                      : group.id === "database"
                      ? "Databases"
                      : "DevOps & Infra"}
                  </span>
                </div>

                <div className="flex flex-wrap gap-1 text-[11px] font-mono text-zinc-400">
                  {group.skills.slice(0, 2).map((skill) => (
                    <span
                      key={skill.name}
                      className="px-2 py-0.5 rounded-md bg-white/[0.03] border border-white/[0.04] text-zinc-300"
                    >
                      {skill.name.split("&")[0].trim()}
                    </span>
                  ))}
                  {group.skills.length > 2 && (
                    <span className="px-1.5 py-0.5 rounded-md bg-white/[0.02] text-zinc-400">
                      +{group.skills.length - 2}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer trigger */}
      <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-emerald-400/90 group-hover:text-emerald-300">
        <span>View Project-Skill Cross References</span>
        <span className="text-[11px] opacity-70 group-hover:opacity-100">Click to expand</span>
      </div>
    </motion.div>
  );
}
