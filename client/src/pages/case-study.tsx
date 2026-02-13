import { useMemo } from "react";
import { Link } from "wouter";

const caseStudies = [
  {
    id: "atlas-ops",
    title: "Atlas Ops",
    summary: "Operations platform that turns messy workflows into a single source of truth.",
    problem:
      "Teams were managing critical ops in spreadsheets with no source of truth, causing delays and errors.",
    constraints: ["Tight 8-week launch", "Legacy data imports", "Zero-downtime rollout"],
    decisions: [
      "Designed a normalized data model to support flexible workflows.",
      "Built API contracts first to align frontend and backend development.",
      "Introduced feature flags to ship progressively without downtime.",
    ],
    results: ["Onboarding time reduced by 45%", "LCP down to 1.1s", "Task completion +28%"],
    stack: ["React", "Node.js", "Postgres", "Redis", "Vite"],
  },
  {
    id: "mercury-checkout",
    title: "Mercury Checkout",
    summary: "High-conversion checkout built for global commerce at scale.",
    problem:
      "Checkout abandonment was high due to slow loads and confusing payment flows.",
    constraints: ["Multiple locales", "Payment compliance", "Performance budget 200KB"],
    decisions: [
      "Moved critical logic to edge functions for low latency.",
      "Implemented a single-page flow with smart defaults.",
      "Added analytics events for every step to isolate drop-off.",
    ],
    results: ["Conversion +11%", "Bundle size -38%", "99.95% uptime"],
    stack: ["Next.js", "Stripe", "Edge Functions", "TypeScript"],
  },
  {
    id: "signal-desk",
    title: "Signal Desk",
    summary: "Realtime insights dashboard for support and customer success teams.",
    problem:
      "Support teams relied on delayed reports and couldn’t react to incidents fast enough.",
    constraints: ["Sub-second latency", "Multi-tenant data", "High-volume event stream"],
    decisions: [
      "Built a WebSocket gateway with backpressure handling.",
      "Streamed aggregates into Postgres for efficient dashboards.",
      "Added alert routing with configurable thresholds.",
    ],
    results: ["Alert latency 300ms", "WAU +62%", "10+ hrs/week saved"],
    stack: ["React", "WebSockets", "Kafka", "Postgres"],
  },
];

export default function CaseStudy(props: { params?: { id?: string } }) {
  const study = useMemo(() => {
    const id = props.params?.id;
    return caseStudies.find((item) => item.id === id) ?? caseStudies[0];
  }, [props.params?.id]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-5xl mx-auto px-6 md:px-12 py-16 md:py-20">
        <Link href="/">
          <a className="text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">
            Back to Home
          </a>
        </Link>

        <h1 className="text-4xl md:text-6xl font-display font-bold mt-6">
          {study.title}
        </h1>
        <p className="text-lg text-muted-foreground mt-4">
          {study.summary}
        </p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-sm uppercase tracking-widest text-muted-foreground mb-3">
              Problem
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              {study.problem}
            </p>
          </div>
          <div>
            <h2 className="text-sm uppercase tracking-widest text-muted-foreground mb-3">
              Constraints
            </h2>
            <ul className="text-base text-muted-foreground space-y-2">
              {study.constraints.map((line) => (
                <li key={line} className="flex items-start gap-2">
                  <span className="mt-2 h-[3px] w-[18px] bg-border" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-sm uppercase tracking-widest text-muted-foreground mb-3">
              Key Decisions
            </h2>
            <ul className="text-base text-muted-foreground space-y-2">
              {study.decisions.map((line) => (
                <li key={line} className="flex items-start gap-2">
                  <span className="mt-2 h-[3px] w-[18px] bg-border" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-sm uppercase tracking-widest text-muted-foreground mb-3">
              Results
            </h2>
            <ul className="text-base text-muted-foreground space-y-2">
              {study.results.map((line) => (
                <li key={line} className="flex items-start gap-2">
                  <span className="mt-2 h-[3px] w-[18px] bg-border" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border/40 pt-8">
          <h2 className="text-sm uppercase tracking-widest text-muted-foreground mb-3">
            Stack
          </h2>
          <div className="flex flex-wrap gap-2">
            {study.stack.map((tag) => (
              <span
                key={tag}
                className="text-xs uppercase tracking-wider text-muted-foreground border border-border px-2 py-1"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
