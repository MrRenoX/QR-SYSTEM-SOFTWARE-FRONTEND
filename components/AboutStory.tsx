"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";
import SectionOrnament from "./SectionOrnament";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function AboutStory() {
  const { t } = useLanguage();

  return (
    <section aria-labelledby="our-story" className="mt-9 px-4">
      <Reveal>
        <h2
          id="our-story"
          className="font-serif text-[24px] font-bold tracking-[-0.01em] text-ink"
        >
          {t.about.story.heading}
        </h2>
        <SectionOrnament />

        <div className="mt-3 space-y-3 text-[13.5px] leading-[1.55] text-ink-soft">
          <p>{t.about.story.paragraph1}</p>
          <p>{t.about.story.paragraph2}</p>
          <p>{t.about.story.paragraph3}</p>
        </div>

        <Link
          href="/experiences"
          className="arrow-nudge mt-3 inline-flex items-center gap-1.5 text-[13px] font-bold text-terracotta"
        >
          {t.about.story.ourJourney}
          <ArrowRight size={15} strokeWidth={2.4} aria-hidden="true" />
        </Link>

        <Image
          src="/images/illustrations/temple-lineart.svg"
          alt=""
          width={340}
          height={220}
          aria-hidden="true"
          className="mx-auto mt-4 w-[220px]"
        />
      </Reveal>

      <Reveal delay={140} className="mt-6">
        <h2 className="font-serif text-[19px] font-bold tracking-[-0.01em] text-ink">
          {t.about.story.missionHeading}
        </h2>
        <SectionOrnament />
        <p className="mt-2 text-[13.5px] leading-[1.55] text-ink-soft">
          {t.about.story.missionBody}
        </p>
      </Reveal>

      <Reveal delay={190} className="mt-5">
        <h2 className="font-serif text-[19px] font-bold tracking-[-0.01em] text-ink">
          {t.about.story.visionHeading}
        </h2>
        <SectionOrnament />
        <p className="mt-2 text-[13.5px] leading-[1.55] text-ink-soft">
          {t.about.story.visionBody}
        </p>
      </Reveal>
    </section>
  );
}
