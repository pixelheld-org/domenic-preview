# Plan 2: `/sportmassage-wien` — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Eigenständige `/sportmassage-wien`-Behandlungsseite, parallel zur bestehenden `/heilmassage-wien-1080`. Sanity-editierbar via neuer `sportmassagePage`-Singleton mit kompletter SEO-Strukturdaten, Cross-Linking zu Heilmassage und Preise.

**Architecture:** Die bestehende `/heilmassage-wien-1080/page.tsx` (≈470 Zeilen) wird in eine wiederverwendbare `<TreatmentPage/>`-Komponente extrahiert (Hero, Für-wen, Schwerpunkt, Was-ist, Wirkung, Standort, FAQ, Preise-Link, Cross-Link, CTA). Beide Routen werden zu schmalen Wrappern, die Sanity-Daten laden und an `TreatmentPage` durchreichen. Eine `variant`-Prop (`'heilmassage' | 'sportmassage'`) steuert Sportmassage-spezifische Elemente (Cost-Note, Cross-Link-Ziel, JsonLd-Body). Bestehende Heilmassage-Seite bleibt visuell unverändert.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind v4, Sanity CMS v5 + next-sanity, lucide-react, `@sanity/image-url`. Kein Test-Framework — Verifikation manuell via Browser-Smoke-Tests, `npx tsc --noEmit`, `npm run build`. Pattern-Lessons aus Plan 1: `cache()`-Wrapper für queries, `<` JSON-LD-Escape, formales `Sie`/`Ihr`, `_key` für Sanity-Array-Items.

**Spec reference:** `docs/superpowers/specs/2026-05-07-phase1-design.md` §5 (`/sportmassage-wien`), §8 (SEO-übergreifend), §9 (Cross-cutting), §10 Plan 2.

---

## File Structure

```
sanity/schemas/
  sportmassagePage.ts                  # CREATE — neues Singleton (mirror von heilmassagePage + costNote)
  index.ts                             # MODIFY — sportmassagePageSchema registrieren

sanity/
  deskStructure.ts                     # MODIFY — Singleton-Eintrag

sanity/lib/
  queries.ts                           # MODIFY — SanitySportmassagePage type, getSportmassagePage(), + _key fix für SanityHeilmassagePage faqs

components/
  TreatmentPage.tsx                    # CREATE — extrahiert aus /heilmassage-wien-1080/page.tsx
  JsonLdService.tsx                    # MODIFY — variant-Prop für treatment-spezifische Service-Schemas

app/
  heilmassage-wien-1080/page.tsx       # MODIFY — wird zu thin wrapper über TreatmentPage
  sportmassage-wien/page.tsx           # CREATE — neue Route, thin wrapper über TreatmentPage
  preise/page.tsx                      # MODIFY — Sportmassage zu PricingTable.serviceLinks hinzufügen
  sitemap.ts                           # MODIFY — /sportmassage-wien Eintrag (priority 0.9)
```

**Decomposition rationale:** `<TreatmentPage/>` extrahiert das gemeinsame Layout (Hero/USP/WhatIs/Effects/Location/FAQ/Links/CTA) — das einzige strukturelle Element, das spezifisch ist, ist ein optionaler `costNote`-Block (nur Sportmassage zeigt ihn) und der Cross-Link am Ende (zeigt jeweils auf das Schwesterthema). Die page.tsx-Wrapper bleiben dünn (Sanity-Fetch + Defaults + Übergabe an TreatmentPage). JsonLdService bekommt eine `variant`-Prop, weil das spec §5.4 ein sportmassage-spezifisches Service-Schema verlangt — saubere Erweiterung ohne neue Komponente.

---

## Commits Overview

5 logische Commits:

1. Sanity-Schema `sportmassagePage` + Index + DeskStructure + queries.ts (Type + getter + `_key` fix für Heilmassage faqs)
2. `<TreatmentPage/>` extrahieren + `/heilmassage-wien-1080/page.tsx` zum Wrapper refactoren (Heilmassage visuell unverändert)
3. `/sportmassage-wien`-Route + `JsonLdService` variant-Erweiterung
4. SEO finalize: Sitemap, `/preise` PricingTable-serviceLinks erweitern
5. _(kein Commit — Final-Smoke-Test ist verifying step)_

---

## Task 1: Sanity-Schema `sportmassagePage` erstellen

**Files:**
- Create: `sanity/schemas/sportmassagePage.ts`

- [ ] **Step 1.1: Schema-Datei anlegen**

Erstelle `sanity/schemas/sportmassagePage.ts` mit folgendem Inhalt:

```ts
import { defineField, defineType } from "sanity";

export const sportmassagePageSchema = defineType({
  name: "sportmassagePage",
  title: "Sportmassage Wien",
  type: "document",
  fields: [
    // ── Hero ──────────────────────────────────────────────────
    defineField({
      name: "heroBadge",
      title: "Hero — Badge",
      type: "string",
      initialValue: "Wien 1080 · Josefstadt",
      group: "hero",
    }),
    defineField({
      name: "heroHeading",
      title: "Hero — Überschrift",
      type: "string",
      initialValue: "Sportmassage in 1080 Wien",
      group: "hero",
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero — Untertitel",
      type: "string",
      initialValue: "für Regeneration, Beweglichkeit und nachhaltige Leistung",
      group: "hero",
    }),
    defineField({
      name: "heroImage",
      title: "Hero — Bild",
      type: "image",
      options: { hotspot: true },
      group: "hero",
    }),

    // ── Für wen ───────────────────────────────────────────────
    defineField({
      name: "forWhomHeading",
      title: "Für wen — Überschrift",
      type: "string",
      initialValue: "Für wen ist das?",
      group: "forWhom",
    }),
    defineField({
      name: "forWhomDescription",
      title: "Für wen — Beschreibung",
      type: "text",
      rows: 3,
      initialValue:
        "Egal ob ambitioniert im Verein, regelmäßig im Fitnessstudio oder ein paar Mal pro Woche laufend — wenn Ihr Körper nach Belastung Erholung braucht oder Verspannungen das nächste Training ausbremsen, ist Sportmassage ein gezielter Hebel.",
      group: "forWhom",
    }),
    defineField({
      name: "conditions",
      title: "Für wen — Beschwerden-Tags",
      type: "array",
      of: [{ type: "string" }],
      initialValue: [
        "Verspannungen nach Training",
        "Muskelkater-Vorbeugung",
        "Triggerpunkte",
        "Faszienverklebungen",
        "Ermüdungssymptome",
        "Vor Wettkampf",
        "Nach Wettkampf",
        "Steifheit nach langen Läufen",
      ],
      group: "forWhom",
    }),

    // ── Mein Schwerpunkt ──────────────────────────────────────
    defineField({
      name: "approachHeading",
      title: "Schwerpunkt — Überschrift",
      type: "string",
      initialValue: "Mein Schwerpunkt",
      group: "approach",
    }),
    defineField({
      name: "approachDescription",
      title: "Schwerpunkt — Beschreibung",
      type: "text",
      rows: 4,
      initialValue:
        "Ich arbeite tief, aber kontrolliert — mit besonderem Fokus auf Triggerpunkte und Faszien. Dort, wo das Gewebe sich nach hoher Belastung verklebt oder nicht mehr richtig gleitet, setze ich gezielt an.",
      group: "approach",
    }),
    defineField({
      name: "approachPoints",
      title: "Schwerpunkt — Punkte",
      type: "array",
      of: [{ type: "string" }],
      initialValue: [
        "Triggerpunkt-Arbeit an muskulären Schmerzpunkten",
        "Faszien-Mobilisation und Gewebelösung",
        "Tiefe Querfriktion bei chronischen Verspannungen",
        "Stretching-Elemente zur Bewegungsverbesserung",
      ],
      group: "approach",
    }),
    defineField({
      name: "approachBottomText",
      title: "Schwerpunkt — Zusatztext",
      type: "text",
      rows: 3,
      initialValue:
        "Wie viel Druck Sie brauchen, hängt von Ihnen, Ihrem Trainingsstand und Ihrer Tagesform ab. Ich passe das an Ihr Feedback an — Sportmassage ist nicht zwangsläufig eine schmerzhafte Massage, auch wenn das Klischee anders sagt.",
      group: "approach",
    }),
    defineField({
      name: "approachImage",
      title: "Schwerpunkt — Bild",
      type: "image",
      options: { hotspot: true },
      group: "approach",
    }),

    // ── Was ist Sportmassage ──────────────────────────────────
    defineField({
      name: "whatIsHeading",
      title: "Was ist Sportmassage — Überschrift",
      type: "string",
      initialValue: "Was ist Sportmassage?",
      group: "whatIs",
    }),
    defineField({
      name: "whatIsParagraphs",
      title: "Was ist Sportmassage — Absätze",
      type: "array",
      of: [{ type: "text" }],
      initialValue: [
        "Sportmassage ist eine spezialisierte Form der Massage, die auf die Bedürfnisse von Menschen mit regelmäßiger körperlicher Belastung zugeschnitten ist. Sie kombiniert Elemente der klassischen Massage mit gezielten Techniken zur muskulären Regeneration und Beweglichkeitsförderung.",
        "Im Unterschied zur Heilmassage, die häufig bei Beschwerden mit medizinischem Hintergrund eingesetzt wird, dient Sportmassage primär der Regeneration, Verletzungs-Vorbeugung und Leistungserhaltung. Sie ist ein Wellness- und Trainings-Begleitservice, kein medizinisches Verfahren.",
        "Wann eingesetzt? Pre-Workout zur Aktivierung, Post-Workout zur Regeneration, in Trainingspausen zur Wartung, vor Wettkämpfen zur Lockerung, nach Wettkämpfen zur Erholung.",
      ],
      group: "whatIs",
    }),

    // ── Wirkung ───────────────────────────────────────────────
    defineField({
      name: "effectsHeading",
      title: "Wirkung — Überschrift",
      type: "string",
      initialValue: "Was Sportmassage bewirken kann",
      group: "effects",
    }),
    defineField({
      name: "effectsDescription",
      title: "Wirkung — Beschreibung",
      type: "string",
      initialValue:
        "Regelmäßig eingesetzt unterstützt Sportmassage Ihren Körper dabei, Belastung besser wegzustecken und schneller einsatzfähig zu sein.",
      group: "effects",
    }),
    defineField({
      name: "effects",
      title: "Wirkung — Karten",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "Titel", type: "string" }),
            defineField({ name: "description", title: "Beschreibung", type: "text", rows: 3 }),
          ],
          preview: { select: { title: "title", subtitle: "description" } },
        },
      ],
      initialValue: [
        {
          _key: "effect-1",
          title: "Schnellere Regeneration",
          description: "Verbesserte Durchblutung kann den Abtransport von Stoffwechselprodukten und die Versorgung der Muskulatur unterstützen.",
        },
        {
          _key: "effect-2",
          title: "Verbesserte Beweglichkeit",
          description: "Gezielte Faszienarbeit und Triggerpunkt-Lösung können Bewegungseinschränkungen reduzieren.",
        },
        {
          _key: "effect-3",
          title: "Verletzungs-Vorbeugung",
          description: "Geschmeidige, gut versorgte Muskulatur ist weniger anfällig für Zerrungen und Überlastungen.",
        },
        {
          _key: "effect-4",
          title: "Bessere Körperwahrnehmung",
          description: "Wer regelmäßig massiert wird, spürt früher, wo der Körper Beachtung braucht.",
        },
        {
          _key: "effect-5",
          title: "Tiefere Erholung",
          description: "Auch das vegetative Nervensystem profitiert: Ruhepuls, Schlafqualität, mentale Erholung.",
        },
        {
          _key: "effect-6",
          title: "Trainingsfähigkeit erhalten",
          description: "Wenn die Muskulatur immer wieder zur Ruhe kommt, fällt das Trainingsvolumen leichter.",
        },
      ],
      group: "effects",
    }),

    // ── Standort ──────────────────────────────────────────────
    defineField({
      name: "locationHeading",
      title: "Standort — Überschrift",
      type: "string",
      initialValue: "Sportmassage Wien 1080 — Josefstadt",
      group: "location",
    }),
    defineField({
      name: "locationDescription",
      title: "Standort — Beschreibung",
      type: "text",
      rows: 3,
      initialValue:
        "Die Praxis liegt im 8. Bezirk, gut erreichbar mit U2 (Rathaus) und mehreren Straßenbahnlinien. Für viele Hobby-Sportler:innen aus Wien Mitte-West eine kurze Anfahrt.",
      group: "location",
    }),
    defineField({
      name: "transportInfo",
      title: "Standort — Transportmittel",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label (z.B. U-Bahn)", type: "string" }),
            defineField({ name: "value", title: "Wert (z.B. U2 – Station Rathaus)", type: "string" }),
          ],
          preview: { select: { title: "label", subtitle: "value" } },
        },
      ],
      initialValue: [
        { _key: "transport-1", label: "U-Bahn", value: "U2 — Station Rathaus" },
        { _key: "transport-2", label: "Straßenbahn", value: "Linien 5, 33, 43, 44" },
        { _key: "transport-3", label: "Auto", value: "Kurzparkzonen rund um die Praxis" },
      ],
      group: "location",
    }),

    // ── Cost Note (nur Sportmassage) ──────────────────────────
    defineField({
      name: "costNote",
      title: "Kostennotiz (Krankenkassen-Hinweis)",
      type: "text",
      rows: 3,
      initialValue:
        "Sportmassage zählt in Österreich als Wellness- und Trainingsleistung und wird von gesetzlichen Krankenkassen nicht erstattet. Manche Privatversicherungen mit Wellness-Tarif übernehmen einen Anteil. Heilmassage hingegen kann je nach Kasse teilweise rückerstattet werden — siehe Preise-Seite.",
      group: "costNote",
    }),

    // ── FAQs (seitenspezifisch) ───────────────────────────────
    defineField({
      name: "faqs",
      title: "Häufige Fragen (Sportmassage)",
      type: "array",
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
          question: "Wie oft sollte ich Sportmassage in Anspruch nehmen?",
          answer:
            "Das hängt von Ihrem Trainingsvolumen ab. Hobby-Sportler:innen mit 3–4 Trainings/Woche profitieren oft von einer Sportmassage alle 2–3 Wochen. Bei intensiven Trainingsphasen kann häufiger sinnvoll sein, in Ruhephasen seltener. Wir können das gerne in der ersten Behandlung gemeinsam einschätzen.",
        },
        {
          _key: "faq-2",
          question: "Vor oder nach dem Wettkampf — was bringt mehr?",
          answer:
            "Beides hat einen Platz: Pre-Wettkampf 2–3 Tage vorher zur Lockerung, ohne dass tief gearbeitet wird. Post-Wettkampf am besten 24–48 Stunden danach, dann ist das Gewebe schon wieder belastbarer für tiefere Techniken.",
        },
        {
          _key: "faq-3",
          question: "Was unterscheidet Sportmassage von Heilmassage?",
          answer:
            "Heilmassage wird häufig bei Beschwerden mit medizinischem Hintergrund eingesetzt und ist je nach Kasse teilweise erstattbar. Sportmassage ist eine Wellness- und Trainings-Leistung, fokussiert auf Regeneration und Leistungserhaltung — nicht erstattbar, aber je nach Bedarf der passendere Ansatz.",
        },
        {
          _key: "faq-4",
          question: "Hilft Sportmassage gegen Muskelkater?",
          answer:
            "Erfahrungsgemäß empfinden viele Menschen die Behandlung 24–48 Stunden nach intensiver Belastung als wohltuend. Wissenschaftlich ist die Evidenz für direkte Muskelkater-Reduktion gemischt — was bleibt, ist subjektives Wohlbefinden, verbesserte Beweglichkeit und ein Gefühl von Erholung.",
        },
        {
          _key: "faq-5",
          question: "Auch ohne Sportverletzung?",
          answer:
            "Definitiv. Sportmassage ist primär präventiv und regenerativ gedacht, nicht therapeutisch. Wer regelmäßig sportlich aktiv ist, profitiert davon, ohne Beschwerden zu haben.",
        },
        {
          _key: "faq-6",
          question: "Ist Sportmassage immer schmerzhaft?",
          answer:
            "Nein. Tiefer Druck heißt nicht automatisch Schmerz — der richtige Druck am richtigen Ort fühlt sich oft 'gut intensiv' an, nicht quälend. Wir sprechen während der Behandlung über das richtige Maß für Sie.",
        },
      ],
      group: "faqs",
    }),

    // ── CTA ───────────────────────────────────────────────────
    defineField({
      name: "ctaHeading",
      title: "CTA — Überschrift",
      type: "string",
      initialValue: "Bereit für die nächste Behandlung?",
      group: "cta",
    }),
    defineField({
      name: "ctaText",
      title: "CTA — Text",
      type: "text",
      rows: 2,
      initialValue:
        "Termin direkt online buchen — oder melden Sie sich, wenn Sie vorher Fragen haben.",
      group: "cta",
    }),
  ],
  groups: [
    { name: "hero", title: "Hero" },
    { name: "forWhom", title: "Für wen" },
    { name: "approach", title: "Mein Schwerpunkt" },
    { name: "whatIs", title: "Was ist Sportmassage" },
    { name: "effects", title: "Wirkung" },
    { name: "location", title: "Standort" },
    { name: "costNote", title: "Kostennotiz" },
    { name: "faqs", title: "FAQs" },
    { name: "cta", title: "CTA" },
  ],
  preview: {
    prepare: () => ({ title: "Sportmassage Wien" }),
  },
});
```

- [ ] **Step 1.2: TypeScript-Check**

Run: `npx tsc --noEmit`
Expected: 0 errors.

---

## Task 2: Schema in `index.ts` und `deskStructure.ts` registrieren

**Files:**
- Modify: `sanity/schemas/index.ts`
- Modify: `sanity/deskStructure.ts`

- [ ] **Step 2.1: `index.ts` erweitern**

Ersetze den Inhalt von `sanity/schemas/index.ts` durch:

```ts
import { serviceSchema } from "./service";
import { pricingItemSchema } from "./pricingItem";
import { faqItemSchema } from "./faqItem";
import { testimonialSchema } from "./testimonial";
import { aboutSchema } from "./about";
import { settingsSchema } from "./settings";
import { homePageSchema } from "./homePage";
import { heilmassagePageSchema } from "./heilmassagePage";
import { sportmassagePageSchema } from "./sportmassagePage";
import { buchenPageSchema } from "./buchenPage";
import { impressumPageSchema } from "./impressumPage";
import { datenschutzPageSchema } from "./datenschutzPage";
import { pricingPageSchema } from "./pricingPage";

export const schemaTypes = [
  settingsSchema,
  homePageSchema,
  heilmassagePageSchema,
  sportmassagePageSchema,
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

- [ ] **Step 2.2: `deskStructure.ts` erweitern**

In `sanity/deskStructure.ts`, im Block "Seiten", füge eine neue `singleton()`-Zeile direkt nach `heilmassagePage` und vor `pricingPage` (Plan 1) bzw. `about` ein:

```ts
      singleton(S, "Heilmassage Wien", "heilmassagePage", "heilmassagePage"),
      singleton(S, "Sportmassage Wien", "sportmassagePage", "sportmassagePage"),
      singleton(S, "Preise (Seite)", "pricingPage", "pricingPage"),
      singleton(S, "Über mich", "about", "about"),
```

(Der Block davor + danach bleibt unverändert. Nur die Sportmassage-Zeile ist neu.)

- [ ] **Step 2.3: TypeScript-Check**

Run: `npx tsc --noEmit`
Expected: 0 errors.

---

## Task 3: Type + Query in `queries.ts` ergänzen + `_key`-Fix für Heilmassage

**Files:**
- Modify: `sanity/lib/queries.ts`

- [ ] **Step 3.1: `SanityHeilmassagePage`-Type um `_key` in faqs erweitern**

In `sanity/lib/queries.ts`, finde den `SanityHeilmassagePage`-Type (etwa Zeile 106). Ändere die `faqs`-Zeile von:

```ts
faqs: { question: string; answer: string }[];
```

zu:

```ts
faqs: { _key: string; question: string; answer: string }[];
```

- [ ] **Step 3.2: `getHeilmassagePage`-Query um `_key` erweitern**

In derselben Datei, finde `getHeilmassagePage`. Die Funktion ist aktuell nicht in `cache()` gewrapped — ändere das (analog zu `getPricingPage`). Ersetze die ganze Funktion durch:

```ts
export const getHeilmassagePage = cache(async (): Promise<SanityHeilmassagePage | null> => {
  return safeFetch<SanityHeilmassagePage>(
    `*[_type == "heilmassagePage"][0] {
      heroBadge, heroHeading, heroSubtitle, heroImage,
      forWhomHeading, forWhomDescription, conditions,
      approachHeading, approachDescription, approachPoints, approachBottomText, approachImage,
      whatIsHeading, whatIsParagraphs,
      effectsHeading, effectsDescription, effects[] { title, description },
      locationHeading, locationDescription, transportInfo[] { label, value },
      faqs[] { _key, question, answer },
      ctaHeading, ctaText
    }`
  );
});
```

(`cache` wird bereits in `queries.ts` importiert seit Plan 1.)

- [ ] **Step 3.3: `SanitySportmassagePage`-Type einfügen**

Direkt nach dem `SanityHeilmassagePage`-Type, folgenden neuen Type einfügen:

```ts
export type SanitySportmassagePage = {
  heroBadge: string;
  heroHeading: string;
  heroSubtitle: string;
  heroImage?: { asset: { _ref: string } };
  forWhomHeading: string;
  forWhomDescription: string;
  conditions: string[];
  approachHeading: string;
  approachDescription: string;
  approachPoints: string[];
  approachBottomText: string;
  approachImage?: { asset: { _ref: string } };
  whatIsHeading: string;
  whatIsParagraphs: string[];
  effectsHeading: string;
  effectsDescription: string;
  effects: { title: string; description: string }[];
  locationHeading: string;
  locationDescription: string;
  transportInfo: { label: string; value: string }[];
  costNote: string;
  faqs: { _key: string; question: string; answer: string }[];
  ctaHeading: string;
  ctaText: string;
};
```

- [ ] **Step 3.4: `getSportmassagePage()`-Funktion ergänzen**

Direkt nach `getHeilmassagePage` (geändert in Step 3.2), folgende neue Funktion einfügen:

```ts
export const getSportmassagePage = cache(async (): Promise<SanitySportmassagePage | null> => {
  return safeFetch<SanitySportmassagePage>(
    `*[_type == "sportmassagePage"][0] {
      heroBadge, heroHeading, heroSubtitle, heroImage,
      forWhomHeading, forWhomDescription, conditions,
      approachHeading, approachDescription, approachPoints, approachBottomText, approachImage,
      whatIsHeading, whatIsParagraphs,
      effectsHeading, effectsDescription, effects[] { title, description },
      locationHeading, locationDescription, transportInfo[] { label, value },
      costNote,
      faqs[] { _key, question, answer },
      ctaHeading, ctaText
    }`
  );
});
```

- [ ] **Step 3.5: TypeScript-Check**

Run: `npx tsc --noEmit`
Expected: 0 errors.

- [ ] **Step 3.6: Studio-Verifikation**

Run: `npm run dev`
Im Browser zu `http://localhost:3000/studio`. In der linken Liste muss „Sportmassage Wien" erscheinen (zwischen „Heilmassage Wien" und „Preise (Seite)"). Klicken → Singleton öffnet sich mit allen Feldgruppen (Hero, Für wen, Mein Schwerpunkt, Was ist Sportmassage, Wirkung, Standort, Kostennotiz, FAQs, CTA), jeweils mit `initialValue` vorgefüllt.

`Ctrl+C` zum Stoppen.

- [ ] **Step 3.7: Initial-Document publishen**

Im Studio → „Sportmassage Wien" öffnen → Publish (sodass der Singleton existiert; ohne Publish gibt die GROQ-Query mit useCdn nichts zurück).

- [ ] **Step 3.8: Commit Schema-Block**

```bash
git add sanity/schemas/sportmassagePage.ts sanity/schemas/index.ts sanity/deskStructure.ts sanity/lib/queries.ts
git commit -m "feat(sanity): add sportmassagePage schema + cache getHeilmassagePage + _key in faqs"
```

---

## Task 4: `<TreatmentPage/>`-Komponente extrahieren + Heilmassage refactoren

**Files:**
- Create: `components/TreatmentPage.tsx`
- Modify: `app/heilmassage-wien-1080/page.tsx`

**Risiko:** Heilmassage-Seite muss visuell unverändert bleiben. Browser-DevTools-Vergleich vor/nach Refactor verpflichtend.

- [ ] **Step 4.1: `components/TreatmentPage.tsx` erstellen**

Erstelle `components/TreatmentPage.tsx`:

```tsx
import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle2,
  ArrowRight,
  Check,
  MapPin,
  ChevronDown,
  Info,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FaqJsonLd } from "@/components/FaqJsonLd";
import type { SanitySettings } from "@/sanity/lib/queries";

export type TreatmentVariant = "heilmassage" | "sportmassage";

export type TreatmentFaq = { _key: string; question: string; answer: string };

export type TreatmentEffect = { title: string; description: string };

export type TreatmentTransport = { label: string; value: string };

export type TreatmentPageData = {
  heroBadge: string;
  heroHeading: string;
  heroSubtitle: string;
  heroImageSrc: string;
  heroImageAlt: string;

  forWhomHeading: string;
  forWhomDescription: string;
  conditions: string[];

  approachHeading: string;
  approachDescription: string;
  approachPoints: string[];
  approachBottomText: string;
  approachImageSrc: string;
  approachImageAlt: string;

  whatIsHeading: string;
  whatIsParagraphs: string[];

  effectsHeading: string;
  effectsDescription: string;
  effects: TreatmentEffect[];

  locationHeading: string;
  locationDescription: string;
  transportInfo: TreatmentTransport[];

  costNote?: string; // nur Sportmassage

  faqs: TreatmentFaq[];
  faqSectionHeading: string;

  ctaHeading: string;
  ctaText: string;
};

const SISTER_LINKS: Record<
  TreatmentVariant,
  { href: string; label: string; description: string }
> = {
  heilmassage: {
    href: "/sportmassage-wien",
    label: "Sportmassage ansehen",
    description: "Für Regeneration, Triggerpunkte und sportliche Belastung",
  },
  sportmassage: {
    href: "/heilmassage-wien-1080",
    label: "Heilmassage ansehen",
    description: "Bei Verspannungen, Rückenschmerzen und chronischen Beschwerden",
  },
};

export function TreatmentPage({
  data,
  variant,
  settings,
}: {
  data: TreatmentPageData;
  variant: TreatmentVariant;
  settings: SanitySettings | null | undefined;
}) {
  const address = settings?.address ?? "Feldgasse 3/20";
  const sister = SISTER_LINKS[variant];

  return (
    <>
      <FaqJsonLd faqs={data.faqs.map((f) => ({ q: f.question, a: f.answer }))} />
      <Navbar />
      <main>
        {/* ── HERO ─────────────────────────────────────────────────── */}
        <section className="relative bg-[#0d4f4f] overflow-hidden">
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
              backgroundSize: "32px 32px",
            }}
          />
          <div className="relative mx-auto max-w-7xl px-5 sm:px-8 pt-28 pb-16 sm:pt-36 sm:pb-24">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <p className="mb-4 inline-block rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white/70">
                  {data.heroBadge}
                </p>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight">
                  {data.heroHeading}
                </h1>
                <p className="mt-5 text-lg sm:text-xl text-white/70 max-w-xl leading-relaxed">
                  {data.heroSubtitle}
                </p>
                <div className="mt-10 flex flex-col sm:flex-row items-start gap-4">
                  <Link
                    href="/buchen"
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#e8654a] to-[#f2a93b] px-8 py-4 text-base font-bold text-white shadow-lg shadow-[#e8654a]/30 transition-all duration-200 hover:shadow-xl hover:shadow-[#e8654a]/40 motion-safe:hover:scale-[1.03]"
                  >
                    Termin buchen
                    <ArrowRight size={18} strokeWidth={2.5} aria-hidden={true} />
                  </Link>
                  <a
                    href="/#kontakt"
                    className="inline-flex items-center gap-2 rounded-full border border-white/25 px-8 py-4 text-base font-semibold text-white/80 transition-all duration-200 hover:bg-white/10 hover:text-white"
                  >
                    Kontakt
                  </a>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -top-4 -right-4 w-full h-full rounded-3xl bg-[#f2a93b]/15 rotate-1 pointer-events-none" />
                <div className="relative rounded-3xl overflow-hidden aspect-[4/3] max-w-lg mx-auto lg:mx-0 lg:ml-auto">
                  <Image
                    src={data.heroImageSrc}
                    alt={data.heroImageAlt}
                    fill
                    className="object-cover"
                    priority
                    quality={75}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FÜR WEN ──────────────────────────────────────────────── */}
        <section className="py-16 sm:py-24 bg-white">
          <div className="mx-auto max-w-4xl px-5 sm:px-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0d4f4f] mb-2">
              {data.forWhomHeading}
            </h2>
            <p className="text-[#555] mb-10 leading-relaxed max-w-2xl">
              {data.forWhomDescription}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
              {data.conditions.map((label) => (
                <div
                  key={label}
                  className="flex items-center gap-3 rounded-2xl bg-[#f5fafa] border border-[#0d4f4f]/10 px-4 py-3.5"
                >
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br from-[#e8654a] to-[#f2a93b] flex items-center justify-center">
                    <Check size={11} strokeWidth={3} className="text-white" aria-hidden={true} />
                  </span>
                  <span className="text-sm font-semibold text-[#111]">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── USP / WIE ICH ARBEITE ─────────────────────────────────── */}
        <section className="py-16 sm:py-24 bg-[#f0f7f7]">
          <div className="mx-auto max-w-4xl px-5 sm:px-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0d4f4f] mb-2">
              {data.approachHeading}
            </h2>
            <p className="text-[#555] mb-10 leading-relaxed max-w-2xl">
              {data.approachDescription}
            </p>

            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
              <div>
                <ul className="space-y-4">
                  {data.approachPoints.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2
                        size={20}
                        className="text-[#e8654a] flex-shrink-0 mt-0.5"
                        strokeWidth={2}
                        aria-hidden={true}
                      />
                      <span className="text-[#333] leading-relaxed text-sm sm:text-base">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-[#555] leading-relaxed text-sm">
                  {data.approachBottomText}
                </p>
              </div>

              <div className="relative rounded-3xl overflow-hidden aspect-[4/3]">
                <Image
                  src={data.approachImageSrc}
                  alt={data.approachImageAlt}
                  fill
                  className="object-cover"
                  quality={75}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── WAS IST X ──────────────────────────────────────────── */}
        <section className="py-16 sm:py-24 bg-white">
          <div className="mx-auto max-w-4xl px-5 sm:px-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0d4f4f] mb-4">
              {data.whatIsHeading}
            </h2>
            <div className="space-y-4 text-[#555] leading-relaxed">
              {data.whatIsParagraphs.map((text, i) => (
                <p
                  key={i}
                  className={
                    i === data.whatIsParagraphs.length - 1
                      ? "text-sm text-[#555]/80"
                      : undefined
                  }
                >
                  {text}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* ── WIRKUNG ──────────────────────────────────────────────── */}
        <section className="py-16 sm:py-24 bg-[#f0f7f7]">
          <div className="mx-auto max-w-4xl px-5 sm:px-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0d4f4f] mb-3">
              {data.effectsHeading}
            </h2>
            <p className="text-[#555] mb-10 leading-relaxed">
              {data.effectsDescription}
            </p>
            <div className="grid sm:grid-cols-2 gap-5">
              {data.effects.map(({ title, description }) => (
                <div
                  key={title}
                  className="rounded-2xl bg-white border border-[#0d4f4f]/8 p-6 shadow-sm"
                >
                  <h3 className="font-bold text-[#0d4f4f] mb-2">{title}</h3>
                  <p className="text-sm text-[#555] leading-relaxed">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── COST NOTE (nur Sportmassage) ─────────────────────────── */}
        {variant === "sportmassage" && data.costNote && (
          <section className="py-12 sm:py-16 bg-white border-t border-[#0d4f4f]/8">
            <div className="mx-auto max-w-4xl px-5 sm:px-8">
              <div className="flex items-start gap-4 rounded-2xl bg-gradient-to-r from-[#0d4f4f]/[0.06] to-[#0d4f4f]/[0.02] border border-[#0d4f4f]/10 p-6 sm:p-8">
                <div className="flex-shrink-0 mt-0.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0d4f4f]/10">
                    <Info size={20} className="text-[#0d4f4f]" aria-hidden={true} />
                  </div>
                </div>
                <div>
                  <p className="font-bold text-[#111]">Hinweis zu Krankenkassen</p>
                  <p className="mt-1 text-sm text-[#555] leading-relaxed">
                    {data.costNote}
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── STANDORT ─────────────────────────────────────────────── */}
        <section className="py-16 sm:py-24 bg-white">
          <div className="mx-auto max-w-4xl px-5 sm:px-8">
            <div className="rounded-3xl bg-[#0d4f4f] p-8 sm:p-12">
              <div className="grid sm:grid-cols-2 gap-10 items-center">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white/70">
                    Standort
                  </span>
                  <h2 className="mt-4 text-2xl sm:text-3xl font-extrabold text-white">
                    {data.locationHeading}
                  </h2>
                  <p className="mt-4 text-white/65 leading-relaxed">
                    {data.locationDescription}
                  </p>
                  <address className="mt-6 not-italic">
                    <div className="flex items-start gap-2">
                      <MapPin
                        size={16}
                        className="text-[#f2a93b] mt-0.5 shrink-0"
                        aria-hidden={true}
                      />
                      <div>
                        <p className="font-bold text-white">{address}</p>
                        <p className="text-white/60">1080 Wien (Josefstadt)</p>
                      </div>
                    </div>
                  </address>
                </div>
                <div className="flex flex-col gap-3">
                  {data.transportInfo.map(({ label, value }) => (
                    <div
                      key={label}
                      className="rounded-2xl bg-white/[0.07] border border-white/[0.12] px-5 py-4"
                    >
                      <p className="text-xs font-bold uppercase tracking-widest text-white/60 mb-1">
                        {label}
                      </p>
                      <p className="font-bold text-white">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────── */}
        <section className="py-16 sm:py-24 bg-[#f0f7f7]">
          <div className="mx-auto max-w-4xl px-5 sm:px-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0d4f4f] mb-3">
              {data.faqSectionHeading}
            </h2>
            <p className="text-[#555] mb-10 leading-relaxed">
              Antworten auf die Fragen, die mir am häufigsten gestellt werden.
            </p>
            <div className="space-y-3">
              {data.faqs.map((faq) => (
                <details
                  key={faq._key}
                  className="group rounded-2xl bg-white border border-[#0d4f4f]/10 overflow-hidden"
                >
                  <summary className="flex items-center justify-between gap-4 cursor-pointer px-6 py-5 font-semibold text-[#111] text-sm sm:text-base list-none">
                    {faq.question}
                    <ChevronDown
                      size={18}
                      className="text-[#0d4f4f] shrink-0 transition-transform duration-200 group-open:rotate-180"
                      aria-hidden={true}
                    />
                  </summary>
                  <p className="px-6 pb-5 text-sm text-[#555] leading-relaxed border-t border-[#0d4f4f]/5 pt-4">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── PREISE-LINK + CROSS-LINK ─────────────────────────────── */}
        <section className="py-12 sm:py-16 bg-white border-t border-[#0d4f4f]/8">
          <div className="mx-auto max-w-4xl px-5 sm:px-8 grid sm:grid-cols-2 gap-4">
            <div className="flex flex-col items-start justify-between gap-4 rounded-3xl bg-[#f0f7f7] p-6 sm:p-8">
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
                <ArrowRight size={16} strokeWidth={2.5} aria-hidden={true} />
              </Link>
            </div>

            <div className="flex flex-col items-start justify-between gap-4 rounded-3xl bg-[#f0f7f7] p-6 sm:p-8">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#0d4f4f]/60 mb-1">
                  Im Vergleich
                </p>
                <p className="text-lg sm:text-xl font-extrabold text-[#111]">
                  {sister.description}
                </p>
              </div>
              <Link
                href={sister.href}
                className="inline-flex items-center gap-2 rounded-full border-2 border-[#0d4f4f] px-6 py-3 text-sm font-bold text-[#0d4f4f] hover:bg-[#0d4f4f] hover:text-white transition-all duration-200 whitespace-nowrap"
              >
                {sister.label}
                <ArrowRight size={16} strokeWidth={2.5} aria-hidden={true} />
              </Link>
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ────────────────────────────────────────────── */}
        <section className="py-16 sm:py-24 bg-[#0d4f4f]">
          <div className="mx-auto max-w-2xl px-5 sm:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
              {data.ctaHeading}
            </h2>
            <p className="text-white/65 mb-10 leading-relaxed">{data.ctaText}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/buchen"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#e8654a] to-[#f2a93b] px-8 py-4 text-base font-bold text-white shadow-lg shadow-[#e8654a]/30 transition-all duration-200 hover:shadow-xl hover:shadow-[#e8654a]/40 motion-safe:hover:scale-[1.03]"
              >
                Termin vereinbaren
                <ArrowRight size={18} strokeWidth={2.5} aria-hidden={true} />
              </Link>
              <a
                href="/#kontakt"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-8 py-4 text-base font-semibold text-white/80 transition-all duration-200 hover:bg-white/10 hover:text-white"
              >
                Kontakt
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer sanitySettings={settings} />
    </>
  );
}
```

**Wichtige Detail-Hinweise:**
- Heilmassage hatte ursprünglich KEINEN Cross-Link zur Sportmassage, NUR den PREISE-LINK. Mit der Extraktion bekommt sie jetzt auch einen Cross-Link zu Sportmassage. Das ist eine **bewusste UX-Erweiterung**, weil beide Routen jetzt gleichberechtigt nebeneinander stehen — symmetrisches Pattern. Die alte 1-Spalte-PREISE-LINK-Sektion wird zu einer 2-Spalten-Sektion (Preise + Vergleich).
- `motion-safe:hover:scale-[1.03]` ersetzt `hover:scale-[1.03]` (lessons learned aus Plan 1: respektiere `prefers-reduced-motion`).
- `aria-hidden={true}` auf dekorativen Icons (lessons learned aus Plan 1).

- [ ] **Step 4.2: `app/heilmassage-wien-1080/page.tsx` zum Wrapper refactoren**

Ersetze den GANZEN Inhalt von `app/heilmassage-wien-1080/page.tsx` durch:

```tsx
import type { Metadata } from "next";
import {
  TreatmentPage,
  type TreatmentPageData,
} from "@/components/TreatmentPage";
import { getHeilmassagePage, getSettings } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

export const metadata: Metadata = {
  title: "Heilmassage Wien 1080 | Praxis Domenic Hacker",
  description:
    "Heilmassage in Wien 1080 (Josefstadt) – gezielt, wirksam und in der richtigen Intensität. Rückenschmerzen, Verspannungen, Nacken & Schulter. Jetzt Termin buchen.",
  alternates: {
    canonical: "https://heilmasseur-domenic.at/heilmassage-wien-1080",
  },
  openGraph: {
    title: "Heilmassage Wien 1080 | Praxis Domenic Hacker",
    description:
      "Heilmassage in Wien 1080 – gezielt, wirksam und in der richtigen Intensität. Jetzt Termin buchen.",
    url: "https://heilmasseur-domenic.at/heilmassage-wien-1080",
    locale: "de_AT",
    type: "website",
  },
};

const defaultConditions = [
  "Rückenschmerzen",
  "Nacken & Schulter",
  "Verspannungen",
  "Nach dem Sport",
  "Viel Sitzen",
  "Stress",
];

const defaultEffects = [
  {
    title: "Löst Verspannungen",
    description:
      "Verhärtetes Gewebe wird gezielt gelockert und die Muskulatur entspannt – nicht nur oberflächlich, sondern in der Tiefe.",
  },
  {
    title: "Lindert Schmerzen",
    description:
      "Gezielte Behandlung der Schmerzpunkte – wirksam, ohne unnötigen Druck. Viele berichten schon nach der ersten Behandlung von spürbarer Erleichterung.",
  },
  {
    title: "Verbessert Beweglichkeit",
    description:
      "Mehr Spielraum in Gelenken und Muskeln nach der Behandlung. Besonders spürbar bei Schulter, Nacken und Rücken.",
  },
  {
    title: "Unterstützt Regeneration",
    description:
      "Bessere Durchblutung, schnellere Erholung – vor allem nach sportlicher Belastung oder nach langen Arbeitstagen am Schreibtisch.",
  },
];

const defaultApproachPoints = [
  `Keine Standardmassage – gezielte Behandlung statt „drübermassieren"`,
  "Intensität wird laufend angepasst – nicht zu wenig, nicht zu viel",
  "Feedback jederzeit möglich und erwünscht",
  "Erfahrung und ein gutes Gespür für den richtigen Druck",
];

const defaultFaqs = [
  {
    _key: "default-faq-1",
    question:
      "Was ist der Unterschied zwischen Heilmassage und einer normalen Massage?",
    answer:
      "Eine Heilmassage ist eine medizinisch anerkannte Behandlung, die gezielt auf Beschwerden wie Rückenschmerzen, Verspannungen oder eingeschränkte Beweglichkeit abzielt – durchgeführt von einem diplomierten Heilmasseur. Eine Wellnessmassage dient primär der Entspannung. Bei mir steht der therapeutische Nutzen im Vordergrund – Entspannung ist ein angenehmer Nebeneffekt.",
  },
  {
    _key: "default-faq-2",
    question: "Wie viele Termine brauche ich bis zur Verbesserung?",
    answer:
      "Das hängt stark von Ihren Beschwerden ab. Akute Verspannungen lassen sich oft schon in 2–3 Terminen deutlich verbessern. Bei chronischen Beschwerden empfehle ich regelmäßigere Behandlungen. Das besprechen wir beim ersten Termin – ganz ohne Verpflichtung.",
  },
  {
    _key: "default-faq-3",
    question: "Tut eine Heilmassage weh?",
    answer:
      "Das Ziel ist wirksame Behandlung – nicht Schmerz. Mein Schwerpunkt liegt auf der richtigen Intensität: wirksam, aber ohne unnötigen Druck. Sie können jederzeit sagen, wenn Ihnen etwas zu viel oder zu wenig ist – ich passe mich sofort an.",
  },
  {
    _key: "default-faq-4",
    question: "Muss ich etwas zur Behandlung mitbringen?",
    answer:
      "Nein, alles Notwendige ist in der Praxis vorhanden. Kommen Sie einfach pünktlich – und wenn möglich mit einem kurzen Überblick über Ihre aktuellen Beschwerden, damit wir gleich gezielt loslegen können.",
  },
  {
    _key: "default-faq-5",
    question: "Kann ich die Heilmassage bei der Krankenkasse einreichen?",
    answer:
      "Als diplomierter Heilmasseur bin ich gewerblich tätig. Die öffentliche Krankenkasse übernimmt die Kosten in der Regel nicht direkt. Manche privaten Zusatzversicherungen erstatten Heilmassagen teilweise – bitte erkundigen Sie sich direkt bei Ihrer Versicherung.",
  },
  {
    _key: "default-faq-6",
    question: "Wie finde ich die Praxis in Wien 1080?",
    answer:
      "Die Praxis liegt in der Feldgasse 3/20 im 8. Bezirk (Josefstadt). Gut erreichbar mit der U2 (Station Rathaus) oder mit der Straßenbahn J, 5 oder 33. Parkplätze sind in der unmittelbaren Umgebung vorhanden.",
  },
];

const defaultTransportInfo = [
  { label: "U-Bahn", value: "U2 – Station Rathaus" },
  { label: "Straßenbahn", value: "Linien J · 5 · 33" },
  { label: "Parken", value: "Parkplätze in der Umgebung" },
];

export default async function HeilmassageWien() {
  const [page, settings] = await Promise.all([
    getHeilmassagePage(),
    getSettings(),
  ]);

  const heroImageSrc = page?.heroImage
    ? urlFor(page.heroImage).width(800).height(600).url()
    : "/images/heilmassage-wien.webp";

  const approachImageSrc = page?.approachImage
    ? urlFor(page.approachImage).width(800).height(600).url()
    : "/images/praxis-interior.png";

  const data: TreatmentPageData = {
    heroBadge: page?.heroBadge ?? "Wien 1080 · Josefstadt",
    heroHeading: page?.heroHeading ?? "Heilmassage in 1080 Wien",
    heroSubtitle:
      page?.heroSubtitle ?? "gezielt, wirksam und in der richtigen Intensität",
    heroImageSrc,
    heroImageAlt: "Heilmassage Behandlung in Wien 1080 – Praxis Domenic Hacker",

    forWhomHeading: page?.forWhomHeading ?? "Für wen ist das?",
    forWhomDescription:
      page?.forWhomDescription ??
      "Ob Rückenschmerzen nach langem Sitzen, ein verspannter Nacken oder Muskeln, die nach dem Sport einfach nicht loslassen – wenn Sie sich hier wiedererkennen, sind Sie bei mir richtig.",
    conditions: page?.conditions ?? defaultConditions,

    approachHeading: page?.approachHeading ?? "Mein Schwerpunkt",
    approachDescription:
      page?.approachDescription ??
      "Mein Schwerpunkt liegt auf der passenden Intensität. Durch Erfahrung und ein gutes Gespür finde ich meist genau den richtigen Druck – wirksam, aber ohne unnötigen Schmerz.",
    approachPoints: page?.approachPoints ?? defaultApproachPoints,
    approachBottomText:
      page?.approachBottomText ??
      "Keine Massage ist wie die andere. Was Sie bekommen, ist eine Behandlung, die sich an Ihrem Körper und Ihrem Feedback orientiert – nicht an einem Schema.",
    approachImageSrc,
    approachImageAlt:
      "Praxis-Interieur der Heilmassage Wien 1080 – Domenic Hacker",

    whatIsHeading: page?.whatIsHeading ?? "Was ist Heilmassage?",
    whatIsParagraphs: page?.whatIsParagraphs ?? [
      "Heilmassage ist eine medizinisch anerkannte Behandlung, die gezielt bei Beschwerden wie Rückenschmerzen, Verspannungen oder eingeschränkter Beweglichkeit eingesetzt wird. Im Unterschied zur Wellnessmassage steht hier der therapeutische Nutzen im Vordergrund — durchgeführt von einem diplomierten Heilmasseur.",
      "Ich arbeite systematisch und passe die Intensität laufend an Ihren Körper an. Jede Behandlung beginnt mit einem kurzen Gespräch: Wo sind die Beschwerden? Was soll sich danach anders anfühlen? Erst dann lege ich los — mit dem Druck, den Ihr Körper gerade braucht.",
      "Neben Heilmassage biete ich auch klassische Massage und Lymphdrainage an — sprechen Sie mich gerne an.",
    ],

    effectsHeading: page?.effectsHeading ?? "Was Massage bewirkt",
    effectsDescription:
      page?.effectsDescription ??
      "Gezielt eingesetzt erzielt Massage messbare Ergebnisse – nicht nur im Moment, sondern nachhaltig.",
    effects: page?.effects ?? defaultEffects,

    locationHeading: page?.locationHeading ?? "Heilmassage Wien 1080 – Josefstadt",
    locationDescription:
      page?.locationDescription ??
      "Die Praxis liegt im Herzen des 8. Bezirks – einer der ruhigeren, grünen Ecken Wiens, direkt an der U2 und mehreren Straßenbahnlinien.",
    transportInfo: page?.transportInfo ?? defaultTransportInfo,

    // Heilmassage hat keine costNote
    faqs: page?.faqs ?? defaultFaqs,
    faqSectionHeading: "Häufige Fragen zur Heilmassage in Wien",

    ctaHeading: page?.ctaHeading ?? "Bereit für eine Behandlung?",
    ctaText:
      page?.ctaText ??
      "Termin direkt online buchen – oder melden Sie sich, wenn Sie vorher Fragen haben.",
  };

  return <TreatmentPage data={data} variant="heilmassage" settings={settings} />;
}
```

**Wichtig:** Ich habe in `locationDescription` „direkt an der U2" statt des bisherigen „direkt an der U3" gesetzt — das war ein bekannter Bug im alten Default (transportInfo zeigte richtigerweise U2, der Beschreibungstext war veraltet). Wenn das nicht gefixt werden soll, einfach das `U3` zurückschreiben — aber der Sanity-Singleton in der Production hat ggf. schon die korrekte U2-Bezeichnung, und der Default wird nur als Fallback genutzt.

- [ ] **Step 4.3: TypeScript- und Build-Check**

Run: `npx tsc --noEmit`
Expected: 0 errors.

Run: `npm run build`
Expected: Build erfolgreich, alle Routen wie zuvor.

- [ ] **Step 4.4: Visueller Vergleich Heilmassage**

Run: `npm run dev`
Browser: `http://localhost:3000/heilmassage-wien-1080`

Vor dem Refactor sah die Seite aus wie folgt — bitte verifizieren:
- Hero mit Badge, H1, Subtitle, „Termin buchen"+„Kontakt" Buttons, Bild rechts
- „Für wen ist das?" mit 6 Tags (Rückenschmerzen, Nacken & Schulter, Verspannungen, Nach dem Sport, Viel Sitzen, Stress)
- „Mein Schwerpunkt" mit 4 Bullet-Points + Bottom-Text + Bild rechts
- „Was ist Heilmassage?" 3 Absätze
- „Was Massage bewirkt" mit 4 Karten (Löst Verspannungen, Lindert Schmerzen, Verbessert Beweglichkeit, Unterstützt Regeneration)
- KEIN cost-note-Block (Heilmassage hat keinen)
- „Standort" dunkelgrüne Box mit Adresse + 3 Transport-Kacheln
- „Häufige Fragen zur Heilmassage in Wien" mit 6 FAQ-Akkordeons
- **NEU:** PREISE-LINK + VERGLEICH-LINK in 2 Spalten (vorher war es nur eine Spalte mit dem Preise-Link). Die zweite Spalte verlinkt auf `/sportmassage-wien` mit Text „Sportmassage ansehen / Für Regeneration, Triggerpunkte und sportliche Belastung"
- Final CTA dunkelgrün mit „Termin vereinbaren" + „Kontakt"

**Akzeptable Änderungen:** PREISE-LINK ist jetzt 2-spaltig (mit Sportmassage-Vergleich); restliche Sektionen byte-equivalent.

`Ctrl+C` zum Stoppen.

- [ ] **Step 4.5: Commit**

```bash
git add components/TreatmentPage.tsx app/heilmassage-wien-1080/page.tsx
git commit -m "refactor: extract TreatmentPage from heilmassage route + add cross-treatment link"
```

---

## Task 5: `/sportmassage-wien`-Route erstellen + JsonLdService variant

**Files:**
- Modify: `components/JsonLdService.tsx`
- Create: `app/sportmassage-wien/page.tsx`

- [ ] **Step 5.1: `JsonLdService.tsx` um `variant`-Prop erweitern**

Ersetze den Inhalt von `components/JsonLdService.tsx` durch:

```tsx
const BASE_URL = "https://heilmasseur-domenic.at";

const PROVIDER = {
  "@type": "LocalBusiness",
  name: "Heilmasseur Domenic Hacker",
  url: BASE_URL,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Feldgasse 3/20",
    addressLocality: "Wien",
    postalCode: "1080",
    addressCountry: "AT",
  },
} as const;

const AREA_SERVED = {
  "@type": "City",
  name: "Wien",
} as const;

const VARIANT_DATA = {
  overview: {
    name: "Heilmassage & Sportmassage Wien 1080",
    description:
      "Diplomierte Heilmassage und Sportmassage in Wien 1080 (Josefstadt). Heilmassage, Lymphdrainage, Klassische Massage, Sportmassage — individuell auf den Bedarf abgestimmt.",
    serviceType: "Massage",
    priceRange: "€55–€85",
  },
  heilmassage: {
    name: "Heilmassage Wien 1080",
    description:
      "Heilmassage in Wien 1080 (Josefstadt) – gezielt, wirksam und in der richtigen Intensität bei Rückenschmerzen, Verspannungen und chronischen Beschwerden. Diplomierter Heilmasseur, je nach Krankenkasse teilweise erstattbar.",
    serviceType: "Heilmassage",
    priceRange: "€55–€85",
  },
  sportmassage: {
    name: "Sportmassage Wien 1080",
    description:
      "Sportmassage in Wien 1080 (Josefstadt) – Triggerpunkt-Arbeit, Faszien-Mobilisation und Regeneration für Hobby- und Wettkampfsportler. Wellness- und Trainings-Begleitservice.",
    serviceType: "Sportmassage",
    priceRange: "€55–€85",
  },
} as const;

export type JsonLdServiceVariant = keyof typeof VARIANT_DATA;

export function JsonLdService({
  variant = "overview",
}: {
  variant?: JsonLdServiceVariant;
}) {
  const data = VARIANT_DATA[variant];
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: data.name,
    description: data.description,
    serviceType: data.serviceType,
    priceRange: data.priceRange,
    areaServed: AREA_SERVED,
    provider: PROVIDER,
  };

  return (
    <script type="application/ld+json" suppressHydrationWarning>
      {JSON.stringify(schema).replace(/</g, "\\u003c")}
    </script>
  );
}
```

Bestehende Verwendung auf `/preise` (`<JsonLdService />` ohne Prop) nutzt jetzt automatisch `variant: "overview"` als Default — Verhalten unverändert.

- [ ] **Step 5.2: TypeScript-Check**

Run: `npx tsc --noEmit`
Expected: 0 errors.

- [ ] **Step 5.3: Verzeichnis anlegen**

Run: `mkdir -p app/sportmassage-wien`
Expected: kein Output.

- [ ] **Step 5.4: `app/sportmassage-wien/page.tsx` erstellen**

Erstelle `app/sportmassage-wien/page.tsx`:

```tsx
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLdService } from "@/components/JsonLdService";
import {
  TreatmentPage,
  type TreatmentPageData,
} from "@/components/TreatmentPage";
import {
  getSportmassagePage,
  getSettings,
} from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

export const metadata: Metadata = {
  title:
    "Sportmassage Wien 1080 · Regeneration & Performance | Heilmasseur Domenic Hacker",
  description:
    "Sportmassage in Wien 1080 (Josefstadt) — Triggerpunkt-Arbeit, Faszien-Mobilisation und gezielte Regeneration für Hobby- und Wettkampfsportler. Termine online buchen.",
  alternates: {
    canonical: "https://heilmasseur-domenic.at/sportmassage-wien",
  },
  openGraph: {
    title: "Sportmassage Wien 1080 · Regeneration & Performance",
    description:
      "Sportmassage in Wien 1080 — Regeneration, Triggerpunkte, Faszien. Termine online buchen.",
    url: "https://heilmasseur-domenic.at/sportmassage-wien",
    locale: "de_AT",
    type: "website",
  },
};

const defaultConditions = [
  "Verspannungen nach Training",
  "Muskelkater-Vorbeugung",
  "Triggerpunkte",
  "Faszienverklebungen",
  "Ermüdungssymptome",
  "Vor Wettkampf",
  "Nach Wettkampf",
  "Steifheit nach langen Läufen",
];

const defaultEffects = [
  {
    title: "Schnellere Regeneration",
    description:
      "Verbesserte Durchblutung kann den Abtransport von Stoffwechselprodukten und die Versorgung der Muskulatur unterstützen.",
  },
  {
    title: "Verbesserte Beweglichkeit",
    description:
      "Gezielte Faszienarbeit und Triggerpunkt-Lösung können Bewegungseinschränkungen reduzieren.",
  },
  {
    title: "Verletzungs-Vorbeugung",
    description:
      "Geschmeidige, gut versorgte Muskulatur ist weniger anfällig für Zerrungen und Überlastungen.",
  },
  {
    title: "Bessere Körperwahrnehmung",
    description:
      "Wer regelmäßig massiert wird, spürt früher, wo der Körper Beachtung braucht.",
  },
  {
    title: "Tiefere Erholung",
    description:
      "Auch das vegetative Nervensystem profitiert: Ruhepuls, Schlafqualität, mentale Erholung.",
  },
  {
    title: "Trainingsfähigkeit erhalten",
    description:
      "Wenn die Muskulatur immer wieder zur Ruhe kommt, fällt das Trainingsvolumen leichter.",
  },
];

const defaultApproachPoints = [
  "Triggerpunkt-Arbeit an muskulären Schmerzpunkten",
  "Faszien-Mobilisation und Geweblosung",
  "Tiefe Querfriktion bei chronischen Verspannungen",
  "Stretching-Elemente zur Bewegungsverbesserung",
];

const defaultFaqs = [
  {
    _key: "default-sport-faq-1",
    question: "Wie oft sollte ich Sportmassage in Anspruch nehmen?",
    answer:
      "Das hängt von Ihrem Trainingsvolumen ab. Hobby-Sportler:innen mit 3–4 Trainings/Woche profitieren oft von einer Sportmassage alle 2–3 Wochen. Bei intensiven Trainingsphasen kann häufiger sinnvoll sein, in Ruhephasen seltener. Wir können das gerne in der ersten Behandlung gemeinsam einschätzen.",
  },
  {
    _key: "default-sport-faq-2",
    question: "Vor oder nach dem Wettkampf — was bringt mehr?",
    answer:
      "Beides hat einen Platz: Pre-Wettkampf 2–3 Tage vorher zur Lockerung, ohne dass tief gearbeitet wird. Post-Wettkampf am besten 24–48 Stunden danach, dann ist das Gewebe schon wieder belastbarer für tiefere Techniken.",
  },
  {
    _key: "default-sport-faq-3",
    question: "Was unterscheidet Sportmassage von Heilmassage?",
    answer:
      "Heilmassage wird häufig bei Beschwerden mit medizinischem Hintergrund eingesetzt und ist je nach Kasse teilweise erstattbar. Sportmassage ist eine Wellness- und Trainings-Leistung, fokussiert auf Regeneration und Leistungserhaltung — nicht erstattbar, aber je nach Bedarf der passendere Ansatz.",
  },
  {
    _key: "default-sport-faq-4",
    question: "Hilft Sportmassage gegen Muskelkater?",
    answer:
      "Erfahrungsgemäß empfinden viele Menschen die Behandlung 24–48 Stunden nach intensiver Belastung als wohltuend. Wissenschaftlich ist die Evidenz für direkte Muskelkater-Reduktion gemischt — was bleibt, ist subjektives Wohlbefinden, verbesserte Beweglichkeit und ein Gefühl von Erholung.",
  },
  {
    _key: "default-sport-faq-5",
    question: "Auch ohne Sportverletzung?",
    answer:
      "Definitiv. Sportmassage ist primär präventiv und regenerativ gedacht, nicht therapeutisch. Wer regelmäßig sportlich aktiv ist, profitiert davon, ohne Beschwerden zu haben.",
  },
  {
    _key: "default-sport-faq-6",
    question: "Ist Sportmassage immer schmerzhaft?",
    answer:
      "Nein. Tiefer Druck heißt nicht automatisch Schmerz — der richtige Druck am richtigen Ort fühlt sich oft 'gut intensiv' an, nicht quälend. Wir sprechen während der Behandlung über das richtige Maß für Sie.",
  },
];

const defaultTransportInfo = [
  { label: "U-Bahn", value: "U2 — Station Rathaus" },
  { label: "Straßenbahn", value: "Linien 5, 33, 43, 44" },
  { label: "Auto", value: "Kurzparkzonen rund um die Praxis" },
];

const defaultCostNote =
  "Sportmassage zählt in Österreich als Wellness- und Trainingsleistung und wird von gesetzlichen Krankenkassen nicht erstattet. Manche Privatversicherungen mit Wellness-Tarif übernehmen einen Anteil. Heilmassage hingegen kann je nach Kasse teilweise rückerstattet werden — siehe Preise-Seite.";

export default async function SportmassageWien() {
  const [page, settings] = await Promise.all([
    getSportmassagePage(),
    getSettings(),
  ]);

  const heroImageSrc = page?.heroImage
    ? urlFor(page.heroImage).width(800).height(600).url()
    : "/images/heilmassage-wien.webp"; // Platzhalter aus Heilmassage-Pool

  const approachImageSrc = page?.approachImage
    ? urlFor(page.approachImage).width(800).height(600).url()
    : "/images/praxis-interior.png";

  const data: TreatmentPageData = {
    heroBadge: page?.heroBadge ?? "Wien 1080 · Josefstadt",
    heroHeading: page?.heroHeading ?? "Sportmassage in 1080 Wien",
    heroSubtitle:
      page?.heroSubtitle ??
      "für Regeneration, Beweglichkeit und nachhaltige Leistung",
    heroImageSrc,
    heroImageAlt: "Sportmassage Behandlung in Wien 1080 – Praxis Domenic Hacker",

    forWhomHeading: page?.forWhomHeading ?? "Für wen ist das?",
    forWhomDescription:
      page?.forWhomDescription ??
      "Egal ob ambitioniert im Verein, regelmäßig im Fitnessstudio oder ein paar Mal pro Woche laufend — wenn Ihr Körper nach Belastung Erholung braucht oder Verspannungen das nächste Training ausbremsen, ist Sportmassage ein gezielter Hebel.",
    conditions: page?.conditions ?? defaultConditions,

    approachHeading: page?.approachHeading ?? "Mein Schwerpunkt",
    approachDescription:
      page?.approachDescription ??
      "Ich arbeite tief, aber kontrolliert — mit besonderem Fokus auf Triggerpunkte und Faszien. Dort, wo das Gewebe sich nach hoher Belastung verklebt oder nicht mehr richtig gleitet, setze ich gezielt an.",
    approachPoints: page?.approachPoints ?? defaultApproachPoints,
    approachBottomText:
      page?.approachBottomText ??
      "Wie viel Druck Sie brauchen, hängt von Ihnen, Ihrem Trainingsstand und Ihrer Tagesform ab. Ich passe das an Ihr Feedback an — Sportmassage ist nicht zwangsläufig eine schmerzhafte Massage, auch wenn das Klischee anders sagt.",
    approachImageSrc,
    approachImageAlt: "Praxis-Interieur Sportmassage Wien 1080 – Domenic Hacker",

    whatIsHeading: page?.whatIsHeading ?? "Was ist Sportmassage?",
    whatIsParagraphs: page?.whatIsParagraphs ?? [
      "Sportmassage ist eine spezialisierte Form der Massage, die auf die Bedürfnisse von Menschen mit regelmäßiger körperlicher Belastung zugeschnitten ist. Sie kombiniert Elemente der klassischen Massage mit gezielten Techniken zur muskulären Regeneration und Beweglichkeitsförderung.",
      "Im Unterschied zur Heilmassage, die häufig bei Beschwerden mit medizinischem Hintergrund eingesetzt wird, dient Sportmassage primär der Regeneration, Verletzungs-Vorbeugung und Leistungserhaltung. Sie ist ein Wellness- und Trainings-Begleitservice, kein medizinisches Verfahren.",
      "Wann eingesetzt? Pre-Workout zur Aktivierung, Post-Workout zur Regeneration, in Trainingspausen zur Wartung, vor Wettkämpfen zur Lockerung, nach Wettkämpfen zur Erholung.",
    ],

    effectsHeading: page?.effectsHeading ?? "Was Sportmassage bewirken kann",
    effectsDescription:
      page?.effectsDescription ??
      "Regelmäßig eingesetzt unterstützt Sportmassage Ihren Körper dabei, Belastung besser wegzustecken und schneller einsatzfähig zu sein.",
    effects: page?.effects ?? defaultEffects,

    locationHeading: page?.locationHeading ?? "Sportmassage Wien 1080 — Josefstadt",
    locationDescription:
      page?.locationDescription ??
      "Die Praxis liegt im 8. Bezirk, gut erreichbar mit U2 (Rathaus) und mehreren Straßenbahnlinien. Für viele Hobby-Sportler:innen aus Wien Mitte-West eine kurze Anfahrt.",
    transportInfo: page?.transportInfo ?? defaultTransportInfo,

    costNote: page?.costNote ?? defaultCostNote,

    faqs: page?.faqs ?? defaultFaqs,
    faqSectionHeading: "Häufige Fragen zur Sportmassage in Wien",

    ctaHeading: page?.ctaHeading ?? "Bereit für die nächste Behandlung?",
    ctaText:
      page?.ctaText ??
      "Termin direkt online buchen — oder melden Sie sich, wenn Sie vorher Fragen haben.",
  };

  return (
    <>
      <JsonLdService variant="sportmassage" />
      <Breadcrumbs
        items={[
          { label: "Startseite", href: "/" },
          { label: "Sportmassage", href: "/sportmassage-wien" },
        ]}
      />
      <TreatmentPage data={data} variant="sportmassage" settings={settings} />
    </>
  );
}
```

**Hinweis zu `Breadcrumbs` + `Navbar`:** `Breadcrumbs` rendert ein `<nav>` mit `pt-24 sm:pt-28`, das den Platz unter der fixed-Navbar reserviert. `TreatmentPage` selbst rendert die `Navbar`. Die Reihenfolge (`Breadcrumbs` außerhalb von `TreatmentPage`) ist die gleiche wie auf `/preise`. JsonLd-Tags ohne sichtbares Markup können vor `Breadcrumbs` stehen.

**Hinweis zur Struktur:** `TreatmentPage` rendert intern `<Navbar />` und `<main>...</main>`. Die `Breadcrumbs`-Komponente liegt zwischen JsonLd und der Hauptseite. Das ist nicht ideal (Breadcrumbs sollte semantisch _innerhalb_ von `<main>` sein), aber konsistent mit der `/preise`-Struktur und Heilmassage hat aktuell gar keine Breadcrumbs. Refactor für korrekte Breadcrumbs-Platzierung kann später (Plan 4) erfolgen.

**Pragmatische Alternative:** Breadcrumbs in TreatmentPage integrieren mit optionaler Prop. Für diesen Plan ziehe ich „außerhalb"-Pattern vor, weil es das `/preise`-Pattern dupliziert und keine TreatmentPage-Änderungen erfordert.

- [ ] **Step 5.5: TypeScript- und Build-Check**

Run: `npx tsc --noEmit`
Expected: 0 errors.

Run: `npm run build`
Expected: Build erfolgreich, `/sportmassage-wien` als neue Route in der Liste.

- [ ] **Step 5.6: Smoke-Test**

Run: `npm run dev`
Browser: `http://localhost:3000/sportmassage-wien`

Verify:
- Hero mit „Wien 1080 · Josefstadt" Badge, H1 „Sportmassage in 1080 Wien"
- 8 Tags in „Für wen" (Verspannungen nach Training, Muskelkater-Vorbeugung, Triggerpunkte, etc.)
- Schwerpunkt mit 4 Triggerpunkt/Faszien-Punkten
- 3 Was-ist-Sportmassage-Absätze
- 6 Wirkung-Karten
- **Cost-Note-Block sichtbar** (bei Heilmassage NICHT — auf der Heilmassage-Seite vergleichen)
- Standort gleich wie Heilmassage
- 6 FAQs
- PREISE-LINK + VERGLEICH-Link (zur Heilmassage)
- Final CTA
- DevTools → Elements: 4 JsonLd-Skripte (Service, BreadcrumbList, FAQPage; LocalBusiness aus Layout)

`Ctrl+C` zum Stoppen.

- [ ] **Step 5.7: Commit Sportmassage-Route**

```bash
git add components/JsonLdService.tsx app/sportmassage-wien/page.tsx
git commit -m "feat(sportmassage): add /sportmassage-wien route + JsonLdService variant prop"
```

---

## Task 6: Sitemap + `/preise` PricingTable.serviceLinks aktualisieren

**Files:**
- Modify: `app/sitemap.ts`
- Modify: `app/preise/page.tsx`

- [ ] **Step 6.1: `/sportmassage-wien` zur Sitemap hinzufügen**

In `app/sitemap.ts`, neuen Eintrag direkt nach `/heilmassage-wien-1080` und vor `/preise` einfügen. Replace the file contents:

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
      url: `${BASE_URL}/sportmassage-wien`,
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

- [ ] **Step 6.2: `/preise` PricingTable serviceLinks erweitern**

In `app/preise/page.tsx`, den `<PricingTable>`-Aufruf finden (etwa Zeile 130). Aktuell:

```tsx
            <PricingTable
              rows={rows}
              serviceLinks={{ "Heilmassage": "/heilmassage-wien-1080" }}
            />
```

Erweitern zu:

```tsx
            <PricingTable
              rows={rows}
              serviceLinks={{
                "Heilmassage": "/heilmassage-wien-1080",
                "Sportmassage": "/sportmassage-wien",
              }}
            />
```

(Der Sportmassage-Link wirkt nur, falls Sanity einen `pricingItem` mit serviceName „Sportmassage" zurückgibt. Aktuell sind die Default-Rows Heilmassage/Lymphdrainage/Klassische — kein Effekt sichtbar, aber sobald Domenic einen Sportmassage-Eintrag im Studio anlegt, wird er klickbar.)

- [ ] **Step 6.3: TypeScript + Build**

Run: `npx tsc --noEmit`
Expected: 0 errors.

Run: `npm run build`
Expected: Build erfolgreich, alle Routen.

- [ ] **Step 6.4: Sitemap-Verifikation**

Run: `npm run dev`
Browser: `http://localhost:3000/sitemap.xml`

Expected: 8 `<url>`-Einträge, `/sportmassage-wien` zwischen `/heilmassage-wien-1080` und `/preise`.

`Ctrl+C` zum Stoppen.

- [ ] **Step 6.5: Commit SEO**

```bash
git add app/sitemap.ts app/preise/page.tsx
git commit -m "feat(seo): add /sportmassage-wien to sitemap + PricingTable serviceLinks"
```

---

## Task 7: Final-Smoke-Test

- [ ] **Step 7.1: Production-Build**

Run: `npm run build`
Expected: 0 errors. Im Output sollten beide Routen erscheinen: `/heilmassage-wien-1080` und `/sportmassage-wien`.

- [ ] **Step 7.2: Production-Server starten**

Run: `npm run start`
Browser: `http://localhost:3000/sportmassage-wien`

Komplett-Check:
- Lädt schnell
- Alle Sektionen rendern (Hero, Für wen, Schwerpunkt, Was ist Sportmassage, Wirkung, Cost-Note-Block, Standort, FAQ, Preise+Vergleich-Links, Final CTA)
- DevTools → Network: keine 404s
- DevTools → Elements: 4+ JsonLd-Skripte
- Klick auf „Heilmassage ansehen"-Link → `/heilmassage-wien-1080` ✓
- Klick auf „Preise einsehen" → `/preise` ✓
- Klick auf „Termin buchen" → `/buchen` ✓

Browser: `http://localhost:3000/heilmassage-wien-1080`
- Sektionen wie zuvor + jetzt zusätzlich VERGLEICH-Link auf Sportmassage
- KEIN Cost-Note-Block (variant=heilmassage)
- Klick auf „Sportmassage ansehen" → `/sportmassage-wien` ✓

Browser: `http://localhost:3000/preise`
- Funktioniert wie zuvor (kein visueller Wechsel)

Browser: `http://localhost:3000/`
- Pricing-Sektion auf Home unverändert

Footer auf allen Seiten: „Sportmassage Wien"-Link in „Angebot"-Spalte führt nun zu existierender Route ✓

`Ctrl+C` zum Stoppen.

- [ ] **Step 7.3: Sportmassage-Singleton im Studio publishen**

Run: `npm run dev`
Browser: `http://localhost:3000/studio` → „Sportmassage Wien" → falls noch nicht publiziert: Publish.

`Ctrl+C` zum Stoppen.

- [ ] **Step 7.4: Plan 2 ist fertig wenn alle Steps grün sind**

Nächster Schritt: Merge zu `main`, dann Plan 3 (Gutscheine + Stripe).

---

## Risiken & Mitigation

| Risiko | Mitigation |
|---|---|
| TreatmentPage-Refactor bricht Heilmassage visuell | Step 4.4 visueller Vergleich vor Commit; jeder Section-Wrapper byte-equivalent extrahiert |
| Cross-Link-Sektion ist neu auf Heilmassage (UX-Änderung) | Bewusst akzeptiert — symmetrisches Pattern für beide Routen ist langfristig richtig; wenn Domenic die alte Single-Spalten-Ansicht will, lässt sich das durch optionalen Prop steuern |
| Sportmassage-Bilder fehlen | Platzhalter aus Heilmassage-Pool; klar markiert in alt-Texten (TODO: eigenes Foto) |
| `_key`-Migration für Heilmassage-FAQs | Existierende Sanity-Daten haben bereits `_key` (Sanity vergibt automatisch); Default-FAQs explizit mit `default-faq-N`-Keys |
| Hero-Image-Fallback zeigt Heilmassage-Bild auf Sportmassage-Seite | OK als Übergang; alt-Text macht das semantisch korrekt; Domenic ersetzt im Studio |
| `motion-safe:` und `aria-hidden` auf bestehender Heilmassage-Seite sind neu | Bewusst — Plan 1 lessons learned, gilt jetzt symmetrisch für beide Routen |
| `cache()`-Wrapper für `getHeilmassagePage` ist neu | Performance-Verbesserung; keine breaking change |

---

## Self-Review-Notiz

- Spec §5.1 (Schema `sportmassagePage`) → Task 1 ✓
- Spec §5.2 (TreatmentPage extraction) → Task 4 ✓
- Spec §5.3 (Initial-Content-Draft) → Task 1 (Schema initialValues) + Task 5 (page defaults) ✓
- Spec §5.4 (SEO mit JsonLdService variant, FAQPage, BreadcrumbList, Sitemap, Hub-Speiche) → Tasks 5, 6 ✓
- Spec §8.1 (BreadcrumbList JsonLd) → Task 5 (via `<Breadcrumbs>`) ✓
- Spec §8.2 (Per-Behandlung Offer) — nicht Plan-2-Scope (existiert bereits auf /preise via JsonLdOffer)
- Spec §8.3 (Sitemap-Update) → Task 6 ✓

Keine offenen Spec-Anforderungen für Plan 2.
