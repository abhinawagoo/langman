import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#082a3a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          padding: "0 100px",
          position: "relative",
        }}
      >
        {/* Background grid lines — subtle depth */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          display: "flex",
        }} />

        {/* Top label */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 52 }}>
          <div style={{ width: 8, height: 8, borderRadius: 99, background: "#D97757", display: "flex" }} />
          <span style={{ color: "#D97757", fontSize: 15, letterSpacing: "0.14em", textTransform: "uppercase" }}>
            AI Agent Monitoring
          </span>
        </div>

        {/* Wordmark */}
        <div style={{ display: "flex", alignItems: "baseline", fontSize: 100, fontWeight: 500, letterSpacing: "-0.045em", lineHeight: 1 }}>
          <span style={{ color: "#FAFAF9" }}>dottle</span>
          <span style={{ color: "#D97757", fontWeight: 700 }}>.</span>
          <span style={{ color: "#FAFAF9", opacity: 0.4, fontWeight: 400 }}>dev</span>
        </div>

        {/* Tagline */}
        <div style={{
          marginTop: 28,
          fontSize: 26,
          color: "rgba(250,250,249,0.55)",
          letterSpacing: "-0.01em",
          textAlign: "center",
          maxWidth: 680,
          lineHeight: 1.4,
          display: "flex",
        }}>
          Detect agent failures before your users do
        </div>

        {/* Feature pills row */}
        <div style={{ display: "flex", gap: 16, marginTop: 64 }}>
          {["Silent failure detection", "Loop & drift alerts", "Full trace visibility"].map((label) => (
            <div
              key={label}
              style={{
                display: "flex",
                padding: "10px 20px",
                borderRadius: 99,
                border: "1px solid rgba(217,119,87,0.3)",
                background: "rgba(217,119,87,0.08)",
                color: "rgba(250,250,249,0.7)",
                fontSize: 14,
                letterSpacing: "-0.005em",
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
