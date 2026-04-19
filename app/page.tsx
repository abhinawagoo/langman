"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

// ─── Responsive hook ───────────────────────────────────────────────────────────
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

// ─── Design tokens ─────────────────────────────────────────────────────────────
const REGISTER = "https://app.dottle.dev/register";
const LOGIN    = "https://app.dottle.dev/login";
const CAL      = "https://cal.com/abhinawago/30min";
const A      = "#D97757";
const BG     = "#FAFAF9";
const FG     = "#111111";
const MUTED  = "rgba(17,17,17,0.6)";
const LINE   = "rgba(0,0,0,0.08)";
const PANEL  = "#FFFFFF";
const DBG    = "#082a3a";
const DFG    = "#FAFAF9";
const DMUTED = "rgba(250,250,249,0.55)";
const _DLINE = "rgba(255,255,255,0.08)"; void _DLINE;

// ─── Icons ─────────────────────────────────────────────────────────────────────
function IcoArrow() {
  return (
    <svg viewBox="0 0 16 16" width={14} height={14} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}
function IcoCheck({ size = 14 }: { size?: number }) {
  return (
    <svg viewBox="0 0 16 16" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8.5l3.2 3.2L13 5" />
    </svg>
  );
}
function IcoSpark() {
  return (
    <svg viewBox="0 0 16 16" width={14} height={14} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 1.5v4M8 10.5v4M1.5 8h4M10.5 8h4M3.5 3.5l2.8 2.8M9.7 9.7l2.8 2.8M12.5 3.5L9.7 6.3M6.3 9.7L3.5 12.5" />
    </svg>
  );
}
function IcoAlert() {
  return (
    <svg viewBox="0 0 16 16" width={14} height={14} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 1.5L15 14H1z M8 6v4 M8 12v.01" />
    </svg>
  );
}
function IcoTrace() {
  return (
    <svg viewBox="0 0 16 16" width={14} height={14} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1.5" y="3"  width="9"  height="2" rx="1" />
      <rect x="3"   y="7"  width="10" height="2" rx="1" />
      <rect x="5.5" y="11" width="7"  height="2" rx="1" />
    </svg>
  );
}
function IcoFlask() {
  return (
    <svg viewBox="0 0 16 16" width={14} height={14} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 1.5h4M6.5 1.5v4L3 12.5a1.5 1.5 0 001.3 2.3h7.4a1.5 1.5 0 001.3-2.3L9.5 5.5v-4" />
      <path d="M4.5 10h7" />
    </svg>
  );
}
function IcoSlack() {
  return (
    <svg viewBox="0 0 16 16" width={14} height={14} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2"  y="6"  width="4" height="2" rx="1" />
      <rect x="10" y="8"  width="4" height="2" rx="1" />
      <rect x="6"  y="2"  width="2" height="4" rx="1" />
      <rect x="8"  y="10" width="2" height="4" rx="1" />
      <rect x="6"  y="6"  width="4" height="4" rx="1" />
    </svg>
  );
}

// ─── Data ──────────────────────────────────────────────────────────────────────
const ALERT_DATA = [
  {
    phrase: "users complain",
    desc: "Dottle correlates complaint spikes to agent run failures in real time — before your on-call even wakes up.",
  },
  {
    phrase: "your agent silently fails",
    desc: "status=OK in your logs, broken output for your user. Dottle detects silent regressions no logger will ever catch.",
  },
  {
    phrase: "tools start failing",
    desc: "One flaky API call cascades into 43 retries. Dottle catches the pattern and alerts you before costs spiral.",
  },
  {
    phrase: "your agent refuses a request",
    desc: "Model safety filters or prompt drift blocking legitimate requests. Dottle flags refusal rate spikes instantly.",
  },
  {
    phrase: "new models misbehave",
    desc: "You shipped a new model. Dottle A/B compares output quality and alerts on the first sign of regression.",
  },
  {
    phrase: "trajectories go abnormal",
    desc: "Your agent took 47 steps when it usually takes 8. Dottle catches runaway planning loops in under 10 seconds.",
  },
  {
    phrase: "latency crosses p95",
    desc: "p95 latency just crossed your SLA. Dottle traces the slowest run end-to-end and shows you exactly which step caused it.",
  },
  {
    phrase: "costs spike on a tenant",
    desc: "One tenant is burning 40× their usual token budget. Dottle isolates cost anomalies before they hit your invoice.",
  },
];

const FEATURES = [
  { kicker: "Detect",     title: "Detect failures automatically",     body: "Loops, tool errors, bad outputs — caught the moment they happen. No manual thresholds or configs.",                   icon: IcoSpark  },
  { kicker: "Trace",      title: "Trace every agent run",             body: "Every step, tool call, and LLM decision captured end-to-end. Full timeline, not just error lines.",                  icon: IcoTrace  },
  { kicker: "Isolate",    title: "Highlight exactly where it failed", body: 'Not "something broke at step 4." The exact call, input, and response — isolated and explained.',                    icon: IcoAlert  },
  { kicker: "Diagnose",   title: "Suggest the root cause",            body: "Pattern-matched diagnosis across thousands of agent runs. We tell you why and how to fix it.",                       icon: IcoCheck  },
  { kicker: "Experiment", title: "A/B test prompts in production",    body: "Compare prompts, models, and configs side-by-side with statistical rigor. Know what actually works.",               icon: IcoFlask  },
  { kicker: "Alert",      title: "Slack the right person, fast",      body: "Real-time alerts when agents spike errors or drift. Know about issues before users report them.",                    icon: IcoSlack  },
];

const TESTIMONIALS = [
  { quote: "Dottle caught a silent regression in our refund agent that ran for three days before anyone noticed. It paid for itself the first week.", name: "Priya Raman",  title: "Staff Eng, Northpike"  },
  { quote: "We replaced three dashboards and a cron job with one dottle install. Our on-call pages dropped 60%.",                                     name: "Marcus Ade",   title: "Platform Lead, Lumen"  },
  { quote: "Finally, a tool that tells us what broke instead of showing us a wall of JSON. The root cause suggestions are scary-accurate.",           name: "Jules Corbin", title: "Head of AI, Harbor"    },
];

const PLANS = [
  { name: "Hobby",      price: "Free",   tag: "For solo builders",    feats: ["10k traces/mo", "3-day retention", "Community Slack", "Core detections"],                        featured: false },
  { name: "Team",       price: "$199",   tag: "Per project / month",  feats: ["1M traces/mo", "30-day retention", "Slack + PagerDuty alerts", "A/B prompt testing", "RBAC"],   featured: true  },
  { name: "Enterprise", price: "Custom", tag: "Talk to us",           feats: ["Unlimited volume", "Self-hosted option", "SAML + SCIM", "Dedicated support", "Custom detections"], featured: false },
];

const FOOTER_COLS = [
  { h: "Product",    items: ["Overview", "Tracing", "Alerts", "A/B testing", "Changelog"]               },
  { h: "Developers", items: ["Documentation", "Python SDK", "TypeScript SDK", "API reference", "Status"]  },
  { h: "Company",    items: ["About", "Customers", "Careers", "Blog", "Contact"]                         },
  { h: "Legal",      items: ["Privacy", "Terms", "Security", "SOC 2", "DPA"]                             },
];

const AGENT_CODE = `from dottle import Dottle
from openai import OpenAI

dottle = Dottle(project="support-agent")

@dottle.trace
def run_agent(user_msg: str):
    # Dottle auto-captures every tool call,
    # LLM response, and control flow decision
    return agent.invoke(user_msg)

# That's it. Drift, loops, and silent
# failures are flagged automatically.`;

// ─── Shared primitives ─────────────────────────────────────────────────────────
function Wordmark({ size = 22, color = FG }: { size?: number; color?: string }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "baseline", fontFamily: "var(--font-display)", fontWeight: 500, fontSize: size, letterSpacing: "-0.02em", color, lineHeight: 1, transition: "color 400ms ease" }}>
      dottle<span style={{ color: A, fontWeight: 700 }}>.</span><span style={{ opacity: 0.5, fontWeight: 400 }}>dev</span>
    </span>
  );
}

type BtnVariant = "primary" | "ghost" | "subtle";
function Btn({ children, variant = "primary", style, href, ...props }: { children: React.ReactNode; variant?: BtnVariant; style?: React.CSSProperties; href?: string; onClick?: () => void; type?: "button" | "submit" }) {
  const base: React.CSSProperties = {
    display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 16px", borderRadius: 8,
    fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 500, letterSpacing: "-0.005em",
    cursor: "pointer", border: "1px solid transparent", transition: "all 160ms ease", background: "transparent",
    textDecoration: "none",
  };
  const v: Record<BtnVariant, React.CSSProperties> = {
    primary: { background: A, color: "#fff", border: `1px solid ${A}` },
    ghost:   { background: "transparent", color: FG, border: `1px solid ${LINE}` },
    subtle:  { background: "transparent", color: MUTED, border: "1px solid transparent" },
  };
  const combined = { ...base, ...v[variant], ...style };
  if (href) return <a href={href} target="_blank" rel="noopener noreferrer" style={combined}>{children}</a>;
  return <button {...props} style={combined}>{children}</button>;
}

function SectionLabel({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: dark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", gap: 8 }}>
      <span style={{ width: 6, height: 6, borderRadius: 99, background: A, display: "inline-block", flexShrink: 0 }} />
      {children}
    </div>
  );
}

function CodeBlock({ code }: { code: string }) {
  const lines = code.trim().split("\n");
  function hi(line: string) {
    const parts: { t: string; m: string }[] = [];
    const p = line
      .replace(/(#[^\n]*)/g, "\u0001$1\u0002")
      .replace(/("(?:[^"\\]|\\.)*")/g, "\u0003$1\u0004")
      .replace(/\b(import|from|def|return|await|async|as|class|if|else|with|for|in)\b/g, "\u0005$1\u0006");
    let buf = "", mode = "text";
    for (const ch of p) {
      if (ch === "\u0001") { if (buf) parts.push({ t: buf, m: mode }); buf = ""; mode = "c"; continue; }
      if (ch === "\u0002") { if (buf) parts.push({ t: buf, m: mode }); buf = ""; mode = "text"; continue; }
      if (ch === "\u0003") { if (buf) parts.push({ t: buf, m: mode }); buf = ""; mode = "s"; continue; }
      if (ch === "\u0004") { if (buf) parts.push({ t: buf, m: mode }); buf = ""; mode = "text"; continue; }
      if (ch === "\u0005") { if (buf) parts.push({ t: buf, m: mode }); buf = ""; mode = "k"; continue; }
      if (ch === "\u0006") { if (buf) parts.push({ t: buf, m: mode }); buf = ""; mode = "text"; continue; }
      buf += ch;
    }
    if (buf) parts.push({ t: buf, m: mode });
    return parts;
  }
  const col = (m: string) => m === "c" ? "#6b7280" : m === "s" ? "#0f5132" : m === "k" ? "#6d28d9" : "inherit";
  return (
    <pre style={{ margin: 0, padding: "18px 20px", background: "rgba(0,0,0,0.035)", border: `1px solid rgba(0,0,0,0.07)`, borderRadius: 10, fontFamily: "var(--font-mono)", fontSize: 13, lineHeight: 1.7, color: FG, overflow: "auto" }}>
      {lines.map((line, i) => (
        <div key={i} style={{ display: "flex" }}>
          <span style={{ display: "inline-block", width: 24, opacity: 0.35, userSelect: "none", flexShrink: 0 }}>{i + 1}</span>
          <span>{hi(line).map((r, k) => <span key={k} style={{ color: col(r.m), fontStyle: r.m === "c" ? "italic" : "normal" }}>{r.t}</span>)}</span>
        </div>
      ))}
    </pre>
  );
}

// ─── Alert visual panels ───────────────────────────────────────────────────────
const cardWrap: React.CSSProperties = {
  background: "#051e2c", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 12,
  overflow: "hidden", fontFamily: "var(--font-mono)", fontSize: 12, color: "#e8e4dd",
  height: "100%", display: "flex", flexDirection: "column",
};
const cardHdr: React.CSSProperties = {
  padding: "10px 16px", borderBottom: "1px solid rgba(255,255,255,0.07)",
  display: "flex", alignItems: "center", gap: 8, fontSize: 11,
  color: "rgba(255,255,255,0.38)", letterSpacing: "0.07em", textTransform: "uppercase",
};

function VisualComplaint() {
  return (
    <div style={cardWrap}>
      <div style={cardHdr}><span style={{ width: 6, height: 6, borderRadius: 99, background: A, display: "inline-block" }} />Dottle · alert dashboard</div>
      <div style={{ padding: "14px 16px", display: "grid", gap: 10, flex: 1 }}>
        {[
          { level: 1, agent: "billing.refund", msg: '"This app never works properly"', who: "user_id: u_8291 · 2m ago" },
          { level: 0.5, agent: "support.triage", msg: '"Got a completely wrong answer again"', who: "user_id: u_1144 · 4m ago" },
        ].map((r, i) => (
          <div key={i} style={{ padding: "11px 13px", background: `rgba(217,119,87,${r.level * 0.1})`, borderLeft: `2px solid rgba(217,119,87,${r.level * 0.8})`, borderRadius: "0 6px 6px 0" }}>
            <div style={{ color: `rgba(217,119,87,${0.6 + r.level * 0.4})`, fontSize: 10, marginBottom: 4, letterSpacing: "0.05em" }}>COMPLAINT · {r.agent}</div>
            <div style={{ color: "#e8e4dd", fontSize: 13, marginBottom: 4 }}>{r.msg}</div>
            <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 11 }}>{r.who}</div>
          </div>
        ))}
        <div style={{ display: "flex", justifyContent: "space-between", color: "rgba(255,255,255,0.35)", fontSize: 11, paddingTop: 4 }}>
          <span>↑ 340% complaint rate in 10m</span>
          <span style={{ color: A }}>→ Slack alerted</span>
        </div>
      </div>
    </div>
  );
}

function VisualSilentFail() {
  const rows = [
    { n: "01", label: "Input received",      bad: false },
    { n: "02", label: "Context retrieved",    bad: false },
    { n: "03", label: "fetch_product()",      bad: true  },
    { n: "04", label: "LLM call",             bad: false },
    { n: "05", label: "Response sent",        bad: false },
  ];
  return (
    <div style={cardWrap}>
      <div style={cardHdr}>
        <span style={{ width: 6, height: 6, borderRadius: 99, background: "#4ade80", display: "inline-block" }} />
        run_id=18292 · status=ok
        <span style={{ marginLeft: "auto", color: A }}>silent failure ↗</span>
      </div>
      <div style={{ padding: "14px 16px", display: "grid", gap: 8, flex: 1 }}>
        {rows.map(r => (
          <div key={r.n} style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <span style={{ color: "rgba(255,255,255,0.25)", width: 20 }}>{r.n}</span>
            <span style={{ flex: 1, color: r.bad ? A : "rgba(255,255,255,0.6)" }}>{r.label}</span>
            <span style={{ color: "#4ade80", fontSize: 11 }}>OK</span>
          </div>
        ))}
      </div>
      <div style={{ margin: "0 16px 14px", padding: "10px 12px", background: "rgba(217,119,87,0.1)", borderRadius: 6, border: `1px solid rgba(217,119,87,0.18)` }}>
        <div style={{ color: A, fontSize: 10, marginBottom: 4, letterSpacing: "0.05em" }}>DOTTLE DETECTED</div>
        <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, lineHeight: 1.5 }}>fetch_product() returned null · result passed as empty context · user received hallucinated response</div>
      </div>
    </div>
  );
}

function VisualToolFail() {
  const tools = [
    { name: "search_crm",   rate: 17, bad: true  },
    { name: "fetch_product", rate: 8,  bad: false },
    { name: "send_email",    rate: 0,  bad: false },
    { name: "query_db",      rate: 2,  bad: false },
  ];
  return (
    <div style={cardWrap}>
      <div style={cardHdr}><span style={{ width: 6, height: 6, borderRadius: 99, background: A, display: "inline-block" }} />Tool health · last 5 min</div>
      <div style={{ padding: "14px 16px", flex: 1 }}>
        {tools.map(t => (
          <div key={t.name} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
            <span style={{ flex: 1, color: t.bad ? A : "rgba(255,255,255,0.65)" }}>{t.name}</span>
            <div style={{ width: 100, height: 5, background: "rgba(255,255,255,0.07)", borderRadius: 99, overflow: "hidden" }}>
              <div style={{ width: `${Math.min(t.rate * 5, 100)}%`, height: "100%", background: t.rate > 10 ? A : t.rate > 4 ? "#fbbf24" : "#4ade80", borderRadius: 99 }} />
            </div>
            <span style={{ color: t.bad ? A : "rgba(255,255,255,0.4)", width: 36, textAlign: "right", fontSize: 11 }}>{t.rate}%</span>
          </div>
        ))}
        <div style={{ marginTop: 4, padding: "8px 10px", background: "rgba(217,119,87,0.1)", borderRadius: 6, color: A, fontSize: 11 }}>
          search_crm timeout rate is 17% — 5× above baseline
        </div>
      </div>
    </div>
  );
}

function VisualRefuses() {
  return (
    <div style={cardWrap}>
      <div style={cardHdr}><span style={{ width: 6, height: 6, borderRadius: 99, background: A, display: "inline-block" }} />run_id=19041 · refusal detected</div>
      <div style={{ padding: "14px 16px", display: "grid", gap: 10, flex: 1 }}>
        <div style={{ padding: "10px 12px", background: "rgba(255,255,255,0.04)", borderRadius: 6 }}>
          <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 10, marginBottom: 4 }}>USER</div>
          <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 13 }}>Process this refund for order #18291</div>
        </div>
        <div style={{ padding: "10px 12px", background: "rgba(217,119,87,0.08)", borderRadius: 6, borderLeft: `2px solid ${A}` }}>
          <div style={{ color: A, fontSize: 10, marginBottom: 4 }}>AGENT</div>
          <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, lineHeight: 1.5 }}>{"I'm sorry, I can't process refunds directly. Please contact support at..."}</div>
        </div>
        <div style={{ padding: "8px 10px", background: "rgba(217,119,87,0.1)", borderRadius: 6, color: A, fontSize: 11 }}>
          Refusal rate ↑ 12% in last 30 min · prompt drift detected
        </div>
      </div>
    </div>
  );
}

function VisualModelRegression() {
  const cols = [
    { label: "gpt-4o",  vals: ["98.2%", "1.2s", "$0.004"], bad: false },
    { label: "gpt-4.1", vals: ["91.4%", "2.8s", "$0.011"], bad: true  },
  ];
  const metrics = ["success rate", "p50 latency", "cost / run"];
  return (
    <div style={cardWrap}>
      <div style={cardHdr}><span style={{ width: 6, height: 6, borderRadius: 99, background: A, display: "inline-block" }} />A/B model comparison · production</div>
      <div style={{ padding: "14px 16px", flex: 1 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 1, background: "rgba(255,255,255,0.06)", borderRadius: 8, overflow: "hidden", marginBottom: 12 }}>
          <div style={{ padding: "8px 10px", background: "#041620" }} />
          {cols.map((c, ci) => (
            <div key={ci} style={{ padding: "8px 10px", background: c.bad ? "rgba(217,119,87,0.07)" : "#07202e", color: c.bad ? A : "rgba(255,255,255,0.7)", fontSize: 12, fontWeight: 500 }}>
              {c.label}
            </div>
          ))}
          {metrics.map((m, mi) => (
            <>
              <div key={`m${mi}`} style={{ padding: "8px 10px", background: "#041620", color: "rgba(255,255,255,0.35)", fontSize: 11 }}>{m}</div>
              {cols.map((c, ci) => (
                <div key={`v${mi}${ci}`} style={{ padding: "8px 10px", background: c.bad ? "rgba(217,119,87,0.05)" : "#061e2b", color: c.bad && mi === 0 ? A : "rgba(255,255,255,0.75)", fontSize: 12 }}>
                  {c.vals[mi]}
                </div>
              ))}
            </>
          ))}
        </div>
        <div style={{ color: A, fontSize: 11 }}>→ Regression detected: −6.8pp success rate · auto-rollback triggered</div>
      </div>
    </div>
  );
}

function VisualAbnormalTrajectory() {
  const runs = [
    { id: "run_18291", steps: 47, bad: true  },
    { id: "run_18290", steps:  9, bad: false },
    { id: "run_18289", steps:  7, bad: false },
    { id: "run_18288", steps:  8, bad: false },
  ];
  return (
    <div style={cardWrap}>
      <div style={cardHdr}><span style={{ width: 6, height: 6, borderRadius: 99, background: A, display: "inline-block" }} />Trajectory · sales.qualifier</div>
      <div style={{ padding: "14px 16px", flex: 1 }}>
        {runs.map(r => (
          <div key={r.id} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
            <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, width: 76 }}>{r.id}</span>
            <div style={{ flex: 1, height: 8, background: "rgba(255,255,255,0.05)", borderRadius: 99, overflow: "hidden" }}>
              <div style={{ width: `${Math.min((r.steps / 50) * 100, 100)}%`, height: "100%", background: r.bad ? A : "rgba(255,255,255,0.25)", borderRadius: 99, transition: "width 0.6s ease" }} />
            </div>
            <span style={{ color: r.bad ? A : "rgba(255,255,255,0.45)", fontSize: 12, width: 52, textAlign: "right" }}>{r.steps} steps</span>
          </div>
        ))}
        <div style={{ marginTop: 6, padding: "8px 10px", background: "rgba(217,119,87,0.1)", borderRadius: 6, color: A, fontSize: 11 }}>
          run_18291 took 47 steps · avg is 8 · infinite loop detected
        </div>
      </div>
    </div>
  );
}

function VisualLatency() {
  const bars = [12, 15, 14, 18, 13, 16, 19, 24, 38, 72, 91, 84, 46, 28, 17];
  const max = Math.max(...bars);
  return (
    <div style={cardWrap}>
      <div style={cardHdr}><span style={{ width: 6, height: 6, borderRadius: 99, background: A, display: "inline-block" }} />Latency · p95 · last 15 min</div>
      <div style={{ padding: "14px 16px", flex: 1 }}>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 72 }}>
          {bars.map((b, i) => (
            <div key={i} style={{ flex: 1, height: `${(b / max) * 100}%`, background: b > 40 ? A : "rgba(255,255,255,0.18)", borderRadius: "2px 2px 0 0" }} />
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "rgba(255,255,255,0.25)", marginTop: 5 }}>
          <span>15m ago</span><span>now</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginTop: 12 }}>
          {([["p50", "1.2s", false], ["p95", "9.1s", true], ["SLA", "3.0s", false]] as [string, string, boolean][]).map(([k, v, bad]) => (
            <div key={k} style={{ padding: "8px 10px", background: bad ? "rgba(217,119,87,0.1)" : "rgba(255,255,255,0.04)", borderRadius: 6, textAlign: "center" }}>
              <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 10 }}>{k}</div>
              <div style={{ color: bad ? A : "#e8e4dd", fontSize: 15, marginTop: 3 }}>{v}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function VisualCostSpike() {
  const tenants = [
    { id: "acme-corp",  cost: "$0.12", pct: 3,   bad: false },
    { id: "harbor-ai",  cost: "$4.80", pct: 100,  bad: true  },
    { id: "northpike",  cost: "$0.09", pct: 2,   bad: false },
    { id: "stackline",  cost: "$0.15", pct: 4,   bad: false },
  ];
  return (
    <div style={cardWrap}>
      <div style={cardHdr}><span style={{ width: 6, height: 6, borderRadius: 99, background: A, display: "inline-block" }} />Cost anomaly · per tenant · last hour</div>
      <div style={{ padding: "14px 16px", flex: 1 }}>
        {tenants.map(t => (
          <div key={t.id} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10, padding: t.bad ? "8px 10px" : "3px 0", background: t.bad ? "rgba(217,119,87,0.08)" : "transparent", borderRadius: t.bad ? 6 : 0, borderLeft: t.bad ? `2px solid ${A}` : "none", paddingLeft: t.bad ? 10 : 0 }}>
            <span style={{ flex: 1, color: t.bad ? A : "rgba(255,255,255,0.55)", fontSize: 12 }}>{t.id}</span>
            <div style={{ width: 80, height: 5, background: "rgba(255,255,255,0.05)", borderRadius: 99, overflow: "hidden" }}>
              <div style={{ width: `${t.pct}%`, height: "100%", background: t.bad ? A : "rgba(255,255,255,0.2)", borderRadius: 99 }} />
            </div>
            <span style={{ color: t.bad ? A : "rgba(255,255,255,0.4)", fontSize: 12, width: 44, textAlign: "right" }}>{t.cost}</span>
          </div>
        ))}
        <div style={{ marginTop: 6, padding: "8px 10px", background: "rgba(217,119,87,0.1)", borderRadius: 6, color: A, fontSize: 11 }}>
          harbor-ai is spending 40× their usual budget · loop suspected
        </div>
      </div>
    </div>
  );
}

const VISUALS = [
  VisualComplaint, VisualSilentFail, VisualToolFail, VisualRefuses,
  VisualModelRegression, VisualAbnormalTrajectory, VisualLatency, VisualCostSpike,
];

// ─── Nav ───────────────────────────────────────────────────────────────────────
function Nav({ dark = false }: { dark?: boolean }) {
  const isMobile = useWindowWidth() < 768;
  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 20,
      background: dark ? "rgba(8,42,58,0.92)" : "rgba(250,250,249,0.8)",
      backdropFilter: "saturate(180%) blur(10px)", WebkitBackdropFilter: "saturate(180%) blur(10px)",
      borderBottom: dark ? "1px solid rgba(255,255,255,0.08)" : `1px solid ${LINE}`,
      transition: "background 400ms ease, border-color 400ms ease",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: isMobile ? "14px 20px" : "14px 32px", display: "flex", alignItems: "center", gap: 24 }}>
        <Wordmark color={dark ? DFG : FG} />
        {!isMobile && (
          <div style={{ display: "flex", gap: 24, fontSize: 13.5, color: dark ? "rgba(250,250,249,0.6)" : MUTED, transition: "color 400ms ease" }}>
            {([
              { label: "Product",   href: "#features" },
              { label: "Docs",      href: "/docs" },
              { label: "Pricing",   href: "#pricing" },
              { label: "Changelog", href: "#" },
              { label: "Customers", href: "#" },
            ] as { label: string; href: string }[]).map(({ label, href }) => (
              <Link key={label} href={href} style={{ cursor: "pointer", color: "inherit", textDecoration: "none" }}>{label}</Link>
            ))}
          </div>
        )}
        <div style={{ marginLeft: "auto", display: "flex", gap: 8, alignItems: "center" }}>
          {!isMobile && <Btn variant="subtle" href={LOGIN} style={dark ? { color: "rgba(250,250,249,0.7)" } : {}}>Sign in</Btn>}
          <Btn variant="primary" href={REGISTER} style={isMobile ? { padding: "8px 14px", fontSize: 13 } : {}}>Start free</Btn>
        </div>
      </div>
    </nav>
  );
}

// ─── Hero ──────────────────────────────────────────────────────────────────────
function Hero() {
  const w = useWindowWidth();
  const isMobile = w < 768;
  return (
    <section style={{ maxWidth: 1200, margin: "0 auto", padding: isMobile ? "64px 20px 56px" : "120px 32px 96px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "6px 12px", borderRadius: 99, border: `1px solid ${LINE}`, background: PANEL, fontSize: 12, fontFamily: "var(--font-mono)", color: MUTED }}>
          <span style={{ width: 6, height: 6, borderRadius: 99, background: A, display: "inline-block" }} />
          v0.8 — open beta, SOC 2 in progress
        </div>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(40px, 7vw, 96px)", lineHeight: 1.0, letterSpacing: "-0.04em", fontWeight: 500, margin: "24px 0 20px", color: FG }}>
          Production monitoring for AI agents.
        </h1>
        <p style={{ fontSize: isMobile ? 16 : 21, lineHeight: 1.5, color: MUTED, maxWidth: 640, margin: "0 auto", letterSpacing: "-0.005em" }}>
          Catch agent drift before your users do. Detect silent regressions across every session, tool call, and LLM interaction — without writing a single threshold.
        </p>
        <div style={{ display: "flex", gap: 12, marginTop: 36, justifyContent: "center", flexWrap: "wrap" }}>
          <Btn variant="primary" href={REGISTER}>Start free <IcoArrow /></Btn>
          <Btn variant="ghost" href={CAL}>Book a Demo</Btn>
        </div>
        <div style={{ marginTop: 28, fontFamily: "var(--font-mono)", fontSize: 12, color: MUTED, display: "flex", gap: isMobile ? 8 : 16, flexWrap: "wrap", justifyContent: "center" }}>
          <span>$ pip install dottle</span>
          {!isMobile && <span style={{ opacity: 0.5 }}>·</span>}
          <span>2 lines to instrument</span>
          {!isMobile && <span style={{ opacity: 0.5 }}>·</span>}
          <span>Works with any framework</span>
        </div>
      </div>
      <div style={{ marginTop: isMobile ? 56 : 96, paddingTop: 32, borderTop: `1px solid ${LINE}`, display: "flex", alignItems: "center", gap: isMobile ? 16 : 48, flexWrap: "wrap", justifyContent: isMobile ? "center" : undefined, fontFamily: "var(--font-mono)", fontSize: 11, color: MUTED, letterSpacing: "0.1em", textTransform: "uppercase" }}>
        <span style={{ width: isMobile ? "100%" : undefined, textAlign: isMobile ? "center" : undefined }}>Trusted by teams shipping agents at</span>
        {["NORTHPIKE", "Lumen/AI", "HARBOR", "axiom.so", "Meridian", "stackline"].map(n => (
          <span key={n} style={{ fontSize: 15, letterSpacing: "-0.01em", color: FG, opacity: 0.7, fontFamily: "var(--font-display)", textTransform: "none" }}>{n}</span>
        ))}
      </div>
    </section>
  );
}

// ─── Features ──────────────────────────────────────────────────────────────────
function Features() {
  const w = useWindowWidth();
  const cols = w < 640 ? "1fr" : w < 1024 ? "repeat(2, 1fr)" : "repeat(3, 1fr)";
  return (
    <section id="features" style={{ maxWidth: 1200, margin: "0 auto", padding: w < 768 ? "56px 20px" : "80px 32px" }}>
      <div style={{ maxWidth: 680, marginBottom: 48 }}>
        <SectionLabel>Why dottle</SectionLabel>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 3.6vw, 48px)", lineHeight: 1.08, letterSpacing: "-0.03em", fontWeight: 500, margin: "16px 0 12px" }}>
          We don&rsquo;t just show logs. We tell you what broke.
        </h2>
        <p style={{ fontSize: 16, color: MUTED, lineHeight: 1.5, margin: 0 }}>
          Other tools give you observability — a passive stream of data you still have to interpret. Dottle does the analysis for you.
        </p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: cols, gap: 1, background: LINE, border: `1px solid ${LINE}`, borderRadius: 14, overflow: "hidden" }}>
        {FEATURES.map(f => (
          <div key={f.title} style={{ background: PANEL, padding: 24, minHeight: 200 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, color: A }}>
              <f.icon />
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase" }}>{f.kicker}</span>
            </div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 500, letterSpacing: "-0.015em", margin: "14px 0 10px", lineHeight: 1.25 }}>{f.title}</div>
            <div style={{ color: MUTED, fontSize: 14.5, lineHeight: 1.55 }}>{f.body}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── How it works ──────────────────────────────────────────────────────────────
function HowItWorks() {
  const isMobile = useWindowWidth() < 1024;
  return (
    <section id="how" style={{ maxWidth: 1200, margin: "0 auto", padding: isMobile ? "40px 20px 56px" : "40px 32px 80px" }}>
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1.1fr", gap: isMobile ? 36 : 64, alignItems: "center" }}>
        <div>
          <SectionLabel>How it works</SectionLabel>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 3vw, 40px)", lineHeight: 1.1, letterSpacing: "-0.025em", fontWeight: 500, margin: "16px 0 16px" }}>
            Two lines. Every step captured.
          </h2>
          <p style={{ color: MUTED, fontSize: 16, lineHeight: 1.55, margin: "0 0 24px" }}>
            Drop the SDK in. Dottle instruments your agent&rsquo;s tools, LLM calls, and control flow automatically. No custom spans, no manual thresholds.
          </p>
          <ol style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 14 }}>
            {["Install the SDK", "Wrap your agent entrypoint", "Ship to prod — dottle watches from step 1"].map((t, i) => (
              <li key={i} style={{ display: "flex", gap: 14, alignItems: "baseline", fontSize: 15 }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: A, width: 20, flexShrink: 0 }}>0{i + 1}</span>
                <span>{t}</span>
              </li>
            ))}
          </ol>
        </div>
        <CodeBlock code={AGENT_CODE} />
      </div>
    </section>
  );
}

// ─── Scroll-driven Alerts Reel ─────────────────────────────────────────────────
function AlertsReel({ onDarkChange }: { onDarkChange?: (dark: boolean) => void }) {
  const isMobile    = useWindowWidth() < 768;
  const wrapperRef  = useRef<HTMLDivElement>(null);
  const hasScrolled = useRef(false);
  const [step, setStep] = useState(0);
  const N = ALERT_DATA.length;

  useEffect(() => {
    if (isMobile) { onDarkChange?.(false); return; }
    const onScroll = () => {
      const el = wrapperRef.current;
      if (!el) return;
      const rect    = el.getBoundingClientRect();
      const scrolled = Math.max(0, -rect.top);
      const total    = el.offsetHeight - window.innerHeight;
      if (total <= 0) return;
      const progress = Math.min(scrolled / total, 1);
      const next     = Math.min(Math.floor(progress * N), N - 1);
      if (next > 0) hasScrolled.current = true;
      setStep(next);
      onDarkChange?.(rect.top <= 0 && rect.bottom > window.innerHeight * 0.1);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [N, onDarkChange, isMobile]);

  const Visual = VISUALS[step];

  // ── Mobile: static list ──────────────────────────────────────────────────────
  if (isMobile) {
    return (
      <section style={{ background: DBG, padding: "72px 20px 80px" }}>
        <div style={{ marginBottom: 48 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.13em", textTransform: "uppercase", color: A }}>
            <span style={{ width: 6, height: 6, borderRadius: 99, background: A, display: "inline-block" }} />
            Real-time alerts
          </div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px, 8vw, 48px)", lineHeight: 1.08, letterSpacing: "-0.035em", fontWeight: 500, color: DFG, margin: "14px 0 0" }}>
            Get alerts when…
          </h2>
        </div>
        <div style={{ display: "grid", gap: 40 }}>
          {ALERT_DATA.map((item, i) => (
            <div key={i} style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 32 }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(22px, 6vw, 32px)", lineHeight: 1.1, letterSpacing: "-0.025em", fontWeight: 600, color: DFG, margin: "0 0 12px" }}>
                {item.phrase.charAt(0).toUpperCase() + item.phrase.slice(1)}.
              </h3>
              <p style={{ color: DMUTED, fontSize: 15, lineHeight: 1.65, margin: 0 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // ── Desktop: scroll-driven sticky ───────────────────────────────────────────
  // First text is already in place — no slide-in. Subsequent ones fly in from top.
  const textInitial = !hasScrolled.current && step === 0
    ? { opacity: 1, y: 0 }
    : { opacity: 0, y: -80 };

  return (
    <section
      ref={wrapperRef}
      style={{ background: DBG, position: "relative", height: `${(N + 1) * 100}vh` }}
    >
      <div style={{
        position: "sticky", top: 0, height: "100vh", overflow: "hidden",
        display: "flex", alignItems: "stretch",
      }}>

        {/* ── Left: visual — 4:3 frame, slow crossfade ── */}
        <div style={{
          flex: "0 0 62%",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "calc(44px + 10vh) calc(36px + 2vw) calc(44px + 10vh) calc(60px + 2vw)",
        }}>
          {/* Aspect-ratio wrapper — swap Visual() for a Next.js <Image> to add your own artwork */}
          <div style={{ width: "90%", aspectRatio: "4 / 3", position: "relative", borderRadius: 14, overflow: "hidden" }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={`vis-${step}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9, ease: "easeInOut" }}
                style={{ position: "absolute", inset: 0 }}
              >
                <Visual />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ── Right: text — enters from top, exits to bottom ── */}
        <div style={{
          flex: "0 0 38%",
          display: "flex", flexDirection: "column", justifyContent: "center",
          padding: "60px 64px 60px 24px",
          position: "relative", overflow: "hidden",
        }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={`text-${step}`}
              initial={textInitial}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Small label — like the reference screenshot */}
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.13em",
                textTransform: "uppercase", color: A, marginBottom: 28,
              }}>
                <span style={{ width: 6, height: 6, borderRadius: 99, background: A, display: "inline-block" }} />
                Real-time
              </div>

              {/* Large heading */}
              <h3 style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(40px, 5.2vw, 72px)",
                lineHeight: 1.04, letterSpacing: "-0.04em", fontWeight: 600,
                color: DFG, margin: "0 0 28px",
              }}>
                {ALERT_DATA[step].phrase.charAt(0).toUpperCase() + ALERT_DATA[step].phrase.slice(1)}.
              </h3>

              {/* Body */}
              <p style={{ color: DMUTED, fontSize: 18, lineHeight: 1.7, margin: 0, maxWidth: 380 }}>
                {ALERT_DATA[step].desc}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Progress pills */}
          <div style={{ display: "flex", gap: 6, alignItems: "center", marginTop: 56 }}>
            {ALERT_DATA.map((_, i) => (
              <span key={i} style={{
                height: 3, borderRadius: 99, display: "inline-block",
                width: i === step ? 32 : 6,
                background: i === step ? A : i < step ? "rgba(217,119,87,0.3)" : "rgba(255,255,255,0.1)",
                transition: "width 400ms ease, background 400ms ease",
              }} />
            ))}
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "rgba(255,255,255,0.2)", marginLeft: 12 }}>
              scroll
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}

// ─── Testimonials ──────────────────────────────────────────────────────────────
function Testimonials() {
  const w = useWindowWidth();
  const cols = w < 768 ? "1fr" : w < 1024 ? "repeat(2, 1fr)" : "repeat(3, 1fr)";
  return (
    <section style={{ maxWidth: 1200, margin: "0 auto", padding: w < 768 ? "56px 20px" : "80px 32px" }}>
      <SectionLabel>From teams in production</SectionLabel>
      <div style={{ display: "grid", gridTemplateColumns: cols, gap: 20, marginTop: 32 }}>
        {TESTIMONIALS.map((t, i) => (
          <div key={i} style={{ background: PANEL, border: `1px solid ${LINE}`, borderRadius: 12, padding: 24 }}>
            <div style={{ fontSize: 15.5, lineHeight: 1.55, color: FG, letterSpacing: "-0.005em" }}>
              &ldquo;{t.quote}&rdquo;
            </div>
            <div style={{ marginTop: 20, display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: 99, flexShrink: 0, background: `linear-gradient(135deg, ${A}, ${A}66)` }} />
              <div style={{ fontSize: 13 }}>
                <div style={{ fontWeight: 500 }}>{t.name}</div>
                <div style={{ color: MUTED, fontFamily: "var(--font-mono)", fontSize: 11 }}>{t.title}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Pricing ───────────────────────────────────────────────────────────────────
function Pricing() {
  const [hovered, setHovered] = useState<number | null>(null);
  const w = useWindowWidth();
  const cols = w < 768 ? "1fr" : w < 1024 ? "repeat(2, 1fr)" : "repeat(3, 1fr)";
  return (
    <section id="pricing" style={{ maxWidth: 1200, margin: "0 auto", padding: w < 768 ? "56px 20px" : "80px 32px" }}>
      <SectionLabel>Pricing</SectionLabel>
      <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 3.6vw, 48px)", lineHeight: 1.08, letterSpacing: "-0.03em", fontWeight: 500, margin: "16px 0 40px" }}>
        Simple, volume-based pricing.
      </h2>
      <div style={{ display: "grid", gridTemplateColumns: cols, gap: 20 }}>
        {PLANS.map((p, i) => (
          <a
            key={p.name}
            href={p.name === "Enterprise" ? CAL : REGISTER}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{
              background: hovered === i ? "#F2F2F0" : PANEL,
              border: `1px solid ${hovered === i ? "rgba(0,0,0,0.11)" : LINE}`,
              borderRadius: 14,
              padding: 32,
              position: "relative",
              textDecoration: "none",
              color: "inherit",
              display: "block",
              cursor: "pointer",
              transition: "background 200ms ease, border-color 200ms ease, transform 220ms ease, box-shadow 220ms ease",
              transform: hovered === i ? "translateY(-4px)" : "translateY(0)",
              boxShadow: hovered === i ? "0 12px 32px rgba(0,0,0,0.07)" : "0 0 0 rgba(0,0,0,0)",
            }}
          >
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.55 }}>{p.name}</div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 44, fontWeight: 500, letterSpacing: "-0.03em", margin: "16px 0 4px" }}>{p.price}</div>
            <div style={{ fontSize: 13, opacity: 0.5, marginBottom: 28 }}>{p.tag}</div>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 32px", display: "grid", gap: 12 }}>
              {p.feats.map(f => (
                <li key={f} style={{ display: "flex", gap: 10, fontSize: 14, alignItems: "center" }}>
                  <span style={{ color: A, flexShrink: 0 }}><IcoCheck /></span>{f}
                </li>
              ))}
            </ul>
            <div style={{
              width: "100%", textAlign: "center", padding: "10px 16px",
              borderRadius: 8, border: `1px solid ${hovered === i ? "rgba(0,0,0,0.16)" : LINE}`,
              fontSize: 14, fontWeight: 500, color: FG,
              transition: "border-color 200ms ease",
              boxSizing: "border-box",
            }}>
              {p.name === "Enterprise" ? "Contact sales" : "Start free"}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

// ─── Docs CTA ──────────────────────────────────────────────────────────────────
function DocsCTA() {
  const isMobile = useWindowWidth() < 768;
  return (
    <section style={{ maxWidth: 1200, margin: "0 auto", padding: isMobile ? "24px 20px 56px" : "40px 32px 80px" }}>
      <div style={{ border: `1px solid ${LINE}`, borderRadius: 16, padding: isMobile ? 24 : 40, background: PANEL, display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1.2fr 1fr", gap: isMobile ? 28 : 40, alignItems: "center" }}>
        <div>
          <SectionLabel>Ship today</SectionLabel>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: 36, lineHeight: 1.08, letterSpacing: "-0.03em", fontWeight: 500, margin: "14px 0 12px" }}>
            Two lines of code. Zero configuration.
          </h3>
          <p style={{ color: MUTED, fontSize: 16, margin: 0, lineHeight: 1.55 }}>
            Free forever for solo projects. Upgrade when you hit volume.
          </p>
          <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
            <Btn variant="primary" href={REGISTER}>Start free <IcoArrow /></Btn>
            <Btn variant="ghost" href="/docs">Read the docs</Btn>
          </div>
        </div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 13, background: "rgba(0,0,0,0.04)", border: `1px solid ${LINE}`, borderRadius: 10, padding: 20, lineHeight: 1.8, color: FG }}>
          <div><span style={{ color: A }}>$</span> pip install dottle</div>
          <div style={{ opacity: 0.5 }}># or</div>
          <div><span style={{ color: A }}>$</span> npm i @dottle/sdk</div>
          <div style={{ marginTop: 10, opacity: 0.5 }}># then</div>
          <div><span style={{ color: A }}>&gt;</span> from dottle import Dottle</div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  const w = useWindowWidth();
  const isMobile = w < 768;
  const isTablet = w < 1024;
  const gridCols = isMobile ? "1fr 1fr" : isTablet ? "1.3fr repeat(2, 1fr)" : "1.3fr repeat(4, 1fr)";
  return (
    <footer style={{ borderTop: `1px solid ${LINE}`, padding: isMobile ? "40px 20px 28px" : "56px 32px 32px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: gridCols, gap: isMobile ? 32 : 32 }}>
        <div style={{ gridColumn: isMobile ? "1 / -1" : undefined }}>
          <Wordmark size={22} />
          <p style={{ color: MUTED, fontSize: 13.5, lineHeight: 1.55, margin: "12px 0 0", maxWidth: 260 }}>
            Production monitoring for AI agents. Built by engineers who&rsquo;ve shipped agents to prod.
          </p>
        </div>
        {FOOTER_COLS.slice(0, isMobile ? 2 : isTablet ? 2 : 4).map(c => (
          <div key={c.h}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: MUTED, marginBottom: 12 }}>{c.h}</div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 8 }}>
              {c.items.map(item => <li key={item} style={{ fontSize: 14, color: FG, cursor: "pointer" }}>{item}</li>)}
            </ul>
          </div>
        ))}
      </div>
      <div style={{ maxWidth: 1200, margin: "40px auto 0", paddingTop: 20, borderTop: `1px solid ${LINE}`, display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", fontFamily: "var(--font-mono)", fontSize: 12, color: MUTED }}>
        <span>© 2026 Dottle, Inc.</span>
        {/* <span style={{ marginLeft: isMobile ? 0 : "auto" }}>Backed by Y Combinator · SF</span> */}
      </div>
    </footer>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function Home() {
  const [navDark, setNavDark] = useState(false);
  return (
    <div style={{ background: BG, color: FG, fontFamily: "var(--font-sans)" }}>
      <Nav dark={navDark} />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <AlertsReel onDarkChange={setNavDark} />
        <Testimonials />
        <Pricing />
        <DocsCTA />
      </main>
      <Footer />
    </div>
  );
}
