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
      className="relative z-10 -mt-[46px] px-3"
    >
      <Reveal className="rounded-panel bg-parchment px-4 pb-4 pt-5 shadow-card ring-1 ring-line/70">
        <div className="flex items-start gap-3">
          <Image
            src="/images/illustrations/temple-lineart.svg"
            alt=""
            width={210}
            height={170}
            aria-hidden="true"
            className="-ml-1 mt-1 w-[118px] shrink-0"
          />

          <div className="min-w-0 flex-1">
            <h2
              id="intro-heading"
              className="font-serif text-[19px] leading-[1.25] tracking-[-0.01em] text-ink"
            >
              {t.introSection.headingLead}
              <span className="mt-0.5 block text-[22px] font-bold text-terracotta">
                {t.introSection.headingHighlight}
              </span>
            </h2>
            <p className="mt-2.5 text-[13px] leading-[1.4] text-ink-soft">
              {t.introSection.subtitleLine1}
              <br />
              {t.introSection.subtitleLine2}
            </p>
            <Link
              href="/experiences"
              className="arrow-nudge mt-3 inline-flex items-center gap-1.5 text-[12.5px] font-bold uppercase tracking-[0.06em] text-terracotta"
            >
              {t.introSection.didYouKnow}
              <ArrowRight size={15} strokeWidth={2.4} aria-hidden="true" />
            </Link>
          </div>
        </div>

        <hr className="my-4 border-line" />

        <ul className="grid grid-cols-2 gap-y-4">
          {BLOCKS.map(({ Icon, title, detail }, index) => (
            <li
              key={title}
              className={`flex items-start gap-2.5 ${
                index % 2 === 0 ? "pr-3" : "border-l border-line pl-3"
              }`}
            >
              <Icon
                size={22}
                strokeWidth={1.4}
                className="mt-0.5 shrink-0 text-terracotta"
                aria-hidden="true"
              />
              <span className="min-w-0 text-[12px] leading-[1.35]">
                <span className="block font-semibold text-ink">{title}</span>
                <span className="block text-ink-muted">{detail}</span>
              </span>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
