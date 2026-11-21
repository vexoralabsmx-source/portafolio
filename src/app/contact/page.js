import PageShell from "@/components/PageShell";
import ContactPage from "@/views/contact";

export const metadata = {
  title: "Contacto",
  description: "Cuéntame qué quieres construir y comparte los detalles de tu proyecto digital.",
};

export default function Page() {
  return (
    <PageShell>
      <ContactPage />
    </PageShell>
  );
}
