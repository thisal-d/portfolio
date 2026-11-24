import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CATEGORY_LABEL, accentOf, categoryOf, fmtDate, fmtNum, nextPrev, projectDetails, projects } from "@/lib/data";
import { img, imgs } from "@/lib/assets";
import { usePyPI, usePyPIDownloads, useReleases, useRepo } from "@/lib/github";
import { Gallery } from "@/components/Gallery";
import { AgentsList, ArchitectureGrid } from "@/components/Showcase";
import { IconArrow, IconArrowRight, IconCheck, IconCopy, IconFork, IconStar, Reveal, SectionBar, SplitTitle } from "@/components/ui";

/* tolerant date parsing ("2025-3-05" isn't strict ISO) */
function parseDate(s) {
  if (!s) return null;
  const m = s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
  return m ? new Date(+m[1], +m[2] - 1, +m[3]) : new Date(s);
}
function duration(start) {
  const now = new Date();
  const months = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
  if (months < 1) return "Less than a month";
  if (months < 12) return `${months} month${months > 1 ? "s" : ""}`;
  const y = Math.floor(months / 12), r = months % 12;
  return r ? `${y}y ${r}m` : `${y} year${y > 1 ? "s" : ""}`;
}

function Block({ title, children, n }) {
  return (
    <Reveal className="border-t border-line py-8">
      <h3 className="mb-5 flex items-baseline gap-3 font-display text-xl font-bold" style={{ fontStretch: "112%" }}>
        {n && <span className="mono text-ink3">{n}</span>}{title}
      </h3>
      {children}
    </Reveal>
  );
}

function SideCard({ title, children }) {
  return (
    <div className="border border-line bg-card/60 p-5">
      <p className="mono mb-4 text-ink3">{title}</p>
      {children}
    </div>
  );
}

function CopyField({ label, value }) {
  const [done, setDone] = useState(false);
  const copy = () => navigator.clipboard?.writeText(value).then(() => { setDone(true); setTimeout(() => setDone(false), 1800); });
  return (
    <div className="flex items-center justify-between gap-3 border border-line bg-paper px-3 py-2.5">
      <span className="min-w-0">
        <span className="mono-sm block text-ink3">{label}</span>
        <code className="block truncate font-mono text-[13px]">{value}</code>
      </span>
      <button onClick={copy} className="grid h-8 w-8 shrink-0 place-items-center border border-line hover:bg-ink hover:text-paper" aria-label={`Copy ${label}`}>
        {done ? <IconCheck /> : <IconCopy />}
      </button>
    </div>
  );
}

function Releases({ apiUrl, repoUrl }) {
  const { releases, loading, error } = useReleases(apiUrl);
  if (loading) return <div className="space-y-3"><div className="skeleton h-16" /><div className="skeleton h-16" /></div>;
  if (error) {
    return (
      <p className="border border-line bg-card p-4 text-sm text-ink2">
        Couldn't load releases right now (GitHub API rate limit?).{" "}
        <a className="border-b border-ink text-ink" href={`${repoUrl}releases`} target="_blank" rel="noopener noreferrer">View releases directly on GitHub ↗</a>
      </p>
    );
  }
  if (!releases.length) return <p className="border border-line bg-card p-4 text-sm text-ink2">No GitHub releases published yet.</p>;
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <span className="mono text-ink2">{releases.length} Release{releases.length !== 1 ? "s" : ""}</span>
        <a href={`${repoUrl}releases`} target="_blank" rel="noopener noreferrer" className="mono border-b border-ink pb-0.5 hover:text-blue">View all on GitHub ↗</a>
      </div>
      <ul className="max-h-[520px] divide-y divide-line overflow-y-auto border border-line">
        {releases.map((r, i) => (
          <li key={r.id ?? i} className="p-4 transition-colors hover:bg-card">
            <div className="flex flex-wrap items-center gap-2">
              <span className="chip">{r.tag_name}</span>
              {i === 0 && <span className="chip" style={{ color: "var(--green)", borderColor: "var(--green)" }}>Latest</span>}
              <span className="text-sm font-semibold">{r.name || r.tag_name}</span>
              <span className="mono-sm ml-auto text-ink3">{fmtDate(r.published_at)}</span>
            </div>
            {r.body && <p className="mt-2 line-clamp-3 whitespace-pre-line text-sm text-ink2">{String(r.body).replace(/#+\s/g, "").trim()}</p>}
            <a href={r.html_url} target="_blank" rel="noopener noreferrer" className="mono mt-3 inline-flex items-center gap-1 hover:text-blue">View release <IconArrow /></a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ProjectDetail() {
  const { slug = "" } = useParams();
  const data = projectDetails[slug];
  const summary = projects.find((p) => p.slug === slug);

  const { repo, latest, loading } = useRepo(data?.api_url);
  const pypi = usePyPI(data?.["pypi-api-url"]);
  const downloads = usePyPIDownloads(summary?.pypi_name);
  const images = useMemo(() => imgs(data?.images), [data]);
  const [copied, setCopied] = useState(false);

  if (!data || !summary) {
    return (
      <div className="frame sec-pad py-32 text-center">
        <p className="mono text-ink3">404</p>
        <h1 className="display mt-4 text-5xl">Project not found</h1>
        <p className="lede mt-4">No project with slug <code>{slug}</code> exists.</p>
        <Link to="/projects" className="btn btn-solid mt-8">← All projects</Link>
      </div>
    );
  }

  const cat = categoryOf(data);
  const accent = accentOf(slug);
  const { prev, next } = nextPrev(slug);
  const publish = data["publish-url"] && data["publish-url"] !== false ? data["publish-url"] : null;
  const primaryLabel =
    cat === "library" ? "View on PyPI"
      : data["download-label"] ?? (cat === "website" ? data["live-label"] ?? "Open Live Site" : "Download");
  const start = parseDate(data["start-date"]);
  const why = data["why-i-made-this"] ?? {};
  const isPortrait = data.platform === "Android";
  const typeLabel = data.type && CATEGORY_LABEL[cat].toLowerCase() !== String(data.type).toLowerCase() ? data.type : CATEGORY_LABEL[cat];

  const copyInstall = () =>
    navigator.clipboard?.writeText(data["install-command"]).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1800); });

  return (
    <>
      {/* ───── hero ───── */}
      <section className="relative overflow-hidden border-b border-line" style={{ "--c": accent }}>
        <div className="pointer-events-none absolute -right-32 -top-32 aspect-square w-[620px] rounded-full border border-line" aria-hidden="true" />
        <div className="pointer-events-none absolute -right-8 -top-8 aspect-square w-[360px] rounded-full border" style={{ borderColor: accent, opacity: 0.35 }} aria-hidden="true" />
        <div className="frame">
          <div className="sec-bar mono">
            <Link to="/projects" className="flex items-center gap-2 text-ink hover:text-blue"><span aria-hidden="true">←</span> All projects</Link>
            <span className="text-ink3">{String(projects.indexOf(summary) + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</span>
          </div>
          <div className="sec-pad py-[clamp(2.5rem,6vw,5rem)]">
            <div className="flex flex-wrap items-center gap-2">
              <span className="num-chip" style={{ background: accent }}>{typeLabel}</span>
              {data.platform && <span className="chip">{data.platform}</span>}
              {data.status && <span className="chip" style={{ color: data.status === "active" ? "var(--green)" : undefined, borderColor: data.status === "active" ? "var(--green)" : undefined }}>{data.status}</span>}
              {data.version && <span className="chip">{data.version}</span>}
            </div>
            <h1 className="display mt-6 text-[clamp(2.8rem,9vw,7.5rem)]">
              <span className="mask"><span><SplitTitle title={data.title} accent={accent} /></span></span>
            </h1>
            <p className="lede fade-up mt-6 max-w-3xl" style={{ "--d": "300ms" }}>{data.description}</p>

            <div className="fade-up mt-8 flex flex-wrap gap-3" style={{ "--d": "420ms" }}>
              {publish && <a href={publish} target="_blank" rel="noopener noreferrer" className="btn btn-solid">{primaryLabel} <IconArrow className="arr" /></a>}
              <a href={data.repo_url} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                <img src={img("/icons/social/github.png")} alt="" className="invert-dark h-4 w-4" /> Source Code
              </a>
            </div>

            {/* live stats */}
            <div className="mono mt-8 flex min-h-6 flex-wrap items-center gap-x-6 gap-y-2 text-ink2">
              {loading && <><span className="skeleton h-4 w-20" /><span className="skeleton h-4 w-20" /></>}
              {repo && (
                <>
                  {(repo.stargazers_count > 0 || repo.forks_count > 0) && (
                    <>
                      <span className="flex items-center gap-1.5 text-amber"><IconStar /><b className="text-ink">{fmtNum(repo.stargazers_count)}</b> <span className="text-ink3">Stars</span></span>
                      <span className="flex items-center gap-1.5"><IconFork /><b className="text-ink">{fmtNum(repo.forks_count)}</b> <span className="text-ink3">Forks</span></span>
                    </>
                  )}
                  {repo.language && <span><b className="text-ink">{repo.language}</b></span>}
                  {repo.open_issues_count != null && <span><b className="text-ink">{repo.open_issues_count}</b> <span className="text-ink3">Issues</span></span>}
                </>
              )}
              {latest?.tag_name && <span className="chip">{latest.tag_name}</span>}
              {pypi?.info?.version && <span className="chip">PyPI v{pypi.info.version}</span>}
              {downloads != null && <span><b className="text-ink">{fmtNum(downloads)}</b> <span className="text-ink3">downloads / mo</span></span>}
            </div>
          </div>
        </div>
      </section>

      {/* ───── body ───── */}
      <section className="border-b border-line">
        <div className="frame grid lg:grid-cols-[minmax(0,1fr)_340px]">
          <div className="sec-pad min-w-0 lg:border-r lg:border-line">
            <Reveal><Gallery images={images} alt={data.title} portrait={isPortrait} /></Reveal>
            {data["image-captions"] && <p className="mono mt-3 text-ink3">Screenshots captured from the live staff portal · customer details masked</p>}

            {data["install-command"] && (
              <div className="mt-8 flex items-center justify-between gap-3 border border-line bg-[#0d1117] px-4 py-3 text-[#c9d1d9]">
                <code className="truncate font-mono text-sm"><span className="text-[#7d8590]">$ </span>{data["install-command"]}</code>
                <button onClick={copyInstall} className="mono flex shrink-0 items-center gap-2 border border-white/20 px-3 py-1.5 text-white hover:bg-white hover:text-black">
                  {copied ? <><IconCheck /> Copied</> : <><IconCopy /> Copy</>}
                </button>
              </div>
            )}

            {data["long-description"] && (
              <Block title="About" n="01"><p className="text-[1.02rem] leading-[1.8] text-ink2">{data["long-description"]}</p></Block>
            )}

            {(why.extended || why.simple) && (
              <Block title={slug === "pcforge" ? "In a sentence" : "Why I built this"} n="02">
                <blockquote className="border-l-[3px] bg-card/60 py-4 pl-5 pr-4 text-[1.02rem] leading-[1.8] text-ink2" style={{ borderColor: accent }}>
                  {why.extended ?? why.simple}
                </blockquote>
              </Block>
            )}

            {data.features?.length > 0 && (
              <Block title="Features" n="03">
                <ul className="grid gap-px border border-line bg-line sm:grid-cols-2">
                  {data.features.map((f, i) => (
                    <li key={i} className="flex gap-3 bg-paper p-4 text-sm leading-relaxed transition-colors hover:bg-card">
                      <span className="mt-0.5 shrink-0" style={{ color: accent }}><IconCheck /></span>{f}
                    </li>
                  ))}
                </ul>
              </Block>
            )}

            {data.sections?.filter((s) => s.type === "text").map((s, i) => (
              <Block key={i} title="Project background" n="04"><p className="text-[1.02rem] leading-[1.8] text-ink2">{s.content}</p></Block>
            ))}

            {/* ── PCForge-specific deep dive ── */}
            {data.architecture && (
              <Block title="System architecture" n="04">
                <ArchitectureGrid tiers={data.architecture} />
                <div className="mt-6 grid gap-px border border-line bg-line md:grid-cols-3">
                  {data.principles.map((p) => (
                    <div key={p.t} className="bg-paper p-4">
                      <p className="mono-sm text-blue">Principle</p>
                      <p className="mt-2 font-display font-bold" style={{ fontStretch: "110%" }}>{p.t}</p>
                      <p className="mt-2 text-sm leading-relaxed text-ink2">{p.d}</p>
                    </div>
                  ))}
                </div>
              </Block>
            )}
            {data.agents && <Block title="The five LangGraph agents" n="05"><AgentsList agents={data.agents} /></Block>}
            {data.quality && (
              <Block title="Testing & delivery" n="06">
                <div className="flex flex-wrap gap-2">{data.quality.map((q) => <span key={q} className="chip">{q}</span>)}</div>
              </Block>
            )}
            {data.links && (
              <Block title="Live deployments" n="07">
                <div className="grid gap-px border border-line bg-line sm:grid-cols-2">
                  {data.links.map((l) => (
                    <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between gap-3 bg-paper p-4 transition-colors hover:bg-card">
                      <span><span className="mono block">{l.label}</span><span className="text-xs text-ink3">{l.note}</span></span>
                      <IconArrow className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                  ))}
                </div>
                {data["demo-note"] && <p className="mt-4 border-l-[3px] border-amber bg-card/60 p-3 text-sm text-ink2">⏳ {data["demo-note"]}</p>}
              </Block>
            )}

            {data.api_url && (
              <Block title="Release history" n={data.links ? "08" : data.sections ? "05" : "04"}>
                <Releases apiUrl={data.api_url} repoUrl={data.repo_url} />
              </Block>
            )}
          </div>

          {/* ── sidebar ── */}
          <aside className="sec-pad space-y-5 lg:sticky lg:top-12 lg:self-start">
            <SideCard title="Project info">
              <dl className="divide-y divide-line text-sm">
                {start && <div className="flex justify-between gap-4 py-2.5"><dt className="text-ink3">Started</dt><dd className="text-right font-medium">{start.toLocaleDateString("en-US", { month: "long", year: "numeric" })}</dd></div>}
                {start && <div className="flex justify-between gap-4 py-2.5"><dt className="text-ink3">Duration</dt><dd className="text-right font-medium">{duration(start)}{data.status === "active" ? " · ongoing" : ""}</dd></div>}
                {data.status && <div className="flex justify-between gap-4 py-2.5"><dt className="text-ink3">Status</dt><dd className="font-medium capitalize">{data.status}</dd></div>}
                {data.version && <div className="flex justify-between gap-4 py-2.5"><dt className="text-ink3">Version</dt><dd className="font-medium">{data.version}</dd></div>}
                {data.platform && <div className="flex justify-between gap-4 py-2.5"><dt className="text-ink3">Platform</dt><dd className="font-medium">{data.platform}</dd></div>}
                <div className="flex justify-between gap-4 py-2.5"><dt className="text-ink3">Type</dt><dd className="font-medium">{typeLabel}</dd></div>
              </dl>
            </SideCard>

            {data["demo-login"] && (
              <SideCard title="Try the live portal">
                <p className="mb-3 text-xs leading-relaxed text-ink2">{data["demo-login"].role} demo account — {data["demo-login"].note}</p>
                <div className="space-y-2">
                  <CopyField label="Email" value={data["demo-login"].email} />
                  <CopyField label="Password" value={data["demo-login"].password} />
                </div>
                <a href={data["publish-url"]} target="_blank" rel="noopener noreferrer" className="btn btn-solid btn-sm mt-4 w-full">Open web portal <IconArrow className="arr" /></a>
              </SideCard>
            )}

            {data.requirements?.length > 0 && (
              <SideCard title="Requirements">
                <ul className="space-y-2 text-sm">
                  {data.requirements.map((r) => <li key={r} className="flex gap-2"><span style={{ color: accent }}>▸</span>{r}</li>)}
                </ul>
              </SideCard>
            )}
            {data["tech-stack"]?.length > 0 && (
              <SideCard title="Tech stack">
                <div className="flex flex-wrap gap-1.5">{data["tech-stack"].map((t) => <span key={t} className="chip">{t}</span>)}</div>
              </SideCard>
            )}
            {repo && repo.topics?.length > 0 && (
              <SideCard title="Topics">
                <div className="flex flex-wrap gap-1.5">{repo.topics.map((t) => <span key={t} className="chip" style={{ color: accent, borderColor: accent }}>{t}</span>)}</div>
              </SideCard>
            )}
          </aside>
        </div>
      </section>

      {/* ───── prev / next ───── */}
      <section className="border-b border-line">
        <div className="frame">
          <SectionBar n="↔" label="Keep exploring" />
          <div className="grid sm:grid-cols-2">
            {[{ p: prev, dir: "Previous" }, { p: next, dir: "Next" }].map(({ p, dir }, i) => (
              <Link key={dir} to={`/projects/${p.slug}`} className={`group relative overflow-hidden p-8 transition-colors hover:bg-card sm:p-12 ${i === 0 ? "border-b border-line sm:border-b-0 sm:border-r" : "text-right"}`}>
                <span className="mono text-ink3">{i === 0 ? "← " : ""}{dir} project{i === 1 ? " →" : ""}</span>
                <p className="display mt-3 text-[clamp(1.8rem,4vw,3rem)] transition-transform duration-500 group-hover:translate-x-1.5">
                  <SplitTitle title={p.title} accent={accentOf(p.slug)} />
                </p>
                <span className="mono mt-3 inline-flex items-center gap-2 text-ink2">View <IconArrowRight className="transition-transform group-hover:translate-x-1" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
