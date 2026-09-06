import { defineField, defineType } from "sanity";

export const homePageSchema = defineType({
  name: "homePage",
  title: "Startseite",
  type: "document",
  fields: [
    // ── Hero ─────────────────────────────────────────────────
    defineField({
      name: "heroBackgroundImage",
      title: "Hero — Hintergrundbild",
      type: "image",
      options: { hotspot: true },
      group: "hero",
    }),
    defineField({
      name: "heroPortraitImage",
      title: "Hero — Portrait-Bild (Karte rechts)",
      type: "image",
      options: { hotspot: true },
      group: "hero",
    }),

    // ── Services ──────────────────────────────────────────────
    defineField({
      name: "servicesBadge",
      title: "Leistungen — Badge-Text",
      type: "string",
      initialValue: "Massagen-Angebot",
      group: "services",
    }),
    defineField({
      name: "servicesHeading",
      title: "Leistungen — Überschrift",
      type: "string",
      initialValue: "Was ich für Sie",
      group: "services",
    }),
    defineField({
      name: "servicesHeadingAccent",
      title: "Leistungen — Überschrift (Akzent)",
      type: "string",
      initialValue: "tun kann",
      group: "services",
    }),
    defineField({
      name: "servicesText",
      title: "Leistungen — Beschreibung",
      type: "text",
      rows: 3,
      initialValue:
        "Hier geht es nicht nur um Entspannung, sondern um Ihr Wohlbefinden. Ich unterstütze Sie dabei, Verspannungen zu lösen, Schmerzen zu lindern und mehr Bewegungsfreiheit zu gewinnen.",
      group: "services",
    }),

    // ── Portrait ──────────────────────────────────────────────
    defineField({
      name: "portraitImage",
      title: "Portrait — Bild",
      type: "image",
      options: { hotspot: true },
      group: "portrait",
    }),
    defineField({
      name: "portraitName",
      title: "Portrait — Name",
      type: "string",
      initialValue: "Domenic Hacker",
      group: "portrait",
    }),
    defineField({
      name: "portraitTitle",
      title: "Portrait — Titel / Untertitel",
      type: "string",
      initialValue: "Dipl. Heilmasseur",
      group: "portrait",
    }),

    // ── Google Reviews ────────────────────────────────────────
    defineField({
      name: "reviewsBadge",
      title: "Bewertungen — Badge-Text",
      type: "string",
      initialValue: "Kundenstimmen",
      group: "reviews",
    }),
    defineField({
      name: "reviewsHeading",
      title: "Bewertungen — Überschrift",
      type: "string",
      initialValue: "Das sagen",
      group: "reviews",
    }),
    defineField({
      name: "reviewsHeadingAccent",
      title: "Bewertungen — Überschrift (Akzent)",
      type: "string",
      initialValue: "meine Klienten",
      group: "reviews",
    }),
    defineField({
      name: "reviewsText",
      title: "Bewertungen — Beschreibung",
      type: "text",
      rows: 2,
      initialValue: "Echte Erfahrungen meiner Klienten — unbearbeitet und direkt von Google.",
      group: "reviews",
    }),

    // ── Pricing ───────────────────────────────────────────────
    defineField({
      name: "pricingBadge",
      title: "Preise — Badge-Text",
      type: "string",
      initialValue: "Transparente Preise",
      group: "pricing",
    }),
    defineField({
      name: "pricingHeading",
      title: "Preise — Überschrift",
      type: "string",
      initialValue: "Faire Preise,",
      group: "pricing",
    }),
    defineField({
      name: "pricingHeadingAccent",
      title: "Preise — Überschrift (Akzent)",
      type: "string",
      initialValue: "spürbare Wirkung",
      group: "pricing",
    }),
    defineField({
      name: "pricingText",
      title: "Preise — Beschreibung",
      type: "text",
      rows: 2,
      initialValue: "Alle Behandlungen werden individuell auf Ihre Bedürfnisse abgestimmt.",
      group: "pricing",
    }),
    defineField({
      name: "pricingWkoUrl",
      title: "Preise — WKO-Link (Zuschüsse PDF)",
      type: "url",
      initialValue:
        "https://www.wko.at/oe/gewerbe-handwerk/fusspfleger-kosmetiker-masseure/tarife-heilmasseure.pdf",
      group: "pricing",
    }),

    // ── About Teaser ──────────────────────────────────────────
    defineField({
      name: "aboutTeaserBadge",
      title: "About-Teaser — Badge-Text",
      type: "string",
      initialValue: "Über Domenic Hacker",
      group: "aboutTeaser",
    }),
    defineField({
      name: "aboutTeaserHeading",
      title: "About-Teaser — Überschrift",
      type: "string",
      initialValue: "Diplomierter Heilmasseur",
      group: "aboutTeaser",
    }),
    defineField({
      name: "aboutTeaserHeadingAccent",
      title: "About-Teaser — Überschrift (Akzent)",
      type: "string",
      initialValue: "mit Leidenschaft",
      group: "aboutTeaser",
    }),
    defineField({
      name: "aboutTeaserImage",
      title: "About-Teaser — Bild",
      type: "image",
      options: { hotspot: true },
      group: "aboutTeaser",
    }),

    // ── Praxis ────────────────────────────────────────────────
    defineField({
      name: "praxisBadge",
      title: "Praxis — Badge-Text",
      type: "string",
      initialValue: "Die Praxis",
      group: "praxis",
    }),
    defineField({
      name: "praxisHeading",
      title: "Praxis — Überschrift",
      type: "string",
      initialValue: "Ihr Raum für",
      group: "praxis",
    }),
    defineField({
      name: "praxisHeadingAccent",
      title: "Praxis — Überschrift (Akzent)",
      type: "string",
      initialValue: "Erholung",
      group: "praxis",
    }),
    defineField({
      name: "praxisDescription",
      title: "Praxis — Beschreibung",
      type: "text",
      rows: 4,
      initialValue:
        "Meine Praxis befindet sich in einem ruhigen Altbau in der Josefstadt — mitten in Wien, aber abseits vom Trubel. Helle Räume, eine angenehme Atmosphäre und alles, was Sie für eine entspannte Behandlung brauchen.",
      group: "praxis",
    }),
    defineField({
      name: "praxisImage",
      title: "Praxis — Bild",
      type: "image",
      options: { hotspot: true },
      group: "praxis",
    }),
  ],
  groups: [
    { name: "hero", title: "Hero" },
    { name: "services", title: "Leistungen-Sektion" },
    { name: "portrait", title: "Portrait-Sektion" },
    { name: "reviews", title: "Bewertungen-Sektion" },
    { name: "pricing", title: "Preise-Sektion" },
    { name: "aboutTeaser", title: "Über-mich-Teaser" },
    { name: "praxis", title: "Praxis-Sektion" },
  ],
  preview: {
    prepare: () => ({ title: "Startseite" }),
  },
});
