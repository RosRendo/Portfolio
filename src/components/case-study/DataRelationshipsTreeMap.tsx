"use client";

import { useState, useMemo } from "react";
import { Project } from "@/data/projects";
import { getProjectTechnicalSpec } from "@/data/projectDetailsDatabase";
import { sound } from "@/lib/sound";
import { SectionHeader } from "@/components/case-study/SectionHeader";
import { CornerDownRight } from "lucide-react";

interface DataRelationshipsTreeMapProps {
  project: Project;
  accent: string;
}

interface RelationChild {
  id: string;
  label: string;
  rel: string;
  count: string;
}

interface DomainTree {
  root1: { id: string; label: string; type: string; desc: string };
  children1: RelationChild[];
  root2: { id: string; label: string; type: string; desc: string };
  children2: RelationChild[];
}

export function DataRelationshipsTreeMap({ project, accent }: DataRelationshipsTreeMapProps) {
  const spec = getProjectTechnicalSpec(project.id || project.slug);
  const entities = useMemo(
    () => spec?.database.entities || project.database?.entities || [],
    [spec, project]
  );

  const [domainTrees] = useState<DomainTree>(() => {
    const get = (p: Project): DomainTree => {
      const slug = (p.slug || p.id).toLowerCase();

      if (slug.includes("safe") || slug.includes("deal") || slug.includes("escrow")) {
        return {
          root1: { id: "User", label: "User (participant)", type: "Root identity", desc: "Platform participant with merchant trust rating, verification tier, and digital wallet." },
          children1: [
            { id: "Merchant", label: "Merchant / seller", rel: "1:N listed deals", count: "Seller profile" },
            { id: "Buyer", label: "Buyer account", rel: "1:N escrow holds", count: "Fund depositor" },
          ],
          root2: { id: "Deal", label: "EscrowDeal (contract)", type: "Core aggregate", desc: "Central contract defining milestone conditions, inspection timeout, and lock status." },
          children2: [
            { id: "Milestone", label: "Milestone", rel: "1:N deliverable scope", count: "Tranche schedule" },
            { id: "EscrowHold", label: "EscrowHold", rel: "1:1 locked capital", count: "Cryptographic lock" },
            { id: "Dispute", label: "Dispute", rel: "1:1 mediation case", count: "Arbitration desk" },
            { id: "AuditLog", label: "AuditLog", rel: "1:N immutable ledger", count: "Audit trail" },
          ],
        };
      }

      if (slug.includes("stay") || slug.includes("pilot") || slug.includes("hotel")) {
        return {
          root1: { id: "Hotel", label: "Hotel (tenant)", type: "Multi-tenant root", desc: "Property organization with room inventory, tax settings, staff permissions, and currency rules." },
          children1: [
            { id: "RoomType", label: "RoomType", rel: "1:N inventory classes", count: "Deluxe, suite, standard" },
            { id: "Staff", label: "StaffMember", rel: "1:N operations roles", count: "Front desk & housekeeping" },
          ],
          root2: { id: "Reservation", label: "Reservation (booking)", type: "Core aggregate", desc: "Guest booking window with room allocation, check-in timestamps, and rate snapshots." },
          children2: [
            { id: "Folio", label: "Folio (billing)", rel: "1:1 financial ledger", count: "Nightly rates & extras" },
            { id: "Payment", label: "Payment", rel: "1:N transactions", count: "Card charge" },
            { id: "Guest", label: "GuestProfile", rel: "1:1 identity", count: "Passport & contact" },
            { id: "RoomStay", label: "RoomStay", rel: "1:1 key & status", count: "Occupied & clean state" },
          ],
        };
      }

      if (slug.includes("menu") || slug.includes("tok") || slug.includes("restaurant") || slug.includes("qr")) {
        return {
          root1: { id: "Restaurant", label: "Restaurant (tenant)", type: "Multi-tenant root", desc: "Food & beverage organization with currency settings, opening hours, and kitchen display routes." },
          children1: [
            { id: "MenuCategory", label: "Category", rel: "1:N food sections", count: "Appetizers, mains, drinks" },
            { id: "DiningTable", label: "DiningTable", rel: "1:N floor layout", count: "QR table anchors" },
          ],
          root2: { id: "Order", label: "Order (ticket)", type: "Core aggregate", desc: "Real-time kitchen order ticket connected to dining table, order status, and live total." },
          children2: [
            { id: "OrderItem", label: "OrderItem", rel: "1:N dish line items", count: "Selected dishes" },
            { id: "Modifier", label: "OrderModifier", rel: "1:N customizations", count: "Spice, extra toppings" },
            { id: "Bill", label: "Bill (settlement)", rel: "1:1 payment record", count: "KHQR / cash split" },
          ],
        };
      }

      if (slug.includes("cv") || slug.includes("resume")) {
        return {
          root1: { id: "User", label: "User (candidate)", type: "Root identity", desc: "Job seeker account with saved templates, job match preferences, and export history." },
          children1: [
            { id: "UserProfile", label: "Profile", rel: "1:1 contact info", count: "Phone, email, profile" },
            { id: "JobTarget", label: "JobTarget", rel: "1:N career goals", count: "Target roles & skills" },
          ],
          root2: { id: "Resume", label: "Resume (document)", type: "Core aggregate", desc: "Normalized resume document model generating a live PDF preview and ATS score." },
          children2: [
            { id: "Experience", label: "Experience", rel: "1:N timeline items", count: "Companies & roles" },
            { id: "Education", label: "Education", rel: "1:N degrees & schools", count: "Academic history" },
            { id: "SkillSet", label: "SkillSet", rel: "1:N categorized tags", count: "Technical skills" },
            { id: "ATSReport", label: "ATSScoreReport", rel: "1:1 match analysis", count: "Keyword match %" },
          ],
        };
      }

      if (slug.includes("estate") || slug.includes("real")) {
        return {
          root1: { id: "Agency", label: "Agency (brokerage)", type: "Multi-tenant root", desc: "Brokerage firm managing licensed agents, MLS sync, and regional offices." },
          children1: [
            { id: "Agent", label: "Agent", rel: "1:N team members", count: "License & listings" },
            { id: "Office", label: "OfficeBranch", rel: "1:N physical branches", count: "Territory jurisdiction" },
          ],
          root2: { id: "Property", label: "PropertyListing", type: "Core aggregate", desc: "Commercial or residential asset with geospatial coordinates, pricing, and specs." },
          children2: [
            { id: "Amenity", label: "PropertyAmenity", rel: "1:N feature tags", count: "Pool, parking, balcony" },
            { id: "Tour", label: "TourBooking", rel: "1:N showing appointments", count: "Private viewings" },
            { id: "Inquiry", label: "BuyerInquiry", rel: "1:N lead ingress", count: "Pre-approval & offers" },
          ],
        };
      }

      return {
        root1: { id: "User", label: "User (identity)", type: "Root identity", desc: "Base authentication model holding hashed credentials, session tokens, and global role privileges." },
        children1: [
          { id: "Customer", label: "Customer profile", rel: "1:1 role profile", count: "1:N bookings" },
          { id: "Company", label: "Company tenant", rel: "1:1 contractor business", count: "1:N staff & dispatch" },
        ],
        root2: { id: "Booking", label: "Booking (transaction)", type: "Core aggregate", desc: "Central transaction record connecting customer, schedule window, address, and status machine." },
        children2: [
          { id: "Service", label: "Service", rel: "1:N trade items", count: "Hourly / fixed rates" },
          { id: "Payment", label: "Payment ledger", rel: "1:1 escrow ledger", count: "Receipt" },
          { id: "Assignment", label: "Staff assignment", rel: "1:1 field route", count: "Technician dispatch" },
          { id: "Review", label: "Customer rating", rel: "1:1 audit feedback", count: "Post-job score" },
        ],
      };
    };

    return get(project);
  });

  const [activeNode, setActiveNode] = useState<string>(domainTrees.root2.id);

  const activeDetail = useMemo(() => {
    const matchedEntity = entities.find((e) => e.name.toLowerCase() === activeNode.toLowerCase());

    if (matchedEntity) {
      return {
        label: matchedEntity.name,
        type: `${matchedEntity.tableName} / normalized entity`,
        desc: matchedEntity.description,
        rows: [
          { label: "Fields", value: String(matchedEntity.fields.length) },
          { label: "Relations", value: String(matchedEntity.relations?.length || 0) },
        ],
      };
    }

    if (activeNode === domainTrees.root1.id) {
      return {
        label: domainTrees.root1.label,
        type: domainTrees.root1.type,
        desc: domainTrees.root1.desc,
        rows: [{ label: "Relations", value: String(domainTrees.children1.length) }],
      };
    }

    return {
      label: domainTrees.root2.label,
      type: domainTrees.root2.type,
      desc: domainTrees.root2.desc,
      rows: [{ label: "Relations", value: String(domainTrees.children2.length) }],
    };
  }, [activeNode, entities, domainTrees]);

  const nodeClass = (active: boolean, inactive: string) =>
    active
      ? "bg-white/[0.07] border-white/40 text-white"
      : `border-white/[0.08] bg-white/[0.02] hover:border-white/25 transition-colors ${inactive}`;

  const select = (id: string) => {
    sound.playTab();
    setActiveNode(id);
  };

  return (
    <div className="space-y-12">
      <SectionHeader
        index="05"
        title={`${project.title} data model`}
        description="Simplified relational graph of entity ownership, tenant isolation, and transactional rules. Select a node to inspect it."
        accent={accent}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-7 rounded-xl border border-white/10 bg-white/[0.02] p-6 sm:p-8 space-y-6">
          <div className="space-y-2">
            <button
              type="button"
              onClick={() => select(domainTrees.root1.id)}
              className={`w-full text-left p-3 rounded-lg border font-mono text-sm flex items-center justify-between ${nodeClass(
                activeNode === domainTrees.root1.id,
                "text-zinc-200"
              )}`}
            >
              <span>{domainTrees.root1.label}</span>
              <span className="text-[10px] font-mono text-zinc-500">{domainTrees.root1.type}</span>
            </button>

            <ul className="pl-4 border-l border-white/10 ml-3 space-y-2">
              {domainTrees.children1.map((sub) => (
                <li key={sub.id}>
                  <button
                    type="button"
                    onClick={() => select(sub.id)}
                    className={`w-full text-left p-2 rounded-lg border text-xs font-mono flex items-center justify-between ${nodeClass(
                      activeNode === sub.id,
                      "text-zinc-400"
                    )}`}
                  >
                    <span className="flex items-center gap-1.5">
                      <CornerDownRight className="w-3 h-3 text-zinc-600" />
                      {sub.label}
                    </span>
                    <span className="text-[10px] text-zinc-500">{sub.count}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-2 pt-4 border-t border-white/[0.06]">
            <button
              type="button"
              onClick={() => select(domainTrees.root2.id)}
              className={`w-full text-left p-3 rounded-lg border font-mono text-sm flex items-center justify-between ${nodeClass(
                activeNode === domainTrees.root2.id,
                "text-zinc-200"
              )}`}
            >
              <span>{domainTrees.root2.label}</span>
              <span className="text-[10px] font-mono text-zinc-500">{domainTrees.root2.type}</span>
            </button>

            <ul className="pl-4 border-l border-white/10 ml-3 space-y-2">
              {domainTrees.children2.map((child) => (
                <li key={child.id}>
                  <button
                    type="button"
                    onClick={() => select(child.id)}
                    className={`w-full text-left p-2 rounded-lg border text-xs font-mono flex items-center justify-between ${nodeClass(
                      activeNode === child.id,
                      "text-zinc-400"
                    )}`}
                  >
                    <span className="flex items-center gap-1.5">
                      <CornerDownRight className="w-3 h-3 text-zinc-600" />
                      {child.label}
                    </span>
                    <span className="text-[10px] text-zinc-500">{child.count}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-4">
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 space-y-5">
            <div className="space-y-1">
              <p className="font-mono text-[11px] text-zinc-500">{activeDetail.type}</p>
              <h3 className="text-xl font-medium text-white tracking-tight">
                {activeDetail.label}
              </h3>
            </div>

            <p className="text-sm text-zinc-300 leading-relaxed">{activeDetail.desc}</p>

            <div className="pt-4 border-t border-white/[0.06] space-y-2 font-mono text-xs tabular-nums">
              {activeDetail.rows.map((v) => (
                <div key={v.label} className="flex items-center justify-between">
                  <span className="text-zinc-500">{v.label}</span>
                  <span className="text-zinc-300">{v.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
