// editkit/edit-kit.tsx — pixelheld EditKit
// Aktiv nur im Editier-Modus (in der Vercel Sandbox). Liefert Hover- und
// Auswahl-Highlight und meldet das angeklickte Element an den Portal-Editor.
"use client";

import { useEffect } from "react";

function cssPath(element: Element): string {
  const parts: string[] = [];
  let current: Element | null = element;
  while (current && current.tagName !== "HTML" && parts.length < 8) {
    const tag = current.tagName.toLowerCase();
    const parent: Element | null = current.parentElement;
    if (!parent) break;
    const siblings = Array.from(parent.children).filter((c) => c.tagName === current!.tagName);
    parts.unshift(siblings.length > 1 ? `${tag}:nth-of-type(${siblings.indexOf(current) + 1})` : tag);
    current = parent;
  }
  return parts.join(" > ");
}

export function EditKit() {
  useEffect(() => {
    if ((process.env.NEXT_PUBLIC_PIXELHELD_EDIT_MODE ?? process.env.NEXT_PUBLIC_PIXELMEISTER_EDIT_MODE) !== "1") return;

    // Portal-Origin per Handshake bestimmen (robust gegen localhost vs.
    // 127.0.0.1 vs. Preview-URL): Der Editor schickt nach dem Laden eine
    // "init"-Nachricht; deren origin merken wir uns als Ziel aller künftigen
    // postMessages. Fallback auf die Env-Variable, falls (noch) kein Handshake.
    let portalOrigin: string | null =
      (process.env.NEXT_PUBLIC_PIXELHELD_PORTAL_ORIGIN ?? process.env.NEXT_PUBLIC_PIXELMEISTER_PORTAL_ORIGIN) ?? null;

    let messageSource = process.env.NEXT_PUBLIC_PIXELHELD_EDIT_MODE === "1"
      ? "pixelheld-editkit" : "pixelmeister-editkit";

    const hover = document.createElement("div");
    hover.style.cssText =
      "position:fixed;pointer-events:none;border:2px dashed #6366f1;border-radius:6px;z-index:2147483646;transition:all .06s ease;display:none;box-sizing:border-box";
    document.body.appendChild(hover);

    const selectionBox = document.createElement("div");
    selectionBox.style.cssText =
      "position:fixed;pointer-events:none;border:2px solid #6366f1;border-radius:6px;z-index:2147483647;display:none;box-sizing:border-box;box-shadow:0 0 0 9999px rgba(99,102,241,0.07)";
    document.body.appendChild(selectionBox);

    const label = document.createElement("div");
    label.style.cssText =
      "position:fixed;pointer-events:none;z-index:2147483647;background:#6366f1;color:#fff;font:600 11px/1.4 system-ui,sans-serif;padding:2px 8px;border-radius:6px;display:none;white-space:nowrap;transform:translateY(-100%)";
    document.body.appendChild(label);

    document.body.style.cursor = "crosshair";
    let selectedEl: Element | null = null;

    function targetFor(event: MouseEvent): Element | null {
      const el = event.target as Element | null;
      if (!el || el === document.body || el === document.documentElement) return null;
      return el;
    }

    function place(box: HTMLElement, rect: DOMRect) {
      box.style.display = "block";
      box.style.top = `${rect.top - 2}px`;
      box.style.left = `${rect.left - 2}px`;
      box.style.width = `${rect.width}px`;
      box.style.height = `${rect.height}px`;
    }

    function refreshSelection() {
      if (!selectedEl || !selectedEl.isConnected) {
        selectionBox.style.display = "none";
        label.style.display = "none";
        return;
      }
      const rect = selectedEl.getBoundingClientRect();
      place(selectionBox, rect);
      label.style.display = "block";
      label.style.top = `${rect.top - 4}px`;
      label.style.left = `${rect.left - 2}px`;
    }

    function onMove(event: MouseEvent) {
      const el = targetFor(event);
      if (!el) return void (hover.style.display = "none");
      place(hover, el.getBoundingClientRect());
    }

    function onClick(event: MouseEvent) {
      const el = targetFor(event);
      if (!el) return;
      event.preventDefault();
      event.stopPropagation();
      selectedEl = el;
      const editId = el.getAttribute("data-edit-id");
      label.textContent = editId ?? el.tagName.toLowerCase();
      refreshSelection();
      hover.style.display = "none";
      if (portalOrigin) {
        window.parent.postMessage(
          {
            source: messageSource,
            type: "element-selected",
            payload: {
              domPath: cssPath(el),
              editId,
              text: (el.textContent ?? "").slice(0, 500),
              outerHtml: el.outerHTML.slice(0, 2000),
            },
          },
          portalOrigin,
        );
      }
    }

    function onPortalMessage(event: MessageEvent) {
      const data = event.data;
      if (!["pixelheld-editor", "pixelmeister-editor"].includes(data?.source)) return;
      if (data.type === "init") {
        portalOrigin = event.origin;
        messageSource = data.source === "pixelheld-editor" ? "pixelheld-editkit" : "pixelmeister-editkit";
      } else if (data.type === "clear-selection") {
        selectedEl = null;
        refreshSelection();
      }
    }

    function onScrollResize() {
      refreshSelection();
      hover.style.display = "none";
    }

    document.addEventListener("mousemove", onMove, true);
    document.addEventListener("click", onClick, true);
    window.addEventListener("message", onPortalMessage);
    window.addEventListener("scroll", onScrollResize, true);
    window.addEventListener("resize", onScrollResize);

    // Inhaltsloser Ready-Ping → der Editor antwortet mit "init" (Handshake).
    window.parent.postMessage({ source: messageSource, type: "ready" }, "*");

    return () => {
      document.removeEventListener("mousemove", onMove, true);
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("message", onPortalMessage);
      window.removeEventListener("scroll", onScrollResize, true);
      window.removeEventListener("resize", onScrollResize);
      hover.remove();
      selectionBox.remove();
      label.remove();
      document.body.style.cursor = "";
    };
  }, []);

  return null;
}
