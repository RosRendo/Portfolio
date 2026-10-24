"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { profileData } from "@/data/profile";
import { sound } from "@/lib/sound";
import { GitHubIcon, LinkedInIcon } from "@/components/icons/SocialIcons";
import {
  ArrowLeft,
  BookOpen,
  Check,
  CheckCircle2,
  Compass,
  Copy,
  Cpu,
  ExternalLink,
  FileDown,
  Mail,
  MapPin,
  Sparkles,
  X,
} from "lucide-react";

interface FloatingAboutCardProps {
  onClose: () => void;
}

export function FloatingAboutCard({ onClose }: FloatingAboutCardProps) {
  const [activeTab, setActiveTab] = useState<"story" | "principles" | "focus" | "connect">("story");
  const [copied, setCopied] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0, glareX: 50, glareY: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const { bio, contact, status } = profileData;

  // ESC key listener & body scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        sound.playClose();
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    const orig = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = orig;
    };
  }, [onClose]);

  // 3D Mouse Parallax & Specular Glare calculation
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -7; // max 7 deg tilt
    const rotateY = ((x - centerX) / centerX) * 7;

    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    setTilt({ x: rotateX, y: rotateY, glareX, glareY });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0, glareX: 50, glareY: 50 });
  };

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(contact.email);
    sound.playSuccess();
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 select-none overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="About ROS RENDO Floating Profile Card"
    >
      {/* Backdrop Dim & Blur */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={() => {
          sound.playClose();
          onClose();
        }}
        className="fixed inset-0 bg-black/80 backdrop-blur-md"
        aria-hidden="true"
      />

      {/* Floating 3D Holographic Card Container */}
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{
          opacity: 1,
          scale: 1,
          y: isHovered ? 0 : [0, -6, 0],
        }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{
          y: {
            repeat: Infinity,
            repeatType: "reverse",
            duration: 4,
            ease: "easeInOut",
          },
          scale: { type: "spring", stiffness: 320, damping: 28 },
          opacity: { duration: 0.25 },
        }}
        style={{
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transformStyle: "preserve-3d",
          transition: isHovered ? "none" : "transform 0.5s ease-out",
        }}
        className="relative z-10 w-full max-w-2xl rounded-[32px] bg-[#0c0e16]/95 border border-white/20 p-6 sm:p-8 shadow-[0_25px_80px_-15px_rgba(0,0,0,0.95)] overflow-hidden"
      >
        {/* Dynamic Specular Glare following mouse */}
        <div
          className="absolute inset-0 pointer-events-none rounded-[32px] opacity-25 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 350px at ${tilt.glareX}% ${tilt.glareY}%, rgba(255, 255, 255, 0.22), transparent 70%)`,
          }}
        />

        {/* Ambient interior halo glow */}
        <div className="ambient-glow -top-24 -right-24 w-64 h-64 bg-indigo-500/25 pointer-events-none" />
        <div className="ambient-glow -bottom-24 -left-24 w-64 h-64 bg-cyan-500/20 pointer-events-none" />

        {/* Floating Close Button */}
        <button
          type="button"
          onClick={() => {
            sound.playClose();
            onClose();
          }}
          className="absolute top-5 right-5 sm:top-6 sm:right-6 z-30 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white/80 hover:text-white transition-all hover:scale-105 active:scale-95 shadow-md"
          title="Close card (Esc)"
          aria-label="Close card"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Card Header: Avatar & Identity Lockup */}
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center gap-5 pb-6 border-b border-white/10">
          <div className="relative w-20 h-20 sm:w-22 sm:h-22 rounded-2xl overflow-hidden border-2 border-indigo-500/40 shadow-xl shadow-indigo-500/10 shrink-0">
            <Image
              src="/images/avatar.jpg"
              alt="ROS RENDO portrait"
              fill
              sizes="88px"
              className="object-cover"
              priority
            />
          </div>

          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                {profileData.name}
              </h2>
              <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                <Sparkles className="w-2.5 h-2.5" /> Builder
              </span>
            </div>

            <p className="text-xs sm:text-sm text-zinc-300 font-mono">
              {profileData.role}
            </p>

            <div className="flex items-center gap-3 pt-1 text-xs font-mono">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Available for Roles
              </span>
              <span className="text-zinc-600">•</span>
              <span className="flex items-center gap-1 text-zinc-400">
                <MapPin className="w-3 h-3 text-zinc-400" />
                Phnom Penh, Cambodia
              </span>
            </div>
          </div>
        </div>

        {/* Segmented Tab Navigation inside Floating Card */}
        <div className="relative z-10 flex items-center gap-1 p-1 rounded-2xl bg-black/50 border border-white/10 my-5 text-xs font-mono">
          <button
            type="button"
            onClick={() => {
              sound.playTab();
              setActiveTab("story");
            }}
            className={`flex-1 py-1.5 px-3 rounded-xl transition-all ${
              activeTab === "story"
                ? "bg-white/15 text-white font-medium shadow-sm border border-white/10"
                : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
            }`}
          >
            Story
          </button>

          <button
            type="button"
            onClick={() => {
              sound.playTab();
              setActiveTab("principles");
            }}
            className={`flex-1 py-1.5 px-3 rounded-xl transition-all ${
              activeTab === "principles"
                ? "bg-white/15 text-white font-medium shadow-sm border border-white/10"
                : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
            }`}
          >
            Principles
          </button>

          <button
            type="button"
            onClick={() => {
              sound.playTab();
              setActiveTab("focus");
            }}
            className={`flex-1 py-1.5 px-3 rounded-xl transition-all ${
              activeTab === "focus"
                ? "bg-white/15 text-white font-medium shadow-sm border border-white/10"
                : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
            }`}
          >
            Focus
          </button>

          <button
            type="button"
            onClick={() => {
              sound.playTab();
              setActiveTab("connect");
            }}
            className={`flex-1 py-1.5 px-3 rounded-xl transition-all ${
              activeTab === "connect"
                ? "bg-white/15 text-white font-medium shadow-sm border border-white/10"
                : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
            }`}
          >
            Connect
          </button>
        </div>

        {/* Tab Content Panels */}
        <div className="relative z-10 min-h-[200px]">
          <AnimatePresence mode="wait">
            {activeTab === "story" && (
              <motion.div
                key="story"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                <p className="text-sm text-zinc-300 leading-relaxed font-normal">
                  {bio.intro}
                </p>

                {/* Core philosophy quote */}
                <div className="p-4 rounded-2xl bg-indigo-500/[0.07] border border-indigo-500/20 text-xs sm:text-sm text-indigo-200 font-mono">
                  &ldquo;Architecture before syntax: Spend time modeling relations in PostgreSQL before writing business logic.&rdquo;
                </div>

                {/* Key Tags */}
                <div className="flex flex-wrap gap-2 text-xs font-mono text-zinc-400 pt-1">
                  <span className="px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                    Node.js & Express
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                    PostgreSQL / Prisma
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                    Next.js & TypeScript
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                    Docker & Linux
                  </span>
                </div>
              </motion.div>
            )}

            {activeTab === "principles" && (
              <motion.div
                key="principles"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="space-y-2.5"
              >
                {bio.philosophy.map((item, idx) => {
                  const [title, desc] = item.split(":");
                  return (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs sm:text-sm"
                    >
                      <div className="font-semibold text-white flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                        <span>{title}</span>
                      </div>
                      <p className="text-zinc-400 text-xs mt-1 pl-5.5">
                        {desc}
                      </p>
                    </div>
                  );
                })}
              </motion.div>
            )}

            {activeTab === "focus" && (
              <motion.div
                key="focus"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-2.5"
              >
                {bio.focusAreas.map((area, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-1"
                  >
                    <div className="text-xs font-semibold text-white">
                      {area.title}
                    </div>
                    <p className="text-[11px] sm:text-xs text-zinc-400 leading-relaxed">
                      {area.description}
                    </p>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === "connect" && (
              <motion.div
                key="connect"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                {/* 1-click email copy */}
                <div
                  onClick={handleCopyEmail}
                  className="cursor-pointer flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-indigo-500/40 hover:bg-indigo-500/[0.08] transition-all"
                  title="Click to copy email"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span className="text-xs font-mono text-zinc-200 truncate">
                      {contact.email}
                    </span>
                  </div>

                  <button
                    type="button"
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-mono bg-white/[0.05] text-zinc-300"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-zinc-400" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Profiles & CV */}
                <div className="grid grid-cols-3 gap-2">
                  <a
                    href={contact.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/20 hover:bg-white/[0.06] text-xs font-mono text-zinc-300 transition-all"
                  >
                    <GitHubIcon className="w-3.5 h-3.5" />
                    <span>GitHub</span>
                  </a>

                  <a
                    href={contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/20 hover:bg-white/[0.06] text-xs font-mono text-sky-400 transition-all"
                  >
                    <LinkedInIcon className="w-3.5 h-3.5" />
                    <span>LinkedIn</span>
                  </a>

                  <a
                    href={contact.cvUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/20 hover:bg-white/[0.06] text-xs font-mono text-indigo-300 transition-all"
                  >
                    <FileDown className="w-3.5 h-3.5" />
                    <span>CV</span>
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Card Footer */}
        <div className="relative z-10 pt-5 mt-5 border-t border-white/10 flex items-center justify-between text-xs font-mono text-zinc-400">
          <button
            type="button"
            onClick={() => {
              sound.playClose();
              onClose();
            }}
            className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-semibold transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to 3D Cards</span>
          </button>

          <span className="text-[11px] text-zinc-500">
            Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/15 text-zinc-300">Esc</kbd>
          </span>
        </div>
      </motion.div>
    </div>
  );
}
