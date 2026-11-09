"use client";

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Project, projectsData } from "@/data/projects";
import { sound } from "@/lib/sound";
import { GitHubIcon } from "@/components/icons/SocialIcons";
import { ProductExperienceFlow } from "@/components/case-study/ProductExperienceFlow";
import { ProductScreensShowcase } from "@/components/case-study/ProductScreensShowcase";
import { ArchitectureAssemblyDiagram } from "@/components/case-study/ArchitectureAssemblyDiagram";
import { DataRelationshipsTreeMap } from "@/components/case-study/DataRelationshipsTreeMap";
import { SectionHeader } from "@/components/case-study/SectionHeader";
import { TechStrip } from "@/components/case-study/TechIconRails";
import { ArrowLeft, ArrowRight, ArrowUpRight, ExternalLink, Volume2, VolumeX } from "lucide-react";

interface ProjectDedicatedPageProps {
  project: Project;
}

const easeOut = [0.16, 1, 0.3, 1] as const;

export function ProjectDedicatedPage({ project }: ProjectDedicatedPageProps) {
  const [isMuted, setIsMuted] = useState(() => sound.isMuted());
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    return sound.subscribe((muted) => setIsMuted(muted));
  }, [project.slug]);

  const toggleSound = () => {
    const next = !isMuted;
    sound.setMuted(next);
    setIsMuted(next);
    if (!next) sound.playTab();
  };

  const currentIdx = projectsData.findIndex((p) => p.slug === project.slug);
  const nextIdx = (currentIdx + 1) % projectsData.length;
  const nextProject = projectsData[nextIdx];
  const accent = project.accentColor || "#6366f1";

  const engineeringChallenges = useMemo(() => {
    if (project.challenges && project.challenges.length > 0) {
      return project.challenges.map((c, idx) => ({
        number: String(idx + 1).padStart(2, "0"),
        title: c.challenge,
        detail: c.solution,
        impact: c.impact,
      }));
    }
    return [
      {
        number: "01",
        title: project.problem?.split(":")[0] || "Data integrity",
        detail: project.solution || "",
        impact: undefined as string | undefined,
      },
    ];
  }, [project]);

  const stackLayers = useMemo(() => {
    if (project.techStack && project.techStack.length > 0) {
      return project.techStack.map((cat) => ({
        layer: cat.category,
        techs: cat.items,
      }));
    }
    return [];
  }, [project]);

  const builtList = useMemo(() => {
    if (project.keyFeatures && project.keyFeatures.length > 0) {
      return project.keyFeatures.map((f) => {
        if (f.includes(":")) {
          const [head, body] = f.split(":");
          return { head: head.trim(), body: body.trim(), raw: "" };
        }
        return { head: "", body: "", raw: f };
      });
    }
    return [
      { head: "", body: "", raw: project.solution },
      { head: "", body: "", raw: project.architecture.overview },
    ];
  }, [project]);

  const init = shouldReduceMotion ? false : { opacity: 0, y: 16 };

  return (
    <div className="min-h-screen bg-[#090a0f] text-white relative">

      <header className="sticky top-0 z-40 px-6 sm:px-10 lg:px-16 h-16 flex items-center justify-between bg-[#090a0f]/85 backdrop-blur border-b border-white/[0.06]">
        <Link
          href="/projects"
          onClick={() => sound.playClose()}
          className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span>All projects</span>
        </Link>

        <div className="flex items-center gap-4 font-mono text-xs tabular-nums">
          <span className="text-zinc-400">{project.title}</span>
          <span className="text-zinc-600">
            {String(currentIdx + 1).padStart(2, "0")}/{String(projectsData.length).padStart(2, "0")}
          </span>
        </div>

        <div className="flex items-center gap-5">
          <button
            type="button"
            onClick={toggleSound}
            aria-label={isMuted ? "Unmute interface sounds" : "Mute interface sounds"}
            className="text-zinc-500 hover:text-white transition-colors"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {project.links.demo && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playOpen()}
              className="hidden sm:inline-flex items-center gap-1.5 text-sm text-white hover:text-zinc-300 transition-colors group"
            >
              <span>Live demo</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          )}
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-14 py-20 sm:py-28 space-y-32 sm:space-y-40">
        {/* 01 — Overview */}
        <motion.section
          initial={init}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeOut }}
          className="space-y-12"
        >
          <div className="space-y-6">
            <p className="font-mono text-xs text-zinc-500">
              Case study / {project.category}
            </p>

            <h1 className="text-4xl sm:text-6xl md:text-8xl font-medium tracking-tight text-white leading-[1.05]">
              {project.title}
            </h1>

            <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl leading-relaxed pt-1">
              {project.tagline}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-8 gap-y-2 pt-4 border-t border-white/[0.08] font-mono text-xs tabular-nums">
            <div>
              <span className="text-zinc-600">Status </span>
              <span className="text-zinc-300">{project.deploymentStatus}</span>
            </div>
            <div>
              <span className="text-zinc-600">Stage </span>
              <span className="text-zinc-300">{project.status}</span>
            </div>
            <div>
              <span className="text-zinc-600">Stack </span>
              <span className="text-zinc-300">
                {project.techStack?.flatMap((c) => c.items).slice(0, 3).join(", ") || "Full-stack"}
              </span>
            </div>
          </div>

          <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden border border-white/10 bg-black">
            <Image
              src={project.image}
              alt={`${project.title} interface`}
              fill
              sizes="(max-width: 1280px) 100vw, 1152px"
              className="object-cover"
              priority
            />
          </div>

          <TechStrip project={project} />

          <div className="flex items-center justify-between font-mono text-xs">
            <span className="text-zinc-600">{project.title} / product view</span>
            {project.links.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playOpen()}
                className="text-zinc-400 hover:text-white transition-colors inline-flex items-center gap-1.5"
              >
                <span>Open live demo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </motion.section>

        <section>
          <ProductExperienceFlow project={project} accent={accent} />
        </section>

        <section>
          <ProductScreensShowcase project={project} accent={accent} />
        </section>

        <section>
          <ArchitectureAssemblyDiagram project={project} accent={accent} />
        </section>

        <section>
          <DataRelationshipsTreeMap project={project} accent={accent} />
        </section>

        {/* 06 — Engineering challenges */}
        <motion.section
          initial={init}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: easeOut }}
          className="space-y-16"
        >
          <SectionHeader
            index="06"
            title="Engineering challenges"
            description="What made this build hard, and how each problem was solved in the production system."
            accent={accent}
          />

          <div className="space-y-0">
            {engineeringChallenges.map((challenge, idx) => (
              <div
                key={challenge.number}
                className={`py-10 grid grid-cols-1 md:grid-cols-12 gap-6 gap-y-8 items-start ${
                  idx > 0 ? "border-t border-white/[0.08]" : "border-t border-white/[0.08]"
                }`}
              >
                <div className="md:col-span-4 space-y-3">
                  <span className="font-mono text-4xl font-medium text-white/40 tabular-nums tracking-tight">
                    {challenge.number}
                  </span>
                  <h3 className="text-lg font-medium text-white leading-snug">
                    {challenge.title}
                  </h3>
                </div>

                <div className="md:col-span-8 space-y-4">
                  <p className="text-base text-zinc-300 leading-relaxed max-w-2xl">
                    {challenge.detail}
                  </p>
                  {challenge.impact && (
                    <p className="font-mono text-xs text-zinc-500">{challenge.impact}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* 07 — Tech stack */}
        <motion.section
          initial={init}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: easeOut }}
          className="space-y-12"
        >
          <SectionHeader
            index="07"
            title="Technology stack"
            description="Layered by responsibility — interface, services, data and infrastructure."
            accent={accent}
          />

          <div>
            {stackLayers.map((layer, idx) => (
              <div
                key={layer.layer}
                className={`grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8 py-8 border-t border-white/[0.08] ${
                  idx === stackLayers.length - 1 ? "border-b border-white/[0.08]" : ""
                }`}
              >
                <span className="md:col-span-3 font-mono text-xs text-zinc-500">
                  {layer.layer}
                </span>
                <ul className="md:col-span-9 flex flex-wrap gap-x-4 gap-y-1">
                  {layer.techs.map((t) => (
                    <li key={t} className="text-sm text-zinc-300">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.section>

        {/* 08 — Summary */}
        <motion.section
          initial={init}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: easeOut }}
          className="space-y-16"
        >
          <SectionHeader
            index="08"
            title="Summary"
            accent={accent}
          />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
            <div className="md:col-span-5 space-y-8">
              <div className="space-y-1 font-mono text-xs">
                <div className="text-zinc-600">Role</div>
                <div className="text-sm text-zinc-200">Full-stack development &amp; architecture</div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {project.links.demo && (
                  <a
                    href={project.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.playOpen()}
                    className="inline-flex items-center gap-2 h-10 px-5 rounded-lg bg-[#f5f5f7] text-black text-sm font-medium hover:bg-white transition-colors"
                  >
                    <span>Visit app</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}

                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.playTab()}
                    className="inline-flex items-center gap-2 h-10 px-5 rounded-lg border border-white/15 text-sm text-zinc-200 hover:border-white/40 hover:text-white transition-colors"
                  >
                    <GitHubIcon className="w-4 h-4" />
                    <span>Repository</span>
                  </a>
                )}
              </div>
            </div>

            <div className="md:col-span-7 space-y-4">
              <h3 className="font-mono text-xs text-zinc-500">What was designed and built</h3>
              <dl className="space-y-4">
                {builtList.map((item, idx) => (
                  <div key={idx} className="grid grid-cols-[auto_1fr] gap-x-4 items-baseline">
                    <dt className="font-mono text-xs text-zinc-500 tabular-nums pt-0.5">
                      {String(idx + 1).padStart(2, "0")}
                    </dt>
                    <dd className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                      {item.raw || (
                        <>
                          <span className="text-white">{item.head}</span> — {item.body}
                        </>
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          {/* Next case study */}
          <div className="pt-8 border-t border-white/[0.08]">
            <Link
              href={`/projects/${nextProject.slug}`}
              onClick={() => sound.playTab()}
              className="group grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 md:items-center rounded-xl border border-white/10 bg-white/[0.02] p-8 hover:bg-white/[0.04] hover:border-white/20 transition-colors"
            >
              <div className="space-y-3">
                <span className="font-mono text-xs text-zinc-500">
                  Next / {String(nextIdx + 1).padStart(2, "0")}
                </span>
                <h3 className="text-2xl sm:text-3xl font-medium text-white tracking-tight">
                  {nextProject.title}
                </h3>
                <p className="text-sm text-zinc-400 max-w-xl line-clamp-1">
                  {nextProject.tagline}
                </p>
              </div>

              <div className="flex items-center gap-3 text-sm text-zinc-400 group-hover:text-white transition-colors">
                <span className="hidden sm:inline">Next case study</span>
                <div className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center group-hover:border-white/40 transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>

            <div className="flex items-center justify-between font-mono text-xs text-zinc-600 pt-8">
              <Link
                href="/projects"
                onClick={() => sound.playClose()}
                className="hover:text-zinc-300 transition-colors inline-flex items-center gap-2"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>All projects</span>
              </Link>
              <span>Ros Rendo / full-stack developer</span>
            </div>
          </div>
        </motion.section>
      </main>
    </div>
  );
}
