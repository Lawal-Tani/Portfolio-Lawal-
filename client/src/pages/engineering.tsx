import { useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, Clock, FileText, Filter, Terminal, AlertCircle, CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";
import Nav from "@/components/nav";
import { ENGINEERING_NOTES, type EngineeringNote, type NoteType } from "@/data/engineering-notes";

export default function EngineeringPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [expandedId, setExpandedId] = useState<string | null>(ENGINEERING_NOTES[0].id);

  const categories = ["All", "RFC", "ADR", "Debugging", "Postmortem", "Performance"];

  const filteredNotes = selectedCategory === "All"
    ? ENGINEERING_NOTES
    : ENGINEERING_NOTES.filter((n) => n.type === selectedCategory);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-white selection:text-black">
      <Nav />

      <main className="max-w-5xl mx-auto px-6 md:px-12 pt-32 pb-24">
        {/* Back navigation */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </Link>
        </div>

        {/* Page Header */}
        <header className="border-b border-border/60 pb-8 mb-12">
          <div className="inline-flex items-center gap-2 border border-border/80 bg-card/60 px-3 py-1 mb-4 text-xs font-mono uppercase tracking-widest text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            TECHNICAL WRITING &amp; ARCHITECTURE
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-foreground mb-4">
            Engineering Notes
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            Technical decisions, architectural trade-offs, debugging investigations, postmortems, and performance measurements.
          </p>
        </header>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-border/30">
          <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground mr-2 flex items-center gap-1.5">
            <Filter className="w-3 h-3" /> Filter:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs font-mono uppercase tracking-wider px-3 py-1.5 border transition-colors ${
                selectedCategory === cat
                  ? "border-foreground bg-foreground text-background font-bold"
                  : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/60"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Notes Listing */}
        <div className="space-y-6">
          {filteredNotes.map((note) => {
            const isExpanded = expandedId === note.id;

            return (
              <article
                id={note.slug}
                key={note.id}
                className={`border transition-all ${
                  isExpanded
                    ? "border-foreground bg-card/50"
                    : "border-border/80 bg-card/20 hover:border-foreground/60"
                }`}
              >
                {/* Note Header (Click to toggle) */}
                <button
                  type="button"
                  onClick={() => toggleExpand(note.id)}
                  className="w-full text-left p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-mono text-xs font-bold uppercase tracking-widest px-2 py-0.5 border border-foreground/30 bg-foreground/5 text-foreground">
                        {note.type}
                      </span>
                      <span
                        className={`font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 border ${
                          note.status === "Accepted" || note.status === "Resolved"
                            ? "border-emerald-500/40 text-emerald-400 bg-emerald-950/20"
                            : "border-amber-500/40 text-amber-400 bg-amber-950/20"
                        }`}
                      >
                        {note.status}
                      </span>
                      <span className="font-mono text-xs text-muted-foreground">
                        {note.date}
                      </span>
                    </div>

                    <h2 className="text-xl md:text-2xl font-display font-bold text-foreground">
                      {note.title}
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      {note.subtitle}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground shrink-0 self-start sm:self-center">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {note.readingTime}
                    </span>
                    <span className="p-1 border border-border/60 hover:bg-background">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </div>
                </button>

                {/* Expanded Document Details */}
                {isExpanded && (
                  <div className="p-6 pt-2 border-t border-border/40 font-sans space-y-8">
                    {/* Summary */}
                    <div>
                      <h3 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2">
                        Summary
                      </h3>
                      <p className="text-base text-foreground/90 leading-relaxed">
                        {note.summary}
                      </p>
                    </div>

                    {/* RFC Specific Fields */}
                    {note.type === "RFC" && (
                      <>
                        {note.problem && (
                          <div>
                            <h3 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2">
                              Problem Statement
                            </h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {note.problem}
                            </p>
                          </div>
                        )}

                        {note.goals && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
                            <div className="border border-border/60 bg-background/50 p-4">
                              <span className="text-emerald-400 uppercase tracking-widest font-bold block mb-2">
                                Goals
                              </span>
                              <ul className="space-y-1.5 text-muted-foreground">
                                {note.goals.map((g, i) => (
                                  <li key={i} className="flex items-start gap-2">
                                    <span className="text-emerald-400">✓</span>
                                    <span>{g}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {note.nonGoals && (
                              <div className="border border-border/60 bg-background/50 p-4">
                                <span className="text-muted-foreground uppercase tracking-widest font-bold block mb-2">
                                  Non-Goals
                                </span>
                                <ul className="space-y-1.5 text-muted-foreground">
                                  {note.nonGoals.map((ng, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                      <span>✗</span>
                                      <span>{ng}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        )}

                        {note.proposedArchitecture && (
                          <div>
                            <h3 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2">
                              Proposed Architecture Diagram
                            </h3>
                            <div className="border border-border/80 bg-background p-4 font-mono text-xs overflow-x-auto shadow-inner">
                              <pre className="text-neutral-200">
                                {note.proposedArchitecture.trim()}
                              </pre>
                            </div>
                          </div>
                        )}
                      </>
                    )}

                    {/* ADR Specific Fields */}
                    {note.type === "ADR" && (
                      <>
                        {note.context && (
                          <div>
                            <h3 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2">
                              Context &amp; Problem
                            </h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {note.context}
                            </p>
                          </div>
                        )}

                        {note.decision && (
                          <div className="border-l-2 border-emerald-400 pl-4 py-1 bg-emerald-950/10">
                            <h3 className="text-xs font-mono uppercase tracking-widest text-emerald-400 mb-1 font-bold">
                              Decision
                            </h3>
                            <p className="text-sm text-foreground leading-relaxed">
                              {note.decision}
                            </p>
                          </div>
                        )}

                        {note.tradeOffs && (
                          <div>
                            <h3 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2">
                              Evaluated Trade-Off
                            </h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {note.tradeOffs}
                            </p>
                          </div>
                        )}
                      </>
                    )}

                    {/* Debugging & Postmortem Fields */}
                    {(note.type === "Debugging" || note.type === "Postmortem") && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
                        {note.symptom && (
                          <div className="border border-border/60 bg-background/50 p-4">
                            <span className="text-amber-400 uppercase tracking-widest font-bold block mb-1">
                              Symptom
                            </span>
                            <p className="text-foreground/90 font-sans">{note.symptom}</p>
                          </div>
                        )}

                        {note.rootCause && (
                          <div className="border border-border/60 bg-background/50 p-4">
                            <span className="text-muted-foreground uppercase tracking-widest font-bold block mb-1">
                              Root Cause
                            </span>
                            <p className="text-muted-foreground font-sans">{note.rootCause}</p>
                          </div>
                        )}

                        {note.fix && (
                          <div className="border border-border/60 bg-background/50 p-4">
                            <span className="text-emerald-400 uppercase tracking-widest font-bold block mb-1">
                              Principled Fix
                            </span>
                            <p className="text-foreground font-sans">{note.fix}</p>
                          </div>
                        )}

                        {note.lesson && (
                          <div className="border border-border/60 bg-background/50 p-4">
                            <span className="text-muted-foreground uppercase tracking-widest font-bold block mb-1">
                              Engineering Takeaway
                            </span>
                            <p className="text-muted-foreground italic font-sans">{note.lesson}</p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Performance Table */}
                    {note.type === "Performance" && note.metricsTable && (
                      <div className="border border-border/70 overflow-x-auto">
                        <table className="w-full text-xs font-mono text-left">
                          <thead className="bg-background border-b border-border/60 uppercase tracking-wider text-muted-foreground">
                            <tr>
                              <th className="p-3">Metric</th>
                              <th className="p-3">Baseline</th>
                              <th className="p-3">Optimized</th>
                              <th className="p-3">Result</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-border/30">
                            {note.metricsTable.map((row) => (
                              <tr key={row.metric} className="hover:bg-background/40">
                                <td className="p-3 font-bold text-foreground">{row.metric}</td>
                                <td className="p-3 text-muted-foreground">{row.before}</td>
                                <td className="p-3 text-foreground">{row.after}</td>
                                <td className="p-3 text-emerald-400 font-bold">{row.improvement}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {/* Tags Footer */}
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-border/30">
                      {note.tags.map((t) => (
                        <span
                          key={t}
                          className="text-[11px] font-mono text-muted-foreground border border-border/60 bg-background px-2 py-0.5"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </main>
    </div>
  );
}
