import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "@/context/theme";
import { CATEGORY_LABEL, CATEGORY_PLURAL, accentOf, badges, categoryOf, fmtNum, projects } from "@/lib/data";
import { badgeImage, imgs } from "@/lib/assets";
import { useRepo } from "@/lib/github";
import { IconArrow, IconStar, Reveal, SectionBar, SplitTitle } from "./ui";

const LANG_COLOR = {
  Python: "#3572A5", JavaScript: "#f1e05a", TypeScript: "#3178c6", Java: "#b07219", Kotlin: "#A97BFF",
  HTML: "#e34c26", CSS: "#563d7c", Dart: "#00B4AB", "C#": "#178600", C: "#555555", "C++": "#f34b7d",
};

/** Hovering (or focusing) a tile cross-fades through that project's real screenshots. */
function TileMedia({ images, title, accent, wide }) {
  const [i, setI] = useState(0);
  const [hover, setHover] = useState(false);
  useEffect(() => {
    if (!hover || images.length < 2) return;
    const t = setInterval(() => setI((x) => (x + 1) % images.length), 1100);
    return () => clearInterval(t);
  }, [hover, images.length]);
  useEffect(() => { if (!hover) setI(0); }, [hover]);

  return (
    <div
      className={`relative overflow-hidden border-y border-line bg-card ${wide ? "aspect-[16/8.2]" : "aspect-[16/10]"}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
    >
      {images.map((src, k) => (
        <div key={src} className="absolute inset-0 transition-opacity duration-700" style={{ opacity: k === i ? 1 : 0 }}>
          <img src={src} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full scale-125 object-cover opacity-40 blur-2xl" />
          <img
            src={src}
            alt={k === 0 ? `${title} screenshot` : ""}
            loading="lazy"
            onLoad={(e) => { const t = e.currentTarget; t.dataset.p = t.naturalWidth / t.naturalHeight < 1.5 ? "p" : "l"; }}
            className="tile-img relative h-full w-full object-cover object-top data-[p=p]:object-contain"
          />
        </div>
      ))}
      {images.length > 1 && (
        <div className="absolute bottom-0 left-0 right-0 flex gap-1 p-2 opacity-0 transition-opacity group-hover/t:opacity-100">
          {images.map((_, k) => (
            <span key={k} className="h-[3px] flex-1 bg-black/25">
              <span className="block h-full origin-left" style={{ background: accent, transform: k <= i ? "scaleX(1)" : "scaleX(0)", transition: "transform .4s" }} />
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export function ProjectTile({ project, index }) {
  const { theme } = useTheme();
  const { repo } = useRepo(project.api_url, false);
  const accent = accentOf(project.slug);
  const cat = categoryOf(project);
  const images = useMemo(() => imgs(project.images), [project.images]);
  const wide = !!(project.flagship || project.featured);
  const awards = (project.achievements ?? []).map((id) => badges.find((b) => b.id === id)).filter(Boolean);
  const tags = project.stack ?? [];

  return (
    <Reveal
      delay={(index % 4) * 70}
      className={`group/t tile relative border-b border-line sm:border-r ${wide ? "sm:col-span-2" : ""}`}
      style={{ "--c": accent }}
    >
      <Link to={`/projects/${project.slug}`} className="flex h-full flex-col" aria-label={`${project.title} — explore project`}>
        <div className="flex items-center justify-between px-5 py-3.5">
          <span className="num-chip" style={{ background: accent }}>{String(index + 1).padStart(2, "0")}</span>
          <span className="mono truncate pl-3 text-ink3">
            {project.flagship ? "Flagship · " : ""}{project.type && CATEGORY_LABEL[cat].toLowerCase() !== String(project.type).toLowerCase() ? project.type : CATEGORY_LABEL[cat]}
          </span>
        </div>

        <div className="relative">
          <TileMedia images={images} title={project.title} accent={accent} wide={wide} />
          {awards.length > 0 && (
            <div className="absolute right-3 top-3 flex gap-1.5">
              {awards.slice(0, 5).map((a) => (
                <span key={a.id} title={`${a.platform} — ${a.name}${a.tierLabel ? ` (${a.tierLabel})` : ""}`} className="grid h-8 w-8 place-items-center border border-line bg-paper/90 p-1 backdrop-blur">
                  <img src={badgeImage(a.id, theme)} alt={a.name} className="h-full w-full object-contain" />
                </span>
              ))}
            </div>
          )}
          {repo && (
            <div className="mono-sm absolute bottom-3 left-3 flex items-center gap-3 bg-paper/90 px-2.5 py-1.5 backdrop-blur">
              {repo.stargazers_count > 0 && <span className="flex items-center gap-1" style={{ color: "var(--amber)" }}><IconStar /><b className="text-ink">{fmtNum(repo.stargazers_count)}</b></span>}
              {repo.language && (
                <span className="flex items-center gap-1.5 text-ink2">
                  <i className="h-2 w-2 rounded-full" style={{ background: LANG_COLOR[repo.language] ?? accent }} />{repo.language}
                </span>
              )}
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col px-5 pb-5 pt-5">
          <h3 className="display text-[clamp(1.6rem,2.4vw,2.2rem)]"><SplitTitle title={project.title} accent={accent} /></h3>
          <p className="clamp-3 mt-3 text-[.92rem] leading-relaxed text-ink2">{project.description}</p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {(tags.length ? tags.slice(0, wide ? 6 : 4) : [CATEGORY_LABEL[cat]]).map((t) => <span key={t} className="chip">{t}</span>)}
            {project["publish-url"] ? <span className="chip" style={{ color: accent, borderColor: accent }}>Live</span> : null}
          </div>
          <span className="mono mt-auto flex items-center gap-2 pt-6">
            Explore {project.title} <IconArrow className="go" />
          </span>
        </div>
      </Link>
    </Reveal>
  );
}

const FILTERS = ["all", "library", "app", "website", "system"];

export function Lineup({ n = "03", id = "lineup", title = "Pick a project to explore" }) {
  const [active, setActive] = useState("all");
  const [q, setQ] = useState("");
  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    return projects.filter((p) =>
      (active === "all" || categoryOf(p) === active) &&
      (!s || [p.title, p.description, ...(p.stack ?? [])].join(" ").toLowerCase().includes(s))
    );
  }, [active, q]);
  const count = (f) => (f === "all" ? projects.length : projects.filter((p) => categoryOf(p) === f).length);

  return (
    <section id={id} className="border-b border-line">
      <div className="frame">
        <SectionBar n={n} label="The lineup" right={title} />
        <div className="sec-pad border-b border-line">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <Reveal>
              <h2 className="display text-[clamp(2rem,5vw,4rem)]">My Projects</h2>
              <p className="lede mt-4 max-w-2xl">
                Every project here started as a fun idea — a way to explore, experiment, and push myself further.
                Some are libraries others use, some are apps I built for myself, and some are full web platforms.
                Each one taught me something new.
              </p>
            </Reveal>
          </div>
        </div>
        {/* filter bar */}
        <div className="flex flex-col gap-px border-b border-line sm:flex-row sm:items-stretch">
          <div className="flex flex-1 overflow-x-auto" role="tablist" aria-label="Filter projects">
            {FILTERS.map((f) => (
              <button
                key={f}
                role="tab"
                aria-selected={active === f}
                onClick={() => setActive(f)}
                className={`mono flex shrink-0 items-center gap-2 border-r border-line px-5 py-4 transition-colors ${active === f ? "bg-ink text-paper" : "text-ink2 hover:bg-card hover:text-ink"}`}
              >
                {f === "all" ? "All" : CATEGORY_PLURAL[f]}
                <span className={active === f ? "opacity-60" : "text-ink3"}>{count(f)}</span>
              </button>
            ))}
          </div>
          <label className="flex items-center gap-3 border-t border-line px-5 sm:w-[280px] sm:border-l sm:border-t-0">
            <span className="mono text-ink3">Search</span>
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="name, stack…" aria-label="Search projects" className="min-w-0 flex-1 bg-transparent py-3.5 text-sm outline-none placeholder:text-ink3" />
          </label>
        </div>

        {list.length ? (
          <div className="overflow-hidden">
            <div className="-mr-px grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 [grid-auto-flow:dense]">
              {list.map((p) => <ProjectTile key={p.slug} project={p} index={projects.indexOf(p)} />)}
            </div>
          </div>
        ) : (
          <div className="sec-pad py-24 text-center">
            <p className="display-md text-2xl">No projects match.</p>
            <button className="btn btn-ghost mt-6" onClick={() => { setQ(""); setActive("all"); }}>Reset filters</button>
          </div>
        )}
      </div>
    </section>
  );
}
