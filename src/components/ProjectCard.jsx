import "../styles/ProjectCard.css";
import { useEffect, useState, useCallback } from "react";
import allBadges from "../data/badges.json";

/* ── helpers ── */
function typeBadge(type) {
  const map = {
    library: { label: "Library", cls: "badge-library" },
    app:     { label: "App",     cls: "badge-app"     },
    website: { label: "Website", cls: "badge-website" },
  };
  return map[type] || { label: type, cls: "badge-library" };
}

function formatNumber(n) {
  if (n == null) return "—";
  if (n >= 1000) return (n / 1000).toFixed(1) + "k";
  return n.toString();
}

function relativeDate(iso) {
  if (!iso) return null;
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);
  if (days === 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 30) return `${days}d ago`;
  const mo = Math.floor(days / 30);
  if (mo < 12) return `${mo}mo ago`;
  return `${Math.floor(mo / 12)}y ago`;
}

const LANG_COLOR = {
  Python: "#3572A5", JavaScript: "#f1e05a", TypeScript: "#3178c6",
  Java: "#b07219", Kotlin: "#A97BFF", HTML: "#e34c26",
};

/* ── component ── */
function ProjectCard({ project }) {
  const [repoData,      setRepoData]      = useState(null);
  const [latestTag,     setLatestTag]     = useState(null);
  const [pypiDownloads, setPypiDownloads] = useState(null);
  const [slideIndex,    setSlideIndex]    = useState(0);
  const [loadingAPI,    setLoadingAPI]    = useState(true);

  const images  = project.images || [];
  const total   = images.length;
  const { label, cls } = typeBadge(project.type);

  const expandable = project["expand-on-new-tab"] === true;
  const slug       = project.slug;

  /* fetch GitHub API */
  useEffect(() => {
    if (!project.api_url) { setLoadingAPI(false); return; }
    fetch(project.api_url)
      .then(r => r.json())
      .then(d => { setRepoData(d); setLoadingAPI(false); })
      .catch(() => setLoadingAPI(false));
  }, [project.api_url]);

  /* fetch latest release tag */
  useEffect(() => {
    if (!project.api_url) return;
    fetch(`${project.api_url}/releases/latest`)
      .then(r => r.ok ? r.json() : null)
      .then(d => d && setLatestTag(d.tag_name))
      .catch(() => {});
  }, [project.api_url]);

  /* fetch PyPI monthly downloads (public API — no auth needed) */
  useEffect(() => {
    if (!project.pypi_name) return;
    fetch(`https://pypistats.org/api/packages/${project.pypi_name}/recent`)
      .then(r => r.ok ? r.json() : null)
      .then(d => d?.data?.last_month != null && setPypiDownloads(d.data.last_month))
      .catch(() => {});
  }, [project.pypi_name]);

  /* carousel */
  const prev = useCallback(() => setSlideIndex(i => Math.max(0, i - 1)), []);
  const next = useCallback(() => setSlideIndex(i => Math.min(total - 1, i + 1)), [total]);

  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft")  prev();
    if (e.key === "ArrowRight") next();
  };

  /* open detail page */
  function handleCardClick(e) {
    // Don't trigger when clicking action buttons or carousel controls
    if (e.target.closest(".pc-actions") || e.target.closest(".pc-carousel-btn") || e.target.closest(".pc-dot")) return;
    if (expandable && slug) {
      window.open(`/projects/${slug}`, "_blank", "noopener,noreferrer");
    }
  }

  const why = project["why-i-made-this"];
  const hasPublish = project["publish-url"] && project["publish-url"] !== false;
  // achievements is an array of badge IDs — resolve full objects from badges.json
  const achievements = (project.achievements || [])
    .map(id => allBadges.find(b => b.id === id))
    .filter(Boolean);

  return (
    <article
      className={`project-card ${expandable ? "project-card-clickable" : ""}`}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onClick={handleCardClick}
      title={expandable ? `Open ${project.title} details` : undefined}
    >
      {/* ── IMAGE CAROUSEL ── */}
      {total > 0 && (
        <div className="pc-carousel" aria-label="Project screenshots">
          <div
            className="pc-carousel-track"
            style={{ transform: `translateX(-${slideIndex * 100}%)` }}
          >
            {images.map((src, i) => (
              <div key={i} className="pc-carousel-slide">
                <img src={src} alt={`${project.title} screenshot ${i + 1}`} loading="lazy" />
              </div>
            ))}
          </div>

          {total > 1 && (
            <>
              <button
                className="pc-carousel-btn prev"
                onClick={e => { e.stopPropagation(); prev(); }}
                disabled={slideIndex === 0}
                aria-label="Previous screenshot"
              >‹</button>
              <button
                className="pc-carousel-btn next"
                onClick={e => { e.stopPropagation(); next(); }}
                disabled={slideIndex === total - 1}
                aria-label="Next screenshot"
              >›</button>
              <div className="pc-carousel-dots">
                {images.map((_, i) => (
                  <button
                    key={i}
                    className={`pc-dot ${i === slideIndex ? "active" : ""}`}
                    onClick={e => { e.stopPropagation(); setSlideIndex(i); }}
                    aria-label={`Go to screenshot ${i + 1}`}
                  />
                ))}
              </div>
            </>
          )}

          {/* Expand indicator */}
          {expandable && (
            <div className="pc-expand-hint">
              View Details ↗
            </div>
          )}
        </div>
      )}

      {/* ── BODY ── */}
      <div className="pc-body">
        <div className="pc-header">
          <h3 className="pc-title">{project.title}</h3>
          <span className={`badge ${cls}`}>{label}</span>
        </div>

        <p className="pc-description">{project.description}</p>

        {why?.simple && (
          <div className="pc-why">
            <p className="pc-why-label">💡 Why I built this</p>
            <p className="pc-why-text">{why.simple}</p>
          </div>
        )}

        {/* ── Achievement ribbon ── */}
        {achievements.length > 0 && (
          <div className="pc-achievements">
            {achievements.map((a) => (
              <div key={a.id} className={`pc-achv-badge pc-achv-${a.tier}`} title={`${a.platform} — ${a.name}${a.tierLabel ? ` (${a.tierLabel})` : ""}`}>
                <img src={a.image} alt={a.name} className="pc-achv-img" />
                <span className="pc-achv-label">{a.name}{a.tierLabel ? ` · ${a.tierLabel}` : ""}</span>
              </div>
            ))}
          </div>
        )}

        {/* ── GitHub stats row ── */}
        <div className="pc-stats">
          {loadingAPI ? (
            <>
              <span className="pc-stat-skeleton" aria-hidden="true" />
              <span className="pc-stat-skeleton pc-stat-skeleton--sm" aria-hidden="true" />
            </>
          ) : repoData ? (
            <>
              <span className="pc-stat">
                <span className="pc-stat-icon">⭐</span>
                <span className="pc-stat-val">{formatNumber(repoData.stargazers_count)}</span>
                &nbsp;Stars
              </span>
              <span className="pc-stat">
                <span className="pc-stat-icon">🍴</span>
                <span className="pc-stat-val">{formatNumber(repoData.forks_count)}</span>
                &nbsp;Forks
              </span>
              {pypiDownloads != null && (
                <span className="pc-stat">
                  <span className="pc-stat-icon">⬇️</span>
                  <span className="pc-stat-val">{formatNumber(pypiDownloads)}</span>
                  &nbsp;/mo
                </span>
              )}
              {repoData.language && (
                <span className="pc-stat">
                  <span
                    className="pc-lang-dot"
                    style={{ background: LANG_COLOR[repoData.language] ?? "#6366f1" }}
                  />
                  {repoData.language}
                </span>
              )}
              {latestTag && <span className="pc-version">{latestTag}</span>}
            </>
          ) : null}
        </div>

        <div className="pc-actions">
          <a
            href={project.repo_url}
            target="_blank"
            rel="noopener noreferrer"
            className="pc-action-btn github"
            onClick={e => e.stopPropagation()}
          >
            <img src="/icons/social/github.png" alt="" className="pc-action-icon" />
            Source Code
          </a>

          {hasPublish && (
            <a
              href={project["publish-url"]}
              target="_blank"
              rel="noopener noreferrer"
              className="pc-action-btn publish"
              onClick={e => e.stopPropagation()}
            >
              🚀 {project.type === "library" ? "PyPI" : project.type === "website" ? "Live Demo" : "Download"}
            </a>
          )}

          {expandable && (
            <span className="pc-action-btn expand-pill" aria-hidden="true">
              Details →
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

export default ProjectCard;
