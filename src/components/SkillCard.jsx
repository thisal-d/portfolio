import "../styles/SkillCard.css";

function SkillCard({ skill }) {
  return (
    <div className="skill-card">
      <img src={skill.icon} alt={skill.name} />
      <span>{skill.name}</span>
    </div>
  );
}

export default SkillCard;
