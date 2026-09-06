/* Variante 3: Soft Cream — Cremiger Hintergrund mit Coral-Gold-Verlauf, warm */

import Image from "next/image";

export default function Visitenkarte3() {
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
          padding: "6mm 7mm",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtiler Coral-Gold-Schein oben rechts */}
        <div
          style={{
            position: "absolute",
            top: "-20mm",
            right: "-20mm",
            width: "50mm",
            height: "50mm",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(232,101,74,0.22), rgba(242,169,59,0.10) 60%, transparent 80%)",
            pointerEvents: "none",
          }}
        />

        <div style={{ position: "relative" }}>
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
            Massage &amp; Therapie · 1080 Wien
          </p>
          <h1
            style={{
              fontSize: "17pt",
              fontWeight: 800,
              color: "#0d4f4f",
              margin: "1.5mm 0 0",
              lineHeight: 1,
              letterSpacing: "-0.4px",
            }}
          >
            Domenic Hacker
          </h1>
          <p
            style={{
              fontSize: "6.5pt",
              color: "#555",
              margin: "1mm 0 0",
              fontStyle: "italic",
            }}
          >
            Diplomierter Heilmasseur &amp; Gewerblicher Masseur
          </p>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            position: "relative",
          }}
        >
          <div style={{ fontSize: "6.8pt", color: "#333", lineHeight: 1.5 }}>
            <p style={{ margin: 0, fontWeight: 700, color: "#0d4f4f" }}>
              +43 670 189 52 56
            </p>
            <p style={{ margin: 0, color: "#0d4f4f", fontWeight: 600 }}>
              heilmasseur-domenic.at
            </p>
          </div>
          <Image
            src="/images/logo-icon.svg"
            alt=""
            width={28}
            height={28}
            style={{ opacity: 0.85 }}
          />
        </div>
      </div>

      {/* === RÜCKSEITE === */}
      <div className="visitenkarte-page-label">Rückseite</div>
      <div
        className="visitenkarte-page"
        style={{
          background: "#fdfaf5",
          padding: "6mm 7mm",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          fontSize: "7pt",
          color: "#333",
          lineHeight: 1.55,
        }}
      >
        <div>
          <p
            style={{
              fontSize: "5pt",
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: "#e8654a",
              margin: 0,
              fontWeight: 800,
            }}
          >
            Behandlungen
          </p>
          <ul
            style={{
              margin: "2mm 0 0",
              padding: 0,
              listStyle: "none",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "0.8mm 4mm",
              fontSize: "6.8pt",
              color: "#0d4f4f",
              fontWeight: 600,
            }}
          >
            {[
              "Heilmassage",
              "Klassische Massage",
              "Lymphdrainage",
              "Sportmassage",
            ].map((t) => (
              <li key={t} style={{ display: "flex", gap: "1.5mm", alignItems: "center" }}>
                <span style={{ color: "#f2a93b", fontWeight: 900 }}>·</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>

        <div
          style={{
            borderTop: "0.3mm solid rgba(13,79,79,0.18)",
            paddingTop: "2.5mm",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div>
            <p style={{ margin: 0, fontWeight: 700, color: "#0d4f4f" }}>
              Feldgasse 3/20, 1080 Wien
            </p>
            <p style={{ margin: "0.3mm 0 0", color: "#666", fontSize: "6.5pt" }}>
              praxis@heilmasseur-domenic.at
            </p>
          </div>
          <p
            style={{
              margin: 0,
              fontSize: "5.5pt",
              color: "#888",
              fontStyle: "italic",
            }}
          >
            Termin nach Vereinbarung
          </p>
        </div>
      </div>
    </>
  );
}
