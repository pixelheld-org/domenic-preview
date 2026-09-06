"use client";

export type CheckoutFormInput = {
  productType: string;
  customAmount?: number; // in cents
  buyerEmail: string;
  buyerName: string;
  recipientName?: string;
};

export function VoucherCheckout(_props: { input: CheckoutFormInput }) {
  return <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-amber-950">Testvorschau: Es werden keine Zahlungen durchgeführt oder Gutscheine versendet.</div>;
}
