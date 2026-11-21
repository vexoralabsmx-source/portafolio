import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { NAME, ROLE, SITE_URL, DESCRIPTION } from "@/lib/portfolio";
import TrackVisit from "@/components/TrackVisit";
import { Analytics } from "@vercel/analytics/next";
import NewsletterPopup from "@/components/NewsletterPopup";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap"
});

export const viewport = { themeColor: "#e1251b" };

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${NAME} — ${ROLE}`, template: `%s — ${NAME}` },
  description: DESCRIPTION,
  authors: [{ name: NAME, url: SITE_URL }],
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: SITE_URL,
    title: `${NAME} — ${ROLE}`,
    description: DESCRIPTION,
    images: ["/photo/miguel-cover.png"],
  },
  icons: { icon: "/photo/miguel-mark.png", apple: "/photo/miguel-mark.png" },
  manifest: "/manifest.webmanifest",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: NAME,
  url: SITE_URL,
  jobTitle: ROLE,
  description: DESCRIPTION,
  address: { "@type": "PostalAddress", addressLocality: "Puebla", addressCountry: "MX" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es-MX" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        {/* ── Resource hints ── */}
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://ip-api.com" />

        {/* ── Structured Data for Google + AI bots ── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* ── LLMs.txt discovery (AI chatbot standard) ── */}
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM-readable site info" />

        {/* ── Custom Search/Keywords XML index for AEO ── */}
        <link rel="search" type="application/xml" href="/searchwords.xml" title="Search Keywords" />

        {/* ── Google Search Console verification ── */}
        {process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION && (
          <meta name="google-site-verification" content={process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION} />
        )}

        {/* ── Bing Webmaster Tools verification ── */}
        {process.env.NEXT_PUBLIC_BING_VERIFICATION && (
          <meta name="msvalidate.01" content={process.env.NEXT_PUBLIC_BING_VERIFICATION} />
        )}
      </head>
      <body suppressHydrationWarning>
        {process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY && <TrackVisit />}
        <div className="bottom-blur" aria-hidden="true" />
        {children}
        <Analytics />
        <NewsletterPopup />
      </body>
    </html>
  );
}

