import { ArrowUpRight, CheckCircle2, ChevronRight, ExternalLink, Github, Layers, Terminal } from "lucide-react";
import { Link } from "wouter";
import { SELECTED_PROJECTS, EXPERIMENT_PROJECTS, type CaseStudyData } from "@/data/projects";

function PrimaryProjectCard({ project, index }: { project: CaseStudyData; index: number }) {
  return (
    <article className="border border-border/80 bg-card/40 p-6 md:p-10 transition-all hover:border-foreground/60 mb-12">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/50 pb-6 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="font-mono text-xs text-muted-foreground">
              0{index + 1} //
            </span>
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 border border-emerald-500/30 px-2 py-0.5 bg-emerald-950/20">
              {project.category}
            </span>
          </div>
          <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground">
            {project.title}
          </h3>
          <p className="text-sm md:text-base text-muted-foreground mt-1">
            {project.subtitle}
          </p>
        </div>

        {/* Action Links */}
        <div className="flex items-center gap-3 self-start md:self-auto">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-foreground border border-border px-3.5 py-2 hover:bg-foreground hover:text-background transition-colors"
            >
              Live Demo <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-muted-foreground border border-border px-3.5 py-2 hover:text-foreground hover:border-foreground transition-colors"
            >
              GitHub <Github className="w-3.5 h-3.5" />
            </a>
          )}
          <Link
            href={`/case-study/${project.id}`}
            className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider bg-foreground text-background font-bold px-3.5 py-2 hover:bg-neutral-200 transition-colors"
          >
            Case Study <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Engineering Problem & What Was Built */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        <div className="lg:col-span-6 space-y-6">
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-foreground" /> The Engineering Problem
            </h4>
            <p className="text-sm md:text-base text-foreground/90 leading-relaxed">
              {project.problem}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-foreground" /> What I Engineered
            </h4>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              {project.overview}
            </p>
          </div>

          {/* Key Trade-Off Preview */}
          {project.technicalDecisions.length > 0 && (
            <div className="border border-border/60 bg-background/50 p-4 font-mono text-xs">
              <span className="text-[11px] text-muted-foreground uppercase tracking-widest block mb-2 font-bold text-foreground">
                Technical Trade-Off: {project.technicalDecisions[0].decision}
              </span>
              <p className="text-muted-foreground mb-1.5">
                <strong className="text-foreground">Chose:</strong> {project.technicalDecisions[0].chose}
              </p>
              <p className="text-muted-foreground mb-1.5">
                <strong className="text-foreground">Why:</strong> {project.technicalDecisions[0].why}
              </p>
              <p className="text-muted-foreground">
                <strong className="text-foreground">Trade-off:</strong> {project.technicalDecisions[0].tradeOff}
              </p>
            </div>
          )}
        </div>

        {/* Right: Architecture Visualization */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          <div className="border border-border/80 bg-background/90 p-4 font-mono text-xs rounded-none overflow-x-auto shadow-inner">
            <div className="flex items-center justify-between border-b border-border/40 pb-2 mb-3 text-[11px] text-muted-foreground">
              <span>SYSTEM ARCHITECTURE DIAGRAM</span>
              <span className="text-emerald-400">VERIFIED</span>
            </div>
            <pre className="text-[11px] leading-snug text-neutral-300 font-mono overflow-x-auto no-scrollbar py-2">
              {project.architectureDiagram.trim()}
            </pre>
          </div>

          <p className="text-xs text-muted-foreground mt-3 italic">
            {project.architectureNotes}
          </p>
        </div>
      </div>

      {/* Footer: Tech Stack & Full Case Study CTA */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-border/50">
        <div className="flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="text-[11px] font-mono text-muted-foreground border border-border/70 px-2.5 py-1 bg-background/50"
            >
              {tech}
            </span>
          ))}
        </div>

        <Link
          href={`/case-study/${project.id}`}
          className="text-xs font-mono text-foreground hover:underline inline-flex items-center gap-1 font-bold"
        >
          Read complete 10-part case study <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </article>
  );
}

export default function Projects() {
  return (
    <section id="work" className="py-24 px-6 md:px-12 max-w-6xl mx-auto border-t border-border/60">
      {/* Section Header */}
      <div className="mb-14">
        <div className="flex items-center gap-3 mb-3">
          <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            // SELECTED WORK
          </span>
          <div className="h-[1px] flex-1 bg-border/40 max-w-xs" />
        </div>
        <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground">
          Products and systems I've designed, built, debugged, and shipped.
        </h2>
        <p className="text-muted-foreground text-base md:text-lg mt-3 max-w-2xl">
          Each project communicates the engineering problem, system constraints, trade-offs evaluated, and verifiable outcomes.
        </p>
      </div>

      {/* Selected Major Projects */}
      <div>
        {SELECTED_PROJECTS.map((project, index) => (
          <PrimaryProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>

      {/* More Experiments Section */}
      <div className="mt-20 pt-16 border-t border-border/60">
        <div className="mb-10">
          <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground block mb-2">
            // ENGINEERING EXPERIMENTS & SUBSYSTEMS
          </span>
          <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground">
            More Experiments
          </h3>
          <p className="text-sm text-muted-foreground mt-2 max-w-xl">
            Targeted explorations demonstrating breadth across distributed systems, machine learning telemetry, and responsive web systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {EXPERIMENT_PROJECTS.map((exp) => (
            <div
              key={exp.id}
              className="border border-border/70 bg-card/30 p-6 flex flex-col justify-between hover:border-foreground/50 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between gap-4 mb-2">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400">
                    {exp.category}
                  </span>
                  <div className="flex items-center gap-2">
                    {exp.githubUrl && (
                      <a
                        href={exp.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-muted-foreground hover:text-foreground"
                        aria-label={`${exp.title} GitHub`}
                      >
                        <Github className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {exp.liveUrl && (
                      <a
                        href={exp.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-muted-foreground hover:text-foreground"
                        aria-label={`${exp.title} Live URL`}
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {exp.caseStudyId && (
                      <Link
                        href={`/case-study/${exp.caseStudyId}`}
                        className="text-muted-foreground hover:text-foreground"
                        aria-label={`${exp.title} Case Study`}
                      >
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    )}
                  </div>
                </div>

                <h4 className="text-lg font-display font-bold text-foreground mb-2">
                  {exp.title}
                </h4>
                <p className="text-sm text-muted-foreground mb-4">
                  {exp.oneLiner}
                </p>

                <div className="border-l-2 border-border/80 pl-3 py-1 mb-4">
                  <p className="text-xs text-muted-foreground">
                    <strong className="text-foreground">Challenge:</strong> {exp.challenge}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-border/30">
                {exp.stack.map((tech) => (
                  <span
                    key={tech}
                    className="text-[10px] font-mono text-muted-foreground bg-background px-2 py-0.5 border border-border/50"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
