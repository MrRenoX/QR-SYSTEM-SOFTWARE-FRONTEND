"use client";

import SectionOrnament from "./SectionOrnament";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function ContactHero() {
  const { t } = useLanguage();

  return (
    <section className="px-4 pt-3">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[12px] text-ink-muted">
        <span className="font-semibold text-terracotta">{t.contact.hero.breadcrumbCurrent}</span>
      </nav>

      <h1 className="mt-3 font-serif text-[32px] font-bold leading-[1.05] tracking-[-0.02em] text-ink">
        {t.contact.hero.title}
      </h1>
      <SectionOrnament />
    </section>
  );
}
