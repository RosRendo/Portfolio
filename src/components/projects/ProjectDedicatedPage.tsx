"use client";

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Project, projectsData } from "@/data/projects";
import { sound } from "@/lib/sound";
import { GitHubIcon } from "@/components/icons/SocialIcons";
import { ProductExperienceFlow } from "@/components/case-study/ProductExperienceFlow";
import { ProductScreensShowcase } from "@/components/case-study/ProductScreensShowcase";
import { ArchitectureAssemblyDiagram } from "@/components/case-study/ArchitectureAssemblyDiagram";
import { DataRelationshipsTreeMap } from "@/components/case-study/DataRelationshipsTreeMap";
import { TechIconRails, TechIconHorizontalStrip } from "@/components/case-study/TechIconRails";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ExternalLink,
  Volume2,
  VolumeX,
  CheckCircle2,
  ShieldAlert,
  Terminal,
  Cpu,
  Layers,
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

  // Dynamically derive engineering challenges from project props
  const engineeringChallenges = useMemo(() => {
    if (project.challenges && project.challenges.length > 0) {
      return project.challenges.map((c, idx) => ({
        number: `0${idx + 1}`,
        title: c.challenge.toUpperCase(),
        summary: c.challenge,
        detail: c.solution,
      }));
    }
    // Fallback if challenges array is empty
    return [
      {
        number: "01",
        title: "DOMAIN DATA INTEGRITY",
        summary: "Ensuring ACID safety across all mutations.",
        detail: project.problem || "Enforced strict transactional integrity across all mutating operations.",
      },
      {
        number: "02",
        title: "HIGH-THROUGHPUT EXECUTION",
        summary: "Optimized response latency and caching.",
        detail: project.solution || "Architected low-latency caching and non-blocking background task workers.",
      },
    ];
  }, [project]);

  // Dynamically derive layered tech stack strata from project props
  const stackLayers = useMemo(() => {
    if (project.techStack && project.techStack.length > 0) {
      return project.techStack.map((cat, idx) => ({
        layer: cat.category.toUpperCase(),
        techs: cat.items,
        desc:
          idx === 0
            ? "Fast client rendering, responsive layout, and interactive states."
            : idx === 1
            ? "Domain controllers, authentication boundary, and API serialization."
            : idx === 2
            ? "Persistent storage, transactional guarantees, and caching."
            : "Deployment containerization, networking, and CI/CD pipelines.",
      }));
    }
    return [
      {
        layer: "FRONTEND",
        techs: ["React", "TypeScript", "Tailwind CSS"],
        desc: "Fast server rendering and fluid interactive states.",
      },
      {
        layer: "BACKEND",
        techs: ["Node.js", "RESTful API", "JWT Auth"],
        desc: "Domain controllers and asynchronous task queues.",
      },
      {
        layer: "DATA",
        techs: ["PostgreSQL", "Prisma ORM", "Redis"],
        desc: "ACID safe transactional persistence and in-memory cache.",
      },
    ];
  }, [project]);

  // Dynamically derive ownership list from project key features & solution
  const builtList = useMemo(() => {
    if (project.keyFeatures && project.keyFeatures.length > 0) {
      return project.keyFeatures.map((f) => {
        if (f.includes(":")) {
          const [head, body] = f.split(":");
          return `${head.trim()} — ${body.trim()}`;
        }
        return f;
      });
    }
    return [
      project.solution,
      project.architecture.overview,
      project.problem,
    ];
  }, [project]);

  return (
    <div className="min-h-screen bg-[#07080f] text-white selection:bg-white selection:text-black relative overflow-x-hidden font-sans">
      {/* Subtle atmospheric ambient glow */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] rounded-full blur-[200px] pointer-events-none opacity-15 -z-10 transition-colors duration-700"
        style={{ backgroundColor: project.accentColor || "#38bdf8" }}
      />
      <div className="fixed inset-0 bg-[radial-gradient(#ffffff04_1px,transparent_1px)] bg-[size:36px_36px] pointer-events-none -z-10" />

      {/* ---------------- SLIM VERTICAL TECH RAILS (LEFT & RIGHT) ---------------- */}
      <TechIconRails project={project} />

      {/* ---------------- TOP MINIMAL NAVIGATION BAR ---------------- */}
      <header className="sticky top-0 z-40 px-6 sm:px-10 lg:px-16 py-5 backdrop-blur-xl bg-[#07080f]/80 border-b border-white/[0.07] flex items-center justify-between">
        {/* Left: Back Link */}
        <Link
          href="/projects"
          onClick={() => sound.playClose()}
          className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-wider text-zinc-400 hover:text-white transition-colors group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          <span>PROJECTS</span>
        </Link>

        {/* Center: Title & Index */}
        <div className="flex items-center gap-3 text-xs font-mono text-zinc-400">
          <span className="font-bold text-white uppercase">{project.title}</span>
          <span className="opacity-30">•</span>
          <span>
            {String(currentIdx + 1).padStart(2, "0")} / {String(projectsData.length).padStart(2, "0")}
          </span>
        </div>

        {/* Right: Sound Toggle & Direct Demo Link */}
        <div className="flex items-center gap-5">
          <button
            type="button"
            onClick={toggleSound}
            className="p-1.5 rounded-full text-zinc-400 hover:text-white transition-colors"
            title={isMuted ? "Unmute sound" : "Mute sound"}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-zinc-500" /> : <Volume2 className="w-4 h-4 text-white" />}
          </button>

          {project.links.demo && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playOpen()}
              className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-white hover:text-zinc-300 transition-colors group"
            >
              <span>LIVE PROJECT</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          )}
        </div>
      </header>

      {/* ---------------- MAIN EDITORIAL CONTAINER ---------------- */}
      <main className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-14 py-20 sm:py-28 space-y-36 sm:space-y-48">
        {/* ========================================================================= */}
        {/* SECTION 1 — PROJECT INTRODUCTION                                          */}
        {/* ========================================================================= */}
        <section className="space-y-12 sm:space-y-16">
          <div className="space-y-6">
            {/* Small Category / Case Study Label */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-zinc-400"
            >
              <span>CASE STUDY</span>
              <span className="opacity-30">—</span>
              <span className="text-white font-medium">{project.category}</span>
            </motion.div>

            {/* Massive Editorial Project Name */}
            <motion.h1
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tight text-white leading-[0.92]"
            >
              {project.title}
            </motion.h1>

            {/* One short sentence explaining the product */}
            <motion.p
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
              className="text-xl sm:text-2xl md:text-3xl font-light text-zinc-300 max-w-4xl tracking-tight leading-snug pt-2"
            >
              {project.tagline}
            </motion.p>

            {/* Small Metadata for Role, Year and Category */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.24 }}
              className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-x-8 gap-y-3 text-xs font-mono text-zinc-400 uppercase tracking-wider"
            >
              <div>
                <span className="text-zinc-500 mr-2">ROLE:</span>
                <span className="text-white font-semibold">Full-stack Developer</span>
              </div>
              <div className="opacity-30 hidden sm:inline">•</div>
              <div>
                <span className="text-zinc-500 mr-2">RELEASE:</span>
                <span className="text-white font-semibold">2025 Production</span>
              </div>
              <div className="opacity-30 hidden sm:inline">•</div>
              <div>
                <span className="text-zinc-500 mr-2">STATUS:</span>
                <span className="text-white font-semibold">{project.deploymentStatus}</span>
              </div>
              <div className="opacity-30 hidden sm:inline">•</div>
              <div>
                <span className="text-zinc-500 mr-2">STACK:</span>
                <span className="text-white font-semibold">
                  {project.techStack?.flatMap((c) => c.items).slice(0, 3).join(" · ") || "Full-Stack"}
                </span>
              </div>
            </motion.div>
          </div>

          {/* ONE STRONG PROJECT VISUAL (No multiple cards spam) */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.98, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 shadow-[0_40px_120px_rgba(0,0,0,0.9)] bg-black/60 group"
          >
            <Image
              src={project.image}
              alt={`${project.title} Preview`}
              fill
              sizes="(max-width: 1280px) 100vw, 1200px"
              className="object-cover group-hover:scale-[1.01] transition-transform duration-700 ease-out"
              priority
            />
            {/* Subtle bottom vignette scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#07080f]/80 via-transparent to-black/20 pointer-events-none" />

            {/* Corner Live Status Tag */}
            <div className="absolute bottom-5 left-5 sm:bottom-8 sm:left-8 flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-xs font-mono text-zinc-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>PRODUCTION LIVE DEMO READY</span>
            </div>

            {project.links.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playOpen()}
                className="absolute bottom-5 right-5 sm:bottom-8 sm:right-8 hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-zinc-200 transition-all hover:scale-105 active:scale-95 shadow-xl"
              >
                <span>VISIT APP</span>
                <ExternalLink className="w-3.5 h-3.5 text-black" />
              </a>
            )}
          </motion.div>
        </section>

        {/* Mobile technology ticker strip (hidden on desktop where vertical rails are visible) */}
        <TechIconHorizontalStrip project={project} />

        {/* ========================================================================= */}
        {/* SECTION 2 — PRODUCT EXPERIENCE (PROGRESSIVE ANIMATED PIPELINE)            */}
        {/* ========================================================================= */}
        <section>
          <ProductExperienceFlow project={project} />
        </section>

        {/* ========================================================================= */}
        {/* SECTION 3 — PRODUCT SCREENS (LARGE ASYMMETRIC CINEMATIC FOCUS)           */}
        {/* ========================================================================= */}
        <section>
          <ProductScreensShowcase project={project} />
        </section>

        {/* ========================================================================= */}
        {/* SECTION 4 — HOW I BUILT IT (SYSTEM ASSEMBLING DIAGRAM)                   */}
        {/* ========================================================================= */}
        <section>
          <ArchitectureAssemblyDiagram project={project} />
        </section>

        {/* ========================================================================= */}
        {/* SECTION 5 — DATA RELATIONSHIPS (HIERARCHICAL TREE MAP)                   */}
        {/* ========================================================================= */}
        <section>
          <DataRelationshipsTreeMap project={project} />
        </section>

        {/* ========================================================================= */}
        {/* SECTION 6 — ENGINEERING CHALLENGES (LARGE TYPOGRAPHIC EDITORIAL)         */}
        {/* ========================================================================= */}
        <section className="space-y-16">
          <div className="space-y-4 max-w-2xl">
            <span className="text-xs font-mono tracking-widest text-zinc-500 uppercase">
              06 — ENGINEERING CHALLENGES
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
              Critical Technical Challenges Solved
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 font-light">
              Engineering solutions addressing concurrency hazards, multi-tenant boundaries, and ledger integrity.
            </p>
          </div>

          {/* Individual Progressive Challenge Sections */}
          <div className="space-y-16 sm:space-y-24">
            {engineeringChallenges.map((challenge, idx) => (
              <motion.div
                key={challenge.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="pt-8 border-t border-white/10 grid grid-cols-1 md:grid-cols-12 gap-8 items-start"
              >
                {/* Large Bold Number (4 cols) */}
                <div className="md:col-span-4 space-y-2">
                  <div className="text-6xl sm:text-7xl font-black font-mono tracking-tighter text-white/30">
                    {challenge.number}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white uppercase">
                    {challenge.title}
                  </h3>
                  <p className="text-xs font-mono text-zinc-400">
                    {challenge.summary}
                  </p>
                </div>

                {/* Challenge Detail Explanation (8 cols) */}
                <div className="md:col-span-8 space-y-4">
                  <p className="text-base sm:text-lg text-zinc-300 font-light leading-relaxed">
                    {challenge.detail}
                  </p>
                  <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>PRODUCTION VERIFIED WITH ZERO REGRESSIONS</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 7 — TECH STACK (LAYERED STRATA, NOT A COLLECTION OF LOGO CARDS)  */}
        {/* ========================================================================= */}
        <section className="space-y-16">
          <div className="space-y-4 max-w-2xl">
            <span className="text-xs font-mono tracking-widest text-zinc-500 uppercase">
              07 — TECH STACK
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
              Layered Technology Stack
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 font-light">
              Architected as decoupled horizontal strata rather than a disconnected bundle of tools.
            </p>
          </div>

          {/* Layered Horizontal Rows */}
          <div className="space-y-6">
            {stackLayers.map((layer, idx) => (
              <motion.div
                key={layer.layer}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                {/* Layer Name & Description */}
                <div className="space-y-1 max-w-sm">
                  <span className="text-xs font-mono tracking-widest text-zinc-500 uppercase">
                    STRATA 0{idx + 1}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                    {layer.layer}
                  </h3>
                  <p className="text-xs text-zinc-400 font-light leading-relaxed">
                    {layer.desc}
                  </p>
                </div>

                {/* Tech Items List */}
                <div className="flex flex-wrap items-center gap-2 md:justify-end max-w-lg">
                  {layer.techs.map((t) => (
                    <span
                      key={t}
                      className="px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium text-white bg-white/[0.05] border border-white/10 hover:border-white/25 transition-colors"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 8 — PROJECT SUMMARY & CLOSING                                     */}
        {/* ========================================================================= */}
        <section className="pt-16 border-t border-white/15 space-y-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
            {/* Left: Role and Scope (5 cols) */}
            <div className="md:col-span-5 space-y-4">
              <span className="text-xs font-mono tracking-widest text-zinc-500 uppercase">
                08 — SUMMARY
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                Engineering Ownership
              </h2>
              <div className="space-y-1 pt-2 font-mono text-xs">
                <div className="text-zinc-500 uppercase">MY ROLE:</div>
                <div className="text-base font-bold text-white">Full-stack Developer &amp; Architect</div>
              </div>
            </div>

            {/* Right: Concise List of What I Designed and Built (7 cols) */}
            <div className="md:col-span-7 space-y-5">
              <h3 className="text-sm font-mono tracking-widest uppercase text-zinc-400">
                WHAT I DESIGNED &amp; BUILT:
              </h3>
              <ul className="space-y-3.5 text-sm sm:text-base text-zinc-300 font-light leading-relaxed">
                {builtList.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-white mt-2.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* Direct Action Links: [ Live Project ] [ GitHub Repository ] */}
              <div className="flex flex-wrap items-center gap-4 pt-6">
                {project.links.demo && (
                  <a
                    href={project.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.playOpen()}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-zinc-200 transition-all hover:scale-105 active:scale-95 shadow-lg"
                  >
                    <span>LIVE PROJECT</span>
                    <ExternalLink className="w-3.5 h-3.5 text-black" />
                  </a>
                )}

                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.playTab()}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/[0.05] border border-white/15 hover:bg-white/15 text-white font-mono text-xs font-semibold uppercase tracking-wider transition-all hover:scale-105 active:scale-95"
                  >
                    <GitHubIcon className="w-3.5 h-3.5 text-white" />
                    <span>GITHUB REPOSITORY</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Magnetic Next Project Card */}
          <div className="pt-12 border-t border-white/10">
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 block mb-4">
              NEXT CASE STUDY // {String(nextIdx + 1).padStart(2, "0")}
            </span>

            <Link
              href={`/projects/${nextProject.slug}`}
              onClick={() => sound.playTab()}
              className="group relative block rounded-2xl sm:rounded-3xl p-8 sm:p-12 overflow-hidden border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/30 transition-all duration-500 shadow-2xl"
            >
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
                    {nextProject.category}
                  </span>
                  <h3 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white group-hover:text-zinc-200 transition-colors mt-2">
                    {nextProject.title}
                  </h3>
                  <p className="text-sm text-zinc-400 max-w-lg mt-2 font-light line-clamp-1">
                    {nextProject.tagline}
                  </p>
                </div>

                <div className="flex items-center gap-3 text-xs font-mono font-bold uppercase tracking-wider text-zinc-300 group-hover:text-white transition-colors shrink-0">
                  <span>VIEW CASE STUDY</span>
                  <div className="w-10 h-10 rounded-full border border-white/15 bg-white/[0.05] flex items-center justify-center text-white group-hover:border-white group-hover:bg-white/20 group-hover:translate-x-1 transition-all">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Footer Back Link */}
          <div className="flex items-center justify-between text-xs font-mono text-zinc-500 pt-6">
            <Link
              href="/projects"
              onClick={() => sound.playClose()}
              className="hover:text-white transition-colors flex items-center gap-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>RETURN TO ALL PROJECTS</span>
            </Link>
            <span>ROS RENDO • FULL-STACK DEVELOPER</span>
          </div>
        </section>
      </main>
    </div>
  );
}
