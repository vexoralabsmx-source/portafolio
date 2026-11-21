import Link from "next/link";

export const metadata = {
  title:       "404 — Página no encontrada",
  description: "La página que buscas no existe.",
  robots:      { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main
      className="min-h-screen flex flex-col justify-center items-center bg-[#080808] px-10"
      aria-labelledby="not-found-heading"
    >
      <p className="text-[11px] text-[#e1251b] tracking-[0.45em] uppercase mb-6 font-medium">
        404
      </p>

      <h1
        id="not-found-heading"
        className="font-black text-bone tracking-tighter leading-[0.88] text-center mb-8"
        style={{ fontSize: "clamp(4rem, 14vw, 10rem)" }}
      >
        Perdido<br />
        <span className="text-bone/15">en el espacio</span>
      </h1>

      <p className="text-bone/40 text-sm mb-12 text-center max-w-xs leading-relaxed">
        La página que buscas no existe.
      </p>

      <Link
        href="/"
        className="flex items-center gap-3 px-8 py-3 border border-[#e1251b]/50 text-[#e1251b] text-[11px] uppercase tracking-[0.32em] rounded-full hover:bg-[#e1251b] hover:text-black transition-all duration-500 group"
      >
        <svg
          width="14" height="14" viewBox="0 0 14 14" fill="none"
          aria-hidden="true"
          className="transition-transform duration-300 group-hover:-translate-x-1"
        >
          <path d="M9 11L4 7l5-4" stroke="currentColor" strokeWidth="1.5"
            strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Volver al inicio
      </Link>
    </main>
  );
}
