/* Variante 8: Hero-Style — Pill-Badge, große Headline mit Coral-Akzent,
   Coral/Gold-Gradient-Streifen unten. Im Stil des Website-Heros. */

import Image from "next/image";

export default function Gutschein8() {
  return (
    <>
      <div
        className="print-hint"
        style={{
          textAlign: "center",
          padding: "12px",
          fontSize: 13,
          color: "#0d4f4f",
          background: "#f0f7f7",
          maxWidth: 600,
          borderRadius: 8,
        }}
      >
        Zum Drucken: Cmd&thinsp;/&thinsp;Strg&thinsp;+&thinsp;P → A6 quer, Hintergrundgrafiken aktivieren
      </div>

      {/* === VORDERSEITE === */}
      <div className="gutschein-page-label">Vorderseite</div>
      <div
        className="gutschein-page"
        style={{
          background: "white",
          padding: "9mm 11mm 0",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
        }}
      >
        <div>
          <span
            style={{
              display: "inline-block",
              background: "rgba(232,101,74,0.10)",
              color: "#e8654a",
              padding: "1mm 3mm",
              borderRadius: "10mm",
              fontSize: "5.5pt",
              fontWeight: 800,
              letterSpacing: "1px",
              textTransform: "uppercase",
            }}
          >
            Geschenke, die wirklich gut tun
          </span>
          <h1
            style={{
              fontSize: "24pt",
              fontWeight: 900,
              color: "#111",
              margin: "2.5mm 0 0",
              lineHeight: 1.02,
              letterSpacing: "-0.7px",
            }}
          >
            Massage-Gutschein
            <br />
            <span style={{ color: "#e8654a" }}>aus Wien 1080.</span>
          </h1>
          <p
            style={{
              fontSize: "7pt",
              color: "#555",
              margin: "2.5mm 0 0",
              lineHeight: 1.5,
              maxWidth: "115mm",
            }}
          >
            Einlösbar für Heilmassage, Klassische Massage, Lymphdrainage und Sportmassage.
            Drei Jahre gültig.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "4mm",
            paddingBottom: "8mm",
            fontSize: "7pt",
          }}
        >
          {["Für", "Wert", "Gutschein-Nr."].map((label) => (
            <div key={label}>
              <p
                style={{
                  margin: "0 0 0.5mm",
                  fontSize: "5.5pt",
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  color: "#0d4f4f",
                  fontWeight: 800,
                }}
              >
                {label}
              </p>
              <div
                style={{
                  borderBottom: "0.3mm solid #c5d4d4",
                  height: "5mm",
                }}
              />
            </div>
          ))}
        </div>

        {/* Gradient-Streifen unten */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "4mm",
            background: "linear-gradient(90deg, #e8654a, #f2a93b)",
          }}
        />
      </div>

      {/* === RÜCKSEITE === */}
      <div className="gutschein-page-label">Rückseite</div>
      <div
        className="gutschein-page"
        style={{
          background: "white",
          padding: "9mm 11mm 0",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          fontSize: "7.5pt",
          color: "#333",
          lineHeight: 1.55,
          position: "relative",
        }}
      >
        <div>
          <span
            style={{
              display: "inline-block",
              background: "rgba(13,79,79,0.08)",
              color: "#0d4f4f",
              padding: "1mm 3mm",
              borderRadius: "10mm",
              fontSize: "5.5pt",
              fontWeight: 800,
              letterSpacing: "1px",
              textTransform: "uppercase",
            }}
          >
            Einlösung
          </span>
          <p style={{ margin: "2mm 0 0", color: "#555", maxWidth: "120mm" }}>
            Termin vorab vereinbaren und Gutschein zur Behandlung mitbringen.
          </p>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            paddingBottom: "8mm",
          }}
        >
          <div>
            <p style={{ margin: 0, fontWeight: 900, color: "#111", fontSize: "10pt" }}>
              Domenic Hacker
            </p>
            <p style={{ margin: "0.2mm 0 0", color: "#555", fontSize: "7pt" }}>
              Dipl. Heilmasseur · Feldgasse 3/20, 1080 Wien
            </p>
            <p style={{ margin: "1.5mm 0 0", color: "#0d4f4f", fontSize: "7pt", fontWeight: 700 }}>
              praxis@heilmasseur-domenic.at · heilmasseur-domenic.at
            </p>
            <p
              style={{
                margin: "2mm 0 0",
                color: "#888",
                fontSize: "5.5pt",
                fontStyle: "italic",
              }}
            >
              Gültig 3 Jahre ab Ausstellung · nicht in bar ablösbar
            </p>
          </div>
          <Image src="/images/logo-icon.svg" alt="" width={36} height={36} style={{ opacity: 0.85 }} />
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "4mm",
            background: "linear-gradient(90deg, #e8654a, #f2a93b)",
          }}
        />
      </div>
    </>
  );
}
