import type { Metadata } from "next";
import { HorizontalProjectsCanvas } from "@/components/projects/HorizontalProjectsCanvas";

export const metadata: Metadata = {
  title: "Projects Showcase — ROS RENDO",
  description:
    "Explore 10 full-stack engineering architectures and production deployments: ServiceFinder, EscrowDeal, TechTune Healer, Journex, Cloud Orchestrator, RendoOS, StackGen, Luxury E-Commerce, JAVIS Voice AI, and Real Estate OS engineered by ROS RENDO.",
};

export default function ProjectsPage() {
  return <HorizontalProjectsCanvas />;
}
