import Link from "next/link";

export default function VisitenkartenIndex() {
  const variants = [
    {
      id: 1,
      name: "Petrol Solid",
      desc: "Klassisch — Petrol mit Gold-Akzent, Wordmark zentriert, Spa-Feeling",
    },
    {
      id: 2,
      name: "Magazin",
      desc: "Weiß mit großer Petrol-Typo, Coral-Akzent, asymmetrisch wie der Hero",
    },
    {
      id: 3,
      name: "Soft Cream",
      desc: "Cremiger Hintergrund mit Coral-Gold-Verlauf — warm, einladend",
    },
    {
      id: 4,
      name: "Minimalistisch",
      desc: "Viel Weißraum, dünne Petrol-Linien, sehr typografisch",
    },
    {
      id: 5,
      name: "Zwei-Spalten",
      desc: "Petrol-Block links mit Logo, Kontakt rechts auf Weiß",
    },
    {
      id: 6,
      name: "Praxis-Foto",
      desc: "Foto des Behandlungsraums links, Inhalt rechts — wie die Praxis-Section",
    },
    {
      id: 7,
      name: "Card-in-Card",
      desc: "Light-Teal mit weißer innerer Card und Schatten — wie /gutscheine",
    },
    {
      id: 8,
      name: "Hero-Style",
      desc: "Badge oben, große Headline mit Coral-Akzent, Coral-Gold-Streifen",
    },
    {
      id: 9,
      name: "Editorial",
      desc: "Ruhig, kursives Tagline-Zitat, schmaler Petrol-Strich",
    },
    {
      id: 10,
      name: "Portrait",
      desc: "Domenic-Portrait als Hintergrund, dunkles Petrol-Overlay, weißer Text",
    },
  ];

  return (
    <div
      style={{
        fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
        padding: "48px 24px",
        maxWidth: 640,
        margin: "0 auto",
        background: "white",
        borderRadius: 12,
      }}
    >
      <h1
        style={{
          fontSize: 26,
          fontWeight: 800,
          color: "#0d4f4f",
          marginBottom: 8,
          letterSpacing: "-0.3px",
        }}
      >
        Visitenkarten-Varianten
      </h1>
      <p style={{ color: "#555", marginBottom: 28, fontSize: 14, lineHeight: 1.55 }}>
        Wähle eine Variante zur Vorschau. Druckformat: 85&thinsp;×&thinsp;55&thinsp;mm (Standard EU),
        10 Karten passen auf einen A4-Bogen. Beim Drucken:{" "}
        <strong>Cmd&thinsp;/&thinsp;Strg&thinsp;+&thinsp;P</strong> → Papierformat
        85×55&thinsp;mm, Skalierung 100&thinsp;%, Hintergrundgrafiken aktivieren.
      </p>

      <p
        style={{
          fontSize: 12,
          color: "#e8654a",
          margin: "0 0 12px",
          fontWeight: 700,
          letterSpacing: "1.5px",
          textTransform: "uppercase",
        }}
      >
        Alle Varianten — in der Website-CI
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {variants.map((v) => (
          <Link
            key={v.id}
            href={`/visitenkarten/${v.id}`}
            style={{
              display: "block",
              padding: "16px 20px",
              background: "#fdfaf5",
              borderRadius: 12,
              border: "1px solid rgba(232,101,74,0.22)",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <strong style={{ color: "#0d4f4f", fontSize: 15 }}>
              Variante {v.id}: {v.name}
            </strong>
            <br />
            <span style={{ fontSize: 13, color: "#555" }}>{v.desc}</span>
          </Link>
        ))}
      </div>

      <p
        style={{
          marginTop: 32,
          fontSize: 12,
          color: "#777",
          lineHeight: 1.55,
          borderTop: "1px solid #eee",
          paddingTop: 16,
        }}
      >
        Jede Visitenkarte hat eine Vorder- und Rückseite. Daten:
        <br />
        <strong>Domenic Hacker</strong> · Dipl. Heilmasseur &amp; Gew. Masseur ·
        +43 670 189 52 56 · praxis@heilmasseur-domenic.at ·
        Feldgasse 3/20, 1080 Wien
      </p>
    </div>
  );
}
