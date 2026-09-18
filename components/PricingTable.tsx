import Link from "next/link";

export function PricingTable() {
  return (
    <div className="rounded-3xl bg-white border border-gray-100 shadow-xl shadow-black/5 overflow-y-hidden overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-[#0d4f4f] text-white">
            <th scope="col" className="px-4 sm:px-8 py-4 sm:py-5 text-left font-extrabold text-sm sm:text-base align-bottom">
              <span data-edit-id="pricing-table-col-service">Behandlung</span>
            </th>
            <th scope="col" className="px-2 sm:px-6 py-4 sm:py-5 text-center font-extrabold text-sm sm:text-base whitespace-nowrap align-bottom">
              <span data-edit-id="pricing-table-col-30">30 Min</span>
            </th>
            <th scope="col" className="px-2 sm:px-6 py-4 sm:py-5 text-center font-extrabold text-sm sm:text-base whitespace-nowrap align-bottom">
              <span data-edit-id="pricing-table-col-45">45 Min</span>
            </th>
            <th scope="col" className="px-2 sm:px-6 pt-2 pb-4 sm:py-5 text-center font-extrabold text-sm sm:text-base align-bottom">
              <span className="sm:hidden bg-[#f2a93b] text-[9px] font-bold px-1.5 py-0.5 rounded-full text-[#111] inline-block mb-0.5">
                Beliebt
              </span>
              <br className="sm:hidden" />
              <span className="inline-flex items-center sm:gap-1.5">
                <span data-edit-id="pricing-table-col-60" className="whitespace-nowrap">60 Min</span>
                <span className="hidden sm:inline bg-[#f2a93b] text-[10px] font-bold px-2 py-0.5 rounded-full text-[#111]">
                  Beliebt
                </span>
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-gray-100 hover:bg-[#0d4f4f]/[0.02] transition-colors">
            <td className="px-4 sm:px-8 py-4 sm:py-6">
              <Link
                href="/heilmassage-wien-1080"
                className="font-bold text-sm sm:text-base text-[#111] hover:text-[#0d4f4f] hover:underline transition-colors"
              >
                <span data-edit-id="pricing-row-heilmassage-name">Heilmassage</span>
              </Link>
            </td>
            <td className="px-2 sm:px-6 py-4 sm:py-6 text-center whitespace-nowrap">
              <span data-edit-id="pricing-row-heilmassage-30" className="text-base sm:text-xl font-extrabold text-[#333]">€55</span>
            </td>
            <td className="px-2 sm:px-6 py-4 sm:py-6 text-center whitespace-nowrap">
              <span data-edit-id="pricing-row-heilmassage-45" className="text-base sm:text-xl font-extrabold text-[#333]">€70</span>
            </td>
            <td className="px-2 sm:px-6 py-4 sm:py-6 text-center whitespace-nowrap">
              <span data-edit-id="pricing-row-heilmassage-60" className="text-base sm:text-xl font-extrabold text-[#e8654a]">€85</span>
            </td>
          </tr>
          <tr className="border-b border-gray-100 hover:bg-[#0d4f4f]/[0.02] transition-colors">
            <td className="px-4 sm:px-8 py-4 sm:py-6">
              <span data-edit-id="pricing-row-lymph-name" className="font-bold text-sm sm:text-base text-[#111]">
                Lymphdrainage
              </span>
            </td>
            <td className="px-2 sm:px-6 py-4 sm:py-6 text-center whitespace-nowrap">
              <span data-edit-id="pricing-row-lymph-30" className="text-base sm:text-xl font-extrabold text-[#333]">€55</span>
            </td>
            <td className="px-2 sm:px-6 py-4 sm:py-6 text-center whitespace-nowrap">
              <span data-edit-id="pricing-row-lymph-45" className="text-base sm:text-xl font-extrabold text-[#333]">€70</span>
            </td>
            <td className="px-2 sm:px-6 py-4 sm:py-6 text-center whitespace-nowrap">
              <span data-edit-id="pricing-row-lymph-60" className="text-base sm:text-xl font-extrabold text-[#e8654a]">€85</span>
            </td>
          </tr>
          <tr className="hover:bg-[#0d4f4f]/[0.02] transition-colors">
            <td className="px-4 sm:px-8 py-4 sm:py-6">
              <span data-edit-id="pricing-row-klassisch-name" className="font-bold text-sm sm:text-base text-[#111]">
                Klassische Massage
              </span>
            </td>
            <td className="px-2 sm:px-6 py-4 sm:py-6 text-center whitespace-nowrap">
              <span data-edit-id="pricing-row-klassisch-30" className="text-base sm:text-xl font-extrabold text-[#333]">€55</span>
            </td>
            <td className="px-2 sm:px-6 py-4 sm:py-6 text-center whitespace-nowrap">
              <span data-edit-id="pricing-row-klassisch-45" className="text-base sm:text-xl font-extrabold text-[#333]">€70</span>
            </td>
            <td className="px-2 sm:px-6 py-4 sm:py-6 text-center whitespace-nowrap">
              <span data-edit-id="pricing-row-klassisch-60" className="text-base sm:text-xl font-extrabold text-[#e8654a]">€85</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
