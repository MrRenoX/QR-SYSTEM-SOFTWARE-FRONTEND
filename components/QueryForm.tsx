"use client";

import { useState } from "react";
import { AlertCircle, CheckCircle2, Send } from "lucide-react";
import {
  errorTextClass,
  inputClass,
  inputErrorClass,
  labelClass,
  primaryButtonClass,
} from "@/lib/formStyles";
import { LIMITS } from "@/lib/validation/shared";
import { validateQueryDraft, type QueryDraftErrors } from "@/lib/validation/query";
import { submitQuery } from "@/services/queryService";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import type { QueryDraft } from "@/lib/types";

const EMPTY: QueryDraft = { name: "", roomNumber: "", mobile: "", question: "" };

export default function QueryForm({
  experienceTitle,
  experienceId,
}: {
  experienceTitle?: string;
  experienceId?: number;
}) {
  const { t } = useLanguage();
  const [draft, setDraft] = useState<QueryDraft>(EMPTY);
  const [errors, setErrors] = useState<QueryDraftErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "sent" | "error">("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);

  function update<K extends keyof QueryDraft>(key: K, value: QueryDraft[K]) {
    setDraft((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    const result = validateQueryDraft(draft);
    setErrors(result.errors);
    if (!result.valid) return;

    setStatus("submitting");
    setSubmitError(null);

    const response = await submitQuery({ ...draft, experienceId });
    if (response.ok) {
      setStatus("sent");
    } else {
      setStatus("error");
      setSubmitError(response.message);
    }
  }

  if (status === "sent") {
    return (
      <div
        role="status"
        className="rounded-panel border border-line bg-white p-5 text-center shadow-card"
      >
        <CheckCircle2
          size={30}
          strokeWidth={1.6}
          className="mx-auto text-whatsapp"
          aria-hidden="true"
        />
        <p className="mt-2 font-serif text-[19px] font-bold text-ink">
          {t.queryForm.successTitle}
        </p>
        <p className="mt-1 text-[12.5px] text-ink-muted">
          {t.queryForm.successBody}
        </p>
        <button
          type="button"
          onClick={() => {
            setDraft(EMPTY);
            setErrors({});
            setStatus("idle");
          }}
          className="mt-3 text-[13px] font-semibold text-terracotta underline underline-offset-2"
        >
          {t.queryForm.askAnother}
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-panel border border-line bg-white p-4 shadow-card tab:mx-auto tab:max-w-[640px] tab:p-7 tabLg:max-w-[720px]"
    >
      <h2 className="font-serif text-[19px] font-bold text-ink tab:text-[23px]">{t.queryForm.heading}</h2>
      <p className="mt-1 text-[12.5px] text-ink-muted tab:text-[14px]">
        {experienceTitle
          ? t.queryForm.subtitleWithExperience(experienceTitle)
          : t.queryForm.subtitleDefault}
      </p>

      <div className="mt-3.5 space-y-3 tab:mt-5 tab:space-y-4">
        <div>
          <label htmlFor="query-name" className={labelClass}>
            {t.queryForm.name}
          </label>
          <input
            id="query-name"
            required
            maxLength={LIMITS.name.max}
            value={draft.name}
            onChange={(event) => update("name", event.target.value)}
            className={errors.name ? inputErrorClass : inputClass}
            placeholder={t.queryForm.namePlaceholder}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "query-name-error" : undefined}
          />
          {errors.name && (
            <p id="query-name-error" className={errorTextClass}>
              {errors.name}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3 tab:gap-4">
          <div>
            <label htmlFor="query-room" className={labelClass}>
              {t.queryForm.roomNumber}
            </label>
            <input
              id="query-room"
              required
              maxLength={LIMITS.roomNumber.max}
              value={draft.roomNumber}
              onChange={(event) => update("roomNumber", event.target.value)}
              className={errors.roomNumber ? inputErrorClass : inputClass}
              placeholder={t.queryForm.roomNumberPlaceholder}
              aria-invalid={Boolean(errors.roomNumber)}
              aria-describedby={errors.roomNumber ? "query-room-error" : undefined}
            />
            {errors.roomNumber && (
              <p id="query-room-error" className={errorTextClass}>
                {errors.roomNumber}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="query-mobile" className={labelClass}>
              {t.queryForm.mobile}
            </label>
            <input
              id="query-mobile"
              type="tel"
              required
              inputMode="tel"
              maxLength={20}
              value={draft.mobile}
              onChange={(event) => update("mobile", event.target.value)}
              className={errors.mobile ? inputErrorClass : inputClass}
              placeholder={t.queryForm.mobilePlaceholder}
              aria-invalid={Boolean(errors.mobile)}
              aria-describedby={errors.mobile ? "query-mobile-error" : undefined}
            />
            {errors.mobile && (
              <p id="query-mobile-error" className={errorTextClass}>
                {errors.mobile}
              </p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="query-question" className={labelClass}>
            {t.queryForm.question}
          </label>
          <textarea
            id="query-question"
            required
            rows={3}
            maxLength={LIMITS.message.max}
            value={draft.question}
            onChange={(event) => update("question", event.target.value)}
            className={`${errors.question ? inputErrorClass : inputClass} resize-none`}
            placeholder={t.queryForm.questionPlaceholder}
            aria-invalid={Boolean(errors.question)}
            aria-describedby={errors.question ? "query-question-error" : undefined}
          />
          {errors.question && (
            <p id="query-question-error" className={errorTextClass}>
              {errors.question}
            </p>
          )}
        </div>
      </div>

      {status === "error" && submitError && (
        <div
          role="alert"
          className="mt-3.5 flex items-start gap-2 rounded-[10px] border border-red-200 bg-red-50 px-3 py-2.5 text-[12.5px] text-red-700"
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
        <Send size={16} aria-hidden="true" />
        {status === "submitting" ? t.queryForm.sending : t.queryForm.send}
      </button>
    </form>
  );
}
