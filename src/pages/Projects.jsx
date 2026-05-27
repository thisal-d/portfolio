import { useState } from "react";
import "../styles/ProjectsPage.css";
import ProjectCard from "../components/ProjectCard";
import FeaturedProjectCard from "../components/FeaturedProjectCard";
import projects from "../data/projects.json";

const FILTERS = [
  { id: "all",     label: "All",      activeClass: ""            },
  { id: "library", label: "Libraries",activeClass: "active-lib" },
  { id: "app",     label: "Apps",     activeClass: "active-app" },
  { id: "website", label: "Websites", activeClass: "active-web" },
];

function ProjectsPage() {
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
          <span className="projects-recog-label">Recognition</span>
          <div className="projects-recog-badges">
            <div className="proj-recog-item proj-recog-normal">
              <img src="/awards-badges/starstruck-normal.png" alt="GitHub Starstruck" className="proj-recog-img" />
              <span>GitHub Starstruck</span>
            </div>
            <div className="proj-recog-item proj-recog-bronze">
              <img src="/awards-badges/starstruck-bronze.png" alt="GitHub Starstruck Bronze" className="proj-recog-img" />
              <span>GitHub Starstruck · Bronze</span>
            </div>
            <div className="proj-recog-item proj-recog-neutral">
              <img src="/awards-badges/rising-start.png" alt="SourceForge Rising Star" className="proj-recog-img" />
              <span>SF Rising Star</span>
            </div>
          </div>
          <a href="/about#achievements" className="projects-recog-link">View details →</a>
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

