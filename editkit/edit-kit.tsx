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

    // Both first-party portals can open the same persistent sandbox.
    const allowedPortalOrigins = new Set([
      "https://pixelheld.at", "https://preview.pixelheld.at",
      ...(portalOrigin ? [portalOrigin] : []),
    ]);
    let connectedOrigin: string | null = null;

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

    const originalCursor = document.body.style.cursor;
    let mode = "select";
    document.body.style.cursor = "crosshair";

    function reportPageContext(requestId?: string) {
      const visible = (el: Element) => { const r = el.getBoundingClientRect(); return r.width > 0 && r.height > 0 && r.bottom > 0 && r.top < innerHeight && r.right > 0 && r.left < innerWidth && getComputedStyle(el).visibility !== "hidden"; };
      const headings = Array.from(document.querySelectorAll("h1,h2,h3")).filter(visible).slice(0, 8);
      const center = document.elementFromPoint(innerWidth / 2, innerHeight / 2);
      const section = center?.closest("section, article") ?? headings[0]?.closest("section, article, main, header, footer") ?? center?.closest("main, header, footer");
      post("page-context", { requestId, page: {
        path: location.pathname,
        title: document.title.slice(0, 200),
        viewport: { width: innerWidth, height: innerHeight }, scrollY: window.scrollY,
        section: section ? { id: section.getAttribute("data-edit-id") ?? section.id, heading: (section.querySelector("h1,h2,h3")?.textContent ?? "").trim().slice(0, 200) } : undefined,
        visibleHeadings: headings.map(el => (el.textContent ?? "").trim().slice(0, 200)),
      } });
    }

    function reportLocation() {
      if (!portalOrigin) return;
      const url = new URL(window.location.href);
      url.searchParams.delete("pm_token");
      url.searchParams.delete("v");
      window.parent.postMessage({ source: messageSource, type: "location-changed",
        payload: { path: url.pathname + url.search + url.hash } }, portalOrigin);
    }
    let lastLocation = window.location.href;
    const locationTimer = window.setInterval(() => {
      if (lastLocation === window.location.href) return;
      lastLocation = window.location.href;
      saving = false;
      cancelText();
      selectedEl = null;
      refreshSelection();
      reportLocation();
    }, 200);
    let selectedEl: Element | null = null;
    let editing: { element: HTMLElement; previousText: string; editId: string; editable: string | null; cursor: string } | null = null;
    let textLocked = false;
    let saving = false;

    function post(type: string, payload?: unknown) {
      if (portalOrigin) window.parent.postMessage({ source: messageSource, type, payload }, portalOrigin);
    }
    function editableText(el: Element): el is HTMLElement {
      const id = el.getAttribute("data-edit-id");
      return el instanceof HTMLElement && /^(H[1-6]|P|BUTTON|A|SPAN|LABEL|LI)$/.test(el.tagName) &&
        !!id && /^[a-zA-Z0-9_.:-]{1,120}$/.test(id) && el.children.length === 0 &&
        !el.isContentEditable && (el.textContent?.length ?? 0) <= 5000 &&
        Array.from(document.querySelectorAll("[data-edit-id]")).filter(node => node.getAttribute("data-edit-id") === id).length === 1;
    }
    function restoreEditable() {
      if (!editing) return;
      editing.element.style.cursor = editing.cursor;
      if (editing.editable === null) editing.element.removeAttribute("contenteditable");
      else editing.element.setAttribute("contenteditable", editing.editable);
    }
    function cancelText() {
      if (!editing || saving) return;
      editing.element.textContent = editing.previousText;
      restoreEditable();
      editing = null;
      post("text-edit-ended");
      refreshSelection();
    }
    function startText(el: Element | null) {
      if (textLocked || saving || editing || !el || !editableText(el)) return;
      editing = { element: el, previousText: el.textContent ?? "", editId: el.getAttribute("data-edit-id")!, editable: el.getAttribute("contenteditable"), cursor: el.style.cursor };
      el.style.cursor = "text";
      el.setAttribute("contenteditable", "plaintext-only");
      selectedEl = el;
      hover.style.display = "none";
      label.textContent = "Text bearbeiten";
      el.focus();
      const range = document.createRange();
      range.selectNodeContents(el);
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(range);
      post("text-edit-started", { editId: editing.editId });
      refreshSelection();
    }
    function submitText() {
      if (!editing || saving) return;
      const text = (editing.element.textContent ?? "").replace(/\s+/g, " ").trim();
      if (text === editing.previousText.replace(/\s+/g, " ").trim()) { cancelText(); return; }
      if (!text || text.length > 5000) { post("text-edit-error", { message: "Bitte einen Text mit 1 bis 5.000 Zeichen eingeben." }); return; }
      saving = true;
      editing.element.setAttribute("contenteditable", "false");
      post("text-edit-submit", { editId: editing.editId, previousText: editing.previousText, text });
    }
    function onDoubleClick(event: MouseEvent) {
      if (mode !== "select" || editing) return;
      const el = targetFor(event);
      if (!el || !editableText(el)) return;
      event.preventDefault();
      event.stopPropagation();
      startText(el);
    }
    function onKeyDown(event: KeyboardEvent) {
      if (!editing || event.isComposing) return;
      if (event.key === "Escape" || event.key === "Enter") {
        event.preventDefault();
        event.stopPropagation();
        if (event.key === "Escape") cancelText();
        else if (!event.isComposing) submitText();
      }
    }
    function onPaste(event: ClipboardEvent) {
      if (!editing || saving || !editing.element.contains(event.target as Node)) return;
      event.preventDefault();
      const text = event.clipboardData?.getData("text/plain").replace(/\s+/g, " ") ?? "";
      // insertText preserves the browser's native undo history and inserts no HTML.
      document.execCommand("insertText", false, text);
    }
    function onBeforeUnload(event: BeforeUnloadEvent) {
      if (!editing) return;
      event.preventDefault();
      event.returnValue = "";
    }

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
      if (mode !== "select") return;
      const el = targetFor(event);
      if (!el) return void (hover.style.display = "none");
      place(hover, el.getBoundingClientRect());
    }

    function onClick(event: MouseEvent) {
      if (mode !== "select") return;
      if (editing) {
        if (editing.element.contains(event.target as Node) && !saving) {
          if (editing.element.matches("a, button")) event.preventDefault();
          event.stopPropagation(); return;
        }
        event.preventDefault(); event.stopPropagation(); return;
      }
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
              directText: editableText(el),
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
      if (event.source !== window.parent) return;
      if (!allowedPortalOrigins.has(event.origin)) return;
      if (connectedOrigin && event.origin !== connectedOrigin) return;
      const data = event.data;
      if (!["pixelheld-editor", "pixelmeister-editor"].includes(data?.source)) return;
      if (data.type === "init") {
        connectedOrigin = event.origin;
        portalOrigin = event.origin;
        messageSource = data.source === "pixelheld-editor" ? "pixelheld-editkit" : "pixelmeister-editkit";
        window.parent.postMessage({ source: messageSource, type: "capabilities", payload: { navigation: true, directText: true } }, portalOrigin);
        reportLocation();
      } else if (data.type === "get-page-context") {
        reportPageContext(data.payload?.requestId);
      } else if (data.type === "set-text-locked") {
        textLocked = data.payload?.locked === true;
      } else if (data.type === "edit-text") {
        startText(selectedEl);
      } else if (data.type === "save-text") {
        submitText();
      } else if (data.type === "cancel-text") {
        cancelText();
      } else if (data.type === "text-save-result" && editing) {
        saving = false;
        if (data.payload?.ok) {
          restoreEditable(); editing = null; post("text-edit-ended");
        } else {
          editing.element.setAttribute("contenteditable", "plaintext-only");
          editing.element.focus();
          post("text-edit-error", { message: data.payload?.message ?? "Text konnte nicht gespeichert werden." });
        }
      } else if (data.type === "set-mode" && ["select", "navigate"].includes(data.payload?.mode)) {
        mode = data.payload.mode;
        selectedEl = null;
        hover.style.display = "none";
        document.body.style.cursor = mode === "select" ? "crosshair" : originalCursor;
        refreshSelection();
      } else if (data.type === "clear-selection") {
        selectedEl = null;
        refreshSelection();
      }
    }

    function onScrollResize() {
      refreshSelection();
      hover.style.display = "none";
    }

    document.addEventListener("input", refreshSelection, true);
    document.addEventListener("dblclick", onDoubleClick, true);
    document.addEventListener("keydown", onKeyDown, true);
    document.addEventListener("paste", onPaste, true);
    window.addEventListener("beforeunload", onBeforeUnload);
    document.addEventListener("mousemove", onMove, true);
    document.addEventListener("click", onClick, true);
    window.addEventListener("message", onPortalMessage);
    window.addEventListener("scroll", onScrollResize, true);
    window.addEventListener("resize", onScrollResize);

    // Inhaltsloser Ready-Ping → der Editor antwortet mit "init" (Handshake).
    window.parent.postMessage({ source: messageSource, type: "ready" }, "*");

    return () => {
      saving = false;
      cancelText();
      document.removeEventListener("input", refreshSelection, true);
      document.removeEventListener("dblclick", onDoubleClick, true);
      document.removeEventListener("keydown", onKeyDown, true);
      document.removeEventListener("paste", onPaste, true);
      window.removeEventListener("beforeunload", onBeforeUnload);
      document.removeEventListener("mousemove", onMove, true);
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("message", onPortalMessage);
      window.removeEventListener("scroll", onScrollResize, true);
      window.removeEventListener("resize", onScrollResize);
      hover.remove();
      selectionBox.remove();
      label.remove();
      window.clearInterval(locationTimer);
      document.body.style.cursor = originalCursor;
    };
  }, []);

  return null;
}
