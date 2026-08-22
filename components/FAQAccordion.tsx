"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Reveal from "./Reveal";
import type { FAQGroup } from "@/lib/types";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function FAQAccordion({ faqGroups }: { faqGroups: FAQGroup[] }) {
  const { t } = useLanguage();
  const [openKey, setOpenKey] = useState<string | null>(
    faqGroups[0] ? `${faqGroups[0].category}-0` : null,
  );

  return (
    <section aria-labelledby="faq-list" className="mt-6 px-4">
      <h2 id="faq-list" className="sr-only">
        {t.faqs.accordion.sectionHeadingSr}
      </h2>

      <div className="space-y-6">
        {faqGroups.map((group, groupIndex) => (
          <Reveal key={group.category} delay={Math.min(groupIndex * 60, 180)}>
            <h3 className="text-[11px] font-bold uppercase tracking-[0.08em] text-terracotta">
              {group.category}
            </h3>

            <ul className="mt-2.5 divide-y divide-line rounded-panel border border-line bg-white shadow-card">
              {group.items.map((item, itemIndex) => {
                const key = `${group.category}-${itemIndex}`;
                const isOpen = openKey === key;

                return (
                  <li key={key}>
                    <button
                      type="button"
                      onClick={() => setOpenKey(isOpen ? null : key)}
                      aria-expanded={isOpen}
                      aria-controls={`${key}-panel`}
                      className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left"
                    >
                      <span className="text-[13.5px] font-semibold leading-snug text-ink">
                        {item.question}
                      </span>
                      <ChevronDown
                        size={17}
                        strokeWidth={2.2}
                        className={`shrink-0 text-terracotta transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                        aria-hidden="true"
                      />
                    </button>

                    <div
                      id={`${key}-panel`}
                      role="region"
                      className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="px-4 pb-3.5 text-[13px] leading-[1.5] text-ink-muted">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
