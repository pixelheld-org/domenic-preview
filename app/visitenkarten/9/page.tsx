/* Variante 9: Editorial — Ruhig, kursives Tagline-Zitat, schmaler Petrol-Strich */

import Image from "next/image";

export default function Visitenkarte9() {
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
        Zum Drucken: Cmd&thinsp;/&thinsp;Strg&thinsp;+&thinsp;P → 85×55&thinsp;mm, Hintergrundgrafiken aktivieren
      </div>

      {/* === VORDERSEITE === */}
      <div className="visitenkarte-page-label">Vorderseite</div>
      <div
        className="visitenkarte-page"
        style={{
          background: "#fdfaf5",
          padding: "7mm 9mm",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "flex-start",
          position: "relative",
        }}
      >
        <p
          style={{
            fontSize: "11pt",
            color: "#0d4f4f",
            margin: 0,
            fontStyle: "italic",
            fontWeight: 500,
            lineHeight: 1.2,
            letterSpacing: "-0.2px",
            maxWidth: "55mm",
          }}
        >
          „Zeit für sich. Hände&shy;weit weg vom Alltag.&ldquo;
        </p>

        <div
          style={{
            width: "12mm",
            height: "0.3mm",
            background: "#e8654a",
            margin: "0",
          }}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            width: "100%",
          }}
        >
          <div>
            <p
              style={{
                fontSize: "9.5pt",
                fontWeight: 800,
                color: "#0d4f4f",
                margin: 0,
                letterSpacing: "-0.2px",
              }}
            >
              Domenic Hacker
            </p>
            <p
              style={{
                fontSize: "5.8pt",
                color: "#666",
                margin: "0.5mm 0 0",
                letterSpacing: "0.3px",
              }}
            >
              Dipl. Heilmasseur &amp; Gew. Masseur · Wien 1080
            </p>
          </div>
          <Image src="/images/logo-icon.svg" alt="" width={22} height={22} style={{ opacity: 0.75 }} />
        </div>
      </div>

      {/* === RÜCKSEITE === */}
      <div className="visitenkarte-page-label">Rückseite</div>
      <div
        className="visitenkarte-page"
        style={{
          background: "white",
          padding: "7mm 9mm",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          fontSize: "7pt",
          color: "#333",
          lineHeight: 1.6,
        }}
      >
        <p
          style={{
            fontSize: "5pt",
            letterSpacing: "3px",
            textTransform: "uppercase",
            color: "#e8654a",
            margin: 0,
            fontWeight: 800,
          }}
        >
          Praxis · Termine nach Vereinbarung
        </p>

        <div
          style={{
            width: "12mm",
            height: "0.3mm",
            background: "#0d4f4f",
            margin: "2mm 0 3mm",
            opacity: 0.5,
          }}
        />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5mm 5mm" }}>
          <p style={{ margin: 0, fontWeight: 700, color: "#0d4f4f", fontSize: "6.8pt" }}>
            +43 670 189 52 56
          </p>
          <p style={{ margin: 0, fontWeight: 600, color: "#0d4f4f", fontSize: "6.8pt" }}>
            heilmasseur-domenic.at
          </p>
          <p style={{ margin: 0, color: "#555", fontSize: "6.5pt" }}>
            praxis@heilmasseur-domenic.at
          </p>
          <p style={{ margin: 0, color: "#555", fontSize: "6.5pt" }}>
            Feldgasse 3/20, 1080 Wien
          </p>
        </div>
      </div>
    </>
  );
}
