"use client";

import Image from "next/image";
import { Heart, Droplets, Hand } from "lucide-react";
import type { SanityService, SanityHomePage } from "@/sanity/lib/queries";

const FALLBACK_SERVICES = [
  {
    icon: Heart,
    title: "Heilmassage",
    description:
      "Tiefenwirksame Heilmassage zur Linderung von Verspannungen und Stress. Durch gezielte Techniken werden Blockaden gelöst, die Durchblutung gefördert und die Muskulatur entspannt. Ideal bei Schmerzen und Bewegungseinschränkungen mit ärztlicher Verordnung.",
    price: "Ab \u20ac55",
    color: "#e8654a",
    bgColor: "#e8654a",
    number: "01",
    image: "/images/heilmassage-wien.webp",
    imageAlt: "Heilmassage Behandlung – gezielte Entspannung und Schmerzlinderung",
  },
  {
    icon: Droplets,
    title: "Lymphdrainage",
    description:
      "Sanfte manuelle Technik zur Entgiftung und Entstauung. Hilft bei Lymphödemen, Schwellungen nach OPs oder Verletzungen und fördert das Immunsystem. Auch ideal zur kosmetischen Anwendung bei Wassereinlagerungen und Cellulite.",
    price: "Ab \u20ac55",
    color: "#0d4f4f",
    bgColor: "#0d4f4f",
    number: "02",
    image: "/images/lymphdrainage.webp",
    imageAlt: "Manuelle Lymphdrainage – sanfte Entstauung und Immunsystem-Förderung",
  },
  {
    icon: Hand,
    title: "Klassische Massage",
    description:
      "Diese Massage bringt Körper und Geist wieder in Balance. Der Kreislauf beruhigt sich, die Atmung vertieft sich und die Muskulatur entspannt. Stresshormone werden reduziert und das Immunsystem gestärkt. Ideal für alle, die viel sitzen oder unter Anspannung stehen.",
    price: "Ab \u20ac55",
    color: "#f2a93b",
    bgColor: "#f2a93b",
    number: "03",
    image: "/images/klassische-massage.webp",
    imageAlt: "Klassische Massage – Entspannung und Wohlbefinden für Körper und Geist",
  },
];

const FALLBACK_BADGE = "Massagen-Angebot";
const FALLBACK_HEADING = "Was ich für Sie";
const FALLBACK_HEADING_ACCENT = "tun kann";
const FALLBACK_TEXT =
  "Hier geht es nicht nur um Entspannung, sondern um Ihr Wohlbefinden. Ich unterstütze Sie dabei, Verspannungen zu lösen, Schmerzen zu lindern und mehr Bewegungsfreiheit zu gewinnen.";

const COLORS = [
  { color: "#e8654a", bgColor: "#e8654a" },
  { color: "#0d4f4f", bgColor: "#0d4f4f" },
  { color: "#f2a93b", bgColor: "#f2a93b" },
];
const ICONS = [Heart, Droplets, Hand];

type ServiceDisplay = {
  icon: React.ElementType;
  title: string;
  description: string;
  price: string;
  color: string;
  bgColor: string;
  number: string;
  image?: string;
  imageAlt?: string;
};

function toDisplayServices(sanityServices: SanityService[]): ServiceDisplay[] {
  return sanityServices.map((s, i) => ({
    icon: ICONS[i % ICONS.length],
    title: s.title,
    description: s.shortDescription ?? "",
    price: s.price ?? "Ab \u20ac55",
    color: COLORS[i % COLORS.length].color,
    bgColor: COLORS[i % COLORS.length].bgColor,
    number: String(i + 1).padStart(2, "0"),
  }));
}

export function Services({
  sanityServices,
  homePage,
}: {
  sanityServices?: SanityService[] | null;
  homePage?: SanityHomePage | null;
}) {
  const services =
    sanityServices && sanityServices.length > 0
      ? toDisplayServices(sanityServices)
      : FALLBACK_SERVICES;

  const badge = homePage?.servicesBadge ?? FALLBACK_BADGE;
  const heading = homePage?.servicesHeading ?? FALLBACK_HEADING;
  const headingAccent = homePage?.servicesHeadingAccent ?? FALLBACK_HEADING_ACCENT;
  const text = homePage?.servicesText ?? FALLBACK_TEXT;

  return (
    <section
      id="leistungen"
      className="relative py-24 sm:py-32 bg-white overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-[#f2a93b]/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-[#e8654a]/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#0d4f4f]/8 px-4 py-1.5 text-sm font-bold text-[#0d4f4f]">
            {badge}
          </span>
          <h2 className="mt-4 text-[clamp(2rem,4vw,3.5rem)] font-extrabold leading-[1.05] tracking-tight text-[#111]">
            {heading}{" "}
            <span className="text-[#e8654a]">{headingAccent}</span>
          </h2>
          <p className="mt-4 text-lg text-[#555] leading-relaxed">
            {text}
          </p>
        </div>

        <div className="mt-14 sm:mt-20 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="group relative rounded-3xl bg-white border border-gray-100 overflow-hidden transition-all duration-300 hover:-translate-y-2"
              style={{
                boxShadow: `0 4px 30px ${service.bgColor}10`,
              }}
            >
              {/* Card image */}
              {service.image && (
                <div className="relative w-full h-44 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.imageAlt ?? service.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    quality={75}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: `linear-gradient(to bottom, transparent 50%, ${service.bgColor}22)` }}
                  />
                </div>
              )}

              <div className="p-8 sm:p-10">
              <span aria-hidden="true" className="absolute top-6 right-8 text-[5rem] font-extrabold leading-none opacity-[0.04] select-none">
                {service.number}
              </span>

              <div
                className="inline-flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: `${service.bgColor}12` }}
              >
                <service.icon
                  size={26}
                  style={{ color: service.color }}
                  strokeWidth={2.5}
                />
              </div>

              <h3 className="mt-6 text-xl font-extrabold text-[#111]">
                {service.title}
              </h3>
              <p className="mt-3 text-[#555] leading-relaxed text-sm">
                {service.description}
              </p>

              <div className="mt-6 flex items-center justify-between">
                <span
                  className="inline-flex rounded-full px-4 py-1.5 text-sm font-bold text-white"
                  style={{
                    background: `linear-gradient(135deg, ${service.bgColor}, ${service.bgColor}cc)`,
                  }}
                >
                  {service.price}
                </span>
                <a
                  href="/buchen"
                  className="text-sm font-bold transition-colors hover:underline text-[#0d4f4f]"
                >
                  Termin buchen &rarr;
                </a>
              </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
