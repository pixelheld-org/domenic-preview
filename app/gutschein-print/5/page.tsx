/* Variante 5: Karten-Stil — zweispaltig, Petrol-Block links mit vertikalem Wordmark */

import Image from "next/image";

export default function Gutschein5() {
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
          display: "grid",
          gridTemplateColumns: "42mm 1fr",
          background: "white",
        }}
      >
        {/* Linke Petrol-Spalte */}
        <div
          style={{
            background: "#0d4f4f",
            color: "white",
            padding: "8mm 6mm",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          <Image
            src="/images/logo-icon.svg"
            alt=""
            width={34}
            height={34}
            style={{ filter: "brightness(0) invert(1)" }}
          />

          <div
            style={{
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
              fontSize: "20pt",
              fontWeight: 800,
              letterSpacing: "4px",
              color: "#f2a93b",
              alignSelf: "flex-end",
              lineHeight: 1,
              textTransform: "uppercase",
            }}
          >
            Gutschein
          </div>

          <div style={{ fontSize: "6pt", letterSpacing: "1.5px", textTransform: "uppercase", color: "rgba(255,255,255,0.7)", fontWeight: 600 }}>
            Wien 1080<br />Josefstadt
          </div>
        </div>

        {/* Rechte Inhalt-Spalte */}
        <div
          style={{
            padding: "9mm 9mm 8mm",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <p
              style={{
                fontSize: "6pt",
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: "#e8654a",
                margin: 0,
                fontWeight: 800,
              }}
            >
              Heilmasseur Domenic Hacker
            </p>
            <h1
              style={{
                fontSize: "17pt",
                fontWeight: 800,
                color: "#0d4f4f",
                margin: "1.5mm 0 0",
                lineHeight: 1.1,
                letterSpacing: "-0.5px",
              }}
            >
              Eine Behandlung<br />zum Verschenken.
            </h1>
            <p style={{ fontSize: "7pt", color: "#555", margin: "2mm 0 0", lineHeight: 1.4 }}>
              Heilmassage · Klassische Massage · Lymphdrainage · Sportmassage
            </p>
          </div>

          <div style={{ fontSize: "7pt" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "3mm 5mm",
              }}
            >
              {[
                { l: "Für", w: "100%" },
                { l: "Wert", w: "100%" },
                { l: "Gutschein-Nr.", w: "100%" },
                { l: "Ausgestellt am", w: "100%" },
              ].map((f) => (
                <div key={f.l}>
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
                    {f.l}
                  </p>
                  <div
                    style={{
                      borderBottom: "0.3mm solid #cad6d6",
                      height: "4.5mm",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* === RÜCKSEITE === */}
      <div className="gutschein-page-label">Rückseite</div>
      <div
        className="gutschein-page"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 42mm",
          background: "white",
        }}
      >
        {/* Linke Inhalt-Spalte */}
        <div
          style={{
            padding: "9mm 9mm 8mm 10mm",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            fontSize: "7.5pt",
            color: "#333",
            lineHeight: 1.55,
          }}
        >
          <div>
            <h2
              style={{
                fontSize: "10pt",
                fontWeight: 800,
                color: "#0d4f4f",
                margin: "0 0 2mm",
                letterSpacing: "-0.2px",
              }}
            >
              Einlösung
            </h2>
            <p style={{ margin: 0, color: "#555" }}>
              Termin vorab vereinbaren und Gutschein zur Behandlung mitbringen.
              Einlösbar für alle Behandlungen in der Praxis Feldgasse 3/20, 1080 Wien.
            </p>
          </div>

          <div>
            <p style={{ margin: 0, fontWeight: 800, color: "#0d4f4f", fontSize: "8.5pt" }}>
              Domenic Hacker
            </p>
            <p style={{ margin: "0.3mm 0 0", color: "#555", fontSize: "7pt" }}>
              Dipl. Heilmasseur<br />
              praxis@heilmasseur-domenic.at · heilmasseur-domenic.at
            </p>
            <p
              style={{
                margin: "2mm 0 0",
                color: "#888",
                fontSize: "6pt",
                fontStyle: "italic",
              }}
            >
              Gültig 3 Jahre ab Ausstellung · nicht in bar ablösbar
            </p>
          </div>
        </div>

        {/* Rechte Petrol-Spalte */}
        <div
          style={{
            background: "#0d4f4f",
            color: "white",
            padding: "8mm 6mm",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "flex-end",
            textAlign: "right",
          }}
        >
          <p
            style={{
              fontSize: "6pt",
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: "#f2a93b",
              margin: 0,
              fontWeight: 700,
            }}
          >
            Termin
            <br />
            buchen
          </p>

          <div style={{ fontSize: "6.5pt", color: "rgba(255,255,255,0.9)", lineHeight: 1.45 }}>
            heilmasseur-<br />domenic.at
          </div>

          <Image
            src="/images/logo-icon.svg"
            alt=""
            width={34}
            height={34}
            style={{ filter: "brightness(0) invert(1)", opacity: 0.9 }}
          />
        </div>
      </div>
    </>
  );
}
