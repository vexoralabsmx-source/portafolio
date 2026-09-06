export type Project = {
  slug: string;
  liveUrl?: string;
  name: string;
  type: string;
  category: "Webs" | "Plataformas" | "Educación" | "Sistemas" | "Branding";
  description: string;
  challenge: string;
  solution: string;
  result: string;
  tags: string[];
  features: string[];
  tech: string[];
  color: string;
  accent: string;
  index: string;
};

export const projects: Project[] = [
{
  "slug": "aura-crm",
  "liveUrl": "https://auracrm.xyz",
  "name": "AuraCRM",
  "type": "CRM / Gestión comercial",
  "category": "Plataformas",
  "description": "Clientes, oportunidades y tareas en un solo lugar. Una plataforma comercial gratuita para dar claridad al proceso de ventas.",
  "challenge": "Reunir el seguimiento de clientes, las oportunidades y las tareas del equipo en una experiencia fácil de usar.",
  "solution": "Una plataforma con pipeline visual, directorio de contactos, recordatorios y reportes comerciales.",
  "result": "Un espacio centralizado para organizar el trabajo comercial y dar seguimiento a cada oportunidad.",
  "tags": [
    "CRM",
    "Producto digital",
    "Dashboard",
    "Ventas"
  ],
  "features": [
    "Pipeline visual de ventas",
    "Directorio de contactos",
    "Tareas y recordatorios",
    "Importación y exportación CSV"
  ],
  "tech": [
    "Pipeline visual",
    "Gestión comercial",
    "Reportes",
    "CSV"
  ],
  "color": "#9a87ff",
  "accent": "#ded7ff",
  index: "01"
},
{
  "slug": "sendglide",
  "liveUrl": "https://sendglide.xyz",
  "name": "SendGlide",
  "type": "Transferencia directa / Web app",
  "category": "Plataformas",
  "description": "Tus dispositivos, conectados. Comparte archivos, fotos, texto y enlaces desde el navegador, sin crear una cuenta.",
  "challenge": "Facilitar el intercambio entre dispositivos sin instalaciones ni registros que interrumpan el flujo.",
  "solution": "Conexión mediante QR o código temporal y transferencias cifradas por WebRTC, con conexión directa cuando la red lo permite.",
  "result": "Una experiencia de transferencia desde el navegador: conecta otro dispositivo, elige tu archivo y compártelo.",
  "tags": [
    "Web App",
    "WebRTC",
    "Transferencias",
    "Multidispositivo"
  ],
  "features": [
    "Conexión con QR o código",
    "Archivos, fotos y enlaces",
    "Transferencia por WebRTC",
    "Sin cuenta ni instalación"
  ],
  "tech": [
    "WebRTC",
    "Peer-to-peer",
    "QR",
    "Navegador"
  ],
  "color": "#c5f76c",
  "accent": "#e7ffd3",
  index: "02"
},
{
  "slug": "noctra",
  "liveUrl": "https://noctra.website",
  "name": "Noctra",
  "type": "App de música / Escucha privada",
  "category": "Plataformas",
  "description": "Tu música, a tu ritmo. Una experiencia de escucha con biblioteca, playlists e historial en una interfaz de inspiración nocturna.",
  "challenge": "Organizar la experiencia musical alrededor de la escucha, con acceso claro a la biblioteca y las selecciones personales.",
  "solution": "Una app musical con reproductor, playlists, favoritos e historial, reunidos en una interfaz oscura que da protagonismo a la música.",
  "result": "Un espacio personal para explorar la biblioteca y volver a tus selecciones musicales.",
  "tags": [
    "Música",
    "Web App",
    "UI/UX",
    "Biblioteca"
  ],
  "features": [
    "Reproductor musical",
    "Biblioteca y playlists",
    "Historial de escucha",
    "Selección de favoritos"
  ],
  "tech": [
    "Reproductor",
    "Biblioteca",
    "Playlists",
    "Cuenta local"
  ],
  "color": "#dc9b64",
  "accent": "#ffe0bc",
  index: "03"
},
{
  "slug": "vexora-sites",
  "liveUrl": "https://vexorasites.shop",
  "name": "VexoraSites",
  "type": "Editor visual / Sitios multipágina",
  "category": "Plataformas",
  "description": "Un estudio visual para crear sitios multipágina. Plantillas, contenido y movimiento dentro de un mismo flujo de edición.",
  "challenge": "Convertir las decisiones de estructura, contenido y diseño de un sitio web en un proceso comprensible.",
  "solution": "Un editor visual con páginas, secciones, direcciones creativas y controles responsive para construir una presencia digital completa.",
  "result": "Un flujo continuo para elegir una dirección visual, editar el contenido y preparar un sitio multipágina.",
  "tags": [
    "Editor visual",
    "Web Builder",
    "Multipágina",
    "Motion"
  ],
  "features": [
    "Editor de páginas y secciones",
    "Plantillas con dirección visual",
    "Vistas responsive",
    "Gestión de medios"
  ],
  "tech": [
    "Editor visual",
    "Multipágina",
    "Responsive",
    "Cloudinary"
  ],
  "color": "#ac8bfa",
  "accent": "#e9ddff",
  index: "04"
},
  {
    slug: "ovrlmt",
    liveUrl: "https://ovrlmt.xyz/",
    name: "OVRLMT",
    type: "Marca streetwear / web premium",
    category: "Branding",
    description: "Marca streetwear con estética nocturna, inspiración motorsport y storytelling visual para drops, identidad y comunidad.",
    challenge: "Transformar una identidad urbana en una experiencia digital reconocible, rápida y preparada para generar expectativa alrededor de cada drop.",
    solution: "Un concepto e-commerce editorial con dirección de arte nocturna, tipografía expresiva, motion preciso y un sistema de lanzamiento por colecciones.",
    result: "Una presencia digital con carácter propio, lista para comunicar lanzamientos y posicionar la marca con una percepción premium.",
    tags: ["Branding", "Web Design", "Streetwear", "3D Motion", "E-commerce Concept"],
    features: ["Drop countdown", "Lookbook inmersivo", "Sistema de colecciones", "Motion direction"],
    tech: ["Next.js", "Motion", "Headless Commerce", "3D CSS"],
    color: "#e1251b",
    accent: "#f3efe7",
    index: "05",
  },
  {
    slug: "vexora-labs",
    liveUrl: "https://vexoralabs.shop/",
    name: "Vexora Labs",
    type: "Agencia digital",
    category: "Webs",
    description: "Web para presentar desarrollo, bots, automatizaciones, branding, servidores y soluciones digitales para negocios y creadores.",
    challenge: "Ordenar una oferta técnica amplia y convertirla en una propuesta clara, confiable y fácil de contratar.",
    solution: "Una arquitectura modular estilo SaaS que conecta capacidades, casos de uso y llamadas a la acción en una narrativa comercial directa.",
    result: "Un escaparate profesional que convierte servicios complejos en soluciones comprensibles y accionables.",
    tags: ["Agency", "Web Design", "Automation", "Digital Services", "SaaS Style"],
    features: ["Catálogo de soluciones", "Casos de uso", "Cotizador guiado", "Sistema visual modular"],
    tech: ["React", "TypeScript", "APIs", "Motion"],
    color: "#e1251b",
    accent: "#8b8d91",
    index: "06",
  },
  {
    slug: "vexora-academy",
    liveUrl: "https://vexoralabsacademy.xyz/",
    name: "Vexora Academy",
    type: "Plataforma educativa",
    category: "Educación",
    description: "Plataforma educativa enfocada en rutas de aprendizaje, cursos, XP, progreso, retos y formación tecnológica práctica.",
    challenge: "Hacer que aprender tecnología se sienta progresivo, medible y motivador sin saturar al estudiante.",
    solution: "Un dashboard de aprendizaje gamificado con rutas, niveles, misiones y feedback de progreso en cada interacción.",
    result: "Una experiencia educativa clara que transforma contenido disperso en un sistema de avance continuo.",
    tags: ["EdTech", "Dashboard", "Gamification", "Platform", "Learning"],
    features: ["Rutas de aprendizaje", "XP y niveles", "Retos prácticos", "Panel de progreso"],
    tech: ["Next.js", "Database", "Auth", "Gamification"],
    color: "#b42318",
    accent: "#d0d0d0",
    index: "07",
  },
  {
    slug: "anondrop",
    liveUrl: "https://anondrop.online/",
    name: "AnonDrop",
    type: "Web promocional",
    category: "Webs",
    description: "Proyecto promocional con QR, presencia social y estética comercial para presentar una idea digital de forma directa y moderna.",
    challenge: "Explicar el concepto en segundos y llevar al usuario desde el impacto visual hasta una acción concreta.",
    solution: "Landing compacta con jerarquía fuerte, activaciones QR, contenido social y una experiencia mobile-first.",
    result: "Una pieza promocional lista para campañas, eventos y difusión orgánica.",
    tags: ["Landing Page", "Promo", "Digital Product", "Social"],
    features: ["Experiencia QR", "Social linking", "Mobile first", "Campañas medibles"],
    tech: ["React", "Analytics", "QR", "Responsive UI"],
    color: "#e1251b",
    accent: "#6f7074",
    index: "08",
  },
  {
    slug: "furei",
    liveUrl: "https://somosfureimx.org/",
    name: "FUREI",
    type: "Fundación / educación",
    category: "Educación",
    description: "Web para una fundación enfocada en educación gratuita, comunidad, talleres, apoyo y recursos digitales.",
    challenge: "Comunicar impacto social, facilitar el acceso a recursos y construir confianza con públicos muy distintos.",
    solution: "Una plataforma accesible con programas claros, recursos organizados y recorridos específicos para alumnos, voluntarios y aliados.",
    result: "Una base digital incluyente que amplifica la misión y vuelve más fácil participar.",
    tags: ["Nonprofit", "Education", "Community", "Web Platform"],
    features: ["Directorio de recursos", "Talleres", "Comunidad", "Registro de aliados"],
    tech: ["Next.js", "CMS", "Accessibility", "Forms"],
    color: "#c8352b",
    accent: "#f3efe7",
    index: "09",
  },
  {
    slug: "wayakin-web",
    liveUrl: "https://wayakin.com.mx/",
    name: "Wayakin Web",
    type: "Web informativa",
    category: "Webs",
    description: "Página principal para campamento con enfoque visual, información clara, fechas, contacto y presentación profesional.",
    challenge: "Transmitir la experiencia del campamento y resolver rápidamente las preguntas de madres, padres y campers.",
    solution: "Un sitio visual y cálido con recorridos por actividades, fechas, preguntas frecuentes y contacto inmediato.",
    result: "Una presencia profesional que reduce fricción y convierte interés en registros.",
    tags: ["Camp", "Informational Website", "UX", "Landing Page"],
    features: ["Calendario", "Galería", "FAQ", "Conversión a WhatsApp"],
    tech: ["Next.js", "CMS", "SEO", "Responsive"],
    color: "#e1251b",
    accent: "#a5a5a5",
    index: "10",
  },
  {
    slug: "wayakin-nfc-check",
    name: "Wayakin NFC Check",
    type: "Sistema web interno",
    category: "Sistemas",
    description: "Sistema de registro, check-in/out, control de campers, alergias y NFC para mejorar la operación del campamento.",
    challenge: "Reemplazar procesos manuales sensibles por un flujo rápido y confiable para el equipo operativo.",
    solution: "Un panel responsive conectado a identificadores NFC, alertas médicas y estados en tiempo real.",
    result: "Menos pasos manuales, información centralizada y mayor seguridad durante entradas y salidas.",
    tags: ["Web App", "NFC", "Dashboard", "Operations", "Internal System"],
    features: ["Check-in NFC", "Alertas de alergias", "Roles operativos", "Historial de actividad"],
    tech: ["React", "NFC", "Database", "Realtime"],
    color: "#9f211a",
    accent: "#e8e3da",
    index: "11",
  },
  {
    slug: "wayakin-extended",
    name: "Wayakin Extended",
    type: "Plataforma de gestión",
    category: "Plataformas",
    description: "Versión extendida con rastreo, módulos avanzados, control operativo y gestión completa de campers.",
    challenge: "Conectar múltiples áreas de operación en una sola fuente de información fácil de supervisar.",
    solution: "Una plataforma por módulos con tracking, perfiles, reportes y vistas específicas para cada responsable.",
    result: "Una operación más visible, coordinada y preparada para escalar a nuevos grupos y temporadas.",
    tags: ["Platform", "Management", "Tracking", "Operations", "Dashboard"],
    features: ["Tracking por módulos", "Gestión de campers", "Reportes", "Control operativo"],
    tech: ["Next.js", "Realtime DB", "Maps", "Role Access"],
    color: "#e1251b",
    accent: "#737477",
    index: "12",
  },
];

export const projectCategories = ["Todos", "Webs", "Plataformas", "Educación", "Sistemas", "Branding"] as const;

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
