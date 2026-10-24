"use client";

import { PersonalIdentityView } from "./PersonalIdentityView";
import { Project } from "@/data/projects";

interface AboutDetailViewProps {
  onClose: () => void;
  onSelectProject?: (project: Project) => void;
}

export function AboutDetailView({ onClose, onSelectProject }: AboutDetailViewProps) {
  return <PersonalIdentityView onClose={onClose} onSelectProject={onSelectProject} />;
}
