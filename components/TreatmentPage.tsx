import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle2,
  ArrowRight,
  Check,
  MapPin,
  ChevronDown,
  Info,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FaqJsonLd } from "@/components/FaqJsonLd";
import type { SanitySettings } from "@/sanity/lib/queries";

export type TreatmentVariant = "heilmassage" | "sportmassage";

export type TreatmentFaq = { _key: string; question: string; answer: string };

export type TreatmentEffect = { title: string; description: string };

export type TreatmentTransport = { label: string; value: string };

export type TreatmentPageData = {
  heroBadge: string;
  heroHeading: string;
  heroSubtitle: string;
  heroImageSrc: string;
  heroImageAlt: string;

  forWhomHeading: string;
  forWhomDescription: string;
  conditions: string[];

  approachHeading: string;
  approachDescription: string;
  approachPoints: string[];
  approachBottomText: string;
  approachImageSrc: string;
  approachImageAlt: string;

  whatIsHeading: string;
  whatIsParagraphs: string[];

  effectsHeading: string;
  effectsDescription: string;
  effects: TreatmentEffect[];

  locationHeading: string;
  locationDescription: string;
  transportInfo: TreatmentTransport[];

  costNote?: string; // nur Sportmassage

  faqs: TreatmentFaq[];
  faqSectionHeading: string;

  ctaHeading: string;
  ctaText: string;
};

const SISTER_LINKS: Record<
  TreatmentVariant,
  { href: string; label: string; description: string }
> = {
  heilmassage: {
    href: "/sportmassage-wien",
    label: "Sportmassage ansehen",
    description: "Für Regeneration, Triggerpunkte und sportliche Belastung",
  },
  sportmassage: {
    href: "/heilmassage-wien-1080",
    label: "Heilmassage ansehen",
    description: "Bei Verspannungen, Rückenschmerzen und chronischen Beschwerden",
  },
};

export function TreatmentPage({
  data,
  variant,
  settings,
}: {
  data: TreatmentPageData;
  variant: TreatmentVariant;
  settings: SanitySettings | null | undefined;
}) {
  const address = settings?.address ?? "Feldgasse 3/20";
  const sister = SISTER_LINKS[variant];

  return (
    <>
      <FaqJsonLd faqs={data.faqs.map((f) => ({ q: f.question, a: f.answer }))} />
      <Navbar />
      <main>
        {/* ── HERO ─────────────────────────────────────────────────── */}
        <section className="relative bg-[#0d4f4f] overflow-hidden">
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
              backgroundSize: "32px 32px",
            }}
          />
          <div className="relative mx-auto max-w-7xl px-5 sm:px-8 pt-28 pb-16 sm:pt-36 sm:pb-24">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <p className="mb-4 inline-block rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white/70">
                  {data.heroBadge}
                </p>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight">
                  {data.heroHeading}
                </h1>
                <p className="mt-5 text-lg sm:text-xl text-white/70 max-w-xl leading-relaxed">
                  {data.heroSubtitle}
                </p>
                <div className="mt-10 flex flex-col sm:flex-row items-start gap-4">
                  <Link
                    href="/buchen"
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#e8654a] to-[#f2a93b] px-8 py-4 text-base font-bold text-white shadow-lg shadow-[#e8654a]/30 transition-all duration-200 hover:shadow-xl hover:shadow-[#e8654a]/40 motion-safe:hover:scale-[1.03]"
                  >
                    Termin buchen
                    <ArrowRight size={18} strokeWidth={2.5} aria-hidden={true} />
                  </Link>
                  <a
                    href="/#kontakt"
                    className="inline-flex items-center gap-2 rounded-full border border-white/25 px-8 py-4 text-base font-semibold text-white/80 transition-all duration-200 hover:bg-white/10 hover:text-white"
                  >
                    Kontakt
                  </a>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -top-4 -right-4 w-full h-full rounded-3xl bg-[#f2a93b]/15 rotate-1 pointer-events-none" />
                <div className="relative rounded-3xl overflow-hidden aspect-[4/3] max-w-lg mx-auto lg:mx-0 lg:ml-auto">
                  <Image
                    src={data.heroImageSrc}
                    alt={data.heroImageAlt}
                    fill
                    className="object-cover"
                    priority
                    quality={75}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FÜR WEN ──────────────────────────────────────────────── */}
        <section className="py-16 sm:py-24 bg-white">
          <div className="mx-auto max-w-4xl px-5 sm:px-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0d4f4f] mb-2">
              {data.forWhomHeading}
            </h2>
            <p className="text-[#555] mb-10 leading-relaxed max-w-2xl">
              {data.forWhomDescription}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
              {data.conditions.map((label) => (
                <div
                  key={label}
                  className="flex items-center gap-3 rounded-2xl bg-[#f5fafa] border border-[#0d4f4f]/10 px-4 py-3.5"
                >
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br from-[#e8654a] to-[#f2a93b] flex items-center justify-center">
                    <Check size={11} strokeWidth={3} className="text-white" aria-hidden={true} />
                  </span>
                  <span className="text-sm font-semibold text-[#111]">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── USP / WIE ICH ARBEITE ─────────────────────────────────── */}
        <section className="py-16 sm:py-24 bg-[#f0f7f7]">
          <div className="mx-auto max-w-4xl px-5 sm:px-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0d4f4f] mb-2">
              {data.approachHeading}
            </h2>
            <p className="text-[#555] mb-10 leading-relaxed max-w-2xl">
              {data.approachDescription}
            </p>

            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
              <div>
                <ul className="space-y-4">
                  {data.approachPoints.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2
                        size={20}
                        className="text-[#e8654a] flex-shrink-0 mt-0.5"
                        strokeWidth={2}
                        aria-hidden={true}
                      />
                      <span className="text-[#333] leading-relaxed text-sm sm:text-base">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-[#555] leading-relaxed text-sm">
                  {data.approachBottomText}
                </p>
              </div>

              <div className="relative rounded-3xl overflow-hidden aspect-[4/3]">
                <Image
                  src={data.approachImageSrc}
                  alt={data.approachImageAlt}
                  fill
                  className="object-cover"
                  quality={75}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── WAS IST X ──────────────────────────────────────────── */}
        <section className="py-16 sm:py-24 bg-white">
          <div className="mx-auto max-w-4xl px-5 sm:px-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0d4f4f] mb-4">
              {data.whatIsHeading}
            </h2>
            <div className="space-y-4 text-[#555] leading-relaxed">
              {data.whatIsParagraphs.map((text, i) => (
                <p
                  key={i}
                  className={
                    variant === "heilmassage" && i === data.whatIsParagraphs.length - 1
                      ? "text-sm text-[#555]/80"
                      : undefined
                  }
                >
                  {text}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* ── WIRKUNG ──────────────────────────────────────────────── */}
        <section className="py-16 sm:py-24 bg-[#f0f7f7]">
          <div className="mx-auto max-w-4xl px-5 sm:px-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0d4f4f] mb-3">
              {data.effectsHeading}
            </h2>
            <p className="text-[#555] mb-10 leading-relaxed">
              {data.effectsDescription}
            </p>
            <div className="grid sm:grid-cols-2 gap-5">
              {data.effects.map(({ title, description }) => (
                <div
                  key={title}
                  className="rounded-2xl bg-white border border-[#0d4f4f]/8 p-6 shadow-sm"
                >
                  <h3 className="font-bold text-[#0d4f4f] mb-2">{title}</h3>
                  <p className="text-sm text-[#555] leading-relaxed">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── COST NOTE (nur Sportmassage) ─────────────────────────── */}
        {variant === "sportmassage" && data.costNote && (
          <section className="py-12 sm:py-16 bg-[#f0f7f7]">
            <div className="mx-auto max-w-4xl px-5 sm:px-8">
              <div className="flex items-start gap-4 rounded-2xl bg-gradient-to-r from-[#0d4f4f]/[0.06] to-[#0d4f4f]/[0.02] border border-[#0d4f4f]/10 p-6 sm:p-8">
                <div className="flex-shrink-0 mt-0.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0d4f4f]/10">
                    <Info size={20} className="text-[#0d4f4f]" aria-hidden={true} />
                  </div>
                </div>
                <div>
                  <p className="font-bold text-[#111]">Hinweis zu Krankenkassen</p>
                  <p className="mt-1 text-sm text-[#555] leading-relaxed">
                    {data.costNote}
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── STANDORT ─────────────────────────────────────────────── */}
        <section className="py-16 sm:py-24 bg-white">
          <div className="mx-auto max-w-4xl px-5 sm:px-8">
            <div className="rounded-3xl bg-[#0d4f4f] p-8 sm:p-12">
              <div className="grid sm:grid-cols-2 gap-10 items-center">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white/70">
                    Standort
                  </span>
                  <h2 className="mt-4 text-2xl sm:text-3xl font-extrabold text-white">
                    {data.locationHeading}
                  </h2>
                  <p className="mt-4 text-white/65 leading-relaxed">
                    {data.locationDescription}
                  </p>
                  <address className="mt-6 not-italic">
                    <div className="flex items-start gap-2">
                      <MapPin
                        size={16}
                        className="text-[#f2a93b] mt-0.5 shrink-0"
                        aria-hidden={true}
                      />
                      <div>
                        <p className="font-bold text-white">{address}</p>
                        <p className="text-white/60">1080 Wien (Josefstadt)</p>
                      </div>
                    </div>
                  </address>
                </div>
                <div className="flex flex-col gap-3">
                  {data.transportInfo.map(({ label, value }) => (
                    <div
                      key={label}
                      className="rounded-2xl bg-white/[0.07] border border-white/[0.12] px-5 py-4"
                    >
                      <p className="text-xs font-bold uppercase tracking-widest text-white/60 mb-1">
                        {label}
                      </p>
                      <p className="font-bold text-white">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────── */}
        <section className="py-16 sm:py-24 bg-[#f0f7f7]">
          <div className="mx-auto max-w-4xl px-5 sm:px-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0d4f4f] mb-3">
              {data.faqSectionHeading}
            </h2>
            <p className="text-[#555] mb-10 leading-relaxed">
              Antworten auf die Fragen, die mir am häufigsten gestellt werden.
            </p>
            <div className="space-y-3">
              {data.faqs.map((faq) => (
                <details
                  key={faq._key}
                  className="group rounded-2xl bg-white border border-[#0d4f4f]/10 overflow-hidden"
                >
                  <summary className="flex items-center justify-between gap-4 cursor-pointer px-6 py-5 font-semibold text-[#111] text-sm sm:text-base list-none">
                    {faq.question}
                    <ChevronDown
                      size={18}
                      className="text-[#0d4f4f] shrink-0 transition-transform duration-200 group-open:rotate-180"
                      aria-hidden={true}
                    />
                  </summary>
                  <p className="px-6 pb-5 text-sm text-[#555] leading-relaxed border-t border-[#0d4f4f]/5 pt-4">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── PREISE-LINK + CROSS-LINK ─────────────────────────────── */}
        <section className="py-12 sm:py-16 bg-white border-t border-[#0d4f4f]/8">
          <div className="mx-auto max-w-4xl px-5 sm:px-8 grid sm:grid-cols-2 gap-4">
            <div className="flex flex-col items-start justify-between gap-4 rounded-3xl bg-[#f0f7f7] p-6 sm:p-8">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#0d4f4f]/60 mb-1">
                  Was kostet eine Behandlung?
                </p>
                <p className="text-lg sm:text-xl font-extrabold text-[#111]">
                  Alle Preise & Block-Karten auf einen Blick
                </p>
              </div>
              <Link
                href="/preise"
                className="inline-flex items-center gap-2 rounded-full border-2 border-[#0d4f4f] px-6 py-3 text-sm font-bold text-[#0d4f4f] hover:bg-[#0d4f4f] hover:text-white transition-all duration-200 whitespace-nowrap"
              >
                Preise einsehen
                <ArrowRight size={16} strokeWidth={2.5} aria-hidden={true} />
              </Link>
            </div>

            <div className="flex flex-col items-start justify-between gap-4 rounded-3xl bg-[#f0f7f7] p-6 sm:p-8">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#0d4f4f]/60 mb-1">
                  Im Vergleich
                </p>
                <p className="text-lg sm:text-xl font-extrabold text-[#111]">
                  {sister.description}
                </p>
              </div>
              <Link
                href={sister.href}
                className="inline-flex items-center gap-2 rounded-full border-2 border-[#0d4f4f] px-6 py-3 text-sm font-bold text-[#0d4f4f] hover:bg-[#0d4f4f] hover:text-white transition-all duration-200 whitespace-nowrap"
              >
                {sister.label}
                <ArrowRight size={16} strokeWidth={2.5} aria-hidden={true} />
              </Link>
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ────────────────────────────────────────────── */}
        <section className="py-16 sm:py-24 bg-[#0d4f4f]">
          <div className="mx-auto max-w-2xl px-5 sm:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
              {data.ctaHeading}
            </h2>
            <p className="text-white/65 mb-10 leading-relaxed">{data.ctaText}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/buchen"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#e8654a] to-[#f2a93b] px-8 py-4 text-base font-bold text-white shadow-lg shadow-[#e8654a]/30 transition-all duration-200 hover:shadow-xl hover:shadow-[#e8654a]/40 motion-safe:hover:scale-[1.03]"
              >
                Termin vereinbaren
                <ArrowRight size={18} strokeWidth={2.5} aria-hidden={true} />
              </Link>
              <a
                href="/#kontakt"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-8 py-4 text-base font-semibold text-white/80 transition-all duration-200 hover:bg-white/10 hover:text-white"
              >
                Kontakt
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer sanitySettings={settings} />
    </>
  );
}
