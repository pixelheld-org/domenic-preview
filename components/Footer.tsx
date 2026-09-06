"use client";

import { Heart, Instagram } from "lucide-react";
import Image from "next/image";
import * as CookieConsent from "vanilla-cookieconsent";
import type { SanitySettings } from "@/sanity/lib/queries";

const angebotLinks = [
  { label: "Heilmassage Wien", href: "/heilmassage-wien-1080" },
  { label: "Sportmassage Wien", href: "/sportmassage-wien" },
  { label: "Preise", href: "/preise" },
  { label: "Gutscheine", href: "/gutscheine" },
];

const praxisLinks = [
  { label: "Startseite", href: "/" },
  { label: "Über mich", href: "/ueber-mich" },
  { label: "Termin buchen", href: "/buchen" },
  { label: "Impressum", href: "/impressum" },
  { label: "Datenschutz", href: "/datenschutz" },
  { label: "AGB", href: "/agb" },
];

export function Footer({ sanitySettings }: { sanitySettings?: SanitySettings | null }) {
  const instagramUrl = sanitySettings?.instagramUrl || "https://www.instagram.com/heilmasseurdomenic";
  return (
    <footer className="relative bg-[#0a0a0a] pt-16 pb-8">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col md:flex-row items-start justify-between gap-10">
          {/* Brand block */}
          <div className="max-w-xs">
            <div className="flex items-center gap-2.5">
              <Image
                src="/images/logo-icon.svg"
                alt="Logo"
                width={36}
                height={36}
                className="h-9 w-auto brightness-0 invert"
              />
              <span className="font-extrabold text-lg text-white tracking-tight">
                Domenic Hacker
              </span>
            </div>
            <p className="mt-3 text-sm text-white/60 leading-relaxed">
              Diplomierter Heilmasseur in Wien 1080. Heilmassage,
              Lymphdrainage & Klassische Massage. Feldgasse 3/20, 1080 Wien.
            </p>
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white/60 hover:text-white transition-colors duration-200"
            >
              <Instagram size={16} />
              @heilmasseurdomenic
            </a>
          </div>

          {/* Link columns */}
          <div className="flex flex-col sm:flex-row gap-10 sm:gap-16">
            {/* Angebot column */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">
                Angebot
              </p>
              <nav className="flex flex-col gap-2.5">
                {angebotLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-sm font-semibold text-white/60 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>

            {/* Praxis column */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">
                Praxis
              </p>
              <nav className="flex flex-col gap-2.5">
                {praxisLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-sm font-semibold text-white/60 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
              <button
                type="button"
                onClick={() => CookieConsent.showPreferences()}
                aria-haspopup="dialog"
                className="cursor-pointer mt-2.5 text-sm font-semibold text-white/60 hover:text-white transition-colors duration-200"
              >
                Cookie-Einstellungen
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 h-px bg-white/5" />

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/50">
          <p>
            &copy; {new Date().getFullYear()} Domenic Hacker. Alle Rechte
            vorbehalten.
          </p>
          <p className="inline-flex items-center gap-1">
            Crafted with <Heart size={12} className="text-[#e8654a]" /> in Wien by{" "}
            <a
              href="https://pixelmeister.at"
              target="_blank"
              rel="noopener"
              className="hover:text-white/60 transition-colors duration-200"
            >
              pixelmeister.at
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
