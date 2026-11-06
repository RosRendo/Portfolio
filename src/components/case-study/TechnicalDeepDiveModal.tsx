"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Project, DatabaseEntity } from "@/data/projects";
import { sound } from "@/lib/sound";
import { VisualDatabaseCanvas } from "./VisualDatabaseCanvas";
import { VisualArchitectureDiagram } from "./VisualArchitectureDiagram";
import { getProjectTechnicalSpec } from "@/data/projectDetailsDatabase";
import {
  X,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Copy,
  Check,
  Maximize2,
  Minimize2,
  Database,
  Layers,
  KeyRound,
  Link as LinkIcon,
  Code2,
  TableProperties,
  ShieldCheck,
  Cpu,
} from "lucide-react";

interface TechnicalDeepDiveModalProps {
  project: Project;
  initialTab?: "architecture" | "database";
  isOpen: boolean;
  onClose: () => void;
}

export function TechnicalDeepDiveModal({
  project,
  initialTab = "database",
  isOpen,
  onClose,
}: TechnicalDeepDiveModalProps) {
  const [activeTab, setActiveTab] = useState<"architecture" | "database" | "schema">(initialTab);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [selectedEntity, setSelectedEntity] = useState<string | null>(null);
  const modalContainerRef = useRef<HTMLDivElement>(null);

  // Manage body scroll lock
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Keyboard shortcut listener
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        sound.playClose();
        onClose();
      } else if (e.key === "+" || e.key === "=") {
        setZoomLevel((prev) => Math.min(prev + 0.15, 2.2));
      } else if (e.key === "-") {
        setZoomLevel((prev) => Math.max(prev - 0.15, 0.6));
      } else if (e.key === "0") {
        setZoomLevel(1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const spec = getProjectTechnicalSpec(project.id || project.slug);
  const db = project.database || spec?.database;
  const entities = db?.entities || [];

  const handleCopySchema = () => {
    const raw = db?.rawSchema;
    if (!raw) return;
    navigator.clipboard.writeText(raw);
    sound.playTab();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleFullscreen = () => {
    if (!modalContainerRef.current) return;
    if (!document.fullscreenElement) {
      modalContainerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-2xl">
        {/* Backdrop click to close */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            sound.playClose();
            onClose();
          }}
          className="absolute inset-0"
        />

        {/* Modal Window Container */}
        <motion.div
          ref={modalContainerRef}
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ type: "spring", damping: 28, stiffness: 300 }}
          className="relative z-10 w-full max-w-7xl h-[92vh] flex flex-col rounded-2xl sm:rounded-3xl border border-white/15 bg-[#090b14] shadow-[0_25px_100px_rgba(0,0,0,0.95)] overflow-hidden text-white"
        >
          {/* Header Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 px-5 py-4 border-b border-white/10 bg-[#0c0e1a]/90 backdrop-blur-xl shrink-0">
            {/* Title & Badge */}
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center border"
                style={{
                  backgroundColor: `${project.accentColor}18`,
                  borderColor: `${project.accentColor}40`,
                  color: project.accentColor,
                }}
              >
                {activeTab === "architecture" ? (
                  <Layers className="w-4 h-4" />
                ) : (
                  <Database className="w-4 h-4" />
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-sm sm:text-base font-bold text-white uppercase tracking-tight">
                    {project.title} &mdash; Technical Deep-Dive
                  </h2>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-white/10 text-cyan-300 border border-white/10">
                    INTERACTIVE INSPECTOR
                  </span>
                </div>
                <p className="text-xs text-zinc-400 font-mono">
                  {db?.engine || "PostgreSQL 16 via Prisma ORM"} • {db?.tablesCount || "Multi"} Core Relational Entities
                </p>
              </div>
            </div>

            {/* View Switcher Tabs */}
            <div className="flex items-center p-1 rounded-xl bg-white/[0.05] border border-white/10">
              <button
                type="button"
                onClick={() => {
                  sound.playTab();
                  setActiveTab("architecture");
                }}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                  activeTab === "architecture"
                    ? "bg-white text-zinc-950 border border-white shadow-xs font-bold"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <Layers className={`w-3.5 h-3.5 ${activeTab === "architecture" ? "text-zinc-950" : "text-zinc-400"}`} />
                <span>SYSTEM TOPOLOGY</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  sound.playTab();
                  setActiveTab("database");
                }}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                  activeTab === "database"
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 shadow-sm"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <TableProperties className="w-3.5 h-3.5" />
                <span>DATABASE ERD</span>
              </button>

              {db?.rawSchema && (
                <button
                  type="button"
                  onClick={() => {
                    sound.playTab();
                    setActiveTab("schema");
                  }}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                    activeTab === "schema"
                      ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 shadow-sm"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>SCHEMA CODE</span>
                </button>
              )}
            </div>

            {/* Action Tools: Zoom in, Zoom out, Reset, Fullscreen, Close */}
            <div className="flex items-center gap-2">
              {/* Zoom Controls */}
              <div className="hidden sm:flex items-center rounded-lg bg-white/[0.04] border border-white/10 p-1">
                <button
                  type="button"
                  onClick={() => setZoomLevel((prev) => Math.max(prev - 0.15, 0.6))}
                  title="Zoom Out (-)"
                  className="p-1.5 text-zinc-400 hover:text-white hover:bg-white/10 rounded transition-colors"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="text-[11px] font-mono text-zinc-300 px-2 min-w-[44px] text-center">
                  {Math.round(zoomLevel * 100)}%
                </span>
                <button
                  type="button"
                  onClick={() => setZoomLevel((prev) => Math.min(prev + 0.15, 2.2))}
                  title="Zoom In (+)"
                  className="p-1.5 text-zinc-400 hover:text-white hover:bg-white/10 rounded transition-colors"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setZoomLevel(1)}
                  title="Reset Zoom (0)"
                  className="p-1.5 text-zinc-400 hover:text-white hover:bg-white/10 rounded transition-colors ml-1 border-l border-white/10"
                >
                  <RotateCcw className="w-3 h-3" />
                </button>
              </div>

              {/* Fullscreen Button */}
              <button
                type="button"
                onClick={toggleFullscreen}
                className="hidden md:flex p-2 rounded-lg bg-white/[0.04] border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => {
                  sound.playClose();
                  onClose();
                }}
                className="p-2 rounded-lg bg-white/[0.06] border border-white/15 text-zinc-300 hover:text-white hover:bg-white/20 transition-all hover:scale-105 active:scale-95"
                title="Close (Esc)"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Modal Main Content Workspace */}
          <div className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8 bg-[#07080f] relative select-text">
            {/* Subtle background grid */}
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff05_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />

            {/* TAB 1: SYSTEM ARCHITECTURE TOPOLOGY */}
            {activeTab === "architecture" && (
              <div
                style={{
                  transform: `scale(${zoomLevel})`,
                  transformOrigin: "top center",
                  transition: "transform 0.15s ease-out",
                }}
                className="max-w-5xl mx-auto space-y-6"
              >
                <VisualArchitectureDiagram project={project} />
              </div>
            )}

            {/* TAB 2: DATABASE ERD (ENTITY RELATIONSHIP DIAGRAM) */}
            {activeTab === "database" && (
              <div
                style={{
                  transform: `scale(${zoomLevel})`,
                  transformOrigin: "top center",
                  transition: "transform 0.15s ease-out",
                }}
                className="max-w-6xl mx-auto space-y-8"
              >
                {/* ERD Header */}
                <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-widest">
                      RELATIONAL DATA MODEL & ERD
                    </span>
                    <h3 className="text-lg font-bold text-white mt-1">
                      {db?.overview || "Normalized Entity Relationship Schema with Strict Constraints"}
                    </h3>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-mono text-zinc-400 shrink-0">
                    <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300">
                      {entities.length} Models Displayed
                    </span>
                    <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300">
                      PostgreSQL Engine
                    </span>
                  </div>
                </div>

                {/* 1. Interactive Visual Database Mesh with Dynamic SVG Bezier Connecting Wires */}
                <VisualDatabaseCanvas
                  entities={entities}
                  accentColor={project.accentColor}
                  selectedEntity={selectedEntity}
                  onSelectEntity={setSelectedEntity}
                />

                {/* Section Separator */}
                <div className="flex items-center justify-between pt-4 border-t border-white/[0.08]">
                  <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">
                    DETAILED TABLE SPECIFICATIONS & INDEX SCHEMAS
                  </span>
                  <span className="text-xs font-mono text-zinc-500">
                    CLICK ANY TABLE TO FOCUS & INSPECT
                  </span>
                </div>

                {/* 2. Detailed Entity Schema Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {entities.map((entity, i) => {
                    const isSelected = selectedEntity === entity.name;
                    return (
                      <div
                        key={i}
                        onClick={() => setSelectedEntity(isSelected ? null : entity.name)}
                        className={`rounded-2xl border transition-all duration-300 overflow-hidden cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? "bg-[#111424] border-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.25)] ring-1 ring-cyan-400"
                            : "bg-[#0b0e18] border-white/10 hover:border-white/25 hover:bg-[#0e1220]"
                        }`}
                      >
                        {/* Table Header */}
                        <div className="p-4 border-b border-white/10 bg-white/[0.02] flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <TableProperties className="w-4 h-4 text-cyan-400" />
                            <span className="font-mono font-bold text-white text-sm">
                              {entity.name}
                            </span>
                          </div>
                          <span className="text-[10px] font-mono text-zinc-400 uppercase px-2 py-0.5 rounded bg-white/5">
                            {entity.tableName}
                          </span>
                        </div>

                        {/* Description */}
                        <div className="px-4 py-2 text-xs text-zinc-400 border-b border-white/5 bg-white/[0.01] line-clamp-1">
                          {entity.description}
                        </div>

                        {/* Fields List */}
                        <div className="p-4 space-y-2 flex-1">
                          {entity.fields.map((f, idx) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between text-xs font-mono py-1 border-b border-white/[0.04] last:border-none"
                            >
                              <div className="flex items-center gap-2">
                                {f.isPrimary && (
                                  <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                                    PK
                                  </span>
                                )}
                                {f.isForeign && (
                                  <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                                    FK
                                  </span>
                                )}
                                <span className={f.isPrimary ? "text-amber-200 font-semibold" : "text-zinc-200"}>
                                  {f.name}
                                </span>
                              </div>
                              <span className="text-zinc-400 text-[11px] font-light">
                                {f.type}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Relations & Indexes Footer */}
                        <div className="p-3 bg-black/40 border-t border-white/10 text-[11px] font-mono space-y-1.5">
                          {entity.relations && entity.relations.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 items-center">
                              <span className="text-zinc-400 text-[10px]">REL:</span>
                              {entity.relations.map((rel, rIdx) => (
                                <span
                                  key={rIdx}
                                  className="px-2 py-0.5 rounded text-[10px] bg-cyan-500/10 text-cyan-300 border border-cyan-500/20"
                                >
                                  {rel.type} &rarr; {rel.to}
                                </span>
                              ))}
                            </div>
                          )}

                          {entity.indexes && entity.indexes.length > 0 && (
                            <div className="flex items-center gap-1.5 text-zinc-400 text-[10px]">
                              <KeyRound className="w-3 h-3 text-zinc-400" />
                              <span>{entity.indexes.join(", ")}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB 3: RAW SCHEMA CODE VIEWER */}
            {activeTab === "schema" && db?.rawSchema && (
              <div className="max-w-4xl mx-auto space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-3">
                    <Code2 className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs font-mono text-zinc-300">
                      schema.prisma &mdash; Production Data Model Definitions
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopySchema}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 hover:bg-cyan-500/30 transition-colors text-xs font-mono"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>COPIED TO CLIPBOARD</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>COPY PRISMA SCHEMA</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Formatted Code Block */}
                <div className="p-6 rounded-2xl bg-[#05060b] border border-white/10 font-mono text-xs text-zinc-300 leading-relaxed overflow-x-auto shadow-2xl max-h-[65vh]">
                  <pre className="text-zinc-300 selection:bg-cyan-500/30">
                    {db.rawSchema}
                  </pre>
                </div>
              </div>
            )}
          </div>

          {/* Footer Bar */}
          <div className="px-6 py-3 border-t border-white/10 bg-[#090b14] flex items-center justify-between text-xs font-mono text-zinc-400 shrink-0">
            <div className="flex items-center gap-4">
              <span>CONTROLS: DRAG TO PAN • SCROLL / [+][-] TO ZOOM • [ESC] TO CLOSE</span>
            </div>
            <span className="hidden sm:inline text-zinc-400">
              {project.title} • ROS RENDO SYSTEM SPEC
            </span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
