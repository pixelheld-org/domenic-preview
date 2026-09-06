import { defineField, defineType } from "sanity";

export const pricingPageSchema = defineType({
  name: "pricingPage",
  title: "Preise (Seite /preise)",
  type: "document",
  fields: [
    // ── SEO ───────────────────────────────────────────────────
    defineField({
      name: "seoTitle",
      title: "SEO — Titel",
      type: "string",
      initialValue: "Preise — Heilmassage & Sportmassage Wien 1080",
      group: "seo",
    }),
    defineField({
      name: "seoDescription",
      title: "SEO — Meta-Beschreibung",
      type: "text",
      rows: 2,
      initialValue:
        "Transparente Preise für Heilmassage und Sportmassage in Wien 1080. Block-Karten ab 5 Behandlungen mit bis zu 12 % Vorteil. Krankenkassen-Rückerstattung möglich.",
      group: "seo",
    }),

    // ── Hero ──────────────────────────────────────────────────
    defineField({
      name: "heroBadge",
      title: "Hero — Badge",
      type: "string",
      initialValue: "Transparente Preise",
      group: "hero",
    }),
    defineField({
      name: "heroHeading",
      title: "Hero — Überschrift",
      type: "string",
      initialValue: "Preise für Heilmassage & Sportmassage",
      group: "hero",
    }),
    defineField({
      name: "heroHeadingAccent",
      title: "Hero — Akzent (orange)",
      type: "string",
      initialValue: "in Wien 1080",
      group: "hero",
    }),
    defineField({
      name: "heroText",
      title: "Hero — Einleitungstext",
      type: "text",
      rows: 3,
      initialValue:
        "Faire, transparente Preise für jede Behandlung. Egal ob einzelne Heilmassage, Sportmassage oder eine Block-Karte — Sie wissen vor der ersten Buchung, was es kostet. Plus: Rückerstattung über Ihre Krankenkasse möglich.",
      group: "hero",
    }),

    // ── Tabelle ───────────────────────────────────────────────
    defineField({
      name: "tableIntro",
      title: "Tabelle — Einleitung",
      type: "text",
      rows: 2,
      initialValue:
        "Alle Behandlungen werden individuell auf Ihre Bedürfnisse abgestimmt. Die Preise gelten pro Behandlung — Block-Karten sehen Sie weiter unten.",
      group: "table",
    }),

    // ── Block-Karten ──────────────────────────────────────────
    defineField({
      name: "blockCardsHeading",
      title: "Block-Karten — Überschrift",
      type: "string",
      initialValue: "Block-Karten — günstiger ab 5 Behandlungen",
      group: "blocks",
    }),
    defineField({
      name: "blockCardsText",
      title: "Block-Karten — Einleitung",
      type: "text",
      rows: 3,
      initialValue:
        "Wer regelmäßig kommt, profitiert: Block-Karten gibt es als 5er- oder 10er-Block, wahlweise für 30, 45 oder 60 Minuten. Beim Einlösen entscheiden Sie, welche Behandlung Sie nehmen — Heilmassage oder Sportmassage.",
      group: "blocks",
    }),

    // ── Krankenkassen ─────────────────────────────────────────
    defineField({
      name: "krankenkassenHeading",
      title: "Krankenkassen — Überschrift",
      type: "string",
      initialValue: "Krankenkassen-Rückerstattung",
      group: "krankenkassen",
    }),
    defineField({
      name: "krankenkassenIntro",
      title: "Krankenkassen — Einleitung",
      type: "text",
      rows: 3,
      initialValue:
        "Heilmassage kann mit ärztlicher Verordnung teilweise erstattet werden. Sportmassage zählt als Wellness-Leistung und ist nicht erstattbar. Die folgenden Werte sind Richtwerte (Stand 2026) — bitte direkt bei Ihrer Kasse erfragen.",
      group: "krankenkassen",
    }),
    defineField({
      name: "krankenkassen",
      title: "Krankenkassen — Liste",
      type: "array",
      group: "krankenkassen",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "name", title: "Kürzel (z.B. ÖGK)", type: "string" }),
            defineField({ name: "fullName", title: "Voller Name", type: "string" }),
            defineField({
              name: "reimbursement",
              title: "Erstattung",
              type: "string",
              description:
                'z.B. "ca. €10,60 (20 Min Heilmassage) bis ca. €16,90 (45 Min Lymphdrainage)"',
            }),
            defineField({
              name: "condition",
              title: "Voraussetzung",
              type: "text",
              rows: 2,
              description: 'z.B. "Ärztliche Verordnung + chefärztliche Bewilligung"',
            }),
          ],
          preview: { select: { title: "name", subtitle: "reimbursement" } },
        },
      ],
      initialValue: [
        {
          _key: "kk-oegk",
          name: "ÖGK",
          fullName: "Österreichische Gesundheitskasse",
          reimbursement:
            "ca. €10,60 (20 Min Heilmassage) bis ca. €16,90 (45 Min Lymphdrainage)",
          condition:
            "Ärztliche Verordnung nötig. Bis 30.06.2027 keine chefärztliche Bewilligung erforderlich.",
        },
        {
          _key: "kk-bvaeb",
          name: "BVAEB",
          fullName: "Versicherungsanstalt öffentlich Bediensteter",
          reimbursement:
            "ca. €11,20 (20 Min Heilmassage) bis ca. €17,70 (45 Min Lymphdrainage)",
          condition:
            "Ärztliche Verordnung + chefärztliche Bewilligung vor Therapiebeginn.",
        },
        {
          _key: "kk-svs",
          name: "SVS",
          fullName: "Sozialversicherung der Selbständigen",
          reimbursement:
            "ca. €5,66 (15–20 Min Heilmassage) bis ca. €21,22 (60 Min Lymphdrainage)",
          condition:
            "Ärztliche Verordnung + chefärztliche Bewilligung. SVS-Gesundheitshunderter zusätzlich möglich.",
        },
        {
          _key: "kk-privat",
          name: "Privat",
          fullName: "Private Zusatzversicherungen",
          reimbursement: "Bis zu 100 % je nach Tarif",
          condition: "Tarif-abhängig — Police prüfen.",
        },
      ],
    }),
    defineField({
      name: "krankenkassenDisclaimer",
      title: "Krankenkassen — Disclaimer",
      type: "text",
      rows: 3,
      initialValue:
        "Stand 01.01.2026 — Richtwerte aus den Kassen-Vertragstarifen für Wahltherapie. Tatsächliche Erstattung hängt von Behandlungstyp, Dauer und individuellem Versicherungsstatus ab. Heilmassage wird grundsätzlich nur mit gültiger ärztlicher Verordnung erstattet. Sportmassage ist als Wellness-Leistung nicht erstattbar. Bitte vor Behandlungsbeginn direkt bei Ihrer Kasse erfragen.",
      group: "krankenkassen",
    }),

    // ── Voucher-CTA ───────────────────────────────────────────
    defineField({
      name: "voucherCtaHeading",
      title: "Gutschein-CTA — Überschrift",
      type: "string",
      initialValue: "Gutscheine verschenken",
      group: "voucher",
    }),
    defineField({
      name: "voucherCtaText",
      title: "Gutschein-CTA — Text",
      type: "text",
      rows: 2,
      initialValue:
        "Gutscheine sind in jedem Wert oder als Block-Karte erhältlich. Drei Jahre gültig, sofort als PDF per E-Mail.",
      group: "voucher",
    }),

    // ── FAQ ───────────────────────────────────────────────────
    defineField({
      name: "faqs",
      title: "Häufige Fragen zu Preisen",
      type: "array",
      group: "faqs",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "question", title: "Frage", type: "string" }),
            defineField({ name: "answer", title: "Antwort", type: "text", rows: 5 }),
          ],
          preview: { select: { title: "question" } },
        },
      ],
      initialValue: [
        {
          _key: "faq-1",
          question: "Was kostet eine Behandlung bei Domenic Hacker?",
          answer:
            "Eine 30-minütige Behandlung kostet €55, 45 Minuten €70, 60 Minuten €85. Block-Karten gibt es ab 5 Behandlungen mit Vorteil — siehe Tabelle weiter oben.",
        },
        {
          _key: "faq-2",
          question: "Wie funktionieren Block-Karten?",
          answer:
            "Eine Block-Karte ist ein Vorauskauf mehrerer Behandlungen mit Preisvorteil. Sie wählen Größe (5er oder 10er) und Dauer (30, 45 oder 60 Min) beim Kauf. Beim Einlösen ist die Behandlungsart frei wählbar — Heilmassage oder Sportmassage. Block-Karten sind 3 Jahre gültig.",
        },
        {
          _key: "faq-3",
          question: "Bekomme ich die Behandlung von der Krankenkasse erstattet?",
          answer:
            "Heilmassage wird von einigen Kassen teilweise erstattet — meist mit ärztlicher Überweisung. Konkrete Beträge finden Sie in der Tabelle weiter oben. Sportmassage ist eine Wellness-Leistung und nicht erstattbar.",
        },
        {
          _key: "faq-4",
          question: "Sind Gutscheine personalisiert?",
          answer:
            "Auf Wunsch: Beim Kauf können Sie einen Empfänger-Namen angeben, der dann auf dem PDF-Gutschein erscheint. Ohne Angabe ist der Gutschein neutral und übertragbar.",
        },
        {
          _key: "faq-5",
          question: "Wie bezahle ich?",
          answer:
            "Vor Ort entweder bar oder per Bankomatkarte. Gutscheine werden online via Stripe gekauft (Karte, Apple Pay, Google Pay, SEPA-Lastschrift).",
        },
        {
          _key: "faq-6",
          question: "Bekomme ich eine Rechnung?",
          answer:
            "Ja, auf Wunsch. Bei Online-Gutschein-Käufen wird die Rechnung automatisch per E-Mail gesendet. Vor Ort einfach Bescheid geben.",
        },
      ],
    }),

    // ── Closing CTA ───────────────────────────────────────────
    defineField({
      name: "ctaHeading",
      title: "Closing CTA — Überschrift",
      type: "string",
      initialValue: "Bereit für Ihren Termin?",
      group: "cta",
    }),
    defineField({
      name: "ctaText",
      title: "Closing CTA — Text",
      type: "text",
      rows: 2,
      initialValue:
        "Buchen Sie direkt online — oder verschenken Sie einen Gutschein an jemanden, dem etwas Gutes gut täte.",
      group: "cta",
    }),
  ],
  groups: [
    { name: "seo", title: "SEO" },
    { name: "hero", title: "Hero" },
    { name: "table", title: "Preistabelle" },
    { name: "blocks", title: "Block-Karten" },
    { name: "krankenkassen", title: "Krankenkassen" },
    { name: "voucher", title: "Gutschein-CTA" },
    { name: "faqs", title: "FAQs" },
    { name: "cta", title: "Closing CTA" },
  ],
  preview: {
    prepare: () => ({ title: "Preise (Seite /preise)" }),
  },
});
