import type { Metadata } from "next";
import { AboutDedicatedPage } from "@/components/about/AboutDedicatedPage";

export const metadata: Metadata = {
  title: "About & Engineering Ethos — ROS RENDO",
  description:
    "Learn about ROS RENDO, a software engineering student and independent product builder focused on backend systems, relational databases, and clean architecture.",
};

export default function AboutPage() {
  return <AboutDedicatedPage />;
}
