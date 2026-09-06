# Plan 1: `/preise` — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Eigenständige `/preise`-Seite mit Sanity-Editierbarkeit, Block-Karten-Übersicht, Krankenkassen-Tabelle, FAQ und vollständigen SEO-Strukturdaten — als erste Phase-1-Implementierung, die das Pattern für alle folgenden Routen etabliert.

**Architecture:** Neues Sanity-Singleton `pricingPage` als Inhaltsquelle; `Pricing.tsx` wird in einen reinen Section-Wrapper umgewandelt und nutzt die neue, wiederverwendbare `PricingTable`-Komponente; die Route `/preise` rendert Hero + Tabelle + Block-Karten + Krankenkassen-Tabelle + FAQ + CTA mit Breadcrumbs, OfferCatalog-JsonLd und FAQ-JsonLd. Bestehende Home-Sektion bleibt visuell unverändert.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind v4, Sanity CMS v5 + next-sanity, lucide-react, `@sanity/image-url`. Kein Test-Framework — Verifikation manuell via Browser-Smoke-Tests, `npx tsc --noEmit`, `npm run build`.

**Spec reference:** `docs/superpowers/specs/2026-05-07-phase1-design.md` §4 (`/preise`), §8 (SEO-übergreifend), §9.1 (Testing), §10 (Reihenfolge: Plan 1 zuerst).

---

## File Structure

```
sanity/schemas/
  pricingPage.ts                       # CREATE — neues Singleton
  index.ts                             # MODIFY — pricingPageSchema registrieren

sanity/lib/
  queries.ts                           # MODIFY — SanityPricingPage Typ + getPricingPage()

components/
  PricingTable.tsx                     # CREATE — extrahierte Tabelle (aus Pricing.tsx)
  Pricing.tsx                          # MODIFY — Section-Wrapper über PricingTable
  BlockCardOverview.tsx                # CREATE — 6 Block-Optionen + Einzelgutschein-CTA
  KrankenkassenTabelle.tsx             # CREATE — SEO-Tabelle Erstattungsbeträge
  Breadcrumbs.tsx                      # CREATE — sichtbare Breadcrumbs + Inline-JsonLd
  JsonLdOffer.tsx                      # CREATE — OfferCatalog für pricingItems
  Footer.tsx                           # MODIFY — neue Sektion „Angebot"

app/
  preise/page.tsx                      # CREATE — Route /preise
  sitemap.ts                           # MODIFY — /preise eintragen
  heilmassage-wien-1080/page.tsx       # MODIFY — Hub-Link „Preise einsehen" einfügen
```

**Decomposition rationale:** `PricingTable` wird isoliert, weil sie auf zwei Seiten gebraucht wird (Home + `/preise`) und unabhängig von Domain-Logik ist. `BlockCardOverview` und `KrankenkassenTabelle` sind eigenständig, weil sie spezifische Inhaltslogik kapseln und auf `/gutscheine` evtl. wiederverwendet werden. `Breadcrumbs` ist ein Cross-Cutting-Pattern für alle Phase-1-Seiten.

---

## Commits Overview

Insgesamt 6 logische Commits:

1. Sanity-Schema `pricingPage` (Schema + Registrierung + Query)
2. Refactor `Pricing.tsx` → `PricingTable` extrahieren
3. Helper-Komponenten (Breadcrumbs, JsonLdOffer)
4. Inhaltskomponenten (BlockCardOverview, KrankenkassenTabelle)
5. Route `/preise` mit allem zusammengesetzt
6. Sitemap + Footer „Angebot" + Hub-Link von Heilmassage

---

## Task 1: Sanity-Schema `pricingPage` erstellen

**Files:**
- Create: `sanity/schemas/pricingPage.ts`

- [ ] **Step 1.1: Schema-Datei anlegen**

Erstelle `sanity/schemas/pricingPage.ts` mit folgendem Inhalt:

```ts
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
        "Heilmassage kann je nach Kasse teilweise erstattet werden. Sportmassage zählt als Wellness-Leistung und ist nicht erstattbar. Die folgenden Werte sind Richtwerte — bitte direkt bei Ihrer Kasse erfragen.",
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
              description: 'z.B. "ca. €15 pro Behandlung (max. 10/Jahr)"',
            }),
            defineField({
              name: "condition",
              title: "Voraussetzung",
              type: "text",
              rows: 2,
              description: 'z.B. "Ärztliche Überweisung erforderlich"',
            }),
          ],
          preview: { select: { title: "name", subtitle: "reimbursement" } },
        },
      ],
    }),
    defineField({
      name: "krankenkassenDisclaimer",
      title: "Krankenkassen — Disclaimer",
      type: "text",
      rows: 2,
      initialValue:
        "Die angegebenen Beträge sind Richtwerte (Stand 2026) und können je nach Tarif und Versicherungsstatus variieren. Bitte direkt bei Ihrer Kasse erfragen.",
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
```

- [ ] **Step 1.2: TypeScript-Check ausführen**

Run: `npx tsc --noEmit`
Expected: 0 Fehler.

---

## Task 2: Schema in `index.ts` registrieren

**Files:**
- Modify: `sanity/schemas/index.ts`

- [ ] **Step 2.1: Import + Registrierung hinzufügen**

Aktuelle Datei `sanity/schemas/index.ts` durch folgenden Inhalt ersetzen:

```ts
import { serviceSchema } from "./service";
import { pricingItemSchema } from "./pricingItem";
import { faqItemSchema } from "./faqItem";
import { testimonialSchema } from "./testimonial";
import { aboutSchema } from "./about";
import { settingsSchema } from "./settings";
import { homePageSchema } from "./homePage";
import { heilmassagePageSchema } from "./heilmassagePage";
import { buchenPageSchema } from "./buchenPage";
import { impressumPageSchema } from "./impressumPage";
import { datenschutzPageSchema } from "./datenschutzPage";
import { pricingPageSchema } from "./pricingPage";

export const schemaTypes = [
  settingsSchema,
  homePageSchema,
  heilmassagePageSchema,
  pricingPageSchema,
  buchenPageSchema,
  impressumPageSchema,
  datenschutzPageSchema,
  aboutSchema,
  serviceSchema,
  pricingItemSchema,
  faqItemSchema,
  testimonialSchema,
];
```

- [ ] **Step 2.2: TypeScript-Check ausführen**

Run: `npx tsc --noEmit`
Expected: 0 Fehler.

---

## Task 3: Type + Query in `queries.ts` ergänzen

**Files:**
- Modify: `sanity/lib/queries.ts`

- [ ] **Step 3.1: Typ `SanityPricingPage` einfügen**

In `sanity/lib/queries.ts`, nach dem `SanityHeilmassagePage`-Block (etwa nach Zeile 130, vor dem `SanityBuchenPage`-Block), folgende beiden Typen einfügen:

```ts
export type SanityKrankenkasse = {
  name: string;
  fullName: string;
  reimbursement: string;
  condition: string;
};

export type SanityPricingPage = {
  seoTitle: string;
  seoDescription: string;
  heroBadge: string;
  heroHeading: string;
  heroHeadingAccent: string;
  heroText: string;
  tableIntro: string;
  blockCardsHeading: string;
  blockCardsText: string;
  krankenkassenHeading: string;
  krankenkassenIntro: string;
  krankenkassen: SanityKrankenkasse[];
  krankenkassenDisclaimer: string;
  voucherCtaHeading: string;
  voucherCtaText: string;
  faqs: { question: string; answer: string }[];
  ctaHeading: string;
  ctaText: string;
};
```

- [ ] **Step 3.2: Query-Funktion `getPricingPage` ergänzen**

In derselben Datei, ans Ende des „Queries"-Blocks (nach `getDatenschutzPage`-Funktion), folgende Funktion einfügen:

```ts
export async function getPricingPage(): Promise<SanityPricingPage | null> {
  return safeFetch<SanityPricingPage>(
    `*[_type == "pricingPage"][0] {
      seoTitle, seoDescription,
      heroBadge, heroHeading, heroHeadingAccent, heroText,
      tableIntro,
      blockCardsHeading, blockCardsText,
      krankenkassenHeading, krankenkassenIntro,
      krankenkassen[] { name, fullName, reimbursement, condition },
      krankenkassenDisclaimer,
      voucherCtaHeading, voucherCtaText,
      faqs[] { question, answer },
      ctaHeading, ctaText
    }`
  );
}
```

- [ ] **Step 3.3: TypeScript-Check ausführen**

Run: `npx tsc --noEmit`
Expected: 0 Fehler.

- [ ] **Step 3.4: Schema im Studio verifizieren**

Run: `npm run dev`
Im Browser zu `http://localhost:3000/studio` navigieren. In der linken Liste muss „Preise (Seite /preise)" erscheinen. Klicken → das neue Singleton öffnet sich mit allen Feldgruppen (SEO, Hero, Preistabelle, Block-Karten, Krankenkassen, Gutschein-CTA, FAQs, Closing CTA).

Expected: Alle Felder mit `initialValue` zeigen Defaults. FAQ-Block zeigt 6 Initial-Einträge.

`Ctrl+C` zum Stoppen.

- [ ] **Step 3.5: Initial-Document publishen**

Im Studio → „Preise (Seite /preise)" öffnen → falls neu erstellt: oben rechts „Publish" klicken. Ohne Publish gibt die GROQ-Query mit useCdn nichts zurück.

- [ ] **Step 3.6: Commit Schema-Block**

```bash
git add sanity/schemas/pricingPage.ts sanity/schemas/index.ts sanity/lib/queries.ts
git commit -m "feat(sanity): add pricingPage schema for /preise route"
```

---

## Task 4: `PricingTable` aus `Pricing.tsx` extrahieren

**Files:**
- Create: `components/PricingTable.tsx`
- Modify: `components/Pricing.tsx`

**Risiko:** Home-Pricing-Sektion darf sich visuell nicht ändern. Nach diesem Refactor `npm run dev` → `http://localhost:3000` → Pricing-Sektion vergleichen mit Stand vor Refactor.

- [ ] **Step 4.1: `PricingTable.tsx` neu erstellen**

Erstelle `components/PricingTable.tsx`:

```tsx
"use client";

import type { SanityPricingItem } from "@/sanity/lib/queries";

export type PricingRow = {
  service: string;
  p30: string;
  p45: string;
  p60: string;
};

const FALLBACK_ROWS: PricingRow[] = [
  { service: "Heilmassage", p30: "€55", p45: "€70", p60: "€85" },
  { service: "Lymphdrainage", p30: "€55", p45: "€70", p60: "€85" },
  { service: "Klassische Massage", p30: "€55", p45: "€70", p60: "€85" },
];

export function pricingRowsFromSanity(
  items?: SanityPricingItem[] | null,
): PricingRow[] {
  if (!items || items.length === 0) return FALLBACK_ROWS;
  return items.map((item) => ({
    service: item.serviceName,
    p30: item.price30 ? `€${item.price30}` : "—",
    p45: item.price45 ? `€${item.price45}` : "—",
    p60: item.price60 ? `€${item.price60}` : "—",
  }));
}

export function PricingTable({ rows }: { rows: PricingRow[] }) {
  return (
    <div className="rounded-3xl bg-white border border-gray-100 shadow-xl shadow-black/5 overflow-y-hidden overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-[#0d4f4f] text-white">
            <th className="px-4 sm:px-8 py-4 sm:py-5 text-left font-extrabold text-sm sm:text-base align-bottom">
              Behandlung
            </th>
            <th className="px-2 sm:px-6 py-4 sm:py-5 text-center font-extrabold text-sm sm:text-base whitespace-nowrap align-bottom">
              30 Min
            </th>
            <th className="px-2 sm:px-6 py-4 sm:py-5 text-center font-extrabold text-sm sm:text-base whitespace-nowrap align-bottom">
              45 Min
            </th>
            <th className="px-2 sm:px-6 pt-2 pb-4 sm:py-5 text-center font-extrabold text-sm sm:text-base align-bottom">
              <span className="sm:hidden bg-[#f2a93b] text-[9px] font-bold px-1.5 py-0.5 rounded-full text-[#111] inline-block mb-0.5">
                Beliebt
              </span>
              <br className="sm:hidden" />
              <span className="inline-flex items-center sm:gap-1.5">
                <span className="whitespace-nowrap">60 Min</span>
                <span className="hidden sm:inline bg-[#f2a93b] text-[10px] font-bold px-2 py-0.5 rounded-full text-[#111]">
                  Beliebt
                </span>
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={row.service}
              className={`${
                i < rows.length - 1 ? "border-b border-gray-100" : ""
              } hover:bg-[#0d4f4f]/[0.02] transition-colors`}
            >
              <td className="px-4 sm:px-8 py-4 sm:py-6">
                <span className="font-bold text-sm sm:text-base text-[#111]">
                  {row.service}
                </span>
              </td>
              <td className="px-2 sm:px-6 py-4 sm:py-6 text-center whitespace-nowrap">
                <span className="text-base sm:text-xl font-extrabold text-[#333]">
                  {row.p30}
                </span>
              </td>
              <td className="px-2 sm:px-6 py-4 sm:py-6 text-center whitespace-nowrap">
                <span className="text-base sm:text-xl font-extrabold text-[#333]">
                  {row.p45}
                </span>
              </td>
              <td className="px-2 sm:px-6 py-4 sm:py-6 text-center whitespace-nowrap">
                <span className="text-base sm:text-xl font-extrabold text-[#e8654a]">
                  {row.p60}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

- [ ] **Step 4.2: `Pricing.tsx` refactoren**

Ersetze den Inhalt von `components/Pricing.tsx` durch:

```tsx
"use client";

import { Check, Info, ExternalLink } from "lucide-react";
import type { SanityPricingItem, SanitySettings, SanityHomePage } from "@/sanity/lib/queries";
import { PricingTable, pricingRowsFromSanity } from "./PricingTable";

const FALLBACK_BADGE = "Transparente Preise";
const FALLBACK_HEADING = "Faire Preise,";
const FALLBACK_HEADING_ACCENT = "spürbare Wirkung";
const FALLBACK_TEXT =
  "Alle Behandlungen werden individuell auf Ihre Bedürfnisse abgestimmt.";
const FALLBACK_WKO_URL =
  "https://www.wko.at/oe/gewerbe-handwerk/fusspfleger-kosmetiker-masseure/tarife-heilmasseure.pdf";

const FALLBACK_INSURANCE_TEXT =
  "Je nach Krankenkasse bekommen Sie einen Teil Ihrer Massagekosten zurück. Sie haben auch die Möglichkeit, einen Teil der Therapiekosten bei einer Zusatzversicherung einzureichen. Privatversicherungen erstatten bis zu 100% der Therapiekosten zurück. Informieren Sie sich jetzt — es lohnt sich!";

export function Pricing({
  sanityPricing,
  sanitySettings,
  homePage,
}: {
  sanityPricing?: SanityPricingItem[] | null;
  sanitySettings?: SanitySettings | null;
  homePage?: SanityHomePage | null;
}) {
  const rows = pricingRowsFromSanity(sanityPricing);
  const insuranceText =
    sanitySettings?.insuranceText ?? FALLBACK_INSURANCE_TEXT;

  const badge = homePage?.pricingBadge ?? FALLBACK_BADGE;
  const heading = homePage?.pricingHeading ?? FALLBACK_HEADING;
  const headingAccent = homePage?.pricingHeadingAccent ?? FALLBACK_HEADING_ACCENT;
  const text = homePage?.pricingText ?? FALLBACK_TEXT;
  const wkoUrl = homePage?.pricingWkoUrl ?? FALLBACK_WKO_URL;

  return (
    <section
      id="preise"
      className="relative py-24 sm:py-32 bg-white overflow-hidden"
    >
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[#0d4f4f]/[0.03] blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#e8654a]/10 px-4 py-1.5 text-sm font-bold text-[#e8654a]">
            {badge}
          </span>
          <h2 className="mt-4 text-[clamp(2rem,4vw,3.5rem)] font-extrabold leading-[1.05] tracking-tight text-[#111]">
            {heading}{" "}
            <span className="text-[#e8654a]">{headingAccent}</span>
          </h2>
          <p className="mt-4 text-lg text-[#555]">{text}</p>
        </div>

        <div className="mt-14 sm:mt-20 max-w-4xl mx-auto">
          <PricingTable rows={rows} />

          {/* Insurance note */}
          <div className="mt-8 flex items-start gap-4 rounded-2xl bg-gradient-to-r from-[#0d4f4f]/[0.06] to-[#0d4f4f]/[0.02] border border-[#0d4f4f]/10 p-6 sm:p-8">
            <div className="flex-shrink-0 mt-0.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0d4f4f]/10">
                <Info size={20} className="text-[#0d4f4f]" />
              </div>
            </div>
            <div>
              <p className="font-bold text-[#111]">
                Zuschüsse von Krankenkassen & Versicherungen
              </p>
              <p className="mt-1 text-sm text-[#555] leading-relaxed">
                {insuranceText}
              </p>
              <a
                href={wkoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-[#0d4f4f] hover:underline"
              >
                Heilmasseur-Zuschüsse nach Kassen
                <ExternalLink size={14} />
              </a>
            </div>
          </div>

          {/* Features */}
          <div className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-3">
            {[
              "Individuell abgestimmt",
              "Keine Vertragsbindung",
              "Flexible Terminvergabe",
            ].map((feat) => (
              <span
                key={feat}
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#555]"
              >
                <Check size={16} className="text-[#0d4f4f]" />
                {feat}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4.3: TypeScript- und Build-Check**

Run: `npx tsc --noEmit`
Expected: 0 Fehler.

Run: `npm run build`
Expected: Build erfolgreich, keine neuen Warnings.

- [ ] **Step 4.4: Visueller Vergleich Home-Pricing**

Run: `npm run dev`
Browser: `http://localhost:3000` → zur Pricing-Sektion scrollen.

Prüfen:
- Tabelle zeigt 3 Zeilen (Heilmassage, Lymphdrainage, Klassische Massage)
- Spaltenköpfe: 30 Min / 45 Min / 60 Min mit „Beliebt"-Badge
- Hover über Tabellenzeilen ändert Hintergrund leicht
- 60-Min-Spalte in Orange (`#e8654a`)
- Insurance-Box darunter mit „Zuschüsse von Krankenkassen & Versicherungen"
- WKO-Link funktioniert (Klick → externes PDF)
- Drei „Features"-Tags („Individuell abgestimmt", „Keine Vertragsbindung", „Flexible Terminvergabe")

Expected: Visuell identisch zu vorher.

`Ctrl+C` zum Stoppen.

- [ ] **Step 4.5: Commit Refactor**

```bash
git add components/PricingTable.tsx components/Pricing.tsx
git commit -m "refactor: extract PricingTable from Pricing.tsx for reuse on /preise"
```

---

## Task 5: `Breadcrumbs` Komponente

**Files:**
- Create: `components/Breadcrumbs.tsx`

- [ ] **Step 5.1: Komponente erstellen**

Erstelle `components/Breadcrumbs.tsx`. Die JsonLd-Einbindung folgt dem Pattern von `components/FaqJsonLd.tsx` (JSON-Stringified als Children, kein `dangerouslySetInnerHTML`):

```tsx
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const BASE_URL = "https://heilmasseur-domenic.at";

export type BreadcrumbItem = {
  label: string;
  href: string;
};

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.label,
      item: `${BASE_URL}${item.href}`,
    })),
  };

  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning>
        {JSON.stringify(jsonLd)}
      </script>
      <nav
        aria-label="Breadcrumb"
        className="mx-auto max-w-7xl px-5 sm:px-8 pt-24 sm:pt-28"
      >
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-[#555]">
          {items.map((item, idx) => {
            const isLast = idx === items.length - 1;
            return (
              <li key={item.href} className="flex items-center gap-1.5">
                {idx > 0 && (
                  <ChevronRight
                    size={14}
                    className="text-[#999] flex-shrink-0"
                    aria-hidden
                  />
                )}
                {isLast ? (
                  <span
                    aria-current="page"
                    className="font-semibold text-[#111]"
                  >
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="hover:text-[#0d4f4f] transition-colors"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
```

- [ ] **Step 5.2: TypeScript-Check**

Run: `npx tsc --noEmit`
Expected: 0 Fehler.

---

## Task 6: `JsonLdOffer` Komponente

**Files:**
- Create: `components/JsonLdOffer.tsx`

- [ ] **Step 6.1: Komponente erstellen**

Erstelle `components/JsonLdOffer.tsx` (gleiches Pattern wie `FaqJsonLd.tsx`):

```tsx
import type { SanityPricingItem } from "@/sanity/lib/queries";

const BASE_URL = "https://heilmasseur-domenic.at";

const FALLBACK_ITEMS: SanityPricingItem[] = [
  {
    _id: "fallback-heilmassage",
    serviceName: "Heilmassage",
    price30: 55,
    price45: 70,
    price60: 85,
    popular: true,
    sortOrder: 0,
  },
  {
    _id: "fallback-lymphdrainage",
    serviceName: "Lymphdrainage",
    price30: 55,
    price45: 70,
    price60: 85,
    popular: false,
    sortOrder: 1,
  },
  {
    _id: "fallback-klassisch",
    serviceName: "Klassische Massage",
    price30: 55,
    price45: 70,
    price60: 85,
    popular: false,
    sortOrder: 2,
  },
];

function buildOffer(serviceName: string, durationMin: number, price: number) {
  return {
    "@type": "Offer",
    name: `${serviceName} ${durationMin} Minuten`,
    description: `${durationMin}-minütige ${serviceName} in Wien 1080`,
    price: price.toFixed(2),
    priceCurrency: "EUR",
    availability: "https://schema.org/InStock",
    areaServed: { "@type": "City", name: "Wien 1080, Josefstadt" },
    seller: {
      "@type": "LocalBusiness",
      name: "Heilmasseur Domenic Hacker",
      url: BASE_URL,
    },
  };
}

export function JsonLdOffer({
  items,
}: {
  items?: SanityPricingItem[] | null;
}) {
  const data = items && items.length > 0 ? items : FALLBACK_ITEMS;

  const offers = data
    .flatMap((item) => [
      item.price30 ? buildOffer(item.serviceName, 30, item.price30) : null,
      item.price45 ? buildOffer(item.serviceName, 45, item.price45) : null,
      item.price60 ? buildOffer(item.serviceName, 60, item.price60) : null,
    ])
    .filter(Boolean);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: "Massagen — Preisliste Wien 1080",
    itemListElement: offers,
  };

  return (
    <script type="application/ld+json" suppressHydrationWarning>
      {JSON.stringify(jsonLd)}
    </script>
  );
}
```

- [ ] **Step 6.2: TypeScript-Check**

Run: `npx tsc --noEmit`
Expected: 0 Fehler.

- [ ] **Step 6.3: Commit Helper-Komponenten**

```bash
git add components/Breadcrumbs.tsx components/JsonLdOffer.tsx
git commit -m "feat(components): add Breadcrumbs and JsonLdOffer for SEO"
```

---

## Task 7: `KrankenkassenTabelle` Komponente

**Files:**
- Create: `components/KrankenkassenTabelle.tsx`

- [ ] **Step 7.1: Komponente erstellen**

Erstelle `components/KrankenkassenTabelle.tsx`:

```tsx
import type { SanityKrankenkasse } from "@/sanity/lib/queries";

const FALLBACK_KASSEN: SanityKrankenkasse[] = [
  {
    name: "ÖGK",
    fullName: "Österreichische Gesundheitskasse",
    reimbursement: "Stand 2026 — bitte direkt erfragen",
    condition: "In der Regel ärztliche Überweisung erforderlich",
  },
  {
    name: "BVAEB",
    fullName: "Versicherungsanstalt öffentlich Bediensteter",
    reimbursement: "Stand 2026 — bitte direkt erfragen",
    condition: "In der Regel ärztliche Überweisung erforderlich",
  },
  {
    name: "SVS",
    fullName: "Sozialversicherung der Selbständigen",
    reimbursement: "Stand 2026 — bitte direkt erfragen",
    condition: "In der Regel ärztliche Überweisung erforderlich",
  },
  {
    name: "Privat",
    fullName: "Private Zusatzversicherungen",
    reimbursement: "Bis zu 100 % je nach Tarif",
    condition: "Tarif-abhängig — Police prüfen",
  },
];

export function KrankenkassenTabelle({
  heading,
  intro,
  items,
  disclaimer,
}: {
  heading: string;
  intro: string;
  items?: SanityKrankenkasse[] | null;
  disclaimer: string;
}) {
  const data = items && items.length > 0 ? items : FALLBACK_KASSEN;

  return (
    <section className="py-16 sm:py-24 bg-[#f0f7f7]">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0d4f4f] mb-3">
          {heading}
        </h2>
        <p className="text-[#555] mb-10 leading-relaxed max-w-2xl">{intro}</p>

        <div className="rounded-3xl bg-white border border-gray-100 shadow-xl shadow-black/5 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#0d4f4f] text-white">
                <th className="px-4 sm:px-6 py-4 text-left font-extrabold text-sm sm:text-base">
                  Kasse
                </th>
                <th className="px-4 sm:px-6 py-4 text-left font-extrabold text-sm sm:text-base">
                  Erstattung
                </th>
                <th className="hidden sm:table-cell px-4 sm:px-6 py-4 text-left font-extrabold text-sm sm:text-base">
                  Voraussetzung
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, i) => (
                <tr
                  key={row.name}
                  className={
                    i < data.length - 1 ? "border-b border-gray-100" : ""
                  }
                >
                  <td className="px-4 sm:px-6 py-4 align-top">
                    <p className="font-bold text-[#111]">{row.name}</p>
                    <p className="text-xs text-[#666]">{row.fullName}</p>
                  </td>
                  <td className="px-4 sm:px-6 py-4 text-sm text-[#333] align-top">
                    {row.reimbursement}
                  </td>
                  <td className="hidden sm:table-cell px-4 sm:px-6 py-4 text-sm text-[#555] align-top">
                    {row.condition}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-6 text-xs text-[#666] italic max-w-3xl">
          {disclaimer}
        </p>
      </div>
    </section>
  );
}
```

- [ ] **Step 7.2: TypeScript-Check**

Run: `npx tsc --noEmit`
Expected: 0 Fehler.

---

## Task 8: `BlockCardOverview` Komponente

**Files:**
- Create: `components/BlockCardOverview.tsx`

- [ ] **Step 8.1: Komponente erstellen**

Erstelle `components/BlockCardOverview.tsx`:

```tsx
import Link from "next/link";
import { Check, Gift } from "lucide-react";

type BlockOption = {
  size: 5 | 10;
  duration: 30 | 45 | 60;
  price: number;
  fullPrice: number;
  productKey: string;
};

const BLOCK_OPTIONS: BlockOption[] = [
  { size: 5, duration: 30, price: 259, fullPrice: 275, productKey: "block_5_30" },
  { size: 5, duration: 45, price: 329, fullPrice: 350, productKey: "block_5_45" },
  { size: 5, duration: 60, price: 399, fullPrice: 425, productKey: "block_5_60" },
  { size: 10, duration: 30, price: 489, fullPrice: 550, productKey: "block_10_30" },
  { size: 10, duration: 45, price: 619, fullPrice: 700, productKey: "block_10_45" },
  { size: 10, duration: 60, price: 749, fullPrice: 850, productKey: "block_10_60" },
];

function discountPercent(price: number, fullPrice: number): number {
  return Math.round(((fullPrice - price) / fullPrice) * 100);
}

export function BlockCardOverview({
  heading,
  text,
  voucherCtaHeading,
  voucherCtaText,
}: {
  heading: string;
  text: string;
  voucherCtaHeading: string;
  voucherCtaText: string;
}) {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0d4f4f] mb-4">
            {heading}
          </h2>
          <p className="text-[#555] leading-relaxed">{text}</p>
        </div>

        <h3 className="text-lg font-bold text-[#111] mb-4">5er-Block</h3>
        <div className="grid sm:grid-cols-3 gap-4 sm:gap-6 mb-10">
          {BLOCK_OPTIONS.filter((o) => o.size === 5).map((option) => (
            <BlockCard key={option.productKey} option={option} />
          ))}
        </div>

        <h3 className="text-lg font-bold text-[#111] mb-4">10er-Block</h3>
        <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
          {BLOCK_OPTIONS.filter((o) => o.size === 10).map((option) => (
            <BlockCard key={option.productKey} option={option} highlight />
          ))}
        </div>

        {/* Einzelgutschein-CTA */}
        <div className="mt-16 rounded-3xl bg-gradient-to-br from-[#0d4f4f] to-[#0a3d3d] p-8 sm:p-12 text-white">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-10">
            <div className="flex-shrink-0 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10">
              <Gift size={32} className="text-[#f2a93b]" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-extrabold mb-2">
                {voucherCtaHeading}
              </h3>
              <p className="text-white/80 leading-relaxed">{voucherCtaText}</p>
            </div>
            <Link
              href="/gutscheine"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#e8654a] to-[#f2a93b] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#e8654a]/25 hover:shadow-xl hover:shadow-[#e8654a]/30 transition-all duration-200 hover:scale-105 whitespace-nowrap"
            >
              Gutschein kaufen
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function BlockCard({
  option,
  highlight = false,
}: {
  option: BlockOption;
  highlight?: boolean;
}) {
  const discount = discountPercent(option.price, option.fullPrice);
  return (
    <div
      className={`relative rounded-3xl border bg-white p-6 sm:p-8 shadow-sm transition-all duration-200 hover:shadow-lg hover:scale-[1.02] ${
        highlight ? "border-[#e8654a] shadow-md" : "border-gray-100"
      }`}
    >
      {highlight && (
        <span className="absolute -top-3 left-6 inline-block rounded-full bg-[#e8654a] px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
          Beliebt
        </span>
      )}
      <p className="text-xs font-bold uppercase tracking-widest text-[#0d4f4f] mb-2">
        {option.duration} Min · {option.size} Behandlungen
      </p>
      <p className="text-3xl font-extrabold text-[#111]">
        €{option.price}
      </p>
      <p className="mt-1 text-sm text-[#666] line-through">
        statt €{option.fullPrice}
      </p>
      <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-[#f2a93b]/15 px-3 py-1 text-xs font-bold text-[#0d4f4f]">
        <Check size={12} strokeWidth={3} />
        {discount} % Vorteil
      </p>
      <Link
        href={`/gutscheine?product=${option.productKey}`}
        className="mt-6 block rounded-full bg-[#0d4f4f] py-3 text-center text-sm font-bold text-white transition-colors duration-200 hover:bg-[#0a3d3d]"
      >
        Block kaufen
      </Link>
    </div>
  );
}
```

- [ ] **Step 8.2: TypeScript-Check**

Run: `npx tsc --noEmit`
Expected: 0 Fehler.

- [ ] **Step 8.3: Commit Inhaltskomponenten**

```bash
git add components/KrankenkassenTabelle.tsx components/BlockCardOverview.tsx
git commit -m "feat(components): add KrankenkassenTabelle and BlockCardOverview for /preise"
```

---

## Task 9: Route `/preise` zusammensetzen

**Files:**
- Create: `app/preise/page.tsx`

- [ ] **Step 9.1: Verzeichnis anlegen**

Run: `mkdir -p app/preise`
Expected: kein Output, Verzeichnis existiert.

- [ ] **Step 9.2: `page.tsx` erstellen**

Erstelle `app/preise/page.tsx`:

```tsx
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLdOffer } from "@/components/JsonLdOffer";
import { FaqJsonLd } from "@/components/FaqJsonLd";
import {
  PricingTable,
  pricingRowsFromSanity,
} from "@/components/PricingTable";
import { BlockCardOverview } from "@/components/BlockCardOverview";
import { KrankenkassenTabelle } from "@/components/KrankenkassenTabelle";
import {
  getPricingPage,
  getPricingItems,
  getSettings,
} from "@/sanity/lib/queries";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPricingPage();
  const title =
    page?.seoTitle ?? "Preise — Heilmassage & Sportmassage Wien 1080";
  const description =
    page?.seoDescription ??
    "Transparente Preise für Heilmassage und Sportmassage in Wien 1080. Block-Karten ab 5 Behandlungen mit bis zu 12 % Vorteil.";

  return {
    title,
    description,
    alternates: {
      canonical: "https://heilmasseur-domenic.at/preise",
    },
    openGraph: {
      title,
      description,
      url: "https://heilmasseur-domenic.at/preise",
      locale: "de_AT",
      type: "website",
    },
  };
}

export default async function PreisePage() {
  const [page, pricingItems, settings] = await Promise.all([
    getPricingPage(),
    getPricingItems(),
    getSettings(),
  ]);

  const heroBadge = page?.heroBadge ?? "Transparente Preise";
  const heroHeading =
    page?.heroHeading ?? "Preise für Heilmassage & Sportmassage";
  const heroHeadingAccent = page?.heroHeadingAccent ?? "in Wien 1080";
  const heroText =
    page?.heroText ?? "Faire, transparente Preise für jede Behandlung.";
  const tableIntro =
    page?.tableIntro ??
    "Alle Behandlungen werden individuell auf Ihre Bedürfnisse abgestimmt.";

  const blockHeading =
    page?.blockCardsHeading ?? "Block-Karten — günstiger ab 5 Behandlungen";
  const blockText =
    page?.blockCardsText ??
    "Wer regelmäßig kommt, profitiert: Block-Karten gibt es als 5er- oder 10er-Block.";

  const krankenkassenHeading =
    page?.krankenkassenHeading ?? "Krankenkassen-Rückerstattung";
  const krankenkassenIntro =
    page?.krankenkassenIntro ??
    "Heilmassage kann je nach Kasse teilweise erstattet werden.";
  const krankenkassenDisclaimer =
    page?.krankenkassenDisclaimer ??
    "Stand 2026, Richtwerte. Bitte direkt bei Ihrer Kasse erfragen.";

  const voucherCtaHeading = page?.voucherCtaHeading ?? "Gutscheine verschenken";
  const voucherCtaText =
    page?.voucherCtaText ??
    "Gutscheine sind in jedem Wert oder als Block-Karte erhältlich.";

  const faqs = page?.faqs ?? [];
  const ctaHeading = page?.ctaHeading ?? "Bereit für Ihren Termin?";
  const ctaText =
    page?.ctaText ??
    "Buchen Sie direkt online — oder verschenken Sie einen Gutschein.";

  const rows = pricingRowsFromSanity(pricingItems);

  return (
    <>
      <JsonLdOffer items={pricingItems} />
      {faqs.length > 0 && (
        <FaqJsonLd faqs={faqs.map((f) => ({ q: f.question, a: f.answer }))} />
      )}
      <Navbar />
      <main>
        <Breadcrumbs
          items={[
            { label: "Startseite", href: "/" },
            { label: "Preise", href: "/preise" },
          ]}
        />

        {/* HERO */}
        <section className="bg-white">
          <div className="mx-auto max-w-4xl px-5 sm:px-8 pt-8 pb-16 sm:pt-12 sm:pb-24">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#e8654a]/10 px-4 py-1.5 text-sm font-bold text-[#e8654a]">
              {heroBadge}
            </span>
            <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-[#111]">
              {heroHeading}{" "}
              <span className="text-[#e8654a]">{heroHeadingAccent}</span>
            </h1>
            <p className="mt-6 text-lg text-[#555] leading-relaxed max-w-2xl">
              {heroText}
            </p>
          </div>
        </section>

        {/* PREISTABELLE */}
        <section className="bg-[#f0f7f7] py-16 sm:py-24">
          <div className="mx-auto max-w-4xl px-5 sm:px-8">
            <p className="text-[#555] mb-8 leading-relaxed max-w-2xl">
              {tableIntro}
            </p>
            <PricingTable rows={rows} />
          </div>
        </section>

        {/* BLOCK-KARTEN */}
        <BlockCardOverview
          heading={blockHeading}
          text={blockText}
          voucherCtaHeading={voucherCtaHeading}
          voucherCtaText={voucherCtaText}
        />

        {/* KRANKENKASSEN */}
        <KrankenkassenTabelle
          heading={krankenkassenHeading}
          intro={krankenkassenIntro}
          items={page?.krankenkassen}
          disclaimer={krankenkassenDisclaimer}
        />

        {/* FAQ */}
        {faqs.length > 0 && (
          <section className="py-16 sm:py-24 bg-white">
            <div className="mx-auto max-w-4xl px-5 sm:px-8">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0d4f4f] mb-3">
                Häufige Fragen zu Preisen
              </h2>
              <p className="text-[#555] mb-10 leading-relaxed">
                Antworten auf die Fragen, die mir am häufigsten gestellt werden.
              </p>
              <div className="space-y-3">
                {faqs.map(({ question, answer }) => (
                  <details
                    key={question}
                    className="group rounded-2xl bg-white border border-[#0d4f4f]/10 overflow-hidden"
                  >
                    <summary className="flex items-center justify-between gap-4 cursor-pointer px-6 py-5 font-semibold text-[#111] text-sm sm:text-base list-none">
                      {question}
                      <ChevronDown
                        size={18}
                        className="text-[#0d4f4f] shrink-0 transition-transform duration-200 group-open:rotate-180"
                      />
                    </summary>
                    <p className="px-6 pb-5 text-sm text-[#555] leading-relaxed border-t border-[#0d4f4f]/5 pt-4">
                      {answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CLOSING CTA */}
        <section className="py-16 sm:py-24 bg-[#0d4f4f]">
          <div className="mx-auto max-w-2xl px-5 sm:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
              {ctaHeading}
            </h2>
            <p className="text-white/65 mb-10 leading-relaxed">{ctaText}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/buchen"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#e8654a] to-[#f2a93b] px-8 py-4 text-base font-bold text-white shadow-lg shadow-[#e8654a]/30 transition-all duration-200 hover:shadow-xl hover:shadow-[#e8654a]/40 hover:scale-[1.03]"
              >
                Termin buchen
                <ArrowRight size={18} strokeWidth={2.5} />
              </Link>
              <Link
                href="/gutscheine"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-8 py-4 text-base font-semibold text-white/80 transition-all duration-200 hover:bg-white/10 hover:text-white"
              >
                Gutschein verschenken
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer sanitySettings={settings} />
    </>
  );
}
```

- [ ] **Step 9.3: TypeScript- und Build-Check**

Run: `npx tsc --noEmit`
Expected: 0 Fehler.

Run: `npm run build`
Expected: Build erfolgreich. Im Output sollte `/preise` als neue Route erscheinen.

- [ ] **Step 9.4: Smoke-Test im Browser**

Run: `npm run dev`
Browser: `http://localhost:3000/preise`

Prüfen:
- Breadcrumbs „Startseite › Preise" oben sichtbar
- Hero mit Badge, H1, Akzent (orange), Einleitungstext
- Preistabelle mit 3 Zeilen, identisch zu Home
- Block-Karten-Sektion mit 6 Karten (5er-Block oben, 10er mit „Beliebt"-Badge unten)
- Klick auf „Block kaufen" → führt zu `/gutscheine?product=block_5_60` (404 erwartet, Route kommt erst in Plan 3)
- Krankenkassen-Tabelle mit 4 Einträgen (Fallbacks, da noch keine im Studio gepflegt)
- FAQ mit 6 Akkordeon-Einträgen, klickbar zum Aufklappen
- Closing-CTA dunkelgrün mit zwei Buttons
- Footer am Ende

Mobile-Check via DevTools (375px Breite):
- Tabelle horizontal scrollbar
- Block-Karten 1 Spalte
- Krankenkassen-Tabelle: Spalte „Voraussetzung" ausgeblendet auf Mobile

JsonLd-Verifikation: Browser-DevTools → Elements → suche `application/ld+json` → 3 Skripte sichtbar (BreadcrumbList, OfferCatalog, FAQPage).

`Ctrl+C` zum Stoppen.

- [ ] **Step 9.5: Commit Route**

```bash
git add app/preise/
git commit -m "feat(preise): add /preise route with hero, table, blocks, krankenkassen, faqs"
```

---

## Task 10: Sitemap aktualisieren

**Files:**
- Modify: `app/sitemap.ts`

- [ ] **Step 10.1: `/preise` in Sitemap einfügen**

`app/sitemap.ts` durch folgenden Inhalt ersetzen:

```ts
import type { MetadataRoute } from "next";

const BASE_URL = "https://heilmasseur-domenic.at";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/heilmassage-wien-1080`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/preise`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/ueber-mich`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/buchen`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/impressum`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/datenschutz`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
```

- [ ] **Step 10.2: Sitemap-Verifikation**

Run: `npm run dev`
Browser: `http://localhost:3000/sitemap.xml`

Expected: XML mit 7 `<url>`-Einträgen, einer davon `/preise`.

`Ctrl+C` zum Stoppen.

---

## Task 11: Footer-Sektion „Angebot"

**Files:**
- Modify: `components/Footer.tsx`

- [ ] **Step 11.1: Footer komplett ersetzen**

Ersetze den gesamten Inhalt von `components/Footer.tsx` durch:

```tsx
"use client";

import { Heart, Instagram } from "lucide-react";
import Image from "next/image";
import * as CookieConsent from "vanilla-cookieconsent";
import type { SanitySettings } from "@/sanity/lib/queries";

const angebotLinks = [
  { label: "Heilmassage Wien", href: "/heilmassage-wien-1080" },
  { label: "Sportmassage Wien", href: "/sportmassage-wien" },
  { label: "Preise", href: "/preise" },
  { label: "Gutscheine", href: "/gutscheine" },
];

const praxisLinks = [
  { label: "Startseite", href: "/" },
  { label: "Über mich", href: "/ueber-mich" },
  { label: "Termin buchen", href: "/buchen" },
  { label: "Impressum", href: "/impressum" },
  { label: "Datenschutz", href: "/datenschutz" },
];

export function Footer({
  sanitySettings,
}: {
  sanitySettings?: SanitySettings | null;
}) {
  const instagramUrl =
    sanitySettings?.instagramUrl ||
    "https://www.instagram.com/heilmasseurdomenic";
  return (
    <footer className="relative bg-[#0a0a0a] pt-16 pb-8">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col md:flex-row items-start justify-between gap-10">
          <div>
            <div className="flex items-center gap-2.5">
              <Image
                src="/images/logo-icon.svg"
                alt="Logo"
                width={36}
                height={36}
                className="h-9 w-auto brightness-0 invert"
              />
              <span className="font-extrabold text-lg text-white tracking-tight">
                Domenic Hacker
              </span>
            </div>
            <p className="mt-3 text-sm text-white/60 max-w-xs leading-relaxed">
              Diplomierter Heilmasseur in Wien 1080. Heilmassage,
              Lymphdrainage & Klassische Massage. Feldgasse 3/20, 1080 Wien.
            </p>
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white/60 hover:text-white transition-colors duration-200"
            >
              <Instagram size={16} />
              @heilmasseurdomenic
            </a>
          </div>

          <div className="flex flex-col sm:flex-row gap-10 sm:gap-16">
            <div className="flex flex-col gap-3 min-w-[140px]">
              <p className="text-xs font-bold uppercase tracking-widest text-white/40">
                Angebot
              </p>
              {angebotLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-semibold text-white/60 hover:text-white transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="flex flex-col gap-3 min-w-[140px]">
              <p className="text-xs font-bold uppercase tracking-widest text-white/40">
                Praxis
              </p>
              {praxisLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-semibold text-white/60 hover:text-white transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
              <button
                type="button"
                onClick={() => CookieConsent.showPreferences()}
                aria-haspopup="dialog"
                className="text-left text-sm font-semibold text-white/60 hover:text-white transition-colors duration-200"
              >
                Cookie-Einstellungen
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 h-px bg-white/5" />

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/50">
          <p>
            &copy; {new Date().getFullYear()} Domenic Hacker. Alle Rechte
            vorbehalten.
          </p>
          <p className="inline-flex items-center gap-1">
            Crafted with <Heart size={12} className="text-[#e8654a]" /> in Wien by{" "}
            <a
              href="https://pixelmeister.at"
              target="_blank"
              rel="noopener"
              className="hover:text-white/60 transition-colors duration-200"
            >
              pixelmeister.at
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 11.2: TypeScript- und Build-Check**

Run: `npx tsc --noEmit`
Expected: 0 Fehler.

Run: `npm run build`
Expected: 0 Fehler.

- [ ] **Step 11.3: Visueller Check**

Run: `npm run dev`
Browser: `http://localhost:3000/preise` → bis zum Footer scrollen.

Expected:
- Zwei Spalten im Footer: „Angebot" (mit 4 Links) und „Praxis" (mit 5 Links + Cookie-Einstellungen-Button)
- Auf Mobile (375px): Spalten untereinander statt nebeneinander, alles lesbar

Andere Seiten gegenchecken (`http://localhost:3000`, `http://localhost:3000/heilmassage-wien-1080`): Footer sieht überall identisch aus, alle Links funktionieren.

`Ctrl+C` zum Stoppen.

---

## Task 12: Hub-Link von `/heilmassage-wien-1080` zu `/preise`

**Files:**
- Modify: `app/heilmassage-wien-1080/page.tsx`

- [ ] **Step 12.1: Hub-Link einfügen**

In `app/heilmassage-wien-1080/page.tsx` zwischen FAQ-Sektion und Final-CTA-Sektion. Suche nach dem Kommentar `{/* ── FINAL CTA ──`. Direkt davor (nach dem schließenden `</section>` der FAQ-Sektion) folgenden Block einfügen:

```tsx
        {/* ── PREISE-LINK ──────────────────────────────────────────── */}
        <section className="py-12 sm:py-16 bg-white border-t border-[#0d4f4f]/8">
          <div className="mx-auto max-w-4xl px-5 sm:px-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 rounded-3xl bg-[#f0f7f7] p-6 sm:p-8">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#0d4f4f]/60 mb-1">
                  Was kostet eine Behandlung?
                </p>
                <p className="text-lg sm:text-xl font-extrabold text-[#111]">
                  Alle Preise & Block-Karten auf einen Blick
                </p>
              </div>
              <Link
                href="/preise"
                className="inline-flex items-center gap-2 rounded-full border-2 border-[#0d4f4f] px-6 py-3 text-sm font-bold text-[#0d4f4f] hover:bg-[#0d4f4f] hover:text-white transition-all duration-200 whitespace-nowrap"
              >
                Preise einsehen
                <ArrowRight size={16} strokeWidth={2.5} />
              </Link>
            </div>
          </div>
        </section>
```

- [ ] **Step 12.2: Build-Check**

Run: `npm run build`
Expected: 0 Fehler.

- [ ] **Step 12.3: Visueller Check**

Run: `npm run dev`
Browser: `http://localhost:3000/heilmassage-wien-1080`

Bis zur FAQ-Sektion scrollen → direkt darunter sollte ein heller Block mit „Was kostet eine Behandlung?" und Button „Preise einsehen" stehen, dann die Final-CTA-Sektion.

Klick auf „Preise einsehen" → führt zu `/preise` ✓.

`Ctrl+C` zum Stoppen.

- [ ] **Step 12.4: Final Commit**

```bash
git add app/sitemap.ts components/Footer.tsx app/heilmassage-wien-1080/page.tsx
git commit -m "feat(seo): add /preise to sitemap, Footer Angebot section, hub-link from Heilmassage"
```

---

## Task 13: Final-Smoke-Test

- [ ] **Step 13.1: Production-Build verifizieren**

Run: `npm run build`
Expected: 0 Fehler. Im Build-Output sollten alle Routen erscheinen, inkl. `/preise`.

- [ ] **Step 13.2: Production-Server starten**

Run: `npm run start`
Browser: `http://localhost:3000/preise`

Komplett-Check:
- Lädt schnell (< 2s)
- Alle Bilder rendern (oder Fallbacks)
- Tabelle, Block-Karten, Krankenkassen-Tabelle, FAQ alle sichtbar
- Klick durch alle internen Links: Logo → `/`, Footer-Links
- Klick auf „Block kaufen"-Buttons → 404 für `/gutscheine` (erwartet — Route kommt erst Plan 3)
- Klick auf „Termin buchen" → `/buchen`
- DevTools → Elements → 3 JsonLd-Skripte zählen (BreadcrumbList, OfferCatalog, FAQPage)
- DevTools → Network → keine 404-Responses (außer eventuell Favicon-Variants)
- Lighthouse-Run (DevTools → Lighthouse → SEO + Performance + Accessibility):
  - SEO ≥ 95
  - Performance ≥ 80 (mobile)
  - Accessibility ≥ 90

`Ctrl+C` zum Stoppen.

- [ ] **Step 13.3: Schema im Studio editierbar**

Run: `npm run dev`
Browser: `http://localhost:3000/studio`

- „Preise (Seite /preise)" öffnen
- Hero-Heading auf einen Test-Wert ändern (z.B. „TEST")
- Publish
- Auf `http://localhost:3000/preise` reload → neuer Wert sollte erscheinen (Sanity-CDN cache, max. 1 min)
- Test rückgängig machen, wieder publishen

`Ctrl+C` zum Stoppen.

- [ ] **Step 13.4: Wenn alles passt — Status-Notiz**

Plan 1 ist abgeschlossen, wenn alle Steps oben grün sind. Nächster Schritt: Plan 2 (`/sportmassage-wien`).

---

## Risiken & Mitigation

| Risiko | Mitigation |
|---|---|
| `Pricing.tsx`-Refactor bricht Home-Sektion | Step 4.4 visueller Vergleich vor Commit |
| Sanity-CDN cached alten Stand | useCdn=true ist hier akzeptabel — Rebuild oder kurze Wartezeit nach Studio-Edit |
| BlockCardOverview-Karten verlinken auf nicht-existierende `/gutscheine`-Route | Bewusst akzeptiert — Route kommt in Plan 3, 404 ist temporär |
| Krankenkassen-Daten leer (kein Studio-Eintrag) | Fallback-Liste in `KrankenkassenTabelle.tsx` mit Stand-2026-Hinweis |
| Footer-Refactor bricht Layout auf Mobile | Step 11.3 visueller Check Mobile + Desktop |
| Breadcrumbs-Padding kollidiert mit Navbar (sticky) | `pt-24 sm:pt-28` in `Breadcrumbs.tsx` reserviert Platz für Navbar-Höhe |

---

## Self-Review-Notiz

- Spec §4.1 (`pricingPage`-Schema) → Task 1 ✓
- Spec §4.2 (Seitenstruktur) → Task 9 ✓
- Spec §4.3 (SEO-Maßnahmen) → Tasks 5, 6, 9, 10 (Breadcrumbs, JsonLdOffer, FaqJsonLd, Sitemap) ✓
- Spec §4.4 (Refactor `Pricing.tsx`) → Task 4 ✓
- Spec §4.5 (Hub-Speiche) → Tasks 11, 12 ✓
- Spec §8.1 (BreadcrumbList JsonLd) → Task 5 ✓
- Spec §8.2 (Per-Behandlung Offer JsonLd) → Task 6 ✓
- Spec §8.3 (Sitemap-Update) → Task 10 ✓

Keine offenen Spec-Anforderungen. Plan vollständig.
