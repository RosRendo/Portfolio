"use client";

import { ReactNode } from "react";

interface SectionHeaderProps {
  index: string;
  title: string;
  description?: ReactNode;
  accent?: string;
}

export function SectionHeader({ index, title, description, accent }: SectionHeaderProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <span
          aria-hidden
          className="h-px w-6"
          style={{ backgroundColor: accent || "#3a3f52" }}
        />
        <span className="font-mono text-xs text-zinc-500 tabular-nums">{index}</span>
      </div>
      <h2 className="max-w-2xl text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight text-white">
        {title}
      </h2>
      {description && (
        <p className="max-w-xl text-sm text-zinc-400 leading-relaxed">{description}</p>
      )}
    </div>
  );
}
