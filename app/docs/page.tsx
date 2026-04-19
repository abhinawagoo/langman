"use client";

import Link from "next/link";

const A   = "#D97757";
const BG  = "#FAFAF9";
const FG  = "#111111";
const CAL = "https://cal.com/abhinawago/30min";

function Wordmark({ size = 22, color = FG }: { size?: number; color?: string }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "baseline", fontFamily: "var(--font-display)", fontWeight: 500, fontSize: size, letterSpacing: "-0.02em", color, lineHeight: 1 }}>
      dottle<span style={{ color: A, fontWeight: 700 }}>.</span><span style={{ opacity: 0.5, fontWeight: 400 }}>dev</span>
    </span>
  );
}

export default function DocsPage() {
  return (
    <div style={{
      background: BG, color: FG, fontFamily: "var(--font-sans)",
      minHeight: "100vh", display: "flex", flexDirection: "column",
    }}>
      {/* Back button */}
      <div style={{ padding: "28px 36px" }}>
        <Link
          href="/"
          style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            fontSize: 14, fontWeight: 500, color: "rgba(17,17,17,0.5)",
            textDecoration: "none", letterSpacing: "-0.005em",
            transition: "color 160ms ease",
          }}
        >
          ← Back
        </Link>
      </div>

      {/* Centered content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 32px 80px" }}>
        <Wordmark size={96} />
        <p style={{
          marginTop: 28, marginBottom: 0,
          fontFamily: "var(--font-display)",
          fontSize: "clamp(18px, 2vw, 24px)",
          fontWeight: 400,
          color: "rgba(17,17,17,0.45)",
          letterSpacing: "-0.015em",
        }}>
          Docs coming soon.
        </p>
        <p style={{ marginTop: 12, marginBottom: 48, color: "rgba(17,17,17,0.38)", fontSize: 15, lineHeight: 1.6, maxWidth: 360 }}>
          In the meantime, book a call and we&rsquo;ll walk you through everything.
        </p>
        <a
          href={CAL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            padding: "13px 28px", borderRadius: 9,
            fontFamily: "var(--font-sans)", fontSize: 15, fontWeight: 500,
            background: A, color: "#fff", textDecoration: "none",
            letterSpacing: "-0.01em",
          }}
        >
          Book a Call →
        </a>
      </div>
    </div>
  );
}
