/* Variante 6: Praxis-Foto — Foto links, Inhalt rechts, im Stil der Praxis-Section */

import Image from "next/image";

export default function Visitenkarte6() {
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
          background: "#f8f7f5",
          padding: "4mm",
          display: "grid",
          gridTemplateColumns: "32mm 1fr",
          gap: "4mm",
          alignItems: "stretch",
        }}
      >
        <div
          style={{
            position: "relative",
            borderRadius: "2.5mm",
            overflow: "hidden",
            boxShadow: "0 0.5mm 1mm rgba(0,0,0,0.08)",
          }}
        >
          <Image
            src="/images/behandlungsraum.webp"
            alt=""
            fill
            sizes="32mm"
            style={{ objectFit: "cover" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(13,79,79,0.10) 0%, rgba(13,79,79,0.45) 100%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "2mm",
              left: "2mm",
              background: "rgba(255,255,255,0.92)",
              color: "#0d4f4f",
              padding: "0.5mm 2mm",
              borderRadius: "8mm",
              fontSize: "4.5pt",
              fontWeight: 800,
              letterSpacing: "1px",
              textTransform: "uppercase",
            }}
          >
            Wien 1080
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "1mm 0",
          }}
        >
          <div>
            <h1
              style={{
                fontSize: "13pt",
                fontWeight: 900,
                color: "#111",
                margin: 0,
                lineHeight: 1.05,
                letterSpacing: "-0.3px",
              }}
            >
              Domenic{" "}
              <span style={{ color: "#0d4f4f" }}>Hacker</span>.
            </h1>
            <p
              style={{
                fontSize: "5.8pt",
                color: "#555",
                margin: "1mm 0 0",
                lineHeight: 1.4,
              }}
            >
              Diplomierter Heilmasseur<br />&amp; Gewerblicher Masseur
            </p>
          </div>

          <div style={{ fontSize: "6.3pt", color: "#333", lineHeight: 1.5 }}>
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
          background: "#f8f7f5",
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
            Ihr Raum für Erholung
          </span>
          <p style={{ margin: "1.5mm 0 0", color: "#555", fontSize: "6.5pt" }}>
            Heilmassage · Klassische Massage<br />
            Lymphdrainage · Sportmassage
          </p>
        </div>

        <div
          style={{
            background: "white",
            borderRadius: "2.5mm",
            padding: "2.5mm 3mm",
            boxShadow: "0 0.3mm 1mm rgba(0,0,0,0.06)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ fontSize: "6.3pt" }}>
            <p style={{ margin: 0, fontWeight: 800, color: "#0d4f4f" }}>
              Feldgasse 3/20, 1080 Wien
            </p>
            <p style={{ margin: "0.3mm 0 0", color: "#666" }}>
              praxis@heilmasseur-domenic.at
            </p>
          </div>
          <Image src="/images/logo-icon.svg" alt="" width={24} height={24} style={{ opacity: 0.9 }} />
        </div>
      </div>
    </>
  );
}
