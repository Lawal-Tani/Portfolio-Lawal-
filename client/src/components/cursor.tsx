import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(media.matches);
    onChange();
    media.addEventListener?.("change", onChange);
    return () => media.removeEventListener?.("change", onChange);
  }, []);

  return reduced;
}

export default function Cursor() {
  const reduced = usePrefersReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const dotX = useSpring(x, { stiffness: 900, damping: 50, mass: 0.3 });
  const dotY = useSpring(y, { stiffness: 900, damping: 50, mass: 0.3 });
  const ringX = useSpring(x, { stiffness: 300, damping: 40, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 300, damping: 40, mass: 0.9 });

  useEffect(() => {
    const isTouch =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches;

    if (isTouch || reduced) {
      setEnabled(false);
      return;
    }

    setEnabled(true);
  }, [reduced]);

  useEffect(() => {
    if (!enabled) {
      document.body.classList.remove("cursor-enabled");
      return;
    }

    document.body.classList.add("cursor-enabled");

    const onMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };

    const onOver = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;
      const hoverable = target.closest(
        "a, button, input, textarea, select, [data-cursor]",
      );
      setHovering(Boolean(hoverable));
    };

    const onOut = () => setHovering(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerout", onOut, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerout", onOut);
      document.body.classList.remove("cursor-enabled");
    };
  }, [enabled, x, y]);

  const ringScale = useMemo(() => (hovering ? 1.7 : 1), [hovering]);
  const dotScale = useMemo(() => (hovering ? 0.6 : 1), [hovering]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        className="cursor-ring"
        style={{ translateX: ringX, translateY: ringY, scale: ringScale }}
      />
      <motion.div
        className="cursor-dot"
        style={{ translateX: dotX, translateY: dotY, scale: dotScale }}
      />
    </>
  );
}
