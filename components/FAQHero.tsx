"use client";

import Link from "next/link";
import { ChevronRight, House } from "lucide-react";
import SectionOrnament from "./SectionOrnament";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function FAQHero() {
  const { t } = useLanguage();

  return (
    <section className="px-4 pt-3">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[12px] text-ink-muted">
        <Link href="/" className="flex items-center gap-1 hover:text-terracotta">
          <House size={12.5} aria-hidden="true" />
          {t.faqs.hero.breadcrumbHome}
        </Link>
        <ChevronRight size={12.5} className="text-ink-faint" aria-hidden="true" />
        <span className="font-semibold text-terracotta">{t.faqs.hero.breadcrumbCurrent}</span>
      </nav>

      <h1 className="mt-3 font-serif text-[32px] font-bold leading-[1.05] tracking-[-0.02em] text-ink">
        {t.faqs.hero.titleLine1}
        <br />
        {t.faqs.hero.titleLine2}
      </h1>
      <SectionOrnament />
      <p className="mt-3 text-[15px] leading-[1.45] text-ink-soft">
        {t.faqs.hero.subtitle}
      </p>
    </section>
  );
}
