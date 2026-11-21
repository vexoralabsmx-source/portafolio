import { WHATSAPP_URL } from "@/lib/portfolio";

export default function ContactLinks({ className = "" }) {
  return (
    <address className={`${className} flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium not-italic text-bone/85`}>
      <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">WhatsApp ↗</a>
    </address>
  );
}
