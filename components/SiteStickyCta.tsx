"use client";

import { usePathname } from "next/navigation";
import { MobileStickyCta } from "./MobileStickyCta";

/** Seiten, auf denen die Leiste nichts verloren hat. */
const HIDDEN_PREFIXES = [
  "/buchen",
  "/studio",
  "/labs",
  "/gutschein",
  "/visitenkarten",
  "/impressum",
  "/datenschutz",
  "/agb",
];

const WATCH_IDS = ["hero-cta", "final-cta", "kontakt", "site-footer"];

/**
 * Site-weite Sticky-Pill für Mobile. Der Text richtet sich nach der Seite:
 * Hausbesuch-Seite → Mail-Anfrage, alle anderen → Terminbuchung.
 */
export function SiteStickyCta({
  phone,
  email,
}: {
  phone: string;
  email: string;
}) {
  const pathname = usePathname();
  if (HIDDEN_PREFIXES.some((p) => pathname.startsWith(p))) return null;

  const telHref = `tel:${phone.replace(/\s/g, "")}`;
  const isMobileMassage = pathname.startsWith("/mobile-massage-wien");

  // key={pathname}: Bei Soft-Navigation muss die Leiste neu aufsetzen, sonst
  // beobachtet sie weiter die Ziel-Elemente der vorigen Seite.
  if (isMobileMassage) {
    return (
      <MobileStickyCta
        key={pathname}
        href={`mailto:${email}?subject=${encodeURIComponent("Anfrage Hausbesuch")}`}
        telHref={telHref}
        icon="mail"
        watchIds={WATCH_IDS}
      />
    );
  }

  return (
    <MobileStickyCta
      key={pathname}
      href="/buchen"
      telHref={telHref}
      icon="calendar"
      watchIds={WATCH_IDS}
    />
  );
}
