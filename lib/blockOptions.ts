import type { SanityBlockPricing } from "@/sanity/lib/queries";

export type Duration = 30 | 45 | 60;
export type Size = 5 | 10;

export type BlockProductKey =
  | "block_5_30"
  | "block_5_45"
  | "block_5_60"
  | "block_10_30"
  | "block_10_45"
  | "block_10_60";

export type BlockOption = {
  size: Size;
  duration: Duration;
  price: number;
  fullPrice: number;
  productKey: BlockProductKey;
};

// Structural identity of each block tier — size + duration → productKey.
// Prices live in Sanity (singleton "blockPricing") and are merged in at
// runtime via getBlockOption(size, duration, pricing). The BLOCK_PRICES_FALLBACK
// below kicks in only when the Sanity document doesn't exist or a specific
// field is missing — useful for first deploy + during local dev without
// the CMS populated.
const BLOCK_STRUCTURE: readonly {
  size: Size;
  duration: Duration;
  productKey: BlockProductKey;
}[] = [
  { size: 5, duration: 30, productKey: "block_5_30" },
  { size: 5, duration: 45, productKey: "block_5_45" },
  { size: 5, duration: 60, productKey: "block_5_60" },
  { size: 10, duration: 30, productKey: "block_10_30" },
  { size: 10, duration: 45, productKey: "block_10_45" },
  { size: 10, duration: 60, productKey: "block_10_60" },
] as const;

export const BLOCK_PRICES_FALLBACK: Record<
  BlockProductKey,
  { price: number; fullPrice: number }
> = {
  block_5_30: { price: 259, fullPrice: 275 },
  block_5_45: { price: 329, fullPrice: 350 },
  block_5_60: { price: 399, fullPrice: 425 },
  block_10_30: { price: 489, fullPrice: 550 },
  block_10_45: { price: 619, fullPrice: 700 },
  block_10_60: { price: 749, fullPrice: 850 },
};

export const DURATIONS: readonly Duration[] = [30, 45, 60] as const;
export const SIZES: readonly Size[] = [5, 10] as const;

function priceFromPricing(
  productKey: BlockProductKey,
  pricing: SanityBlockPricing | null | undefined,
): { price: number; fullPrice: number } {
  const cmsPrice = pricing?.[`${productKey}_price` as keyof SanityBlockPricing];
  const cmsFullPrice =
    pricing?.[`${productKey}_fullPrice` as keyof SanityBlockPricing];
  const fallback = BLOCK_PRICES_FALLBACK[productKey];
  return {
    price: typeof cmsPrice === "number" ? cmsPrice : fallback.price,
    fullPrice:
      typeof cmsFullPrice === "number" ? cmsFullPrice : fallback.fullPrice,
  };
}

export function getBlockOption(
  size: Size,
  duration: Duration,
  pricing?: SanityBlockPricing | null,
): BlockOption {
  const found = BLOCK_STRUCTURE.find(
    (o) => o.size === size && o.duration === duration,
  );
  if (!found) {
    throw new Error(`No block option for size=${size}, duration=${duration}`);
  }
  const { price, fullPrice } = priceFromPricing(found.productKey, pricing);
  return { size, duration, productKey: found.productKey, price, fullPrice };
}

export function getBlockPriceCents(
  productKey: BlockProductKey,
  pricing: SanityBlockPricing | null | undefined,
): number {
  // Math.round schützt gegen Float-Artefakte (z.B. 259.45 * 100 = 25945.0000000000004),
  // die Stripes unit_amount-Integer-Validation auslösen würden.
  return Math.round(priceFromPricing(productKey, pricing).price * 100);
}

export function discountPercent(price: number, fullPrice: number): number {
  return Math.round(((fullPrice - price) / fullPrice) * 100);
}
