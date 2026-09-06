/* Variante 1: Klassisch Elegant — Petrol mit Gold-Akzent, zentriert, Spa-Feeling */

import Image from "next/image";

export default function Gutschein1() {
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
          background: "#0d4f4f",
          color: "white",
          padding: "10mm 12mm",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
        }}
      >
        {/* dezente Ornament-Linien */}
        <div
          style={{
            position: "absolute",
            top: "6mm",
            left: "6mm",
            right: "6mm",
            bottom: "6mm",
            border: "0.4mm solid rgba(242,169,59,0.45)",
            borderRadius: "2mm",
            pointerEvents: "none",
          }}
        />

        {/* Top: Wordmark / Label */}
        <div style={{ textAlign: "center", position: "relative" }}>
          <p
            style={{
              fontSize: "7pt",
              letterSpacing: "3px",
              textTransform: "uppercase",
              margin: 0,
              color: "#f2a93b",
              fontWeight: 700,
            }}
          >
            Heilmasseur Domenic Hacker
          </p>
          <p
            style={{
              fontSize: "6.5pt",
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              margin: "1mm 0 0",
              color: "rgba(255,255,255,0.55)",
            }}
          >
            Wien 1080 · Josefstadt
          </p>
        </div>

        {/* Mitte: "Gutschein" Headline */}
        <div style={{ textAlign: "center", position: "relative" }}>
          <p
            style={{
              fontSize: "8pt",
              letterSpacing: "4px",
              textTransform: "uppercase",
              margin: "0 0 2mm",
              color: "rgba(255,255,255,0.7)",
            }}
          >
            — Gutschein —
          </p>
          <h1
            style={{
              fontSize: "32pt",
              fontWeight: 800,
              margin: 0,
              letterSpacing: "-0.5px",
              color: "#f2a93b",
              lineHeight: 1,
            }}
          >
            Zeit für sich
          </h1>
          <p
            style={{
              fontSize: "8pt",
              margin: "3mm 0 0",
              color: "rgba(255,255,255,0.75)",
              fontStyle: "italic",
            }}
          >
            Heilmassage · Klassische Massage · Lymphdrainage · Sportmassage
          </p>
        </div>

        {/* Bottom: Felder */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "4mm",
            position: "relative",
            fontSize: "7.5pt",
          }}
        >
          <div>
            <p
              style={{
                margin: "0 0 0.5mm",
                fontSize: "6pt",
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                color: "rgba(242,169,59,0.85)",
                fontWeight: 700,
              }}
            >
              Für
            </p>
            <div
              style={{
                borderBottom: "0.3mm solid rgba(255,255,255,0.45)",
                height: "5.5mm",
              }}
            />
          </div>
          <div>
            <p
              style={{
                margin: "0 0 0.5mm",
                fontSize: "6pt",
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                color: "rgba(242,169,59,0.85)",
                fontWeight: 700,
              }}
            >
              Wert
            </p>
            <div
              style={{
                borderBottom: "0.3mm solid rgba(255,255,255,0.45)",
                height: "5.5mm",
              }}
            />
          </div>
        </div>
      </div>

      {/* === RÜCKSEITE === */}
      <div className="gutschein-page-label">Rückseite</div>
      <div
        className="gutschein-page"
        style={{
          background: "white",
          color: "#111",
          padding: "8mm 10mm",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          fontSize: "7.5pt",
          lineHeight: 1.5,
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              borderBottom: "0.3mm solid #0d4f4f",
              paddingBottom: "2mm",
              marginBottom: "3mm",
            }}
          >
            <h2
              style={{
                fontSize: "11pt",
                fontWeight: 800,
                color: "#0d4f4f",
                margin: 0,
                letterSpacing: "-0.3px",
              }}
            >
              Einlösung &amp; Information
            </h2>
            <p
              style={{
                fontSize: "6.5pt",
                color: "#888",
                margin: 0,
                letterSpacing: "1px",
                textTransform: "uppercase",
              }}
            >
              Gutschein-Nr.
            </p>
          </div>

          <p style={{ margin: "0 0 2mm", color: "#333" }}>
            Dieser Gutschein ist einlösbar für alle Behandlungen in der Praxis. Bitte
            Termin vorab telefonisch oder online vereinbaren und den Gutschein zur Behandlung
            mitbringen.
          </p>

          <ul
            style={{
              margin: "0 0 2mm",
              padding: 0,
              listStyle: "none",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "0.5mm 4mm",
              color: "#333",
            }}
          >
            {[
              "Heilmassage",
              "Klassische Massage",
              "Lymphdrainage",
              "Sportmassage",
            ].map((t) => (
              <li
                key={t}
                style={{ display: "flex", gap: "1.5mm", alignItems: "center" }}
              >
                <span style={{ color: "#f2a93b", fontWeight: 800 }}>·</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>

          <p
            style={{
              margin: "2mm 0 0",
              fontSize: "6.5pt",
              color: "#666",
              fontStyle: "italic",
            }}
          >
            Gültig 3 Jahre ab Ausstellungsdatum. Nicht in bar ablösbar.
          </p>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: "0.3mm solid #e5e5e5",
            paddingTop: "2.5mm",
          }}
        >
          <div>
            <p style={{ margin: 0, fontWeight: 800, color: "#0d4f4f", fontSize: "8.5pt" }}>
              Domenic Hacker
            </p>
            <p style={{ margin: "0.3mm 0 0", color: "#555" }}>
              Dipl. Heilmasseur
            </p>
            <p style={{ margin: "1.5mm 0 0", color: "#555", fontSize: "7pt" }}>
              Feldgasse 3/20 · 1080 Wien<br />
              praxis@heilmasseur-domenic.at<br />
              heilmasseur-domenic.at
            </p>
          </div>
          <div style={{ textAlign: "right" }}>
            <Image
              src="/images/logo-icon.svg"
              alt=""
              width={48}
              height={48}
              style={{ opacity: 0.85 }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
