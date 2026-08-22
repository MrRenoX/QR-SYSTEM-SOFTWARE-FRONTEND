"use client";

import Link from "next/link";
import {
  CalendarClock,
  Check,
  Clock,
  IndianRupee,
  Sparkles,
  Sun,
  Tag,
  User,
  Users,
  X,
} from "lucide-react";
import Reveal from "./Reveal";
import { primaryButtonClass, secondaryButtonClass } from "@/lib/formStyles";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import type { Experience } from "@/lib/types";

/** Cosmetic only — picks an icon based on whether a tier reads as group or per-person pricing. */
function pricingOptionIcon(label: string) {
  const lower = label.toLowerCase();
  if (lower.includes("group")) return Users;
  if (lower.includes("person") || lower.includes("pax")) return User;
  return Tag;
}

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
    { Icon: IndianRupee, label: t.experienceInfo.startingFromLabel, value: experience.price },
  ] as const;

  return (
    <section className="px-4 pt-5">
      <Reveal>
        <p className="text-[14px] leading-[1.55] text-ink-soft">
          {experience.longDescription ?? experience.description}
        </p>

        {experience.slots && experience.slots.length > 0 && (
          <div className="mt-4">
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

        <dl className="mt-4 grid grid-cols-2 gap-2.5">
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
        <Reveal className="mt-5 rounded-panel border border-line bg-white p-4 shadow-card">
          {experience.included && (
            <div>
              <h2 className="font-serif text-[18px] font-bold text-ink">
                {t.experienceInfo.included}
              </h2>
              <ul className="mt-2 space-y-1.5">
                {experience.included.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-[12.5px] text-ink-soft">
                    <Check size={14} strokeWidth={2.4} className="mt-0.5 shrink-0 text-whatsapp" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {experience.notIncluded && (
            <div className="mt-4 border-t border-line pt-4">
              <h2 className="font-serif text-[18px] font-bold text-ink">
                {t.experienceInfo.notIncluded}
              </h2>
              <ul className="mt-2 space-y-1.5">
                {experience.notIncluded.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-[12.5px] text-ink-soft">
                    <X size={14} strokeWidth={2.4} className="mt-0.5 shrink-0 text-terracotta" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Reveal>
      )}

      {experience.didYouKnow && (
        <Reveal className="mt-7 rounded-panel bg-terracotta-tint p-4">
          <h2 className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.08em] text-terracotta">
            <Sparkles size={14} aria-hidden="true" />
            {t.experienceInfo.didYouKnowHeading}
          </h2>
          <p className="mt-2 font-serif text-[17px] leading-[1.4] text-ink">
            {experience.didYouKnow}
          </p>
        </Reveal>
      )}

      <Reveal className="mt-7 overflow-hidden rounded-panel border border-line bg-white shadow-card">
        <div className="bg-gradient-to-br from-terracotta-tint via-white to-white p-4">
          <div className="flex items-baseline justify-between">
            <span className="text-[12.5px] font-medium text-ink-muted">
              {t.experienceInfo.startingFromLabel}
            </span>
            <span className="font-serif text-[28px] font-bold text-terracotta">
              {experience.price}
            </span>
          </div>

          {experience.pricingOptions && experience.pricingOptions.length > 0 && (() => {
            const cheapest = Math.min(...experience.pricingOptions.map((option) => option.value));
            return (
              <div className="mt-4 border-t border-dashed border-terracotta/25 pt-4">
                <p className="mb-2.5 flex items-center gap-1.5 text-[10.5px] font-bold uppercase tracking-[0.08em] text-ink-faint">
                  <Tag size={12} strokeWidth={2.4} className="text-terracotta" aria-hidden="true" />
                  {t.experienceInfo.pricingOptions}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {experience.pricingOptions.map((option) => {
                    const Icon = pricingOptionIcon(option.key);
                    const isBestValue = option.value === cheapest;
                    return (
                      <div
                        key={option.key}
                        className={`relative rounded-xl border px-3 py-2.5 transition-transform duration-200 hover:-translate-y-0.5 ${
                          isBestValue
                            ? "border-terracotta/40 bg-terracotta-tint shadow-sm"
                            : "border-line bg-cream/60"
                        }`}
                      >
                        {isBestValue && (
                          <span className="absolute -top-2 right-2 rounded-full bg-terracotta px-1.5 py-[2.5px] text-[8px] font-bold uppercase tracking-[0.05em] text-white shadow-sm">
                            {t.experienceInfo.bestValue}
                          </span>
                        )}
                        <div className="flex items-center gap-1.5 text-ink-faint">
                          <Icon size={12} strokeWidth={2.2} className="shrink-0 text-terracotta" aria-hidden="true" />
                          <span className="truncate text-[10.5px] font-semibold uppercase tracking-[0.02em]">
                            {option.key}
                          </span>
                        </div>
                        <p className="mt-1 font-serif text-[16px] font-bold text-ink">
                          ₹{option.value.toLocaleString("en-IN")}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })()}

          <Link
            href={`/book/${experience.slug}`}
            className={`${primaryButtonClass} mt-4`}
          >
            {t.experienceInfo.bookThisExperience}
          </Link>
          <a href="#raise-a-query" className={`${secondaryButtonClass} mt-2.5`}>
            {t.experienceInfo.raiseAQuery}
          </a>
        </div>
      </Reveal>
    </section>
  );
}
