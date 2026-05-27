import "../styles/AchievementBadges.css";
import ACHIEVEMENTS from "../data/badges.json";

/* ─── Tier colour tokens ─────────────────────────────────── */
const TIER_META = {
  normal: { glow: "rgba(99,102,241,0.15)", border: "rgba(99,102,241,0.30)", text: "var(--accent-primary)" },
  bronze: { glow: "rgba(180,120,60,0.15)", border: "rgba(194,140,80,0.30)", text: "#c48040" },
  neutral: { glow: "rgba(148,163,184,0.10)", border: "rgba(148,163,184,0.22)", text: "var(--text-secondary)" },
};

function AchievementBadges() {
  return (
    <section className="achv-section" id="achievements" aria-label="Developer Achievements">
      {/* ── Header ── */}
      <div className="achv-header">
        <p className="section-label">Recognition</p>
        <h2 className="achv-title">Open Source Achievements</h2>
        <p className="achv-subtitle">
          Badges earned from community recognition across GitHub and SourceForge —
          proof of real-world impact, not self-assessment.
        </p>
      </div>

      {/* ── Badge Cards ── */}
      <div className="achv-grid">
        {ACHIEVEMENTS.map((achv) => {
          const tier = TIER_META[achv.tier];
          return (
            <article
              key={achv.id}
              className="achv-card"
              style={{
                "--tier-glow": tier.glow,
                "--tier-border": tier.border,
                "--tier-text": tier.text,
              }}
            >
              {/* Tier accent line */}
              <div className="achv-card-accent" />

              {/* Badge image */}
              <div className="achv-badge-wrap">
                <img
                  src={achv.image}
                  alt={`${achv.name} badge`}
                  className="achv-badge-img"
                  loading="lazy"
                />
                <div className="achv-badge-glow" />
              </div>

              {/* Content */}
              <div className="achv-card-body">
                {/* Platform + tier pill */}
                <div className="achv-meta-row">
                  <span className="achv-platform">{achv.platform}</span>
                  {achv.tierLabel && (
                    <span className="achv-tier-pill">{achv.tierLabel}</span>
                  )}
                </div>

                <h3 className="achv-name">{achv.name}</h3>
                <p className="achv-desc">{achv.description}</p>

                {/* Project link */}
                <div className="achv-footer">
                  <span className="achv-stat">{achv.stat}</span>
                  <a href={achv.projectLink} className="achv-project-link">
                    {achv.project} →
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default AchievementBadges;
