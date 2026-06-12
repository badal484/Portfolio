import { profile } from "@/lib/portfolio-data";

export function Skills() {
  return (
    <section className="skills-band" aria-label="Primary technical skills">
      <div className="skills-track">
        {profile.stack.map((skill) => (
          <span key={skill}>{skill}</span>
        ))}
        <span>REST APIs</span>
        <span>Responsive UI</span>
        <span>Validation</span>
      </div>
    </section>
  );
}
