import React from "react";
import "./Skills.css";
import skillsData from "../../data/skills.json";

/* ── Single skill pill ── */
function SkillPill({ skill }) {
  return (
    <div
      className={`skill-pill${skill.primary ? " skill-pill--primary" : ""}`}
      title={skill.name}
      aria-label={skill.primary ? `${skill.name} — primary skill` : skill.name}
    >
      <img src={skill.icon} alt="" className="skill-pill-icon" aria-hidden="true" />
      <span className="skill-pill-name">{skill.name}</span>
      {skill.evidence && (
        <span className="skill-evidence" aria-label={`Evidence: ${skill.evidence}`}>
          {skill.evidence}
        </span>
      )}
    </div>
  );
}

/* ── Main Skills section ── */
const Skills = () => (
  <section className="skills-section" aria-label="Skills and tools">
    <div className="skills-inner">
      <div className="skills-header">
        <p className="section-label">Tech Stack</p>
        <h2 className="section-title">Skills &amp; Tools</h2>
        <p className="section-description">
          Technologies I've used across real shipped projects — from published PyPI
          libraries to full-stack web apps and hardware systems.
        </p>
      </div>

      <div className="skills-categories">
        {skillsData.map((group) => (
          <div className="skills-category" key={group.category}>
            <div className="skills-category-header">
              <span className="skills-category-emoji" aria-hidden="true">{group.emoji}</span>
              <h3 className="skills-category-name">{group.category}</h3>
            </div>
            <div className="skills-pills">
              {group.skills.map((skill) => (
                <SkillPill skill={skill} key={skill.name} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Skills;