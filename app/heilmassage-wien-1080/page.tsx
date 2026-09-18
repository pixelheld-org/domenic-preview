import type { Metadata } from "next";
import { JsonLdService } from "@/components/JsonLdService";
import { TreatmentPage } from "@/components/TreatmentPage";

export const metadata: Metadata = {
  title: "Heilmassage Wien 1080 | Praxis Domenic Hacker",
  description:
    "Heilmassage in Wien 1080 (Josefstadt) – gezielt, wirksam und in der richtigen Intensität. Rückenschmerzen, Verspannungen, Nacken & Schulter. Jetzt Termin buchen.",
  alternates: {
    canonical: "https://heilmasseur-domenic.at/heilmassage-wien-1080",
  },
  openGraph: {
    title: "Heilmassage Wien 1080 | Praxis Domenic Hacker",
    description:
      "Heilmassage in Wien 1080 – gezielt, wirksam und in der richtigen Intensität. Jetzt Termin buchen.",
    url: "https://heilmasseur-domenic.at/heilmassage-wien-1080",
    locale: "de_AT",
    type: "website",
  },
};

export default function HeilmassageWien() {
  return (
    <>
      <JsonLdService variant="heilmassage" />
      <TreatmentPage variant="heilmassage" />
    </>
  );
}
