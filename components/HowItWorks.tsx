"use client";

import { ArrowRight, CalendarDays, CreditCard, FileText, Search, Smile } from "lucide-react";
import Reveal from "./Reveal";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function HowItWorks() {
  const { t } = useLanguage();

  const STEPS = [
    { Icon: Search, ...t.howItWorks.steps.explore },
    { Icon: CalendarDays, ...t.howItWorks.steps.choose },
    { Icon: FileText, ...t.howItWorks.steps.shareDetails },
    { Icon: CreditCard, ...t.howItWorks.steps.bookPay },
    { Icon: Smile, ...t.howItWorks.steps.enjoy },
  ] as const;

  return (
    <section aria-labelledby="how-it-works" className="mt-8 px-3">
      <h2
        id="how-it-works"
        className="text-center font-serif text-[24px] font-bold tracking-[-0.01em] text-ink"
      >
        {t.howItWorks.heading}
      </h2>

      <Reveal className="scrollbar-hide mt-4 flex items-start justify-between overflow-x-auto pb-1">
        {STEPS.map(({ Icon, title, detail }, index) => (
          <div key={title} className="flex items-start">
            <div className="w-[58px] shrink-0 text-center">
              <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-sand">
                <Icon size={19} strokeWidth={1.6} className="text-terracotta" aria-hidden="true" />
              </span>
              <h3 className="mt-2 text-[9.5px] font-bold leading-tight text-ink">
                {title}
              </h3>
              <p className="mt-0.5 text-[8.5px] leading-[1.3] text-ink-muted">
                {detail}
              </p>
            </div>
            {index < STEPS.length - 1 && (
              <ArrowRight
                size={13}
                strokeWidth={1.8}
                aria-hidden="true"
                className="mx-0.5 mt-[15px] shrink-0 text-ink-soft"
              />
            )}
          </div>
        ))}
      </Reveal>
    </section>
  );
}
