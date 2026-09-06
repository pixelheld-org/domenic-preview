import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Mail, Download } from "lucide-react";
import { Footer } from "@/components/Footer";
import { getVoucherByStripeSession, getSettings } from "@/sanity/lib/queries";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Vielen Dank | Heilmasseur Domenic Hacker",
  robots: { index: false, follow: false },
};

async function sleep(ms: number) {
  await new Promise((r) => setTimeout(r, ms));
}

export default async function DankePage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const params = await searchParams;
  const sessionId = params.session_id;
  if (!sessionId) {
    redirect("/gutscheine");
  }

  const settings = await getSettings();

  // Polling: 1 immediate + up to 4 retries × 2s = max ~8s wait for webhook
  let voucher = await getVoucherByStripeSession(sessionId);
  for (let i = 0; i < 4 && !voucher; i++) {
    await sleep(2000);
    voucher = await getVoucherByStripeSession(sessionId);
  }

  return (
    <>
      <main>
        <section className="bg-white">
          <div className="mx-auto max-w-2xl px-5 sm:px-8 pt-28 pb-16 sm:pt-36 sm:pb-24 text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#e8654a]/10 px-4 py-1.5 text-sm font-bold text-[#e8654a]">
              ✓ Zahlung erfolgreich
            </span>
            <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold leading-tight text-[#111]">
              Vielen Dank!
            </h1>

            {voucher ? (
              <>
                <p className="mt-6 text-lg text-[#555] leading-relaxed">
                  Ihr Gutschein-Code:{" "}
                  <span className="font-mono text-[#0d4f4f] text-xl font-bold">{voucher.code}</span>
                </p>
                {voucher.pdfAsset?.asset?.url && (
                  <div className="mt-8">
                    <a
                      href={voucher.pdfAsset.asset.url}
                      download={`gutschein-${voucher.code}.pdf`}
                      className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#e8654a] to-[#f2a93b] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#e8654a]/25 transition-all motion-safe:hover:scale-105"
                    >
                      <Download size={18} aria-hidden={true} />
                      PDF herunterladen
                    </a>
                  </div>
                )}
                <div className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-[#f0f7f7] px-5 py-3 text-sm text-[#333]">
                  <Mail size={16} className="text-[#0d4f4f]" aria-hidden={true} />
                  Eine Bestätigungsmail mit dem PDF wurde an Ihre E-Mail-Adresse gesendet.
                </div>
              </>
            ) : (
              <>
                <p className="mt-6 text-lg text-[#555] leading-relaxed">
                  Ihre Zahlung war erfolgreich. Der Gutschein wird gerade erstellt und in den
                  nächsten Sekunden per E-Mail an Sie versendet.
                </p>
                <div className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-[#f0f7f7] px-5 py-3 text-sm text-[#333]">
                  <Mail size={16} className="text-[#0d4f4f]" aria-hidden={true} />
                  Falls Sie nach 5 Minuten keine E-Mail erhalten haben, melden Sie sich bei uns.
                </div>
              </>
            )}

            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/buchen"
                className="inline-flex items-center gap-2 rounded-full border-2 border-[#0d4f4f] px-6 py-3 text-sm font-bold text-[#0d4f4f] hover:bg-[#0d4f4f] hover:text-white transition-all"
              >
                Termin buchen
                <ArrowRight size={16} strokeWidth={2.5} aria-hidden={true} />
              </Link>
              <Link
                href="/"
                className="text-sm font-semibold text-[#666] hover:text-[#0d4f4f] transition-colors"
              >
                Zur Startseite
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer sanitySettings={settings} />
    </>
  );
}
