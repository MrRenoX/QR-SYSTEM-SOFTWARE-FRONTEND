"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getCategoryMeta } from "@/lib/categoryContent";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface CategoryCardProps {
  name: string;
  description: string;
  image: string | null;
  count: number;
  priority?: boolean;
}

export default function CategoryCard({
  name,
  description,
  image,
  count,
  priority = false,
}: CategoryCardProps) {
  const { tagline, icon: Icon } = getCategoryMeta(name);
  const { t } = useLanguage();

  return (
    <Link
      href={`/experiences?category=${encodeURIComponent(name)}`}
      aria-label={t.categoryCard.browseAriaLabel(name, count)}
      className="zoom-frame arrow-nudge group relative block h-[188px] w-full overflow-hidden rounded-panel border border-line bg-ink shadow-card transition-shadow duration-300 hover:shadow-float"
    >
      {image ? (
        <Image
          src={image}
          alt=""
          fill
          priority={priority}
          sizes="(min-width: 431px) 390px, 100vw"
          className="object-cover"
          aria-hidden="true"
        />
      ) : (
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-br from-ink to-terracotta/40" />
      )}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/35 to-ink/5"
      />

      <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3.5">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md">
          <Icon size={16} strokeWidth={2.2} aria-hidden="true" />
        </span>
        <span className="rounded-full bg-white/15 px-2.5 py-1 text-[10.5px] font-semibold text-white backdrop-blur-md">
          {t.categoryCard.experienceCount(count)}
        </span>
      </div>

      <div className="absolute inset-x-0 bottom-0 p-4">
        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-terracotta-soft">
          {tagline}
        </p>
        <div className="mt-1 flex items-end justify-between gap-3">
          <div className="min-w-0">
            <h3 className="font-serif text-[21px] font-bold leading-tight text-white [text-shadow:0_1px_4px_rgba(0,0,0,0.3)]">
              {name}
            </h3>
            <p className="mt-1 line-clamp-2 text-[12px] leading-[1.4] text-white/80">
              {description}
            </p>
          </div>
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-terracotta text-white transition-transform duration-300 group-hover:scale-[1.08]">
            <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
          </span>
        </div>
      </div>
    </Link>
  );
}
