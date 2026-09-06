# Heilmasseur Domenic – Website Redesign Spec

**Date:** 2026-03-26
**Status:** Approved by user

---

## Overview

Redesign of [heilmasseur-domenic.at](https://www.heilmasseur-domenic.at/) as a modern Next.js single-page website. The user selected **Design #3 – Nature & Organic** from 5 presented options.

---

## Visual Direction

- **Style:** Nature & Organic — warm sage-green palette, rounded organic shapes, lots of breathing room
- **Typography:** Bold rounded headlines (German), clean sans-serif body
- **Tone:** Calm, holistic, grounding ("Ankommen. Loslassen. Aufatmen.")
- **Layout:** Full-width sections, organic/curved dividers, gentle visual hierarchy

---

## Color Tokens

```
Background:        #e8ede4  (light sage)
Background alt:    #d4e0ce  (medium sage)
Surface:           #c8d9bf  (soft green)
Accent:            #4a7c59  (forest green)
Accent hover:      #3a6347
Text primary:      #1e3020  (deep forest)
Text secondary:    #4a5945  (muted green-grey)
Text muted:        rgba(30,48,32,0.5)
CTA button:        #4a7c59  border-radius: 24px
```

---

## Content

**Business:** Heilmasseur Domenic Hacker
**Location:** Feldgasse 3/20, 1080 Wien
**Phone:** +43 670 189 52 56
**Email:** praxis@heilmasseur-domenic.at

**Taglines:**
- "Ankommen. Loslassen. Aufatmen."
- "Weniger Schmerzen. Tiefe Entspannung."

**Services & Pricing:**
| Service | 30 min | 45 min | 60 min |
|---------|--------|--------|--------|
| Heilmassage | €55 | €70 | €85 |
| Lymphdrainage | €55 | €70 | €85 |
| Klassische Massage | €55 | €70 | €85 |

**Key trust signals:**
- Diplomierter Heilmasseur
- Kassenrückerstattung möglich (bis 100% bei Privatversicherung)
- Ausbildung: Thai-Massage (Watpo), Sporttherapie, Dorn-Breuss, Reflexzonenmassage, Akupunkturmassage
- Breakdancing-Hintergrund → einzigartiges Körperbewusstsein

---

## Page Sections

1. **Navbar** — Logo (Domenic Hacker), Nav-Links, CTA-Button "Termin buchen" (grün, pill-shaped)
2. **Hero** — Grüner Tag "Heilmasseur · Wien", Headline "Ankommen. Loslassen. Aufatmen.", Subtext, organischer Kreis/Bild-Placeholder rechts, CTA-Button, 3 Stats unten
3. **Services** — 3 Karten: Heilmassage, Lymphdrainage, Klassische Massage — je mit Beschreibung + Preis, abgerundete Karten in sage-green
4. **Über Domenic** — Bio-Text inkl. Breakdancing-Hintergrund, Ausbildungen, Foto-Placeholder (organisch geformt)
5. **Preise** — Preistabelle (30 / 45 / 60 Min), Hinweis auf Kassenrückerstattung
6. **Kontakt** — Adresse, Telefon, E-Mail, einfaches Kontaktformular (statisch, mailto)
7. **Footer** — Name, Links, Impressum-Hinweis

---

## Technical

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion (gentle fade-in, subtle float)
- **UI Components:** Radix UI Themes where applicable
- **Analytics:** Vercel Analytics (already installed)
- **Language:** Deutsch
- **Responsive:** Mobile-first, fully responsive

---

## Out of Scope

- CMS / content management
- Online booking system (link to phone/email only)
- Multi-language (German only)
- Blog
