import { defineField, defineType } from "sanity";

export const settingsSchema = defineType({
  name: "settings",
  title: "Einstellungen",
  type: "document",
  fields: [
    defineField({
      name: "siteTitle",
      title: "Website-Titel",
      type: "string",
      initialValue: "Heilmasseur Domenic Hacker | Heilmassage Wien 1080",
    }),
    defineField({
      name: "siteDescription",
      title: "Meta-Beschreibung",
      type: "text",
      rows: 2,
      initialValue:
        "Diplomierter Heilmasseur in Wien 1080 (Josefstadt). Heilmassage, Lymphdrainage & Klassische Massage. Termine online buchen.",
    }),
    defineField({
      name: "heroHeadline",
      title: "Hero Überschrift (Zeile 1)",
      type: "string",
      initialValue: "Weniger Schmerzen.",
    }),
    defineField({
      name: "heroHeadlineAccent",
      title: "Hero Überschrift (Zeile 2, goldene Farbe)",
      type: "string",
      initialValue: "Tiefe Entspannung.",
    }),
    defineField({
      name: "heroSubheading",
      title: "Hero Untertext",
      type: "text",
      rows: 2,
      initialValue:
        "Gezielte Heilmassage bei Verspannungen, Stress und Rückenbeschwerden. Ihr Raum für Entspannung und Heilung in Wien 1080.",
    }),
    defineField({
      name: "address",
      title: "Adresse",
      type: "string",
      initialValue: "Feldgasse 3/20, 1080 Wien",
    }),
    defineField({
      name: "phone",
      title: "Telefon",
      type: "string",
      initialValue: "+43 670 189 52 56",
    }),
    defineField({
      name: "email",
      title: "E-Mail",
      type: "string",
      initialValue: "praxis@heilmasseur-domenic.at",
    }),
    defineField({
      name: "calendlyUrl",
      title: "Calendly URL",
      type: "url",
      initialValue: "https://calendly.com/praxis-heilmasseur-domenic",
    }),
    defineField({
      name: "insuranceText",
      title: "Kassentext (Preise-Sektion)",
      type: "text",
      rows: 4,
      initialValue:
        "Je nach Krankenkasse bekommen Sie einen Teil Ihrer Massagekosten zurück. Sie haben auch die Möglichkeit, einen Teil der Therapiekosten bei einer Zusatzversicherung einzureichen. Privatversicherungen erstatten bis zu 100% der Therapiekosten zurück. Informieren Sie sich jetzt — es lohnt sich!",
    }),
    defineField({
      name: "instagramUrl",
      title: "Instagram URL",
      type: "url",
      initialValue: "https://www.instagram.com/heilmasseurdomenic",
    }),
    defineField({
      name: "googleMapsUrl",
      title: "Google Maps Link",
      type: "url",
      initialValue: "https://maps.google.com/?q=Feldgasse+3,+1080+Wien",
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
    }),
  ],
  preview: {
    select: { title: "siteTitle" },
  },
});
