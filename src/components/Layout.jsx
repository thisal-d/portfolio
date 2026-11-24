import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useTheme } from "@/context/theme";
import { contact } from "@/lib/data";
import { img, logoFor, resumeUrl } from "@/lib/assets";
import { IconClose, IconDownload, IconMenu, IconMoon, IconSun, IconArrow } from "./ui";

const NAV = [
  { to: "/", label: "Home", end: true },
  { to: "/about", label: "About" },
  { to: "/projects", label: "Projects" },
  { to: "/contact", label: "Contact" },
];

/* ───────────────────────── Header ───────────────────────── */
export function Header() {
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const loc = useLocation();
  useEffect(() => setOpen(false), [loc.pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const cell = "grid h-full place-items-center border-l border-line px-4 text-ink2 transition-colors hover:bg-ink hover:text-paper";

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 h-12 border-b border-line bg-paper/85 backdrop-blur-md">
        <div className="flex h-full items-stretch">
          <Link to="/" aria-label="Thisal Dilmith — home" className="grid w-[64px] shrink-0 place-items-center border-r border-line transition-colors hover:bg-card sm:w-[70px]">
            <img src={logoFor(theme)} alt="" className="h-7 w-7 object-contain transition-transform duration-500 hover:rotate-[360deg]" />
          </Link>

          <nav className="hidden items-center gap-1 px-4 md:flex" aria-label="Primary">
            {NAV.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.end}
                className={({ isActive }) =>
                  `mono px-3 py-1.5 transition-colors ${isActive ? "bg-ink text-paper" : "text-ink2 hover:text-ink"}`
                }
              >
                {n.label}
              </NavLink>
            ))}
          </nav>

          <div className="ml-auto flex items-stretch">
            <a href={resumeUrl()} download="Thisal_Dilmith_Resume.pdf" className={`${cell} mono hidden gap-2 sm:flex`} aria-label="Download resume as PDF">
              <span className="flex items-center gap-2"><IconDownload /> Resume</span>
            </a>
            <a href="https://github.com/thisal-d" target="_blank" rel="noopener noreferrer" className={`${cell} hidden sm:grid`} aria-label="GitHub profile">
              <img src={img("/icons/social/github.png")} alt="" className="invert-dark h-[18px] w-[18px]" />
            </a>
            <button onClick={toggle} className={cell} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}>
              {theme === "dark" ? <IconSun /> : <IconMoon />}
            </button>
            <Link to="/contact" className="mono hidden items-center bg-ink px-5 font-bold text-paper transition-opacity hover:opacity-80 sm:flex">
              Let's talk
            </Link>
            <button onClick={() => setOpen(true)} className={`${cell} md:hidden`} aria-label="Open menu"><IconMenu /></button>
          </div>
        </div>
      </header>

      {/* mobile menu */}
      <div
        className={`fixed inset-0 z-[60] bg-paper transition-all duration-500 md:hidden ${open ? "visible opacity-100" : "invisible opacity-0"}`}
        aria-hidden={!open}
      >
        <div className="flex h-12 items-center justify-between border-b border-line pl-4">
          <span className="mono text-ink2">Menu</span>
          <button onClick={() => setOpen(false)} className="grid h-12 w-12 place-items-center border-l border-line" aria-label="Close menu"><IconClose /></button>
        </div>
        <nav className="flex flex-col p-6">
          {NAV.map((n, i) => (
            <Link
              key={n.to}
              to={n.to}
              className="display border-b border-line py-5 text-4xl transition-all"
              style={{ transform: open ? "none" : "translateY(20px)", opacity: open ? 1 : 0, transitionDelay: `${120 + i * 70}ms`, transitionDuration: "600ms" }}
            >
              <span className="mono mr-4 align-middle text-ink3">0{i + 1}</span>{n.label}
            </Link>
          ))}
          <a href={resumeUrl()} download="Thisal_Dilmith_Resume.pdf" className="btn btn-solid mt-8">
            <IconDownload /> Resume
          </a>
        </nav>
      </div>
    </>
  );
}

/* ───────────────────────── Right-edge ruler + scroll % ───────────────────────── */
export function ScrollRuler() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setPct(max > 0 ? Math.min(100, Math.max(0, (window.scrollY / max) * 100)) : 0);
      });
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => { window.removeEventListener("scroll", on); window.removeEventListener("resize", on); cancelAnimationFrame(raf); };
  }, []);
  return (
    <div className="ruler pointer-events-none fixed bottom-0 right-0 top-12 z-40 hidden w-[44px] xl:block" aria-hidden="true">
      <div className="absolute inset-x-0 flex items-center transition-transform duration-150 ease-out" style={{ top: `calc(${pct}% * 1)`, transform: `translateY(-${pct}%)` }}>
        <span className="h-px flex-1 bg-blue" />
        <span className="mono-sm absolute right-0 top-1 pr-1 text-blue">{String(Math.round(pct)).padStart(3, "0")}%</span>
      </div>
    </div>
  );
}

/* ───────────────────────── Route scroll handling ───────────────────────── */
export function ScrollManager() {
  const loc = useLocation();
  useEffect(() => {
    const target = loc.state?.scroll;
    if (target) {
      const t = setTimeout(() => document.getElementById(target)?.scrollIntoView({ behavior: "smooth", block: "start" }), 120);
      return () => clearTimeout(t);
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [loc.pathname, loc.state]);
  return null;
}

/* ───────────────────────── Footer ───────────────────────── */
export function Footer() {
  return (
    <footer className="relative mt-0 overflow-hidden border-t border-line">
      <div className="frame">
        <div className="grid gap-10 px-[clamp(1rem,3vw,2.5rem)] py-14 md:grid-cols-[1.3fr_1fr]">
          <div>
            <p className="display-md text-3xl">Thisal Dilmith</p>
            <p className="mt-4 max-w-md text-[.95rem] leading-relaxed text-ink2">
              Python developer &amp; open source enthusiast. Building libraries, apps, and platforms
              that actually solve problems. Curious about everything tech.
            </p>
            <a href={`mailto:${contact.email}`} className="mono mt-6 inline-flex items-center gap-2 border-b border-ink pb-1 hover:text-blue">
              {contact.email} <IconArrow />
            </a>
          </div>
          <div>
            <p className="mono mb-4 text-ink3">Find me online</p>
            <div className="grid grid-cols-2 gap-px border border-line bg-line">
              {contact.socials.map((s) => {
                const ext = s.url.startsWith("http");
                const cls = "group flex items-center gap-3 bg-paper px-4 py-3.5 text-sm transition-colors hover:bg-card";
                const inner = (
                  <>
                    <img src={img(s.icon)} alt="" className={`h-5 w-5 object-contain ${s.name === "GitHub" ? "invert-dark" : ""}`} />
                    <span className="flex-1">{s.name}</span>
                    <IconArrow className="opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
                  </>
                );
                return ext ? (
                  <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>
                ) : (
                  <Link key={s.name} to={s.url} className={cls}>{inner}</Link>
                );
              })}
            </div>
          </div>
        </div>
        <div className="border-t border-line px-[clamp(1rem,3vw,2.5rem)] py-5">
          <p className="mono text-ink3">© {new Date().getFullYear()} Thisal Dilmith · Built with React</p>
        </div>
      </div>
      <div
        className="display pointer-events-none select-none whitespace-nowrap text-center leading-[.8]"
        style={{ fontSize: "clamp(3rem, 15.5vw, 15rem)", color: "transparent", WebkitTextStroke: "1px var(--line-strong)", opacity: 0.55, marginBottom: "-0.12em", paddingTop: "1.5rem" }}
        aria-hidden="true"
      >
        THISAL DILMITH
      </div>
    </footer>
  );
}

/* ───────────────────────── Page wrapper ───────────────────────── */
export function Page({ children }) {
  return <main className="page-in pt-12">{children}</main>;
}
