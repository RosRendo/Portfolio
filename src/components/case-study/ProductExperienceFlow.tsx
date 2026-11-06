"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Project } from "@/data/projects";
import { sound } from "@/lib/sound";
import {
  User,
  Search,
  CalendarCheck,
  Building2,
  Truck,
  CheckCircle2,
  Lock,
  CreditCard,
  FileCheck,
  Activity,
  AlertCircle,
  QrCode,
  UtensilsCrossed,
  FileText,
  MapPin,
  TrendingUp,
  Cpu,
  Layers,
  Sparkles,
} from "lucide-react";

interface ProductExperienceFlowProps {
  project: Project;
}

export function ProductExperienceFlow({ project }: ProductExperienceFlowProps) {
  const [activeStep, setActiveStep] = useState<number>(0);

  // Dynamic workflow resolver tailored to each project's unique domain
  const steps = useMemo(() => {
    const slug = (project.slug || project.id).toLowerCase();

    if (slug.includes("service")) {
      return [
        {
          stage: "01",
          actor: "Customer",
          action: "Chooses a service",
          desc: "Selects verified home repair, cleaning, or electrical services with upfront hourly rates.",
          icon: Search,
        },
        {
          stage: "02",
          actor: "Booking Engine",
          action: "Creates booking",
          desc: "Specifies date, property location, and specific job requirements; places reservation hold.",
          icon: CalendarCheck,
        },
        {
          stage: "03",
          actor: "Company Portal",
          action: "Receives request",
          desc: "Contracting business dashboard receives live notification with customer details and budget.",
          icon: Building2,
        },
        {
          stage: "04",
          actor: "Dispatch System",
          action: "Staff dispatched",
          desc: "Optimal field technician is assigned and routed using real-time geolocation matching.",
          icon: Truck,
        },
        {
          stage: "05",
          actor: "Fulfillment",
          action: "Service completed",
          desc: "Job completed, customer verifies work, and payment settles atomically via escrow ledger.",
          icon: CheckCircle2,
        },
      ];
    }

    if (slug.includes("safe") || slug.includes("deal") || slug.includes("escrow")) {
      return [
        {
          stage: "01",
          actor: "Buyer & Seller",
          action: "Agrees on Terms",
          desc: "Parties define trade scope, milestone deliverables, and inspection duration.",
          icon: FileCheck,
        },
        {
          stage: "02",
          actor: "Escrow Ledger",
          action: "Funds Locked",
          desc: "Buyer deposits payment into immutable escrow smart-ledger with cryptographic hold.",
          icon: Lock,
        },
        {
          stage: "03",
          actor: "Seller",
          action: "Delivers Asset",
          desc: "Seller uploads verified credentials, source files, or tracks physical shipment.",
          icon: Truck,
        },
        {
          stage: "04",
          actor: "Buyer Inspection",
          action: "48h Review Window",
          desc: "Buyer tests deliverables within automated countdown with dispute arbitration safety.",
          icon: AlertCircle,
        },
        {
          stage: "05",
          actor: "Settlement",
          action: "Payout Released",
          desc: "Funds auto-release to seller balance with complete zero double-spend ledger audit.",
          icon: CheckCircle2,
        },
      ];
    }

    if (slug.includes("stay") || slug.includes("pilot") || slug.includes("hotel")) {
      return [
        {
          stage: "01",
          actor: "Guest",
          action: "Selects Room & Dates",
          desc: "Searches room availability, views amenities, and receives transparent rate totals.",
          icon: Search,
        },
        {
          stage: "02",
          actor: "Pessimistic Lock",
          action: "Inventory Reserved",
          desc: "Database locks room allocation (SELECT FOR UPDATE) to eliminate overbooking risks.",
          icon: Lock,
        },
        {
          stage: "03",
          actor: "Payment Engine",
          action: "Folio Created",
          desc: "Stripe/KHQR charge verified, billing ledger created, and confirmation dispatched.",
          icon: CreditCard,
        },
        {
          stage: "04",
          actor: "Front Desk",
          action: "Digital Check-In",
          desc: "Room moved to occupied status; housekeeping queue automatically scheduled.",
          icon: Building2,
        },
        {
          stage: "05",
          actor: "Checkout",
          action: "Folio Settled",
          desc: "Incidentals billed, room released for cleaning, and customer invoice generated.",
          icon: CheckCircle2,
        },
      ];
    }

    if (slug.includes("menu") || slug.includes("tok") || slug.includes("restaurant") || slug.includes("qr")) {
      return [
        {
          stage: "01",
          actor: "Diner",
          action: "Scans Table QR",
          desc: "Opens instant contactless menu directly on mobile browser without app installation.",
          icon: QrCode,
        },
        {
          stage: "02",
          actor: "Customer",
          action: "Customizes Items",
          desc: "Selects dishes, adds modifier options, dietary notes, and views live total bill.",
          icon: UtensilsCrossed,
        },
        {
          stage: "03",
          actor: "Order Router",
          action: "Submits to Kitchen",
          desc: "WebSocket connection pushes order ticket instantly to Kitchen Display System (KDS).",
          icon: Activity,
        },
        {
          stage: "04",
          actor: "Kitchen Staff",
          action: "Prepares Meal",
          desc: "Kitchen marks items preparing; diner receives live progress updates at table.",
          icon: Building2,
        },
        {
          stage: "05",
          actor: "Settlement",
          action: "Bill Paid & Closed",
          desc: "Customer pays via ABA KHQR or cash; table status automatically resets for next guest.",
          icon: CheckCircle2,
        },
      ];
    }

    if (slug.includes("cv") || slug.includes("resume")) {
      return [
        {
          stage: "01",
          actor: "Candidate",
          action: "Imports Career Data",
          desc: "Uploads existing resume or connects LinkedIn profile for automatic parsing.",
          icon: FileText,
        },
        {
          stage: "02",
          actor: "AI Parser",
          action: "Structures Sections",
          desc: "Extracts experience, education, key metrics, and skills into normalized schema.",
          icon: Cpu,
        },
        {
          stage: "03",
          actor: "ATS Analyzer",
          action: "Scores Against Jobs",
          desc: "Evaluates keyword density, formatting compliance, and impact verbs.",
          icon: Sparkles,
        },
        {
          stage: "04",
          actor: "Editor Engine",
          action: "Customizes Layout",
          desc: "Selects typographic styling, color themes, and reorders timeline sections.",
          icon: Layers,
        },
        {
          stage: "05",
          actor: "Export",
          action: "Pixel-Perfect PDF",
          desc: "Compiles clean, machine-readable PDF vector export ready for job submission.",
          icon: CheckCircle2,
        },
      ];
    }

    if (slug.includes("estate") || slug.includes("real")) {
      return [
        {
          stage: "01",
          actor: "Buyer / Renter",
          action: "Searches Geospatial Map",
          desc: "Filters properties by price, square footage, neighborhood, and bedroom count.",
          icon: MapPin,
        },
        {
          stage: "02",
          actor: "Property Viewer",
          action: "Virtual Tour & Specs",
          desc: "Browses high-res photography, floor plans, and localized property tax estimates.",
          icon: Search,
        },
        {
          stage: "03",
          actor: "Inquiry System",
          action: "Schedules Private Tour",
          desc: "Picks appointment slot synchronized directly with listing broker calendar.",
          icon: CalendarCheck,
        },
        {
          stage: "04",
          actor: "Broker Portal",
          action: "Reviews Lead",
          desc: "Licensed agent receives buyer pre-approval verification and confirmed window.",
          icon: Building2,
        },
        {
          stage: "05",
          actor: "Closing Desk",
          action: "Offer Submitted",
          desc: "Digital paperwork initiated with secure audit trail for buyer and seller.",
          icon: CheckCircle2,
        },
      ];
    }

    if (slug.includes("trading") || slug.includes("journex") || slug.includes("healer") || slug.includes("tune")) {
      return [
        {
          stage: "01",
          actor: "Market / Patient",
          action: "Live Data Ingestion",
          desc: "Continuous telemetry stream captured with sub-millisecond timestamps.",
          icon: Activity,
        },
        {
          stage: "02",
          actor: "Vector Engine",
          action: "Indicator Calculation",
          desc: "Rolling-window algorithms calculate metrics and identify anomaly patterns.",
          icon: TrendingUp,
        },
        {
          stage: "03",
          actor: "Risk Matrix",
          action: "Threshold Guard",
          desc: "Real-time safety checks evaluate drawdown thresholds and vital warnings.",
          icon: AlertCircle,
        },
        {
          stage: "04",
          actor: "Execution Bus",
          action: "Routes Notification",
          desc: "Instant alert dispatched across WebSocket channels to active operators.",
          icon: Cpu,
        },
        {
          stage: "05",
          actor: "Audit Ledger",
          action: "Journal Committed",
          desc: "State recorded to persistent storage with complete historical post-mortem.",
          icon: CheckCircle2,
        },
      ];
    }

    // Default dynamic workflow from project diagramSteps or keyFeatures
    const stepsFromDiagram = project.architecture.diagramSteps || [];
    if (stepsFromDiagram.length >= 4) {
      return stepsFromDiagram.slice(0, 5).map((step, i) => ({
        stage: `0${i + 1}`,
        actor: `Phase 0${i + 1}`,
        action: step.split(".")[0] || `Execution Step ${i + 1}`,
        desc: step,
        icon: [Search, Lock, Building2, Truck, CheckCircle2][i % 5],
      }));
    }

    return [
      {
        stage: "01",
        actor: "Client Ingress",
        action: "Initiates Request",
        desc: project.problem?.split(".")[0] || "User selects desired tier and parameters through the web interface.",
        icon: User,
      },
      {
        stage: "02",
        actor: "Validation Guard",
        action: "Validates Schema",
        desc: "Edge gateway confirms identity, limits concurrency, and asserts schema integrity.",
        icon: Search,
      },
      {
        stage: "03",
        actor: "Domain Logic",
        action: "Executes Transaction",
        desc: project.solution?.split(".")[0] || "Domain controllers lock resources in database with zero double-execution risk.",
        icon: Building2,
      },
      {
        stage: "04",
        actor: "Async Pipeline",
        action: "Dispatches Jobs",
        desc: "Background workers trigger webhooks, push notifications, and analytics pipelines.",
        icon: Truck,
      },
      {
        stage: "05",
        actor: "Settlement",
        action: "Execution Finalized",
        desc: "State machine completes with sub-50ms latency and formal audit record.",
        icon: CheckCircle2,
      },
    ];
  }, [project]);

  return (
    <div className="w-full space-y-12">
      {/* Editorial Section Header */}
      <div className="space-y-4">
        <span className="text-xs font-mono tracking-widest text-zinc-500 uppercase">
          02 — PRODUCT EXPERIENCE
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white max-w-2xl">
          The {project.title} Core Lifecycle
        </h2>
        <p className="text-sm sm:text-base text-zinc-400 font-light max-w-xl">
          How requests and data move through the system from initial user ingress to finalized settlement.
        </p>
      </div>

      {/* Progressive Flow Pipeline */}
      <div className="relative">
        {/* Subtle Horizontal Guide Line (Desktop) */}
        <div className="hidden lg:block absolute top-[52px] left-[5%] right-[5%] h-[1px] bg-white/10 z-0" />

        {/* Dynamic Progress Line */}
        <div
          className="hidden lg:block absolute top-[52px] left-[5%] h-[1px] bg-white z-0 transition-all duration-700 ease-out"
          style={{ width: `${(activeStep / (steps.length - 1)) * 90}%` }}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-4 relative z-10">
          {steps.map((step, idx) => {
            const isCurrent = activeStep === idx;
            const isPassed = activeStep >= idx;
            const Icon = step.icon;

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
                className={`group cursor-pointer space-y-5 transition-all duration-300 ${
                  isCurrent
                    ? "opacity-100 -translate-y-1"
                    : isPassed
                    ? "opacity-85 hover:opacity-100"
                    : "opacity-40 hover:opacity-75"
                }`}
              >
                {/* Step Indicator Node */}
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-300 ${
                      isCurrent
                        ? "bg-white text-black border-white shadow-[0_0_25px_rgba(255,255,255,0.3)]"
                        : isPassed
                        ? "bg-zinc-900 text-white border-white/40"
                        : "bg-black text-zinc-600 border-white/10 group-hover:border-white/30"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono font-bold text-zinc-500 lg:hidden">
                    STEP {step.stage}
                  </span>
                </div>

                {/* Step Metadata & Description */}
                <div className="space-y-1.5 pr-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono tracking-wider text-zinc-500 uppercase">
                      {step.actor}
                    </span>
                  </div>

                  <h3
                    className={`text-base font-bold tracking-tight transition-colors ${
                      isCurrent ? "text-white" : "text-zinc-300"
                    }`}
                  >
                    {step.action}
                  </h3>

                  <p className="text-xs text-zinc-400 font-light leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Step Minimal Spotlight Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1.5 max-w-xl">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>ACTIVE WORKFLOW STAGE // {steps[activeStep]?.stage || "01"}</span>
          </div>
          <h4 className="text-lg sm:text-xl font-bold text-white">
            {steps[activeStep]?.actor} &rarr; {steps[activeStep]?.action}
          </h4>
          <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
            {steps[activeStep]?.desc}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => {
              sound.playTab();
              setActiveStep((prev) => (prev > 0 ? prev - 1 : steps.length - 1));
            }}
            className="px-4 py-2 rounded-lg text-xs font-mono text-zinc-400 hover:text-white border border-white/10 hover:border-white/30 transition-colors"
          >
            PREV
          </button>
          <button
            type="button"
            onClick={() => {
              sound.playTab();
              setActiveStep((prev) => (prev + 1) % steps.length);
            }}
            className="px-4 py-2 rounded-lg text-xs font-mono bg-white text-black font-semibold hover:bg-zinc-200 transition-colors"
          >
            NEXT STAGE
          </button>
        </div>
      </div>
    </div>
  );
}
