"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { profileData } from "@/data/profile";
import { sound } from "@/lib/sound";
import {
  ArrowLeft,
  ArrowRight,
  GitCommit,
  CheckCircle2,
  Calendar,
  Sparkles,
  Layers,
  Cpu,
  BookOpen,
  Terminal,
} from "lucide-react";

export function JourneyDedicatedPage() {
  const milestones = [
    {
      year: "2026 — Present",
      title: "Full-Stack Architect & Autonomous Systems",
      badge: "Scale & Systems",
      summary: "Shipping 13 production platforms, multi-tenant databases, and autonomous AI developer workflows.",
      narrative:
        "Specializing in end-to-end product architecture: designing high-throughput relational models in PostgreSQL, deterministic state machines, and real-time WebSocket dispatch engines. Exploring local AI agent automation, subagent orchestration, and developer tooling.",
      highlights: [
        "Architected and deployed 13 complete web platforms across marketplace, fintech, hospitality, and AI tooling domains.",
        "Engineered deterministic concurrency locks (SELECT FOR UPDATE) preventing double-booking and payment race conditions.",
        "Integrated cryptographic webhook verification pipelines with immutable append-only ledgers.",
      ],
      tags: ["Distributed Systems", "Next.js 16", "PostgreSQL 16", "Docker", "Autonomous Agents"],
    },
    {
      year: "2024 — 2025",
      title: "Independent Product Builder & SaaS Engineering",
      badge: "Building & Shipping",
      summary: "Architecting and shipping full-stack products with real-world users and payment infrastructure.",
      narrative:
        "Moved decisively beyond tutorial clones to architecting complete, deployable products. Shipped ServiceFinder (home services marketplace) and SafeDeal (gaming escrow platform), integrating ABA PAYWAY KHQR and Stripe payment rails.",
      highlights: [
        "Designed multi-tenant data schemas with role-based access control (Customers, Companies, Field Technicians).",
        "Configured production Linux VPS environments with Nginx reverse proxies, SSL termination, and PM2 process clustering.",
        "Built automated financial reconciliation and inspection countdown state machines.",
      ],
      tags: ["Full-Stack", "NestJS", "Prisma ORM", "Stripe API", "ABA KHQR", "Linux VPS"],
    },
    {
      year: "2023 — 2024",
      title: "Backend Specialization & Database Discipline",
      badge: "Deep Foundations",
      summary: "Transitioned from scripting to robust backend engineering and relational schema design.",
      narrative:
        "Focused heavily on system design, relational calculus, and API reliability. Replaced loose document collections with normalized PostgreSQL schemas, foreign key cascade constraints, and index optimization.",
      highlights: [
        "Designed RESTful microservices with strict DTO validation pipes and RFC 7807 problem details error handling.",
        "Containerized development, staging, and database instances using Docker and Docker Compose.",
        "Deep-dived into Node.js asynchronous event loop mechanics, streaming protocols, and memory profiling.",
      ],
      tags: ["Node.js", "Express", "TypeScript", "PostgreSQL", "Docker Compose", "REST APIs"],
    },
    {
      year: "2022 — 2023",
      title: "Computer Science & Engineering Student",
      badge: "University Core",
      summary: "Rigorous study of computer science fundamentals, data structures, and operating systems.",
      narrative:
        "Built foundational appreciation for algorithmic efficiency (Big-O analysis), memory layout, network protocols (TCP/UDP, HTTP/HTTPS), and relational database theory. Wrote fundamental data structures and algorithms from scratch in university labs.",
      highlights: [
        "Implemented linked lists, binary search trees, hash maps, and graph traversal algorithms.",
        "Studied operating systems concurrency, thread scheduling, and network socket programming.",
        "Adopted git version control discipline and clean modular code organization.",
      ],
      tags: ["Algorithms", "Data Structures", "Networking", "Operating Systems", "Git"],
    },
  ];

  return (
    <div className="min-h-screen bg-[#07080f] text-white selection:bg-white selection:text-black relative overflow-x-hidden font-sans">
      {/* Subtle atmospheric ambient glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] rounded-full blur-[200px] pointer-events-none opacity-15 -z-10 bg-indigo-500" />
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
          <span className="font-bold text-white uppercase">ENGINEERING JOURNEY</span>
          <span className="opacity-30">•</span>
          <span>BUILDER TIMELINE</span>
        </div>

        <Link
          href="/architecture"
          onClick={() => sound.playOpen()}
          className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-white hover:text-zinc-300 transition-colors"
        >
          <span>SYSTEM ARCHITECTURE</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </header>

      {/* ---------------- MAIN EDITORIAL CONTENT ---------------- */}
      <main className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-14 py-20 sm:py-28 space-y-28 sm:space-y-36">
        {/* Header Introduction */}
        <section className="space-y-6">
          <span className="text-xs font-mono tracking-widest text-zinc-500 uppercase">
            CHRONOLOGY // 2022 — 2026
          </span>
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tight text-white leading-[0.92]">
            Evolution of a Builder
          </h1>
          <p className="text-xl sm:text-2xl text-zinc-300 font-light leading-relaxed max-w-3xl pt-2">
            From university algorithms and foundational backend scripts to architecting full-stack production platforms with transactional integrity.
          </p>
        </section>

        {/* Milestone Timeline Narrative */}
        <section className="space-y-16 sm:space-y-24 relative">
          {/* Subtle vertical spine guide */}
          <div className="hidden md:block absolute left-[140px] top-6 bottom-12 w-[1px] bg-white/10" />

          {milestones.map((m, idx) => (
            <motion.div
              key={m.year}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start relative"
            >
              {/* Left Column: Big Year & Spine Node (3 cols) */}
              <div className="md:col-span-3 space-y-2">
                <div className="text-sm font-mono font-bold text-white tracking-wider uppercase">
                  {m.year}
                </div>
                <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-mono uppercase bg-white/[0.05] border border-white/10 text-zinc-400">
                  {m.badge}
                </span>
              </div>

              {/* Center/Right Column: Detail Card & Highlights (9 cols) */}
              <div className="md:col-span-9 p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all space-y-5">
                <div className="space-y-1.5">
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {m.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 font-mono">
                    {m.summary}
                  </p>
                </div>

                <p className="text-sm sm:text-base text-zinc-300 font-light leading-relaxed">
                  {m.narrative}
                </p>

                {/* Highlights List */}
                <div className="pt-3 border-t border-white/10 space-y-2.5">
                  <div className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
                    TECHNICAL MILESTONES:
                  </div>
                  <ul className="space-y-2 text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
                    {m.highlights.map((h, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tags Pill Bar */}
                <div className="pt-2 flex flex-wrap gap-2">
                  {m.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded text-xs font-mono text-zinc-400 bg-black/40 border border-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </section>

        {/* Footer Destination Links */}
        <section className="pt-16 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs font-mono text-zinc-500">
          <Link
            href="/about"
            onClick={() => sound.playClose()}
            className="hover:text-white transition-colors flex items-center gap-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>READ PERSONAL PHILOSOPHY &amp; ABOUT</span>
          </Link>

          <Link
            href="/projects"
            onClick={() => sound.playOpen()}
            className="hover:text-white transition-colors flex items-center gap-2"
          >
            <span>DISCOVER ALL 13 PROJECTS IN CIRCUIT</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </section>
      </main>
    </div>
  );
}

