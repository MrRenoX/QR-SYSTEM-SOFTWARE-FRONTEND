"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AlertCircle, ArrowLeft, CheckCircle2, Clock, Lock, Users } from "lucide-react";
import {
  errorTextClass,
  inputClass,
  inputErrorClass,
  labelClass,
  primaryButtonClass,
} from "@/lib/formStyles";
import { LIMITS } from "@/lib/validation/shared";
import { validateBookingDraft, type BookingDraftErrors } from "@/lib/validation/booking";
import { calculateBookingPrice } from "@/lib/pricing";
import { submitBooking } from "@/services/bookingService";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import type { BookingDraft, Experience, TimeSlot } from "@/lib/types";

const EMPTY: BookingDraft = {
  guestName: "",
  roomNumber: "",
  whatsapp: "",
  email: "",
  date: "",
  preferredTime: "Morning",
  adults: 2,
  children: 0,
  specialRequest: "",
};

/** Used only when an experience has no admin-configured slots. */
const FALLBACK_SLOTS: TimeSlot[] = [
  { key: "Morning", value: "Morning" },
  { key: "Afternoon", value: "Afternoon" },
  { key: "Evening", value: "Evening" },
];

function priceToNumber(price: string): number {
  return Number(price.replace(/[^\d]/g, "")) || 0;
}

export default function BookingForm({ experience }: { experience: Experience }) {
  const { t } = useLanguage();
  const timeSlots = experience.slots && experience.slots.length > 0 ? experience.slots : FALLBACK_SLOTS;
  const [draft, setDraft] = useState<BookingDraft>(() => ({ ...EMPTY, preferredTime: timeSlots[0].key }));
  const [errors, setErrors] = useState<BookingDraftErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "sent" | "error">("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);

  function update<K extends keyof BookingDraft>(key: K, value: BookingDraft[K]) {
    setDraft((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  }

  const unitPrice = priceToNumber(experience.price);
  const guests = draft.adults + draft.children;
  const { total: estimate, appliedTier } = calculateBookingPrice(
    unitPrice,
    experience.pricingOptions,
    draft.adults,
    draft.children,
  );

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    const result = validateBookingDraft(draft);
    setErrors(result.errors);
    if (!result.valid) return;

    setStatus("submitting");
    setSubmitError(null);

    const response = await submitBooking({
      ...draft,
      experienceId: experience.id,
    });
    if (response.ok) {
      setStatus("sent");
    } else {
      setStatus("error");
      setSubmitError(response.message);
    }
  }

  const header = (
    <div className="tabLg:mx-auto tabLg:max-w-[1080px]">
      <div className="flex items-center gap-3 py-3 tab:gap-4 tab:py-5">
        <Link
          href={`/experiences/${experience.slug}`}
          aria-label={t.bookingForm.backAriaLabel(experience.title)}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line bg-white text-ink transition-colors hover:text-terracotta tab:h-11 tab:w-11"
        >
          <ArrowLeft size={19} strokeWidth={2.2} aria-hidden="true" />
        </Link>
        <h1 className="font-serif text-[22px] font-bold leading-tight text-ink tab:text-[27px]">
          {t.bookingForm.headerTitle}
        </h1>
      </div>

      <div className="flex items-stretch gap-3 overflow-hidden rounded-card border border-line bg-white shadow-card tab:gap-4">
        <div className="relative h-[84px] w-[100px] shrink-0 tab:h-[108px] tab:w-[130px]">
          <Image
            src={experience.image}
            alt={experience.title}
            fill
            sizes="130px"
            className="object-cover"
          />
        </div>
        <div className="min-w-0 flex-1 py-2.5 pr-3 tab:py-4 tab:pr-5">
          <h2 className="truncate font-serif text-[16px] font-bold text-ink tab:text-[19px]">
            {experience.title}
          </h2>
          <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[11px] text-ink-muted tab:text-[13px]">
            <span className="flex items-center gap-1">
              <Clock size={12} className="text-terracotta" aria-hidden="true" />
              {experience.duration}
            </span>
            <span className="flex items-center gap-1">
              <Users size={12} className="text-terracotta" aria-hidden="true" />
              {experience.groupSize}
            </span>
          </p>
          <p className="mt-1 text-[12.5px] font-semibold text-terracotta tab:text-[14.5px]">
            {t.bookingForm.fromPricePrefix} {experience.price}
          </p>
        </div>
      </div>
    </div>
  );

  if (status === "sent") {
    return (
      <>
        {header}
        <div
          role="status"
          className="mt-4 rounded-panel border border-line bg-white p-6 text-center shadow-card tabLg:mx-auto tabLg:max-w-[560px] tabLg:p-10"
        >
          <CheckCircle2
            size={34}
            strokeWidth={1.5}
            className="mx-auto text-whatsapp"
            aria-hidden="true"
          />
          <h2 className="mt-2 font-serif text-[21px] font-bold text-ink">
            {t.bookingForm.successTitle}
          </h2>
          <p className="mt-1.5 text-[13px] leading-[1.5] text-ink-muted">
            {t.bookingForm.successBody(draft.guestName, experience.title, draft.date)}
          </p>
          <button
            type="button"
            onClick={() => {
              setDraft({ ...EMPTY, preferredTime: timeSlots[0].key });
              setErrors({});
              setStatus("idle");
            }}
            className="mt-4 text-[13px] font-semibold text-terracotta underline underline-offset-2"
          >
            {t.bookingForm.bookAnother}
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      {header}
      <form
        onSubmit={onSubmit}
        noValidate
        className="mt-4 tabLg:mx-auto tabLg:grid tabLg:max-w-[1080px] tabLg:grid-cols-[1fr_380px] tabLg:items-start tabLg:gap-8"
      >
        <div className="rounded-panel border border-line bg-white p-4 shadow-card tab:p-6 tabLg:col-start-1">
          <h2 className="font-serif text-[19px] font-bold text-ink tab:text-[22px]">{t.bookingForm.yourDetails}</h2>

          <div className="mt-3.5 space-y-3 tab:mt-5 tab:space-y-4">
            <div>
              <label htmlFor="guest-name" className={labelClass}>
                {t.bookingForm.guestName}
              </label>
              <input
                id="guest-name"
                required
                maxLength={LIMITS.name.max}
                value={draft.guestName}
                onChange={(event) => update("guestName", event.target.value)}
                className={errors.guestName ? inputErrorClass : inputClass}
                placeholder={t.bookingForm.guestNamePlaceholder}
                aria-invalid={Boolean(errors.guestName)}
                aria-describedby={errors.guestName ? "guest-name-error" : undefined}
              />
              {errors.guestName && (
                <p id="guest-name-error" className={errorTextClass}>
                  {errors.guestName}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="room-number" className={labelClass}>
                  {t.bookingForm.roomNumber}
                </label>
                <input
                  id="room-number"
                  required
                  maxLength={LIMITS.roomNumber.max}
                  value={draft.roomNumber}
                  onChange={(event) => update("roomNumber", event.target.value)}
                  className={errors.roomNumber ? inputErrorClass : inputClass}
                  placeholder={t.bookingForm.roomNumberPlaceholder}
                  aria-invalid={Boolean(errors.roomNumber)}
                  aria-describedby={errors.roomNumber ? "room-number-error" : undefined}
                />
                {errors.roomNumber && (
                  <p id="room-number-error" className={errorTextClass}>
                    {errors.roomNumber}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="whatsapp" className={labelClass}>
                  {t.bookingForm.whatsapp}
                </label>
                <input
                  id="whatsapp"
                  type="tel"
                  required
                  inputMode="tel"
                  maxLength={20}
                  value={draft.whatsapp}
                  onChange={(event) => update("whatsapp", event.target.value)}
                  className={errors.whatsapp ? inputErrorClass : inputClass}
                  placeholder={t.bookingForm.whatsappPlaceholder}
                  aria-invalid={Boolean(errors.whatsapp)}
                  aria-describedby={errors.whatsapp ? "whatsapp-error" : undefined}
                />
                {errors.whatsapp && (
                  <p id="whatsapp-error" className={errorTextClass}>
                    {errors.whatsapp}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="email" className={labelClass}>
                {t.bookingForm.email}
              </label>
              <input
                id="email"
                type="email"
                required
                maxLength={LIMITS.email.max}
                value={draft.email}
                onChange={(event) => update("email", event.target.value)}
                className={errors.email ? inputErrorClass : inputClass}
                placeholder={t.bookingForm.emailPlaceholder}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && (
                <p id="email-error" className={errorTextClass}>
                  {errors.email}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="date" className={labelClass}>
                  {t.bookingForm.date}
                </label>
                <input
                  id="date"
                  type="date"
                  required
                  min={new Date().toISOString().slice(0, 10)}
                  value={draft.date}
                  onChange={(event) => update("date", event.target.value)}
                  className={errors.date ? inputErrorClass : inputClass}
                  aria-invalid={Boolean(errors.date)}
                  aria-describedby={errors.date ? "date-error" : undefined}
                />
                {errors.date && (
                  <p id="date-error" className={errorTextClass}>
                    {errors.date}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="preferred-time" className={labelClass}>
                  {t.bookingForm.preferredTime}
                </label>
                <select
                  id="preferred-time"
                  value={draft.preferredTime}
                  onChange={(event) => update("preferredTime", event.target.value)}
                  className={inputClass}
                >
                  {timeSlots.map((slot) => (
                    <option key={slot.key} value={slot.key}>
                      {slot.key}
                      {slot.value && slot.value !== slot.key ? ` — ${slot.value}` : ""}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="adults" className={labelClass}>
                  {t.bookingForm.adults}
                </label>
                <input
                  id="adults"
                  type="number"
                  min={LIMITS.guests.adultsMin}
                  max={LIMITS.guests.max}
                  value={draft.adults}
                  onChange={(event) => update("adults", Number(event.target.value))}
                  className={errors.adults ? inputErrorClass : inputClass}
                  aria-invalid={Boolean(errors.adults)}
                  aria-describedby={errors.adults ? "adults-error" : undefined}
                />
                {errors.adults && (
                  <p id="adults-error" className={errorTextClass}>
                    {errors.adults}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="children" className={labelClass}>
                  {t.bookingForm.children}
                </label>
                <input
                  id="children"
                  type="number"
                  min={LIMITS.guests.childrenMin}
                  max={LIMITS.guests.max}
                  value={draft.children}
                  onChange={(event) => update("children", Number(event.target.value))}
                  className={errors.children ? inputErrorClass : inputClass}
                  aria-invalid={Boolean(errors.children)}
                  aria-describedby={errors.children ? "children-error" : undefined}
                />
                {errors.children && (
                  <p id="children-error" className={errorTextClass}>
                    {errors.children}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="special-request" className={labelClass}>
                {t.bookingForm.specialRequest}
              </label>
              <textarea
                id="special-request"
                rows={3}
                maxLength={LIMITS.specialRequest.max}
                value={draft.specialRequest}
                onChange={(event) => update("specialRequest", event.target.value)}
                className={`${errors.specialRequest ? inputErrorClass : inputClass} resize-none`}
                placeholder={t.bookingForm.specialRequestPlaceholder}
                aria-invalid={Boolean(errors.specialRequest)}
                aria-describedby={errors.specialRequest ? "special-request-error" : undefined}
              />
              {errors.specialRequest && (
                <p id="special-request-error" className={errorTextClass}>
                  {errors.specialRequest}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="tabLg:sticky tabLg:top-6 tabLg:col-start-2">
          <section
            aria-labelledby="booking-summary"
            className="mt-4 rounded-panel border border-line bg-white p-4 shadow-card tabLg:mt-0 tabLg:p-5"
          >
            <h2 id="booking-summary" className="font-serif text-[19px] font-bold text-ink">
              {t.bookingForm.bookingSummary}
            </h2>
            <dl className="mt-3 space-y-2 text-[13px]">
              <Row label={t.bookingForm.experienceLabel} value={experience.title} />
              <Row label={t.bookingForm.dateLabel} value={draft.date || t.bookingForm.notSelected} />
              <Row label={t.bookingForm.timeLabel} value={draft.preferredTime} />
              <Row
                label={t.bookingForm.guestsLabel}
                value={t.bookingForm.guestsSummary(draft.adults, draft.children)}
              />
              <Row label={t.bookingForm.pickupLabel} value={t.bookingForm.pickupValue} />
            </dl>

            <div className="mt-3 flex items-baseline justify-between border-t border-line pt-3">
              <span className="text-[13px] text-ink-muted">
                {t.bookingForm.estimatedTotalLabel(guests)}
              </span>
              <span className="font-serif text-[21px] font-bold text-terracotta">
                ₹{estimate.toLocaleString("en-IN")}
              </span>
            </div>
            {appliedTier && (
              <p className="mt-1 text-right text-[11.5px] font-medium text-terracotta">
                {t.bookingForm.pricingAppliedLabel(appliedTier.key)}
              </p>
            )}
          </section>

          <div className="mt-4 rounded-panel border border-dashed border-line bg-sand/60 p-4 text-center">
            <Lock size={17} className="mx-auto text-ink-muted" aria-hidden="true" />
            <p className="mt-1.5 text-[12px] leading-[1.45] text-ink-muted">
              {t.bookingForm.paymentNotice}
            </p>
          </div>

          {status === "error" && submitError && (
            <div
              role="alert"
              className="mt-4 flex items-start gap-2 rounded-[10px] border border-red-200 bg-red-50 px-3 py-2.5 text-[12.5px] text-red-700"
            >
              <AlertCircle size={15} className="mt-0.5 shrink-0" aria-hidden="true" />
              {submitError}
            </div>
          )}

          <button
            type="submit"
            disabled={status === "submitting"}
            className={`${primaryButtonClass} mt-4`}
          >
            {status === "submitting" ? t.bookingForm.sending : t.bookingForm.sendBooking}
          </button>
        </div>
      </form>
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <dt className="text-ink-muted">{label}</dt>
      <dd className="text-right font-medium text-ink">{value}</dd>
    </div>
  );
}
