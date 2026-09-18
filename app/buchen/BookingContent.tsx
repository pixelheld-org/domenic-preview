"use client";

import { useEffect, useState, useCallback } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ExternalLink,
  CheckCircle,
  CalendarCheck,
  RotateCcw,
} from "lucide-react";
import { Footer } from "@/components/Footer";

export function BookingContent() {
  const [booked, setBooked] = useState(false);

  // Listen for Calendly event_scheduled postMessage
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (
        e.origin === "https://calendly.com" &&
        e.data?.event === "calendly.event_scheduled"
      ) {
        setBooked(true);
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const resetBooking = useCallback(() => {
    setBooked(false);
  }, []);

  return (
    <div className="min-h-screen bg-[#0d4f4f]">

      {/* Hero section */}
      <section className="relative py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-[#e8654a]/15" />
          <div className="absolute bottom-20 -left-20 w-[300px] h-[300px] rounded-full bg-[#f2a93b]/10" />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-[1.05] tracking-tight text-white">
              <span data-edit-id="buchen-hero-heading">Termin online buchen —</span>{" "}
              <span data-edit-id="buchen-hero-accent" className="text-[#f2a93b]">
                schnell & unkompliziert
              </span>
            </h1>
            <p data-edit-id="buchen-hero-subtitle" className="mt-4 text-lg text-white/70">
              In 3 einfachen Schritten zu Ihrem Termin
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#f2a93b] text-[#111] font-extrabold text-base aspect-square">
                  1
                </span>
                <span data-edit-id="buchen-step-1" className="text-white/80 font-semibold text-sm">
                  Behandlung auswählen
                </span>
                <span className="hidden sm:block text-white/30 ml-4">→</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#f2a93b] text-[#111] font-extrabold text-base aspect-square">
                  2
                </span>
                <span data-edit-id="buchen-step-2" className="text-white/80 font-semibold text-sm">
                  Wunschtermin wählen
                </span>
                <span className="hidden sm:block text-white/30 ml-4">→</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#f2a93b] text-[#111] font-extrabold text-base aspect-square">
                  3
                </span>
                <span data-edit-id="buchen-step-3" className="text-white/80 font-semibold text-sm">
                  Kontaktdaten eingeben
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Calendly — directly on the page, no container */}
      <section className="bg-white">
        {booked ? (
          <div className="mx-auto max-w-2xl px-5 sm:px-8 py-20 text-center">
            <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-[#0d4f4f]/10 mb-6">
              <CalendarCheck size={40} className="text-[#0d4f4f]" />
            </div>
            <h2 data-edit-id="buchen-success-heading" className="text-3xl font-extrabold text-[#111]">
              Termin erfolgreich gebucht!
            </h2>
            <p data-edit-id="buchen-success-text" className="mt-3 text-lg text-[#555]">
              Sie erhalten in Kürze eine Bestätigung per E-Mail.
            </p>
            <button
              onClick={resetBooking}
              className="cursor-pointer mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#e8654a] to-[#f2a93b] px-7 py-3.5 text-base font-bold text-white shadow-lg shadow-[#e8654a]/25 transition-all duration-300 hover:shadow-xl hover:scale-105"
            >
              <RotateCcw size={18} />
              Weiteren Termin buchen
            </button>
          </div>
        ) : (
          <div style={{ touchAction: "pan-y" }}>
            <div className="flex min-h-[500px] items-center justify-center rounded-2xl bg-white p-10 text-center text-[#0d4f4f]">
              Testvorschau: Die echte Terminbuchung ist hier deaktiviert.
            </div>
          </div>
        )}
      </section>

      {/* Info & Map section */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111]">
                <span data-edit-id="buchen-info-heading">So finden Sie</span>{" "}
                <span data-edit-id="buchen-info-accent" className="text-[#0d4f4f]">
                  die Praxis
                </span>
              </h2>
              <p data-edit-id="buchen-info-text" className="mt-3 text-[#555] leading-relaxed">
                Die Praxis befindet sich im 8. Bezirk (Josefstadt) und ist mit öffentlichen Verkehrsmitteln gut erreichbar.
              </p>

              <div className="mt-8 flex flex-col gap-4">
                <div className="flex items-start gap-4 rounded-2xl bg-white border border-gray-100 p-5 shadow-sm">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e8654a]/15">
                    <MapPin size={20} className="text-[#e8654a]" />
                  </div>
                  <div>
                    <p data-edit-id="buchen-address-label" className="text-xs font-semibold uppercase tracking-wider text-[#999]">
                      Adresse
                    </p>
                    <a
                      href="https://maps.google.com/?q=Feldgasse+3,+1080+Wien"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 block text-sm sm:text-base font-semibold text-[#111] hover:text-[#0d4f4f] transition-colors"
                    >
                      <span data-edit-id="buchen-address-value">Feldgasse 3/20, 1080 Wien</span>
                      <ExternalLink size={14} className="inline ml-1.5 -mt-0.5" />
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4 rounded-2xl bg-white border border-gray-100 p-5 shadow-sm">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0d4f4f]/15">
                    <Phone size={20} className="text-[#0d4f4f]" />
                  </div>
                  <div>
                    <p data-edit-id="buchen-phone-label" className="text-xs font-semibold uppercase tracking-wider text-[#999]">
                      Telefon
                    </p>
                    <a
                      href="tel:+436701895256"
                      className="mt-1 block text-sm sm:text-base font-semibold text-[#111] hover:text-[#0d4f4f] transition-colors"
                    >
                      <span data-edit-id="buchen-phone-value">+43 670 189 52 56</span>
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4 rounded-2xl bg-white border border-gray-100 p-5 shadow-sm">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f2a93b]/15">
                    <Mail size={20} className="text-[#f2a93b]" />
                  </div>
                  <div>
                    <p data-edit-id="buchen-email-label" className="text-xs font-semibold uppercase tracking-wider text-[#999]">
                      E-Mail
                    </p>
                    <a
                      href="mailto:praxis@heilmasseur-domenic.at"
                      className="mt-1 block text-sm sm:text-base font-semibold text-[#111] hover:text-[#0d4f4f] transition-colors"
                    >
                      <span data-edit-id="buchen-email-value">praxis@heilmasseur-domenic.at</span>
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4 rounded-2xl bg-white border border-gray-100 p-5 shadow-sm">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0d4f4f]/15">
                    <Clock size={20} className="text-[#0d4f4f]" />
                  </div>
                  <div>
                    <p data-edit-id="buchen-hours-label" className="text-xs font-semibold uppercase tracking-wider text-[#999]">
                      Termine
                    </p>
                    <p data-edit-id="buchen-hours-value" className="mt-1 text-sm sm:text-base font-semibold text-[#111]">
                      Nach Vereinbarung
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-sm text-[#555]">
                  <CheckCircle size={16} className="text-[#0d4f4f]" />
                  <span data-edit-id="buchen-access-1">Barrierefreier Zugang</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#555]">
                  <CheckCircle size={16} className="text-[#0d4f4f]" />
                  <span data-edit-id="buchen-access-2">Parkplätze in der Nähe</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#555]">
                  <CheckCircle size={16} className="text-[#0d4f4f]" />
                  <span data-edit-id="buchen-access-3">U-Bahn Rathaus (U2) in 5 Min.</span>
                </div>
              </div>
            </div>

            <div className="rounded-3xl overflow-hidden shadow-xl shadow-black/5 border border-gray-100">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2658.6!2d16.349!3d48.211!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sFeldgasse+3%2C+1080+Wien!5e0!3m2!1sde!2sat!4v1"
                className="w-full h-[400px] lg:h-full min-h-[400px] border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Praxis Standort - Feldgasse 3/20, 1080 Wien"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
