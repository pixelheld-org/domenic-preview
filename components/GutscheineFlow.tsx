"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  VoucherProductSelector,
  type SelectedProduct,
} from "@/components/VoucherProductSelector";
import {
  VoucherCheckout,
  type CheckoutFormInput,
} from "@/components/VoucherCheckout";
import { getBlockOption, type BlockProductKey } from "@/lib/blockOptions";
import type {
  SanityGutscheinePage,
  SanityBlockPricing,
} from "@/sanity/lib/queries";

function deriveInitialSelected(
  productPreset: string | null,
  pricing: SanityBlockPricing | null,
): SelectedProduct | null {
  if (!productPreset) return null;
  const blockMatch = /^block_(5|10)_(30|45|60)$/.exec(productPreset);
  if (blockMatch) {
    const size = Number(blockMatch[1]) as 5 | 10;
    const duration = Number(blockMatch[2]) as 30 | 45 | 60;
    const opt = getBlockOption(size, duration, pricing);
    return {
      productType: opt.productKey as BlockProductKey,
      kind: "block",
      price: opt.price,
      size,
      duration,
    };
  }
  return null;
}

function GutscheineContent({
  cms,
  pricing,
}: {
  cms: SanityGutscheinePage | null;
  pricing: SanityBlockPricing | null;
}) {
  const searchParams = useSearchParams();
  const productPreset = searchParams.get("product");

  const [selected, setSelected] = useState<SelectedProduct | null>(() =>
    deriveInitialSelected(productPreset, pricing),
  );
  const [customAmount, setCustomAmount] = useState<number>(50);
  const [buyerEmail, setBuyerEmail] = useState("");
  const [buyerName, setBuyerName] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [step, setStep] = useState<"select" | "details" | "pay">(() =>
    deriveInitialSelected(productPreset, pricing) ? "details" : "select",
  );

  // Bei Step-Wechsel zum Heading des neuen Steps scrollen (unter der
  // Navbar via scroll-margin-top am Element). Verhindert dass der User
  // im leeren Bereich landet, weil der nächste Step kürzer ist.
  useEffect(() => {
    if (step === "select") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const heading = document.getElementById(`step-${step}-heading`);
    heading?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [step]);

  const checkoutInput: CheckoutFormInput | null =
    selected && buyerEmail && buyerName
      ? {
          productType: selected.productType,
          customAmount:
            selected.kind === "custom"
              ? selected.customAmountEur * 100
              : undefined,
          buyerEmail,
          buyerName,
          recipientName: recipientName || undefined,
        }
      : null;

  return (
    <>
      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-5 sm:px-8 pt-28 pb-16 sm:pt-36 sm:pb-24">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#e8654a]/10 px-4 py-1.5 text-sm font-bold text-[#e8654a]">
            {cms?.heroBadge ?? "Geschenke, die wirklich gut tun"}
          </span>
          <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-[#111]">
            {cms?.heroHeading ?? "Massage-Gutscheine"}{" "}
            <span className="text-[#e8654a]">
              {cms?.heroHeadingAccent ?? "aus Wien 1080"}
            </span>
          </h1>
          <p className="mt-6 text-lg text-[#555] leading-relaxed max-w-2xl">
            {cms?.heroText ??
              "Gutscheine sind sofort als PDF verfügbar — drei Jahre gültig, einlösbar gegen jede Behandlung. Block-Karten geben extra Vorteil ab fünf Behandlungen."}
          </p>
        </div>
      </section>

      {step === "select" && (
        <section className="bg-[#f0f7f7] py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <VoucherProductSelector
              selected={selected}
              onSelect={(p) => {
                setSelected(p);
                setStep("details");
              }}
              customAmount={customAmount}
              onCustomAmountChange={setCustomAmount}
              cms={cms}
              pricing={pricing}
            />
          </div>
        </section>
      )}

      {step === "details" && selected && (
        <section className="bg-white py-16 sm:py-24">
          <div className="mx-auto max-w-2xl px-5 sm:px-8">
            <h2
              id="step-details-heading"
              className="scroll-mt-20 sm:scroll-mt-24 text-2xl sm:text-3xl font-extrabold text-[#0d4f4f] mb-2"
            >
              {cms?.detailsHeading ?? "Ihre Daten"}
            </h2>
            <p className="text-[#555] mb-8 leading-relaxed">
              {cms?.detailsText ??
                "Wir senden Ihnen den Gutschein als PDF an die angegebene E-Mail-Adresse."}
            </p>
            <div className="space-y-5">
              <label className="block">
                <span className="text-sm font-semibold text-[#333]">
                  Ihre E-Mail-Adresse *
                </span>
                <input
                  type="email"
                  required
                  value={buyerEmail}
                  onChange={(e) => setBuyerEmail(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0d4f4f]"
                  placeholder="ihre@email.at"
                />
              </label>
              <label className="block">
                <span className="text-sm font-semibold text-[#333]">
                  Ihr Name *
                </span>
                <input
                  type="text"
                  required
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0d4f4f]"
                  placeholder="Vor- und Zuname"
                />
              </label>
              <label className="block">
                <span className="text-sm font-semibold text-[#333]">
                  Beschenkter Name (optional)
                </span>
                <input
                  type="text"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0d4f4f]"
                  placeholder="z.B. Maria"
                />
                <p className="mt-1 text-xs text-[#666]">
                  {cms?.recipientHelpText ??
                    "Der Name erscheint auf dem PDF-Gutschein. Ohne Angabe ist der Gutschein neutral."}
                </p>
              </label>
            </div>
            <div className="mt-8 flex gap-4">
              <button
                type="button"
                onClick={() => {
                  setSelected(null);
                  setStep("select");
                }}
                className="cursor-pointer rounded-full border-2 border-[#0d4f4f] px-6 py-3 text-sm font-bold text-[#0d4f4f] hover:bg-[#0d4f4f] hover:text-white transition-all"
              >
                Zurück
              </button>
              <button
                type="button"
                disabled={
                  !buyerEmail ||
                  !buyerName ||
                  !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(buyerEmail)
                }
                onClick={() => setStep("pay")}
                className="cursor-pointer rounded-full bg-gradient-to-r from-[#e8654a] to-[#f2a93b] px-7 py-3 text-sm font-bold text-white shadow-lg shadow-[#e8654a]/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Weiter zur Zahlung
              </button>
            </div>
          </div>
        </section>
      )}

      {step === "pay" && checkoutInput && (
        <section className="bg-white py-16 sm:py-24">
          <div className="mx-auto max-w-2xl px-5 sm:px-8">
            <h2
              id="step-pay-heading"
              className="scroll-mt-20 sm:scroll-mt-24 text-2xl sm:text-3xl font-extrabold text-[#0d4f4f] mb-2"
            >
              {cms?.paymentHeading ?? "Zahlung"}
            </h2>
            <p className="text-[#555] mb-8 leading-relaxed">
              {cms?.paymentText ??
                "Sicher bezahlen via Stripe — Karten, Apple Pay, Google Pay, SEPA."}
            </p>
            <VoucherCheckout input={checkoutInput} />
            <p className="mt-6 text-xs text-[#666]">
              {cms?.agbNotice ?? (
                <>
                  Mit dem Klick auf Bezahlen bestätigen Sie unsere{" "}
                  <a href="/agb" className="font-semibold text-[#0d4f4f] hover:underline">
                    AGB
                  </a>{" "}
                  und das Widerrufsrecht. Hinweis: Bei digitalen Inhalten
                  (PDF-Gutschein) erlischt das Widerrufsrecht nach Lieferung des
                  PDFs an die angegebene E-Mail-Adresse (§ 18 FAGG).
                </>
              )}
            </p>
          </div>
        </section>
      )}
    </>
  );
}

export function GutscheineFlow({
  cms,
  pricing,
}: {
  cms: SanityGutscheinePage | null;
  pricing: SanityBlockPricing | null;
}) {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <GutscheineContent cms={cms} pricing={pricing} />
    </Suspense>
  );
}
