"use client";

import { MapPin, ShieldCheck, UserRound, UserRoundCog } from "lucide-react";
import Reveal from "./Reveal";
import { useLanguage } from "@/lib/i18n/LanguageContext";

/**
 * Dividers sit between columns, not before the first item in a row — and the
 * row changes at 360px, so these are written out statically for Tailwind's JIT.
 */
const DIVIDERS = [
  "",
  "border-l border-line",
  "border-l-0 border-line min-[360px]:border-l",
  "border-l border-line",
] as const;

export default function TrustSection() {
  const { t } = useLanguage();

  const PILLARS = [
    { Icon: UserRound, ...t.trustSection.pillars.guides },
    { Icon: ShieldCheck, ...t.trustSection.pillars.safety },
    { Icon: MapPin, ...t.trustSection.pillars.authentic },
    { Icon: UserRoundCog, ...t.trustSection.pillars.personalized },
  ] as const;

  return (
    <section aria-label={t.trustSection.ariaLabel} className="mt-6 px-3 tab:px-6 tabLg:mx-auto tabLg:max-w-[1080px] tabLg:px-10">
      <Reveal className="rounded-panel border border-line bg-white px-2.5 py-4 shadow-card tab:px-6 tab:py-6 tabLg:px-8 tabLg:py-7">
        <ul className="grid grid-cols-2 gap-y-4 min-[360px]:grid-cols-4 tab:gap-y-6">
          {PILLARS.map(({ Icon, title, detail }, index) => (
            <li
              key={title}
              className={`px-2 tab:px-3 ${DIVIDERS[index]}`}
            >
              <Icon
                size={20}
                strokeWidth={1.5}
                className="text-terracotta tab:h-6 tab:w-6"
                aria-hidden="true"
              />
              <h3 className="mt-1.5 text-[10.5px] font-bold leading-[1.25] text-ink tab:mt-2.5 tab:text-[13px]">
                {title}
              </h3>
              <p className="mt-1 text-[9.5px] leading-[1.35] text-ink-muted tab:mt-1.5 tab:text-[11.5px]">
                {detail}
              </p>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
