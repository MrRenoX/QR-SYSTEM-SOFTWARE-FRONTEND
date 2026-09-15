"use client";

import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { useState } from "react";
import {
  AlertCircle,
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Loader2,
  Lock,
  Users,
} from "lucide-react";
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
import { createBooking, verifyBookingPayment } from "@/services/bookingService";
import { isRazorpayReady, openRazorpayCheckout } from "@/lib/razorpay";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import type { BookingDraft, Experience, TimeSlot } from "@/lib/types";
import type { BookingOrder, ConfirmedBooking } from "@/types/api/booking";

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

/**
 * Everything up to "the guest has paid" is provisional — `order` only ever
 * comes from `createBooking()` and `confirmed` only ever comes from
 * `verifyBookingPayment()` succeeding server-side. Nothing here ever
 * fabricates a paid/confirmed state on its own.
 */
type Phase =
  | "idle"
  | "creating"
  | "payment_cancelled"
  | "verifying"
  | "verify_error"
  | "confirmed";

function priceToNumber(price: string): number {
  return Number(price.replace(/[^\d]/g, "")) || 0;
}

export default function BookingForm({
  experience,
  brandName = "Guide Guru Global",
}: {
  experience: Experience;
  brandName?: string;
}) {
  const { t } = useLanguage();
  const timeSlots = experience.slots && experience.slots.length > 0 ? experience.slots : FALLBACK_SLOTS;
  const [draft, setDraft] = useState<BookingDraft>(() => ({ ...EMPTY, preferredTime: timeSlots[0].key }));
  const [errors, setErrors] = useState<BookingDraftErrors>({});
  const [phase, setPhase] = useState<Phase>("idle");
  const [formError, setFormError] = useState<string | null>(null);
  const [order, setOrder] = useState<BookingOrder | null>(null);
  const [openingCheckout, setOpeningCheckout] = useState(false);
  const [lastPayment, setLastPayment] = useState<RazorpayHandlerResponse | null>(null);
  const [confirmed, setConfirmed] = useState<ConfirmedBooking | null>(null);
  const [razorpayReady, setRazorpayReady] = useState(false);

  function update<K extends keyof BookingDraft>(key: K, value: BookingDraft[K]) {
    setDraft((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  }

  const unitPrice = priceToNumber(experience.price);
  const guests = draft.adults + draft.children;
  const hasPricingTiers = Boolean(experience.pricingOptions && experience.pricingOptions.length > 0);
  const { total: estimate, appliedTier } = calculateBookingPrice(
    unitPrice,
    experience.pricingOptions,
    draft.adults,
    draft.children,
  );

  async function verifyAndConfirm(payment: RazorpayHandlerResponse) {
    setLastPayment(payment);
    setPhase("verifying");
    const response = await verifyBookingPayment(payment);
    if (response.ok) {
      setConfirmed(response.data);
      setPhase("confirmed");
    } else {
      setPhase("verify_error");
    }
  }

  function launchCheckout(activeOrder: BookingOrder) {
    setOpeningCheckout(true);
    const opened = openRazorpayCheckout({
      order: activeOrder,
      brandName,
      prefill: {
        name: draft.guestName,
        email: draft.email || undefined,
        contact: draft.whatsapp,
      },
      onSuccess: (response) => {
        setOpeningCheckout(false);
        void verifyAndConfirm(response);
      },
      onDismiss: () => {
        setOpeningCheckout(false);
        setPhase("payment_cancelled");
      },
    });
    if (!opened) {
      setOpeningCheckout(false);
      setPhase("idle");
      setFormError(t.bookingForm.preparingPayment);
    }
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (phase === "creating" || phase === "verifying") return;

    const result = validateBookingDraft(draft);
    setErrors(result.errors);
    setFormError(null);
    if (!result.valid) return;

    if (hasPricingTiers && !appliedTier) {
      setFormError(t.bookingForm.guestCountUnavailable);
      return;
    }

    if (!razorpayReady) {
      setFormError(t.bookingForm.preparingPayment);
      return;
    }

    setPhase("creating");

    const response = await createBooking({
      ...draft,
      experienceId: experience.id,
      pricingOptionKey: hasPricingTiers ? appliedTier?.key : undefined,
    });

    if (!response.ok) {
      setPhase("idle");
      setFormError(response.message);
      return;
    }

    setOrder(response.data);
    launchCheckout(response.data);
  }

  function startNewBooking() {
    setDraft({ ...EMPTY, preferredTime: timeSlots[0].key });
    setErrors({});
    setFormError(null);
    setOrder(null);
    setLastPayment(null);
    setConfirmed(null);
    setPhase("idle");
  }

  const header = (
    <div className="tabLg:mx-auto tabLg:max-w-[1080px]">
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
        onLoad={() => setRazorpayReady(isRazorpayReady())}
      />
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
          {experience.experienceCode && (
            <p className="text-[9.5px] font-bold uppercase tracking-[0.06em] text-ink-faint">
              {experience.experienceCode}
            </p>
          )}
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

  if (phase === "confirmed" && confirmed) {
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
            {t.bookingForm.successBody(
              confirmed.guestName,
              experience.title,
              confirmed.visitDate,
              experience.experienceCode,
            )}
          </p>
          <div className="mt-3 inline-flex items-baseline gap-1.5 rounded-full bg-terracotta-tint px-4 py-1.5">
            <span className="text-[11px] font-semibold uppercase tracking-[0.05em] text-terracotta-deep">
              {t.bookingForm.amountPaidLabel}
            </span>
            <span className="font-serif text-[16px] font-bold text-terracotta-deep">
              ₹{confirmed.amount.toLocaleString("en-IN")}
            </span>
          </div>
          <p className="mt-2 text-[11.5px] font-medium text-ink-faint">{confirmed.bookingRef}</p>
          <button type="button" onClick={startNewBooking} className="mt-4 text-[13px] font-semibold text-terracotta underline underline-offset-2">
            {t.bookingForm.bookAnother}
          </button>
        </div>
      </>
    );
  }

  if (phase === "payment_cancelled" && order) {
    return (
      <>
        {header}
        <div
          role="alert"
          className="mt-4 rounded-panel border border-line bg-white p-6 text-center shadow-card tabLg:mx-auto tabLg:max-w-[560px] tabLg:p-10"
        >
          <AlertTriangle size={34} strokeWidth={1.5} className="mx-auto text-terracotta" aria-hidden="true" />
          <h2 className="mt-2 font-serif text-[21px] font-bold text-ink">
            {t.bookingForm.paymentCancelledTitle}
          </h2>
          <p className="mt-1.5 text-[13px] leading-[1.5] text-ink-muted">
            {t.bookingForm.paymentCancelledBody(order.bookingRef)}
          </p>
          <button
            type="button"
            onClick={() => launchCheckout(order)}
            disabled={openingCheckout}
            className={`${primaryButtonClass} mt-4`}
          >
            {openingCheckout ? <Loader2 size={18} className="animate-spin" aria-hidden="true" /> : t.bookingForm.retryPayment}
          </button>
          <button
            type="button"
            onClick={startNewBooking}
            className="mt-3 text-[13px] font-semibold text-terracotta underline underline-offset-2"
          >
            {t.bookingForm.startNewBooking}
          </button>
        </div>
      </>
    );
  }

  if (phase === "verify_error" && order) {
    return (
      <>
        {header}
        <div
          role="alert"
          className="mt-4 rounded-panel border border-line bg-white p-6 text-center shadow-card tabLg:mx-auto tabLg:max-w-[560px] tabLg:p-10"
        >
          <AlertCircle size={34} strokeWidth={1.5} className="mx-auto text-red-500" aria-hidden="true" />
          <h2 className="mt-2 font-serif text-[21px] font-bold text-ink">
            {t.bookingForm.verifyErrorTitle}
          </h2>
          <p className="mt-1.5 text-[13px] leading-[1.5] text-ink-muted">
            {t.bookingForm.verifyErrorBody(order.bookingRef)}
          </p>
          <button
            type="button"
            onClick={() => lastPayment && void verifyAndConfirm(lastPayment)}
            className={`${primaryButtonClass} mt-4`}
          >
            {t.bookingForm.tryAgain}
          </button>
          <button
            type="button"
            onClick={startNewBooking}
            className="mt-3 text-[13px] font-semibold text-terracotta underline underline-offset-2"
          >
            {t.bookingForm.startNewBooking}
          </button>
        </div>
      </>
    );
  }

  if (phase === "verifying") {
    return (
      <>
        {header}
        <div
          role="status"
          className="mt-4 rounded-panel border border-line bg-white p-6 text-center shadow-card tabLg:mx-auto tabLg:max-w-[560px] tabLg:p-10"
        >
          <Loader2 size={30} className="mx-auto animate-spin text-terracotta" aria-hidden="true" />
          <p className="mt-3 text-[14px] font-semibold text-ink">{t.bookingForm.verifyingPayment}</p>
        </div>
      </>
    );
  }

  const submitting = phase === "creating";

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
              <Row
                label={t.bookingForm.experienceLabel}
                value={
                  experience.experienceCode
                    ? `${experience.title} (${experience.experienceCode})`
                    : experience.title
                }
              />
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

          {formError && (
            <div
              role="alert"
              className="mt-4 flex items-start gap-2 rounded-[10px] border border-red-200 bg-red-50 px-3 py-2.5 text-[12.5px] text-red-700"
            >
              <AlertCircle size={15} className="mt-0.5 shrink-0" aria-hidden="true" />
              {formError}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting || !razorpayReady}
            className={`${primaryButtonClass} mt-4`}
          >
            {submitting ? (
              <>
                <Loader2 size={18} className="animate-spin" aria-hidden="true" />
                {order ? t.bookingForm.openingPayment : t.bookingForm.sending}
              </>
            ) : razorpayReady ? (
              t.bookingForm.sendBooking
            ) : (
              t.bookingForm.preparingPayment
            )}
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
