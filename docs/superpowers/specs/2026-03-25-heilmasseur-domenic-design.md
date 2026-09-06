# Heilmasseur Domenic – Website Redesign Spec

**Date:** 2026-03-25
**Status:** Approved by user

---

## Overview

Redesign of [heilmasseur-domenic.at](https://www.heilmasseur-domenic.at/) as a modern Next.js single-page website. The user selected **Design #3 – Bold & Modern** from 5 presented options.

---

## Visual Direction

- **Style:** Bold editorial — dark navy base (`#0a1628`), red accent (`#e63946`), white text
- **Typography:** Heavy weight headlines (uppercase), clean sans-serif body
- **Tone:** Direct, confident, results-oriented ("Stop the pain.")
- **Layout:** Full-width sections, strong visual hierarchy, stats prominently displayed

---

## Content

**Business:** Heilmasseur Domenic Hacker
**Location:** Feldgasse 3/20, 1080 Wien
**Phone:** +43 670 189 52 56
**Email:** praxis@heilmasseur-domenic.at

**Taglines:**
- "Weniger Schmerzen. Tiefe Entspannung."
- "Ankommen. Loslassen. Aufatmen."

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

1. **Navbar** — Logo (Domenic Hacker), Nav-Links, CTA-Button "Jetzt buchen" (rot)
2. **Hero** — Roter Tag "Wien · 1080", großes Headline "STOP THE PAIN.", Subtext, 3 Stats (Spezialgebiete / Preis / Kassenrückerstattung), CTA-Button
3. **Services** — 3 Karten: Heilmassage, Lymphdrainage, Klassische Massage — je mit Beschreibung + Preis
4. **Über Domenic** — Bio-Text inkl. Breakdancing-Hintergrund, Ausbildungen, Foto-Placeholder
5. **Preise** — Preistabelle (30 / 45 / 60 Min), Hinweis auf Kassenrückerstattung
6. **Kontakt** — Adresse, Telefon, E-Mail, einfaches Kontaktformular (statisch, mailto)
7. **Footer** — Name, Links, Impressum-Hinweis

---

## Technical

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion (subtle entrance animations)
- **UI Components:** Radix UI Themes where applicable
- **Analytics:** Vercel Analytics (already installed)
- **Language:** Deutsch
- **Responsive:** Mobile-first, fully responsive

---

## Design Tokens

```
Background:   #0a1628 (navy dark)
Accent:       #e63946 (red)
Text:         #ffffff
Text muted:   rgba(255,255,255,0.6)
Surface:      #0f1f38 (slightly lighter navy)
Border:       rgba(255,255,255,0.08)
```

---

## Out of Scope

- CMS / content management
- Online booking system (link to phone/email only)
- Multi-language (German only)
- Blog
