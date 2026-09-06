import { serviceSchema } from "./service";
import { pricingItemSchema } from "./pricingItem";
import { faqItemSchema } from "./faqItem";
import { testimonialSchema } from "./testimonial";
import { aboutSchema } from "./about";
import { voucherSchema } from "./voucher";
import { settingsSchema } from "./settings";
import { homePageSchema } from "./homePage";
import { heilmassagePageSchema } from "./heilmassagePage";
import { sportmassagePageSchema } from "./sportmassagePage";
import { buchenPageSchema } from "./buchenPage";
import { impressumPageSchema } from "./impressumPage";
import { datenschutzPageSchema } from "./datenschutzPage";
import { pricingPageSchema } from "./pricingPage";
import { gutscheinePageSchema } from "./gutscheinePage";
import { blockPricingSchema } from "./blockPricing";

export const schemaTypes = [
  settingsSchema,
  homePageSchema,
  heilmassagePageSchema,
  sportmassagePageSchema,
  pricingPageSchema,
  gutscheinePageSchema,
  blockPricingSchema,
  buchenPageSchema,
  impressumPageSchema,
  datenschutzPageSchema,
  aboutSchema,
  serviceSchema,
  pricingItemSchema,
  faqItemSchema,
  testimonialSchema,
  voucherSchema,
];
