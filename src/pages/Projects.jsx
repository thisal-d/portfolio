import { useState } from "react";
import "../styles/ProjectsPage.css";
import ProjectCard from "../components/ProjectCard";
import FeaturedProjectCard from "../components/FeaturedProjectCard";
import projects from "../data/projects.json";
import allBadges from "../data/badges.json";
import { useTheme } from "../context/ThemeContext";
import { getBadgeImage } from "../utils/badgeResolver";

const FILTERS = [
  { id: "all",     label: "All",      activeClass: ""            },
  { id: "library", label: "Libraries",activeClass: "active-lib" },
  { id: "app",     label: "Apps",     activeClass: "active-app" },
  { id: "website", label: "Websites", activeClass: "active-web" },
];

function ProjectsPage() {
  const { theme } = useTheme();
  const [active, setActive] = useState("all");

  const featuredProject = projects.find(p => p.featured);

  // When filtering, include featured project in results; when showing all, exclude from grid (shown separately above)
  const filtered = active === "all"
    ? projects.filter(p => !p.featured)
    : projects.filter(p => p.type === active);

  return (
    <div className="projects-page">
      <div className="projects-page-inner">
        {/* Header */}
        <div className="projects-page-header">
          <p className="section-label">Open Source</p>
          <h1 className="section-title">All Projects</h1>
          <p className="section-description">
            Libraries, apps, and websites — things I built to solve real problems, learn new tech,
            or just because I wanted to.
          </p>
        </div>

        {/* Recognition banner */}
        <div className="projects-recognition-bar">
          <div className="projects-recog-header">
            <span className="projects-recog-label">Recognition</span>
            <a href="/about#achievements" className="projects-recog-link">View details →</a>
          </div>
          <div className="projects-recog-badges">
            {allBadges.map((achv) => (
              <div key={achv.id} className={`proj-recog-item proj-recog-${achv.tier}`}>
                <img
                  src={getBadgeImage(achv.id, theme)}
                  alt={achv.name}
                  className="proj-recog-img"
                />
                <span>
                  {achv.platform === "GitHub"
                    ? (achv.id === "starstruck" ? "GitHub Starstruck" : `Starstruck · ${achv.tierLabel}`)
                    : `SF ${achv.name}`}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Featured project — shown above grid when no filter active */}
        {active === "all" && featuredProject && (
          <FeaturedProjectCard project={featuredProject} />
        )}

        {/* Filter bar */}
        <div className="projects-filter-bar">
          {FILTERS.map(f => (
            <button
              key={f.id}
              className={`projects-filter-btn ${active === f.id ? ("active " + f.activeClass).trim() : ""}`}
              onClick={() => setActive(f.id)}
            >
              {f.label}
            </button>
          ))}
          <span className="projects-count">
            {active === "all"
              ? `${filtered.length + (featuredProject ? 1 : 0)} projects`
              : `${filtered.length} project${filtered.length !== 1 ? "s" : ""}`}
          </span>
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="projects-page-grid">
            {filtered.map((project, i) => (
              <ProjectCard project={project} key={i} />
            ))}
          </div>
        ) : (
          <div className="projects-empty">No projects found.</div>
        )}
      </div>
    </div>
  );
}

export default ProjectsPage;

