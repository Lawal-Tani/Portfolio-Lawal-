import { ArrowUpRight, BookOpen, Clock, FileCode, Tag } from "lucide-react";
import { Link } from "wouter";
import { ENGINEERING_NOTES } from "@/data/engineering-notes";

export default function EngineeringPreview() {
  const featuredNotes = ENGINEERING_NOTES.slice(0, 4);

  return (
    <section id="engineering" className="py-24 px-6 md:px-12 max-w-6xl mx-auto border-t border-border/60">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              // TECHNICAL DOCUMENTATION & RESEARCH
            </span>
            <div className="h-[1px] flex-1 bg-border/40 max-w-xs" />
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground">
            Engineering Notes
          </h2>
          <p className="text-muted-foreground text-base md:text-lg mt-3 max-w-2xl">
            Technical decisions, architecture records, postmortems, and systems I've worked through.
          </p>
        </div>

        <Link
          href="/engineering"
          className="inline-flex items-center gap-2 border border-foreground text-foreground px-5 py-3 font-mono text-xs uppercase tracking-widest hover:bg-foreground hover:text-background transition-colors font-bold self-start md:self-auto"
        >
          View All Notes ({ENGINEERING_NOTES.length}) <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {featuredNotes.map((note) => (
          <Link
            key={note.id}
            href={`/engineering#${note.slug}`}
            className="group border border-border/70 bg-card/30 p-6 flex flex-col justify-between hover:border-foreground transition-all"
          >
            <div>
              {/* Type, Status & Read Time */}
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-widest px-2 py-0.5 border border-foreground/30 bg-foreground/5 text-foreground">
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
                </div>
                <span className="font-mono text-[11px] text-muted-foreground flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {note.readingTime}
                </span>
              </div>

              {/* Title & Subtitle */}
              <h3 className="text-xl font-display font-bold text-foreground group-hover:text-muted-foreground transition-colors mb-2">
                {note.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                {note.summary}
              </p>
            </div>

            {/* Tags & Action Link */}
            <div className="pt-4 border-t border-border/30 flex items-center justify-between">
              <div className="flex flex-wrap gap-1.5">
                {note.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono text-muted-foreground/80 bg-background px-2 py-0.5 border border-border/40"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              <span className="text-xs font-mono text-foreground font-bold inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Read Note <ArrowUpRight className="w-3 h-3" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
