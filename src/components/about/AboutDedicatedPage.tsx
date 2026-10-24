"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { profileData } from "@/data/profile";
import { sound } from "@/lib/sound";
import { GitHubIcon, LinkedInIcon } from "@/components/icons/SocialIcons";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ExternalLink,
  FileDown,
  Mail,
  MapPin,
  Volume2,
  VolumeX,
  Compass,
  Check,
} from "lucide-react";

export function AboutDedicatedPage() {
  const [isMuted, setIsMuted] = useState(false);
  const [activeTraitIdx, setActiveTraitIdx] = useState<number | null>(0); // First trait open by default
  const [activeStageIdx, setActiveStageIdx] = useState<number>(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    setIsMuted(sound.isMuted());
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const toggleSound = () => {
    const next = !isMuted;
    sound.setMuted(next);
    setIsMuted(next);
    if (!next) sound.playTab();
  };

  return (
    <div className="min-h-screen bg-[#07080f] text-white selection:bg-cyan-500/25 selection:text-cyan-200 relative overflow-x-hidden font-sans">
      {/* ---------------- ATMOSPHERIC LIGHTING & SUBTLE TECH GRID ---------------- */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-indigo-600/10 rounded-full blur-[180px] pointer-events-none -z-10" />
      <div className="fixed bottom-0 right-1/4 w-[600px] h-[350px] bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="fixed inset-0 bg-[radial-gradient(#ffffff04_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none -z-10" />

      {/* ---------------- STICKY TOP MINIMAL NAVBAR ---------------- */}
      <header className="sticky top-0 z-40 px-6 sm:px-10 lg:px-16 py-5 backdrop-blur-xl bg-[#07080f]/80 border-b border-white/[0.07] flex items-center justify-between">
        {/* Left: Navigation back */}
        <div className="flex items-center gap-4">
          <Link
            href="/"
            onClick={() => sound.playClose()}
            className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-zinc-400 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>HOME</span>
          </Link>

          <span className="opacity-25 hidden sm:inline">•</span>

          <Link
            href="/projects"
            onClick={() => sound.playOpen()}
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-zinc-400 hover:text-white transition-colors"
          >
            <Compass className="w-3.5 h-3.5 text-cyan-400" />
            <span>PROJECTS</span>
          </Link>
        </div>

        {/* Center: Monogram & Identity */}
        <div className="flex items-center gap-2.5 text-xs font-mono text-zinc-400">
          <span className="font-bold text-white uppercase">{profileData.name}</span>
          <span className="opacity-30">•</span>
          <span className="text-zinc-400 hidden sm:inline">ABOUT & ETHOS</span>
        </div>

        {/* Right: Sound & Contact */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={toggleSound}
            className="p-1.5 rounded-full text-zinc-400 hover:text-white transition-colors"
            title={isMuted ? "Unmute audio" : "Mute audio"}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-zinc-500" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
          </button>

          <a
            href={`mailto:${profileData.contact.email}`}
            onClick={() => sound.playTab()}
            className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-cyan-300 hover:text-white transition-colors"
          >
            <span>GET IN TOUCH</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </header>

      {/* ---------------- MAIN EDITORIAL CONTAINER ---------------- */}
      <main className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-12 py-16 sm:py-24 space-y-28 sm:space-y-36">
        {/* ---------------- 1. INTRODUCTION SECTION ---------------- */}
        <section className="space-y-12 sm:space-y-16">
          {/* Section Kicker */}
          <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-zinc-400">
            <span className="text-cyan-400 font-bold">{profileData.profileId}</span>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{profileData.status.text}</span>
            </div>
          </div>

          {/* Oversized Headline */}
          <div className="space-y-6">
            <motion.h1
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white leading-[0.95]"
            >
              Building digital products from idea to deployment.
            </motion.h1>

            <motion.p
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg sm:text-2xl text-zinc-300 font-light leading-relaxed max-w-3xl"
            >
              {profileData.subheadline}
            </motion.p>
          </div>

          {/* Asymmetric Visual Composition (Portrait + Concise Bio) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center pt-4">
            {/* Visual Portrait (5 cols) */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="lg:col-span-5 relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 shadow-[0_25px_70px_rgba(0,0,0,0.85)] bg-black/60 group"
            >
              <Image
                src="/images/avatar.jpg"
                alt="ROS RENDO Portrait"
                fill
                sizes="(max-width: 1024px) 100vw, 440px"
                className="object-cover object-center grayscale contrast-110 group-hover:grayscale-0 transition-all duration-700 ease-out"
                priority
              />

              {/* Technical Corner Crosshairs */}
              <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-white/40 pointer-events-none" />
              <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-white/40 pointer-events-none" />
              <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-white/40 pointer-events-none" />
              <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-white/40 pointer-events-none" />

              {/* Scrim Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#07080f]/90 via-transparent to-transparent pointer-events-none" />

              {/* Bottom Caption */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[11px] font-mono text-zinc-300">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-cyan-400" />
                  <span>{profileData.locationTag} (UTC+7)</span>
                </span>
                <span className="text-zinc-400">SOFTWARE ENGINEER</span>
              </div>
            </motion.div>

            {/* Concise Bio Story (7 cols) */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-7 space-y-6"
            >
              <div className="space-y-4 text-base sm:text-lg text-zinc-300 font-light leading-relaxed">
                <p>
                  I am a software engineering student based in Phnom Penh, Cambodia, driven by the ambition to turn raw ideas into real, deployable digital products.
                </p>
                <p>
                  Rather than staying within theoretical sandboxes or copy-pasting tutorials, I focus on end-to-end craftsmanship: modeling PostgreSQL schemas, coding resilient backend logic, containerizing with Docker, and building dynamic, motion-driven client interfaces.
                </p>
                <p className="text-sm sm:text-base text-zinc-400 font-mono">
                  My philosophy is simple: {profileData.personalPhilosophy}
                </p>
              </div>

              {/* Fast Telemetry Pills */}
              <div className="pt-4 flex flex-wrap items-center gap-2 border-t border-white/[0.08]">
                <span className="px-3 py-1 rounded-full text-xs font-mono bg-white/[0.03] border border-white/10 text-zinc-300">
                  TypeScript / Node.js
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-mono bg-white/[0.03] border border-white/10 text-zinc-300">
                  PostgreSQL / Prisma ORM
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-mono bg-white/[0.03] border border-white/10 text-zinc-300">
                  Next.js / Tailwind CSS
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-mono bg-white/[0.03] border border-white/10 text-zinc-300">
                  Docker / Linux VPS
                </span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ---------------- 2. PERSONALITY (KINETIC TYPOGRAPHY TRAITS) ---------------- */}
        <section className="space-y-8 sm:space-y-10">
          <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-zinc-400">
            <div className="flex items-center gap-2">
              <span className="text-cyan-400 font-bold">01</span>
              <span>// HOW I OPERATE & THINK</span>
            </div>
            <span className="hidden sm:inline text-zinc-400">HOVER OR CLICK TO REVEAL</span>
          </div>

          {/* Kinetic Typography Accordion/List */}
          <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
            {profileData.personalityTraits.map((trait, idx) => {
              const isOpen = activeTraitIdx === idx;
              return (
                <div
                  key={trait.keyword}
                  onMouseEnter={() => {
                    sound.playHover();
                    setActiveTraitIdx(idx);
                  }}
                  onClick={() => {
                    sound.playTab();
                    setActiveTraitIdx(isOpen ? null : idx);
                  }}
                  className="py-6 sm:py-8 cursor-pointer group transition-colors"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-baseline gap-4 sm:gap-8">
                      <span className="text-xs sm:text-sm font-mono text-zinc-400 group-hover:text-cyan-400 transition-colors">
                        0{idx + 1}
                      </span>
                      <h3
                        className={`text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight transition-all duration-300 ${
                          isOpen ? "text-white translate-x-1" : "text-zinc-500 group-hover:text-zinc-300"
                        }`}
                      >
                        {trait.keyword}
                      </h3>
                    </div>

                    <span className="text-xs font-mono text-zinc-400 group-hover:text-cyan-300 transition-colors uppercase tracking-wider hidden sm:inline">
                      {trait.tagline}
                    </span>
                  </div>

                  {/* Revealed Explanation */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={shouldReduceMotion ? false : { opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 pl-8 sm:pl-16 pr-4 sm:pr-8 max-w-2xl">
                          <p className="text-base sm:text-lg text-zinc-300 font-light leading-relaxed">
                            {trait.description}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>

        {/* ---------------- 3. MY APPROACH (HOW I TURN IDEAS INTO PRODUCTS) ---------------- */}
        <section className="space-y-8 sm:space-y-12">
          <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-zinc-400">
            <div className="flex items-center gap-2">
              <span className="text-cyan-400 font-bold">02</span>
              <span>// THE METHODOLOGY</span>
            </div>
            <span>TURNING IDEAS INTO PRODUCTS</span>
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
              From relational schemas to deployed infrastructure.
            </h2>
            <p className="text-base sm:text-lg text-zinc-300 font-light max-w-2xl">
              A disciplined, four-stage engineering sequence engineered to eliminate guesswork and ship reliable software.
            </p>
          </div>

          {/* Stepped Visual Sequence */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-6 pt-4">
            {profileData.howIBuild.map((stage, idx) => {
              const isSelected = activeStageIdx === idx;
              return (
                <div
                  key={stage.stage}
                  onClick={() => {
                    sound.playTab();
                    setActiveStageIdx(idx);
                  }}
                  className={`p-6 rounded-2xl sm:rounded-3xl border transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[220px] ${
                    isSelected
                      ? "bg-white/[0.05] border-cyan-400/50 shadow-[0_10px_30px_rgba(6,182,212,0.1)] -translate-y-1"
                      : "bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.03]"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono font-bold text-cyan-400">
                        PHASE {stage.stage}
                      </span>
                      <span
                        className={`w-2 h-2 rounded-full transition-all ${
                          isSelected ? "bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]" : "bg-white/20"
                        }`}
                      />
                    </div>

                    <h4 className="text-lg font-bold text-white tracking-tight">
                      {stage.title}
                    </h4>

                    <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-light mt-2.5">
                      {stage.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-white/[0.06] flex flex-wrap gap-1.5">
                    {stage.tools.slice(0, 3).map((tool) => (
                      <span
                        key={tool}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.03] text-zinc-300"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ---------------- 4. CURRENT INTERESTS (COMPACT VISUAL PRESENTATION) ---------------- */}
        <section className="space-y-8 sm:space-y-10">
          <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-zinc-400">
            <div className="flex items-center gap-2">
              <span className="text-cyan-400 font-bold">03</span>
              <span>// CURRENT FOCUS & ACTIVE INTERESTS</span>
            </div>
            <span>TIED TO LIVE CODEBASES</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {profileData.currentInterests.map((interest) => (
              <Link
                key={interest.title}
                href={`/projects/${interest.projectSlug}`}
                onClick={() => sound.playOpen()}
                className="group p-6 sm:p-8 rounded-3xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-cyan-400/40 transition-all duration-300 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-semibold">
                    {interest.category}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                    {interest.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
                    {interest.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-zinc-400 group-hover:text-white transition-colors">
                  <span>Explore in {interest.projectTitle}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ---------------- 5. CLOSING SECTION & CONTACT ---------------- */}
        <section className="space-y-10 pt-12 border-t border-white/[0.08]">
          <div className="space-y-4 max-w-3xl">
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 block">
              FINAL THOUGHT
            </span>
            <p className="text-2xl sm:text-4xl font-light text-zinc-200 leading-snug">
              &ldquo;{profileData.personalPhilosophy}&rdquo;
            </p>
          </div>

          {/* Contact Action Bar */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href={`mailto:${profileData.contact.email}`}
              onClick={() => sound.playOpen()}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-zinc-200 transition-all hover:scale-105 active:scale-95 shadow-md"
            >
              <Mail className="w-3.5 h-3.5 text-black" />
              <span>{profileData.contact.email}</span>
            </a>

            <a
              href={profileData.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playTab()}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/[0.04] border border-white/15 hover:bg-white/10 text-white font-mono text-xs font-semibold uppercase tracking-wider transition-all hover:scale-105 active:scale-95"
            >
              <GitHubIcon className="w-3.5 h-3.5 text-white" />
              <span>GITHUB</span>
            </a>

            <a
              href={profileData.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playTab()}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/[0.04] border border-white/15 hover:bg-white/10 text-white font-mono text-xs font-semibold uppercase tracking-wider transition-all hover:scale-105 active:scale-95"
            >
              <LinkedInIcon className="w-3.5 h-3.5 text-white" />
              <span>LINKEDIN</span>
            </a>

            <a
              href={profileData.contact.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playTab()}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/[0.04] border border-white/15 hover:bg-white/10 text-white font-mono text-xs font-semibold uppercase tracking-wider transition-all hover:scale-105 active:scale-95"
            >
              <FileDown className="w-3.5 h-3.5 text-white" />
              <span>RESUME (CV)</span>
            </a>
          </div>

          {/* Bottom Footer */}
          <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-400">
            <Link
              href="/projects"
              onClick={() => sound.playClose()}
              className="hover:text-white transition-colors flex items-center gap-2"
            >
              <Compass className="w-3.5 h-3.5 text-cyan-400" />
              <span>VIEW ALL 10 ENGINEERING CASE STUDIES</span>
            </Link>

            <span>ROS RENDO • PHNOM PENH, CAMBODIA</span>
          </div>
        </section>
      </main>
    </div>
  );
}
