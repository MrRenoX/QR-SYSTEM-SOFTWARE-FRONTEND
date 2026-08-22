"use client";

import { useState } from "react";
import FormField from "./FormField";
import { adminInputClass, adminPrimaryButtonClass, adminSecondaryButtonClass } from "@/lib/admin/formStyles";
import type { AdminFAQ, FAQFormValues, FAQStatus } from "@/types/admin/faq";

interface FAQFormProps {
  faq?: AdminFAQ;
  categories: string[];
  onCancel: () => void;
  onSubmit: (values: FAQFormValues) => Promise<void>;
}

export default function FAQForm({ faq, categories, onCancel, onSubmit }: FAQFormProps) {
  const [category, setCategory] = useState(faq?.category ?? categories[0] ?? "");
  const [question, setQuestion] = useState(faq?.question ?? "");
  const [answer, setAnswer] = useState(faq?.answer ?? "");
  const [displayOrder, setDisplayOrder] = useState(faq?.displayOrder.toString() ?? "1");
  const [status, setStatus] = useState<FAQStatus>(faq?.status ?? "active");
  const [error, setError] = useState<string | undefined>();
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    if (category.trim().length < 2 || question.trim().length < 2 || answer.trim().length < 2) {
      setError("Category, question and answer are all required.");
      return;
    }
    setError(undefined);
    setSubmitting(true);
    try {
      await onSubmit({
        category: category.trim(),
        question: question.trim(),
        answer: answer.trim(),
        displayOrder: Number(displayOrder) || 1,
        status,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {error && (
        <p className="rounded-xl border border-rose-200 bg-rose-50 px-3.5 py-2.5 text-[13px] text-rose-700">{error}</p>
      )}

      <FormField label="Category" htmlFor="faq-category" required hint="Groups FAQs into sections on the public page.">
        <input
          id="faq-category"
          list="faq-category-options"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          className={adminInputClass}
          placeholder="Booking"
        />
        <datalist id="faq-category-options">
          {categories.map((item) => (
            <option key={item} value={item} />
          ))}
        </datalist>
      </FormField>

      <FormField label="Question" htmlFor="faq-question" required>
        <input id="faq-question" value={question} onChange={(event) => setQuestion(event.target.value)} className={adminInputClass} />
      </FormField>

      <FormField label="Answer" htmlFor="faq-answer" required>
        <textarea
          id="faq-answer"
          rows={4}
          value={answer}
          onChange={(event) => setAnswer(event.target.value)}
          className={`${adminInputClass} resize-none`}
        />
      </FormField>

      <div className="grid grid-cols-2 gap-4">
        <FormField label="Display Order" htmlFor="faq-order" hint="Order within its category.">
          <input
            id="faq-order"
            type="number"
            min={1}
            value={displayOrder}
            onChange={(event) => setDisplayOrder(event.target.value)}
            className={adminInputClass}
          />
        </FormField>
        <FormField label="Status" htmlFor="faq-status">
          <select id="faq-status" value={status} onChange={(event) => setStatus(event.target.value as FAQStatus)} className={adminInputClass}>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </FormField>
      </div>

      <div className="flex justify-end gap-2.5 border-t border-admin-border pt-4">
        <button type="button" onClick={onCancel} className={adminSecondaryButtonClass}>
          Cancel
        </button>
        <button type="submit" disabled={submitting} className={adminPrimaryButtonClass}>
          {submitting ? "Saving…" : faq ? "Save Changes" : "Add FAQ"}
        </button>
      </div>
    </form>
  );
}
