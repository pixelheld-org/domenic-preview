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
  try {
    const filePath = path.join(IMAGES_DIR, filename);
    const asset = await client.assets.upload("image", createReadStream(filePath), {
      filename,
    });
    console.log(`  uploaded: ${filename} -> ${asset._id}`);

    await client.patch(docId).set({
      [fieldName]: {
        _type: "image",
        asset: { _type: "reference", _ref: asset._id },
      },
    }).commit();
    console.log(`  patched: ${docId}.${fieldName}`);
    return asset._id;
  } catch (e) {
    console.error(`  error ${filename}:`, e.message);
  }
}

console.log("Uploading images and linking to documents...\n");

// Homepage
console.log("── Homepage ──");
await uploadAndPatch("domenic-wien.webp", "homePage", "aboutTeaserImage");
await uploadAndPatch("praxis-interior.png", "homePage", "praxisImage");

// Heilmassage page
console.log("\n── Heilmassage ──");
await uploadAndPatch("heilmassage-wien.webp", "heilmassagePage", "heroImage");
await uploadAndPatch("praxis-interior.png", "heilmassagePage", "approachImage");

// About / Über mich
console.log("\n── Über mich ──");
await uploadAndPatch("domenic-1080.webp", "about", "heroImage");
await uploadAndPatch("breakdance.jpg", "about", "breakdanceImage");
await uploadAndPatch("domenic-1080.webp", "about", "image");

// Services (check if they already have images, upload if not)
console.log("\n── Services ──");
await uploadAndPatch("heilmassage-wien.webp", "service-heilmassage", "image");
await uploadAndPatch("lymphdrainage.webp", "service-lymphdrainage", "image");
await uploadAndPatch("klassische-massage.webp", "service-klassische-massage", "image");

console.log("\n✅ Image upload complete!");
