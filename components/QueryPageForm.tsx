"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, Users } from "lucide-react";
import QueryForm from "./QueryForm";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import type { Experience } from "@/lib/types";

/**
 * Full-page "Raise a query" flow — mirrors BookingForm's layout (back link +
 * experience summary card up top, form below) rather than a modal, which was
 * unreliable on some devices.
 */
export default function QueryPageForm({ experience }: { experience: Experience }) {
  const { t } = useLanguage();

  return (
    <>
      <div className="tabLg:mx-auto tabLg:max-w-[720px]">
        <div className="flex items-center gap-3 py-3 tab:gap-4 tab:py-5">
          <Link
            href={`/experiences/${experience.slug}`}
            aria-label={t.bookingForm.backAriaLabel(experience.title)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line bg-white text-ink transition-colors hover:text-terracotta tab:h-11 tab:w-11"
          >
            <ArrowLeft size={19} strokeWidth={2.2} aria-hidden="true" />
          </Link>
          <h1 className="font-serif text-[22px] font-bold leading-tight text-ink tab:text-[27px]">
            {t.queryForm.heading}
          </h1>
        </div>

        <div className="flex items-stretch gap-3 overflow-hidden rounded-card border border-line bg-white shadow-card tab:gap-4">
          <div className="relative h-[84px] w-[100px] shrink-0 tab:h-[108px] tab:w-[130px]">
            <Image
              src={experience.image}
              alt={experience.title}
              fill
              sizes="130px"
              className="object-cover"
            />
          </div>
          <div className="min-w-0 flex-1 py-2.5 pr-3 tab:py-4 tab:pr-5">
            {experience.experienceCode && (
              <p className="text-[9.5px] font-bold uppercase tracking-[0.06em] text-ink-faint">
                {experience.experienceCode}
              </p>
            )}
            <h2 className="truncate font-serif text-[16px] font-bold text-ink tab:text-[19px]">
              {experience.title}
            </h2>
            <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[11px] text-ink-muted tab:text-[13px]">
              <span className="flex items-center gap-1">
                <Clock size={12} className="text-terracotta" aria-hidden="true" />
                {experience.duration}
              </span>
              <span className="flex items-center gap-1">
                <Users size={12} className="text-terracotta" aria-hidden="true" />
                {experience.groupSize}
              </span>
            </p>
            <p className="mt-1 text-[12.5px] font-semibold text-terracotta tab:text-[14.5px]">
              {t.bookingForm.fromPricePrefix} {experience.price}
            </p>
          </div>
        </div>

        <p className="mt-3.5 text-[13.5px] leading-[1.55] text-ink-soft tab:text-[15px]">
          {experience.longDescription ?? experience.description}
        </p>

        <div className="mt-4 tab:mt-5">
          <QueryForm experienceTitle={experience.title} experienceId={experience.id} />
        </div>
      </div>
    </>
  );
}
