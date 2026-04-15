import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Langman — AI Agent Failure Detection",
  description:
    "Langman monitors your AI agents in production. Detects failures, explains root causes, and alerts you before your users notice.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-[#0B0F14] text-[#E5E7EB] antialiased">
        {children}
      </body>
    </html>
  );
}
