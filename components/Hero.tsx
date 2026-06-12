import { profile } from "@/lib/portfolio-data";

function isReadyUrl(value: string) {
  return value.startsWith("http") || value.startsWith("/");
}

export function Hero() {
  const resumeHref = isReadyUrl(profile.resume) ? profile.resume : "/resume.pdf";

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-inner">
        <p className="eyebrow">Available for full-stack JavaScript roles</p>
        <h1 id="hero-title">{profile.name}</h1>
        <p className="hero-role">{profile.role}</p>
        <p className="hero-pitch">{profile.pitch}</p>
        <ul className="hero-stack" aria-label="Featured stack">
          {profile.stack.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
        <div className="hero-actions">
          <a className="button button-primary" href="#work">
            View work
          </a>
          <a className="button button-secondary" href={resumeHref} download>
            Download resume
          </a>
        </div>
      </div>
      <div className="proof-panel" aria-label="Portfolio proof points">
        <div>
          <strong>3</strong>
          <span>projects with demo + code</span>
        </div>
        <div>
          <strong>1</strong>
          <span>case study with tradeoffs</span>
        </div>
        <div>
          <strong>API</strong>
          <span>validated contact route</span>
        </div>
      </div>
    </section>
  );
}
