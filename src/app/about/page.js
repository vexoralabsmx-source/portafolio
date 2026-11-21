import PageShell from "@/components/PageShell";
import AboutPage from "@/views/about";

export const metadata = {
  title: "Sobre mí",
  description: "Conoce la trayectoria de Miguel Ángel Dorantes Hernández, diseñador y desarrollador independiente en Puebla.",
};

export default function Page() {
  return (
    <PageShell>
      <style>{`.bottom-blur { display: none !important; }`}</style>
      <AboutPage />
    </PageShell>
  );
}
