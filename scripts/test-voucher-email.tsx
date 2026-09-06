// Standalone smoketest — duplicates sendVoucherConfirmation logic without
// importing server-only-tagged modules so it runs under tsx.
import { renderToBuffer } from "@react-pdf/renderer";
import { Resend } from "resend";
import { VoucherPDF } from "../components/VoucherPDF";
import { formatExpiry } from "../lib/voucher/expiry";
import { escapeHtml } from "../lib/email/escapeHtml";

const TO = process.env.TEST_TO ?? "josef.haras@hamstr.me";
const KEY = process.env.RESEND_API_KEY;
const FROM = process.env.EMAIL_FROM ?? "onboarding@resend.dev";

if (!KEY) {
  console.error("RESEND_API_KEY missing");
  process.exit(1);
}

const PRODUCT_LABELS: Record<string, string> = {
  block_5_30: "5er-Block 30 Min",
  block_5_45: "5er-Block 45 Min",
  block_5_60: "5er-Block 60 Min",
  block_10_30: "10er-Block 30 Min",
  block_10_45: "10er-Block 45 Min",
  block_10_60: "10er-Block 60 Min",
  voucher_custom: "Einzelgutschein",
};

async function main() {
  const voucher = {
    code: "TEST-1234-5678",
    productType: "block_5_45" as const,
    sessionsTotal: 5,
    sessionsRemaining: 5,
    durationMin: 45,
    customAmount: null,
    buyerEmail: TO,
    buyerName: "Josef (Test)",
    recipientName: null,
    purchasedAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365 * 3).toISOString(),
  };

  console.log("Rendering PDF…");
  const pdfBuffer = await renderToBuffer(<VoucherPDF voucher={voucher} />);
  console.log(`PDF rendered: ${pdfBuffer.byteLength} bytes`);

  const product = PRODUCT_LABELS[voucher.productType] ?? voucher.productType;
  const valueText = `${voucher.sessionsTotal} x ${voucher.durationMin}-Minuten-Behandlung`;
  const html = `<!DOCTYPE html><html lang="de"><body style="font-family: -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 2rem; color: #111;"><p>Hallo ${escapeHtml(voucher.buyerName)},</p><p><strong>(SMOKETEST)</strong> dies ist eine Test-Mail vom Voucher-Flow.</p><table style="width:100%; border-collapse: collapse; margin: 1.5rem 0; background: #f0f7f7; border-radius: 12px;"><tr><td style="padding: 0.75rem;">Produkt:</td><td style="padding: 0.75rem;"><strong>${product}</strong></td></tr><tr><td style="padding: 0.75rem;">Wert:</td><td style="padding: 0.75rem;"><strong>${valueText}</strong></td></tr><tr><td style="padding: 0.75rem;">Code:</td><td style="padding: 0.75rem; font-family: monospace; font-size: 1.2rem;"><strong>${voucher.code}</strong></td></tr><tr><td style="padding: 0.75rem;">Gültig bis:</td><td style="padding: 0.75rem;">${formatExpiry(voucher.expiresAt)}</td></tr></table></body></html>`;

  console.log(`Sending to ${TO} from ${FROM}…`);
  const resend = new Resend(KEY);
  const result = await resend.emails.send({
    from: FROM,
    to: TO,
    subject: `[SMOKETEST] Voucher-Mail Test — Code ${voucher.code}`,
    html,
    attachments: [{ filename: `gutschein-${voucher.code}.pdf`, content: pdfBuffer }],
  });

  if (result.error) {
    console.error("❌ Resend error:", result.error);
    process.exit(1);
  }
  console.log("✅ Sent. id:", result.data?.id);
}

main().catch((err) => {
  console.error("❌ Test failed:", err);
  process.exit(1);
});
