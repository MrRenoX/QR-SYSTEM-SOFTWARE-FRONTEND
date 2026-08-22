"use client";

import Image from "next/image";
import { Clock, Sun } from "lucide-react";
import type { Touchpoint } from "@/lib/types";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface TouchpointCardProps {
  touchpoint: Touchpoint;
  onOpen: (touchpoint: Touchpoint) => void;
}

export default function TouchpointCard({
  touchpoint,
  onOpen,
}: TouchpointCardProps) {
  const { t } = useLanguage();

  return (
    <article className="h-full overflow-hidden rounded-card border border-line bg-white shadow-card">
      <button
        type="button"
        onClick={() => onOpen(touchpoint)}
        aria-label={t.touchpoints.card.openAriaLabel(touchpoint.name)}
        className="zoom-frame flex h-full w-full flex-col text-left"
      >
        <div className="relative h-[132px] w-full shrink-0 overflow-hidden bg-gradient-to-br from-sand-light to-sand tab:h-[150px]">
          {touchpoint.image && (
            <Image
              src={touchpoint.image}
              alt={touchpoint.name}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 431px) 50vw, 366px"
              className="object-cover"
            />
          )}
        </div>

        <div className="flex-1 p-3.5 tab:p-4">
          <h3 className="font-serif text-[17px] font-bold leading-tight text-ink tab:text-[18px]">
            {touchpoint.name}
          </h3>
          <p className="mt-1.5 text-[12.5px] leading-[1.45] text-ink-soft tab:text-[13px]">
            {touchpoint.description}
          </p>
          <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-ink-muted">
            <span className="flex items-center gap-1">
              <Clock size={12.5} strokeWidth={2} className="text-terracotta" aria-hidden="true" />
              {touchpoint.duration}
            </span>
            <span className="flex items-center gap-1">
              <Sun size={12.5} strokeWidth={2} className="text-terracotta" aria-hidden="true" />
              {touchpoint.bestTime}
            </span>
          </div>
        </div>
      </button>
    </article>
  );
}
