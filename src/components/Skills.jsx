import React from "react";
import "../styles/Skills.css";
import skillsData from "../data/skills.json";

/* ── Level dots (1-5) ── */
function LevelDots({ level }) {
  return (
    <span className="skill-level" aria-label={`Proficiency: ${level} out of 5`}>
      {[1, 2, 3, 4, 5].map(i => (
        <span
          key={i}
          className={`skill-dot ${i <= level ? "skill-dot--filled" : ""}`}
        />
      ))}
    </span>
  );
}

/* ── Single skill pill ── */
function SkillPill({ skill }) {
  return (
    <div className="skill-pill" title={skill.name}>
      <img src={skill.icon} alt={skill.name} className="skill-pill-icon" />
      <span className="skill-pill-name">{skill.name}</span>
      <LevelDots level={skill.level} />
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
          Technologies I've used across real projects — from published PyPI libraries
          to full-stack web apps. Dots indicate relative proficiency.
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