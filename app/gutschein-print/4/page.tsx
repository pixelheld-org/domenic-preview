/* Variante 4: Minimalistisch — viel Weißraum, dünne Petrol-Linien, typografisch */

import Image from "next/image";

export default function Gutschein4() {
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
          padding: "11mm 13mm",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {/* Top: Logo + Adresszeile */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Image src="/images/logo-icon.svg" alt="" width={26} height={26} />
          <p
            style={{
              fontSize: "6pt",
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: "#0d4f4f",
              margin: 0,
              textAlign: "right",
              fontWeight: 600,
            }}
          >
            Heilmasseur
            <br />
            Domenic Hacker
          </p>
        </div>

        {/* Mitte: Große, dünne Typografie */}
        <div>
          <h1
            style={{
              fontSize: "28pt",
              fontWeight: 300,
              color: "#0d4f4f",
              margin: 0,
              lineHeight: 1,
              letterSpacing: "-1px",
            }}
          >
            Gutschein.
          </h1>
          <p
            style={{
              fontSize: "8pt",
              color: "#555",
              margin: "3mm 0 0",
              lineHeight: 1.5,
              maxWidth: "85mm",
            }}
          >
            Eine Behandlung als Geschenk — einlösbar für Heilmassage,
            Klassische Massage, Lymphdrainage oder Sportmassage.
          </p>
        </div>

        {/* Felder als reduzierte Linien-Reihen */}
        <div style={{ fontSize: "7pt" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "auto 1fr auto 1fr",
              alignItems: "center",
              gap: "0 4mm",
              borderTop: "0.3mm solid #0d4f4f",
              paddingTop: "3mm",
            }}
          >
            <span
              style={{
                fontSize: "6pt",
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                color: "#0d4f4f",
                fontWeight: 700,
              }}
            >
              Für
            </span>
            <span
              style={{
                borderBottom: "0.2mm solid #aab8b8",
                height: "5mm",
                display: "block",
              }}
            />
            <span
              style={{
                fontSize: "6pt",
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                color: "#0d4f4f",
                fontWeight: 700,
              }}
            >
              Wert
            </span>
            <span
              style={{
                borderBottom: "0.2mm solid #aab8b8",
                height: "5mm",
                display: "block",
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
          padding: "11mm 13mm",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          fontSize: "7.5pt",
          color: "#333",
          lineHeight: 1.55,
        }}
      >
        <div>
          <p
            style={{
              fontSize: "6pt",
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: "#0d4f4f",
              margin: 0,
              fontWeight: 700,
            }}
          >
            Einlösung
          </p>
          <p style={{ margin: "1.5mm 0 0", color: "#555", maxWidth: "115mm" }}>
            Termin vorab telefonisch, per E-Mail oder online vereinbaren und den
            Gutschein zur Behandlung mitbringen.
          </p>
        </div>

        <div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "5mm",
              borderTop: "0.3mm solid #0d4f4f",
              paddingTop: "3mm",
            }}
          >
            <div>
              <p
                style={{
                  margin: "0 0 1mm",
                  fontSize: "6pt",
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  color: "#0d4f4f",
                  fontWeight: 700,
                }}
              >
                Praxis
              </p>
              <p style={{ margin: 0, color: "#333" }}>
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
                  color: "#0d4f4f",
                  fontWeight: 700,
                }}
              >
                Kontakt
              </p>
              <p style={{ margin: 0, color: "#333" }}>
                praxis@heilmasseur-domenic.at<br />
                heilmasseur-domenic.at
              </p>
            </div>
          </div>

          <p
            style={{
              margin: "3mm 0 0",
              fontSize: "6pt",
              color: "#888",
              fontStyle: "italic",
            }}
          >
            Gültig 3 Jahre ab Ausstellung · nicht in bar ablösbar
          </p>
        </div>
      </div>
    </>
  );
}
