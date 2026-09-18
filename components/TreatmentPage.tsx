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

export type TreatmentVariant = "heilmassage" | "sportmassage";

const FAQ_LD = {
  heilmassage: [
    { q: "Was ist der Unterschied zwischen Heilmassage und einer normalen Massage?", a: "Eine Heilmassage ist eine medizinisch anerkannte Behandlung, die gezielt auf Beschwerden wie Rückenschmerzen, Verspannungen oder eingeschränkte Beweglichkeit abzielt – durchgeführt von einem diplomierten Heilmasseur. Eine Wellnessmassage dient primär der Entspannung. Bei mir steht der therapeutische Nutzen im Vordergrund – Entspannung ist ein angenehmer Nebeneffekt." },
    { q: "Wie viele Termine brauche ich bis zur Verbesserung?", a: "Das hängt stark von Ihren Beschwerden ab. Akute Verspannungen lassen sich oft schon in 2–3 Terminen deutlich verbessern. Bei chronischen Beschwerden empfehle ich regelmäßigere Behandlungen. Gerne bespreche ich das mit Ihnen bei Ihrem Ersttermin." },
    { q: "Tut eine Heilmassage weh?", a: "Das Ziel ist wirksame Behandlung – nicht Schmerz. Mein Schwerpunkt liegt auf der richtigen Intensität: wirksam, aber ohne unnötigen Druck. Sie können jederzeit sagen, wenn Ihnen etwas zu viel oder zu wenig ist – ich passe mich sofort an." },
    { q: "Muss ich etwas zur Behandlung mitbringen?", a: "Nein, alles Notwendige ist in der Praxis vorhanden. Kommen Sie einfach pünktlich – und wenn möglich mit einem kurzen Überblick über Ihre aktuellen Beschwerden, damit wir gleich gezielt loslegen können." },
    { q: "Kann ich die Heilmassage bei der Krankenkasse einreichen?", a: "Mit einer ärztlichen Verordnung haben Sie die Möglichkeit, einen Teil der Kosten von Ihrer Krankenkasse rückerstattet zu bekommen.\nDie Abrechnung erfolgt über Ihre Honorarnote, die Sie nach der Behandlung bei Ihrer Kasse einreichen können.\nJe nach Tarif übernehmen private Zusatzversicherungen einen Großteil der Kosten, in manchen Fällen sogar vollständig." },
    { q: "Wie finde ich die Praxis in Wien 1080?", a: "Die Praxis liegt in der Feldgasse 3/20 im 8. Bezirk (Josefstadt). Gut erreichbar mit der U2 (Station Rathaus), U6 (Station Josefstädterstraße) oder mit der Straßenbahn 2, 5 , 12 oder 44. Parkmöglichkeiten sind in der unmittelbaren Umgebung vorhanden." }
  ],
  sportmassage: [
    { q: "Wie oft sollte ich Sportmassage in Anspruch nehmen?", a: "Das hängt von Ihrem Trainingsvolumen ab. Hobby-Sportler:innen mit 3–4 Trainings/Woche profitieren oft von einer Sportmassage alle 2–3 Wochen. Bei intensiven Trainingsphasen kann häufiger sinnvoll sein, in Ruhephasen seltener. Wir können das gerne in der ersten Behandlung gemeinsam einschätzen." },
    { q: "Vor oder nach dem Wettkampf — was bringt mehr?", a: "Beides hat einen Platz: Pre-Wettkampf 2–3 Tage vorher zur Lockerung, ohne dass tief gearbeitet wird. Post-Wettkampf am besten 24–48 Stunden danach, dann ist das Gewebe schon wieder belastbarer für tiefere Techniken." },
    { q: "Was unterscheidet Sportmassage von Heilmassage?", a: "Heilmassage wird häufig bei Beschwerden mit medizinischem Hintergrund eingesetzt und ist je nach Kasse teilweise erstattbar. Sportmassage ist eine Wellness- und Trainings-Leistung, fokussiert auf Regeneration und Leistungserhaltung — nicht erstattbar, aber je nach Bedarf der passendere Ansatz." },
    { q: "Hilft Sportmassage gegen Muskelkater?", a: "Erfahrungsgemäß empfinden viele Menschen die Behandlung 24–48 Stunden nach intensiver Belastung als wohltuend. Wissenschaftlich ist die Evidenz für direkte Muskelkater-Reduktion gemischt — was bleibt, ist subjektives Wohlbefinden, verbesserte Beweglichkeit und ein Gefühl von Erholung." },
    { q: "Auch ohne Sportverletzung?", a: "Definitiv. Sportmassage ist primär präventiv und regenerativ gedacht, nicht therapeutisch. Wer regelmäßig sportlich aktiv ist, profitiert davon, ohne Beschwerden zu haben." },
    { q: "Ist Sportmassage immer schmerzhaft?", a: "Nein. Tiefer Druck heißt nicht automatisch Schmerz — der richtige Druck am richtigen Ort fühlt sich oft 'gut intensiv' an, nicht quälend. Wir sprechen während der Behandlung über das richtige Maß für Sie." }
  ],
} as const;

export function TreatmentPage({ variant }: { variant: TreatmentVariant }) {
  const heroSrc = "/images/heilmassage-wien.webp";
  const approachSrc = "/images/praxis-interior.png";
  const heroAlt = variant === "heilmassage"
    ? "Heilmassage Behandlung in Wien 1080 – Praxis Domenic Hacker"
    : "Massage-Behandlung in der Praxis Domenic Hacker, Wien 1080";
  return (
    <>
      <FaqJsonLd faqs={[...FAQ_LD[variant]]} />
      <Navbar />
      <main>
        <section className="relative bg-[#0d4f4f] overflow-hidden">
          <div aria-hidden className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />
          <div className="relative mx-auto max-w-7xl px-5 sm:px-8 pt-28 pb-16 sm:pt-36 sm:pb-24">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <p className="mb-4 inline-block rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white/70">
                  {variant === "heilmassage" ? (
              <span data-edit-id="heilmassage-hero-badge">Wien 1080 · Josefstadt</span>
            ) : (
              <span data-edit-id="sportmassage-hero-badge">Wien 1080 · Josefstadt</span>
            )}
                </p>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight">
                  {variant === "heilmassage" ? (
              <span data-edit-id="heilmassage-hero-heading">Heilmassage in 1080 Wien</span>
            ) : (
              <span data-edit-id="sportmassage-hero-heading">Sportmassage in 1080 Wien</span>
            )}
                </h1>
                <p className="mt-5 text-lg sm:text-xl text-white/70 max-w-xl leading-relaxed">
                  {variant === "heilmassage" ? (
              <span data-edit-id="heilmassage-hero-subtitle">gezielt, wirksam und in der richtigen Intensität</span>
            ) : (
              <span data-edit-id="sportmassage-hero-subtitle">Für aktive Menschen mit Verspannungen, Bewegungseinschränkungen und hoher Belastung.</span>
            )}
                </p>
                <div id="hero-cta" className="mt-10 flex flex-col sm:flex-row items-start gap-4">
                  <Link href="/buchen" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#e8654a] to-[#f2a93b] px-8 py-4 text-base font-bold text-white shadow-lg shadow-[#e8654a]/30 transition-all duration-200 hover:shadow-xl hover:shadow-[#e8654a]/40 motion-safe:hover:scale-[1.03]">
                    <span data-edit-id="treatment-hero-cta-book">Termin buchen</span>
                    <ArrowRight size={18} strokeWidth={2.5} aria-hidden={true} />
                  </Link>
                  <a href="/#kontakt" className="inline-flex items-center gap-2 rounded-full border border-white/25 px-8 py-4 text-base font-semibold text-white/80 transition-all duration-200 hover:bg-white/10 hover:text-white">
                    <span data-edit-id="treatment-hero-cta-contact">Kontakt</span>
                  </a>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -top-4 -right-4 w-full h-full rounded-3xl bg-[#f2a93b]/15 rotate-1 pointer-events-none" />
                <div className="relative rounded-3xl overflow-hidden aspect-[4/3] max-w-lg mx-auto lg:mx-0 lg:ml-auto">
                  <Image src={heroSrc} alt={heroAlt} fill className="object-cover" priority quality={75} />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-24 bg-white">
          <div className="mx-auto max-w-4xl px-5 sm:px-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0d4f4f] mb-2">
              {variant === "heilmassage" ? (
              <span data-edit-id="heilmassage-forwhom-heading">Für wen ist das?</span>
            ) : (
              <span data-edit-id="sportmassage-forwhom-heading">Für wen ist das?</span>
            )}
            </h2>
            <p className="text-[#555] mb-10 leading-relaxed max-w-2xl">
              {variant === "heilmassage" ? (
              <span data-edit-id="heilmassage-forwhom-text">Ob Rückenschmerzen nach langem Sitzen, ein verspannter Nacken oder Muskeln, die nach dem Sport einfach nicht loslassen – wenn Sie sich hier wiedererkennen, sind Sie bei mir richtig.</span>
            ) : (
              <span data-edit-id="sportmassage-forwhom-text">Für alle, die ihren Körper regelmäßig fordern. Ob Krafttraining, Laufen oder Vereinssport – wenn Verspannungen, Muskelermüdung oder eingeschränkte Beweglichkeit das Training beeinträchtigen, kann Sportmassage gezielt unterstützen.</span>
            )}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
              {variant === "heilmassage" ? (
                <>
                <div className="flex items-center gap-3 rounded-2xl bg-[#f5fafa] border border-[#0d4f4f]/10 px-4 py-3.5">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br from-[#e8654a] to-[#f2a93b] flex items-center justify-center">
                    <Check size={11} strokeWidth={3} className="text-white" aria-hidden={true} />
                  </span>
                  <span data-edit-id="heilmassage-cond-0" className="text-sm font-semibold text-[#111]">Rückenprobleme</span>
                </div>
                <div className="flex items-center gap-3 rounded-2xl bg-[#f5fafa] border border-[#0d4f4f]/10 px-4 py-3.5">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br from-[#e8654a] to-[#f2a93b] flex items-center justify-center">
                    <Check size={11} strokeWidth={3} className="text-white" aria-hidden={true} />
                  </span>
                  <span data-edit-id="heilmassage-cond-1" className="text-sm font-semibold text-[#111]">Nacken & Schulter</span>
                </div>
                <div className="flex items-center gap-3 rounded-2xl bg-[#f5fafa] border border-[#0d4f4f]/10 px-4 py-3.5">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br from-[#e8654a] to-[#f2a93b] flex items-center justify-center">
                    <Check size={11} strokeWidth={3} className="text-white" aria-hidden={true} />
                  </span>
                  <span data-edit-id="heilmassage-cond-2" className="text-sm font-semibold text-[#111]">Verspannungen</span>
                </div>
                <div className="flex items-center gap-3 rounded-2xl bg-[#f5fafa] border border-[#0d4f4f]/10 px-4 py-3.5">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br from-[#e8654a] to-[#f2a93b] flex items-center justify-center">
                    <Check size={11} strokeWidth={3} className="text-white" aria-hidden={true} />
                  </span>
                  <span data-edit-id="heilmassage-cond-3" className="text-sm font-semibold text-[#111]">Nach dem Sport</span>
                </div>
                <div className="flex items-center gap-3 rounded-2xl bg-[#f5fafa] border border-[#0d4f4f]/10 px-4 py-3.5">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br from-[#e8654a] to-[#f2a93b] flex items-center justify-center">
                    <Check size={11} strokeWidth={3} className="text-white" aria-hidden={true} />
                  </span>
                  <span data-edit-id="heilmassage-cond-4" className="text-sm font-semibold text-[#111]">Viel Sitzen</span>
                </div>
                <div className="flex items-center gap-3 rounded-2xl bg-[#f5fafa] border border-[#0d4f4f]/10 px-4 py-3.5">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br from-[#e8654a] to-[#f2a93b] flex items-center justify-center">
                    <Check size={11} strokeWidth={3} className="text-white" aria-hidden={true} />
                  </span>
                  <span data-edit-id="heilmassage-cond-5" className="text-sm font-semibold text-[#111]">Stress</span>
                </div>
                </>
              ) : (
                <>
                <div className="flex items-center gap-3 rounded-2xl bg-[#f5fafa] border border-[#0d4f4f]/10 px-4 py-3.5">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br from-[#e8654a] to-[#f2a93b] flex items-center justify-center">
                    <Check size={11} strokeWidth={3} className="text-white" aria-hidden={true} />
                  </span>
                  <span data-edit-id="sportmassage-cond-0" className="text-sm font-semibold text-[#111]">Verspannungen nach Training</span>
                </div>
                <div className="flex items-center gap-3 rounded-2xl bg-[#f5fafa] border border-[#0d4f4f]/10 px-4 py-3.5">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br from-[#e8654a] to-[#f2a93b] flex items-center justify-center">
                    <Check size={11} strokeWidth={3} className="text-white" aria-hidden={true} />
                  </span>
                  <span data-edit-id="sportmassage-cond-1" className="text-sm font-semibold text-[#111]">Schnellere Regenaration</span>
                </div>
                <div className="flex items-center gap-3 rounded-2xl bg-[#f5fafa] border border-[#0d4f4f]/10 px-4 py-3.5">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br from-[#e8654a] to-[#f2a93b] flex items-center justify-center">
                    <Check size={11} strokeWidth={3} className="text-white" aria-hidden={true} />
                  </span>
                  <span data-edit-id="sportmassage-cond-2" className="text-sm font-semibold text-[#111]">Triggerpunkte</span>
                </div>
                <div className="flex items-center gap-3 rounded-2xl bg-[#f5fafa] border border-[#0d4f4f]/10 px-4 py-3.5">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br from-[#e8654a] to-[#f2a93b] flex items-center justify-center">
                    <Check size={11} strokeWidth={3} className="text-white" aria-hidden={true} />
                  </span>
                  <span data-edit-id="sportmassage-cond-3" className="text-sm font-semibold text-[#111]">Muskelermüdung</span>
                </div>
                <div className="flex items-center gap-3 rounded-2xl bg-[#f5fafa] border border-[#0d4f4f]/10 px-4 py-3.5">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br from-[#e8654a] to-[#f2a93b] flex items-center justify-center">
                    <Check size={11} strokeWidth={3} className="text-white" aria-hidden={true} />
                  </span>
                  <span data-edit-id="sportmassage-cond-4" className="text-sm font-semibold text-[#111]">Vor Wettkampf</span>
                </div>
                <div className="flex items-center gap-3 rounded-2xl bg-[#f5fafa] border border-[#0d4f4f]/10 px-4 py-3.5">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br from-[#e8654a] to-[#f2a93b] flex items-center justify-center">
                    <Check size={11} strokeWidth={3} className="text-white" aria-hidden={true} />
                  </span>
                  <span data-edit-id="sportmassage-cond-5" className="text-sm font-semibold text-[#111]">Nach Wettkampf</span>
                </div>
                </>
              )}
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-24 bg-[#f0f7f7]">
          <div className="mx-auto max-w-4xl px-5 sm:px-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0d4f4f] mb-2">
              {variant === "heilmassage" ? (
              <span data-edit-id="heilmassage-approach-heading">Mein Schwerpunkt</span>
            ) : (
              <span data-edit-id="sportmassage-approach-heading">Mein Schwerpunkt</span>
            )}
            </h2>
            <p className="text-[#555] mb-10 leading-relaxed max-w-2xl">
              {variant === "heilmassage" ? (
              <span data-edit-id="heilmassage-approach-text">Mein Schwerpunkt liegt auf der passenden Intensität. Durch Erfahrung und ein gutes Gespür finde ich meist genau den richtigen Druck – wirksam, aber ohne unnötigen Schmerz.</span>
            ) : (
              <span data-edit-id="sportmassage-approach-text">Ich arbeite tief, aber kontrolliert – mit besonderem Fokus auf Triggerpunkte, Faszien und stark beanspruchte Muskulatur. Durch intensives Training entstehen oft Spannungsmuster, die Beweglichkeit einschränken oder dauerhaft Spannung halten. Dort setze ich gezielt an.</span>
            )}
            </p>
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
              <div>
                <ul className="space-y-4">
                  {variant === "heilmassage" ? (
                    <>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 size={20} className="text-[#e8654a] flex-shrink-0 mt-0.5" strokeWidth={2} aria-hidden={true} />
                      <span data-edit-id="heilmassage-approach-0" className="text-[#333] leading-relaxed text-sm sm:text-base">{"Keine Standardmassage – gezielte Behandlung statt „drübermassieren\""}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 size={20} className="text-[#e8654a] flex-shrink-0 mt-0.5" strokeWidth={2} aria-hidden={true} />
                      <span data-edit-id="heilmassage-approach-1" className="text-[#333] leading-relaxed text-sm sm:text-base">Intensität wird laufend angepasst – nicht zu wenig, nicht zu viel</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 size={20} className="text-[#e8654a] flex-shrink-0 mt-0.5" strokeWidth={2} aria-hidden={true} />
                      <span data-edit-id="heilmassage-approach-2" className="text-[#333] leading-relaxed text-sm sm:text-base">Feedback jederzeit möglich und erwünscht</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 size={20} className="text-[#e8654a] flex-shrink-0 mt-0.5" strokeWidth={2} aria-hidden={true} />
                      <span data-edit-id="heilmassage-approach-3" className="text-[#333] leading-relaxed text-sm sm:text-base">Erfahrung und ein gutes Gespür für den richtigen Druck</span>
                    </li>
                    </>
                  ) : (
                    <>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 size={20} className="text-[#e8654a] flex-shrink-0 mt-0.5" strokeWidth={2} aria-hidden={true} />
                      <span data-edit-id="sportmassage-approach-0" className="text-[#333] leading-relaxed text-sm sm:text-base">Triggerpunkt-Arbeit an muskulären Schmerzpunkten</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 size={20} className="text-[#e8654a] flex-shrink-0 mt-0.5" strokeWidth={2} aria-hidden={true} />
                      <span data-edit-id="sportmassage-approach-1" className="text-[#333] leading-relaxed text-sm sm:text-base">Faszien-Mobilisation und Gewebelösung</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 size={20} className="text-[#e8654a] flex-shrink-0 mt-0.5" strokeWidth={2} aria-hidden={true} />
                      <span data-edit-id="sportmassage-approach-2" className="text-[#333] leading-relaxed text-sm sm:text-base">Lösung chronischer Muskelverspannungen</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 size={20} className="text-[#e8654a] flex-shrink-0 mt-0.5" strokeWidth={2} aria-hidden={true} />
                      <span data-edit-id="sportmassage-approach-3" className="text-[#333] leading-relaxed text-sm sm:text-base">Verbesserung der Beweglichkeit </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 size={20} className="text-[#e8654a] flex-shrink-0 mt-0.5" strokeWidth={2} aria-hidden={true} />
                      <span data-edit-id="sportmassage-approach-4" className="text-[#333] leading-relaxed text-sm sm:text-base">Schnellere Regeneration</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 size={20} className="text-[#e8654a] flex-shrink-0 mt-0.5" strokeWidth={2} aria-hidden={true} />
                      <span data-edit-id="sportmassage-approach-5" className="text-[#333] leading-relaxed text-sm sm:text-base">Vorbereitung auf Training und Wettkampf</span>
                    </li>
                    </>
                  )}
                </ul>
                <p className="mt-6 text-[#555] leading-relaxed text-sm">
                  {variant === "heilmassage" ? (
              <span data-edit-id="heilmassage-approach-bottom">Keine Massage ist wie die andere. Was Sie bekommen, ist eine Behandlung, die sich an Ihrem Körper und Ihrem Feedback orientiert – nicht an einem Schema.</span>
            ) : (
              <span data-edit-id="sportmassage-approach-bottom">Als langjähriger Sportler kenne ich hohe Belastung nicht nur aus der Theorie. Deshalb passe ich Druck und Intensität individuell an – von lockerer Regeneration bis zur gezielten Arbeit an hartnäckigen Verspannungen.</span>
            )}
                </p>
              </div>
              <div className="relative rounded-3xl overflow-hidden aspect-[4/3]">
                <Image src={approachSrc} alt="Praxis-Interieur Wien 1080" fill className="object-cover" quality={75} />
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-24 bg-white">
          <div className="mx-auto max-w-4xl px-5 sm:px-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0d4f4f] mb-4">
              {variant === "heilmassage" ? (
              <span data-edit-id="heilmassage-whatis-heading">Was ist Heilmassage?</span>
            ) : (
              <span data-edit-id="sportmassage-whatis-heading">Warum Sportmassage?</span>
            )}
            </h2>
            <div className="space-y-4 text-[#555] leading-relaxed">
              {variant === "heilmassage" ? (
                <>
                <p data-edit-id="heilmassage-whatis-0" className="text-[#555] leading-relaxed">{"Heilmassage ist eine medizinische Behandlung, die bei Beschwerden wie Rückenschmerzen, Verspannungen oder Bewegungseinschränkungen eingesetzt wird – auf ärztliche Verordnung.\nIm Unterschied zur klassischen Massage steht hier der gezielte therapeutische Nutzen im Vordergrund."}</p>
                <p data-edit-id="heilmassage-whatis-1" className="text-[#555] leading-relaxed">{"Ich arbeite hauptsächlich mit klassischer Massage und setze ergänzend auch tiefergehende Grifftechniken ein, um Verspannungen effektiv und nachhaltig zu lösen.\nJede Behandlung wird individuell aufgebaut und genau auf Ihren Körper abgestimmt – ohne starres Schema."}</p>
                <p data-edit-id="heilmassage-whatis-2" className="text-sm text-[#555]/80">Neben Heilmassage biete ich auch klassische Massage zur Lockerung von Verspannungen und zur Regeneration an – auch ohne ärztliche Verordnung.</p>
                </>
              ) : (
                <>
                <p data-edit-id="sportmassage-whatis-0" className="text-[#555] leading-relaxed">Wer regelmäßig trainiert, kennt das: Die Muskulatur wird fest, Bewegungen fühlen sich eingeschränkt an und kleine Verspannungen verschwinden nicht mehr von selbst. Genau hier setzt Sportmassage an. Sie unterstützt die Regeneration, verbessert die Beweglichkeit und hilft dabei, den Körper trotz hoher Belastung leistungsfähig zu halten.</p>
                <p data-edit-id="sportmassage-whatis-1" className="text-[#555] leading-relaxed">Sportmassage ist nicht nur für Wettkampfsportler gedacht. Sie eignet sich für alle, die regelmäßig trainieren und ihren Körper zwischen Training, Arbeit und Alltag besser unterstützen möchten.</p>
                <p data-edit-id="sportmassage-whatis-2" className="text-[#555] leading-relaxed">Ob nach intensiven Einheiten, bei hartnäckigen Verspannungen oder zur Vorbereitung auf die nächste Belastung – gemeinsam arbeiten wir daran, Beweglichkeit zu verbessern, Regeneration zu fördern und den Körper langfristig belastbarer zu machen.</p>
                </>
              )}
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-24 bg-[#f0f7f7]">
          <div className="mx-auto max-w-4xl px-5 sm:px-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0d4f4f] mb-3">
              {variant === "heilmassage" ? (
              <span data-edit-id="heilmassage-effects-heading">Was Massage bewirkt</span>
            ) : (
              <span data-edit-id="sportmassage-effects-heading">So arbeite ich</span>
            )}
            </h2>
            <p className="text-[#555] mb-10 leading-relaxed">
              {variant === "heilmassage" ? (
              <span data-edit-id="heilmassage-effects-text">Gezielt eingesetzt erzielt Massage messbare Ergebnisse – nicht nur im Moment, sondern nachhaltig.</span>
            ) : (
              <span data-edit-id="sportmassage-effects-text">Jede Behandlung wird an Ihre Belastung, Ihre Beschwerden und Ihr Ziel angepasst. Statt eines festen Standardprogramms arbeite ich gezielt an den Bereichen, die Ihre Regeneration, Beweglichkeit oder Leistungsfähigkeit einschränken.</span>
            )}
            </p>
            <div className="grid sm:grid-cols-2 gap-5">
              {variant === "heilmassage" ? (
                <>
                <div className="rounded-2xl bg-white border border-[#0d4f4f]/8 p-6 shadow-sm">
                  <h3 data-edit-id="heilmassage-effect-0-title" className="font-bold text-[#0d4f4f] mb-2">Löst Verspannungen</h3>
                  <p data-edit-id="heilmassage-effect-0-desc" className="text-sm text-[#555] leading-relaxed">Verhärtetes Gewebe wird gezielt gelockert und die Muskulatur entspannt – nicht nur oberflächlich, sondern in der Tiefe.</p>
                </div>
                <div className="rounded-2xl bg-white border border-[#0d4f4f]/8 p-6 shadow-sm">
                  <h3 data-edit-id="heilmassage-effect-1-title" className="font-bold text-[#0d4f4f] mb-2">Lindert Schmerzen</h3>
                  <p data-edit-id="heilmassage-effect-1-desc" className="text-sm text-[#555] leading-relaxed">Gezielte Behandlung der Schmerzpunkte – wirksam, ohne unnötigen Druck. Viele berichten schon nach der ersten Behandlung von spürbarer Erleichterung.</p>
                </div>
                <div className="rounded-2xl bg-white border border-[#0d4f4f]/8 p-6 shadow-sm">
                  <h3 data-edit-id="heilmassage-effect-2-title" className="font-bold text-[#0d4f4f] mb-2">Verbessert Beweglichkeit</h3>
                  <p data-edit-id="heilmassage-effect-2-desc" className="text-sm text-[#555] leading-relaxed">Wenn Spannung nachlässt, wird Bewegung wieder leichter – besonders in Bereichen, die im Alltag stark belastet sind.</p>
                </div>
                <div className="rounded-2xl bg-white border border-[#0d4f4f]/8 p-6 shadow-sm">
                  <h3 data-edit-id="heilmassage-effect-3-title" className="font-bold text-[#0d4f4f] mb-2">Unterstützt Regeneration</h3>
                  <p data-edit-id="heilmassage-effect-3-desc" className="text-sm text-[#555] leading-relaxed">Bessere Durchblutung, schnellere Erholung – vor allem nach sportlicher Belastung oder nach langen Arbeitstagen am Schreibtisch.</p>
                </div>
                </>
              ) : (
                <>
                <div className="rounded-2xl bg-white border border-[#0d4f4f]/8 p-6 shadow-sm">
                  <h3 data-edit-id="sportmassage-effect-0-title" className="font-bold text-[#0d4f4f] mb-2">Belastung verstehen</h3>
                  <p data-edit-id="sportmassage-effect-0-desc" className="text-sm text-[#555] leading-relaxed">Kurzes Gespräch über Training, Beschwerden und Zielsetzung.</p>
                </div>
                <div className="rounded-2xl bg-white border border-[#0d4f4f]/8 p-6 shadow-sm">
                  <h3 data-edit-id="sportmassage-effect-1-title" className="font-bold text-[#0d4f4f] mb-2">Triggerpunkte gezielt bearbeiten</h3>
                  <p data-edit-id="sportmassage-effect-1-desc" className="text-sm text-[#555] leading-relaxed">Fokus auf die Bereiche, in denen Spannung und Schmerzen entstehen.</p>
                </div>
                <div className="rounded-2xl bg-white border border-[#0d4f4f]/8 p-6 shadow-sm">
                  <h3 data-edit-id="sportmassage-effect-2-title" className="font-bold text-[#0d4f4f] mb-2">Faszien und Muskulatur bearbeiten</h3>
                  <p data-edit-id="sportmassage-effect-2-desc" className="text-sm text-[#555] leading-relaxed">Lösen von Verklebungen und Spannungsmustern.</p>
                </div>
                <div className="rounded-2xl bg-white border border-[#0d4f4f]/8 p-6 shadow-sm">
                  <h3 data-edit-id="sportmassage-effect-3-title" className="font-bold text-[#0d4f4f] mb-2">Individuelle Intensität</h3>
                  <p data-edit-id="sportmassage-effect-3-desc" className="text-sm text-[#555] leading-relaxed">Von regenerativ bis tief und intensiv – angepasst an Tagesform und Ziel.</p>
                </div>
                <div className="rounded-2xl bg-white border border-[#0d4f4f]/8 p-6 shadow-sm">
                  <h3 data-edit-id="sportmassage-effect-4-title" className="font-bold text-[#0d4f4f] mb-2">Schröpftechniken gezielt einsetzen</h3>
                  <p data-edit-id="sportmassage-effect-4-desc" className="text-sm text-[#555] leading-relaxed">Trockenes und dynamisches Schröpfen ergänzen die Massage bei hartnäckigen Spannungen und verklebtem Gewebe.</p>
                </div>
                <div className="rounded-2xl bg-white border border-[#0d4f4f]/8 p-6 shadow-sm">
                  <h3 data-edit-id="sportmassage-effect-5-title" className="font-bold text-[#0d4f4f] mb-2">Trainingsfähigkeit erhalten</h3>
                  <p data-edit-id="sportmassage-effect-5-desc" className="text-sm text-[#555] leading-relaxed">Wenn die Muskulatur immer wieder zur Ruhe kommt, fällt das Trainingsvolumen leichter.</p>
                </div>
                </>
              )}
            </div>
          </div>
        </section>

        {variant === "sportmassage" && (
          <section className="py-12 sm:py-16 bg-[#f0f7f7]">
            <div className="mx-auto max-w-4xl px-5 sm:px-8">
              <div className="flex items-start gap-4 rounded-2xl bg-gradient-to-r from-[#0d4f4f]/[0.06] to-[#0d4f4f]/[0.02] border border-[#0d4f4f]/10 p-6 sm:p-8">
                <div className="flex-shrink-0 mt-0.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0d4f4f]/10">
                    <Info size={20} className="text-[#0d4f4f]" aria-hidden={true} />
                  </div>
                </div>
                <div>
                  <p data-edit-id="sportmassage-cost-title" className="font-bold text-[#111]">Hinweis zu Krankenkassen</p>
                  <p data-edit-id="sportmassage-cost-text" className="mt-1 text-sm text-[#555] leading-relaxed">Sportmassage ist eine private Leistung und wird von gesetzlichen Krankenkassen in der Regel nicht erstattet. Heilmassage kann je nach Verordnung und Krankenkasse teilweise rückerstattet werden.</p>
                </div>
              </div>
            </div>
          </section>
        )}

        <section className="py-16 sm:py-24 bg-white">
          <div className="mx-auto max-w-4xl px-5 sm:px-8">
            <div className="rounded-3xl bg-[#0d4f4f] p-8 sm:p-12">
              <div className="grid sm:grid-cols-2 gap-10 items-center">
                <div>
                  <span data-edit-id="treatment-location-badge" className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white/70">Standort</span>
                  <h2 className="mt-4 text-2xl sm:text-3xl font-extrabold text-white">
                    {variant === "heilmassage" ? (
              <span data-edit-id="heilmassage-location-heading">Heilmassage Wien 1080 – Josefstadt</span>
            ) : (
              <span data-edit-id="sportmassage-location-heading">Sportmassage Wien 1080 — Josefstadt</span>
            )}
                  </h2>
                  <p className="mt-4 text-white/65 leading-relaxed">
                    {variant === "heilmassage" ? (
              <span data-edit-id="heilmassage-location-text">Die Praxis liegt im 8. Bezirk – ruhig gelegen und gut erreichbar, nur wenige Minuten von der U2-Station Rathaus und mehreren Straßenbahnlinien entfernt.</span>
            ) : (
              <span data-edit-id="sportmassage-location-text">Die Praxis liegt im 8. Bezirk, gut erreichbar mit U2 (Rathaus) und mehreren Straßenbahnlinien. Für viele Hobby-Sportler:innen aus Wien Mitte-West eine kurze Anfahrt.</span>
            )}
                  </p>
                  <address className="mt-6 not-italic">
                    <div className="flex items-start gap-2">
                      <MapPin size={16} className="text-[#f2a93b] mt-0.5 shrink-0" aria-hidden={true} />
                      <div>
                        <p data-edit-id="treatment-location-address" className="font-bold text-white">Feldgasse 3/20, 1080 Wien</p>
                        <p data-edit-id="treatment-location-city" className="text-white/60">1080 Wien (Josefstadt)</p>
                      </div>
                    </div>
                  </address>
                </div>
                <div className="flex flex-col gap-3">
                  {variant === "heilmassage" ? (
                    <>
                    <div className="rounded-2xl bg-white/[0.07] border border-white/[0.12] px-5 py-4">
                      <p data-edit-id="heilmassage-transport-0-label" className="text-xs font-bold uppercase tracking-widest text-white/60 mb-1">U-Bahn</p>
                      <p data-edit-id="heilmassage-transport-0-value" className="font-bold text-white">U2 – Station Rathaus</p>
                    </div>
                    <div className="rounded-2xl bg-white/[0.07] border border-white/[0.12] px-5 py-4">
                      <p data-edit-id="heilmassage-transport-1-label" className="text-xs font-bold uppercase tracking-widest text-white/60 mb-1">Straßenbahn</p>
                      <p data-edit-id="heilmassage-transport-1-value" className="font-bold text-white">Linien 2 · 5 · 12 · 44</p>
                    </div>
                    <div className="rounded-2xl bg-white/[0.07] border border-white/[0.12] px-5 py-4">
                      <p data-edit-id="heilmassage-transport-2-label" className="text-xs font-bold uppercase tracking-widest text-white/60 mb-1">Parken</p>
                      <p data-edit-id="heilmassage-transport-2-value" className="font-bold text-white">Parkplätze in der Umgebung</p>
                    </div>
                    </>
                  ) : (
                    <>
                    <div className="rounded-2xl bg-white/[0.07] border border-white/[0.12] px-5 py-4">
                      <p data-edit-id="sportmassage-transport-0-label" className="text-xs font-bold uppercase tracking-widest text-white/60 mb-1">U-Bahn</p>
                      <p data-edit-id="sportmassage-transport-0-value" className="font-bold text-white">U2 — Station Rathaus</p>
                    </div>
                    <div className="rounded-2xl bg-white/[0.07] border border-white/[0.12] px-5 py-4">
                      <p data-edit-id="sportmassage-transport-1-label" className="text-xs font-bold uppercase tracking-widest text-white/60 mb-1">Straßenbahn</p>
                      <p data-edit-id="sportmassage-transport-1-value" className="font-bold text-white">Linien 5, 33, 43, 44</p>
                    </div>
                    <div className="rounded-2xl bg-white/[0.07] border border-white/[0.12] px-5 py-4">
                      <p data-edit-id="sportmassage-transport-2-label" className="text-xs font-bold uppercase tracking-widest text-white/60 mb-1">Auto</p>
                      <p data-edit-id="sportmassage-transport-2-value" className="font-bold text-white">Kurzparkzonen rund um die Praxis</p>
                    </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-24 bg-[#f0f7f7]">
          <div className="mx-auto max-w-4xl px-5 sm:px-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0d4f4f] mb-3">
              {variant === "heilmassage" ? (
                <span data-edit-id="heilmassage-faq-heading">Häufige Fragen zur Heilmassage in Wien</span>
              ) : (
                <span data-edit-id="sportmassage-faq-heading">Häufige Fragen zur Sportmassage in Wien</span>
              )}
            </h2>
            <p data-edit-id="treatment-faq-intro" className="text-[#555] mb-10 leading-relaxed">Antworten auf die Fragen, die mir am häufigsten gestellt werden.</p>
            <div className="space-y-3">
              {variant === "heilmassage" ? (
                <>
                <details className="group rounded-2xl bg-white border border-[#0d4f4f]/10 overflow-hidden">
                  <summary className="flex items-center justify-between gap-4 cursor-pointer px-6 py-5 font-semibold text-[#111] text-sm sm:text-base list-none">
                    <span data-edit-id="heilmassage-faq-0-question">Was ist der Unterschied zwischen Heilmassage und einer normalen Massage?</span>
                    <ChevronDown size={18} className="text-[#0d4f4f] shrink-0 transition-transform duration-200 group-open:rotate-180" aria-hidden={true} />
                  </summary>
                  <p data-edit-id="heilmassage-faq-0-answer" className="px-6 pb-5 text-sm text-[#555] leading-relaxed border-t border-[#0d4f4f]/5 pt-4 whitespace-pre-line">Eine Heilmassage ist eine medizinisch anerkannte Behandlung, die gezielt auf Beschwerden wie Rückenschmerzen, Verspannungen oder eingeschränkte Beweglichkeit abzielt – durchgeführt von einem diplomierten Heilmasseur. Eine Wellnessmassage dient primär der Entspannung. Bei mir steht der therapeutische Nutzen im Vordergrund – Entspannung ist ein angenehmer Nebeneffekt.</p>
                </details>
                <details className="group rounded-2xl bg-white border border-[#0d4f4f]/10 overflow-hidden">
                  <summary className="flex items-center justify-between gap-4 cursor-pointer px-6 py-5 font-semibold text-[#111] text-sm sm:text-base list-none">
                    <span data-edit-id="heilmassage-faq-1-question">Wie viele Termine brauche ich bis zur Verbesserung?</span>
                    <ChevronDown size={18} className="text-[#0d4f4f] shrink-0 transition-transform duration-200 group-open:rotate-180" aria-hidden={true} />
                  </summary>
                  <p data-edit-id="heilmassage-faq-1-answer" className="px-6 pb-5 text-sm text-[#555] leading-relaxed border-t border-[#0d4f4f]/5 pt-4 whitespace-pre-line">Das hängt stark von Ihren Beschwerden ab. Akute Verspannungen lassen sich oft schon in 2–3 Terminen deutlich verbessern. Bei chronischen Beschwerden empfehle ich regelmäßigere Behandlungen. Gerne bespreche ich das mit Ihnen bei Ihrem Ersttermin.</p>
                </details>
                <details className="group rounded-2xl bg-white border border-[#0d4f4f]/10 overflow-hidden">
                  <summary className="flex items-center justify-between gap-4 cursor-pointer px-6 py-5 font-semibold text-[#111] text-sm sm:text-base list-none">
                    <span data-edit-id="heilmassage-faq-2-question">Tut eine Heilmassage weh?</span>
                    <ChevronDown size={18} className="text-[#0d4f4f] shrink-0 transition-transform duration-200 group-open:rotate-180" aria-hidden={true} />
                  </summary>
                  <p data-edit-id="heilmassage-faq-2-answer" className="px-6 pb-5 text-sm text-[#555] leading-relaxed border-t border-[#0d4f4f]/5 pt-4 whitespace-pre-line">Das Ziel ist wirksame Behandlung – nicht Schmerz. Mein Schwerpunkt liegt auf der richtigen Intensität: wirksam, aber ohne unnötigen Druck. Sie können jederzeit sagen, wenn Ihnen etwas zu viel oder zu wenig ist – ich passe mich sofort an.</p>
                </details>
                <details className="group rounded-2xl bg-white border border-[#0d4f4f]/10 overflow-hidden">
                  <summary className="flex items-center justify-between gap-4 cursor-pointer px-6 py-5 font-semibold text-[#111] text-sm sm:text-base list-none">
                    <span data-edit-id="heilmassage-faq-3-question">Muss ich etwas zur Behandlung mitbringen?</span>
                    <ChevronDown size={18} className="text-[#0d4f4f] shrink-0 transition-transform duration-200 group-open:rotate-180" aria-hidden={true} />
                  </summary>
                  <p data-edit-id="heilmassage-faq-3-answer" className="px-6 pb-5 text-sm text-[#555] leading-relaxed border-t border-[#0d4f4f]/5 pt-4 whitespace-pre-line">Nein, alles Notwendige ist in der Praxis vorhanden. Kommen Sie einfach pünktlich – und wenn möglich mit einem kurzen Überblick über Ihre aktuellen Beschwerden, damit wir gleich gezielt loslegen können.</p>
                </details>
                <details className="group rounded-2xl bg-white border border-[#0d4f4f]/10 overflow-hidden">
                  <summary className="flex items-center justify-between gap-4 cursor-pointer px-6 py-5 font-semibold text-[#111] text-sm sm:text-base list-none">
                    <span data-edit-id="heilmassage-faq-4-question">Kann ich die Heilmassage bei der Krankenkasse einreichen?</span>
                    <ChevronDown size={18} className="text-[#0d4f4f] shrink-0 transition-transform duration-200 group-open:rotate-180" aria-hidden={true} />
                  </summary>
                  <p data-edit-id="heilmassage-faq-4-answer" className="px-6 pb-5 text-sm text-[#555] leading-relaxed border-t border-[#0d4f4f]/5 pt-4 whitespace-pre-line">{"Mit einer ärztlichen Verordnung haben Sie die Möglichkeit, einen Teil der Kosten von Ihrer Krankenkasse rückerstattet zu bekommen.\nDie Abrechnung erfolgt über Ihre Honorarnote, die Sie nach der Behandlung bei Ihrer Kasse einreichen können.\nJe nach Tarif übernehmen private Zusatzversicherungen einen Großteil der Kosten, in manchen Fällen sogar vollständig."}</p>
                </details>
                <details className="group rounded-2xl bg-white border border-[#0d4f4f]/10 overflow-hidden">
                  <summary className="flex items-center justify-between gap-4 cursor-pointer px-6 py-5 font-semibold text-[#111] text-sm sm:text-base list-none">
                    <span data-edit-id="heilmassage-faq-5-question">Wie finde ich die Praxis in Wien 1080?</span>
                    <ChevronDown size={18} className="text-[#0d4f4f] shrink-0 transition-transform duration-200 group-open:rotate-180" aria-hidden={true} />
                  </summary>
                  <p data-edit-id="heilmassage-faq-5-answer" className="px-6 pb-5 text-sm text-[#555] leading-relaxed border-t border-[#0d4f4f]/5 pt-4 whitespace-pre-line">Die Praxis liegt in der Feldgasse 3/20 im 8. Bezirk (Josefstadt). Gut erreichbar mit der U2 (Station Rathaus), U6 (Station Josefstädterstraße) oder mit der Straßenbahn 2, 5 , 12 oder 44. Parkmöglichkeiten sind in der unmittelbaren Umgebung vorhanden.</p>
                </details>
                </>
              ) : (
                <>
                <details className="group rounded-2xl bg-white border border-[#0d4f4f]/10 overflow-hidden">
                  <summary className="flex items-center justify-between gap-4 cursor-pointer px-6 py-5 font-semibold text-[#111] text-sm sm:text-base list-none">
                    <span data-edit-id="sportmassage-faq-0-question">Wie oft sollte ich Sportmassage in Anspruch nehmen?</span>
                    <ChevronDown size={18} className="text-[#0d4f4f] shrink-0 transition-transform duration-200 group-open:rotate-180" aria-hidden={true} />
                  </summary>
                  <p data-edit-id="sportmassage-faq-0-answer" className="px-6 pb-5 text-sm text-[#555] leading-relaxed border-t border-[#0d4f4f]/5 pt-4 whitespace-pre-line">Das hängt von Ihrem Trainingsvolumen ab. Hobby-Sportler:innen mit 3–4 Trainings/Woche profitieren oft von einer Sportmassage alle 2–3 Wochen. Bei intensiven Trainingsphasen kann häufiger sinnvoll sein, in Ruhephasen seltener. Wir können das gerne in der ersten Behandlung gemeinsam einschätzen.</p>
                </details>
                <details className="group rounded-2xl bg-white border border-[#0d4f4f]/10 overflow-hidden">
                  <summary className="flex items-center justify-between gap-4 cursor-pointer px-6 py-5 font-semibold text-[#111] text-sm sm:text-base list-none">
                    <span data-edit-id="sportmassage-faq-1-question">Vor oder nach dem Wettkampf — was bringt mehr?</span>
                    <ChevronDown size={18} className="text-[#0d4f4f] shrink-0 transition-transform duration-200 group-open:rotate-180" aria-hidden={true} />
                  </summary>
                  <p data-edit-id="sportmassage-faq-1-answer" className="px-6 pb-5 text-sm text-[#555] leading-relaxed border-t border-[#0d4f4f]/5 pt-4 whitespace-pre-line">Beides hat einen Platz: Pre-Wettkampf 2–3 Tage vorher zur Lockerung, ohne dass tief gearbeitet wird. Post-Wettkampf am besten 24–48 Stunden danach, dann ist das Gewebe schon wieder belastbarer für tiefere Techniken.</p>
                </details>
                <details className="group rounded-2xl bg-white border border-[#0d4f4f]/10 overflow-hidden">
                  <summary className="flex items-center justify-between gap-4 cursor-pointer px-6 py-5 font-semibold text-[#111] text-sm sm:text-base list-none">
                    <span data-edit-id="sportmassage-faq-2-question">Was unterscheidet Sportmassage von Heilmassage?</span>
                    <ChevronDown size={18} className="text-[#0d4f4f] shrink-0 transition-transform duration-200 group-open:rotate-180" aria-hidden={true} />
                  </summary>
                  <p data-edit-id="sportmassage-faq-2-answer" className="px-6 pb-5 text-sm text-[#555] leading-relaxed border-t border-[#0d4f4f]/5 pt-4 whitespace-pre-line">Heilmassage wird häufig bei Beschwerden mit medizinischem Hintergrund eingesetzt und ist je nach Kasse teilweise erstattbar. Sportmassage ist eine Wellness- und Trainings-Leistung, fokussiert auf Regeneration und Leistungserhaltung — nicht erstattbar, aber je nach Bedarf der passendere Ansatz.</p>
                </details>
                <details className="group rounded-2xl bg-white border border-[#0d4f4f]/10 overflow-hidden">
                  <summary className="flex items-center justify-between gap-4 cursor-pointer px-6 py-5 font-semibold text-[#111] text-sm sm:text-base list-none">
                    <span data-edit-id="sportmassage-faq-3-question">Hilft Sportmassage gegen Muskelkater?</span>
                    <ChevronDown size={18} className="text-[#0d4f4f] shrink-0 transition-transform duration-200 group-open:rotate-180" aria-hidden={true} />
                  </summary>
                  <p data-edit-id="sportmassage-faq-3-answer" className="px-6 pb-5 text-sm text-[#555] leading-relaxed border-t border-[#0d4f4f]/5 pt-4 whitespace-pre-line">Erfahrungsgemäß empfinden viele Menschen die Behandlung 24–48 Stunden nach intensiver Belastung als wohltuend. Wissenschaftlich ist die Evidenz für direkte Muskelkater-Reduktion gemischt — was bleibt, ist subjektives Wohlbefinden, verbesserte Beweglichkeit und ein Gefühl von Erholung.</p>
                </details>
                <details className="group rounded-2xl bg-white border border-[#0d4f4f]/10 overflow-hidden">
                  <summary className="flex items-center justify-between gap-4 cursor-pointer px-6 py-5 font-semibold text-[#111] text-sm sm:text-base list-none">
                    <span data-edit-id="sportmassage-faq-4-question">Auch ohne Sportverletzung?</span>
                    <ChevronDown size={18} className="text-[#0d4f4f] shrink-0 transition-transform duration-200 group-open:rotate-180" aria-hidden={true} />
                  </summary>
                  <p data-edit-id="sportmassage-faq-4-answer" className="px-6 pb-5 text-sm text-[#555] leading-relaxed border-t border-[#0d4f4f]/5 pt-4 whitespace-pre-line">Definitiv. Sportmassage ist primär präventiv und regenerativ gedacht, nicht therapeutisch. Wer regelmäßig sportlich aktiv ist, profitiert davon, ohne Beschwerden zu haben.</p>
                </details>
                <details className="group rounded-2xl bg-white border border-[#0d4f4f]/10 overflow-hidden">
                  <summary className="flex items-center justify-between gap-4 cursor-pointer px-6 py-5 font-semibold text-[#111] text-sm sm:text-base list-none">
                    <span data-edit-id="sportmassage-faq-5-question">Ist Sportmassage immer schmerzhaft?</span>
                    <ChevronDown size={18} className="text-[#0d4f4f] shrink-0 transition-transform duration-200 group-open:rotate-180" aria-hidden={true} />
                  </summary>
                  <p data-edit-id="sportmassage-faq-5-answer" className="px-6 pb-5 text-sm text-[#555] leading-relaxed border-t border-[#0d4f4f]/5 pt-4 whitespace-pre-line">{"Nein. Tiefer Druck heißt nicht automatisch Schmerz — der richtige Druck am richtigen Ort fühlt sich oft 'gut intensiv' an, nicht quälend. Wir sprechen während der Behandlung über das richtige Maß für Sie."}</p>
                </details>
                </>
              )}
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 bg-white border-t border-[#0d4f4f]/8">
          <div className="mx-auto max-w-4xl px-5 sm:px-8 grid sm:grid-cols-2 gap-4">
            <div className="flex flex-col items-start justify-between gap-4 rounded-3xl bg-[#f0f7f7] p-6 sm:p-8">
              <div>
                <p data-edit-id="treatment-prices-kicker" className="text-xs font-bold uppercase tracking-widest text-[#0d4f4f]/60 mb-1">Was kostet eine Behandlung?</p>
                <p data-edit-id="treatment-prices-title" className="text-lg sm:text-xl font-extrabold text-[#111]">Alle Preise & Block-Karten auf einen Blick</p>
              </div>
              <Link href="/preise" className="inline-flex items-center gap-2 rounded-full border-2 border-[#0d4f4f] px-6 py-3 text-sm font-bold text-[#0d4f4f] hover:bg-[#0d4f4f] hover:text-white transition-all duration-200 whitespace-nowrap">
                <span data-edit-id="treatment-prices-cta">Preise einsehen</span>
                <ArrowRight size={16} strokeWidth={2.5} aria-hidden={true} />
              </Link>
            </div>
            <div className="flex flex-col items-start justify-between gap-4 rounded-3xl bg-[#f0f7f7] p-6 sm:p-8">
              <div>
                <p data-edit-id="treatment-sister-kicker" className="text-xs font-bold uppercase tracking-widest text-[#0d4f4f]/60 mb-1">Im Vergleich</p>
                <p className="text-lg sm:text-xl font-extrabold text-[#111]">
                  {variant === "heilmassage" ? (
                    <span data-edit-id="heilmassage-sister-desc">Für Regeneration, Triggerpunkte und sportliche Belastung</span>
                  ) : (
                    <span data-edit-id="sportmassage-sister-desc">Bei Verspannungen, Rückenschmerzen und chronischen Beschwerden</span>
                  )}
                </p>
              </div>
              <Link href={variant === "heilmassage" ? "/sportmassage-wien" : "/heilmassage-wien-1080"} className="inline-flex items-center gap-2 rounded-full border-2 border-[#0d4f4f] px-6 py-3 text-sm font-bold text-[#0d4f4f] hover:bg-[#0d4f4f] hover:text-white transition-all duration-200 whitespace-nowrap">
                {variant === "heilmassage" ? (
                  <span data-edit-id="heilmassage-sister-cta">Sportmassage ansehen</span>
                ) : (
                  <span data-edit-id="sportmassage-sister-cta">Heilmassage ansehen</span>
                )}
                <ArrowRight size={16} strokeWidth={2.5} aria-hidden={true} />
              </Link>
            </div>
          </div>
        </section>

        <section id="final-cta" className="py-16 sm:py-24 bg-[#0d4f4f]">
          <div className="mx-auto max-w-2xl px-5 sm:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
              {variant === "heilmassage" ? (
              <span data-edit-id="heilmassage-cta-heading">Bereit für eine Behandlung?</span>
            ) : (
              <span data-edit-id="sportmassage-cta-heading">Bereit für mehr Beweglichkeit und Regeneration?</span>
            )}
            </h2>
            <p className="text-white/65 mb-10 leading-relaxed">
              {variant === "heilmassage" ? (
              <span data-edit-id="heilmassage-cta-text">Termin direkt online buchen – oder melden Sie sich, wenn Sie vorher Fragen haben.</span>
            ) : (
              <span data-edit-id="sportmassage-cta-text">Ob Freizeit- oder Leistungssport – die Behandlung richtet sich nach Ihrem Körper und Ihren Zielen.</span>
            )}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/buchen" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#e8654a] to-[#f2a93b] px-8 py-4 text-base font-bold text-white shadow-lg shadow-[#e8654a]/30 transition-all duration-200 hover:shadow-xl hover:shadow-[#e8654a]/40 motion-safe:hover:scale-[1.03]">
                <span data-edit-id="treatment-final-cta-book">Termin vereinbaren</span>
                <ArrowRight size={18} strokeWidth={2.5} aria-hidden={true} />
              </Link>
              <a href="/#kontakt" className="inline-flex items-center gap-2 rounded-full border border-white/25 px-8 py-4 text-base font-semibold text-white/80 transition-all duration-200 hover:bg-white/10 hover:text-white">
                <span data-edit-id="treatment-final-cta-contact">Kontakt</span>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
