"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import DottleMascot from "./components/dottle-mascot";

const A  = "#D97757";
const BG = "#FAFAF9";
const FG = "#111111";

function useWindowWidth() {
  const [w, setW] = useState(1280);
  useEffect(() => {
    setW(window.innerWidth);
    const onResize = () => setW(window.innerWidth);
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return w;
}

export default function NotFound() {
  const w = useWindowWidth();
  const mascotSize = Math.min(1280, Math.max(320, w * 0.88));

  return (
    <div style={{
      background: BG, color: FG, fontFamily: "var(--font-sans)",
      minHeight: "100vh", display: "flex", flexDirection: "column",
      overflow: "hidden",
    }}>
      <div style={{ padding: "28px 36px" }}>
        <Link
          href="/"
          style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            fontSize: 14, fontWeight: 500, color: "rgba(17,17,17,0.5)",
            textDecoration: "none", letterSpacing: "-0.005em",
          }}
        >
          ← Back
        </Link>
      </div>

      <div style={{
        flex: 1, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        textAlign: "center", padding: "0 32px 80px",
      }}>
        <DottleMascot variant="detecting" size={mascotSize} />
        <h1 style={{
          marginTop: 16, marginBottom: 8,
          fontFamily: "var(--font-display)",
          fontSize: "clamp(28px, 4vw, 48px)",
          fontWeight: 500, letterSpacing: "-0.03em",
        }}>
          Something went wrong
        </h1>
        <p style={{
          marginTop: 0, marginBottom: 40,
          color: "rgba(17,17,17,0.45)", fontSize: 16,
          lineHeight: 1.6, maxWidth: 360,
        }}>
          We couldn&rsquo;t find that page. The agent may have taken a wrong turn.
        </p>
        <Link
          href="/"
          style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "13px 28px", borderRadius: 9,
            fontFamily: "var(--font-sans)", fontSize: 15, fontWeight: 500,
            background: A, color: "#fff", textDecoration: "none",
            letterSpacing: "-0.01em",
          }}
        >
          Go home →
        </Link>
      </div>
    </div>
  );
}
