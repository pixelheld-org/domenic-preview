import { defineField, defineType } from "sanity";

export const heilmassagePageSchema = defineType({
  name: "heilmassagePage",
  title: "Heilmassage Wien",
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
      initialValue: "Heilmassage in 1080 Wien",
      group: "hero",
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero — Untertitel",
      type: "string",
      initialValue: "gezielt, wirksam und in der richtigen Intensität",
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
        "Ob Rückenschmerzen nach langem Sitzen, ein verspannter Nacken oder Muskeln, die nach dem Sport einfach nicht loslassen – wenn Sie sich hier wiedererkennen, sind Sie bei mir richtig.",
      group: "forWhom",
    }),
    defineField({
      name: "conditions",
      title: "Für wen — Beschwerden-Tags",
      type: "array",
      of: [{ type: "string" }],
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
        "Mein Schwerpunkt liegt auf der passenden Intensität. Durch Erfahrung und ein gutes Gespür finde ich meist genau den richtigen Druck – wirksam, aber ohne unnötigen Schmerz.",
      group: "approach",
    }),
    defineField({
      name: "approachPoints",
      title: "Schwerpunkt — Punkte",
      type: "array",
      of: [{ type: "string" }],
      group: "approach",
    }),
    defineField({
      name: "approachBottomText",
      title: "Schwerpunkt — Zusatztext",
      type: "text",
      rows: 3,
      initialValue:
        "Keine Massage ist wie die andere. Was Sie bekommen, ist eine Behandlung, die sich an Ihrem Körper und Ihrem Feedback orientiert – nicht an einem Schema.",
      group: "approach",
    }),
    defineField({
      name: "approachImage",
      title: "Schwerpunkt — Bild",
      type: "image",
      options: { hotspot: true },
      group: "approach",
    }),

    // ── Was ist Heilmassage ───────────────────────────────────
    defineField({
      name: "whatIsHeading",
      title: "Was ist Heilmassage — Überschrift",
      type: "string",
      initialValue: "Was ist Heilmassage?",
      group: "whatIs",
    }),
    defineField({
      name: "whatIsParagraphs",
      title: "Was ist Heilmassage — Absätze",
      type: "array",
      of: [{ type: "text" }],
      group: "whatIs",
    }),

    // ── Wirkung ───────────────────────────────────────────────
    defineField({
      name: "effectsHeading",
      title: "Wirkung — Überschrift",
      type: "string",
      initialValue: "Was Massage bewirkt",
      group: "effects",
    }),
    defineField({
      name: "effectsDescription",
      title: "Wirkung — Beschreibung",
      type: "string",
      initialValue:
        "Gezielt eingesetzt erzielt Massage messbare Ergebnisse – nicht nur im Moment, sondern nachhaltig.",
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
      group: "effects",
    }),

    // ── Standort ──────────────────────────────────────────────
    defineField({
      name: "locationHeading",
      title: "Standort — Überschrift",
      type: "string",
      initialValue: "Heilmassage Wien 1080 – Josefstadt",
      group: "location",
    }),
    defineField({
      name: "locationDescription",
      title: "Standort — Beschreibung",
      type: "text",
      rows: 3,
      initialValue:
        "Die Praxis liegt im Herzen des 8. Bezirks – einer der ruhigeren, grünen Ecken Wiens, direkt an der U2 und mehreren Straßenbahnlinien.",
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
      group: "location",
    }),

    // ── FAQs (seitenspezifisch) ───────────────────────────────
    defineField({
      name: "faqs",
      title: "Häufige Fragen (Heilmassage)",
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
      group: "faqs",
    }),

    // ── CTA ───────────────────────────────────────────────────
    defineField({
      name: "ctaHeading",
      title: "CTA — Überschrift",
      type: "string",
      initialValue: "Bereit für eine Behandlung?",
      group: "cta",
    }),
    defineField({
      name: "ctaText",
      title: "CTA — Text",
      type: "text",
      rows: 2,
      initialValue:
        "Termin direkt online buchen – oder melden Sie sich, wenn Sie vorher Fragen haben.",
      group: "cta",
    }),
  ],
  groups: [
    { name: "hero", title: "Hero" },
    { name: "forWhom", title: "Für wen" },
    { name: "approach", title: "Mein Schwerpunkt" },
    { name: "whatIs", title: "Was ist Heilmassage" },
    { name: "effects", title: "Wirkung" },
    { name: "location", title: "Standort" },
    { name: "faqs", title: "FAQs" },
    { name: "cta", title: "CTA" },
  ],
  preview: {
    prepare: () => ({ title: "Heilmassage Wien" }),
  },
});
