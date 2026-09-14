import { useState } from "react";
import { CheckCircle, GitCompare, HelpCircle, Layers, Lightbulb, Repeat, Sliders, Terminal } from "lucide-react";

export default function EngineeringApproach() {
  const steps = [
    {
      num: "01",
      title: "Understand",
      summary: "Define the problem, users, constraints, and non-negotiable requirements before writing code.",
      detail: "Avoid premature optimization. Clarify what failure modes are intolerable (e.g., incorrect exam keys or lost webhook payloads) and establish firm operational boundaries.",
    },
    {
      num: "02",
      title: "Design",
      summary: "Select architectural patterns and evaluate alternatives with explicit trade-offs.",
      detail: "Formulate Architecture Decision Records (ADRs). Diagram data flows, consider downstream failure cases, and determine whether a component should be synchronous or queued.",
    },
    {
      num: "03",
      title: "Build",
      summary: "Implement incrementally with strict typing, clean contracts, and high maintainability.",
      detail: "Separate business logic from presentation layers. Keep modules cohesive, isolate external API boundaries behind resilient adapters, and enforce data schemas at the edges.",
    },
    {
      num: "04",
      title: "Test",
      summary: "Verify critical behavior, state transitions, and edge cases under failure conditions.",
      detail: "Write automated tests for deterministic logic (timers, session stores, backoff calculations) and stress-test failure handling (network dropouts, 504 gateway timeouts).",
    },
    {
      num: "05",
      title: "Measure",
      summary: "Use real metrics to identify performance bottlenecks and resource costs.",
      detail: "Evaluate actual bundle sizes, client hydration delays, API latency percentiles, and database query durations. Never fabricate benchmarks—measure honestly or mark as in-progress.",
    },
    {
      num: "06",
      title: "Iterate",
      summary: "Debug ruthlessly, conduct blameless postmortems, and document what was learned.",
      detail: "When systems fail, isolate the root cause, apply a principled fix, write regression assertions, and document the findings in engineering notes so lessons compound over time.",
    },
  ];

  const tradeOffExamples = [
    {
      domain: "DATABASE ARCHITECTURE",
      decision: "Relational PostgreSQL with Strict Row-Level Security",
      chose: "PostgreSQL (Supabase)",
      why: "Multi-tenant academic tests and campus commerce require strict relational foreign keys, transactions, and row-level authorization.",
      considered: "MongoDB / DynamoDB",
      tradeOff: "More rigid schema migrations in exchange for rock-solid relational integrity and declarative data security.",
    },
    {
      domain: "AI TUTOR RELIABILITY",
      decision: "Multi-Provider Gateway with Dynamic Fallback Cascade",
      chose: "DeepSeek Primary + Groq / Llama Fallback",
      why: "Single AI APIs suffer regional outages and quota spikes. Cascading ensures zero study interruptions.",
      considered: "Sole dependence on single proprietary API",
      tradeOff: "Requires prompt normalization across heterogeneous providers in exchange for 99.8% tutoring uptime and 70% lower costs.",
    },
    {
      domain: "WEBHOOK DELIVERY ENGINE",
      decision: "Asynchronous Queueing with Exponential Backoff",
      chose: "Instant Ingest Buffer + Staged Worker Retries",
      why: "Destination endpoints frequently reboot or fail during deployments; synchronous forwards cause producer timeouts.",
      considered: "Immediate synchronous forwarding",
      tradeOff: "Increases delivery latency on initial failure in exchange for mathematically guaranteed eventual delivery without lost events.",
    },
  ];

  const [activeTradeOff, setActiveTradeOff] = useState(0);

  return (
    <section id="approach" className="py-24 px-6 md:px-12 max-w-6xl mx-auto border-t border-border/60">
      {/* Section Header */}
      <div className="mb-14">
        <div className="flex items-center gap-3 mb-3">
          <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            // METHODOLOGY & REASONING
          </span>
          <div className="h-[1px] flex-1 bg-border/40 max-w-xs" />
        </div>
        <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground">
          How I Engineer Software
        </h2>
        <p className="text-muted-foreground text-base md:text-lg mt-3 max-w-2xl">
          A disciplined engineering loop developed toward building dependable, observable, and maintainable systems.
        </p>
      </div>

      {/* 6-Step Methodology Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {steps.map((step) => (
          <div
            key={step.num}
            className="border border-border/70 bg-card/30 p-6 flex flex-col justify-between hover:border-foreground/40 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs text-muted-foreground tracking-widest">
                  PHASE {step.num}
                </span>
                <span className="w-2 h-2 rounded-full bg-border" />
              </div>
              <h3 className="text-xl font-display font-bold text-foreground mb-2">
                {step.title}
              </h3>
              <p className="text-sm font-medium text-foreground/90 mb-3">
                {step.summary}
              </p>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed pt-3 border-t border-border/30">
              {step.detail}
            </p>
          </div>
        ))}
      </div>

      {/* Trade-Offs Design Language Showcase */}
      <div className="border border-border/80 bg-card/60 p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-border/50 pb-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-emerald-400 block mb-1">
              // DESIGN LANGUAGE: TECHNICAL TRADE-OFFS
            </span>
            <h3 className="text-xl md:text-2xl font-display font-bold text-foreground">
              Engineering Judgment in Practice
            </h3>
          </div>
          <div className="flex items-center gap-2">
            {tradeOffExamples.map((item, idx) => (
              <button
                key={item.domain}
                type="button"
                onClick={() => setActiveTradeOff(idx)}
                className={`text-[11px] font-mono uppercase tracking-wider px-3 py-1.5 border transition-colors ${
                  activeTradeOff === idx
                    ? "bg-foreground text-background border-foreground font-bold"
                    : "border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                Decision 0{idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Active Trade-Off Card */}
        {(() => {
          const active = tradeOffExamples[activeTradeOff];
          return (
            <div className="font-mono text-xs space-y-4">
              <div className="flex items-center justify-between text-muted-foreground border-b border-border/30 pb-2">
                <span className="text-[11px] text-emerald-400 uppercase tracking-widest">
                  {active.domain}
                </span>
                <span className="text-[11px] uppercase tracking-widest">
                  STATUS: ARCHITECTED & DEPLOYED
                </span>
              </div>

              <div>
                <span className="text-muted-foreground uppercase tracking-widest text-[10px] block mb-1">
                  ARCHITECTURAL DECISION
                </span>
                <p className="text-sm md:text-base font-bold text-foreground font-display">
                  {active.decision}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="border border-border/60 bg-background/60 p-4">
                  <span className="text-[11px] text-emerald-400 font-bold block mb-1 uppercase tracking-wider">
                    ✓ Chose
                  </span>
                  <p className="text-foreground font-bold mb-2">{active.chose}</p>
                  <span className="text-[11px] text-muted-foreground font-bold block mb-1 uppercase tracking-wider">
                    Rationale
                  </span>
                  <p className="text-muted-foreground leading-relaxed">{active.why}</p>
                </div>

                <div className="border border-border/60 bg-background/60 p-4">
                  <span className="text-[11px] text-muted-foreground font-bold block mb-1 uppercase tracking-wider">
                    ✗ Considered Alternative
                  </span>
                  <p className="text-foreground/80 font-bold mb-2">{active.considered}</p>
                  <span className="text-[11px] text-muted-foreground font-bold block mb-1 uppercase tracking-wider">
                    Identified Trade-Off
                  </span>
                  <p className="text-muted-foreground leading-relaxed">{active.tradeOff}</p>
                </div>
              </div>
            </div>
          );
        })()}
      </div>
    </section>
  );
}
