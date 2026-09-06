import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getDatenschutzPage } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Datenschutzerklärung | Heilmasseur Domenic Hacker",
  description:
    "Datenschutzerklärung und Informationen zur Datenverarbeitung auf heilmasseur-domenic.at.",
  alternates: {
    canonical: "https://heilmasseur-domenic.at/datenschutz",
  },
};

const LAST_UPDATED = "09.04.2026";

function renderContent(content: string) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let bulletBuffer: string[] = [];

  const flushBullets = () => {
    if (bulletBuffer.length > 0) {
      elements.push(
        <ul key={`ul-${elements.length}`} className="list-disc pl-6 mt-2">
          {bulletBuffer.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );
      bulletBuffer = [];
    }
  };

  lines.forEach((line, i) => {
    if (line.startsWith("• ")) {
      bulletBuffer.push(line.slice(2));
    } else {
      flushBullets();
      elements.push(
        <span key={`line-${i}`}>
          {line}
          {i < lines.length - 1 && <br />}
        </span>
      );
    }
  });
  flushBullets();

  return elements;
}

export default async function Datenschutz() {
  const datenschutz = await getDatenschutzPage();
  const lastUpdated = datenschutz?.lastUpdated ?? LAST_UPDATED;

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-3xl px-5 sm:px-8 py-16 sm:py-24">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#0d4f4f] hover:underline mb-8"
        >
          <ArrowLeft size={16} />
          Zurück zur Startseite
        </Link>

        <h1 className="text-4xl font-extrabold text-[#111] mb-8">
          Datenschutzerklärung
        </h1>

        <div className="prose prose-gray max-w-none space-y-6 text-[#333] leading-relaxed">
          {datenschutz?.sections ? (
            datenschutz.sections.map((section, index) => (
              <section key={index}>
                <h2 className="text-xl font-bold text-[#111] mt-8 mb-3">
                  {section.heading}
                </h2>
                <p>{renderContent(section.content)}</p>

                {section.subsections?.map((sub, subIndex) => (
                  <div key={subIndex}>
                    <h3 className="text-lg font-semibold text-[#111] mt-6 mb-2">
                      {sub.heading}
                    </h3>
                    <p>{renderContent(sub.content)}</p>
                  </div>
                ))}
              </section>
            ))
          ) : (
            <>
          <section>
            <h2 className="text-xl font-bold text-[#111] mt-8 mb-3">
              1. Verantwortlicher
            </h2>
            <p>
              Verantwortlicher im Sinne der DSGVO:
            </p>
            <p>
              <strong>Domenic Hacker</strong>
              <br />
              Diplomierter medizinischer Masseur und Heilmasseur
              <br />
              Feldgasse 3/20
              <br />
              1080 Wien, Österreich
              <br />
              <br />
              Telefon:{" "}
              <a
                href="tel:+4367018952556"
                className="text-[#0d4f4f] hover:underline"
              >
                +43 670 189 52 56
              </a>
              <br />
              E-Mail:{" "}
              <a
                href="mailto:praxis@heilmasseur-domenic.at"
                className="text-[#0d4f4f] hover:underline"
              >
                praxis@heilmasseur-domenic.at
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#111] mt-8 mb-3">
              2. Erhobene Daten und Verarbeitungszwecke
            </h2>

            <h3 className="text-lg font-semibold text-[#111] mt-6 mb-2">
              2.1 Website-Nutzungsdaten
            </h3>
            <p>
              Beim Besuch unserer Website werden automatisch technische Daten
              erhoben (IP-Adresse, Browsertyp, Betriebssystem, Referrer-URL,
              Zugriffszeitpunkt). Diese werden für den technischen Betrieb der
              Website benötigt.
              <br />
              <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO
              (berechtigte Interessen).
            </p>

            <h3 className="text-lg font-semibold text-[#111] mt-6 mb-2">
              2.2 Terminbuchung
            </h3>
            <p>
              Für die Online-Terminbuchung nutzen wir den Dienst Calendly. Bei
              der Buchung werden Ihr Name, Ihre E-Mail-Adresse und ggf.
              Telefonnummer an Calendly übermittelt. Calendly verarbeitet diese
              Daten in unserem Auftrag.
              <br />
              <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO
              (Vertragsanbahnung).
            </p>

            <h3 className="text-lg font-semibold text-[#111] mt-6 mb-2">
              2.3 Kontaktaufnahme
            </h3>
            <p>
              Bei Kontaktaufnahme per E-Mail oder Telefon werden Ihre Angaben
              zur Bearbeitung der Anfrage und für mögliche Anschlussfragen
              gespeichert.
              <br />
              <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO
              (berechtigte Interessen).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#111] mt-8 mb-3">
              3. Verwendete Dienste
            </h2>

            <h3 className="text-lg font-semibold text-[#111] mt-6 mb-2">
              Hosting (Vercel)
            </h3>
            <p>
              Diese Website wird bei Vercel Inc. gehostet. Bei jedem Zugriff
              werden automatisch Server-Logfiles gespeichert. Vercel verarbeitet
              Daten auch in den USA; die Übermittlung erfolgt auf Basis der
              EU-Standardvertragsklauseln.
            </p>

            <h3 className="text-lg font-semibold text-[#111] mt-6 mb-2">
              Google Analytics
            </h3>
            <p>
              Diese Website nutzt Google Analytics zur Analyse der
              Website-Nutzung. Die IP-Adresse wird vor der Speicherung
              anonymisiert. Die Datenverarbeitung erfolgt auf Grundlage Ihrer
              Einwilligung über den Cookie-Banner. Sie können der Datenerfassung
              jederzeit widersprechen, indem Sie Ihre Cookie-Einstellungen
              anpassen.
              <br />
              <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. a DSGVO
              (Einwilligung).
            </p>

            <h3 className="text-lg font-semibold text-[#111] mt-6 mb-2">
              Google Tag Manager
            </h3>
            <p>
              Wir nutzen den Google Tag Manager zur Verwaltung unserer
              Tracking-Tools. Der Tag Manager selbst erfasst keine
              personenbezogenen Daten.
            </p>

            <h3 className="text-lg font-semibold text-[#111] mt-6 mb-2">
              Google Fonts
            </h3>
            <p>
              Diese Website verwendet Google Fonts, die lokal eingebunden werden.
              Es findet keine Verbindung zu Google-Servern statt.
            </p>

            <h3 className="text-lg font-semibold text-[#111] mt-6 mb-2">
              Calendly
            </h3>
            <p>
              Für die Terminbuchung wird Calendly eingebunden. Beim Laden des
              Buchungsformulars werden Daten an Calendly Inc. (USA) übermittelt.
              Die Übermittlung erfolgt auf Basis der EU-Standardvertragsklauseln.
            </p>

            <h3 className="text-lg font-semibold text-[#111] mt-6 mb-2">
              Google Places API
            </h3>
            <p>
              Zur Darstellung von Google-Bewertungen nutzen wir die Google Places
              API. Dabei werden serverseitig Bewertungsdaten von Google abgerufen.
              Es werden keine personenbezogenen Daten der Website-Besucher an
              Google übermittelt.
            </p>

            <h3 className="text-lg font-semibold text-[#111] mt-6 mb-2">
              Sanity CMS
            </h3>
            <p>
              Für die Verwaltung von Inhalten nutzen wir Sanity.io als
              Content-Management-System. Sanity verarbeitet keine
              personenbezogenen Daten der Website-Besucher.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#111] mt-8 mb-3">
              4. Cookies
            </h2>
            <p>
              Diese Website verwendet Cookies. Technisch notwendige Cookies
              werden ohne Einwilligung gesetzt. Analyse-Cookies (z.B. Google
              Analytics) werden nur mit Ihrer ausdrücklichen Einwilligung über
              den Cookie-Banner gesetzt. Sie können Ihre Cookie-Einstellungen
              jederzeit über den Link „Cookie-Einstellungen" im Footer dieser
              Website anpassen.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#111] mt-8 mb-3">
              5. Speicherdauer
            </h2>
            <p>
              Wir speichern personenbezogene Daten nur so lange, wie es für die
              jeweiligen Zwecke erforderlich ist oder gesetzliche
              Aufbewahrungspflichten bestehen:
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>Terminbuchungsdaten: 1 Jahr nach dem Termin</li>
              <li>Kontaktanfragen: 2 Jahre nach Abschluss der Korrespondenz</li>
              <li>
                Buchhaltungsrelevante Daten: 7 Jahre gemäß österreichischem
                Steuerrecht
              </li>
              <li>Technische Log-Daten: maximal 30 Tage</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#111] mt-8 mb-3">
              6. Ihre Rechte
            </h2>
            <p>
              Sie haben gemäß DSGVO folgende Rechte gegenüber dem
              Verantwortlichen:
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>
                <strong>Auskunftsrecht</strong> (Art. 15 DSGVO)
              </li>
              <li>
                <strong>Berichtigungsrecht</strong> (Art. 16 DSGVO)
              </li>
              <li>
                <strong>Löschungsrecht</strong> (Art. 17 DSGVO)
              </li>
              <li>
                <strong>Einschränkung der Verarbeitung</strong> (Art. 18 DSGVO)
              </li>
              <li>
                <strong>Datenübertragbarkeit</strong> (Art. 20 DSGVO)
              </li>
              <li>
                <strong>Widerspruchsrecht</strong> (Art. 21 DSGVO)
              </li>
              <li>
                <strong>Widerrufsrecht</strong> (Art. 7 Abs. 3 DSGVO)
              </li>
            </ul>
            <p className="mt-4">
              Zur Ausübung dieser Rechte wenden Sie sich bitte an:{" "}
              <a
                href="mailto:praxis@heilmasseur-domenic.at"
                className="text-[#0d4f4f] hover:underline"
              >
                praxis@heilmasseur-domenic.at
              </a>
            </p>
            <p className="mt-4">
              Sie haben außerdem das Recht, sich bei der zuständigen
              Datenschutzbehörde zu beschweren:
            </p>
            <p className="mt-2">
              <strong>Österreichische Datenschutzbehörde</strong>
              <br />
              Barichgasse 40–42
              <br />
              1030 Wien
              <br />
              E-Mail: dsb@dsb.gv.at
              <br />
              Website:{" "}
              <a
                href="https://www.dsb.gv.at"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0d4f4f] hover:underline"
              >
                www.dsb.gv.at
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#111] mt-8 mb-3">
              7. Datensicherheit
            </h2>
            <p>
              Wir setzen technische und organisatorische Sicherheitsmaßnahmen
              ein, um Ihre Daten gegen Manipulationen, Verlust, Zerstörung oder
              unbefugten Zugriff zu schützen. Alle Datenübertragungen erfolgen
              verschlüsselt (TLS/HTTPS).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#111] mt-8 mb-3">
              8. Aktualität und Änderungen
            </h2>
            <p>
              Diese Datenschutzerklärung wurde zuletzt am {lastUpdated}{" "}
              aktualisiert. Wir behalten uns vor, diese Datenschutzerklärung
              anzupassen, damit sie stets den aktuellen rechtlichen
              Anforderungen entspricht.
            </p>
          </section>
          </>
          )}
        </div>
      </div>
    </div>
  );
}
