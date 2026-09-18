import type { Metadata } from "next";
import { JsonLdService } from "@/components/JsonLdService";
import { TreatmentPage } from "@/components/TreatmentPage";

export const metadata: Metadata = {
  title:
    "Sportmassage Wien 1080 · Regeneration & Performance | Heilmasseur Domenic Hacker",
  description:
    "Sportmassage in Wien 1080 (Josefstadt) — Triggerpunkt-Arbeit, Faszien-Mobilisation und gezielte Regeneration für Hobby- und Wettkampfsportler. Termine online buchen.",
  alternates: {
    canonical: "https://heilmasseur-domenic.at/sportmassage-wien",
  },
  openGraph: {
    title: "Sportmassage Wien 1080 · Regeneration & Performance",
    description:
      "Sportmassage in Wien 1080 — Regeneration, Triggerpunkte, Faszien. Termine online buchen.",
    url: "https://heilmasseur-domenic.at/sportmassage-wien",
    locale: "de_AT",
    type: "website",
  },
};

export default function SportmassageWien() {
  return (
    <>
      <JsonLdService variant="sportmassage" />
      <TreatmentPage variant="sportmassage" />
    </>
  );
}
