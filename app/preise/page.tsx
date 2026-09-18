import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Footer } from "@/components/Footer";
import { JsonLdOffer } from "@/components/JsonLdOffer";
import { JsonLdService } from "@/components/JsonLdService";
import { FaqJsonLd } from "@/components/FaqJsonLd";
import { PricingTable } from "@/components/PricingTable";
import { BlockCardOverview } from "@/components/BlockCardOverview";
import { KrankenkassenTabelle } from "@/components/KrankenkassenTabelle";

export const metadata: Metadata = {
  title: "Preise — Heilmassage & klassische Massage in Wien 1080",
  description:
    "Transparente Preise für Heilmassage und Sportmassage in Wien 1080. Block-Karten ab 5 Behandlungen mit bis zu 12 % Vorteil. Krankenkassen-Rückerstattung möglich.",
  alternates: {
    canonical: "https://heilmasseur-domenic.at/preise",
  },
  openGraph: {
    title: "Preise — Heilmassage & klassische Massage in Wien 1080",
    description:
      "Transparente Preise für Heilmassage und Sportmassage in Wien 1080. Block-Karten ab 5 Behandlungen mit bis zu 12 % Vorteil.",
    url: "https://heilmasseur-domenic.at/preise",
    locale: "de_AT",
    type: "website",
  },
};

const PREISE_FAQS = [
  {
    q: "Was kostet eine Behandlung bei Domenic Hacker?",
    a: "Eine 30-minütige Behandlung kostet €55, 45 Minuten €70, 60 Minuten €85. Block-Karten gibt es ab 5 Behandlungen mit Vorteil — siehe Tabelle weiter oben.",
  },
  {
    q: "Wie funktionieren Block-Karten?",
    a: "Eine Block-Karte ist ein Vorauskauf mehrerer Behandlungen mit Preisvorteil. Sie wählen Größe (5er oder 10er) und Dauer (30, 45 oder 60 Min) beim Kauf. Beim Einlösen ist die Behandlungsart frei wählbar — Heilmassage oder Sportmassage. Block-Karten sind 3 Jahre gültig.",
  },
  {
    q: "Bekomme ich die Behandlung von der Krankenkasse erstattet?",
    a: "Heilmassage wird von einigen Kassen teilweise erstattet — meist mit ärztlicher Überweisung. Konkrete Beträge finden Sie in der Tabelle weiter oben. Sportmassage ist eine Wellness-Leistung und nicht erstattbar.",
  },
  {
    q: "Sind Gutscheine personalisiert?",
    a: "Auf Wunsch: Beim Kauf können Sie einen Empfänger-Namen angeben, der dann auf dem PDF-Gutschein erscheint. Ohne Angabe ist der Gutschein neutral und übertragbar.",
  },
  {
    q: "Wie bezahle ich?",
    a: "Vor Ort entweder bar oder per Bankomatkarte. Gutscheine werden online via Stripe gekauft (Karte, Apple Pay, Google Pay, SEPA-Lastschrift).",
  },
  {
    q: "Bekomme ich eine Rechnung?",
    a: "Ja, auf Wunsch. Bei Online-Gutschein-Käufen wird die Rechnung automatisch per E-Mail gesendet. Vor Ort einfach Bescheid geben.",
  },
];

export default function PreisePage() {
  return (
    <>
      <JsonLdService />
      <JsonLdOffer />
      <FaqJsonLd faqs={PREISE_FAQS} />
      <main>
        <section className="bg-white">
          <div className="mx-auto max-w-4xl px-5 sm:px-8 pt-28 pb-16 sm:pt-36 sm:pb-24">
            <span
              data-edit-id="preise-hero-badge"
              className="inline-flex items-center gap-2 rounded-full bg-[#e8654a]/10 px-4 py-1.5 text-sm font-bold text-[#e8654a]"
            >
              Transparente Preise
            </span>
            <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-[#111]">
              <span data-edit-id="preise-hero-heading">
                Preise für Heilmassage & klassische Massage
              </span>{" "}
              <span data-edit-id="preise-hero-accent" className="text-[#e8654a]">
                in Wien 1080
              </span>
            </h1>
            <p
              data-edit-id="preise-hero-text"
              className="mt-6 text-lg text-[#555] leading-relaxed max-w-2xl"
            >
              Transparente Preise für individuelle Behandlungen in Wien 1080. Egal ob Heilmassage, klassische Massage, Sportmassage oder Block-Karte — Sie wissen vor der ersten Buchung genau, welche Kosten entstehen. Rückerstattung über Ihre Krankenkasse möglich.
            </p>
          </div>
        </section>

        <section className="bg-[#f0f7f7] py-16 sm:py-24">
          <div className="mx-auto max-w-4xl px-5 sm:px-8">
            <p
              data-edit-id="preise-table-intro"
              className="text-[#555] mb-8 leading-relaxed max-w-2xl"
            >
              Alle Behandlungen werden individuell auf Ihre Bedürfnisse abgestimmt. Die Preise gelten pro Behandlung — Block-Karten sehen Sie weiter unten.
            </p>
            <PricingTable />
          </div>
        </section>

        <BlockCardOverview />
        <KrankenkassenTabelle />

        <section className="py-16 sm:py-24 bg-white">
          <div className="mx-auto max-w-4xl px-5 sm:px-8">
            <h2
              data-edit-id="preise-faq-heading"
              className="text-2xl sm:text-3xl font-extrabold text-[#0d4f4f] mb-3"
            >
              Häufige Fragen zu Preisen
            </h2>
            <p
              data-edit-id="preise-faq-intro"
              className="text-[#555] mb-10 leading-relaxed"
            >
              Antworten auf die Fragen, die mir am häufigsten gestellt werden.
            </p>
            <div className="space-y-3">
              <details className="group rounded-2xl bg-white border border-[#0d4f4f]/10 overflow-hidden">
                <summary className="flex items-center justify-between gap-4 cursor-pointer px-6 py-5 font-semibold text-[#111] text-sm sm:text-base list-none">
                  <span data-edit-id="preise-faq-1-q">Was kostet eine Behandlung bei Domenic Hacker?</span>
                  <ChevronDown size={18} className="text-[#0d4f4f] shrink-0 transition-transform duration-200 group-open:rotate-180" />
                </summary>
                <p data-edit-id="preise-faq-1-a" className="px-6 pb-5 text-sm text-[#555] leading-relaxed border-t border-[#0d4f4f]/5 pt-4">
                  Eine 30-minütige Behandlung kostet €55, 45 Minuten €70, 60 Minuten €85. Block-Karten gibt es ab 5 Behandlungen mit Vorteil — siehe Tabelle weiter oben.
                </p>
              </details>
              <details className="group rounded-2xl bg-white border border-[#0d4f4f]/10 overflow-hidden">
                <summary className="flex items-center justify-between gap-4 cursor-pointer px-6 py-5 font-semibold text-[#111] text-sm sm:text-base list-none">
                  <span data-edit-id="preise-faq-2-q">Wie funktionieren Block-Karten?</span>
                  <ChevronDown size={18} className="text-[#0d4f4f] shrink-0 transition-transform duration-200 group-open:rotate-180" />
                </summary>
                <p data-edit-id="preise-faq-2-a" className="px-6 pb-5 text-sm text-[#555] leading-relaxed border-t border-[#0d4f4f]/5 pt-4">
                  Eine Block-Karte ist ein Vorauskauf mehrerer Behandlungen mit Preisvorteil. Sie wählen Größe (5er oder 10er) und Dauer (30, 45 oder 60 Min) beim Kauf. Beim Einlösen ist die Behandlungsart frei wählbar — Heilmassage oder Sportmassage. Block-Karten sind 3 Jahre gültig.
                </p>
              </details>
              <details className="group rounded-2xl bg-white border border-[#0d4f4f]/10 overflow-hidden">
                <summary className="flex items-center justify-between gap-4 cursor-pointer px-6 py-5 font-semibold text-[#111] text-sm sm:text-base list-none">
                  <span data-edit-id="preise-faq-3-q">Bekomme ich die Behandlung von der Krankenkasse erstattet?</span>
                  <ChevronDown size={18} className="text-[#0d4f4f] shrink-0 transition-transform duration-200 group-open:rotate-180" />
                </summary>
                <p data-edit-id="preise-faq-3-a" className="px-6 pb-5 text-sm text-[#555] leading-relaxed border-t border-[#0d4f4f]/5 pt-4">
                  Heilmassage wird von einigen Kassen teilweise erstattet — meist mit ärztlicher Überweisung. Konkrete Beträge finden Sie in der Tabelle weiter oben. Sportmassage ist eine Wellness-Leistung und nicht erstattbar.
                </p>
              </details>
              <details className="group rounded-2xl bg-white border border-[#0d4f4f]/10 overflow-hidden">
                <summary className="flex items-center justify-between gap-4 cursor-pointer px-6 py-5 font-semibold text-[#111] text-sm sm:text-base list-none">
                  <span data-edit-id="preise-faq-4-q">Sind Gutscheine personalisiert?</span>
                  <ChevronDown size={18} className="text-[#0d4f4f] shrink-0 transition-transform duration-200 group-open:rotate-180" />
                </summary>
                <p data-edit-id="preise-faq-4-a" className="px-6 pb-5 text-sm text-[#555] leading-relaxed border-t border-[#0d4f4f]/5 pt-4">
                  Auf Wunsch: Beim Kauf können Sie einen Empfänger-Namen angeben, der dann auf dem PDF-Gutschein erscheint. Ohne Angabe ist der Gutschein neutral und übertragbar.
                </p>
              </details>
              <details className="group rounded-2xl bg-white border border-[#0d4f4f]/10 overflow-hidden">
                <summary className="flex items-center justify-between gap-4 cursor-pointer px-6 py-5 font-semibold text-[#111] text-sm sm:text-base list-none">
                  <span data-edit-id="preise-faq-5-q">Wie bezahle ich?</span>
                  <ChevronDown size={18} className="text-[#0d4f4f] shrink-0 transition-transform duration-200 group-open:rotate-180" />
                </summary>
                <p data-edit-id="preise-faq-5-a" className="px-6 pb-5 text-sm text-[#555] leading-relaxed border-t border-[#0d4f4f]/5 pt-4">
                  Vor Ort entweder bar oder per Bankomatkarte. Gutscheine werden online via Stripe gekauft (Karte, Apple Pay, Google Pay, SEPA-Lastschrift).
                </p>
              </details>
              <details className="group rounded-2xl bg-white border border-[#0d4f4f]/10 overflow-hidden">
                <summary className="flex items-center justify-between gap-4 cursor-pointer px-6 py-5 font-semibold text-[#111] text-sm sm:text-base list-none">
                  <span data-edit-id="preise-faq-6-q">Bekomme ich eine Rechnung?</span>
                  <ChevronDown size={18} className="text-[#0d4f4f] shrink-0 transition-transform duration-200 group-open:rotate-180" />
                </summary>
                <p data-edit-id="preise-faq-6-a" className="px-6 pb-5 text-sm text-[#555] leading-relaxed border-t border-[#0d4f4f]/5 pt-4">
                  Ja, auf Wunsch. Bei Online-Gutschein-Käufen wird die Rechnung automatisch per E-Mail gesendet. Vor Ort einfach Bescheid geben.
                </p>
              </details>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-24 bg-[#0d4f4f]">
          <div className="mx-auto max-w-2xl px-5 sm:px-8 text-center">
            <h2
              data-edit-id="preise-cta-heading"
              className="text-2xl sm:text-3xl font-extrabold text-white mb-4"
            >
              Bereit für Ihren Termin?
            </h2>
            <p
              data-edit-id="preise-cta-text"
              className="text-white/65 mb-10 leading-relaxed"
            >
              Buchen Sie direkt online — oder verschenken Sie einen Gutschein an jemanden, dem etwas Gutes gut täte.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/buchen"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#e8654a] to-[#f2a93b] px-8 py-4 text-base font-bold text-white shadow-lg shadow-[#e8654a]/30 transition-all duration-200 hover:shadow-xl hover:shadow-[#e8654a]/40 hover:scale-[1.03]"
              >
                <span data-edit-id="preise-cta-book">Termin buchen</span>
                <ArrowRight size={18} strokeWidth={2.5} aria-hidden={true} />
              </Link>
              <Link
                href="/gutscheine"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-8 py-4 text-base font-semibold text-white/80 transition-all duration-200 hover:bg-white/10 hover:text-white"
              >
                <span data-edit-id="preise-cta-voucher">Gutschein verschenken</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
