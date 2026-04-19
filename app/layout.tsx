import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dottle.dev"),
  title: {
    default: "Dottle — AI Agent Failure Detection",
    template: "%s | Dottle",
  },
  description:
    "Dottle monitors your AI agents in production. Detects failures, explains root causes, and alerts you before your users notice.",
  keywords: [
    "AI agent monitoring",
    "agent failure detection",
    "LangChain monitoring",
    "AI observability",
    "agent debugging",
    "production AI agents",
    "LLM monitoring",
    "AI agent tracing",
  ],
  authors: [{ name: "Dottle", url: "https://dottle.dev" }],
  creator: "Dottle",
  publisher: "Dottle",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://dottle.dev",
    title: "Dottle — AI Agent Failure Detection",
    description:
      "Dottle monitors your AI agents in production. Detects failures, explains root causes, and alerts you before your users notice.",
    siteName: "Dottle",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dottle — AI Agent Failure Detection",
    description:
      "Dottle monitors your AI agents in production. Detects failures, explains root causes, and alerts you before your users notice.",
    creator: "@dottle_dev",
  },
  alternates: {
    canonical: "https://dottle.dev",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
