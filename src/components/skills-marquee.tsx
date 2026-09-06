import { skills } from "@/data/content";

export function SkillsMarquee() {
  const repeated = [...skills, ...skills];
  return <div className="marquee" aria-label="Habilidades"><div className="marquee-track">{repeated.map((skill, i) => <span key={`${skill}-${i}`}><i />{skill}</span>)}</div></div>;
}
