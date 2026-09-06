import { resend, EMAIL_FROM } from "./resend";
import type { SanityVoucher } from "@/sanity/lib/queries";
import { escapeHtml } from "./escapeHtml";

const PRODUCT_LABELS: Record<string, string> = {
  block_5_30: "5er-Block 30 Min",
  block_5_45: "5er-Block 45 Min",
  block_5_60: "5er-Block 60 Min",
  block_10_30: "10er-Block 30 Min",
  block_10_45: "10er-Block 45 Min",
  block_10_60: "10er-Block 60 Min",
  voucher_custom: "Einzelgutschein",
};

export async function sendDomenicNotification(args: {
  voucher: Pick<
    SanityVoucher,
    "code" | "productType" | "sessionsTotal" | "durationMin" | "customAmount" | "buyerEmail" | "buyerName" | "recipientName" | "status"
  >;
  domenicEmail: string;
  isAlert?: boolean;
}): Promise<void> {
  const { voucher, domenicEmail, isAlert = false } = args;

  const product = PRODUCT_LABELS[voucher.productType] ?? voucher.productType;
  const valueText =
    voucher.productType === "voucher_custom"
      ? `EUR ${voucher.customAmount}`
      : `${voucher.sessionsTotal} x ${voucher.durationMin} Min`;

  const subject = isAlert
    ? `Gutschein ${voucher.code} — manuelles Eingreifen nötig`
    : `Neuer Gutschein verkauft: ${voucher.code}`;

  const alertNote = isAlert
    ? `<p style="background: #fef3c7; padding: 1rem; border-left: 4px solid #f59e0b;"><strong>Status:</strong> ${voucher.status} — bitte im Studio prüfen und ggf. PDF/Mail manuell nachsenden.</p>`
    : "";

  const html = `
<!DOCTYPE html>
<html lang="de">
  <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 2rem; color: #111;">
    <h2 style="color: #0d4f4f;">${isAlert ? "Gutschein-Alert" : "Neuer Gutschein verkauft"}</h2>
    ${alertNote}
    <table style="width:100%; border-collapse: collapse; margin: 1rem 0;">
      <tr><td style="padding: 0.5rem; color: #666;">Code:</td><td style="padding: 0.5rem; font-family: monospace;"><strong>${voucher.code}</strong></td></tr>
      <tr><td style="padding: 0.5rem; color: #666;">Produkt:</td><td style="padding: 0.5rem;">${product}</td></tr>
      <tr><td style="padding: 0.5rem; color: #666;">Wert:</td><td style="padding: 0.5rem;">${valueText}</td></tr>
      <tr><td style="padding: 0.5rem; color: #666;">Käufer:</td><td style="padding: 0.5rem;">${escapeHtml(voucher.buyerName) || "—"}</td></tr>
      <tr><td style="padding: 0.5rem; color: #666;">E-Mail:</td><td style="padding: 0.5rem;">${escapeHtml(voucher.buyerEmail)}</td></tr>
      ${voucher.recipientName ? `<tr><td style="padding: 0.5rem; color: #666;">Beschenkte:r:</td><td style="padding: 0.5rem;">${escapeHtml(voucher.recipientName)}</td></tr>` : ""}
    </table>
    <p>Im Studio einsehen: <a href="https://heilmasseur-domenic.at/studio">heilmasseur-domenic.at/studio</a> → Gutscheine</p>
  </body>
</html>`;

  const result = await resend.emails.send({
    from: EMAIL_FROM,
    to: domenicEmail,
    subject,
    html,
  });
  if (result.error) {
    throw new Error(`Resend send failed: ${result.error.message ?? JSON.stringify(result.error)}`);
  }
}
