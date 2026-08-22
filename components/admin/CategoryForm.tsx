"use client";

import { useState } from "react";
import FormField from "./FormField";
import { adminInputClass, adminPrimaryButtonClass, adminSecondaryButtonClass } from "@/lib/admin/formStyles";
import type { AdminCategory, CategoryFormValues, CategoryStatus } from "@/types/admin/category";

interface CategoryFormProps {
  category?: AdminCategory;
  onCancel: () => void;
  onSubmit: (values: CategoryFormValues) => Promise<void>;
}

export default function CategoryForm({ category, onCancel, onSubmit }: CategoryFormProps) {
  const [name, setName] = useState(category?.name ?? "");
  const [description, setDescription] = useState(category?.description ?? "");
  const [displayOrder, setDisplayOrder] = useState(category?.displayOrder.toString() ?? "1");
  const [status, setStatus] = useState<CategoryStatus>(category?.status ?? "active");
  const [image, setImage] = useState<File | undefined>();
  const [error, setError] = useState<string | undefined>();
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    if (name.trim().length < 2) {
      setError("Name must be at least 2 characters.");
      return;
    }
    setError(undefined);
    setSubmitting(true);
    try {
      await onSubmit({
        name: name.trim(),
        description: description.trim(),
        displayOrder: Number(displayOrder) || 1,
        status,
        image,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <FormField label="Name" htmlFor="cat-name" required error={error}>
        <input id="cat-name" value={name} onChange={(event) => setName(event.target.value)} className={adminInputClass} />
      </FormField>
      <FormField label="Description" htmlFor="cat-description">
        <textarea
          id="cat-description"
          rows={3}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          className={`${adminInputClass} resize-none`}
        />
      </FormField>
      <div className="grid grid-cols-2 gap-4">
        <FormField label="Display Order" htmlFor="cat-order">
          <input
            id="cat-order"
            type="number"
            min={1}
            value={displayOrder}
            onChange={(event) => setDisplayOrder(event.target.value)}
            className={adminInputClass}
          />
        </FormField>
        <FormField label="Status" htmlFor="cat-status">
          <select
            id="cat-status"
            value={status}
            onChange={(event) => setStatus(event.target.value as CategoryStatus)}
            className={adminInputClass}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </FormField>
      </div>
      <FormField
        label="Cover Image"
        htmlFor="cat-image"
        hint={category ? "Leave empty to keep the current image. PNG, JPG or WEBP, max 5MB." : "PNG, JPG or WEBP, max 5MB."}
      >
        {category?.coverImage && !image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={category.coverImage}
            alt=""
            className="mb-2 h-20 w-20 rounded-lg border border-admin-border object-cover"
          />
        )}
        <input
          id="cat-image"
          type="file"
          accept="image/png,image/jpeg,image/webp"
          onChange={(event) => setImage(event.target.files?.[0])}
          className={adminInputClass}
        />
      </FormField>
      <div className="flex justify-end gap-2.5 border-t border-admin-border pt-4">
        <button type="button" onClick={onCancel} className={adminSecondaryButtonClass}>
          Cancel
        </button>
        <button type="submit" disabled={submitting} className={adminPrimaryButtonClass}>
          {submitting ? "Saving…" : category ? "Save Changes" : "Add Category"}
        </button>
      </div>
    </form>
  );
}
