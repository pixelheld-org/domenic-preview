import { defineField, defineType } from "sanity";

export const aboutSchema = defineType({
  name: "about",
  title: "Über mich",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Abschnittstitel",
      type: "string",
      initialValue: "Von der Bewegung zur Heilung",
    }),
    defineField({
      name: "bio",
      title: "Biografie (Absätze)",
      type: "array",
      of: [{ type: "text" }],
      description: "Jeder Eintrag = ein Absatz",
    }),
    defineField({
      name: "image",
      title: "Profilbild",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "yearsExperience",
      title: "Jahre Erfahrung (z.B. '15+')",
      type: "string",
      initialValue: "15+",
    }),
    defineField({
      name: "qualificationsCount",
      title: "Anzahl Qualifikationen (z.B. '11')",
      type: "string",
      initialValue: "11",
    }),
    defineField({
      name: "location",
      title: "Standort (z.B. '1080 Wien')",
      type: "string",
      initialValue: "1080 Wien",
    }),
    defineField({
      name: "credentials",
      title: "Qualifikationen & Ausbildungen",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "heroImage",
      title: "Hero-Bild (Über-mich-Seite)",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero Untertitel",
      type: "text",
      rows: 3,
      initialValue:
        "Diplomierter Heilmasseur mit Leidenschaft für Bewegung und gezieltes Arbeiten am Körper.",
    }),
    defineField({
      name: "breakdanceImage",
      title: "Mein-Weg-Bild (z.B. Breakdance)",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "meinWegHighlights",
      title: "Mein Weg — Highlight-Karten",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "Titel", type: "string" }),
            defineField({ name: "subtitle", title: "Untertitel", type: "string" }),
          ],
          preview: { select: { title: "title", subtitle: "subtitle" } },
        },
      ],
    }),
    defineField({
      name: "philosophieTexte",
      title: "Meine Philosophie — Absätze",
      type: "array",
      of: [{ type: "text" }],
    }),
    defineField({
      name: "quote",
      title: "Zitat",
      type: "text",
      rows: 3,
      initialValue:
        "Heilmasseur ist meine Berufung. Ich höre auf den Körper — und dann arbeite ich gezielt dort, wo er es wirklich braucht.",
    }),
    defineField({
      name: "quoteAuthorTitle",
      title: "Zitat — Untertitel (z.B. Berufsbezeichnung)",
      type: "string",
      initialValue: "Diplomierter Heilmasseur, Wien 1080",
    }),
    defineField({
      name: "ctaHeading",
      title: "CTA Überschrift",
      type: "string",
      initialValue: "Bereit für Ihre erste Behandlung?",
    }),
    defineField({
      name: "ctaText",
      title: "CTA Text",
      type: "text",
      rows: 2,
      initialValue:
        "Buchen Sie jetzt Ihren Termin online – unkompliziert und in wenigen Schritten.",
    }),
  ],
  preview: {
    select: { title: "title" },
  },
});
