import type { Metadata } from "next";
import { HorizontalProjectsCanvas } from "@/components/projects/HorizontalProjectsCanvas";

export const metadata: Metadata = {
  title: "Projects Showcase — ROS RENDO",
  description:
    "Explore 13 full-stack engineering architectures, microservices, deterministic state machines, and production deployments engineered by ROS RENDO.",
};

export default function ProjectsPage() {
  return <HorizontalProjectsCanvas />;
}
