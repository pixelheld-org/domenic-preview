import { Loader2 } from "lucide-react";

export default function DankeLoading() {
  return (
    <main>
      <section className="bg-white min-h-[60vh]">
        <div className="mx-auto max-w-2xl px-5 sm:px-8 pt-28 pb-16 sm:pt-36 sm:pb-24 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#e8654a]/10 px-4 py-1.5 text-sm font-bold text-[#e8654a]">
            ✓ Zahlung erfolgreich
          </span>
          <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold leading-tight text-[#111]">
            Vielen Dank!
          </h1>

          <div
            className="mt-10 flex flex-col items-center gap-4"
            role="status"
            aria-live="polite"
          >
            <Loader2
              size={48}
              className="text-[#e8654a] animate-spin"
              aria-hidden={true}
              strokeWidth={2.5}
            />
            <p className="text-base text-[#555] font-medium">
              Ihr Gutschein wird erstellt…
            </p>
            <p className="text-sm text-[#888] max-w-md leading-relaxed">
              Das dauert nur wenige Sekunden. Bitte schließen Sie diese Seite nicht.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
