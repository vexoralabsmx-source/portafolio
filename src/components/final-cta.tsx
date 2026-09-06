import { ButtonLink } from "./button-link";
import { Reveal } from "./reveal";
import { WhatsAppLink } from "./whatsapp-link";

export function FinalCTA() {
  return (
    <section className="final-cta section-shell">
      <Reveal className="final-cta-inner">
        <div className="cta-grid" /><span className="eyebrow">DISPONIBLE PARA NUEVOS PROYECTOS</span>
        <h2>Construyamos una presencia digital <span className="gradient-text">imposible de ignorar.</span></h2>
        <p>Trabajo con marcas, empresas y fundadores que entienden que su producto digital también define cuánto vale su marca.</p>
        <div className="button-row"><ButtonLink href="/contact">Cotizar proyecto</ButtonLink><ButtonLink href="/projects" variant="ghost">Ver proyectos</ButtonLink><WhatsAppLink className="button ghost" /></div>
      </Reveal>
    </section>
  );
}
