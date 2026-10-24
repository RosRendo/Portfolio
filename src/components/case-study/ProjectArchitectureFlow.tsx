"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Project } from "@/data/projects";
import { TechIcon } from "@/components/icons/TechIcons";

interface ProjectArchitectureFlowProps {
  project: Project;
}

export function ProjectArchitectureFlow({ project }: ProjectArchitectureFlowProps) {
  const [activeNode, setActiveNode] = useState<number | null>(null);

  // Extract up to 4 clean nodes from project architecture
  const nodes = (project.architecture?.components || []).slice(0, 4).map((comp, idx) => {
    const defaultLabels = ["Client / UI", "API Gateway", "Data Persistence", "Services & Edge"];
    const defaultTechs = ["Next.js • React", "Node.js • Express", "PostgreSQL • Prisma", "Vercel • Edge"];
    
    return {
      step: String(idx + 1).padStart(2, "0"),
      title: comp.name || defaultLabels[idx] || `Tier ${idx + 1}`,
      tech: comp.tech?.split(",")[0]?.trim() || defaultTechs[idx],
      fullTech: comp.tech || "",
      role: comp.role || "",
      stepDescription: project.architecture?.diagramSteps?.[idx] || "",
    };
  });

  return (
    <div className="relative w-full rounded-2xl sm:rounded-3xl border border-white/10 bg-[#090b12]/80 backdrop-blur-xl p-6 sm:p-10 lg:p-12 overflow-hidden shadow-[0_20px_70px_rgba(0,0,0,0.6)]">
      {/* Ambient background glow according to project accent */}
      <div
        className="absolute -top-32 -right-32 w-80 h-80 rounded-full blur-[140px] opacity-15 pointer-events-none"
        style={{ backgroundColor: project.accentColor }}
      />

      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8 sm:mb-12 pb-5 border-b border-white/[0.08]">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400">
            System Topology
          </span>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-1">
            Data Flow & Architecture Pipeline
          </h3>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>END-TO-END REACTIVE FLOW</span>
        </div>
      </div>

      {/* Main Flow: Desktop Horizontal / Mobile Vertical */}
      <div className="relative">
        {/* Animated Connecting SVG Wire (Desktop: horizontal line connecting nodes) */}
        <div className="hidden lg:block absolute top-[44px] left-[10%] right-[10%] h-[2px] pointer-events-none z-0">
          <svg className="w-full h-8 overflow-visible" preserveAspectRatio="none">
            <defs>
              <linearGradient id={`flow-grad-${project.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.3" />
                <stop offset="50%" stopColor={project.accentColor} stopOpacity="0.8" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.3" />
              </linearGradient>
            </defs>
            {/* Background passive wire */}
            <line
              x1="0"
              y1="4"
              x2="100%"
              y2="4"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
            {/* Animated drawing active wire */}
            <motion.line
              x1="0"
              y1="4"
              x2="100%"
              y2="4"
              stroke={`url(#flow-grad-${project.id})`}
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: "easeInOut" }}
            />
          </svg>

          {/* Traveling neon signal pulse */}
          <motion.div
            className="absolute top-[2px] w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.9)] -translate-x-1/2 -translate-y-1/2"
            animate={{
              left: ["0%", "100%"],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* The 4 Architectural Flow Nodes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 relative z-10">
          {nodes.map((node, i) => {
            const isHovered = activeNode === i;
            return (
              <motion.div
                key={i}
                onMouseEnter={() => setActiveNode(i)}
                onMouseLeave={() => setActiveNode(null)}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.12 }}
                className={`relative rounded-2xl p-5 sm:p-6 transition-all duration-300 cursor-default flex flex-col justify-between min-h-[170px] ${
                  isHovered
                    ? "bg-white/[0.07] border-cyan-400/50 shadow-[0_10px_35px_rgba(6,182,212,0.15)] -translate-y-1"
                    : "bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]"
                } border`}
              >
                {/* Node Top: Step number & Tech Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                        isHovered
                          ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/40"
                          : "bg-white/[0.04] text-zinc-300 border border-white/10"
                      }`}
                    >
                      <TechIcon name={node.tech || node.title} className="w-4 h-4" />
                    </div>
                    <span className="text-[11px] font-mono font-bold tracking-wider text-zinc-400">
                      STEP {node.step}
                    </span>
                  </div>

                  <span
                    className={`w-2 h-2 rounded-full transition-all ${
                      isHovered ? "bg-cyan-400 scale-125 shadow-[0_0_8px_rgba(6,182,212,0.8)]" : "bg-white/20"
                    }`}
                  />
                </div>

                {/* Node Title & Primary Tech */}
                <div>
                  <h4 className="text-base font-bold text-white tracking-tight">
                    {node.title}
                  </h4>
                  <div className="text-xs font-mono text-cyan-300/90 mt-1 font-semibold truncate">
                    {node.tech}
                  </div>
                </div>

                {/* Node Role / Short Flow summary */}
                <p className="text-xs text-zinc-400 leading-relaxed mt-3 line-clamp-2">
                  {node.stepDescription || node.role}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Architecture Short Takeaway */}
      {project.architecture?.overview && (
        <div className="mt-8 pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-zinc-400">
          <div className="flex items-center gap-2 text-zinc-300">
            <span className="text-cyan-400 font-bold">CORE ARCHITECTURE:</span>
            <span className="line-clamp-1">{project.architecture.overview}</span>
          </div>
          <div className="text-[11px] uppercase tracking-wider text-zinc-400 shrink-0">
            4-STAGE DECOUPLED TIER
          </div>
        </div>
      )}
    </div>
  );
}
