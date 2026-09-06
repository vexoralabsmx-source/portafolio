import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

export function ButtonLink({ href, children, variant = "primary", external = false }: { href: string; children: React.ReactNode; variant?: "primary" | "secondary" | "ghost"; external?: boolean }) {
  return <Link className={`button ${variant}`} href={href} {...(external ? { target: "_blank", rel: "noreferrer" } : {})}>{children}{external ? <ArrowUpRight size={17} /> : <ArrowRight size={17} />}</Link>;
}
