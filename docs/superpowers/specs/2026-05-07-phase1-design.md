# Phase 1 — Navigation & Kernseiten

**Date:** 2026-05-07
**Status:** Approved (pending user spec review)
**Scope:** PLAN.md Phase 1 (P1.1–P1.4), 4 unabhängige Sub-Features
**Decomposed into:** 4 Implementation Plans (Plan 1–4), umgesetzt in der hier festgelegten Reihenfolge

---

## 1. Kontext & Ziele

Domenic Hackers Praxis (`heilmasseur-domenic.at`, Wien 1080) ist ausgelastet — der Bedarf an mehr Anfragen ist aktuell kein Engpass. Phase 1 priorisiert daher **operative Features mit direktem Geschäftswert**:

- Mehr Nav-Übersicht (`Leistungen`-Dropdown, `Preise`, `Gutscheine` als eigene Top-Level-Items)
- Eigene SEO-fokussierte `/preise`-Seite, die strukturierte Daten für Google liefert und gleichzeitig Block-Karten und Gutscheine sichtbar macht
- Zweite Leistungsseite `/sportmassage-wien`, die Sportmassage als eigene Behandlung positioniert
- E-Commerce-Funktion `/gutscheine` mit Stripe Embedded Checkout, automatischem PDF-Versand, Sanity-basiertem Voucher-Tracking

Phase 2 (SEO-Landingpages) und Phase 3 (Visitenkarten, Domain-Umzug) sind explizit nach hinten verschoben.

## 2. Out of Scope (Phase 1)

- Reviews-Cache-Refresh (P1.5 wurde verworfen — aktuelle 24h-Caching bleibt unverändert)
- Phase 2: SEO-Landingpages (`/massage-1080-wien`, `/mobile-massage-wien`, `/schroepfen-wien`, `/masseur-wien`)
- Phase 3: Visitenkarten, Gutscheinvorlage Print, Domain-Umzug
- Eigene Buchungslösung (Calendly bleibt)
- E-Mail-Marketing-Automatisierung
- Eigene Fotos für Sportmassage (Platzhalter aus Heilmassage bis Domenic liefert)

## 3. Architektur-Überblick

### 3.1 Neue Routen (App Router)

```
app/
  preise/page.tsx                      # P1.2
  sportmassage-wien/page.tsx           # P1.3
  gutscheine/page.tsx                  # P1.4
  gutscheine/danke/page.tsx            # P1.4
  api/
    checkout/route.ts                  # P1.4 — POST Stripe Checkout Session
    stripe-webhook/route.ts            # P1.4 — POST ← Stripe Webhooks
```

### 3.2 Neue Sanity-Schemas

- `pricingPage` (Singleton)
- `sportmassagePage` (Singleton)
- `voucher` (mehrfach, pro Gutschein eins)
- `krankenkasseEntry` (für SEO-1 Krankenkassen-Tabelle, eingebettet in `pricingPage`)

### 3.3 Neue Components

- `BlockCardOverview.tsx` — Block-Karten-Übersicht (`/preise` und `/gutscheine`)
- `KrankenkassenTabelle.tsx` — SEO-Block mit Erstattungsbeträgen
- `Breadcrumbs.tsx` + `BreadcrumbsJsonLd.tsx`
- `VoucherCheckout.tsx` — Stripe Embedded Checkout Wrapper
- `VoucherPDF.tsx` — `@react-pdf/renderer` Komponente
- `JsonLdOffer.tsx` — pro Behandlung × Dauer ein Offer-JsonLd
- `TreatmentPage.tsx` — extrahiert aus `/heilmassage-wien-1080/page.tsx`, Wiederverwendung für Sportmassage
- `PricingTable.tsx` — extrahiert aus `Pricing.tsx`, reine Tabelle ohne Section-Wrapper

### 3.4 Erweiterte Components

- `Navbar.tsx` — `navItems`-Array mit Dropdown-Item, Hover-/Klick-Logik
- `Footer.tsx` — neue Sektion „Angebot" mit Preise/Gutscheine/Heilmassage/Sportmassage Links
- `Pricing.tsx` — wird zu Section-Wrapper über `PricingTable`

### 3.5 Neue Dependencies

| Package | Zweck |
|---|---|
| `stripe` | Server-SDK |
| `@stripe/stripe-js` | Client-SDK Loader |
| `@stripe/react-stripe-js` | React-Wrapper für Embedded Checkout |
| `@react-pdf/renderer` | Server-side PDF-Generation |
| `resend` | E-Mail-Versand |
| `nanoid` | Voucher-Code-Generierung |

### 3.6 Neue Env-Vars

```
# Stripe
STRIPE_SECRET_KEY                  # Server, sk_test_... bzw. sk_live_...
STRIPE_WEBHOOK_SECRET              # Server, whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY  # Client, pk_test_... bzw. pk_live_...

# Stripe Price IDs (alle Server, alle nach setup-stripe-products.ts gesetzt)
STRIPE_PRICE_BLOCK_5_30
STRIPE_PRICE_BLOCK_5_45
STRIPE_PRICE_BLOCK_5_60
STRIPE_PRICE_BLOCK_10_30
STRIPE_PRICE_BLOCK_10_45
STRIPE_PRICE_BLOCK_10_60
STRIPE_PRICE_VOUCHER_CUSTOM       # Custom-Amount-Produkt

# Resend
RESEND_API_KEY                    # Server
EMAIL_FROM                        # Live: "Domenic Hacker <noreply@heilmasseur-domenic.at>" (Domain-Verifikation in Resend nötig)
                                  # Dev: "onboarding@resend.dev" (Resend-Default, ohne Verifikation, max. an verifizierte Adressen)
# Notification-Empfänger Domenic = settings.email aus Sanity (kein eigenes Env-Var)

# App
NEXT_PUBLIC_APP_URL               # https://heilmasseur-domenic.at — für PDF-Booking-URL
```

### 3.7 Datenfluss Gutschein-Kauf (End-to-End)

```
Käufer auf /gutscheine
  → wählt Produkt-Karte (oder kommt mit ?product=block_5_60 von /preise)
  → POST /api/checkout {productType, customAmount?, buyerEmail, buyerName, recipientName?}
       → Server validiert, baut Stripe Checkout Session mit ui_mode='embedded'
       → returnt clientSecret
  → Client mountet <EmbeddedCheckout/> mit clientSecret
  → Käufer zahlt
  → Stripe redirected zu /gutscheine/danke?session_id={CHECKOUT_SESSION_ID}
       (return_url in Session konfiguriert)
  → Parallel: Stripe sendet POST /api/stripe-webhook
       1. Signatur prüfen (STRIPE_WEBHOOK_SECRET)
       2. event.type === 'checkout.session.completed'
       3. Idempotenz-Check: voucher mit stripeSessionId existiert?
       4. productType aus line_items[0].price.id mappen
       5. Voucher-Code generieren (nanoid, Custom-Alphabet, Sanity-Eindeutigkeitsprüfung)
       6. Voucher-Doc in Sanity erstellen (status='paid')
       7. PDF rendern via VoucherPDF
       8. PDF in Sanity Asset-Storage uploaden, URL ins Voucher-Doc patchen
       9. E-Mail an Käufer (Resend) mit PDF-Anhang + Code im Body
       10. Optional: Notification-Mail an Domenic (Empfänger = settings.email)
       11. Webhook returnt 200
       Bei Fehler in 7/8/9: status='paid_pdf_failed' bzw. 'paid_email_failed', return 200, Domenic kriegt Alert-Mail
  → /gutscheine/danke (Server Component) liest session_id
       → Holt Stripe Session → findet Voucher in Sanity (Polling 4× alle 2s falls Webhook noch nicht durch)
       → Zeigt PDF-Download-Link + Erfolgs-Bestätigung
```

---

## 4. Sub-Feature P1.2 — `/preise`

### 4.1 Sanity-Schema `pricingPage` (Singleton)

```ts
{
  name: 'pricingPage',
  type: 'document',
  fields: [
    // SEO
    { name: 'seoTitle', type: 'string', initialValue: 'Preise — Heilmassage & Sportmassage Wien 1080' },
    { name: 'seoDescription', type: 'text', rows: 2,
      initialValue: 'Transparente Preise für Heilmassage und Sportmassage in Wien 1080. Block-Karten ab 5 Behandlungen mit bis zu 12 % Vorteil. Krankenkassen-Rückerstattung.' },

    // Hero
    { name: 'heroBadge', type: 'string', initialValue: 'Transparente Preise' },
    { name: 'heroHeading', type: 'string', initialValue: 'Preise für Heilmassage & Sportmassage' },
    { name: 'heroHeadingAccent', type: 'string', initialValue: 'in Wien 1080' },
    { name: 'heroText', type: 'text', rows: 3 },

    // Tabelle
    { name: 'tableIntro', type: 'text', rows: 2 },
    // pricingItems werden via Query aus bestehenden pricingItem-Dokumenten geholt — nicht referenziert

    // Block-Karten Sektion
    { name: 'blockCardsHeading', type: 'string', initialValue: 'Block-Karten — günstiger ab 5 Behandlungen' },
    { name: 'blockCardsText', type: 'text', rows: 3 },

    // Krankenkassen-Block (SEO-1)
    { name: 'krankenkassenHeading', type: 'string', initialValue: 'Krankenkassen-Rückerstattung' },
    { name: 'krankenkassenIntro', type: 'text', rows: 3 },
    { name: 'krankenkassen', type: 'array', of: [{
      type: 'object',
      fields: [
        { name: 'name', type: 'string' },              // z.B. "ÖGK"
        { name: 'fullName', type: 'string' },          // "Österreichische Gesundheitskasse"
        { name: 'reimbursement', type: 'string' },     // "ca. €15 pro Behandlung (max. 10/Jahr)"
        { name: 'condition', type: 'text', rows: 2 },  // "Ärztliche Überweisung erforderlich"
      ]
    }]},
    { name: 'krankenkassenDisclaimer', type: 'text', rows: 2,
      initialValue: 'Die angegebenen Beträge sind Richtwerte (Stand 2026) und können je nach Tarif und Versicherungsstatus variieren. Bitte direkt bei Ihrer Kasse erfragen.' },

    // Voucher-CTA
    { name: 'voucherCtaHeading', type: 'string', initialValue: 'Gutscheine verschenken' },
    { name: 'voucherCtaText', type: 'text', rows: 2 },

    // FAQ (für FaqJsonLd)
    { name: 'faqs', type: 'array', of: [{
      type: 'object',
      fields: [
        { name: 'question', type: 'string' },
        { name: 'answer', type: 'text', rows: 4 }
      ]
    }]},

    // Closing CTA
    { name: 'ctaHeading', type: 'string' },
    { name: 'ctaText', type: 'text', rows: 2 },
  ]
}
```

### 4.2 Seitenstruktur

1. **Breadcrumbs** — „Startseite › Preise" (mit BreadcrumbList JsonLd)
2. **Hero** — Badge + H1 + Akzent + SEO-Text-Absatz (~150 Wörter, keyword-reich)
3. **Preistabelle** — `<PricingTable/>` mit Daten aus `pricingItem`-Sammlung; jede Zeile hat „Mehr erfahren →"-Link zur jeweiligen Behandlungs-Seite (Hub-Speiche)
4. **Block-Karten-Sektion** — `<BlockCardOverview/>` mit 6 Block-Optionen + Einzelgutschein, jede Karte mit „Kaufen"-Button → `/gutscheine?product=...`
5. **Krankenkassen-Tabelle** — `<KrankenkassenTabelle/>` aus `krankenkassen`-Array, plus Disclaimer
6. **FAQ-Sektion** — 6 Fragen, mit FaqJsonLd
7. **Closing CTA** — „Termin buchen" Button + Sekundär-Link „Gutschein verschenken"

### 4.3 SEO-Maßnahmen

- `metadata` Export mit Title, Description, OpenGraph, Canonical
- `<JsonLdOffer/>` pro Behandlung × Dauer (aus pricingItem-Daten generiert)
- `<JsonLdService/>` mit `@type: 'Service'`, `priceRange`, `areaServed: 'Wien 1080, Josefstadt'`
- `<FaqJsonLd/>` aus pricingPage.faqs
- `<BreadcrumbsJsonLd/>` Standard-Breadcrumbs
- `app/sitemap.ts` um `/preise` erweitern (priority 0.9)
- `app/robots.ts` unverändert (kein neuer Disallow nötig)

**Keyword-Targets:** preise heilmassage wien, massage preise 1080, blockkarten massage wien, gutschein massage wien, krankenkasse heilmassage rückerstattung wien, ögk heilmassage zuschuss

### 4.4 Refactoring `Pricing.tsx`

Extraktion in zwei Dateien:
- `components/PricingTable.tsx` — reine Tabelle, Props: `rows: PricingRow[]`, `withPopularBadge?: boolean`, `linkTreatmentRows?: boolean`
- `components/Pricing.tsx` — Section-Wrapper für Home (importiert `PricingTable`), unverändert von außen

**Risiko:** Bestehende Home-Sektion darf sich visuell nicht ändern. Test-Kriterium: visueller Vergleich vor/nach Refactor mit Browser-DevTools.

### 4.5 Hub-Speiche-Verlinkung (SEO-4)

- Auf `/heilmassage-wien-1080`: neuer „Preise einsehen" CTA-Block oberhalb des bestehenden CTA → `/preise#heilmassage`
- Auf `/sportmassage-wien` analog
- Auf `/preise` in Tabellen-Zeilen: Treatment-Name ist Link auf jeweilige Behandlungs-Seite
- Footer: neue Sektion „Angebot" mit allen Behandlungen + Preise + Gutscheine

---

## 5. Sub-Feature P1.3 — `/sportmassage-wien`

### 5.1 Sanity-Schema `sportmassagePage`

Identische Feldstruktur zu `heilmassagePage` (Hero, ForWhom, Approach, WhatIs, Effects, Location, FAQs, CTA + neue SEO-Felder), nur mit Sportmassage-spezifischen Initial-Values und einem zusätzlichen Feld:

```ts
{ name: 'costNote', title: 'Kostennotiz (Sportmassage = nicht von Krankenkasse erstattet)', type: 'text', rows: 3,
  initialValue: 'Sportmassage zählt in Österreich als Wellness- und Trainingsleistung und wird von gesetzlichen Krankenkassen nicht erstattet. Manche Privatversicherungen mit Wellness-Tarif übernehmen einen Anteil. Heilmassage hingegen kann je nach Kasse teilweise rückerstattet werden — siehe Preise-Seite.' }
```

### 5.2 Komponenten-Refactor

`app/heilmassage-wien-1080/page.tsx` (~300 Zeilen) wird in `<TreatmentPage/>` extrahiert. Beide Routen werden zu Wrappers:

```tsx
// app/heilmassage-wien-1080/page.tsx
export default async function Page() {
  const data = await sanityClient.fetch(HEILMASSAGE_QUERY);
  return <TreatmentPage data={data} variant="heilmassage" />;
}

// app/sportmassage-wien/page.tsx
export default async function Page() {
  const data = await sanityClient.fetch(SPORTMASSAGE_QUERY);
  return <TreatmentPage data={data} variant="sportmassage" />;
}
```

**variant-Prop** steuert nur:
- ob `costNote` gerendert wird (nur bei `sportmassage`)
- welcher JsonLdService-Body gerendert wird (Service-Name, Description)
- Breadcrumb-Label

### 5.3 Initial-Content-Draft (deutsch, von Claude geschrieben — Pre-Live durch Legal-Review)

> **Wichtig:** Der folgende Draft wird im Plan 2 als `initialValue` ins Schema gegeben oder via Migration-Script als Singleton geschrieben. **Vor Live-Schaltung läuft Legal Compliance Review** (siehe §9.2). Domenic kann jederzeit im Studio ändern.

#### Hero
- **heroBadge:** "Wien 1080 · Josefstadt"
- **heroHeading:** "Sportmassage in 1080 Wien"
- **heroSubtitle:** "für Regeneration, Beweglichkeit und nachhaltige Leistung"
- **heroImage:** Platzhalter aus heilmassagePage (TODO: eigenes Foto)

#### Für wen
- **forWhomHeading:** "Für wen ist das?"
- **forWhomDescription:** "Egal ob ambitioniert im Verein, regelmäßig im Fitnessstudio oder ein paar Mal pro Woche laufend — wenn Ihr Körper nach Belastung Erholung braucht oder Verspannungen das nächste Training ausbremsen, ist Sportmassage ein gezielter Hebel."
- **conditions** (Tags): ["Verspannungen nach Training", "Muskelkater-Vorbeugung", "Triggerpunkte", "Faszienverklebungen", "Ermüdungssymptome", "Vor Wettkampf", "Nach Wettkampf", "Steifheit nach langen Läufen"]

#### Mein Schwerpunkt
- **approachHeading:** "Mein Schwerpunkt"
- **approachDescription:** "Ich arbeite tief, aber kontrolliert — mit besonderem Fokus auf Triggerpunkte und Faszien. Dort, wo das Gewebe sich nach hoher Belastung verklebt oder nicht mehr richtig gleitet, setze ich gezielt an."
- **approachPoints:** ["Triggerpunkt-Arbeit an muskulären Schmerzpunkten", "Faszien-Mobilisation und Geweblosung", "Tiefe Querfriktion bei chronischen Verspannungen", "Stretching-Elemente zur Bewegungsverbesserung"]
- **approachBottomText:** "Wie viel Druck Sie brauchen, hängt von Ihnen, Ihrem Trainingsstand und Ihrer Tagesform ab. Ich passe das an Ihr Feedback an — Sportmassage ist nicht zwangsläufig eine schmerzhafte Massage, auch wenn das Klischee anders sagt."

#### Was ist Sportmassage
- **whatIsHeading:** "Was ist Sportmassage?"
- **whatIsParagraphs:**
  - "Sportmassage ist eine spezialisierte Form der Massage, die auf die Bedürfnisse von Menschen mit regelmäßiger körperlicher Belastung zugeschnitten ist. Sie kombiniert Elemente der klassischen Massage mit gezielten Techniken zur muskulären Regeneration und Beweglichkeitsförderung."
  - "Im Unterschied zur Heilmassage, die häufig bei Beschwerden mit medizinischem Hintergrund eingesetzt wird, dient Sportmassage primär der Regeneration, Verletzungs-Vorbeugung und Leistungserhaltung. Sie ist ein Wellness- und Trainings-Begleitservice, kein medizinisches Verfahren."
  - "Wann eingesetzt? Pre-Workout zur Aktivierung, Post-Workout zur Regeneration, in Trainingspausen zur Wartung, vor Wettkämpfen zur Lockerung, nach Wettkämpfen zur Erholung."

#### Wirkung
- **effectsHeading:** "Was Sportmassage bewirken kann"
- **effectsDescription:** "Regelmäßig eingesetzt unterstützt Sportmassage Ihren Körper dabei, Belastung besser wegzustecken und schneller einsatzfähig zu sein."
- **effects** (Karten):
  - { title: "Schnellere Regeneration", description: "Verbesserte Durchblutung kann den Abtransport von Stoffwechselprodukten und die Versorgung der Muskulatur unterstützen." }
  - { title: "Verbesserte Beweglichkeit", description: "Gezielte Faszienarbeit und Triggerpunkt-Lösung können Bewegungseinschränkungen reduzieren." }
  - { title: "Verletzungs-Vorbeugung", description: "Geschmeidige, gut versorgte Muskulatur ist weniger anfällig für Zerrungen und Überlastungen." }
  - { title: "Bessere Körperwahrnehmung", description: "Wer regelmäßig massiert wird, spürt früher, wo der Körper Beachtung braucht." }
  - { title: "Tiefere Erholung", description: "Auch das vegetative Nervensystem profitiert: Ruhepuls, Schlafqualität, mentale Erholung." }
  - { title: "Trainingsfähigkeit erhalten", description: "Wenn die Muskulatur immer wieder zur Ruhe kommt, fällt das Trainingsvolumen leichter." }

#### Standort
- **locationHeading:** "Sportmassage Wien 1080 — Josefstadt"
- **locationDescription:** "Die Praxis liegt im 8. Bezirk, gut erreichbar mit U2 (Rathaus) und mehreren Straßenbahnlinien. Für viele Hobby-Sportler:innen aus Wien Mitte-West eine kurze Anfahrt."
- **transportInfo:** [
  { label: "U-Bahn", value: "U2 — Station Rathaus" },
  { label: "Straßenbahn", value: "Linien 5, 33, 43, 44" },
  { label: "Auto", value: "Kurzparkzonen rund um die Praxis" },
]

#### FAQs (5–6 sportspezifisch)
- "Wie oft sollte ich Sportmassage in Anspruch nehmen?"
  → "Das hängt von Ihrem Trainingsvolumen ab. Hobby-Sportler:innen mit 3–4 Trainings/Woche profitieren oft von einer Sportmassage alle 2–3 Wochen. Bei intensiven Trainingsphasen kann häufiger sinnvoll sein, in Ruhephasen seltener. Wir können das gerne in der ersten Behandlung gemeinsam einschätzen."
- "Vor oder nach dem Wettkampf — was bringt mehr?"
  → "Beides hat einen Platz: Pre-Wettkampf 2–3 Tage vorher zur Lockerung, ohne dass tief gearbeitet wird. Post-Wettkampf am besten 24–48 Stunden danach, dann ist das Gewebe schon wieder belastbarer für tiefere Techniken."
- "Was unterscheidet Sportmassage von Heilmassage?"
  → "Heilmassage wird häufig bei Beschwerden mit medizinischem Hintergrund eingesetzt und ist je nach Kasse teilweise erstattbar. Sportmassage ist eine Wellness- und Trainings-Leistung, fokussiert auf Regeneration und Leistungserhaltung — nicht erstattbar, aber je nach Bedarf der passendere Ansatz."
- "Hilft Sportmassage gegen Muskelkater?"
  → "Erfahrungsgemäß empfinden viele Menschen die Behandlung 24–48 Stunden nach intensiver Belastung als wohltuend. Wissenschaftlich ist die Evidenz für direkte Muskelkater-Reduktion gemischt — was bleibt, ist subjektives Wohlbefinden, verbesserte Beweglichkeit und ein Gefühl von Erholung."
- "Auch ohne Sportverletzung?"
  → "Definitiv. Sportmassage ist primär präventiv und regenerativ gedacht, nicht therapeutisch. Wer regelmäßig sportlich aktiv ist, profitiert davon, ohne Beschwerden zu haben."
- "Ist Sportmassage immer schmerzhaft?"
  → "Nein. Tiefer Druck heißt nicht automatisch Schmerz — der richtige Druck am richtigen Ort fühlt sich oft 'gut intensiv' an, nicht quälend. Wir sprechen während der Behandlung über das richtige Maß für Sie."

#### CTA
- **ctaHeading:** "Bereit für die nächste Behandlung?"
- **ctaText:** "Termin direkt online buchen — oder melden Sie sich, wenn Sie vorher Fragen haben."

### 5.4 SEO

- `metadata`: Title „Sportmassage Wien 1080 · Regeneration & Performance | Heilmasseur Domenic Hacker"
- Description-Keywords: sportmassage, regeneration, triggerpunkt, faszien, leistungssteigerung, wien, 1080, josefstadt
- `<JsonLdService/>` mit `@type: 'Service'`, name: 'Sportmassage', priceRange aus 30/45/60-Min-Preisen
- `<FaqJsonLd/>`
- `<BreadcrumbsJsonLd/>`
- `app/sitemap.ts` um `/sportmassage-wien` erweitern (priority 0.9)
- Hub-Speiche: Link zu `/preise` und `/heilmassage-wien-1080` als „Vergleich"

**Keyword-Targets:** sportmassage wien, sportmassage 1080, triggerpunkt massage wien, faszienmassage wien, regeneration massage wien, sportmassage josefstadt

---

## 6. Sub-Feature P1.4 — `/gutscheine` + Stripe

### 6.1 Stripe-Setup

#### 7 Stripe-Produkte

| Produkt-Name | Stripe-Type | Preis | Env-Var |
|---|---|---|---|
| 5er-Block 30 Min | one_time | €259 | `STRIPE_PRICE_BLOCK_5_30` |
| 5er-Block 45 Min | one_time | €329 | `STRIPE_PRICE_BLOCK_5_45` |
| 5er-Block 60 Min | one_time | €399 | `STRIPE_PRICE_BLOCK_5_60` |
| 10er-Block 30 Min | one_time | €489 | `STRIPE_PRICE_BLOCK_10_30` |
| 10er-Block 45 Min | one_time | €619 | `STRIPE_PRICE_BLOCK_10_45` |
| 10er-Block 60 Min | one_time | €749 | `STRIPE_PRICE_BLOCK_10_60` |
| Einzelgutschein (Custom) | custom_unit_amount | min €30, max €500 | `STRIPE_PRICE_VOUCHER_CUSTOM` |

#### Setup-Script `scripts/setup-stripe-products.ts`

Idempotentes Node-Script (TypeScript, ausführbar via `ts-node` oder als build-step):
- Liest `STRIPE_SECRET_KEY` aus Env
- Erstellt/aktualisiert die 7 Produkte mit klar definierten `metadata.product_key` (z.B. `block_5_60`)
- Erstellt zugehörige Prices
- Logged die Stripe Price IDs zum Eintragen in `.env.local`
- Sicher mehrfach ausführbar — sucht erst nach existierenden Produkten via `metadata.product_key`

#### Onboarding-Guide für Domenic

Eigene Datei `docs/setup/stripe-onboarding-domenic.md`:
1. Account anlegen unter `https://dashboard.stripe.com/register`
   - Geschäftstyp: Einzelunternehmer
   - Bankverbindung hinterlegen
   - Steuer-ID eintragen
2. Verifizierung starten (Ausweis-Upload, IBAN-Bestätigung) — dauert 1–3 Werktage
3. Josef Haras (`josef.haras@hamstr.me`) einladen unter `Settings → Team → Invite member` mit Rolle „Administrator"
4. Test-Mode (oben links Toggle) ist sofort nutzbar — Live-Mode erst nach Verifizierung
5. Zahlungsmethoden aktivieren: Karten, SEPA-Lastschrift, Apple Pay, Google Pay (alle empfohlen)
6. Stripe-Receipts deaktivieren (`Settings → Emails → Successful payments`) — wir senden eigene Mails

### 6.2 Sanity-Schema `voucher`

```ts
{
  name: 'voucher',
  type: 'document',
  fields: [
    { name: 'code', type: 'string', validation: r => r.required(),
      description: 'GS-XXXX-XXXX, eindeutig' },
    { name: 'stripeSessionId', type: 'string', validation: r => r.required() },
    { name: 'stripePaymentIntentId', type: 'string' },

    { name: 'productType', type: 'string', options: { list: [
      'block_5_30', 'block_5_45', 'block_5_60',
      'block_10_30', 'block_10_45', 'block_10_60',
      'custom'
    ]}},

    // Bei Block: Sessions; bei Custom: Amount
    { name: 'sessionsTotal', type: 'number', description: 'Bei Block: 5 oder 10. Bei Custom: null' },
    { name: 'sessionsRemaining', type: 'number' },
    { name: 'durationMin', type: 'number', description: '30, 45 oder 60. Nur bei Block.' },
    { name: 'customAmount', type: 'number', description: '€-Betrag bei Custom-Voucher' },
    { name: 'customAmountRemaining', type: 'number' },

    { name: 'buyerEmail', type: 'string', validation: r => r.required().email() },
    { name: 'buyerName', type: 'string' },
    { name: 'recipientName', type: 'string', description: 'Optional, für PDF-Personalisierung' },

    { name: 'status', type: 'string', options: { list: [
      'paid', 'partially_redeemed', 'fully_redeemed', 'expired', 'cancelled',
      'paid_pdf_failed', 'paid_email_failed'
    ]}, initialValue: 'paid' },

    { name: 'redemptions', type: 'array', of: [{
      type: 'object',
      fields: [
        { name: 'date', type: 'datetime' },
        { name: 'sessionsRedeemed', type: 'number' },
        { name: 'amountRedeemed', type: 'number' },
        { name: 'note', type: 'string' },
      ]
    }]},

    { name: 'purchasedAt', type: 'datetime', validation: r => r.required() },
    { name: 'expiresAt', type: 'datetime', validation: r => r.required(),
      description: '3 Jahre nach purchasedAt' },

    { name: 'pdfAsset', type: 'file', description: 'Generiertes Gutschein-PDF' },
  ],
  // Custom Studio Actions: "1 Behandlung einlösen" (Block) bzw. "Betrag einlösen" (Custom)
  // Implementation: sanity.config.ts → document.actions Hook
}
```

### 6.3 Voucher-Code-Generierung

```ts
// lib/voucher/generateCode.ts
import { customAlphabet } from 'nanoid';

const alphabet = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ'; // ohne 0/O/1/I/L
const nanoid = customAlphabet(alphabet, 4);

export async function generateUniqueVoucherCode(client: SanityClient): Promise<string> {
  for (let attempt = 0; attempt < 5; attempt++) {
    const code = `GS-${nanoid()}-${nanoid()}`;
    const existing = await client.fetch(`*[_type=="voucher" && code==$code][0]._id`, { code });
    if (!existing) return code;
  }
  throw new Error('Could not generate unique voucher code after 5 attempts');
}
```

### 6.4 API-Routen

#### `app/api/checkout/route.ts` (POST)

```ts
// Input (validiert via zod):
{
  productType: 'block_5_30' | ... | 'block_10_60' | 'custom',
  customAmount?: number,  // Cent, only if productType==='custom', 3000–50000
  buyerEmail: string,
  buyerName: string,
  recipientName?: string
}

// Output:
{ clientSecret: string }

// Logic:
// 1. zod-Validation
// 2. Stripe Price-ID aus Env via productType
// 3. stripe.checkout.sessions.create({
//      mode: 'payment',
//      ui_mode: 'embedded',
//      line_items: [{ price, quantity: 1 } | für custom: price_data inline],
//      return_url: `${APP_URL}/gutscheine/danke?session_id={CHECKOUT_SESSION_ID}`,
//      customer_email: buyerEmail,
//      metadata: { productType, buyerName, recipientName }
//    })
// 4. return clientSecret
```

#### `app/api/stripe-webhook/route.ts` (POST)

```ts
// 1. Body raw lesen + Stripe-Signature-Header → stripe.webhooks.constructEvent
// 2. event.type !== 'checkout.session.completed' → 200 (ignored)
// 3. const sessionId = event.data.object.id
//    Idempotenz: existing = await sanity.fetch(`*[_type=="voucher" && stripeSessionId==$sessionId][0]`)
//    if (existing) return 200
// 4. session = stripe.checkout.sessions.retrieve(sessionId, { expand: ['line_items.data.price'] })
// 5. productType = session.metadata.productType
// 6. value berechnen:
//    block_X_Y → sessionsTotal=X, durationMin=Y, customAmount=null
//    custom    → customAmount = session.amount_total / 100, sessionsTotal=null
// 7. code = await generateUniqueVoucherCode(sanity)
// 8. Voucher-Doc in Sanity erstellen (status='paid')
// 9. PDF rendern: const pdfBuffer = await renderToBuffer(<VoucherPDF voucher={...}/>)
// 10. PDF-Upload zu Sanity Asset Storage → asset-Reference ins Voucher-Doc
// 11. Resend: resend.emails.send({ from, to: buyerEmail, attachments: [{ content: pdfBuffer.toString('base64'), filename: 'gutschein.pdf' }] })
//     Template: Begrüßung + Code + PDF im Anhang + Hinweis Buchungs-URL
// 12. Notification an Domenic: kurze Mail "Gutschein verkauft: code, Betrag, Käufer"
// 13. return 200

// Error-Pfade:
//   PDF-Fehler → status='paid_pdf_failed', Domenic-Alert, return 200
//   Email-Fehler → status='paid_email_failed', Domenic-Alert, return 200
//   Sanity-Fehler in Schritt 8 → return 500 (Stripe retried)
```

### 6.5 PDF-Komponente

`components/VoucherPDF.tsx` mit `@react-pdf/renderer`:

```tsx
import { Document, Page, Text, View, Image, StyleSheet } from '@react-pdf/renderer';

// Layout (A4 Hochformat):
// - Logo oben (settings.logo)
// - Großer Titel "Gutschein"
// - Wert-Display:
//   - Block: "5 × 60-Minuten-Behandlung"
//   - Custom: "€100"
// - Wert-Hinweis: "(Wert: €399)" bei Block
// - Code in Mono-Schrift, sehr groß, gut lesbar: GS-7K2P-9XQ4
// - Empfänger-Zeile (falls recipientName gesetzt): "Für Maria"
// - Footer mit Kontakt + Buchungs-URL
// - Gültigkeits-Hinweis: "Gültig bis 7. Mai 2029"
// - AGB-Klein gedruckt unten

// Farben aus website-CSS:
// - Primary: #0d4f4f
// - Accent: #e8654a
// - Gold: #f2a93b
// - Text: #111
```

### 6.6 Frontend `/gutscheine`

#### Seitenstruktur:

1. **Breadcrumbs** — „Startseite › Gutscheine"
2. **Hero** — Badge + H1 „Gutscheine für Heilmassage & Sportmassage" + SEO-Text
3. **Produkt-Auswahl** — `<BlockCardOverview/>` (gleiche Komponente wie auf `/preise`, aber im Selection-Mode); zusätzlich Einzelgutschein-Karte mit Custom-Amount-Slider/Input
4. **Käufer-Form** — E-Mail (Pflicht), Käufer-Name, Empfänger-Name (optional)
5. **Stripe Embedded Checkout** — `<EmbeddedCheckoutProvider>` mit dynamisch geholtem clientSecret
6. **AGB-Hinweis** — „Mit Klick auf Bezahlen bestätigen Sie unsere AGB. Hinweis Fernabsatzrecht: …"
7. **FAQ** — „Wie lange ist der Gutschein gültig?", „Kann ich personalisieren?", „Bekomme ich eine Rechnung?", „Was wenn der Code verloren geht?"

#### State-Management:
- Lokaler React-State für Produkt-Selection + Käufer-Daten
- Bei „Weiter zur Zahlung" → POST `/api/checkout` → setze clientSecret → mounte EmbeddedCheckout

#### `?product=`-Pre-Selection:
- `useSearchParams` → wenn `product=block_5_60`: vorausgewählt, Käufer-Form direkt sichtbar
- Wenn `product=custom`: Custom-Voucher vorausgewählt, Custom-Amount-Input fokussiert

### 6.7 Thank-You-Page `app/gutscheine/danke/page.tsx`

Server Component:

```tsx
export default async function DankePage({ searchParams }) {
  const sessionId = searchParams.session_id;
  if (!sessionId) redirect('/gutscheine');

  // Polling-Strategie wegen Webhook-Race (4 Versuche × 2s = max. 8s Wartezeit)
  let voucher = null;
  for (let i = 0; i < 4; i++) {
    voucher = await sanity.fetch(`*[_type=="voucher" && stripeSessionId==$id][0]`, { id: sessionId });
    if (voucher) break;
    await sleep(2000);
  }

  // Render: Erfolg + Code + PDF-Download (wenn voucher.pdfAsset)
  // Bei !voucher: "Wird verarbeitet — PDF kommt per E-Mail"
}
```

### 6.8 Sanity Studio Custom Actions (Einlösung)

In `sanity.config.ts`:

```ts
document: {
  actions: (prev, { schemaType }) => {
    if (schemaType !== 'voucher') return prev;
    return [...prev, RedeemBlockAction, RedeemCustomAmountAction];
  }
}
```

**RedeemBlockAction:** Dialog „1 Behandlung einlösen", öffnet Modal mit optionaler Notiz, patcht `redemptions[]`, dekrementiert `sessionsRemaining`, setzt `status` auf `partially_redeemed` oder `fully_redeemed`.

**RedeemCustomAmountAction:** Analog mit Betrag-Input, dekrementiert `customAmountRemaining`.

---

## 7. Sub-Feature P1.1 — Navbar-Erweiterung

### 7.1 Neue Struktur

```
Logo  [Startseite] [Leistungen ▾] [Preise] [Gutscheine] [Über mich]   [Termin buchen]
                       ├─ Heilmassage → /heilmassage-wien-1080
                       └─ Sportmassage → /sportmassage-wien
```

### 7.2 Komponenten-Anpassung `Navbar.tsx`

Bestehender `navLinks`-Array wird zu typisiertem `navItems`:

```ts
type NavItem =
  | { kind: 'link'; label: string; href: string }
  | { kind: 'dropdown'; label: string; items: { label: string; href: string }[] };

const navItems: NavItem[] = [
  { kind: 'link', label: 'Startseite', href: '/' },
  { kind: 'dropdown', label: 'Leistungen', items: [
    { label: 'Heilmassage', href: '/heilmassage-wien-1080' },
    { label: 'Sportmassage', href: '/sportmassage-wien' },
  ]},
  { kind: 'link', label: 'Preise', href: '/preise' },
  { kind: 'link', label: 'Gutscheine', href: '/gutscheine' },
  { kind: 'link', label: 'Über mich', href: '/ueber-mich' },
];
```

### 7.3 UX

**Desktop:**
- Hover über „Leistungen" → Dropdown öffnet
- 200ms `setTimeout`-Delay vorm Schließen, damit Maus auf Submenu wandern kann
- Klick auf „Leistungen" toggelt (Tastatur-Support)
- „Leistungen" selbst nicht klickbar (kein href, reiner Toggle)
- Active-State: leuchtet, wenn `pathname` einer der Sub-Routen
- Aria: `aria-expanded`, `aria-haspopup="menu"`, Submenu mit `role="menu"`, Items `role="menuitem"`

**Mobile:**
- Hamburger-Overlay erweitert
- „Leistungen" als Akkordeon: tap → expandiert in der Liste
- ChevronDown rotiert bei Open (lucide-react `ChevronDown`, transform via tailwind transition)

**Click-outside / ESC:** beide schließen Dropdown.

### 7.4 Footer-Anpassung

Footer bekommt parallele Sektion „Angebot":
- Heilmassage Wien
- Sportmassage Wien
- Preise
- Gutscheine

Verstärkt Hub-Speiche-SEO.

---

## 8. SEO-übergreifend

### 8.1 BreadcrumbList JsonLd

`<BreadcrumbsJsonLd/>`-Komponente wird auf allen 3 neuen Seiten + auf `/heilmassage-wien-1080` (nachträglich) eingebaut. Generiert `@type: 'BreadcrumbList'` mit `itemListElement[]`.

### 8.2 Per-Behandlung Offer JsonLd

`<JsonLdOffer/>`-Komponente nimmt `pricingItem`-Daten, generiert pro Behandlung × Dauer ein `Offer`-Objekt:

```json
{
  "@context": "https://schema.org",
  "@type": "Offer",
  "name": "Heilmassage 60 Minuten",
  "description": "60-minütige Heilmassage in Wien 1080",
  "price": "85.00",
  "priceCurrency": "EUR",
  "availability": "InStock",
  "areaServed": "Wien 1080",
  "seller": { "@type": "LocalBusiness", "name": "Heilmasseur Domenic Hacker" }
}
```

Alle Offers in einem `OfferCatalog` gewrappt.

### 8.3 Sitemap-Update

`app/sitemap.ts` ergänzt um:
- `/preise` (priority 0.9, changefreq monthly)
- `/sportmassage-wien` (priority 0.9, changefreq monthly)
- `/gutscheine` (priority 0.8, changefreq monthly)

`/gutscheine/danke` bewusst nicht (Thank-You-Pages werden nicht indexiert).

### 8.4 Robots-Update

`app/robots.ts`: zusätzlich `/gutscheine/danke` und `/api/*` Disallow.

---

## 9. Cross-cutting

### 9.1 Testing-Strategie (manuell + browserbasiert)

- **Lokale Smoke-Tests** pro Sub-Feature mit `npm run dev`
- **Stripe-Test-Mode** mit Karten:
  - Erfolg: `4242 4242 4242 4242`
  - Decline: `4000 0000 0000 0002`
  - 3D-Secure: `4000 0027 6000 3184`
- **Webhook-Test lokal** via `stripe listen --forward-to localhost:3000/api/stripe-webhook`
- **PDF-Visual-Check** über Thank-You-Page nach jedem Test-Kauf
- **E-Mail-Test** über Resend (Versand an `josef.haras@hamstr.me`)
- **Sanity-Voucher-Persistierung** im Studio prüfen
- **Mobile-Responsive-Check** für Navbar-Akkordeon
- **Idempotenz-Test:** Webhook 2× hintereinander triggern → nur 1 Voucher
- **Visueller Vergleich** Home-Pricing-Sektion vor/nach `Pricing.tsx`-Refactor

### 9.2 Legal Compliance Review (verpflichtender Pre-Live-Schritt)

**Auftrag an Sub-Agent (research-fokussiert, mit WebSearch):**

Reviewt vor Go-Live von P1.4 (Gutscheine) alle gerenderten Texte auf folgenden Routen:
- `/preise` (Hero-Text, Krankenkassen-Beträge, FAQ, Disclaimer)
- `/sportmassage-wien` (kompletter Content-Draft aus §5.3)
- `/gutscheine` (Hero, AGB-Hinweise, FAQs)
- E-Mail-Texte (Käufer-Bestätigung, Domenic-Notification)
- PDF-Inhalte (AGB-Klein, Gültigkeitshinweis)

**Prüf-Kriterien:**

1. **Heilversprechen-Verbot (§ 50 GewO, ABGB)** — keine Aussagen wie „heilt", „beseitigt", „kuriert"; nur „kann lindern", „unterstützt", „trägt bei zu". Insbesondere bei Heilmassage-Kontext.
2. **UWG (§ 2) — Irreführungsverbot** — keine unbelegten Wirkversprechen. Effekt-Karten in §5.3 prüfen: alle Aussagen mit „kann" oder „unterstützt" formuliert?
3. **Heilmasseur-Berufsbild (§ 84 ff MMHmG)** — Abgrenzung zu Physiotherapie/Arzt klar; Sportmassage explizit als Wellness/Trainingsleistung deklariert (siehe `costNote` und `whatIsParagraphs[1]`).
4. **Vergleichende Werbung** — keine missverständlichen Vergleiche zu Physiotherapie, Osteopathie, Chiropraktik.
5. **Krankenkassen-Daten-Aktualität** — Beträge & Bedingungen pro Kasse (ÖGK, BVAEB, SVS, KFA) auf 2026-Stand geprüft. **Quellen verlinken im Findings-Report.**
6. **Gutschein-AGB / Verbraucherrecht** — 3-Jahres-Befristung argumentativ haltbar (gängige Praxis in DE/AT, gerichtsfest unter ABGB §§ 1478, 1486a). Widerruf-Recht (§§ 11 ff FAGG) — Hinweis nötig: digitales Produkt, Widerruf erlischt bei Lieferung des PDFs.
7. **DSGVO bei Voucher-PDF** — gespeicherte Käufer-Daten (Mail, Name, optional Empfänger-Name) in Sanity → muss in Datenschutzerklärung erwähnt werden, mit Rechtsgrundlage Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung).

**Output:** `docs/superpowers/specs/legal-review-phase1.md` mit Findings im Format „Section X, Aussage Y, Empfehlung Z, Quelle". Findings werden adjustiert, dann freigegeben.

### 9.3 Error-Handling-Matrix

| Szenario | Verhalten |
|---|---|
| Stripe-Checkout-Init fehlschlägt | Toast „Zahlung konnte nicht gestartet werden" + Console-Log |
| Webhook-Signatur ungültig | 400, Log, kein Voucher |
| Sanity-Schreib-Fehler im Webhook | 500 (Stripe retried via Idempotenz) |
| PDF-Generation schlägt fehl | Voucher status `paid_pdf_failed`, Webhook returnt 200, Domenic-Alert |
| Resend-Mail-Versand schlägt fehl | Voucher status `paid_email_failed`, Domenic-Alert, PDF auf Thank-You verfügbar |
| Thank-You ohne `session_id` | Redirect `/gutscheine` |
| Voucher-Code-Kollision | 5 Retries, dann 500 + Alert |
| Stripe Live-Mode bei nicht-verifiziertem Account | Pre-Live-Check via Stripe-Dashboard-Status |

---

## 10. Implementation-Reihenfolge & Sub-Agent-Strategie

### Plan 1 — `/preise` (am simpelsten, etabliert das Pattern)

- Sanity-Schema `pricingPage` + Krankenkassen-Subschema, in `sanity/schemas/index.ts` registrieren
- Komponenten: `<PricingTable/>` (extrahiert), `<BlockCardOverview/>`, `<KrankenkassenTabelle/>`, `<Breadcrumbs/>`, `<BreadcrumbsJsonLd/>`, `<JsonLdOffer/>`
- Refactor `Pricing.tsx` zum Section-Wrapper
- Route `app/preise/page.tsx` mit Sanity-Query + `metadata`-Export
- Sitemap/Footer-Update
- Hub-Verlinkung von `/heilmassage-wien-1080` (kleiner Edit dort)
- Smoke-Test, Visual-Check Home

### Plan 2 — `/sportmassage-wien` (Pattern-Wiederholung)

- Schema `sportmassagePage`, Index-Registrierung
- Komponente `<TreatmentPage/>` extrahiert aus bestehendem `/heilmassage-wien-1080/page.tsx`
- Refactor: `/heilmassage-wien-1080/page.tsx` nutzt jetzt `<TreatmentPage/>` mit `heilmassagePage`-Daten — visuell unverändert
- Migration-Script `scripts/seed-sportmassage-page.ts` schreibt Initial-Content (Draft aus §5.3) ins Singleton
- Neue Route `app/sportmassage-wien/page.tsx`
- `<JsonLdService/>` erweitert (oder Variante)
- Sitemap-Update, Hub-Speiche-Links
- Smoke-Test, beide Routen visuell vergleichen

### Plan 3 — `/gutscheine` + Stripe (größter Brocken — Sub-Agent-Schwarm)

**Sub-Agent A (Sanity-Schema):**
- `voucher`-Schema + Studio-Custom-Actions (RedeemBlock, RedeemCustomAmount)
- Index-Registrierung
- Studio-Test: Manuelles Anlegen + Einlösen funktioniert

**Sub-Agent B (Stripe-Setup):**
- `scripts/setup-stripe-products.ts` (idempotent, mit Logging)
- `docs/setup/stripe-onboarding-domenic.md`
- Produkt-Erstellung im Test-Mode verifizieren
- Liste der Test-Price-IDs in `.env.local.example` schreiben

**Sub-Agent C (API-Routen):**
- `lib/voucher/generateCode.ts`, `lib/stripe/client.ts`, `lib/email/resend.ts`
- `app/api/checkout/route.ts` mit zod-Validation
- `app/api/stripe-webhook/route.ts` mit allen Error-Pfaden
- Idempotenz-Logik
- Webhook-Test via `stripe listen`

**Sub-Agent D (PDF & E-Mail):**
- `components/VoucherPDF.tsx` mit `@react-pdf/renderer`
- `lib/email/templates/voucher-confirmation.tsx`
- `lib/email/templates/domenic-notification.tsx`
- Test: PDF-Render mit Mock-Voucher → visuelle Prüfung; Mail-Versand via Resend Sandbox

**Sub-Agent E (Frontend):**
- `app/gutscheine/page.tsx` mit Produkt-Auswahl + `<VoucherCheckout/>`
- `app/gutscheine/danke/page.tsx` mit Polling-Logik
- `<BlockCardOverview/>` (selection-mode)
- AGB-/FAQ-Sektion
- Mobile-Check

**Final:**
- End-to-End-Test mit Stripe-CLI (Test-Karte → Webhook → Sanity → Mail → Thank-You)
- **Legal Compliance Review Sub-Agent läuft (siehe §9.2)**
- Findings adjustiert → freigegeben

### Plan 4 — Navbar-Dropdown (klein, abschließend)

- Erweiterung `Navbar.tsx` (navItems-Refactor, Dropdown-Logic)
- Footer-Sektion „Angebot"
- Smoke-Test über alle Routen + Mobile-Akkordeon
- Final-Check: alle internen Links funktionieren

### Übergreifend

- Pro Plan ein Branch oder Worktree (Empfehlung Worktree für Isolation)
- Nach jedem Plan: lokaler Smoke-Test + Commit
- Nach allen 4 Plans: Smoke-Test über alle neuen Pfade, dann Production-Deploy

---

## 11. Onboarding-Tasks (parallel zur Implementierung)

### Für Domenic (per E-Mail von Josef)

- Bestätigung Phase 1 Scope, Phase 2/3 vertagt
- Sportmassage-Briefing-Anfragen: typische Sportarten, Spezial-Techniken, vorhandene Fotos
- Stripe-Account anlegen (`https://dashboard.stripe.com/register`), Josef einladen mit Admin-Rolle
- Krankenkassen-Beträge (ÖGK / BVAEB / SVS / KFA) bestätigen oder aktuell recherchieren
- Optional: Sportmassage-Initialfoto bereitstellen (sonst Platzhalter)

### Für Josef (parallel)

- Eigenes Stripe-Test-Konto (kein KYC nötig)
- Resend-Account + API-Key
- Stripe CLI lokal installieren
- `.env.local` GOOGLE_PLACES_API_KEY-Whitespace-Bug fixen (kosmetisch)

---

## 12. Risiken & offene Punkte

| Risiko | Mitigation |
|---|---|
| Krankenkassen-Beträge veraltet | Dynamic via Sanity, Disclaimer „Stand 2026, Richtwerte" |
| Stripe-Account-Verifizierung dauert | Test-Mode-Entwicklung mit Josefs Konto, Swap kurz vor Live |
| Sportmassage-Texte unpräzise/heikel | Legal Compliance Review als Pre-Live-Gate |
| Webhook-Race auf Thank-You-Page | Polling 4× alle 2s, dann Fallback-UI |
| Voucher-PDF-Anhang zu groß für Mail | `@react-pdf/renderer` produziert kompakte PDFs (~50–100 KB), Resend-Limit 40 MB — unproblematisch |
| Mehrere offene Tabs / Doppel-Klicks | Stripe verhindert Mehrfachzahlung via idempotency_key + Webhook-Idempotenz |
| Refactor Pricing.tsx bricht Home-Sektion | Visueller Vergleich vor/nach in Plan 1 verpflichtend |
| Custom Studio Actions noch nie genutzt | Sanity Docs für v5 lesen, Pattern-Beispiel aus Sanity-Repo nehmen |

---

## 13. Erfolgskriterien

Phase 1 gilt als „done", wenn:

- [ ] `/preise` live, Sanity-editierbar, alle SEO-Marker (JsonLd, Breadcrumbs, Sitemap) ausgespielt
- [ ] `/sportmassage-wien` live, Initial-Content geschrieben, Legal-Review approved
- [ ] `/gutscheine` live, Stripe live-mode, mindestens 1 erfolgreicher Test-Kauf mit echter Karte
- [ ] Webhook persistiert Voucher in Sanity, PDF wird generiert + per Mail versandt
- [ ] Domenic kann im Studio Voucher einsehen, einlösen
- [ ] Navbar zeigt Dropdown auf Desktop, Akkordeon auf Mobile
- [ ] Footer hat „Angebot"-Sektion
- [ ] Sitemap aktualisiert, Robots stimmen
- [ ] Legal Compliance Review approved
- [ ] Alle Smoke-Tests grün
