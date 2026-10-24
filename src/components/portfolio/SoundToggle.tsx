"use client";

import { useEffect, useState } from "react";
import { sound } from "@/lib/sound";
import { Volume2, VolumeX } from "lucide-react";

export function SoundToggle() {
  const [muted, setMuted] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setMuted(sound.isMuted());
    return sound.subscribe((isMuted) => setMuted(isMuted));
  }, []);

  if (!mounted) return null;

  return (
    <button
      id="sound-toggle-btn"
      type="button"
      onClick={() => {
        const next = sound.toggleMute();
        if (!next) sound.playTab();
      }}
      className={`group relative flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono tracking-wide transition-all border ${
        muted
          ? "border-white/10 text-white/50 hover:text-white/80 hover:border-white/20 bg-white/[0.02]"
          : "border-indigo-500/40 text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/15"
      }`}
      title={muted ? "Sound Effects: Muted (Click to enable)" : "Sound Effects: Active (Click to mute)"}
      aria-label="Toggle sound feedback"
    >
      {muted ? (
        <VolumeX className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 transition-opacity" />
      ) : (
        <Volume2 className="w-3.5 h-3.5 text-indigo-400 group-hover:scale-110 transition-transform" />
      )}
      <span className="hidden sm:inline">{muted ? "SFX OFF" : "SFX ON"}</span>
      {!muted && (
        <span className="flex items-end gap-0.5 h-2.5">
          <span className="w-0.5 h-full bg-indigo-400 rounded-full animate-pulse" />
          <span className="w-0.5 h-2/3 bg-indigo-400 rounded-full animate-pulse delay-75" />
          <span className="w-0.5 h-4/5 bg-indigo-400 rounded-full animate-pulse delay-150" />
        </span>
      )}
    </button>
  );
}
