# Plan 4: Navbar-Dropdown — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Erweitere die `Navbar` um ein Dropdown-Menü „Leistungen" (Heilmassage + Sportmassage) und füge `Preise` und `Gutscheine` als Top-Level-Items hinzu. Mobile-Akkordeon-Verhalten parallel.

**Architecture:** Bestehender `Navbar.tsx`-Komponente wird erweitert: `navLinks`-Array (3 Einträge) wird durch typisiertes `navItems`-Array ersetzt mit zwei Varianten (`link` und `dropdown`). Render-Logik verzweigt nach `kind`. Desktop: Hover öffnet Dropdown mit 200ms-Delay; Mobile: Klick toggelt Akkordeon. Click-outside und ESC schließen das Dropdown.

**Tech Stack:** Next.js 16 App Router, React 19 Hooks (`useState`, `useEffect`, `useRef`), Tailwind v4, lucide-react `ChevronDown`. Existierende `motion-safe:` und `aria-*` Patterns aus Plans 1-3.

**Spec reference:** `docs/superpowers/specs/2026-05-07-phase1-design.md` §7. Plan 1 entry on this same feature was deferred — this plan delivers it.

---

## File Structure

```
components/
  Navbar.tsx                  MODIFY — replace navLinks with navItems (link/dropdown union),
                                       add Leistungen dropdown UI, accordion on mobile
```

Single-file change. No new files.

---

## Task 1: Refactor Navbar to typed navItems with dropdown

**Files:**
- Modify: `components/Navbar.tsx`

The existing component is `"use client"`, uses `useState` for `scrolled` and `mobileOpen`. Add: dropdown-open state, dropdown ref for click-outside, ESC handler, hover-leave-timeout for graceful submenu transition.

### Required structure of `navItems`

```ts
type NavLink = { kind: "link"; label: string; href: string };
type NavDropdown = { kind: "dropdown"; label: string; items: { label: string; href: string }[] };
type NavItem = NavLink | NavDropdown;

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
```

### Required behaviors

**Desktop (`md:` and up):**
- "Leistungen" rendered as `<button type="button">` (NOT `<a>`) — pure toggle, no href
- Hover over button OR submenu opens dropdown immediately
- Mouse-leave starts a 200ms timeout to close (allows mouse to travel to submenu without race)
- Mouse-enter on button OR submenu cancels the close timeout
- Click toggles open/close (keyboard accessibility)
- Submenu positioned absolute below button, with same teal-on-scroll styling
- Active state highlights button when `pathname` matches any sub-item href
- ARIA: `aria-haspopup="menu"`, `aria-expanded={open}`, submenu has `role="menu"`, items have `role="menuitem"`
- Click-outside closes (use `useRef` + `useEffect` with mousedown listener)
- ESC key closes
- Auto-close when navigating (pathname change)
- ChevronDown icon next to "Leistungen" label, rotates 180° when open via CSS transition

**Mobile (below `md:`):**
- Hamburger overlay already exists — extend it
- "Leistungen" item rendered as button-styled label with rotating ChevronDown
- Click toggles inline accordion: sub-items shown indented below "Leistungen" label
- Tapping a sub-item navigates AND closes the entire mobile menu (existing pattern)

### Visual styling

Match existing styling from `Navbar.tsx`:
- Hover scrolled: `text-[#0d4f4f] hover:bg-[#0d4f4f]/8`
- Hover not scrolled: `text-white/90 hover:bg-white/15`
- Active state same as link's active state
- Submenu container: `bg-white/95 backdrop-blur-md shadow-lg shadow-black/10 rounded-2xl` (when scrolled OR overlay)
- Submenu items: `text-[#333] hover:bg-[#0d4f4f]/8 hover:text-[#0d4f4f]`
- 200ms transitions on chevron rotation

### Steps

- [ ] **Step 1.1: Read current `components/Navbar.tsx`** to confirm scrolled/mobileOpen state and existing class patterns.

- [ ] **Step 1.2: Replace the `navLinks` array** with the typed `navItems` array and types per above.

- [ ] **Step 1.3: Add new state hooks** at the top of the component (alongside `scrolled` and `mobileOpen`):
```ts
  const [desktopDropdownOpen, setDesktopDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
```

- [ ] **Step 1.4: Add click-outside + ESC + pathname-change effects** (use `usePathname` already imported):
```ts
  useEffect(() => {
    if (!desktopDropdownOpen) return;
    function onMouseDown(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
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

  useEffect(() => {
    setDesktopDropdownOpen(false);
    setMobileDropdownOpen(false);
  }, [pathname]);
```

- [ ] **Step 1.5: Add hover handlers**:
```ts
  function openDropdown() {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setDesktopDropdownOpen(true);
  }
  function scheduleCloseDropdown() {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = setTimeout(() => setDesktopDropdownOpen(false), 200);
  }
```

- [ ] **Step 1.6: Update Desktop links rendering** — branch by `item.kind`:
  - `link`: existing pattern (anchor with `getLinkClass`)
  - `dropdown`: render the toggle button with `<ChevronDown>` icon (rotated when open), submenu absolute-positioned below

- [ ] **Step 1.7: Update Mobile menu rendering** — branch by `item.kind`:
  - `link`: existing pattern
  - `dropdown`: button with chevron, accordion-expanded sub-items below

- [ ] **Step 1.8: Add `ChevronDown` import** at the top:
```ts
import { Menu, X, Check, ChevronDown } from "lucide-react";
```

- [ ] **Step 1.9: TypeScript + Build**

```
npx tsc --noEmit
npm run build
```

Both expect 0 errors.

- [ ] **Step 1.10: Visual smoke-test** in `npm run dev`:
  - Desktop: hover "Leistungen" → submenu opens with Heilmassage + Sportmassage; click submenu item → navigates + closes
  - Desktop: click button (no hover) → toggles open/close
  - Desktop: hover-leave button → 200ms grace before close (move mouse to submenu in <200ms keeps open)
  - Desktop: click outside → closes
  - Desktop: ESC → closes
  - Desktop: scrolled vs not-scrolled → correct color (white when transparent, dark teal when scrolled white bg)
  - Active state on Leistungen when on /heilmassage-wien-1080 or /sportmassage-wien
  - Mobile: hamburger opens overlay; tap "Leistungen" toggles accordion; tap sub-item navigates + closes overlay
  - Tab/keyboard: button has focus-ring, Enter toggles, Tab moves to next item

- [ ] **Step 1.11: Commit**

```
git add components/Navbar.tsx
git commit -m "feat(navbar): add Leistungen dropdown + Preise/Gutscheine top-level items"
```

---

## Task 2: Final Smoke-Test

- [ ] **Step 2.1: Production-Build** — `npm run build`, 0 errors.

- [ ] **Step 2.2: Walkthrough all routes** to verify Navbar consistency:
  - `/` — Navbar transparent over hero, "Leistungen" dropdown works
  - `/heilmassage-wien-1080` — Navbar shows over teal hero, "Leistungen" highlighted as active
  - `/sportmassage-wien` — same, "Leistungen" active
  - `/preise` — Breadcrumbs visible, "Preise" highlighted in Navbar
  - `/gutscheine` — "Gutscheine" highlighted in Navbar
  - `/ueber-mich` — "Über mich" highlighted

- [ ] **Step 2.3: Phase 1 complete** — all 4 plans merged.

---

## Risks & Mitigation

| Risk | Mitigation |
|---|---|
| Click-outside fires during dropdown open animation | `useRef` listener only attaches when `desktopDropdownOpen=true`, deactivates on close |
| Submenu mouse-leave race | 200ms grace timeout, cancelled on re-enter |
| ESC key handler conflicts with mobile menu close | Separate state hooks; ESC only triggers desktop dropdown close |
| Active state on "Leistungen" requires checking sub-item paths | Use `items.some(i => pathname === i.href)` for active detection |

## Self-Review

- Spec §7.1 (Struktur) → Task 1.2 ✓
- Spec §7.2 (Komponenten-Anpassung) → Task 1.2-1.7 ✓
- Spec §7.3 (UX) → Tasks 1.4-1.5 (click-outside, ESC, hover delay) ✓
- Spec §7.4 (Footer "Angebot") → already done in Plan 1 (no action needed for Plan 4)

No spec gaps remaining for Plan 4. After this Plan 1-4 are complete = Phase 1 done.
