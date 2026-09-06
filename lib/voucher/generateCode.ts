import "server-only";
import { customAlphabet } from "nanoid";
import { createClient } from "next-sanity";

// Alphabet without 0/O/1/I/L for readability
const ALPHABET = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";
const segment = customAlphabet(ALPHABET, 4);

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

// Non-CDN client for uniqueness reads — must see live data, not 60s-cached
const liveReadClient = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion: "2024-01-01",
      useCdn: false,
      token: process.env.SANITY_API_READ_TOKEN,
    })
  : null;

export async function generateUniqueVoucherCode(): Promise<string> {
  if (!liveReadClient) {
    throw new Error("Sanity client is not configured");
  }
  for (let attempt = 0; attempt < 5; attempt++) {
    const code = `GS-${segment()}-${segment()}`;
    const existing = await liveReadClient.fetch<string | null>(
      `*[_type == "voucher" && code == $code][0]._id`,
      { code }
    );
    if (!existing) return code;
  }
  throw new Error("Could not generate unique voucher code after 5 attempts");
}
