import { createClient } from "next-sanity";
import source from "@/preview-content/source.json";
// Public image URL construction only. Page content comes from site.json.
export const client = createClient({ projectId: source.projectId, dataset: source.dataset, apiVersion: "2025-03-01", useCdn: true });
