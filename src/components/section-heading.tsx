import { Reveal } from "./reveal";

export function SectionHeading({ eyebrow, title, text, align = "left" }: { eyebrow: string; title: React.ReactNode; text?: string; align?: "left" | "center" }) {
  return (
    <Reveal className={`section-heading ${align === "center" ? "center" : ""}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </Reveal>
  );
}
