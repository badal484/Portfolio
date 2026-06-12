import { profile } from "@/lib/portfolio-data";

function externalHref(value: string) {
  return value.startsWith("http") ? value : `mailto:${encodeURIComponent(value)}`;
}

export function ContactLinks() {
  return (
    <aside className="contact-links" aria-label="Direct contact links">
      <h3>Direct links</h3>
      <a href={`mailto:${profile.email}`}>{profile.email}</a>
      <a href={externalHref(profile.github)} target="_blank" rel="noreferrer">
        GitHub
      </a>
      <a href={externalHref(profile.linkedin)} target="_blank" rel="noreferrer">
        LinkedIn
      </a>
      <p>
        TODO: Replace every profile value in <code>lib/portfolio-data.ts</code> before publishing.
      </p>
    </aside>
  );
}
