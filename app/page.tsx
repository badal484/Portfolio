import { CaseStudy } from "@/components/CaseStudy";
import { ContactForm } from "@/components/ContactForm";
import { ContactLinks } from "@/components/ContactLinks";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to main content
      </a>
      <main id="main">
        <Hero />
        <Skills />
        <Projects />
        <CaseStudy />
        <section className="section contact-section" id="contact" aria-labelledby="contact-title">
          <div className="section-heading">
            <p className="eyebrow">Low-friction contact</p>
            <h2 id="contact-title">Send a message or open a profile.</h2>
            <p>
              The form posts to a Next API route with client and server validation, so the site
              demonstrates the full-stack path recruiters care about.
            </p>
          </div>
          <div className="contact-grid">
            <ContactForm />
            <ContactLinks />
          </div>
        </section>
      </main>
    </>
  );
}
