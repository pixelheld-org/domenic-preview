"use client";

import { Check, Info, ExternalLink } from "lucide-react";
import { PricingTable } from "./PricingTable";

export function Pricing() {
  return (
    <section
      id="preise"
      className="relative py-24 sm:py-32 bg-white overflow-hidden"
    >
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[#0d4f4f]/[0.03] blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <span
            data-edit-id="home-pricing-badge"
            className="inline-flex items-center gap-2 rounded-full bg-[#e8654a]/10 px-4 py-1.5 text-sm font-bold text-[#e8654a]"
          >
            Transparente Preise
          </span>
          <h2 className="mt-4 text-[clamp(2rem,4vw,3.5rem)] font-extrabold leading-[1.05] tracking-tight text-[#111]">
            <span data-edit-id="home-pricing-heading">Faire Preise.</span>{" "}
            <span data-edit-id="home-pricing-accent" className="text-[#e8654a]">
              Spürbare Wirkung
            </span>
          </h2>
          <p data-edit-id="home-pricing-text" className="mt-4 text-lg text-[#555]">
            Alle Preise beinhalten Vor- und Nachgespräch. Bei der ersten Behandlung nehme ich mir zusätzlich Zeit für eine ausführliche Anamnese.
          </p>
        </div>

        <div className="mt-14 sm:mt-20 max-w-4xl mx-auto">
          <PricingTable />

          <div className="mt-8 flex items-start gap-4 rounded-2xl bg-gradient-to-r from-[#0d4f4f]/[0.06] to-[#0d4f4f]/[0.02] border border-[#0d4f4f]/10 p-6 sm:p-8">
            <div className="flex-shrink-0 mt-0.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0d4f4f]/10">
                <Info size={20} className="text-[#0d4f4f]" />
              </div>
            </div>
            <div>
              <p data-edit-id="home-pricing-insurance-title" className="font-bold text-[#111]">
                Zuschüsse von Krankenkassen & Versicherungen
              </p>
              <p data-edit-id="home-pricing-insurance-text" className="mt-1 text-sm text-[#555] leading-relaxed">
                Je nach Krankenkasse bekommen Sie einen Teil Ihrer Massagekosten zurück. Sie haben auch die Möglichkeit, einen Teil der Therapiekosten bei einer Zusatzversicherung einzureichen. Privatversicherungen erstatten bis zu 100% der Therapiekosten zurück. Informieren Sie sich jetzt — es lohnt sich!
              </p>
              <a
                href="https://www.wko.at/oe/gewerbe-handwerk/fusspfleger-kosmetiker-masseure/tarife-heilmasseure.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-[#0d4f4f] hover:underline"
              >
                <span data-edit-id="home-pricing-wko-link">Heilmasseur-Zuschüsse nach Kassen</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-3">
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#555]">
              <Check size={16} className="text-[#0d4f4f]" />
              <span data-edit-id="home-pricing-feat-1">Individuell abgestimmt</span>
            </span>
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#555]">
              <Check size={16} className="text-[#0d4f4f]" />
              <span data-edit-id="home-pricing-feat-2">Keine Vertragsbindung</span>
            </span>
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#555]">
              <Check size={16} className="text-[#0d4f4f]" />
              <span data-edit-id="home-pricing-feat-3">Flexible Terminvergabe</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
