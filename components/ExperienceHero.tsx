"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getCategoryBadgeClass } from "@/lib/categoryStyles";
import type { Experience } from "@/lib/types";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function ExperienceHero({
  experience,
}: {
  experience: Experience;
}) {
  const { t } = useLanguage();

  return (
    <section className="relative">
      <div className="relative h-[268px] w-full overflow-hidden">
        <Image
          src={experience.image}
          alt={experience.title}
          fill
          priority
          sizes="390px"
          className="object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(36,26,20,0.45)_0%,rgba(36,26,20,0)_40%,rgba(36,26,20,0.55)_100%)]"
        />
      </div>

      <Link
        href="/experiences"
        aria-label={t.experienceHero.backAriaLabel}
        className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/92 text-ink shadow-float backdrop-blur-sm transition-colors hover:text-terracotta"
      >
        <ArrowLeft size={19} strokeWidth={2.2} aria-hidden="true" />
      </Link>

      <div className="absolute inset-x-4 bottom-4">
        <span
          className={`inline-block rounded-[4px] px-2 py-[3px] text-[9.5px] font-bold uppercase tracking-[0.07em] ${getCategoryBadgeClass(experience.category)}`}
        >
          {experience.category}
        </span>
        <h1 className="mt-1.5 font-serif text-[29px] font-bold leading-[1.1] tracking-[-0.02em] text-white">
          {experience.title}
        </h1>
      </div>
    </section>
  );
}
