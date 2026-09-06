import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "./logo";

export function SiteFooter() {
  return (
    <footer className="site-footer section-shell">
      <div className="footer-top">
        <div><span className="eyebrow">¿Hacemos algo grande?</span><h2>Tu siguiente proyecto<br /><span className="gradient-text">empieza aquí.</span></h2></div>
        <Link className="circle-link" href="/contact"><span>Hablemos</span><ArrowUpRight /></Link>
      </div>
      <div className="footer-bottom">
        <Logo />
        <div className="footer-links"><Link href="/projects">Proyectos</Link><Link href="/services">Servicios</Link><Link href="/about">Sobre mí</Link><Link href="/contact">Contacto</Link></div>
        <p>© {new Date().getFullYear()} Miguel Ángel Dorantes Hernández<br />Puebla, México</p>
      </div>
    </footer>
  );
}
