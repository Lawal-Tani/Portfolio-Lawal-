const repos = [
  {
    name: "ops-orchestrator",
    description: "Workflow engine with queue orchestration and audit trails.",
    stars: "1.2k",
    href: "https://github.com/Lawal-Tani",
  },
  {
    name: "edge-checkout",
    description: "Edge-first checkout with optimized latency and observability.",
    stars: "860",
    href: "https://github.com/Lawal-Tani",
  },
  {
    name: "signal-stream",
    description: "Realtime dashboards powered by WebSockets and Kafka.",
    stars: "540",
    href: "https://github.com/Lawal-Tani",
  },
];

export default function FeaturedRepos() {
  return (
    <section className="section-visibility border-t border-border/40">
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-20">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-3">
              Open Source
            </p>
            <h3 className="text-2xl md:text-3xl font-display font-medium">
              Featured GitHub Repos
            </h3>
          </div>
          <a
            href="https://github.com/Lawal-Tani"
            target="_blank"
            rel="noreferrer"
            className="text-xs uppercase tracking-widest text-foreground border border-border/60 px-3 py-2 hover:bg-foreground hover:text-background transition-colors w-fit"
            data-cursor
          >
            View Profile
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {repos.map((repo) => (
            <a
              key={repo.name}
              href={repo.href}
              target="_blank"
              rel="noreferrer"
              className="border border-border/40 p-5 bg-background/40 hover:bg-background/70 transition-colors"
              data-cursor
            >
              <div className="flex items-center justify-between">
                <p className="text-sm uppercase tracking-widest text-muted-foreground">
                  {repo.name}
                </p>
                <span className="text-xs text-muted-foreground">{repo.stars}★</span>
              </div>
              <p className="text-sm text-muted-foreground mt-3">
                {repo.description}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
