/* Variante 4: Minimalistisch — Viel Weißraum, dünne Petrol-Linien, sehr typografisch */

import Image from "next/image";

export default function Visitenkarte4() {
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
          background: "white",
          padding: "7mm 8mm",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <p
          style={{
            fontSize: "5.5pt",
            letterSpacing: "3px",
            textTransform: "uppercase",
            color: "#0d4f4f",
            margin: 0,
            fontWeight: 700,
            opacity: 0.7,
          }}
        >
          Heilmasseur — Wien 1080
        </p>

        <h1
          style={{
            fontSize: "18pt",
            fontWeight: 700,
            color: "#0d4f4f",
            margin: "3mm 0 2mm",
            letterSpacing: "-0.5px",
            lineHeight: 1,
          }}
        >
          Domenic Hacker
        </h1>

        <div
          style={{
            width: "20mm",
            height: "0.25mm",
            background: "#0d4f4f",
            opacity: 0.4,
            marginBottom: "2.5mm",
          }}
        />

        <p style={{ fontSize: "6.5pt", color: "#555", margin: 0, lineHeight: 1.5 }}>
          Diplomierter Heilmasseur &amp; Gewerblicher Masseur
        </p>
      </div>

      {/* === RÜCKSEITE === */}
      <div className="visitenkarte-page-label">Rückseite</div>
      <div
        className="visitenkarte-page"
        style={{
          background: "white",
          padding: "7mm 8mm",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          fontSize: "7pt",
          lineHeight: 1.7,
          color: "#333",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "3mm",
          }}
        >
          <p
            style={{
              fontSize: "5.5pt",
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "#0d4f4f",
              margin: 0,
              fontWeight: 700,
              opacity: 0.7,
            }}
          >
            Kontakt
          </p>
          <Image
            src="/images/logo-icon.svg"
            alt=""
            width={20}
            height={20}
            style={{ opacity: 0.7 }}
          />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "auto 1fr",
            gap: "1mm 4mm",
            fontSize: "6.8pt",
            alignItems: "baseline",
          }}
        >
          <span style={{ color: "#999", fontWeight: 600 }}>T</span>
          <span style={{ color: "#0d4f4f", fontWeight: 600 }}>+43 670 189 52 56</span>

          <span style={{ color: "#999", fontWeight: 600 }}>E</span>
          <span style={{ color: "#0d4f4f", fontWeight: 600 }}>
            praxis@heilmasseur-domenic.at
          </span>

          <span style={{ color: "#999", fontWeight: 600 }}>W</span>
          <span style={{ color: "#0d4f4f", fontWeight: 600 }}>
            heilmasseur-domenic.at
          </span>

          <span style={{ color: "#999", fontWeight: 600 }}>A</span>
          <span style={{ color: "#0d4f4f", fontWeight: 600 }}>
            Feldgasse 3/20, 1080 Wien
          </span>
        </div>
      </div>
    </>
  );
}
