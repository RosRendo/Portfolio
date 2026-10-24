"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Project, projectsData } from "@/data/projects";
import { sound } from "@/lib/sound";
import { ArrowUpRight, Layers, ExternalLink, ShieldCheck, Zap } from "lucide-react";

interface CardProjectsProps {
  onOpenProject: (project: Project) => void;
}

export function CardProjects({ onOpenProject }: CardProjectsProps) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const currentProject = projectsData[selectedIdx];

  return (
    <motion.div
      layoutId={`card-project-${currentProject.id}`}
      className="card-specular group relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between overflow-hidden transition-all duration-300 hover:-translate-y-1"
      role="region"
      aria-label="Featured Projects Showcase"
    >
      {/* Dynamic ambient color glow according to project accent */}
      <div
        className="ambient-glow -top-24 -left-24 w-72 h-72 transition-all duration-700"
        style={{ backgroundColor: currentProject.accentColor }}
      />

      {/* Top Bar: Label & Interactive Project Switcher */}
      <div className="relative z-10">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">
              Featured Engineering Projects
            </span>
          </div>

          {/* Quick tab switcher right on the card (Horizontal scrollable for 10 projects) */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/40 border border-white/10 text-xs font-mono max-w-full overflow-x-auto scrollbar-thin scrollbar-thumb-white/20">
            {projectsData.map((proj, idx) => {
              const isActive = idx === selectedIdx;
              return (
                <button
                  key={proj.id}
                  id={`tab-project-${proj.id}`}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    sound.playTab();
                    setSelectedIdx(idx);
                  }}
                  className={`px-2.5 py-1 rounded-lg transition-all whitespace-nowrap text-[11px] ${
                    isActive
                      ? "bg-white/15 text-white font-medium shadow-sm border border-white/10"
                      : "text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.05]"
                  }`}
                  aria-selected={isActive}
                >
                  {String(idx + 1).padStart(2, "0")} • {proj.title}
                </button>
              );
            })}
          </div>
        </div>

        {/* Project Visual Showcase Box (Clickable Link to dedicated case study page) */}
        <Link
          href={`/projects/${currentProject.slug}`}
          onClick={() => sound.playOpen()}
          onMouseEnter={() => sound.playHover()}
          className="cursor-pointer relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/80 group-hover:border-white/20 transition-all mb-6 block"
          aria-label={`Open detailed case study for ${currentProject.title}`}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentProject.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.35 }}
              className="relative w-full h-full"
            >
              <Image
                src={currentProject.image}
                alt={`${currentProject.title} Interface Preview`}
                fill
                sizes="(max-width: 1200px) 100vw, 800px"
                className="object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                priority
              />

              {/* Gradient scrim for depth and text legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

              {/* Status and category badges overlay */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 pointer-events-none">
                <span className="px-3 py-1 rounded-full text-xs font-mono bg-black/60 backdrop-blur-md border border-white/15 text-white font-medium shadow-lg">
                  {currentProject.category}
                </span>

                <span
                  className="px-2.5 py-1 rounded-full text-[11px] font-mono border backdrop-blur-md font-semibold tracking-wide"
                  style={{
                    backgroundColor: `${currentProject.accentColor}20`,
                    borderColor: `${currentProject.accentColor}50`,
                    color: currentProject.accentColor,
                  }}
                >
                  {currentProject.status}
                </span>
              </div>

              {/* Bottom preview overlay */}
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4 pointer-events-none">
                <div>
                  <h4 className="text-xl sm:text-2xl font-bold tracking-tight text-white drop-shadow-md">
                    {currentProject.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-zinc-300 font-mono line-clamp-1 mt-0.5">
                    {currentProject.tagline}
                  </p>
                </div>

                <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-indigo-500/80 transition-all pointer-events-auto">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </Link>

        {/* Narrative & Metrics */}
        <div className="space-y-4">
          <p className="text-sm text-zinc-300 leading-relaxed font-normal">
            {currentProject.shortDescription}
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
            {currentProject.metrics.map((m, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-left"
              >
                <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                  {m.label}
                </div>
                <div className="text-xs font-semibold text-zinc-200 mt-0.5 truncate">
                  {m.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Card Footer: Explore Full Case Study trigger */}
      <div className="pt-6 mt-6 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono">
        <Link
          href={`/projects/${currentProject.slug}`}
          onClick={() => sound.playOpen()}
          className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors font-semibold"
        >
          <Layers className="w-4 h-4" />
          <span>Explore Architecture & Deep Dive</span>
        </Link>

        <span className="text-zinc-400 text-[11px]">Click card to open page</span>
      </div>
    </motion.div>
  );
}
