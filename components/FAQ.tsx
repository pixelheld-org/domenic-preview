"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="faq"
      className="relative py-24 sm:py-32 bg-gray-50 overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-[#0d4f4f]/5 blur-3xl" />

      <div className="relative mx-auto max-w-4xl px-5 sm:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <span
            data-edit-id="home-faq-badge"
            className="inline-flex items-center gap-2 rounded-full bg-[#0d4f4f]/8 px-4 py-1.5 text-sm font-bold text-[#0d4f4f]"
          >
            FAQ & Informationen
          </span>
          <h2 className="mt-4 text-[clamp(2rem,4vw,3.5rem)] font-extrabold leading-[1.05] tracking-tight text-[#111]">
            <span data-edit-id="home-faq-heading">Häufig gestellte</span>{" "}
            <span data-edit-id="home-faq-accent" className="text-[#0d4f4f]">
              Fragen
            </span>
          </h2>
        </div>

        <div className="mt-14 rounded-3xl bg-white border border-gray-100 shadow-xl shadow-black/5 px-6 sm:px-10">
          <div className="border-b border-gray-100 last:border-0">
            <button
              onClick={() => setOpenIndex(openIndex === 0 ? null : 0)}
              className="cursor-pointer flex w-full items-center justify-between gap-4 py-6 text-left"
              aria-expanded={openIndex === 0}
            >
              <span data-edit-id="home-faq-1-question" className="text-base sm:text-lg font-bold text-[#111]">
                Wird die Behandlung von der Krankenkasse bezahlt?
              </span>
              <span className={`shrink-0 transition-transform duration-200 ${openIndex === 0 ? "rotate-180" : ""}`}>
                <ChevronDown size={20} className="text-[#0d4f4f]" />
              </span>
            </button>
            {openIndex === 0 && (
              <p data-edit-id="home-faq-1-answer" className="pb-6 text-[#555] leading-relaxed text-sm sm:text-base whitespace-pre-line">
                {"Mit einer ärztlichen Verordnung ist je nach Krankenkasse eine teilweise Rückerstattung möglich. Die Honorarnote können Sie nach der Behandlung bei Ihrer Kasse einreichen.\nPrivate Zusatzversicherungen übernehmen je nach Tarif oft einen Großteil der Kosten, teilweise bis zu 100 %."}
              </p>
            )}
          </div>

          <div className="border-b border-gray-100 last:border-0">
            <button
              onClick={() => setOpenIndex(openIndex === 1 ? null : 1)}
              className="cursor-pointer flex w-full items-center justify-between gap-4 py-6 text-left"
              aria-expanded={openIndex === 1}
            >
              <span data-edit-id="home-faq-2-question" className="text-base sm:text-lg font-bold text-[#111]">
                Wie läuft die Behandlung ab?
              </span>
              <span className={`shrink-0 transition-transform duration-200 ${openIndex === 1 ? "rotate-180" : ""}`}>
                <ChevronDown size={20} className="text-[#0d4f4f]" />
              </span>
            </button>
            {openIndex === 1 && (
              <p data-edit-id="home-faq-2-answer" className="pb-6 text-[#555] leading-relaxed text-sm sm:text-base">
                Zu Beginn besprechen wir kurz Ihre Beschwerden und Ziele. Die Behandlung wird individuell auf Ihre Bedürfnisse abgestimmt. Während der Massage können Sie sich entspannen, während gezielt an Verspannungen gearbeitet wird.
              </p>
            )}
          </div>

          <div className="border-b border-gray-100 last:border-0">
            <button
              onClick={() => setOpenIndex(openIndex === 2 ? null : 2)}
              className="cursor-pointer flex w-full items-center justify-between gap-4 py-6 text-left"
              aria-expanded={openIndex === 2}
            >
              <span data-edit-id="home-faq-3-question" className="text-base sm:text-lg font-bold text-[#111]">
                Brauche ich eine ärztliche Verordnung?
              </span>
              <span className={`shrink-0 transition-transform duration-200 ${openIndex === 2 ? "rotate-180" : ""}`}>
                <ChevronDown size={20} className="text-[#0d4f4f]" />
              </span>
            </button>
            {openIndex === 2 && (
              <p data-edit-id="home-faq-3-answer" className="pb-6 text-[#555] leading-relaxed text-sm sm:text-base whitespace-pre-line">
                {"Für eine Heilmassage ist eine ärztliche Verordnung erforderlich.\nMit Verordnung ist je nach Krankenkasse eine teilweise Rückerstattung möglich.\nSie können aber auch ohne Verordnung einen Termin buchen."}
              </p>
            )}
          </div>

          <div className="border-b border-gray-100 last:border-0">
            <button
              onClick={() => setOpenIndex(openIndex === 3 ? null : 3)}
              className="cursor-pointer flex w-full items-center justify-between gap-4 py-6 text-left"
              aria-expanded={openIndex === 3}
            >
              <span data-edit-id="home-faq-4-question" className="text-base sm:text-lg font-bold text-[#111]">
                Wie oft sollte ich zur Massage kommen?
              </span>
              <span className={`shrink-0 transition-transform duration-200 ${openIndex === 3 ? "rotate-180" : ""}`}>
                <ChevronDown size={20} className="text-[#0d4f4f]" />
              </span>
            </button>
            {openIndex === 3 && (
              <p data-edit-id="home-faq-4-answer" className="pb-6 text-[#555] leading-relaxed text-sm sm:text-base whitespace-pre-line">
                {"Das hängt von Ihren Beschwerden und Zielen ab.\nBei akuten Verspannungen sind mehrere Behandlungen in kürzeren Abständen sinnvoll, z. B. einmal pro Woche.\nFür allgemeines Wohlbefinden und Prävention reicht meist ein Termin alle 2–4 Wochen."}
              </p>
            )}
          </div>

          <div className="border-b border-gray-100 last:border-0">
            <button
              onClick={() => setOpenIndex(openIndex === 4 ? null : 4)}
              className="cursor-pointer flex w-full items-center justify-between gap-4 py-6 text-left"
              aria-expanded={openIndex === 4}
            >
              <span data-edit-id="home-faq-5-question" className="text-base sm:text-lg font-bold text-[#111]">
                Welche Kontraindikationen gibt es?
              </span>
              <span className={`shrink-0 transition-transform duration-200 ${openIndex === 4 ? "rotate-180" : ""}`}>
                <ChevronDown size={20} className="text-[#0d4f4f]" />
              </span>
            </button>
            {openIndex === 4 && (
              <p data-edit-id="home-faq-5-answer" className="pb-6 text-[#555] leading-relaxed text-sm sm:text-base">
                Bei akuten Entzündungen, Fieber, Infektionskrankheiten, Thrombosen oder bestimmten Hauterkrankungen sollte keine Massage durchgeführt werden. Im Zweifelsfall konsultieren Sie bitte Ihren Arzt.
              </p>
            )}
          </div>

          <div className="border-b border-gray-100 last:border-0">
            <button
              onClick={() => setOpenIndex(openIndex === 5 ? null : 5)}
              className="cursor-pointer flex w-full items-center justify-between gap-4 py-6 text-left"
              aria-expanded={openIndex === 5}
            >
              <span data-edit-id="home-faq-6-question" className="text-base sm:text-lg font-bold text-[#111]">
                Was mache ich, wenn ich absagen muss?
              </span>
              <span className={`shrink-0 transition-transform duration-200 ${openIndex === 5 ? "rotate-180" : ""}`}>
                <ChevronDown size={20} className="text-[#0d4f4f]" />
              </span>
            </button>
            {openIndex === 5 && (
              <p data-edit-id="home-faq-6-answer" className="pb-6 text-[#555] leading-relaxed text-sm sm:text-base">
                Bitte sagen Sie Ihren Termin mindestens 24 Stunden vorher ab. Bei kurzfristigen Absagen kann ein Ausfallhonorar anfallen. Kontaktieren Sie mich einfach per Telefon oder E-Mail.
              </p>
            )}
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-[#555]">
          Bitte beachten Sie unsere{" "}
          <a data-edit-id="home-faq-agb-link" href="/agb" className="font-bold text-[#0d4f4f] hover:underline">
            Allgemeinen Geschäftsbedingungen
          </a>{" "}
          vor der Buchung eines Termins.
        </p>
      </div>
    </section>
  );
}
