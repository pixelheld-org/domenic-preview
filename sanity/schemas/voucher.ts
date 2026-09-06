import { defineField, defineType } from "sanity";

export const voucherSchema = defineType({
  name: "voucher",
  title: "Gutschein",
  type: "document",
  fields: [
    defineField({
      name: "code",
      title: "Code (GS-XXXX-XXXX)",
      type: "string",
      validation: (rule) => rule.required(),
      readOnly: true,
      options: { search: { weight: 50 } },
    }),
    defineField({
      name: "stripeSessionId",
      title: "Stripe Checkout Session ID",
      type: "string",
      validation: (rule) => rule.required(),
      readOnly: true,
    }),
    defineField({
      name: "stripePaymentIntentId",
      title: "Stripe Payment Intent ID",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "productType",
      title: "Produkttyp",
      type: "string",
      options: {
        list: [
          { title: "5er-Block 30 Min", value: "block_5_30" },
          { title: "5er-Block 45 Min", value: "block_5_45" },
          { title: "5er-Block 60 Min", value: "block_5_60" },
          { title: "10er-Block 30 Min", value: "block_10_30" },
          { title: "10er-Block 45 Min", value: "block_10_45" },
          { title: "10er-Block 60 Min", value: "block_10_60" },
          { title: "Einzelgutschein (Custom)", value: "voucher_custom" },
        ],
      },
      validation: (rule) => rule.required(),
      readOnly: true,
    }),
    // Block-Felder
    defineField({
      name: "sessionsTotal",
      title: "Anzahl Behandlungen (Block)",
      type: "number",
      description: "5 oder 10 — nur bei Block",
      readOnly: true,
    }),
    defineField({
      name: "sessionsRemaining",
      title: "Verbleibende Behandlungen",
      type: "number",
      description: "Wird beim Einloesen reduziert",
      validation: (rule) => rule.min(0).integer(),
    }),
    defineField({
      name: "durationMin",
      title: "Behandlungsdauer (Min)",
      type: "number",
      description: "30, 45 oder 60 — nur bei Block",
      readOnly: true,
    }),
    // Custom-Voucher-Felder
    defineField({
      name: "customAmount",
      title: "Custom-Betrag (EUR)",
      type: "number",
      description: "Nur bei Einzelgutschein",
      readOnly: true,
    }),
    defineField({
      name: "customAmountRemaining",
      title: "Verbleibender Betrag (EUR)",
      type: "number",
      description: "Wird beim Einloesen reduziert",
      validation: (rule) => rule.min(0),
    }),
    // Kaeufer-Daten
    defineField({
      name: "buyerEmail",
      title: "Kaeufer E-Mail",
      type: "string",
      validation: (rule) => rule.required().email(),
      readOnly: true,
    }),
    defineField({
      name: "buyerName",
      title: "Kaeufer Name",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "recipientName",
      title: "Beschenkter Name (optional, fuer PDF)",
      type: "string",
      readOnly: true,
    }),
    // Status
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Bezahlt — bereit", value: "paid" },
          { title: "Teilweise eingeloest", value: "partially_redeemed" },
          { title: "Vollstaendig eingeloest", value: "fully_redeemed" },
          { title: "Abgelaufen", value: "expired" },
          { title: "Storniert", value: "cancelled" },
          { title: "PDF-Generierung fehlgeschlagen", value: "paid_pdf_failed" },
          { title: "E-Mail-Versand fehlgeschlagen", value: "paid_email_failed" },
        ],
      },
      initialValue: "paid",
    }),
    // Einloesungen
    defineField({
      name: "redemptions",
      title: "Einloesungen",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "date", title: "Datum", type: "datetime", validation: (r) => r.required() }),
            defineField({ name: "sessionsRedeemed", title: "Anzahl Behandlungen (Block)", type: "number" }),
            defineField({ name: "amountRedeemed", title: "Eingeloester Betrag (EUR)", type: "number" }),
            defineField({ name: "note", title: "Notiz", type: "string" }),
          ],
          preview: {
            select: { date: "date", sessionsRedeemed: "sessionsRedeemed", amountRedeemed: "amountRedeemed" },
            prepare: ({ date, sessionsRedeemed, amountRedeemed }: { date?: string; sessionsRedeemed?: number; amountRedeemed?: number }) => {
              const what = sessionsRedeemed
                ? `${sessionsRedeemed} Beh.`
                : amountRedeemed
                ? `EUR ${amountRedeemed}`
                : "—";
              return { title: what, subtitle: date ? new Date(date).toLocaleDateString("de-AT") : "" };
            },
          },
        },
      ],
    }),
    // Daten
    defineField({
      name: "purchasedAt",
      title: "Gekauft am",
      type: "datetime",
      validation: (rule) => rule.required(),
      readOnly: true,
    }),
    defineField({
      name: "expiresAt",
      title: "Gueltig bis",
      type: "datetime",
      validation: (rule) => rule.required(),
      description: "3 Jahre nach Kauf",
      readOnly: true,
    }),
    // PDF
    defineField({
      name: "pdfAsset",
      title: "Gutschein-PDF",
      type: "file",
      readOnly: true,
    }),
  ],
  orderings: [
    {
      title: "Neueste zuerst",
      name: "purchasedAtDesc",
      by: [{ field: "purchasedAt", direction: "desc" }],
    },
    {
      title: "Status",
      name: "statusAsc",
      by: [{ field: "status", direction: "asc" }],
    },
  ],
  preview: {
    select: { code: "code", productType: "productType", buyerName: "buyerName", buyerEmail: "buyerEmail", status: "status" },
    prepare: ({ code, productType, buyerName, buyerEmail, status }: { code?: string; productType?: string; buyerName?: string; buyerEmail?: string; status?: string }) => {
      const PRODUCT_LABELS: Record<string, string> = {
        block_5_30: "5x30 Min",
        block_5_45: "5x45 Min",
        block_5_60: "5x60 Min",
        block_10_30: "10x30 Min",
        block_10_45: "10x45 Min",
        block_10_60: "10x60 Min",
        voucher_custom: "Einzelgutschein",
      };
      const STATUS_LABELS: Record<string, string> = {
        paid: "+ bereit",
        partially_redeemed: "~ teilw.",
        fully_redeemed: "+ eingeloest",
        expired: "x abgelaufen",
        cancelled: "x storniert",
        paid_pdf_failed: "! PDF-Fehler",
        paid_email_failed: "! Mail-Fehler",
      };
      return {
        title: `${code} — ${PRODUCT_LABELS[productType as string] ?? productType}`,
        subtitle: `${buyerName || buyerEmail} · ${STATUS_LABELS[status as string] ?? status}`,
      };
    },
  },
});
