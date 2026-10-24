import type { Metadata } from "next";
import { ContactDedicatedPage } from "@/components/contact/ContactDedicatedPage";

export const metadata: Metadata = {
  title: "Contact & Collaboration — ROS RENDO",
  description:
    "Get in touch with ROS RENDO for full-stack web development, backend engineering, or product collaboration. Have something worth building? Open to meaningful projects and conversations.",
};

export default function ContactPage() {
  return <ContactDedicatedPage />;
}
