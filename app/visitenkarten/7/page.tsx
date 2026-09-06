/* Variante 7: Card-in-Card — Light-Teal mit weißer innerer Card, wie /gutscheine */

import Image from "next/image";

export default function Visitenkarte7() {
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
          background: "#f0f7f7",
          padding: "4mm",
        }}
      >
        <div
          style={{
            background: "white",
            borderRadius: "3mm",
            height: "100%",
            padding: "5mm 6mm",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            boxShadow: "0 0.5mm 2mm rgba(13,79,79,0.08)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <span
              style={{
                display: "inline-block",
                background: "rgba(232,101,74,0.10)",
                color: "#e8654a",
                padding: "0.8mm 2.5mm",
                borderRadius: "8mm",
                fontSize: "4.8pt",
                fontWeight: 800,
                letterSpacing: "1px",
                textTransform: "uppercase",
              }}
            >
              Praxis · Wien 1080
            </span>
            <Image src="/images/logo-icon.svg" alt="" width={18} height={18} style={{ opacity: 0.85 }} />
          </div>

          <div>
            <h1
              style={{
                fontSize: "15pt",
                fontWeight: 900,
                color: "#111",
                margin: 0,
                lineHeight: 1.05,
                letterSpacing: "-0.4px",
              }}
            >
              Domenic{" "}
              <span style={{ color: "#e8654a" }}>Hacker</span>
            </h1>
            <p
              style={{
                fontSize: "6.2pt",
                color: "#555",
                margin: "1mm 0 0",
                lineHeight: 1.45,
              }}
            >
              Diplomierter Heilmasseur &amp; Gewerblicher Masseur
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1.5mm 4mm",
              fontSize: "6.3pt",
              borderTop: "0.25mm solid #e5e8e8",
              paddingTop: "2mm",
            }}
          >
            <p style={{ margin: 0, color: "#0d4f4f", fontWeight: 700 }}>
              +43 670 189 52 56
            </p>
            <p style={{ margin: 0, color: "#0d4f4f", fontWeight: 600 }}>
              heilmasseur-domenic.at
            </p>
          </div>
        </div>
      </div>

      {/* === RÜCKSEITE === */}
      <div className="visitenkarte-page-label">Rückseite</div>
      <div
        className="visitenkarte-page"
        style={{
          background: "#f0f7f7",
          padding: "4mm",
        }}
      >
        <div
          style={{
            background: "white",
            borderRadius: "3mm",
            height: "100%",
            padding: "5mm 6mm",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            boxShadow: "0 0.5mm 2mm rgba(13,79,79,0.08)",
            fontSize: "6.5pt",
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
                padding: "0.8mm 2.5mm",
                borderRadius: "8mm",
                fontSize: "4.8pt",
                fontWeight: 800,
                letterSpacing: "1px",
                textTransform: "uppercase",
              }}
            >
              Behandlungen
            </span>
            <p
              style={{
                margin: "1.5mm 0 0",
                color: "#555",
                fontSize: "6.5pt",
                lineHeight: 1.45,
              }}
            >
              Heilmassage · Klassische Massage<br />
              Lymphdrainage · Sportmassage
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "3mm",
              borderTop: "0.25mm solid #e5e8e8",
              paddingTop: "2.5mm",
            }}
          >
            <div>
              <p
                style={{
                  margin: 0,
                  fontSize: "4.8pt",
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  color: "#0d4f4f",
                  fontWeight: 800,
                }}
              >
                Praxis
              </p>
              <p style={{ margin: "0.4mm 0 0", color: "#333", fontWeight: 600 }}>
                Feldgasse 3/20<br />
                1080 Wien
              </p>
            </div>
            <div style={{ textAlign: "right" }}>
              <p
                style={{
                  margin: 0,
                  fontSize: "4.8pt",
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  color: "#0d4f4f",
                  fontWeight: 800,
                }}
              >
                Kontakt
              </p>
              <p style={{ margin: "0.4mm 0 0", color: "#333", fontWeight: 600 }}>
                +43 670 189 52 56<br />
                praxis@heilmasseur-domenic.at
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
