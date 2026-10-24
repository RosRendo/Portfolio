import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rosrendo.dev"),
  title: "ROS RENDO — Full-Stack Developer & Backend Engineering",
  description:
    "Interactive motion-driven developer portfolio of ROS RENDO. Software engineering student & digital builder developing full-stack web applications, backend architectures, relational databases, and deployable digital products.",
  keywords: [
    "ROS RENDO",
    "Full-Stack Developer",
    "Backend Engineer",
    "Next.js",
    "TypeScript",
    "Node.js",
    "PostgreSQL",
    "Software Engineer Portfolio",
  ],
  authors: [{ name: "ROS RENDO" }],
  creator: "ROS RENDO",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rosrendo.dev",
    title: "ROS RENDO — Full-Stack Developer & Backend Engineering",
    description: "I build digital products from idea to deployment. Explore interactive cards, architecture breakdowns, and live projects.",
    siteName: "ROS RENDO Portfolio",
    images: [
      {
        url: "/images/servicefinder.jpg",
        width: 1200,
        height: 630,
        alt: "ROS RENDO Portfolio Showcase",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ROS RENDO — Full-Stack Developer & Backend Engineering",
    description: "I build digital products from idea to deployment.",
    creator: "@rosrendo",
    images: ["/images/servicefinder.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#090a0f] text-[#f5f5f7] selection:bg-indigo-500/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
