import { useState } from "react";
import "../styles/ProjectsPage.css";
import ProjectCard from "../components/ProjectCard";
import projects from "../data/projects.json";

const FILTERS = [
  { id: "all",     label: "All",      activeClass: ""            },
  { id: "library", label: "Libraries",activeClass: "active-lib" },
  { id: "app",     label: "Apps",     activeClass: "active-app" },
  { id: "website", label: "Websites", activeClass: "active-web" },
];

function ProjectsPage() {
  const [active, setActive] = useState("all");

  const filtered = active === "all"
    ? projects
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
            {filtered.length} project{filtered.length !== 1 ? "s" : ""}
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
