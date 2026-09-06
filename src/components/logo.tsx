import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="logo" aria-label="Miguel Ángel Dorantes Hernández — Inicio">
      <span className="logo-mark">MÁ</span>
      <span className="logo-copy">MIGUEL ÁNGEL<span>DORANTES HERNÁNDEZ</span></span>
    </Link>
  );
}
