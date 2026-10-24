"use client";

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Project, projectsData } from "@/data/projects";
import { sound } from "@/lib/sound";
import { GitHubIcon } from "@/components/icons/SocialIcons";
import { TechIcon } from "@/components/icons/TechIcons";
import { ProjectArchitectureFlow } from "@/components/case-study/ProjectArchitectureFlow";
import { TechIconRails, TechIconHorizontalStrip } from "@/components/case-study/TechIconRails";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ExternalLink,
  Volume2,
  VolumeX,
} from "lucide-react";

interface ProjectDedicatedPageProps {
  project: Project;
}

export function ProjectDedicatedPage({ project }: ProjectDedicatedPageProps) {
  const [isMuted, setIsMuted] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    setIsMuted(sound.isMuted());
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [project.slug]);

  const toggleSound = () => {
    const next = !isMuted;
    sound.setMuted(next);
    setIsMuted(next);
    if (!next) sound.playTab();
  };

  // Find current, previous, and next projects
  const currentIdx = projectsData.findIndex((p) => p.slug === project.slug);
  const nextIdx = (currentIdx + 1) % projectsData.length;
  const nextProject = projectsData[nextIdx];

  // Primary tech highlights for hero (first 4 items)
  const heroTechs = useMemo(() => {
    return project.techStack.flatMap((c) => c.items).slice(0, 5);
  }, [project]);

  // Concise 2-3 sentence concept text:
  const conceptSentences = useMemo(() => {
    // Problem sentence
    const s1 = project.problem.split(".")[0]?.trim() + ".";
    // Solution sentence
    const s2 = project.solution.split(".")[0]?.trim() + ".";
    // Impact sentence from tagline or overview
    const s3 = project.tagline;
    return { s1, s2, s3 };
  }, [project]);

  // Key takeaway for closing
  const closingTakeaway = useMemo(() => {
    if (project.decisions && project.decisions[0]) {
      return project.decisions[0].reasoning;
    }
    return project.overview.split(".")[0] + ".";
  }, [project]);

  return (
    <div className="min-h-screen bg-[#07080f] text-white selection:bg-cyan-500/25 selection:text-cyan-200 relative overflow-x-hidden font-sans">
      {/* Subtle atmospheric ambient glow */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full blur-[180px] pointer-events-none opacity-20 -z-10 transition-colors duration-700"
        style={{ backgroundColor: project.accentColor }}
      />
      <div className="fixed inset-0 bg-[radial-gradient(#ffffff04_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none -z-10" />

      {/* ---------------- SLIM VERTICAL TECH RAILS (LEFT & RIGHT) ---------------- */}
      <TechIconRails project={project} />

      {/* ---------------- TOP MINIMAL NAVIGATION BAR ---------------- */}
      <header className="sticky top-0 z-40 px-6 sm:px-10 lg:px-16 py-5 backdrop-blur-xl bg-[#07080f]/75 border-b border-white/[0.07] flex items-center justify-between">
        {/* Left: Back Link */}
        <Link
          href="/projects"
          onClick={() => sound.playClose()}
          className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-wider text-zinc-400 hover:text-white transition-colors group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          <span>PROJECTS</span>
        </Link>

        {/* Center: Monogram & Index */}
        <div className="flex items-center gap-3 text-xs font-mono text-zinc-400">
          <span className="font-bold text-white uppercase">{project.title}</span>
          <span className="opacity-30">•</span>
          <span>{String(currentIdx + 1).padStart(2, "0")} / {String(projectsData.length).padStart(2, "0")}</span>
        </div>

        {/* Right: Sound Toggle & Direct Demo Link */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={toggleSound}
            className="p-1.5 rounded-full text-zinc-400 hover:text-white transition-colors"
            title={isMuted ? "Unmute sound" : "Mute sound"}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-zinc-500" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
          </button>

          {project.links.demo && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playOpen()}
              className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-cyan-300 hover:text-white transition-colors group"
            >
              <span>LIVE DEMO</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          )}
        </div>
      </header>

      {/* ---------------- MAIN EDITORIAL CONTENT CONTAINER ---------------- */}
      <main className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-12 py-16 sm:py-24 space-y-28 sm:space-y-36">
        {/* ---------------- 1. PROJECT HERO SECTION ---------------- */}
        <section className="space-y-10 sm:space-y-12">
          {/* Header Metadata */}
          <div className="space-y-4">
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-zinc-400"
            >
              <span className="text-cyan-400 font-bold">CASE STUDY</span>
              <span className="opacity-30">—</span>
              <span>{project.category}</span>
            </motion.div>

            {/* Huge Editorial Title */}
            <motion.h1
              initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white leading-[0.95]"
            >
              {project.title}
            </motion.h1>

            {/* Short one-sentence concept */}
            <motion.p
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg sm:text-2xl text-zinc-300 font-light leading-relaxed max-w-3xl pt-2"
            >
              {project.tagline}
            </motion.p>

            {/* Small set of technology labels */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.24 }}
              className="flex flex-wrap items-center gap-2 pt-4"
            >
              {heroTechs.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-zinc-300 bg-white/[0.04] border border-white/[0.08] hover:border-white/20 transition-colors"
                >
                  <TechIcon name={tech} className="w-3.5 h-3.5 text-zinc-400" />
                  <span>{tech}</span>
                </span>
              ))}
            </motion.div>
          </div>

          {/* Large Project Screenshot / Hero Mockup */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.98, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 shadow-[0_30px_90px_rgba(0,0,0,0.9)] bg-black/50 group"
          >
            <Image
              src={project.image}
              alt={`${project.title} Preview`}
              fill
              sizes="(max-width: 1200px) 100vw, 1100px"
              className="object-cover group-hover:scale-[1.015] transition-transform duration-700 ease-out"
              priority
            />
            {/* Subtle vignette scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#07080f]/80 via-transparent to-black/20 pointer-events-none" />

            {/* Floating corner status badge */}
            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-xs font-mono text-zinc-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{project.deploymentStatus}</span>
            </div>

            {project.links.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playOpen()}
                className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-zinc-200 transition-transform hover:scale-105 active:scale-95 shadow-lg"
              >
                <span>OPEN LIVE APP</span>
                <ExternalLink className="w-3.5 h-3.5 text-black" />
              </a>
            )}
          </motion.div>
        </section>

        {/* Mobile technology ticker strip (hidden on desktop where vertical rails are visible) */}
        <TechIconHorizontalStrip project={project} />

        {/* ---------------- 2. PROJECT CONCEPT (ASYMMETRIC SPLIT LAYOUT) ---------------- */}
        <section className="space-y-8 sm:space-y-12">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-400">
            <span className="text-cyan-400 font-bold">01</span>
            <span>// CONCEPT & PROBLEM SPACE</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: 2–3 short sentences + Key Metrics (5 cols) */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-6 space-y-6"
            >
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-snug">
                Designed to solve critical operational bottlenecks.
              </h2>

              {/* 2-3 Short, impactful sentences */}
              <div className="space-y-4 text-base sm:text-lg text-zinc-300 font-light leading-relaxed">
                <p>
                  <strong className="text-white font-semibold">The Challenge: </strong>
                  {conceptSentences.s1}
                </p>
                <p>
                  <strong className="text-white font-semibold">The Solution: </strong>
                  {conceptSentences.s2}
                </p>
                <p className="text-sm sm:text-base text-zinc-400 font-mono">
                  {conceptSentences.s3}
                </p>
              </div>

              {/* Minimal metrics without generic dashboard clutter */}
              {project.metrics && project.metrics.length > 0 && (
                <div className="pt-4 grid grid-cols-2 gap-6 border-t border-white/[0.08]">
                  {project.metrics.slice(0, 2).map((m, i) => (
                    <div key={i} className="space-y-1">
                      <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight">
                        {m.value}
                      </div>
                      <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Right Column: Asymmetric product visual / custom framed detail (6 cols) */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-6 relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black/40 group"
            >
              <Image
                src={project.image}
                alt={`${project.title} Interface Detail`}
                fill
                sizes="(max-width: 1024px) 100vw, 550px"
                className="object-cover object-left-top group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#07080f]/70 via-transparent to-black/30 pointer-events-none" />

              <div className="absolute top-4 left-4 px-3 py-1 rounded-md bg-black/70 backdrop-blur-md border border-white/10 text-[11px] font-mono text-zinc-300">
                PRODUCT VIEWPOINT
              </div>
            </motion.div>
          </div>
        </section>

        {/* ---------------- 3. ARCHITECTURE / SYSTEM DIAGRAM ---------------- */}
        <section className="space-y-6 sm:space-y-8">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-400">
            <span className="text-cyan-400 font-bold">02</span>
            <span>// ARCHITECTURE & SYSTEM DESIGN</span>
          </div>

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <ProjectArchitectureFlow project={project} />
          </motion.div>
        </section>

        {/* ---------------- 4. CLOSING SECTION & PROJECT TRANSITION ---------------- */}
        <section className="space-y-12 sm:space-y-16 pt-8 border-t border-white/[0.08]">
          <div className="space-y-6 max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-400">
              <span className="text-cyan-400 font-bold">03</span>
              <span>// ARCHITECTURAL TAKEAWAY</span>
            </div>

            <p className="text-xl sm:text-2xl text-zinc-200 font-light leading-relaxed">
              &ldquo;{closingTakeaway}&rdquo;
            </p>

            {/* Action Buttons: Live Demo & GitHub */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              {project.links.demo && (
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playOpen()}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-zinc-200 transition-all hover:scale-105 active:scale-95 shadow-md"
                >
                  <span>VISIT LIVE DEMO</span>
                  <ExternalLink className="w-3.5 h-3.5 text-black" />
                </a>
              )}

              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playTab()}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/[0.04] border border-white/15 hover:bg-white/10 text-white font-mono text-xs font-semibold uppercase tracking-wider transition-all hover:scale-105 active:scale-95"
                >
                  <GitHubIcon className="w-3.5 h-3.5 text-white" />
                  <span>VIEW REPOSITORY</span>
                </a>
              )}
            </div>
          </div>

          {/* Magnetic Next Project Transition Card */}
          <div className="pt-8 border-t border-white/[0.08]">
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 block mb-4">
              NEXT CASE STUDY // {String(nextIdx + 1).padStart(2, "0")}
            </span>

            <Link
              href={`/projects/${nextProject.slug}`}
              onClick={() => sound.playTab()}
              className="group relative block rounded-2xl sm:rounded-3xl p-8 sm:p-12 overflow-hidden border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-cyan-400/40 transition-all duration-500 shadow-xl"
            >
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold">
                    {nextProject.category}
                  </span>
                  <h3 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white group-hover:text-cyan-300 transition-colors mt-2">
                    {nextProject.title}
                  </h3>
                  <p className="text-sm text-zinc-400 max-w-lg mt-2 font-light line-clamp-1">
                    {nextProject.tagline}
                  </p>
                </div>

                <div className="flex items-center gap-3 text-xs font-mono font-bold uppercase tracking-wider text-zinc-300 group-hover:text-cyan-300 transition-colors shrink-0">
                  <span>VIEW CASE STUDY</span>
                  <div className="w-10 h-10 rounded-full border border-white/15 bg-white/[0.05] flex items-center justify-center text-white group-hover:border-cyan-400 group-hover:bg-cyan-500/20 group-hover:translate-x-1 transition-all">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Ambient accent underglow on hover */}
              <div
                className="absolute -right-20 -bottom-20 w-64 h-64 rounded-full blur-[100px] opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none"
                style={{ backgroundColor: nextProject.accentColor }}
              />
            </Link>
          </div>

          {/* Simple return link to horizontal circuit view */}
          <div className="flex items-center justify-between text-xs font-mono text-zinc-400 pt-4">
            <Link
              href="/projects"
              onClick={() => sound.playClose()}
              className="hover:text-white transition-colors flex items-center gap-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>RETURN TO HORIZONTAL CIRCUIT CANVAS</span>
            </Link>
            <span>ROS RENDO • CREATIVE DEVELOPER</span>
          </div>
        </section>
      </main>
    </div>
  );
}
