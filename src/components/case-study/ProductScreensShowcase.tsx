"use client";

import Image from "next/image";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { Project } from "@/data/projects";

interface ProductScreensShowcaseProps {
  project: Project;
}

export function ProductScreensShowcase({ project }: ProductScreensShowcaseProps) {
  const screens = useMemo(() => {
    const f0 = project.keyFeatures?.[0] || "";
    const f1 = project.keyFeatures?.[1] || "";
    const f2 = project.keyFeatures?.[2] || project.keyFeatures?.[3] || "";

    const splitF = (f: string, fallbackTitle: string, fallbackDesc: string) => {
      if (f.includes(":")) {
        const parts = f.split(":");
        return {
          title: parts[0].trim(),
          desc: parts.slice(1).join(":").trim(),
        };
      }
      return {
        title: fallbackTitle,
        desc: f || fallbackDesc,
      };
    };

    const s1 = splitF(f0, "Client Ingress & Discovery", project.problem || "User discovery interface.");
    const s2 = splitF(f1, "Operational Management", project.solution || "Control console managing system operations.");
    const s3 = splitF(f2, "Real-Time Execution Engine", project.overview || "High-performance processing and settlement.");

    return [
      {
        id: "screen-1",
        label: `01 — ${s1.title.toUpperCase()}`,
        title: s1.title,
        desc: s1.desc,
        align: "center",
        image: project.image,
        aspect: "aspect-[16/10]",
        badge: "CLIENT VIEW",
      },
      {
        id: "screen-2",
        label: `02 — ${s2.title.toUpperCase()}`,
        title: s2.title,
        desc: s2.desc,
        align: "right",
        image: project.image,
        aspect: "aspect-[16/9]",
        badge: "OPERATIONAL CONSOLE",
      },
      {
        id: "screen-3",
        label: `03 — ${s3.title.toUpperCase()}`,
        title: s3.title,
        desc: s3.desc,
        align: "left",
        image: project.image,
        aspect: "aspect-[16/10]",
        badge: "EXECUTION & AUDIT",
      },
    ];
  }, [project]);

  return (
    <div className="w-full space-y-24 sm:space-y-36">
      {/* Editorial Section Header */}
      <div className="space-y-4 max-w-2xl">
        <span className="text-xs font-mono tracking-widest text-zinc-500 uppercase">
          03 — PRODUCT SCREENS
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
          Visual Interface &amp; Core Screens
        </h2>
        <p className="text-sm sm:text-base text-zinc-400 font-light">
          Real production views crafted for high conversion, operational clarity, and domain performance.
        </p>
      </div>

      {/* Asymmetric Large Screens List */}
      <div className="space-y-32 sm:space-y-44">
        {screens.map((screen) => (
          <motion.div
            key={screen.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={`space-y-6 ${
              screen.align === "right"
                ? "lg:ml-auto lg:max-w-[92%]"
                : screen.align === "left"
                ? "lg:mr-auto lg:max-w-[92%]"
                : "max-w-full"
            }`}
          >
            {/* Small Floating Editorial Label & Description */}
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 pb-3 border-b border-white/10">
              <div className="space-y-1">
                <span className="text-xs font-mono tracking-widest text-zinc-400 uppercase">
                  {screen.label}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {screen.title}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-zinc-400 font-light max-w-md sm:text-right">
                {screen.desc}
              </p>
            </div>

            {/* Giant Cinematic Screenshot Preview */}
            <div
              className={`relative w-full ${screen.aspect} rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 shadow-[0_30px_100px_rgba(0,0,0,0.8)] bg-black/60 group`}
            >
              <Image
                src={screen.image}
                alt={`${project.title} - ${screen.title}`}
                fill
                sizes="(max-width: 1280px) 100vw, 1200px"
                className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.01]"
              />

              {/* Minimal interface badge */}
              <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-mono text-zinc-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>{screen.badge}</span>
              </div>

              {/* Subtle bottom vignette */}
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
