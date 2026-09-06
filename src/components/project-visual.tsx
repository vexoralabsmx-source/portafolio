import type { Project } from "@/data/projects";

export function ProjectVisual({ project, compact = false }: { project: Project; compact?: boolean }) {
  if (project.slug === "aura-crm" || project.slug === "sendglide") {
    const aura = project.slug === "aura-crm";
    return <div className={`product-art ${aura ? "aura-art" : "send-art"}`}>
      <div className="product-art-label"><span>{aura ? "AURA / CRM" : "SENDGLIDE / WEB APP"}</span><span>0{aura ? "1" : "2"} ↗</span></div>
      {aura ? <div className="aura-window"><aside><b>a.</b><i/><i/><i/><i/></aside><div className="aura-dashboard"><div className="mock-top"><b>Tu próximo gran cierre.</b><span>＋</span></div><p>Todo tu equipo. Una misma dirección.</p><div className="kanban">{["Prospectos", "En conversación", "Cerrado"].map((title,i) => <div key={title}><span><i/>{title}</span>{Array.from({length: i === 1 ? 2 : 3},(_,j) => <div className="kanban-card" key={j}><i/><b/><small/><span/></div>)}</div>)}</div></div></div> : <div className="send-composition"><h3>De aquí.<br/><span>A donde estés.</span></h3><div className="device-flow"><div className="send-device"><span>DISPOSITIVO 01</span><b>↗</b><small>Listo para enviar</small></div><div className="transfer-path"><i/><span>WEBRTC</span><i/></div><div className="send-device receiving"><span>DISPOSITIVO 02</span><b>↓</b><small>Conectado contigo</small></div></div></div>}
      <div className="product-art-bottom"><span>{aura ? "DA CLARIDAD A TUS VENTAS." : "SIN CUENTAS. SIN DISTANCIAS."}</span><small>Vista conceptual</small></div>
    </div>;
  }
  return (
    <div className={`project-visual ${compact ? "compact" : ""}`} style={{ "--project-color": project.color, "--project-accent": project.accent } as React.CSSProperties}>
      <div className="pv-glow" />
      <div className="pv-browser">
        <div className="pv-top"><span><i/><i/><i/></span><b>{project.liveUrl ? new URL(project.liveUrl).hostname : project.name}</b></div>
        <div className="pv-content">
          <span className="pv-label">{project.type}</span>
          <strong>{project.name}</strong>
          <div className="pv-rule" />
          <small>DESIGN × DEVELOPMENT<br/>SELECTED WORK {project.index}</small>
        </div>
      </div>
      <div className="pv-phone"><div><span>{project.index}</span><b>{project.name.slice(0, 3)}</b><i /></div></div>
      <span className="pv-float pv-float-a">{project.tags[0]}</span>
      <span className="pv-float pv-float-b">{project.tags[1]}</span>
    </div>
  );
}
