const schemaData = {
  "@context": "https://schema.org",
  "@type": "HealthAndBeautyBusiness",
  name: "Heilmasseur Domenic Hacker",
  description:
    "Diplomierter Heilmasseur in Wien 1080. Heilmassage, Lymphdrainage & Klassische Massage.",
  url: "https://heilmasseur-domenic.at",
  telephone: "+4367018952556",
  email: "praxis@heilmasseur-domenic.at",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Feldgasse 3/20",
    addressLocality: "Wien",
    postalCode: "1080",
    addressRegion: "Wien",
    addressCountry: "AT",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 48.211,
    longitude: 16.349,
  },
  priceRange: "$$",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    description: "Nach Vereinbarung",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Massagen",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Heilmassage" },
        priceSpecification: {
          "@type": "PriceSpecification",
          price: "55",
          priceCurrency: "EUR",
          description: "Ab 30 Minuten",
        },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Lymphdrainage" },
        priceSpecification: {
          "@type": "PriceSpecification",
          price: "55",
          priceCurrency: "EUR",
          description: "Ab 30 Minuten",
        },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Klassische Massage" },
        priceSpecification: {
          "@type": "PriceSpecification",
          price: "55",
          priceCurrency: "EUR",
          description: "Ab 30 Minuten",
        },
      },
    ],
  },
};

// Static JSON-LD structured data for SEO — contains only hardcoded business info, no user input
export function JsonLd() {
  const jsonString = JSON.stringify(schemaData);
  return <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: jsonString }} />;
}
