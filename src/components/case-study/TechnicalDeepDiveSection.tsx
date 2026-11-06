"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Project } from "@/data/projects";
import { sound } from "@/lib/sound";
import { TechnicalDeepDiveModal } from "./TechnicalDeepDiveModal";
import { VisualDatabaseCanvas } from "./VisualDatabaseCanvas";
import { VisualArchitectureDiagram } from "./VisualArchitectureDiagram";
import { VisualStateMachineDiagram } from "./VisualStateMachineDiagram";
import { getProjectTechnicalSpec } from "@/data/projectDetailsDatabase";
import {
  Database,
  Layers,
  Zap,
  ShieldCheck,
  Terminal,
  Maximize2,
  Lock,
  CheckCircle2,
  Cpu,
  ArrowRight,
  Server,
  KeyRound,
  FileCode,
  ShieldAlert,
} from "lucide-react";

interface TechnicalDeepDiveSectionProps {
  project: Project;
}

export function TechnicalDeepDiveSection({ project }: TechnicalDeepDiveSectionProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [initialModalTab, setInitialModalTab] = useState<"architecture" | "database">("architecture");
  const [activeEndpointIdx, setActiveEndpointIdx] = useState<number>(0);
  const shouldReduceMotion = useReducedMotion();

  const spec = getProjectTechnicalSpec(project.id || project.slug);
  const db = project.database || spec?.database;
  const entities = db?.entities || [];
  const endpoints =
    project.apiEndpoints && project.apiEndpoints.length > 0
      ? project.apiEndpoints
      : spec?.apiEndpoints || [];
  const challenges = project.challenges || [];
  const decisions = project.decisions || [];
  const securityItems =
    project.securityMatrix && project.securityMatrix.length > 0
      ? project.securityMatrix
      : spec?.securityMatrix || [];

  const openModal = (tab: "architecture" | "database") => {
    sound.playOpen();
    setInitialModalTab(tab);
    setModalOpen(true);
  };

  return (
    <div className="space-y-28 sm:space-y-36">
      {/* ========================================================================= */}
      {/* SECTION 1: SYSTEM ARCHITECTURE (VISUAL LEFT, DETAIL RIGHT)               */}
      {/* ========================================================================= */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-400">
          <span className="text-cyan-400 font-bold">01</span>
          <span>{"//"} SYSTEM ARCHITECTURE TOPOLOGY</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Visual on the Left (7 cols) */}
          <div className="lg:col-span-7">
            <VisualArchitectureDiagram
              project={project}
              onZoomClick={() => openModal("architecture")}
            />
          </div>

          {/* Detail Text on the Right (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="text-[11px] font-mono text-cyan-400 font-semibold tracking-wider uppercase">
                TIERED SERVICE TOPOLOGY
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
                Engineered for strict resilience and zero single points of failure.
              </h3>
            </div>

            <p className="text-sm sm:text-base text-zinc-300 font-light leading-relaxed">
              {project.architecture.overview ||
                "A decoupled multi-tier architecture isolating client-side hydration, zero-trust edge gateway validation, asynchronous domain controllers, and transactional database persistence."}
            </p>

            {/* Spec Feature Bullet Points */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/10">
                <Cpu className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <strong className="text-white block font-semibold">Client &amp; Ingress Layer</strong>
                  <span className="text-zinc-400 font-light">
                    {project.architecture.tierDetails?.client ||
                      "Next.js App Router with React Server Components for instant hydration & minimal client JavaScript."}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/10">
                <ShieldCheck className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <strong className="text-white block font-semibold">Edge Security Gateway</strong>
                  <span className="text-zinc-400 font-light">
                    {project.architecture.tierDetails?.gateway ||
                      "Signed HMAC JWT tokens, token-bucket rate limiting, and strict Zod runtime schema boundaries."}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/10">
                <Server className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <strong className="text-white block font-semibold">Decoupled Domain Logic</strong>
                  <span className="text-zinc-400 font-light">
                    {project.architecture.tierDetails?.services ||
                      "Isolated business controllers and asynchronous background workers with transactional idempotency."}
                  </span>
                </div>
              </div>
            </div>

            {/* Fullscreen Trigger */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => openModal("architecture")}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.05] border border-white/15 hover:border-white/30 text-white text-xs font-mono font-semibold uppercase tracking-wider transition-all hover:scale-[1.02] active:scale-[0.98] shadow-sm"
              >
                <Maximize2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>EXPAND TOPOLOGY BLUEPRINT</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: RELATIONAL DATABASE & ERD (DETAIL LEFT, VISUAL RIGHT)         */}
      {/* ========================================================================= */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-400">
          <span className="text-cyan-400 font-bold">02</span>
          <span>{"//"} RELATIONAL DATA INTEGRITY &amp; ERD MESH</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Detail Text on the Left (5 cols) */}
          <div className="lg:col-span-5 space-y-6 order-2 lg:order-1">
            <div className="space-y-2">
              <span className="text-[11px] font-mono text-cyan-400 font-semibold tracking-wider uppercase">
                STRICT RELATIONAL INTEGRITY
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
                Normalized schema model with ACID isolation guarantees.
              </h3>
            </div>

            <p className="text-sm sm:text-base text-zinc-300 font-light leading-relaxed">
              {db?.overview ||
                "Fully normalized relational database schema with strict foreign key cascading rules, composite unique indexes, and optimistic/pessimistic lock isolation on critical mutations."}
            </p>

            {/* Telemetry Stats Grid */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 space-y-1">
                <span className="text-[10px] font-mono text-zinc-400 uppercase">ENGINE</span>
                <div className="text-xs font-bold text-white font-mono">PostgreSQL 16</div>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 space-y-1">
                <span className="text-[10px] font-mono text-zinc-400 uppercase">DRIVER</span>
                <div className="text-xs font-bold text-cyan-300 font-mono">Prisma ORM</div>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 space-y-1">
                <span className="text-[10px] font-mono text-zinc-400 uppercase">ISOLATION</span>
                <div className="text-xs font-bold text-emerald-300 font-mono">Pessimistic Locks</div>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 space-y-1">
                <span className="text-[10px] font-mono text-zinc-400 uppercase">MODELS</span>
                <div className="text-xs font-bold text-white font-mono">{entities.length} Core Entities</div>
              </div>
            </div>

            {/* Key DB Discipline Note */}
            <div className="p-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-xs text-cyan-200 font-mono flex items-center gap-2.5">
              <Database className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Foreign Key indexes prevent full table scans on relational joins.</span>
            </div>

            {/* Fullscreen Trigger */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => openModal("database")}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.05] border border-white/15 hover:border-white/30 text-white text-xs font-mono font-semibold uppercase tracking-wider transition-all hover:scale-[1.02] active:scale-[0.98] shadow-sm"
              >
                <Maximize2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>OPEN FULL ERD INSPECTOR</span>
              </button>
            </div>
          </div>

          {/* Visual on the Right (7 cols) */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <VisualDatabaseCanvas
              entities={entities}
              accentColor={project.accentColor}
              onZoomClick={() => openModal("database")}
              onSelectEntity={() => openModal("database")}
            />
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: API CONTRACTS (VISUAL LEFT, DETAIL RIGHT)                      */}
      {/* ========================================================================= */}
      {endpoints.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-400">
            <span className="text-cyan-400 font-bold">03</span>
            <span>{"//"} API CONTRACTS &amp; REQUEST SERIALIZATION</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Visual on the Left (7 cols): Interactive API Terminal Sandbox */}
            <div className="lg:col-span-7 rounded-3xl border border-zinc-200 bg-[#FCFCFD] p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.05)] select-none text-zinc-900 space-y-5">
              {/* Endpoint Tabs */}
              <div className="flex flex-wrap items-center gap-2 pb-4 border-b border-zinc-200">
                {endpoints.map((ep, idx) => {
                  const isActive = activeEndpointIdx === idx;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        sound.playTab();
                        setActiveEndpointIdx(idx);
                      }}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                        isActive
                          ? "bg-zinc-900 text-white font-bold shadow-xs"
                          : "bg-zinc-100 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200/70"
                      }`}
                    >
                      <span
                        className={`px-1.5 py-0.5 rounded text-[9px] font-black ${
                          ep.method === "POST"
                            ? isActive
                              ? "bg-amber-400 text-zinc-950"
                              : "bg-amber-100 text-amber-800"
                            : isActive
                            ? "bg-emerald-400 text-zinc-950"
                            : "bg-emerald-100 text-emerald-800"
                        }`}
                      >
                        {ep.method}
                      </span>
                      <span>{ep.path}</span>
                    </button>
                  );
                })}
              </div>

              {/* Selected Endpoint Body & Response */}
              {endpoints[activeEndpointIdx] && (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <code className="text-sm font-mono font-bold text-zinc-950">
                        {endpoints[activeEndpointIdx].method} {endpoints[activeEndpointIdx].path}
                      </code>
                      <p className="text-xs text-zinc-500 font-normal mt-0.5">
                        {endpoints[activeEndpointIdx].description}
                      </p>
                    </div>
                    {endpoints[activeEndpointIdx].latency && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                        <Zap className="w-3.5 h-3.5" />
                        <span>{endpoints[activeEndpointIdx].latency}</span>
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    {endpoints[activeEndpointIdx].requestBody && (
                      <div className="space-y-1.5">
                        <span className="text-[10px] font-mono text-zinc-500 font-semibold uppercase">
                          INCOMING PAYLOAD
                        </span>
                        <pre className="p-3.5 rounded-xl bg-zinc-900 text-zinc-100 text-xs font-mono overflow-x-auto max-h-48 border border-zinc-800">
                          {endpoints[activeEndpointIdx].requestBody}
                        </pre>
                      </div>
                    )}
                    <div
                      className={`space-y-1.5 ${
                        !endpoints[activeEndpointIdx].requestBody ? "md:col-span-2" : ""
                      }`}
                    >
                      <span className="text-[10px] font-mono text-zinc-500 font-semibold uppercase">
                        200 OK SERIALIZED RESPONSE
                      </span>
                      <pre className="p-3.5 rounded-xl bg-zinc-900 text-emerald-300 text-xs font-mono overflow-x-auto max-h-48 border border-zinc-800">
                        {endpoints[activeEndpointIdx].responseSample}
                      </pre>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Detail Text on the Right (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2">
                <span className="text-[11px] font-mono text-cyan-400 font-semibold tracking-wider uppercase">
                  TYPE-SAFE API CONTRACTS
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
                  Strictly validated schemas with sub-50ms latency profiles.
                </h3>
              </div>

              <p className="text-sm sm:text-base text-zinc-300 font-light leading-relaxed">
                All external and internal REST interactions conform to strict schema boundaries. Input payloads are validated with Zod before execution, and response objects are explicitly serialized to eliminate data leakage.
              </p>

              <div className="space-y-3 pt-1">
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-xs text-zinc-300 font-light">
                    RFC 7807 standardized problem detail error format.
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-xs text-zinc-300 font-light">
                    Idempotency keys on all mutating financial and booking requests.
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-xs text-zinc-300 font-light">
                    Token bucket rate limiting defending against burst traffic.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* SECTION 4: CONCURRENCY & STATE MACHINE (DETAIL LEFT, VISUAL RIGHT)        */}
      {/* ========================================================================= */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-400">
          <span className="text-cyan-400 font-bold">04</span>
          <span>{"//"} CONCURRENCY &amp; TRANSACTION STATE MACHINE</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Detail Text on the Left (5 cols) */}
          <div className="lg:col-span-5 space-y-6 order-2 lg:order-1">
            <div className="space-y-2">
              <span className="text-[11px] font-mono text-cyan-400 font-semibold tracking-wider uppercase">
                DETERMINISTIC CONCURRENCY
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
                State transitions engineered to eliminate race conditions.
              </h3>
            </div>

            <p className="text-sm sm:text-base text-zinc-300 font-light leading-relaxed">
              When concurrent users interact with inventory or funds, naive optimistic locking can result in double-booking or double-release. Our deterministic state engine enforces atomic transitions with rollback guarantees.
            </p>

            {/* Real Solved Challenge Highlights */}
            {challenges.slice(0, 1).map((c, i) => (
              <div
                key={i}
                className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2"
              >
                <div className="flex items-center gap-2 text-xs font-mono text-rose-300 font-bold">
                  <ShieldAlert className="w-4 h-4 text-rose-400" />
                  <span>CRITICAL HAZARD PREVENTED</span>
                </div>
                <div className="text-sm font-bold text-white">{c.challenge}</div>
                <p className="text-xs text-zinc-300 font-light leading-relaxed">
                  {c.solution}
                </p>
              </div>
            ))}
          </div>

          {/* Visual on the Right (7 cols) */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <VisualStateMachineDiagram
              project={project}
              onZoomClick={() => openModal("architecture")}
            />
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5: SECURITY DEFENSE & ADR (VISUAL LEFT, DETAIL RIGHT)             */}
      {/* ========================================================================= */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-400">
          <span className="text-cyan-400 font-bold">05</span>
          <span>{"//"} PRODUCTION HARDENING &amp; ARCHITECTURAL DECISIONS</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Visual on the Left (7 cols): Security Threat Matrix */}
          <div className="lg:col-span-7 rounded-3xl border border-zinc-200 bg-[#FCFCFD] p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.05)] text-zinc-900 select-none space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-200">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-zinc-900" />
                <h4 className="text-sm sm:text-base font-bold text-zinc-950">
                  Zero-Trust Defense Matrix &amp; Hardening
                </h4>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-100 text-zinc-600 font-semibold border border-zinc-200">
                OWASP TOP 10 HARDENED
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                {
                  vector: "IDOR / Cross-Tenant Access",
                  policy: "Tenant Context Middleware",
                  desc: "Enforces strict organization boundary on every Prisma query.",
                },
                {
                  vector: "Session Spoofing & Hijack",
                  policy: "HMAC Signed HTTP-Only Cookies",
                  desc: "Cryptographic tokens with samesite=strict & secure flags.",
                },
                {
                  vector: "SQL / Script Injections",
                  policy: "Parameterized ORM Queries",
                  desc: "Raw string interpolation prohibited; automatic output sanitization.",
                },
                {
                  vector: "Webhook Tampering",
                  policy: "Cryptographic HMAC SHA-256",
                  desc: "Raw payload signatures verified before processing payment events.",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-white border border-zinc-200 shadow-2xs space-y-1"
                >
                  <div className="text-[11px] font-bold text-zinc-950">{item.vector}</div>
                  <div className="text-[10px] font-mono text-zinc-600 font-semibold">
                    &bull; {item.policy}
                  </div>
                  <p className="text-[11px] text-zinc-500 font-normal leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Detail Text on the Right (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="text-[11px] font-mono text-cyan-400 font-semibold tracking-wider uppercase">
                ARCHITECTURAL DECISION RECORD (ADR)
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
                Defensible technical choices tested in production.
              </h3>
            </div>

            {decisions.slice(0, 2).map((d, i) => (
              <div
                key={i}
                className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2"
              >
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-300 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  <span>DECISION: {d.title}</span>
                </div>
                <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
                  {d.reasoning}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- FULLSCREEN ZOOMABLE LIGHTBOX MODAL ---------------- */}
      {modalOpen && (
        <TechnicalDeepDiveModal
          key={`${project.id}-${initialModalTab}`}
          project={project}
          initialTab={initialModalTab}
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
}
