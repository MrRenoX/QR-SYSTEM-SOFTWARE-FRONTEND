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
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-heading"
      className="mt-8 px-3 tab:mt-12 tab:px-6 tabLg:mx-auto tabLg:max-w-[1080px] tabLg:px-10"
    >
      <h2
        id="how-it-works-heading"
        className="text-center font-serif text-[24px] font-bold tracking-[-0.01em] text-white tab:text-[30px] tabLg:text-[34px]"
      >
        {t.howItWorks.heading}
      </h2>

      <Reveal className="scrollbar-hide mt-4 flex items-start justify-between overflow-x-auto pb-1 tab:mt-8 tab:overflow-visible tabLg:mt-10">
        {STEPS.map(({ Icon, title, detail }, index) => (
          <div key={title} className="flex items-start tab:flex-1 tabLg:flex-1">
            <div className="w-[58px] shrink-0 text-center tab:w-auto tab:flex-1 tab:px-2 tabLg:w-auto tabLg:flex-1 tabLg:px-2">
              <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-terracotta tab:h-16 tab:w-16">
                <Icon size={19} strokeWidth={1.6} className="text-ink tab:h-7 tab:w-7" aria-hidden="true" />
              </span>
              <h3 className="mt-2 text-[9.5px] font-bold leading-tight text-white tab:mt-3 tab:text-[14px]">
                {title}
              </h3>
              <p className="mt-0.5 text-[8.5px] leading-[1.3] text-white/60 tab:mt-1 tab:text-[12px]">
                {detail}
              </p>
            </div>
            {index < STEPS.length - 1 && (
              <ArrowRight
                size={13}
                strokeWidth={1.8}
                aria-hidden="true"
                className="mx-0.5 mt-[15px] shrink-0 text-white/40 tab:mx-1 tab:mt-8 tab:h-4 tab:w-4 tabLg:mt-9"
              />
            )}
          </div>
        ))}
      </Reveal>
    </section>
  );
}
