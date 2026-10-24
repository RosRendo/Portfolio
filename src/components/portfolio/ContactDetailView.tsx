"use client";

import { useState } from "react";
import { profileData } from "@/data/profile";
import { sound } from "@/lib/sound";
import {
  ArrowLeft,
  Check,
  Copy,
  ExternalLink,
  FileDown,
  Mail,
  MapPin,
  Send,
  Sparkles,
} from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/icons/SocialIcons";

interface ContactDetailViewProps {
  onClose: () => void;
}

export function ContactDetailView({ onClose }: ContactDetailViewProps) {
  const { contact, status } = profileData;
  const [copied, setCopied] = useState(false);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleCopy = () => {
    navigator.clipboard.writeText(contact.email);
    sound.playSuccess();
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const handleComposeMailto = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playSuccess();
    const mailtoUrl = `mailto:${contact.email}?subject=${encodeURIComponent(
      subject || "Collaboration Inquiry via Portfolio"
    )}&body=${encodeURIComponent(message)}`;
    window.location.href = mailtoUrl;
  };

  return (
    <div className="space-y-8 text-zinc-200">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-indigo-400">
          <Mail className="w-4 h-4" />
          <span>Contact & Direct Inquiries</span>
        </div>
        <span className="text-xs font-mono text-zinc-400">
          Verified Channels
        </span>
      </div>

      <div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
          Start a Conversation
        </h2>
        <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-normal">
          Whether you have an engineering opportunity, want to collaborate on a backend architecture, or discuss a product concept, I&apos;d love to connect.
        </p>
      </div>

      {/* Primary contact cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Email card */}
        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">
              Direct Email
            </span>
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono bg-white/[0.04] border border-white/10 text-zinc-300 hover:text-white transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
          <a
            href={`mailto:${contact.email}`}
            className="text-base sm:text-lg font-mono font-semibold text-white hover:text-indigo-300 transition-colors block truncate"
          >
            {contact.email}
          </a>
          <p className="text-xs text-zinc-400 font-mono">
            Typical response within 24 hours
          </p>
        </div>

        {/* Location & Status card */}
        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-3">
          <div className="text-xs font-mono uppercase tracking-wider text-zinc-400">
            Location & Availability
          </div>
          <div className="flex items-center gap-2 text-base sm:text-lg font-medium text-white">
            <MapPin className="w-4 h-4 text-emerald-400" />
            <span>Phnom Penh, Cambodia</span>
          </div>
          <p className="text-xs text-emerald-400 font-mono flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
            {status.text} (UTC+7 / Remote)
          </p>
        </div>
      </div>

      {/* Verified Online Profiles */}
      <div className="space-y-3">
        <div className="text-xs font-mono uppercase tracking-wider text-zinc-400">
          Verified Profiles & Resumé
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <a
            href={contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/20 hover:bg-white/[0.05] transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-2.5">
              <GitHubIcon className="w-4 h-4 text-white" />
              <div className="text-xs font-mono">
                <div className="font-semibold text-white">GitHub</div>
                <div className="text-zinc-400">@{contact.githubUser}</div>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
          </a>

          <a
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/20 hover:bg-white/[0.05] transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-2.5">
              <LinkedInIcon className="w-4 h-4 text-sky-400" />
              <div className="text-xs font-mono">
                <div className="font-semibold text-white">LinkedIn</div>
                <div className="text-zinc-400">/in/{contact.linkedinUser}</div>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
          </a>

          <a
            href={contact.cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-indigo-500/40 hover:bg-indigo-500/[0.08] transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-2.5">
              <FileDown className="w-4 h-4 text-indigo-400" />
              <div className="text-xs font-mono">
                <div className="font-semibold text-white">Curriculum Vitae</div>
                <div className="text-indigo-300">Download PDF</div>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
          </a>
        </div>
      </div>

      {/* Real, functional message composer (Uses mailto with prefilled params, no fake submissions) */}
      <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/[0.06] space-y-4">
        <div className="flex items-center gap-2 text-sm font-bold text-white">
          <Send className="w-4 h-4 text-indigo-400" />
          <span>Quick Message Composer</span>
        </div>
        <p className="text-xs text-zinc-400 font-mono">
          Pre-fill your inquiry and send directly via your default email application.
        </p>

        <form onSubmit={handleComposeMailto} className="space-y-4">
          <div>
            <label
              htmlFor="contact-subject"
              className="block text-xs font-mono text-zinc-400 mb-1.5"
            >
              Subject / Topic
            </label>
            <input
              id="contact-subject"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g. Backend Engineering Opportunity / Project Discussion"
              className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:border-indigo-500 focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label
              htmlFor="contact-message"
              className="block text-xs font-mono text-zinc-400 mb-1.5"
            >
              Message
            </label>
            <textarea
              id="contact-message"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Hi Rendo, I came across your portfolio and wanted to reach out regarding..."
              className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:border-indigo-500 focus:outline-none transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-mono font-semibold shadow-lg shadow-indigo-600/20 transition-all hover:-translate-y-0.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Open in Email Client</span>
          </button>
        </form>
      </div>

      {/* Return button */}
      <div className="pt-6 border-t border-white/10 flex items-center justify-between">
        <button
          type="button"
          onClick={onClose}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.06] hover:bg-white/10 border border-white/10 text-xs font-mono text-zinc-200 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Card World</span>
        </button>

        <span className="text-xs font-mono text-zinc-400">
          Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/20 text-zinc-300">Esc</kbd> to return
        </span>
      </div>
    </div>
  );
}
