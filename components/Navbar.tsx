"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, Check, ChevronDown, Calendar } from "lucide-react";
import Image from "next/image";

type NavLink = { kind: "link"; label: string; href: string };
type NavDropdown = {
  kind: "dropdown";
  label: string;
  items: { label: string; href: string }[];
};
type NavItem = NavLink | NavDropdown;

// NOTE: Only one dropdown is currently supported because state and refs
// (desktopDropdownOpen, dropdownRef, closeTimeoutRef) are scalar.
// To add a second dropdown, refactor to per-item state (e.g. Map<label, boolean>)
// or extract a Dropdown sub-component with its own state.
const navItems: NavItem[] = [
  { kind: "link", label: "Startseite", href: "/" },
  {
    kind: "dropdown",
    label: "Leistungen",
    items: [
      { label: "Heilmassage", href: "/heilmassage-wien-1080" },
      { label: "Sportmassage", href: "/sportmassage-wien" },
    ],
  },
  { kind: "link", label: "Preise", href: "/preise" },
  { kind: "link", label: "Gutscheine", href: "/gutscheine" },
  { kind: "link", label: "Über mich", href: "/ueber-mich" },
];

// Pages that render a DARK hero behind the navbar at the top of the page.
// On these pages the navbar starts transparent with WHITE text (overlay style).
// All other pages (white/light heros) get DARK text from the start so the
// links stay visible — bg only turns solid white once the user scrolls.
// Add new pages with dark heros here.
const DARK_HERO_PATHS = new Set<string>([
  "/",
  "/ueber-mich",
  "/heilmassage-wien-1080",
  "/sportmassage-wien",
  "/buchen",
]);

export function Navbar({ initialPathname = "" }: { initialPathname?: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopDropdownOpen, setDesktopDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // usePathname() is null during static prerender when a proxy file is present,
  // so we accept the server-resolved pathname as a stable fallback. Once React
  // hydrates and the router context is ready, the hook returns the live value.
  const hookPathname = usePathname();
  const pathname = hookPathname || initialPathname;
  const isBookingPage = pathname === "/buchen";
  const hasDarkHero = DARK_HERO_PATHS.has(pathname);
  // Text/icon color: dark by default (white-hero pages), white only on dark-hero
  // pages while at the top. Once scrolled, always dark (solid white bg below).
  const useDarkText = scrolled || !hasDarkHero;

  if (pathname.startsWith("/studio")) return null;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Close dropdowns when navigating
  useEffect(() => {
    setDesktopDropdownOpen(false);
    setMobileDropdownOpen(false);
  }, [pathname]);

  // Click-outside + ESC for desktop dropdown
  useEffect(() => {
    if (!desktopDropdownOpen) return;
    function onMouseDown(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDesktopDropdownOpen(false);
      }
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setDesktopDropdownOpen(false);
    }
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [desktopDropdownOpen]);

  // Cleanup pending close-grace timeout on unmount
  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  // Hover handlers with 200ms grace timeout
  function openDropdown() {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setDesktopDropdownOpen(true);
  }
  function scheduleCloseDropdown() {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = setTimeout(
      () => setDesktopDropdownOpen(false),
      200,
    );
  }

  function isActiveLink(href: string): boolean {
    return pathname === href;
  }

  function isActiveDropdown(item: NavDropdown): boolean {
    return item.items.some((sub) => pathname === sub.href);
  }

  const getLinkClass = (active: boolean) => {
    if (useDarkText) {
      return active
        ? "text-[#0d4f4f] bg-[#0d4f4f]/8"
        : "text-[#333] hover:text-[#0d4f4f] hover:bg-[#0d4f4f]/8";
    }
    return active
      ? "text-white bg-white/15"
      : "text-white/90 hover:text-white hover:bg-white/15";
  };

  const getMobileLinkClass = (active: boolean) =>
    active ? "text-[#0d4f4f]" : "text-[#111] hover:text-[#0d4f4f]";

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg shadow-black/5"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex h-16 sm:h-20 items-center justify-between">
            <a
              href="/"
              className="relative z-10 flex items-center gap-2.5"
              onClick={() => setMobileOpen(false)}
            >
              <Image
                src="/images/logo-icon.svg"
                alt="Heilmasseur Domenic Hacker Logo"
                width={36}
                height={36}
                className="h-9 w-auto"
              />
              <span
                className={`font-extrabold text-lg tracking-tight transition-colors duration-300 ${
                  useDarkText ? "text-[#111]" : "text-white"
                }`}
              >
                Domenic Hacker
              </span>
            </a>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                if (item.kind === "link") {
                  const active = isActiveLink(item.href);
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${getLinkClass(active)}`}
                    >
                      {item.label}
                    </a>
                  );
                }
                // dropdown
                const active = isActiveDropdown(item);
                return (
                  <div
                    key={item.label}
                    ref={dropdownRef}
                    className="relative"
                    onMouseEnter={openDropdown}
                    onMouseLeave={scheduleCloseDropdown}
                  >
                    <button
                      type="button"
                      onClick={() => setDesktopDropdownOpen((o) => !o)}
                      aria-haspopup="true"
                      aria-expanded={desktopDropdownOpen}
                      className={`cursor-pointer inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${getLinkClass(active)}`}
                    >
                      {item.label}
                      <ChevronDown
                        size={14}
                        strokeWidth={2.5}
                        className={`transition-transform duration-200 ${
                          desktopDropdownOpen ? "rotate-180" : ""
                        }`}
                        aria-hidden={true}
                      />
                    </button>
                    {desktopDropdownOpen && (
                      <div
                        aria-label={`${item.label} Untermenü`}
                        className="absolute left-0 top-full mt-2 min-w-[220px] rounded-2xl bg-white/95 backdrop-blur-md shadow-lg shadow-black/10 border border-gray-100 overflow-hidden"
                      >
                        {item.items.map((sub) => {
                          const subActive = pathname === sub.href;
                          return (
                            <a
                              key={sub.href}
                              href={sub.href}
                              className={`block px-5 py-3 text-sm font-semibold transition-colors duration-200 ${
                                subActive
                                  ? "bg-[#0d4f4f]/8 text-[#0d4f4f]"
                                  : "text-[#333] hover:bg-[#0d4f4f]/8 hover:text-[#0d4f4f]"
                              }`}
                            >
                              {sub.label}
                            </a>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
              {isBookingPage ? (
                <span className="ml-3 inline-flex items-center gap-2 rounded-full bg-[#0d4f4f] px-5 py-2.5 text-sm font-bold text-white">
                  <Check size={16} strokeWidth={3} aria-hidden={true} />
                  Termin buchen
                </span>
              ) : (
                <a
                  href="/buchen"
                  className="ml-3 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#e8654a] to-[#f2a93b] px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-[#e8654a]/25 transition-all duration-200 hover:shadow-xl hover:shadow-[#e8654a]/30 motion-safe:hover:scale-105"
                >
                  <Calendar size={16} strokeWidth={2.5} aria-hidden={true} />
                  Termin buchen
                </a>
              )}
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`cursor-pointer relative z-10 md:hidden p-2 rounded-xl transition-colors ${
                useDarkText || mobileOpen
                  ? "text-[#111] hover:bg-black/5"
                  : "text-white hover:bg-white/15"
              }`}
              aria-label={mobileOpen ? "Menü schließen" : "Menü öffnen"}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-white overflow-y-auto">
          <div className="flex flex-col items-center pt-24 pb-12 gap-6 min-h-full">
            {navItems.map((item) => {
              if (item.kind === "link") {
                const active = isActiveLink(item.href);
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`text-2xl font-extrabold transition-colors ${getMobileLinkClass(active)}`}
                  >
                    {item.label}
                  </a>
                );
              }
              // dropdown — accordion in mobile
              const active = isActiveDropdown(item);
              return (
                <div
                  key={item.label}
                  className="flex flex-col items-center gap-4"
                >
                  <button
                    type="button"
                    onClick={() => setMobileDropdownOpen((o) => !o)}
                    aria-expanded={mobileDropdownOpen}
                    className={`cursor-pointer inline-flex items-center gap-2 text-2xl font-extrabold transition-colors ${getMobileLinkClass(active)}`}
                  >
                    {item.label}
                    <ChevronDown
                      size={20}
                      strokeWidth={2.5}
                      className={`transition-transform duration-200 ${
                        mobileDropdownOpen ? "rotate-180" : ""
                      }`}
                      aria-hidden={true}
                    />
                  </button>
                  {mobileDropdownOpen && (
                    <div className="flex flex-col items-center gap-3">
                      {item.items.map((sub) => {
                        const subActive = pathname === sub.href;
                        return (
                          <a
                            key={sub.href}
                            href={sub.href}
                            onClick={() => setMobileOpen(false)}
                            className={`text-lg font-bold transition-colors ${
                              subActive
                                ? "text-[#0d4f4f]"
                                : "text-[#555] hover:text-[#0d4f4f]"
                            }`}
                          >
                            {sub.label}
                          </a>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
            {isBookingPage ? (
              <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#0d4f4f] px-8 py-3.5 text-lg font-bold text-white">
                <Check size={20} strokeWidth={3} aria-hidden={true} />
                Termin buchen
              </span>
            ) : (
              <a
                href="/buchen"
                onClick={() => setMobileOpen(false)}
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#e8654a] to-[#f2a93b] px-8 py-3.5 text-lg font-bold text-white shadow-lg shadow-[#e8654a]/25"
              >
                <Calendar size={20} strokeWidth={2.5} aria-hidden={true} />
                Termin buchen
              </a>
            )}
          </div>
        </div>
      )}
    </>
  );
}
