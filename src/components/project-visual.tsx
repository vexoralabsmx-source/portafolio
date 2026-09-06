import { ArrowDown, ArrowUpRight, AudioLines, BookOpen, Check, Code2, Compass, Heart, Layers, LayoutTemplate, MapPin, Music2, Play, Radio, ScanLine, ShieldCheck, SkipBack, SkipForward, Terminal, Users } from "lucide-react";
import type { Project } from "@/data/projects";
import type { CSSProperties } from "react";

const directions: Record<string, { color: string; surface: string; line: string }> = {
  "aura-crm": { color: "#c1a6ff", surface: "#1b1528", line: "DA CLARIDAD A TUS VENTAS." },
  sendglide: { color: "#c5ed8b", surface: "#171d12", line: "SIN CUENTAS. SIN DISTANCIAS." },
  noctra: { color: "#efbc88", surface: "#211613", line: "LA NOCHE TIENE SU PROPIO SONIDO." },
  "vexora-sites": { color: "#c0a1ff", surface: "#1c142d", line: "TU VISIÓN. TU PRÓXIMO SITIO." },
  ovrlmt: { color: "#ff7262", surface: "#241313", line: "BEYOND THE LIMIT. ALWAYS." },
  "vexora-labs": { color: "#99c8ff", surface: "#111d2c", line: "IDEAS QUE SE CONVIERTEN EN SISTEMAS." },
  "vexora-academy": { color: "#beb1ff", surface: "#19162e", line: "APRENDE. CONSTRUYE. SUBE DE NIVEL." },
  anondrop: { color: "#f6a6d2", surface: "#291428", line: "UNA IDEA. MUCHAS CONEXIONES." },
  furei: { color: "#a5d7b3", surface: "#15231f", line: "LA EDUCACIÓN NOS ACERCA." },
  "wayakin-web": { color: "#ecd0a0", surface: "#25231a", line: "LA AVENTURA EMPIEZA AQUÍ." },
  "wayakin-nfc-check": { color: "#92dbd0", surface: "#112522", line: "UN TOQUE. TODO BAJO CONTROL." },
  "wayakin-extended": { color: "#a8caff", surface: "#142033", line: "CADA EQUIPO. UNA MISMA VISIÓN." },
};

function WindowBar({ name }: { name: string }) {
  return <div className="concept-window-bar"><span><i/><i/><i/></span><small>{name}</small><Layers size={10}/></div>;
}
function SkeletonRows() {
  return <div className="concept-rows">{[0,1,2].map(i => <div key={i}><span/><i/><b/></div>)}</div>;
}

function ProjectComposition({ slug }: { slug: string }) {
  switch (slug) {
    case "aura-crm": return <div className="aura-window"><aside><b>a.</b><i/><i/><i/><i/></aside><div className="aura-dashboard"><div className="mock-top"><b>Tu próximo gran cierre.</b><span>＋</span></div><p>Todo tu equipo. Una misma dirección.</p><div className="kanban">{["Prospectos", "En conversación", "Cerrado"].map((title,i) => <div key={title}><span><i/>{title}</span>{Array.from({length:i===1?2:3},(_,j)=><div className="kanban-card" key={j}><i/><b/><small/><span/></div>)}</div>)}</div></div></div>;
    case "sendglide": return <div className="send-composition"><h3>De aquí.<br/><span>A donde estés.</span></h3><div className="device-flow"><div className="send-device"><span>DISPOSITIVO 01</span><ArrowUpRight/><small>Listo para enviar</small></div><div className="transfer-path"><i/><span>WEBRTC</span><i/></div><div className="send-device receiving"><span>DISPOSITIVO 02</span><ArrowDown/><small>Conectado contigo</small></div></div></div>;
    case "noctra": return <div className="music-scene"><div className="album-art"><span>NOCTRA / PRIVATE LISTENING</span><div className="vinyl"><i/></div><strong>After<br/><em>hours.</em></strong></div><div className="music-player"><span className="concept-kicker"><AudioLines size={12}/> TU ESPACIO SONORO</span><h3>Tu noche.<br/>Tu frecuencia.</h3><div className="music-track"><Music2 size={16}/><div><b>Night Drive</b><small>Selección personal</small></div><Heart size={13}/></div><div className="waveform">{Array.from({length:24},(_,i)=><i key={i} style={{height:`${16+(i*17%34)}px`,animationDelay:`${i*-.09}s`}}/>)}</div><div className="player-controls"><SkipBack size={15}/><span><Play size={16} fill="currentColor"/></span><SkipForward size={15}/></div><small className="music-library">BIBLIOTECA · PLAYLISTS · FAVORITOS</small></div></div>;
    case "vexora-sites": return <div className="builder-window"><WindowBar name="VEXORA / VISUAL STUDIO"/><div className="builder-body"><aside><span>PÁGINAS</span>{["Inicio","Servicios","Nosotros"].map((x,i)=><div key={x} className={i===0?"selected":""}><LayoutTemplate size={10}/>{x}</div>)}<small>+ Nueva página</small></aside><div className="builder-canvas"><span>YOUR NEXT CHAPTER</span><h3>Hazlo<br/><em>extraordinario.</em></h3><div className="builder-cards"><i/><i/><i/></div><div className="selection-handle"/></div><div className="builder-tools"><Layers size={12}/><i/><i/><i/><i/></div></div><div className="builder-bottom"><span><Check size={10}/> Tu visión, en cada página</span><b>DESKTOP / MOBILE</b></div></div>;
    case "ovrlmt": return <div className="fashion-scene"><div className="racing-stripes"/><span className="fashion-edition">INDEPENDENT STREETWEAR / VOL. 01</span><strong>OVR<br/><span>LMT®</span></strong><div className="fashion-seal">NO<br/>LIMITS<ArrowUpRight size={24}/></div><div className="fashion-footer"><span>IDENTIDAD / CULTURA / MOVIMIENTO</span><div className="barcode"/></div></div>;
    case "vexora-labs": return <div className="labs-scene"><div className="labs-title"><span className="concept-kicker">VEXORA LABS / DIGITAL SYSTEMS</span><h3>Del “¿y si…?”<br/><em>al “ya funciona”.</em></h3></div><div className="labs-nodes"><span><Code2/>Web</span><i/><span className="labs-core"><Layers/>V</span><i/><span><Terminal/>Bots</span></div><div className="terminal-line"><span>›</span> conectando ideas con posibilidades<i/></div></div>;
    case "vexora-academy": return <div className="academy-window"><WindowBar name="VEXORA ACADEMY / LEARNING PATH"/><div className="academy-main"><div><span className="concept-kicker">TU SIGUIENTE NIVEL</span><h3>Aprender.<br/>Hacer. Repetir.</h3><div className="learning-progress"><i/></div><small>UN RETO A LA VEZ</small></div><div className="course-stack"><div><BookOpen size={17}/><span>Fundamentos web<small>Ruta de aprendizaje</small></span><Check size={12}/></div><div><Code2 size={17}/><span>Construye tu idea<small>Proyecto práctico</small></span><ArrowUpRight size={12}/></div><div><Layers size={17}/><span>El siguiente paso<small>Sigue explorando</small></span><ArrowUpRight size={12}/></div></div></div></div>;
    case "anondrop": return <div className="drop-scene"><div className="drop-orbit"/><div className="drop-card"><span>ANONDROP / CONNECT</span><div className="drop-symbol"><ArrowDown size={50}/></div><h3>Haz que<br/><em>pase algo.</em></h3><div className="drop-pill">DESCUBRE · CONECTA · COMPARTE <ArrowUpRight size={12}/></div></div><span className="drop-tag"><Radio size={13}/> Una idea en movimiento</span></div>;
    case "furei": return <div className="foundation-scene"><div className="foundation-copy"><span className="concept-kicker">FUREI / COMUNIDAD</span><h3>El futuro<br/>se aprende<br/><em>en comunidad.</em></h3><span className="foundation-link">EDUCACIÓN QUE CONECTA <ArrowUpRight size={13}/></span></div><div className="community-art"><div className="community-circle c-one"><BookOpen/></div><div className="community-circle c-two"><Heart/></div><div className="community-circle c-three"><Users/></div><span>CRECER JUNTOS.</span></div></div>;
    case "wayakin-web": return <div className="camp-scene"><span className="concept-kicker">WAYAKIN / CAMPAMENTO</span><h3>Desconecta.<br/><em>Vuelve a descubrir.</em></h3><div className="camp-landscape"><div className="camp-sun"/><div className="mountain mountain-back"/><div className="mountain mountain-front"/><div className="camp-tent"><i/></div><span className="camp-pin"><MapPin size={11}/> NOS VEMOS AFUERA</span></div><span className="camp-coordinate"><Compass size={12}/> NATURALEZA · COMUNIDAD · AVENTURA</span></div>;
    case "wayakin-nfc-check": return <div className="nfc-scene"><div className="nfc-phone"><div className="phone-notch"/><span>WAYAKIN / CHECK</span><div className="scan-orbits"><ScanLine size={38}/></div><b>Todo listo.</b><small>Acceso identificado</small><div className="check-status"><ShieldCheck size={13}/> Registro seguro</div></div><div className="nfc-copy"><span className="concept-kicker">OPERACIÓN SIN FRICCIÓN</span><h3>Acerca.<br/>Registra.<br/><em>Continúa.</em></h3><span className="nfc-chip"><Radio size={14}/> NFC CHECK-IN</span></div></div>;
    case "wayakin-extended": return <div className="operations-window"><WindowBar name="WAYAKIN / OPERATIONS"/><div className="operations-body"><div className="operations-map"><span>VISTA GENERAL</span><svg viewBox="0 0 240 150" fill="none"><path d="M-20 110Q50 10 110 90T260 25M-10 20Q120 170 240 60" stroke="currentColor" strokeWidth="16" opacity=".08"/><path d="M40 90L110 40 180 100" stroke="currentColor" strokeDasharray="4 5"/><circle cx="40" cy="90" r="7" fill="currentColor"/><circle cx="110" cy="40" r="7" fill="currentColor"/><circle cx="180" cy="100" r="7" fill="currentColor"/></svg><div className="map-label"><MapPin size={11}/> Equipos conectados</div></div><div className="operations-list"><span className="concept-kicker">TODO EN SU LUGAR</span><h3>Una operación.<br/><em>Muchas conexiones.</em></h3><SkeletonRows/><span className="ops-status"><i/> Personas · Rutas · Actividad</span></div></div></div>;
    default: return <div className="labs-scene"><h3>{slug}</h3></div>;
  }
}

export function ProjectVisual({ project, compact = false }: { project: Project; compact?: boolean }) {
  const direction = directions[project.slug] ?? {color:project.color,surface:"#191919",line:project.type};
  return <div className={`product-art concept-art art-${project.slug} ${compact ? "compact" : ""}`} style={{"--art-accent":direction.color,"--art-surface":direction.surface} as CSSProperties}>
    <div className="product-art-label"><span>{project.name.toUpperCase()} / {project.category.toUpperCase()}</span><span>{project.index} ↗</span></div>
    <div className="concept-stage" aria-hidden="true"><ProjectComposition slug={project.slug}/></div>
    <div className="product-art-bottom"><span>{direction.line}</span><small>Vista conceptual</small></div>
  </div>;
}
