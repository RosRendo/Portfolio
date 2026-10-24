"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sound } from "@/lib/sound";
import { Project, projectsData } from "@/data/projects";
import { profileData } from "@/data/profile";
import { ProjectDetailView } from "./ProjectDetailView";
import { AboutDetailView } from "./AboutDetailView";
import { SkillsDetailView } from "./SkillsDetailView";
import { JourneyDetailView } from "./JourneyDetailView";
import { ContactDetailView } from "./ContactDetailView";
import { GitHubIcon } from "@/components/icons/SocialIcons";
import { ArrowLeft, FileDown, Sparkles, X } from "lucide-react";

export type DetailViewType = "about" | "project" | "skills" | "journey" | "contact" | null;

interface FullBleedDetailViewProps {
  viewType: DetailViewType;
  project: Project | null;
  onClose: () => void;
  onSelectProject?: (project: Project) => void;
}

export function FullBleedDetailView({
  viewType,
  project,
  onClose,
  onSelectProject,
}: FullBleedDetailViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Keyboard navigation & lock body scroll
  useEffect(() => {
    if (!viewType) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        sound.playClose();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Scroll to top when opening a new view
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [viewType, onClose]);

  const handleClose = () => {
    sound.playClose();
    onClose();
  };

  if (!viewType) return null;

  // Title for header breadcrumb
  const getHeaderTitle = () => {
    if (viewType === "project" && project) return `Projects / ${project.title}`;
    if (viewType === "about") return "About / Engineering Ethos";
    if (viewType === "skills") return "Architecture / Technical Stack";
    if (viewType === "journey") return "Journey / Student & Builder Timeline";
    if (viewType === "contact") return "Contact / Direct Collaboration";
    return "";
  };

  return (
    <AnimatePresence>
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 16 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-50 overflow-y-auto bg-[#07080c] text-zinc-100 selection:bg-indigo-500/30 selection:text-white"
        role="dialog"
        aria-modal="true"
        aria-label={getHeaderTitle()}
      >
        {/* Subtle atmospheric background glows */}
        <div className="ambient-glow top-0 left-1/3 w-[650px] h-[650px] bg-indigo-600/10 pointer-events-none -translate-y-1/2" />
        <div className="ambient-glow top-1/2 right-0 w-[550px] h-[550px] bg-cyan-600/10 pointer-events-none" />

        {/* Sticky Minimalist Editorial Navigation Header */}
        <header className="sticky top-0 z-40 w-full bg-[#07080c]/85 backdrop-blur-xl border-b border-white/[0.08] px-6 sm:px-12 py-4 flex items-center justify-between transition-all">
          {/* Identity & Breadcrumb */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleClose}
              className="group flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
            >
              <div className="w-7 h-7 rounded-lg bg-white/[0.05] border border-white/10 flex items-center justify-center text-zinc-400 group-hover:text-white group-hover:border-white/20 transition-all">
                <ArrowLeft className="w-3.5 h-3.5" />
              </div>
              <span className="hidden sm:inline font-bold text-white">
                {profileData.name}
              </span>
            </button>

            <span className="text-zinc-600 hidden sm:inline">•</span>

            <span className="text-xs font-mono text-indigo-400 tracking-wide font-medium truncate max-w-[220px] sm:max-w-none">
              {getHeaderTitle()}
            </span>
          </div>

          {/* Quick Back & Action Controls */}
          <div className="flex items-center gap-3">
            {/* Direct Close Button */}
            <button
              id="fullscreen-close-btn"
              type="button"
              onClick={handleClose}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] hover:bg-white/15 border border-white/15 text-xs font-mono text-white transition-all hover:scale-105 active:scale-95 shadow-md"
              title="Return to 3D Cards (Esc)"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-indigo-400" />
              <span>Back to 3D Cards</span>
              <kbd className="hidden md:inline px-1 py-0.2 rounded bg-white/10 text-[10px] text-zinc-400">
                Esc
              </kbd>
            </button>

            {/* GitHub */}
            <a
              href={profileData.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-full text-zinc-400 hover:text-white transition-colors hidden sm:inline-block"
              title="GitHub Profile"
            >
              <GitHubIcon className="w-4 h-4" />
            </a>

            {/* Resume */}
            <a
              href={profileData.contact.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.04] hover:bg-white/10 text-xs font-mono text-zinc-300 transition-colors"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">CV</span>
            </a>
          </div>
        </header>

        {/* Main Editorial Case Study / Detail Content */}
        <main className="max-w-5xl mx-auto px-5 sm:px-10 lg:px-12 py-10 sm:py-16">
          {viewType === "project" && project && (
            <ProjectDetailView
              project={project}
              onClose={handleClose}
              onSelectProject={onSelectProject}
            />
          )}
          {viewType === "about" && (
            <AboutDetailView onClose={handleClose} />
          )}
          {viewType === "skills" && (
            <SkillsDetailView
              onClose={handleClose}
              onSelectProject={(slug) => {
                const found = projectsData.find((p) => p.slug === slug);
                if (found && onSelectProject) onSelectProject(found);
              }}
            />
          )}
          {viewType === "journey" && (
            <JourneyDetailView onClose={handleClose} />
          )}
          {viewType === "contact" && (
            <ContactDetailView onClose={handleClose} />
          )}
        </main>

        {/* Floating Bottom Return Pill */}
        <div className="fixed bottom-6 left-0 right-0 flex justify-center pointer-events-none z-40">
          <button
            type="button"
            onClick={handleClose}
            className="pointer-events-auto inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-black/85 hover:bg-black border border-white/20 hover:border-indigo-500/50 backdrop-blur-xl text-xs font-mono text-white shadow-2xl transition-all hover:scale-105 active:scale-95 group"
          >
            <ArrowLeft className="w-4 h-4 text-indigo-400 group-hover:-translate-x-1 transition-transform" />
            <span className="font-semibold">Return to 3D Cards</span>
            <span className="text-[10px] text-zinc-400 font-normal">Press Esc</span>
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
