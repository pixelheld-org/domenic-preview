import { defineField, defineType } from "sanity";

export const faqItemSchema = defineType({
  name: "faqItem",
  title: "FAQ",
  type: "document",
  fields: [
    defineField({
      name: "question",
      title: "Frage",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "answer",
      title: "Antwort",
      type: "text",
      rows: 5,
      validation: (rule) => rule.required(),
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
    select: { title: "question" },
  },
});
