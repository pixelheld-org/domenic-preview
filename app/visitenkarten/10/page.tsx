/* Variante 10: Portrait — Domenic-Foto als Hintergrund, dunkles Petrol-Overlay, weißer Text */

import Image from "next/image";

export default function Visitenkarte10() {
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
          position: "relative",
          color: "white",
          padding: "5mm 6mm",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          overflow: "hidden",
        }}
      >
        <Image
          src="/images/domenic-1080.webp"
          alt=""
          fill
          sizes="85mm"
          style={{ objectFit: "cover", objectPosition: "center 30%" }}
          priority
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(120deg, rgba(13,79,79,0.92) 0%, rgba(13,79,79,0.75) 55%, rgba(13,79,79,0.35) 100%)",
          }}
        />

        <div style={{ position: "relative", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <span
            style={{
              display: "inline-block",
              background: "rgba(242,169,59,0.18)",
              color: "#f2a93b",
              padding: "0.8mm 2.5mm",
              borderRadius: "8mm",
              fontSize: "4.8pt",
              fontWeight: 800,
              letterSpacing: "1.2px",
              textTransform: "uppercase",
              border: "0.2mm solid rgba(242,169,59,0.5)",
            }}
          >
            Heilmasseur · Wien 1080
          </span>
          <Image
            src="/images/logo-icon.svg"
            alt=""
            width={20}
            height={20}
            style={{ filter: "brightness(0) invert(1)", opacity: 0.9 }}
          />
        </div>

        <div style={{ position: "relative" }}>
          <h1
            style={{
              fontSize: "17pt",
              fontWeight: 800,
              color: "white",
              margin: 0,
              lineHeight: 1,
              letterSpacing: "-0.4px",
            }}
          >
            Domenic Hacker
          </h1>
          <p
            style={{
              fontSize: "6.3pt",
              color: "rgba(255,255,255,0.82)",
              margin: "1mm 0 2.5mm",
            }}
          >
            Diplomierter Heilmasseur &amp; Gewerblicher Masseur
          </p>
          <p style={{ margin: 0, fontSize: "6.5pt", color: "#f2a93b", fontWeight: 700 }}>
            +43 670 189 52 56 · heilmasseur-domenic.at
          </p>
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
          lineHeight: 1.5,
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
              fontSize: "7.2pt",
              margin: "1.2mm 0 0",
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
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "2.5mm 5mm",
            borderTop: "0.25mm solid rgba(242,169,59,0.35)",
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
                color: "#f2a93b",
                fontWeight: 800,
              }}
            >
              Praxis
            </p>
            <p style={{ margin: "0.4mm 0 0", color: "rgba(255,255,255,0.92)", fontSize: "6.5pt" }}>
              Feldgasse 3/20<br />1080 Wien · Josefstadt
            </p>
          </div>
          <div>
            <p
              style={{
                margin: 0,
                fontSize: "4.8pt",
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                color: "#f2a93b",
                fontWeight: 800,
              }}
            >
              E-Mail
            </p>
            <p style={{ margin: "0.4mm 0 0", color: "rgba(255,255,255,0.92)", fontSize: "6.5pt" }}>
              praxis@heilmasseur-domenic.at
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
