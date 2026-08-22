"use client";

import Link from "next/link";
import Header from "@/components/Header";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <>
      <Header />
      <main className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
        <p className="font-serif text-[46px] font-bold leading-none text-terracotta">
          {t.notFound.code}
        </p>
        <h1 className="mt-3 font-serif text-[22px] font-bold text-ink">
          {t.notFound.heading}
        </h1>
        <p className="mt-2 text-[13.5px] text-ink-muted">
          {t.notFound.body}
        </p>
        <Link
          href="/experiences"
          className="mt-5 flex h-12 items-center justify-center rounded-full bg-terracotta px-6 text-[15px] font-semibold text-white"
        >
          {t.notFound.browseAll}
        </Link>
      </main>
    </>
  );
}
