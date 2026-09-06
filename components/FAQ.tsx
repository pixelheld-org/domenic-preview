"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { SanityFaqItem } from "@/sanity/lib/queries";

const FALLBACK_FAQS = [
  {
    question: "Der erste Schritt zur Heilmassage",
    answer:
      "Vor Beginn Ihrer Therapie benötigen Sie eine ärztliche Verordnung von Ihrem Hausarzt oder Facharzt. Bitte bringen Sie diese zur Erstbehandlung mit. Sie erhalten am Ende Ihrer Therapie eine Honorarnote von mir, die Sie gemeinsam mit Ihrer Verordnung bei Ihrer Krankenkasse einreichen können.\n\nGemäß den Tarifbestimmungen Ihrer Krankenkasse erhalten Sie einen Teil Ihrer Therapiekosten zurückerstattet. Sie haben auch die Möglichkeit, einen Teil der Therapiekosten bei einer Zusatzversicherung einzureichen. Privatversicherungen erstatten bis zu 100% der Therapiekosten zurück.",
  },
  {
    question: "Wie beginnt die Therapie?",
    answer:
      "In Ihrer ersten Sitzung möchte ich Sie besser kennenlernen, daher beginnen wir mit einem kurzen Kundenfragebogen. Während des Befundungsgesprächs werden wir anschließend die Bereiche besprechen, in denen Sie Schmerzen und/oder Verspannungen verspüren. Bitte halten Sie hierfür alle relevanten Befunde bereit. Dadurch habe ich die Möglichkeit, mit Ihnen die perfekte Therapie zu planen und auf Sie genau abzustimmen.",
  },
  {
    question: "Was passiert während einer Massage?",
    answer:
      "Legen/setzen Sie sich in eine bequeme Position. Je nach Beschwerden und Therapie kann diese immer anders aussehen, hierbei berate ich Sie gerne. Währenddessen werden Ihre Arme/Beine/usw. bei Bedarf vorsichtig bewegt. Geben Sie mir gerne Bescheid, wenn Sie in einem bestimmten Bereich mehr oder weniger Druck benötigen.\n\nBitte beachten Sie auch, dass eine Massage in seltenen Fällen zu Schwindelgefühlen führen kann, da Flüssigkeiten im Körper bewegt werden. Nehmen Sie sich daher im Anschluss bitte Zeit, um langsam aufzusitzen. Es wird empfohlen, reichlich Flüssigkeit zu sich zu nehmen.",
  },
  {
    question: "Was brauche ich daheim? (Mobile Massage)",
    answer:
      "Ich komme gerne mit meiner persönlichen Massageliege zu Ihnen. Auch nehme ich das Massageöl, ein Laken und Handtücher mit. Sollten Sie Ihre eigenen bevorzugen oder sogar eine Liege besitzen, können Sie mir das gerne vor dem Termin mitteilen. Das einzige worum Sie gebeten werden, ist die Wahl eines Ortes, an dem ich genug Platz habe, um alles aufbauen zu können und in dem Sie voll und ganz zur Ruhe kommen können.",
  },
  {
    question: "Wie oft kann ich einen Termin buchen?",
    answer:
      "Jeder Körper ist anders und jede Situation ist anders. Wenn Sie nicht regelmäßig Schmerzen haben, reicht in der Regel eine Massage alle 3\u20134 Wochen für die meisten Kunden aus. Wenn Sie eine Erkrankung haben, die häufiger behandelt werden muss, können wir abgestimmt mit Ihrer Diagnose einen Zeitplan ausarbeiten, der für Sie funktioniert.",
  },
  {
    question: "Welche Kontraindikationen gibt es?",
    answer:
      "Bei der Terminvereinbarung informieren Sie mich bitte über mögliche Kontraindikationen: Herz-Kreislauf-Erkrankungen, Diabetes, Infektionen, schwere Verletzungen oder Überdehnungen, Krebs, regelmäßige Einnahme von Medikamenten, offene Wunden.\n\nDa Massage Flüssigkeiten im Körper bewegt, ist es nicht ratsam, einen Heilungsprozess zu unterbrechen. Dies gilt für Krankheit und Entzündung (einschließlich Sonnenbrand). Das erste Trimester der Schwangerschaft ist eine weitere Zeit, in der Sie Ihrem Körper Ruhe gönnen sollten.",
  },
  {
    question: "Was mache ich, wenn ich absagen muss?",
    answer:
      "Ich bitte darum, dass Sie Ihren Termin mindestens 24 Stunden im Voraus absagen, um nicht für Ihre Massage berechnet zu werden. Ich verstehe natürlich, dass es Zeiten gibt, in denen dies unvermeidbar ist, und behandle dies individuell. Bitte stornieren Sie telefonisch.",
  },
];

type FaqDisplay = { question: string; answer: string };

function FAQItem({
  faq,
  isOpen,
  onToggle,
}: {
  faq: FaqDisplay;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={onToggle}
        className="cursor-pointer flex w-full items-center justify-between gap-4 py-6 text-left"
        aria-expanded={isOpen}
      >
        <span className="text-base sm:text-lg font-bold text-[#111]">
          {faq.question}
        </span>
        <span
          className={`shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        >
          <ChevronDown size={20} className="text-[#0d4f4f]" />
        </span>
      </button>
      {isOpen && (
        <div className="overflow-hidden">
          <div className="pb-6 text-[#555] leading-relaxed text-sm sm:text-base whitespace-pre-line">
            {faq.answer}
          </div>
        </div>
      )}
    </div>
  );
}

export function FAQ({
  sanityFaqs,
}: {
  sanityFaqs?: SanityFaqItem[] | null;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FaqDisplay[] =
    sanityFaqs && sanityFaqs.length > 0 ? sanityFaqs : FALLBACK_FAQS;

  return (
    <section
      id="faq"
      className="relative py-24 sm:py-32 bg-gray-50 overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-[#0d4f4f]/5 blur-3xl" />

      <div className="relative mx-auto max-w-4xl px-5 sm:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#0d4f4f]/8 px-4 py-1.5 text-sm font-bold text-[#0d4f4f]">
            FAQ & Informationen
          </span>
          <h2 className="mt-4 text-[clamp(2rem,4vw,3.5rem)] font-extrabold leading-[1.05] tracking-tight text-[#111]">
            Häufig gestellte{" "}
            <span className="text-[#0d4f4f]">Fragen</span>
          </h2>
        </div>

        <div className="mt-14 rounded-3xl bg-white border border-gray-100 shadow-xl shadow-black/5 px-6 sm:px-10">
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              faq={faq}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>

        <p className="mt-6 text-center text-sm text-[#555]">
          Bitte beachten Sie unsere{" "}
          <a href="/agb" className="font-bold text-[#0d4f4f] hover:underline">
            Allgemeinen Geschäftsbedingungen
          </a>{" "}
          vor der Buchung eines Termins.
        </p>
      </div>
    </section>
  );
}
