const results = [
  {
    label: "Revenue Impact",
    value: "+$1.2M",
    detail: "Attributed to checkout and pricing experiments",
  },
  {
    label: "Performance",
    value: "1.1s",
    detail: "Median LCP on key flows",
  },
  {
    label: "Reliability",
    value: "99.95%",
    detail: "Uptime across core services",
  },
  {
    label: "Product Velocity",
    value: "2.4x",
    detail: "Faster release cadence with CI + feature flags",
  },
];

export default function Results() {
  return (
    <section className="section-visibility border-t border-border/40 bg-card/40">
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-14 md:py-18">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-3">
              Impact
            </p>
            <h3 className="text-2xl md:text-3xl font-display font-medium">
              Proof of outcomes, not just aesthetics.
            </h3>
          </div>
          <p className="text-sm text-muted-foreground max-w-md">
            These are representative results from recent projects. Replace with your real metrics when ready.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {results.map((item) => (
            <div
              key={item.label}
              className="border border-border/40 p-5 bg-background/40"
            >
              <p className="text-xs uppercase tracking-widest text-muted-foreground">
                {item.label}
              </p>
              <p className="text-3xl font-display font-bold mt-3">
                {item.value}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
