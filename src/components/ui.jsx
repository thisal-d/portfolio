import { useEffect, useRef, useState } from "react";
import { splitTitle } from "@/lib/data";

/* ───────── viewport hook ───────── */
export function useInView(opts = { rootMargin: "0px 0px -8% 0px" }, once = true) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") { setSeen(true); return; }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setSeen(true); if (once) io.disconnect(); }
      else if (!once) setSeen(false);
    }, opts);
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, seen];
}

/* ───────── scroll reveal ───────── */
export function Reveal({ children, className = "", delay = 0, dir = "up", style }) {
  const [ref, seen] = useInView();
  return (
    <div
      ref={ref}
      className={`rv ${dir === "left" ? "rv-left" : dir === "right" ? "rv-right" : ""} ${seen ? "in" : ""} ${className}`}
      style={{ "--d": `${delay}ms`, ...style }}
    >
      {children}
    </div>
  );
}

/* ───────── numbered section bar  ("01 / THE LINEUP") ───────── */
export function SectionBar({ n, label, right, id }) {
  return (
    <div className="sec-bar mono" id={id}>
      <span>{n} <span className="mx-1 text-ink3">/</span> {label}</span>
      {right && <span className="hidden truncate text-ink3 sm:block">{right}</span>}
    </div>
  );
}

/* ───────── two-tone project title ───────── */
export function SplitTitle({ title, accent, className = "" }) {
  const [a, b] = splitTitle(title);
  return (
    <span className={className}>
      {a}
      {b && <span style={{ color: accent }}>{b}</span>}
    </span>
  );
}

/* ───────── count-up number ───────── */
export function CountUp({ to, suffix = "" }) {
  const [ref, seen] = useInView();
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!seen) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setV(to); return; }
    const t0 = performance.now(), dur = 1400;
    let raf = 0;
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / dur);
      setV(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, to]);
  return <span ref={ref}>{v}{suffix}</span>;
}

/* ───────── inline icons ───────── */
const base = { width: 14, height: 14, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" };
export const IconArrow = ({ className = "" }) => (
  <svg {...base} className={className} aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" /></svg>
);
export const IconArrowRight = ({ className = "" }) => (
  <svg {...base} className={className} aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);
export const IconDownload = () => (
  <svg {...base} aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" /></svg>
);
export const IconSun = () => (
  <svg {...base} width={16} height={16} aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
);
export const IconMoon = () => (
  <svg {...base} width={16} height={16} aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></svg>
);
export const IconCopy = () => (
  <svg {...base} aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
);
export const IconCheck = () => (
  <svg {...base} aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
);
export const IconStar = () => (
  <svg {...base} fill="currentColor" strokeWidth={1} aria-hidden="true"><path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z" /></svg>
);
export const IconFork = () => (
  <svg {...base} aria-hidden="true"><circle cx="6" cy="5" r="2" /><circle cx="18" cy="5" r="2" /><circle cx="12" cy="19" r="2" /><path d="M6 7v2a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V7M12 12v5" /></svg>
);
export const IconClose = () => (
  <svg {...base} width={18} height={18} aria-hidden="true"><path d="M18 6 6 18M6 6l12 12" /></svg>
);
export const IconMenu = () => (
  <svg {...base} width={18} height={18} aria-hidden="true"><path d="M3 7h18M3 12h18M3 17h18" /></svg>
);
export const IconChevron = ({ dir }) => (
  <svg {...base} width={16} height={16} aria-hidden="true"><path d={dir === "l" ? "m15 18-6-6 6-6" : "m9 18 6-6-6-6"} /></svg>
);
