import { defineField, defineType } from "sanity";

export const mobileMassagePageSchema = defineType({
  name: "mobileMassagePage",
  title: "Mobile Massage Wien",
  type: "document",
  fields: [
    // ── Hero ──────────────────────────────────────────────────
    defineField({
      name: "heroBadge",
      title: "Hero — Badge",
      type: "string",
      initialValue: "Hausbesuch in ganz Wien",
      group: "hero",
    }),
    defineField({
      name: "heroHeading",
      title: "Hero — Überschrift",
      type: "string",
      initialValue: "Mobile Massage – nachhaltige Entspannung bei Ihnen zuhause",
      group: "hero",
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero — Untertitel",
      type: "text",
      rows: 3,
      initialValue:
        "Ich komme zu Ihnen – mit Liege, Ölen und Handtüchern. Sie kümmern sich um nichts außer Ihrer Entspannung. Therapeutische Massage auf Praxisniveau, in Ihren eigenen vier Wänden oder im Hotel.",
      group: "hero",
    }),
    defineField({
      name: "heroServiceLine",
      title: "Hero — Service-Zeile (VIP-Badge)",
      type: "string",
      initialValue: "Hotel & VIP-Service auf Anfrage",
      group: "hero",
    }),
    defineField({
      name: "heroImage",
      title: "Hero — Bild",
      type: "image",
      options: { hotspot: true },
      group: "hero",
    }),

    // ── Preis ─────────────────────────────────────────────────
    defineField({
      name: "priceHeading",
      title: "Preis — Überschrift",
      type: "string",
      initialValue: "Klarer Preis. Sie wählen die Dauer.",
      group: "price",
    }),
    defineField({
      name: "priceDescription",
      title: "Preis — Beschreibung",
      type: "text",
      rows: 3,
      initialValue:
        "Ein Hausbesuch beginnt beim Preis für die kürzere Behandlung; für die längere kommt ein Aufpreis dazu. Was für Sie anfällt, steht hier – und ich bestätige es in meiner Antwort, bevor der Termin fix ist.",
      group: "price",
    }),
    defineField({
      name: "priceTiers",
      title: "Preis — Dauer & Betrag",
      description:
        "Eine Zeile je Behandlungsdauer. Der niedrigste Betrag ist automatisch der „ab“-Preis, der oben in der Hero-Section steht. Betrag leer lassen = „auf Anfrage“.",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "duration",
              title: "Dauer",
              description: 'z. B. „60 Minuten“',
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "amount",
              title: "Preis in €",
              description: "Leer lassen, solange der Preis noch nicht feststeht.",
              type: "number",
              validation: (Rule) => Rule.min(0),
            }),
          ],
          preview: {
            select: { title: "duration", subtitle: "amount" },
            prepare: ({ title, subtitle }) => ({
              title,
              subtitle:
                typeof subtitle === "number" ? `${subtitle} €` : "auf Anfrage",
            }),
          },
        },
      ],
      initialValue: [
        { _key: "tier-60", duration: "60 Minuten", amount: 120 },
        { _key: "tier-90", duration: "90 Minuten" },
      ],
      validation: (Rule) => Rule.min(1),
      group: "price",
    }),
    defineField({
      name: "priceNote",
      title: "Preis — Hinweis",
      type: "text",
      rows: 3,
      initialValue:
        "Für Adressen außerhalb Wiens kann ein Anfahrtsaufschlag dazukommen. Den nenne ich Ihnen immer vorab, bevor der Termin fix ist.",
      group: "price",
    }),

    // ── Was ich mitbringe ─────────────────────────────────────
    defineField({
      name: "includedHeading",
      title: "Ausstattung — Überschrift",
      type: "string",
      initialValue: "Ich bringe alles mit",
      group: "included",
    }),
    defineField({
      name: "includedDescription",
      title: "Ausstattung — Beschreibung",
      type: "text",
      rows: 3,
      initialValue:
        "Nichts besorgen, nichts umräumen, nichts vorbereiten. Ein freier Platz von etwa zwei mal zwei Metern genügt – der Rest kommt mit mir.",
      group: "included",
    }),
    defineField({
      name: "included",
      title: "Ausstattung — Karten",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "Titel", type: "string" }),
            defineField({
              name: "description",
              title: "Beschreibung",
              type: "text",
              rows: 3,
            }),
          ],
          preview: { select: { title: "title", subtitle: "description" } },
        },
      ],
      initialValue: [
        {
          _key: "included-1",
          title: "Professionelle Massageliege",
          description:
            "Stabil, gepolstert, mit Nackenstütze – klappbar, aber auf Praxisniveau.",
        },
        {
          _key: "included-2",
          title: "Hochwertige Öle",
          description:
            "Hautverträglich und dezent im Duft. Auf Wunsch neutral und unparfümiert.",
        },
        {
          _key: "included-3",
          title: "Frische Handtücher & Auflagen",
          description:
            "Für jeden Termin frisch gewaschen. Ihre eigenen Textilien bleiben im Schrank.",
        },
        {
          _key: "included-4",
          title: "Ruhe nach Ihrem Maß",
          description:
            "Leise Musik oder Stille, viel Gespräch oder gar keines – Sie geben den Ton vor.",
        },
      ],
      group: "included",
    }),

    // ── Für wen / Anlässe ─────────────────────────────────────
    defineField({
      name: "forWhomHeading",
      title: "Für wen — Überschrift",
      type: "string",
      initialValue: "Wann zuhause die bessere Wahl ist",
      group: "forWhom",
    }),
    defineField({
      name: "forWhomDescription",
      title: "Für wen — Beschreibung",
      type: "text",
      rows: 3,
      initialValue:
        "Oft ist der Weg zur Praxis der Grund, warum ein Termin nicht zustande kommt. Wer danach nicht mehr in die U-Bahn steigen muss, entspannt tiefer – und bleibt länger entspannt.",
      group: "forWhom",
    }),
    defineField({
      name: "occasions",
      title: "Für wen — Anlass-Tags",
      type: "array",
      of: [{ type: "string" }],
      initialValue: [
        "Nach langen Arbeitstagen",
        "Hotelaufenthalt in Wien",
        "Nach Fernflügen",
        "Eingeschränkte Mobilität",
        "Junge Eltern",
        "Als Geschenk",
      ],
      group: "forWhom",
    }),

    // ── Ablauf ────────────────────────────────────────────────
    defineField({
      name: "processHeading",
      title: "Ablauf — Überschrift",
      type: "string",
      initialValue: "So läuft ein Hausbesuch ab",
      group: "process",
    }),
    defineField({
      name: "processDescription",
      title: "Ablauf — Beschreibung",
      type: "text",
      rows: 3,
      initialValue:
        "Diskret, pünktlich und ohne Aufwand für Sie – vom Klingeln bis zum Abbau.",
      group: "process",
    }),
    defineField({
      name: "processSteps",
      title: "Ablauf — Schritte",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "Titel", type: "string" }),
            defineField({
              name: "description",
              title: "Beschreibung",
              type: "text",
              rows: 3,
            }),
          ],
          preview: { select: { title: "title", subtitle: "description" } },
        },
      ],
      initialValue: [
        {
          _key: "step-1",
          title: "Anfrage & Termin",
          description:
            "Sie nennen mir Adresse, Wunschtermin und ob 60 oder 90 Minuten. Ich bestätige Termin und Preis verbindlich.",
        },
        {
          _key: "step-2",
          title: "Ankunft & Aufbau",
          description:
            "Ich komme pünktlich, Sie zeigen mir den Platz. Die Liege steht in wenigen Minuten – leise und ohne Umräumen.",
        },
        {
          _key: "step-3",
          title: "Die Behandlung",
          description:
            "Ein kurzes Gespräch über Beschwerden und Druck, danach 60 oder 90 Minuten konzentrierte Arbeit dort, wo Sie sie brauchen.",
        },
        {
          _key: "step-4",
          title: "Nachklingen lassen",
          description:
            "Nach der Behandlung baue ich die Liege ab und verabschiede mich. Sie müssen nirgendwohin – Sie bleiben, wo Sie sind, und lassen die Wirkung nachklingen.",
        },
      ],
      group: "process",
    }),

    // ── Hotel & VIP ───────────────────────────────────────────
    defineField({
      name: "vipHeading",
      title: "VIP — Überschrift",
      type: "string",
      initialValue: "Hotel, Suite, Backstage",
      group: "vip",
    }),
    defineField({
      name: "vipText",
      title: "VIP — Text",
      type: "text",
      rows: 4,
      initialValue:
        "Für Gäste in Wiener Hotels, für Künstlerinnen und Künstler auf Tour und für alle, die einen diskreten Termin brauchen: Auf Anfrage behandle ich auch im Hotelzimmer, in der Suite oder backstage – auch spät nach der Show.",
      group: "vip",
    }),
    defineField({
      name: "vipPoints",
      title: "VIP — Punkte",
      type: "array",
      of: [{ type: "string" }],
      initialValue: [
        "Behandlung im Hotelzimmer, in der Suite oder backstage",
        "Absolute Diskretion",
        "Termine auch spätabends und am Wochenende",
        "Auf Wunsch Abrechnung über Rezeption oder Management",
      ],
      group: "vip",
    }),

    // ── Social Proof ──────────────────────────────────────────
    defineField({
      name: "socialProofEyebrow",
      title: "Social Proof — Eyebrow",
      type: "string",
      initialValue: "Auf der Bühne",
      group: "socialProof",
    }),
    defineField({
      name: "socialProofHeading",
      title: "Social Proof — Überschrift",
      type: "string",
      initialValue: "Therapeutisch fundiert, geprägt von der Bühne",
      group: "socialProof",
    }),
    defineField({
      name: "socialProofText",
      title: "Social Proof — Text",
      type: "text",
      rows: 4,
      initialValue:
        "Seit meiner Jugend stehe ich als B-Boy auf der Bühne. Wer so trainiert, lernt früh, wie ein Körper unter Belastung funktioniert – und was er braucht, um sich wieder zu lösen. Diese Erfahrung fließt in jeden Handgriff: präzise, rhythmisch und mit Gefühl für den richtigen Druck zur richtigen Zeit.",
      group: "socialProof",
    }),
    defineField({
      name: "socialProofImage",
      title: "Social Proof — Bild",
      type: "image",
      options: { hotspot: true },
      group: "socialProof",
    }),
    defineField({
      name: "socialProofCaption",
      title: "Social Proof — Bildunterschrift",
      type: "string",
      description:
        "Bildunterschrift unter dem Foto, z. B. Name und Anlass. Leer = Standardtext.",
      group: "socialProof",
    }),

    // ── Einzugsgebiet ─────────────────────────────────────────
    defineField({
      name: "areaHeading",
      title: "Einzugsgebiet — Überschrift",
      type: "string",
      initialValue: "In ganz Wien",
      group: "area",
    }),
    defineField({
      name: "areaDescription",
      title: "Einzugsgebiet — Beschreibung",
      type: "text",
      rows: 3,
      initialValue:
        "Ausgangspunkt ist meine Praxis in der Josefstadt. In den Innenbezirken bin ich oft noch am selben oder nächsten Tag bei Ihnen; alle übrigen Bezirke – von Floridsdorf über Donaustadt bis Liesing – nach Vereinbarung.",
      group: "area",
    }),
    defineField({
      name: "areaDistricts",
      title: "Einzugsgebiet — Bezirke / Gebiete",
      description:
        "Leer lassen, solange du in ganz Wien unterwegs bist – dann steht auf der Seite nur „In ganz Wien“. Trägst du hier Bezirke ein (z. B. „1010“ oder „1010 Innere Stadt“), erscheinen sie als Liste und die Seite sagt damit: nur diese Bezirke.",
      type: "array",
      of: [{ type: "string" }],
      group: "area",
    }),

    // ── FAQs ──────────────────────────────────────────────────
    defineField({
      name: "faqs",
      title: "Häufige Fragen (Mobile Massage)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "question", title: "Frage", type: "string" }),
            defineField({
              name: "answer",
              title: "Antwort",
              type: "text",
              rows: 5,
            }),
          ],
          preview: { select: { title: "question" } },
        },
      ],
      initialValue: [
        {
          _key: "faq-1",
          question: "Was kostet eine mobile Massage in Wien?",
          answer:
            "Ein Hausbesuch startet bei 120 € für 60 Minuten. Für 90 Minuten kommt ein Aufpreis dazu – den nenne ich Ihnen bei der Anfrage. Die Anfahrt innerhalb Wiens ist enthalten; bei Adressen außerhalb Wiens kann ein Anfahrtsaufschlag dazukommen, den ich Ihnen vor der Terminbestätigung nenne.",
        },
        {
          _key: "faq-7",
          question: "Zahlt die Krankenkasse eine mobile Massage?",
          answer:
            "Ein Hausbesuch wird als private Leistung abgerechnet und von den gesetzlichen Kassen nicht erstattet. Wenn Ihnen eine Rückerstattung wichtig ist, ist die Heilmassage mit ärztlicher Verordnung in der Praxis der passendere Weg – Details dazu auf der Preise-Seite.",
        },
        {
          _key: "faq-2",
          question: "Was muss ich für den Termin zuhause vorbereiten?",
          answer:
            "Nichts. Ich bringe Massageliege, Öle und frische Handtücher mit. Sie brauchen nur einen freien Platz von etwa zwei mal zwei Metern – Wohnzimmer, Schlafzimmer oder Büro funktionieren alle gleich gut.",
        },
        {
          _key: "faq-3",
          question: "Wie viel Platz braucht die Massageliege?",
          answer:
            "Die Liege ist rund 190 cm lang und 70 cm breit. Damit ich rundherum arbeiten kann, sind etwa zwei mal zwei Meter ideal. Wenn Sie unsicher sind, schicken Sie mir vorab ein Foto des Raums – dann klären wir das in einer Minute.",
        },
        {
          _key: "faq-4",
          question: "Kommen Sie auch ins Hotel?",
          answer:
            "Ja. Hotelzimmer und Suiten sind auf Anfrage möglich, ebenso Termine außerhalb der üblichen Zeiten. Bitte geben Sie bei der Anfrage Hotel, Zimmernummer und Ihren Wunschtermin an, damit ich mich an der Rezeption anmelden kann.",
        },
        {
          _key: "faq-5",
          question: "Welche Massage bekomme ich beim Hausbesuch?",
          answer:
            "Dieselbe Arbeit wie in der Praxis: klassische Massage, Heilmassage-Techniken und gezielte Behandlung von Verspannungen – abgestimmt auf das, was Ihr Körper an diesem Tag braucht. Nur Anwendungen mit Geräten sind zuhause nicht möglich.",
        },
        {
          _key: "faq-6",
          question: "Wie kurzfristig kann ich einen Hausbesuch buchen?",
          answer:
            "In den Innenbezirken geht oft noch etwas am selben oder am nächsten Tag. Für Wunschtermine am Abend oder am Wochenende melden Sie sich am besten ein paar Tage vorher.",
        },
      ],
      group: "faqs",
    }),

    // ── CTA ───────────────────────────────────────────────────
    defineField({
      name: "ctaHeading",
      title: "CTA — Überschrift",
      type: "string",
      initialValue: "Entspannung kommt zu Ihnen",
      group: "cta",
    }),
    defineField({
      name: "ctaText",
      title: "CTA — Text",
      type: "text",
      rows: 2,
      initialValue:
        "Nennen Sie mir Adresse und Wunschzeit – den Rest übernehme ich. Schreiben Sie mir oder rufen Sie an.",
      group: "cta",
    }),
  ],
  groups: [
    { name: "hero", title: "Hero" },
    { name: "price", title: "Preis" },
    { name: "included", title: "Ausstattung" },
    { name: "forWhom", title: "Für wen" },
    { name: "process", title: "Ablauf" },
    { name: "vip", title: "Hotel & VIP" },
    { name: "socialProof", title: "Social Proof" },
    { name: "area", title: "Einzugsgebiet" },
    { name: "faqs", title: "FAQs" },
    { name: "cta", title: "CTA" },
  ],
  preview: {
    prepare: () => ({ title: "Mobile Massage Wien" }),
  },
});
