/* Variante 5: Zwei-Spalten — Petrol-Block links, Kontakt rechts auf Weiß */

import Image from "next/image";

export default function Visitenkarte5() {
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
          display: "grid",
          gridTemplateColumns: "32mm 1fr",
        }}
      >
        {/* Petrol-Block links */}
        <div
          style={{
            background: "#0d4f4f",
            color: "white",
            padding: "5mm 4mm",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontSize: "5pt",
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: "#f2a93b",
              margin: 0,
              fontWeight: 800,
            }}
          >
            Praxis
          </p>
          <Image
            src="/images/logo-icon.svg"
            alt=""
            width={42}
            height={42}
            style={{ filter: "brightness(0) invert(1)", opacity: 0.95 }}
          />
          <p
            style={{
              fontSize: "5pt",
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.65)",
              margin: 0,
              fontWeight: 700,
            }}
          >
            Wien 1080
          </p>
        </div>

        {/* Weiße Spalte rechts */}
        <div
          style={{
            padding: "5mm 6mm",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h1
              style={{
                fontSize: "13pt",
                fontWeight: 800,
                color: "#0d4f4f",
                margin: 0,
                lineHeight: 1,
                letterSpacing: "-0.3px",
              }}
            >
              Domenic Hacker
            </h1>
            <p
              style={{
                fontSize: "6.3pt",
                color: "#555",
                margin: "1mm 0 0",
                lineHeight: 1.4,
              }}
            >
              Diplomierter Heilmasseur<br />&amp; Gewerblicher Masseur
            </p>
          </div>

          <div
            style={{
              fontSize: "6.5pt",
              color: "#333",
              lineHeight: 1.5,
              borderTop: "0.25mm solid rgba(13,79,79,0.18)",
              paddingTop: "2mm",
            }}
          >
            <p style={{ margin: 0, fontWeight: 700, color: "#0d4f4f" }}>
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
          background: "#0d4f4f",
          color: "white",
          padding: "6mm 7mm",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          fontSize: "7pt",
          lineHeight: 1.55,
        }}
      >
        <div>
          <p
            style={{
              fontSize: "5pt",
              letterSpacing: "2.5px",
              textTransform: "uppercase",
              color: "#f2a93b",
              margin: 0,
              fontWeight: 800,
            }}
          >
            Behandlungen
          </p>
          <p
            style={{
              fontSize: "7.5pt",
              margin: "1.5mm 0 0",
              color: "rgba(255,255,255,0.92)",
              lineHeight: 1.45,
            }}
          >
            Heilmassage · Klassische Massage<br />
            Lymphdrainage · Sportmassage
          </p>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: "0.25mm solid rgba(242,169,59,0.3)",
            paddingTop: "2.5mm",
          }}
        >
          <div>
            <p style={{ margin: 0, fontWeight: 800, color: "#f2a93b", fontSize: "6.5pt" }}>
              Feldgasse 3/20, 1080 Wien
            </p>
            <p style={{ margin: "0.4mm 0 0", color: "rgba(255,255,255,0.88)", fontSize: "6.5pt" }}>
              praxis@heilmasseur-domenic.at
            </p>
          </div>
          <p style={{ margin: 0, fontStyle: "italic", color: "rgba(255,255,255,0.6)", fontSize: "5.5pt" }}>
            Termin nach Vereinbarung
          </p>
        </div>
      </div>
    </>
  );
}
