import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight, Mail, MapPin, Phone, Plus, Star } from "lucide-react";
import { Footer } from "@/components/Footer";
import { FaqJsonLd } from "@/components/FaqJsonLd";
import { JsonLdService } from "@/components/JsonLdService";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { fetchReviewSummary } from "@/components/GoogleReviewsBadge";
import {
  GOOGLE_MAPS_URL,
  IMAGES,
  MAIL_HREF,
  TEL_HREF,
} from "./content";

const MM_FAQS = [
  { q: "Was kostet eine mobile Massage in Wien?", a: "Ein Hausbesuch startet bei 120 € für 60 Minuten. Für 90 Minuten kommt ein Aufpreis dazu – den nenne ich Ihnen bei der Anfrage. Die Anfahrt innerhalb Wiens ist enthalten; bei Adressen außerhalb Wiens kann ein Anfahrtsaufschlag dazukommen, den ich Ihnen vor der Terminbestätigung nenne." },
  { q: "Zahlt die Krankenkasse eine mobile Massage?", a: "Ein Hausbesuch wird als private Leistung abgerechnet und von den gesetzlichen Kassen nicht erstattet. Wenn Ihnen eine Rückerstattung wichtig ist, ist die Heilmassage mit ärztlicher Verordnung in der Praxis der passendere Weg – Details dazu auf der Preise-Seite." },
  { q: "Was muss ich für den Termin zuhause vorbereiten?", a: "Nichts. Ich bringe Massageliege, Öle und frische Handtücher mit. Sie brauchen nur einen freien Platz von etwa zwei mal zwei Metern – Wohnzimmer, Schlafzimmer oder Büro funktionieren alle gleich gut." },
  { q: "Wie viel Platz braucht die Massageliege?", a: "Die Liege ist rund 190 cm lang und 70 cm breit. Damit ich rundherum arbeiten kann, sind etwa zwei mal zwei Meter ideal. Wenn Sie unsicher sind, schicken Sie mir vorab ein Foto des Raums – dann klären wir das in einer Minute." },
  { q: "Kommen Sie auch ins Hotel?", a: "Ja. Hotelzimmer und Suiten sind auf Anfrage möglich, ebenso Termine außerhalb der üblichen Zeiten. Bitte geben Sie bei der Anfrage Hotel, Zimmernummer und Ihren Wunschtermin an, damit ich mich an der Rezeption anmelden kann." },
  { q: "Welche Massage bekomme ich beim Hausbesuch?", a: "Dieselbe Arbeit wie in der Praxis: klassische Massage, Heilmassage-Techniken und gezielte Behandlung von Verspannungen – abgestimmt auf das, was Ihr Körper an diesem Tag braucht. Nur Anwendungen mit Geräten sind zuhause nicht möglich." },
  { q: "Wie kurzfristig kann ich einen Hausbesuch buchen?", a: "In den Innenbezirken geht oft noch etwas am selben oder am nächsten Tag. Für Wunschtermine am Abend oder am Wochenende melden Sie sich am besten ein paar Tage vorher." },
];

const CANONICAL = "https://heilmasseur-domenic.at/mobile-massage-wien";

export const metadata: Metadata = {
  title:
    "Mobile Massage Wien · Massage zu Hause & Hausbesuch | Heilmasseur Domenic Hacker",
  description:
    "Mobile Massage in Wien: Hausbesuch mit eigener Massageliege, Ölen und Handtüchern. Ab 120 € für 60 Minuten, 90 Minuten auf Anfrage. Hotel & VIP-Service auf Anfrage.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "Mobile Massage Wien · Massage zu Hause bei Ihnen",
    description:
      "Hausbesuch in ganz Wien – Massageliege, Öle und Handtücher bringe ich mit. Ab 120 €, Anfahrt innerhalb Wiens inklusive.",
    url: CANONICAL,
    locale: "de_AT",
    type: "website",
    images: [
      {
        url: "https://heilmasseur-domenic.at/images/behandlungsraum.webp",
        width: 2000,
        height: 2134,
        alt: "Massageliege von Heilmasseur Domenic Hacker",
      },
    ],
  },
};

/* ── Farben: teal-getönte Weißtöne auf dunklem Teal, Gold als Akzent ─── */
const T_PRIMARY = "text-[#f4fbf9]";
const T_BODY = "text-[#cfe4e0]";
const T_MUTED = "text-[#9fc6bf]";

const FOCUS =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f2a93b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#07302f]";

const BTN_BASE =
  "inline-flex min-h-[48px] items-center justify-center gap-2.5 rounded-full px-7 text-[15px] font-semibold tracking-[0.01em] transition-colors duration-200";
const BTN_GOLD = `${BTN_BASE} bg-[#f2a93b] text-[#07302f] hover:bg-[#f6ba5c] ${FOCUS}`;
const BTN_GHOST = `${BTN_BASE} border border-white/25 text-[#f4fbf9] hover:border-white/50 hover:bg-white/[0.04] ${FOCUS}`;

const EYEBROW =
  "text-[11px] font-semibold uppercase tracking-[0.24em] text-[#f2a93b]";
const DISPLAY = "font-extrabold tracking-tight";
const NUM = "font-extrabold tabular-nums tracking-[-0.02em]";
const H2 = `${DISPLAY} text-balance text-[clamp(1.9rem,3vw,2.6rem)] leading-[1.1] ${T_PRIMARY}`;

const CONTAINER = "mx-auto w-full max-w-6xl px-5 sm:px-8";

/** Bildradius wie auf allen anderen Seiten (rounded-3xl), Rahmen etwas weiter. */
const IMG_RADIUS = "rounded-3xl";
const FRAME_RADIUS = "rounded-[2.25rem]";

const RISE = "motion-safe:animate-[mm-rise_1s_cubic-bezier(0.16,1,0.3,1)_both]";
const rise = (delayMs: number) => ({ animationDelay: `${delayMs}ms` });

function Hairline({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden className={`block h-px w-10 bg-[#f2a93b] ${className}`} />
  );
}

export default async function MobileMassageWien() {
  const reviews = await fetchReviewSummary();
  const avatars = reviews.avatars.slice(0, 3);

  return (
    <>
      <JsonLdService variant="mobilemassage" priceRange="ab €120" />
      <FaqJsonLd faqs={MM_FAQS} />
      <div
        className={`bg-[#07302f] ${T_BODY} selection:bg-[#f2a93b]/40 selection:text-[#f4fbf9]`}
      >
        <main>
          {/* ── HERO ───────────────────────────────────────────────── */}
          <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden">
            <div className="absolute inset-0 -z-10">
              <Image
                src={IMAGES.treatment}
                alt=""
                fill
                priority
                fetchPriority="high"
                quality={75}
                sizes="100vw"
                className="object-cover object-[50%_40%] saturate-[0.85]"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-[#07302f] via-[#07302f]/85 to-[#07302f]/45"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-r from-[#07302f]/80 via-[#07302f]/35 to-transparent"
              />
              <div
                aria-hidden
                className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#07302f]/70 to-transparent"
              />
              <div
                aria-hidden
                className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-[#07302f]/55 to-transparent"
              />
            </div>

            <div
              className={`${CONTAINER} flex flex-1 flex-col justify-end pb-14 pt-28 sm:pb-16 sm:pt-32 lg:pb-20`}
            >
              <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-16">
                <div className="max-w-2xl">
                  {/* Byline auf Mobile/Tablet */}
                  <div
                    className={`mb-8 flex items-center gap-4 lg:hidden ${RISE}`}
                    style={rise(0)}
                  >
                    <span className="relative block h-14 w-14 shrink-0 overflow-hidden rounded-full ring-1 ring-white/25">
                      <Image
                        src={IMAGES.portrait}
                        alt="Domenic Hacker, diplomierter Heilmasseur in Wien"
                        fill
                        priority
                        quality={85}
                        sizes="56px"
                        className="object-cover object-[50%_22%]"
                      />
                    </span>
                    <span>
                        <span data-edit-id="mm-hero-name-mobile" className={`block text-[15px] font-semibold ${T_PRIMARY}`}>
                          Domenic Hacker
                        </span>
                        <span data-edit-id="mm-hero-identity-mobile" className={`block text-[13px] leading-snug ${T_MUTED}`}>
                          Diplomierter Heilmasseur · B-Boy · Wien
                        </span>
                    </span>
                  </div>

                  <p
                    className={`flex flex-col gap-y-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-3 ${EYEBROW} ${RISE}`}
                    style={rise(0)}
                  >
                    <span data-edit-id="mm-hero-badge">Hausbesuch in ganz Wien</span>
                    <span
                      aria-hidden
                      className="hidden h-px w-5 bg-[#f2a93b]/60 sm:block"
                    />
                    <span data-edit-id="mm-hero-service-line">Hotel & VIP-Service auf Anfrage</span>
                  </p>

                  {/* Headline und Vorspann laufen bewusst ohne mm-rise: Der
                      opacity-0-Start macht sie für Largest Contentful Paint
                      unsichtbar, wodurch LCP auf das später eingeblendete
                      Cookie-Banner fällt (gemessen 5,0 s statt 3,4 s). */}
                  <h1
                    className={`${DISPLAY} mt-5 text-[clamp(2.3rem,5.1vw,4.15rem)] leading-[1.04] sm:mt-6 ${T_PRIMARY}`}
                  >
                    <span data-edit-id="mm-hero-heading-lead" className="block">Mobile Massage –</span>
                    <span className="block text-balance">
                      <span data-edit-id="mm-hero-heading-rest">nachhaltige Entspannung bei Ihnen </span>
                      <span data-edit-id="mm-hero-heading-accent" className="text-[#f2a93b]">zuhause</span>
                    </span>
                  </h1>

                  <p
                    data-edit-id="mm-hero-subtitle"
                    className={`mt-6 max-w-xl text-[17px] leading-[1.6] ${T_BODY} sm:mt-7 sm:text-lg sm:leading-[1.65]`}
                  >
                    Ich komme zu Ihnen – mit Liege, Ölen und Handtüchern. Sie kümmern sich um nichts außer Ihrer Entspannung. Therapeutische Massage auf Praxisniveau, in Ihren eigenen vier Wänden oder im Hotel.
                  </p>

                  {/* Preis-Lockup */}
                  <div
                    className={`mt-8 flex flex-wrap items-end gap-x-6 gap-y-2 sm:mt-9 ${RISE}`}
                    style={rise(240)}
                  >
                    <span
                        className={`${NUM} text-[3.1rem] leading-[0.85] text-[#f2a93b] sm:text-[3.7rem]`}
                      >
                        <span data-edit-id="mm-hero-price-prefix" className="mr-2 align-top text-[1.3rem] font-semibold sm:text-[1.5rem]">
                          ab
                        </span>
                        <span data-edit-id="mm-hero-price">120</span>
                        <span className="ml-1.5 align-top text-[2rem]">€</span>
                      </span>
                    <span className="pb-0.5">
                      <span
                        className={`block text-[15px] font-semibold ${T_PRIMARY}`}
                      >
                        <span data-edit-id="mm-hero-duration">für 60 oder 90 Minuten</span>
                      </span>
                      <span className={`block text-[14px] ${T_MUTED}`}>
                        Anfahrt innerhalb Wiens inklusive
                      </span>
                    </span>
                  </div>

                  {/* CTA: Anfrage per E-Mail, Telefon als Zweitweg */}
                  <div
                    id="hero-cta"
                    className={`mt-8 flex flex-col items-stretch gap-3 sm:mt-9 sm:flex-row sm:flex-wrap sm:items-center ${RISE}`}
                    style={rise(320)}
                  >
                    <a href={MAIL_HREF} className={BTN_GOLD}>
                      <Mail size={17} strokeWidth={2.25} aria-hidden={true} />
                      <span data-edit-id="mm-hero-cta">Hausbesuch anfragen</span>
                    </a>
                    <a href={TEL_HREF} className={BTN_GHOST}>
                      <Phone size={16} strokeWidth={2.25} aria-hidden={true} />
                      +43 670 189 52 56
                    </a>
                  </div>

                  {/* Google-Bewertungen */}
                  <a
                    href={GOOGLE_MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-7 inline-flex min-h-[44px] w-fit max-w-full items-center gap-2.5 rounded-full py-1 pr-2 transition-opacity hover:opacity-85 sm:mt-8 sm:gap-3 ${FOCUS} ${RISE}`}
                    style={rise(400)}
                  >
                    <span className="flex -space-x-2">
                      {avatars.map((a, i) => (
                        <span
                          key={`${a.name}-${i}`}
                          className={`relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border-2 border-[#07302f] bg-white/15 text-xs font-semibold ${T_PRIMARY}`}
                        >
                          {a.name.charAt(0).toUpperCase()}
                          {a.photoUri && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={a.photoUri}
                              alt=""
                              width={32}
                              height={32}
                              loading="lazy"
                              decoding="async"
                              className="absolute inset-0 h-full w-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                          )}
                        </span>
                      ))}
                    </span>
                    <span className="flex items-center gap-0.5" aria-hidden>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={13}
                          className="fill-[#f2a93b] text-[#f2a93b]"
                        />
                      ))}
                    </span>
                    <span className={`text-[13px] ${T_BODY} sm:text-sm`}>
                      <span
                        className={`font-semibold tabular-nums ${T_PRIMARY}`}
                      >
                        {reviews.rating.toFixed(1)}
                      </span>{" "}
                      · {reviews.count} Google-Bewertungen
                    </span>
                    <ArrowUpRight
                      size={14}
                      className={`hidden shrink-0 sm:block ${T_MUTED}`}
                      aria-hidden={true}
                    />
                  </a>
                </div>

                {/* Portrait-Karte, Desktop */}
                <figure className={`hidden lg:block ${RISE}`} style={rise(200)}>
                  <div className="relative w-56 xl:w-64">
                    <span
                      aria-hidden
                      className={`pointer-events-none absolute -inset-3 border border-[#f2a93b]/35 ${FRAME_RADIUS}`}
                    />
                    <div
                      className={`relative aspect-[3/4] overflow-hidden ${IMG_RADIUS}`}
                    >
                      <Image
                        src={IMAGES.portrait}
                        alt="Domenic Hacker, diplomierter Heilmasseur in Wien"
                        fill
                        // Kein priority: Die Figure ist unter lg ausgeblendet,
                        // wurde aber trotzdem eager geladen (~33 KB umsonst).
                        // Der Mobile-Avatar oben behält priority.
                        quality={85}
                        sizes="(min-width: 1280px) 256px, 224px"
                        className="object-cover object-[50%_22%]"
                      />
                    </div>
                  </div>
                  <figcaption className="mt-6">
                    <span
                      className={`block text-[15px] font-semibold ${T_PRIMARY}`}
                    >
                      Domenic Hacker
                    </span>
                    <span className={`block text-[13px] ${T_MUTED}`}>
                      Diplomierter Heilmasseur · B-Boy · Wien
                    </span>
                  </figcaption>
                </figure>
              </div>
            </div>
          </section>

          {/* ── PREIS & AUSSTATTUNG ────────────────────────────── */}
          <section className="border-t border-white/10 bg-[#0a3d3d] py-20 sm:py-28">
            <div className={CONTAINER}>
              <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
                <figure className="lg:sticky lg:top-28 lg:self-start">
                  <div className="relative">
                    <span
                      aria-hidden
                      className={`pointer-events-none absolute -inset-3 border border-[#f2a93b]/25 ${FRAME_RADIUS}`}
                    />
                    <div
                      className={`relative aspect-[4/5] overflow-hidden ${IMG_RADIUS}`}
                    >
                      <Image
                        src={IMAGES.room}
                        alt="Der Behandlungsraum von Domenic Hacker in der Josefstadt"
                        fill
                        quality={75}
                        sizes="(max-width: 1024px) 100vw, 440px"
                        className="object-cover object-bottom"
                      />
                      <div
                        aria-hidden
                        className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0a3d3d]/60 to-transparent"
                      />
                    </div>
                  </div>
                  <figcaption
                    className={`mt-6 max-w-md text-sm leading-relaxed ${T_MUTED}`}
                  >
                    Mein Behandlungsraum in der Josefstadt. Zum Hausbesuch kommt eine mobile Liege mit – in wenigen Minuten aufgebaut.
                  </figcaption>
                </figure>

                <div>
                  <p className={EYEBROW}>Der Preis</p>
                  <h2 className={`${H2} mt-4`}>Klarer Preis. Sie wählen die Dauer.</h2>
                  <p
                    className={`mt-5 max-w-xl text-[17px] leading-[1.65] ${T_BODY}`}
                  >
                    Ein Hausbesuch beginnt beim Preis für die kürzere Behandlung; für die längere kommt ein Aufpreis dazu. Was für Sie anfällt, steht hier – und ich bestätige es in meiner Antwort, bevor der Termin fix ist.
                  </p>

                  <dl className="mt-8 border-y border-white/10">
                    <div className="flex items-baseline justify-between gap-4 py-4">
                      <dt data-edit-id="mm-price-60-label" className={`text-[17px] font-semibold ${T_PRIMARY}`}>
                        60 Minuten
                      </dt>
                      <dd>
                        <span className={`${NUM} text-[1.9rem] leading-none text-[#f2a93b]`}>
                          <span data-edit-id="mm-price-60-amount">120</span>
                          <span className="ml-1 align-top text-base">€</span>
                        </span>
                      </dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-4 py-4 border-t border-white/10">
                      <dt data-edit-id="mm-price-90-label" className={`text-[17px] font-semibold ${T_PRIMARY}`}>
                        90 Minuten
                      </dt>
                      <dd>
                        <span data-edit-id="mm-price-90-amount" className={`text-[15px] ${T_MUTED}`}>
                          auf Anfrage
                        </span>
                      </dd>
                    </div>
                  </dl>
                  <p className={`mt-3 text-sm ${T_MUTED}`}>
                    Anfahrt innerhalb Wiens inklusive
                  </p>

                  <h3 className={`mt-10 ${EYEBROW}`}>Im Preis enthalten</h3>
                  <ul className="mt-2 divide-y divide-white/10">
                        <li className="grid grid-cols-[2.5rem_1fr] gap-x-4 py-5">
                          <Hairline className="mt-3" />
                          <div>
                            <p data-edit-id="mm-incl-1-title" className={`text-[17px] font-semibold ${T_PRIMARY}`}>
                              Professionelle Massageliege
                            </p>
                            <p data-edit-id="mm-incl-1-text" className={`mt-1 max-w-prose text-[15px] leading-relaxed ${T_MUTED}`}>
                              Stabil, gepolstert, mit Nackenstütze – klappbar, aber auf Praxisniveau.
                            </p>
                          </div>
                        </li>
                        <li className="grid grid-cols-[2.5rem_1fr] gap-x-4 py-5">
                          <Hairline className="mt-3" />
                          <div>
                            <p data-edit-id="mm-incl-2-title" className={`text-[17px] font-semibold ${T_PRIMARY}`}>
                              Hochwertige Öle
                            </p>
                            <p data-edit-id="mm-incl-2-text" className={`mt-1 max-w-prose text-[15px] leading-relaxed ${T_MUTED}`}>
                              Hautverträglich und dezent im Duft. Auf Wunsch neutral und unparfümiert.
                            </p>
                          </div>
                        </li>
                        <li className="grid grid-cols-[2.5rem_1fr] gap-x-4 py-5">
                          <Hairline className="mt-3" />
                          <div>
                            <p data-edit-id="mm-incl-3-title" className={`text-[17px] font-semibold ${T_PRIMARY}`}>
                              Frische Handtücher & Auflagen
                            </p>
                            <p data-edit-id="mm-incl-3-text" className={`mt-1 max-w-prose text-[15px] leading-relaxed ${T_MUTED}`}>
                              Für jeden Termin frisch gewaschen. Ihre eigenen Textilien bleiben im Schrank.
                            </p>
                          </div>
                        </li>
                        <li className="grid grid-cols-[2.5rem_1fr] gap-x-4 py-5">
                          <Hairline className="mt-3" />
                          <div>
                            <p data-edit-id="mm-incl-4-title" className={`text-[17px] font-semibold ${T_PRIMARY}`}>
                              Ruhe nach Ihrem Maß
                            </p>
                            <p data-edit-id="mm-incl-4-text" className={`mt-1 max-w-prose text-[15px] leading-relaxed ${T_MUTED}`}>
                              Leise Musik oder Stille, viel Gespräch oder gar keines – Sie geben den Ton vor.
                            </p>
                          </div>
                        </li>
                        <li className="grid grid-cols-[2.5rem_1fr] gap-x-4 py-5">
                          <Hairline className="mt-3" />
                          <div>
                            <p data-edit-id="mm-incl-5-title" className={`text-[17px] font-semibold ${T_PRIMARY}`}>
                              Anfahrt, Auf- und Abbau
                            </p>
                            <p data-edit-id="mm-incl-5-text" className={`mt-1 max-w-prose text-[15px] leading-relaxed ${T_MUTED}`}>
                              Innerhalb Wiens im Preis enthalten. Für Adressen außerhalb Wiens kann ein Anfahrtsaufschlag dazukommen. Den nenne ich Ihnen immer vorab, bevor der Termin fix ist.
                            </p>
                          </div>
                        </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* ── BÜHNE · Signature-Band ─────────────────────────────── */}
          <section
            id="buehne"
            className="relative border-t border-white/10 bg-[#07302f]"
          >
            <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[4/3] lg:aspect-[21/9]">
              {/* Ab lg wird das Bild vergrößert und nach rechts geschoben:
                  Der Tänzer landet im rechten Drittel, das Zitat links steht
                  frei – Gesicht und Text überlagern sich nicht. Die
                  Sponsorentafeln am rechten Bildrand fallen dabei weg. */}
              <Image
                src={IMAGES.stage}
                alt="Domenic Hacker als B-Boy auf der Bühne."
                fill
                quality={75}
                sizes="100vw"
                className="object-cover object-[50%_35%] sm:object-[50%_50%] lg:scale-[1.45] lg:object-[50%_60%] lg:[transform-origin:0%_55%]"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-[#07302f] via-[#07302f]/60 to-[#07302f]/25 lg:via-[#07302f]/35 lg:to-[#07302f]/20"
              />
              <div
                aria-hidden
                className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#07302f]/70 to-transparent"
              />
              {/* Links abdunkeln, damit das Zitat sauber steht; rechts bleibt
                  der Tänzer frei. */}
              <div
                aria-hidden
                className="absolute inset-y-0 left-0 hidden w-[55%] bg-gradient-to-r from-[#07302f]/90 via-[#07302f]/55 to-transparent lg:block"
              />

              <div
                className={`${CONTAINER} absolute inset-0 flex flex-col justify-end pb-12 sm:pb-16 lg:justify-center lg:pb-0`}
              >
                <p
                  className={`${DISPLAY} max-w-xl text-balance text-[clamp(2.3rem,4.6vw,4rem)] leading-[1.02] ${T_PRIMARY} lg:max-w-[42%]`}
                >
                  <span data-edit-id="mm-quote-lead">Ihre einzige Aufgabe:</span>{" "}
                  <span data-edit-id="mm-quote-accent" className="text-[#f2a93b]">liegen bleiben.</span>
                </p>
                <p
                  className={`mt-6 max-w-xl text-xs ${T_MUTED} lg:max-w-[42%]`}
                >
                  Domenic Hacker als B-Boy auf der Bühne.
                </p>
              </div>
            </div>

            {/* Story unter dem Band */}
            <div className={`${CONTAINER} py-16 sm:py-20`}>
              <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
                <h2 className={`${H2} lg:sticky lg:top-28 lg:self-start`}>
                  Therapeutisch fundiert, geprägt von der Bühne
                </h2>
                <p
                  className={`max-w-2xl border-l border-[#f2a93b]/50 pl-6 text-[17px] leading-[1.65] ${T_BODY} sm:pl-8`}
                >
                  Seit meiner Jugend stehe ich als B-Boy auf der Bühne. Wer so trainiert, lernt früh, wie ein Körper unter Belastung funktioniert – und was er braucht, um sich wieder zu lösen. Diese Erfahrung fließt in jeden Handgriff: präzise, rhythmisch und mit Gefühl für den richtigen Druck zur richtigen Zeit.
                </p>
              </div>
            </div>
          </section>

          {/* ── ABLAUF ─────────────────────────────────────────────── */}
          <section
            id="ablauf"
            className="border-t border-white/10 bg-[#0a3d3d] py-20 sm:py-28"
          >
            <div className={CONTAINER}>
              <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
                <div className="lg:sticky lg:top-28 lg:self-start">
                  <p className={EYEBROW}>Ablauf</p>
                  <h2 className={`${H2} mt-4`}>So läuft ein Hausbesuch ab</h2>
                  <p
                    className={`mt-5 max-w-md text-[17px] leading-[1.65] ${T_BODY}`}
                  >
                    Diskret, pünktlich und ohne Aufwand für Sie – vom Klingeln bis zum Abbau.
                  </p>
                </div>
                <ProcessTimeline tone="dark" />
              </div>
            </div>
          </section>

          {/* ── HOTEL · SUITE · BACKSTAGE ──────────────────────────── */}
          <section className="border-t border-white/10 bg-[#07302f] py-20 sm:py-28">
            <div className={CONTAINER}>
              <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.95fr] lg:gap-20">
                <div>
                  <p className={EYEBROW}>Auf Anfrage</p>
                  <h2 className={`${H2} mt-4`}>Hotel, Suite, Backstage</h2>
                  <p
                    className={`mt-5 max-w-xl text-[17px] leading-[1.65] ${T_BODY}`}
                  >
                    Für Gäste in Wiener Hotels, für Künstlerinnen und Künstler auf Tour und für alle, die einen diskreten Termin brauchen: Auf Anfrage behandle ich auch im Hotelzimmer, in der Suite oder backstage – auch spät nach der Show.
                  </p>
                  <ul className="mt-8 divide-y divide-white/10 border-y border-white/10">
                      <li className="grid grid-cols-[2.5rem_1fr] gap-x-4 py-4">
                        <Hairline className="mt-3" />
                        <span data-edit-id="mm-vip-1" className={`text-[16px] font-medium leading-snug ${T_PRIMARY}`}>
                          Behandlung im Hotelzimmer, in der Suite oder backstage
                        </span>
                      </li>
                      <li className="grid grid-cols-[2.5rem_1fr] gap-x-4 py-4">
                        <Hairline className="mt-3" />
                        <span data-edit-id="mm-vip-2" className={`text-[16px] font-medium leading-snug ${T_PRIMARY}`}>
                          Absolute Diskretion
                        </span>
                      </li>
                      <li className="grid grid-cols-[2.5rem_1fr] gap-x-4 py-4">
                        <Hairline className="mt-3" />
                        <span data-edit-id="mm-vip-3" className={`text-[16px] font-medium leading-snug ${T_PRIMARY}`}>
                          Termine auch spätabends und am Wochenende
                        </span>
                      </li>
                      <li className="grid grid-cols-[2.5rem_1fr] gap-x-4 py-4">
                        <Hairline className="mt-3" />
                        <span data-edit-id="mm-vip-4" className={`text-[16px] font-medium leading-snug ${T_PRIMARY}`}>
                          Auf Wunsch Abrechnung über Rezeption oder Management
                        </span>
                      </li>
                  </ul>
                  <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
                    <a href={TEL_HREF} className={BTN_GOLD}>
                      <Phone size={16} strokeWidth={2.25} aria-hidden={true} />
                      Diskret anrufen
                    </a>
                    <a href={MAIL_HREF} className={BTN_GHOST}>
                      <Mail size={16} strokeWidth={2.25} aria-hidden={true} />
                      Per E-Mail anfragen
                    </a>
                  </div>
                </div>

                <figure className="relative">
                  <span
                    aria-hidden
                    className={`pointer-events-none absolute -inset-3 border border-[#f2a93b]/25 ${FRAME_RADIUS}`}
                  />
                  <div
                    className={`relative aspect-[3/2] overflow-hidden ${IMG_RADIUS}`}
                  >
                    <Image
                      src={IMAGES.treatmentWide}
                      alt="Domenic Hacker bei der Behandlung"
                      fill
                      quality={75}
                      sizes="(max-width: 1024px) 100vw, 560px"
                      className="object-cover"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-[#07302f]/55 via-transparent to-transparent"
                    />
                  </div>
                </figure>
              </div>
            </div>
          </section>

          {/* ── FÜR WEN · WO ─────────────────────────────────────── */}
          <section className="border-t border-white/10 bg-[#0a3d3d] py-20 sm:py-28">
            <div className={CONTAINER}>
              <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
                <div>
                  <p className={EYEBROW}>Für wen</p>
                  <h2 className={`${H2} mt-4 lg:min-h-[2lh]`}>
                    Wann zuhause die bessere Wahl ist
                  </h2>
                  <p
                    className={`mt-5 max-w-lg text-[17px] leading-[1.65] ${T_BODY}`}
                  >
                    Oft ist der Weg zur Praxis der Grund, warum ein Termin nicht zustande kommt. Wer danach nicht mehr in die U-Bahn steigen muss, entspannt tiefer – und bleibt länger entspannt.
                  </p>
                  <ul className="mt-8 grid grid-cols-1 gap-x-8 sm:grid-cols-2">
                      <li className={`flex items-center gap-3 border-b border-white/10 py-3 text-[16px] font-medium ${T_PRIMARY}`}>
                        <span aria-hidden className="h-1 w-1 shrink-0 rounded-full bg-[#f2a93b]" />
                        <span data-edit-id="mm-occ-1">Nach langen Arbeitstagen</span>
                      </li>
                      <li className={`flex items-center gap-3 border-b border-white/10 py-3 text-[16px] font-medium ${T_PRIMARY}`}>
                        <span aria-hidden className="h-1 w-1 shrink-0 rounded-full bg-[#f2a93b]" />
                        <span data-edit-id="mm-occ-2">Hotelaufenthalt in Wien</span>
                      </li>
                      <li className={`flex items-center gap-3 border-b border-white/10 py-3 text-[16px] font-medium ${T_PRIMARY}`}>
                        <span aria-hidden className="h-1 w-1 shrink-0 rounded-full bg-[#f2a93b]" />
                        <span data-edit-id="mm-occ-3">Nach Fernflügen</span>
                      </li>
                      <li className={`flex items-center gap-3 border-b border-white/10 py-3 text-[16px] font-medium ${T_PRIMARY}`}>
                        <span aria-hidden className="h-1 w-1 shrink-0 rounded-full bg-[#f2a93b]" />
                        <span data-edit-id="mm-occ-4">Eingeschränkte Mobilität</span>
                      </li>
                      <li className={`flex items-center gap-3 border-b border-white/10 py-3 text-[16px] font-medium ${T_PRIMARY}`}>
                        <span aria-hidden className="h-1 w-1 shrink-0 rounded-full bg-[#f2a93b]" />
                        <span data-edit-id="mm-occ-5">Junge Eltern</span>
                      </li>
                      <li className={`flex items-center gap-3 border-b border-white/10 py-3 text-[16px] font-medium ${T_PRIMARY}`}>
                        <span aria-hidden className="h-1 w-1 shrink-0 rounded-full bg-[#f2a93b]" />
                        <span data-edit-id="mm-occ-6">Als Geschenk</span>
                      </li>
                  </ul>
                </div>

                <div>
                  <p className={EYEBROW}>Wo</p>
                  <h2 className={`${H2} mt-4 lg:min-h-[2lh]`}>
                    In ganz Wien
                  </h2>
                  <p
                    className={`mt-5 max-w-lg text-[17px] leading-[1.65] ${T_BODY}`}
                  >
                    Ausgangspunkt ist meine Praxis in der Josefstadt. In den Innenbezirken bin ich oft noch am selben oder nächsten Tag bei Ihnen; alle übrigen Bezirke – von Floridsdorf über Donaustadt bis Liesing – nach Vereinbarung.
                  </p>

                  <p
                    className={`mt-8 flex max-w-lg items-start gap-3 text-[15px] leading-relaxed ${T_MUTED}`}
                  >
                    <MapPin
                      size={16}
                      className="mt-1 shrink-0 text-[#f2a93b]"
                      aria-hidden={true}
                    />
                    <span>
                      Lieber in die Praxis? Meine Praxis liegt in der{" "}
                      <span className={T_PRIMARY}>Feldgasse 3/20, 1080 Wien</span>{" "}
                      (Josefstadt) – dort sind zusätzlich Anwendungen mit
                      Geräten möglich, die zuhause nicht gehen.
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ── FAQ ────────────────────────────────────────────────── */}
          <section className="border-t border-white/10 bg-[#07302f] py-20 sm:py-28">
            <div className={CONTAINER}>
              <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
                <div className="lg:sticky lg:top-28 lg:self-start">
                  <p className={EYEBROW}>Fragen</p>
                  <h2 className={`${H2} mt-4`}>Häufige Fragen zur mobilen Massage</h2>
                  <p
                    className={`mt-5 max-w-md text-[17px] leading-[1.65] ${T_BODY}`}
                  >
                    Antworten auf die Fragen, die mir vor einem Hausbesuch am häufigsten gestellt werden.
                  </p>
                </div>
                <div className="divide-y divide-white/10 border-y border-white/10">
                    <details className="group">
                      <summary
                        className={`flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-6 rounded-md py-5 text-[17px] font-medium ${T_PRIMARY} transition-colors hover:text-[#f2a93b] sm:text-lg [&::-webkit-details-marker]:hidden ${FOCUS}`}
                      >
                        <span data-edit-id="mm-faq-1-q" className="text-balance">Was kostet eine mobile Massage in Wien?</span>
                        <Plus
                          size={18}
                          strokeWidth={1.75}
                          className="shrink-0 text-[#f2a93b] transition-transform duration-300 group-open:rotate-45 motion-reduce:transition-none"
                          aria-hidden={true}
                        />
                      </summary>
                      <p data-edit-id="mm-faq-1-a" className={`max-w-prose pb-6 text-[16px] leading-[1.7] ${T_BODY}`}>
                        Ein Hausbesuch startet bei 120 € für 60 Minuten. Für 90 Minuten kommt ein Aufpreis dazu – den nenne ich Ihnen bei der Anfrage. Die Anfahrt innerhalb Wiens ist enthalten; bei Adressen außerhalb Wiens kann ein Anfahrtsaufschlag dazukommen, den ich Ihnen vor der Terminbestätigung nenne.
                      </p>
                    </details>
                    <details className="group">
                      <summary
                        className={`flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-6 rounded-md py-5 text-[17px] font-medium ${T_PRIMARY} transition-colors hover:text-[#f2a93b] sm:text-lg [&::-webkit-details-marker]:hidden ${FOCUS}`}
                      >
                        <span data-edit-id="mm-faq-2-q" className="text-balance">Zahlt die Krankenkasse eine mobile Massage?</span>
                        <Plus
                          size={18}
                          strokeWidth={1.75}
                          className="shrink-0 text-[#f2a93b] transition-transform duration-300 group-open:rotate-45 motion-reduce:transition-none"
                          aria-hidden={true}
                        />
                      </summary>
                      <p data-edit-id="mm-faq-2-a" className={`max-w-prose pb-6 text-[16px] leading-[1.7] ${T_BODY}`}>
                        Ein Hausbesuch wird als private Leistung abgerechnet und von den gesetzlichen Kassen nicht erstattet. Wenn Ihnen eine Rückerstattung wichtig ist, ist die Heilmassage mit ärztlicher Verordnung in der Praxis der passendere Weg – Details dazu auf der Preise-Seite.
                      </p>
                    </details>
                    <details className="group">
                      <summary
                        className={`flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-6 rounded-md py-5 text-[17px] font-medium ${T_PRIMARY} transition-colors hover:text-[#f2a93b] sm:text-lg [&::-webkit-details-marker]:hidden ${FOCUS}`}
                      >
                        <span data-edit-id="mm-faq-3-q" className="text-balance">Was muss ich für den Termin zuhause vorbereiten?</span>
                        <Plus
                          size={18}
                          strokeWidth={1.75}
                          className="shrink-0 text-[#f2a93b] transition-transform duration-300 group-open:rotate-45 motion-reduce:transition-none"
                          aria-hidden={true}
                        />
                      </summary>
                      <p data-edit-id="mm-faq-3-a" className={`max-w-prose pb-6 text-[16px] leading-[1.7] ${T_BODY}`}>
                        Nichts. Ich bringe Massageliege, Öle und frische Handtücher mit. Sie brauchen nur einen freien Platz von etwa zwei mal zwei Metern – Wohnzimmer, Schlafzimmer oder Büro funktionieren alle gleich gut.
                      </p>
                    </details>
                    <details className="group">
                      <summary
                        className={`flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-6 rounded-md py-5 text-[17px] font-medium ${T_PRIMARY} transition-colors hover:text-[#f2a93b] sm:text-lg [&::-webkit-details-marker]:hidden ${FOCUS}`}
                      >
                        <span data-edit-id="mm-faq-4-q" className="text-balance">Wie viel Platz braucht die Massageliege?</span>
                        <Plus
                          size={18}
                          strokeWidth={1.75}
                          className="shrink-0 text-[#f2a93b] transition-transform duration-300 group-open:rotate-45 motion-reduce:transition-none"
                          aria-hidden={true}
                        />
                      </summary>
                      <p data-edit-id="mm-faq-4-a" className={`max-w-prose pb-6 text-[16px] leading-[1.7] ${T_BODY}`}>
                        Die Liege ist rund 190 cm lang und 70 cm breit. Damit ich rundherum arbeiten kann, sind etwa zwei mal zwei Meter ideal. Wenn Sie unsicher sind, schicken Sie mir vorab ein Foto des Raums – dann klären wir das in einer Minute.
                      </p>
                    </details>
                    <details className="group">
                      <summary
                        className={`flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-6 rounded-md py-5 text-[17px] font-medium ${T_PRIMARY} transition-colors hover:text-[#f2a93b] sm:text-lg [&::-webkit-details-marker]:hidden ${FOCUS}`}
                      >
                        <span data-edit-id="mm-faq-5-q" className="text-balance">Kommen Sie auch ins Hotel?</span>
                        <Plus
                          size={18}
                          strokeWidth={1.75}
                          className="shrink-0 text-[#f2a93b] transition-transform duration-300 group-open:rotate-45 motion-reduce:transition-none"
                          aria-hidden={true}
                        />
                      </summary>
                      <p data-edit-id="mm-faq-5-a" className={`max-w-prose pb-6 text-[16px] leading-[1.7] ${T_BODY}`}>
                        Ja. Hotelzimmer und Suiten sind auf Anfrage möglich, ebenso Termine außerhalb der üblichen Zeiten. Bitte geben Sie bei der Anfrage Hotel, Zimmernummer und Ihren Wunschtermin an, damit ich mich an der Rezeption anmelden kann.
                      </p>
                    </details>
                    <details className="group">
                      <summary
                        className={`flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-6 rounded-md py-5 text-[17px] font-medium ${T_PRIMARY} transition-colors hover:text-[#f2a93b] sm:text-lg [&::-webkit-details-marker]:hidden ${FOCUS}`}
                      >
                        <span data-edit-id="mm-faq-6-q" className="text-balance">Welche Massage bekomme ich beim Hausbesuch?</span>
                        <Plus
                          size={18}
                          strokeWidth={1.75}
                          className="shrink-0 text-[#f2a93b] transition-transform duration-300 group-open:rotate-45 motion-reduce:transition-none"
                          aria-hidden={true}
                        />
                      </summary>
                      <p data-edit-id="mm-faq-6-a" className={`max-w-prose pb-6 text-[16px] leading-[1.7] ${T_BODY}`}>
                        Dieselbe Arbeit wie in der Praxis: klassische Massage, Heilmassage-Techniken und gezielte Behandlung von Verspannungen – abgestimmt auf das, was Ihr Körper an diesem Tag braucht. Nur Anwendungen mit Geräten sind zuhause nicht möglich.
                      </p>
                    </details>
                    <details className="group">
                      <summary
                        className={`flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-6 rounded-md py-5 text-[17px] font-medium ${T_PRIMARY} transition-colors hover:text-[#f2a93b] sm:text-lg [&::-webkit-details-marker]:hidden ${FOCUS}`}
                      >
                        <span data-edit-id="mm-faq-7-q" className="text-balance">Wie kurzfristig kann ich einen Hausbesuch buchen?</span>
                        <Plus
                          size={18}
                          strokeWidth={1.75}
                          className="shrink-0 text-[#f2a93b] transition-transform duration-300 group-open:rotate-45 motion-reduce:transition-none"
                          aria-hidden={true}
                        />
                      </summary>
                      <p data-edit-id="mm-faq-7-a" className={`max-w-prose pb-6 text-[16px] leading-[1.7] ${T_BODY}`}>
                        In den Innenbezirken geht oft noch etwas am selben oder am nächsten Tag. Für Wunschtermine am Abend oder am Wochenende melden Sie sich am besten ein paar Tage vorher.
                      </p>
                    </details>
                </div>
              </div>
            </div>
          </section>

          {/* ── FINAL CTA ──────────────────────────────────────────── */}
          <section
            id="final-cta"
            className="relative overflow-hidden border-t border-white/10 bg-[#0a3d3d] py-24 sm:py-32"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(242,169,59,0.14),transparent)]"
            />
            <div className={`${CONTAINER} relative text-center`}>
              <Hairline className="mx-auto" />
              <h2
                className={`${DISPLAY} mx-auto mt-8 max-w-3xl text-balance text-[clamp(2.1rem,4.2vw,3.4rem)] leading-[1.06] ${T_PRIMARY}`}
              >
                Entspannung kommt zu Ihnen
              </h2>
              <p
                className={`mx-auto mt-6 max-w-lg text-[17px] leading-[1.65] ${T_BODY}`}
              >
                Nennen Sie mir Adresse und Wunschzeit – den Rest übernehme ich. Schreiben Sie mir oder rufen Sie an.
              </p>
              <p data-edit-id="mm-final-price-line" className="mt-7 text-balance text-sm font-semibold tracking-[0.06em] text-[#f2a93b]">
                ab 120 € · 60 oder 90 Minuten · Anfahrt innerhalb Wiens inklusive
              </p>
              <div className="mx-auto mt-9 flex max-w-md flex-col items-stretch justify-center gap-3 sm:max-w-none sm:flex-row sm:items-center">
                <a href={MAIL_HREF} className={BTN_GOLD}>
                  <Mail size={17} strokeWidth={2.25} aria-hidden={true} />
                  <span data-edit-id="mm-final-cta">Hausbesuch anfragen</span>
                </a>
                <a href={TEL_HREF} className={BTN_GHOST}>
                  <Phone size={16} strokeWidth={2.25} aria-hidden={true} />
                  +43 670 189 52 56
                </a>
              </div>
              <p className={`mt-7 text-[15px] ${T_MUTED}`}>praxis@heilmasseur-domenic.at</p>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
