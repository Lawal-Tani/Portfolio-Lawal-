import { useIsMobile } from "@/hooks/use-mobile";
import { useEffect, useRef, useState } from "react";

const items = [
  { label: "Top", href: "#top" },
  { label: "About", href: "#about" },
  { label: "Work", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function MobileNav() {
  const isMobile = useIsMobile();
  const [visible, setVisible] = useState(true);
  const lastY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    if (!isMobile) return;
    lastY.current = window.scrollY;

    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;

      window.requestAnimationFrame(() => {
        const currentY = window.scrollY;
        const delta = currentY - lastY.current;

        if (currentY < 80) {
          setVisible(true);
        } else if (delta > 6) {
          setVisible(false);
        } else if (delta < -6) {
          setVisible(true);
        }

        lastY.current = currentY;
        ticking.current = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isMobile]);

  if (!isMobile) return null;

  return (
    <div
      className={`fixed bottom-4 left-1/2 -translate-x-1/2 z-40 transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-16"
      }`}
    >
      <div className="flex items-center gap-2 border border-border/60 bg-background/80 backdrop-blur-md px-3 py-2">
        {items.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="text-[11px] uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors px-2 py-1"
          >
            {item.label}
          </a>
        ))}
      </div>
    </div>
  );
}
