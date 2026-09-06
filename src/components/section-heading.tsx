import { AnimatedHeading } from "@/components/animated-heading";
import { Reveal } from "./reveal";

export function SectionHeading({ eyebrow, title, text, align = "left" }: { eyebrow: string; title: React.ReactNode; text?: string; align?: "left" | "center" }) {
  return (
    <Reveal className={`section-heading ${align === "center" ? "center" : ""}`}>
      <span className="eyebrow">{eyebrow}</span>
      <AnimatedHeading>{title}</AnimatedHeading>
      {text && <p>{text}</p>}
    </Reveal>
  );
}
