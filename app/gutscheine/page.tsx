import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { GutscheineFlow } from "@/components/GutscheineFlow";

export const metadata: Metadata = {
  title:
    "Massage-Gutscheine Wien 1080 · sofort als PDF | Heilmasseur Domenic Hacker",
  description:
    "Massage-Gutscheine aus Wien 1080 — sofort als PDF per E-Mail, 3 Jahre gültig. Block-Karten ab 5 Behandlungen mit bis zu 12 % Vorteil oder Einzelgutschein mit frei wählbarem Wert.",
  alternates: {
    canonical: "https://heilmasseur-domenic.at/gutscheine",
  },
};

export default function GutscheinePage() {
  return (
    <>
      <main>
        <GutscheineFlow />
      </main>
      <Footer />
    </>
  );
}
