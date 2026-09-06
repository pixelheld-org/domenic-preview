import type { StructureBuilder } from "sanity/structure";
import { DashboardIcon } from "@sanity/icons";
import { VoucherDashboard } from "./dashboard/VoucherDashboard";

// Helper: singleton document list item
function singleton(S: StructureBuilder, title: string, schemaType: string, id: string) {
  return S.listItem()
    .title(title)
    .id(id)
    .child(S.document().schemaType(schemaType).documentId(id));
}

const VOUCHER_ORDER: { field: string; direction: "asc" | "desc" }[] = [
  { field: "purchasedAt", direction: "desc" },
];

function voucherSubList(
  S: StructureBuilder,
  opts: { id: string; title: string; filter: string },
) {
  return S.listItem()
    .title(opts.title)
    .id(opts.id)
    .child(
      S.documentList()
        .title(opts.title)
        .schemaType("voucher")
        .filter(opts.filter)
        .defaultOrdering(VOUCHER_ORDER),
    );
}

export const deskStructure = (S: StructureBuilder) =>
  S.list()
    .title("Inhalt")
    .items([
      // ── Dashboard ─────────────────────────────────────────
      S.listItem()
        .title("Dashboard")
        .id("dashboard")
        .icon(DashboardIcon)
        .child(S.component(VoucherDashboard).id("voucherDashboard").title("Übersicht")),

      S.divider(),

      // ── Allgemein ─────────────────────────────────────────
      S.listItem()
        .title("Allgemein")
        .child(
          S.list()
            .title("Allgemein")
            .items([
              singleton(S, "Einstellungen", "settings", "settings"),
            ])
        ),

      S.divider(),

      // ── Seiten ────────────────────────────────────────────
      singleton(S, "Startseite", "homePage", "homePage"),
      singleton(S, "Heilmassage Wien", "heilmassagePage", "heilmassagePage"),
      singleton(S, "Sportmassage Wien", "sportmassagePage", "sportmassagePage"),
      singleton(S, "Preise (Seite)", "pricingPage", "pricingPage"),
      singleton(S, "Gutscheine (Seite)", "gutscheinePage", "gutscheinePage"),
      singleton(S, "Block-Karten Preise", "blockPricing", "blockPricing"),
      singleton(S, "Über mich", "about", "about"),
      singleton(S, "Buchen", "buchenPage", "buchenPage"),
      singleton(S, "Impressum", "impressumPage", "impressumPage"),
      singleton(S, "Datenschutz", "datenschutzPage", "datenschutzPage"),

      S.divider(),

      // ── Inhalte (Listen) ──────────────────────────────────
      S.listItem()
        .title("Leistungen")
        .schemaType("service")
        .child(S.documentTypeList("service").title("Leistungen")),

      S.listItem()
        .title("Preise")
        .schemaType("pricingItem")
        .child(S.documentTypeList("pricingItem").title("Preise")),

      S.listItem()
        .title("FAQs (Startseite)")
        .schemaType("faqItem")
        .child(S.documentTypeList("faqItem").title("FAQs")),

      S.listItem()
        .title("Kundenstimmen")
        .schemaType("testimonial")
        .child(S.documentTypeList("testimonial").title("Kundenstimmen")),

      // ── Gutscheine (gruppiert nach Status) ────────────────
      S.listItem()
        .title("Gutscheine")
        .id("vouchers")
        .schemaType("voucher")
        .child(
          S.list()
            .title("Gutscheine")
            .items([
              voucherSubList(S, {
                id: "vouchers-active",
                title: "Aktiv",
                filter: '_type == "voucher" && status in ["paid", "partially_redeemed"]',
              }),
              voucherSubList(S, {
                id: "vouchers-redeemed",
                title: "Eingelöst",
                filter: '_type == "voucher" && status == "fully_redeemed"',
              }),
              voucherSubList(S, {
                id: "vouchers-problems",
                title: "Probleme",
                filter:
                  '_type == "voucher" && status in ["paid_pdf_failed", "paid_email_failed", "expired", "cancelled"]',
              }),
              S.divider(),
              voucherSubList(S, {
                id: "vouchers-all",
                title: "Alle",
                filter: '_type == "voucher"',
              }),
            ]),
        ),
    ]);
