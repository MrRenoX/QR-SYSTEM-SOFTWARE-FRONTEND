"use client";

import { useState } from "react";
import { AlertCircle, CheckCircle2, Send } from "lucide-react";
import Reveal from "./Reveal";
import {
  errorTextClass,
  inputClass,
  inputErrorClass,
  labelClass,
  primaryButtonClass,
} from "@/lib/formStyles";
import { LIMITS } from "@/lib/validation/shared";
import { validateContactDraft, type ContactDraftErrors } from "@/lib/validation/contact";
import { submitContactMessage } from "@/services/contactService";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import type { ContactDraft } from "@/lib/types";

const EMPTY: ContactDraft = { name: "", contact: "", message: "" };

export default function ContactForm() {
  const { t } = useLanguage();
  const [draft, setDraft] = useState<ContactDraft>(EMPTY);
  const [errors, setErrors] = useState<ContactDraftErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "sent" | "error">("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);

  function update<K extends keyof ContactDraft>(key: K, value: ContactDraft[K]) {
    setDraft((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return; // guards double-click / double-submit

    const result = validateContactDraft(draft);
    setErrors(result.errors);
    if (!result.valid) return;

    setStatus("submitting");
    setSubmitError(null);

    const response = await submitContactMessage(draft);
    if (response.ok) {
      setStatus("sent");
    } else {
      setStatus("error");
      setSubmitError(response.message);
    }
  }

  return (
    <section aria-labelledby="contact-form-heading" className="mt-7 px-4">
      {status === "sent" ? (
        <Reveal className="rounded-panel border border-line bg-white p-5 text-center shadow-card">
          <div role="status">
            <CheckCircle2
              size={30}
              strokeWidth={1.6}
              className="mx-auto text-whatsapp"
              aria-hidden="true"
            />
            <p className="mt-2 font-serif text-[19px] font-bold text-ink">
              {t.contact.form.successTitle}
            </p>
            <p className="mt-1 text-[12.5px] text-ink-muted">
              {t.contact.form.successBody(draft.name.split(" ")[0] || "")}
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setDraft(EMPTY);
              setErrors({});
              setStatus("idle");
            }}
            className="mt-3 text-[13px] font-semibold text-terracotta underline underline-offset-2"
          >
            {t.contact.form.sendAnother}
          </button>
        </Reveal>
      ) : (
        <Reveal className="rounded-panel border border-line bg-white p-4 shadow-card">
          <form onSubmit={onSubmit} noValidate>
            <h2
              id="contact-form-heading"
              className="font-serif text-[19px] font-bold text-ink"
            >
              {t.contact.form.heading}
            </h2>
            <p className="mt-1 text-[12.5px] text-ink-muted">
              {t.contact.form.subtitle}
            </p>

            <div className="mt-3.5 space-y-3">
              <div>
                <label htmlFor="contact-name" className={labelClass}>
                  {t.contact.form.name}
                </label>
                <input
                  id="contact-name"
                  required
                  maxLength={LIMITS.name.max}
                  value={draft.name}
                  onChange={(event) => update("name", event.target.value)}
                  className={errors.name ? inputErrorClass : inputClass}
                  placeholder={t.contact.form.namePlaceholder}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "contact-name-error" : undefined}
                />
                {errors.name && (
                  <p id="contact-name-error" className={errorTextClass}>
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="contact-method" className={labelClass}>
                  {t.contact.form.contactMethod}
                </label>
                <input
                  id="contact-method"
                  required
                  maxLength={LIMITS.email.max}
                  value={draft.contact}
                  onChange={(event) => update("contact", event.target.value)}
                  className={errors.contact ? inputErrorClass : inputClass}
                  placeholder={t.contact.form.contactMethodPlaceholder}
                  aria-invalid={Boolean(errors.contact)}
                  aria-describedby={errors.contact ? "contact-method-error" : undefined}
                />
                {errors.contact && (
                  <p id="contact-method-error" className={errorTextClass}>
                    {errors.contact}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="contact-message" className={labelClass}>
                  {t.contact.form.message}
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={3}
                  maxLength={LIMITS.message.max}
                  value={draft.message}
                  onChange={(event) => update("message", event.target.value)}
                  className={`${errors.message ? inputErrorClass : inputClass} resize-none`}
                  placeholder={t.contact.form.messagePlaceholder}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? "contact-message-error" : undefined}
                />
                {errors.message && (
                  <p id="contact-message-error" className={errorTextClass}>
                    {errors.message}
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
              {status === "submitting" ? t.contact.form.sending : t.contact.form.send}
            </button>
          </form>
        </Reveal>
      )}
    </section>
  );
}
