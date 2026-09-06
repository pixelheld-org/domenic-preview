/* Variante 3: Soft & Warm — Creme-Hintergrund, Coral-Gold-Verlauf, einladend */

import Image from "next/image";

export default function Gutschein3() {
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
          background: "#faf6f1",
          padding: "9mm 11mm",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          textAlign: "center",
          position: "relative",
        }}
      >
        {/* dekorativer Bogen oben */}
        <div
          style={{
            position: "absolute",
            top: "-20mm",
            left: "50%",
            transform: "translateX(-50%)",
            width: "180mm",
            height: "40mm",
            background:
              "radial-gradient(ellipse at center, rgba(232,101,74,0.18), transparent 60%)",
            pointerEvents: "none",
          }}
        />

        {/* dekorativer Bogen unten */}
        <div
          style={{
            position: "absolute",
            bottom: "-20mm",
            left: "50%",
            transform: "translateX(-50%)",
            width: "180mm",
            height: "40mm",
            background:
              "radial-gradient(ellipse at center, rgba(242,169,59,0.16), transparent 60%)",
            pointerEvents: "none",
          }}
        />

        <div style={{ position: "relative" }}>
          <p
            style={{
              fontSize: "6.5pt",
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "#0d4f4f",
              margin: 0,
              fontWeight: 700,
            }}
          >
            Heilmasseur Domenic Hacker
          </p>
        </div>

        <div style={{ position: "relative" }}>
          <p
            style={{
              fontSize: "8pt",
              letterSpacing: "5px",
              textTransform: "uppercase",
              color: "#0d4f4f",
              margin: "0 0 2.5mm",
              opacity: 0.7,
            }}
          >
            ✿ Gutschein ✿
          </p>
          <h1
            style={{
              fontSize: "34pt",
              fontWeight: 800,
              margin: 0,
              lineHeight: 1,
              letterSpacing: "-1px",
              background: "linear-gradient(90deg, #e8654a, #f2a93b)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              color: "#e8654a",
            }}
          >
            Wohltuende
          </h1>
          <p
            style={{
              fontSize: "12pt",
              fontWeight: 600,
              color: "#0d4f4f",
              margin: "1.5mm 0 0",
              fontStyle: "italic",
              letterSpacing: "0.5px",
            }}
          >
            Stunden für Sie
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "3mm",
            position: "relative",
            fontSize: "7pt",
          }}
        >
          {["Für", "Wert", "Nr."].map((label) => (
            <div key={label}>
              <p
                style={{
                  margin: "0 0 0.5mm",
                  fontSize: "5.5pt",
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  color: "#e8654a",
                  fontWeight: 800,
                }}
              >
                {label}
              </p>
              <div
                style={{
                  borderBottom: "0.3mm solid rgba(13,79,79,0.35)",
                  height: "5mm",
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* === RÜCKSEITE === */}
      <div className="gutschein-page-label">Rückseite</div>
      <div
        className="gutschein-page"
        style={{
          background: "#faf6f1",
          padding: "8mm 10mm",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          fontSize: "7.5pt",
          lineHeight: 1.55,
          color: "#333",
        }}
      >
        <div>
          <h2
            style={{
              fontSize: "11pt",
              fontWeight: 800,
              color: "#0d4f4f",
              margin: "0 0 2mm",
              letterSpacing: "-0.3px",
            }}
          >
            Behandlungen &amp; Einlösung
          </h2>
          <p style={{ margin: "0 0 2.5mm", color: "#555" }}>
            Termin vorab vereinbaren und Gutschein zur Behandlung mitbringen. Einlösbar
            für alle Behandlungen — Heilmassage, Klassische Massage, Lymphdrainage,
            Sportmassage.
          </p>

          <div
            style={{
              background: "white",
              borderRadius: "3mm",
              padding: "3mm 4mm",
              border: "0.3mm solid rgba(13,79,79,0.12)",
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: "6.5pt",
                color: "#0d4f4f",
                fontWeight: 700,
                letterSpacing: "1px",
                textTransform: "uppercase",
              }}
            >
              Termin buchen
            </p>
            <p style={{ margin: "1mm 0 0", color: "#333", fontSize: "8pt", fontWeight: 600 }}>
              heilmasseur-domenic.at &nbsp;·&nbsp; praxis@heilmasseur-domenic.at
            </p>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div>
            <p style={{ margin: 0, fontWeight: 800, color: "#0d4f4f", fontSize: "9pt" }}>
              Domenic Hacker
            </p>
            <p style={{ margin: "0.2mm 0 0", color: "#555", fontSize: "7pt" }}>
              Dipl. Heilmasseur · Feldgasse 3/20, 1080 Wien
            </p>
            <p
              style={{
                margin: "1.5mm 0 0",
                color: "#888",
                fontSize: "6pt",
                fontStyle: "italic",
              }}
            >
              Gültig 3 Jahre ab Ausstellung · nicht in bar ablösbar
            </p>
          </div>
          <Image src="/images/logo-icon.svg" alt="" width={40} height={40} style={{ opacity: 0.85 }} />
        </div>
      </div>
    </>
  );
}
