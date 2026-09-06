"use client";

import { useState } from "react";
import { Check, Gift } from "lucide-react";
import {
  DURATIONS,
  SIZES,
  discountPercent,
  getBlockOption,
  type Duration,
  type Size,
} from "@/lib/blockOptions";
import type {
  SanityVoucherProductType,
  SanityGutscheinePage,
  SanityBlockPricing,
} from "@/sanity/lib/queries";

// Gift-friendly preset amounts (€). Partial redemption is supported in the
// voucher schema (customAmountRemaining), so leftover credit is not lost.
const VOUCHER_PRESETS = [50, 75, 100, 150, 200] as const;
const CUSTOM_MIN = 30;
const CUSTOM_MAX = 500;

export type SelectedProduct =
  | {
      productType: SanityVoucherProductType;
      kind: "block";
      price: number;
      size: number;
      duration: number;
    }
  | {
      productType: "voucher_custom";
      kind: "custom";
      customAmountEur: number;
    };

export function VoucherProductSelector({
  selected,
  onSelect,
  customAmount,
  onCustomAmountChange,
  cms,
  pricing,
}: {
  selected: SelectedProduct | null;
  onSelect: (product: SelectedProduct) => void;
  customAmount: number;
  onCustomAmountChange: (value: number) => void;
  cms?: SanityGutscheinePage | null;
  pricing?: SanityBlockPricing | null;
}) {
  // Initial duration: pick up from preselected block if any, else default 60.
  // (In practice the parent skips this step when there is a deep-link preset,
  // but this keeps the toggle consistent if we ever change that flow.)
  const [duration, setDuration] = useState<Duration>(() => {
    if (selected?.kind === "block") return selected.duration as Duration;
    return 60;
  });

  function changeDuration(newDuration: Duration) {
    setDuration(newDuration);
    // If a block is currently selected, migrate selection to same size + new duration
    // so toggle and selection never get out of sync.
    if (selected?.kind === "block") {
      const newOpt = getBlockOption(
        selected.size as Size,
        newDuration,
        pricing,
      );
      onSelect({
        productType: newOpt.productKey,
        kind: "block",
        price: newOpt.price,
        size: newOpt.size,
        duration: newOpt.duration,
      });
    }
  }

  function selectBlock(size: Size) {
    const opt = getBlockOption(size, duration, pricing);
    onSelect({
      productType: opt.productKey,
      kind: "block",
      price: opt.price,
      size: opt.size,
      duration: opt.duration,
    });
  }

  function selectCustom() {
    onSelect({
      productType: "voucher_custom",
      kind: "custom",
      customAmountEur: customAmount,
    });
  }

  return (
    <div className="space-y-16 sm:space-y-20">
      {/* === FÜR SICH SELBST — BLOCK-KARTEN === */}
      <section>
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <p className="text-xs font-bold uppercase tracking-widest text-[#0d4f4f]/70 mb-2">
            {cms?.blocksEyebrow ?? "Für sich selbst — Stammkunden-Vorteil"}
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0d4f4f] mb-3">
            {cms?.blocksHeading ?? "Block-Karte kaufen"}
          </h2>
          <p className="text-[#555] leading-relaxed">
            {cms?.blocksText ??
              "Bis zu 12 % sparen. Ideal wenn Sie regelmäßig Behandlungen brauchen."}
          </p>
        </div>

        <div className="flex flex-col items-center mb-8 sm:mb-10">
          <p className="text-xs font-bold uppercase tracking-widest text-[#0d4f4f]/70 mb-3">
            {cms?.blocksDurationLabel ?? "Behandlungsdauer wählen"}
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
                  onClick={() => changeDuration(d)}
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

        <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
          {SIZES.map((size) => {
            const opt = getBlockOption(size, duration, pricing);
            const isSelected =
              selected?.kind === "block" &&
              selected.productType === opt.productKey;
            return (
              <BlockSizeCard
                key={size}
                size={size}
                duration={duration}
                pricing={pricing}
                selected={isSelected}
                highlight={size === 10}
                onSelect={() => selectBlock(size)}
              />
            );
          })}
        </div>
      </section>

      {/* Trenner */}
      <div
        className="flex items-center gap-4 max-w-md mx-auto"
        role="separator"
      >
        <div className="flex-1 h-px bg-gray-200" aria-hidden={true} />
        <span className="text-xs font-bold uppercase tracking-widest text-[#0d4f4f]/50">
          Oder
        </span>
        <div className="flex-1 h-px bg-gray-200" aria-hidden={true} />
      </div>

      {/* === ZUM VERSCHENKEN — EINZELGUTSCHEIN === */}
      <CustomVoucherSection
        customAmount={customAmount}
        onCustomAmountChange={onCustomAmountChange}
        selected={selected?.kind === "custom"}
        onSelectCustom={selectCustom}
        cms={cms}
      />
    </div>
  );
}

function BlockSizeCard({
  size,
  duration,
  selected,
  pricing,
  highlight = false,
  onSelect,
}: {
  size: Size;
  duration: Duration;
  selected: boolean;
  pricing?: SanityBlockPricing | null;
  highlight?: boolean;
  onSelect: () => void;
}) {
  const opt = getBlockOption(size, duration, pricing);
  const discount = discountPercent(opt.price, opt.fullPrice);
  const savings = opt.fullPrice - opt.price;
  const perSession = Math.round(opt.price / size);

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`cursor-pointer relative rounded-3xl border bg-white p-6 sm:p-8 shadow-sm transition-all duration-200 hover:shadow-lg motion-safe:hover:scale-[1.02] text-left ${
        selected
          ? "border-[#0d4f4f] ring-4 ring-[#0d4f4f]/20"
          : highlight
            ? "border-[#e8654a] shadow-md"
            : "border-gray-100"
      }`}
    >
      {selected ? (
        <span className="absolute -top-3 left-6 inline-flex items-center gap-1 rounded-full bg-[#0d4f4f] px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
          <Check size={12} strokeWidth={3} aria-hidden={true} />
          Ausgewählt
        </span>
      ) : (
        highlight && (
          <span className="absolute -top-3 left-6 inline-block rounded-full bg-[#e8654a] px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
            Beliebt
          </span>
        )
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
        <Check size={12} strokeWidth={3} aria-hidden={true} />
        {discount} % Vorteil
      </p>

      <span className="mt-7 block rounded-full bg-[#0d4f4f] py-3 text-center text-sm font-bold text-white">
        {selected ? "✓ Ausgewählt" : `${size}er-Block wählen`}
      </span>
    </button>
  );
}

function CustomVoucherSection({
  customAmount,
  onCustomAmountChange,
  selected,
  onSelectCustom,
  cms,
}: {
  customAmount: number;
  onCustomAmountChange: (value: number) => void;
  selected: boolean;
  onSelectCustom: () => void;
  cms?: SanityGutscheinePage | null;
}) {
  const validAmount =
    Number.isFinite(customAmount) &&
    customAmount >= CUSTOM_MIN &&
    customAmount <= CUSTOM_MAX;

  return (
    <section>
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
        <p className="text-xs font-bold uppercase tracking-widest text-[#f2a93b] mb-2">
          {cms?.customEyebrow ?? "Zum Verschenken"}
        </p>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0d4f4f] mb-3">
          {cms?.customHeading ?? "Einzelgutschein"}
        </h2>
        <p className="text-[#555] leading-relaxed">
          {cms?.customText ??
            "Frei wählbarer Betrag — perfekt für Geburtstag, Weihnachten oder Muttertag. 3 Jahre gültig, Restguthaben bleibt erhalten."}
        </p>
      </div>

      <div
        className={`max-w-2xl mx-auto rounded-3xl border bg-gradient-to-br from-[#0d4f4f] to-[#0a3d3d] p-8 sm:p-10 text-white transition-all ${
          selected
            ? "ring-4 ring-[#e8654a]/40 border-[#e8654a]"
            : "border-transparent"
        }`}
      >
        <div className="flex items-start gap-4 mb-7">
          <div className="flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
            <Gift size={24} className="text-[#f2a93b]" aria-hidden={true} />
          </div>
          <div>
            <p className="text-lg font-extrabold">
              {cms?.customCardTitle ?? "Beliebiger Geschenk-Betrag"}
            </p>
            <p className="text-sm text-white/70 leading-relaxed">
              €{CUSTOM_MIN} bis €{CUSTOM_MAX} ·{" "}
              {cms?.customCardSubtext ?? "einlösbar auf jede Behandlung"}
            </p>
          </div>
        </div>

        <p className="text-xs font-bold uppercase tracking-widest text-white/60 mb-3">
          Schnellauswahl
        </p>
        <div className="flex flex-wrap gap-2 mb-7">
          {VOUCHER_PRESETS.map((preset) => {
            const active = customAmount === preset;
            return (
              <button
                key={preset}
                type="button"
                onClick={() => onCustomAmountChange(preset)}
                aria-pressed={active}
                className={`cursor-pointer rounded-full px-5 py-2.5 text-sm font-bold transition-all ${
                  active
                    ? "bg-[#f2a93b] text-[#111] shadow-md"
                    : "bg-white/10 text-white hover:bg-white/15"
                }`}
              >
                €{preset}
              </button>
            );
          })}
        </div>

        <p className="text-xs font-bold uppercase tracking-widest text-white/60 mb-3">
          Oder anderer Betrag
        </p>
        <div className="flex items-center gap-3">
          <span className="text-2xl font-extrabold text-[#f2a93b]">€</span>
          <input
            type="number"
            min={CUSTOM_MIN}
            max={CUSTOM_MAX}
            step={5}
            value={customAmount}
            onChange={(e) => onCustomAmountChange(Number(e.target.value))}
            aria-label="Gutschein-Betrag in Euro"
            className="flex-1 rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-2xl font-extrabold text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#f2a93b]"
          />
        </div>
        {!validAmount && (
          <p className="mt-2 text-xs text-[#f2a93b]">
            Bitte einen Betrag zwischen €{CUSTOM_MIN} und €{CUSTOM_MAX} wählen.
          </p>
        )}

        <button
          type="button"
          onClick={onSelectCustom}
          disabled={!validAmount}
          className="cursor-pointer mt-7 w-full rounded-full bg-gradient-to-r from-[#e8654a] to-[#f2a93b] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#e8654a]/25 hover:shadow-xl hover:shadow-[#e8654a]/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          {selected
            ? "✓ Ausgewählt"
            : validAmount
              ? `€${customAmount}-Gutschein wählen`
              : "Gültigen Betrag wählen"}
        </button>
      </div>
    </section>
  );
}
