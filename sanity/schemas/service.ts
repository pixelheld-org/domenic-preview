import { defineField, defineType } from "sanity";

export const serviceSchema = defineType({
  name: "service",
  title: "Leistung",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titel",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "shortDescription",
      title: "Kurzbeschreibung (Servicekarte)",
      type: "text",
      rows: 3,
      description: "Kurzer Text für die Übersichtsseite",
    }),
    defineField({
      name: "price",
      title: "Preis (Anzeige, z.B. 'Ab €55')",
      type: "string",
    }),
    defineField({
      name: "image",
      title: "Bild",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "sortOrder",
      title: "Reihenfolge",
      type: "number",
      description: "Niedrigere Zahl = weiter oben",
    }),
  ],
  orderings: [
    {
      title: "Reihenfolge",
      name: "sortOrderAsc",
      by: [{ field: "sortOrder", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "price", media: "image" },
  },
});
