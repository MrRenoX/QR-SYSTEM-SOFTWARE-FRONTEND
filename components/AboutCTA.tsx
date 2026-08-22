"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function AboutCTA() {
  const { t } = useLanguage();

  return (
    <section className="mt-9 px-4">
      <Reveal className="relative overflow-hidden rounded-panel bg-gradient-to-br from-ink via-[#3B2416] to-terracotta-deep px-5 py-6 shadow-float">
        <Image
          src="/images/illustrations/temple-mini.svg"
          alt=""
          width={220}
          height={124}
          aria-hidden="true"
          className="pointer-events-none absolute -right-6 bottom-0 h-[92px] w-auto opacity-25 [filter:brightness(0)_invert(1)]"
        />
        <p className="relative max-w-[220px] font-serif text-[20px] font-bold leading-[1.25] text-white">
          {t.about.cta.heading}
        </p>
        <Link
          href="/experiences"
          className="arrow-nudge relative mt-4 inline-flex h-11 items-center gap-2 rounded-full bg-white pl-4 pr-2 text-[13.5px] font-bold text-terracotta shadow-card"
        >
          {t.about.cta.explore}
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-terracotta text-white">
            <ArrowRight size={14} strokeWidth={2.4} aria-hidden="true" />
          </span>
        </Link>
      </Reveal>
    </section>
  );
}
