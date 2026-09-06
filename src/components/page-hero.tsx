import { Reveal } from "./reveal";

export function PageHero({ eyebrow, title, text, children }: { eyebrow: string; title: React.ReactNode; text: string; children?: React.ReactNode }) {
  return (
    <section className="page-hero section-shell">
      <div className="page-hero-glow" />
      <Reveal><span className="eyebrow">{eyebrow}</span><h1>{title}</h1></Reveal>
      <Reveal delay={.15} className="page-hero-bottom"><p>{text}</p>{children}</Reveal>
    </section>
  );
}
