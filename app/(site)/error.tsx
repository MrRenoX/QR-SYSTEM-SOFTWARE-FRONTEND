"use client";

import { useEffect } from "react";
import { RefreshCw } from "lucide-react";
import Header from "@/components/Header";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { t } = useLanguage();

  useEffect(() => {
    // Intentionally no console logging here — this boundary must never
    // surface stack traces, file paths, or other internals to the guest.
    // Wire this up to an error-tracking service (e.g. Sentry) when one
    // is chosen, rather than logging to the browser console.
  }, []);

  return (
    <>
      <Header />
      <main className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
        <p className="font-serif text-[46px] font-bold leading-none text-terracotta">
          {t.error.oops}
        </p>
        <h1 className="mt-3 font-serif text-[22px] font-bold text-ink">
          {t.error.heading}
        </h1>
        <p className="mt-2 text-[13.5px] text-ink-muted">
          {t.error.body}
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-5 flex h-12 items-center justify-center gap-2 rounded-full bg-terracotta px-6 text-[15px] font-semibold text-white"
        >
          <RefreshCw size={16} aria-hidden="true" />
          {t.error.tryAgain}
        </button>
      </main>
    </>
  );
}
