"use client";

import Image from "next/image";
import { Heart, Droplets, Hand } from "lucide-react";

export function Services() {
  return (
    <section
      id="leistungen"
      className="relative py-24 sm:py-32 bg-white overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-[#f2a93b]/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-[#e8654a]/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <span
            data-edit-id="home-services-badge"
            className="inline-flex items-center gap-2 rounded-full bg-[#0d4f4f]/8 px-4 py-1.5 text-sm font-bold text-[#0d4f4f]"
          >
            Massagen-Angebot
          </span>
          <h2 className="mt-4 text-[clamp(2rem,4vw,3.5rem)] font-extrabold leading-[1.05] tracking-tight text-[#111]">
            <span data-edit-id="home-services-heading">Wobei ich Sie gezielt</span>{" "}
            <span data-edit-id="home-services-accent" className="text-[#e8654a]">
              unterstützen kann
            </span>
          </h2>
          <p
            data-edit-id="home-services-text"
            className="mt-4 text-lg text-[#555] leading-relaxed"
          >
            Ob Verspannungen, chronische Schmerzen oder einfach der Wunsch nach Entspannung – ich biete Ihnen individuell abgestimmte Behandlungen, die auf Ihre Bedürfnisse zugeschnitten sind.
          </p>
        </div>

        <div className="mt-14 sm:mt-20 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <div
            className="group relative rounded-3xl bg-white border border-gray-100 overflow-hidden transition-all duration-300 hover:-translate-y-2"
            style={{ boxShadow: "0 4px 30px #e8654a10" }}
          >
            <div className="relative w-full h-44 overflow-hidden">
              <Image
                src="/images/heilmassage-wien.webp"
                alt="Heilmassage Behandlung – gezielte Entspannung und Schmerzlinderung"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                quality={75}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to bottom, transparent 50%, #e8654a22)" }}
              />
            </div>
            <div className="p-8 sm:p-10">
              <span aria-hidden="true" className="absolute top-6 right-8 text-[5rem] font-extrabold leading-none opacity-[0.04] select-none">
                01
              </span>
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110" style={{ backgroundColor: "#e8654a12" }}>
                <Heart size={26} style={{ color: "#e8654a" }} strokeWidth={2.5} />
              </div>
              <h3 data-edit-id="service-heilmassage-title" className="mt-6 text-xl font-extrabold text-[#111]">
                Heilmassage
              </h3>
              <p data-edit-id="service-heilmassage-desc" className="mt-3 text-[#555] leading-relaxed text-sm whitespace-pre-line">
                {"Gezielte Heilmassage zur Behandlung von Verspannungen und Schmerzen.\nLöst muskuläre Verspannungen und fördert die Durchblutung.\nMit ärztlicher Verordnung.\nJe nach Krankenkasse ist eine teilweise Rückerstattung möglich."}
              </p>
              <div className="mt-6 flex items-center justify-between">
                <span
                  data-edit-id="service-heilmassage-price"
                  className="inline-flex rounded-full px-4 py-1.5 text-sm font-bold text-white"
                  style={{ background: "linear-gradient(135deg, #e8654a, #e8654acc)" }}
                >
                  Ab €55
                </span>
                <a href="/buchen" className="text-sm font-bold transition-colors hover:underline text-[#0d4f4f]">
                  <span data-edit-id="service-heilmassage-cta">Termin buchen →</span>
                </a>
              </div>
            </div>
          </div>

          <div
            className="group relative rounded-3xl bg-white border border-gray-100 overflow-hidden transition-all duration-300 hover:-translate-y-2"
            style={{ boxShadow: "0 4px 30px #0d4f4f10" }}
          >
            <div className="relative w-full h-44 overflow-hidden">
              <Image
                src="/images/lymphdrainage.webp"
                alt="Manuelle Lymphdrainage – sanfte Entstauung und Immunsystem-Förderung"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                quality={75}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to bottom, transparent 50%, #0d4f4f22)" }}
              />
            </div>
            <div className="p-8 sm:p-10">
              <span aria-hidden="true" className="absolute top-6 right-8 text-[5rem] font-extrabold leading-none opacity-[0.04] select-none">
                02
              </span>
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110" style={{ backgroundColor: "#0d4f4f12" }}>
                <Droplets size={26} style={{ color: "#0d4f4f" }} strokeWidth={2.5} />
              </div>
              <h3 data-edit-id="service-lymphdrainage-title" className="mt-6 text-xl font-extrabold text-[#111]">
                Lymphdrainage
              </h3>
              <p data-edit-id="service-lymphdrainage-desc" className="mt-3 text-[#555] leading-relaxed text-sm">
                Manuelle Lymphdrainage zur Entstauung bei Schwellungen und Lymphödemen. Unterstützt den Abtransport von Flüssigkeit und fördert die Regeneration.
              </p>
              <div className="mt-6 flex items-center justify-between">
                <span
                  data-edit-id="service-lymphdrainage-price"
                  className="inline-flex rounded-full px-4 py-1.5 text-sm font-bold text-white"
                  style={{ background: "linear-gradient(135deg, #0d4f4f, #0d4f4fcc)" }}
                >
                  Ab €55
                </span>
                <a href="/buchen" className="text-sm font-bold transition-colors hover:underline text-[#0d4f4f]">
                  <span data-edit-id="service-lymphdrainage-cta">Termin buchen →</span>
                </a>
              </div>
            </div>
          </div>

          <div
            className="group relative rounded-3xl bg-white border border-gray-100 overflow-hidden transition-all duration-300 hover:-translate-y-2"
            style={{ boxShadow: "0 4px 30px #f2a93b10" }}
          >
            <div className="relative w-full h-44 overflow-hidden">
              <Image
                src="/images/klassische-massage.webp"
                alt="Klassische Massage – Entspannung und Wohlbefinden für Körper und Geist"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                quality={75}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to bottom, transparent 50%, #f2a93b22)" }}
              />
            </div>
            <div className="p-8 sm:p-10">
              <span aria-hidden="true" className="absolute top-6 right-8 text-[5rem] font-extrabold leading-none opacity-[0.04] select-none">
                03
              </span>
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110" style={{ backgroundColor: "#f2a93b12" }}>
                <Hand size={26} style={{ color: "#f2a93b" }} strokeWidth={2.5} />
              </div>
              <h3 data-edit-id="service-klassische-title" className="mt-6 text-xl font-extrabold text-[#111]">
                Klassische Massage
              </h3>
              <p data-edit-id="service-klassische-desc" className="mt-3 text-[#555] leading-relaxed text-sm">
                Klassische Massage zur Lockerung der Muskulatur und Linderung von Verspannungen. Verbessert die Durchblutung und unterstützt die Entspannung des Nervensystems.
              </p>
              <div className="mt-6 flex items-center justify-between">
                <span
                  data-edit-id="service-klassische-price"
                  className="inline-flex rounded-full px-4 py-1.5 text-sm font-bold text-white"
                  style={{ background: "linear-gradient(135deg, #f2a93b, #f2a93bcc)" }}
                >
                  Ab €55
                </span>
                <a href="/buchen" className="text-sm font-bold transition-colors hover:underline text-[#0d4f4f]">
                  <span data-edit-id="service-klassische-cta">Termin buchen →</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
