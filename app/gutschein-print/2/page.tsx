/* Variante 2: Magazin — Asymmetrisch, weiß mit großem Typo-Block, Coral-Akzent */

import Image from "next/image";

export default function Gutschein2() {
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
          background: "white",
          padding: "9mm 10mm",
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr",
          gap: "8mm",
          position: "relative",
        }}
      >
        {/* Links: Big type */}
        <div
          style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}
        >
          <div>
            <p
              style={{
                fontSize: "6.5pt",
                letterSpacing: "2.5px",
                textTransform: "uppercase",
                color: "#e8654a",
                margin: 0,
                fontWeight: 800,
              }}
            >
              Massage-Gutschein · Wien 1080
            </p>
            <h1
              style={{
                fontSize: "30pt",
                fontWeight: 900,
                color: "#0d4f4f",
                margin: "2mm 0 0",
                lineHeight: 0.95,
                letterSpacing: "-1px",
              }}
            >
              Gutschein<br />
              <span style={{ color: "#e8654a" }}>für Sie.</span>
            </h1>
          </div>

          <div>
            <p
              style={{
                fontSize: "7pt",
                color: "#555",
                margin: "0 0 1.5mm",
                lineHeight: 1.4,
              }}
            >
              Heilmassage · Klassische Massage<br />Lymphdrainage · Sportmassage
            </p>
            <p
              style={{
                fontSize: "8pt",
                fontWeight: 800,
                color: "#0d4f4f",
                margin: 0,
              }}
            >
              Domenic Hacker · Dipl. Heilmasseur
            </p>
          </div>
        </div>

        {/* Rechts: Felder */}
        <div
          style={{
            background: "#f0f7f7",
            borderRadius: "3mm",
            padding: "5mm 5mm 4mm",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            fontSize: "7.5pt",
          }}
        >
          <div>
            <p
              style={{
                fontSize: "6pt",
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                color: "#0d4f4f",
                margin: 0,
                fontWeight: 800,
              }}
            >
              Für
            </p>
            <div style={{ borderBottom: "0.3mm solid #0d4f4f", height: "5mm" }} />
          </div>
          <div>
            <p
              style={{
                fontSize: "6pt",
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                color: "#0d4f4f",
                margin: 0,
                fontWeight: 800,
              }}
            >
              Wert in €
            </p>
            <div style={{ borderBottom: "0.3mm solid #0d4f4f", height: "5mm" }} />
          </div>
          <div>
            <p
              style={{
                fontSize: "6pt",
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                color: "#0d4f4f",
                margin: 0,
                fontWeight: 800,
              }}
            >
              Gutschein-Nr.
            </p>
            <div style={{ borderBottom: "0.3mm solid #0d4f4f", height: "5mm" }} />
          </div>
        </div>

        {/* Coral bottom bar */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "3mm",
            background: "linear-gradient(90deg, #e8654a, #f2a93b)",
          }}
        />
      </div>

      {/* === RÜCKSEITE === */}
      <div className="gutschein-page-label">Rückseite</div>
      <div
        className="gutschein-page"
        style={{
          background: "#0d4f4f",
          color: "white",
          padding: "9mm 10mm",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          fontSize: "7.5pt",
          lineHeight: 1.55,
        }}
      >
        <div>
          <h2
            style={{
              fontSize: "11pt",
              fontWeight: 800,
              color: "#f2a93b",
              margin: "0 0 2mm",
              letterSpacing: "-0.3px",
            }}
          >
            Einlösung
          </h2>
          <p style={{ margin: 0, color: "rgba(255,255,255,0.88)", maxWidth: "115mm" }}>
            Termin vorab vereinbaren — telefonisch, per E-Mail oder online. Den Gutschein
            zur Behandlung mitbringen. Einlösbar für alle Behandlungen in der Praxis.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "5mm",
            alignItems: "flex-end",
          }}
        >
          <div>
            <p
              style={{
                margin: "0 0 1mm",
                fontSize: "6pt",
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                color: "#f2a93b",
                fontWeight: 800,
              }}
            >
              Praxis
            </p>
            <p style={{ margin: 0, color: "rgba(255,255,255,0.9)" }}>
              Feldgasse 3/20<br />
              1080 Wien · Josefstadt
            </p>
          </div>
          <div>
            <p
              style={{
                margin: "0 0 1mm",
                fontSize: "6pt",
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                color: "#f2a93b",
                fontWeight: 800,
              }}
            >
              Kontakt
            </p>
            <p style={{ margin: 0, color: "rgba(255,255,255,0.9)" }}>
              praxis@heilmasseur-domenic.at<br />
              heilmasseur-domenic.at
            </p>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "0.3mm solid rgba(242,169,59,0.4)",
            paddingTop: "2mm",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: "6.5pt",
              color: "rgba(255,255,255,0.6)",
              fontStyle: "italic",
            }}
          >
            Gültig 3 Jahre ab Ausstellung · nicht in bar ablösbar
          </p>
          <Image
            src="/images/logo-icon.svg"
            alt=""
            width={36}
            height={36}
            style={{ opacity: 0.95, filter: "brightness(0) invert(1)" }}
          />
        </div>
      </div>
    </>
  );
}
