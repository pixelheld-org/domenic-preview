"use client";

import { Check, Info, ExternalLink } from "lucide-react";
import type { SanityPricingItem, SanitySettings, SanityHomePage } from "@/sanity/lib/queries";
import { PricingTable, pricingRowsFromSanity } from "./PricingTable";

const FALLBACK_BADGE = "Transparente Preise";
const FALLBACK_HEADING = "Faire Preise,";
const FALLBACK_HEADING_ACCENT = "spürbare Wirkung";
const FALLBACK_TEXT =
  "Alle Behandlungen werden individuell auf Ihre Bedürfnisse abgestimmt.";
const FALLBACK_WKO_URL =
  "https://www.wko.at/oe/gewerbe-handwerk/fusspfleger-kosmetiker-masseure/tarife-heilmasseure.pdf";

const FALLBACK_INSURANCE_TEXT =
  "Je nach Krankenkasse bekommen Sie einen Teil Ihrer Massagekosten zurück. Sie haben auch die Möglichkeit, einen Teil der Therapiekosten bei einer Zusatzversicherung einzureichen. Privatversicherungen erstatten bis zu 100% der Therapiekosten zurück. Informieren Sie sich jetzt — es lohnt sich!";

export function Pricing({
  sanityPricing,
  sanitySettings,
  homePage,
}: {
  sanityPricing?: SanityPricingItem[] | null;
  sanitySettings?: SanitySettings | null;
  homePage?: SanityHomePage | null;
}) {
  const rows = pricingRowsFromSanity(sanityPricing);
  const insuranceText =
    sanitySettings?.insuranceText ?? FALLBACK_INSURANCE_TEXT;

  const badge = homePage?.pricingBadge ?? FALLBACK_BADGE;
  const heading = homePage?.pricingHeading ?? FALLBACK_HEADING;
  const headingAccent = homePage?.pricingHeadingAccent ?? FALLBACK_HEADING_ACCENT;
  const text = homePage?.pricingText ?? FALLBACK_TEXT;
  const wkoUrl = homePage?.pricingWkoUrl ?? FALLBACK_WKO_URL;

  return (
    <section
      id="preise"
      className="relative py-24 sm:py-32 bg-white overflow-hidden"
    >
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[#0d4f4f]/[0.03] blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#e8654a]/10 px-4 py-1.5 text-sm font-bold text-[#e8654a]">
            {badge}
          </span>
          <h2 className="mt-4 text-[clamp(2rem,4vw,3.5rem)] font-extrabold leading-[1.05] tracking-tight text-[#111]">
            {heading}{" "}
            <span className="text-[#e8654a]">{headingAccent}</span>
          </h2>
          <p className="mt-4 text-lg text-[#555]">{text}</p>
        </div>

        <div className="mt-14 sm:mt-20 max-w-4xl mx-auto">
          <PricingTable rows={rows} />

          {/* Insurance note */}
          <div className="mt-8 flex items-start gap-4 rounded-2xl bg-gradient-to-r from-[#0d4f4f]/[0.06] to-[#0d4f4f]/[0.02] border border-[#0d4f4f]/10 p-6 sm:p-8">
            <div className="flex-shrink-0 mt-0.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0d4f4f]/10">
                <Info size={20} className="text-[#0d4f4f]" />
              </div>
            </div>
            <div>
              <p className="font-bold text-[#111]">
                Zuschüsse von Krankenkassen & Versicherungen
              </p>
              <p className="mt-1 text-sm text-[#555] leading-relaxed">
                {insuranceText}
              </p>
              <a
                href={wkoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-[#0d4f4f] hover:underline"
              >
                Heilmasseur-Zuschüsse nach Kassen
                <ExternalLink size={14} />
              </a>
            </div>
          </div>

          {/* Features */}
          <div className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-3">
            {[
              "Individuell abgestimmt",
              "Keine Vertragsbindung",
              "Flexible Terminvergabe",
            ].map((feat) => (
              <span
                key={feat}
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#555]"
              >
                <Check size={16} className="text-[#0d4f4f]" />
                {feat}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
