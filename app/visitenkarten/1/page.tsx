/* Variante 1: Petrol Solid — Klassisch elegant, Petrol mit Gold-Akzent, zentriert */

import Image from "next/image";

export default function Visitenkarte1() {
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
          background: "#0d4f4f",
          color: "white",
          padding: "5mm 6mm",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          textAlign: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "3mm",
            left: "3mm",
            right: "3mm",
            bottom: "3mm",
            border: "0.3mm solid rgba(242,169,59,0.45)",
            borderRadius: "1.5mm",
            pointerEvents: "none",
          }}
        />

        <p
          style={{
            fontSize: "6pt",
            letterSpacing: "3px",
            textTransform: "uppercase",
            margin: 0,
            color: "#f2a93b",
            fontWeight: 700,
            position: "relative",
          }}
        >
          Heilmasseur · Wien 1080
        </p>

        <div style={{ position: "relative" }}>
          <h1
            style={{
              fontSize: "16pt",
              fontWeight: 800,
              margin: 0,
              letterSpacing: "-0.3px",
              color: "white",
              lineHeight: 1,
            }}
          >
            Domenic Hacker
          </h1>
          <div
            style={{
              width: "12mm",
              height: "0.3mm",
              background: "#f2a93b",
              margin: "2mm auto",
            }}
          />
          <p
            style={{
              fontSize: "6.5pt",
              margin: 0,
              color: "rgba(255,255,255,0.85)",
              letterSpacing: "0.5px",
            }}
          >
            Diplomierter Heilmasseur &amp; Gewerblicher Masseur
          </p>
        </div>

        <p
          style={{
            fontSize: "5.5pt",
            letterSpacing: "1.5px",
            textTransform: "uppercase",
            margin: 0,
            color: "rgba(255,255,255,0.55)",
            position: "relative",
          }}
        >
          Heilmassage · Lymphdrainage · Sport- &amp; Klassische Massage
        </p>
      </div>

      {/* === RÜCKSEITE === */}
      <div className="visitenkarte-page-label">Rückseite</div>
      <div
        className="visitenkarte-page"
        style={{
          background: "white",
          color: "#111",
          padding: "5mm 7mm",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          fontSize: "7pt",
          lineHeight: 1.45,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <div>
            <p style={{ margin: 0, fontWeight: 800, color: "#0d4f4f", fontSize: "9pt" }}>
              Domenic Hacker
            </p>
            <p style={{ margin: "0.5mm 0 0", color: "#666", fontSize: "6.5pt" }}>
              Dipl. Heilmasseur &amp; Gew. Masseur
            </p>
          </div>
          <Image
            src="/images/logo-icon.svg"
            alt=""
            width={26}
            height={26}
            style={{ opacity: 0.9 }}
          />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "2mm 4mm",
            fontSize: "6.8pt",
            color: "#333",
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
            <p style={{ margin: "0.3mm 0 0", fontWeight: 600 }}>+43 670 189 52 56</p>
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
            <p style={{ margin: "0.3mm 0 0", fontWeight: 600 }}>
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
            <p style={{ margin: "0.3mm 0 0", fontWeight: 600 }}>
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
              Web
            </p>
            <p style={{ margin: "0.3mm 0 0", fontWeight: 600, color: "#0d4f4f" }}>
              heilmasseur-domenic.at
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
