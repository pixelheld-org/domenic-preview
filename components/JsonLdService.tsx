const BASE_URL = "https://heilmasseur-domenic.at";

const PROVIDER = {
  "@type": "LocalBusiness",
  name: "Heilmasseur Domenic Hacker",
  url: BASE_URL,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Feldgasse 3/20",
    addressLocality: "Wien",
    postalCode: "1080",
    addressCountry: "AT",
  },
} as const;

const AREA_SERVED = {
  "@type": "City",
  name: "Wien",
} as const;

const VARIANT_DATA = {
  overview: {
    name: "Heilmassage & Sportmassage Wien 1080",
    description:
      "Diplomierte Heilmassage und Sportmassage in Wien 1080 (Josefstadt). Heilmassage, Lymphdrainage, Klassische Massage, Sportmassage — individuell auf den Bedarf abgestimmt.",
    serviceType: "Massage",
    priceRange: "€55–€85",
  },
  heilmassage: {
    name: "Heilmassage Wien 1080",
    description:
      "Heilmassage in Wien 1080 (Josefstadt) – gezielt, wirksam und in der richtigen Intensität bei Rückenschmerzen, Verspannungen und chronischen Beschwerden. Diplomierter Heilmasseur, je nach Krankenkasse teilweise erstattbar.",
    serviceType: "Heilmassage",
    priceRange: "€55–€85",
  },
  sportmassage: {
    name: "Sportmassage Wien 1080",
    description:
      "Sportmassage in Wien 1080 (Josefstadt) – Triggerpunkt-Arbeit, Faszien-Mobilisation und Regeneration für Hobby- und Wettkampfsportler. Wellness- und Trainings-Begleitservice.",
    serviceType: "Sportmassage",
    priceRange: "€55–€85",
  },
} as const;

export type JsonLdServiceVariant = keyof typeof VARIANT_DATA;

export function JsonLdService({
  variant = "overview",
}: {
  variant?: JsonLdServiceVariant;
}) {
  const data = VARIANT_DATA[variant];
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: data.name,
    description: data.description,
    serviceType: data.serviceType,
    priceRange: data.priceRange,
    areaServed: AREA_SERVED,
    provider: PROVIDER,
  };

  return (
    <script type="application/ld+json" suppressHydrationWarning>
      {JSON.stringify(schema).replace(/</g, "\\u003c")}
    </script>
  );
}
