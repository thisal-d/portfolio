import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "@/context/theme";
import { accentOf, badges, fmtDate, fmtNum, projectDetails, projects } from "@/lib/data";
import { badgeImage, img, imgs, pcforgeLogo } from "@/lib/assets";
import { useRepo } from "@/lib/github";
import { Gallery, Lightbox } from "./Gallery";
import { IconArrow, IconArrowRight, IconFork, IconStar, Reveal, SectionBar, SplitTitle } from "./ui";

/* ═════════════ Architecture + agents (shared with the project page) ═════════════ */
export function ArchitectureGrid({ tiers }) {
  return (
    <div className="grid border-y border-line sm:grid-cols-2 lg:grid-cols-5">
      {tiers.map((t, i) => (
        <Reveal key={t.tier} delay={i * 80} className="group relative border-b border-line p-5 transition-colors hover:bg-card sm:border-r lg:border-b-0 lg:last:border-r-0">
          <span className="mono-sm text-ink3">Tier {String(i + 1).padStart(2, "0")}</span>
          <h4 className="display-md mt-3 text-[1.05rem] leading-tight">{t.tier}</h4>
          <p className="mono-sm mt-3 text-blue">{t.tech}</p>
          <p className="mt-3 text-sm leading-relaxed text-ink2">{t.role}</p>
          <span className="chip mt-4">{t.where}</span>
          {i < tiers.length - 1 && <span className="absolute -right-2 top-1/2 z-10 hidden h-4 w-4 -translate-y-1/2 place-items-center bg-paper font-mono text-xs text-ink3 lg:grid">›</span>}
        </Reveal>
      ))}
    </div>
  );
}

export function AgentsList({ agents }) {
  return (
    <ol className="divide-y divide-line border-y border-line">
      {agents.map((a, i) => (
        <Reveal key={a.name} delay={i * 70}>
          <li className="group grid items-start gap-2 px-1 py-4 transition-colors hover:bg-card sm:grid-cols-[56px_minmax(0,260px)_1fr] sm:gap-4 sm:px-3">
            <span className="mono text-ink3 transition-colors group-hover:text-blue">{String(i + 1).padStart(2, "0")}</span>
            <span className="font-display text-base font-bold" style={{ fontStretch: "110%" }}>{a.name} Agent</span>
            <span className="text-sm leading-relaxed text-ink2">{a.does}</span>
          </li>
        </Reveal>
      ))}
    </ol>
  );
}

/* ═════════════ Flagship: PCForge ═════════════ */
const TAB_LABELS = ["Dashboard", "Build Reviews", "Orders", "Inventory", "Service Requests", "Products"];
const TAB_PATHS = ["dashboard", "build-reviews", "orders", "inventory", "service-requests", "products"];
const ROTATE_MS = 5200;

export function PcForgeShowcase({ n = "02" }) {
  const data = projectDetails.pcforge;
  const images = useMemo(() => imgs(data.images), [data.images]);
  const { repo } = useRepo(data.api_url, false);
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [open, setOpen] = useState(false);
  const accent = accentOf("pcforge");

  useEffect(() => {
    if (paused || open || images.length < 2) return;
    const t = setTimeout(() => setI((x) => (x + 1) % images.length), ROTATE_MS);
    return () => clearTimeout(t);
  }, [i, paused, open, images.length]);

  return (
    <section id="flagship" className="border-b border-line">
      <div className="frame">
        <SectionBar n={n} label="Flagship project" right="New · Full-stack ecosystem" />

        <div className="grid xl:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          {/* ── copy ── */}
          <div className="sec-pad border-b border-line xl:border-b-0 xl:border-r">
            <Reveal>
              <div className="flex items-center gap-3">
                <span className="num-chip" style={{ background: accent }}>NEW</span>
                <span className="mono text-ink3">{data.version} · ASP.NET Core · React · Flutter · AI agents</span>
              </div>
              <div className="mt-7 flex items-center gap-4">
                <img src={pcforgeLogo()} alt="PCForge logo" className="h-12 w-12 shrink-0 object-contain sm:h-14 sm:w-14" />
                <h2 className="display text-[clamp(2.4rem,4vw,3.8rem)]"><SplitTitle title="PCForge" accent={accent} /></h2>
              </div>
              <p className="display-md mt-5 text-[clamp(1.1rem,2vw,1.5rem)]">Custom PC building, powered by agentic AI.</p>
              <p className="lede mt-4">{data.description}</p>
            </Reveal>

            <Reveal delay={120} className="mt-6 flex flex-wrap gap-1.5">
              {projects[0].stack.map((t) => <span key={t} className="chip">{t}</span>)}
            </Reveal>

            <Reveal delay={180}>
              <ul className="mt-8 divide-y divide-line border-y border-line">
                {data.links.map((l) => (
                  <li key={l.url}>
                    <a href={l.url} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between gap-4 px-1 py-3.5 transition-all hover:bg-card hover:px-3">
                      <span>
                        <span className="mono block">{l.label}</span>
                        <span className="text-xs text-ink3">{l.note}</span>
                      </span>
                      <IconArrow className="shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={240} className="mt-8 flex flex-wrap items-center gap-3">
              <Link to="/projects/pcforge" className="btn btn-solid">Full case study <IconArrowRight className="arr" /></Link>
              <a href={data.repo_url} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                <img src={img("/icons/social/github.png")} alt="" className="invert-dark h-4 w-4" /> Source
              </a>
              {repo && (repo.stargazers_count > 0 || repo.forks_count > 0) && (
                <span className="mono flex items-center gap-4 text-ink2">
                  <span className="flex items-center gap-1.5 text-amber"><IconStar /><b className="text-ink">{fmtNum(repo.stargazers_count)}</b></span>
                  <span className="flex items-center gap-1.5"><IconFork /><b className="text-ink">{fmtNum(repo.forks_count)}</b></span>
                </span>
              )}
            </Reveal>
          </div>

          {/* ── screenshots in a browser frame ── */}
          <div className="sec-pad bg-card/60" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
            <Reveal dir="right" className="xl:sticky xl:top-20">
              <div className="overflow-hidden border border-line-strong bg-paper shadow-[0_40px_80px_-40px_rgba(0,0,0,.45)]" style={{ borderColor: "var(--line-strong)" }}>
                <div className="flex items-center gap-3 border-b border-line bg-card px-4 py-2.5">
                  <span className="flex gap-1.5"><i className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" /><i className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" /><i className="h-2.5 w-2.5 rounded-full bg-[#28c840]" /></span>
                  <span className="mono-sm flex-1 truncate border border-line bg-paper px-3 py-1 text-ink2" style={{ textTransform: "none", letterSpacing: ".02em" }}>
                    pc-forge-admin.pages.dev/{TAB_PATHS[i]}
                  </span>
                </div>
                <button onClick={() => setOpen(true)} className="relative block aspect-[1440/900] w-full overflow-hidden bg-card" aria-label="Open screenshot full size">
                  {images.map((src, k) => (
                    <img
                      key={src}
                      src={src}
                      alt={k === i ? `PCForge — ${data["image-captions"][k]}` : ""}
                      className="absolute inset-0 h-full w-full object-cover object-top transition-all duration-700"
                      style={{ opacity: k === i ? 1 : 0, transform: k === i ? "none" : "scale(1.03)" }}
                      loading={k === 0 ? "eager" : "lazy"}
                    />
                  ))}
                </button>
                <div className="h-[3px] bg-line">
                  <div key={`${i}-${paused}`} className="h-full origin-left" style={{ background: accent, animation: paused ? "none" : `progress ${ROTATE_MS}ms linear forwards`, transform: paused ? "scaleX(1)" : undefined }} />
                </div>
              </div>
              <p className="mono mt-4 flex flex-wrap items-center justify-between gap-2 text-ink3">
                <span>{data["image-captions"][i]}</span>
                <span>Live staff portal · customer details masked</span>
              </p>
              <div className="mt-4 grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-3">
                {TAB_LABELS.map((l, k) => (
                  <button key={l} onClick={() => setI(k)} aria-pressed={k === i} className={`mono px-3 py-3 text-left transition-colors ${k === i ? "bg-ink text-paper" : "bg-paper text-ink2 hover:bg-card hover:text-ink"}`}>
                    <span className={k === i ? "opacity-60" : "text-ink3"}>{String(k + 1).padStart(2, "0")}</span> {l}
                  </button>
                ))}
              </div>
            </Reveal>
          </div>
        </div>

        {/* architecture */}
        <div className="sec-bar mono mt-0 border-t border-line"><span>Architecture <span className="mx-1 text-ink3">/</span> Five tiers, one gateway</span></div>
        <ArchitectureGrid tiers={data.architecture} />

        {/* agents */}
        <div className="grid border-b border-line lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
          <div className="sec-pad lg:border-r lg:border-line">
            <Reveal>
              <p className="mono text-ink3">LangGraph</p>
              <h3 className="display mt-3 text-[clamp(1.7rem,3vw,2.6rem)]">Five specialised AI agents.</h3>
              <p className="mt-4 text-sm leading-relaxed text-ink2">
                Each agent owns one stage of the purchasing and support journey. The AI service is stateless — all database writes are validated and committed only through the ASP.NET Core backend.
              </p>
            </Reveal>
          </div>
          <div className="sec-pad"><AgentsList agents={data.agents} /></div>
        </div>
      </div>
      {open && <Lightbox images={images} index={i} onClose={() => setOpen(false)} onIndex={setI} alt="PCForge" />}
    </section>
  );
}

/* ═════════════ Featured case study (PyTube Downloader) ═════════════ */
export function CaseStudy({ n = "04" }) {
  const { theme } = useTheme();
  const p = projects.find((x) => x.featured);
  const images = useMemo(() => imgs(p.images), [p.images]);
  const { repo, latest } = useRepo(p.api_url);
  const accent = accentOf(p.slug);
  const awards = p.achievements.map((id) => badges.find((b) => b.id === id)).filter(Boolean);

  return (
    <section id="case-study" className="border-b border-line">
      <div className="frame">
        <SectionBar n={n} label="Featured case study" right="From weekend project to community favourite" />
        <div className="grid lg:grid-cols-2">
          <div className="sec-pad border-b border-line lg:border-b-0 lg:border-r">
            <Reveal>
              <p className="mono text-ink3">Featured Project</p>
              <h2 className="display mt-3 text-[clamp(2.2rem,5vw,4.2rem)]"><SplitTitle title={p.title} accent={accent} /></h2>
              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
                {repo && (
                  <>
                    <span className="mono flex items-center gap-1.5 text-amber"><IconStar /><b className="text-ink">{fmtNum(repo.stargazers_count)}</b> <span className="text-ink3">Stars</span></span>
                    <span className="mono flex items-center gap-1.5"><IconFork /><b>{fmtNum(repo.forks_count)}</b> <span className="text-ink3">Forks</span></span>
                  </>
                )}
                {latest?.tag_name && <span className="chip">{latest.tag_name} · {fmtDate(latest.published_at)}</span>}
              </div>
            </Reveal>

            <div className="mt-8 space-y-0 divide-y divide-line border-y border-line">
              {p["case-study"].paragraphs.map((t, i) => (
                <Reveal key={i} delay={i * 60}>
                  <div className="grid grid-cols-[44px_1fr] gap-3 py-5">
                    <span className="mono text-ink3">{String(i + 1).padStart(2, "0")}</span>
                    <p className="text-[.95rem] leading-[1.75] text-ink2">{t}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="sec-pad">
            <Reveal dir="right">
              <Gallery images={images} alt={p.title} />
            </Reveal>
            <Reveal delay={100} className="mt-8 flex flex-wrap gap-2">
              {awards.map((a) => (
                <span key={a.id} title={`${a.platform} — ${a.name}${a.tierLabel ? ` (${a.tierLabel})` : ""}`} className="flex items-center gap-2 border border-line bg-card py-1.5 pl-2 pr-3 transition-transform hover:-translate-y-0.5">
                  <img src={badgeImage(a.id, theme)} alt={a.name} className="h-7 w-7 object-contain" />
                  <span className="mono-sm">{a.platform === "GitHub" ? `Starstruck · ${a.tierLabel}` : `SF ${a.name}`}</span>
                </span>
              ))}
            </Reveal>
            <Reveal delay={160} className="mt-6 flex flex-wrap items-center gap-2">
              <span className="mono mr-2 text-ink3">Built with</span>
              {p.stack.map((t) => <span key={t} className="chip">{t}</span>)}
            </Reveal>
            <Reveal delay={220} className="mt-8 flex flex-wrap gap-3">
              <a href={p.repo_url} target="_blank" rel="noopener noreferrer" className="btn btn-solid">
                <img src={img("/icons/social/github.png")} alt="" className="h-4 w-4 invert" style={{ filter: theme === "dark" ? "none" : undefined }} /> View on GitHub
              </a>
              <a href={p["publish-url"]} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">Download <IconArrow className="arr" /></a>
              <Link to={`/projects/${p.slug}`} className="btn btn-ghost">Full case study <IconArrowRight className="arr" /></Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
