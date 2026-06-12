import { projects } from "@/lib/portfolio-data";

function hrefFor(url: string) {
  return url.startsWith("http") ? url : `mailto:${encodeURIComponent(url)}`;
}

export function Projects() {
  return (
    <section className="section" id="work" aria-labelledby="work-title">
      <div className="section-heading">
        <p className="eyebrow">Proof of work</p>
        <h2 id="work-title">Projects that show shipping, not just syntax.</h2>
        <p>
          Replace the TODO content with your strongest deployed work. Keep each metric concrete
          enough that a recruiter understands the outcome immediately.
        </p>
      </div>
      <div className="project-grid">
        {projects.map((project) => (
          <article className="project-card" key={project.name}>
            <p className="metric">{project.impact}</p>
            <h3>{project.name}</h3>
            <p>{project.summary}</p>
            <ul className="tech-list" aria-label={`${project.name} technologies`}>
              {project.tech.map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>
            <div className="card-actions">
              <a href={hrefFor(project.demoUrl)} target="_blank" rel="noreferrer">
                Live demo
              </a>
              <a href={hrefFor(project.codeUrl)} target="_blank" rel="noreferrer">
                GitHub code
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
