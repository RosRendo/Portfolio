"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { sound } from "@/lib/sound";
import { profileData } from "@/data/profile";
import {
  ArrowUpRight,
  Check,
  Copy,
  FileDown,
  Mail,
  Send,
} from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/icons/SocialIcons";

interface CardContactProps {
  onOpen: () => void;
}

export function CardContact({ onOpen }: CardContactProps) {
  const { contact } = profileData;
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(contact.email);
    sound.playSuccess();
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  return (
    <motion.div
      layoutId="card-contact"
      onClick={() => {
        sound.playOpen();
        onOpen();
      }}
      onMouseEnter={() => sound.playHover()}
      className="card-specular group cursor-pointer rounded-3xl p-6 sm:p-7 flex flex-col justify-between relative overflow-hidden transition-all duration-300 hover:-translate-y-1"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          sound.playOpen();
          onOpen();
        }
      }}
      aria-label="Open Contact Information and Links"
    >
      <div className="ambient-glow -bottom-20 -right-20 w-52 h-52 bg-indigo-500/15 group-hover:opacity-30" />

      <div>
        {/* Header */}
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-lg font-semibold tracking-tight text-white group-hover:text-indigo-300 transition-colors">
                Let&apos;s Connect
              </h3>
              <p className="text-xs text-zinc-400 font-mono">
                Direct channels & collaboration
              </p>
            </div>
          </div>

          <div className="w-9 h-9 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-zinc-400 group-hover:text-white group-hover:border-indigo-500/40 group-hover:bg-indigo-500/10 transition-all">
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>

        <p className="text-sm text-zinc-300 leading-relaxed mb-5">
          Interested in full-stack engineering, backend systems, or digital product collaborations? Reach out directly or grab my CV.
        </p>

        {/* Quick Email Pill with Copy Action */}
        <div
          onClick={handleCopyEmail}
          className="group/pill flex items-center justify-between gap-2 p-3 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-indigo-500/40 hover:bg-indigo-500/[0.08] transition-all mb-4"
          title="Click to copy email address"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
            <span className="text-xs font-mono text-zinc-200 truncate font-medium">
              {contact.email}
            </span>
          </div>

          <button
            type="button"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono bg-white/[0.05] border border-white/10 text-zinc-300 hover:text-white transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-zinc-400" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Action icons row */}
        <div className="grid grid-cols-3 gap-2">
          <a
            href={contact.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/20 hover:bg-white/[0.06] text-xs font-mono text-zinc-300 transition-all"
          >
            <GitHubIcon className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>

          <a
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/20 hover:bg-white/[0.06] text-xs font-mono text-zinc-300 transition-all"
          >
            <LinkedInIcon className="w-3.5 h-3.5 text-sky-400" />
            <span>LinkedIn</span>
          </a>

          <a
            href={contact.cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/20 hover:bg-white/[0.06] text-xs font-mono text-indigo-300 transition-all"
          >
            <FileDown className="w-3.5 h-3.5" />
            <span>CV / Resume</span>
          </a>
        </div>
      </div>

      {/* Footer trigger */}
      <div className="pt-4 mt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-indigo-400/90 group-hover:text-indigo-300">
        <span>Send Quick Message or Inquiry</span>
        <span className="text-[11px] opacity-70 group-hover:opacity-100">Click to expand</span>
      </div>
    </motion.div>
  );
}
