"use client";
import { useEffect } from "react";
export function PreviewSafety() {
  useEffect(() => {
    const stopExternal = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest("a");
      if (!link) return;
      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin) { event.preventDefault(); event.stopImmediatePropagation(); }
    };
    const stopSubmit = (event: Event) => { event.preventDefault(); event.stopImmediatePropagation(); };
    document.addEventListener("click", stopExternal, true);
    document.addEventListener("submit", stopSubmit, true);
    return () => { document.removeEventListener("click", stopExternal, true); document.removeEventListener("submit", stopSubmit, true); };
  }, []);
  return <div data-pixelheld-preview className="fixed bottom-3 left-1/2 z-[2147483640] w-max max-w-[95vw] -translate-x-1/2 rounded-full bg-amber-100 px-5 py-2 text-center text-xs font-semibold text-amber-950 shadow-lg">Domenic · Testvorschau · Keine echten Buchungen oder Zahlungen</div>;
}
