"use client";

import { useMemo } from "react";
import { Project } from "@/data/projects";
import { SectionHeader } from "@/components/case-study/SectionHeader";
import {
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
  accent: string;
}

export function ProductExperienceFlow({ project, accent }: ProductExperienceFlowProps) {
  const steps = useMemo(() => {
    const slug = (project.slug || project.id).toLowerCase();

    if (slug.includes("service")) {
      return [
        { stage: "01", actor: "Customer", action: "Chooses a service", desc: "Selects verified home repair, cleaning, or electrical services with upfront hourly rates.", icon: Search },
        { stage: "02", actor: "Booking engine", action: "Creates booking", desc: "Specifies date, property location, and job requirements; places a reservation hold.", icon: CalendarCheck },
        { stage: "03", actor: "Company portal", action: "Receives request", desc: "Contractor dashboard receives a live notification with customer details and budget.", icon: Building2 },
        { stage: "04", actor: "Dispatch system", action: "Assigns staff", desc: "Optimal field technician is assigned and routed using geolocation matching.", icon: Truck },
        { stage: "05", actor: "Fulfillment", action: "Settles payment", desc: "Job completed, customer verifies work, and payment settles via the escrow ledger.", icon: CheckCircle2 },
      ];
    }

    if (slug.includes("safe") || slug.includes("deal") || slug.includes("escrow")) {
      return [
        { stage: "01", actor: "Buyer & seller", action: "Agree on terms", desc: "Parties define trade scope, milestone deliverables, and inspection duration.", icon: FileCheck },
        { stage: "02", actor: "Escrow ledger", action: "Locks funds", desc: "Buyer deposits payment into an escrow ledger with a cryptographic hold.", icon: Lock },
        { stage: "03", actor: "Seller", action: "Delivers asset", desc: "Seller uploads verified deliverables, source files, or a physical shipment.", icon: Truck },
        { stage: "04", actor: "Buyer inspection", action: "Reviews in 48h", desc: "Buyer tests deliverables within an automated countdown window.", icon: AlertCircle },
        { stage: "05", actor: "Settlement", action: "Releases payout", desc: "Funds auto-release to the seller balance with a full double-spend audit.", icon: CheckCircle2 },
      ];
    }

    if (slug.includes("stay") || slug.includes("pilot") || slug.includes("hotel")) {
      return [
        { stage: "01", actor: "Guest", action: "Selects room & dates", desc: "Searches availability, views amenities, and receives transparent rate totals.", icon: Search },
        { stage: "02", actor: "Reservation", action: "Locks inventory", desc: "Database locks room allocation (SELECT FOR UPDATE) to prevent overbooking.", icon: Lock },
        { stage: "03", actor: "Payment engine", action: "Creates folio", desc: "Charge verified, billing ledger created, and confirmation dispatched.", icon: CreditCard },
        { stage: "04", actor: "Front desk", action: "Check-in", desc: "Room moves to occupied status; housekeeping queue is scheduled.", icon: Building2 },
        { stage: "05", actor: "Checkout", action: "Settles folio", desc: "Incidentals billed, room released for cleaning, invoice generated.", icon: CheckCircle2 },
      ];
    }

    if (slug.includes("menu") || slug.includes("tok") || slug.includes("restaurant") || slug.includes("qr")) {
      return [
        { stage: "01", actor: "Diner", action: "Scans table QR", desc: "Opens the menu directly in the mobile browser, no app install.", icon: QrCode },
        { stage: "02", actor: "Customer", action: "Customizes order", desc: "Selects dishes, modifier options, dietary notes, and a live running total.", icon: UtensilsCrossed },
        { stage: "03", actor: "Order router", action: "Sends to kitchen", desc: "WebSocket pushes the order ticket instantly to the kitchen display.", icon: Activity },
        { stage: "04", actor: "Kitchen staff", action: "Prepares meal", desc: "Kitchen marks items preparing; the diner sees live progress at the table.", icon: Building2 },
        { stage: "05", actor: "Settlement", action: "Closes the bill", desc: "Customer pays by KHQR or cash; table automatically resets for the next guest.", icon: CheckCircle2 },
      ];
    }

    if (slug.includes("cv") || slug.includes("resume")) {
      return [
        { stage: "01", actor: "Candidate", action: "Imports career data", desc: "Uploads an existing resume or connects a profile for automatic parsing.", icon: FileText },
        { stage: "02", actor: "Parser", action: "Structures sections", desc: "Extracts experience, education, metrics, and skills into a normalized schema.", icon: Cpu },
        { stage: "03", actor: "ATS analyzer", action: "Scores against jobs", desc: "Evaluates keyword density, formatting compliance, and impact verbs.", icon: Sparkles },
        { stage: "04", actor: "Editor", action: "Customizes layout", desc: "Selects typography, color themes, and reorders timeline sections.", icon: Layers },
        { stage: "05", actor: "Export", action: "Produces PDF", desc: "Compiles a clean, machine-readable vector PDF ready for job submission.", icon: CheckCircle2 },
      ];
    }

    if (slug.includes("estate") || slug.includes("real")) {
      return [
        { stage: "01", actor: "Buyer / renter", action: "Searches the map", desc: "Filters properties by price, square footage, neighborhood, and bedrooms.", icon: MapPin },
        { stage: "02", actor: "Property viewer", action: "Reviews specs", desc: "Browses photography, floor plans, and localized property tax estimates.", icon: Search },
        { stage: "03", actor: "Inquiry system", action: "Schedules a tour", desc: "Picks an appointment slot synced with the listing broker's calendar.", icon: CalendarCheck },
        { stage: "04", actor: "Broker portal", action: "Reviews the lead", desc: "Agent receives pre-approval verification and the confirmed viewing window.", icon: Building2 },
        { stage: "05", actor: "Closing desk", action: "Submits the offer", desc: "Digital paperwork initiated with a secure audit trail for both parties.", icon: CheckCircle2 },
      ];
    }

    if (slug.includes("trading") || slug.includes("journex") || slug.includes("healer") || slug.includes("tune")) {
      return [
        { stage: "01", actor: "Data feed", action: "Ingests live data", desc: "Continuous telemetry stream captured with millisecond timestamps.", icon: Activity },
        { stage: "02", actor: "Vector engine", action: "Calculates indicators", desc: "Rolling-window algorithms compute metrics and flag anomaly patterns.", icon: TrendingUp },
        { stage: "03", actor: "Risk matrix", action: "Checks thresholds", desc: "Safety checks evaluate drawdown thresholds and trigger warnings.", icon: AlertCircle },
        { stage: "04", actor: "Execution bus", action: "Routes alerts", desc: "Alerts dispatched across WebSocket channels to active operators.", icon: Cpu },
        { stage: "05", actor: "Audit ledger", action: "Commits journal", desc: "State recorded to persistent storage with a full historical post-mortem.", icon: CheckCircle2 },
      ];
    }

    const stepsFromDiagram = project.architecture.diagramSteps || [];
    if (stepsFromDiagram.length >= 4) {
      return stepsFromDiagram.slice(0, 5).map((step, i) => ({
        stage: `0${i + 1}`,
        actor: `Phase ${i + 1}`,
        action: step.split(".")[0] || `Execution step ${i + 1}`,
        desc: step,
        icon: [Search, Lock, Building2, Truck, CheckCircle2][i % 5],
      }));
    }

    return [
      { stage: "01", actor: "Client", action: "Makes the request", desc: project.problem?.split(".")[0] || "User selects the desired tier and parameters through the interface.", icon: Search },
      { stage: "02", actor: "Validation", action: "Checks the schema", desc: "The edge gateway confirms identity, limits concurrency, and asserts schema integrity.", icon: Lock },
      { stage: "03", actor: "Domain logic", action: "Runs the transaction", desc: project.solution?.split(".")[0] || "Domain controllers lock resources to prevent double execution.", icon: Building2 },
      { stage: "04", actor: "Async pipeline", action: "Dispatches jobs", desc: "Background workers trigger webhooks, notifications, and analytics.", icon: Truck },
      { stage: "05", actor: "Settlement", action: "Finalizes state", desc: "State machine completes with a formal audit record.", icon: CheckCircle2 },
    ];
  }, [project]);

  const Icon0 = steps[0]?.icon;
  const actors = Array.from(new Set(steps.map((s) => s.actor)));

  return (
    <div className="space-y-12">
      <SectionHeader
        index="02"
        title={`How ${project.title} runs, step by step`}
        description={`Five stages, from first user action to settled state. Actors: ${actors.slice(0, 3).join(", ")}${actors.length > 3 ? ", and more" : ""}.`}
        accent={accent}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-0">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isFirst = idx === 0;
          return (
            <div
              key={step.stage}
              className={`relative font-mono ${isFirst ? "lg:pl-0" : "lg:pl-8"}`}
            >
              <div
                aria-hidden
                className={`hidden lg:block absolute top-0 border-t border-white/10 ${
                  isFirst ? "left-7 right-0" : "left-0 right-0 w-full"
                }`}
              />
              <span
                aria-hidden
                className="hidden lg:block absolute -top-[3.5px] left-7 w-[6px] h-[6px] rounded-full bg-[#090a0f] border border-white/25"
              />

              <div className="pt-8 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-zinc-500 tabular-nums">{step.stage}</span>
                  <span className="h-px w-4 bg-white/20" aria-hidden />
                  <Icon className="w-4 h-4 text-zinc-500" stroke-width="1.5" />
                </div>

                <div className="space-y-1.5 pr-6">
                  <p className="font-mono text-[11px] text-zinc-500">{step.actor}</p>
                  <h3 className="text-base font-medium text-white not-prose">{step.action}</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed pr-1 lg:pr-8">{step.desc}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="pt-8 border-t border-white/[0.06] font-mono text-zinc-600 flex flex-wrap items-center gap-4">
        <span className="text-xs tabular-nums">{steps.length} stages</span>
        <span className="h-4 w-px bg-white/10" aria-hidden />
        <span className="text-xs flex items-center gap-2">
          <Icon0 className="w-3.5 h-3.5" stroke-width="1.5" />
          {steps[0]?.actor} → {steps[steps.length - 1]?.actor}
        </span>
      </div>
    </div>
  );
}
