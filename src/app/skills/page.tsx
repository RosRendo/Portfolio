import type { Metadata } from "next";
import { SkillsDedicatedPage } from "@/components/skills/SkillsDedicatedPage";

export const metadata: Metadata = {
  title: "Technical Stack & Architecture — ROS RENDO",
  description:
    "Explore ROS RENDO's full-stack and backend competencies: Node.js, Express, NestJS, PostgreSQL, Prisma, Docker, React, and Next.js.",
};

export default function SkillsPage() {
  return <SkillsDedicatedPage />;
}
