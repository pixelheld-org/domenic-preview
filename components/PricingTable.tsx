import Link from "next/link";
import type { SanityPricingItem } from "@/sanity/lib/queries";

export type PricingRow = {
  service: string;
  p30: string;
  p45: string;
  p60: string;
};

const FALLBACK_ROWS: PricingRow[] = [
  { service: "Heilmassage", p30: "€55", p45: "€70", p60: "€85" },
  { service: "Lymphdrainage", p30: "€55", p45: "€70", p60: "€85" },
  { service: "Klassische Massage", p30: "€55", p45: "€70", p60: "€85" },
];

export function pricingRowsFromSanity(
  items?: SanityPricingItem[] | null,
): PricingRow[] {
  if (!items || items.length === 0) return FALLBACK_ROWS;
  return items.map((item) => ({
    service: item.serviceName,
    p30: item.price30 ? `€${item.price30}` : "—",
    p45: item.price45 ? `€${item.price45}` : "—",
    p60: item.price60 ? `€${item.price60}` : "—",
  }));
}

export function PricingTable({
  rows,
  serviceLinks,
}: {
  rows: PricingRow[];
  serviceLinks?: Record<string, string>;
}) {
  return (
    <div className="rounded-3xl bg-white border border-gray-100 shadow-xl shadow-black/5 overflow-y-hidden overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-[#0d4f4f] text-white">
            <th scope="col" className="px-4 sm:px-8 py-4 sm:py-5 text-left font-extrabold text-sm sm:text-base align-bottom">
              Behandlung
            </th>
            <th scope="col" className="px-2 sm:px-6 py-4 sm:py-5 text-center font-extrabold text-sm sm:text-base whitespace-nowrap align-bottom">
              30 Min
            </th>
            <th scope="col" className="px-2 sm:px-6 py-4 sm:py-5 text-center font-extrabold text-sm sm:text-base whitespace-nowrap align-bottom">
              45 Min
            </th>
            <th scope="col" className="px-2 sm:px-6 pt-2 pb-4 sm:py-5 text-center font-extrabold text-sm sm:text-base align-bottom">
              <span className="sm:hidden bg-[#f2a93b] text-[9px] font-bold px-1.5 py-0.5 rounded-full text-[#111] inline-block mb-0.5">
                Beliebt
              </span>
              <br className="sm:hidden" />
              <span className="inline-flex items-center sm:gap-1.5">
                <span className="whitespace-nowrap">60 Min</span>
                <span className="hidden sm:inline bg-[#f2a93b] text-[10px] font-bold px-2 py-0.5 rounded-full text-[#111]">
                  Beliebt
                </span>
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={row.service}
              className={`${
                i < rows.length - 1 ? "border-b border-gray-100" : ""
              } hover:bg-[#0d4f4f]/[0.02] transition-colors`}
            >
              <td className="px-4 sm:px-8 py-4 sm:py-6">
                {serviceLinks?.[row.service] ? (
                  <Link
                    href={serviceLinks[row.service]}
                    className="font-bold text-sm sm:text-base text-[#111] hover:text-[#0d4f4f] hover:underline transition-colors"
                  >
                    {row.service}
                  </Link>
                ) : (
                  <span className="font-bold text-sm sm:text-base text-[#111]">
                    {row.service}
                  </span>
                )}
              </td>
              <td className="px-2 sm:px-6 py-4 sm:py-6 text-center whitespace-nowrap">
                <span className="text-base sm:text-xl font-extrabold text-[#333]">
                  {row.p30}
                </span>
              </td>
              <td className="px-2 sm:px-6 py-4 sm:py-6 text-center whitespace-nowrap">
                <span className="text-base sm:text-xl font-extrabold text-[#333]">
                  {row.p45}
                </span>
              </td>
              <td className="px-2 sm:px-6 py-4 sm:py-6 text-center whitespace-nowrap">
                <span className="text-base sm:text-xl font-extrabold text-[#e8654a]">
                  {row.p60}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
