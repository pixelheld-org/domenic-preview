import { defineField, defineType } from "sanity";

export const gutscheinePageSchema = defineType({
  name: "gutscheinePage",
  title: "Gutscheine (Seite /gutscheine)",
  type: "document",
  fields: [
    // ── SEO ───────────────────────────────────────────────────
    defineField({
      name: "seoTitle",
      title: "SEO — Titel",
      type: "string",
      initialValue:
        "Massage-Gutscheine Wien 1080 · sofort als PDF | Heilmasseur Domenic Hacker",
      group: "seo",
    }),
    defineField({
      name: "seoDescription",
      title: "SEO — Meta-Beschreibung",
      type: "text",
      rows: 2,
      initialValue:
        "Massage-Gutscheine aus Wien 1080 — sofort als PDF per E-Mail, 3 Jahre gültig. Block-Karten ab 5 Behandlungen mit bis zu 12 % Vorteil oder Einzelgutschein mit frei wählbarem Wert.",
      group: "seo",
    }),

    // ── Hero ──────────────────────────────────────────────────
    defineField({
      name: "heroBadge",
      title: "Hero — Badge",
      type: "string",
      initialValue: "Geschenke, die wirklich gut tun",
      group: "hero",
    }),
    defineField({
      name: "heroHeading",
      title: "Hero — Überschrift",
      type: "string",
      initialValue: "Massage-Gutscheine",
      group: "hero",
    }),
    defineField({
      name: "heroHeadingAccent",
      title: "Hero — Akzent (orange)",
      type: "string",
      initialValue: "aus Wien 1080",
      group: "hero",
    }),
    defineField({
      name: "heroText",
      title: "Hero — Einleitungstext",
      type: "text",
      rows: 3,
      initialValue:
        "Gutscheine sind sofort als PDF verfügbar — drei Jahre gültig, einlösbar gegen jede Behandlung. Block-Karten geben extra Vorteil ab fünf Behandlungen.",
      group: "hero",
    }),

    // ── Block-Karten-Sektion ──────────────────────────────────
    defineField({
      name: "blocksEyebrow",
      title: "Block-Karten — Eyebrow",
      type: "string",
      initialValue: "Für sich selbst — Stammkunden-Vorteil",
      group: "blocks",
    }),
    defineField({
      name: "blocksHeading",
      title: "Block-Karten — Überschrift",
      type: "string",
      initialValue: "Block-Karte kaufen",
      group: "blocks",
    }),
    defineField({
      name: "blocksText",
      title: "Block-Karten — Einleitung",
      type: "text",
      rows: 2,
      initialValue:
        "Bis zu 12 % sparen. Ideal wenn Sie regelmäßig Behandlungen brauchen.",
      group: "blocks",
    }),
    defineField({
      name: "blocksDurationLabel",
      title: "Block-Karten — Label über Dauer-Auswahl",
      type: "string",
      initialValue: "Behandlungsdauer wählen",
      group: "blocks",
    }),

    // ── Einzelgutschein-Sektion ───────────────────────────────
    defineField({
      name: "customEyebrow",
      title: "Einzelgutschein — Eyebrow",
      type: "string",
      initialValue: "Zum Verschenken",
      group: "custom",
    }),
    defineField({
      name: "customHeading",
      title: "Einzelgutschein — Überschrift",
      type: "string",
      initialValue: "Einzelgutschein",
      group: "custom",
    }),
    defineField({
      name: "customText",
      title: "Einzelgutschein — Einleitung",
      type: "text",
      rows: 2,
      initialValue:
        "Frei wählbarer Betrag — perfekt für Geburtstag, Weihnachten oder Muttertag. 3 Jahre gültig, Restguthaben bleibt erhalten.",
      group: "custom",
    }),
    defineField({
      name: "customCardTitle",
      title: "Einzelgutschein — Card-Titel",
      type: "string",
      initialValue: "Beliebiger Geschenk-Betrag",
      group: "custom",
    }),
    defineField({
      name: "customCardSubtext",
      title: "Einzelgutschein — Card-Untertext",
      type: "string",
      description:
        "Wird hinter dem Betragsbereich angezeigt. Beispiel: 'einlösbar auf jede Behandlung'.",
      initialValue: "einlösbar auf jede Behandlung",
      group: "custom",
    }),

    // ── Details-Schritt ───────────────────────────────────────
    defineField({
      name: "detailsHeading",
      title: "Details — Überschrift",
      type: "string",
      initialValue: "Ihre Daten",
      group: "details",
    }),
    defineField({
      name: "detailsText",
      title: "Details — Einleitung",
      type: "text",
      rows: 2,
      initialValue:
        "Wir senden Ihnen den Gutschein als PDF an die angegebene E-Mail-Adresse.",
      group: "details",
    }),
    defineField({
      name: "recipientHelpText",
      title: "Details — Hinweis unter Empfänger-Feld",
      type: "text",
      rows: 2,
      initialValue:
        "Der Name erscheint auf dem PDF-Gutschein. Ohne Angabe ist der Gutschein neutral.",
      group: "details",
    }),

    // ── Zahlungs-Schritt ──────────────────────────────────────
    defineField({
      name: "paymentHeading",
      title: "Zahlung — Überschrift",
      type: "string",
      initialValue: "Zahlung",
      group: "payment",
    }),
    defineField({
      name: "paymentText",
      title: "Zahlung — Einleitung",
      type: "text",
      rows: 2,
      initialValue:
        "Sicher bezahlen via Stripe — Karten, Apple Pay, Google Pay, SEPA.",
      group: "payment",
    }),
    defineField({
      name: "agbNotice",
      title: "Zahlung — AGB- / Widerrufs-Hinweis",
      type: "text",
      rows: 3,
      initialValue:
        "Mit dem Klick auf Bezahlen bestätigen Sie unsere AGB und das Widerrufsrecht. Hinweis: Bei digitalen Inhalten (PDF-Gutschein) erlischt das Widerrufsrecht nach Lieferung des PDFs an die angegebene E-Mail-Adresse (§ 18 FAGG).",
      group: "payment",
    }),
  ],
  groups: [
    { name: "seo", title: "SEO" },
    { name: "hero", title: "Hero" },
    { name: "blocks", title: "Block-Karten" },
    { name: "custom", title: "Einzelgutschein" },
    { name: "details", title: "Details-Schritt" },
    { name: "payment", title: "Zahlungs-Schritt" },
  ],
  preview: {
    prepare: () => ({ title: "Gutscheine (Seite /gutscheine)" }),
  },
});
