import type { Metadata } from "next";
import { PortfolioCanvas } from "@/components/portfolio/PortfolioCanvas";

export const metadata: Metadata = {
  title: "Technical Stack & Architecture — ROS RENDO",
  description:
    "Explore ROS RENDO's full-stack and backend competencies: Node.js, Express, NestJS, PostgreSQL, Prisma, Docker, React, and Next.js.",
};

export default function SkillsPage() {
  return <PortfolioCanvas initialView="skills" />;
}
