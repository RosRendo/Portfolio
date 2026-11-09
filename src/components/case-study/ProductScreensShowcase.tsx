"use client";

import Image from "next/image";
import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Project } from "@/data/projects";
import { SectionHeader } from "@/components/case-study/SectionHeader";

interface ProductScreensShowcaseProps {
  project: Project;
  accent: string;
}

export function ProductScreensShowcase({ project, accent }: ProductScreensShowcaseProps) {
  const shouldReduceMotion = useReducedMotion();

  const features = useMemo(() => {
    return (project.keyFeatures || []).slice(0, 6).map((f) => {
      if (f.includes(":")) {
        const [head, ...rest] = f.split(":");
        return { head: head.trim(), body: rest.join(":").trim() };
      }
      return { head: "", body: f };
    });
  }, [project]);

  const metrics = useMemo(() => (project.metrics || []).slice(0, 4), [project]);

  return (
    <div className="space-y-12">
      <SectionHeader
        index="03"
        title="Inside the product"
        description="One production view of the interface, annotated with the capabilities that power it."
        accent={accent}
      />

      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start"
      >
        <div className="lg:col-span-8 space-y-3">
          <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-white/10 bg-black">
            <Image
              src={project.image}
              alt={`${project.title} main interface`}
              fill
              sizes="(max-width: 1280px) 100vw, 760px"
              className="object-cover object-top"
            />
          </div>
          <p className="font-mono text-xs text-zinc-600">{project.title} / main view</p>
        </div>

        <div className="lg:col-span-4 space-y-5">
          <h3 className="font-mono text-xs text-zinc-500">Key capabilities</h3>
          <dl className="space-y-5">
            {features.map((f, idx) => (
              <div key={idx} className="grid grid-cols-[auto_1fr] gap-x-4 items-baseline">
                <dt className="font-mono text-xs text-zinc-500 tabular-nums pt-0.5">
                  {String(idx + 1).padStart(2, "0")}
                </dt>
                <dd className="text-sm leading-relaxed">
                  {f.head && <span className="text-white font-medium">{f.head} — </span>}
                  <span className="text-zinc-300">{f.body}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </motion.div>

      {metrics.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-10 gap-y-8 pt-4">
          {metrics.map((m) => (
            <div key={m.label} className="space-y-2">
              <div className="font-mono text-2xl sm:text-3xl font-medium text-white tabular-nums tracking-tight">
                {m.value}
              </div>
              <div className="font-mono text-xs text-zinc-500">{m.label}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
