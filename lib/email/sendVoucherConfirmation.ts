import { resend, EMAIL_FROM } from "./resend";
import type { SanityVoucher } from "@/sanity/lib/queries";
import { formatExpiry } from "@/lib/voucher/expiry";
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

function valueDescription(
  voucher: Pick<SanityVoucher, "productType" | "sessionsTotal" | "durationMin" | "customAmount">,
): string {
  if (voucher.productType === "voucher_custom") {
    return `EUR ${voucher.customAmount ?? "—"}`;
  }
  return `${voucher.sessionsTotal} x ${voucher.durationMin}-Minuten-Behandlung`;
}

export async function sendVoucherConfirmation(args: {
  voucher: Pick<
    SanityVoucher,
    "code" | "productType" | "sessionsTotal" | "durationMin" | "customAmount" | "buyerEmail" | "buyerName" | "recipientName" | "expiresAt"
  >;
  pdfBuffer: Buffer;
}): Promise<void> {
  const { voucher, pdfBuffer } = args;

  const product = PRODUCT_LABELS[voucher.productType] ?? voucher.productType;
  const greeting = voucher.buyerName ? `Hallo ${escapeHtml(voucher.buyerName)},` : "Hallo,";
  const recipientLine = voucher.recipientName
    ? `<p>Der Gutschein ist personalisiert für: <strong>${escapeHtml(voucher.recipientName)}</strong>.</p>`
    : "";
  const valueText = valueDescription(voucher);

  const html = `
<!DOCTYPE html>
<html lang="de">
  <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 2rem; color: #111;">
    <p>${greeting}</p>
    <p>vielen Dank für Ihren Kauf! Ihr Gutschein ist bereit.</p>
    <table style="width:100%; border-collapse: collapse; margin: 1.5rem 0; background: #f0f7f7; border-radius: 12px;">
      <tr><td style="padding: 0.75rem;">Produkt:</td><td style="padding: 0.75rem;"><strong>${product}</strong></td></tr>
      <tr><td style="padding: 0.75rem;">Wert:</td><td style="padding: 0.75rem;"><strong>${valueText}</strong></td></tr>
      <tr><td style="padding: 0.75rem;">Code:</td><td style="padding: 0.75rem; font-family: monospace; font-size: 1.2rem;"><strong>${voucher.code}</strong></td></tr>
      <tr><td style="padding: 0.75rem;">Gültig bis:</td><td style="padding: 0.75rem;">${formatExpiry(voucher.expiresAt)}</td></tr>
    </table>
    ${recipientLine}
    <p>Den Gutschein finden Sie als <strong>PDF im Anhang</strong> dieser E-Mail. Beim Termin reicht es, wenn Sie den Code nennen oder das PDF zeigen.</p>
    <p>Termin online buchen: <a href="https://heilmasseur-domenic.at/buchen">heilmasseur-domenic.at/buchen</a></p>
    <p style="margin-top: 2rem; color: #666; font-size: 0.875rem;">Bei Fragen einfach auf diese E-Mail antworten.</p>
    <p style="color: #666; font-size: 0.875rem;">Viele Grüße<br>Domenic Hacker<br><a href="https://heilmasseur-domenic.at">heilmasseur-domenic.at</a></p>
  </body>
</html>`;

  const result = await resend.emails.send({
    from: EMAIL_FROM,
    to: voucher.buyerEmail,
    subject: `Ihr Gutschein bei Heilmasseur Domenic Hacker — Code ${voucher.code}`,
    html,
    attachments: [
      {
        filename: `gutschein-${voucher.code}.pdf`,
        content: pdfBuffer,
      },
    ],
  });
  if (result.error) {
    throw new Error(`Resend send failed: ${result.error.message ?? JSON.stringify(result.error)}`);
  }
}
