"use client";

import { useMemo } from "react";
import { Project } from "@/data/projects";
import { TechIcon } from "@/components/icons/TechIcons";

interface TechIconRailsProps {
  project: Project;
}

export function TechIconRails({ project }: TechIconRailsProps) {
  // Extract all unique technologies from project tech stack
  const { leftRailTechs, rightRailTechs } = useMemo(() => {
    const all = project.techStack.flatMap((c) => c.items);
    const unique = Array.from(new Set(all));

    // Fallbacks if list is short
    const defaultFrontends = ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"];
    const defaultBackends = ["Node.js", "PostgreSQL", "Prisma", "Redis", "Docker", "Vercel"];

    const frontends = unique.filter((t) => {
      const lower = t.toLowerCase();
      return (
        lower.includes("react") ||
        lower.includes("next") ||
        lower.includes("type") ||
        lower.includes("tail") ||
        lower.includes("css") ||
        lower.includes("ui") ||
        lower.includes("motion") ||
        lower.includes("font") ||
        lower.includes("icon") ||
        lower.includes("canvas") ||
        lower.includes("map")
      );
    });

    const backends = unique.filter((t) => !frontends.includes(t));

    const left = frontends.length >= 3 ? frontends : [...frontends, ...defaultFrontends.filter((d) => !frontends.includes(d))];
    const right = backends.length >= 3 ? backends : [...backends, ...defaultBackends.filter((d) => !backends.includes(d))];

    return {
      leftRailTechs: left.slice(0, 7),
      rightRailTechs: right.slice(0, 7),
    };
  }, [project]);

  // Duplicate for seamless 50% translation loop without jumps
  const leftLoop = [...leftRailTechs, ...leftRailTechs];
  const rightLoop = [...rightRailTechs, ...rightRailTechs];

  return (
    <>
      {/* ---------------- CSS KEYFRAME ANIMATIONS & STYLES ---------------- */}
      <style>{`
        @keyframes railScrollUp {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }

        @keyframes railScrollDown {
          0% { transform: translateY(-50%); }
          100% { transform: translateY(0); }
        }

        @keyframes railScrollHorizontal {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .animate-rail-up {
          animation: railScrollUp 30s linear infinite;
        }

        .animate-rail-down {
          animation: railScrollDown 30s linear infinite;
        }

        .animate-rail-horiz {
          animation: railScrollHorizontal 26s linear infinite;
        }

        .rail-track:hover .animate-rail-up,
        .rail-track:hover .animate-rail-down,
        .rail-track:hover .animate-rail-horiz {
          animation-play-state: paused;
        }

        .rail-mask-vertical {
          mask-image: linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%);
          -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%);
        }

        .rail-mask-horizontal {
          mask-image: linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%);
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%);
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-rail-up,
          .animate-rail-down,
          .animate-rail-horiz {
            animation: none !important;
          }
        }
      `}</style>

      {/* ---------------- 1. LEFT VERTICAL RAIL (SCROLLS UPWARD) ---------------- */}
      <aside
        aria-label="Frontend Technologies Rail"
        className="hidden xl:flex fixed left-3 2xl:left-6 top-24 bottom-24 w-14 z-30 pointer-events-auto flex-col items-center justify-center rail-track opacity-45 hover:opacity-100 transition-opacity duration-300"
      >
        <div className="w-full h-full overflow-hidden rail-mask-vertical flex flex-col justify-center">
          <div className="animate-rail-up flex flex-col gap-3 py-4 items-center will-change-transform">
            {leftLoop.map((tech, idx) => (
              <div
                key={`left-${idx}`}
                className="group relative w-11 h-11 rounded-2xl bg-[#090b14]/85 backdrop-blur-md border border-white/10 hover:border-cyan-400/50 hover:bg-white/10 transition-all flex items-center justify-center text-zinc-400 hover:text-white shadow-sm cursor-default"
                title={tech}
              >
                <TechIcon name={tech} className="w-5 h-5 transition-transform group-hover:scale-110" />

                {/* Micro Tooltip */}
                <span className="pointer-events-none absolute left-14 px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider bg-black/90 text-cyan-300 border border-white/15 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
                  {tech}
                </span>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* ---------------- 2. RIGHT VERTICAL RAIL (SCROLLS DOWNWARD) ---------------- */}
      <aside
        aria-label="Backend and Infrastructure Technologies Rail"
        className="hidden xl:flex fixed right-3 2xl:right-6 top-24 bottom-24 w-14 z-30 pointer-events-auto flex-col items-center justify-center rail-track opacity-45 hover:opacity-100 transition-opacity duration-300"
      >
        <div className="w-full h-full overflow-hidden rail-mask-vertical flex flex-col justify-center">
          <div className="animate-rail-down flex flex-col gap-3 py-4 items-center will-change-transform">
            {rightLoop.map((tech, idx) => (
              <div
                key={`right-${idx}`}
                className="group relative w-11 h-11 rounded-2xl bg-[#090b14]/85 backdrop-blur-md border border-white/10 hover:border-indigo-400/50 hover:bg-white/10 transition-all flex items-center justify-center text-zinc-400 hover:text-white shadow-sm cursor-default"
                title={tech}
              >
                <TechIcon name={tech} className="w-5 h-5 transition-transform group-hover:scale-110" />

                {/* Micro Tooltip */}
                <span className="pointer-events-none absolute right-14 px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider bg-black/90 text-indigo-300 border border-white/15 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
                  {tech}
                </span>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}

/**
 * Mobile Horizontal Rail Strip (clean responsive strip when screen is < xl)
 */
export function TechIconHorizontalStrip({ project }: TechIconRailsProps) {
  const allTechs = useMemo(() => {
    const list = project.techStack.flatMap((c) => c.items);
    return Array.from(new Set(list)).slice(0, 10);
  }, [project]);

  const loop = [...allTechs, ...allTechs];

  return (
    <div className="xl:hidden w-full overflow-hidden rail-mask-horizontal py-4 my-6 rail-track opacity-60 hover:opacity-100 transition-opacity">
      <div className="animate-rail-horiz flex items-center gap-4 w-max will-change-transform">
        {loop.map((tech, idx) => (
          <div
            key={`mobile-${idx}`}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-xs font-mono text-zinc-300 shrink-0"
          >
            <TechIcon name={tech} className="w-3.5 h-3.5 text-cyan-400" />
            <span>{tech}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
