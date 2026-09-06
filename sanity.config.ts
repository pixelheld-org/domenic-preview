import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemas";
import { deskStructure } from "./sanity/deskStructure";
import { RedeemBlockSessionAction, RedeemCustomAmountAction } from "./sanity/studio-actions/redeemVoucherActions";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "abcd1234";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  title: "Heilmasseur Domenic — CMS",
  plugins: [
    structureTool({ structure: deskStructure }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
  document: {
    actions: (prev, context) => {
      if (context.schemaType !== "voucher") return prev;
      // Redeem-Actions zuerst, damit sie als prominenter Primary-Button erscheinen
      // (Sanity zeigt die erste non-null Action als großen Button, Rest im Dropdown).
      return [RedeemBlockSessionAction, RedeemCustomAmountAction, ...prev];
    },
  },
});
