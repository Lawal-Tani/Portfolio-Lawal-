export default function Capabilities() {
  const capabilities = [
    { label: "FULL-STACK", note: "End-to-end web & mobile systems" },
    { label: "AI SYSTEMS", note: "RAG & multi-provider routing" },
    { label: "SYSTEM DESIGN", note: "Decoupled queues & trade-offs" },
    { label: "ROBOTICS", note: "Sensors, signals & physical hardware" },
    { label: "AUTOMATION", note: "PLC systems & industrial instrumentation" },
  ];

  return (
    <section className="border-y border-border/60 bg-card/40">
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-5">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-6">
          {capabilities.map((item) => (
            <div key={item.label} className="flex flex-col gap-1">
              <span className="font-mono text-xs font-bold tracking-widest text-foreground flex items-center gap-2">
                <span className="inline-block w-1.5 h-1.5 bg-foreground" />
                {item.label}
              </span>
              <span className="text-[11px] text-muted-foreground font-sans">
                {item.note}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
