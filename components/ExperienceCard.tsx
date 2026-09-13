"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Users } from "lucide-react";
import { getCategoryBadgeClass } from "@/lib/categoryStyles";
import type { Experience } from "@/lib/types";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface ExperienceCardProps {
  experience: Experience;
  /** Priority-load the first card's image */
  priority?: boolean;
}

export default function ExperienceCard({
  experience,
  priority = false,
}: ExperienceCardProps) {
  const { t } = useLanguage();
  const { slug, title, category, image, description, duration, groupSize, price } =
    experience;

  // Skip rendering if no image is available
  if (!image) {
    return null;
  }

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-card border border-noir-border bg-noir-card shadow-card transition-shadow duration-300 hover:shadow-float">
      <Link
        href={`/experiences/${slug}`}
        aria-label={t.experienceCard.ariaLabel(title, category, duration, price)}
        className="zoom-frame arrow-nudge flex h-full flex-col"
      >
        <div className="relative h-[152px] w-full shrink-0 overflow-hidden tab:h-[172px] tabLg:h-[184px]">
          <Image
            src={image}
            alt={title}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 33vw, (min-width: 431px) 50vw, 100vw"
            className="object-cover"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0"
          />
          <span
            className={`absolute left-3 top-3 w-fit rounded-[4px] px-1.5 py-[3px] text-[9.5px] font-bold uppercase tracking-[0.07em] ${getCategoryBadgeClass(category)}`}
          >
            {category}
          </span>
          <dl className="absolute inset-x-3 bottom-2.5 flex items-center gap-3 text-[11px] font-semibold text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.35)]">
            <div className="flex items-center gap-1">
              <dt className="sr-only">{t.experienceCard.durationSr}</dt>
              <Clock size={13} strokeWidth={2.2} className="shrink-0" aria-hidden="true" />
              <dd className="whitespace-nowrap">{duration}</dd>
            </div>
            <div className="flex items-center gap-1">
              <dt className="sr-only">{t.experienceCard.groupSizeSr}</dt>
              <Users size={13} strokeWidth={2.2} className="shrink-0" aria-hidden="true" />
              <dd className="whitespace-nowrap">{groupSize}</dd>
            </div>
          </dl>
        </div>

        <div className="flex flex-1 flex-col p-3.5 tab:p-4">
          <h3 className="font-serif text-[17px] font-bold leading-tight text-white tab:text-[19px]">
            {title}
          </h3>
          <p className="mt-1 line-clamp-2 text-[12px] leading-[1.45] text-white/70 tab:text-[13px]">
            {description}
          </p>

          <div className="mt-3 flex flex-1 items-end justify-between border-t border-noir-border pt-2.5">
            <div className="leading-tight">
              <span className="block text-[9px] font-semibold uppercase tracking-[0.07em] text-white/50">
                {t.experienceCard.startsFrom}
              </span>
              <p className="text-[16.5px] font-bold text-terracotta tab:text-[18px]">
                {price}
                <span className="text-[11px] font-semibold text-white/60">
                  {" "}
                  {t.experienceCard.perPerson}
                </span>
              </p>
            </div>
            <span
              aria-hidden="true"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-terracotta text-ink transition-transform duration-300 group-hover:scale-[1.06] tab:h-10 tab:w-10"
            >
              <ArrowRight size={17} strokeWidth={2.2} />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
