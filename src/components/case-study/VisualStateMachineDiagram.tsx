"use client";

import { useState } from "react";
import { Project } from "@/data/projects";
import { sound } from "@/lib/sound";
import {
  CheckCircle2,
  Clock,
  ShieldAlert,
  ArrowRight,
  Maximize2,
  Lock,
  RefreshCw,
  GitCommit,
} from "lucide-react";

interface VisualStateMachineDiagramProps {
  project: Project;
  onZoomClick?: () => void;
}

export function VisualStateMachineDiagram({
  project,
  onZoomClick,
}: VisualStateMachineDiagramProps) {
  const [activeStep, setActiveStep] = useState<number>(0);

  // Derive steps based on project domain
  const isEscrow = project.id?.includes("escrow") || project.title.toLowerCase().includes("escrow");
  const isStay = project.id?.includes("stay") || project.title.toLowerCase().includes("pilot");
  const isQr = project.id?.includes("restaurant") || project.title.toLowerCase().includes("qr");

  const steps = isEscrow
    ? [
        {
          state: "ESCROW_CREATED",
          badge: "Step 01",
          title: "Deal Terms Signed",
          desc: "Buyer & seller agree on milestones, amount, and arbitration terms.",
          guard: "Pessimistic Row Lock",
        },
        {
          state: "FUNDS_LOCKED",
          badge: "Step 02",
          title: "Idempotent Deposit",
          desc: "ABA KHQR webhook verifies cryptographic HMAC signature.",
          guard: "Ledger Immutable",
        },
        {
          state: "MILESTONE_ACTIVE",
          badge: "Step 03",
          title: "Work In Progress",
          desc: "Seller delivers verifiable evidence for milestone validation.",
          guard: "Dual-Key Check",
        },
        {
          state: "SETTLED_RELEASED",
          badge: "Step 04",
          title: "Atomic Payout",
          desc: "Multi-tenant ledger releases funds with sub-second settlement.",
          guard: "Zero Double-Spend",
        },
      ]
    : isStay
    ? [
        {
          state: "BOOKING_REQUEST",
          badge: "Step 01",
          title: "Room Selection",
          desc: "Guest picks date range; inventory availability checked in memory.",
          guard: "Inventory Hold",
        },
        {
          state: "FOLIO_LOCKED",
          badge: "Step 02",
          title: "Overbooking Shield",
          desc: "Pessimistic row lock prevents conflicting reservations.",
          guard: "Conflict Filter",
        },
        {
          state: "PAYMENT_CLEARED",
          badge: "Step 03",
          title: "Folio Created",
          desc: "Stripe/Card charge verified and guest profile tokenized.",
          guard: "ACID Guaranteed",
        },
        {
          state: "CHECKED_IN",
          badge: "Step 04",
          title: "Digital Key Issued",
          desc: "Room status moves to Occupied; housekeeper notified upon checkout.",
          guard: "Live Webhook",
        },
      ]
    : [
        {
          state: "REQUEST_INITIATED",
          badge: "Step 01",
          title: "Job Ingress",
          desc: "Client submits job requirements, location coordinates, and budget.",
          guard: "Zod Schema Valid",
        },
        {
          state: "DISPATCH_MATCHED",
          badge: "Step 02",
          title: "Provider Locking",
          desc: "Proximity geospatial index matches verified service providers.",
          guard: "Distributed Lock",
        },
        {
          state: "SERVICE_IN_PROGRESS",
          badge: "Step 03",
          title: "Realtime Tracking",
          desc: "Live status updates streamed via WebSocket connection.",
          guard: "Session Sealed",
        },
        {
          state: "COMPLETED_SETTLED",
          badge: "Step 04",
          title: "Review & Release",
          desc: "Job marked verified; escrow payment disbursed to provider balance.",
          guard: "Atomic Release",
        },
      ];

  return (
    <div className="relative w-full rounded-3xl border border-zinc-200 bg-[#FCFCFD] p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.05)] overflow-hidden select-none text-zinc-900">
      {/* Subtle Minimal Architectural Dot Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#d4d4d8_1px,transparent_1px)] bg-[size:20px_20px] opacity-45 pointer-events-none" />

      {/* Header Bar */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pb-5 mb-6 border-b border-zinc-200">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white border border-zinc-200 text-zinc-900 flex items-center justify-center shadow-xs">
            <GitCommit className="w-4 h-4 text-zinc-900" />
          </div>
          <div>
            <h4 className="text-sm sm:text-base font-bold text-zinc-950 tracking-tight flex items-center gap-2">
              <span>Deterministic State Transition Machine</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
            </h4>
            <p className="text-xs text-zinc-500 font-mono">
              Non-blocking lifecycle with zero race condition vulnerabilities
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
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-semibold text-zinc-700 bg-white border border-zinc-200 hover:border-zinc-900 hover:text-zinc-950 transition-all shadow-xs"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>EXPAND</span>
          </button>
        )}
      </div>

      {/* Visual State Progression Flow */}
      <div className="relative z-10 space-y-3">
        {steps.map((step, idx) => {
          const isActive = activeStep === idx;
          return (
            <div
              key={idx}
              onMouseEnter={() => {
                sound.playHover();
                setActiveStep(idx);
              }}
              onClick={() => {
                sound.playTab();
                setActiveStep(idx);
              }}
              className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer ${
                isActive
                  ? "bg-white border-zinc-900 shadow-md ring-1 ring-zinc-900/10 -translate-y-0.5"
                  : "bg-white/80 border-zinc-200 hover:border-zinc-400 shadow-xs"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <span
                    className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-mono font-bold shrink-0 border ${
                      isActive
                        ? "bg-zinc-900 text-white border-zinc-900"
                        : "bg-zinc-100 text-zinc-600 border-zinc-200"
                    }`}
                  >
                    0{idx + 1}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-zinc-950">{step.title}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-100 text-zinc-600 font-semibold border border-zinc-200">
                        {step.state}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-500 font-normal mt-0.5">{step.desc}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-medium bg-zinc-50 text-zinc-700 border border-zinc-200">
                    <Lock className="w-3 h-3 text-zinc-700" />
                    <span>{step.guard}</span>
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Assurance Banner */}
      <div className="mt-5 pt-3.5 border-t border-zinc-200 flex items-center justify-between text-xs font-mono text-zinc-600">
        <span className="flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>Formally verified transitions &bull; Rollback on unhandled exception</span>
        </span>
        <span className="text-zinc-500 hidden sm:inline">100% IDEMPOTENT</span>
      </div>
    </div>
  );
}

