import { defineField, defineType } from "sanity";

export const datenschutzPageSchema = defineType({
  name: "datenschutzPage",
  title: "Datenschutz",
  type: "document",
  fields: [
    defineField({
      name: "lastUpdated",
      title: "Zuletzt aktualisiert",
      type: "string",
      initialValue: "09.04.2026",
    }),
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
              title: "Inhalt (optional, wenn nur Unterabschnitte)",
              type: "text",
              rows: 6,
            }),
            defineField({
              name: "subsections",
              title: "Unterabschnitte",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    defineField({
                      name: "heading",
                      title: "Überschrift",
                      type: "string",
                    }),
                    defineField({
                      name: "content",
                      title: "Inhalt",
                      type: "text",
                      rows: 6,
                    }),
                  ],
                  preview: { select: { title: "heading" } },
                },
              ],
            }),
          ],
          preview: { select: { title: "heading" } },
        },
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Datenschutz" }),
  },
});
