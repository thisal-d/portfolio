import { useEffect, useState, useCallback } from "react";
import allBadges from "../data/badges.json";
import "../styles/FeaturedProjectCard.css";

/* ── helpers ── */
function formatNumber(n) {
  if (n == null) return "—";
  if (n >= 1000) return (n / 1000).toFixed(1) + "k";
  return n.toString();
}

function formatReleaseDate(iso) {
  if (!iso) return null;
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
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
  Python:     "#3572A5",
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Java:       "#b07219",
  Kotlin:     "#A97BFF",
  HTML:       "#e34c26",
  CSS:        "#563d7c",
  Dart:       "#00B4AB",
};

function FeaturedProjectCard({ project }) {
  const [repoData,      setRepoData]      = useState(null);
  const [latestTag,     setLatestTag]     = useState(null);
  const [releaseDate,   setReleaseDate]   = useState(null);
  const [pypiDownloads, setPypiDownloads] = useState(null);
  const [slideIndex,    setSlideIndex]    = useState(0);

  const images = project.images || [];
  const total  = images.length;

  /* fetch GitHub repo data */
  useEffect(() => {
    if (!project.api_url) return;
    fetch(project.api_url)
      .then(r => r.json())
      .then(setRepoData)
      .catch(() => {});
  }, [project.api_url]);

  /* fetch latest release — tag + published_at */
  useEffect(() => {
    if (!project.api_url) return;
    fetch(`${project.api_url}/releases/latest`)
      .then(r => r.ok ? r.json() : null)
      .then(d => {
        if (!d) return;
        if (d.tag_name)    setLatestTag(d.tag_name);
        if (d.published_at) setReleaseDate(d.published_at);
      })
      .catch(() => {});
  }, [project.api_url]);

  /* fetch PyPI monthly downloads */
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

  /* resolve achievement badges */
  const achievements = (project.achievements || [])
    .map(id => allBadges.find(b => b.id === id))
    .filter(Boolean);

  const narrative  = project["case-study"];
  const hasPublish = project["publish-url"] && project["publish-url"] !== false;
  const lang       = repoData?.language;
  const langColor  = LANG_COLOR[lang] ?? "#6366f1";
  const formattedRelease = formatReleaseDate(releaseDate);

  return (
    <article className="fpc-card">
      {/* ── Left: media panel ── */}
      <div className="fpc-media">
        {total > 0 && (
          <div className="fpc-carousel">
            <div
              className="fpc-carousel-track"
              style={{ transform: `translateX(-${slideIndex * 100}%)` }}
            >
              {images.map((src, i) => (
                <div key={i} className="fpc-carousel-slide">
                  <img src={src} alt={`${project.title} screenshot ${i + 1}`} loading="lazy" />
                </div>
              ))}
            </div>
            {total > 1 && (
              <>
                <button className="fpc-btn prev" onClick={prev} disabled={slideIndex === 0} aria-label="Previous">‹</button>
                <button className="fpc-btn next" onClick={next} disabled={slideIndex === total - 1} aria-label="Next">›</button>
                <div className="fpc-dots">
                  {images.map((_, i) => (
                    <button
                      key={i}
                      className={`fpc-dot ${i === slideIndex ? "active" : ""}`}
                      onClick={() => setSlideIndex(i)}
                      aria-label={`Screenshot ${i + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* ── Media footer: language + release info ── */}
        <div className="fpc-media-footer">
          {lang && (
            <div className="fpc-media-chip">
              <span className="fpc-lang-dot" style={{ background: langColor }} />
              <span>{lang}</span>
            </div>
          )}
          {latestTag && (
            <div className="fpc-media-chip fpc-media-chip--release">
              <span className="fpc-media-chip-icon">🏷</span>
              <span>{latestTag}</span>
              {formattedRelease && (
                <span className="fpc-media-chip-sub">· {formattedRelease}</span>
              )}
            </div>
          )}
          {!latestTag && !lang && (
            <span className="fpc-media-chip-skeleton" />
          )}
        </div>
      </div>

      {/* ── Right: content panel ── */}
      <div className="fpc-content">
        {/* Header */}
        <div className="fpc-top">
          <div className="fpc-title-row">
            <div>
              <p className="fpc-eyebrow">Featured Project</p>
              <h2 className="fpc-title">{project.title}</h2>
            </div>
            {achievements.length > 0 && (
              <div className="fpc-achievements">
                {achievements.map(a => (
                  <div
                    key={a.id}
                    className={`fpc-achv fpc-achv-${a.tier}`}
                    title={`${a.platform} — ${a.name}${a.tierLabel ? ` (${a.tierLabel})` : ""}`}
                  >
                    <img src={a.image} alt={a.name} className="fpc-achv-img" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Live stats row */}
          <div className="fpc-stats">
            {repoData ? (
              <>
                <span className="fpc-stat">
                  <span className="fpc-stat-icon">⭐</span>
                  <strong>{formatNumber(repoData.stargazers_count)}</strong>
                  <span className="fpc-stat-label">Stars</span>
                </span>
                <span className="fpc-stat-divider" />
                <span className="fpc-stat">
                  <span className="fpc-stat-icon">🍴</span>
                  <strong>{formatNumber(repoData.forks_count)}</strong>
                  <span className="fpc-stat-label">Forks</span>
                </span>
                {pypiDownloads != null && (
                  <>
                    <span className="fpc-stat-divider" />
                    <span className="fpc-stat">
                      <span className="fpc-stat-icon">⬇️</span>
                      <strong>{formatNumber(pypiDownloads)}</strong>
                      <span className="fpc-stat-label">/mo</span>
                    </span>
                  </>
                )}
              </>
            ) : (
              <>
                <span className="fpc-stat-skeleton" />
                <span className="fpc-stat-skeleton fpc-stat-skeleton--sm" />
              </>
            )}
          </div>
        </div>

        {/* Case study narrative */}
        {narrative ? (
          <div className="fpc-narrative">
            {narrative.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        ) : (
          <p className="fpc-narrative-fallback">{project.description}</p>
        )}

        {/* Tech stack */}
        {project.stack && project.stack.length > 0 && (
          <div className="fpc-stack">
            <span className="fpc-stack-label">Built with</span>
            <div className="fpc-stack-tags">
              {project.stack.map(t => (
                <span key={t} className="fpc-stack-tag">{t}</span>
              ))}
            </div>
          </div>
        )}

        {/* CTAs */}
        <div className="fpc-actions">
          <a
            href={project.repo_url}
            target="_blank"
            rel="noopener noreferrer"
            className="fpc-action-primary"
          >
            <img src="/icons/social/github.png" alt="" className="fpc-action-icon" />
            View on GitHub
          </a>
          {hasPublish && (
            <a
              href={project["publish-url"]}
              target="_blank"
              rel="noopener noreferrer"
              className="fpc-action-secondary"
            >
              🚀 Download
            </a>
          )}
          {project["expand-on-new-tab"] && (
            <a
              href={`/projects/${project.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="fpc-action-secondary"
            >
              Full Case Study →
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default FeaturedProjectCard;
