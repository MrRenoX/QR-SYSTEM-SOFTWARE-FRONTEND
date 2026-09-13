"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import CategoryFilters from "./CategoryFilters";
import ExperienceCard from "./ExperienceCard";
import Reveal from "./Reveal";
import type { Experience, FilterName } from "@/lib/types";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface ExperienceListProps {
  experiences: Experience[];
  categories: readonly FilterName[];
  /** Cap the number of rows rendered (home page shows six) */
  limit?: number;
  showViewAll?: boolean;
  /** Pre-selects a filter tab, e.g. when arriving from the categories menu */
  initialCategory?: FilterName;
  /**
   * Renders the "Curated Experiences" section heading above the filters.
   * Only the home page needs this — kept here (rather than as static text
   * in the server-rendered home page) so it can react to language changes.
   */
  heading?: boolean;
}

export default function ExperienceList({
  experiences,
  categories,
  limit,
  showViewAll = false,
  initialCategory,
  heading = false,
}: ExperienceListProps) {
  const { t } = useLanguage();
  const [active, setActive] = useState<FilterName>(initialCategory ?? "All");

  const visible = useMemo(() => {
    const filtered =
      active === "All"
        ? experiences
        : experiences.filter((experience) => experience.category === active);
    return limit ? filtered.slice(0, limit) : filtered;
  }, [active, experiences, limit]);

  return (
    <div>
      {heading && (
        <h2
          id="curated"
          className="font-serif text-[25px] font-bold tracking-[-0.01em] text-white tab:text-[30px] tabLg:text-[34px]"
        >
          {t.home.curatedExperiencesHeading}
        </h2>
      )}
      <div className={heading ? "mt-3 tab:mt-5" : undefined}>
        <CategoryFilters
          categories={categories}
          active={active}
          onChange={setActive}
        />

        {visible.length > 0 ? (
          <ul className="mt-3 space-y-2.5 tab:mt-5 tab:grid tab:grid-cols-2 tab:gap-5 tab:space-y-0 tabLg:grid tabLg:grid-cols-3 tabLg:gap-5">
            {visible.map((experience, index) => (
              <Reveal
                as="li"
                key={experience.id}
                delay={Math.min(index * 60, 240)}
              >
                <ExperienceCard experience={experience} priority={index === 0} />
              </Reveal>
            ))}
          </ul>
        ) : (
          <p className="mt-6 rounded-card border border-dashed border-noir-border bg-noir-card px-4 py-6 text-center text-[13px] text-white/60">
            {t.experiences.emptyState}
          </p>
        )}

        {showViewAll && (
          <div className="mt-4 flex justify-center tab:mt-7">
            <Link
              href="/experiences"
              className="flex h-[46px] w-[286px] max-w-full items-center justify-center gap-2 rounded-full bg-terracotta text-[15px] font-semibold text-ink shadow-card transition-colors hover:bg-terracotta-deep tab:h-[52px] tab:w-[320px] tab:text-[16px]"
            >
              {t.experiences.viewAll}
              <ChevronDown size={17} strokeWidth={2.2} aria-hidden="true" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
