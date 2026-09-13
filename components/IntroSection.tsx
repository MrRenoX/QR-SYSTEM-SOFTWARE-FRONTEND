"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Heart, Landmark, UserRound } from "lucide-react";
import Reveal from "./Reveal";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function IntroSection() {
  const { t } = useLanguage();

  const BLOCKS = [
    { Icon: Landmark, ...t.introSection.blocks.ancientTemples },
    { Icon: BookOpen, ...t.introSection.blocks.sacredStories },
    { Icon: UserRound, ...t.introSection.blocks.localExpertise },
    { Icon: Heart, ...t.introSection.blocks.curatedWithLove },
  ] as const;

  return (
    <section
      id="about"
      aria-labelledby="intro-heading"
      className="relative z-10 -mt-[46px] px-3 tab:px-6 tabLg:mx-auto tabLg:max-w-[1080px] tabLg:px-10"
    >
      <Reveal className="rounded-panel bg-noir-card px-4 pb-4 pt-5 shadow-card ring-1 ring-noir-border tab:px-7 tab:pb-6 tab:pt-7 tabLg:px-9 tabLg:pb-7 tabLg:pt-8">
        <div className="flex items-start gap-3 tab:gap-5">
          <Image
            src="/images/illustrations/temple-lineart.svg"
            alt=""
            width={210}
            height={170}
            aria-hidden="true"
            className="-ml-1 mt-1 w-[118px] shrink-0 tab:w-[150px] tabLg:w-[170px]"
          />

          <div className="min-w-0 flex-1">
            <h2
              id="intro-heading"
              className="font-serif text-[19px] leading-[1.25] tracking-[-0.01em] text-white tab:text-[24px] tabLg:text-[27px]"
            >
              {t.introSection.headingLead}
              <span className="mt-0.5 block text-[22px] font-bold text-terracotta tab:text-[27px] tabLg:text-[30px]">
                {t.introSection.headingHighlight}
              </span>
            </h2>
            <p className="mt-2.5 text-[13px] leading-[1.4] text-white/70 tab:mt-3.5 tab:text-[15px]">
              {t.introSection.subtitleLine1}
              <br />
              {t.introSection.subtitleLine2}
            </p>
            <Link
              href="/experiences"
              className="arrow-nudge mt-3 inline-flex items-center gap-1.5 text-[12.5px] font-bold uppercase tracking-[0.06em] text-terracotta tab:mt-4 tab:text-[13.5px]"
            >
              {t.introSection.didYouKnow}
              <ArrowRight size={15} strokeWidth={2.4} aria-hidden="true" />
            </Link>
          </div>
        </div>

        <hr className="my-4 border-noir-border tab:my-6" />

        <ul className="grid grid-cols-2 gap-y-4 tab:gap-y-6 tabLg:grid-cols-4 tabLg:gap-x-2">
          {BLOCKS.map(({ Icon, title, detail }, index) => (
            <li
              key={title}
              className={`flex items-start gap-2.5 tab:gap-3 ${
                index % 2 === 0 ? "pr-3 tab:pr-4" : "border-l border-noir-border pl-3 tab:pl-4"
              } tabLg:border-l tabLg:border-noir-border tabLg:pl-4 tabLg:pr-0 first:tabLg:border-l-0 first:tabLg:pl-0`}
            >
              <Icon
                size={22}
                strokeWidth={1.4}
                className="mt-0.5 shrink-0 text-terracotta tab:h-6 tab:w-6"
                aria-hidden="true"
              />
              <span className="min-w-0 text-[12px] leading-[1.35] tab:text-[13.5px]">
                <span className="block font-semibold text-white">{title}</span>
                <span className="block text-white/60">{detail}</span>
              </span>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
