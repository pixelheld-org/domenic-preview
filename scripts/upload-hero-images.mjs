import { createClient } from "@sanity/client";
import { createReadStream } from "fs";
import path from "path";

const client = createClient({
  projectId: "vm9l1skm",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_TOKEN,
});

const IMAGES_DIR = path.resolve("public/images");

async function uploadAndPatch(filename, docId, fieldName) {
  const filePath = path.join(IMAGES_DIR, filename);
  const asset = await client.assets.upload("image", createReadStream(filePath), { filename });
  console.log(`  uploaded: ${filename} -> ${asset._id}`);
  await client.patch(docId).set({
    [fieldName]: { _type: "image", asset: { _type: "reference", _ref: asset._id } },
  }).commit();
  console.log(`  patched: ${docId}.${fieldName}`);
}

console.log("Uploading hero images...\n");
await uploadAndPatch("domenic-1080.webp", "homePage", "heroBackgroundImage");
await uploadAndPatch("hero-portrait.png", "homePage", "heroPortraitImage");
console.log("\n Done!");
