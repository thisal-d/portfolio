import React from "react";
import "../styles/Skills.css";
import SkillCard from "./SkillCard";

const skills = [
  { name: "Python",       icon: "/icons/skill/python.png" },
  { name: "Java",         icon: "/icons/skill/java.png" },
  { name: "JavaScript",   icon: "/icons/skill/javascript.png" },
  { name: "C++",          icon: "/icons/skill/c++.png" },
  { name: "PHP",          icon: "/icons/skill/php.png" },
  { name: "HTML",         icon: "/icons/skill/html.png" },
  { name: "React",        icon: "/icons/skill/react.png" },
  { name: "Tailwind",     icon: "/icons/skill/tailwind_css.png" },
  { name: "MySQL",        icon: "/icons/skill/mysql.png" },
  { name: "Tkinter",      icon: "/icons/skill/tkinter.gif" },
  { name: "CustomTkinter",icon: "/icons/skill/customtkinter.ico" },
  { name: "Arduino",      icon: "/icons/skill/arduino.png" },
  { name: "Android",      icon: "/icons/skill/android.png" },
  { name: "Git",          icon: "/icons/skill/git.png" },
  { name: "GitHub",       icon: "/icons/skill/github.png" },
  { name: "VS Code",      icon: "/icons/skill/visual_studio_code.png" },
  { name: "IntelliJ",     icon: "/icons/skill/intellij.png" },
];

const Skills = () => (
  <section className="skills-section">
    <div className="skills-section-inner">
      <div className="skills-section-header">
        <p className="section-label">Tech Stack</p>
        <h2 className="section-title">Skills & Tools</h2>
        <p className="section-description">
          Over time I've picked up a bunch of technologies — some through projects, others out of curiosity.
          I'm not a pro in everything here, but I know enough to build, break, and fix things on my own.
        </p>
      </div>

      <div className="skills-grid">
        {skills.map((skill, index) => (
          <SkillCard skill={skill} key={index} />
        ))}
      </div>
    </div>
  </section>
);

export default Skills;