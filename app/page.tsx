import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { GoogleReviews } from "@/components/GoogleReviews";
import { fetchReviewSummary } from "@/components/GoogleReviewsBadge";
import { Pricing } from "@/components/Pricing";
import { FAQ } from "@/components/FAQ";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import {
  getServices,
  getPricingItems,
  getFaqItems,
  getAbout,
  getSettings,
  getHomePage,
} from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

export const metadata: Metadata = {
  title: "Heilmasseur Domenic Hacker | Heilmassage Wien 1080",
  description:
    "Diplomierter Heilmasseur in Wien 1080 (Josefstadt). Heilmassage, Lymphdrainage & Klassische Massage – gezielt, wirksam und individuell. Jetzt Termin buchen.",
  alternates: {
    canonical: "https://heilmasseur-domenic.at",
  },
};

export default async function Home() {
  const [services, pricingItems, faqItems, about, settings, reviewSummary, homePage] =
    await Promise.all([
      getServices(),
      getPricingItems(),
      getFaqItems(),
      getAbout(),
      getSettings(),
      fetchReviewSummary(),
      getHomePage(),
    ]);

  const teaserText =
    about?.bio && about.bio.length > 0
      ? about.bio[0]
      : "Ich verbinde fundiertes Fachwissen mit einem feinen Gespür für den Körper. Bewegung prägt mein Leben — sowohl in der Therapie als auch im Breakdance, der meine Körperwahrnehmung nachhaltig geschult hat.";

  return (
    <>
      <main>
        <Hero
          sanitySettings={settings}
          reviewSummary={reviewSummary}
          heroBackgroundImageUrl={homePage?.heroBackgroundImage ? urlFor(homePage.heroBackgroundImage).width(2000).quality(80).url() : undefined}
        />
        <Services sanityServices={services} homePage={homePage} />

        {/* Portrait – Vertrauen aufbauen */}
        <section className="py-14 sm:py-20 bg-white flex flex-col items-center text-center gap-5 px-5">
          <div className="w-56 h-56 sm:w-72 sm:h-72 rounded-full border-4 border-[#0d4f4f]/10 shadow-xl overflow-hidden bg-[#0d4f4f]/8 flex items-center justify-center">
            {homePage?.portraitImage ? (
              <Image
                src={urlFor(homePage.portraitImage).width(576).height(576).url()}
                alt={homePage?.portraitName ?? "Domenic Hacker"}
                width={288}
                height={288}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-6xl sm:text-7xl font-extrabold text-[#0d4f4f]/30 select-none">
                DH
              </span>
            )}
          </div>
          <div>
            <p className="text-lg sm:text-xl font-extrabold text-[#111]">
              {homePage?.portraitName ?? "Domenic Hacker"}
            </p>
            <p className="text-sm text-[#555] mt-1">
              {homePage?.portraitTitle ?? "Dipl. Heilmasseur"}
            </p>
          </div>
        </section>

        <GoogleReviews homePage={homePage} />
        <Pricing sanityPricing={pricingItems} sanitySettings={settings} homePage={homePage} />

        {/* About Teaser */}
        <section className="py-20 sm:py-24 bg-white">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="flex flex-col sm:flex-row items-center gap-10 sm:gap-14">
              <div className="relative shrink-0 w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden border-4 border-[#0d4f4f]/10 shadow-xl">
                <Image
                  src={homePage?.aboutTeaserImage ? urlFor(homePage.aboutTeaserImage).width(352).height(352).url() : "/images/domenic-wien.webp"}
                  alt="Domenic Hacker – Diplomierter Heilmasseur Wien"
                  fill
                  sizes="(max-width: 640px) 144px, 176px"
                  className="object-cover object-[75%_20%]"
                />
              </div>
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-[#0d4f4f]/8 px-4 py-1.5 text-sm font-bold text-[#0d4f4f]">
                  {homePage?.aboutTeaserBadge ?? "Über Domenic Hacker"}
                </span>
                <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold text-[#111] leading-tight">
                  {homePage?.aboutTeaserHeading ?? "Diplomierter Heilmasseur"}{" "}
                  <span className="text-[#0d4f4f]">{homePage?.aboutTeaserHeadingAccent ?? "mit Leidenschaft"}</span>
                </h2>
                <p className="mt-3 text-base text-[#555] leading-relaxed max-w-xl">
                  {teaserText}
                </p>
                <Link
                  href="/ueber-mich"
                  className="mt-5 inline-flex items-center gap-2 rounded-full border-2 border-[#0d4f4f] px-6 py-2.5 text-sm font-bold text-[#0d4f4f] hover:bg-[#0d4f4f] hover:text-white transition-all duration-200"
                >
                  Mehr über mich
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Praxis */}
        <section id="praxis" className="py-20 sm:py-28 bg-[#f8f7f5]">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-black/10">
                <Image
                  src={homePage?.praxisImage ? urlFor(homePage.praxisImage).width(800).height(534).url() : "/images/praxis-interior.png"}
                  alt="Behandlungsraum der Heilmassage-Praxis in Wien 1080 – helle Altbauräume mit professioneller Massageliege"
                  width={800}
                  height={534}
                  className="w-full h-auto"
                  quality={85}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-[#0d4f4f]/8 px-4 py-1.5 text-sm font-bold text-[#0d4f4f]">
                  {homePage?.praxisBadge ?? "Die Praxis"}
                </span>
                <h2 className="mt-4 text-[clamp(1.75rem,3.5vw,2.75rem)] font-extrabold leading-[1.1] tracking-tight text-[#111]">
                  {homePage?.praxisHeading ?? "Ihr Raum für"}{" "}
                  <span className="text-[#0d4f4f]">{homePage?.praxisHeadingAccent ?? "Erholung"}</span>
                </h2>
                <p className="mt-4 text-base sm:text-lg text-[#555] leading-relaxed">
                  {homePage?.praxisDescription ?? "Meine Praxis befindet sich in einem ruhigen Altbau in der Josefstadt — mitten in Wien, aber abseits vom Trubel. Helle Räume, eine angenehme Atmosphäre und alles, was Sie für eine entspannte Behandlung brauchen."}
                </p>

                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3 rounded-2xl bg-white p-4 shadow-sm">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0d4f4f]/8">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#0d4f4f]"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#111]">{settings?.address ?? "Feldgasse 3/20"}</p>
                      <p className="text-xs text-[#666]">1080 Wien, Josefstadt</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 rounded-2xl bg-white p-4 shadow-sm">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0d4f4f]/8">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#0d4f4f]"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#111]">Flexible Termine</p>
                      <p className="text-xs text-[#666]">Nach Vereinbarung</p>
                    </div>
                  </div>
                </div>

                <a
                  href={settings?.googleMapsUrl ?? "https://maps.google.com/?q=Feldgasse+3,+1080+Wien"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center gap-2 rounded-full border-2 border-[#0d4f4f] px-6 py-2.5 text-sm font-bold text-[#0d4f4f] hover:bg-[#0d4f4f] hover:text-white transition-all duration-200"
                >
                  Route planen
                </a>
              </div>
            </div>
          </div>
        </section>

        <FAQ sanityFaqs={faqItems} />
        <Contact />
      </main>
      <Footer sanitySettings={settings} />
    </>
  );
}
