import "../styles/ProjectSection.css";
import ProjectCard from "./ProjectCard";
import projects from "../data/projects.json";

function ProjectSection() {
  return (
    <section className="projects-section">
      <div className="projects-section-inner">
        <div className="projects-section-header">
          <p className="section-label">Open Source</p>
          <h2 className="section-title">My Projects</h2>
          <p className="section-description">
            Every project here started as a fun idea — a way to explore, experiment, and push myself further.
            Some are libraries others use, some are apps I built for myself, and some are full web platforms.
            Each one taught me something new.
          </p>
        </div>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <ProjectCard project={project} key={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProjectSection;