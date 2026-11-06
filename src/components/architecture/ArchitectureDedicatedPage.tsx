"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { projectsData } from "@/data/projects";
import { getProjectTechnicalSpec } from "@/data/projectDetailsDatabase";
import { VisualArchitectureDiagram } from "@/components/case-study/VisualArchitectureDiagram";
import { VisualDatabaseCanvas } from "@/components/case-study/VisualDatabaseCanvas";
import { sound } from "@/lib/sound";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Layers,
  Database,
  Lock,
  Zap,
  ShieldCheck,
  Cpu,
  GitBranch,
  Server,
  KeyRound,
  FileText,
  Maximize2,
} from "lucide-react";

export function ArchitectureDedicatedPage() {
  // Key systems available for interactive blueprint exploration
  const featuredSlugs = [
    "servicefinder",
    "safedeal",
    "staypilot",
    "cloud-orchestrator",
    "trading-tools",
    "tokmenu",
  ];

  const featuredProjects = projectsData.filter((p) =>
    featuredSlugs.includes(p.slug) || featuredSlugs.includes(p.id)
  );

  const [selectedSlug, setSelectedSlug] = useState<string>("servicefinder");
  const [activeDiagramType, setActiveDiagramType] = useState<"topology" | "erd">("topology");

  const currentProject =
    featuredProjects.find((p) => p.slug === selectedSlug || p.id === selectedSlug) ||
    featuredProjects[0] ||
    projectsData[0];

  const spec = getProjectTechnicalSpec(currentProject.id || currentProject.slug);
  const entities = spec?.database.entities || currentProject.database?.entities || [];

  // Core Architectural Patterns solved across all systems
  const architecturalPatterns = [
    {
      number: "01",
      title: "PESSIMISTIC ROW-LEVEL CONCURRENCY LOCKING",
      domain: "PostgreSQL · Prisma Transactions · Mutexes",
      problem:
        "High-frequency booking slots, hotel room allocations, and escrow releases suffer from catastrophic double-booking race conditions when multiple users check out simultaneously.",
      solution:
        "Implemented database-level SELECT FOR UPDATE row locks inside atomic Prisma transactions. Subsequent conflicting transactions queue gracefully or fail fast with deterministic retry policies.",
      invariant: "Zero Overbooking & Zero Double-Spend",
    },
    {
      number: "02",
      title: "MULTI-TENANT TENANCY SCOPING & IDOR PROTECTION",
      domain: "Row-Level Isolation · Tenant Context Middleware",
      problem:
        "SaaS platforms serving customers, companies, and staff risk severe data leakage if an endpoint fails to verify organization ownership on entity IDs.",
      solution:
        "Engineered global Prisma middleware that intercepts every query, injecting mandatory organizationId and userId context. All CRUD operations are structurally restricted to the authenticated session tenant.",
      invariant: "Cryptographically Enforced Tenant Boundaries",
    },
    {
      number: "03",
      title: "CRYPTOGRAPHIC WEBHOOK LEDGERS & IDEMPOTENCY",
      domain: "HMAC SHA-256 · Append-Only Ledgers · Redis Mutex",
      problem:
        "Payment gateways (Stripe / ABA KHQR) retry failed webhook deliveries over volatile networks, risking duplicate balance top-ups or multiple order fulfillment.",
      solution:
        "Raw incoming request bodies are verified against shared HMAC secret digests. Handlers check a Redis-backed idempotency cache before executing atomic state transitions recorded into an append-only transaction ledger.",
      invariant: "100% Audit-Proof Financial Replay Defense",
    },
    {
      number: "04",
      title: "ASYNCHRONOUS TASK QUEUES & REALTIME DISPATCH",
      domain: "WebSockets · BullMQ · Worker Threads · Redis Pub/Sub",
      problem:
        "Long-running tasks like contractor route calculation, PDF invoice rendering, and email dispatch block the Node.js event loop, causing API latency spikes.",
      solution:
        "Offloaded non-blocking computational workloads to background worker queues. Critical real-time events (order updates, live triage vitals) broadcast across lightweight WebSocket channels with sub-25ms dispatch latency.",
      invariant: "Sub-50ms API Response Latency Under Load",
    },
  ];

  return (
    <div className="min-h-screen bg-[#07080f] text-white selection:bg-white selection:text-black relative overflow-x-hidden font-sans">
      {/* Subtle atmospheric ambient glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] rounded-full blur-[200px] pointer-events-none opacity-15 -z-10 bg-cyan-500" />
      <div className="fixed inset-0 bg-[radial-gradient(#ffffff04_1px,transparent_1px)] bg-[size:36px_36px] pointer-events-none -z-10" />

      {/* ---------------- TOP MINIMAL NAVIGATION BAR ---------------- */}
      <header className="sticky top-0 z-40 px-6 sm:px-10 lg:px-16 py-5 backdrop-blur-xl bg-[#07080f]/80 border-b border-white/[0.07] flex items-center justify-between">
        <Link
          href="/"
          onClick={() => sound.playClose()}
          className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-wider text-zinc-400 hover:text-white transition-colors group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          <span>HOME</span>
        </Link>

        <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
          <span className="font-bold text-white uppercase">SYSTEM ARCHITECTURE LAB</span>
          <span className="opacity-30">•</span>
          <span>ENGINEERING BLUEPRINTS</span>
        </div>

        <Link
          href="/projects"
          onClick={() => sound.playOpen()}
          className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-white hover:text-zinc-300 transition-colors"
        >
          <span>ALL PROJECTS</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </header>

      {/* ---------------- MAIN EDITORIAL CONTENT ---------------- */}
      <main className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-14 py-20 sm:py-28 space-y-36 sm:space-y-48">
        {/* ========================================================================= */}
        {/* 1. HERO INTRODUCTION                                                      */}
        {/* ========================================================================= */}
        <section className="space-y-8">
          <div className="space-y-4 max-w-3xl">
            <span className="text-xs font-mono tracking-widest text-zinc-500 uppercase">
              ENGINEERING LAB // 001
            </span>
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tight text-white leading-[0.92]">
              Systems Architecture &amp; Blueprints
            </h1>
            <p className="text-xl sm:text-2xl text-zinc-300 font-light leading-relaxed pt-2">
              Deep-dive into the architectural mechanics behind my production builds: multi-tier topologies, database relationship meshes, and defensible engineering invariants.
            </p>
          </div>

          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-x-8 gap-y-3 text-xs font-mono text-zinc-400 uppercase tracking-wider">
            <div>
              <span className="text-zinc-500 mr-2">CORE ENGINE:</span>
              <span className="text-white font-semibold">PostgreSQL 16 · Prisma · Redis</span>
            </div>
            <div className="opacity-30 hidden sm:inline">•</div>
            <div>
              <span className="text-zinc-500 mr-2">INGRESS:</span>
              <span className="text-white font-semibold">Next.js App Router · TLS 1.3</span>
            </div>
            <div className="opacity-30 hidden sm:inline">•</div>
            <div>
              <span className="text-zinc-500 mr-2">ISOLATION:</span>
              <span className="text-white font-semibold">Row-Level Locks · Zod Boundary</span>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. INTERACTIVE BLUEPRINT EXPLORER                                         */}
        {/* ========================================================================= */}
        <section className="space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-white/10">
            <div className="space-y-2">
              <span className="text-xs font-mono tracking-widest text-zinc-500 uppercase">
                INTERACTIVE INSPECTOR
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                Live System Blueprint Explorer
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 font-light">
                Select a production platform below to inspect its multi-tier topology or relational ERD mesh.
              </p>
            </div>

            {/* Toggle: Topology vs Database ERD */}
            <div className="flex items-center p-1 rounded-xl bg-white/[0.05] border border-white/10 self-start md:self-auto">
              <button
                type="button"
                onClick={() => {
                  sound.playTab();
                  setActiveDiagramType("topology");
                }}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                  activeDiagramType === "topology"
                    ? "bg-white text-black font-bold shadow-xs"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>SYSTEM TOPOLOGY</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  sound.playTab();
                  setActiveDiagramType("erd");
                }}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                  activeDiagramType === "erd"
                    ? "bg-white text-black font-bold shadow-xs"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <Database className="w-3.5 h-3.5" />
                <span>DATABASE ERD</span>
              </button>
            </div>
          </div>

          {/* Project Switcher Pills */}
          <div className="flex flex-wrap items-center gap-2 pb-2">
            {featuredProjects.map((proj) => {
              const isSelected = selectedSlug === proj.slug || selectedSlug === proj.id;
              return (
                <button
                  key={proj.id}
                  type="button"
                  onClick={() => {
                    sound.playTab();
                    setSelectedSlug(proj.slug || proj.id);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-mono transition-all ${
                    isSelected
                      ? "bg-white text-black font-bold shadow-md scale-105"
                      : "bg-white/[0.04] text-zinc-400 hover:text-white hover:bg-white/[0.08] border border-white/10"
                  }`}
                >
                  <span>{proj.title.toUpperCase()}</span>
                </button>
              );
            })}
          </div>

          {/* The Active Blueprint Canvas (White Minimalist) */}
          <div className="space-y-6">
            <AnimatePresence mode="wait">
              {activeDiagramType === "topology" ? (
                <motion.div
                  key={`topology-${currentProject.slug}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                >
                  <VisualArchitectureDiagram project={currentProject} />
                </motion.div>
              ) : (
                <motion.div
                  key={`erd-${currentProject.slug}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                >
                  <VisualDatabaseCanvas
                    entities={entities}
                    accentColor={currentProject.accentColor}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Jump to Project Dedicated Case Study */}
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-zinc-500 uppercase">
                  ACTIVE PLATFORM CASE STUDY
                </span>
                <div className="text-base font-bold text-white">
                  {currentProject.title} &mdash; {currentProject.category}
                </div>
                <p className="text-xs text-zinc-400 font-light">
                  {currentProject.tagline}
                </p>
              </div>

              <Link
                href={`/projects/${currentProject.slug}`}
                onClick={() => sound.playOpen()}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-zinc-200 transition-all hover:scale-105 active:scale-95 shadow-md shrink-0"
              >
                <span>READ FULL CASE STUDY</span>
                <ArrowRight className="w-3.5 h-3.5 text-black" />
              </Link>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. CORE ARCHITECTURAL PATTERNS SOLVED                                    */}
        {/* ========================================================================= */}
        <section className="space-y-16">
          <div className="space-y-4 max-w-2xl">
            <span className="text-xs font-mono tracking-widest text-zinc-500 uppercase">
              DEFENSIBLE PATTERNS // 002
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
              Core Architectural Patterns Solved
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 font-light">
              Formal engineering patterns applied across all projects to ensure concurrency safety, multi-tenant security, and financial reliability.
            </p>
          </div>

          <div className="space-y-20">
            {architecturalPatterns.map((pat) => (
              <motion.div
                key={pat.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="pt-8 border-t border-white/10 grid grid-cols-1 md:grid-cols-12 gap-8 items-start"
              >
                {/* Number & Pattern Title (5 cols) */}
                <div className="md:col-span-5 space-y-2">
                  <div className="text-6xl sm:text-7xl font-black font-mono tracking-tighter text-white/30">
                    {pat.number}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white uppercase leading-snug">
                    {pat.title}
                  </h3>
                  <div className="text-xs font-mono text-zinc-500 pt-1">
                    {pat.domain}
                  </div>
                  <div className="pt-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-medium bg-emerald-500/10 text-emerald-300 border border-emerald-500/25">
                      <ShieldCheck className="w-3 h-3 text-emerald-400" />
                      <span>{pat.invariant}</span>
                    </span>
                  </div>
                </div>

                {/* Problem & Architectural Solution (7 cols) */}
                <div className="md:col-span-7 space-y-5 text-sm sm:text-base text-zinc-300 font-light leading-relaxed">
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-1">
                    <div className="text-xs font-mono text-rose-300 font-bold uppercase">
                      THE FAILURE HAZARD:
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-400 font-light">
                      {pat.problem}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-1">
                    <div className="text-xs font-mono text-emerald-300 font-bold uppercase">
                      THE ARCHITECTURAL SOLUTION:
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-300 font-light">
                      {pat.solution}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. FOOTER & NEXT DESTINATIONS                                             */}
        {/* ========================================================================= */}
        <section className="pt-16 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs font-mono text-zinc-500">
          <Link
            href="/projects"
            onClick={() => sound.playClose()}
            className="hover:text-white transition-colors flex items-center gap-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>BROWSE ALL 13 PROJECTS IN CIRCUIT</span>
          </Link>

          <span>ROS RENDO • SYSTEMS ARCHITECT &amp; DEVELOPER</span>
        </section>
      </main>
    </div>
  );
}

