"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Landmark, MapPin, UserRound } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import type { SiteSettings } from "@/lib/types";

export default function Hero({ settings }: { settings: SiteSettings }) {
  const { t } = useLanguage();
  const [heroWord, ...heroRest] = settings.homepage.heroTitle.trim().split(/\s+/);
  const heroFirstWord = heroWord || "Ayodhya";
  const heroRestWords = heroRest.join(" ");

  const FEATURES = [
    { Icon: Landmark, ...t.hero.featureCurated },
    { Icon: UserRound, ...t.hero.featureCertified },
    { Icon: MapPin, ...t.hero.featureBegins },
  ] as const;

  return (
    <section className="relative isolate overflow-hidden pb-[118px]">
      <Image
        src="/images/hero/ayodhya-sarayu-ghat.jpg"
        alt="A pilgrim walking the stone ghats of the Sarayu at sunrise, with Ayodhya's temple spires behind"
        fill
        priority
        sizes="390px"
        className="-z-10 object-cover object-[68%_center]"
      />
      {/* Warm wash so the headline sits on ivory, not on the photograph */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(102deg,#FDF9F4_0%,#FDF9F4_26%,rgba(253,249,244,0.90)_42%,rgba(253,249,244,0.42)_57%,rgba(253,249,244,0)_74%)]"
      />

      <div className="relative px-5 pt-3">
        <p className="text-[20px] font-medium leading-none tracking-[-0.01em] text-ink">
          {t.hero.welcomeTo}
        </p>
        <h1 className="mt-2 font-serif text-[46px] font-bold leading-[1.02] tracking-[-0.02em]">
          <span className="block text-terracotta">{heroFirstWord}</span>
          {heroRestWords && <span className="block text-ink">{heroRestWords}</span>}
        </h1>
        <p className="mt-3 max-w-[210px] text-[15px] font-normal leading-[1.35] text-ink-soft">
          {settings.homepage.heroSubtitle}
        </p>

        <ul className="mt-6 space-y-4">
          {FEATURES.map(({ Icon, title, detail }) => (
            <li key={title} className="flex items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ink/25">
                <Icon size={16} strokeWidth={1.6} className="text-ink" aria-hidden="true" />
              </span>
              <span className="max-w-[188px] text-[12.5px] leading-[1.3] text-ink">
                <span className="block font-semibold">{title}</span>
                <span className="block">{detail}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Floating count card */}
      <div className="absolute right-4 top-1 w-[142px] rounded-[16px] bg-white/95 px-3 pb-2 pt-3 text-center shadow-float">
        <p className="font-serif text-[40px] font-bold leading-none text-terracotta">
          16
        </p>
        <p className="mt-1.5 text-[12.5px] leading-[1.25] text-ink">
          {t.hero.expCountLine1}
          <br />
          {t.hero.expCountLine2}
        </p>
        <Image
          src="/images/illustrations/temple-mini.svg"
          alt=""
          width={118}
          height={66}
          aria-hidden="true"
          className="mx-auto mt-1 h-[62px] w-auto"
        />
      </div>

      <Link
        href="/experiences"
        className="arrow-nudge absolute bottom-[54px] right-3 flex h-[54px] w-[272px] max-w-[calc(100%-24px)] items-center justify-between rounded-full bg-terracotta pl-6 pr-2 shadow-[0_10px_24px_-10px_rgba(220,74,12,0.85)] transition-colors hover:bg-terracotta-deep"
      >
        <span className="text-[16.5px] font-semibold text-white">
          {t.hero.exploreExperiences}
        </span>
        <span className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-white">
          <ArrowRight size={19} strokeWidth={2.4} className="text-terracotta" aria-hidden="true" />
        </span>
      </Link>
    </section>
  );
}
