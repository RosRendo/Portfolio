"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Project, projectsData } from "@/data/projects";
import { profileData } from "@/data/profile";
import { sound } from "@/lib/sound";
import { ProjectDetailView } from "./ProjectDetailView";
import { SkillsDetailView } from "./SkillsDetailView";
import { JourneyDetailView } from "./JourneyDetailView";
import { ContactDetailView } from "./ContactDetailView";
import { PersonalIdentityView } from "./PersonalIdentityView";
import { GitHubIcon, LinkedInIcon } from "@/components/icons/SocialIcons";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Copy,
  FileDown,
  Mail,
  MapPin,
  Sparkles,
  X,
} from "lucide-react";

export interface CarouselCard {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  tag: string;
  image: string;
  type: "projects" | "project" | "about" | "skills" | "journey" | "contact";
  project?: Project;
}

export const CAROUSEL_CARDS: CarouselCard[] = [
  {
    id: "projects",
    title: "PROJECTS",
    subtitle: "Interactive Circuit & System Architecture",
    category: "Engineering Archive / 002",
    tag: "13 Production Builds • Tap to Explore Moving Circuit ↗",
    image: "/images/servicefinder.jpg",
    type: "projects",
  },
  {
    id: "about",
    title: "ROS RENDO",
    subtitle: "Full-Stack Developer | Backend Engineering",
    category: "Personal Profile / 001",
    tag: "Building ideas into products • Architecture to Deployment",
    image: "/images/avatar.jpg",
    type: "about",
  },
  {
    id: "servicefinder",
    title: "SERVICEFINDER",
    subtitle: "Multi-Sided Marketplace",
    category: "PROJECT 01 / MARKETPLACE",
    tag: "Next.js • Node.js • PostgreSQL • Prisma",
    image: "/images/servicefinder.jpg",
    type: "project",
    project: projectsData[0],
  },
  {
    id: "safedeal",
    title: "SAFEDEAL",
    subtitle: "Protected Escrow Platform",
    category: "PROJECT 02 / FINTECH ESCROW",
    tag: "Deterministic FSM • Cryptographic Audit",
    image: "/images/safedeal.jpg",
    type: "project",
    project: projectsData[1],
  },
  {
    id: "trading-tools",
    title: "STRATEGY LAB",
    subtitle: "Quantitative Analytics Suite",
    category: "PROJECT 03 / QUANT ENGINE",
    tag: "Vectorized Math • Backtesting • Signals",
    image: "/images/tradingtools.jpg",
    type: "project",
    project: projectsData[2],
  },
  {
    id: "skills",
    title: "TECH STACK",
    subtitle: "Systems & Infrastructure",
    category: "Core Competency Matrix",
    tag: "Node.js • PostgreSQL • NestJS • Docker",
    image: "/images/techstack.jpg",
    type: "skills",
  },
  {
    id: "journey",
    title: "JOURNEY",
    subtitle: "Student & Builder Timeline",
    category: "Authentic Learning Trajectory",
    tag: "2022 — Present • System Design Milestones",
    image: "/images/journey.jpg",
    type: "journey",
  },
  {
    id: "contact",
    title: "CONNECT",
    subtitle: "Direct Collaboration & CV",
    category: "Direct Inquiries & Resumé",
    tag: "rosrendo.dev@gmail.com • GitHub • LinkedIn",
    image: "/images/avatar.jpg",
    type: "contact",
  },
];

interface Curved3DCarouselProps {
  expandedCardId: string | null;
  onOpenCard: (card: CarouselCard) => void;
  onCloseCard: () => void;
  onSelectProject?: (project: Project) => void;
}

export function Curved3DCarousel({
  expandedCardId,
  onOpenCard,
  onCloseCard,
  onSelectProject,
}: Curved3DCarouselProps) {
  const [currentAngle, setCurrentAngle] = useState(0);
  const [targetAngle, setTargetAngle] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [windowWidth, setWindowWidth] = useState(1200);

  const dragStartX = useRef(0);
  const dragStartAngle = useRef(0);
  const lastPointerX = useRef(0);
  const velocity = useRef(0);
  const currentAngleRef = useRef(0);
  const targetAngleRef = useRef(0);
  const isDraggingRef = useRef(false);
  const rafPendingRef = useRef(false);

  const numCards = CAROUSEL_CARDS.length;
  const stepAngle = 360 / numCards; // ~51.43 deg

  const isAnyExpanded = expandedCardId !== null;

  // Find currently expanded card object
  const expandedCard = useMemo(
    () => CAROUSEL_CARDS.find((c) => c.id === expandedCardId) || null,
    [expandedCardId]
  );

  // Cache last opened card so exit/zoom-out animations always have complete data
  const lastExpandedCardRef = useRef<CarouselCard | null>(null);
  if (expandedCard) {
    lastExpandedCardRef.current = expandedCard;
  }
  const displayCard = expandedCard || lastExpandedCardRef.current;

  // Handle window resize for dynamic cylinder radius
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const radius = windowWidth < 640 ? 520 : windowWidth < 1024 ? 720 : 920;

  // Active card index derived from targetAngle
  const rawIdx = Math.round(targetAngle / stepAngle);
  const activeIdx = ((rawIdx % numCards) + numCards) % numCards;
  const activeCard = CAROUSEL_CARDS[activeIdx];

  // Auto-rotate cylinder when card is expanded
  useEffect(() => {
    if (expandedCardId) {
      const targetIdx = CAROUSEL_CARDS.findIndex((c) => c.id === expandedCardId);
      if (targetIdx !== -1) {
        const currentRaw = Math.round(targetAngle / stepAngle);
        const currentNorm = ((currentRaw % numCards) + numCards) % numCards;
        let diff = targetIdx - currentNorm;
        if (diff > numCards / 2) diff -= numCards;
        if (diff < -numCards / 2) diff += numCards;

        const newTarget = (currentRaw + diff) * stepAngle;
        setTargetAngle(newTarget);
        targetAngleRef.current = newTarget;
        setCurrentAngle(newTarget);
        currentAngleRef.current = newTarget;
      }
    }
  }, [expandedCardId, stepAngle, numCards]);

  // Keep targetAngleRef and isDraggingRef in sync
  useEffect(() => {
    targetAngleRef.current = targetAngle;
  }, [targetAngle]);

  useEffect(() => {
    isDraggingRef.current = isDragging;
  }, [isDragging]);

  // Smooth physics animation loop for cylinder rotation (uninterrupted, 60fps stable)
  useEffect(() => {
    if (isAnyExpanded) return; // Freeze cylinder physics while card is open

    let animId: number;
    const updatePhysics = () => {
      if (!isDraggingRef.current) {
        const diff = targetAngleRef.current - currentAngleRef.current;
        if (Math.abs(diff) > 0.04) {
          currentAngleRef.current += diff * 0.18;
          setCurrentAngle(currentAngleRef.current);
          animId = requestAnimationFrame(updatePhysics);
        } else if (currentAngleRef.current !== targetAngleRef.current) {
          currentAngleRef.current = targetAngleRef.current;
          setCurrentAngle(targetAngleRef.current);
        }
      }
    };

    animId = requestAnimationFrame(updatePhysics);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [targetAngle, isDragging, isAnyExpanded]);

  // Navigate to specific index
  const goToIndex = useCallback(
    (index: number) => {
      if (isAnyExpanded) return;
      sound.playTab();
      const currentRaw = Math.round(targetAngle / stepAngle);
      const currentNorm = ((currentRaw % numCards) + numCards) % numCards;
      let diff = index - currentNorm;
      if (diff > numCards / 2) diff -= numCards;
      if (diff < -numCards / 2) diff += numCards;

      setTargetAngle((currentRaw + diff) * stepAngle);
    },
    [targetAngle, stepAngle, numCards, isAnyExpanded]
  );

  const nextCard = useCallback(() => {
    if (isAnyExpanded) return;
    sound.playTab();
    setTargetAngle((prev) => prev + stepAngle);
  }, [stepAngle, isAnyExpanded]);

  const prevCard = useCallback(() => {
    if (isAnyExpanded) return;
    sound.playTab();
    setTargetAngle((prev) => prev - stepAngle);
  }, [stepAngle, isAnyExpanded]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isAnyExpanded) {
          sound.playClose();
          onCloseCard();
        }
      } else if (!isAnyExpanded) {
        if (e.key === "ArrowRight") {
          e.preventDefault();
          nextCard();
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          prevCard();
        } else if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          sound.playOpen();
          onOpenCard(activeCard);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextCard, prevCard, activeCard, isAnyExpanded, onCloseCard, onOpenCard]);

  // Pointer drag gestures
  const handlePointerDown = (e: React.PointerEvent) => {
    if (isAnyExpanded) return;
    setIsDragging(true);
    isDraggingRef.current = true;
    dragStartX.current = e.clientX;
    dragStartAngle.current = currentAngleRef.current;
    lastPointerX.current = e.clientX;
    velocity.current = 0;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current || isAnyExpanded) return;
    const deltaX = e.clientX - dragStartX.current;
    velocity.current = e.clientX - lastPointerX.current;
    lastPointerX.current = e.clientX;

    const sensitivity = windowWidth < 640 ? 0.22 : 0.16;
    const nextAngle = dragStartAngle.current - deltaX * sensitivity;
    currentAngleRef.current = nextAngle;

    // Throttle to display refresh interval via RAF (prevents 500Hz mouse move floods)
    if (!rafPendingRef.current) {
      rafPendingRef.current = true;
      requestAnimationFrame(() => {
        setCurrentAngle(currentAngleRef.current);
        rafPendingRef.current = false;
      });
    }
  };

  const handlePointerUp = () => {
    if (!isDraggingRef.current) return;
    setIsDragging(false);
    isDraggingRef.current = false;
    rafPendingRef.current = false;

    const inertiaAngle = currentAngleRef.current - velocity.current * 2.5;
    const snapIdx = Math.round(inertiaAngle / stepAngle);
    const snapTarget = snapIdx * stepAngle;
    targetAngleRef.current = snapTarget;
    setTargetAngle(snapTarget);
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (isAnyExpanded) return;
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    if (Math.abs(delta) > 15) {
      if (delta > 0) nextCard();
      else prevCard();
    }
  };

  return (
    <div
      onWheel={handleWheel}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      className={`relative w-full h-[82vh] sm:h-[86vh] flex items-center justify-center select-none overflow-hidden touch-none ${
        isAnyExpanded ? "cursor-default" : isDragging ? "cursor-grabbing" : "cursor-grab"
      }`}
      style={{ perspective: windowWidth < 640 ? "900px" : "1400px" }}
      role="region"
      aria-label="3D Curved Interactive Card Carousel"
    >
      {/* 3D Cylindrical Stage (Pure GPU transforms, 0 layout reflow) */}
      <div
        className="relative w-full h-full flex items-center justify-center pointer-events-none"
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {CAROUSEL_CARDS.map((card, i) => {
          const cardBaseAngle = i * stepAngle;
          let relAngle = (cardBaseAngle - currentAngle) % 360;
          if (relAngle > 180) relAngle -= 360;
          if (relAngle < -180) relAngle += 360;

          // Hide cards on back half of cylinder
          if (Math.abs(relAngle) > 105) return null;

          const rad = (relAngle * Math.PI) / 180;
          const tx = radius * Math.sin(rad);
          const tz = radius * (Math.cos(rad) - 1);
          const ry = -relAngle;

          const absAngle = Math.abs(relAngle);
          const isCenter = absAngle < stepAngle / 2;
          const baseOpacity = isAnyExpanded
            ? (isCenter ? 0.04 : 0.08)
            : Math.max(0.25, 1 - absAngle / 110);
          const darkOverlayOpacity = isCenter ? 0 : Math.min(0.65, (absAngle / 90) * 0.65);

          return (
            <div
              key={card.id}
              onClick={(e) => {
                if (isAnyExpanded) return;
                e.stopPropagation();
                if (isCenter) {
                  sound.playOpen();
                  onOpenCard(card);
                } else {
                  goToIndex(i);
                }
              }}
              style={{
                position: "absolute",
                transform: `translate3d(${tx}px, 0, ${tz}px) rotateY(${ry}deg)`,
                opacity: baseOpacity,
                zIndex: isCenter ? 20 : 10,
                willChange: "transform, opacity",
                backfaceVisibility: "hidden",
              }}
              className="pointer-events-auto"
            >
              {/* Card Surface Container (Fixed GPU dimensions, NO width/height transition lag) */}
              <div
                className={`relative w-[310px] sm:w-[540px] md:w-[680px] lg:w-[760px] aspect-[16/10] rounded-3xl sm:rounded-[32px] overflow-hidden border bg-[#0e1017] shadow-2xl ${
                  isCenter
                    ? "border-white/30 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.95)] ring-1 ring-white/10"
                    : "border-white/15"
                }`}
              >
                {card.type === "about" ? (
                  /* ---------------- IDENTITY CARD V1: THE SIGNATURE / DIGITAL ARTIFACT ---------------- */
                  <div className="absolute inset-0 p-5 sm:p-8 md:p-9 flex flex-col justify-between bg-gradient-to-br from-[#121422] via-[#0c0e17] to-black border border-indigo-500/20 select-none overflow-hidden group">
                    {/* Atmospheric decorative glow (pure GPU radial-gradient, 0 convolution blur overhead) */}
                    <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)" }} />
                    <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)" }} />
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none opacity-35" />

                    {/* TOP ROW: Micro-Metadata & Monogram Seal */}
                    <div className="relative z-10 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                        <span className="text-[10px] sm:text-xs font-mono tracking-widest uppercase text-indigo-300 font-bold">
                          PERSONAL PROFILE / 001
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono text-zinc-400 bg-white/[0.04] border border-white/10">
                          Independent Builder
                        </span>
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-2xl bg-indigo-500/15 border border-indigo-500/35 flex items-center justify-center font-mono font-black text-indigo-300 text-sm sm:text-base shadow-inner">
                          R.
                        </div>
                      </div>
                    </div>

                    {/* CENTER: Oversized Typography & Editorial Identity Lockup */}
                    <div className="relative z-10 flex items-center justify-between gap-6 my-auto">
                      <div className="space-y-1.5 sm:space-y-2.5 max-w-xl">
                        <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white uppercase font-sans drop-shadow-2xl">
                          ROS RENDO
                        </h2>

                        <div className="text-xs sm:text-sm md:text-base text-zinc-300 font-mono tracking-wide font-medium flex flex-wrap items-center gap-2">
                          <span>Full-Stack Developer</span>
                          <span className="text-indigo-400">•</span>
                          <span className="text-indigo-300">Backend Engineering</span>
                        </div>

                        <p className="text-xs sm:text-sm text-zinc-400 font-serif italic pt-0.5 max-w-md">
                          &ldquo;Building ideas into products — From architecture to deployment.&rdquo;
                        </p>
                      </div>

                      {/* Developer avatar portrait preview with specular ring */}
                      <div className="hidden sm:block relative w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden border-2 border-indigo-500/35 shadow-2xl shrink-0 rotate-2 group-hover:rotate-0 transition-transform duration-300">
                        <Image
                          src="/images/avatar.jpg"
                          alt="ROS RENDO portrait"
                          fill
                          sizes="96px"
                          className="object-cover"
                          priority={isCenter}
                        />
                      </div>
                    </div>

                    {/* BOTTOM ROW: Focus, Location, and Action Invite */}
                    <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pt-3.5 border-t border-white/10 text-[10px] sm:text-xs font-mono text-zinc-400">
                      <div className="flex items-center gap-4">
                        <span className="text-zinc-300">
                          <span className="text-zinc-500 mr-1.5">FOCUS:</span>
                          Full-stack · Backend · Products
                        </span>
                        <span className="hidden md:inline-block text-zinc-600">•</span>
                        <span className="hidden md:inline-block text-zinc-300">
                          <span className="text-zinc-500 mr-1.5">LOCATION:</span>
                          Cambodia 🇰🇭
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 text-indigo-400 font-semibold group-hover:text-indigo-300 transition-colors">
                        <span className="text-[10px] sm:text-xs tracking-wider uppercase">
                          Discover My Story
                        </span>
                        <div className="w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : card.type === "projects" ? (
                  /* ---------------- MASTER PROJECTS GATEWAY CARD (DARK LUXURY THEME) ---------------- */
                  <div className="absolute inset-0 p-5 sm:p-8 md:p-9 flex flex-col justify-between bg-gradient-to-br from-[#101426] via-[#090b14] to-black border border-cyan-500/25 select-none overflow-hidden group">
                    {/* Atmospheric Ambient Glows (pure GPU radial-gradient) */}
                    <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(6,182,212,0.18) 0%, transparent 70%)" }} />
                    <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)" }} />
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none opacity-35" />

                    {/* Corner Crosshairs (Precision Engineering Aesthetic) */}
                    <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-white/40 group-hover:border-cyan-400/80 transition-colors pointer-events-none z-20" />
                    <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-white/40 group-hover:border-cyan-400/80 transition-colors pointer-events-none z-20" />
                    <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-white/40 group-hover:border-cyan-400/80 transition-colors pointer-events-none z-20" />
                    <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-white/40 group-hover:border-cyan-400/80 transition-colors pointer-events-none z-20" />

                    {/* TOP ROW: Micro-Metadata & Monogram Seal */}
                    <div className="relative z-10 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                        <span className="text-[10px] sm:text-xs font-mono tracking-widest uppercase text-cyan-300 font-bold">
                          ENGINEERING ARCHIVE / 002
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono text-zinc-300 bg-white/[0.04] border border-white/10">
                          13 Interactive Builds
                        </span>
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-2xl bg-cyan-500/15 border border-cyan-500/35 flex items-center justify-center font-mono font-black text-cyan-300 text-sm sm:text-base shadow-inner">
                          ⌘
                        </div>
                      </div>
                    </div>

                    {/* CENTER: Oversized Typography & Tech Stack Preview */}
                    <div className="relative z-10 flex items-center justify-between gap-6 my-auto">
                      <div className="space-y-1.5 sm:space-y-2.5 max-w-xl">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                            SYSTEM PORTFOLIO
                          </span>
                          <span className="text-[11px] font-mono text-zinc-400 hidden sm:inline">
                            Horizontal Dynamic Flow
                          </span>
                        </div>

                        <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white uppercase font-sans drop-shadow-2xl">
                          PROJECTS
                        </h2>

                        <div className="text-xs sm:text-sm text-zinc-300 font-mono tracking-wide font-medium flex flex-wrap items-center gap-2">
                          <span>ServiceFinder</span>
                          <span className="text-cyan-400">•</span>
                          <span>SafeDeal</span>
                          <span className="text-cyan-400">•</span>
                          <span>CVGen</span>
                          <span className="text-cyan-400">•</span>
                          <span>TokMenu</span>
                          <span className="text-cyan-400">•</span>
                          <span>StayPilot</span>
                          <span className="text-cyan-400">•</span>
                          <span>+8 More</span>
                        </div>

                        <p className="text-xs sm:text-sm text-zinc-400 font-serif italic pt-0.5 max-w-md">
                          &ldquo;Full-stack web applications, microservices, deterministic financial state machines, and real-time APIs.&rdquo;
                        </p>
                      </div>

                      {/* Mini Circuit Mockup Preview Stack */}
                      <div className="hidden sm:block relative w-24 h-24 md:w-28 md:h-28 rounded-2xl overflow-hidden border-2 border-cyan-500/30 shadow-2xl shrink-0 group-hover:border-cyan-400/60 transition-all duration-300 bg-black/60 p-1.5">
                        <div className="relative w-full h-full rounded-xl overflow-hidden">
                          <Image
                            src="/images/servicefinder.jpg"
                            alt="Projects Showcase"
                            fill
                            sizes="112px"
                            className="object-cover"
                            priority={isCenter}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                          <div className="absolute bottom-1.5 left-1.5 right-1.5 flex items-center justify-between text-[9px] font-mono text-cyan-300">
                            <span>CIRCUIT →</span>
                            <span className="font-bold">13 BUILDS</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* BOTTOM ROW: Navigation Cue & Interactive Button */}
                    <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pt-3.5 border-t border-white/10 text-[10px] sm:text-xs font-mono text-zinc-400">
                      <div className="flex items-center gap-4">
                        <span className="text-zinc-300">
                          <span className="text-zinc-500 mr-1.5">CANVAS:</span>
                          Wandering Circuit · Inertia Physics
                        </span>
                        <span className="hidden md:inline-block text-zinc-600">•</span>
                        <span className="hidden md:inline-block text-zinc-300">
                          <span className="text-zinc-500 mr-1.5">STACK:</span>
                          Next.js · Node · SQL
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-400/35 text-cyan-200 font-semibold group-hover:scale-105 transition-all shadow-[0_0_15px_rgba(6,182,212,0.15)] text-[11px] font-mono">
                        <span className="tracking-wider uppercase">Explore Moving Canvas</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-cyan-300" />
                      </div>
                    </div>
                  </div>
                ) : card.type === "contact" || card.id === "contact" ? (
                  /* ---------------- CARD 08 — CONTACT & CV / LET'S CONNECT ---------------- */
                  <div className="absolute inset-0 p-5 sm:p-8 md:p-9 flex flex-col justify-between bg-gradient-to-br from-[#0d111e] via-[#090b14] to-black border border-cyan-500/25 select-none overflow-hidden group">
                    {/* Atmospheric Ambient Glows */}
                    <div
                      className="absolute -top-24 -right-24 w-80 h-80 rounded-full pointer-events-none"
                      style={{
                        background:
                          "radial-gradient(circle, rgba(6,182,212,0.18) 0%, transparent 70%)",
                      }}
                    />
                    <div
                      className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full pointer-events-none"
                      style={{
                        background:
                          "radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)",
                      }}
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none opacity-30" />

                    {/* Corner Crosshairs (Technical Rigor) */}
                    <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-white/40 group-hover:border-cyan-400/80 transition-colors pointer-events-none z-20" />
                    <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-white/40 group-hover:border-cyan-400/80 transition-colors pointer-events-none z-20" />
                    <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-white/40 group-hover:border-cyan-400/80 transition-colors pointer-events-none z-20" />
                    <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-white/40 group-hover:border-cyan-400/80 transition-colors pointer-events-none z-20" />

                    {/* TOP ROW: Availability Beacon & Card Index */}
                    <div className="relative z-10 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                        <span className="text-[10px] sm:text-xs font-mono tracking-widest uppercase text-emerald-300 font-bold">
                          OPEN TO PROJECTS & ROLES
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono text-zinc-300 bg-white/[0.04] border border-white/10">
                          CARD 08 // CONNECT
                        </span>
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-2xl bg-cyan-500/15 border border-cyan-500/35 flex items-center justify-center font-mono font-black text-cyan-300 text-sm sm:text-base shadow-inner">
                          ✉
                        </div>
                      </div>
                    </div>

                    {/* CENTER: Headline, Supporting Text, and Animated Line */}
                    <div className="relative z-10 space-y-3 sm:space-y-4 my-auto max-w-xl">
                      <div className="space-y-1 group-hover:-translate-y-1.5 transition-transform duration-300">
                        <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">
                          LET&apos;S TALK ARCHITECTURE & PRODUCTS
                        </span>
                        <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white uppercase font-sans drop-shadow-2xl">
                          Have something worth building?
                        </h2>
                      </div>

                      {/* Thin accent line drawing toward main contact link on hover */}
                      <div className="w-12 group-hover:w-32 h-[2px] bg-gradient-to-r from-cyan-400 to-indigo-500 transition-all duration-500 ease-out rounded-full" />

                      <p className="text-xs sm:text-sm md:text-base text-zinc-300 font-normal leading-relaxed">
                        Open to meaningful projects, engineering opportunities, and interesting conversations.
                      </p>

                      {/* Interactive Direct Action Link Bar */}
                      <div className="flex flex-wrap items-center gap-3 pt-2">
                        {/* Direct Email Link with arrow hover shift */}
                        <a
                          href={`mailto:${profileData.contact.email}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            sound.playOpen();
                          }}
                          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/35 border border-cyan-400/40 text-cyan-100 hover:text-white text-xs font-mono font-medium transition-all group/mail hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(6,182,212,0.2)]"
                          title={`Email ${profileData.contact.email}`}
                        >
                          <Mail className="w-3.5 h-3.5 text-cyan-400" />
                          <span>{profileData.contact.email}</span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-cyan-300 group-hover/mail:translate-x-1 group-hover/mail:-translate-y-1 transition-transform" />
                        </a>

                        {/* GitHub Profile */}
                        <a
                          href={profileData.contact.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => {
                            e.stopPropagation();
                            sound.playOpen();
                          }}
                          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.04] hover:bg-white/10 border border-white/10 text-xs font-mono text-zinc-300 hover:text-white transition-all group/gh hover:scale-105 active:scale-95"
                          title="View GitHub Profile"
                        >
                          <GitHubIcon className="w-3.5 h-3.5" />
                          <span>GitHub</span>
                          <span className="opacity-0 group-hover/gh:opacity-100 group-hover/gh:translate-x-0.5 transition-all text-cyan-400 text-[10px]">
                            ↗
                          </span>
                        </a>

                        {/* LinkedIn Profile */}
                        <a
                          href={profileData.contact.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => {
                            e.stopPropagation();
                            sound.playOpen();
                          }}
                          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.04] hover:bg-white/10 border border-white/10 text-xs font-mono text-zinc-300 hover:text-white transition-all group/li hover:scale-105 active:scale-95"
                          title="View LinkedIn Profile"
                        >
                          <LinkedInIcon className="w-3.5 h-3.5" />
                          <span>LinkedIn</span>
                          <span className="opacity-0 group-hover/li:opacity-100 group-hover/li:translate-x-0.5 transition-all text-indigo-400 text-[10px]">
                            ↗
                          </span>
                        </a>

                        {/* Résumé / CV with restrained underline animation */}
                        <a
                          href={profileData.contact.cvUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => {
                            e.stopPropagation();
                            sound.playOpen();
                          }}
                          className="relative inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.04] hover:bg-white/10 border border-white/10 text-xs font-mono text-zinc-300 hover:text-white transition-all group/cv hover:scale-105 active:scale-95"
                          title="Download Résumé / CV (PDF)"
                        >
                          <FileDown className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Résumé</span>
                          <span className="absolute bottom-1.5 left-3 right-3 h-[1px] bg-emerald-400 origin-left scale-x-0 group-hover/cv:scale-x-100 transition-transform duration-300 ease-out pointer-events-none" />
                        </a>
                      </div>
                    </div>

                    {/* BOTTOM ROW: Telemetry & Full Page Invite */}
                    <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pt-3.5 border-t border-white/10 text-[10px] sm:text-xs font-mono text-zinc-400">
                      <div className="flex items-center gap-4">
                        <span className="text-zinc-300">
                          <span className="text-zinc-500 mr-1.5">LOCATION:</span>
                          Phnom Penh, Cambodia (UTC+7 / Remote)
                        </span>
                        <span className="hidden md:inline-block text-zinc-600">•</span>
                        <span className="hidden md:inline-block text-zinc-300">
                          <span className="text-zinc-500 mr-1.5">RESPONSE:</span>
                          &lt; 24h turnaround
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 text-cyan-400 font-semibold group-hover:text-cyan-300 transition-colors">
                        <span className="text-[10px] sm:text-xs tracking-wider uppercase">
                          Open Full Contact Page
                        </span>
                        <div className="w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* ---------------- STANDARD PROJECT / SYSTEM PREVIEW ---------------- */
                  <>
                    {/* Full-bleed cover image */}
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      sizes="(max-width: 768px) 340px, (max-width: 1200px) 700px, 800px"
                      className="object-cover select-none pointer-events-none"
                      priority={isCenter}
                    />

                    {/* Dark gradient vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/20 pointer-events-none" />

                    {/* Hardware-accelerated dark overlay */}
                    <div
                      className="absolute inset-0 bg-black pointer-events-none"
                      style={{ opacity: darkOverlayOpacity }}
                    />

                    {/* Cylindrical curvature shading */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          relAngle < 0
                            ? "linear-gradient(90deg, rgba(0,0,0,0.45) 0%, transparent 60%)"
                            : relAngle > 0
                            ? "linear-gradient(270deg, rgba(0,0,0,0.45) 0%, transparent 60%)"
                            : "radial-gradient(ellipse at center, rgba(255,255,255,0.06) 0%, transparent 80%)",
                      }}
                    />

                    {/* Category pill */}
                    <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex items-center gap-2 pointer-events-none">
                      <span className="px-3 py-1 rounded-full text-[10px] sm:text-xs font-mono bg-black/60 backdrop-blur-md border border-white/15 text-white/90">
                        {card.category}
                      </span>
                    </div>

                    {/* Top right expand arrow indicator */}
                    {isCenter && !isAnyExpanded && (
                      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:scale-110 hover:bg-indigo-600 transition-all shadow-lg pointer-events-none">
                        <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                    )}

                    {/* Centered bold editorial typography */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 pointer-events-none">
                      <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-wider text-white uppercase drop-shadow-2xl font-sans">
                        {card.title}
                      </h2>
                      <p className="text-xs sm:text-sm font-mono text-zinc-300 tracking-wide mt-1.5 opacity-90 drop-shadow-md">
                        {card.subtitle}
                      </p>
                    </div>

                    {/* Bottom strip */}
                    <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-xs font-mono text-zinc-400 pointer-events-none">
                      <span className="truncate text-[11px] sm:text-xs text-zinc-300">
                        {card.tag}
                      </span>
                      {isCenter && !isAnyExpanded && (
                        <span className="hidden sm:inline text-indigo-400 font-semibold">
                          Click to expand ↗
                        </span>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ---------------- HARDWARE-ACCELERATED 3D EXPANDED CARD OVERLAY ---------------- */}
      <AnimatePresence>
        {isAnyExpanded && displayCard && (
          <motion.div
            key="carousel-expanded-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 pointer-events-auto bg-black/85"
            onClick={() => {
              sound.playClose();
              onCloseCard();
            }}
          >
            {/* The Expanded Floating Card (Pure GPU transform scale & translate) */}
            <motion.div
              key={`card-${displayCard.id}`}
              initial={{ opacity: 0, scale: 0.88, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{
                opacity: 0,
                scale: 0.85,
                y: 10,
                transition: { duration: 0.16, ease: "easeOut" },
              }}
              transition={{
                type: "spring",
                stiffness: 440,
                damping: 32,
                mass: 0.7,
              }}
              onClick={(e) => e.stopPropagation()}
              className={`relative z-10 w-full overflow-hidden rounded-[32px] sm:rounded-[36px] bg-[#0c0e16] border border-white/20 shadow-[0_30px_100px_rgba(0,0,0,0.98)] will-change-transform ${
                displayCard.type === "about"
                  ? "max-w-5xl max-h-[88vh]"
                  : "max-w-4xl max-h-[86vh]"
              }`}
            >
              {/* Card Top Sticky Header */}
              <div className="sticky top-0 z-30 flex items-center justify-between px-6 sm:px-8 py-4 bg-[#0c0e16] border-b border-white/10 shrink-0">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      sound.playClose();
                      onCloseCard();
                    }}
                    className="flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors group"
                  >
                    <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:bg-white/10 transition-colors">
                      <ArrowLeft className="w-3.5 h-3.5" />
                    </div>
                    <span className="hidden sm:inline font-semibold">
                      Back to 3D Cards
                    </span>
                  </button>

                  <span className="text-zinc-600 hidden sm:inline">•</span>

                  <span className="text-xs font-mono text-indigo-400 font-medium">
                    {displayCard.category}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      sound.playClose();
                      onCloseCard();
                    }}
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white transition-all hover:scale-105 active:scale-95"
                    title="Close (Esc)"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Scrollable Content Container */}
              <div className="overflow-y-auto p-6 sm:p-8 custom-scrollbar max-h-[calc(88vh-64px)]">
                {/* 0. PROJECTS GATEWAY VIEW */}
                {displayCard.type === "projects" && (
                  <div className="flex flex-col items-center justify-center p-8 sm:p-14 text-center space-y-6">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-cyan-500/15 border-2 border-cyan-500/35 flex items-center justify-center text-cyan-300 text-3xl font-black shadow-[0_0_35px_rgba(6,182,212,0.35)]">
                      ⌘
                    </div>
                    <div className="space-y-3 max-w-lg">
                      <div className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400">
                        Interactive System Portfolio
                      </div>
                      <h3 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white font-sans">
                        Moving Circuit Canvas
                      </h3>
                      <p className="text-sm sm:text-base text-zinc-300 font-mono leading-relaxed">
                        Explore 5 production builds arranged along an alternating technical circuit with inertia physics, 45° bends, and deep architectural case studies.
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                      <Link
                        href="/projects"
                        onClick={() => {
                          sound.playOpen();
                          onCloseCard();
                        }}
                        className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/40 text-cyan-200 font-mono font-bold uppercase text-xs sm:text-sm tracking-wider hover:scale-105 transition-all shadow-[0_0_25px_rgba(6,182,212,0.3)]"
                      >
                        <span>Launch Moving Canvas</span>
                        <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                      </Link>

                      <button
                        type="button"
                        onClick={() => {
                          sound.playClose();
                          onCloseCard();
                        }}
                        className="px-5 py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-white font-mono text-xs uppercase tracking-wider transition-colors"
                      >
                        Stay in 3D Cards
                      </button>
                    </div>
                  </div>
                )}

                {/* 1. PERSONAL IDENTITY DOSSIER (IDENTITY CARD V1) */}
                {displayCard.type === "about" && (
                  <PersonalIdentityView
                    onClose={() => {
                      sound.playClose();
                      onCloseCard();
                    }}
                    onSelectProject={(project) => {
                      if (onSelectProject) onSelectProject(project);
                    }}
                  />
                )}

                {/* 2. PROJECT VIEW */}
                {displayCard.type === "project" && displayCard.project && (
                  <ProjectDetailView
                    project={displayCard.project}
                    onClose={() => {
                      sound.playClose();
                      onCloseCard();
                    }}
                    onSelectProject={onSelectProject}
                  />
                )}

                {/* 3. SKILLS VIEW */}
                {displayCard.type === "skills" && (
                  <SkillsDetailView
                    onClose={() => {
                      sound.playClose();
                      onCloseCard();
                    }}
                    onSelectProject={(slug) => {
                      const found = projectsData.find((p) => p.slug === slug);
                      if (found && onSelectProject) onSelectProject(found);
                    }}
                  />
                )}

                {/* 4. JOURNEY VIEW */}
                {displayCard.type === "journey" && (
                  <JourneyDetailView
                    onClose={() => {
                      sound.playClose();
                      onCloseCard();
                    }}
                  />
                )}

                {/* 5. CONTACT VIEW */}
                {displayCard.type === "contact" && (
                  <ContactDetailView
                    onClose={() => {
                      sound.playClose();
                      onCloseCard();
                    }}
                  />
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Arrows for accessibility */}
      <div
        className={`transition-opacity duration-200 ${
          isAnyExpanded ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"
        }`}
      >
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            prevCard();
          }}
          className="absolute left-3 sm:left-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/60 hover:bg-black/90 border border-white/15 backdrop-blur-md flex items-center justify-center text-white/80 hover:text-white transition-all hover:scale-105 active:scale-95 shadow-xl"
          title="Previous Card (Left Arrow)"
          aria-label="Previous card"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            nextCard();
          }}
          className="absolute right-3 sm:right-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/60 hover:bg-black/90 border border-white/15 backdrop-blur-md flex items-center justify-center text-white/80 hover:text-white transition-all hover:scale-105 active:scale-95 shadow-xl"
          title="Next Card (Right Arrow)"
          aria-label="Next card"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Bottom Arc Curve & Category Label */}
      <div
        className={`absolute bottom-3 sm:bottom-6 left-0 right-0 flex flex-col items-center z-30 transition-opacity duration-200 ${
          isAnyExpanded ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"
        }`}
      >
        <div className="relative w-36 sm:w-48 h-6 flex items-center justify-center mb-1 pointer-events-none">
          <svg
            className="w-full h-full overflow-visible"
            viewBox="0 0 100 24"
            fill="none"
          >
            <path
              d="M 10 20 Q 50 4 90 20"
              stroke="rgba(255, 255, 255, 0.15)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M 10 20 Q 50 4 90 20"
              stroke="#6366f1"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray="80"
              strokeDashoffset={80 - (activeIdx / (numCards - 1)) * 80}
              className="transition-all duration-300 drop-shadow-[0_0_8px_rgba(99,102,241,0.6)]"
            />
          </svg>
        </div>

        <button
          type="button"
          onClick={() => {
            sound.playOpen();
            onOpenCard(activeCard);
          }}
          className="pointer-events-auto px-5 py-2 rounded-full bg-black/80 hover:bg-white/10 border border-white/20 backdrop-blur-md text-xs sm:text-sm font-sans tracking-wide text-white transition-all hover:scale-105 shadow-xl"
        >
          <span>{activeCard.category}</span>
        </button>

        <div className="flex items-center gap-1.5 mt-3 pointer-events-auto">
          {CAROUSEL_CARDS.map((c, i) => (
            <button
              key={c.id}
              onClick={() => goToIndex(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === activeIdx
                  ? "w-6 bg-white"
                  : "w-1.5 bg-white/20 hover:bg-white/50"
              }`}
              title={c.title}
              aria-label={`Jump to ${c.title}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
