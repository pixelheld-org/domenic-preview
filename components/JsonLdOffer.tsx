import type { SanityPricingItem } from "@/sanity/lib/queries";

const BASE_URL = "https://heilmasseur-domenic.at";

const FALLBACK_ITEMS: SanityPricingItem[] = [
  {
    _id: "fallback-heilmassage",
    serviceName: "Heilmassage",
    price30: 55,
    price45: 70,
    price60: 85,
    popular: true,
    sortOrder: 0,
  },
  {
    _id: "fallback-lymphdrainage",
    serviceName: "Lymphdrainage",
    price30: 55,
    price45: 70,
    price60: 85,
    popular: false,
    sortOrder: 1,
  },
  {
    _id: "fallback-klassisch",
    serviceName: "Klassische Massage",
    price30: 55,
    price45: 70,
    price60: 85,
    popular: false,
    sortOrder: 2,
  },
];

function buildOffer(serviceName: string, durationMin: number, price: number) {
  return {
    "@type": "Offer",
    itemOffered: {
      "@type": "Service",
      name: serviceName,
      description: `${durationMin}-minütige ${serviceName} in Wien 1080`,
    },
    priceSpecification: {
      "@type": "PriceSpecification",
      price: price.toFixed(2),
      priceCurrency: "EUR",
      description: `${durationMin} Minuten`,
    },
    availability: "https://schema.org/InStock",
    areaServed: { "@type": "City", name: "Wien 1080, Josefstadt" },
    seller: {
      "@type": "LocalBusiness",
      name: "Heilmasseur Domenic Hacker",
      url: BASE_URL,
    },
  };
}

export function JsonLdOffer({
  items,
}: {
  items?: SanityPricingItem[] | null;
}) {
  const data = items && items.length > 0 ? items : FALLBACK_ITEMS;

  const offers = data
    .flatMap((item) => [
      item.price30 ? buildOffer(item.serviceName, 30, item.price30) : null,
      item.price45 ? buildOffer(item.serviceName, 45, item.price45) : null,
      item.price60 ? buildOffer(item.serviceName, 60, item.price60) : null,
    ])
    .filter((x): x is NonNullable<typeof x> => x !== null);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: "Massagen — Preisliste Wien 1080",
    itemListElement: offers,
  };

  return (
    <script type="application/ld+json" suppressHydrationWarning>
      {JSON.stringify(jsonLd).replace(/</g, "\\u003c")}
    </script>
  );
}
