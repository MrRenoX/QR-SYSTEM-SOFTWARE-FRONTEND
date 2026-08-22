"use client";

import Image from "next/image";
import Reveal from "./Reveal";
import SectionOrnament from "./SectionOrnament";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function AboutStory() {
  const { t } = useLanguage();

  return (
    <section aria-labelledby="about-story" className="mt-9 px-4">
      <h2 id="about-story" className="sr-only">
        About Ayodhya Anubhav
      </h2>

      <Reveal>
        <div className="space-y-3 text-[13.5px] leading-[1.55] text-ink-soft">
          <p>{t.about.story.paragraph1}</p>
          <p>{t.about.story.paragraph2}</p>
        </div>

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
        <h3 className="font-serif text-[19px] font-bold tracking-[-0.01em] text-ink">
          {t.about.story.poweredByHeading}
        </h3>
        <SectionOrnament />
        <div className="mt-2 space-y-2.5 text-[13.5px] leading-[1.55] text-ink-soft">
          <p>{t.about.story.poweredByParagraph1}</p>
          <p>{t.about.story.poweredByParagraph2}</p>
          <p>{t.about.story.poweredByParagraph3}</p>
        </div>
      </Reveal>

      <Reveal delay={190} className="mt-5">
        <h3 className="font-serif text-[19px] font-bold tracking-[-0.01em] text-ink">
          {t.about.story.journeyHeading}
        </h3>
        <SectionOrnament />
        <p className="mt-2 text-[13.5px] leading-[1.55] text-ink-soft">
          {t.about.story.journeyParagraph}
        </p>
      </Reveal>
    </section>
  );
}
