import { defineField, defineType } from "sanity";

export const sportmassagePageSchema = defineType({
  name: "sportmassagePage",
  title: "Sportmassage Wien",
  type: "document",
  fields: [
    // ── Hero ──────────────────────────────────────────────────
    defineField({
      name: "heroBadge",
      title: "Hero — Badge",
      type: "string",
      initialValue: "Wien 1080 · Josefstadt",
      group: "hero",
    }),
    defineField({
      name: "heroHeading",
      title: "Hero — Überschrift",
      type: "string",
      initialValue: "Sportmassage in 1080 Wien",
      group: "hero",
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero — Untertitel",
      type: "string",
      initialValue: "für Regeneration, Beweglichkeit und nachhaltige Leistung",
      group: "hero",
    }),
    defineField({
      name: "heroImage",
      title: "Hero — Bild",
      type: "image",
      options: { hotspot: true },
      group: "hero",
    }),

    // ── Für wen ───────────────────────────────────────────────
    defineField({
      name: "forWhomHeading",
      title: "Für wen — Überschrift",
      type: "string",
      initialValue: "Für wen ist das?",
      group: "forWhom",
    }),
    defineField({
      name: "forWhomDescription",
      title: "Für wen — Beschreibung",
      type: "text",
      rows: 3,
      initialValue:
        "Egal ob ambitioniert im Verein, regelmäßig im Fitnessstudio oder ein paar Mal pro Woche laufend — wenn Ihr Körper nach Belastung Erholung braucht oder Verspannungen das nächste Training ausbremsen, ist Sportmassage ein gezielter Hebel.",
      group: "forWhom",
    }),
    defineField({
      name: "conditions",
      title: "Für wen — Beschwerden-Tags",
      type: "array",
      of: [{ type: "string" }],
      initialValue: [
        "Verspannungen nach Training",
        "Muskelkater-Vorbeugung",
        "Triggerpunkte",
        "Faszienverklebungen",
        "Ermüdungssymptome",
        "Vor Wettkampf",
        "Nach Wettkampf",
        "Steifheit nach langen Läufen",
      ],
      group: "forWhom",
    }),

    // ── Mein Schwerpunkt ──────────────────────────────────────
    defineField({
      name: "approachHeading",
      title: "Schwerpunkt — Überschrift",
      type: "string",
      initialValue: "Mein Schwerpunkt",
      group: "approach",
    }),
    defineField({
      name: "approachDescription",
      title: "Schwerpunkt — Beschreibung",
      type: "text",
      rows: 4,
      initialValue:
        "Ich arbeite tief, aber kontrolliert — mit besonderem Fokus auf Triggerpunkte und Faszien. Dort, wo das Gewebe sich nach hoher Belastung verklebt oder nicht mehr richtig gleitet, setze ich gezielt an.",
      group: "approach",
    }),
    defineField({
      name: "approachPoints",
      title: "Schwerpunkt — Punkte",
      type: "array",
      of: [{ type: "string" }],
      initialValue: [
        "Triggerpunkt-Arbeit an muskulären Schmerzpunkten",
        "Faszien-Mobilisation und Gewebelösung",
        "Tiefe Querfriktion bei chronischen Verspannungen",
        "Stretching-Elemente zur Bewegungsverbesserung",
      ],
      group: "approach",
    }),
    defineField({
      name: "approachBottomText",
      title: "Schwerpunkt — Zusatztext",
      type: "text",
      rows: 3,
      initialValue:
        "Wie viel Druck Sie brauchen, hängt von Ihnen, Ihrem Trainingsstand und Ihrer Tagesform ab. Ich passe das an Ihr Feedback an — Sportmassage ist nicht zwangsläufig eine schmerzhafte Massage, auch wenn das Klischee anders sagt.",
      group: "approach",
    }),
    defineField({
      name: "approachImage",
      title: "Schwerpunkt — Bild",
      type: "image",
      options: { hotspot: true },
      group: "approach",
    }),

    // ── Was ist Sportmassage ──────────────────────────────────
    defineField({
      name: "whatIsHeading",
      title: "Was ist Sportmassage — Überschrift",
      type: "string",
      initialValue: "Was ist Sportmassage?",
      group: "whatIs",
    }),
    defineField({
      name: "whatIsParagraphs",
      title: "Was ist Sportmassage — Absätze",
      type: "array",
      of: [{ type: "text" }],
      initialValue: [
        "Sportmassage ist eine spezialisierte Form der Massage, die auf die Bedürfnisse von Menschen mit regelmäßiger körperlicher Belastung zugeschnitten ist. Sie kombiniert Elemente der klassischen Massage mit gezielten Techniken zur muskulären Regeneration und Beweglichkeitsförderung.",
        "Im Unterschied zur Heilmassage, die häufig bei Beschwerden mit medizinischem Hintergrund eingesetzt wird, dient Sportmassage primär der Regeneration, Verletzungs-Vorbeugung und Leistungserhaltung. Sie ist ein Wellness- und Trainings-Begleitservice, kein medizinisches Verfahren.",
        "Wann eingesetzt? Pre-Workout zur Aktivierung, Post-Workout zur Regeneration, in Trainingspausen zur Wartung, vor Wettkämpfen zur Lockerung, nach Wettkämpfen zur Erholung.",
      ],
      group: "whatIs",
    }),

    // ── Wirkung ───────────────────────────────────────────────
    defineField({
      name: "effectsHeading",
      title: "Wirkung — Überschrift",
      type: "string",
      initialValue: "Was Sportmassage bewirken kann",
      group: "effects",
    }),
    defineField({
      name: "effectsDescription",
      title: "Wirkung — Beschreibung",
      type: "string",
      initialValue:
        "Regelmäßig eingesetzt unterstützt Sportmassage Ihren Körper dabei, Belastung besser wegzustecken und schneller einsatzfähig zu sein.",
      group: "effects",
    }),
    defineField({
      name: "effects",
      title: "Wirkung — Karten",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "Titel", type: "string" }),
            defineField({ name: "description", title: "Beschreibung", type: "text", rows: 3 }),
          ],
          preview: { select: { title: "title", subtitle: "description" } },
        },
      ],
      initialValue: [
        {
          _key: "effect-1",
          title: "Schnellere Regeneration",
          description: "Verbesserte Durchblutung kann den Abtransport von Stoffwechselprodukten und die Versorgung der Muskulatur unterstützen.",
        },
        {
          _key: "effect-2",
          title: "Verbesserte Beweglichkeit",
          description: "Gezielte Faszienarbeit und Triggerpunkt-Lösung können Bewegungseinschränkungen reduzieren.",
        },
        {
          _key: "effect-3",
          title: "Verletzungs-Vorbeugung",
          description: "Geschmeidige, gut versorgte Muskulatur ist weniger anfällig für Zerrungen und Überlastungen.",
        },
        {
          _key: "effect-4",
          title: "Bessere Körperwahrnehmung",
          description: "Wer regelmäßig massiert wird, spürt früher, wo der Körper Beachtung braucht.",
        },
        {
          _key: "effect-5",
          title: "Tiefere Erholung",
          description: "Auch das vegetative Nervensystem profitiert: Ruhepuls, Schlafqualität, mentale Erholung.",
        },
        {
          _key: "effect-6",
          title: "Trainingsfähigkeit erhalten",
          description: "Wenn die Muskulatur immer wieder zur Ruhe kommt, fällt das Trainingsvolumen leichter.",
        },
      ],
      group: "effects",
    }),

    // ── Standort ──────────────────────────────────────────────
    defineField({
      name: "locationHeading",
      title: "Standort — Überschrift",
      type: "string",
      initialValue: "Sportmassage Wien 1080 — Josefstadt",
      group: "location",
    }),
    defineField({
      name: "locationDescription",
      title: "Standort — Beschreibung",
      type: "text",
      rows: 3,
      initialValue:
        "Die Praxis liegt im 8. Bezirk, gut erreichbar mit U2 (Rathaus) und mehreren Straßenbahnlinien. Für viele Hobby-Sportler:innen aus Wien Mitte-West eine kurze Anfahrt.",
      group: "location",
    }),
    defineField({
      name: "transportInfo",
      title: "Standort — Transportmittel",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label (z.B. U-Bahn)", type: "string" }),
            defineField({ name: "value", title: "Wert (z.B. U2 – Station Rathaus)", type: "string" }),
          ],
          preview: { select: { title: "label", subtitle: "value" } },
        },
      ],
      initialValue: [
        { _key: "transport-1", label: "U-Bahn", value: "U2 — Station Rathaus" },
        { _key: "transport-2", label: "Straßenbahn", value: "Linien 5, 33, 43, 44" },
        { _key: "transport-3", label: "Auto", value: "Kurzparkzonen rund um die Praxis" },
      ],
      group: "location",
    }),

    // ── Cost Note (nur Sportmassage) ──────────────────────────
    defineField({
      name: "costNote",
      title: "Kostennotiz (Krankenkassen-Hinweis)",
      type: "text",
      rows: 3,
      initialValue:
        "Sportmassage zählt in Österreich als Wellness- und Trainingsleistung und wird von gesetzlichen Krankenkassen nicht erstattet. Manche Privatversicherungen mit Wellness-Tarif übernehmen einen Anteil. Heilmassage hingegen kann je nach Kasse teilweise rückerstattet werden — siehe Preise-Seite.",
      group: "costNote",
    }),

    // ── FAQs (seitenspezifisch) ───────────────────────────────
    defineField({
      name: "faqs",
      title: "Häufige Fragen (Sportmassage)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "question", title: "Frage", type: "string" }),
            defineField({ name: "answer", title: "Antwort", type: "text", rows: 5 }),
          ],
          preview: { select: { title: "question" } },
        },
      ],
      initialValue: [
        {
          _key: "faq-1",
          question: "Wie oft sollte ich Sportmassage in Anspruch nehmen?",
          answer:
            "Das hängt von Ihrem Trainingsvolumen ab. Hobby-Sportler:innen mit 3–4 Trainings/Woche profitieren oft von einer Sportmassage alle 2–3 Wochen. Bei intensiven Trainingsphasen kann häufiger sinnvoll sein, in Ruhephasen seltener. Wir können das gerne in der ersten Behandlung gemeinsam einschätzen.",
        },
        {
          _key: "faq-2",
          question: "Vor oder nach dem Wettkampf — was bringt mehr?",
          answer:
            "Beides hat einen Platz: Pre-Wettkampf 2–3 Tage vorher zur Lockerung, ohne dass tief gearbeitet wird. Post-Wettkampf am besten 24–48 Stunden danach, dann ist das Gewebe schon wieder belastbarer für tiefere Techniken.",
        },
        {
          _key: "faq-3",
          question: "Was unterscheidet Sportmassage von Heilmassage?",
          answer:
            "Heilmassage wird häufig bei Beschwerden mit medizinischem Hintergrund eingesetzt und ist je nach Kasse teilweise erstattbar. Sportmassage ist eine Wellness- und Trainings-Leistung, fokussiert auf Regeneration und Leistungserhaltung — nicht erstattbar, aber je nach Bedarf der passendere Ansatz.",
        },
        {
          _key: "faq-4",
          question: "Hilft Sportmassage gegen Muskelkater?",
          answer:
            "Erfahrungsgemäß empfinden viele Menschen die Behandlung 24–48 Stunden nach intensiver Belastung als wohltuend. Wissenschaftlich ist die Evidenz für direkte Muskelkater-Reduktion gemischt — was bleibt, ist subjektives Wohlbefinden, verbesserte Beweglichkeit und ein Gefühl von Erholung.",
        },
        {
          _key: "faq-5",
          question: "Auch ohne Sportverletzung?",
          answer:
            "Definitiv. Sportmassage ist primär präventiv und regenerativ gedacht, nicht therapeutisch. Wer regelmäßig sportlich aktiv ist, profitiert davon, ohne Beschwerden zu haben.",
        },
        {
          _key: "faq-6",
          question: "Ist Sportmassage immer schmerzhaft?",
          answer:
            "Nein. Tiefer Druck heißt nicht automatisch Schmerz — der richtige Druck am richtigen Ort fühlt sich oft 'gut intensiv' an, nicht quälend. Wir sprechen während der Behandlung über das richtige Maß für Sie.",
        },
      ],
      group: "faqs",
    }),

    // ── CTA ───────────────────────────────────────────────────
    defineField({
      name: "ctaHeading",
      title: "CTA — Überschrift",
      type: "string",
      initialValue: "Bereit für die nächste Behandlung?",
      group: "cta",
    }),
    defineField({
      name: "ctaText",
      title: "CTA — Text",
      type: "text",
      rows: 2,
      initialValue:
        "Termin direkt online buchen — oder melden Sie sich, wenn Sie vorher Fragen haben.",
      group: "cta",
    }),
  ],
  groups: [
    { name: "hero", title: "Hero" },
    { name: "forWhom", title: "Für wen" },
    { name: "approach", title: "Mein Schwerpunkt" },
    { name: "whatIs", title: "Was ist Sportmassage" },
    { name: "effects", title: "Wirkung" },
    { name: "location", title: "Standort" },
    { name: "costNote", title: "Kostennotiz" },
    { name: "faqs", title: "FAQs" },
    { name: "cta", title: "CTA" },
  ],
  preview: {
    prepare: () => ({ title: "Sportmassage Wien" }),
  },
});
