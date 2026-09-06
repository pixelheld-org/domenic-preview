import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Award,
  Flower2,
  Footprints,
  Activity,
  Target,
  Zap,
  CircleDot,
  Hand,
  Waves,
  BatteryCharging,
  Calendar,
  MapPin,
  Quote,
} from "lucide-react";
import { Footer } from "@/components/Footer";
import { getAbout, getSettings } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

export const metadata: Metadata = {
  title: "Über Domenic Hacker | Heilmasseur Wien 1080",
  description:
    "Diplomierter Heilmasseur in Wien 1080 mit Abschluss mit Auszeichnung und Erfahrung aus Rehabilitationsinstituten. Erfahren Sie mehr über Domenic Hackers Weg, Ausbildungen und Arbeitsweise.",
  openGraph: {
    title: "Über Domenic Hacker | Heilmasseur Wien 1080",
    description:
      "Diplomierter Heilmasseur in Wien 1080 – Nuad Thai, Lymphdrainage, Akupunktur-Massage und mehr. Abschluss mit Auszeichnung, Erfahrung aus der Rehabilitation.",
    url: "https://heilmasseur-domenic.at/ueber-mich",
  },
  alternates: {
    canonical: "https://heilmasseur-domenic.at/ueber-mich",
  },
};

const FALLBACK_CREDENTIALS = [
  { icon: Award, label: "Diplomierter Heilmasseur" },
  { icon: Flower2, label: "Nuad Thai Massage (Watpo-Stil)" },
  { icon: Flower2, label: "Thai Tisch Massage" },
  { icon: Footprints, label: "Manuelle Lymphdrainage (Dr. Vodder)" },
  { icon: Hand, label: "Bindegewebs-Massage" },
  { icon: Activity, label: "Sportbetreuer" },
  { icon: Target, label: "Dorn-Breuss Wirbelsäulenbehandlung" },
  { icon: Zap, label: "Fußreflexzonen-Massage" },
  { icon: CircleDot, label: "Akupunktur Massage (Penzel)" },
  { icon: Waves, label: "Schröpfen" },
  { icon: BatteryCharging, label: "Elektrotherapie" },
];

const FALLBACK_BIO = [
  "Mein Weg zur Heilmassage begann nicht im Lehrsaal, sondern in der Bewegung. Breakdance hat mich seit der Jugend begleitet – und mit ihm ein tiefes Verständnis dafür, wie der Körper funktioniert, wo er Grenzen hat und wie man gezielt mit ihm arbeitet.",
  "Nach meiner Ausbildung mit ausgezeichnetem Erfolg sammelte ich Erfahrung in Rehabilitationsinstituten in Wien. Dort habe ich gelernt: Massage ist mehr als Entspannung. Es geht um gezieltes, wirksames Arbeiten am Körper – angepasst an die Person, nicht an ein Schema.",
  "Heute behandle ich in meiner Praxis in der Josefstadt Menschen mit Rückenschmerzen, Schulter- und Nackenproblemen, Verspannungen und mehr. Was mich antreibt, ist das Feedback nach einer Behandlung – wenn jemand nach Wochen zum ersten Mal wieder schmerzfrei schläft oder den Kopf wieder richtig drehen kann.",
];

export default async function UeberMichPage() {
  const [about, settings] = await Promise.all([getAbout(), getSettings()]);

  const bio =
    about?.bio && about.bio.length > 0 ? about.bio : FALLBACK_BIO;

  const credentials =
    about?.credentials && about.credentials.length > 0
      ? about.credentials.map((label, i) => ({
          icon: FALLBACK_CREDENTIALS[i % FALLBACK_CREDENTIALS.length].icon,
          label,
        }))
      : FALLBACK_CREDENTIALS;

  const yearsExperience = about?.yearsExperience ?? "15+";
  const qualificationsCount = about?.qualificationsCount ?? "11";

  const heroImageUrl = about?.heroImage
    ? urlFor(about.heroImage).width(800).height(600).url()
    : "/images/domenic-1080.webp";

  const heroSubtitle =
    about?.heroSubtitle ??
    `Diplomierter Heilmasseur mit Leidenschaft für Bewegung und gezieltes Arbeiten am Körper. Seit ${yearsExperience} Jahren helfe ich Menschen, Schmerzen zu lindern und Wohlbefinden zurückzugewinnen.`;

  const breakdanceImageUrl = about?.breakdanceImage
    ? urlFor(about.breakdanceImage).width(600).height(750).url()
    : "/images/breakdance.jpg";

  const addressLine1 = settings?.address?.split(",")[0]?.trim() ?? "Feldgasse 3/20";
  const addressLine2 = settings?.address?.split(",")[1]?.trim() ?? "1080 Wien";

  const meinWegHighlights = about?.meinWegHighlights && about.meinWegHighlights.length > 0
    ? about.meinWegHighlights
    : [
        { title: "Mit Auszeichnung", subtitle: "Abschluss der Ausbildung" },
        { title: "Reha-Erfahrung", subtitle: "In Rehabilitationsinstituten" },
      ];

  const philosophieTexte = about?.philosophieTexte && about.philosophieTexte.length > 0
    ? about.philosophieTexte
    : [
        "Jeder Körper spricht eine eigene Sprache. Deshalb beginne ich jede Behandlung mit einem kurzen Gespräch: Wo drückt der Schuh? Was soll sich danach anders anfühlen? Erst dann lege ich los — mit der Intensität, die Ihr Körper gerade braucht.",
        "Zu viel Druck löst Schutzmechanismen aus, zu wenig bringt nichts. Mein Ziel ist die goldene Mitte: eine Behandlung, die Sie spüren, ohne Sie zu überfordern.",
        "Meine Breakdance-Vergangenheit hat mir gelehrt, wie Bewegung und Körpergefühl zusammenspielen — dieses Wissen fließt direkt in meine Arbeit ein.",
      ];

  const quoteText =
    about?.quote ??
    `„Heilmasseur ist meine Berufung. Ich höre auf den Körper — und dann arbeite ich gezielt dort, wo er es wirklich braucht."`;

  const quoteAuthorTitle =
    about?.quoteAuthorTitle ?? "Diplomierter Heilmasseur, Wien 1080";

  const quoteAvatarUrl = about?.image
    ? urlFor(about.image).width(80).height(80).url()
    : "/images/domenic-1080.webp";

  const ctaHeading = about?.ctaHeading ?? "Bereit für Ihre erste Behandlung?";
  const ctaText =
    about?.ctaText ??
    "Buchen Sie jetzt Ihren Termin online – unkompliziert und in wenigen Schritten.";
  const phone = settings?.phone ?? "+43 670 189 52 56";

  return (
    <>
      <main>
        {/* ── Hero ──────────────────────────────────────────────────── */}
        <section className="relative bg-[#0d4f4f] pt-24 pb-16 sm:pb-24 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#e8654a] via-[#f2a93b] to-[#0d4f4f]" />
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-[#e8654a]/8 pointer-events-none" />

          <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left — text */}
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-bold text-white/80">
                  Über mich
                </span>

                <h1 className="mt-5 text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold leading-[1.02] tracking-tight text-white">
                  Domenic{" "}
                  <span className="text-[#f2a93b]">Hacker</span>
                </h1>

                <p className="mt-5 text-lg text-white/70 leading-relaxed max-w-md">
                  {heroSubtitle}
                </p>

                {/* Stats row */}
                <div className="mt-8 flex flex-wrap gap-6 items-start">
                  <div>
                    <span className="block text-3xl font-extrabold text-[#f2a93b]">
                      {yearsExperience}
                    </span>
                    <span className="text-sm text-white/50">Jahre Erfahrung</span>
                  </div>
                  <div className="w-px self-stretch bg-white/15" />
                  <div>
                    <span className="block text-3xl font-extrabold text-[#f2a93b]">
                      {qualificationsCount}
                    </span>
                    <span className="text-sm text-white/50">Qualifikationen</span>
                  </div>
                  <div className="w-px self-stretch bg-white/15" />
                  <div className="flex items-start gap-1.5">
                    <MapPin size={14} className="text-[#e8654a] mt-1 shrink-0" />
                    <div>
                      <span className="block text-white/90 font-semibold text-sm">
                        {addressLine1}
                      </span>
                      <span className="text-sm text-white/50">{addressLine2}</span>
                    </div>
                  </div>
                </div>

                <Link
                  href="/buchen"
                  className="mt-10 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#e8654a] to-[#f2a93b] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#e8654a]/30 hover:shadow-xl hover:shadow-[#e8654a]/35 hover:scale-105 transition-all duration-200"
                >
                  <Calendar size={16} />
                  Jetzt Termin buchen
                </Link>
              </div>

              {/* Right — portrait */}
              <div className="relative">
                <div className="absolute -top-4 -right-4 w-full h-full rounded-3xl bg-[#f2a93b]/15 rotate-1 pointer-events-none" />
                <div className="relative rounded-3xl overflow-hidden aspect-[4/3] max-w-lg mx-auto lg:mx-0 lg:ml-auto">
                  <Image
                    src={heroImageUrl}
                    alt="Domenic Hacker – Diplomierter Heilmasseur in Wien"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Mein Weg ──────────────────────────────────────────────── */}
        <section className="py-16 sm:py-24 bg-white">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Image column */}
              <div className="relative order-2 lg:order-1">
                <div className="absolute -bottom-6 -left-6 w-full h-full rounded-3xl bg-[#0d4f4f]/8 rotate-2 pointer-events-none" />
                <div className="relative rounded-3xl overflow-hidden aspect-[4/5] max-w-md mx-auto">
                  <Image
                    src={breakdanceImageUrl}
                    alt="Domenic Hacker beim Breakdance – Körpergefühl aus der Bewegung"
                    fill
                    className="object-cover"
                    quality={75}
                  />
                </div>
              </div>

              {/* Text column */}
              <div className="order-1 lg:order-2">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#0d4f4f]/8 px-4 py-1.5 text-sm font-bold text-[#0d4f4f]">
                  Mein Weg
                </span>

                <h2 className="mt-4 text-[clamp(1.8rem,3.5vw,2.8rem)] font-extrabold leading-[1.1] tracking-tight text-[#111]">
                  Von der Bewegung{" "}
                  <span className="text-[#0d4f4f]">zur Heilung</span>
                </h2>

                <div className="mt-6 space-y-4 text-base text-[#555] leading-relaxed">
                  {bio.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>

                {/* Highlight cards */}
                <div className="mt-8 grid grid-cols-2 gap-4">
                  {meinWegHighlights.map((highlight, i) => (
                    <div
                      key={i}
                      className={`rounded-2xl p-4 ${
                        i % 2 === 0
                          ? "bg-[#0d4f4f]/5 border border-[#0d4f4f]/10"
                          : "bg-[#e8654a]/5 border border-[#e8654a]/10"
                      }`}
                    >
                      <span
                        className={`block text-xl font-extrabold ${
                          i % 2 === 0 ? "text-[#0d4f4f]" : "text-[#e8654a]"
                        }`}
                      >
                        {highlight.title}
                      </span>
                      <span className="text-sm text-[#555]">
                        {highlight.subtitle}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Qualifikationen ───────────────────────────────────────── */}
        <section className="py-16 sm:py-24 bg-[#0d4f4f] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#e8654a] via-[#f2a93b] to-[#0d4f4f]" />
          <div className="absolute -bottom-32 -right-32 w-[450px] h-[450px] rounded-full bg-[#f2a93b]/5 pointer-events-none" />

          <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
            <div className="text-center max-w-2xl mx-auto">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-bold text-white/80">
                Ausbildungen &amp; Qualifikationen
              </span>
              <h2 className="mt-4 text-[clamp(1.8rem,3.5vw,2.8rem)] font-extrabold leading-[1.1] tracking-tight text-white">
                {qualificationsCount} anerkannte{" "}
                <span className="text-[#f2a93b]">Zertifizierungen</span>
              </h2>
              <p className="mt-4 text-white/60 leading-relaxed">
                Stetige Weiterbildung ist für mich keine Pflicht, sondern
                Überzeugung — damit Sie stets von den wirksamsten Methoden
                profitieren.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {credentials.map((cred) => (
                <div
                  key={cred.label}
                  className="flex items-center gap-3 rounded-2xl bg-white/[0.06] border border-white/[0.08] px-4 py-3.5 hover:bg-white/[0.1] transition-colors duration-200"
                >
                  <cred.icon size={18} className="text-[#f2a93b] shrink-0" />
                  <span className="text-sm font-semibold text-white/85">
                    {cred.label}
                  </span>
                </div>
              ))}
            </div>

            <p className="mt-8 text-center text-sm text-white/60">
              Alle Qualifikationen staatlich anerkannt
            </p>
          </div>
        </section>

        {/* ── Meine Philosophie ─────────────────────────────────────── */}
        <section className="py-16 sm:py-24 bg-white">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-[#0d4f4f]/8 px-4 py-1.5 text-sm font-bold text-[#0d4f4f]">
                  Meine Philosophie
                </span>
                <h2 className="mt-4 text-[clamp(1.8rem,3.5vw,2.8rem)] font-extrabold leading-[1.1] tracking-tight text-[#111]">
                  Kein{" "}
                  <span className="text-[#e8654a]">„Drüberarbeiten"</span> —
                  sondern gezielte Wirkung
                </h2>

                <div className="mt-6 space-y-4 text-base text-[#555] leading-relaxed">
                  {philosophieTexte.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              </div>

              {/* Quote card */}
              <div className="relative">
                <div className="rounded-3xl bg-[#0d4f4f] p-8 sm:p-10">
                  <Quote
                    size={40}
                    className="text-[#f2a93b] mb-4 opacity-80"
                    fill="currentColor"
                  />
                  <blockquote className="text-lg sm:text-xl font-semibold text-white leading-relaxed">
                    {quoteText}
                  </blockquote>
                  <footer className="mt-6 flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0">
                      <Image
                        src={quoteAvatarUrl}
                        alt="Domenic Hacker"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <span className="block text-sm font-bold text-white">
                        Domenic Hacker
                      </span>
                      <span className="text-xs text-white/50">
                        {quoteAuthorTitle}
                      </span>
                    </div>
                  </footer>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-[#f2a93b]/10 border border-[#f2a93b]/20 p-4 text-center">
                    <span className="block text-2xl font-extrabold text-[#f2a93b]">
                      {yearsExperience}
                    </span>
                    <span className="text-xs text-[#555]">Jahre Erfahrung</span>
                  </div>
                  <div className="rounded-2xl bg-[#e8654a]/10 border border-[#e8654a]/20 p-4 text-center">
                    <span className="block text-2xl font-extrabold text-[#e8654a]">
                      1080
                    </span>
                    <span className="text-xs text-[#555]">Wien, Josefstadt</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────────────────────── */}
        <section className="py-16 sm:py-24 bg-[#0d4f4f]">
          <div className="mx-auto max-w-2xl px-5 sm:px-8 text-center">
            <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-extrabold text-white leading-tight">
              {ctaHeading}
            </h2>
            <p className="mt-4 text-white/65 text-lg max-w-xl mx-auto leading-relaxed">
              {ctaText}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/buchen"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#e8654a] to-[#f2a93b] px-8 py-4 text-base font-bold text-white shadow-lg shadow-[#e8654a]/30 hover:shadow-xl hover:shadow-[#e8654a]/40 hover:scale-[1.03] transition-all duration-200"
              >
                <Calendar size={18} />
                Termin online buchen
              </Link>
              <a
                href={`tel:${phone.replace(/\s/g, "")}`}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-8 py-4 text-base font-semibold text-white/80 hover:bg-white/10 hover:text-white transition-all duration-200"
              >
                {phone}
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer sanitySettings={settings} />
    </>
  );
}
