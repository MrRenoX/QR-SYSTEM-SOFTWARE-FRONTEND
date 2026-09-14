"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";
import Reveal from "./Reveal";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function FAQContactCTA() {
  const { t } = useLanguage();

  return (
    <section className="mt-8 px-4">
      <Reveal className="rounded-panel border border-line bg-cream px-4 py-5 text-center shadow-card">
        <MessageCircle
          size={24}
          strokeWidth={1.6}
          className="mx-auto text-terracotta"
          aria-hidden="true"
        />
        <p className="mt-2 font-serif text-[18px] font-bold text-ink">
          {t.faqs.contactCta.stillHaveQuestions}
        </p>
        <p className="mt-1 text-[12.5px] leading-[1.45] text-ink-muted">
          {t.faqs.contactCta.body}
        </p>
        <Link
          href="/contact"
          className="mt-3.5 inline-flex h-11 items-center justify-center rounded-full bg-terracotta-soft px-6 text-[13.5px] font-bold text-ink shadow-goldButton transition-all hover:bg-terracotta active:translate-y-[2px] active:shadow-goldButtonPressed"
        >
          {t.faqs.contactCta.contactTeam}
        </Link>
      </Reveal>
    </section>
  );
}
