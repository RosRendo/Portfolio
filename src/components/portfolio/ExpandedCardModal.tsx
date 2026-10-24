"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sound } from "@/lib/sound";
import { Project } from "@/data/projects";
import { ProjectDetailView } from "./ProjectDetailView";
import { AboutDetailView } from "./AboutDetailView";
import { SkillsDetailView } from "./SkillsDetailView";
import { JourneyDetailView } from "./JourneyDetailView";
import { ContactDetailView } from "./ContactDetailView";
import { X } from "lucide-react";

export type ModalViewType = "about" | "project" | "skills" | "journey" | "contact" | null;

interface ExpandedCardModalProps {
  viewType: ModalViewType;
  project: Project | null;
  onClose: () => void;
  onSelectProject?: (project: Project) => void;
}

export function ExpandedCardModal({
  viewType,
  project,
  onClose,
  onSelectProject,
}: ExpandedCardModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Determine layoutId matching the card being opened
  const getLayoutId = () => {
    if (viewType === "about") return "card-about";
    if (viewType === "skills") return "card-skills";
    if (viewType === "journey") return "card-journey";
    if (viewType === "contact") return "card-contact";
    if (viewType === "project" && project) return `card-project-${project.id}`;
    return undefined;
  };

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

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [viewType, onClose]);

  const handleClose = () => {
    sound.playClose();
    onClose();
  };

  return (
    <AnimatePresence>
      {viewType && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10"
          role="dialog"
          aria-modal="true"
        >
          {/* Backdrop Blur & Dim */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Expanded Modal Card with Shared Layout */}
          <motion.div
            ref={modalRef}
            layoutId={getLayoutId()}
            transition={{
              type: "spring",
              stiffness: 340,
              damping: 32,
            }}
            className="relative z-10 w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#0f111a] border border-white/15 p-6 sm:p-10 shadow-2xl shadow-black/95 outline-none custom-scrollbar"
            tabIndex={-1}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Ambient interior lighting */}
            <div className="ambient-glow -top-32 -right-32 w-80 h-80 bg-indigo-500/20" />

            {/* Floating Close Button */}
            <button
              id="modal-close-button"
              type="button"
              onClick={handleClose}
              className="sticky top-0 float-right -mt-2 -mr-2 sm:-mt-4 sm:-mr-4 z-30 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md flex items-center justify-center text-white transition-all hover:scale-105 active:scale-95 shadow-lg"
              title="Close modal (Esc)"
              aria-label="Close detail view"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Sequenced content entrance */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ delay: 0.15, duration: 0.3 }}
              className="relative z-10"
            >
              {viewType === "project" && project && (
                <ProjectDetailView project={project} onClose={handleClose} />
              )}
              {viewType === "about" && (
                <AboutDetailView onClose={handleClose} />
              )}
              {viewType === "skills" && (
                <SkillsDetailView
                  onClose={handleClose}
                  onSelectProject={(slug) => {
                    // Navigate to project if needed
                  }}
                />
              )}
              {viewType === "journey" && (
                <JourneyDetailView onClose={handleClose} />
              )}
              {viewType === "contact" && (
                <ContactDetailView onClose={handleClose} />
              )}
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
