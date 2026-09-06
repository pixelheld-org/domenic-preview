/**
 * Idempotentes Stripe-Produkt-Setup-Script.
 * Erstellt 7 Produkte (5er/10er Bl&#xF6;cke je 30/45/60 + Einzelgutschein-Custom-Amount).
 * Falls Produkte bereits existieren (anhand metadata.product_key), werden sie nicht dupliziert.
 *
 * Usage: STRIPE_SECRET_KEY=sk_test_... npx tsx scripts/setup-stripe-products.ts
 */
import Stripe from "stripe";

const SECRET = process.env.STRIPE_SECRET_KEY;
if (!SECRET) {
  console.error("STRIPE_SECRET_KEY env var required");
  process.exit(1);
}

const stripe = new Stripe(SECRET, { apiVersion: "2026-04-22.dahlia" });

type ProductSpec = {
  productKey: string;
  name: string;
  description: string;
  amountEur: number;
};

const BLOCK_PRODUCTS: ProductSpec[] = [
  { productKey: "block_5_30", name: "5er-Block 30 Min Massage", description: "5 \xD7 30-Minuten-Behandlung — flexibel einl\xF6sbar als Heilmassage oder Sportmassage", amountEur: 259 },
  { productKey: "block_5_45", name: "5er-Block 45 Min Massage", description: "5 \xD7 45-Minuten-Behandlung — flexibel einl\xF6sbar als Heilmassage oder Sportmassage", amountEur: 329 },
  { productKey: "block_5_60", name: "5er-Block 60 Min Massage", description: "5 \xD7 60-Minuten-Behandlung — flexibel einl\xF6sbar als Heilmassage oder Sportmassage", amountEur: 399 },
  { productKey: "block_10_30", name: "10er-Block 30 Min Massage", description: "10 \xD7 30-Minuten-Behandlung — flexibel einl\xF6sbar als Heilmassage oder Sportmassage", amountEur: 489 },
  { productKey: "block_10_45", name: "10er-Block 45 Min Massage", description: "10 \xD7 45-Minuten-Behandlung — flexibel einl\xF6sbar als Heilmassage oder Sportmassage", amountEur: 619 },
  { productKey: "block_10_60", name: "10er-Block 60 Min Massage", description: "10 \xD7 60-Minuten-Behandlung — flexibel einl\xF6sbar als Heilmassage oder Sportmassage", amountEur: 749 },
];

const CUSTOM_VOUCHER_PRODUCT = {
  productKey: "voucher_custom",
  name: "Einzelgutschein (frei w\xE4hlbarer Wert)",
  description: "Massage-Gutschein mit individuellem Betrag — einl\xF6sbar gegen jede Behandlung",
  minAmountCents: 3000,
  maxAmountCents: 50000,
};

async function findOrCreateProduct(spec: { productKey: string; name: string; description: string }): Promise<Stripe.Product> {
  const search = await stripe.products.search({
    query: "metadata['product_key']:'" + spec.productKey + "' AND active:'true'",
  });

  if (search.data.length > 0) {
    console.log("✓ Product exists: " + spec.productKey + " (" + search.data[0].id + ")");
    return search.data[0];
  }

  const product = await stripe.products.create({
    name: spec.name,
    description: spec.description,
    metadata: { product_key: spec.productKey },
  });
  console.log("+ Created product: " + spec.productKey + " (" + product.id + ")");
  return product;
}

async function findOrCreatePrice(productId: string, amountCents: number, productKey: string): Promise<Stripe.Price> {
  const list = await stripe.prices.list({ product: productId, active: true, limit: 10 });
  const matching = list.data.find((p) => p.unit_amount === amountCents && p.currency === "eur" && p.custom_unit_amount === null);
  if (matching) {
    console.log("  ✓ Price exists: " + productKey + " = €" + amountCents / 100 + " (" + matching.id + ")");
    return matching;
  }
  const price = await stripe.prices.create({
    product: productId,
    unit_amount: amountCents,
    currency: "eur",
    metadata: { product_key: productKey },
  });
  console.log("  + Created price: " + productKey + " = €" + amountCents / 100 + " (" + price.id + ")");
  return price;
}

async function findOrCreateCustomPrice(productId: string, productKey: string, min: number, max: number): Promise<Stripe.Price> {
  const list = await stripe.prices.list({ product: productId, active: true, limit: 10 });
  const matching = list.data.find((p) => p.custom_unit_amount?.minimum === min && p.custom_unit_amount?.maximum === max);
  if (matching) {
    console.log("  ✓ Custom price exists: " + productKey + " (" + matching.id + ")");
    return matching;
  }
  const price = await stripe.prices.create({
    product: productId,
    custom_unit_amount: { enabled: true, minimum: min, maximum: max },
    currency: "eur",
    metadata: { product_key: productKey },
  });
  console.log("  + Created custom price: " + productKey + " (€" + min / 100 + "–€" + max / 100 + ", " + price.id + ")");
  return price;
}

async function main() {
  console.log("Stripe Product Setup\n");

  const envLines: string[] = [];

  for (const spec of BLOCK_PRODUCTS) {
    const product = await findOrCreateProduct(spec);
    const price = await findOrCreatePrice(product.id, spec.amountEur * 100, spec.productKey);
    const envName = "STRIPE_PRICE_" + spec.productKey.toUpperCase();
    envLines.push(envName + "=" + price.id);
  }

  const customProduct = await findOrCreateProduct({
    productKey: CUSTOM_VOUCHER_PRODUCT.productKey,
    name: CUSTOM_VOUCHER_PRODUCT.name,
    description: CUSTOM_VOUCHER_PRODUCT.description,
  });
  const customPrice = await findOrCreateCustomPrice(
    customProduct.id,
    CUSTOM_VOUCHER_PRODUCT.productKey,
    CUSTOM_VOUCHER_PRODUCT.minAmountCents,
    CUSTOM_VOUCHER_PRODUCT.maxAmountCents,
  );
  envLines.push("STRIPE_PRICE_VOUCHER_CUSTOM=" + customPrice.id);

  console.log("\n=== Add these to your .env.local ===\n");
  console.log(envLines.join("\n"));
  console.log("\n");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
