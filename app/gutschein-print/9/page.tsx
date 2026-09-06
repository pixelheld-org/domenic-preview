/* Variante 9: Editorial-Zitat — Großes, kontemplatives Headline-Zitat,
   Linien-System wie Editorial/Magazin. Sehr ruhig, sehr typografisch. */

import Image from "next/image";

export default function Gutschein9() {
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
          background: "#f8f7f5",
          padding: "9mm 12mm",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <p
            style={{
              fontSize: "6pt",
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "#0d4f4f",
              margin: 0,
              fontWeight: 800,
            }}
          >
            — Gutschein
          </p>
          <p
            style={{
              fontSize: "6pt",
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: "#0d4f4f",
              margin: 0,
              fontWeight: 600,
            }}
          >
            Heilmasseur · Wien 1080
          </p>
        </div>

        <div>
          <h1
            style={{
              fontSize: "18pt",
              fontWeight: 800,
              color: "#0d4f4f",
              margin: 0,
              lineHeight: 1.2,
              letterSpacing: "-0.4px",
              fontStyle: "italic",
              maxWidth: "120mm",
            }}
          >
            „Zeit für sich selbst{" "}
            <span style={{ color: "#e8654a" }}>ist nie verschwendet.</span>"
          </h1>
          <p
            style={{
              fontSize: "7.5pt",
              color: "#555",
              margin: "2.5mm 0 0",
              fontWeight: 500,
            }}
          >
            Eine Behandlung als Geschenk — einlösbar in der Praxis Feldgasse 3/20.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "3mm 5mm",
            fontSize: "7pt",
            borderTop: "0.3mm solid #0d4f4f",
            paddingTop: "3mm",
          }}
        >
          {[
            { l: "Für", w: "70%" },
            { l: "Wert", w: "60%" },
          ].map((f) => (
            <div key={f.l} style={{ display: "flex", alignItems: "baseline", gap: "2mm" }}>
              <p
                style={{
                  margin: 0,
                  fontSize: "5.5pt",
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  color: "#0d4f4f",
                  fontWeight: 800,
                  whiteSpace: "nowrap",
                }}
              >
                {f.l}
              </p>
              <div
                style={{
                  flex: 1,
                  borderBottom: "0.3mm solid #c5d4d4",
                  height: "4.5mm",
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
          background: "#f8f7f5",
          padding: "9mm 12mm",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          fontSize: "7.5pt",
          color: "#333",
          lineHeight: 1.55,
        }}
      >
        <div>
          <p
            style={{
              fontSize: "6pt",
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "#0d4f4f",
              margin: 0,
              fontWeight: 800,
            }}
          >
            — Behandlungen
          </p>
          <p style={{ margin: "1.5mm 0 0", color: "#555", maxWidth: "120mm" }}>
            Heilmassage · Klassische Massage · Lymphdrainage · Sportmassage.
            Termin vorab vereinbaren und Gutschein zur Behandlung mitbringen.
          </p>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: "0.3mm solid #0d4f4f",
            paddingTop: "3mm",
          }}
        >
          <div>
            <p style={{ margin: 0, fontWeight: 800, color: "#0d4f4f", fontSize: "10pt", letterSpacing: "-0.2px" }}>
              Domenic Hacker
            </p>
            <p style={{ margin: "0.3mm 0 0", color: "#555", fontSize: "7pt" }}>
              Dipl. Heilmasseur
            </p>
            <p style={{ margin: "1.5mm 0 0", color: "#333", fontSize: "7pt" }}>
              Feldgasse 3/20 · 1080 Wien<br />
              heilmasseur-domenic.at
            </p>
            <p
              style={{
                margin: "1.5mm 0 0",
                color: "#888",
                fontSize: "5.5pt",
                fontStyle: "italic",
              }}
            >
              Gültig 3 Jahre ab Ausstellung · nicht in bar ablösbar
            </p>
          </div>
          <Image src="/images/logo-icon.svg" alt="" width={32} height={32} style={{ opacity: 0.85 }} />
        </div>
      </div>
    </>
  );
}
