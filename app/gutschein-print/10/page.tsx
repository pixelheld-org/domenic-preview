/* Variante 10: Praxis-Foto-Bild — Praxis-Innenraum als Hintergrund mit Petrol-Overlay,
   weißer Text. Atmosphärisch, premium. */

import Image from "next/image";

export default function Gutschein10() {
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
          position: "relative",
          padding: "10mm 12mm",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          color: "white",
        }}
      >
        {/* Foto */}
        <Image
          src="/images/behandlungsraum.webp"
          alt=""
          fill
          sizes="148mm"
          style={{ objectFit: "cover", zIndex: 0 }}
          priority
        />
        {/* Petrol-Overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, rgba(13,79,79,0.92) 0%, rgba(13,79,79,0.78) 50%, rgba(17,17,17,0.85) 100%)",
            zIndex: 1,
          }}
        />

        {/* Inhalt */}
        <div style={{ position: "relative", zIndex: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span
            style={{
              display: "inline-block",
              background: "rgba(255,255,255,0.14)",
              color: "white",
              padding: "1mm 3mm",
              borderRadius: "10mm",
              fontSize: "5.5pt",
              fontWeight: 800,
              letterSpacing: "1px",
              textTransform: "uppercase",
              backdropFilter: "blur(2px)",
            }}
          >
            Massage-Gutschein
          </span>
          <p
            style={{
              fontSize: "6pt",
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.65)",
              margin: 0,
              fontWeight: 600,
            }}
          >
            Wien 1080 · Josefstadt
          </p>
        </div>

        <div style={{ position: "relative", zIndex: 2 }}>
          <h1
            style={{
              fontSize: "26pt",
              fontWeight: 900,
              margin: 0,
              lineHeight: 1.02,
              letterSpacing: "-0.7px",
              color: "white",
            }}
          >
            Eine Stunde nur{" "}
            <span style={{ color: "#f2a93b" }}>für Sie.</span>
          </h1>
          <p
            style={{
              fontSize: "7pt",
              color: "rgba(255,255,255,0.82)",
              margin: "2.5mm 0 0",
              maxWidth: "115mm",
              lineHeight: 1.4,
            }}
          >
            Einlösbar für Heilmassage, Klassische Massage, Lymphdrainage und Sportmassage.
          </p>
        </div>

        <div
          style={{
            position: "relative",
            zIndex: 2,
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
                  color: "#f2a93b",
                  fontWeight: 800,
                }}
              >
                {label}
              </p>
              <div
                style={{
                  borderBottom: "0.3mm solid rgba(255,255,255,0.5)",
                  height: "5mm",
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* === RÜCKSEITE === */}
      <div className="gutschein-page-label">Rückseite</div>
      <div
        className="gutschein-page"
        style={{
          background: "white",
          padding: "9mm 11mm",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
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
          <p style={{ margin: "2mm 0 0", color: "#555", maxWidth: "120mm" }}>
            Termin vorab telefonisch, per E-Mail oder online vereinbaren und den Gutschein
            zur Behandlung mitbringen. Einlösbar für alle Behandlungen in der Praxis.
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
            <p style={{ margin: 0, fontWeight: 800, color: "#111" }}>Domenic Hacker</p>
            <p style={{ margin: "0.3mm 0 0", color: "#555", fontSize: "7pt" }}>
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
              Kontakt
            </p>
            <p style={{ margin: 0, color: "#555", fontSize: "7pt" }}>
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
          }}
        >
          <p
            style={{
              margin: 0,
              color: "#888",
              fontSize: "5.5pt",
              fontStyle: "italic",
            }}
          >
            Gültig 3 Jahre ab Ausstellung · nicht in bar ablösbar
          </p>
          <Image src="/images/logo-icon.svg" alt="" width={28} height={28} style={{ opacity: 0.7 }} />
        </div>
      </div>
    </>
  );
}
