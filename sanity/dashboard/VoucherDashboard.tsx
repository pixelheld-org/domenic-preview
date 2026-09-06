import { useEffect, useState } from "react";
import { useClient } from "sanity";
import type { UserComponent } from "sanity/structure";
import {
  BLOCK_PRICES_FALLBACK,
  type BlockProductKey,
} from "../../lib/blockOptions";

const REFRESH_INTERVAL_MS = 30_000;
const SOON_DAYS = 30;
const TIME_ZONE = "Europe/Vienna";

// Approximate per-session value for dashboard display only.
// Uses fallback prices; if Domenic adjusts prices in Sanity blockPricing,
// the dashboard's per-session estimate may lag until the next code deploy.
// Acceptable trade-off since this is an internal Studio view, not customer-facing.
const PRICE_PER_SESSION: Record<string, number> = (() => {
  const map: Record<string, number> = {};
  for (const [key, { price }] of Object.entries(BLOCK_PRICES_FALLBACK)) {
    const size = key.startsWith("block_5_") ? 5 : 10;
    map[key] = Math.round(price / size);
  }
  return map;
})();

type ActiveVoucher = {
  productType: BlockProductKey | "voucher_custom" | string;
  sessionsRemaining: number | null;
  customAmountRemaining: number | null;
  expiresAt: string | null;
};

type RedemptionEntry = {
  date?: string;
  sessionsRedeemed?: number;
  amountRedeemed?: number;
};

type DashboardQueryResult = {
  active: ActiveVoucher[];
  problemsCount: number;
  vouchersWithRedemptionsToday: Array<{ redemptions: RedemptionEntry[] }>;
};

type Stats = {
  redemptionsTodayCount: number;
  redemptionsTodayAmount: number;
  activeCount: number;
  circulatingEur: number;
  expiringSoonCount: number;
  problemsCount: number;
};

const QUERY = /* groq */ `{
  "active": *[_type == "voucher" && status in ["paid", "partially_redeemed"]] {
    productType,
    sessionsRemaining,
    customAmountRemaining,
    expiresAt
  },
  "problemsCount": count(*[_type == "voucher" && status in ["paid_pdf_failed", "paid_email_failed"]]),
  "vouchersWithRedemptionsToday": *[_type == "voucher" && defined(redemptions)] {
    "redemptions": redemptions[
      defined(date) &&
      dateTime(date) >= dateTime($startOfDayUtc) &&
      dateTime(date) < dateTime($endOfDayUtc)
    ]{ date, sessionsRedeemed, amountRedeemed }
  }[count(redemptions) > 0]
}`;

function getOffsetAt(date: Date, timeZone: string): string {
  const part = new Intl.DateTimeFormat("en-US", { timeZone, timeZoneName: "longOffset" })
    .formatToParts(date)
    .find((p) => p.type === "timeZoneName")?.value;
  if (!part || part === "GMT") return "+00:00";
  return part.replace("GMT", "");
}

function getQueryParams(now: Date) {
  const dateParts = new Intl.DateTimeFormat("en-CA", {
    timeZone: TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const y = dateParts.find((p) => p.type === "year")!.value;
  const m = dateParts.find((p) => p.type === "month")!.value;
  const d = dateParts.find((p) => p.type === "day")!.value;
  const offset = getOffsetAt(now, TIME_ZONE);
  const startLocal = new Date(`${y}-${m}-${d}T00:00:00${offset}`);
  return {
    startOfDayUtc: startLocal.toISOString(),
    endOfDayUtc: new Date(startLocal.getTime() + 24 * 60 * 60 * 1000).toISOString(),
    now: now.toISOString(),
    soonCutoff: new Date(now.getTime() + SOON_DAYS * 24 * 60 * 60 * 1000).toISOString(),
  };
}

function computeStats(data: DashboardQueryResult, params: ReturnType<typeof getQueryParams>): Stats {
  let redemptionsTodayCount = 0;
  let redemptionsTodayAmount = 0;
  for (const v of data.vouchersWithRedemptionsToday) {
    for (const r of v.redemptions) {
      redemptionsTodayCount += 1;
      if (typeof r.amountRedeemed === "number") {
        redemptionsTodayAmount += r.amountRedeemed;
      }
    }
  }

  let circulatingEur = 0;
  let expiringSoonCount = 0;
  const nowMs = Date.parse(params.now);
  const cutoffMs = Date.parse(params.soonCutoff);
  for (const v of data.active) {
    if (v.productType === "voucher_custom") {
      circulatingEur += v.customAmountRemaining ?? 0;
    } else {
      const perSession = PRICE_PER_SESSION[v.productType];
      if (perSession && typeof v.sessionsRemaining === "number") {
        circulatingEur += v.sessionsRemaining * perSession;
      }
    }
    if (v.expiresAt) {
      const exp = Date.parse(v.expiresAt);
      if (exp > nowMs && exp <= cutoffMs) expiringSoonCount += 1;
    }
  }

  return {
    redemptionsTodayCount,
    redemptionsTodayAmount,
    activeCount: data.active.length,
    circulatingEur: Math.round(circulatingEur),
    expiringSoonCount,
    problemsCount: data.problemsCount,
  };
}

const numberFmt = new Intl.NumberFormat("de-AT");
const formatEur = (n: number): string => `EUR ${numberFmt.format(n)}`;

const styles = {
  wrapper: {
    padding: "2rem",
    height: "100%",
    overflowY: "auto" as const,
    background: "var(--card-bg-color, #fff)",
    color: "var(--card-fg-color, #111)",
  },
  header: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    marginBottom: "1.5rem",
    flexWrap: "wrap" as const,
    gap: "0.5rem",
  },
  title: { margin: 0, fontSize: "1.5rem", fontWeight: 600 },
  meta: { fontSize: "0.85rem", opacity: 0.6 },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "1rem",
  },
  card: (tone: "neutral" | "warn" | "danger") => ({
    padding: "1.25rem",
    borderRadius: "0.5rem",
    border: `1px solid ${tone === "danger" ? "#dc2626" : tone === "warn" ? "#ea580c" : "rgba(127,127,127,0.25)"}`,
    background:
      tone === "danger"
        ? "rgba(220,38,38,0.08)"
        : tone === "warn"
        ? "rgba(234,88,12,0.08)"
        : "transparent",
    display: "flex",
    flexDirection: "column" as const,
    gap: "0.4rem",
  }),
  cardLabel: { fontSize: "0.8rem", opacity: 0.7, textTransform: "uppercase" as const, letterSpacing: "0.04em" },
  cardValue: { fontSize: "1.75rem", fontWeight: 700, lineHeight: 1.1 },
  cardSub: { fontSize: "0.85rem", opacity: 0.7 },
  message: { padding: "2rem", fontSize: "0.95rem" },
  error: { padding: "2rem", color: "#dc2626", fontSize: "0.95rem" },
};

export const VoucherDashboard: UserComponent = function VoucherDashboard() {
  const client = useClient({ apiVersion: "2024-01-01" });
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [updatedAt, setUpdatedAt] = useState<Date | null>(null);

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      try {
        const params = getQueryParams(new Date());
        const data = await client.fetch<DashboardQueryResult>(QUERY, params);
        if (cancelled) return;
        setStats(computeStats(data, params));
        setUpdatedAt(new Date());
        setError(null);
      } catch (err) {
        if (cancelled) return;
        console.error("VoucherDashboard fetch error", err);
        setError(err instanceof Error ? err.message : String(err));
      }
    };
    void run();
    const id = setInterval(run, REFRESH_INTERVAL_MS);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [client]);

  if (error && !stats) {
    return (
      <div style={styles.wrapper}>
        <p style={styles.error}>Fehler beim Laden: {error}</p>
      </div>
    );
  }

  if (!stats) {
    return (
      <div style={styles.wrapper}>
        <p style={styles.message}>Wird geladen...</p>
      </div>
    );
  }

  const expiringTone: "neutral" | "warn" = stats.expiringSoonCount > 0 ? "warn" : "neutral";
  const problemsTone: "neutral" | "danger" = stats.problemsCount > 0 ? "danger" : "neutral";

  return (
    <div style={styles.wrapper}>
      <div style={styles.header}>
        <h1 style={styles.title}>Gutschein-Übersicht</h1>
        <span style={styles.meta}>
          Aktualisiert: {updatedAt ? updatedAt.toLocaleTimeString("de-AT") : "—"} · alle 30 s
          {error ? ` · Letzter Fehler: ${error}` : ""}
        </span>
      </div>

      <div style={styles.grid}>
        <div style={styles.card("neutral")}>
          <span style={styles.cardLabel}>Heute eingelöst</span>
          <span style={styles.cardValue}>{numberFmt.format(stats.redemptionsTodayCount)}</span>
          <span style={styles.cardSub}>
            {stats.redemptionsTodayAmount > 0
              ? `davon ${formatEur(stats.redemptionsTodayAmount)} aus Custom-Gutscheinen`
              : "Behandlungen + Custom-Beträge zusammen"}
          </span>
        </div>

        <div style={styles.card("neutral")}>
          <span style={styles.cardLabel}>Aktive Gutscheine</span>
          <span style={styles.cardValue}>{numberFmt.format(stats.activeCount)}</span>
          <span style={styles.cardSub}>Status: bezahlt oder teilw. eingelöst</span>
        </div>

        <div style={styles.card("neutral")}>
          <span style={styles.cardLabel}>Im Umlauf</span>
          <span style={styles.cardValue}>{formatEur(stats.circulatingEur)}</span>
          <span style={styles.cardSub}>Restwert aktiver Gutscheine</span>
        </div>

        <div style={styles.card(expiringTone)}>
          <span style={styles.cardLabel}>Verfällt in &lt;30 Tagen</span>
          <span style={styles.cardValue}>{numberFmt.format(stats.expiringSoonCount)}</span>
          <span style={styles.cardSub}>
            {stats.expiringSoonCount > 0 ? "Aktiv & läuft bald ab" : "Keine kritischen Abläufe"}
          </span>
        </div>

        <div style={styles.card(problemsTone)}>
          <span style={styles.cardLabel}>Probleme</span>
          <span style={styles.cardValue}>{numberFmt.format(stats.problemsCount)}</span>
          <span style={styles.cardSub}>
            {stats.problemsCount > 0
              ? "PDF/Mail-Versand fehlgeschlagen — manuell prüfen"
              : "Alles OK"}
          </span>
        </div>
      </div>
    </div>
  );
};
