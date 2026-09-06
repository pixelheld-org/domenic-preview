import type { Metadata } from "next";
import { JsonLdService } from "@/components/JsonLdService";
import {
  TreatmentPage,
  type TreatmentPageData,
} from "@/components/TreatmentPage";
import { getHeilmassagePage, getSettings } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

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

const defaultConditions = [
  "Rückenschmerzen",
  "Nacken & Schulter",
  "Verspannungen",
  "Nach dem Sport",
  "Viel Sitzen",
  "Stress",
];

const defaultEffects = [
  {
    title: "Löst Verspannungen",
    description:
      "Verhärtetes Gewebe wird gezielt gelockert und die Muskulatur entspannt – nicht nur oberflächlich, sondern in der Tiefe.",
  },
  {
    title: "Lindert Schmerzen",
    description:
      "Gezielte Behandlung der Schmerzpunkte – wirksam, ohne unnötigen Druck. Viele berichten schon nach der ersten Behandlung von spürbarer Erleichterung.",
  },
  {
    title: "Verbessert Beweglichkeit",
    description:
      "Mehr Spielraum in Gelenken und Muskeln nach der Behandlung. Besonders spürbar bei Schulter, Nacken und Rücken.",
  },
  {
    title: "Unterstützt Regeneration",
    description:
      "Bessere Durchblutung, schnellere Erholung – vor allem nach sportlicher Belastung oder nach langen Arbeitstagen am Schreibtisch.",
  },
];

const defaultApproachPoints = [
  `Keine Standardmassage – gezielte Behandlung statt „drübermassieren"`,
  "Intensität wird laufend angepasst – nicht zu wenig, nicht zu viel",
  "Feedback jederzeit möglich und erwünscht",
  "Erfahrung und ein gutes Gespür für den richtigen Druck",
];

const defaultFaqs = [
  {
    _key: "default-faq-1",
    question:
      "Was ist der Unterschied zwischen Heilmassage und einer normalen Massage?",
    answer:
      "Eine Heilmassage ist eine medizinisch anerkannte Behandlung, die gezielt auf Beschwerden wie Rückenschmerzen, Verspannungen oder eingeschränkte Beweglichkeit abzielt – durchgeführt von einem diplomierten Heilmasseur. Eine Wellnessmassage dient primär der Entspannung. Bei mir steht der therapeutische Nutzen im Vordergrund – Entspannung ist ein angenehmer Nebeneffekt.",
  },
  {
    _key: "default-faq-2",
    question: "Wie viele Termine brauche ich bis zur Verbesserung?",
    answer:
      "Das hängt stark von Ihren Beschwerden ab. Akute Verspannungen lassen sich oft schon in 2–3 Terminen deutlich verbessern. Bei chronischen Beschwerden empfehle ich regelmäßigere Behandlungen. Das besprechen wir beim ersten Termin – ganz ohne Verpflichtung.",
  },
  {
    _key: "default-faq-3",
    question: "Tut eine Heilmassage weh?",
    answer:
      "Das Ziel ist wirksame Behandlung – nicht Schmerz. Mein Schwerpunkt liegt auf der richtigen Intensität: wirksam, aber ohne unnötigen Druck. Sie können jederzeit sagen, wenn Ihnen etwas zu viel oder zu wenig ist – ich passe mich sofort an.",
  },
  {
    _key: "default-faq-4",
    question: "Muss ich etwas zur Behandlung mitbringen?",
    answer:
      "Nein, alles Notwendige ist in der Praxis vorhanden. Kommen Sie einfach pünktlich – und wenn möglich mit einem kurzen Überblick über Ihre aktuellen Beschwerden, damit wir gleich gezielt loslegen können.",
  },
  {
    _key: "default-faq-5",
    question: "Kann ich die Heilmassage bei der Krankenkasse einreichen?",
    answer:
      "Als diplomierter Heilmasseur bin ich gewerblich tätig. Die öffentliche Krankenkasse übernimmt die Kosten in der Regel nicht direkt. Manche privaten Zusatzversicherungen erstatten Heilmassagen teilweise – bitte erkundigen Sie sich direkt bei Ihrer Versicherung.",
  },
  {
    _key: "default-faq-6",
    question: "Wie finde ich die Praxis in Wien 1080?",
    answer:
      "Die Praxis liegt in der Feldgasse 3/20 im 8. Bezirk (Josefstadt). Gut erreichbar mit der U2 (Station Rathaus) oder mit der Straßenbahn J, 5 oder 33. Parkplätze sind in der unmittelbaren Umgebung vorhanden.",
  },
];

const defaultTransportInfo = [
  { label: "U-Bahn", value: "U2 – Station Rathaus" },
  { label: "Straßenbahn", value: "Linien J · 5 · 33" },
  { label: "Parken", value: "Parkplätze in der Umgebung" },
];

export default async function HeilmassageWien() {
  const [page, settings] = await Promise.all([
    getHeilmassagePage(),
    getSettings(),
  ]);

  const heroImageSrc = page?.heroImage
    ? urlFor(page.heroImage).width(800).height(600).url()
    : "/images/heilmassage-wien.webp";

  const approachImageSrc = page?.approachImage
    ? urlFor(page.approachImage).width(800).height(600).url()
    : "/images/praxis-interior.png";

  const data: TreatmentPageData = {
    heroBadge: page?.heroBadge ?? "Wien 1080 · Josefstadt",
    heroHeading: page?.heroHeading ?? "Heilmassage in 1080 Wien",
    heroSubtitle:
      page?.heroSubtitle ?? "gezielt, wirksam und in der richtigen Intensität",
    heroImageSrc,
    heroImageAlt: "Heilmassage Behandlung in Wien 1080 – Praxis Domenic Hacker",

    forWhomHeading: page?.forWhomHeading ?? "Für wen ist das?",
    forWhomDescription:
      page?.forWhomDescription ??
      "Ob Rückenschmerzen nach langem Sitzen, ein verspannter Nacken oder Muskeln, die nach dem Sport einfach nicht loslassen – wenn Sie sich hier wiedererkennen, sind Sie bei mir richtig.",
    conditions: page?.conditions ?? defaultConditions,

    approachHeading: page?.approachHeading ?? "Mein Schwerpunkt",
    approachDescription:
      page?.approachDescription ??
      "Mein Schwerpunkt liegt auf der passenden Intensität. Durch Erfahrung und ein gutes Gespür finde ich meist genau den richtigen Druck – wirksam, aber ohne unnötigen Schmerz.",
    approachPoints: page?.approachPoints ?? defaultApproachPoints,
    approachBottomText:
      page?.approachBottomText ??
      "Keine Massage ist wie die andere. Was Sie bekommen, ist eine Behandlung, die sich an Ihrem Körper und Ihrem Feedback orientiert – nicht an einem Schema.",
    approachImageSrc,
    approachImageAlt:
      "Praxis-Interieur der Heilmassage Wien 1080 – Domenic Hacker",

    whatIsHeading: page?.whatIsHeading ?? "Was ist Heilmassage?",
    whatIsParagraphs: page?.whatIsParagraphs ?? [
      "Heilmassage ist eine medizinisch anerkannte Behandlung, die gezielt bei Beschwerden wie Rückenschmerzen, Verspannungen oder eingeschränkter Beweglichkeit eingesetzt wird. Im Unterschied zur Wellnessmassage steht hier der therapeutische Nutzen im Vordergrund — durchgeführt von einem diplomierten Heilmasseur.",
      "Ich arbeite systematisch und passe die Intensität laufend an Ihren Körper an. Jede Behandlung beginnt mit einem kurzen Gespräch: Wo sind die Beschwerden? Was soll sich danach anders anfühlen? Erst dann lege ich los — mit dem Druck, den Ihr Körper gerade braucht.",
      "Neben Heilmassage biete ich auch klassische Massage und Lymphdrainage an — sprechen Sie mich gerne an.",
    ],

    effectsHeading: page?.effectsHeading ?? "Was Massage bewirkt",
    effectsDescription:
      page?.effectsDescription ??
      "Gezielt eingesetzt erzielt Massage messbare Ergebnisse – nicht nur im Moment, sondern nachhaltig.",
    effects: page?.effects ?? defaultEffects,

    locationHeading: page?.locationHeading ?? "Heilmassage Wien 1080 – Josefstadt",
    locationDescription:
      page?.locationDescription ??
      "Die Praxis liegt im Herzen des 8. Bezirks – einer der ruhigeren, grünen Ecken Wiens, direkt an der U2 und mehreren Straßenbahnlinien.",
    transportInfo: page?.transportInfo ?? defaultTransportInfo,

    // Heilmassage hat keine costNote
    faqs: page?.faqs ?? defaultFaqs,
    faqSectionHeading: "Häufige Fragen zur Heilmassage in Wien",

    ctaHeading: page?.ctaHeading ?? "Bereit für eine Behandlung?",
    ctaText:
      page?.ctaText ??
      "Termin direkt online buchen – oder melden Sie sich, wenn Sie vorher Fragen haben.",
  };

  return (
    <>
      <JsonLdService variant="heilmassage" />
      <TreatmentPage
        data={data}
        variant="heilmassage"
        settings={settings}
      />
    </>
  );
}
