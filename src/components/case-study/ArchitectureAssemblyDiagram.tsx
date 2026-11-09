"use client";

import { useMemo } from "react";
import { Project } from "@/data/projects";
import { getProjectTechnicalSpec } from "@/data/projectDetailsDatabase";
import { SectionHeader } from "@/components/case-study/SectionHeader";

interface ArchitectureAssemblyDiagramProps {
  project: Project;
  accent: string;
}

export function ArchitectureAssemblyDiagram({ project, accent }: ArchitectureAssemblyDiagramProps) {
  const spec = getProjectTechnicalSpec(project.id || project.slug);

  const tiers = useMemo(() => {
    const comp = project.architecture.components || [];
    const stack = project.techStack || [];

    return [
      {
        id: "frontend",
        name: comp[0]?.name || "Frontend",
        role:
          comp[0]?.role ||
          spec?.tierDetails?.client ||
          "Client rendering and responsive interaction",
        techs: stack[0]?.items || ["React", "Next.js", "TypeScript"],
        connector:
          project.architecture.diagramSteps?.[0]?.split(".")[0] || "Client request over TLS",
      },
      {
        id: "backend",
        name: comp[1]?.name || "API layer",
        role:
          comp[1]?.role ||
          spec?.tierDetails?.gateway ||
          "REST endpoints and request validation",
        techs: stack[1]?.items || ["Node.js", "REST APIs"],
        connector:
          project.architecture.diagramSteps?.[1]?.split(".")[0] || "Authenticated API calls",
      },
      {
        id: "data",
        name: comp[2]?.name || "Data layer",
        role:
          comp[2]?.role ||
          spec?.tierDetails?.database ||
          "Relational persistence with ACID guarantees",
        techs: stack[2]?.items || ["PostgreSQL", "Prisma ORM"],
        connector: null,
      },
      ...(comp[3] || stack[3]
        ? [
            {
              id: "infra",
              name: comp[3]?.name || "Infrastructure",
              role: comp[3]?.role || spec?.tierDetails?.external || "Runtime, proxy and deployment",
              techs: stack[3]?.items || ["Docker", "Nginx"],
              connector: null,
            },
          ]
        : []),
    ];
  }, [project, spec]);

  return (
    <div className="space-y-12">
      <SectionHeader
        index="04"
        title="Architecture"
        description={project.architecture.overview}
        accent={accent}
      />

      <div>
        {tiers.map((tier, idx) => (
          <div key={tier.id} className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8 py-8 border-t border-white/[0.08]">
            <div className="md:col-span-4 space-y-1.5">
              <span className="font-mono text-xs text-zinc-500 tabular-nums">
                Tier {String(idx + 1)}
              </span>
              <h3 className="text-lg font-medium text-white tracking-tight">{tier.name}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">{tier.role}</p>
            </div>

            <div className="md:col-span-8">
              <ul className="flex flex-wrap gap-x-4 gap-y-1">
                {tier.techs.map((t) => (
                  <li key={t} className="text-sm text-zinc-300 font-mono text-xs">
                    {t}
                  </li>
                ))}
              </ul>
              {tier.connector && (
                <p className="pt-3 font-mono text-xs text-zinc-600">{tier.connector}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
