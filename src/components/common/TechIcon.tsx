import React from "react";

export function getTechSlug(name: string): string {
  const clean = name.toLowerCase().trim().replace(/[\s\.\-_/]/g, "");

  if (clean.includes("express")) return "express";
  if (clean.includes("nest")) return "nestjs";
  if (clean.includes("next")) return "nextdotjs";
  if (clean.includes("node")) return "nodedotjs";
  if (clean.includes("reactnative") || clean.includes("reactexpo")) return "react";
  if (clean.includes("react")) return "react";
  if (clean.includes("typescript") || clean === "ts") return "typescript";
  if (clean.includes("javascript") || clean === "js") return "javascript";
  if (clean.includes("tailwind")) return "tailwindcss";
  if (clean.includes("postgres") || clean.includes("psql") || clean === "sql") return "postgresql";
  if (clean.includes("mongo")) return "mongodb";
  if (clean.includes("prisma")) return "prisma";
  if (clean.includes("redis")) return "redis";
  if (clean.includes("docker")) return "docker";
  if (clean.includes("github")) return "github";
  if (clean.includes("git")) return "git";
  if (clean.includes("aws") || clean.includes("ec2") || clean.includes("s3")) return "amazonwebservices";
  if (clean.includes("nginx")) return "nginx";
  if (clean.includes("pm2")) return "pm2";
  if (clean.includes("python")) return "python";
  if (clean.includes("graphql")) return "graphql";
  if (clean.includes("vue")) return "vuedotjs";
  if (clean.includes("figma")) return "figma";
  if (clean.includes("linux") || clean.includes("ubuntu")) return "linux";
  if (clean.includes("bash")) return "gnubash";
  if (clean.includes("java")) return "openjdk";
  if (clean.includes("postman")) return "postman";
  if (clean.includes("dbeaver")) return "dbeaver";
  if (clean.includes("pgadmin")) return "postgresql";
  if (clean.includes("vercel")) return "vercel";
  if (clean.includes("framer")) return "framer";
  if (clean.includes("html")) return "html5";
  if (clean.includes("css")) return "css3";
  if (clean.includes("vscode")) return "visualstudiocode";

  return clean;
}

export function getTechBrandColor(name: string): string {
  const n = name.toLowerCase().replace(/[\s\.\-_/]/g, "");
  if (n.includes("react")) return "#61DAFB";
  if (n.includes("typescript") || n === "ts") return "#3178C6";
  if (n.includes("javascript") || n === "js") return "#F7DF1E";
  if (n.includes("next")) return "#FFFFFF";
  if (n.includes("tailwind")) return "#06B6D4";
  if (n.includes("node")) return "#5FA04E";
  if (n.includes("nest")) return "#E0234E";
  if (n.includes("express")) return "#E2E8F0";
  if (n.includes("rest") || n.includes("api") || n.includes("postman")) return "#FF6C37";
  if (n.includes("python")) return "#3776AB";
  if (n.includes("postgres") || n.includes("psql") || n === "sql") return "#4169E1";
  if (n.includes("prisma")) return "#5A67D8";
  if (n.includes("mysql")) return "#4479A1";
  if (n.includes("mongo")) return "#47A248";
  if (n.includes("redis")) return "#DC382D";
  if (n.includes("docker")) return "#2496ED";
  if (n.includes("linux") || n.includes("ubuntu")) return "#FCC624";
  if (n.includes("bash")) return "#4EAA25";
  if (n.includes("aws") || n.includes("ec2") || n.includes("s3")) return "#FF9900";
  if (n.includes("nginx")) return "#009639";
  if (n.includes("pm2")) return "#2B037A";
  if (n.includes("figma")) return "#F24E1E";
  if (n.includes("framer")) return "#0055FF";
  if (n.includes("git") || n.includes("github")) return "#F05032";
  if (n.includes("java")) return "#ED8B00";
  if (n.includes("html")) return "#E34F26";
  if (n.includes("css")) return "#1572B6";
  if (n.includes("vercel")) return "#FFFFFF";
  if (n.includes("dbeaver")) return "#382923";
  if (n.includes("vscode")) return "#007ACC";

  return "#06B6D4";
}

/**
 * High-performance tech icon loader.
 * Queries Simple Icons CDN directly with fallback to brand-color monogram.
 */
export function TechIcon({
  name,
  className = "w-4 h-4",
  color,
}: {
  name: string;
  className?: string;
  color?: string;
}) {
  const [hasError, setHasError] = React.useState(false);
  const slug = getTechSlug(name);
  const brandColor = color || getTechBrandColor(name);
  const cleanColor = brandColor.replace("#", "");

  if (hasError || !slug) {
    return (
      <span
        style={{ color: brandColor, borderColor: `${brandColor}40` }}
        className="font-mono text-[9px] font-bold px-1.5 py-0.5 rounded bg-white/[0.04] border shrink-0 select-none inline-flex items-center justify-center leading-none"
      >
        {name.slice(0, 3).toUpperCase()}
      </span>
    );
  }

  return (
    <img
      src={`https://cdn.simpleicons.org/${slug}/${cleanColor}`}
      alt={name}
      crossOrigin="anonymous"
      loading="lazy"
      onError={() => setHasError(true)}
      className={`${className} object-contain inline-block shrink-0 transition-transform group-hover:scale-110`}
    />
  );
}

