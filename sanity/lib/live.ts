// Isolated preview: reads a published-content snapshot, never the live CMS.
import snapshot from "@/preview-content/site.json";
export async function sanityFetch({ query }: { query: string; params?: Record<string, unknown> }) {
  const type = /_type == "([^"]+)"/.exec(query)?.[1];
  return { data: type ? (snapshot as Record<string, unknown>)[type] ?? null : null };
}
export function SanityLive() { return null; }
