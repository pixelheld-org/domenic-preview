import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getImpressumPage } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Impressum | Heilmasseur Domenic Hacker",
  description: "Impressum und rechtliche Informationen von Heilmasseur Domenic Hacker, Wien 1080.",
};

export default async function Impressum() {
  const impressum = await getImpressumPage();

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

        <h1 className="text-4xl font-extrabold text-[#111] mb-8">Impressum</h1>

        <div className="prose prose-gray max-w-none space-y-6 text-[#333] leading-relaxed">
          {impressum?.sections ? (
            impressum.sections.map((section, index) => (
              <section key={index}>
                <h2 className="text-xl font-bold text-[#111] mt-8 mb-3">
                  {section.heading}
                </h2>
                <p>
                  {section.content.split("\n").map((line, i, arr) => (
                    <span key={i}>
                      {line}
                      {i < arr.length - 1 && <br />}
                    </span>
                  ))}
                </p>
              </section>
            ))
          ) : (
            <>
          <section>
            <h2 className="text-xl font-bold text-[#111] mt-8 mb-3">
              Angaben gemäß § 5 ECG / § 25 MedienG
            </h2>
            <p>
              <strong>Domenic Hacker</strong>
              <br />
              Diplomierter medizinischer Masseur und Heilmasseur
              <br />
              Feldgasse 3/20
              <br />
              1080 Wien, Österreich
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#111] mt-8 mb-3">
              Kontakt
            </h2>
            <p>
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
              Berufsbezeichnung
            </h2>
            <p>
              Diplomierter medizinischer Masseur und Heilmasseur
              <br />
              Berufsbezeichnung verliehen in: Österreich
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#111] mt-8 mb-3">
              Zuständige Aufsichtsbehörde
            </h2>
            <p>
              Bezirkshauptmannschaft / Magistrat Wien
              <br />
              Gewerbebehörde: Magistratisches Bezirksamt für den 8. Bezirk
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#111] mt-8 mb-3">
              Kammerzugehörigkeit
            </h2>
            <p>
              Wirtschaftskammer Wien (WKO)
              <br />
              Fachgruppe der persönlichen Dienstleister
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#111] mt-8 mb-3">
              Anwendbare Rechtsvorschriften
            </h2>
            <p>
              Medizinischer Masseur- und Heilmasseurgesetz (MMHmG)
              <br />
              Gewerbeordnung (GewO)
              <br />
              Zugänglich unter:{" "}
              <a
                href="https://www.ris.bka.gv.at"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0d4f4f] hover:underline"
              >
                ris.bka.gv.at
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#111] mt-8 mb-3">
              Streitschlichtung
            </h2>
            <p>
              Die Europäische Kommission stellt eine Plattform zur
              Online-Streitbeilegung (OS) bereit:{" "}
              <a
                href="https://ec.europa.eu/consumers/odr/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0d4f4f] hover:underline"
              >
                ec.europa.eu/consumers/odr/
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#111] mt-8 mb-3">
              Haftungsausschluss
            </h2>
            <p>
              Die Inhalte dieser Website wurden mit größter Sorgfalt erstellt.
              Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte
              kann jedoch keine Gewähr übernommen werden.
            </p>
          </section>
          </>
          )}
        </div>
      </div>
    </div>
  );
}
