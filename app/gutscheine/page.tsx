import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { GutscheineFlow } from "@/components/GutscheineFlow";
import { getBlockPricing, getGutscheinePage } from "@/sanity/lib/queries";

export async function generateMetadata(): Promise<Metadata> {
  const cms = await getGutscheinePage();
  return {
    title:
      cms?.seoTitle ??
      "Massage-Gutscheine Wien 1080 · sofort als PDF | Heilmasseur Domenic Hacker",
    description:
      cms?.seoDescription ??
      "Massage-Gutscheine aus Wien 1080 — sofort als PDF per E-Mail, 3 Jahre gültig. Block-Karten ab 5 Behandlungen mit bis zu 12 % Vorteil oder Einzelgutschein mit frei wählbarem Wert.",
    alternates: {
      canonical: "https://heilmasseur-domenic.at/gutscheine",
    },
  };
}

export default async function GutscheinePage() {
  const [cms, pricing] = await Promise.all([
    getGutscheinePage(),
    getBlockPricing(),
  ]);
  return (
    <>
      <main>
        <GutscheineFlow cms={cms} pricing={pricing} />
      </main>
      <Footer />
    </>
  );
}
