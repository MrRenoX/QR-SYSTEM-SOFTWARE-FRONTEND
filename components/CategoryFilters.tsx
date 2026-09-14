"use client";

import type { FilterName } from "@/lib/types";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface CategoryFiltersProps {
  categories: readonly FilterName[];
  active: FilterName;
  onChange: (category: FilterName) => void;
}

export default function CategoryFilters({
  categories,
  active,
  onChange,
}: CategoryFiltersProps) {
  const { t } = useLanguage();

  return (
    <div
      id="categories"
      role="tablist"
      aria-label="Filter experiences by category"
      className="scrollbar-hide -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 tab:-mx-6 tab:gap-2.5 tab:px-6 tabLg:mx-0 tabLg:flex-wrap tabLg:px-0"
    >
      {categories.map((category) => {
        const isActive = category === active;
        return (
          <button
            key={category}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(category)}
            className={`h-[36px] shrink-0 whitespace-nowrap rounded-[10px] px-4 text-[13.5px] font-medium transition-all tab:h-[40px] tab:px-5 tab:text-[14.5px] ${
              isActive
                ? "bg-terracotta-soft text-ink shadow-goldButtonSm hover:bg-terracotta active:translate-y-[1px] active:shadow-goldButtonPressed"
                : "border border-noir-border bg-noir-card text-white hover:border-terracotta/40"
            }`}
          >
            {category === "All" ? t.categoryFilters.all : category}
          </button>
        );
      })}
    </div>
  );
}
