# Plan 3: `/gutscheine` + Stripe — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Vollständige E-Commerce-Integration für Gutscheine (5er/10er-Blöcke je Dauer + Einzelgutschein mit Custom Amount). Stripe Embedded Checkout, Webhook-getriebene Voucher-Erstellung in Sanity, server-side PDF-Generation, E-Mail-Versand via Resend, Studio-basierte Einlösung durch Domenic.

**Architecture:** Käufer wählt Produkt auf `/gutscheine`, der eingebettete Stripe-Checkout läuft auf derselben Seite (kein Redirect). Nach erfolgreicher Zahlung redirected Stripe auf `/gutscheine/danke?session_id=...`. Parallel triggert Stripe einen Webhook auf `/api/stripe-webhook`, der den Voucher in Sanity persistiert, das PDF generiert + uploaded, und E-Mails an Käufer (mit PDF-Anhang) und Domenic verschickt. Idempotenz via `stripeSessionId`. Domenic löst Block-Karten / Einzelgutscheine im Sanity Studio via Custom Document Actions ein.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind v4, Sanity CMS v5 + next-sanity, Stripe (`stripe` server SDK + `@stripe/stripe-js` + `@stripe/react-stripe-js`), `@react-pdf/renderer`, Resend, nanoid. Test-Mode Stripe für komplette Entwicklung; Live-Schaltung später via Env-Var-Swap.

**Spec reference:** `docs/superpowers/specs/2026-05-07-phase1-design.md` §6 (`/gutscheine`), §3.5 (Dependencies), §3.6 (Env Vars), §3.7 (Datenfluss), §9.2 (Legal Compliance Review), §9.3 (Error-Handling-Matrix).

---

## Pre-Implementation Setup

Set these in `.env.local` before Task 1 (Test-Mode):

```
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=
STRIPE_PRICE_BLOCK_5_30=
STRIPE_PRICE_BLOCK_5_45=
STRIPE_PRICE_BLOCK_5_60=
STRIPE_PRICE_BLOCK_10_30=
STRIPE_PRICE_BLOCK_10_45=
STRIPE_PRICE_BLOCK_10_60=
STRIPE_PRICE_VOUCHER_CUSTOM=
RESEND_API_KEY=re_...
EMAIL_FROM="Heilmasseur Domenic Hacker <onboarding@resend.dev>"
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

`STRIPE_WEBHOOK_SECRET` and all `STRIPE_PRICE_*` are filled during implementation.

---

## File Structure

See spec §3 for high-level file map. Plan 3 creates/modifies:

```
scripts/setup-stripe-products.ts          CREATE
docs/setup/stripe-onboarding-domenic.md   CREATE
lib/stripe/client.ts                      CREATE
lib/stripe/products.ts                    CREATE
lib/voucher/generateCode.ts               CREATE
lib/voucher/expiry.ts                     CREATE
lib/email/resend.ts                       CREATE
lib/email/sendVoucherConfirmation.ts      CREATE
lib/email/sendDomenicNotification.ts      CREATE
components/VoucherPDF.tsx                 CREATE
components/VoucherProductSelector.tsx     CREATE
components/VoucherCheckout.tsx            CREATE
sanity/schemas/voucher.ts                 CREATE
sanity/schemas/index.ts                   MODIFY
sanity/deskStructure.ts                   MODIFY
sanity/studio-actions/redeemVoucherActions.tsx  CREATE
sanity.config.ts                          MODIFY
sanity/lib/queries.ts                     MODIFY
app/api/checkout/route.ts                 CREATE
app/api/stripe-webhook/route.tsx          CREATE
app/gutscheine/page.tsx                   CREATE
app/gutscheine/danke/page.tsx             CREATE
app/sitemap.ts                            MODIFY
app/robots.ts                             MODIFY
```

---

## Commits Overview

8 logical commits:

1. Dependencies + Stripe-Setup-Script + Onboarding-Doc
2. Sanity Voucher-Schema + Custom Studio Actions + Type/Query
3. Lib utilities (Stripe Client, Voucher Code, Email Module + Templates)
4. PDF Component
5. API Routes
6. Frontend
7. SEO Polish
8. _(no commit — final smoke test)_

---

## Task 1: Dependencies + Setup-Script + Onboarding-Doc

See spec §6.1. The full code for `scripts/setup-stripe-products.ts` and `docs/setup/stripe-onboarding-domenic.md` are reproduced in the dispatched task prompts; this section provides the high-level steps.

**Files:**
- Modify: `package.json` (via npm install)
- Create: `scripts/setup-stripe-products.ts` — idempotent Stripe product creation
- Create: `docs/setup/stripe-onboarding-domenic.md` — user-facing setup guide

- [ ] **Step 1.1: Install dependencies**

```
npm install stripe @stripe/stripe-js @stripe/react-stripe-js @react-pdf/renderer resend nanoid
```

Verify with `cat package.json | grep -E "stripe|react-pdf|resend|nanoid"` — expect 5 lines.

- [ ] **Step 1.2: Run `npx tsc --noEmit`** — expect 0 errors.

- [ ] **Step 1.3: Create `scripts/setup-stripe-products.ts`** — see Implementer Prompt for full code. The script creates 7 Stripe products (6 block products as `unit_amount` prices, 1 custom-amount voucher with `custom_unit_amount` between 3000 and 50000 cents).

- [ ] **Step 1.4: Run setup script**

```
npx tsx scripts/setup-stripe-products.ts
```

Expected: Output with 7 product creations + 7 env-var lines.

- [ ] **Step 1.5: Paste env-var output** into `.env.local` (replaces empty `STRIPE_PRICE_*` values).

- [ ] **Step 1.6: Create `docs/setup/stripe-onboarding-domenic.md`** — see Implementer Prompt for full content. Steps for Domenic: account creation, KYC, team invite for Josef, deactivate Stripe receipts, payment methods, confirmation message.

- [ ] **Step 1.7: TypeScript + Build**

```
npx tsc --noEmit
npm run build
```

Both expect 0 errors.

- [ ] **Step 1.8: Commit**

```
git add package.json package-lock.json scripts/setup-stripe-products.ts docs/setup/stripe-onboarding-domenic.md
git commit -m "feat(gutscheine): install dependencies + Stripe products setup script + onboarding doc"
```

---

## Task 2: Sanity Voucher-Schema + Custom Studio Actions

See spec §6.2 and §6.8. Full schema code reproduced in dispatched Implementer Prompt.

**Files:**
- Create: `sanity/schemas/voucher.ts`
- Modify: `sanity/schemas/index.ts`
- Modify: `sanity/deskStructure.ts`
- Create: `sanity/studio-actions/redeemVoucherActions.tsx`
- Modify: `sanity.config.ts`
- Modify: `sanity/lib/queries.ts`

- [ ] **Step 2.1: Create `sanity/schemas/voucher.ts`** — voucher document type with fields: code, stripeSessionId, stripePaymentIntentId, productType, sessionsTotal, sessionsRemaining, durationMin, customAmount, customAmountRemaining, buyerEmail, buyerName, recipientName, status (enum), redemptions array, purchasedAt, expiresAt, pdfAsset (file). orderings (newest first, by status). Preview shows code + product summary + buyer + status.

- [ ] **Step 2.2: Register in `sanity/schemas/index.ts`** — import + add to `schemaTypes` array (end of array).

- [ ] **Step 2.3: Add Voucher list to `sanity/deskStructure.ts`** — append to "Inhalte (Listen)" block:

```
S.listItem()
  .title("Gutscheine")
  .schemaType("voucher")
  .child(
    S.documentTypeList("voucher")
      .title("Gutscheine")
      .defaultOrdering([{ field: "purchasedAt", direction: "desc" }])
  ),
```

- [ ] **Step 2.4: Create `sanity/studio-actions/redeemVoucherActions.tsx`** — two custom DocumentActionComponents: `RedeemBlockSessionAction` and `RedeemCustomAmountAction`. Each shows a dialog (note input + amount input for custom), patches the document with new redemption entry + updates sessionsRemaining/customAmountRemaining + status. Uses `useClient({ apiVersion: "2024-01-01" })`.

- [ ] **Step 2.5: Register actions in `sanity.config.ts`** — add `document.actions` callback that returns `[...prev, RedeemBlockSessionAction, RedeemCustomAmountAction]` for `voucher` schemaType, otherwise `prev` unchanged.

- [ ] **Step 2.6: Add `SanityVoucher` type + `getVoucherByStripeSession` getter to `sanity/lib/queries.ts`** — type with all schema fields plus `pdfAsset.asset.url`. Getter uses GROQ `*[_type == "voucher" && stripeSessionId == $sessionId][0] { ..., pdfAsset { asset->{ _ref, url } } }`.

- [ ] **Step 2.7: TypeScript + Build** — `npx tsc --noEmit` and `npm run build`, both 0 errors.

- [ ] **Step 2.8: Commit**

```
git add sanity/schemas/voucher.ts sanity/schemas/index.ts sanity/deskStructure.ts sanity/studio-actions/redeemVoucherActions.tsx sanity.config.ts sanity/lib/queries.ts
git commit -m "feat(sanity): add voucher schema + custom Studio actions for redemption"
```

---

## Task 3: Lib utilities

See spec §3.5 and §6.3.

**Files:**
- Create: `lib/stripe/client.ts` — Stripe SDK init from `STRIPE_SECRET_KEY`, throws if missing
- Create: `lib/stripe/products.ts` — `PRODUCT_DEFINITIONS` map (block kind/sessions/duration vs custom kind), `getStripePriceId(productType)` reading env vars, `productTypeFromStripeMetadata(metadata)` validator
- Create: `lib/voucher/generateCode.ts` — nanoid customAlphabet "23456789ABCDEFGHJKLMNPQRSTUVWXYZ" (no 0/O/1/I/L), 4-char segments, format `GS-XXXX-XXXX`. Sanity uniqueness check, 5 retries.
- Create: `lib/voucher/expiry.ts` — `expiryFromNow()` returns Date 3 years from now; `formatExpiry(d)` German format
- Create: `lib/email/resend.ts` — Resend SDK init, exports `resend` client + `EMAIL_FROM` const (defaults to `onboarding@resend.dev`)
- Create: `lib/email/sendVoucherConfirmation.ts` — sends German HTML email to buyer with PDF attachment, includes code, value, expiry, booking URL
- Create: `lib/email/sendDomenicNotification.ts` — sends notification to Domenic when voucher purchased; supports `isAlert` flag for failure cases (PDF/email failed)

- [ ] **Step 3.1: Create `lib/stripe/client.ts`** — Stripe instance with `apiVersion: "2026-04-22.dahlia"`, `typescript: true`. (Matches stripe@22.x SDK — same API version as `scripts/setup-stripe-products.ts` from Task 1.)

- [ ] **Step 3.2: Create `lib/stripe/products.ts`** — see Implementer Prompt for full code.

- [ ] **Step 3.3: Create `lib/voucher/generateCode.ts`** — uses `client` from `@/sanity/lib/client`, GROQ uniqueness check.

- [ ] **Step 3.4: Create `lib/voucher/expiry.ts`** — `VALIDITY_YEARS = 3`.

- [ ] **Step 3.5: Create `lib/email/resend.ts`** — throws if `RESEND_API_KEY` missing.

- [ ] **Step 3.6: Create `lib/email/sendVoucherConfirmation.ts`** — full HTML email template with German `Sie` tone, PDF attachment via `attachments: [{ filename, content: pdfBuffer }]`.

- [ ] **Step 3.7: Create `lib/email/sendDomenicNotification.ts`** — German notification template.

- [ ] **Step 3.8: Run `npx tsc --noEmit`** — expect 0 errors.

- [ ] **Step 3.9: Commit**

```
git add lib/
git commit -m "feat(lib): add Stripe client, voucher code/expiry, Resend client + email templates"
```

---

## Task 4: PDF Component

See spec §6.5.

**Files:**
- Create: `components/VoucherPDF.tsx`

- [ ] **Step 4.1: Create `components/VoucherPDF.tsx`** — `@react-pdf/renderer` Document. A4 page with:
  - Top teal bar
  - Brand block (HEILMASSEUR · WIEN 1080 / Domenic Hacker)
  - Large "Gutschein" title
  - Value box (teal background): primary value (5×60-Min or €100), secondary (product label)
  - Recipient line if `recipientName` set
  - Code box (teal background, large monospace code GS-XXXX-XXXX)
  - Meta section (Gültig bis, Termin buchen URL)
  - Footer (address, AGB hint, validity reminder)

  Type export: `VoucherPDFData = Pick<SanityVoucher, "code" | "productType" | "sessionsTotal" | "durationMin" | "customAmount" | "buyerName" | "recipientName" | "purchasedAt" | "expiresAt">`.

  Component: `VoucherPDF({ voucher })`.

  Colors match site: `#0d4f4f` primary teal, `#f0f7f7` light teal bg, `#e8654a`/`#f2a93b` accents (Hex usable in `@react-pdf/renderer` styles).

- [ ] **Step 4.2: TypeScript-Check** — `npx tsc --noEmit`, 0 errors.

- [ ] **Step 4.3: Commit**

```
git add components/VoucherPDF.tsx
git commit -m "feat(pdf): add VoucherPDF component with @react-pdf/renderer"
```

---

## Task 5: API Routes

See spec §6.4.

**Files:**
- Create: `app/api/checkout/route.ts`
- Create: `app/api/stripe-webhook/route.tsx` (note `.tsx` — uses JSX for `<VoucherPDF/>`)

### Step 5.1: `app/api/checkout/route.ts` — POST

- Validates input: `productType` (must be in PRODUCT_DEFINITIONS), `buyerEmail` (regex), `buyerName` (non-empty), optional `recipientName`. For `voucher_custom` requires `customAmount` between 3000 and 50000 cents.
- Calls `stripe.checkout.sessions.create({ mode: "payment", ui_mode: "embedded", line_items, return_url, customer_email, metadata: { productType, buyerName, recipientName } })`.
- For block products: `line_items: [{ price: priceId, quantity: 1 }]`.
- For custom: `line_items: [{ price_data: { currency: "eur", product_data: { name: "Einzelgutschein" }, unit_amount: customAmount }, quantity: 1 }]`.
- Returns `{ clientSecret: session.client_secret }` (or 500 if missing).
- `return_url` uses `${APP_URL}/gutscheine/danke?session_id={CHECKOUT_SESSION_ID}` literal.
- Errors: 400 for validation, 500 for Stripe failures.

### Step 5.2: `app/api/stripe-webhook/route.tsx` — POST

- Reads raw body via `await req.text()`.
- Verifies signature via `stripe.webhooks.constructEvent(body, signature, WEBHOOK_SECRET)`.
- Returns 400 if signature invalid.
- Returns 200 (received: true) if event.type !== `checkout.session.completed`.
- Idempotency check: `*[_type == "voucher" && stripeSessionId == $sessionId][0]`. If exists, return 200.
- Maps `productType` from `session.metadata`.
- Computes value (block vs custom): for block, fixed sessions/duration; for custom, `Math.round(session.amount_total / 100)`.
- Generates unique voucher code via `generateUniqueVoucherCode()`.
- Creates voucher document in Sanity with `_type: "voucher"`, all fields.
- Renders PDF: `await renderToBuffer(<VoucherPDF voucher={...}/>)`. On error: patches status to `paid_pdf_failed`, sends Domenic alert, returns 200.
- Uploads PDF: `client.assets.upload("file", pdfBuffer, { filename, contentType: "application/pdf" })`. Patches voucher with `pdfAsset` reference.
- Sends buyer email via `sendVoucherConfirmation`. On error: patches status to `paid_email_failed`, sends Domenic alert, returns 200.
- Sends Domenic notification via `sendDomenicNotification` (best-effort, ignore failure).
- Returns 200 with `voucherCode`.

- [ ] **Step 5.3: TypeScript + Build** — both 0 errors.

- [ ] **Step 5.4: Connect webhook locally** — in separate terminal:

```
stripe listen --forward-to localhost:3000/api/stripe-webhook
```

Copy the printed `whsec_...` value to `.env.local` `STRIPE_WEBHOOK_SECRET`.

- [ ] **Step 5.5: Commit**

```
git add app/api/checkout/route.ts app/api/stripe-webhook/route.tsx
git commit -m "feat(api): add Stripe checkout creation + webhook handler"
```

---

## Task 6: Frontend

**Files:**
- Create: `components/VoucherProductSelector.tsx`
- Create: `components/VoucherCheckout.tsx`
- Create: `app/gutscheine/page.tsx`
- Create: `app/gutscheine/danke/page.tsx`

### Step 6.1: `components/VoucherProductSelector.tsx` — Client Component

- Renders 6 BlockCard components (3 in 5er row, 3 in 10er row with `highlight=true`)
- Custom-amount section with input (€30–€500, step 5)
- Each card has `selected` prop to show ring/highlight when active
- Calls `onSelect(SelectedProduct)` from parent

`SelectedProduct` discriminated union: `{ kind: "block", productType, price, size, duration }` or `{ kind: "custom", productType: "voucher_custom", customAmountEur }`.

### Step 6.2: `components/VoucherCheckout.tsx` — Client Component

- Loads Stripe via `loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)`.
- `fetchClientSecret` callback POSTs to `/api/checkout` with input, returns `clientSecret`.
- Mounts `<EmbeddedCheckoutProvider stripe={stripePromise} options={{ fetchClientSecret }}>` with `<EmbeddedCheckout/>` inside.
- Shows error toast if fetch fails.

### Step 6.3: `app/gutscheine/page.tsx` — Client Component (uses useState/useSearchParams)

- 3-step flow: select → details → pay
- Reads `?product=` query for pre-selection (block_5_60 etc., or `voucher_custom`)
- Pre-fills selection if URL param valid; jumps to "details" step
- Details step: form with buyerEmail, buyerName, recipientName (optional)
- Pay step: renders `<VoucherCheckout input={...}/>` with assembled `CheckoutFormInput`
- AGB hint visible on pay step (FAGG §18 — Widerrufsrecht erlischt nach PDF-Lieferung)
- Wraps content in `<Suspense>` to satisfy Next.js useSearchParams requirement

### Step 6.4: `app/gutscheine/danke/page.tsx` — Server Component

- Reads `searchParams.session_id`. Redirects to `/gutscheine` if missing.
- Polls Sanity 4× × 2s for `getVoucherByStripeSession(sessionId)` (handles webhook race).
- If voucher found: shows code, PDF download button (if `pdfAsset.asset.url`), email-sent confirmation, "Termin buchen" CTA.
- If voucher still missing after polling: shows "Wird erstellt — kommt per E-Mail" fallback.
- `metadata.robots: { index: false, follow: false }` (don't index thank-you).

- [ ] **Step 6.5: TypeScript + Build** — both 0 errors.

- [ ] **Step 6.6: End-to-End-Test** — Terminal A: `stripe listen ...`. Terminal B: `npm run dev`. Browser walkthrough with test card `4242 4242 4242 4242`. Verify: Stripe Dashboard, Sanity Studio (voucher), email inbox, PDF download.

- [ ] **Step 6.7: Test decline** — `4000 0000 0000 0002` → error displayed.

- [ ] **Step 6.8: Test custom amount** — voucher_custom with €75 → Sanity has `customAmount: 75`.

- [ ] **Step 6.9: Idempotency test** — replay webhook event → only 1 voucher.

- [ ] **Step 6.10: Studio redemption test** — open voucher in Studio, click "1 Behandlung einlösen" custom action → status updates correctly.

- [ ] **Step 6.11: Commit**

```
git add components/VoucherProductSelector.tsx components/VoucherCheckout.tsx app/gutscheine/
git commit -m "feat(gutscheine): add /gutscheine UI + /gutscheine/danke confirmation"
```

---

## Task 7: SEO Polish

**Files:**
- Modify: `app/sitemap.ts` — add `/gutscheine` entry (priority 0.8)
- Modify: `app/robots.ts` — disallow `/gutscheine/danke` and `/api/`

- [ ] **Step 7.1: Sitemap** — insert `/gutscheine` between `/preise` and `/ueber-mich`.

- [ ] **Step 7.2: Robots** — disallow array becomes `["/studio", "/api/", "/gutscheine/danke"]`.

- [ ] **Step 7.3: TypeScript + Build** — both 0 errors.

- [ ] **Step 7.4: Verify** — `http://localhost:3000/sitemap.xml` shows 9 entries; `http://localhost:3000/robots.txt` has Disallow lines.

- [ ] **Step 7.5: Commit**

```
git add app/sitemap.ts app/robots.ts
git commit -m "feat(seo): add /gutscheine to sitemap, disallow /gutscheine/danke"
```

---

## Task 8: Final Smoke-Test

- [ ] **Step 8.1: Production-Build** — `npm run build`, 0 errors.

- [ ] **Step 8.2: Production-Server** — `npm run start`, full E2E walkthrough.

- [ ] **Step 8.3: Pre-Live Checklist** — all of:
  - Successful E2E test (block product)
  - Successful E2E test (custom amount)
  - Decline card test shows error
  - Webhook idempotency
  - Studio redemption (block + custom)
  - PDF visually OK
  - Buyer email arrives with PDF
  - Domenic notification arrives
  - `?product=` pre-selection works (e.g. from /preise hub)
  - Sitemap has /gutscheine
  - Robots disallows /gutscheine/danke

- [ ] **Step 8.4: Plan 3 done** — proceed to visual check, merge, then Plan 4.

**Pre-Live (after Domenic Stripe onboarding):**
- Production keys + webhook secret in Vercel Production Env
- Run setup-stripe-products.ts on Domenic's account, paste new Price IDs to Production Env
- EMAIL_FROM to verified domain
- Legal Compliance Review (spec §9.2)
- Update AGB / Datenschutz to mention voucher data storage

---

## Risks & Mitigation

| Risk | Mitigation |
|---|---|
| Webhook race on thank-you page | 4× × 2s polling; "kommt per E-Mail" fallback |
| @react-pdf/renderer on Vercel serverless | Library is serverless-compatible; alternative is client-render with download |
| Resend onboarding domain limits | Test only to verified emails; before live, verify own domain |
| Sanity Asset quota | 5GB Free Tier handles thousands of ~50KB PDFs |
| stripe listen unstable in long sessions | Keep in separate terminal during dev; production uses webhook URL on Vercel |
| Embedded Checkout loadStripe race | Suspense boundary; loadStripe is idempotent |
| Sanity v5 custom actions API | Tested in Step 6.10 |
| webhook secret rotates on test→live | Pre-Live checklist includes webhook reconfig |
| Domenic forgets to deactivate Stripe receipts | Onboarding doc Step 4 |

---

## Self-Review

- Spec §6.1 (Stripe Setup) → Task 1
- Spec §6.2 (Voucher Schema) → Task 2
- Spec §6.3 (Voucher Code) → Task 3
- Spec §6.4 (API Routes) → Task 5
- Spec §6.5 (PDF) → Task 4
- Spec §6.6 (/gutscheine UI) → Task 6
- Spec §6.7 (Thank-You) → Task 6
- Spec §6.8 (Studio Custom Actions) → Task 2
- Spec §3.6 (Env Vars) → Pre-Implementation Setup
- Spec §9.3 (Error-Handling) → webhook handler
- Spec §9.2 (Legal Compliance Review) → Step 8.3 trigger
- Spec §8.3 (Sitemap) → Task 7

No spec gaps remaining for Plan 3.
