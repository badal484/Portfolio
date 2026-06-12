import { caseStudy } from "@/lib/portfolio-data";

const steps = [
  ["Problem", caseStudy.problem],
  ["Approach", caseStudy.approach],
  ["Tradeoff", caseStudy.tradeoff],
  ["Result", caseStudy.result]
] as const;

export function CaseStudy() {
  return (
    <section className="section case-study" aria-labelledby="case-title">
      <div className="section-heading">
        <p className="eyebrow">How I think</p>
        <h2 id="case-title">{caseStudy.project} case study</h2>
      </div>
      <div className="case-grid">
        {steps.map(([label, text]) => (
          <article key={label} className="case-step">
            <span>{label}</span>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
