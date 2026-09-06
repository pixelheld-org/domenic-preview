import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Footer } from "@/components/Footer";
import { getSettings } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "AGB | Heilmasseur Domenic Hacker",
  description:
    "Allgemeine Geschäftsbedingungen der Praxis Domenic Hacker, diplomierter Heilmasseur in Wien 1080.",
  alternates: {
    canonical: "https://heilmasseur-domenic.at/agb",
  },
};

export default async function Agb() {
  const settings = await getSettings();

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

        <h1 className="text-4xl font-extrabold text-[#111] mb-2">AGB</h1>
        <p className="text-lg font-semibold text-[#555] mb-4">
          Allgemeine Geschäftsbedingungen
        </p>
        <p className="text-sm text-[#555] mb-10 leading-relaxed">
          Formuliert von{" "}
          <a
            href="https://pixelmeister.at"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0d4f4f] hover:underline"
          >
            Pixelmeister
          </a>{" "}
          für Domenic Hacker zur Bestätigung. Stand: 25.08.2026.
        </p>

        <div className="prose prose-gray max-w-none space-y-6 text-[#333] leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-[#111] mt-8 mb-3">
              1. Geltungsbereich und Vertragspartner
            </h2>
            <p>
              Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle
              Behandlungen, Terminbuchungen, Gutscheine und sonstigen Leistungen
              der Praxis
            </p>
            <p className="mt-3">
              <strong>Domenic Hacker</strong>
              <br />
              Diplomierter medizinischer Masseur und Heilmasseur
              <br />
              Feldgasse 3/20
              <br />
              1080 Wien
              <br />
              Österreich
            </p>
            <p className="mt-3">
              Telefon:{" "}
              <a
                href="tel:+436701895256"
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
              <br />
              Website:{" "}
              <a
                href="https://heilmasseur-domenic.at"
                className="text-[#0d4f4f] hover:underline"
              >
                heilmasseur-domenic.at
              </a>
            </p>
            <p className="mt-3">
              Vertragspartnerin bzw. Vertragspartner ist die natürliche oder
              juristische Person, die eine Leistung bucht, in Anspruch nimmt
              oder einen Gutschein kauft (im Folgenden „Klientin“ / „Klient“).
              Abweichende Bedingungen der Klientin bzw. des Klienten gelten
              nur, wenn sie schriftlich bestätigt wurden.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#111] mt-8 mb-3">
              2. Leistungen
            </h2>
            <p>
              Die Praxis erbringt massage- und körpertherapeutische Leistungen
              in den Räumen in der Feldgasse 3/20, 1080 Wien, insbesondere:
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>Heilmassage</li>
              <li>Sportmassage</li>
              <li>Manuelle Lymphdrainage</li>
              <li>Klassische Massage</li>
            </ul>
            <p className="mt-3">
              Art, Dauer und Inhalt der Behandlung ergeben sich aus der
              Buchung und der Abstimmung vor Ort. Die Praxis darf die
              Behandlung anpassen, unterbrechen oder ablehnen, wenn
              gesundheitliche Gründe, unzureichende Angaben oder das Wohl der
              Klientin bzw. des Klienten das erfordern.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#111] mt-8 mb-3">
              3. Terminbuchung und Bestätigung
            </h2>
            <p>
              Termine werden nach Verfügbarkeit vergeben. Die Online-Buchung
              erfolgt über Calendly auf{" "}
              <Link href="/buchen" className="text-[#0d4f4f] hover:underline">
                heilmasseur-domenic.at/buchen
              </Link>
              . Buchungen sind auch telefonisch oder per E-Mail möglich.
            </p>
            <p className="mt-3">
              Mit der Buchung gibt die Klientin bzw. der Klient ein Angebot auf
              Abschluss eines Behandlungsvertrags ab. Der Vertrag kommt zustande,
              sobald der Termin bestätigt ist — bei Online-Buchung durch die
              Bestätigung von Calendly (in der Regel per E-Mail), sonst durch
              ausdrückliche Zusage der Praxis.
            </p>
            <p className="mt-3">
              Bitte erscheinen Sie pünktlich. Verspätungen verkürzen die
              Behandlungszeit, das Honorar bleibt unverändert. Bei mehr als
              15 Minuten Verspätung kann der Termin wie ein Nichtantritt
              behandelt werden, wenn er sich nicht mehr sinnvoll durchführen
              lässt.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#111] mt-8 mb-3">
              4. Stornierung und Nichtantritt
            </h2>
            <p>
              Ein gebuchter Termin muss mindestens 24 Stunden vor dem
              vereinbarten Terminbeginn storniert werden. Absagen sind
              telefonisch, per E-Mail oder über den Link in der
              Calendly-Bestätigung möglich. Maßgeblich ist der Eingang bei der
              Praxis.
            </p>
            <p className="mt-3">
              Erfolgt die Stornierung später als 24 Stunden vor dem Termin oder
              erscheint die Klientin bzw. der Klient nicht (Nichtantritt), ist
              Domenic Hacker berechtigt, den vollen Behandlungspreis der
              gebuchten Massage zu verlangen. In diesen Fällen wird der volle
              Behandlungspreis fällig.
            </p>
            <p className="mt-3">
              Sagt die Praxis selbst ab, entstehen der Klientin bzw. dem
              Klienten keine Kosten; ein Ersatztermin wird angeboten.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#111] mt-8 mb-3">
              5. Preise und Zahlung
            </h2>
            <p>
              Es gelten die zum Buchungszeitpunkt auf{" "}
              <Link href="/preise" className="text-[#0d4f4f] hover:underline">
                heilmasseur-domenic.at/preise
              </Link>{" "}
              ausgewiesenen Preise. Alle Beträge verstehen sich in Euro
              einschließlich der gesetzlichen Umsatzsteuer, soweit diese
              anfällt.
            </p>
            <p className="mt-3">
              Das Honorar ist unmittelbar nach der Behandlung fällig, bar oder
              mit Bankomatkarte, sofern nichts anderes vereinbart ist.
              Gutscheine und Block-Karten werden online über Stripe bezahlt
              (Karte, Apple Pay, Google Pay, SEPA, soweit angeboten).
            </p>
            <p className="mt-3">
              Eine eventuelle Kostenbeteiligung durch Krankenkassen ist Sache
              der Klientin bzw. des Klienten. Heilmassage kann mit ärztlicher
              Verordnung teilweise erstattet werden; Sportmassage ist in der
              Regel eine Wellnessleistung und nicht erstattbar. Die Praxis
              übernimmt keine Garantie für die Höhe oder den Erfolg einer
              Rückerstattung.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#111] mt-8 mb-3">
              6. Gutscheine und Block-Karten
            </h2>
            <p>
              Gutscheine und Block-Karten sind drei Jahre ab Kauf gültig,
              übertragbar und nicht in bar ablösbar. Restguthaben bleibt bis zum
              Ablauf erhalten. Beim Einlösen ist ein Termin vorab zu buchen;
              der Gutscheincode ist bei der Behandlung vorzuweisen oder zu
              nennen.
            </p>
            <p className="mt-3">
              Digitale Gutscheine (PDF) werden nach Zahlung an die angegebene
              E-Mail-Adresse geliefert. Das Widerrufsrecht erlischt bei
              digitalen Inhalten nach Lieferung des PDFs, wenn die Klientin
              bzw. der Klient dem Beginn der Ausführung vor Ablauf der
              Widerrufsfrist ausdrücklich zugestimmt und zur Kenntnis genommen
              hat, dass das Widerrufsrecht damit verloren geht (§ 18 FAGG).
            </p>
            <p className="mt-3">
              Für einen mit Gutschein oder Block-Karte gebuchten Termin gelten
              die Stornoregeln in Punkt 4. Bei verspäteter Absage oder
              Nichtantritt wird der volle Behandlungspreis fällig bzw. vom
              Guthaben abgebucht.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#111] mt-8 mb-3">
              7. Mitwirkung und Gesundheit
            </h2>
            <p>
              Vor der Behandlung sind relevante gesundheitliche Umstände
              wahrheitsgemäß mitzuteilen, insbesondere Schmerzen, akute
              Erkrankungen, Entzündungen, Thrombosen, Schwangerschaft,
              Operationen, Unverträglichkeiten und ärztliche Vorgaben. Die
              Behandlung ersetzt keine Anamnese durch eine Ärztin oder einen
              Arzt.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#111] mt-8 mb-3">
              8. Haftung und Hinweis zur Heilmassage
            </h2>
            <p>
              Heilmassage, Sportmassage, Lymphdrainage und klassische Massage
              ersetzen keine ärztliche Diagnose, Behandlung oder Therapie. Es
              werden keine Heilversprechen abgegeben. Bei Beschwerden mit
              medizinischem Klärungsbedarf ist eine Ärztin oder ein Arzt
              aufzusuchen.
            </p>
            <p className="mt-3">
              Die Praxis haftet für Vorsatz und grobe Fahrlässigkeit sowie nach
              den zwingenden Vorschriften des Produkthaftungsgesetzes. Bei
              leichter Fahrlässigkeit ist die Haftung — soweit gesetzlich
              zulässig — ausgeschlossen, ausgenommen Personenschäden. Für
              Schäden, die auf unvollständige oder unrichtige Angaben der
              Klientin bzw. des Klienten zurückgehen, wird — soweit gesetzlich
              zulässig — nicht gehaftet.
            </p>
            <p className="mt-3">
              Für mitgebrachte Wertsachen wird keine Haftung übernommen.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#111] mt-8 mb-3">
              9. Datenschutz
            </h2>
            <p>
              Personenbezogene Daten werden nach der Datenschutzerklärung
              verarbeitet, einsehbar unter{" "}
              <Link
                href="/datenschutz"
                className="text-[#0d4f4f] hover:underline"
              >
                heilmasseur-domenic.at/datenschutz
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#111] mt-8 mb-3">
              10. Schlussbestimmungen
            </h2>
            <p>
              Es gilt österreichisches Recht unter Ausschluss der
              Verweisungsnormen des internationalen Privatrechts. Zwingende
              Verbraucherschutzvorschriften des Staates, in dem die
              Verbraucherin bzw. der Verbraucher den gewöhnlichen Aufenthalt
              hat, bleiben unberührt.
            </p>
            <p className="mt-3">
              Gerichtsstand ist Wien, soweit gesetzlich zulässig. Gegenüber
              Verbraucherinnen und Verbrauchern im Sinne des KSchG gelten die
              gesetzlichen Gerichtsstände.
            </p>
            <p className="mt-3">
              Sollte eine Bestimmung unwirksam sein, bleibt der Rest dieser AGB
              wirksam. Anstelle der unwirksamen Bestimmung gilt eine Regelung,
              die dem wirtschaftlichen Zweck am nächsten kommt.
            </p>
            <p className="mt-3">
              Impressum:{" "}
              <Link
                href="/impressum"
                className="text-[#0d4f4f] hover:underline"
              >
                heilmasseur-domenic.at/impressum
              </Link>
            </p>
          </section>
        </div>
      </div>
      <Footer sanitySettings={settings} />
    </div>
  );
}
