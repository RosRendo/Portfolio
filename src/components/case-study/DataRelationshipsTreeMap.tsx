"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Project } from "@/data/projects";
import { getProjectTechnicalSpec } from "@/data/projectDetailsDatabase";
import { sound } from "@/lib/sound";
import {
  Users,
  Building,
  UserCheck,
  Calendar,
  Wrench,
  CreditCard,
  UserPlus,
  Star,
  CornerDownRight,
  Database,
  Lock,
  Layers,
  FileText,
  KeyRound,
  Shield,
  UtensilsCrossed,
  Hotel,
  Briefcase,
  Home,
} from "lucide-react";

interface DataRelationshipsTreeMapProps {
  project: Project;
}

interface TreeNode {
  id: string;
  label: string;
  type: string;
  desc: string;
  parentId?: string;
  countBadge?: string;
  icon?: any;
}

export function DataRelationshipsTreeMap({ project }: DataRelationshipsTreeMapProps) {
  const spec = getProjectTechnicalSpec(project.id || project.slug);
  const entities = spec?.database.entities || project.database?.entities || [];

  // Tailored domain tree models per project slug
  const domainTrees = useMemo(() => {
    const slug = (project.slug || project.id).toLowerCase();

    if (slug.includes("safe") || slug.includes("deal") || slug.includes("escrow")) {
      return {
        root1: { id: "User", label: "User (Participant)", type: "Root Identity", desc: "Platform participant with merchant trust rating, verification tier, and digital wallet.", icon: Users },
        children1: [
          { id: "Merchant", label: "Merchant / Seller", rel: "1:N Listed Deals", count: "Seller Profile" },
          { id: "Buyer", label: "Buyer Account", rel: "1:N Escrow Holds", count: "Fund Depositor" },
        ],
        root2: { id: "Deal", label: "EscrowDeal (Core Contract)", type: "Core Aggregate", desc: "Central legal and financial contract defining milestone conditions, inspection timeout, and lock status.", icon: Lock },
        children2: [
          { id: "Milestone", label: "Milestone", rel: "1:N Deliverable Scope", count: "Tranche Schedule" },
          { id: "EscrowHold", label: "EscrowHold", rel: "1:1 Locked Capital", count: "Cryptographic Lock" },
          { id: "Dispute", label: "Dispute", rel: "1:1 Mediation Case", count: "Arbitration Desk" },
          { id: "AuditLog", label: "AuditLog", rel: "1:N Immutable Ledger", count: "Audit-Proof Ledger" },
        ],
      };
    }

    if (slug.includes("stay") || slug.includes("pilot") || slug.includes("hotel")) {
      return {
        root1: { id: "Hotel", label: "Hotel (Tenant)", type: "Multi-Tenant Root", desc: "Property organization with room inventory, tax settings, staff permissions, and currency rules.", icon: Hotel },
        children1: [
          { id: "RoomType", label: "RoomType", rel: "1:N Inventory Classes", count: "Deluxe, Suite, Standard" },
          { id: "Staff", label: "StaffMember", rel: "1:N Operations Roles", count: "Front Desk & Housekeeping" },
        ],
        root2: { id: "Reservation", label: "Reservation (Booking)", type: "Core Aggregate", desc: "Guest booking window with room allocation, check-in timestamps, and rate snapshots.", icon: Calendar },
        children2: [
          { id: "Folio", label: "Folio (Billing)", rel: "1:1 Financial Ledger", count: "Nightly Rates & Extras" },
          { id: "Payment", label: "Payment", rel: "1:N Transactions", count: "Stripe / Card Charge" },
          { id: "Guest", label: "GuestProfile", rel: "1:1 Identity", count: "Passport & Contact" },
          { id: "RoomStay", label: "RoomStay", rel: "1:1 Key & Status", count: "Occupied & Clean State" },
        ],
      };
    }

    if (slug.includes("menu") || slug.includes("tok") || slug.includes("restaurant") || slug.includes("qr")) {
      return {
        root1: { id: "Restaurant", label: "Restaurant (Tenant)", type: "Multi-Tenant Root", desc: "Food & beverage establishment with currency settings, opening hours, and kitchen display routes.", icon: UtensilsCrossed },
        children1: [
          { id: "MenuCategory", label: "Category", rel: "1:N Food Sections", count: "Appetizers, Mains, Drinks" },
          { id: "DiningTable", label: "DiningTable", rel: "1:N Floor Layout", count: "QR Table Anchors" },
        ],
        root2: { id: "Order", label: "Order (Ticket)", type: "Core Aggregate", desc: "Real-time kitchen order ticket connected to dining table, order status, and live total.", icon: Calendar },
        children2: [
          { id: "OrderItem", label: "OrderItem", rel: "1:N Dish Line Items", count: "Selected Dishes" },
          { id: "Modifier", label: "OrderModifier", rel: "1:N Customizations", count: "Spice, Extra Toppings" },
          { id: "Bill", label: "Bill (Settlement)", rel: "1:1 Payment Record", count: "KHQR / Cash Split" },
        ],
      };
    }

    if (slug.includes("cv") || slug.includes("resume")) {
      return {
        root1: { id: "User", label: "User (Candidate)", type: "Root Identity", desc: "Job seeker account with saved templates, job match preferences, and export history.", icon: Users },
        children1: [
          { id: "UserProfile", label: "Profile", rel: "1:1 Contact Info", count: "Phone, Email, LinkedIn" },
          { id: "JobTarget", label: "JobTarget", rel: "1:N Career Goals", count: "Target Roles & Skills" },
        ],
        root2: { id: "Resume", label: "Resume (Document Aggregate)", type: "Core Aggregate", desc: "Normalized resume document model generating live PDF preview and ATS score.", icon: FileText },
        children2: [
          { id: "Experience", label: "Experience", rel: "1:N Timeline Items", count: "Companies & Roles" },
          { id: "Education", label: "Education", rel: "1:N Degrees & Schools", count: "Academic History" },
          { id: "SkillSet", label: "SkillSet", rel: "1:N Categorized Tags", count: "Technical Competencies" },
          { id: "ATSReport", label: "ATSScoreReport", rel: "1:1 Match Analysis", count: "Keyword Match %" },
        ],
      };
    }

    if (slug.includes("estate") || slug.includes("real")) {
      return {
        root1: { id: "Agency", label: "Agency (Brokerage)", type: "Multi-Tenant Root", desc: "Real estate brokerage firm managing licensed agents, MLS sync, and regional offices.", icon: Home },
        children1: [
          { id: "Agent", label: "RealEstateAgent", rel: "1:N Team Members", count: "License & Listings" },
          { id: "Office", label: "OfficeBranch", rel: "1:N Physical Branches", count: "Territory Jurisdiction" },
        ],
        root2: { id: "Property", label: "PropertyListing", type: "Core Aggregate", desc: "Commercial or residential real estate asset with geospatial coordinates, pricing, and specs.", icon: Building },
        children2: [
          { id: "Amenity", label: "PropertyAmenity", rel: "1:N Feature Tags", count: "Pool, Parking, Balcony" },
          { id: "Tour", label: "TourBooking", rel: "1:N Showing Appointments", count: "Private Buyer Viewings" },
          { id: "Inquiry", label: "BuyerInquiry", rel: "1:N Lead Ingress", count: "Pre-Approval & Offers" },
        ],
      };
    }

    // Default: ServiceFinder / Standard Multi-Tenant Marketplace
    return {
      root1: { id: "User", label: "User (Identity Base)", type: "Root Identity", desc: "Base authentication model holding hashed credentials, session tokens, and global role privileges.", icon: Users },
      children1: [
        { id: "Customer", label: "Customer Profile", rel: "1:1 Role Profile", count: "1:N Bookings" },
        { id: "Company", label: "Company Tenant", rel: "1:1 Contractor Business", count: "1:N Staff & Dispatch" },
      ],
      root2: { id: "Booking", label: "Booking (Transaction Aggregate)", type: "Core Aggregate", desc: "Central transaction record connecting customer, schedule window, address, and status machine.", icon: Calendar },
      children2: [
        { id: "Service", label: "Service Catalog Item", rel: "1:N Trade Items", count: "Hourly / Fixed Rates" },
        { id: "Payment", label: "Payment Ledger", rel: "1:1 Escrow Ledger", count: "Cryptographic Receipt" },
        { id: "Assignment", label: "Staff Assignment", rel: "1:1 Field Route", count: "Technician Dispatch" },
        { id: "Review", label: "Customer Rating", rel: "1:1 Audit Feedback", count: "Post-Job Score" },
      ],
    };
  }, [project]);

  const [activeNode, setActiveNode] = useState<string>(domainTrees.root2.id);

  // Active node explanation details
  const activeDetail = useMemo(() => {
    // Check if matched in entities
    const matchedEntity = entities.find((e) => e.name.toLowerCase() === activeNode.toLowerCase());
    if (matchedEntity) {
      return {
        label: matchedEntity.name,
        tableName: matchedEntity.tableName,
        desc: matchedEntity.description,
        type: "Normalized Database Entity",
        fieldsCount: matchedEntity.fields.length,
        relationsCount: matchedEntity.relations?.length || 0,
      };
    }

    if (activeNode === domainTrees.root1.id) {
      return {
        label: domainTrees.root1.label,
        tableName: "users",
        desc: domainTrees.root1.desc,
        type: domainTrees.root1.type,
        fieldsCount: 10,
        relationsCount: 3,
      };
    }

    return {
      label: domainTrees.root2.label,
      tableName: "core_records",
      desc: domainTrees.root2.desc,
      type: domainTrees.root2.type,
      fieldsCount: 8,
      relationsCount: domainTrees.children2.length,
    };
  }, [activeNode, entities, domainTrees]);

  return (
    <div className="w-full space-y-12">
      {/* Editorial Section Header */}
      <div className="space-y-4 max-w-2xl">
        <span className="text-xs font-mono tracking-widest text-zinc-500 uppercase">
          05 — DATA RELATIONSHIPS
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
          {project.title} Entity Relationship Map
        </h2>
        <p className="text-sm sm:text-base text-zinc-400 font-light">
          A simplified relational graph communicating entity ownership, tenant isolation, and transactional cascade rules.
        </p>
      </div>

      {/* Interactive Relational Tree Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Visual Hierarchical Tree (7 cols) */}
        <div className="lg:col-span-7 p-6 sm:p-10 rounded-2xl bg-white/[0.02] border border-white/10 space-y-8 select-none">
          {/* Tree Branch 1: Identity / Tenant Base */}
          <div className="space-y-3">
            <div
              onClick={() => {
                sound.playTab();
                setActiveNode(domainTrees.root1.id);
              }}
              className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                activeNode === domainTrees.root1.id
                  ? "bg-white text-black border-white shadow-md font-bold"
                  : "bg-white/[0.04] text-white border-white/10 hover:border-white/30"
              }`}
            >
              <div className="flex items-center gap-3">
                <Users className="w-4 h-4" />
                <span className="font-mono text-sm">{domainTrees.root1.label}</span>
              </div>
              <span className="text-[10px] font-mono uppercase tracking-wider opacity-70">
                ROOT ANCHOR
              </span>
            </div>

            {/* Sub-branches for Root 1 */}
            <div className="pl-6 space-y-2 border-l border-white/15 ml-4">
              {domainTrees.children1.map((sub) => (
                <div
                  key={sub.id}
                  onClick={() => {
                    sound.playTab();
                    setActiveNode(sub.id);
                  }}
                  className={`p-2.5 rounded-lg border flex items-center justify-between cursor-pointer transition-all ${
                    activeNode === sub.id
                      ? "bg-white text-black border-white font-semibold"
                      : "bg-white/[0.02] text-zinc-300 border-white/10 hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center gap-2 text-xs font-mono">
                    <CornerDownRight className="w-3.5 h-3.5 opacity-60" />
                    <span>{sub.label}</span>
                  </div>
                  <span className="text-[10px] font-mono opacity-50">{sub.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tree Branch 2: Core Aggregate -> Children */}
          <div className="space-y-3 pt-2 border-t border-white/10">
            <div
              onClick={() => {
                sound.playTab();
                setActiveNode(domainTrees.root2.id);
              }}
              className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                activeNode === domainTrees.root2.id
                  ? "bg-white text-black border-white shadow-md font-bold"
                  : "bg-white/[0.04] text-white border-white/10 hover:border-white/30"
              }`}
            >
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4" />
                <span className="font-mono text-sm">{domainTrees.root2.label}</span>
              </div>
              <span className="text-[10px] font-mono uppercase tracking-wider opacity-70">
                TRANSACTION AGGREGATE
              </span>
            </div>

            {/* Child Entities */}
            <div className="pl-6 space-y-2 border-l border-white/15 ml-4">
              {domainTrees.children2.map((child) => (
                <div
                  key={child.id}
                  onClick={() => {
                    sound.playTab();
                    setActiveNode(child.id);
                  }}
                  className={`p-2.5 rounded-lg border flex items-center justify-between cursor-pointer transition-all ${
                    activeNode === child.id
                      ? "bg-white text-black border-white font-semibold"
                      : "bg-white/[0.02] text-zinc-300 border-white/10 hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center gap-2 text-xs font-mono">
                    <CornerDownRight className="w-3.5 h-3.5 opacity-60" />
                    <span>{child.label}</span>
                  </div>
                  <span className="text-[10px] font-mono opacity-50">{child.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Active Node Detail & Relational Invariants (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.03] border border-white/10 space-y-5">
            <div className="space-y-1">
              <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
                SELECTED ENTITY // {activeDetail.type}
              </span>
              <h3 className="text-2xl font-bold text-white tracking-tight">
                {activeDetail.label}
              </h3>
            </div>

            <p className="text-sm text-zinc-300 font-light leading-relaxed">
              {activeDetail.desc}
            </p>

            <div className="pt-4 border-t border-white/10 space-y-2 text-xs font-mono text-zinc-400">
              <div className="flex items-center justify-between">
                <span>CASCADE POLICY:</span>
                <span className="text-white">ON DELETE RESTRICT</span>
              </div>
              <div className="flex items-center justify-between">
                <span>CONCURRENCY LOCK:</span>
                <span className="text-emerald-400">Pessimistic Row Lock</span>
              </div>
              <div className="flex items-center justify-between">
                <span>INDEXING:</span>
                <span className="text-white">B-Tree on Foreign Keys</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 text-xs font-mono text-zinc-400 flex items-center gap-3">
            <Database className="w-4 h-4 text-white shrink-0" />
            <span>Click any node on the left to inspect relationship constraints.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
