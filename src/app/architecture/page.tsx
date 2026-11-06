import type { Metadata } from "next";
import { ArchitectureDedicatedPage } from "@/components/architecture/ArchitectureDedicatedPage";

export const metadata: Metadata = {
  title: "Systems Architecture & Blueprints — ROS RENDO",
  description:
    "Explore full-stack architectural blueprints, multi-tier topologies, database relationship meshes, and concurrency patterns by ROS RENDO.",
};

export default function ArchitecturePage() {
  return <ArchitectureDedicatedPage />;
}

