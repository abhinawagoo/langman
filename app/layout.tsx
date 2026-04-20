import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import GoogleAnalytics from "./components/GoogleAnalytics";

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
    "Dottle monitors your AI agents in production. Detects silent failures, loops, tool errors, and drift — and explains root causes before your users notice.",
  keywords: [
    "AI agent monitoring",
    "agent failure detection",
    "LangChain monitoring",
    "AI observability",
    "agent debugging",
    "production AI agents",
    "LLM monitoring",
    "AI agent tracing",
    "agent loop detection",
    "AI drift detection",
    "OpenAI agents monitoring",
    "LangGraph observability",
  ],
  authors: [{ name: "Dottle", url: "https://dottle.dev" }],
  creator: "Dottle",
  publisher: "Dottle",
  category: "Technology",
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
      "Dottle monitors your AI agents in production. Detects silent failures, loops, and drift — and explains root causes before your users notice.",
    siteName: "Dottle",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Dottle — AI Agent Failure Detection",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dottle — AI Agent Failure Detection",
    description:
      "Dottle monitors your AI agents in production. Detects silent failures, loops, and drift — and explains root causes before your users notice.",
    creator: "@dottle_dev",
    images: ["/opengraph-image"],
  },
  alternates: {
    canonical: "https://dottle.dev",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://dottle.dev/#org",
      name: "Dottle",
      url: "https://dottle.dev",
      logo: "https://dottle.dev/opengraph-image",
      sameAs: ["https://twitter.com/dottle_dev"],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        url: "https://cal.com/abhinawago/30min",
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://dottle.dev/#website",
      url: "https://dottle.dev",
      name: "Dottle",
      publisher: { "@id": "https://dottle.dev/#org" },
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://dottle.dev/#product",
      name: "Dottle",
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Web",
      url: "https://dottle.dev",
      description:
        "AI agent monitoring platform. Detects silent failures, loops, tool errors, and behavioral drift in production AI agents.",
      offers: [
        {
          "@type": "Offer",
          name: "Hobby",
          price: "0",
          priceCurrency: "USD",
          description: "10k traces/month, free forever",
        },
        {
          "@type": "Offer",
          name: "Team",
          price: "199",
          priceCurrency: "USD",
          description: "1M traces/month, Slack + PagerDuty alerts",
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
