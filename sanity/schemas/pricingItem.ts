import { defineField, defineType } from "sanity";

export const pricingItemSchema = defineType({
  name: "pricingItem",
  title: "Preis",
  type: "document",
  fields: [
    defineField({
      name: "serviceName",
      title: "Behandlung",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "price30",
      title: "Preis 30 Min (€)",
      type: "number",
    }),
    defineField({
      name: "price45",
      title: "Preis 45 Min (€)",
      type: "number",
    }),
    defineField({
      name: "price60",
      title: "Preis 60 Min (€)",
      type: "number",
    }),
    defineField({
      name: "popular",
      title: "60 Min als \"Beliebt\" markieren?",
      type: "boolean",
      initialValue: false,
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
    select: { title: "serviceName" },
  },
});
