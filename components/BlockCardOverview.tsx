"use client";

import Link from "next/link";
import { useState } from "react";
import { Check, Gift } from "lucide-react";
import {
  DURATIONS,
  discountPercent,
  getBlockOption,
  type Duration,
  type Size,
} from "@/lib/blockOptions";
import type { SanityBlockPricing } from "@/sanity/lib/queries";

export function BlockCardOverview({
  heading,
  text,
  voucherCtaHeading,
  voucherCtaText,
  pricing,
}: {
  heading: string;
  text: string;
  voucherCtaHeading: string;
  voucherCtaText: string;
  pricing?: SanityBlockPricing | null;
}) {
  const [duration, setDuration] = useState<Duration>(60);

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0d4f4f] mb-4">
            {heading}
          </h2>
          <p className="text-[#555] leading-relaxed">{text}</p>
        </div>

        {/* Globaler Dauer-Toggle */}
        <div className="flex flex-col items-center mb-10 sm:mb-12">
          <p className="text-xs font-bold uppercase tracking-widest text-[#0d4f4f]/70 mb-3">
            Behandlungsdauer wählen
          </p>
          <div
            role="radiogroup"
            aria-label="Behandlungsdauer"
            className="inline-flex rounded-full bg-white border border-gray-200 p-1.5 shadow-sm"
          >
            {DURATIONS.map((d) => {
              const active = d === duration;
              return (
                <button
                  key={d}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => setDuration(d)}
                  className={`cursor-pointer relative px-5 sm:px-7 py-2.5 rounded-full text-sm font-bold transition-all duration-200 ${
                    active
                      ? "bg-[#0d4f4f] text-white shadow-md"
                      : "text-[#0d4f4f] hover:bg-[#0d4f4f]/5"
                  }`}
                >
                  {d} Min
                  {d === 60 && !active && (
                    <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#f2a93b] text-[10px] font-bold px-2 py-0.5 rounded-full text-[#111] whitespace-nowrap shadow-sm">
                      Beliebt
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
          <SizeCard size={5} duration={duration} pricing={pricing} />
          <SizeCard size={10} duration={duration} pricing={pricing} highlight />
        </div>

        {/* Einzelgutschein-CTA */}
        <div className="mt-16 rounded-3xl bg-gradient-to-br from-[#0d4f4f] to-[#0a3d3d] p-8 sm:p-12 text-white">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-10">
            <div className="flex-shrink-0 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10">
              <Gift size={32} className="text-[#f2a93b]" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-extrabold mb-2">
                {voucherCtaHeading}
              </h3>
              <p className="text-white/80 leading-relaxed">{voucherCtaText}</p>
            </div>
            <Link
              href="/gutscheine"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#e8654a] to-[#f2a93b] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#e8654a]/25 hover:shadow-xl hover:shadow-[#e8654a]/30 transition-all duration-200 motion-safe:hover:scale-105 whitespace-nowrap"
            >
              Gutschein kaufen
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function SizeCard({
  size,
  duration,
  pricing,
  highlight = false,
}: {
  size: Size;
  duration: Duration;
  pricing?: SanityBlockPricing | null;
  highlight?: boolean;
}) {
  const opt = getBlockOption(size, duration, pricing);
  const discount = discountPercent(opt.price, opt.fullPrice);
  const savings = opt.fullPrice - opt.price;
  const perSession = Math.round(opt.price / size);

  return (
    <div
      className={`relative rounded-3xl border bg-white p-6 sm:p-8 shadow-sm transition-all duration-200 hover:shadow-lg ${
        highlight ? "border-[#e8654a] shadow-md" : "border-gray-100"
      }`}
    >
      {highlight && (
        <span className="absolute -top-3 left-6 inline-block rounded-full bg-[#e8654a] px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
          Beliebt
        </span>
      )}

      <p className="text-xs font-bold uppercase tracking-widest text-[#0d4f4f] mb-2">
        {size} Behandlungen · {duration} Min
      </p>
      <h3 className="text-2xl font-extrabold text-[#111] mb-5">
        {size}er-Block
      </h3>

      <p className="text-4xl sm:text-5xl font-extrabold text-[#111] tabular-nums">
        €{opt.price}
      </p>
      <p className="mt-1 text-sm text-[#888] tabular-nums">
        €{perSession} pro Behandlung
      </p>
      <p className="mt-2 text-sm text-[#666]">
        <s>statt €{opt.fullPrice}</s>{" "}
        <span className="text-[#0d4f4f] font-semibold">
          (€{savings} gespart)
        </span>
      </p>
      <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-[#f2a93b]/15 px-3 py-1 text-xs font-bold text-[#0d4f4f]">
        <Check size={12} strokeWidth={3} />
        {discount} % Vorteil
      </p>

      <Link
        href={`/gutscheine?product=${opt.productKey}`}
        className="mt-7 block rounded-full bg-[#0d4f4f] py-3 text-center text-sm font-bold text-white transition-colors duration-200 hover:bg-[#0a3d3d]"
      >
        {size}er-Block kaufen
      </Link>
    </div>
  );
}
