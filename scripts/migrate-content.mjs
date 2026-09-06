import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "vm9l1skm",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_TOKEN,
});

async function createOrReplace(doc) {
  try {
    await client.createOrReplace(doc);
    console.log(`✓ ${doc._type} (${doc._id})`);
  } catch (e) {
    console.error(`✗ ${doc._type} (${doc._id}):`, e.message);
  }
}

// ── Settings (patch existing) ──────────────────────────────────
await client
  .patch("settings")
  .set({
    instagramUrl: "https://www.instagram.com/heilmasseurdomenic",
    googleMapsUrl: "https://maps.google.com/?q=Feldgasse+3,+1080+Wien",
  })
  .commit()
  .then(() => console.log("✓ settings patched"))
  .catch((e) => console.error("✗ settings patch:", e.message));

// ── About (patch existing with new fields) ─────────────────────
await client
  .patch("about")
  .set({
    heroSubtitle:
      "Diplomierter Heilmasseur mit Leidenschaft für Bewegung und gezieltes Arbeiten am Körper.",
    meinWegHighlights: [
      { _key: "h1", title: "Mit Auszeichnung", subtitle: "Abschluss der Ausbildung" },
      { _key: "h2", title: "Reha-Erfahrung", subtitle: "In Rehabilitationsinstituten" },
    ],
    philosophieTexte: [
      "Jeder Körper spricht eine eigene Sprache. Deshalb beginne ich jede Behandlung mit einem kurzen Gespräch: Wo drückt der Schuh? Was soll sich danach anders anfühlen? Erst dann lege ich los — mit der Intensität, die Ihr Körper gerade braucht.",
      "Zu viel Druck löst Schutzmechanismen aus, zu wenig bringt nichts. Mein Ziel ist die goldene Mitte: eine Behandlung, die Sie spüren, ohne Sie zu überfordern.",
      "Meine Breakdance-Vergangenheit hat mir gelehrt, wie Bewegung und Körpergefühl zusammenspielen — dieses Wissen fließt direkt in meine Arbeit ein.",
    ],
    quote:
      "Heilmasseur ist meine Berufung. Ich höre auf den Körper — und dann arbeite ich gezielt dort, wo er es wirklich braucht.",
    quoteAuthorTitle: "Diplomierter Heilmasseur, Wien 1080",
    ctaHeading: "Bereit für Ihre erste Behandlung?",
    ctaText:
      "Buchen Sie jetzt Ihren Termin online – unkompliziert und in wenigen Schritten.",
  })
  .commit()
  .then(() => console.log("✓ about patched"))
  .catch((e) => console.error("✗ about patch:", e.message));

// ── Homepage ───────────────────────────────────────────────────
await createOrReplace({
  _id: "homePage",
  _type: "homePage",
  aboutTeaserBadge: "Über Domenic Hacker",
  aboutTeaserHeading: "Diplomierter Heilmasseur",
  aboutTeaserHeadingAccent: "mit Leidenschaft",
  praxisBadge: "Die Praxis",
  praxisHeading: "Ihr Raum für",
  praxisHeadingAccent: "Erholung",
  praxisDescription:
    "Meine Praxis befindet sich in einem ruhigen Altbau in der Josefstadt — mitten in Wien, aber abseits vom Trubel. Helle Räume, eine angenehme Atmosphäre und alles, was Sie für eine entspannte Behandlung brauchen.",
});

// ── Heilmassage Wien ───────────────────────────────────────────
await createOrReplace({
  _id: "heilmassagePage",
  _type: "heilmassagePage",
  heroBadge: "Wien 1080 · Josefstadt",
  heroHeading: "Heilmassage in 1080 Wien",
  heroSubtitle: "gezielt, wirksam und in der richtigen Intensität",
  forWhomHeading: "Für wen ist das?",
  forWhomDescription:
    "Ob Rückenschmerzen nach langem Sitzen, ein verspannter Nacken oder Muskeln, die nach dem Sport einfach nicht loslassen – wenn Sie sich hier wiedererkennen, sind Sie bei mir richtig.",
  conditions: [
    "Rückenschmerzen",
    "Nacken & Schulter",
    "Verspannungen",
    "Nach dem Sport",
    "Viel Sitzen",
    "Stress",
  ],
  approachHeading: "Mein Schwerpunkt",
  approachDescription:
    "Mein Schwerpunkt liegt auf der passenden Intensität. Durch Erfahrung und ein gutes Gespür finde ich meist genau den richtigen Druck – wirksam, aber ohne unnötigen Schmerz.",
  approachPoints: [
    'Keine Standardmassage – gezielte Behandlung statt „drübermassieren"',
    "Intensität wird laufend angepasst – nicht zu wenig, nicht zu viel",
    "Feedback jederzeit möglich und erwünscht",
    "Erfahrung und ein gutes Gespür für den richtigen Druck",
  ],
  approachBottomText:
    "Keine Massage ist wie die andere. Was Sie bekommen, ist eine Behandlung, die sich an Ihrem Körper und Ihrem Feedback orientiert – nicht an einem Schema.",
  whatIsHeading: "Was ist Heilmassage?",
  whatIsParagraphs: [
    "Heilmassage ist eine medizinisch anerkannte Behandlung, die gezielt bei Beschwerden wie Rückenschmerzen, Verspannungen oder eingeschränkter Beweglichkeit eingesetzt wird. Im Unterschied zur Wellnessmassage steht hier der therapeutische Nutzen im Vordergrund — durchgeführt von einem diplomierten Heilmasseur.",
    "Ich arbeite systematisch und passe die Intensität laufend an Ihren Körper an. Jede Behandlung beginnt mit einem kurzen Gespräch: Wo sind die Beschwerden? Was soll sich danach anders anfühlen? Erst dann lege ich los — mit dem Druck, den Ihr Körper gerade braucht.",
    "Neben Heilmassage biete ich auch klassische Massage und Lymphdrainage an — sprechen Sie mich gerne an.",
  ],
  effectsHeading: "Was Massage bewirkt",
  effectsDescription:
    "Gezielt eingesetzt erzielt Massage messbare Ergebnisse – nicht nur im Moment, sondern nachhaltig.",
  effects: [
    {
      _key: "e1",
      title: "Löst Verspannungen",
      description:
        "Verhärtetes Gewebe wird gezielt gelockert und die Muskulatur entspannt – nicht nur oberflächlich, sondern in der Tiefe.",
    },
    {
      _key: "e2",
      title: "Lindert Schmerzen",
      description:
        "Gezielte Behandlung der Schmerzpunkte – wirksam, ohne unnötigen Druck. Viele berichten schon nach der ersten Behandlung von spürbarer Erleichterung.",
    },
    {
      _key: "e3",
      title: "Verbessert Beweglichkeit",
      description:
        "Mehr Spielraum in Gelenken und Muskeln nach der Behandlung. Besonders spürbar bei Schulter, Nacken und Rücken.",
    },
    {
      _key: "e4",
      title: "Unterstützt Regeneration",
      description:
        "Bessere Durchblutung, schnellere Erholung – vor allem nach sportlicher Belastung oder nach langen Arbeitstagen am Schreibtisch.",
    },
  ],
  locationHeading: "Heilmassage Wien 1080 – Josefstadt",
  locationDescription:
    "Die Praxis liegt im Herzen des 8. Bezirks – einer der ruhigeren, grünen Ecken Wiens, direkt an der U3 und mehreren Straßenbahnlinien.",
  transportInfo: [
    { _key: "t1", label: "U-Bahn", value: "U2 – Station Rathaus" },
    { _key: "t2", label: "Straßenbahn", value: "Linien J · 5 · 33" },
    { _key: "t3", label: "Parken", value: "Parkplätze in der Umgebung" },
  ],
  faqs: [
    {
      _key: "f1",
      question: "Was ist der Unterschied zwischen Heilmassage und einer normalen Massage?",
      answer:
        "Eine Heilmassage ist eine medizinisch anerkannte Behandlung, die gezielt auf Beschwerden wie Rückenschmerzen, Verspannungen oder eingeschränkte Beweglichkeit abzielt – durchgeführt von einem diplomierten Heilmasseur. Eine Wellnessmassage dient primär der Entspannung. Bei mir steht der therapeutische Nutzen im Vordergrund – Entspannung ist ein angenehmer Nebeneffekt.",
    },
    {
      _key: "f2",
      question: "Wie viele Termine brauche ich bis zur Verbesserung?",
      answer:
        "Das hängt stark von Ihren Beschwerden ab. Akute Verspannungen lassen sich oft schon in 2–3 Terminen deutlich verbessern. Bei chronischen Beschwerden empfehle ich regelmäßigere Behandlungen. Das besprechen wir beim ersten Termin – ganz ohne Verpflichtung.",
    },
    {
      _key: "f3",
      question: "Tut eine Heilmassage weh?",
      answer:
        "Das Ziel ist wirksame Behandlung – nicht Schmerz. Mein Schwerpunkt liegt auf der richtigen Intensität: wirksam, aber ohne unnötigen Druck. Sie können jederzeit sagen, wenn Ihnen etwas zu viel oder zu wenig ist – ich passe mich sofort an.",
    },
    {
      _key: "f4",
      question: "Muss ich etwas zur Behandlung mitbringen?",
      answer:
        "Nein, alles Notwendige ist in der Praxis vorhanden. Kommen Sie einfach pünktlich – und wenn möglich mit einem kurzen Überblick über Ihre aktuellen Beschwerden, damit wir gleich gezielt loslegen können.",
    },
    {
      _key: "f5",
      question: "Kann ich die Heilmassage bei der Krankenkasse einreichen?",
      answer:
        "Als diplomierter Heilmasseur bin ich gewerblich tätig. Die öffentliche Krankenkasse übernimmt die Kosten in der Regel nicht direkt. Manche privaten Zusatzversicherungen erstatten Heilmassagen teilweise – bitte erkundigen Sie sich direkt bei Ihrer Versicherung.",
    },
    {
      _key: "f6",
      question: "Wie finde ich die Praxis in Wien 1080?",
      answer:
        "Die Praxis liegt in der Feldgasse 3/20 im 8. Bezirk (Josefstadt). Gut erreichbar mit der U2 (Station Rathaus) oder mit der Straßenbahn J, 5 oder 33. Parkplätze sind in der unmittelbaren Umgebung vorhanden.",
    },
  ],
  ctaHeading: "Bereit für eine Behandlung?",
  ctaText:
    "Termin direkt online buchen – oder melden Sie sich, wenn Sie vorher Fragen haben.",
});

// ── Buchen ─────────────────────────────────────────────────────
await createOrReplace({
  _id: "buchenPage",
  _type: "buchenPage",
  heading: "Termin online buchen —",
  headingAccent: "schnell & unkompliziert",
  subtitle: "In 3 einfachen Schritten zu Ihrem Termin",
  steps: [
    { _key: "s1", number: "1", text: "Behandlung auswählen" },
    { _key: "s2", number: "2", text: "Wunschtermin wählen" },
    { _key: "s3", number: "3", text: "Kontaktdaten eingeben" },
  ],
  successHeading: "Termin erfolgreich gebucht!",
  successText: "Sie erhalten in Kürze eine Bestätigung per E-Mail.",
  infoHeading: "So finden Sie",
  infoHeadingAccent: "die Praxis",
  infoDescription:
    "Die Praxis befindet sich im 8. Bezirk (Josefstadt) und ist mit öffentlichen Verkehrsmitteln gut erreichbar.",
  accessibilityFeatures: [
    "Barrierefreier Zugang",
    "Parkplätze in der Nähe",
    "U-Bahn Rathaus (U2) in 5 Min.",
  ],
  googleMapsEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2658.6!2d16.349!3d48.211!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sFeldgasse+3%2C+1080+Wien!5e0!3m2!1sde!2sat!4v1",
});

// ── Impressum ──────────────────────────────────────────────────
await createOrReplace({
  _id: "impressumPage",
  _type: "impressumPage",
  sections: [
    {
      _key: "s1",
      heading: "Angaben gemäß § 5 ECG / § 25 MedienG",
      content:
        "Domenic Hacker\nDiplomierter medizinischer Masseur und Heilmasseur\nFeldgasse 3/20\n1080 Wien, Österreich",
    },
    {
      _key: "s2",
      heading: "Kontakt",
      content: "Telefon: +43 670 189 52 56\nE-Mail: praxis@heilmasseur-domenic.at",
    },
    {
      _key: "s3",
      heading: "Berufsbezeichnung",
      content:
        "Diplomierter medizinischer Masseur und Heilmasseur\nBerufsbezeichnung verliehen in: Österreich",
    },
    {
      _key: "s4",
      heading: "Zuständige Aufsichtsbehörde",
      content:
        "Bezirkshauptmannschaft / Magistrat Wien\nGewerbebehörde: Magistratisches Bezirksamt für den 8. Bezirk",
    },
    {
      _key: "s5",
      heading: "Kammerzugehörigkeit",
      content:
        "Wirtschaftskammer Wien (WKO)\nFachgruppe der persönlichen Dienstleister",
    },
    {
      _key: "s6",
      heading: "Anwendbare Rechtsvorschriften",
      content:
        "Medizinischer Masseur- und Heilmasseurgesetz (MMHmG)\nGewerbeordnung (GewO)\nZugänglich unter: ris.bka.gv.at",
    },
    {
      _key: "s7",
      heading: "Streitschlichtung",
      content:
        "Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: ec.europa.eu/consumers/odr/",
    },
    {
      _key: "s8",
      heading: "Haftungsausschluss",
      content:
        "Die Inhalte dieser Website wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte kann jedoch keine Gewähr übernommen werden.",
    },
  ],
});

// ── Datenschutz ────────────────────────────────────────────────
await createOrReplace({
  _id: "datenschutzPage",
  _type: "datenschutzPage",
  lastUpdated: "09.04.2026",
  sections: [
    {
      _key: "d1",
      heading: "1. Verantwortlicher",
      content:
        "Verantwortlicher im Sinne der DSGVO:\n\nDomenic Hacker\nDiplomierter medizinischer Masseur und Heilmasseur\nFeldgasse 3/20\n1080 Wien, Österreich\n\nTelefon: +43 670 189 52 56\nE-Mail: praxis@heilmasseur-domenic.at",
    },
    {
      _key: "d2",
      heading: "2. Erhobene Daten und Verarbeitungszwecke",
      content: "",
      subsections: [
        {
          _key: "d2a",
          heading: "2.1 Website-Nutzungsdaten",
          content:
            "Beim Besuch unserer Website werden automatisch technische Daten erhoben (IP-Adresse, Browsertyp, Betriebssystem, Referrer-URL, Zugriffszeitpunkt). Diese werden für den technischen Betrieb der Website benötigt.\nRechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigte Interessen).",
        },
        {
          _key: "d2b",
          heading: "2.2 Terminbuchung",
          content:
            "Für die Online-Terminbuchung nutzen wir den Dienst Calendly. Bei der Buchung werden Ihr Name, Ihre E-Mail-Adresse und ggf. Telefonnummer an Calendly übermittelt. Calendly verarbeitet diese Daten in unserem Auftrag.\nRechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (Vertragsanbahnung).",
        },
        {
          _key: "d2c",
          heading: "2.3 Kontaktaufnahme",
          content:
            "Bei Kontaktaufnahme per E-Mail oder Telefon werden Ihre Angaben zur Bearbeitung der Anfrage und für mögliche Anschlussfragen gespeichert.\nRechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigte Interessen).",
        },
      ],
    },
    {
      _key: "d3",
      heading: "3. Verwendete Dienste",
      content: "",
      subsections: [
        {
          _key: "d3a",
          heading: "Hosting (Vercel)",
          content:
            "Diese Website wird bei Vercel Inc. gehostet. Bei jedem Zugriff werden automatisch Server-Logfiles gespeichert. Vercel verarbeitet Daten auch in den USA; die Übermittlung erfolgt auf Basis der EU-Standardvertragsklauseln.",
        },
        {
          _key: "d3b",
          heading: "Google Analytics",
          content:
            "Diese Website nutzt Google Analytics zur Analyse der Website-Nutzung. Die IP-Adresse wird vor der Speicherung anonymisiert. Die Datenverarbeitung erfolgt auf Grundlage Ihrer Einwilligung über den Cookie-Banner. Sie können der Datenerfassung jederzeit widersprechen, indem Sie Ihre Cookie-Einstellungen anpassen.\nRechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO (Einwilligung).",
        },
        {
          _key: "d3c",
          heading: "Google Tag Manager",
          content:
            "Wir nutzen den Google Tag Manager zur Verwaltung unserer Tracking-Tools. Der Tag Manager selbst erfasst keine personenbezogenen Daten.",
        },
        {
          _key: "d3d",
          heading: "Google Fonts",
          content:
            "Diese Website verwendet Google Fonts, die lokal eingebunden werden. Es findet keine Verbindung zu Google-Servern statt.",
        },
        {
          _key: "d3e",
          heading: "Calendly",
          content:
            "Für die Terminbuchung wird Calendly eingebunden. Beim Laden des Buchungsformulars werden Daten an Calendly Inc. (USA) übermittelt. Die Übermittlung erfolgt auf Basis der EU-Standardvertragsklauseln.",
        },
        {
          _key: "d3f",
          heading: "Google Places API",
          content:
            "Zur Darstellung von Google-Bewertungen nutzen wir die Google Places API. Dabei werden serverseitig Bewertungsdaten von Google abgerufen. Es werden keine personenbezogenen Daten der Website-Besucher an Google übermittelt.",
        },
        {
          _key: "d3g",
          heading: "Sanity CMS",
          content:
            "Für die Verwaltung von Inhalten nutzen wir Sanity.io als Content-Management-System. Sanity verarbeitet keine personenbezogenen Daten der Website-Besucher.",
        },
      ],
    },
    {
      _key: "d4",
      heading: "4. Cookies",
      content:
        'Diese Website verwendet Cookies. Technisch notwendige Cookies werden ohne Einwilligung gesetzt. Analyse-Cookies (z.B. Google Analytics) werden nur mit Ihrer ausdr\u00fccklichen Einwilligung \u00fcber den Cookie-Banner gesetzt. Sie k\u00f6nnen Ihre Cookie-Einstellungen jederzeit \u00fcber den Link \u201eCookie-Einstellungen\u201c im Footer dieser Website anpassen.',
    },
    {
      _key: "d5",
      heading: "5. Speicherdauer",
      content:
        "Wir speichern personenbezogene Daten nur so lange, wie es für die jeweiligen Zwecke erforderlich ist oder gesetzliche Aufbewahrungspflichten bestehen:\n\n• Terminbuchungsdaten: 1 Jahr nach dem Termin\n• Kontaktanfragen: 2 Jahre nach Abschluss der Korrespondenz\n• Buchhaltungsrelevante Daten: 7 Jahre gemäß österreichischem Steuerrecht\n• Technische Log-Daten: maximal 30 Tage",
    },
    {
      _key: "d6",
      heading: "6. Ihre Rechte",
      content:
        "Sie haben gemäß DSGVO folgende Rechte gegenüber dem Verantwortlichen:\n\n• Auskunftsrecht (Art. 15 DSGVO)\n• Berichtigungsrecht (Art. 16 DSGVO)\n• Löschungsrecht (Art. 17 DSGVO)\n• Einschränkung der Verarbeitung (Art. 18 DSGVO)\n• Datenübertragbarkeit (Art. 20 DSGVO)\n• Widerspruchsrecht (Art. 21 DSGVO)\n• Widerrufsrecht (Art. 7 Abs. 3 DSGVO)\n\nZur Ausübung dieser Rechte wenden Sie sich bitte an: praxis@heilmasseur-domenic.at\n\nSie haben außerdem das Recht, sich bei der zuständigen Datenschutzbehörde zu beschweren:\n\nÖsterreichische Datenschutzbehörde\nBarichgasse 40–42\n1030 Wien\nE-Mail: dsb@dsb.gv.at\nWebsite: www.dsb.gv.at",
    },
    {
      _key: "d7",
      heading: "7. Datensicherheit",
      content:
        "Wir setzen technische und organisatorische Sicherheitsmaßnahmen ein, um Ihre Daten gegen Manipulationen, Verlust, Zerstörung oder unbefugten Zugriff zu schützen. Alle Datenübertragungen erfolgen verschlüsselt (TLS/HTTPS).",
    },
    {
      _key: "d8",
      heading: "8. Aktualität und Änderungen",
      content:
        "Diese Datenschutzerklärung wurde zuletzt am 09.04.2026 aktualisiert. Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie stets den aktuellen rechtlichen Anforderungen entspricht.",
    },
  ],
});

// ── Cleanup: delete the orphan homePage draft created by MCP ───
try {
  await client.delete("drafts.1fdf1888-3bc6-44a2-a4bd-039c7a7656aa");
  console.log("✓ orphan draft deleted");
} catch (e) {
  // ignore if already gone
}

console.log("\n✅ Content migration complete!");
