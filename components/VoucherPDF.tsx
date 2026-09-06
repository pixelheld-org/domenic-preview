import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Svg,
  Path,
} from "@react-pdf/renderer";
import type { SanityVoucher } from "@/sanity/lib/queries";
import { formatExpiry } from "@/lib/voucher/expiry";
import { PRODUCT_PRICES_EUR } from "@/lib/stripe/products";

// A6 landscape: 148 × 105 mm
const mm = (v: number) => v * 2.8346;
const W = mm(148);
const H = mm(105);
const PAD_V = mm(9);
const PAD_H = mm(10);
const CORAL_BAR = mm(3);
const GAP_COL = mm(8);

const PETROL = "#0d4f4f";
const CORAL = "#e8654a";
const AMBER = "#f2a93b";
const TEAL_BG = "#f0f7f7";

// Logo path (white, from /public/images/logo-icon.svg — gradient replaced with solid)
const LOGO_D =
  "M201.9,108.5h-105.5V32h-47.5v200.4h47.5v-76.5h77.8v76.5h81.2c13.8,0,27-2.8,39-7.9,18-7.6,33.3-20.3,44.1-36.3,10.8-16,17.1-35.4,17.1-56,0-6.9-.7-13.7-2-20.2-1.3-6.5-3.3-12.8-5.8-18.8-7.6-18-20.3-33.2-36.3-44-16-10.8-35.4-17.1-56-17.1H125.5l47.5,47.5h82.4c7.3,0,14.2,1.5,20.5,4.1,9.4,4,17.5,10.7,23.2,19.2,5.7,8.4,9,18.5,9,29.5s-1.5,14.2-4.1,20.5c-4,9.4-10.7,17.5-19.1,23.2-8.5,5.7-18.5,9-29.5,9h-33.8v-56.8l-19.7-19.7h0Z";

const PRODUCT_LABELS: Record<string, string> = {
  block_5_30: "5er-Block · 30 Min",
  block_5_45: "5er-Block · 45 Min",
  block_5_60: "5er-Block · 60 Min",
  block_10_30: "10er-Block · 30 Min",
  block_10_45: "10er-Block · 45 Min",
  block_10_60: "10er-Block · 60 Min",
  voucher_custom: "Einzelgutschein",
};

const s = StyleSheet.create({
  // ── VORDERSEITE ──────────────────────────────────────────
  front: {
    width: W,
    height: H,
    backgroundColor: "white",
    fontFamily: "Helvetica",
  },
  frontContent: {
    position: "absolute",
    top: PAD_V,
    left: PAD_H,
    right: PAD_H,
    bottom: CORAL_BAR,
    flexDirection: "row",
  },
  leftCol: {
    flex: 1.4,
    flexDirection: "column",
    justifyContent: "space-between",
    marginRight: GAP_COL,
    paddingBottom: mm(3),
  },
  rightCol: {
    flex: 1,
    backgroundColor: TEAL_BG,
    borderRadius: mm(3),
    paddingTop: mm(4.5),
    paddingBottom: mm(4),
    paddingLeft: mm(5),
    paddingRight: mm(5),
    flexDirection: "column",
    justifyContent: "space-between",
  },
  coralBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: CORAL_BAR,
    backgroundColor: CORAL,
  },
  // Left col
  eyebrow: {
    fontSize: 6.5,
    letterSpacing: 2.5,
    color: CORAL,
    fontFamily: "Helvetica-Bold",
  },
  bigLine1: {
    fontSize: 30,
    fontFamily: "Helvetica-Bold",
    color: PETROL,
    lineHeight: 1,
    marginTop: 2,
  },
  bigLine2: {
    fontSize: 30,
    fontFamily: "Helvetica-Bold",
    color: CORAL,
    lineHeight: 1,
  },
  treatments: {
    fontSize: 7,
    color: "#555",
    lineHeight: 1.45,
    marginBottom: 3,
  },
  masseurName: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: PETROL,
  },
  // Right col fields
  field: {
    flexDirection: "column",
  },
  fieldLabel: {
    fontSize: 6,
    color: PETROL,
    fontFamily: "Helvetica-Bold",
    letterSpacing: 1.5,
    marginBottom: 2,
  },
  fieldUnderline: {
    borderBottomWidth: 0.3,
    borderBottomColor: PETROL,
    paddingBottom: mm(1.5),
  },
  fieldText: {
    fontSize: 7.5,
    color: "#444",
    fontFamily: "Helvetica",
  },
  fieldTextBold: {
    fontSize: 7.5,
    color: PETROL,
    fontFamily: "Helvetica-Bold",
    letterSpacing: 0.5,
  },
  fieldTextSmall: {
    fontSize: 6,
    color: "#777",
    fontFamily: "Helvetica",
    marginTop: 1,
  },

  // ── RÜCKSEITE ─────────────────────────────────────────────
  back: {
    width: W,
    height: H,
    backgroundColor: PETROL,
    fontFamily: "Helvetica",
    paddingTop: PAD_V,
    paddingBottom: PAD_V,
    paddingLeft: PAD_H,
    paddingRight: PAD_H,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  backHeading: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: AMBER,
    marginBottom: mm(2),
  },
  backText: {
    fontSize: 7.5,
    color: "rgba(255,255,255,0.88)",
    lineHeight: 1.45,
  },
  backGrid: {
    flexDirection: "row",
  },
  backGridCol: {
    flex: 1,
  },
  backGridLabel: {
    fontSize: 6,
    color: AMBER,
    fontFamily: "Helvetica-Bold",
    letterSpacing: 1.5,
    marginBottom: mm(1),
  },
  backGridText: {
    fontSize: 7.5,
    color: "rgba(255,255,255,0.9)",
    lineHeight: 1.4,
  },
  backFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 0.3,
    borderTopColor: "rgba(242,169,59,0.4)",
    paddingTop: mm(2),
  },
  backFooterText: {
    fontSize: 6.5,
    color: "rgba(255,255,255,0.6)",
    fontFamily: "Helvetica-Oblique",
  },
});

export type VoucherPDFData = Pick<
  SanityVoucher,
  | "code"
  | "productType"
  | "sessionsTotal"
  | "durationMin"
  | "customAmount"
  | "buyerName"
  | "recipientName"
  | "purchasedAt"
  | "expiresAt"
> & {
  purchasedPriceCents?: number | null;
};

export function VoucherPDF({ voucher }: { voucher: VoucherPDFData }) {
  const isCustom = voucher.productType === "voucher_custom";
  const blockPriceEur =
    typeof voucher.purchasedPriceCents === "number"
      ? Math.round(voucher.purchasedPriceCents / 100)
      : PRODUCT_PRICES_EUR[voucher.productType];

  const wertText = isCustom
    ? `€ ${voucher.customAmount ?? "—"}`
    : blockPriceEur
    ? `€ ${blockPriceEur}`
    : "—";

  const wertSubText = PRODUCT_LABELS[voucher.productType] ?? voucher.productType;
  const fuerText = voucher.recipientName || voucher.buyerName || "—";
  const expiryText = `Gültig bis ${formatExpiry(voucher.expiresAt)} · nicht in bar ablösbar`;

  return (
    <Document
      title={`Gutschein ${voucher.code}`}
      author="Heilmasseur Domenic Hacker"
      subject="Massage-Gutschein"
    >
      {/* ── VORDERSEITE ── */}
      <Page size={[W, H]} style={s.front}>
        <View style={s.frontContent}>
          {/* Links: Big type */}
          <View style={s.leftCol}>
            <View>
              <Text style={s.eyebrow}>MASSAGE-GUTSCHEIN · WIEN 1080</Text>
              <Text style={s.bigLine1}>Gutschein</Text>
              <Text style={s.bigLine2}>für Sie.</Text>
            </View>
            <View>
              <Text style={s.treatments}>
                {"Heilmassage · Klassische Massage\nLymphdrainage · Sportmassage"}
              </Text>
              <Text style={s.masseurName}>Domenic Hacker · Dipl. Heilmasseur</Text>
            </View>
          </View>

          {/* Rechts: Datenfelder */}
          <View style={s.rightCol}>
            <View style={s.field}>
              <Text style={s.fieldLabel}>FÜR</Text>
              <View style={s.fieldUnderline}>
                <Text style={s.fieldText}>{fuerText}</Text>
              </View>
            </View>
            <View style={s.field}>
              <Text style={s.fieldLabel}>WERT</Text>
              <View style={s.fieldUnderline}>
                <Text style={s.fieldTextBold}>{wertText}</Text>
                <Text style={s.fieldTextSmall}>{wertSubText}</Text>
              </View>
            </View>
            <View style={s.field}>
              <Text style={s.fieldLabel}>GUTSCHEIN-NR.</Text>
              <View style={s.fieldUnderline}>
                <Text style={s.fieldTextBold}>{voucher.code}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Coral-Streifen unten */}
        <View style={s.coralBar} />
      </Page>

      {/* ── RÜCKSEITE ── */}
      <Page size={[W, H]} style={s.back}>
        <View>
          <Text style={s.backHeading}>Einlösung</Text>
          <Text style={s.backText}>
            {"Termin vorab vereinbaren — telefonisch, per E-Mail oder online.\nDen Gutschein zur Behandlung mitbringen.\nEinlösbar für alle Behandlungen in der Praxis."}
          </Text>
        </View>

        <View style={s.backGrid}>
          <View style={s.backGridCol}>
            <Text style={s.backGridLabel}>PRAXIS</Text>
            <Text style={s.backGridText}>{"Feldgasse 3/20\n1080 Wien · Josefstadt"}</Text>
          </View>
          <View style={s.backGridCol}>
            <Text style={s.backGridLabel}>KONTAKT</Text>
            <Text style={s.backGridText}>
              {"praxis@heilmasseur-domenic.at\nheilmasseur-domenic.at"}
            </Text>
          </View>
        </View>

        <View style={s.backFooter}>
          <Text style={s.backFooterText}>{expiryText}</Text>
          <Svg viewBox="0 0 404.5 264.4" width={mm(10)} height={mm(6.5)}>
            <Path d={LOGO_D} fill="white" style={{ fill: "white" }} />
          </Svg>
        </View>
      </Page>
    </Document>
  );
}
