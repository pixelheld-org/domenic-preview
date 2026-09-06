import "server-only";
import Stripe from "stripe";

const SECRET = process.env.STRIPE_SECRET_KEY;

if (!SECRET) {
  throw new Error("STRIPE_SECRET_KEY environment variable is not set");
}

export const stripe = new Stripe(SECRET, {
  apiVersion: "2026-04-22.dahlia",
  typescript: true,
});
