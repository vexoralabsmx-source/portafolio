import type { Metadata, Viewport } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { MotionProvider } from "@/components/motion-provider";

import { PageTransition } from "@/components/page-transition";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const space = Space_Grotesk({ subsets: ["latin"], variable: "--font-display", display: "swap" });

export const metadata: Metadata = {
  title: { default: "Miguel Ángel Dorantes Hernández — Digital Designer & Developer", template: "%s — Miguel Ángel Dorantes Hernández" },
  description: "Portafolio de Miguel Ángel Dorantes Hernández, creador digital de Puebla, México. Desarrollo webs premium, plataformas digitales, automatizaciones, UI/UX y experiencias web para marcas y empresas.",
  keywords: ["desarrollo web", "diseño web", "UI UX", "Puebla", "México", "automatizaciones", "páginas web premium", "plataformas digitales", "portafolio web", "Miguel Ángel Dorantes Hernández"],
  authors: [{ name: "Miguel Ángel Dorantes Hernández" }],
  creator: "Miguel Ángel Dorantes Hernández",
  openGraph: { title: "Miguel Ángel Dorantes Hernández — Digital Designer & Developer", description: "Diseño, desarrollo y automatización para marcas que quieren competir en serio.", locale: "es_MX", type: "website" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#080808" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${manrope.variable} ${space.variable}`}>
      <body suppressHydrationWarning><a className="skip-link" href="#contenido">Saltar al contenido</a><MotionProvider><SiteHeader/><PageTransition>{children}</PageTransition><SiteFooter/></MotionProvider></body>
    </html>
  );
}
