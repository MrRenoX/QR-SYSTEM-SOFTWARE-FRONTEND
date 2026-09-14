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

  const CountCard = ({ className = "" }: { className?: string }) => (
    <div
      className={`overflow-hidden rounded-[13px] border border-terracotta-deep/30 bg-sand px-2 pb-1.5 pt-2 text-center shadow-float ${className}`}
    >
      <p className="font-serif text-[24px] font-bold leading-none text-terracotta-deep tabLg:text-[28px]">
        13
      </p>
      <p className="mt-1 text-[8.5px] leading-[1.2] text-ink tabLg:text-[9.5px]">
        {t.hero.expCountLine1} {t.hero.expCountLine2}
      </p>
      <Image
        src="/images/illustrations/temple-mini.svg"
        alt=""
        width={118}
        height={66}
        aria-hidden="true"
        className="mx-auto mt-1 h-[36px] w-auto"
      />
    </div>
  );

  return (
    <section className="relative isolate overflow-hidden pb-[118px] tabLg:pb-0">
      {/* Phone/tablet: full-bleed backdrop photo. At lg the photo becomes its own right-column panel instead. */}
      <Image
        src="/images/hero/ram-mandir-sunset.jpg"
        alt="The Ram Mandir in Ayodhya at golden hour, its carved spire lit by the setting sun"
        fill
        priority
        sizes="(min-width: 1440px) 390px, (min-width: 1024px) 0px, (min-width: 431px) 760px, 390px"
        className="-z-10 object-contain object-right-bottom tabLg:hidden"
      />
      {/* Dark wash so the headline sits on the noir chrome, not directly on the photograph */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(102deg,#4A2E1D_0%,#4A2E1D_26%,rgba(74,46,29,0.90)_42%,rgba(74,46,29,0.55)_57%,rgba(74,46,29,0.15)_74%,rgba(74,46,29,0)_92%)] tabLg:hidden"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 hidden bg-noir tabLg:block"
      />

      <div className="relative px-5 pt-3 tab:px-8 tab:pt-6 tabLg:mx-auto tabLg:flex tabLg:max-w-[1080px] tabLg:items-center tabLg:gap-14 tabLg:px-10 tabLg:py-16">
        <div className="tabLg:flex-1">
          <span className="-ml-2 inline-block max-w-[230px] rounded-[6px] border border-terracotta-soft/40 px-3 py-1.5 text-[9px] font-bold uppercase leading-[1.35] tracking-[0.05em] text-terracotta-soft tab:-ml-2.5 tab:max-w-[320px] tab:text-[10px] tabLg:-ml-3 tabLg:max-w-[380px] tabLg:text-[10.5px]">
            {t.header.partnerTagline}
          </span>
          <p className="mt-2.5 text-[20px] font-medium leading-none tracking-[-0.01em] text-white tab:text-[24px] tabLg:text-[26px]">
            {t.hero.welcomeTo}
          </p>
          <h1 className="mt-2 font-serif text-[46px] font-bold leading-[1.02] tracking-[-0.02em] tab:text-[58px] tabLg:text-[68px]">
            <span className="block text-terracotta">{heroFirstWord}</span>
            {heroRestWords && <span className="block text-white">{heroRestWords}</span>}
          </h1>
          <p className="mt-3 max-w-[210px] text-[15px] font-normal leading-[1.35] text-white/70 tab:max-w-[340px] tab:text-[17px] tabLg:max-w-[420px] tabLg:text-[19px]">
            {settings.homepage.heroSubtitle}
          </p>

          <ul className="mt-6 space-y-4 tab:mt-8 tab:space-y-5 tabLg:max-w-[420px]">
            {FEATURES.map(({ Icon, title, detail }) => (
              <li key={title} className="flex items-center gap-3 tab:gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/25 tab:h-11 tab:w-11">
                  <Icon size={16} strokeWidth={1.6} className="text-white tab:h-[19px] tab:w-[19px]" aria-hidden="true" />
                </span>
                <span className="max-w-[188px] text-[12.5px] leading-[1.3] text-white tab:max-w-[280px] tab:text-[14.5px]">
                  <span className="block font-semibold">{title}</span>
                  {detail && <span className="block text-white/70">{detail}</span>}
                </span>
              </li>
            ))}
          </ul>

          <Link
            href="/experiences"
            className="arrow-nudge mt-9 hidden h-[56px] w-[280px] items-center justify-between rounded-full bg-terracotta-soft pl-6 pr-2 shadow-goldButton transition-all hover:bg-terracotta active:translate-y-[2px] active:shadow-goldButtonPressed tabLg:flex"
          >
            <span className="text-[16.5px] font-semibold text-ink">
              {t.hero.exploreExperiences}
            </span>
            <span className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-white">
              <ArrowRight size={19} strokeWidth={2.4} className="text-terracotta-deep" aria-hidden="true" />
            </span>
          </Link>
        </div>

        <div className="relative hidden h-[520px] flex-1 overflow-hidden rounded-panel bg-noir shadow-float ring-1 ring-terracotta/25 tabLg:block">
          <Image
            src="/images/hero/ram-mandir-sunset.jpg"
            alt="The Ram Mandir in Ayodhya at golden hour, its carved spire lit by the setting sun"
            fill
            priority
            sizes="500px"
            className="object-contain object-right-bottom"
          />
          <CountCard className="absolute left-4 top-4 w-[112px]" />
        </div>
      </div>

      {/* Phone/tablet floating count card + CTA — the lg split-hero above has its own. */}
      <CountCard className="absolute right-4 top-3 w-[104px] tab:right-6 tab:top-4 tab:w-[118px] tabLg:hidden" />

      <Link
        href="/experiences"
        className="arrow-nudge absolute bottom-[54px] right-3 flex h-[54px] w-[272px] max-w-[calc(100%-24px)] items-center justify-between rounded-full bg-terracotta-soft pl-6 pr-2 shadow-goldButton transition-all hover:bg-terracotta active:translate-y-[2px] active:shadow-goldButtonPressed tab:bottom-8 tab:right-6 tab:h-[58px] tab:w-[300px] tabLg:hidden"
      >
        <span className="text-[16.5px] font-semibold text-ink tab:text-[18px]">
          {t.hero.exploreExperiences}
        </span>
        <span className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-white tab:h-[42px] tab:w-[42px]">
          <ArrowRight size={19} strokeWidth={2.4} className="text-terracotta-deep" aria-hidden="true" />
        </span>
      </Link>
    </section>
  );
}
