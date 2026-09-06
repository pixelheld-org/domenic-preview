import { defineField, defineType } from "sanity";

// Block-Karten Preise — Singleton-Dokument, gelesen von:
// - /preise (Anzeige der Block-Karten-Tabelle)
// - /gutscheine (Selector + checkout-API für price_data inline)
// - app/api/checkout/route.ts (Server liest Soll-Preis hier, schreibt ihn
//   als session.metadata.expectedAmountCents für die Webhook-Defense)
//
// "price" ist der reale Verkaufspreis (was der Kunde bezahlt).
// "fullPrice" ist der durchgestrichene "statt €X"-Wert für die UI-Ersparnis-
// Anzeige — kein Stripe-relevanter Wert, nur Marketing-Anker.
export const blockPricingSchema = defineType({
  name: "blockPricing",
  title: "Block-Karten Preise",
  type: "document",
  fieldsets: [
    {
      name: "block5",
      title: "5er-Block",
      options: { collapsible: true, collapsed: false },
    },
    {
      name: "block10",
      title: "10er-Block",
      options: { collapsible: true, collapsed: false },
    },
  ],
  fields: [
    // ── 5er-Block ──────────────────────────────────────────────
    defineField({
      name: "block_5_30_price",
      title: "5er · 30 Min — Preis (EUR)",
      type: "number",
      initialValue: 259,
      validation: (Rule) => Rule.required().integer().min(50).max(5000),
      fieldset: "block5",
    }),
    defineField({
      name: "block_5_30_fullPrice",
      title: "5er · 30 Min — Statt-Preis (EUR)",
      description: "Durchgestrichener Vergleichspreis. Sollte > Preis sein.",
      type: "number",
      initialValue: 275,
      validation: (Rule) => Rule.required().integer().min(50).max(5000),
      fieldset: "block5",
    }),
    defineField({
      name: "block_5_45_price",
      title: "5er · 45 Min — Preis (EUR)",
      type: "number",
      initialValue: 329,
      validation: (Rule) => Rule.required().integer().min(50).max(5000),
      fieldset: "block5",
    }),
    defineField({
      name: "block_5_45_fullPrice",
      title: "5er · 45 Min — Statt-Preis (EUR)",
      type: "number",
      initialValue: 350,
      validation: (Rule) => Rule.required().integer().min(50).max(5000),
      fieldset: "block5",
    }),
    defineField({
      name: "block_5_60_price",
      title: "5er · 60 Min — Preis (EUR)",
      type: "number",
      initialValue: 399,
      validation: (Rule) => Rule.required().integer().min(50).max(5000),
      fieldset: "block5",
    }),
    defineField({
      name: "block_5_60_fullPrice",
      title: "5er · 60 Min — Statt-Preis (EUR)",
      type: "number",
      initialValue: 425,
      validation: (Rule) => Rule.required().integer().min(50).max(5000),
      fieldset: "block5",
    }),

    // ── 10er-Block ─────────────────────────────────────────────
    defineField({
      name: "block_10_30_price",
      title: "10er · 30 Min — Preis (EUR)",
      type: "number",
      initialValue: 489,
      validation: (Rule) => Rule.required().integer().min(50).max(5000),
      fieldset: "block10",
    }),
    defineField({
      name: "block_10_30_fullPrice",
      title: "10er · 30 Min — Statt-Preis (EUR)",
      type: "number",
      initialValue: 550,
      validation: (Rule) => Rule.required().integer().min(50).max(5000),
      fieldset: "block10",
    }),
    defineField({
      name: "block_10_45_price",
      title: "10er · 45 Min — Preis (EUR)",
      type: "number",
      initialValue: 619,
      validation: (Rule) => Rule.required().integer().min(50).max(5000),
      fieldset: "block10",
    }),
    defineField({
      name: "block_10_45_fullPrice",
      title: "10er · 45 Min — Statt-Preis (EUR)",
      type: "number",
      initialValue: 700,
      validation: (Rule) => Rule.required().integer().min(50).max(5000),
      fieldset: "block10",
    }),
    defineField({
      name: "block_10_60_price",
      title: "10er · 60 Min — Preis (EUR)",
      type: "number",
      initialValue: 749,
      validation: (Rule) => Rule.required().integer().min(50).max(5000),
      fieldset: "block10",
    }),
    defineField({
      name: "block_10_60_fullPrice",
      title: "10er · 60 Min — Statt-Preis (EUR)",
      type: "number",
      initialValue: 850,
      validation: (Rule) => Rule.required().integer().min(50).max(5000),
      fieldset: "block10",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Block-Karten Preise" }),
  },
});
