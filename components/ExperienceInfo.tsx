"use client";

import { CalendarClock, Check, Clock, IndianRupee, Sparkles, Sun, Users, X } from "lucide-react";
import Reveal from "./Reveal";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import type { Experience } from "@/lib/types";

export default function ExperienceInfo({
  experience,
}: {
  experience: Experience;
}) {
  const { t } = useLanguage();

  const stats = [
    { Icon: Clock, label: t.experienceInfo.durationLabel, value: experience.duration },
    { Icon: Users, label: t.experienceInfo.groupSizeLabel, value: experience.groupSize },
    { Icon: Sun, label: t.experienceInfo.bestTimeLabel, value: experience.bestTime },
    { Icon: IndianRupee, label: t.experienceInfo.chargeOfTrailLabel, value: experience.price },
  ] as const;

  return (
    <section className="px-4 pt-5 tab:px-8 tabLg:px-10">
      <Reveal>
        <p className="text-[14px] leading-[1.55] text-ink-soft tab:text-[15.5px]">
          {experience.longDescription ?? experience.description}
        </p>

        {experience.slots && experience.slots.length > 0 && (
          <div className="mt-4 tab:max-w-[420px]">
            <label
              htmlFor="experience-slots"
              className="mb-1.5 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.06em] text-ink-faint"
            >
              <CalendarClock size={13} strokeWidth={2} className="text-terracotta" aria-hidden="true" />
              {t.experienceInfo.availableSlots}
            </label>
            <select
              id="experience-slots"
              defaultValue={experience.slots[0].key}
              className="w-full rounded-card border border-line bg-white px-3 py-2.5 text-[13.5px] font-semibold text-ink shadow-card focus:border-terracotta focus:outline-none"
            >
              {experience.slots.map((slot) => (
                <option key={slot.key} value={slot.key}>
                  {slot.key} — {slot.value}
                </option>
              ))}
            </select>
          </div>
        )}

        <dl className="mt-4 grid grid-cols-2 gap-2.5 tabLg:grid-cols-4">
          {stats.map(({ Icon, label, value }) => (
            <div
              key={label}
              className="rounded-card border border-line bg-white px-3 py-2.5 shadow-card"
            >
              <dt className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.06em] text-ink-faint">
                <Icon size={13} strokeWidth={2} className="text-terracotta" aria-hidden="true" />
                {label}
              </dt>
              <dd className="mt-1 text-[13.5px] font-semibold text-ink">{value}</dd>
            </div>
          ))}
        </dl>
      </Reveal>

      {(experience.included?.length || experience.notIncluded?.length) && (
        <Reveal className="mt-5 rounded-panel border border-line bg-white p-4 shadow-card tab:p-5">
          <div className="tab:grid tab:grid-cols-2 tab:gap-6 tabLg:grid tabLg:grid-cols-2 tabLg:gap-6">
            {experience.included && (
              <div>
                <h2 className="font-serif text-[18px] font-bold text-ink tab:text-[20px]">
                  {t.experienceInfo.included}
                </h2>
                <ul className="mt-2 space-y-1.5">
                  {experience.included.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-[12.5px] text-ink-soft tab:text-[13.5px]">
                      <Check size={14} strokeWidth={2.4} className="mt-0.5 shrink-0 text-whatsapp" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {experience.notIncluded && (
              <div className="mt-4 border-t border-line pt-4 tab:mt-0 tab:border-l tab:border-t-0 tab:pl-6 tab:pt-0 tabLg:mt-0 tabLg:border-l tabLg:border-t-0 tabLg:pl-6 tabLg:pt-0">
                <h2 className="font-serif text-[18px] font-bold text-ink tab:text-[20px]">
                  {t.experienceInfo.notIncluded}
                </h2>
                <ul className="mt-2 space-y-1.5">
                  {experience.notIncluded.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-[12.5px] text-ink-soft tab:text-[13.5px]">
                      <X size={14} strokeWidth={2.4} className="mt-0.5 shrink-0 text-terracotta" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </Reveal>
      )}

      {experience.didYouKnow && (
        <Reveal className="mt-7 rounded-panel bg-terracotta-tint p-4 tab:p-5">
          <h2 className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.08em] text-terracotta">
            <Sparkles size={14} aria-hidden="true" />
            {t.experienceInfo.didYouKnowHeading}
          </h2>
          <p className="mt-2 font-serif text-[17px] leading-[1.4] text-ink tab:text-[19px]">
            {experience.didYouKnow}
          </p>
        </Reveal>
      )}
    </section>
  );
}
