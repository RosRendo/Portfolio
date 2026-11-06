"use client";

import { useState } from "react";
import { Project } from "@/data/projects";
import { sound } from "@/lib/sound";
import {
  Globe,
  Smartphone,
  ShieldCheck,
  Server,
  Database,
  Cloud,
  Cpu,
  Layers,
  Zap,
  Lock,
  Maximize2,
  CheckCircle2,
} from "lucide-react";

interface VisualArchitectureDiagramProps {
  project: Project;
  onZoomClick?: () => void;
}

export function VisualArchitectureDiagram({
  project,
  onZoomClick,
}: VisualArchitectureDiagramProps) {
  const [activeTier, setActiveTier] = useState<number | null>(null);

  // Extract core service names from project components or provide clean defaults
  const comp1 = project.architecture.components[0]?.name || "Core Domain Service";
  const comp2 = project.architecture.components[1]?.name || "Payment & Auth Gateway";
  const comp3 = project.architecture.components[2]?.name || "Async Queue & Workers";

  return (
    <div className="relative w-full rounded-3xl border border-zinc-200 bg-[#FCFCFD] p-6 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.05)] overflow-hidden select-none text-zinc-900">
      {/* Subtle Minimal Architectural Dot Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#d4d4d8_1px,transparent_1px)] bg-[size:20px_20px] opacity-45 pointer-events-none" />

      {/* Top Header Bar */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-zinc-200">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-white border border-zinc-200 text-zinc-900 flex items-center justify-center shadow-xs">
            <Layers className="w-5 h-5 text-zinc-900" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-base sm:text-lg font-bold text-zinc-950 tracking-tight">
                System Topology &amp; Architecture
              </h4>
              <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                VERIFIED FLOW
              </span>
            </div>
            <p className="text-xs text-zinc-500 font-mono mt-0.5">
              End-to-End Reactive Pipeline &bull; Client Ingress to Persistence
            </p>
          </div>
        </div>

        {onZoomClick && (
          <button
            type="button"
            onClick={() => {
              sound.playTab();
              onZoomClick();
            }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold text-zinc-700 bg-white border border-zinc-200 hover:border-zinc-900 hover:text-zinc-950 transition-all shadow-xs hover:shadow-sm"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>FULLSCREEN INSPECTOR</span>
          </button>
        )}
      </div>

      {/* ---------------- THE WHITE MINIMAL BLOCK DIAGRAM ---------------- */}
      <div className="relative z-10 max-w-4xl mx-auto space-y-4">
        {/* TIER 1: CLIENT INGRESS */}
        <div
          onMouseEnter={() => setActiveTier(1)}
          onMouseLeave={() => setActiveTier(null)}
          className={`p-5 rounded-2xl bg-white border transition-all duration-200 ${
            activeTier === 1
              ? "border-zinc-900 shadow-md ring-1 ring-zinc-900/10"
              : "border-zinc-200 shadow-xs hover:border-zinc-400"
          }`}
        >
          <div className="flex items-center justify-between text-[11px] font-mono mb-3">
            <span className="font-bold text-zinc-900 uppercase tracking-wider">
              TIER 01 // CLIENT INGRESS
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] bg-zinc-100 text-zinc-600 border border-zinc-200">
              HTTP/3 &bull; WSS
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-zinc-50/70 border border-zinc-200/80 flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-lg bg-white border border-zinc-200 text-zinc-800 flex items-center justify-center shrink-0 shadow-2xs">
                <Globe className="w-4 h-4 text-zinc-900" />
              </div>
              <div>
                <div className="text-xs font-bold text-zinc-900">Next.js 16 Web Application</div>
                <div className="text-[10px] font-mono text-zinc-500">React Server Components &bull; ISR</div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-zinc-50/70 border border-zinc-200/80 flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-lg bg-white border border-zinc-200 text-zinc-800 flex items-center justify-center shrink-0 shadow-2xs">
                <Smartphone className="w-4 h-4 text-zinc-900" />
              </div>
              <div>
                <div className="text-xs font-bold text-zinc-900">Mobile &amp; Cross-Platform</div>
                <div className="text-[10px] font-mono text-zinc-500">Expo Native &bull; Responsive PWA</div>
              </div>
            </div>
          </div>
        </div>

        {/* CONNECTOR 1 -> 2 */}
        <div className="flex flex-col items-center justify-center py-0.5">
          <div className="h-3 w-[1.5px] bg-zinc-300" />
          <span className="px-3 py-0.5 rounded-full text-[10px] font-mono font-medium bg-white text-zinc-600 border border-zinc-200 shadow-2xs">
            TLS 1.3 / HTTPS
          </span>
          <div className="h-3 w-[1.5px] bg-zinc-300" />
        </div>

        {/* TIER 2: EDGE GATEWAY & SECURITY */}
        <div
          onMouseEnter={() => setActiveTier(2)}
          onMouseLeave={() => setActiveTier(null)}
          className={`p-5 rounded-2xl bg-white border transition-all duration-200 ${
            activeTier === 2
              ? "border-zinc-900 shadow-md ring-1 ring-zinc-900/10"
              : "border-zinc-200 shadow-xs hover:border-zinc-400"
          }`}
        >
          <div className="flex items-center justify-between text-[11px] font-mono mb-3">
            <span className="font-bold text-zinc-900 uppercase tracking-wider">
              TIER 02 // EDGE &amp; SECURITY GATEWAY
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] bg-zinc-100 text-zinc-600 border border-zinc-200">
              ZERO-TRUST PROXY
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-zinc-50/70 border border-zinc-200/80 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white border border-zinc-200 text-zinc-800 flex items-center justify-center shrink-0 shadow-2xs">
                <ShieldCheck className="w-4 h-4 text-zinc-900" />
              </div>
              <div className="truncate">
                <div className="text-xs font-bold text-zinc-900 truncate">JWT Session Auth</div>
                <div className="text-[10px] font-mono text-zinc-500">HMAC-SHA256 Signed</div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-zinc-50/70 border border-zinc-200/80 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white border border-zinc-200 text-zinc-800 flex items-center justify-center shrink-0 shadow-2xs">
                <Zap className="w-4 h-4 text-zinc-900" />
              </div>
              <div className="truncate">
                <div className="text-xs font-bold text-zinc-900 truncate">Rate Limiting</div>
                <div className="text-[10px] font-mono text-zinc-500">Token Bucket Guard</div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-zinc-50/70 border border-zinc-200/80 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white border border-zinc-200 text-zinc-800 flex items-center justify-center shrink-0 shadow-2xs">
                <Lock className="w-4 h-4 text-zinc-900" />
              </div>
              <div className="truncate">
                <div className="text-xs font-bold text-zinc-900 truncate">Zod Validation</div>
                <div className="text-[10px] font-mono text-zinc-500">Strict Schema Boundary</div>
              </div>
            </div>
          </div>
        </div>

        {/* CONNECTOR 2 -> 3 */}
        <div className="flex flex-col items-center justify-center py-0.5">
          <div className="h-3 w-[1.5px] bg-zinc-300" />
          <span className="px-3 py-0.5 rounded-full text-[10px] font-mono font-medium bg-white text-zinc-600 border border-zinc-200 shadow-2xs">
            INTERNAL DISPATCH BUS
          </span>
          <div className="h-3 w-[1.5px] bg-zinc-300" />
        </div>

        {/* TIER 3: MODULAR SERVICES & CORE LOGIC */}
        <div
          onMouseEnter={() => setActiveTier(3)}
          onMouseLeave={() => setActiveTier(null)}
          className={`p-5 rounded-2xl bg-white border transition-all duration-200 ${
            activeTier === 3
              ? "border-zinc-900 shadow-md ring-1 ring-zinc-900/10"
              : "border-zinc-200 shadow-xs hover:border-zinc-400"
          }`}
        >
          <div className="flex items-center justify-between text-[11px] font-mono mb-3">
            <span className="font-bold text-zinc-900 uppercase tracking-wider">
              TIER 03 // MODULAR SERVICES LAYER
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] bg-zinc-100 text-zinc-600 border border-zinc-200">
              DECOUPLED LOGIC
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-zinc-50/70 border border-zinc-200/80 space-y-1">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-zinc-900" />
                <span className="text-xs font-bold text-zinc-900 truncate">{comp1}</span>
              </div>
              <div className="text-[10px] font-mono text-zinc-500">State machine &amp; concurrency</div>
            </div>

            <div className="p-3.5 rounded-xl bg-zinc-50/70 border border-zinc-200/80 space-y-1">
              <div className="flex items-center gap-2">
                <Server className="w-4 h-4 text-zinc-900" />
                <span className="text-xs font-bold text-zinc-900 truncate">{comp2}</span>
              </div>
              <div className="text-[10px] font-mono text-zinc-500">Idempotency &amp; ledger rules</div>
            </div>

            <div className="p-3.5 rounded-xl bg-zinc-50/70 border border-zinc-200/80 space-y-1">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-zinc-900" />
                <span className="text-xs font-bold text-zinc-900 truncate">{comp3}</span>
              </div>
              <div className="text-[10px] font-mono text-zinc-500">Async tasks &amp; webhooks</div>
            </div>
          </div>
        </div>

        {/* CONNECTOR 3 -> 4 */}
        <div className="flex flex-col items-center justify-center py-0.5">
          <div className="h-3 w-[1.5px] bg-zinc-300" />
          <span className="px-3 py-0.5 rounded-full text-[10px] font-mono font-medium bg-white text-zinc-600 border border-zinc-200 shadow-2xs">
            SQL POOL &amp; CACHE BUS
          </span>
          <div className="h-3 w-[1.5px] bg-zinc-300" />
        </div>

        {/* TIER 4: PERSISTENCE & CACHE */}
        <div
          onMouseEnter={() => setActiveTier(4)}
          onMouseLeave={() => setActiveTier(null)}
          className={`p-5 rounded-2xl bg-white border transition-all duration-200 ${
            activeTier === 4
              ? "border-zinc-900 shadow-md ring-1 ring-zinc-900/10"
              : "border-zinc-200 shadow-xs hover:border-zinc-400"
          }`}
        >
          <div className="flex items-center justify-between text-[11px] font-mono mb-3">
            <span className="font-bold text-zinc-900 uppercase tracking-wider">
              TIER 04 // DATA &amp; PERSISTENCE
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] bg-zinc-100 text-zinc-600 border border-zinc-200">
              ACID GUARANTEED
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-zinc-50/70 border border-zinc-200/80 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white border border-zinc-200 text-zinc-800 flex items-center justify-center shrink-0 shadow-2xs">
                  <Database className="w-4 h-4 text-zinc-900" />
                </div>
                <div>
                  <div className="text-xs font-bold text-zinc-900">PostgreSQL 16 Engine</div>
                  <div className="text-[10px] font-mono text-zinc-500">Prisma ORM &bull; Connection Pool</div>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-white border border-zinc-200 text-zinc-700">
                TCP 5432
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-zinc-50/70 border border-zinc-200/80 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white border border-zinc-200 text-zinc-800 flex items-center justify-center shrink-0 shadow-2xs">
                  <Zap className="w-4 h-4 text-zinc-900" />
                </div>
                <div>
                  <div className="text-xs font-bold text-zinc-900">In-Memory Cache / Redis</div>
                  <div className="text-[10px] font-mono text-zinc-500">Sub-millisecond Session State</div>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-white border border-zinc-200 text-zinc-700">
                &lt; 2ms
              </span>
            </div>
          </div>
        </div>

        {/* TIER 5: EXTERNAL RAILS PILL (Horizontal strip) */}
        <div className="p-4 rounded-2xl bg-zinc-50/80 border border-zinc-200 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-zinc-600 shadow-2xs">
          <div className="flex items-center gap-2.5">
            <Cloud className="w-4 h-4 text-zinc-800 shrink-0" />
            <span className="font-bold text-zinc-900">EXTERNAL RAILS:</span>
            <span>Stripe / ABA KHQR Webhooks &bull; AWS S3 Media CDN &bull; Resend Email Daemon</span>
          </div>
          <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>PIPELINE OPERATIONAL</span>
          </div>
        </div>
      </div>
    </div>
  );
}
