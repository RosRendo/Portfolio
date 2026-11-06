import type { Metadata } from "next";
import { JourneyDedicatedPage } from "@/components/journey/JourneyDedicatedPage";

export const metadata: Metadata = {
  title: "Engineering Journey & Milestones | Ros Rendo",
  description:
    "Chronological engineering evolution of Ros Rendo — from foundations in computer science to architecting full-stack production distributed systems and shipping 13 products.",
};

export default function JourneyPage() {
  return <JourneyDedicatedPage />;
}

