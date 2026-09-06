/* Variante 7: Section-im-Card — Light-Teal-Hintergrund mit weißer innerer Card,
   wie die /gutscheine-Section auf der Website. */

import Image from "next/image";

export default function Gutschein7() {
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
          background: "#f0f7f7",
          padding: "6mm",
        }}
      >
        <div
          style={{
            background: "white",
            borderRadius: "5mm",
            height: "100%",
            padding: "7mm 8mm",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            boxShadow: "0 1mm 3mm rgba(13,79,79,0.08)",
            position: "relative",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
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
              Geschenk-Gutschein
            </span>
            <Image src="/images/logo-icon.svg" alt="" width={22} height={22} style={{ opacity: 0.85 }} />
          </div>

          <div>
            <h1
              style={{
                fontSize: "22pt",
                fontWeight: 900,
                color: "#111",
                margin: 0,
                lineHeight: 1.05,
                letterSpacing: "-0.6px",
              }}
            >
              Massage-Gutschein{" "}
              <span style={{ color: "#e8654a" }}>aus Wien 1080</span>
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
              Einlösbar für alle Behandlungen — Heilmassage, Klassische Massage,
              Lymphdrainage, Sportmassage.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "4mm",
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
        </div>
      </div>

      {/* === RÜCKSEITE === */}
      <div className="gutschein-page-label">Rückseite</div>
      <div
        className="gutschein-page"
        style={{
          background: "#f0f7f7",
          padding: "6mm",
        }}
      >
        <div
          style={{
            background: "white",
            borderRadius: "5mm",
            height: "100%",
            padding: "7mm 8mm",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            boxShadow: "0 1mm 3mm rgba(13,79,79,0.08)",
            fontSize: "7.5pt",
            color: "#333",
            lineHeight: 1.55,
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
            <p style={{ margin: "2mm 0 0", color: "#555" }}>
              Termin vorab telefonisch, per E-Mail oder online vereinbaren und
              den Gutschein zur Behandlung mitbringen.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "5mm",
              borderTop: "0.3mm solid #e5e8e8",
              paddingTop: "3mm",
            }}
          >
            <div>
              <p
                style={{
                  margin: "0 0 1mm",
                  fontSize: "5.5pt",
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  color: "#0d4f4f",
                  fontWeight: 800,
                }}
              >
                Praxis
              </p>
              <p style={{ margin: 0, fontWeight: 700, color: "#111" }}>Domenic Hacker</p>
              <p style={{ margin: "0.5mm 0 0", color: "#555", fontSize: "7pt" }}>
                Dipl. Heilmasseur<br />
                Feldgasse 3/20 · 1080 Wien
              </p>
            </div>
            <div style={{ textAlign: "right" }}>
              <p
                style={{
                  margin: "0 0 1mm",
                  fontSize: "5.5pt",
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  color: "#0d4f4f",
                  fontWeight: 800,
                }}
              >
                Termin
              </p>
              <p style={{ margin: 0, color: "#555", fontSize: "7pt" }}>
                praxis@heilmasseur-domenic.at<br />
                heilmasseur-domenic.at
              </p>
            </div>
          </div>

          <p
            style={{
              margin: 0,
              fontSize: "5.5pt",
              color: "#888",
              fontStyle: "italic",
              textAlign: "center",
            }}
          >
            Gültig 3 Jahre ab Ausstellung · nicht in bar ablösbar
          </p>
        </div>
      </div>
    </>
  );
}
