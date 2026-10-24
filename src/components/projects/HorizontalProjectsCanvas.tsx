"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Project, projectsData } from "@/data/projects";
import { sound } from "@/lib/sound";
import {
  ArrowLeft,
  ArrowUpRight,
  ExternalLink,
  Sparkles,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Compass,
} from "lucide-react";
import { drawScrubbedDissolve } from "./PixelDissolveOverlay";

interface HorizontalProjectsCanvasProps {
  initialProjectSlug?: string;
  onBackTo3D?: () => void;
}

export function HorizontalProjectsCanvas({
  initialProjectSlug,
  onBackTo3D,
}: HorizontalProjectsCanvasProps) {
  const router = useRouter();
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  // Auto drift toggle
  const [autoDrift, setAutoDrift] = useState(true);

  // Window width for dynamic viewport calculations
  const [windowWidth, setWindowWidth] = useState(1400);

  // Horizontal motion state
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollPosRef = useRef(0);
  const targetPos = useRef(0);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startScroll = useRef(0);
  const velocity = useRef(0);
  const animFrameId = useRef<number | null>(null);
  const progressTextRef = useRef<HTMLSpanElement>(null);
  const lastPctRef = useRef(-1);

  // Canvas refs and progress trackers for 1:1 scrubbed pixel dissolve (0 React re-renders)
  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([]);
  const lastProgressRef = useRef<number[]>(new Array(projectsData.length).fill(-1));
  const soundPlayedRef = useRef<Set<number>>(new Set([0]));
  const [hasScrolled, setHasScrolled] = useState(false);
  const scrollDirectionRef = useRef<"forward" | "backward">("forward");

  // Window resize listener
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Sync mute state
  useEffect(() => {
    setIsMuted(sound.isMuted());
  }, []);

  const toggleSound = () => {
    const next = !isMuted;
    sound.setMuted(next);
    setIsMuted(next);
    if (!next) sound.playTab();
  };

  // Real-time clock updating every second
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Card Positions on horizontal circuit (spacious alternating luxury layout for all 13 projects)
  const cardLayouts = useMemo(
    () => [
      { x: 140, y: 16, tag: "HOME SERVICES", badgeColor: "#6366f1", accent: "#818cf8" },
      { x: 940, y: 52, tag: "GAMING ESCROW", badgeColor: "#10b981", accent: "#34d399" },
      { x: 1740, y: 18, tag: "HEALTHCARE CLINIC", badgeColor: "#06b6d4", accent: "#38bdf8" },
      { x: 2540, y: 50, tag: "QUANT TERMINAL", badgeColor: "#3b82f6", accent: "#60a5fa" },
      { x: 3340, y: 20, tag: "AI AGENT WORKSPACE", badgeColor: "#8b5cf6", accent: "#a78bfa" },
      { x: 4140, y: 52, tag: "PERSONAL OS", badgeColor: "#ec4899", accent: "#f472b6" },
      { x: 4940, y: 18, tag: "AI ARCHITECT SAAS", badgeColor: "#f59e0b", accent: "#fbbf24" },
      { x: 5740, y: 50, tag: "LUXURY ECOMMERCE", badgeColor: "#64748b", accent: "#94a3b8" },
      { x: 6540, y: 20, tag: "NEURAL VOICE AI", badgeColor: "#00f0ff", accent: "#67e8f9" },
      { x: 7340, y: 52, tag: "3D REAL ESTATE OS", badgeColor: "#10b981", accent: "#34d399" },
      { x: 8140, y: 18, tag: "AI RESUME SAAS", badgeColor: "#2563eb", accent: "#60a5fa" },
      { x: 8940, y: 50, tag: "QR RESTAURANT OS", badgeColor: "#f97316", accent: "#fb923c" },
      { x: 9740, y: 20, tag: "HOTEL PMS SAAS", badgeColor: "#15803d", accent: "#4ade80" },
    ],
    []
  );

  const totalTrackWidth = 10800;
  const maxScroll = Math.max(0, totalTrackWidth - windowWidth + 240);

  // Scrubbed Dissolve calculation: directly mapped 1:1 to scroll coordinate (scrubs, pauses, rewinds)
  const updateScrubbedDissolve = useCallback(
    (scrollPx: number) => {
      const TRANSITION_ZONE = 520; // Full 520px card width for complete left-to-right dissolve sweep

      cardLayouts.forEach((layout, idx) => {
        const canvas = canvasRefs.current[idx];
        if (!canvas) return;

        const cardLeft = layout.x - scrollPx;
        const cardRight = cardLeft + 520;

        // 1. Right edge entry: Card moving into viewport from right
        const rightProgress = Math.max(
          0,
          Math.min(1, (windowWidth - cardLeft) / TRANSITION_ZONE)
        );

        // 2. Left edge exit: Card moving out of viewport to left
        const leftProgress = Math.max(
          0,
          Math.min(1, cardRight / TRANSITION_ZONE)
        );

        // True net progress (0.0 = fully covered in voxels, 1.0 = fully revealed & clear)
        const progress = Math.min(rightProgress, leftProgress);

        const last = lastProgressRef.current[idx];

        // Skip if difference is negligible (< 2px scroll movement)
        if (last !== undefined && Math.abs(progress - last) < 0.005) {
          return;
        }

        // Both at >= 0.98 (already clear): skip
        if (last !== undefined && last >= 0.98 && progress >= 0.98) {
          return;
        }

        // Both at <= 0.01 (already fully covered): skip
        if (last !== undefined && last <= 0.01 && progress <= 0.01) {
          return;
        }

        // Play subtle sound once when card enters transition
        if (progress > 0.08 && progress < 0.92 && !soundPlayedRef.current.has(idx)) {
          soundPlayedRef.current.add(idx);
          sound.playHover();
        } else if (progress <= 0.02 && soundPlayedRef.current.has(idx)) {
          soundPlayedRef.current.delete(idx);
        }

        lastProgressRef.current[idx] = progress;
        // Strictly dissolves from LEFT to RIGHT with crisp, solid cyberpunk voxels
        drawScrubbedDissolve(canvas, progress);
      });
    },
    [windowWidth, cardLayouts]
  );

  // Initial draw pass on mount and window resize
  useEffect(() => {
    updateScrubbedDissolve(scrollPosRef.current);
  }, [updateScrubbedDissolve]);

  // Smooth RAF physics loop for horizontal translation (120 FPS Direct GPU Compositing)
  useEffect(() => {
    let prev = targetPos.current;

    const loop = () => {
      if (autoDrift && !isDragging.current) {
        targetPos.current += 0.4; // Subtle ambient rightward drift
        if (targetPos.current > maxScroll) {
          targetPos.current = 0;
        }
      }

      // Smooth interpolation towards targetPos (runs continuously whether dragging or scrolling)
      const diff = targetPos.current - prev;
      if (Math.abs(diff) > 0.04) {
        scrollDirectionRef.current = diff > 0 ? "forward" : "backward";
        // When dragging, follow cursor with high responsiveness; when releasing/drifting, glide smoothly
        const responsiveness = isDragging.current ? 0.38 : 0.14;
        prev += diff * responsiveness;
        scrollPosRef.current = prev;

        // DIRECT GPU COMPOSITING: Bypass React Virtual DOM for buttery 120 FPS
        if (containerRef.current) {
          containerRef.current.style.transform = `translate3d(-${prev.toFixed(1)}px, 0, 0)`;
        }

        // 1:1 SCRUBBED DISSOLVE: updates in exact lockstep with mouse drag and scroll
        updateScrubbedDissolve(prev);

        // Direct DOM text update for completion percentage (0 React re-renders)
        const pct = Math.round((prev / (maxScroll || 1)) * 100);
        if (pct !== lastPctRef.current) {
          lastPctRef.current = pct;
          if (progressTextRef.current) {
            progressTextRef.current.textContent = `${pct}%`;
          }
        }
      }

      animFrameId.current = requestAnimationFrame(loop);
    };

    animFrameId.current = requestAnimationFrame(loop);

    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [autoDrift, maxScroll, windowWidth]);

  // Wheel listener: Map vertical wheel into horizontal motion
  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      setAutoDrift(false);
      setHasScrolled(true);
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      scrollDirectionRef.current = delta >= 0 ? "forward" : "backward";
      targetPos.current = Math.max(0, Math.min(maxScroll, targetPos.current + delta * 1.4));
    },
    [maxScroll]
  );

  // Dragging gesture tracking & drag vs click discrimination
  const dragMoved = useRef(false);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return;
    setAutoDrift(false);
    setHasScrolled(true);
    isDragging.current = true;
    dragMoved.current = false;
    startX.current = e.clientX;
    startScroll.current = targetPos.current;
    velocity.current = 0;
    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch {}
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const dx = e.clientX - startX.current;
    if (Math.abs(dx) > 6) {
      dragMoved.current = true;
    }
    velocity.current = dx;
    scrollDirectionRef.current = dx <= 0 ? "forward" : "backward";
    targetPos.current = Math.max(0, Math.min(maxScroll, startScroll.current - dx * 1.5));
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {}
    targetPos.current = Math.max(
      0,
      Math.min(maxScroll, targetPos.current - velocity.current * 3.5)
    );
    // Allow click event to finish before resetting dragMoved
    setTimeout(() => {
      dragMoved.current = false;
    }, 100);
  };

  // Dedicated page navigation handler when card is clicked (not dragged)
  const handleCardClick = (slug: string) => {
    if (dragMoved.current) return;
    sound.playOpen();
    router.push(`/projects/${slug}`);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        setAutoDrift(false);
        setHasScrolled(true);
        scrollDirectionRef.current = "forward";
        targetPos.current = Math.min(maxScroll, targetPos.current + 480);
        sound.playTab();
      } else if (e.key === "ArrowLeft") {
        setAutoDrift(false);
        setHasScrolled(true);
        scrollDirectionRef.current = "backward";
        targetPos.current = Math.max(0, targetPos.current - 480);
        sound.playTab();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [maxScroll]);

  // Jump to specific project
  // Jump to specific project
  const scrollToProject = (index: number) => {
    sound.playTab();
    setAutoDrift(false);
    setHasScrolled(true);
    const layout = cardLayouts[index];
    if (layout) {
      const currentScroll = targetPos.current;
      const targetScroll = Math.max(0, Math.min(maxScroll, layout.x - 120));
      const side: "left" | "right" = targetScroll < currentScroll ? "left" : "right";
      scrollDirectionRef.current = side === "left" ? "backward" : "forward";
      targetPos.current = targetScroll;
    }
  };

  return (
    <div
      onWheel={handleWheel}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      className="relative w-screen h-screen overflow-hidden select-none bg-[#07080f] text-white cursor-grab active:cursor-grabbing"
      role="region"
      aria-label="Horizontal Circuit Projects Canvas"
    >
      {/* ---------------- CARD HOVER LIGHT SWIPE ANIMATION STYLES ---------------- */}
      <style>{`
        .card-swipe-beam {
          position: absolute;
          top: -120%;
          bottom: -120%;
          width: 150px;
          left: -220px;
          opacity: 0;
          pointer-events: none;
          transform: skewX(-25deg);
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.05) 15%,
            rgba(6, 182, 212, 0.65) 42%,
            rgba(255, 255, 255, 1) 50%,
            rgba(168, 85, 247, 0.65) 58%,
            rgba(255, 255, 255, 0.05) 85%,
            transparent 100%
          );
          box-shadow: 0 0 45px rgba(6, 182, 212, 0.95), 0 0 85px rgba(168, 85, 247, 0.75);
          mix-blend-mode: screen;
        }

        .group:hover .card-swipe-beam {
          animation: cardGleamSwipe 0.95s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes cardGleamSwipe {
          0% {
            left: -220px;
            opacity: 0;
          }
          15% {
            opacity: 1;
          }
          85% {
            opacity: 1;
          }
          100% {
            left: 135%;
            opacity: 0;
          }
        }
      `}</style>

      {/* ---------------- 0. ATMOSPHERIC NEBULA LIGHTING & TECHNICAL GRID ---------------- */}
      <div className="absolute top-1/4 left-1/4 w-[850px] h-[600px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[750px] h-[550px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:44px_44px] pointer-events-none opacity-40" />

      {/* ---------------- 1. TOP HEADER (DARK LUXURY EDITORIAL STYLE) ---------------- */}
      <header className="absolute top-0 left-0 right-0 z-40 px-6 sm:px-10 py-5 flex items-center justify-between text-xs font-mono tracking-wider pointer-events-none border-b border-white/10 bg-[#07080f]/75 backdrop-blur-md">
        {/* Left: Identity / Monogram */}
        <div className="flex items-center gap-4 pointer-events-auto">
          <Link
            href="/"
            className="flex items-center gap-2.5 group text-inherit font-extrabold tracking-tight hover:opacity-80 transition-opacity"
          >
            <div className="w-7 h-7 rounded-lg bg-indigo-600/30 border border-indigo-400/30 flex items-center justify-center font-bold text-xs text-indigo-300 shadow-sm">
              R.
            </div>
            <span className="text-sm font-sans font-black uppercase tracking-tight text-white">
              ROS RENDO
            </span>
          </Link>

          <span className="opacity-20 hidden sm:inline">•</span>

          <span className="text-[11px] text-zinc-400 font-mono hidden md:inline">
            SYSTEM ARCHITECTURES
          </span>

          <span className="opacity-20 hidden sm:inline">•</span>

          {/* Sound Toggle */}
          <button
            type="button"
            onClick={toggleSound}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-white/15 bg-white/[0.04] hover:bg-white/10 text-white transition-all text-[11px]"
          >
            {isMuted ? (
              <>
                <VolumeX className="w-3.5 h-3.5 text-zinc-500" />
                <span>SOUND — OFF</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>SOUND — ON</span>
              </>
            )}
          </button>
        </div>

        {/* Center: Live Real-Time Location & Clock Coordinates */}
        <div className="hidden lg:flex items-center gap-6 text-[11px] opacity-80 pointer-events-auto text-zinc-300">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
            <span className="font-bold text-white">PHNOM PENH, KH</span>
          </div>
          <div>{currentTime || "5:42 PM"}</div>
          <div className="opacity-60">11°33&apos;58.2&quot;N 104°55&apos;18.0&quot;E</div>
        </div>

        {/* Right: Controls & Navigation */}
        <div className="flex items-center gap-3 pointer-events-auto">
          {/* Autoplay Drift Switch */}
          <button
            type="button"
            onClick={() => {
              sound.playTab();
              setAutoDrift(!autoDrift);
            }}
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[11px] font-mono transition-all ${
              autoDrift
                ? "border-cyan-500/40 bg-cyan-500/10 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.15)]"
                : "border-white/15 bg-white/[0.03] text-zinc-400 hover:text-white"
            }`}
            title="Toggle automatic horizontal drift"
          >
            {autoDrift ? (
              <>
                <Pause className="w-3 h-3 text-cyan-400" />
                <span>DRIFTING</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 text-zinc-400" />
                <span>DRIFT PAUSED</span>
              </>
            )}
          </button>

          {/* Return to 3D Cylinder View */}
          {onBackTo3D ? (
            <button
              type="button"
              onClick={() => {
                sound.playClose();
                onBackTo3D();
              }}
              className="px-4 py-1.5 rounded-full font-bold text-xs uppercase tracking-wider border border-white/20 bg-white/10 text-white hover:bg-white/20 transition-all hover:scale-105 active:scale-95"
            >
              3D VIEW
            </button>
          ) : (
            <Link
              href="/"
              onClick={() => sound.playClose()}
              className="px-4 py-1.5 rounded-full font-bold text-xs uppercase tracking-wider border border-white/20 bg-white/10 text-white hover:bg-white/20 transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5"
            >
              <span>3D VIEW</span>
            </Link>
          )}
        </div>
      </header>

      {/* ---------------- 2. HORIZONTAL SPRAWLING CANVAS ---------------- */}
      <div
        ref={containerRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          transform: "translate3d(0, 0, 0)",
          willChange: "transform",
        }}
      >
        {/* ---------------- 3. FIBER-OPTIC CIRCUIT TRACE NETWORK (SVG) ---------------- */}
        <svg
          className="absolute inset-0 h-full overflow-visible pointer-events-none"
          style={{ width: `${totalTrackWidth}px` }}
        >
          <defs>
            {/* Illuminated gradient along path */}
            <linearGradient id="cyberTrace" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="25%" stopColor="#3b82f6" />
              <stop offset="50%" stopColor="#6366f1" />
              <stop offset="75%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>

          {/* Underglow blurred stroke (Layered stroke for zero GPU filter stall) */}
          <g
            stroke="url(#cyberTrace)"
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.18"
          >
            <path d="M 0 320 L 80 320 L 120 280 L 140 280" />
            <path d="M 660 300 L 780 300 L 880 490 L 940 490" />
            <path d="M 1460 500 L 1580 500 L 1670 320 L 1740 320" />
            <path d="M 2260 320 L 2380 320 L 2470 500 L 2540 500" />
            <path d="M 3060 500 L 3180 500 L 3270 340 L 3340 340" />
            <path d="M 3860 340 L 3980 340 L 4070 500 L 4140 500" />
            <path d="M 4660 500 L 4780 500 L 4870 320 L 4940 320" />
            <path d="M 5460 320 L 5580 320 L 5670 500 L 5740 500" />
            <path d="M 6260 500 L 6380 500 L 6470 340 L 6540 340" />
            <path d="M 7060 340 L 7180 340 L 7270 500 L 7340 500" />
            <path d="M 7860 500 L 7980 500 L 8070 320 L 8140 320" />
            <path d="M 8660 320 L 8780 320 L 8870 500 L 8940 500" />
            <path d="M 9460 500 L 9580 500 L 9670 340 L 9740 340" />
            <path d="M 10260 340 L 10380 340 L 10500 420 L 10700 420" />
          </g>

          {/* Sharp core conductor line */}
          <g
            stroke="url(#cyberTrace)"
            strokeWidth="1.75"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.8"
          >
            <path d="M 0 320 L 80 320 L 120 280 L 140 280" />
            <path d="M 660 300 L 780 300 L 880 490 L 940 490" />
            <path d="M 1460 500 L 1580 500 L 1670 320 L 1740 320" />
            <path d="M 2260 320 L 2380 320 L 2470 500 L 2540 500" />
            <path d="M 3060 500 L 3180 500 L 3270 340 L 3340 340" />
            <path d="M 3860 340 L 3980 340 L 4070 500 L 4140 500" />
            <path d="M 4660 500 L 4780 500 L 4870 320 L 4940 320" />
            <path d="M 5460 320 L 5580 320 L 5670 500 L 5740 500" />
            <path d="M 6260 500 L 6380 500 L 6470 340 L 6540 340" />
            <path d="M 7060 340 L 7180 340 L 7270 500 L 7340 500" />
            <path d="M 7860 500 L 7980 500 L 8070 320 L 8140 320" />
            <path d="M 8660 320 L 8780 320 L 8870 500 L 8940 500" />
            <path d="M 9460 500 L 9580 500 L 9670 340 L 9740 340" />
            <path d="M 10260 340 L 10380 340 L 10500 420 L 10700 420" />
          </g>

          {/* Technical Concentric Junction Terminals */}
          {[
            { cx: 80, cy: 320 },
            { cx: 120, cy: 280 },
            { cx: 780, cy: 300 },
            { cx: 880, cy: 490 },
            { cx: 1580, cy: 500 },
            { cx: 1670, cy: 320 },
            { cx: 2380, cy: 320 },
            { cx: 2470, cy: 500 },
            { cx: 3180, cy: 500 },
            { cx: 3270, cy: 340 },
            { cx: 3980, cy: 340 },
            { cx: 4070, cy: 500 },
            { cx: 4780, cy: 500 },
            { cx: 4870, cy: 320 },
            { cx: 5580, cy: 320 },
            { cx: 5670, cy: 500 },
            { cx: 6380, cy: 500 },
            { cx: 6470, cy: 340 },
            { cx: 7180, cy: 340 },
            { cx: 7270, cy: 500 },
            { cx: 7980, cy: 500 },
            { cx: 8070, cy: 320 },
            { cx: 8780, cy: 320 },
            { cx: 8870, cy: 500 },
            { cx: 9580, cy: 500 },
            { cx: 9670, cy: 340 },
            { cx: 10380, cy: 340 },
            { cx: 10500, cy: 420 },
          ].map((pt, i) => (
            <g key={i}>
              <circle cx={pt.cx} cy={pt.cy} r="6" fill="#06b6d4" opacity="0.15" />
              <circle cx={pt.cx} cy={pt.cy} r="3" fill="#0b0e17" stroke="#06b6d4" strokeWidth="1.5" />
              <circle cx={pt.cx} cy={pt.cy} r="1.2" fill="#ffffff" />
            </g>
          ))}

          {/* Multiple Glowing Signal Pulses traveling along circuit */}
          <circle r="4.5" fill="#38bdf8" filter="url(#traceGlow)">
            <animateMotion
              path="M 0 320 L 80 320 L 120 280 L 140 280 M 660 300 L 780 300 L 880 490 L 940 490 M 1460 500 L 1580 500 L 1670 320 L 1740 320 M 2260 320 L 2380 320 L 2470 500 L 2540 500 M 3060 500 L 3180 500 L 3270 340 L 3340 340 M 3860 340 L 3980 340 L 4070 500 L 4140 500 M 4660 500 L 4780 500 L 4870 320 L 4940 320 M 5460 320 L 5580 320 L 5670 500 L 5740 500 M 6260 500 L 6380 500 L 6470 340 L 6540 340 M 7060 340 L 7180 340 L 7270 500 L 7340 500 M 7860 500 L 7980 500 L 8070 320 L 8140 320 M 8660 320 L 8780 320 L 8870 500 L 8940 500 M 9460 500 L 9580 500 L 9670 340 L 9740 340 M 10260 340 L 10380 340 L 10500 420 L 10700 420"
              dur="24s"
              repeatCount="indefinite"
            />
          </circle>

          <circle r="3.5" fill="#a855f7" filter="url(#traceGlow)">
            <animateMotion
              path="M 0 320 L 80 320 L 120 280 L 140 280 M 660 300 L 780 300 L 880 490 L 940 490 M 1460 500 L 1580 500 L 1670 320 L 1740 320 M 2260 320 L 2380 320 L 2470 500 L 2540 500 M 3060 500 L 3180 500 L 3270 340 L 3340 340 M 3860 340 L 3980 340 L 4070 500 L 4140 500 M 4660 500 L 4780 500 L 4870 320 L 4940 320 M 5460 320 L 5580 320 L 5670 500 L 5740 500 M 6260 500 L 6380 500 L 6470 340 L 6540 340 M 7060 340 L 7180 340 L 7270 500 L 7340 500 M 7860 500 L 7980 500 L 8070 320 L 8140 320 M 8660 320 L 8780 320 L 8870 500 L 8940 500 M 9460 500 L 9580 500 L 9670 340 L 9740 340 M 10260 340 L 10380 340 L 10500 420 L 10700 420"
              dur="24s"
              begin="8s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>

        {/* ---------------- 4. STAGGERED PROJECT CARDS WITH GLITCH-FADE ---------------- */}
        {projectsData.map((project, idx) => {
          const layout = cardLayouts[idx] || {
            x: 140 + idx * 800,
            y: idx % 2 === 0 ? 18 : 52,
            tag: "PROJECT",
            badgeColor: "#6366f1",
            accent: "#818cf8",
          };

          return (
            <div
              key={project.id}
              style={{
                position: "absolute",
                left: `${layout.x}px`,
                top: `${layout.y}vh`,
                width: "520px",
              }}
              className="pointer-events-auto"
            >
              {/* Card Container with Precision Corner Crosshairs (Direct Link to New Page) */}
              <Link
                href={`/projects/${project.slug}`}
                onClick={(e) => {
                  if (dragMoved.current) {
                    e.preventDefault();
                    return;
                  }
                  sound.playOpen();
                }}
                className="group relative rounded-2xl cursor-pointer transition-all duration-300 hover:-translate-y-2 block"
              >
                {/* 1. Card Body (Solid, crisp container with zero expensive clip-path rasterization) */}
                <div
                  className="relative rounded-2xl overflow-hidden bg-[#0d101a]/95 backdrop-blur-xl border border-white/12 group-hover:border-cyan-400/50 group-hover:shadow-[0_30px_75px_rgba(6,182,212,0.25)] shadow-[0_25px_60px_rgba(0,0,0,0.9)]"
                >
                  {/* Crosshairs on 4 corners (Precision Technical Framing) */}
                  <div className="absolute top-2.5 left-2.5 w-3.5 h-3.5 border-t-2 border-l-2 border-white/30 group-hover:border-cyan-400/90 transition-colors pointer-events-none z-20" />
                  <div className="absolute top-2.5 right-2.5 w-3.5 h-3.5 border-t-2 border-r-2 border-white/30 group-hover:border-cyan-400/90 transition-colors pointer-events-none z-20" />
                  <div className="absolute bottom-2.5 left-2.5 w-3.5 h-3.5 border-b-2 border-l-2 border-white/30 group-hover:border-cyan-400/90 transition-colors pointer-events-none z-20" />
                  <div className="absolute bottom-2.5 right-2.5 w-3.5 h-3.5 border-b-2 border-r-2 border-white/30 group-hover:border-cyan-400/90 transition-colors pointer-events-none z-20" />

                  {/* Cover Screenshot Container */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/60">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 340px, 520px"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      priority={idx < 2}
                    />

                    {/* Dark subtle vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d101a] via-black/25 to-black/20 pointer-events-none" />

                    {/* TOP-LEFT TELEMETRY STATUS BADGE */}
                    <div className="absolute top-3.5 left-3.5 z-40">
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-mono tracking-wider font-bold uppercase backdrop-blur-md border border-white/15 bg-black/70 text-zinc-300 group-hover:border-cyan-400/40 group-hover:text-cyan-300 shadow-md flex items-center gap-1.5 transition-colors">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        <span>{String(idx + 1).padStart(2, "0")} // ACTIVE</span>
                      </span>
                    </div>

                    {/* Top-Right Index Pill */}
                    <div className="absolute top-3.5 right-3.5 z-10">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-black/70 backdrop-blur-md border border-white/15 text-zinc-300 group-hover:border-cyan-400/40 group-hover:text-cyan-300 transition-colors">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                    </div>

                    {/* Category Pill (Solid high-contrast badge) */}
                    <div className="absolute bottom-3.5 left-3.5 z-10">
                      <span
                        className="px-2.5 py-1 text-[10px] sm:text-xs font-mono font-black uppercase tracking-wider text-white shadow-lg rounded"
                        style={{ backgroundColor: layout.badgeColor }}
                      >
                        {layout.tag}
                      </span>
                    </div>

                    {/* Interactive Action Icons (Live Demo + Open Case Study Page) */}
                    <div className="absolute bottom-3.5 right-3.5 z-20 flex items-center gap-2">
                      {project.links.demo && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            sound.playOpen();
                            if (project.links.demo) {
                              window.open(project.links.demo, "_blank", "noopener,noreferrer");
                            }
                          }}
                          className="w-8 h-8 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-400/50 flex items-center justify-center text-emerald-300 hover:text-white hover:bg-emerald-500/40 transition-all hover:scale-110 shadow-lg"
                          title="Open Live Vercel Demo (New Tab)"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>
                      )}
                      <div className="w-8 h-8 rounded-full bg-cyan-500/20 backdrop-blur-md border border-cyan-400/40 flex items-center justify-center text-cyan-200 group-hover:text-white group-hover:bg-cyan-500/40 transition-all group-hover:scale-110 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* Holographic Specular Light Swipe across card on hover */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden z-30 rounded-2xl">
                    <div className="card-swipe-beam" />
                  </div>
                </div>

                {/* 2. Pixel Dissolve Canvas (1:1 Scroll-Scrubbed Cyber Voxel Engine) */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none z-30">
                  <canvas
                    ref={(el) => {
                      canvasRefs.current[idx] = el;
                    }}
                    width={520}
                    height={325}
                    className="absolute inset-0 w-full h-full pointer-events-none select-none rounded-2xl"
                    aria-hidden="true"
                  />
                </div>
              </Link>

              {/* Title & Technical Metadata Row Below Card (Also direct Link to New Page) */}
              <Link
                href={`/projects/${project.slug}`}
                onClick={(e) => {
                  if (dragMoved.current) {
                    e.preventDefault();
                    return;
                  }
                  sound.playOpen();
                }}
                className="mt-3.5 px-1 cursor-pointer group block"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xs font-mono font-bold text-cyan-400">
                      {String(idx + 1).padStart(2, "0")} /
                    </span>
                    <h3 className="text-base sm:text-lg font-black uppercase tracking-tight font-sans text-white group-hover:text-cyan-300 transition-colors">
                      {project.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-1 font-mono text-xs font-semibold tracking-wider uppercase text-zinc-400 group-hover:text-cyan-300 transition-colors">
                    <span>CASE STUDY</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>

                <p className="text-xs font-mono text-zinc-400 truncate mt-1 max-w-[420px]">
                  {project.tagline}
                </p>

                {/* Tech Chips */}
                <div className="flex items-center gap-1.5 mt-2 overflow-hidden flex-wrap">
                  {project.techStack.flatMap((c) => c.items).slice(0, 4).map((tech, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] border border-white/10 text-zinc-300"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.metrics[0] && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/25 text-cyan-300">
                      {project.metrics[0].value} {project.metrics[0].label}
                    </span>
                  )}
                </div>
              </Link>
            </div>
          );
        })}
      </div>

      {/* ---------------- 5. BOTTOM NAVIGATION TRACKBAR ---------------- */}
      <footer className="absolute bottom-0 left-0 right-0 z-40 px-6 sm:px-10 py-4 flex items-center justify-between text-xs font-mono tracking-wider pointer-events-none border-t border-white/10 bg-[#07080f]/75 backdrop-blur-md text-zinc-400">
        {/* Left Instruction */}
        <div className="hidden sm:flex items-center gap-3">
          <span className="font-bold text-zinc-200">DRAG OR SCROLL HORIZONTALLY</span>
          <span className="opacity-30">•</span>
          <span className="opacity-75">HOLOGRAPHIC SCAN REVEAL</span>
        </div>

        {/* Center: Jump Markers */}
        <div className="flex items-center gap-1.5 pointer-events-auto">
          {projectsData.map((p, i) => (
            <button
              key={p.id}
              onClick={() => scrollToProject(i)}
              className="px-2.5 py-1 rounded text-xs font-mono font-bold bg-white/10 text-white hover:bg-cyan-500/20 hover:text-cyan-300 border border-white/10 transition-all hover:scale-105"
              title={`Jump to ${p.title}`}
            >
              {String(i + 1).padStart(2, "0")}
            </button>
          ))}
        </div>

        {/* Right: Progress % & Auto-Drift Switch */}
        <div className="flex items-center gap-4 pointer-events-auto">
          <span className="text-zinc-500 hidden md:inline">CIRCUIT COMPLETION:</span>
          <span ref={progressTextRef} className="font-bold text-white font-mono">
            0%
          </span>
        </div>
      </footer>

    </div>
  );
}
