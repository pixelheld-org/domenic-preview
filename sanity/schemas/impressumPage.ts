import { defineField, defineType } from "sanity";

export const impressumPageSchema = defineType({
  name: "impressumPage",
  title: "Impressum",
  type: "document",
  fields: [
    defineField({
      name: "sections",
      title: "Abschnitte",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "heading",
              title: "Überschrift",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "content",
              title: "Inhalt",
              type: "text",
              rows: 6,
              validation: (rule) => rule.required(),
            }),
          ],
          preview: { select: { title: "heading" } },
        },
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Impressum" }),
  },
});
