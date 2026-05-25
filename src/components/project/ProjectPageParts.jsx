import { useState } from "react";
import "../../styles/ProjectPage.css";

/* ══════════════════════════════════════════════════════════════
   GALLERY
   ══════════════════════════════════════════════════════════════ */
export function Gallery({ images, portrait = false }) {
  const [active, setActive] = useState(0);
  if (!images || images.length === 0) return null;

  if (portrait) {
    return (
      <div className="pp-gallery">
        <div className="pp-gallery-portrait">
          {images.map((src, i) => (
            <div
              key={i}
              className={`pp-gallery-thumb-portrait ${i === active ? "active" : ""}`}
              onClick={() => setActive(i)}
            >
              <img src={src} alt={`Screenshot ${i + 1}`} loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="pp-gallery">
      <div className="pp-gallery-main">
        <img src={images[active]} alt={`Screenshot ${active + 1}`} loading="lazy" />
      </div>
      {images.length > 1 && (
        <div className="pp-gallery-thumbs">
          {images.map((src, i) => (
            <div
              key={i}
              className={`pp-gallery-thumb ${i === active ? "active" : ""}`}
              onClick={() => setActive(i)}
            >
              <img src={src} alt={`Thumbnail ${i + 1}`} loading="lazy" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   PROJECT META — start date, active/archived, duration
   ══════════════════════════════════════════════════════════════ */
export function ProjectMeta({ data }) {
  const startDate   = data["start-date"];
  const isActive    = data.status === "active";

  function formatDate(iso) {
    if (!iso) return null;
    return new Date(iso).toLocaleDateString("en-US", { month: "long", year: "numeric" });
  }

  function getDuration(startIso) {
    if (!startIso) return null;
    const start = new Date(startIso);
    const now   = new Date();
    const months = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
    if (months < 1)  return "Less than a month";
    if (months < 12) return `${months} month${months > 1 ? "s" : ""}`;
    const years = Math.floor(months / 12);
    const rem   = months % 12;
    return rem > 0 ? `${years}y ${rem}m` : `${years} year${years > 1 ? "s" : ""}`;
  }

  return (
    <div className="pp-sidebar-card">
      <p className="pp-sidebar-card-title">Project Info</p>
      <div className="pp-meta-list">
        {startDate && (
          <div className="pp-meta-row">
            <span className="pp-meta-label">📅 Started</span>
            <span className="pp-meta-val">{formatDate(startDate)}</span>
          </div>
        )}
        {startDate && (
          <div className="pp-meta-row">
            <span className="pp-meta-label">⏱ Duration</span>
            <span className="pp-meta-val">
              {getDuration(startDate)}
              {isActive ? " · ongoing" : ""}
            </span>
          </div>
        )}
        <div className="pp-meta-row">
          <span className="pp-meta-label">🔖 Status</span>
          <span className={`pp-status ${data.status || "archived"}`} style={{ fontSize: "0.72rem" }}>
            {data.status || "archived"}
          </span>
        </div>
        {data.platform && (
          <div className="pp-meta-row">
            <span className="pp-meta-label">📱 Platform</span>
            <span className="pp-meta-val">{data.platform}</span>
          </div>
        )}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   GITHUB STATS BAR
   ══════════════════════════════════════════════════════════════ */
export function StatsBar({ repoData, latestTag, loading }) {
  if (loading) return <p className="pp-releases-loading">Fetching GitHub stats…</p>;
  if (!repoData) return null;

  return (
    <div className="pp-stats-bar">
      <span className="pp-stat-item">
        ⭐&nbsp;<span className="pp-stat-val">{fmt(repoData.stargazers_count)}</span>&nbsp;Stars
      </span>
      <span className="pp-stat-item">
        🍴&nbsp;<span className="pp-stat-val">{fmt(repoData.forks_count)}</span>&nbsp;Forks
      </span>
      {repoData.language && (
        <span className="pp-stat-item">
          💻&nbsp;<span className="pp-stat-val">{repoData.language}</span>
        </span>
      )}
      {repoData.open_issues_count != null && (
        <span className="pp-stat-item">
          🐛&nbsp;<span className="pp-stat-val">{repoData.open_issues_count}</span>&nbsp;Issues
        </span>
      )}
      {latestTag && <span className="pp-stat-version">{latestTag}</span>}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   PROJECT RELEASES — GitHub API
   ══════════════════════════════════════════════════════════════ */
export function ProjectReleases({ releases, loading, error, repoUrl }) {
  if (loading) return <p className="pp-releases-loading">Fetching release data…</p>;

  if (error) {
    return (
      <div className="pp-releases-container">
        <p className="pp-releases-empty" style={{ color: "#ef4444" }}>
          ⚠️ GitHub API rate limit exceeded. 
          {repoUrl && (
            <span>
              {" "}Please <a href={`${repoUrl}/releases`} target="_blank" rel="noopener noreferrer" style={{color: "var(--accent-primary)", textDecoration: "underline"}}>view releases directly on GitHub</a>.
            </span>
          )}
        </p>
      </div>
    );
  }

  if (!releases || releases.length === 0) {
    return <p className="pp-releases-empty">No GitHub releases published yet.</p>;
  }

  const count = releases.length;

  return (
    <div className="pp-releases-container">
      <div className="pp-releases-header-bar">
        <span className="pp-releases-count">
          {count} Release{count !== 1 ? 's' : ''}
        </span>
        {repoUrl && (
          <a href={`${repoUrl}/releases`} target="_blank" rel="noopener noreferrer" className="pp-releases-view-all">
            View all on GitHub ↗
          </a>
        )}
      </div>
      <div className="pp-releases-list">
        {releases.map((rel, i) => (
          <div key={i} className="pp-release-item">
            <div className="pp-release-header">
              <span className="pp-release-tag">{rel.tag_name}</span>
              {i === 0 && <span className="pp-release-badge-latest">Latest</span>}
              <span className="pp-release-name">{rel.name || rel.tag_name}</span>
              <span className="pp-release-date">{fmtDate(rel.published_at)}</span>
            </div>
            {rel.body && (
              <p className="pp-release-body">{rel.body.replace(/#+\s/g, "").trim()}</p>
            )}
            <a 
              href={rel.html_url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="pp-release-btn"
            >
              View Release ↗
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   TECH STACK CARD
   ══════════════════════════════════════════════════════════════ */
export function TechStackCard({ tags }) {
  if (!tags || tags.length === 0) return null;
  return (
    <div className="pp-sidebar-card">
      <p className="pp-sidebar-card-title">Tech Stack</p>
      <div className="pp-tech-tags">
        {tags.map((t, i) => <span key={i} className="pp-tech-tag">{t}</span>)}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   GITHUB TOPICS CARD
   ══════════════════════════════════════════════════════════════ */
export function TopicsCard({ topics }) {
  if (!topics || topics.length === 0) return null;
  return (
    <div className="pp-sidebar-card">
      <p className="pp-sidebar-card-title">Topics</p>
      <div className="pp-topics">
        {topics.map((t, i) => <span key={i} className="pp-topic">{t}</span>)}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   FEATURES LIST
   ══════════════════════════════════════════════════════════════ */
export function FeaturesList({ features }) {
  if (!features || features.length === 0) return null;
  return (
    <div className="pp-section">
      <h3 className="pp-section-title">Features</h3>
      <div className="pp-features-grid">
        {features.map((f, i) => (
          <div key={i} className="pp-feature-item">{f}</div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   INTERNAL HELPERS
   ══════════════════════════════════════════════════════════════ */
function fmt(n) {
  if (n == null) return "—";
  if (n >= 1000) return (n / 1000).toFixed(1) + "k";
  return String(n);
}

function fmtDate(iso) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", { month: "short", year: "numeric" });
}
