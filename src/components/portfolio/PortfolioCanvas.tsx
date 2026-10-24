"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { profileData } from "@/data/profile";
import { Project, projectsData } from "@/data/projects";
import { sound } from "@/lib/sound";
import { SoundToggle } from "./SoundToggle";
import { StatusIndicator } from "./StatusIndicator";
import { Curved3DCarousel, CarouselCard, CAROUSEL_CARDS } from "./Curved3DCarousel";
import { GitHubIcon } from "@/components/icons/SocialIcons";
import { FileDown } from "lucide-react";

export type DetailViewType = "about" | "project" | "skills" | "journey" | "contact" | null;

interface PortfolioCanvasProps {
  initialView?: DetailViewType;
  initialProjectSlug?: string;
}

export function PortfolioCanvas({
  initialView = null,
  initialProjectSlug,
}: PortfolioCanvasProps) {
  const router = useRouter();
  const [activeView, setActiveView] = useState<DetailViewType>(initialView);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  // Synchronize initial project slug
  useEffect(() => {
    if (initialProjectSlug) {
      const found = projectsData.find((p) => p.slug === initialProjectSlug);
      if (found) {
        setActiveProject(found);
        setActiveView("project");
      }
    } else if (initialView) {
      setActiveView(initialView);
      if (initialView === "project") {
        setActiveProject(projectsData[0]);
      }
    }
  }, [initialView, initialProjectSlug]);

  // Handle browser back/forward (popstate)
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === "/about") {
        setActiveView("about");
        setActiveProject(null);
      } else if (path === "/skills") {
        setActiveView("skills");
        setActiveProject(null);
      } else if (path === "/contact") {
        setActiveView("contact");
        setActiveProject(null);
      } else if (path === "/journey") {
        setActiveView("journey");
        setActiveProject(null);
      } else if (path.startsWith("/projects/")) {
        const slug = path.replace("/projects/", "");
        const found = projectsData.find((p) => p.slug === slug);
        if (found) {
          setActiveProject(found);
          setActiveView("project");
        }
      } else if (path === "/projects") {
        setActiveProject(projectsData[0]);
        setActiveView("project");
      } else {
        setActiveView(null);
        setActiveProject(null);
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const openView = (view: DetailViewType, project?: Project) => {
    setActiveView(view);
    if (project) {
      setActiveProject(project);
      window.history.pushState(null, "", `/projects/${project.slug}`);
    } else if (view === "about") {
      window.history.pushState(null, "", "/about");
    } else if (view === "skills") {
      window.history.pushState(null, "", "/skills");
    } else if (view === "journey") {
      window.history.pushState(null, "", "/about");
    } else if (view === "contact") {
      window.history.pushState(null, "", "/contact");
    }
  };

  const closeView = () => {
    setActiveView(null);
    setActiveProject(null);
    window.history.pushState(null, "", "/");
  };

  const handleSelectCard = (card: CarouselCard) => {
    sound.playOpen();
    if (card.type === "projects" || card.id === "projects") {
      router.push("/projects");
    } else if (card.type === "project" && card.project) {
      router.push(`/projects/${card.project.slug}`);
    } else if (card.type === "about" || card.id === "about") {
      router.push("/about");
    } else if (card.type === "journey" || card.id === "journey") {
      router.push("/about");
    } else if (card.type === "skills" || card.id === "skills") {
      router.push("/skills");
    } else if (card.type === "contact" || card.id === "contact") {
      router.push("/contact");
    }
  };

  // Derive which 3D cylinder card ID is currently expanded in 3D
  const getExpandedCardId = (): string | null => {
    if (activeView === "about") return "about";
    if (activeView === "skills") return "skills";
    if (activeView === "journey") return "journey";
    if (activeView === "contact") return "contact";
    if (activeView === "project" && activeProject) return activeProject.id;
    return null;
  };

  const isExpanded = getExpandedCardId() !== null;

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black text-white select-none">
      {/* Background ambient lighting */}
      <div className="ambient-glow top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-indigo-600/10 pointer-events-none" />

      {/* Top Header */}
      <header className="absolute top-0 left-0 right-0 z-40 p-6 sm:p-10 flex items-start justify-between pointer-events-none transition-opacity duration-300">
        {/* Top-Left: Identity */}
        <div className="pointer-events-auto">
          <Link
            href="/"
            onClick={() => {
              if (activeView) closeView();
            }}
            className="group block"
          >
            <div className="text-base sm:text-lg font-bold tracking-tight text-white group-hover:text-indigo-300 transition-colors">
              {profileData.name}
            </div>
            <div className="text-xs sm:text-sm text-zinc-400 font-mono">
              {profileData.role}
            </div>
          </Link>

          {/* Availability beacon */}
          <div className="mt-2.5">
            <StatusIndicator />
          </div>
        </div>

        {/* Top-Right: Minimal Navigation & Controls (Direct Links to Dedicated Pages) */}
        <nav className="pointer-events-auto flex items-center gap-3 sm:gap-6 text-xs sm:text-sm font-sans tracking-wide">
          <Link
            href="/projects"
            onClick={() => sound.playOpen()}
            className="flex items-center gap-1.5 text-zinc-300 hover:text-white transition-colors font-medium group"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 group-hover:scale-125 transition-transform animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
            <span>Projects</span>
          </Link>

          <Link
            href="/about"
            onClick={() => sound.playOpen()}
            className="text-zinc-300 hover:text-white transition-colors font-medium"
          >
            About
          </Link>

          <Link
            href="/skills"
            onClick={() => sound.playOpen()}
            className="text-zinc-300 hover:text-white transition-colors font-medium hidden sm:inline"
          >
            Stack
          </Link>

          <Link
            href="/contact"
            onClick={() => sound.playOpen()}
            className="text-zinc-300 hover:text-white transition-colors font-medium"
          >
            Contact
          </Link>

          <div className="h-4 w-[1px] bg-white/20 hidden sm:block" />

          {/* Sound Synthesizer Switch */}
          <SoundToggle />

          {/* GitHub Icon */}
          <a
            href={profileData.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-full text-zinc-400 hover:text-white transition-colors"
            title="GitHub Profile"
            aria-label="GitHub Profile"
          >
            <GitHubIcon className="w-4 h-4" />
          </a>

          {/* Resume PDF */}
          <a
            href={profileData.contact.cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/20 bg-white/[0.05] hover:bg-white/15 text-xs font-mono transition-colors"
          >
            <FileDown className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">CV</span>
          </a>
        </nav>
      </header>

      {/* The Unified 3D Stage (Where ALL card motion occurs natively) */}
      <main className="w-full h-full flex items-center justify-center">
        <Curved3DCarousel
          expandedCardId={getExpandedCardId()}
          onOpenCard={handleSelectCard}
          onCloseCard={closeView}
          onSelectProject={(p) => {
            sound.playOpen();
            router.push(`/projects/${p.slug}`);
          }}
        />
      </main>

      {/* Footer Minimal Copyright & Hint */}
      <footer
        className={`absolute bottom-3 left-6 right-6 hidden sm:flex items-center justify-between text-[11px] font-mono text-zinc-500 pointer-events-none z-20 transition-opacity duration-200 ${
          isExpanded ? "opacity-0" : "opacity-100"
        }`}
      >
        <div>Drag or swipe horizontally • Arrow keys or wheel to spin</div>
        <div>© 2026 {profileData.name}</div>
      </footer>
    </div>
  );
}
