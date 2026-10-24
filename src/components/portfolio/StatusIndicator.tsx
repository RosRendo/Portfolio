"use client";

import { profileData } from "@/data/profile";

export function StatusIndicator() {
  const { status } = profileData;

  return (
    <div
      id="status-indicator-badge"
      className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-emerald-500/[0.08] border border-emerald-500/20 text-emerald-400 text-xs font-mono tracking-tight"
      title={`${status.text} — ${status.location}`}
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
      </span>
      <span className="font-medium text-emerald-300/90">{status.text}</span>
    </div>
  );
}
