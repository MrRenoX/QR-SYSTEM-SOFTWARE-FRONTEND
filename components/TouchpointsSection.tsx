"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import TouchpointCard from "./TouchpointCard";
import TouchpointModal from "./TouchpointModal";
import type { Touchpoint } from "@/lib/types";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function TouchpointsSection({
  touchpoints,
}: {
  touchpoints: Touchpoint[];
}) {
  const { t } = useLanguage();
  const [selected, setSelected] = useState<Touchpoint | null>(null);

  return (
    <section aria-labelledby="touchpoints" className="px-4 pt-7 tab:px-8 tabLg:px-10">
      <h2
        id="touchpoints"
        className="font-serif text-[22px] font-bold tracking-[-0.01em] text-ink tab:text-[26px]"
      >
        {t.touchpoints.section.heading}
      </h2>
      <p className="mt-1 text-[12.5px] text-ink-muted tab:text-[14px]">
        {t.touchpoints.section.subtitle}
      </p>

      <ul className="mt-4 space-y-3 tab:mt-6 tab:grid tab:grid-cols-2 tab:gap-4 tab:space-y-0 tabLg:grid tabLg:grid-cols-3 tabLg:gap-4">
        {touchpoints.map((touchpoint, index) => (
          <Reveal as="li" key={touchpoint.id} delay={Math.min(index * 70, 210)}>
            <TouchpointCard touchpoint={touchpoint} onOpen={setSelected} />
          </Reveal>
        ))}
      </ul>

      <TouchpointModal touchpoint={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
