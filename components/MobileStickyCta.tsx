"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Calendar, Mail, Phone } from "lucide-react";

type Props = {
  href: string;
  telHref: string;
  /** Icon vor dem Label: Kalender (Buchung) oder Brief (Mail-Anfrage) */
  icon?: "calendar" | "mail";
  /**
   * IDs von Elementen, die den CTA bereits zeigen (Hero-CTA, Schluss-CTA,
   * Footer). Solange eines davon im Viewport ist, bleibt die Leiste verborgen.
   * Fehlen alle IDs auf einer Seite, erscheint die Leiste nach dem ersten
   * Scroll-Abschnitt.
   */
  watchIds: string[];
};

const FALLBACK_SCROLL_Y = 560;

/**
 * Mobile-only sticky action bar (unter lg). Hält die Primäraktion im
 * Daumenbereich, ohne sie zu doppeln, wo sie ohnehin sichtbar ist.
 */
export function MobileStickyCta({
  href,
  telHref,
  icon = "calendar",
  watchIds,
}: Props) {
  const [hiddenBy, setHiddenBy] = useState<Set<string>>(
    () => new Set(watchIds),
  );
  const [scrolledPastFold, setScrolledPastFold] = useState(false);

  useEffect(() => {
    const targets = watchIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    const found = new Set(targets.map((el) => el.id));
    // Nur vorhandene Ziele blockieren; nicht vorhandene IDs zählen nicht.
    // (asynchron, damit der Effekt selbst kein Re-Render auslöst)
    const frame = requestAnimationFrame(() => {
      setHiddenBy(found);
      if (found.has("hero-cta")) setScrolledPastFold(true);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        setHiddenBy((prev) => {
          const next = new Set(prev);
          for (const entry of entries) {
            if (entry.isIntersecting) next.add(entry.target.id);
            else next.delete(entry.target.id);
          }
          return next;
        });
      },
      { threshold: 0.05 },
    );
    targets.forEach((el) => observer.observe(el));

    const hasHeroTarget = found.has("hero-cta");
    const onScroll = () =>
      setScrolledPastFold(window.scrollY > FALLBACK_SCROLL_Y);
    if (!hasHeroTarget) {
      window.addEventListener("scroll", onScroll, { passive: true });
      requestAnimationFrame(onScroll);
    }

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [watchIds]);

  const visible = hiddenBy.size === 0 && scrolledPastFold;
  const Icon = icon === "mail" ? Mail : Calendar;
  const isExternal = href.startsWith("mailto:") || href.startsWith("tel:");

  const primaryClass =
    "inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#e8654a] to-[#f2a93b] px-5 py-3.5 text-sm font-bold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d4f4f] focus-visible:ring-offset-2";

  return (
    <div
      aria-hidden={!visible}
      className={`fixed inset-x-0 bottom-0 z-40 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 lg:hidden transition-all duration-300 ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-full opacity-0"
      }`}
    >
      <div className="mx-auto flex max-w-md items-center gap-2 rounded-full border border-[#0d4f4f]/10 bg-white/95 p-1.5 shadow-xl shadow-[#0d4f4f]/15 backdrop-blur-md">
        {isExternal ? (
          <a href={href} tabIndex={visible ? 0 : -1} className={primaryClass}>
            <Icon size={16} strokeWidth={2.5} aria-hidden={true} />
            <span data-edit-id="sticky-cta-hausbesuch">Hausbesuch anfragen</span>
          </a>
        ) : (
          <Link
            href={href}
            tabIndex={visible ? 0 : -1}
            className={primaryClass}
          >
            <Icon size={16} strokeWidth={2.5} aria-hidden={true} />
            <span data-edit-id="sticky-cta-buchen">Termin buchen</span>
          </Link>
        )}
        <a
          href={telHref}
          tabIndex={visible ? 0 : -1}
          aria-label="Anrufen"
          className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#0d4f4f] text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d4f4f] focus-visible:ring-offset-2"
        >
          <Phone size={18} strokeWidth={2.5} aria-hidden={true} />
        </a>
      </div>
    </div>
  );
}
