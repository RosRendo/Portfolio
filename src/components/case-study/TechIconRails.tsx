"use client";

import { useMemo } from "react";
import { Project } from "@/data/projects";
import { TechIcon } from "@/components/icons/TechIcons";

interface TechStripProps {
  project: Project;
  className?: string;
  hidden?: boolean;
}

export function TechStrip({ project, className = "", hidden = false }: TechStripProps) {
  const techs = useMemo(() => {
    const list = project.techStack.flatMap((c) => c.items);
    return Array.from(new Set(list)).slice(0, 12);
  }, [project]);

  return (
    <ul
      aria-label="Technologies used"
      className={hidden ? "sr-only" : `flex flex-wrap items-center gap-x-5 gap-y-2 ${className}`}
    >
      {techs.map((tech) => (
        <li key={tech} className="flex items-center gap-2">
          <TechIcon name={tech} className="w-4 h-4 text-zinc-500" />
          <span className="font-mono text-xs text-zinc-500">{tech}</span>
        </li>
      ))}
    </ul>
  );
}
