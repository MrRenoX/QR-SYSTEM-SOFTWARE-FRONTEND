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
    <section aria-label={t.trustSection.ariaLabel} className="mt-6 px-3">
      <Reveal className="rounded-panel border border-line bg-white px-2.5 py-4 shadow-card">
        <ul className="grid grid-cols-2 gap-y-4 min-[360px]:grid-cols-4">
          {PILLARS.map(({ Icon, title, detail }, index) => (
            <li
              key={title}
              className={`px-2 ${DIVIDERS[index]}`}
            >
              <Icon
                size={20}
                strokeWidth={1.5}
                className="text-terracotta"
                aria-hidden="true"
              />
              <h3 className="mt-1.5 text-[10.5px] font-bold leading-[1.25] text-ink">
                {title}
              </h3>
              <p className="mt-1 text-[9.5px] leading-[1.35] text-ink-muted">
                {detail}
              </p>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
