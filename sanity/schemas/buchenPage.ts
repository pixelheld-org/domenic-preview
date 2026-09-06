import { defineField, defineType } from "sanity";

export const buchenPageSchema = defineType({
  name: "buchenPage",
  title: "Buchen-Seite",
  type: "document",
  fields: [
    defineField({
      name: "heading",
      title: "Überschrift",
      type: "string",
      initialValue: "Termin online buchen —",
    }),
    defineField({
      name: "headingAccent",
      title: "Überschrift (Akzent)",
      type: "string",
      initialValue: "schnell & unkompliziert",
    }),
    defineField({
      name: "subtitle",
      title: "Untertitel",
      type: "string",
      initialValue: "In 3 einfachen Schritten zu Ihrem Termin",
    }),
    defineField({
      name: "steps",
      title: "Buchungsschritte",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "number", title: "Nummer", type: "string" }),
            defineField({ name: "text", title: "Text", type: "string" }),
          ],
          preview: {
            select: { title: "text", subtitle: "number" },
          },
        },
      ],
    }),
    defineField({
      name: "medicalNote",
      title: "Medizinischer Hinweis",
      type: "string",
      description:
        "Optional. Leer lassen, wenn kein Hinweis über dem Buchungs-Embed stehen soll.",
    }),
    defineField({
      name: "successHeading",
      title: "Erfolg — Überschrift",
      type: "string",
      initialValue: "Termin erfolgreich gebucht!",
    }),
    defineField({
      name: "successText",
      title: "Erfolg — Text",
      type: "string",
      initialValue: "Sie erhalten in Kürze eine Bestätigung per E-Mail.",
    }),
    defineField({
      name: "infoHeading",
      title: "Info-Sektion — Überschrift",
      type: "string",
      initialValue: "So finden Sie",
    }),
    defineField({
      name: "infoHeadingAccent",
      title: "Info-Sektion — Überschrift (Akzent)",
      type: "string",
      initialValue: "die Praxis",
    }),
    defineField({
      name: "infoDescription",
      title: "Info-Sektion — Beschreibung",
      type: "text",
      rows: 3,
      initialValue:
        "Die Praxis befindet sich im 8. Bezirk (Josefstadt) und ist mit öffentlichen Verkehrsmitteln gut erreichbar.",
    }),
    defineField({
      name: "accessibilityFeatures",
      title: "Erreichbarkeits-Features",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "googleMapsEmbedUrl",
      title: "Google Maps Embed-URL",
      type: "url",
      initialValue:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2658.6!2d16.349!3d48.211!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sFeldgasse+3%2C+1080+Wien!5e0!3m2!1sde!2sat!4v1",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Buchen-Seite" }),
  },
});
