"use client";

import Image from "next/image";
import { Heart, ShieldCheck, Users } from "lucide-react";
import SectionOrnament from "./SectionOrnament";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function AboutHero() {
  const { t } = useLanguage();

  const BADGES = [
    { Icon: ShieldCheck, label: t.about.hero.badges.authentic },
    { Icon: Users, label: t.about.hero.badges.guides },
    { Icon: Heart, label: t.about.hero.badges.curated },
  ] as const;

  return (
    <section className="px-4 pt-3">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[12px] text-ink-muted">
        <span className="font-semibold text-terracotta">{t.about.hero.breadcrumbCurrent}</span>
      </nav>

      <h1 className="mt-3 font-serif text-[32px] font-bold leading-[1.05] tracking-[-0.02em] text-ink">
        {t.about.hero.title}
      </h1>
      <SectionOrnament />
      <p className="mt-3 text-[15px] leading-[1.45] text-ink-soft">
        {t.about.hero.subtitle}
      </p>

      <ul className="mt-5 grid grid-cols-3 gap-2">
        {BADGES.map(({ Icon, label }) => (
          <li
            key={label}
            className="flex flex-col items-center gap-1.5 text-center"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-terracotta/30 text-terracotta">
              <Icon size={19} strokeWidth={1.6} aria-hidden="true" />
            </span>
            <span className="text-[10.5px] font-semibold leading-[1.25] text-ink">
              {label}
            </span>
          </li>
        ))}
      </ul>

      <div className="relative mt-5 h-[190px] w-full overflow-hidden rounded-panel shadow-card">
        <Image
          src="/images/hero/ayodhya-sarayu-ghat.jpg"
          alt="Ayodhya's temple skyline reflected on the Sarayu at dusk"
          fill
          priority
          sizes="390px"
          className="object-cover"
        />
      </div>
    </section>
  );
}
