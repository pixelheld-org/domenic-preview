const VALIDITY_YEARS = 3;

export function expiryFromNow(): Date {
  const now = new Date();
  return new Date(
    Date.UTC(now.getUTCFullYear() + VALIDITY_YEARS, now.getUTCMonth(), now.getUTCDate())
  );
}

export function formatExpiry(d: Date | string): string {
  const date = typeof d === "string" ? new Date(d) : d;
  return date.toLocaleDateString("de-AT", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "Europe/Vienna",
  });
}
