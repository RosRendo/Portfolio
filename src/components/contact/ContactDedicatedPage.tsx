"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { profileData } from "@/data/profile";
import { sound } from "@/lib/sound";
import { SoundToggle } from "@/components/portfolio/SoundToggle";
import { GitHubIcon, LinkedInIcon } from "@/components/icons/SocialIcons";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  Copy,
  FileDown,
  Mail,
  MapPin,
  Clock,
  Sparkles,
  ShieldCheck,
  Send,
  ExternalLink,
} from "lucide-react";

export function ContactDedicatedPage() {
  const { contact, status, name, role } = profileData;
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contact.email);
    sound.playSuccess();
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const emailTemplates = [
    {
      label: "Project Collaboration",
      subject: "Project Collaboration Inquiry via Portfolio",
      description: "Discuss building a new full-stack product or SaaS system",
    },
    {
      label: "Engineering Opportunity",
      subject: "Engineering Opportunity for ROS RENDO",
      description: "Full-time, contract, or backend software engineering roles",
    },
    {
      label: "System Architecture",
      subject: "Architecture Consultation via Portfolio",
      description: "Database modeling, API design, or deployment pipelines",
    },
    {
      label: "Say Hello",
      subject: "Hello ROS RENDO — Let's Connect",
      description: "General introduction, ideas, or tech discussions",
    },
  ];

  return (
    <div className="min-h-screen bg-[#07080f] text-white selection:bg-cyan-500/30 selection:text-white relative overflow-x-hidden">
      {/* Background radial ambient lights (pure GPU gradients, zero filter stalls) */}
      <div
        className="fixed -top-48 -right-48 w-[650px] h-[650px] rounded-full pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%)",
        }}
      />
      <div
        className="fixed bottom-0 -left-48 w-[700px] h-[700px] rounded-full pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle, rgba(99,102,241,0.14) 0%, transparent 70%)",
        }}
      />

      {/* Structural subtle grid overlay */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none z-0 opacity-40" />

      {/* ---------------- 1. STICKY TOP NAVIGATION BAR ---------------- */}
      <header className="sticky top-0 z-40 px-6 sm:px-12 py-5 backdrop-blur-xl bg-[#07080f]/80 border-b border-white/10 flex items-center justify-between">
        <Link
          href="/"
          onClick={() => sound.playClose()}
          className="inline-flex items-center gap-2.5 text-xs font-mono font-bold uppercase tracking-wider text-zinc-300 hover:text-white transition-colors group"
        >
          <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 group-hover:text-white group-hover:bg-white/10 transition-colors">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          </div>
          <span>BACK TO CANVAS</span>
        </Link>

        <div className="flex items-center gap-3 sm:gap-6">
          <Link
            href="/about"
            onClick={() => sound.playOpen()}
            className="text-xs font-mono uppercase tracking-wider text-zinc-400 hover:text-white transition-colors hidden sm:inline"
          >
            About
          </Link>
          <Link
            href="/projects"
            onClick={() => sound.playOpen()}
            className="text-xs font-mono uppercase tracking-wider text-zinc-400 hover:text-white transition-colors hidden sm:inline"
          >
            Projects
          </Link>

          <SoundToggle />

          <a
            href={contact.cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playOpen()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-emerald-400/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 hover:text-white text-xs font-mono transition-all hover:scale-105"
          >
            <FileDown className="w-3.5 h-3.5" />
            <span>CV</span>
          </a>
        </div>
      </header>

      {/* ---------------- 2. MAIN CONTENT CONTAINER ---------------- */}
      <main className="relative z-10 max-w-5xl mx-auto px-6 sm:px-12 py-12 sm:py-20 space-y-16 sm:space-y-24">
        {/* HERO SECTION: Oversized Editorial Typography */}
        <section className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
            <span className="text-xs font-mono tracking-widest uppercase text-emerald-400 font-bold">
              {status.text}
            </span>
            <span className="text-zinc-600 hidden sm:inline">•</span>
            <span className="text-xs font-mono text-zinc-400 hidden sm:inline">
              CARD 08 // LET&apos;S CONNECT
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4"
          >
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight uppercase font-sans text-white drop-shadow-2xl leading-[1.08]">
              Have something <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400">
                worth building?
              </span>
            </h1>

            <p className="text-base sm:text-xl text-zinc-300 font-normal max-w-2xl leading-relaxed pt-2">
              Open to meaningful projects, engineering opportunities, and interesting conversations.
            </p>
          </motion.div>

          {/* Quick Telemetry Strip */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap items-center gap-4 sm:gap-8 pt-3 text-xs font-mono text-zinc-400 border-t border-white/10"
          >
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-cyan-400" />
              <span>Phnom Penh, Cambodia (UTC+7 / Remote)</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-400" />
              <span>&lt; 24h response time</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Verified direct communications</span>
            </div>
          </motion.div>
        </section>

        {/* ---------------- 3. PRIMARY CONTACT ACTION CARDS (BENTO DOSSIER) ---------------- */}
        <section className="space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">
              01 // Direct Channels
            </span>
            <span className="text-xs font-mono text-cyan-400 font-medium">
              Click to initiate
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* CARD 1: PRIMARY DIRECT EMAIL (Spans 2 columns) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="md:col-span-2 relative rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#0e1324] via-[#090b14] to-black border border-cyan-500/30 overflow-hidden group shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
            >
              {/* Corner crosshairs */}
              <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-white/30 group-hover:border-cyan-400/80 transition-colors pointer-events-none" />
              <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-white/30 group-hover:border-cyan-400/80 transition-colors pointer-events-none" />
              <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-white/30 group-hover:border-cyan-400/80 transition-colors pointer-events-none" />
              <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-white/30 group-hover:border-cyan-400/80 transition-colors pointer-events-none" />

              <div className="relative z-10 flex flex-col justify-between h-full space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase tracking-wider text-cyan-300 font-semibold flex items-center gap-2">
                      <Mail className="w-4 h-4 text-cyan-400" />
                      Direct Inquiries & Proposals
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-white/[0.06] hover:bg-white/15 border border-white/15 text-zinc-300 hover:text-white transition-all active:scale-95"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-300 font-bold">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Address</span>
                        </>
                      )}
                    </button>
                  </div>

                  <a
                    href={`mailto:${contact.email}`}
                    onClick={() => sound.playOpen()}
                    className="text-2xl sm:text-4xl font-mono font-bold tracking-tight text-white hover:text-cyan-300 transition-colors block break-all pt-2 group/addr"
                  >
                    <span>{contact.email}</span>
                    <ArrowUpRight className="inline-block ml-2 w-6 h-6 text-cyan-400 group-hover/addr:translate-x-1 group-hover/addr:-translate-y-1 transition-transform" />
                  </a>
                </div>

                {/* Pre-formatted Subject Templates */}
                <div className="space-y-2.5 pt-2 border-t border-white/10">
                  <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block">
                    Fast-track with pre-filled topics:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {emailTemplates.map((item, idx) => (
                      <a
                        key={idx}
                        href={`mailto:${contact.email}?subject=${encodeURIComponent(item.subject)}`}
                        onClick={() => sound.playOpen()}
                        className="p-2.5 rounded-xl bg-white/[0.03] hover:bg-cyan-500/10 border border-white/[0.08] hover:border-cyan-400/40 transition-all text-left group/tpl block"
                      >
                        <div className="flex items-center justify-between text-xs font-mono font-semibold text-zinc-200 group-hover/tpl:text-cyan-300">
                          <span>{item.label}</span>
                          <Send className="w-3 h-3 text-zinc-500 group-hover/tpl:text-cyan-400 group-hover/tpl:translate-x-0.5 transition-all" />
                        </div>
                        <p className="text-[11px] font-mono text-zinc-400 truncate mt-0.5">
                          {item.description}
                        </p>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* CARD 2: CURRICULUM VITAE (CV) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#121626] via-[#0c0e18] to-black border border-emerald-500/30 flex flex-col justify-between overflow-hidden group shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold flex items-center gap-1.5">
                    <FileDown className="w-4 h-4 text-emerald-400" />
                    Credentials
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                    PDF • 2026
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white uppercase font-sans">
                  Curriculum Vitae
                </h3>
                <p className="text-xs font-mono text-zinc-300 leading-relaxed">
                  Complete technical dossier including project breakdowns, database schema expertise, and software engineering coursework.
                </p>
              </div>

              <div className="pt-6 space-y-2.5">
                <a
                  href={contact.cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playOpen()}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/50 text-emerald-200 hover:text-white text-xs font-mono font-bold tracking-wider uppercase transition-all shadow-[0_0_15px_rgba(16,185,129,0.2)] hover:scale-[1.02] active:scale-[0.98]"
                >
                  <FileDown className="w-4 h-4" />
                  <span>Download Résumé</span>
                </a>

                <a
                  href={contact.cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playOpen()}
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2 text-xs font-mono text-zinc-400 hover:text-zinc-200 transition-colors"
                >
                  <span>Preview in browser</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </motion.div>
          </div>

          {/* SOCIAL & CODE PLATFORMS ROW */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
            {/* GITHUB CARD */}
            <motion.a
              href={contact.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playOpen()}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="p-6 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-cyan-400/50 transition-all flex items-center justify-between group shadow-lg"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-cyan-500/20 group-hover:text-cyan-300 transition-all">
                  <GitHubIcon className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                      github.com/{contact.githubUser}
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-zinc-400 border border-white/10">
                      10 Projects
                    </span>
                  </div>
                  <p className="text-xs font-mono text-zinc-400 mt-0.5">
                    Production repositories, Docker configurations, and relational models
                  </p>
                </div>
              </div>

              <ArrowUpRight className="w-5 h-5 text-zinc-500 group-hover:text-cyan-300 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </motion.a>

            {/* LINKEDIN CARD */}
            <motion.a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playOpen()}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="p-6 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-indigo-400/50 transition-all flex items-center justify-between group shadow-lg"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-indigo-500/20 group-hover:text-indigo-300 transition-all">
                  <LinkedInIcon className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">
                      linkedin.com/in/{contact.linkedinUser}
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                      Professional
                    </span>
                  </div>
                  <p className="text-xs font-mono text-zinc-400 mt-0.5">
                    Engineering milestones, background trajectory, and professional network
                  </p>
                </div>
              </div>

              <ArrowUpRight className="w-5 h-5 text-zinc-500 group-hover:text-indigo-300 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </motion.a>
          </div>
        </section>

        {/* ---------------- 4. FINAL SIGNATURE & CLOSING MOTION ---------------- */}
        <section className="pt-12 sm:pt-16 pb-12 border-t border-white/10 flex flex-col items-center text-center space-y-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-2"
          >
            <span className="text-[11px] font-mono tracking-widest uppercase text-zinc-500 font-semibold block">
              ENGINEERED & INDEPENDENTLY BUILT BY
            </span>

            {/* Signature Typography */}
            <div className="relative inline-block px-4">
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight uppercase font-sans text-white drop-shadow-xl">
                {name}
              </h2>

              {/* Animated Underline: Draws beneath the name once, then remains calm and permanent */}
              <div className="relative w-full h-[3px] mt-2 overflow-hidden">
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                  className="w-full h-full bg-gradient-to-r from-transparent via-cyan-400 to-indigo-500 origin-left"
                />
              </div>
            </div>

            <p className="text-xs font-mono text-zinc-400 max-w-md pt-2">
              {role} • Phnom Penh, Cambodia
            </p>
          </motion.div>

          {/* Resting State Social Anchors */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex items-center gap-6 text-xs font-mono text-zinc-400"
          >
            <a
              href={`mailto:${contact.email}`}
              className="hover:text-cyan-300 transition-colors"
            >
              Email
            </a>
            <span className="opacity-30">•</span>
            <a
              href={contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              GitHub
            </a>
            <span className="opacity-30">•</span>
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-400 transition-colors"
            >
              LinkedIn
            </a>
            <span className="opacity-30">•</span>
            <a
              href={contact.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-400 transition-colors"
            >
              Résumé
            </a>
          </motion.div>
        </section>
      </main>

      {/* ---------------- 5. MINIMAL BOTTOM COPYRIGHT BAR ---------------- */}
      <footer className="border-t border-white/10 py-6 px-6 sm:px-12 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-zinc-500 gap-3">
        <div>© 2026 {name}. All rights reserved.</div>
        <div className="flex items-center gap-4 text-zinc-400">
          <span>PORTFOLIO SYSTEM V2.4</span>
          <span>•</span>
          <Link
            href="/"
            onClick={() => sound.playClose()}
            className="hover:text-white transition-colors"
          >
            RETURN HOME
          </Link>
        </div>
      </footer>
    </div>
  );
}
