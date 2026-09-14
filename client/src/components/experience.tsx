import { Briefcase, Calendar, MapPin } from "lucide-react";

export default function Experience() {
  const experiences = [
    {
      role: "Software Engineer",
      company: "Pedagon Africa",
      period: "2022 – Present",
      location: "Lagos, Nigeria",
      type: "Software Engineering",
      summary: "Collaborated on full-stack web platforms, client-side applications, and API integrations.",
      responsibilities: [
        "Built and maintained responsive frontend interfaces using React, TypeScript, and modern styling libraries.",
        "Collaborated on Node.js and REST API endpoints for user onboarding, profile state, and data workflows.",
        "Conducted cross-functional product reviews with design and product leads to tighten release cadences and squelch UI bugs.",
        "Participated in codebase reviews, code standardizations, and integration tests to ensure reliable production deployments.",
      ],
      tech: ["React", "TypeScript", "Node.js", "REST APIs", "Tailwind CSS", "Git"],
    },
    {
      role: "Automation & Systems Engineering Intern",
      company: "GIL Automations",
      period: "2025 – 2026",
      location: "Lagos, Nigeria",
      type: "Industrial Automation & Control",
      summary: "Hands-on engineering work across industrial instrumentation, PLC configurations, technical documentation, and system troubleshooting.",
      responsibilities: [
        "Assisted senior engineers in troubleshooting and calibrating field instrumentation, sensors, and industrial automation control loops.",
        "Supported PLC (Programmable Logic Controller) diagnostics, wiring checks, and control panel integration testing.",
        "Authored detailed engineering documentation, equipment test reports, and technical sourcing specifications for client systems.",
        "Bridged physical hardware diagnostics with telemetry data logging, reinforcing a strong discipline for fail-safe engineering.",
      ],
      tech: ["PLCs", "Industrial Instrumentation", "Control Systems", "Sensor Diagnostics", "Technical Documentation"],
    },
    {
      role: "Robotics & Automation Foundation",
      company: "Academic & Systems Engineering Projects",
      period: "2022 – Present",
      location: "Nigeria",
      type: "Robotics & ML Telemetry",
      summary: "Applied engineering research combining machine learning, microcontroller firmware, and telemetry analysis.",
      responsibilities: [
        "Developed LSTM neural network models for predictive time-series forecasting of CNC machine spindle speed from multi-channel sensor telemetry.",
        "Implemented sensor integration routines on microcontrollers (Arduino/C++), emphasizing hardware interrupts, signal debouncing, and memory constraints.",
        "Grounding software architecture in physical engineering fundamentals: knowing that systems must handle physical signal noise, timeouts, and hardware resets.",
      ],
      tech: ["Python", "TensorFlow", "C / C++", "MATLAB", "Time-Series ML", "Embedded Systems"],
    },
  ];

  return (
    <section id="experience" className="py-24 px-6 md:px-12 max-w-6xl mx-auto border-t border-border/60">
      {/* Section Header */}
      <div className="mb-14">
        <div className="flex items-center gap-3 mb-3">
          <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            // WORK HISTORY & ENGINEERING ROLES
          </span>
          <div className="h-[1px] flex-1 bg-border/40 max-w-xs" />
        </div>
        <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground">
          Engineering Experience
        </h2>
        <p className="text-muted-foreground text-base md:text-lg mt-3 max-w-2xl">
          Direct engineering contributions across full-stack software development and industrial automation.
        </p>
      </div>

      {/* Experience Timeline */}
      <div className="space-y-10">
        {experiences.map((exp, idx) => (
          <div
            key={exp.company}
            className="border border-border/70 bg-card/30 p-6 md:p-8 hover:border-foreground/50 transition-colors"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-border/40 pb-4 mb-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 block mb-1">
                  {exp.type}
                </span>
                <h3 className="text-xl md:text-2xl font-display font-bold text-foreground">
                  {exp.role}{" "}
                  <span className="text-muted-foreground font-medium">
                    @ {exp.company}
                  </span>
                </h3>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" /> {exp.period}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" /> {exp.location}
                </span>
              </div>
            </div>

            <p className="text-sm md:text-base text-foreground/90 mb-4 font-medium">
              {exp.summary}
            </p>

            <ul className="space-y-2 mb-6">
              {exp.responsibilities.map((resp) => (
                <li key={resp} className="text-xs md:text-sm text-muted-foreground flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 bg-foreground mt-1.5 shrink-0" />
                  <span>{resp}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2 pt-4 border-t border-border/30">
              {exp.tech.map((t) => (
                <span
                  key={t}
                  className="text-[11px] font-mono text-muted-foreground bg-background px-2.5 py-1 border border-border/60"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
