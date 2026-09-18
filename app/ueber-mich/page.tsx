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

export default function UeberMichPage() {
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

                <p data-edit-id="about-hero-subtitle" className="mt-5 text-lg text-white/70 leading-relaxed max-w-md">
                  Diplomierter Heilmasseur mit Leidenschaft für Bewegung und gezieltes Arbeiten am Körper.
                </p>

                {/* Stats row */}
                <div className="mt-8 flex flex-wrap gap-6 items-start">
                  <div>
                    <span data-edit-id="about-years" className="block text-3xl font-extrabold text-[#f2a93b]">
                      7+
                    </span>
                    <span data-edit-id="about-years-label" className="text-sm text-white/50">Jahre Erfahrung</span>
                  </div>
                  <div className="w-px self-stretch bg-white/15" />
                  <div>
                    <span data-edit-id="about-quals-count" className="block text-3xl font-extrabold text-[#f2a93b]">
                      13
                    </span>
                    <span data-edit-id="about-quals-label" className="text-sm text-white/50">Qualifikationen</span>
                  </div>
                  <div className="w-px self-stretch bg-white/15" />
                  <div className="flex items-start gap-1.5">
                    <MapPin size={14} className="text-[#e8654a] mt-1 shrink-0" />
                    <div>
                      <span data-edit-id="about-address-1" className="block text-white/90 font-semibold text-sm">
                        Feldgasse 3/20
                      </span>
                      <span data-edit-id="about-address-2" className="text-sm text-white/50">1080 Wien</span>
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
                    src="/images/domenic-1080.webp"
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
                    src="/images/breakdance.jpg"
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
                  <p data-edit-id="about-bio-1">Ich verbinde fundiertes Fachwissen mit einem feinen Gespür für den Körper. Bewegung prägt mein Leben — sowohl in der Therapie als auch im Breakdance, der meine Körperwahrnehmung nachhaltig geschult hat.</p>
                  <p data-edit-id="about-bio-2">Durch meine Erfahrung in Rehabilitationsinstituten behandle ich Beschwerden gezielt und unterstütze Sie dabei, wieder mehr Bewegungsfreiheit zu gewinnen. Heilmasseur ist meine Berufung — Ihre Entspannung mein Ziel.</p>
                  <p data-edit-id="about-bio-3">Ich habe meine Ausbildung mit ausgezeichnetem Erfolg abgeschlossen. Eine ständige Fortbildung steht für mich an oberster Stelle.</p>
                </div>

                {/* Highlight cards */}
                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="rounded-2xl p-4 bg-[#0d4f4f]/5 border border-[#0d4f4f]/10">
                    <span data-edit-id="about-highlight-1-title" className="block text-xl font-extrabold text-[#0d4f4f]">
                      Mit Auszeichnung
                    </span>
                    <span data-edit-id="about-highlight-1-sub" className="text-sm text-[#555]">
                      Abschluss der Ausbildung
                    </span>
                  </div>
                  <div className="rounded-2xl p-4 bg-[#e8654a]/5 border border-[#e8654a]/10">
                    <span data-edit-id="about-highlight-2-title" className="block text-xl font-extrabold text-[#e8654a]">
                      Reha-Erfahrung
                    </span>
                    <span data-edit-id="about-highlight-2-sub" className="text-sm text-[#555]">
                      In Reha-Einrichtungen
                    </span>
                  </div>
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
                <span data-edit-id="about-certs-heading">13 anerkannte</span>{" "}
                <span data-edit-id="about-certs-accent" className="text-[#f2a93b]">Zertifizierungen</span>
              </h2>
              <p className="mt-4 text-white/60 leading-relaxed">
                Stetige Weiterbildung ist für mich keine Pflicht, sondern
                Überzeugung — damit Sie stets von den wirksamsten Methoden
                profitieren.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <div className="flex items-center gap-3 rounded-2xl bg-white/[0.06] border border-white/[0.08] px-4 py-3.5 hover:bg-white/[0.1] transition-colors duration-200">
                  <Award size={18} className="text-[#f2a93b] shrink-0" />
                  <span data-edit-id="about-cred-1" className="text-sm font-semibold text-white/85">
                    Diplomierter Heilmasseur
                  </span>
                </div>
                <div className="flex items-center gap-3 rounded-2xl bg-white/[0.06] border border-white/[0.08] px-4 py-3.5 hover:bg-white/[0.1] transition-colors duration-200">
                  <Flower2 size={18} className="text-[#f2a93b] shrink-0" />
                  <span data-edit-id="about-cred-2" className="text-sm font-semibold text-white/85">
                    Nuad Thai Massage (Watpo-Stil)
                  </span>
                </div>
                <div className="flex items-center gap-3 rounded-2xl bg-white/[0.06] border border-white/[0.08] px-4 py-3.5 hover:bg-white/[0.1] transition-colors duration-200">
                  <Flower2 size={18} className="text-[#f2a93b] shrink-0" />
                  <span data-edit-id="about-cred-3" className="text-sm font-semibold text-white/85">
                    Thai Tisch Massage
                  </span>
                </div>
                <div className="flex items-center gap-3 rounded-2xl bg-white/[0.06] border border-white/[0.08] px-4 py-3.5 hover:bg-white/[0.1] transition-colors duration-200">
                  <Footprints size={18} className="text-[#f2a93b] shrink-0" />
                  <span data-edit-id="about-cred-4" className="text-sm font-semibold text-white/85">
                    Manuelle Lymphdrainage (Dr. Vodder)
                  </span>
                </div>
                <div className="flex items-center gap-3 rounded-2xl bg-white/[0.06] border border-white/[0.08] px-4 py-3.5 hover:bg-white/[0.1] transition-colors duration-200">
                  <Hand size={18} className="text-[#f2a93b] shrink-0" />
                  <span data-edit-id="about-cred-5" className="text-sm font-semibold text-white/85">
                    Bindegewebs-Massage
                  </span>
                </div>
                <div className="flex items-center gap-3 rounded-2xl bg-white/[0.06] border border-white/[0.08] px-4 py-3.5 hover:bg-white/[0.1] transition-colors duration-200">
                  <Activity size={18} className="text-[#f2a93b] shrink-0" />
                  <span data-edit-id="about-cred-6" className="text-sm font-semibold text-white/85">
                    Sportbetreuer
                  </span>
                </div>
                <div className="flex items-center gap-3 rounded-2xl bg-white/[0.06] border border-white/[0.08] px-4 py-3.5 hover:bg-white/[0.1] transition-colors duration-200">
                  <Target size={18} className="text-[#f2a93b] shrink-0" />
                  <span data-edit-id="about-cred-7" className="text-sm font-semibold text-white/85">
                    Dorn-Breuss Wirbelsäulenbehandlung
                  </span>
                </div>
                <div className="flex items-center gap-3 rounded-2xl bg-white/[0.06] border border-white/[0.08] px-4 py-3.5 hover:bg-white/[0.1] transition-colors duration-200">
                  <Zap size={18} className="text-[#f2a93b] shrink-0" />
                  <span data-edit-id="about-cred-8" className="text-sm font-semibold text-white/85">
                    Fußreflexzonen-Massage
                  </span>
                </div>
                <div className="flex items-center gap-3 rounded-2xl bg-white/[0.06] border border-white/[0.08] px-4 py-3.5 hover:bg-white/[0.1] transition-colors duration-200">
                  <CircleDot size={18} className="text-[#f2a93b] shrink-0" />
                  <span data-edit-id="about-cred-9" className="text-sm font-semibold text-white/85">
                    Akupunktur Massage (Penzel)
                  </span>
                </div>
                <div className="flex items-center gap-3 rounded-2xl bg-white/[0.06] border border-white/[0.08] px-4 py-3.5 hover:bg-white/[0.1] transition-colors duration-200">
                  <Waves size={18} className="text-[#f2a93b] shrink-0" />
                  <span data-edit-id="about-cred-10" className="text-sm font-semibold text-white/85">
                    Schröpfen
                  </span>
                </div>
                <div className="flex items-center gap-3 rounded-2xl bg-white/[0.06] border border-white/[0.08] px-4 py-3.5 hover:bg-white/[0.1] transition-colors duration-200">
                  <BatteryCharging size={18} className="text-[#f2a93b] shrink-0" />
                  <span data-edit-id="about-cred-11" className="text-sm font-semibold text-white/85">
                    Elektrotherapie
                  </span>
                </div>
                <div className="flex items-center gap-3 rounded-2xl bg-white/[0.06] border border-white/[0.08] px-4 py-3.5 hover:bg-white/[0.1] transition-colors duration-200">
                  <Target size={18} className="text-[#f2a93b] shrink-0" />
                  <span data-edit-id="about-cred-12" className="text-sm font-semibold text-white/85">
                    Triggerpunkt - Therapie
                  </span>
                </div>
                <div className="flex items-center gap-3 rounded-2xl bg-white/[0.06] border border-white/[0.08] px-4 py-3.5 hover:bg-white/[0.1] transition-colors duration-200">
                  <Hand size={18} className="text-[#f2a93b] shrink-0" />
                  <span data-edit-id="about-cred-13" className="text-sm font-semibold text-white/85">
                    Segmentmassage
                  </span>
                </div>
                <div className="flex items-center gap-3 rounded-2xl bg-white/[0.06] border border-white/[0.08] px-4 py-3.5 hover:bg-white/[0.1] transition-colors duration-200">
                  <Award size={18} className="text-[#f2a93b] shrink-0" />
                  <span data-edit-id="about-cred-14" className="text-sm font-semibold text-white/85">
                    Teilnahme IMA Massage Meisterschaft Kopenhagen 2026
                  </span>
                </div>
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
                  <p data-edit-id="about-philo-1">Jeder Körper reagiert anders. Deshalb beginne ich jede Behandlung mit einem kurzen Gespräch: Was passt gerade nicht? Was soll sich danach besser anfühlen?</p>
                  <p data-edit-id="about-philo-2">Zu viel Druck löst Schutzmechanismen aus, zu wenig bringt nichts. Mein Ziel ist die goldene Mitte: eine Behandlung, die Sie spüren, ohne Sie zu überfordern.</p>
                  <p data-edit-id="about-philo-3">Durch meine Erfahrung habe ich ein gutes Gespür dafür entwickelt, wie Bewegung und Spannung im Körper zusammenhängen – dieses Verständnis fließt direkt in meine Arbeit ein.</p>
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
                  <blockquote data-edit-id="about-quote" className="text-lg sm:text-xl font-semibold text-white leading-relaxed">
                    Ein Raum ohne Urteil. Wo echte Verbindung auf Augenhöhe entsteht.
                  </blockquote>
                  <footer className="mt-6 flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0">
                      <Image
                        src="/images/domenic-1080.webp"
                        alt="Domenic Hacker"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <span className="block text-sm font-bold text-white">
                        Domenic Hacker
                      </span>
                      <span data-edit-id="about-quote-author" className="text-xs text-white/50">
                        Diplomierter Heilmasseur, Wien 1080
                      </span>
                    </div>
                  </footer>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-[#f2a93b]/10 border border-[#f2a93b]/20 p-4 text-center">
                    <span data-edit-id="about-years-card" className="block text-2xl font-extrabold text-[#f2a93b]">
                      7+
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
            <h2 data-edit-id="about-cta-heading" className="text-[clamp(1.8rem,4vw,3rem)] font-extrabold text-white leading-tight">
              Bereit für Ihre erste Behandlung?
            </h2>
            <p data-edit-id="about-cta-text" className="mt-4 text-white/65 text-lg max-w-xl mx-auto leading-relaxed">
              Buchen Sie jetzt Ihren Termin online – unkompliziert und in wenigen Schritten.
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
                href="tel:+436701895256"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-8 py-4 text-base font-semibold text-white/80 hover:bg-white/10 hover:text-white transition-all duration-200"
              >
                <span data-edit-id="about-cta-phone">+43 670 189 52 56</span>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
