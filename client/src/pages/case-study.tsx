import { useMemo } from "react";
import { Link, useRoute } from "wouter";
import { ArrowLeft, ArrowUpRight, CheckCircle2, ExternalLink, FileText, Github, Layers, Terminal, AlertTriangle, Lightbulb } from "lucide-react";
import { SELECTED_PROJECTS } from "@/data/projects";
import Nav from "@/components/nav";

export default function CaseStudy(props: { params?: { id?: string } }) {
  const [, routeParams] = useRoute("/case-study/:id");
  const projectId = props.params?.id || routeParams?.id || "knova";

  const project = useMemo(() => {
    return SELECTED_PROJECTS.find((p) => p.id === projectId) ?? SELECTED_PROJECTS[0];
  }, [projectId]);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-white selection:text-black">
      <Nav />

      <main className="max-w-5xl mx-auto px-6 md:px-12 pt-32 pb-24">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Selected Work
          </Link>
        </div>

        {/* Case Study Header */}
        <header className="border-b border-border/60 pb-8 mb-12">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 border border-emerald-500/30 px-2 py-0.5 bg-emerald-950/20">
              {project.category}
            </span>
            <span className="text-xs font-mono text-muted-foreground">
              Timeline: {project.timeline}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-foreground mb-4">
            {project.title}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed mb-6">
            {project.subtitle}
          </p>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-border/30 text-xs font-mono text-muted-foreground">
            <span>ROLE: {project.role}</span>
            <div className="flex items-center gap-4">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-foreground hover:underline"
                >
                  Live Product <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-foreground hover:underline"
                >
                  GitHub Repository <Github className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </header>

        {/* 10-Part Standardized Engineering Body */}
        <div className="space-y-16">
          {/* 01 — Overview */}
          <section className="border border-border/70 bg-card/30 p-6 md:p-8">
            <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest block mb-2">
              01 — OVERVIEW
            </span>
            <h2 className="text-2xl font-display font-bold text-foreground mb-4">
              System Overview
            </h2>
            <p className="text-base text-foreground/90 leading-relaxed">
              {project.overview}
            </p>
          </section>

          {/* 02 — Problem */}
          <section className="border border-border/70 bg-card/30 p-6 md:p-8">
            <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest block mb-2">
              02 — THE PROBLEM
            </span>
            <h2 className="text-2xl font-display font-bold text-foreground mb-4">
              What Problem Was Being Solved?
            </h2>
            <p className="text-base text-foreground/90 leading-relaxed">
              {project.problem}
            </p>
          </section>

          {/* 03 — Constraints */}
          <section className="border border-border/70 bg-card/30 p-6 md:p-8">
            <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest block mb-2">
              03 — CONSTRAINTS
            </span>
            <h2 className="text-2xl font-display font-bold text-foreground mb-4">
              Operational &amp; Technical Constraints
            </h2>
            <ul className="space-y-3 text-sm md:text-base text-muted-foreground">
              {project.constraints.map((c, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-foreground mt-2 shrink-0" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* 04 — Architecture */}
          <section className="border border-border/70 bg-card/30 p-6 md:p-8">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
                04 — ARCHITECTURE
              </span>
              <span className="font-mono text-[11px] text-emerald-400">
                VERIFIED IMPLEMENTATION
              </span>
            </div>
            <h2 className="text-2xl font-display font-bold text-foreground mb-4">
              System Architecture
            </h2>
            <div className="border border-border/80 bg-background p-4 sm:p-6 font-mono text-xs overflow-x-auto my-6 shadow-inner">
              <pre className="text-neutral-200 leading-relaxed">
                {project.architectureDiagram.trim()}
              </pre>
            </div>
            <p className="text-sm text-muted-foreground italic leading-relaxed">
              {project.architectureNotes}
            </p>
          </section>

          {/* 05 — Technical Decisions */}
          <section className="border border-border/70 bg-card/30 p-6 md:p-8">
            <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest block mb-2">
              05 — TECHNICAL DECISIONS
            </span>
            <h2 className="text-2xl font-display font-bold text-foreground mb-6">
              Architectural Trade-Offs Evaluated
            </h2>
            <div className="space-y-6">
              {project.technicalDecisions.map((dec, i) => (
                <div
                  key={dec.decision}
                  className="border border-border/60 bg-background/50 p-5 font-mono text-xs"
                >
                  <div className="flex items-center justify-between mb-2 border-b border-border/40 pb-2">
                    <span className="text-[11px] uppercase tracking-widest text-emerald-400 font-bold">
                      DECISION 0{i + 1}: {dec.decision}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                    <div>
                      <span className="text-foreground font-bold block mb-1">
                        ✓ Chose: {dec.chose}
                      </span>
                      <p className="text-muted-foreground leading-relaxed">
                        <strong className="text-foreground/80">Why:</strong> {dec.why}
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground font-bold block mb-1">
                        ✗ Considered: {dec.considered}
                      </span>
                      <p className="text-muted-foreground leading-relaxed">
                        <strong className="text-foreground/80">Trade-Off:</strong> {dec.tradeOff}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 06 — Implementation */}
          <section className="border border-border/70 bg-card/30 p-6 md:p-8">
            <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest block mb-2">
              06 — IMPLEMENTATION
            </span>
            <h2 className="text-2xl font-display font-bold text-foreground mb-6">
              Core Technical Details
            </h2>
            <div className="space-y-6">
              {project.implementation.map((item) => (
                <div key={item.title} className="border-l-2 border-border/80 pl-4">
                  <h3 className="text-lg font-display font-bold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {item.details.map((d, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-foreground mt-1.5 shrink-0" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* 07 — Testing */}
          <section className="border border-border/70 bg-card/30 p-6 md:p-8">
            <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest block mb-2">
              07 — TESTING STRATEGY
            </span>
            <h2 className="text-2xl font-display font-bold text-foreground mb-3">
              Verification &amp; Critical Paths
            </h2>
            <p className="text-sm font-mono text-emerald-400 mb-4">
              Test Framework: {project.testing.framework}
            </p>
            <p className="text-base text-foreground/90 mb-4 leading-relaxed">
              {project.testing.description}
            </p>
            <div className="border border-border/60 bg-background/50 p-4 font-mono text-xs space-y-2">
              <span className="text-muted-foreground uppercase tracking-widest text-[10px] block mb-1">
                COVERAGE HIGHLIGHTS
              </span>
              {project.testing.coverage.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-muted-foreground">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* 08 — Performance */}
          <section className="border border-border/70 bg-card/30 p-6 md:p-8">
            <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest block mb-2">
              08 — PERFORMANCE
            </span>
            <h2 className="text-2xl font-display font-bold text-foreground mb-4">
              Performance Benchmarks
            </h2>
            {project.performance.status === "measured" && project.performance.metrics ? (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-4">
                {project.performance.metrics.map((m) => (
                  <div key={m.label} className="border border-border/60 bg-background/50 p-4">
                    <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-widest block">
                      {m.label}
                    </span>
                    <span className="text-2xl font-display font-bold text-foreground block my-1">
                      {m.value}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {m.note}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="border border-border/60 bg-background/40 p-4 font-mono text-xs text-muted-foreground my-4">
                {project.performance.notes}
              </div>
            )}
            <p className="text-xs text-muted-foreground mt-3 italic">
              {project.performance.notes}
            </p>
          </section>

          {/* 09 — Failures / Lessons */}
          <section className="border border-border/70 bg-card/30 p-6 md:p-8">
            <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest block mb-2">
              09 — FAILURES &amp; LESSONS
            </span>
            <h2 className="text-2xl font-display font-bold text-foreground mb-6">
              What Went Wrong &amp; How It Was Resolved
            </h2>
            <div className="space-y-6">
              {project.failuresAndLessons.map((item, idx) => (
                <div
                  key={idx}
                  className="border border-border/60 bg-background/50 p-5 space-y-3 font-mono text-xs"
                >
                  <div>
                    <span className="text-amber-400 font-bold block mb-1 uppercase tracking-wider flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5" /> What Went Wrong:
                    </span>
                    <p className="text-foreground text-sm font-sans">{item.failure}</p>
                  </div>

                  <div>
                    <span className="text-muted-foreground font-bold block mb-1 uppercase tracking-wider">
                      Root Cause:
                    </span>
                    <p className="text-muted-foreground font-sans">{item.why}</p>
                  </div>

                  <div>
                    <span className="text-emerald-400 font-bold block mb-1 uppercase tracking-wider">
                      Engineering Change:
                    </span>
                    <p className="text-foreground/90 font-sans">{item.change}</p>
                  </div>

                  <div className="pt-2 border-t border-border/30">
                    <span className="text-muted-foreground font-bold block mb-1 uppercase tracking-wider">
                      Key Takeaway:
                    </span>
                    <p className="text-muted-foreground italic font-sans">{item.lesson}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 10 — Outcome */}
          <section className="border border-border/70 bg-card/30 p-6 md:p-8">
            <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest block mb-2">
              10 — CURRENT STATUS &amp; ROADMAP
            </span>
            <h2 className="text-2xl font-display font-bold text-foreground mb-4">
              Project Outcome
            </h2>
            <p className="text-base text-foreground/90 mb-6 leading-relaxed">
              {project.outcome.currentStatus}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-border/60 bg-background/50 p-5">
                <span className="font-mono text-xs font-bold text-emerald-400 uppercase tracking-widest block mb-3">
                  ✓ What Works Currently
                </span>
                <ul className="space-y-2 text-xs md:text-sm text-muted-foreground">
                  {project.outcome.whatWorks.map((w, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-emerald-400 mt-1.5 shrink-0" />
                      <span>{w}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border border-border/60 bg-background/50 p-5">
                <span className="font-mono text-xs font-bold text-muted-foreground uppercase tracking-widest block mb-3">
                  ○ What Remains / Roadmap
                </span>
                <ul className="space-y-2 text-xs md:text-sm text-muted-foreground">
                  {project.outcome.whatRemains.map((r, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-border mt-1.5 shrink-0" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Tech Stack Footer */}
          <div className="border-t border-border/60 pt-8 flex flex-wrap gap-2">
            <span className="font-mono text-xs text-muted-foreground mr-2 self-center uppercase tracking-widest">
              Tech Stack:
            </span>
            {project.stack.map((t) => (
              <span
                key={t}
                className="text-xs font-mono text-muted-foreground border border-border bg-card px-2.5 py-1"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Next / Previous Project Navigation */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-12 border-t border-border/60">
            <Link
              href="/#work"
              className="text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground inline-flex items-center gap-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Selected Work
            </Link>

            <div className="flex items-center gap-4">
              {SELECTED_PROJECTS.map((p) => (
                <Link
                  key={p.id}
                  href={`/case-study/${p.id}`}
                  className={`text-xs font-mono uppercase tracking-wider px-3 py-1.5 border transition-colors ${
                    p.id === project.id
                      ? "border-foreground bg-foreground text-background font-bold"
                      : "border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {p.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
