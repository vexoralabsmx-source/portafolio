import { DESCRIPTION, NAME } from "@/lib/portfolio";

export default function SeoContent() {
  return <p className="sr-only">{NAME}. {DESCRIPTION}</p>;
}
