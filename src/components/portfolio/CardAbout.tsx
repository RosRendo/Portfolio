"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { sound } from "@/lib/sound";
import { ArrowUpRight, Code2, Database, Server, Sparkles } from "lucide-react";

interface CardAboutProps {
  onOpen: () => void;
}

export function CardAbout({ onOpen }: CardAboutProps) {
  return (
    <motion.div
      layoutId="card-about"
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
      aria-label="Open About Me profile and background"
    >
      {/* Subtle interior ambient glow */}
      <div className="ambient-glow -top-16 -right-16 w-44 h-44 bg-indigo-500/20 group-hover:opacity-30" />

      {/* Header section with avatar & identity */}
      <div>
        <div className="flex items-center justify-between gap-4 mb-5">
          <div className="flex items-center gap-3.5">
            <div className="relative w-14 h-14 rounded-2xl overflow-hidden border border-white/15 shadow-md shadow-black/40 group-hover:border-indigo-400/50 transition-colors">
              <Image
                src="/images/avatar.jpg"
                alt="ROS RENDO portrait"
                fill
                sizes="56px"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold tracking-tight text-white group-hover:text-indigo-200 transition-colors">
                  ROS RENDO
                </h3>
                <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                  <Sparkles className="w-2.5 h-2.5" /> Builder
                </span>
              </div>
              <p className="text-xs text-zinc-400 font-mono mt-0.5">
                Full-Stack Developer & Backend
              </p>
            </div>
          </div>

          <div className="w-9 h-9 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-zinc-400 group-hover:text-white group-hover:border-indigo-500/40 group-hover:bg-indigo-500/10 transition-all">
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>

        {/* Short introduction snippet */}
        <p className="text-sm text-zinc-300/90 leading-relaxed font-normal mb-5 line-clamp-3">
          Software engineering student & product builder obsessed with backend architectures, relational data modeling, and deployable digital products. Architecture before syntax.
        </p>
      </div>

      {/* Architectural focus pill badges */}
      <div className="pt-4 border-t border-white/[0.06]">
        <div className="flex flex-wrap gap-2 text-xs font-mono text-zinc-400">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/[0.06] group-hover:border-white/15 transition-colors">
            <Server className="w-3 h-3 text-indigo-400" /> Node & APIs
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/[0.06] group-hover:border-white/15 transition-colors">
            <Database className="w-3 h-3 text-emerald-400" /> PostgreSQL / Prisma
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/[0.06] group-hover:border-white/15 transition-colors">
            <Code2 className="w-3 h-3 text-cyan-400" /> React & Next.js
          </span>
        </div>

        <div className="flex items-center justify-between mt-4 text-xs font-mono text-indigo-400/90 group-hover:text-indigo-300">
          <span>Read Full Background & Ethos</span>
          <span className="text-[11px] opacity-70 group-hover:opacity-100">Click to expand</span>
        </div>
      </div>
    </motion.div>
  );
}
