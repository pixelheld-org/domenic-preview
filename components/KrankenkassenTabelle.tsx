export function KrankenkassenTabelle() {
  return (
    <section className="py-16 sm:py-24 bg-[#f0f7f7]">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <h2
          data-edit-id="preise-kassen-heading"
          className="text-2xl sm:text-3xl font-extrabold text-[#0d4f4f] mb-3"
        >
          Krankenkassen-Rückerstattung
        </h2>
        <p
          data-edit-id="preise-kassen-intro"
          className="text-[#555] mb-10 leading-relaxed max-w-2xl"
        >
          Heilmassage kann mit ärztlicher Verordnung teilweise erstattet werden. Die folgenden Werte sind Richtwerte (Stand 2026) — bitte direkt bei Ihrer Kasse erfragen.
        </p>

        <div className="rounded-3xl bg-white border border-gray-100 shadow-xl shadow-black/5 overflow-x-auto">
          <table className="w-full">
            <caption className="sr-only">Krankenkassen-Rückerstattung Übersicht</caption>
            <thead>
              <tr className="bg-[#0d4f4f] text-white">
                <th scope="col" className="px-4 sm:px-6 py-4 text-left font-extrabold text-sm sm:text-base">
                  <span data-edit-id="preise-kassen-col-kasse">Kasse</span>
                </th>
                <th scope="col" className="px-4 sm:px-6 py-4 text-left font-extrabold text-sm sm:text-base">
                  <span data-edit-id="preise-kassen-col-erstattung">Erstattung</span>
                </th>
                <th scope="col" className="hidden sm:table-cell px-4 sm:px-6 py-4 text-left font-extrabold text-sm sm:text-base">
                  <span data-edit-id="preise-kassen-col-bedingung">Voraussetzung</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100">
                <td className="px-4 sm:px-6 py-4 align-top">
                  <p data-edit-id="preise-kassen-ogk-name" className="font-bold text-[#111]">ÖGK</p>
                  <p data-edit-id="preise-kassen-ogk-full" className="text-xs text-[#666]">Österreichische Gesundheitskasse</p>
                </td>
                <td className="px-4 sm:px-6 py-4 text-sm text-[#333] align-top">
                  <span data-edit-id="preise-kassen-ogk-amount">ca. €10,60 (20 Min Heilmassage) bis ca. €16,90 (45 Min Lymphdrainage)</span>
                  <p data-edit-id="preise-kassen-ogk-cond-mobile" className="sm:hidden mt-1 text-xs text-[#555]">Ärztliche Verordnung nötig. Bis 30.06.2027 keine chefärztliche Bewilligung erforderlich.</p>
                </td>
                <td className="hidden sm:table-cell px-4 sm:px-6 py-4 text-sm text-[#555] align-top">
                  <span data-edit-id="preise-kassen-ogk-cond">Ärztliche Verordnung nötig. Bis 30.06.2027 keine chefärztliche Bewilligung erforderlich.</span>
                </td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="px-4 sm:px-6 py-4 align-top">
                  <p data-edit-id="preise-kassen-bvaeb-name" className="font-bold text-[#111]">BVAEB</p>
                  <p data-edit-id="preise-kassen-bvaeb-full" className="text-xs text-[#666]">Versicherungsanstalt öffentlich Bediensteter</p>
                </td>
                <td className="px-4 sm:px-6 py-4 text-sm text-[#333] align-top">
                  <span data-edit-id="preise-kassen-bvaeb-amount">ca. €11,20 (20 Min Heilmassage) bis ca. €17,70 (45 Min Lymphdrainage)</span>
                  <p data-edit-id="preise-kassen-bvaeb-cond-mobile" className="sm:hidden mt-1 text-xs text-[#555]">Ärztliche Verordnung + chefärztliche Bewilligung vor Therapiebeginn.</p>
                </td>
                <td className="hidden sm:table-cell px-4 sm:px-6 py-4 text-sm text-[#555] align-top">
                  <span data-edit-id="preise-kassen-bvaeb-cond">Ärztliche Verordnung + chefärztliche Bewilligung vor Therapiebeginn.</span>
                </td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="px-4 sm:px-6 py-4 align-top">
                  <p data-edit-id="preise-kassen-svs-name" className="font-bold text-[#111]">SVS</p>
                  <p data-edit-id="preise-kassen-svs-full" className="text-xs text-[#666]">Sozialversicherung der Selbständigen</p>
                </td>
                <td className="px-4 sm:px-6 py-4 text-sm text-[#333] align-top">
                  <span data-edit-id="preise-kassen-svs-amount">ca. €5,66 (15–20 Min Heilmassage) bis ca. €21,22 (60 Min Lymphdrainage)</span>
                  <p data-edit-id="preise-kassen-svs-cond-mobile" className="sm:hidden mt-1 text-xs text-[#555]">Ärztliche Verordnung + chefärztliche Bewilligung. SVS-Gesundheitshunderter zusätzlich möglich.</p>
                </td>
                <td className="hidden sm:table-cell px-4 sm:px-6 py-4 text-sm text-[#555] align-top">
                  <span data-edit-id="preise-kassen-svs-cond">Ärztliche Verordnung + chefärztliche Bewilligung. SVS-Gesundheitshunderter zusätzlich möglich.</span>
                </td>
              </tr>
              <tr>
                <td className="px-4 sm:px-6 py-4 align-top">
                  <p data-edit-id="preise-kassen-privat-name" className="font-bold text-[#111]">Privat</p>
                  <p data-edit-id="preise-kassen-privat-full" className="text-xs text-[#666]">Private Zusatzversicherungen</p>
                </td>
                <td className="px-4 sm:px-6 py-4 text-sm text-[#333] align-top">
                  <span data-edit-id="preise-kassen-privat-amount">Bis zu 100 % je nach Tarif</span>
                  <p data-edit-id="preise-kassen-privat-cond-mobile" className="sm:hidden mt-1 text-xs text-[#555]">Tarif-abhängig — Police prüfen.</p>
                </td>
                <td className="hidden sm:table-cell px-4 sm:px-6 py-4 text-sm text-[#555] align-top">
                  <span data-edit-id="preise-kassen-privat-cond">Tarif-abhängig — Police prüfen.</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p
          data-edit-id="preise-kassen-disclaimer"
          className="mt-6 text-xs text-[#666] italic max-w-3xl"
        >
          Stand 01.01.2026 — Richtwerte aus den Kassen-Vertragstarifen für Wahltherapie. Tatsächliche Erstattung hängt von Behandlungstyp, Dauer und individuellem Versicherungsstatus ab. Heilmassage wird grundsätzlich nur mit gültiger ärztlicher Verordnung erstattet. Bitte vor Behandlungsbeginn direkt bei Ihrer Kasse erfragen.
        </p>
      </div>
    </section>
  );
}
