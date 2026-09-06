# PLAN — heilmasseur-domenic.at

## Ist-Stand

### Seiten (App Router)
- `/` — Startseite
- `/heilmassage-wien-1080` — Leistungsseite Heilmassage
- `/ueber-mich` — Portrait
- `/buchen` — Calendly-Embed
- `/impressum`
- `/datenschutz`
- `/studio` — Sanity Studio Embed

### Navigation
- 3 Links (Startseite, Heilmassage Wien, Über mich) + CTA-Button "Termin buchen"
- Mobile: Hamburger-Overlay mit denselben Links
- Sticky/Scroll-Verhalten implementiert

### Stack
- Next.js 16.2 (App Router) + React 19 + React Compiler
- Sanity CMS v5 + next-sanity v12 + `@sanity/image-url`
- Tailwind v4 + Radix Themes
- Vercel Hosting + Vercel Analytics
- Calendly (Buchung)
- vanilla-cookieconsent (DSGVO)
- `lucide-react` Icons

### Komponenten (`components/`)
- `Navbar.tsx`, `Footer.tsx`, `Hero.tsx`
- `Services.tsx`, `Pricing.tsx` — beide akzeptieren `homePage`-Prop mit CMS-Werten
- `Contact.tsx`, `FAQ.tsx`
- `GoogleReviews.tsx`, `GoogleReviewsBadge.tsx`, `GoogleReviewsMarquee.tsx`
- `JsonLd.tsx`, `FaqJsonLd.tsx` — strukturierte Daten existieren bereits
- `CookieConsent.tsx`

### Sanity-Schemas (`sanity/schemas/`)
- `homePage`, `heilmassagePage`, `about`, `buchenPage`, `impressumPage`, `datenschutzPage`
- `service`, `pricingItem`, `testimonial`, `faqItem`, `settings`
- Feldgruppen für Leistungen, Portrait, Bewertungen, Preise auf `homePage` bereits angelegt

### API-Routen (`app/api/`)
- `auth/route.ts` — Sanity-Auth
- `reviews/route.ts` — Google Reviews Proxy

### SEO-Basis (bereits vorhanden)
- `app/sitemap.ts` — listet die 6 bestehenden Seiten
- `app/robots.ts` — erlaubt alles außer `/studio` und `/api/`
- `JsonLd.tsx` + `FaqJsonLd.tsx` als Komponenten verfügbar

### Sonstiges
- `proxy.ts` im Root (Calendly/Reviews)
- `scripts/` — Sanity-Migrations-Helfer
- `docs/` — interne Dokumentation

---

## Phase 1 — Navigation & Kernseiten (950 €)

### P1.1 Navbar-Erweiterung
- Dropdown-Menü für Leistungen (Heilmassage, Sportmassage)
- Preise und Gutscheine als eigene Navigationspunkte
- Mobile-Menü entsprechend anpassen (akkordeon-style für Leistungen)

### P1.2 `/preise`
- Übersichtliche Preisseite mit allen Behandlungen, Zeiten und Tarifen
- Über Sanity CMS editierbar (`pricingItem` ggf. erweitern, neues `pricingPage`-Schema)

### P1.3 `/sportmassage-wien`
- Leistungsseite Sportmassage als Unterseite im Leistungen-Dropdown
- SEO-optimiert für relevante Keywords
- Eigenes Sanity-Schema `sportmassagePage` analog zu `heilmassagePage`

### P1.4 `/gutscheine`
- Gutschein- & Blockkarten-Shop mit Stripe Checkout
- 10er-Block (10 + 1 gratis) und Einzelgutscheine
- Direkt auf der Seite eingebettet, kein Redirect (Embedded Checkout)
- Webhook für Bestellbestätigung + PDF-Versand

---

## Phase 2 — SEO-Landingpages & Optimierung (1.350 €)

### Tier 1 — Hohes Suchvolumen
- **P2.1** `/massage-1080-wien` — 100–1.000 Suchen/Monat, geringer Wettbewerb
- **P2.2** `/mobile-massage-wien` — 100–1.000 Suchen/Monat, geringer Wettbewerb. Premium-Angebot Hausbesuche

### Tier 2 — Gute Ergänzung
- **P2.3** `/schroepfen-wien` — 100–1.000 Suchen/Monat, mittlerer Wettbewerb
- **P2.4** `/masseur-wien` — 100–1.000 Suchen/Monat, geringer Wettbewerb

### SEO-Optimierung bestehender Seiten
- **P2.5** Meta-Tags vervollständigen, JsonLd-Komponente auf allen neuen Seiten anwenden, `sitemap.ts` um neue Routen erweitern, `robots.ts` prüfen
- **P2.6** Synonym-Optimierung auf Startseite und Heilmassage-Seite (z.B. "heilmasseur wien" abdecken)

---

## Phase 3 — Design & Infrastruktur (550 €)

- **P3.1** Visitenkarten-Design (druckfertige Vorlage, inkl. Druckabwicklung)
- **P3.2** Gutscheinvorlage (druckfertig, einheitlich mit Website und Visitenkarte)
- **P3.3** Domain-Umzug World4You → Hostinger (DNS-Konfiguration, ohne Downtime)

---

## Cross-Cutting

- Alle neuen Seiten über Sanity CMS editierbar
- `JsonLd.tsx` (existiert) auf jeder neuen Landingpage einbinden — `LocalBusiness` / `Service` / `BreadcrumbList`
- `sitemap.ts` und `robots.ts` (existieren) bei jeder neuen Route mitpflegen
- Bildoptimierung über `@sanity/image-url` + `next/image`
- Konsistente Gestaltung: Navbar/Footer-Links, Farbcode (`#0d4f4f`, `#e8654a`, `#f2a93b`)

---

## Nicht enthalten (separat geplant)

- Buchungslösung / Calendly-Ablöse
- E-Mail-Marketing-Automatisierung (Brevo/Resend)
- E-Books / Kurse

---

## Offene Fragen an Domenic

1. **Mobile Massage:** In welchen Bezirken? Preisaufschlag?
2. **Schröpfen:** Wird das als Einzelleistung angeboten oder als Zusatz?
3. **Visitenkarten:** Wie viele Stück werden gebraucht?
4. **Preise:** Aktuelle Preisliste für die `/preise` Seite?
5. **Sportmassage:** Beschreibungstext und ggf. Bilder vorhanden?
