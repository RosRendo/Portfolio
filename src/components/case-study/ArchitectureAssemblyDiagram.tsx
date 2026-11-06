"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { Project } from "@/data/projects";
import { getProjectTechnicalSpec } from "@/data/projectDetailsDatabase";
import {
  Globe,
  Server,
  Database,
  Cloud,
  Layers,
  Cpu,
} from "lucide-react";

interface ArchitectureAssemblyDiagramProps {
  project: Project;
}

export function ArchitectureAssemblyDiagram({ project }: ArchitectureAssemblyDiagramProps) {
  const spec = getProjectTechnicalSpec(project.id || project.slug);

  const tiers = useMemo(() => {
    const comp0 = project.architecture.components?.[0];
    const comp1 = project.architecture.components?.[1];
    const comp2 = project.architecture.components?.[2];
    const comp3 = project.architecture.components?.[3];

    const stack0 = project.techStack?.[0]?.items || ["React", "Next.js", "TypeScript", "Tailwind CSS"];
    const stack1 = project.techStack?.[1]?.items || ["Node.js", "RESTful APIs", "JWT Auth", "Zod Validation"];
    const stack2 = project.techStack?.[2]?.items || ["PostgreSQL", "Prisma ORM", "Redis", "Row Locks"];
    const stack3 = project.techStack?.[3]?.items || ["Docker", "Nginx", "Linux", "CI/CD Pipelines"];

    const step0 = project.architecture.diagramSteps?.[0] || "Client Ingress · TLS 1.3 · WSS";
    const step1 = project.architecture.diagramSteps?.[1] || "API Gateway · Schema Validation · TCP 5432";
    const step2 = project.architecture.diagramSteps?.[2] || "Internal Network · Docker Daemon · SSL Proxy";

    return [
      {
        step: 1,
        id: "frontend",
        title: comp0?.name || "Frontend Ingress",
        tech: comp0?.tech || "Client UI & Server Rendering",
        subtitle: comp0?.role || spec?.tierDetails?.client || "React Server Components & responsive client hydration",
        chips: stack0.slice(0, 4),
        icon: Globe,
        connector: step0.length > 55 ? step0.slice(0, 52) + "..." : step0,
      },
      {
        step: 2,
        id: "backend",
        title: comp1?.name || "API Gateway & Logic",
        tech: comp1?.tech || "Domain Controllers & State Machine",
        subtitle: comp1?.role || spec?.tierDetails?.gateway || "RESTful endpoints and asynchronous request serialization",
        chips: stack1.slice(0, 4),
        icon: Server,
        connector: step1.length > 55 ? step1.slice(0, 52) + "..." : step1,
      },
      {
        step: 3,
        id: "data",
        title: comp2?.name || "Data & Persistence",
        tech: comp2?.tech || spec?.database.engine || "PostgreSQL 16 & Cache",
        subtitle: comp2?.role || spec?.tierDetails?.database || "Relational schema with ACID transactional isolation",
        chips: stack2.slice(0, 4),
        icon: Database,
        connector: step2.length > 55 ? step2.slice(0, 52) + "..." : step2,
      },
      {
        step: 4,
        id: "infra",
        title: comp3?.name || "Infrastructure & Rails",
        tech: comp3?.tech || "Production Environment",
        subtitle: comp3?.role || spec?.tierDetails?.external || "Containerized runtime, reverse proxy, and external webhooks",
        chips: stack3.slice(0, 4),
        icon: Cloud,
        connector: null,
      },
    ];
  }, [project, spec]);

  return (
    <div className="w-full space-y-16">
      {/* Editorial Section Header */}
      <div className="space-y-4 max-w-2xl">
        <span className="text-xs font-mono tracking-widest text-zinc-500 uppercase">
          04 — HOW I BUILT IT
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
          System Architecture Assembly
        </h2>
        <p className="text-sm sm:text-base text-zinc-400 font-light">
          {project.architecture.overview ||
            "A progressive multi-tier engineering topology from client ingress to cloud infrastructure."}
        </p>
      </div>

      {/* Assembly Diagram */}
      <div className="max-w-4xl mx-auto py-4">
        {tiers.map((tier, idx) => {
          const Icon = tier.icon;
          return (
            <div key={tier.id} className="relative">
              {/* Progressive Tier Node */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  {/* Left: Tier identification and core technology */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white shrink-0 mt-0.5">
                      <Icon className="w-5 h-5 text-white" />
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono tracking-widest text-zinc-500 uppercase">
                          TIER 0{tier.step} // {tier.title}
                        </span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                        {tier.tech}
                      </h3>
                      <p className="text-xs sm:text-sm text-zinc-400 font-light max-w-md">
                        {tier.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Right: Small minimalist technical labels */}
                  <div className="flex flex-wrap gap-2 md:justify-end max-w-sm">
                    {tier.chips.map((chip, cIdx) => (
                      <span
                        key={cIdx}
                        className="px-2.5 py-1 rounded text-xs font-mono text-zinc-300 bg-white/[0.04] border border-white/10"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Connecting Line Drawing to Next Tier */}
              {tier.connector && (
                <div className="flex flex-col items-center justify-center py-4 my-1">
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    whileInView={{ height: 20, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.15 + 0.2 }}
                    className="w-[1px] bg-white/30"
                  />
                  <motion.span
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: idx * 0.15 + 0.3 }}
                    className="px-3 py-1 rounded-full text-[10px] font-mono font-medium text-zinc-400 bg-black border border-white/10"
                  >
                    {tier.connector}
                  </motion.span>
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    whileInView={{ height: 20, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.15 + 0.2 }}
                    className="w-[1px] bg-white/30"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
