/* Variante 2: Magazin — Weiß, große Petrol-Typo, Coral-Akzent, asymmetrisch */

import Image from "next/image";

export default function Visitenkarte2() {
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
          padding: "5mm 6mm",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
        }}
      >
        <div>
          <p
            style={{
              fontSize: "5.5pt",
              letterSpacing: "2.5px",
              textTransform: "uppercase",
              color: "#e8654a",
              margin: 0,
              fontWeight: 800,
            }}
          >
            Heilmasseur · Wien 1080
          </p>
          <h1
            style={{
              fontSize: "20pt",
              fontWeight: 900,
              color: "#0d4f4f",
              margin: "1.5mm 0 0",
              lineHeight: 0.95,
              letterSpacing: "-0.8px",
            }}
          >
            Domenic<br />
            <span style={{ color: "#e8654a" }}>Hacker.</span>
          </h1>
        </div>

        <div>
          <p style={{ fontSize: "6.5pt", color: "#555", margin: 0, lineHeight: 1.45 }}>
            Diplomierter Heilmasseur &amp; Gewerblicher Masseur
          </p>
          <p
            style={{
              fontSize: "6.8pt",
              margin: "1mm 0 0",
              color: "#0d4f4f",
              fontWeight: 700,
            }}
          >
            +43 670 189 52 56 · heilmasseur-domenic.at
          </p>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "2mm",
            background: "linear-gradient(90deg, #e8654a, #f2a93b)",
          }}
        />
      </div>

      {/* === RÜCKSEITE === */}
      <div className="visitenkarte-page-label">Rückseite</div>
      <div
        className="visitenkarte-page"
        style={{
          background: "#0d4f4f",
          color: "white",
          padding: "5mm 6mm",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          fontSize: "7pt",
          lineHeight: 1.5,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <h2
            style={{
              fontSize: "9pt",
              fontWeight: 800,
              color: "#f2a93b",
              margin: 0,
              letterSpacing: "-0.2px",
            }}
          >
            Termin &amp; Praxis
          </h2>
          <Image
            src="/images/logo-icon.svg"
            alt=""
            width={22}
            height={22}
            style={{ opacity: 0.95, filter: "brightness(0) invert(1)" }}
          />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "3mm 5mm",
          }}
        >
          <div>
            <p
              style={{
                margin: 0,
                fontSize: "5pt",
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                color: "#f2a93b",
                fontWeight: 800,
              }}
            >
              Telefon
            </p>
            <p style={{ margin: "0.3mm 0 0", color: "rgba(255,255,255,0.92)" }}>
              +43 670 189 52 56
            </p>
          </div>
          <div>
            <p
              style={{
                margin: 0,
                fontSize: "5pt",
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                color: "#f2a93b",
                fontWeight: 800,
              }}
            >
              E-Mail
            </p>
            <p style={{ margin: "0.3mm 0 0", color: "rgba(255,255,255,0.92)" }}>
              praxis@heilmasseur-domenic.at
            </p>
          </div>
          <div>
            <p
              style={{
                margin: 0,
                fontSize: "5pt",
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                color: "#f2a93b",
                fontWeight: 800,
              }}
            >
              Praxis
            </p>
            <p style={{ margin: "0.3mm 0 0", color: "rgba(255,255,255,0.92)" }}>
              Feldgasse 3/20, 1080 Wien
            </p>
          </div>
          <div>
            <p
              style={{
                margin: 0,
                fontSize: "5pt",
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                color: "#f2a93b",
                fontWeight: 800,
              }}
            >
              Online buchen
            </p>
            <p style={{ margin: "0.3mm 0 0", color: "rgba(255,255,255,0.92)" }}>
              heilmasseur-domenic.at
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
