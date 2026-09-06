import { defineField, defineType } from "sanity";

export const testimonialSchema = defineType({
  name: "testimonial",
  title: "Kundenstimme",
  type: "document",
  fields: [
    defineField({
      name: "quote",
      title: "Zitat",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "authorName",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "authorDetail",
      title: "Details (z.B. 'Stammkundin, Wien')",
      type: "string",
    }),
    defineField({
      name: "rating",
      title: "Bewertung (1-5 Sterne)",
      type: "number",
      validation: (rule) => rule.min(1).max(5),
      initialValue: 5,
    }),
    defineField({
      name: "sortOrder",
      title: "Reihenfolge",
      type: "number",
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
    select: { title: "authorName", subtitle: "quote" },
  },
});
