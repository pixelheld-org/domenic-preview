import type { Metadata } from "next";
import { JsonLdService } from "@/components/JsonLdService";
import {
  TreatmentPage,
  type TreatmentPageData,
} from "@/components/TreatmentPage";
import {
  getSportmassagePage,
  getSettings,
} from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

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

const defaultConditions = [
  "Verspannungen nach Training",
  "Muskelkater-Vorbeugung",
  "Triggerpunkte",
  "Faszienverklebungen",
  "Ermüdungssymptome",
  "Vor Wettkampf",
  "Nach Wettkampf",
  "Steifheit nach langen Läufen",
];

const defaultEffects = [
  {
    title: "Schnellere Regeneration",
    description:
      "Verbesserte Durchblutung kann den Abtransport von Stoffwechselprodukten und die Versorgung der Muskulatur unterstützen.",
  },
  {
    title: "Verbesserte Beweglichkeit",
    description:
      "Gezielte Faszienarbeit und Triggerpunkt-Lösung können Bewegungseinschränkungen reduzieren.",
  },
  {
    title: "Verletzungs-Vorbeugung",
    description:
      "Geschmeidige, gut versorgte Muskulatur ist weniger anfällig für Zerrungen und Überlastungen.",
  },
  {
    title: "Bessere Körperwahrnehmung",
    description:
      "Wer regelmäßig massiert wird, spürt früher, wo der Körper Beachtung braucht.",
  },
  {
    title: "Tiefere Erholung",
    description:
      "Auch das vegetative Nervensystem profitiert: Ruhepuls, Schlafqualität, mentale Erholung.",
  },
  {
    title: "Trainingsfähigkeit erhalten",
    description:
      "Wenn die Muskulatur immer wieder zur Ruhe kommt, fällt das Trainingsvolumen leichter.",
  },
];

const defaultApproachPoints = [
  "Triggerpunkt-Arbeit an muskulären Schmerzpunkten",
  "Faszien-Mobilisation und Gewebelösung",
  "Tiefe Querfriktion bei chronischen Verspannungen",
  "Stretching-Elemente zur Bewegungsverbesserung",
];

const defaultFaqs = [
  {
    _key: "default-sport-faq-1",
    question: "Wie oft sollte ich Sportmassage in Anspruch nehmen?",
    answer:
      "Das hängt von Ihrem Trainingsvolumen ab. Hobby-Sportler:innen mit 3–4 Trainings/Woche profitieren oft von einer Sportmassage alle 2–3 Wochen. Bei intensiven Trainingsphasen kann häufiger sinnvoll sein, in Ruhephasen seltener. Wir können das gerne in der ersten Behandlung gemeinsam einschätzen.",
  },
  {
    _key: "default-sport-faq-2",
    question: "Vor oder nach dem Wettkampf — was bringt mehr?",
    answer:
      "Beides hat einen Platz: Pre-Wettkampf 2–3 Tage vorher zur Lockerung, ohne dass tief gearbeitet wird. Post-Wettkampf am besten 24–48 Stunden danach, dann ist das Gewebe schon wieder belastbarer für tiefere Techniken.",
  },
  {
    _key: "default-sport-faq-3",
    question: "Was unterscheidet Sportmassage von Heilmassage?",
    answer:
      "Heilmassage wird häufig bei Beschwerden mit medizinischem Hintergrund eingesetzt und ist je nach Kasse teilweise erstattbar. Sportmassage ist eine Wellness- und Trainings-Leistung, fokussiert auf Regeneration und Leistungserhaltung — nicht erstattbar, aber je nach Bedarf der passendere Ansatz.",
  },
  {
    _key: "default-sport-faq-4",
    question: "Hilft Sportmassage gegen Muskelkater?",
    answer:
      "Erfahrungsgemäß empfinden viele Menschen die Behandlung 24–48 Stunden nach intensiver Belastung als wohltuend. Wissenschaftlich ist die Evidenz für direkte Muskelkater-Reduktion gemischt — was bleibt, ist subjektives Wohlbefinden, verbesserte Beweglichkeit und ein Gefühl von Erholung.",
  },
  {
    _key: "default-sport-faq-5",
    question: "Auch ohne Sportverletzung?",
    answer:
      "Definitiv. Sportmassage ist primär präventiv und regenerativ gedacht, nicht therapeutisch. Wer regelmäßig sportlich aktiv ist, profitiert davon, ohne Beschwerden zu haben.",
  },
  {
    _key: "default-sport-faq-6",
    question: "Ist Sportmassage immer schmerzhaft?",
    answer:
      "Nein. Tiefer Druck heißt nicht automatisch Schmerz — der richtige Druck am richtigen Ort fühlt sich oft 'gut intensiv' an, nicht quälend. Wir sprechen während der Behandlung über das richtige Maß für Sie.",
  },
];

const defaultTransportInfo = [
  { label: "U-Bahn", value: "U2 — Station Rathaus" },
  { label: "Straßenbahn", value: "Linien 5, 33, 43, 44" },
  { label: "Auto", value: "Kurzparkzonen rund um die Praxis" },
];

const defaultCostNote =
  "Sportmassage zählt in Österreich als Wellness- und Trainingsleistung und wird von gesetzlichen Krankenkassen nicht erstattet. Manche Privatversicherungen mit Wellness-Tarif übernehmen einen Anteil. Heilmassage hingegen kann je nach Kasse teilweise rückerstattet werden — siehe Preise-Seite.";

export default async function SportmassageWien() {
  const [page, settings] = await Promise.all([
    getSportmassagePage(),
    getSettings(),
  ]);

  const heroImageSrc = page?.heroImage
    ? urlFor(page.heroImage).width(800).height(600).url()
    : "/images/heilmassage-wien.webp"; // Platzhalter aus Heilmassage-Pool — TODO(assets): replace with real sportmassage images once Domenic provides them

  const approachImageSrc = page?.approachImage
    ? urlFor(page.approachImage).width(800).height(600).url()
    : "/images/praxis-interior.png";

  const data: TreatmentPageData = {
    heroBadge: page?.heroBadge ?? "Wien 1080 · Josefstadt",
    heroHeading: page?.heroHeading ?? "Sportmassage in 1080 Wien",
    heroSubtitle:
      page?.heroSubtitle ??
      "für Regeneration, Beweglichkeit und nachhaltige Leistung",
    heroImageSrc,
    heroImageAlt: "Massage-Behandlung in der Praxis Domenic Hacker, Wien 1080",

    forWhomHeading: page?.forWhomHeading ?? "Für wen ist das?",
    forWhomDescription:
      page?.forWhomDescription ??
      "Egal ob ambitioniert im Verein, regelmäßig im Fitnessstudio oder ein paar Mal pro Woche laufend — wenn Ihr Körper nach Belastung Erholung braucht oder Verspannungen das nächste Training ausbremsen, ist Sportmassage ein gezielter Hebel.",
    conditions: page?.conditions ?? defaultConditions,

    approachHeading: page?.approachHeading ?? "Mein Schwerpunkt",
    approachDescription:
      page?.approachDescription ??
      "Ich arbeite tief, aber kontrolliert — mit besonderem Fokus auf Triggerpunkte und Faszien. Dort, wo das Gewebe sich nach hoher Belastung verklebt oder nicht mehr richtig gleitet, setze ich gezielt an.",
    approachPoints: page?.approachPoints ?? defaultApproachPoints,
    approachBottomText:
      page?.approachBottomText ??
      "Wie viel Druck Sie brauchen, hängt von Ihnen, Ihrem Trainingsstand und Ihrer Tagesform ab. Ich passe das an Ihr Feedback an — Sportmassage ist nicht zwangsläufig eine schmerzhafte Massage, auch wenn das Klischee anders sagt.",
    approachImageSrc,
    approachImageAlt: "Praxis-Interieur Wien 1080 – Domenic Hacker",

    whatIsHeading: page?.whatIsHeading ?? "Was ist Sportmassage?",
    whatIsParagraphs: page?.whatIsParagraphs ?? [
      "Sportmassage ist eine spezialisierte Form der Massage, die auf die Bedürfnisse von Menschen mit regelmäßiger körperlicher Belastung zugeschnitten ist. Sie kombiniert Elemente der klassischen Massage mit gezielten Techniken zur muskulären Regeneration und Beweglichkeitsförderung.",
      "Im Unterschied zur Heilmassage, die häufig bei Beschwerden mit medizinischem Hintergrund eingesetzt wird, dient Sportmassage primär der Regeneration, Verletzungs-Vorbeugung und Leistungserhaltung. Sie ist ein Wellness- und Trainings-Begleitservice, kein medizinisches Verfahren.",
      "Wann eingesetzt? Pre-Workout zur Aktivierung, Post-Workout zur Regeneration, in Trainingspausen zur Wartung, vor Wettkämpfen zur Lockerung, nach Wettkämpfen zur Erholung.",
    ],

    effectsHeading: page?.effectsHeading ?? "Was Sportmassage bewirken kann",
    effectsDescription:
      page?.effectsDescription ??
      "Regelmäßig eingesetzt unterstützt Sportmassage Ihren Körper dabei, Belastung besser wegzustecken und schneller einsatzfähig zu sein.",
    effects: page?.effects ?? defaultEffects,

    locationHeading: page?.locationHeading ?? "Sportmassage Wien 1080 — Josefstadt",
    locationDescription:
      page?.locationDescription ??
      "Die Praxis liegt im 8. Bezirk, gut erreichbar mit U2 (Rathaus) und mehreren Straßenbahnlinien. Für viele Hobby-Sportler:innen aus Wien Mitte-West eine kurze Anfahrt.",
    transportInfo: page?.transportInfo ?? defaultTransportInfo,

    costNote: page?.costNote ?? defaultCostNote,

    faqs: page?.faqs ?? defaultFaqs,
    faqSectionHeading: "Häufige Fragen zur Sportmassage in Wien",

    ctaHeading: page?.ctaHeading ?? "Bereit für die nächste Behandlung?",
    ctaText:
      page?.ctaText ??
      "Termin direkt online buchen — oder melden Sie sich, wenn Sie vorher Fragen haben.",
  };

  return (
    <>
      <JsonLdService variant="sportmassage" />
      <TreatmentPage
        data={data}
        variant="sportmassage"
        settings={settings}
      />
    </>
  );
}
