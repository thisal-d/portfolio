import { Link } from "react-router-dom";
import { useTheme } from "@/context/theme";
import { badges, skills } from "@/lib/data";
import { badgeImage, img } from "@/lib/assets";
import { IconArrow, IconArrowRight, Reveal, SectionBar } from "./ui";

/* ═════════════ Marquee of real skill icons ═════════════ */
export function Marquee() {
  const all = skills.flatMap((g) => g.skills);
  const uniq = all.filter((s, i) => all.findIndex((x) => x.name === s.name) === i);
  const row = [...uniq, ...uniq];
  return (
    <div className="overflow-hidden border-b border-line py-5" aria-hidden="true">
      <div className="flex w-max gap-12" style={{ animation: "marquee 48s linear infinite" }}>
        {row.map((s, i) => (
          <span key={i} className="mono flex items-center gap-3 text-ink2">
            <img src={img(s.icon)} alt="" className="h-6 w-6 object-contain" />
            {s.name}
            <span className="ml-9 text-ink3">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ═════════════ Introduction: portrait + live code ═════════════ */
const CODE_LINES = [
  { indent: 0, token: "keyword", text: "@staticmethod", suffix: "" },
  { indent: 0, token: "fn", text: "def", suffix: " theme_tracker() -> None:" },
  { indent: 1, token: "comment", text: "# auto-sync theme across all chart widgets", suffix: "" },
  { indent: 1, token: "keyword", text: "while", suffix: " ThemeManager.child_objects:" },
  { indent: 2, token: "var", text: "current_theme", suffix: " = ctk.get_appearance_mode()" },
  { indent: 2, token: "keyword", text: "if", suffix: " current_theme != ThemeManager.theme:" },
  { indent: 3, token: "var", text: "ThemeManager.theme", suffix: " = current_theme" },
  { indent: 3, token: "keyword", text: "for", suffix: " widget in ThemeManager.child_objects:" },
  { indent: 4, token: "keyword", text: "try:", suffix: "" },
  { indent: 5, token: "var", text: "widget", suffix: ".__configure_theme_mode()" },
  { indent: 4, token: "keyword", text: "except", suffix: " Exception as e:" },
  { indent: 5, token: "fn", text: "print", suffix: '(f"[ThemeManager] {e}")' },
  { indent: 2, token: "fn", text: "time", suffix: ".sleep(1)" },
  { indent: 0, token: "comment", text: "", suffix: "" },
  { indent: 0, token: "var", text: "ThemeManager.running_state", suffix: " = False" },
];
const TOKEN_COLOR = {
  keyword: "#ff7b9c", fn: "#7fb4ff", comment: "#7d8590", var: "#7ee0b4",
};

export function Intro() {
  return (
    <section id="intro" className="overflow-x-clip border-b border-line">
      <div className="frame">
        <SectionBar n="01" label="Introduction" right="Python · Open source · Full stack" />
        <div className="grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <div className="sec-pad border-b border-line lg:border-b-0 lg:border-r">
            <Reveal>
              <div className="relative mx-auto w-full max-w-[380px]">
                <div className="absolute -inset-3 border border-line" aria-hidden="true" />
                <span className="absolute -left-[18px] -top-[19px] font-mono text-sm text-ink3" aria-hidden="true">+</span>
                <span className="absolute -bottom-[19px] -right-[18px] font-mono text-sm text-ink3" aria-hidden="true">+</span>
                <div className="relative aspect-square overflow-hidden bg-card">
                  <img src={img("/images/profile.jpg")} alt="Thisal Dilmith" className="h-full w-full object-cover transition-transform duration-[1500ms] hover:scale-105" loading="lazy" />
                  <span className="mono absolute bottom-3 left-3 bg-ink px-2 py-1 text-paper">Sri Lanka</span>
                </div>
              </div>
            </Reveal>
          </div>
          <div className="sec-pad flex flex-col justify-center">
            <Reveal>
              <h2 className="display text-[clamp(1.8rem,4vw,3.2rem)]">A programmer who treats code like a workout.</h2>
              <p className="lede mt-5 max-w-xl">
                A programmer who rides trails on weekends, listens to rap on loop, and treats code like a
                workout — push hard, break things, rebuild stronger.
              </p>
              <Link to="/about" className="btn btn-ghost mt-6">More about me <IconArrowRight className="arr" /></Link>
            </Reveal>

            <Reveal delay={150} className="mt-10">
              <div className="overflow-hidden border border-line bg-[#0d1117] shadow-[0_30px_60px_-30px_rgba(0,0,0,.6)]" aria-label="Code excerpt from ctkchart ThemeManager.py">
                <div className="flex items-center gap-2 border-b border-white/10 bg-[#161b22] px-4 py-3">
                  <i className="h-3 w-3 rounded-full bg-[#ff5f57]" /><i className="h-3 w-3 rounded-full bg-[#febc2e]" /><i className="h-3 w-3 rounded-full bg-[#28c840]" />
                  <a href="https://github.com/thisal-d/ctkchart/blob/main/src/ctkchart/ThemeManager.py" target="_blank" rel="noopener noreferrer" className="mono ml-3 truncate text-[#8b949e] transition-colors hover:text-white">
                    ctkchart / ThemeManager.py ↗
                  </a>
                </div>
                <pre className="overflow-x-auto p-5 font-mono text-[12.5px] leading-[1.75] text-[#c9d1d9]">
                  {CODE_LINES.map((l, i) => (
                    <div key={i} className="whitespace-pre">
                      <span className="mr-4 inline-block w-4 select-none text-right text-[#484f58]">{i + 1}</span>
                      {"  ".repeat(l.indent)}
                      <span style={{ color: TOKEN_COLOR[l.token], fontStyle: l.token === "comment" ? "italic" : "normal" }}>{l.text}</span>
                      <span>{l.suffix}</span>
                    </div>
                  ))}
                  <span className="ml-8 inline-block h-4 w-2 translate-y-1 bg-[#7ee0b4]" style={{ animation: "pulse-dot 1s steps(1) infinite", boxShadow: "none" }} />
                </pre>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═════════════ Toolkit (skills) ═════════════ */
export function Toolkit() {
  return (
    <section id="toolkit" className="border-b border-line">
      <div className="frame">
        <SectionBar n="05" label="Toolkit" right="Skills & tools" />
        <div className="sec-pad border-b border-line">
          <Reveal>
            <h2 className="display text-[clamp(2rem,5vw,4rem)]">Skills &amp; Tools</h2>
            <p className="lede mt-4 max-w-2xl">
              Technologies I've used across real shipped projects — from published PyPI libraries to
              full-stack web apps and hardware systems.
            </p>
          </Reveal>
        </div>
        <div className="grid md:grid-cols-2 xl:grid-cols-3">
          {skills.map((g, gi) => (
            <Reveal
              key={g.category}
              delay={(gi % 3) * 80}
              className={`border-b border-line p-6 sm:p-8 ${gi % 2 === 0 ? "md:border-r" : ""} ${gi % 3 !== 2 ? "xl:border-r" : "xl:border-r-0"} ${gi % 2 === 1 ? "md:border-r-0 xl:border-r" : ""}`}
            >
              <div className="mb-5 flex items-center justify-between">
                <h3 className="flex items-center gap-3 font-display text-lg font-bold">
                  <span aria-hidden="true" className="grid h-9 w-9 place-items-center border border-line bg-card text-lg">{g.emoji}</span>
                  {g.category}
                </h3>
                <span className="mono text-ink3">{String(g.skills.length).padStart(2, "0")}</span>
              </div>
              <ul className="divide-y divide-line border-y border-line">
                {g.skills.map((s) => (
                  <li key={s.name} className="group flex items-center gap-3 py-3 transition-colors hover:bg-card" title={s.primary ? `${s.name} — primary skill` : s.name}>
                    <img src={img(s.icon)} alt="" className="h-7 w-7 shrink-0 object-contain transition-transform duration-300 group-hover:scale-110" />
                    <span className="flex-1 text-[.95rem] font-medium">{s.name}</span>
                    {s.evidence && <span className="mono-sm hidden text-ink3 sm:inline">{s.evidence}</span>}
                    {s.primary && <span className="mono-sm bg-ink px-1.5 py-0.5 text-paper">Primary</span>}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═════════════ Recognition (achievement badges) ═════════════ */
const TIER_COLOR = { normal: "var(--blue)", bronze: "#c48040", silver: "#9a9aa6", neutral: "var(--green)" };

export function Recognition({ n = "06", compact = false }) {
  const { theme } = useTheme();
  return (
    <section id="achievements" className="border-b border-line">
      <div className="frame">
        <SectionBar n={n} label="Recognition" right="GitHub · SourceForge" />
        {!compact && (
          <div className="sec-pad border-b border-line">
            <Reveal>
              <h2 className="display text-[clamp(2rem,5vw,4rem)]">Awards &amp; achievements</h2>
              <p className="lede mt-4 max-w-2xl">Community recognition earned by the open-source projects I've shipped.</p>
            </Reveal>
          </div>
        )}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3">
          {badges.map((b, i) => (
            <Reveal key={b.id} delay={(i % 3) * 90} className="group border-b border-line sm:odd:border-r lg:border-r lg:[&:nth-child(3n)]:border-r-0">
              <article className="flex h-full flex-col p-6 sm:p-8">
                <div className="mb-6 flex items-center justify-between">
                  <span className="num-chip" style={{ background: TIER_COLOR[b.tier] }}>{b.platform}</span>
                  <span className="mono text-ink3">{b.tierLabel ?? b.name}</span>
                </div>
                <div className="relative mb-6 grid h-36 place-items-center overflow-hidden border border-line bg-card">
                  <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: `radial-gradient(circle at 50% 60%, color-mix(in srgb, ${TIER_COLOR[b.tier]} 22%, transparent), transparent 70%)` }} />
                  <img src={badgeImage(b.id, theme)} alt={`${b.platform} ${b.name}${b.tierLabel ? ` ${b.tierLabel}` : ""} badge`} className="relative h-24 w-auto max-w-[70%] object-contain transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3" />
                </div>
                <h3 className="display-md text-xl">{b.name}{b.tierLabel ? <span className="text-ink3"> · {b.tierLabel}</span> : null}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink2">{b.description}</p>
                <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
                  <span className="mono text-ink">{b.stat}</span>
                  <Link to={b.projectLink} className="mono flex items-center gap-1 text-ink2 transition-colors hover:text-blue">{b.project} <IconArrow /></Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═════════════ Closing CTA ═════════════ */
export function CTA({ n = "07" }) {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="frame">
        <SectionBar n={n} label="Get started" right="Open to collaborations" />
        <div className="sec-pad relative py-[clamp(3rem,9vw,7rem)] text-center">
          <Reveal>
            <h2 className="display mx-auto max-w-4xl text-[clamp(2.2rem,6.4vw,5.6rem)]">Want to work together?</h2>
            <p className="lede mx-auto mt-6 max-w-xl">
              I'm open to collaborations, interesting projects, and conversations about code, bikes, or anything in between.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Link to="/contact" className="btn btn-solid">Get in Touch <IconArrowRight className="arr" /></Link>
              <Link to="/projects" className="btn btn-ghost">See My Work</Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
