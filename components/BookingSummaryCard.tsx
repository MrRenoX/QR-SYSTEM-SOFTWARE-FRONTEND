"use client";

import Link from "next/link";
import { Tag, User, Users } from "lucide-react";
import Reveal from "./Reveal";
import { primaryButtonClass, secondaryButtonClass } from "@/lib/formStyles";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import type { Experience } from "@/lib/types";

/** Cosmetic only — picks an icon based on whether a tier reads as group or per-person pricing. */
function pricingOptionIcon(label: string) {
  const lower = label.toLowerCase();
  if (lower.includes("group")) return Users;
  if (lower.includes("person") || lower.includes("pax")) return User;
  return Tag;
}

/**
 * The price + pricing-tiers + book/query CTA block. Split out of
 * ExperienceInfo so it can render inline on phone/tablet but as a sticky
 * sidebar alongside the content at `tabLg:` on the experience detail page.
 */
export default function BookingSummaryCard({
  experience,
  className = "",
}: {
  experience: Experience;
  className?: string;
}) {
  const { t } = useLanguage();

  return (
    <Reveal className={`overflow-hidden rounded-panel border border-line bg-white shadow-card ${className}`}>
      <div className="bg-gradient-to-br from-terracotta-tint via-white to-white p-4 tabLg:p-5">
        <div className="flex items-baseline justify-between">
          <span className="text-[12.5px] font-medium text-ink-muted tabLg:text-[13.5px]">
            {t.experienceInfo.startingFromLabel}
          </span>
          <span className="font-serif text-[28px] font-bold text-terracotta tabLg:text-[32px]">
            {experience.price}
          </span>
        </div>

        {experience.pricingOptions && experience.pricingOptions.length > 0 && (() => {
          const cheapest = Math.min(...experience.pricingOptions.map((option) => option.value));
          return (
            <div className="mt-4 border-t border-dashed border-terracotta/25 pt-4">
              <p className="mb-2.5 flex items-center gap-1.5 text-[10.5px] font-bold uppercase tracking-[0.08em] text-ink-faint">
                <Tag size={12} strokeWidth={2.4} className="text-terracotta" aria-hidden="true" />
                {t.experienceInfo.pricingOptions}
              </p>
              <div className="grid grid-cols-2 gap-2">
                {experience.pricingOptions.map((option) => {
                  const Icon = pricingOptionIcon(option.key);
                  const isBestValue = option.value === cheapest;
                  return (
                    <div
                      key={option.key}
                      className={`relative rounded-xl border px-3 py-2.5 transition-transform duration-200 hover:-translate-y-0.5 ${
                        isBestValue
                          ? "border-terracotta/40 bg-terracotta-tint shadow-sm"
                          : "border-line bg-cream/60"
                      }`}
                    >
                      {isBestValue && (
                        <span className="absolute -top-2 right-2 rounded-full bg-terracotta px-1.5 py-[2.5px] text-[8px] font-bold uppercase tracking-[0.05em] text-white shadow-sm">
                          {t.experienceInfo.bestValue}
                        </span>
                      )}
                      <div className="flex items-center gap-1.5 text-ink-faint">
                        <Icon size={12} strokeWidth={2.2} className="shrink-0 text-terracotta" aria-hidden="true" />
                        <span className="truncate text-[10.5px] font-semibold uppercase tracking-[0.02em]">
                          {option.key}
                        </span>
                      </div>
                      <p className="mt-1 font-serif text-[16px] font-bold text-ink">
                        ₹{option.value.toLocaleString("en-IN")}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })()}

        <Link href={`/book/${experience.slug}`} className={`${primaryButtonClass} mt-4`}>
          {t.experienceInfo.bookThisExperience}
        </Link>
        <a href="#raise-a-query" className={`${secondaryButtonClass} mt-2.5`}>
          {t.experienceInfo.raiseAQuery}
        </a>
      </div>
    </Reveal>
  );
}
