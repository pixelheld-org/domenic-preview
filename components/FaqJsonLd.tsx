type FaqItem = { q: string; a: string };

const buildFaqSchema = (faqs: FaqItem[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
});

export function FaqJsonLd({ faqs }: { faqs: FaqItem[] }) {
  return (
    <script type="application/ld+json" suppressHydrationWarning>
      {JSON.stringify(buildFaqSchema(faqs)).replace(/</g, "\\u003c")}
    </script>
  );
}
