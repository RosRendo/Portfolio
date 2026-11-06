"use client";

import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { DatabaseEntity } from "@/data/projects";
import { sound } from "@/lib/sound";
import {
  TableProperties,
  Link as LinkIcon,
  Maximize2,
  Zap,
} from "lucide-react";

interface VisualDatabaseCanvasProps {
  entities: DatabaseEntity[];
  accentColor?: string;
  onSelectEntity?: (name: string) => void;
  selectedEntity?: string | null;
  onZoomClick?: () => void;
}

interface ConnectionLine {
  id: string;
  from: string;
  to: string;
  type: "1:1" | "1:N" | "N:M";
  description: string;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

export function VisualDatabaseCanvas({
  entities,
  accentColor = "#06b6d4",
  onSelectEntity,
  selectedEntity,
  onZoomClick,
}: VisualDatabaseCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const [hoveredEntity, setHoveredEntity] = useState<string | null>(null);
  const [hoveredConnection, setHoveredConnection] = useState<string | null>(null);
  const [connections, setConnections] = useState<ConnectionLine[]>([]);

  const activeFocus = selectedEntity || hoveredEntity;

  // Distribute entities into 4 clean topological stages
  const columns = useMemo(() => {
    const col0: DatabaseEntity[] = [];
    const col1: DatabaseEntity[] = [];
    const col2: DatabaseEntity[] = [];
    const col3: DatabaseEntity[] = [];

    entities.forEach((entity) => {
      const lower = entity.name.toLowerCase();
      if (
        lower.includes("user") ||
        lower.includes("hotel") ||
        lower.includes("restaurant") ||
        lower.includes("workspace") ||
        lower.includes("account")
      ) {
        col0.push(entity);
      } else if (
        lower.includes("company") ||
        lower.includes("listing") ||
        lower.includes("roomtype") ||
        lower.includes("property") ||
        lower.includes("menu") ||
        lower.includes("blueprint") ||
        lower.includes("strategy") ||
        lower.includes("vehicle")
      ) {
        col1.push(entity);
      } else if (
        lower.includes("booking") ||
        lower.includes("order") ||
        lower.includes("reservation") ||
        lower.includes("trade") ||
        lower.includes("cv") ||
        lower.includes("task") ||
        lower.includes("schema") ||
        lower.includes("scan")
      ) {
        col2.push(entity);
      } else {
        col3.push(entity);
      }
    });

    const result: DatabaseEntity[][] = [[], [], [], []];
    let colIdx = 0;
    entities.forEach((e) => {
      if (col0.includes(e)) result[0].push(e);
      else if (col1.includes(e)) result[1].push(e);
      else if (col2.includes(e)) result[2].push(e);
      else if (col3.includes(e)) result[3].push(e);
      else {
        result[colIdx % 4].push(e);
        colIdx++;
      }
    });

    return result.filter((col) => col.length > 0);
  }, [entities]);

  // Recalculate dynamic SVG connecting curves
  const updateConnections = useCallback(() => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const newConns: ConnectionLine[] = [];

    entities.forEach((fromEntity) => {
      const fromEl = cardRefs.current.get(fromEntity.name);
      if (!fromEl) return;
      const fromRect = fromEl.getBoundingClientRect();

      (fromEntity.relations || []).forEach((rel, rIdx) => {
        const toEl = cardRefs.current.get(rel.to);
        if (!toEl) return;
        const toRect = toEl.getBoundingClientRect();

        // Check if to is to the right or left of from
        const isTargetRight = toRect.left >= fromRect.right - 20;

        let startX: number;
        let startY: number;
        let endX: number;
        let endY: number;

        if (isTargetRight) {
          startX = fromRect.right - containerRect.left;
          startY = fromRect.top + fromRect.height / 2 - containerRect.top;
          endX = toRect.left - containerRect.left;
          endY = toRect.top + toRect.height / 2 - containerRect.top;
        } else {
          startX = fromRect.left - containerRect.left;
          startY = fromRect.top + fromRect.height / 2 - containerRect.top;
          endX = toRect.right - containerRect.left;
          endY = toRect.top + toRect.height / 2 - containerRect.top;
        }

        newConns.push({
          id: `${fromEntity.name}-${rel.to}-${rIdx}`,
          from: fromEntity.name,
          to: rel.to,
          type: rel.type,
          description: rel.description || `${fromEntity.name} ${rel.type} ${rel.to}`,
          startX,
          startY,
          endX,
          endY,
        });
      });
    });

    setConnections(newConns);
  }, [entities]);

  // Initial and resize updates
  useEffect(() => {
    const timer = setTimeout(updateConnections, 120);
    window.addEventListener("resize", updateConnections);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateConnections);
    };
  }, [updateConnections]);

  const isEntityConnected = (name: string) => {
    if (!activeFocus) return true;
    if (activeFocus === name) return true;
    return connections.some(
      (c) =>
        (c.from === activeFocus && c.to === name) ||
        (c.to === activeFocus && c.from === name)
    );
  };

  const isConnectionActive = (conn: ConnectionLine) => {
    if (!activeFocus && !hoveredConnection) return false;
    if (hoveredConnection === conn.id) return true;
    if (activeFocus === conn.from || activeFocus === conn.to) return true;
    return false;
  };

  return (
    <div className="relative w-full rounded-3xl border border-zinc-200 bg-[#FCFCFD] p-5 sm:p-7 shadow-[0_20px_60px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.05)] overflow-hidden text-zinc-900 select-none">
      {/* Subtle Minimal Architectural Dot Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#d4d4d8_1px,transparent_1px)] bg-[size:20px_20px] opacity-45 pointer-events-none" />

      {/* Top Header Bar */}
      <div className="relative z-20 flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-zinc-200">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white border border-zinc-200 text-zinc-900 flex items-center justify-center shadow-xs">
            <LinkIcon className="w-4 h-4 text-zinc-900" />
          </div>
          <div>
            <h4 className="text-sm sm:text-base font-bold text-zinc-950 tracking-tight flex items-center gap-2">
              <span>Visual Relational Data Schema &amp; ERD</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
            </h4>
            <p className="text-xs text-zinc-500 font-mono">
              Hover tables or connection wires to trace Foreign Key paths
            </p>
          </div>
        </div>

        {/* Quick Actions & Legend */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-3 text-xs font-mono text-zinc-600">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-zinc-950" />
              <span className="font-semibold text-zinc-800">PK</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-zinc-400" />
              <span className="font-semibold text-zinc-700">FK</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3.5 h-[1.5px] bg-zinc-400" />
              <span className="font-semibold text-zinc-700">1:N</span>
            </span>
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
              <span>FULLSCREEN ERD</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Visual Node Mesh Canvas */}
      <div ref={containerRef} className="relative min-h-[360px] w-full">
        {/* SVG Bezier Curves Overlay */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible">
          {connections.map((conn) => {
            const active = isConnectionActive(conn);
            const dx = Math.abs(conn.endX - conn.startX) * 0.5;
            const pathData = `M ${conn.startX} ${conn.startY} C ${conn.startX + dx} ${conn.startY}, ${
              conn.endX - dx
            } ${conn.endY}, ${conn.endX} ${conn.endY}`;

            const midX = (conn.startX + conn.endX) / 2;
            const midY = (conn.startY + conn.endY) / 2;

            return (
              <g key={conn.id} className="transition-opacity duration-300">
                {/* Wider Hit Target */}
                <path
                  d={pathData}
                  fill="none"
                  stroke="transparent"
                  strokeWidth="24"
                  className="pointer-events-auto cursor-pointer"
                  onMouseEnter={() => {
                    sound.playHover();
                    setHoveredConnection(conn.id);
                  }}
                  onMouseLeave={() => setHoveredConnection(null)}
                />

                {/* Base Connection Curve */}
                <path
                  d={pathData}
                  fill="none"
                  stroke={active ? "#18181b" : "#cbd5e1"}
                  strokeWidth={active ? "2.5" : "1.5"}
                  strokeDasharray={conn.type === "1:1" ? "none" : "5 4"}
                  className="transition-all duration-200"
                />

                {/* Active Traveling Pulse */}
                {active && (
                  <circle r="4" fill="#18181b">
                    <animateMotion
                      path={pathData}
                      dur="2s"
                      repeatCount="indefinite"
                      keyPoints="0;1"
                      keyTimes="0;1"
                    />
                  </circle>
                )}

                {/* Start Terminal Pin */}
                <circle
                  cx={conn.startX}
                  cy={conn.startY}
                  r={active ? "4.5" : "3"}
                  fill={active ? "#18181b" : "#94a3b8"}
                  className="transition-all duration-200"
                />

                {/* End Terminal Pin */}
                <circle
                  cx={conn.endX}
                  cy={conn.endY}
                  r={active ? "4.5" : "3"}
                  fill={active ? "#18181b" : "#94a3b8"}
                  className="transition-all duration-200"
                />

                {/* Relationship Cardinality Badge on wire */}
                <g
                  transform={`translate(${midX}, ${midY})`}
                  className="pointer-events-auto cursor-pointer"
                  onMouseEnter={() => setHoveredConnection(conn.id)}
                  onMouseLeave={() => setHoveredConnection(null)}
                >
                  <rect
                    x="-17"
                    y="-8.5"
                    width="34"
                    height="17"
                    rx="5"
                    fill={active ? "#18181b" : "#ffffff"}
                    stroke={active ? "#18181b" : "#cbd5e1"}
                    strokeWidth="1.2"
                  />
                  <text
                    x="0"
                    y="3"
                    textAnchor="middle"
                    fill={active ? "#ffffff" : "#475569"}
                    fontSize="9"
                    fontFamily="monospace"
                    fontWeight="bold"
                  >
                    {conn.type}
                  </text>
                </g>
              </g>
            );
          })}
        </svg>

        {/* Minimalist White Table Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 relative z-20">
          {columns.map((col, colIdx) => (
            <div key={colIdx} className="space-y-4 flex flex-col justify-start">
              {col.map((entity) => {
                const isHovered = hoveredEntity === entity.name;
                const isSelected = selectedEntity === entity.name;
                const connected = isEntityConnected(entity.name);
                const isFocused = isHovered || isSelected;

                // Pick primary key and key foreign keys
                const pk = entity.fields.find((f) => f.isPrimary);
                const fks = entity.fields.filter((f) => f.isForeign).slice(0, 2);

                return (
                  <div
                    key={entity.name}
                    ref={(el) => {
                      if (el) cardRefs.current.set(entity.name, el);
                      else cardRefs.current.delete(entity.name);
                    }}
                    onMouseEnter={() => {
                      sound.playHover();
                      setHoveredEntity(entity.name);
                    }}
                    onMouseLeave={() => setHoveredEntity(null)}
                    onClick={() => {
                      sound.playTab();
                      onSelectEntity?.(isSelected ? "" : entity.name);
                    }}
                    className={`relative rounded-2xl border transition-all duration-200 cursor-pointer overflow-hidden p-4 ${
                      isFocused
                        ? "bg-white border-zinc-900 shadow-md ring-1 ring-zinc-900/10 -translate-y-1"
                        : connected
                        ? "bg-white hover:bg-zinc-50/70 border-zinc-200 shadow-xs hover:border-zinc-400"
                        : "bg-white/60 border-zinc-100 opacity-40 hover:opacity-80"
                    }`}
                  >
                    {/* Table Title Row */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <TableProperties className="w-4 h-4 text-zinc-900" />
                        <span className="font-mono font-bold text-sm text-zinc-950">
                          {entity.name}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-zinc-100 text-zinc-600 font-semibold border border-zinc-200">
                        {entity.tableName}
                      </span>
                    </div>

                    {/* Compact Primary & Foreign Keys Only */}
                    <div className="space-y-1.5 font-mono text-xs">
                      {pk && (
                        <div className="flex items-center justify-between py-1 px-2 rounded bg-zinc-100 border border-zinc-200/80 text-zinc-900">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[9px] font-black px-1 rounded bg-zinc-900 text-white">
                              PK
                            </span>
                            <span className="font-semibold text-zinc-950">{pk.name}</span>
                          </div>
                          <span className="text-[10px] text-zinc-500">{pk.type}</span>
                        </div>
                      )}

                      {fks.map((fk, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between py-1 px-2 rounded bg-zinc-50 border border-zinc-200/70 text-zinc-700"
                        >
                          <div className="flex items-center gap-1.5">
                            <span className="text-[9px] font-black px-1 rounded bg-zinc-200 text-zinc-800">
                              FK
                            </span>
                            <span className="font-medium text-zinc-900">{fk.name}</span>
                          </div>
                          <span className="text-[10px] text-zinc-500">{fk.type}</span>
                        </div>
                      ))}
                    </div>

                    {/* Relations Tag on Bottom */}
                    {entity.relations && entity.relations.length > 0 && (
                      <div className="mt-3 pt-2.5 border-t border-zinc-100 flex flex-wrap gap-1 items-center text-[10px] font-mono">
                        {entity.relations.map((rel, rIdx) => (
                          <span
                            key={rIdx}
                            className={`px-2 py-0.5 rounded text-[10px] font-semibold border transition-colors ${
                              isFocused || hoveredEntity === rel.to
                                ? "bg-zinc-900 text-white border-zinc-900"
                                : "bg-zinc-100 text-zinc-600 border-zinc-200"
                            }`}
                          >
                            {rel.type} &rarr; {rel.to}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Telemetry Banner on Hover */}
      <div className="mt-5 pt-3.5 border-t border-zinc-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono text-zinc-600">
        <div className="flex items-center gap-2">
          <Zap className="w-3.5 h-3.5 text-zinc-900 shrink-0" />
          <span>
            {hoveredConnection ? (
              <span className="text-zinc-950 font-semibold">
                FOREIGN KEY: {connections.find((c) => c.id === hoveredConnection)?.from} &mdash;&gt;{" "}
                {connections.find((c) => c.id === hoveredConnection)?.to} ({connections.find((c) => c.id === hoveredConnection)?.type}) &bull;{" "}
                {connections.find((c) => c.id === hoveredConnection)?.description}
              </span>
            ) : activeFocus ? (
              <span>
                FOCUSED: <strong className="text-zinc-950">{activeFocus}</strong> &mdash; Tracing isolated relation channels
              </span>
            ) : (
              <span>Hover any table or wire to isolate Foreign Key connections</span>
            )}
          </span>
        </div>
        <span className="text-zinc-500 hidden sm:inline">
          {connections.length} LIVE RELATIONAL CONSTRAINTS
        </span>
      </div>
    </div>
  );
}
