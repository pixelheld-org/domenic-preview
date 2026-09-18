/**
 * Rescue constants for /mobile-massage-wien. Page copy is baked into page.tsx
 * for portal direct-text-edit. Sanity snapshot + this file stay as fallback.
 */

export type Step = { title: string; description: string };
export type Included = { title: string; description: string };
export type Faq = { _key: string; question: string; answer: string };
export type PriceTier = { duration: string; amount?: number };

export const IMAGES = {
  /** Portrait, Hochformat 1400×3035, Gesicht oben (object-position ≈ 50% 22%) */
  portrait: "/images/domenic-1080.webp",
  /** Behandlungsraum (reuse existing public asset; liege webp not on GitHub) */
  room: "/images/behandlungsraum.webp",
  /** Breakdance-Bühnenfoto 3000×2000, Tänzer mittig (object-position ≈ 50% 55%) */
  stage: "/images/breakdance.jpg",
  /** Behandlung, warmes Licht, 1600×1066 */
  treatment: "/images/behandlungsraum.webp",
  /** Praxis-Behandlung mit Pflanze, 2000×1333 */
  treatmentWide: "/images/domenic-1080.webp",
} as const;

export const GOOGLE_MAPS_URL =
  "https://maps.google.com/?q=Heilmasseur+Domenic+Hacker+Wien";

export const MAIL_HREF =
  "mailto:praxis@heilmasseur-domenic.at?subject=" +
  encodeURIComponent("Anfrage Hausbesuch");
export const TEL_HREF = "tel:+436701895256";
