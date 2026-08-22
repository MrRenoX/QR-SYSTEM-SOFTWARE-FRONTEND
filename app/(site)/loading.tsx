"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function Loading() {
  const { t } = useLanguage();

  return (
    <div
      role="status"
      aria-label={t.loading.label}
      className="flex min-h-[60vh] items-center justify-center"
    >
      <span className="h-8 w-8 animate-spin rounded-full border-2 border-line border-t-terracotta" />
      <span className="sr-only">{t.loading.labelWithEllipsis}</span>
    </div>
  );
}
