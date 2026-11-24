import { useRef } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "@/context/theme";
import { badges } from "@/lib/data";
import { badgeImage, img, resumeUrl } from "@/lib/assets";
import { CountUp, IconArrowRight, IconDownload, Reveal } from "./ui";

/** Floating skill "app icons", all taken from the portfolio's own skill icons. */
const TILES = [
  { icon: "python", x: 7, y: 21, s: 88, c: "var(--blue)", r: -6, t: 7, d: 0, depth: 18, m: false },
  { icon: "react", x: 87, y: 15, s: 78, c: "var(--teal)", r: 5, t: 8, d: 0.8, depth: -22, m: false },
  { icon: "java", x: 3, y: 60, s: 70, c: "var(--red)", r: -3, t: 9, d: 1.2, depth: 26, m: false },
  { icon: "mongodb", x: 91, y: 50, s: 68, c: "var(--green)", r: 4, t: 6.5, d: 0.3, depth: -16, m: false },
  { icon: "arduino", x: 12, y: 90, s: 58, c: "var(--teal)", r: 6, t: 7.5, d: 1.8, depth: 14, m: true },
  { icon: "nodejs", x: 79, y: 88, s: 72, c: "var(--green)", r: -5, t: 8.5, d: 0.5, depth: -24, m: true },
  { icon: "android", x: 25, y: 7, s: 58, c: "var(--green)", r: -4, t: 6, d: 1.5, depth: 12, m: true },
  { icon: "mysql", x: 68, y: 5, s: 56, c: "var(--blue)", r: 7, t: 7, d: 2.1, depth: -12, m: true },
  { icon: "javascript", x: 28, y: 80, s: 56, c: "var(--amber)", r: 5, t: 9, d: 2.4, depth: 20, m: false },
  { icon: "git", x: 63, y: 70, s: 52, c: "var(--red)", r: -7, t: 7.8, d: 0.9, depth: -18, m: false },
];

const STATS = [
  { value: 2, suffix: "+", label: "Projects Shipped" },
  { value: 2, suffix: "", label: "PyPI Packages" },
  { value: 3, suffix: "+", label: "Years Building" },
  { value: badges.length, suffix: "", label: "Recognitions" },
];

function Rings() {
  const radii = [90, 150, 215, 285, 360, 440, 520, 610];
  return (
    <div className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[max(150vw,1500px)] -translate-x-1/2 -translate-y-1/2" aria-hidden="true">
      <svg viewBox="0 0 1000 1000" className="absolute inset-0 h-full w-full" fill="none">
        {radii.map((r, i) => (
          <circle key={r} cx="500" cy="500" r={r * 0.82} stroke="var(--line)" strokeWidth={i % 3 === 0 ? 1.4 : 1} />
        ))}
        {/* ticks */}
        <circle cx="500" cy="500" r={285 * 0.82} stroke="var(--line-strong)" strokeWidth="9" strokeDasharray="1.2 20" opacity=".35" />
      </svg>
      {/* heavier orbiting arcs */}
      <svg viewBox="0 0 1000 1000" className="absolute inset-0 h-full w-full" style={{ animation: "spin-slow 90s linear infinite" }} fill="none">
        <circle cx="500" cy="500" r={360 * 0.82} stroke="var(--ink)" strokeWidth="3" strokeDasharray="520 1800" strokeLinecap="round" opacity=".55" />
      </svg>
      <svg viewBox="0 0 1000 1000" className="absolute inset-0 h-full w-full" style={{ animation: "spin-slow 140s linear infinite reverse" }} fill="none">
        <circle cx="500" cy="500" r={520 * 0.82} stroke="var(--ink)" strokeWidth="2" strokeDasharray="260 2400" strokeLinecap="round" opacity=".4" />
        <circle cx="500" cy="500" r={440 * 0.82} stroke="var(--blue)" strokeWidth="2.5" strokeDasharray="160 2200" strokeLinecap="round" />
      </svg>
    </div>
  );
}

export default function Hero() {
  const { theme } = useTheme();
  const root = useRef(null);

  const onMove = (e) => {
    const el = root.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--px", String((e.clientX - r.left) / r.width - 0.5));
    el.style.setProperty("--py", String((e.clientY - r.top) / r.height - 0.5));
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <section
      id="hero"
      ref={root}
      onPointerMove={onMove}
      className="relative isolate overflow-hidden border-b border-line"
      style={{ "--px": 0, "--py": 0 }}
      aria-label="Introduction"
    >
      <Rings />
      {/* cursor spotlight */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-70 max-md:hidden"
        style={{ background: "radial-gradient(420px circle at var(--mx, 50%) var(--my, 40%), color-mix(in srgb, var(--blue) 12%, transparent), transparent 70%)" }}
        aria-hidden="true"
      />

      {/* floating icons */}
      {TILES.map((t) => (
        <div
          key={t.icon}
          className={`absolute z-10 ${t.m ? "" : "max-md:hidden"}`}
          style={{
            left: `${t.x}%`, top: `${t.y}%`,
            transform: `translate(calc(var(--px) * ${t.depth}px), calc(var(--py) * ${t.depth}px))`,
            transition: "transform .5s cubic-bezier(.2,.7,.2,1)",
          }}
          aria-hidden="true"
        >
          <div
            className="float-tile fade-up"
            style={{
              width: t.s, height: t.s, "--c": t.c, "--r": `${t.r}deg`, "--t": `${t.t}s`, "--dl": `${t.d}s`,
              position: "relative", animationName: "fade-up, float", animationDuration: `0.9s, ${t.t}s`, animationDelay: `${600 + t.d * 300}ms, ${t.d}s`,
              animationIterationCount: "1, infinite", animationFillMode: "both, none",
            }}
          >
            <img src={img(`/icons/skill/${t.icon}.png`)} alt="" className="h-[58%] w-[58%] object-contain" loading="eager" />
          </div>
        </div>
      ))}

      <div className="relative z-20 mx-auto flex min-h-[calc(100svh-48px)] max-w-[1100px] flex-col items-center justify-center px-5 py-20 text-center">
        <p className="mono fade-up mb-8 inline-flex items-center gap-3 border border-line bg-paper/70 px-4 py-2 text-ink2 backdrop-blur" style={{ "--d": "100ms" }}>
          <span className="pulse-dot" aria-hidden="true" /> Available for opportunities
        </p>

        <h1 className="display" style={{ fontSize: "clamp(2.5rem, 8.2vw, 7.4rem)" }}>
          <span className="mask"><span style={{ "--d": "150ms" }}>THISAL</span></span>{" "}
          <span className="mask"><span style={{ "--d": "280ms" }}>DILMITH</span></span>
        </h1>

        <p className="display-md fade-up mt-7 text-[clamp(1.3rem,3vw,2.4rem)]" style={{ "--d": "560ms" }}>
          I build end-to-end <span className="relative whitespace-nowrap">engineering solutions.
            <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 10" preserveAspectRatio="none" aria-hidden="true">
              <path d="M2 6 C 60 1, 120 9, 180 4 S 270 3, 298 6" fill="none" stroke="var(--blue)" strokeWidth="3" strokeLinecap="round" pathLength="1" strokeDasharray="1" strokeDashoffset="1" style={{ animation: "dash 1.2s .95s ease forwards" }} />
            </svg>
          </span>
        </p>
        <style>{`@keyframes dash { to { stroke-dashoffset: 0; } }`}</style>

        <p className="lede fade-up mt-6 max-w-[640px]" style={{ "--d": "700ms" }}>
          Python developer &amp; open source contributor based in Sri Lanka. I ship libraries to PyPI,
          build full-stack web platforms, and take ideas from hardware prototype to production — because
          real problems rarely live on just one layer of the stack.
        </p>

        <div className="fade-up mt-9 flex flex-wrap items-center justify-center gap-3" style={{ "--d": "820ms" }}>
          <Link to="/projects" className="btn btn-solid">View Projects <IconArrowRight className="arr" /></Link>
          <Link to="/contact" className="btn btn-ghost">Get in Touch</Link>
          <a href={resumeUrl()} download="Thisal_Dilmith_Resume.pdf" className="btn btn-ghost" aria-label="Download Thisal Dilmith's resume as a PDF">
            <IconDownload /> Resume
          </a>
        </div>

        <p className="mono fade-up mt-8 flex flex-wrap justify-center gap-x-3 gap-y-1 text-ink3" style={{ "--d": "920ms" }}>
          {["Python", "Open Source", "Full Stack", "IoT", "PyPI Author"].map((t, i) => (
            <span key={t}>{i > 0 && <span className="mr-3">·</span>}{t}</span>
          ))}
        </p>

        <div className="fade-up mt-10 flex flex-wrap items-center justify-center gap-x-7 gap-y-3" style={{ "--d": "1000ms" }}>
          {[
            { n: "GitHub", u: "https://github.com/thisal-d", i: "/icons/social/github.png", inv: true },
            { n: "LinkedIn", u: "https://www.linkedin.com/in/thisal-dilmith", i: "/icons/social/linkedin.png" },
            { n: "PyPI", u: "https://pypi.org/user/Thisal_D/", i: "/icons/social/pypi.svg" },
          ].map((s) => (
            <a key={s.n} href={s.u} target="_blank" rel="noopener noreferrer" className="mono flex items-center gap-2 text-ink2 transition-colors hover:text-ink" aria-label={`${s.n} profile`}>
              <img src={img(s.i)} alt="" className={`h-4 w-4 object-contain ${s.inv ? "invert-dark" : ""}`} /> {s.n}
            </a>
          ))}
        </div>

        <div className="fade-up mt-8 flex flex-wrap items-center justify-center gap-4 border border-line bg-paper/70 px-5 py-3 backdrop-blur" style={{ "--d": "1100ms" }}>
          <span className="mono text-ink3">Recognised by</span>
          <div className="flex items-center gap-3">
            {badges.map((b) => (
              <img
                key={b.id}
                src={badgeImage(b.id, theme)}
                alt={b.name}
                title={`${b.platform} — ${b.name}${b.tierLabel ? ` (${b.tierLabel})` : ""}`}
                className="h-7 w-auto max-w-[56px] object-contain transition-transform duration-300 hover:-translate-y-1 hover:scale-110"
              />
            ))}
          </div>
        </div>
      </div>

      {/* stat strip */}
      <div className="relative z-20 border-t border-line bg-paper/80 backdrop-blur-sm">
        <div className="frame grid grid-cols-2 md:grid-cols-4" aria-label="Highlights">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 90} className={`px-6 py-6 ${i % 2 === 0 ? "border-r border-line" : ""} ${i < 2 ? "border-b border-line md:border-b-0" : ""} ${i < 3 ? "md:border-r" : "md:border-r-0"}`}>
              <div className="display text-4xl md:text-5xl"><CountUp to={s.value} suffix={s.suffix} /></div>
              <div className="mono mt-2 text-ink3">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
