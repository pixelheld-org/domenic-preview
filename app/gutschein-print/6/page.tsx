/* Variante 6: Praxis-Karte — Foto links + Inhalt rechts, im Stil der Homepage-"Praxis"-Section */

import Image from "next/image";

export default function Gutschein6() {
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
          background: "#f8f7f5",
          padding: "7mm",
          display: "grid",
          gridTemplateColumns: "55mm 1fr",
          gap: "6mm",
          alignItems: "stretch",
        }}
      >
        {/* Foto links, rounded wie Praxis-Section */}
        <div
          style={{
            position: "relative",
            borderRadius: "4mm",
            overflow: "hidden",
            boxShadow: "0 1mm 2mm rgba(0,0,0,0.08)",
          }}
        >
          <Image
            src="/images/behandlungsraum.webp"
            alt=""
            fill
            sizes="55mm"
            style={{ objectFit: "cover" }}
          />
          {/* Petrol Tönung */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(13,79,79,0.08) 0%, rgba(13,79,79,0.32) 100%)",
            }}
          />
          {/* Pill am Foto */}
          <div
            style={{
              position: "absolute",
              top: "3mm",
              left: "3mm",
              background: "rgba(255,255,255,0.92)",
              color: "#0d4f4f",
              padding: "1mm 2.5mm",
              borderRadius: "10mm",
              fontSize: "5.5pt",
              fontWeight: 800,
              letterSpacing: "1px",
              textTransform: "uppercase",
            }}
          >
            Wien 1080
          </div>
        </div>

        {/* Rechte Spalte */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "2mm 0",
          }}
        >
          <div>
            <span
              style={{
                display: "inline-block",
                background: "rgba(13,79,79,0.08)",
                color: "#0d4f4f",
                padding: "1mm 2.5mm",
                borderRadius: "10mm",
                fontSize: "5.5pt",
                fontWeight: 800,
                letterSpacing: "1px",
                textTransform: "uppercase",
              }}
            >
              Gutschein
            </span>
            <h1
              style={{
                fontSize: "16pt",
                fontWeight: 900,
                color: "#111",
                margin: "2mm 0 0",
                lineHeight: 1.1,
                letterSpacing: "-0.4px",
              }}
            >
              Ihr Raum für{" "}
              <span style={{ color: "#0d4f4f" }}>Erholung</span>.
            </h1>
            <p style={{ fontSize: "7pt", color: "#555", margin: "2mm 0 0", lineHeight: 1.4 }}>
              Einlösbar für Heilmassage, Klassische Massage, Lymphdrainage und Sportmassage.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "2.5mm 4mm",
              fontSize: "6.5pt",
            }}
          >
            {["Für", "Wert", "Nr.", "Datum"].map((label) => (
              <div key={label}>
                <p
                  style={{
                    margin: "0 0 0.3mm",
                    fontSize: "5pt",
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    color: "#0d4f4f",
                    fontWeight: 800,
                  }}
                >
                  {label}
                </p>
                <div
                  style={{
                    borderBottom: "0.3mm solid #c5d4d4",
                    height: "4mm",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* === RÜCKSEITE === */}
      <div className="gutschein-page-label">Rückseite</div>
      <div
        className="gutschein-page"
        style={{
          background: "#f8f7f5",
          padding: "8mm 10mm",
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
              padding: "1mm 2.5mm",
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
            zur Behandlung mitbringen.
          </p>
        </div>

        <div
          style={{
            background: "white",
            borderRadius: "3mm",
            padding: "3mm 4mm",
            boxShadow: "0 0.5mm 1.5mm rgba(0,0,0,0.06)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <p style={{ margin: 0, fontWeight: 800, color: "#0d4f4f", fontSize: "9pt" }}>
              Domenic Hacker
            </p>
            <p style={{ margin: "0.3mm 0 0", fontSize: "6.5pt", color: "#666" }}>
              Dipl. Heilmasseur · Feldgasse 3/20, 1080 Wien
            </p>
            <p style={{ margin: "1mm 0 0", fontSize: "6.5pt", color: "#0d4f4f", fontWeight: 600 }}>
              heilmasseur-domenic.at
            </p>
          </div>
          <Image src="/images/logo-icon.svg" alt="" width={36} height={36} style={{ opacity: 0.9 }} />
        </div>

        <p
          style={{
            margin: 0,
            fontSize: "5.5pt",
            color: "#888",
            fontStyle: "italic",
            textAlign: "center",
          }}
        >
          Gültig 3 Jahre ab Ausstellung · nicht in bar ablösbar
        </p>
      </div>
    </>
  );
}
