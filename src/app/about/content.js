import { SiNextdotjs, SiReact, SiTypescript } from "react-icons/si";
import { TbBrandAdobePhotoshop, TbBrandAdobePremier, TbBrush, TbLayout, TbMovie, TbRobot } from "react-icons/tb";

export const SECTION = { label: "Sobre mí" };
export const HEADING = { line1: "Aprendí", line2: "creando y", line3: "construyendo." };

export const BIO = [
  "Soy *Miguel Ángel Dorantes Hernández*, diseñador y desarrollador independiente de *Puebla, México*. Empecé editando videos y con el tiempo pasé al diseño, las interfaces y el desarrollo web. También edito imágenes en *Adobe Photoshop* y video en *Adobe Premiere Pro*.",
  "Aprendí principalmente de forma autodidacta, con práctica, maestros y proyectos reales. Combino *diseño*, *código* y *automatización* para convertir ideas en experiencias que se pueden usar.",
  "Construyo sitios, plataformas y sistemas para *marcas*, *empresas* y *emprendedores* que quieren mejorar su presencia digital y su operación.",
];

export const RESUME_URL = "https://www.portafoliomike.xyz/about";

export const TECH = [
  { name: "React", icon: SiReact },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "TypeScript", icon: SiTypescript },
  { name: "Automatización", icon: TbRobot },
];

export const CREATIVE = [
  { name: "Diseño UI/UX", icon: TbLayout },
  { name: "Branding", icon: TbBrush },
  { name: "Motion Design", icon: TbMovie },
  { name: "Adobe Photoshop", icon: TbBrandAdobePhotoshop },
  { name: "Adobe Premiere Pro", icon: TbBrandAdobePremier },
];

export const EXPERIENCE = [
  { role: "Instituto Oriente de Puebla", period: "Primaria y secundaria" },
  { role: "Colegio Real de Oriente", period: "Secundaria" },
  { role: "Formación autodidacta", period: "Diseño, desarrollo y automatización" },
];
