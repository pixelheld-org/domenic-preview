import { cache } from "react";
import { sanityFetch } from "./live";

// ─── Types ───────────────────────────────────────────────────────────────────

export type SanityService = {
  _id: string;
  title: string;
  slug: { current: string };
  shortDescription: string;
  price: string;
  image?: { asset: { _ref: string } };
  sortOrder: number;
};

export type SanityPricingItem = {
  _id: string;
  serviceName: string;
  price30: number | null;
  price45: number | null;
  price60: number | null;
  popular: boolean;
  sortOrder: number;
};

export type SanityFaqItem = {
  _id: string;
  question: string;
  answer: string;
  sortOrder: number;
};

export type SanityTestimonial = {
  _id: string;
  quote: string;
  authorName: string;
  authorDetail?: string;
  rating: number;
  sortOrder: number;
};

export type SanityAbout = {
  title: string;
  bio: string[];
  image?: { asset: { _ref: string } };
  yearsExperience: string;
  qualificationsCount: string;
  location: string;
  credentials: string[];
  heroImage?: { asset: { _ref: string } };
  heroSubtitle: string;
  breakdanceImage?: { asset: { _ref: string } };
  meinWegHighlights: { title: string; subtitle: string }[];
  philosophieTexte: string[];
  quote: string;
  quoteAuthorTitle: string;
  ctaHeading: string;
  ctaText: string;
};

export type SanitySettings = {
  siteTitle: string;
  siteDescription: string;
  heroHeadline: string;
  heroHeadlineAccent: string;
  heroSubheading: string;
  address: string;
  phone: string;
  email: string;
  calendlyUrl: string;
  insuranceText: string;
  instagramUrl: string;
  googleMapsUrl: string;
  logo?: { asset: { _ref: string } };
};

export type SanityHomePage = {
  heroBackgroundImage?: { asset: { _ref: string } };
  heroPortraitImage?: { asset: { _ref: string } };
  servicesBadge?: string;
  servicesHeading?: string;
  servicesHeadingAccent?: string;
  servicesText?: string;
  portraitImage?: { asset: { _ref: string } };
  portraitName?: string;
  portraitTitle?: string;
  reviewsBadge?: string;
  reviewsHeading?: string;
  reviewsHeadingAccent?: string;
  reviewsText?: string;
  pricingBadge?: string;
  pricingHeading?: string;
  pricingHeadingAccent?: string;
  pricingText?: string;
  pricingWkoUrl?: string;
  aboutTeaserBadge: string;
  aboutTeaserHeading: string;
  aboutTeaserHeadingAccent: string;
  aboutTeaserImage?: { asset: { _ref: string } };
  praxisBadge: string;
  praxisHeading: string;
  praxisHeadingAccent: string;
  praxisDescription: string;
  praxisImage?: { asset: { _ref: string } };
};

export type SanityHeilmassagePage = {
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
  faqs: { _key: string; question: string; answer: string }[];
  ctaHeading: string;
  ctaText: string;
};

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
  faqs: { _key: string; question: string; answer: string }[];
  ctaHeading: string;
  ctaText: string;
};

export type SanityBlockPricing = {
  block_5_30_price: number;
  block_5_30_fullPrice: number;
  block_5_45_price: number;
  block_5_45_fullPrice: number;
  block_5_60_price: number;
  block_5_60_fullPrice: number;
  block_10_30_price: number;
  block_10_30_fullPrice: number;
  block_10_45_price: number;
  block_10_45_fullPrice: number;
  block_10_60_price: number;
  block_10_60_fullPrice: number;
};

export type SanityGutscheinePage = {
  seoTitle: string;
  seoDescription: string;
  heroBadge: string;
  heroHeading: string;
  heroHeadingAccent: string;
  heroText: string;
  blocksEyebrow: string;
  blocksHeading: string;
  blocksText: string;
  blocksDurationLabel: string;
  customEyebrow: string;
  customHeading: string;
  customText: string;
  customCardTitle: string;
  customCardSubtext: string;
  detailsHeading: string;
  detailsText: string;
  recipientHelpText: string;
  paymentHeading: string;
  paymentText: string;
  agbNotice: string;
};

export type SanityBuchenPage = {
  heading: string;
  headingAccent: string;
  subtitle: string;
  steps: { number: string; text: string }[];
  medicalNote?: string;
  successHeading: string;
  successText: string;
  infoHeading: string;
  infoHeadingAccent: string;
  infoDescription: string;
  accessibilityFeatures: string[];
  googleMapsEmbedUrl: string;
};

export type SanityImpressumPage = {
  sections: { heading: string; content: string }[];
};

export type SanityDatenschutzPage = {
  lastUpdated: string;
  sections: { heading: string; content: string; subsections?: { heading: string; content: string }[] }[];
};

export type SanityVoucherProductType =
  | "block_5_30"
  | "block_5_45"
  | "block_5_60"
  | "block_10_30"
  | "block_10_45"
  | "block_10_60"
  | "voucher_custom";

export type SanityVoucherStatus =
  | "paid"
  | "partially_redeemed"
  | "fully_redeemed"
  | "expired"
  | "cancelled"
  | "paid_pdf_failed"
  | "paid_email_failed";

export type SanityVoucher = {
  _id: string;
  code: string;
  stripeSessionId: string;
  stripePaymentIntentId: string | null;
  productType: SanityVoucherProductType;
  sessionsTotal: number | null;
  sessionsRemaining: number | null;
  durationMin: number | null;
  customAmount: number | null;
  customAmountRemaining: number | null;
  buyerEmail: string;
  buyerName: string | null;
  recipientName: string | null;
  status: SanityVoucherStatus;
  redemptions: Array<{
    _key: string;
    date: string;
    sessionsRedeemed?: number;
    amountRedeemed?: number;
    note?: string;
  }> | null;
  purchasedAt: string;
  expiresAt: string;
  pdfAsset: {
    asset: { _ref: string; url: string };
  } | null;
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

async function safeFetch<T>(query: string, params?: Record<string, unknown>): Promise<T | null> {
  try {
    const { data } = await sanityFetch({ query, params });
    return data as T;
  } catch {
    return null;
  }
}

// ─── Queries ─────────────────────────────────────────────────────────────────

export async function getServices(): Promise<SanityService[] | null> {
  return safeFetch<SanityService[]>(
    `*[_type == "service"] | order(sortOrder asc) {
      _id, title, slug, shortDescription, price, image, sortOrder
    }`
  );
}

export async function getPricingItems(): Promise<SanityPricingItem[] | null> {
  return safeFetch<SanityPricingItem[]>(
    `*[_type == "pricingItem"] | order(sortOrder asc) {
      _id, serviceName, price30, price45, price60, popular, sortOrder
    }`
  );
}

export async function getFaqItems(): Promise<SanityFaqItem[] | null> {
  return safeFetch<SanityFaqItem[]>(
    `*[_type == "faqItem"] | order(sortOrder asc) {
      _id, question, answer, sortOrder
    }`
  );
}

export async function getTestimonials(): Promise<SanityTestimonial[] | null> {
  return safeFetch<SanityTestimonial[]>(
    `*[_type == "testimonial"] | order(sortOrder asc) {
      _id, quote, authorName, authorDetail, rating, sortOrder
    }`
  );
}

export async function getAbout(): Promise<SanityAbout | null> {
  return safeFetch<SanityAbout>(
    `*[_type == "about"][0] {
      title, bio, image, yearsExperience, qualificationsCount, location, credentials,
      heroImage, heroSubtitle, breakdanceImage,
      meinWegHighlights[] { title, subtitle },
      philosophieTexte, quote, quoteAuthorTitle, ctaHeading, ctaText
    }`
  );
}

export async function getSettings(): Promise<SanitySettings | null> {
  return safeFetch<SanitySettings>(
    `*[_type == "settings"][0] {
      siteTitle, siteDescription, heroHeadline, heroHeadlineAccent,
      heroSubheading, address, phone, email, calendlyUrl, insuranceText,
      instagramUrl, googleMapsUrl, logo
    }`
  );
}

export async function getHomePage(): Promise<SanityHomePage | null> {
  return safeFetch<SanityHomePage>(
    `*[_type == "homePage"][0] {
      heroBackgroundImage, heroPortraitImage,
      servicesBadge, servicesHeading, servicesHeadingAccent, servicesText,
      portraitImage, portraitName, portraitTitle,
      reviewsBadge, reviewsHeading, reviewsHeadingAccent, reviewsText,
      pricingBadge, pricingHeading, pricingHeadingAccent, pricingText, pricingWkoUrl,
      aboutTeaserBadge, aboutTeaserHeading, aboutTeaserHeadingAccent, aboutTeaserImage,
      praxisBadge, praxisHeading, praxisHeadingAccent, praxisDescription, praxisImage
    }`
  );
}

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

export async function getBuchenPage(): Promise<SanityBuchenPage | null> {
  return safeFetch<SanityBuchenPage>(
    `*[_type == "buchenPage"][0] {
      heading, headingAccent, subtitle,
      steps[] { number, text },
      medicalNote, successHeading, successText,
      infoHeading, infoHeadingAccent, infoDescription,
      accessibilityFeatures, googleMapsEmbedUrl
    }`
  );
}

export async function getImpressumPage(): Promise<SanityImpressumPage | null> {
  return safeFetch<SanityImpressumPage>(
    `*[_type == "impressumPage"][0] {
      sections[] { heading, content }
    }`
  );
}

export async function getDatenschutzPage(): Promise<SanityDatenschutzPage | null> {
  return safeFetch<SanityDatenschutzPage>(
    `*[_type == "datenschutzPage"][0] {
      lastUpdated,
      sections[] { heading, content, subsections[] { heading, content } }
    }`
  );
}

export const getPricingPage = cache(async (): Promise<SanityPricingPage | null> => {
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
      faqs[] { _key, question, answer },
      ctaHeading, ctaText
    }`
  );
});

export const getBlockPricing = cache(
  async (): Promise<SanityBlockPricing | null> => {
    return safeFetch<SanityBlockPricing>(
      `*[_type == "blockPricing"][0] {
        block_5_30_price, block_5_30_fullPrice,
        block_5_45_price, block_5_45_fullPrice,
        block_5_60_price, block_5_60_fullPrice,
        block_10_30_price, block_10_30_fullPrice,
        block_10_45_price, block_10_45_fullPrice,
        block_10_60_price, block_10_60_fullPrice
      }`,
    );
  },
);

export const getGutscheinePage = cache(
  async (): Promise<SanityGutscheinePage | null> => {
    return safeFetch<SanityGutscheinePage>(
      `*[_type == "gutscheinePage"][0] {
        seoTitle, seoDescription,
        heroBadge, heroHeading, heroHeadingAccent, heroText,
        blocksEyebrow, blocksHeading, blocksText, blocksDurationLabel,
        customEyebrow, customHeading, customText, customCardTitle, customCardSubtext,
        detailsHeading, detailsText, recipientHelpText,
        paymentHeading, paymentText, agbNotice
      }`,
    );
  },
);

export async function getVoucherByStripeSession(sessionId: string): Promise<SanityVoucher | null> {
  return safeFetch<SanityVoucher>(
    `*[_type == "voucher" && stripeSessionId == $sessionId][0] {
      _id, code, stripeSessionId, stripePaymentIntentId, productType,
      sessionsTotal, sessionsRemaining, durationMin,
      customAmount, customAmountRemaining,
      buyerEmail, buyerName, recipientName, status,
      redemptions[] { _key, date, sessionsRedeemed, amountRedeemed, note },
      purchasedAt, expiresAt,
      pdfAsset { asset->{ _ref, url } }
    }`,
    { sessionId }
  );
}
