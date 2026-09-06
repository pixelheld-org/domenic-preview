/* Variante 8: Hero-Style — Badge, große Headline mit Coral-Akzent, Gradient-Streifen */

import Image from "next/image";

export default function Visitenkarte8() {
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
          padding: "5mm 6mm 6mm",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
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
              letterSpacing: "1.2px",
              textTransform: "uppercase",
            }}
          >
            Heilmasseur · Wien 1080
          </span>
          <Image src="/images/logo-icon.svg" alt="" width={18} height={18} style={{ opacity: 0.85 }} />
        </div>

        <div>
          <h1
            style={{
              fontSize: "16pt",
              fontWeight: 900,
              color: "#0d4f4f",
              margin: 0,
              lineHeight: 1,
              letterSpacing: "-0.5px",
            }}
          >
            Massage,{" "}
            <span style={{ color: "#e8654a" }}>die gut tut.</span>
          </h1>
          <p
            style={{
              fontSize: "6.5pt",
              color: "#555",
              margin: "1.5mm 0 0",
            }}
          >
            <strong style={{ color: "#0d4f4f" }}>Domenic Hacker</strong>{" "}
            · Dipl. Heilmasseur &amp; Gew. Masseur
          </p>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: "6.3pt",
            color: "#333",
            lineHeight: 1.45,
          }}
        >
          <div>
            <p style={{ margin: 0, fontWeight: 700, color: "#0d4f4f" }}>
              +43 670 189 52 56
            </p>
            <p style={{ margin: 0, color: "#0d4f4f", fontWeight: 600 }}>
              heilmasseur-domenic.at
            </p>
          </div>
          <p style={{ margin: 0, color: "#666", fontSize: "5.8pt", textAlign: "right" }}>
            Feldgasse 3/20<br />1080 Wien
          </p>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "1.8mm",
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
          padding: "6mm 7mm",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          position: "relative",
        }}
      >
        <Image
          src="/images/logo-icon.svg"
          alt=""
          width={32}
          height={32}
          style={{ filter: "brightness(0) invert(1)", opacity: 0.95, marginBottom: "2.5mm" }}
        />
        <p
          style={{
            fontSize: "11pt",
            fontWeight: 800,
            color: "white",
            margin: 0,
            letterSpacing: "-0.2px",
            lineHeight: 1,
          }}
        >
          Heilmasseur Domenic
        </p>
        <p
          style={{
            fontSize: "5.5pt",
            letterSpacing: "2.5px",
            textTransform: "uppercase",
            color: "#f2a93b",
            margin: "2mm 0 0",
            fontWeight: 700,
          }}
        >
          Termin nach Vereinbarung
        </p>

        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "1.8mm",
            background: "linear-gradient(90deg, #e8654a, #f2a93b)",
          }}
        />
      </div>
    </>
  );
}
