"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";

/**
 * Shared title + subtitle header for the categories and experiences list
 * pages. Both pages are async Server Components (they fetch data), so this
 * small presentational piece is split out as a Client Component — it's the
 * only static copy on either page, and needs to react to language changes.
 */
export default function PageHeader({ page }: { page: "categories" | "experiences" }) {
  const { t } = useLanguage();
  const content = page === "categories" ? t.categories.pageHeader : t.experiences.pageHeader;

  return (
    <header className={page === "categories" ? "pb-5 pt-3 tab:pb-8 tab:pt-6" : "pb-4 pt-3 tab:pb-6 tab:pt-6"}>
      <h1 className="font-serif text-[30px] font-bold leading-tight tracking-[-0.02em] text-ink tab:text-[38px] tabLg:text-[44px]">
        {content.title}
      </h1>
      <p
        className={
          page === "categories"
            ? "mt-1.5 text-[14px] leading-[1.45] text-ink-muted tab:mt-2.5 tab:max-w-[560px] tab:text-[16px]"
            : "mt-1 text-[14px] text-ink-muted tab:mt-2 tab:max-w-[560px] tab:text-[16px]"
        }
      >
        {content.subtitle}
      </p>
    </header>
  );
}
