"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Zap,
  Eye,
  GitBranch,
  Shield,
  Activity,
  RefreshCw,
  Terminal,
  Bell,
  Users,
  Code2,
  Cpu,
  ChevronRight,
  Calendar,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// DESIGN TOKENS
// ─────────────────────────────────────────────────────────────────────────────
// Primary brand: #4F6F52 (forest green)
// Primary dark:  #2F3E2C
// Primary light: #6B8F6E
// BG card:       #080C10
// BG card2:      #0d1117
// Border:        #1F2937

// ─────────────────────────────────────────────────────────────────────────────
// NAV
// ─────────────────────────────────────────────────────────────────────────────

function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#1F2937] bg-[#0B0F14]/85 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-[#2F3E2C] border border-[#4F6F5240] flex items-center justify-center">
            <Shield size={13} className="text-[#6B8F6E]" />
          </div>
          <span className="font-semibold text-[#E5E7EB] tracking-tight">
            Dottle
          </span>
          <span className="hidden sm:inline-block text-[10px] text-[#6B8F6E] bg-[#4F6F5212] border border-[#4F6F5228] px-2 py-0.5 rounded-full font-medium uppercase tracking-wider">
            Beta
          </span>
        </div>

        <div className="flex items-center gap-5">
          <span className="hidden sm:inline text-sm text-[#4B5563] hover:text-[#9CA3AF] cursor-pointer transition-colors">
            Docs
          </span>
          <a
            href="#cta"
            className="glow-btn text-sm font-medium bg-[#4F6F52] hover:bg-[#3D5940] text-white px-4 py-2 rounded-lg transition-colors"
          >
            Get monitored free
          </a>
        </div>
      </div>
    </nav>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FAILURE CARD (Hero right side)
// ─────────────────────────────────────────────────────────────────────────────

function FailureCard() {
  return (
    <div className="relative w-full max-w-[400px]">
      <div className="rounded-2xl border border-[#1F2937] bg-[#080C10] overflow-hidden shadow-xl shadow-black/40 terminal">
        {/* Titlebar */}
        <div className="flex items-center gap-1.5 px-4 py-3 bg-[#0B0F14] border-b border-[#1F2937]">
          <span className="w-2.5 h-2.5 rounded-full bg-[#EF444460]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B60]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E60]" />
          <span className="ml-3 text-[11px] text-[#374151] font-mono">
            dottle · run monitor
          </span>
          <span className="ml-auto flex items-center gap-1.5 text-[11px] text-[#4F6F52]">
            <span className="live-dot w-1.5 h-1.5 rounded-full bg-[#4F6F52] inline-block" />
            live
          </span>
        </div>

        {/* Run ID */}
        <div className="px-5 pt-4 pb-3 flex items-center justify-between border-b border-[#1F2937]">
          <div>
            <p className="text-[10px] text-[#374151] font-mono uppercase tracking-wider mb-0.5">
              run_id
            </p>
            <p className="text-[#E5E7EB] font-mono font-semibold text-lg">
              #18291
            </p>
          </div>
          <span className="flex items-center gap-1.5 text-[#EF4444] bg-[#EF444412] border border-[#EF444422] px-3 py-1.5 rounded-lg text-xs font-medium">
            <XCircle size={12} />
            Failed
          </span>
        </div>

        {/* Failure summary */}
        <div className="mx-4 mt-4 rounded-xl bg-[#EF444410] border border-[#EF444420] p-3.5">
          <div className="flex items-center gap-2 mb-2.5">
            <AlertTriangle size={13} className="text-[#EF4444] shrink-0" />
            <span className="text-[#EF4444] text-[11px] font-semibold uppercase tracking-widest">
              Infinite loop detected
            </span>
          </div>
          <div className="space-y-1 font-mono text-xs">
            <p className="text-[#9CA3AF]">
              <span className="text-[#4B5563]">→</span>{" "}
              <span className="text-[#FCA5A5]">43 repeated tool calls</span>
            </p>
            <p className="text-[#9CA3AF]">
              <span className="text-[#4B5563]">→</span> tokens burned:{" "}
              <span className="text-[#FCA5A5]">14,200</span>
            </p>
            <p className="text-[#9CA3AF]">
              <span className="text-[#4B5563]">→</span> cost wasted:{" "}
              <span className="text-[#FCA5A5] font-semibold">$12.40</span>
            </p>
          </div>
        </div>

        {/* Steps */}
        <div className="px-5 py-4 space-y-2">
          {[
            { n: 1, label: "Input received",             ok: true  },
            { n: 2, label: "Context retrieved",          ok: true  },
            { n: 3, label: "LLM call → tool selected",   ok: true  },
            { n: 4, label: "Tool timeout (no backoff)",  ok: false },
            { n: 5, label: "Retry loop × 43",            ok: false },
          ].map(({ n, label, ok }) => (
            <div key={n} className="flex items-center gap-2.5 font-mono text-xs">
              {ok
                ? <CheckCircle2 size={13} className="text-[#4F6F52] shrink-0" />
                : <XCircle     size={13} className="text-[#EF4444] shrink-0" />}
              <span className="text-[#374151]">Step {n}:</span>
              <span className={ok ? "text-[#6B7280]" : "text-[#FCA5A5]"}>{label}</span>
            </div>
          ))}
        </div>

        {/* Root cause */}
        <div className="mx-4 mb-4 rounded-xl border border-[#4F6F5225] bg-[#4F6F520C] p-3.5">
          <p className="text-[10px] text-[#6B8F6E] font-semibold uppercase tracking-widest mb-2">
            Root cause — Dottle
          </p>
          <p className="text-[#9CA3AF] text-xs font-mono leading-[1.6]">
            <span className="text-[#86EFAC]">max_retries</span>=0 · no backoff
            strategy set.
            <br />
            Retry triggers on every tool failure indefinitely.
          </p>
          <p className="text-[#6B8F6E] text-xs mt-2 font-mono">
            → set max_retries ≥ 3 + exponential backoff
          </p>
        </div>

        {/* Footer meta */}
        <div className="px-5 py-3 border-t border-[#1F2937] flex items-center gap-4 text-[11px] font-mono text-[#374151]">
          <span>47.3s</span>
          <span>gpt-4o</span>
          <span className="ml-auto text-[#EF4444]">→ Slack alerted</span>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="relative pt-28 pb-20 px-6 overflow-hidden">
      <div className="grid-bg absolute inset-0 opacity-70" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#4F6F52] opacity-[0.06] rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-[1fr_420px] gap-14 items-center">
          {/* Copy */}
          <div>
            <div className="inline-flex items-center gap-2 bg-[#4F6F5212] border border-[#4F6F5228] text-[#6B8F6E] text-xs px-3.5 py-1.5 rounded-full mb-7 font-medium">
              <Activity size={11} />
              Active failure detection · not just observability
            </div>

            <h1 className="text-[2.75rem] sm:text-[3.25rem] font-semibold leading-[1.08] tracking-[-0.02em] text-white mb-5">
              Your AI agent is{" "}
              <span className="text-[#EF4444]">breaking.</span>
              <br />
              You just don&apos;t see it.
            </h1>

            <p className="text-[1.05rem] text-[#6B7280] leading-[1.75] mb-9 max-w-[500px]">
              Dottle detects failures, explains why they happen, and helps you
              fix them{" "}
              <span className="text-[#9CA3AF]">
                before your users complain.
              </span>
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-5">
              <a
                href="#cta"
                className="glow-btn flex items-center justify-center gap-2 bg-[#4F6F52] hover:bg-[#3D5940] text-white font-medium px-6 py-3 rounded-xl transition-colors text-[15px]"
              >
                Get your agent monitored (free)
                <ArrowRight size={15} />
              </a>
              <a
                href="#how"
                className="flex items-center justify-center gap-2 border border-[#1F2937] hover:border-[#2D3748] text-[#6B7280] hover:text-[#9CA3AF] px-6 py-3 rounded-xl transition-colors text-[15px]"
              >
                See how it works
              </a>
            </div>

            <p className="text-xs text-[#374151]">
              No dashboards to configure. We set everything up for you.
            </p>
          </div>

          {/* Card */}
          <div className="flex justify-center lg:justify-end">
            <FailureCard />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TRUST STRIP
// ─────────────────────────────────────────────────────────────────────────────

function TrustStrip() {
  return (
    <div className="border-t border-b border-[#1F2937] py-4 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-8">
        <span className="text-[11px] text-[#374151] uppercase tracking-widest shrink-0">
          Works with
        </span>
        <div className="flex flex-wrap justify-center gap-x-7 gap-y-2">
          {["LangChain", "OpenAI Agents SDK", "CrewAI", "AutoGen", "LlamaIndex", "Custom agents"].map(
            (s) => (
              <span key={s} className="text-[13px] text-[#4B5563] font-medium">
                {s}
              </span>
            )
          )}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SCROLL-DRIVEN STICKY SECTION
// ─────────────────────────────────────────────────────────────────────────────

type StepLog = {
  time: string;
  level: "info" | "warn" | "error" | "cmd" | "comment";
  text: string;
};

type Step = {
  id: number;
  label: string;
  description: string;
  logs: StepLog[];
  highlight: string; // bottom annotation
};

const STEPS: Step[] = [
  {
    id: 0,
    label: "Infinite loops draining tokens",
    description:
      "Your agent retries forever. No exit condition, no backoff. 43 tool calls, $12 wasted. You find out from your invoice.",
    highlight: "43 tool calls · $12.40 burned · nobody was alerted",
    logs: [
      { time: "12:04:01", level: "info",    text: "run_id=18291  agent started" },
      { time: "12:04:03", level: "info",    text: "step=1  context retrieved → ok" },
      { time: "12:04:04", level: "warn",    text: "step=2  tool: search_db → failed (timeout)" },
      { time: "12:04:05", level: "warn",    text: "step=3  retry 1 → failed (timeout)" },
      { time: "12:04:06", level: "warn",    text: "step=4  retry 2 → failed (timeout)" },
      { time: "12:04:08", level: "warn",    text: "step=5  retry 3 → failed (timeout)" },
      { time: "12:04:12", level: "warn",    text: "step=6  retry 4 → failed (timeout)" },
      { time: "—",        level: "comment", text: "... 37 more identical retries ..." },
      { time: "12:04:47", level: "error",   text: "step=43  retry 41 → failed (timeout)" },
      { time: "12:04:47", level: "error",   text: "max call depth exceeded · exit code 1" },
    ],
  },
  {
    id: 1,
    label: "Tool failures without visibility",
    description:
      "A tool call fails silently. Your agent continues with an empty result. The user gets a broken experience and you never know.",
    highlight: "status=ok logged · user got broken output · no alert fired",
    logs: [
      { time: "12:04:01", level: "info",    text: "run_id=18292  agent started" },
      { time: "12:04:03", level: "info",    text: "step=1  input parsed → ok" },
      { time: "12:04:04", level: "info",    text: "step=2  calling external API: fetch_product()" },
      { time: "12:04:09", level: "error",   text: "fetch_product()  timeout after 5000ms" },
      { time: "12:04:09", level: "warn",    text: "no retry configured · continuing with result=null" },
      { time: "12:04:10", level: "info",    text: "step=3  LLM called with result=null" },
      { time: "12:04:11", level: "info",    text: "step=4  response generated" },
      { time: "12:04:11", level: "info",    text: "run completed · status=ok" },
      { time: "—",        level: "comment", text: "← 'ok' — but user received empty response" },
    ],
  },
  {
    id: 2,
    label: "Wrong outputs reaching users",
    description:
      "No output validation. The agent returns a hallucinated or off-topic response. It's logged as a success. Nobody catches it.",
    highlight: "status=ok · zero validation · user gets wrong answer",
    logs: [
      { time: "12:04:01", level: "info",    text: "run_id=18293  agent started" },
      { time: "12:04:05", level: "info",    text: "LLM response generated" },
      { time: "—",        level: "comment", text: '  output: "I\'m sorry, I couldn\'t find' },
      { time: "—",        level: "comment", text: '          that information. Try again."' },
      { time: "12:04:05", level: "info",    text: "run completed · status=ok" },
      { time: "—",        level: "comment", text: "" },
      { time: "—",        level: "error",   text: "expected:  product recommendation" },
      { time: "—",        level: "error",   text: "got:       generic fallback (hallucination)" },
      { time: "—",        level: "error",   text: "user sees: ✗ wrong answer" },
      { time: "—",        level: "comment", text: "← no validation configured · no alert" },
    ],
  },
  {
    id: 3,
    label: "No clear root cause",
    description:
      "All three runs failed. You dig through logs for hours. Every error says 'exit code 1'. Nothing tells you why.",
    highlight: "Dottle identifies root cause in < 10 seconds",
    logs: [
      { time: "12:04:47", level: "error",   text: "run_id=18291  failed · exit code 1" },
      { time: "12:04:11", level: "error",   text: "run_id=18292  failed · exit code 1" },
      { time: "12:04:05", level: "error",   text: "run_id=18293  failed · exit code 1" },
      { time: "—",        level: "comment", text: "" },
      { time: "—",        level: "cmd",     text: "$ grep 'root cause' agent.log" },
      { time: "—",        level: "error",   text: "  no matches found" },
      { time: "—",        level: "cmd",     text: "$ check retry_config" },
      { time: "—",        level: "error",   text: "  ReferenceError: retry_config not defined" },
      { time: "—",        level: "comment", text: "" },
      { time: "—",        level: "comment", text: "← you are on your own" },
    ],
  },
];

function LogLine({ line, visible }: { line: StepLog; visible: boolean }) {
  const colors: Record<StepLog["level"], string> = {
    info:    "text-[#4B5563]",
    warn:    "text-[#D97706]",
    error:   "text-[#EF4444]",
    cmd:     "text-[#6B8F6E]",
    comment: "text-[#374151]",
  };

  return (
    <div
      className={`flex gap-3 text-xs font-mono leading-[1.7] transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      {line.time !== "—" ? (
        <span className="text-[#2D3748] shrink-0 select-none">{line.time}</span>
      ) : (
        <span className="w-[52px] shrink-0" />
      )}
      <span className={colors[line.level]}>{line.text}</span>
    </div>
  );
}

function ScrollSteps() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [logProgress, setLogProgress] = useState(0);

  const onScroll = useCallback(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const rect      = el.getBoundingClientRect();
    const total     = el.offsetHeight - window.innerHeight;
    const scrolled  = -rect.top;

    if (scrolled <= 0) {
      setActiveStep(0);
      setLogProgress(0);
      return;
    }
    if (scrolled >= total) {
      setActiveStep(3);
      setLogProgress(1);
      return;
    }

    const progress  = scrolled / total;           // 0 → 1
    const raw       = progress * STEPS.length;    // 0 → 4
    const stepIndex = Math.min(Math.floor(raw), STEPS.length - 1);
    const within    = raw - stepIndex;            // 0 → 1 within step

    setActiveStep(stepIndex);
    setLogProgress(within);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  const step = STEPS[activeStep];
  // reveal logs progressively within the current step
  const visibleLogs = Math.ceil(logProgress * step.logs.length);

  return (
    <section className="border-t border-[#1F2937]">
      {/* ── Mobile: simple stacked list ── */}
      <div className="lg:hidden py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs text-[#EF4444] uppercase tracking-widest font-semibold mb-3">
            The problem
          </p>
          <h2 className="text-3xl font-semibold text-white mb-12">
            Agents fail silently.
          </h2>
          <div className="space-y-8">
            {STEPS.map((s, i) => (
              <div
                key={s.id}
                className="rounded-2xl border border-[#1F2937] bg-[#080C10] p-6"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[11px] font-mono text-[#374151]">
                    0{i + 1}
                  </span>
                  <h3 className="text-[#E5E7EB] font-medium text-sm">
                    {s.label}
                  </h3>
                </div>
                <p className="text-[#6B7280] text-sm leading-relaxed">
                  {s.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Desktop: scroll-driven sticky ── */}
      <div
        ref={wrapperRef}
        className="hidden lg:block relative"
        style={{ height: "300vh" }}
      >
        <div className="sticky top-0 h-screen overflow-hidden">
          <div className="h-full flex flex-col justify-center max-w-6xl mx-auto px-6 py-16">
            {/* Section header */}
            <div className="mb-10">
              <p className="text-xs text-[#EF4444] uppercase tracking-widest font-semibold mb-2">
                The problem
              </p>
              <h2 className="text-3xl font-semibold text-white">
                Agents fail silently.{" "}
                <span className="text-[#374151]">
                  Logs don&apos;t tell you why.
                </span>
              </h2>
            </div>

            <div className="grid grid-cols-[360px_1fr] gap-10 items-start">
              {/* ── Left: step list ── */}
              <div className="space-y-1">
                {STEPS.map((s) => {
                  const isActive = s.id === activeStep;
                  const isDone   = s.id < activeStep;
                  return (
                    <div
                      key={s.id}
                      className={`rounded-xl p-4 transition-all duration-300 ${
                        isActive
                          ? "bg-[#4F6F520E] border border-[#4F6F5228]"
                          : "border border-transparent"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {/* Status dot */}
                        <div
                          className={`mt-0.5 w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${
                            isDone
                              ? "border-[#4F6F5240] bg-[#4F6F5215]"
                              : isActive
                              ? "border-[#EF444440] bg-[#EF444410]"
                              : "border-[#1F2937]"
                          }`}
                        >
                          {isDone && (
                            <CheckCircle2 size={12} className="text-[#4F6F52]" />
                          )}
                          {isActive && (
                            <span className="w-2 h-2 rounded-full bg-[#EF4444] live-dot" />
                          )}
                        </div>

                        <div>
                          <p
                            className={`text-sm font-medium transition-colors duration-300 ${
                              isActive
                                ? "text-[#E5E7EB]"
                                : isDone
                                ? "text-[#4B5563]"
                                : "text-[#374151]"
                            }`}
                          >
                            {s.label}
                          </p>
                          {isActive && (
                            <p className="text-xs text-[#6B7280] mt-1.5 leading-relaxed step-in">
                              {s.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Scroll nudge */}
                <p className="text-[11px] text-[#2D3748] pl-4 pt-3">
                  ↓ scroll to see each failure
                </p>
              </div>

              {/* ── Right: terminal ── */}
              <div className="rounded-2xl border border-[#1F2937] bg-[#080C10] overflow-hidden shadow-2xl shadow-black/50 terminal">
                {/* Terminal bar */}
                <div className="flex items-center gap-1.5 px-4 py-2.5 bg-[#0B0F14] border-b border-[#1F2937]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#EF444440]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B40]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E40]" />
                  <span className="ml-3 text-[11px] text-[#2D3748] font-mono">
                    agent.log — live
                  </span>
                  <span className="ml-auto flex items-center gap-1.5 text-[11px]">
                    <span className="text-[#374151] font-mono">step</span>
                    <span className="text-[#4F6F52] font-mono font-semibold">
                      0{activeStep + 1}
                    </span>
                    <span className="text-[#374151] font-mono">/ 04</span>
                  </span>
                </div>

                {/* Log area */}
                <div className="p-5 min-h-[320px] flex flex-col justify-between">
                  <div className="space-y-0.5">
                    {/* Step label */}
                    <div className="text-[11px] font-mono text-[#2D3748] uppercase tracking-widest mb-4 pb-3 border-b border-[#0d1117]">
                      # {step.label}
                    </div>

                    {step.logs.map((line, i) => (
                      <LogLine
                        key={`${activeStep}-${i}`}
                        line={line}
                        visible={i < visibleLogs || activeStep === 3}
                      />
                    ))}
                  </div>

                  {/* Step 3 special: Dottle detects */}
                  {activeStep === 3 && (
                    <div className="mt-5 rounded-xl border border-[#4F6F5228] bg-[#4F6F520C] p-4">
                      <div className="flex items-center gap-2 mb-2.5">
                        <CheckCircle2 size={13} className="text-[#4F6F52]" />
                        <span className="text-[11px] text-[#6B8F6E] font-semibold uppercase tracking-widest">
                          Root cause — Dottle analysis
                        </span>
                      </div>
                      <p className="text-xs font-mono text-[#9CA3AF] leading-[1.6]">
                        All 3 runs share the same cause:
                        <br />
                        <span className="text-[#86EFAC]">max_retries</span>=0 in
                        tool config. No backoff. No fallback.
                      </p>
                      <p className="text-[#6B8F6E] text-xs font-mono mt-2">
                        → Fix: set max_retries ≥ 3 + add exponential backoff
                      </p>
                    </div>
                  )}

                  {/* Bottom annotation */}
                  <div className="mt-4 pt-3 border-t border-[#0d1117]">
                    <p
                      className={`text-xs font-mono ${
                        activeStep === 3
                          ? "text-[#4F6F52]"
                          : "text-[#EF4444] opacity-60"
                      }`}
                    >
                      {step.highlight}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SOLUTION
// ─────────────────────────────────────────────────────────────────────────────

function Solution() {
  const features = [
    {
      icon: <Eye size={18} />,
      title: "Detect failures automatically",
      body: "Loops, tool errors, bad outputs — caught the moment they happen. No manual thresholds or configs.",
    },
    {
      icon: <GitBranch size={18} />,
      title: "Trace every agent run",
      body: "Every step, tool call, and LLM decision captured end-to-end. Full timeline, not just error lines.",
    },
    {
      icon: <XCircle size={18} />,
      title: "Highlight exactly where it failed",
      body: "Not 'something broke at step 4.' The exact call, input, and response — isolated and explained.",
    },
    {
      icon: <Zap size={18} />,
      title: "Suggest the root cause",
      body: "Pattern-matched diagnosis across thousands of agent runs. We tell you why and how to fix it.",
    },
  ];

  return (
    <section className="py-24 px-6 border-t border-[#1F2937]">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl mb-14">
          <p className="text-xs text-[#4F6F52] uppercase tracking-widest font-semibold mb-3">
            The solution
          </p>
          <h2 className="text-3xl sm:text-[2.25rem] font-semibold text-white mb-4 leading-tight">
            We don&apos;t just show logs.
            <br />
            <span className="text-[#6B7280]">We tell you what broke.</span>
          </h2>
          <p className="text-[#6B7280] text-[15px] leading-relaxed">
            Other tools give you observability — a passive stream of data you
            still have to interpret. Dottle does the analysis for you.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {features.map(({ icon, title, body }) => (
            <div
              key={title}
              className="card-lift rounded-2xl border border-[#1F2937] bg-[#080C10] p-6 flex gap-5"
            >
              <div className="w-9 h-9 rounded-xl bg-[#4F6F5210] border border-[#4F6F5220] flex items-center justify-center text-[#6B8F6E] shrink-0">
                {icon}
              </div>
              <div>
                <h3 className="text-[#E5E7EB] font-medium text-sm mb-2">
                  {title}
                </h3>
                <p className="text-[#6B7280] text-sm leading-relaxed">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HOW IT WORKS
// ─────────────────────────────────────────────────────────────────────────────

function HowItWorks() {
  const steps = [
    {
      n: "01",
      icon: <Code2 size={18} />,
      title: "Connect your agent",
      body: "SDK or webhook — works with any framework. Minimal code change, no infrastructure to manage.",
      meta: "< 30 min setup",
    },
    {
      n: "02",
      icon: <Activity size={18} />,
      title: "We monitor every run",
      body: "Every step, token, tool call, and LLM response is captured in real-time, automatically.",
      meta: "Zero config",
    },
    {
      n: "03",
      icon: <Bell size={18} />,
      title: "Get instant failure alerts",
      body: "When something breaks we flag it, explain it, and send you the root cause via Slack or webhook.",
      meta: "Alert in < 10s",
    },
  ];

  return (
    <section id="how" className="py-24 px-6 border-t border-[#1F2937]">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl mb-14">
          <h2 className="text-3xl sm:text-[2.25rem] font-semibold text-white mb-3 leading-tight">
            Set up in under an hour.
          </h2>
          <p className="text-[#6B7280] text-[15px]">
            Monitoring from day one. No dedicated team required.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-4 relative">
          <div className="hidden lg:block absolute top-[44px] left-[calc(33.33%+24px)] right-[calc(33.33%+24px)] h-px bg-gradient-to-r from-[#4F6F5230] via-[#4F6F5250] to-[#4F6F5230]" />

          {steps.map(({ n, icon, title, body, meta }) => (
            <div
              key={n}
              className="card-lift rounded-2xl border border-[#1F2937] bg-[#080C10] p-6"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-xl bg-[#4F6F5210] border border-[#4F6F5220] flex items-center justify-center text-[#6B8F6E]">
                  {icon}
                </div>
                <span className="text-[11px] font-mono text-[#2D3748] font-semibold">
                  {n}
                </span>
              </div>
              <h3 className="text-[#E5E7EB] font-medium text-[15px] mb-2">
                {title}
              </h3>
              <p className="text-[#6B7280] text-sm leading-relaxed mb-4">
                {body}
              </p>
              <span className="inline-block text-[11px] text-[#4F6F52] bg-[#4F6F5210] border border-[#4F6F5220] px-3 py-1 rounded-full font-medium">
                {meta}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPARISON TABLE
// ─────────────────────────────────────────────────────────────────────────────

function Comparison() {
  const rows: { label: string; traditional: string; dottle: string }[] = [
    { label: "What you see",       traditional: "Logs and traces",        dottle: "Failure diagnosis"        },
    { label: "Debugging",          traditional: "You do it manually",     dottle: "Root cause explained"     },
    { label: "Alerting",           traditional: "Passive dashboards",     dottle: "Real-time alerts"         },
    { label: "Analysis timing",    traditional: "Post-mortem",            dottle: "Instant, as it happens"   },
    { label: "Loop detection",     traditional: "Not detected",           dottle: "Caught automatically"     },
    { label: "Root cause",         traditional: "You figure it out",      dottle: "Suggested by Dottle"     },
  ];

  return (
    <section className="py-24 px-6 border-t border-[#1F2937]">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl mb-14">
          <h2 className="text-3xl sm:text-[2.25rem] font-semibold text-white mb-4 leading-tight">
            Not another{" "}
            <span className="line-through text-[#2D3748]">observability</span>{" "}
            tool.
          </h2>
          <p className="text-[#6B7280] text-[15px] leading-relaxed">
            Langfuse, LangSmith, and Datadog show you data.
            Dottle tells you what went wrong and why.
          </p>
        </div>

        <div className="rounded-2xl border border-[#1F2937] overflow-hidden max-w-4xl">
          <div className="grid grid-cols-3 bg-[#080C10] border-b border-[#1F2937]">
            <div className="px-6 py-4 text-[11px] text-[#374151] uppercase tracking-widest font-semibold">
              Feature
            </div>
            <div className="px-6 py-4 border-l border-[#1F2937]">
              <p className="text-[11px] text-[#374151] uppercase tracking-widest font-semibold">
                Traditional tools
              </p>
              <p className="text-[10px] text-[#2D3748] mt-0.5">
                Langfuse, LangSmith, Datadog
              </p>
            </div>
            <div className="px-6 py-4 border-l border-[#1F2937]">
              <p className="text-[11px] text-[#4F6F52] uppercase tracking-widest font-semibold">
                Dottle
              </p>
              <p className="text-[10px] text-[#374151] mt-0.5">
                Active failure detection
              </p>
            </div>
          </div>

          {rows.map(({ label, traditional, dottle }, i) => (
            <div
              key={label}
              className={`trow grid grid-cols-3 border-b border-[#1F2937] last:border-0 ${
                i % 2 === 0 ? "bg-[#080C10]" : "bg-[#060A0D]"
              }`}
            >
              <div className="px-6 py-4 text-sm text-[#6B7280]">{label}</div>
              <div className="px-6 py-4 text-sm text-[#374151] border-l border-[#1F2937] flex items-center gap-2">
                <XCircle size={13} className="text-[#2D3748] shrink-0" />
                {traditional}
              </div>
              <div className="px-6 py-4 text-sm text-[#E5E7EB] border-l border-[#1F2937] flex items-center gap-2">
                <CheckCircle2 size={13} className="text-[#4F6F52] shrink-0" />
                {dottle}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// WHO IT'S FOR
// ─────────────────────────────────────────────────────────────────────────────

function WhoItsFor() {
  const personas = [
    {
      icon: <Cpu size={18} />,
      title: "Startups using LangChain or custom agents",
      body: "You move fast and can't afford production failures killing your demo or your users' trust.",
    },
    {
      icon: <Users size={18} />,
      title: "Teams with agents serving real users",
      body: "Your agent is customer-facing. A broken run isn't just an error — it's a bad user experience.",
    },
    {
      icon: <Terminal size={18} />,
      title: "Engineers tired of debugging blindly",
      body: "You've spent hours in logs with no answers. Dottle tells you what broke in seconds.",
    },
  ];

  return (
    <section className="py-24 px-6 border-t border-[#1F2937]">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl mb-14">
          <h2 className="text-3xl sm:text-[2.25rem] font-semibold text-white mb-3 leading-tight">
            Built for teams running AI agents
            <br />
            <span className="text-[#6B7280]">in production.</span>
          </h2>
          <p className="text-[#4B5563] text-[15px]">
            Not for researchers. Not for hobby projects.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-4">
          {personas.map(({ icon, title, body }) => (
            <div
              key={title}
              className="card-lift rounded-2xl border border-[#1F2937] bg-[#080C10] p-6"
            >
              <div className="w-9 h-9 rounded-xl bg-[#4F6F5210] border border-[#4F6F5220] flex items-center justify-center text-[#6B8F6E] mb-5">
                {icon}
              </div>
              <h3 className="text-[#E5E7EB] font-medium text-[15px] mb-2 leading-snug">
                {title}
              </h3>
              <p className="text-[#6B7280] text-sm leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CTA
// ─────────────────────────────────────────────────────────────────────────────

function CTA() {
  const [email,    setEmail]    = useState("");
  const [building, setBuilding] = useState("");
  const [done,     setDone]     = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setDone(true);
  }

  return (
    <section id="cta" className="py-24 px-6 border-t border-[#1F2937] relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[260px] bg-[#4F6F52] opacity-[0.055] rounded-full blur-[90px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-[2.25rem] font-semibold text-white mb-3 leading-tight">
            Stop guessing why your agent failed.
          </h2>
          <p className="text-[#6B7280] text-[15px] leading-relaxed max-w-lg mx-auto">
            Pick how you want to get started. We set everything up for you.
          </p>
        </div>

        {/* Two-column cards */}
        <div className="grid lg:grid-cols-2 gap-5 items-start">

          {/* ── Left: email form ── */}
          <div className="rounded-2xl border border-[#1F2937] bg-[#080C10] p-7">
            <div className="mb-5">
              <p className="text-[11px] text-[#4F6F52] uppercase tracking-widest font-semibold mb-1">
                Option 1
              </p>
              <h3 className="text-white font-semibold text-lg">
                Get monitored — free setup
              </h3>
              <p className="text-[#6B7280] text-sm mt-1.5 leading-relaxed">
                Drop your email. We reach out and set everything up.
                No dashboards, no config.
              </p>
            </div>

            {done ? (
              <div className="rounded-xl border border-[#4F6F5228] bg-[#4F6F520A] p-7 text-center">
                <CheckCircle2 size={32} className="text-[#4F6F52] mx-auto mb-3" />
                <p className="text-white font-semibold mb-1">You&apos;re in.</p>
                <p className="text-[#6B7280] text-sm">
                  We&apos;ll reach out within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-4">
                <div>
                  <label className="block text-[10px] text-[#4B5563] uppercase tracking-widest font-semibold mb-2">
                    Work email
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="w-full bg-[#0B0F14] border border-[#1F2937] focus:border-[#4F6F52] rounded-xl px-4 py-3 text-sm text-[#E5E7EB] placeholder-[#2D3748] outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-[#4B5563] uppercase tracking-widest font-semibold mb-2">
                    What are you building?
                  </label>
                  <textarea
                    value={building}
                    onChange={(e) => setBuilding(e.target.value)}
                    placeholder="e.g. customer support agent, research pipeline..."
                    rows={3}
                    className="w-full bg-[#0B0F14] border border-[#1F2937] focus:border-[#4F6F52] rounded-xl px-4 py-3 text-sm text-[#E5E7EB] placeholder-[#2D3748] outline-none transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="glow-btn w-full flex items-center justify-center gap-2 bg-[#4F6F52] hover:bg-[#3D5940] text-white font-medium px-6 py-3.5 rounded-xl transition-colors text-[15px]"
                >
                  Get your agent monitored (free)
                  <ChevronRight size={15} />
                </button>
                <p className="text-center text-[11px] text-[#2D3748]">
                  Free setup · No credit card · We configure everything
                </p>
              </form>
            )}
          </div>

          {/* ── Divider (mobile) ── */}
          <div className="lg:hidden flex items-center gap-3 text-[#2D3748] text-xs">
            <div className="flex-1 h-px bg-[#1F2937]" />
            or
            <div className="flex-1 h-px bg-[#1F2937]" />
          </div>

          {/* ── Right: book a demo ── */}
          <div className="rounded-2xl border border-[#1F2937] bg-[#080C10] p-7 flex flex-col">
            <div className="mb-6">
              <p className="text-[11px] text-[#6B7280] uppercase tracking-widest font-semibold mb-1">
                Option 2
              </p>
              <h3 className="text-white font-semibold text-lg">
                Book a 15-min demo
              </h3>
              <p className="text-[#6B7280] text-sm mt-1.5 leading-relaxed">
                Talk to us directly. We&apos;ll show you how Dottle works on
                a real agent and answer any questions.
              </p>
            </div>

            {/* What to expect */}
            <div className="space-y-3 mb-7">
              {[
                "Live walkthrough on your stack",
                "See a real failure detection in action",
                "Get your questions answered directly",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2.5">
                  <CheckCircle2
                    size={14}
                    className="text-[#4F6F52] shrink-0 mt-0.5"
                  />
                  <p className="text-[#9CA3AF] text-sm">{item}</p>
                </div>
              ))}
            </div>

            {/* Spacer to push button to bottom on desktop */}
            <div className="flex-1" />

            <a
              href="https://cal.com/abhinawago/15min"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2.5 border border-[#2D3748] hover:border-[#4F6F5240] hover:bg-[#4F6F520A] text-[#E5E7EB] font-medium px-6 py-3.5 rounded-xl transition-all text-[15px] group"
            >
              <Calendar
                size={16}
                className="text-[#6B8F6E] group-hover:text-[#4F6F52] transition-colors"
              />
              Book a 15-min call
              <ArrowRight
                size={14}
                className="text-[#4B5563] group-hover:text-[#6B8F6E] transition-colors ml-auto"
              />
            </a>
            <p className="text-center text-[11px] text-[#2D3748] mt-3">
              No pitch · No pressure · 15 minutes flat
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="border-t border-[#1F2937] py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-[#2F3E2C] border border-[#4F6F5230] flex items-center justify-center">
            <Shield size={11} className="text-[#6B8F6E]" />
          </div>
          <span className="text-sm font-medium text-[#4B5563]">Dottle</span>
        </div>
        <p className="text-[13px] text-[#2D3748]">
          Built for teams running AI agents in production.
        </p>
        <p className="text-[13px] text-[#2D3748]">© 2026 Dottle</p>
      </div>
    </footer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <TrustStrip />
        <ScrollSteps />
        <Solution />
        <HowItWorks />
        <Comparison />
        <WhoItsFor />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
