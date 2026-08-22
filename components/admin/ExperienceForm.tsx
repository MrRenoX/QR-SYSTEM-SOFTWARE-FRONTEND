"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import FormField from "./FormField";
import { adminInputClass, adminPrimaryButtonClass, adminSecondaryButtonClass } from "@/lib/admin/formStyles";
import type { AdminCategory } from "@/types/admin/category";
import type { AdminExperience, ExperienceFormValues, ExperienceStatus, PricingOption, TimeSlot } from "@/types/admin/experience";

const STATUS_OPTIONS: ExperienceStatus[] = ["active", "inactive", "draft"];

function toLines(value: string[]): string {
  return value.join("\n");
}
function fromLines(value: string): string[] {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

interface PricingOptionDraft {
  key: string;
  value: string;
}

function toPricingDrafts(source?: AdminExperience): PricingOptionDraft[] {
  return (source?.pricingOptions ?? []).map((option) => ({
    key: option.key,
    value: option.value.toString(),
  }));
}

interface TimeSlotDraft {
  key: string;
  value: string;
}

function toSlotDrafts(source?: AdminExperience): TimeSlotDraft[] {
  return (source?.slots ?? []).map((slot) => ({ key: slot.key, value: slot.value }));
}

/** A stop's image is a real file upload (stop_image_<index>) — this draft holds the new File alongside the existing URL shown as a preview. */
interface StopDraft {
  name: string;
  duration: string;
  bestTime: string;
  description: string;
  fact: string;
  existingImage?: string;
  image?: File;
}

function toStopDrafts(source?: AdminExperience): StopDraft[] {
  return (source?.stops ?? []).map((stop) => ({
    name: stop.name,
    duration: stop.duration ?? "",
    bestTime: stop.bestTime ?? "",
    description: stop.description ?? "",
    fact: stop.fact ?? "",
    existingImage: stop.image || undefined,
  }));
}

function toDraft(source?: AdminExperience) {
  return {
    experienceCode: source?.experienceCode ?? "",
    slug: source?.slug ?? "",
    title: source?.title ?? "",
    shortDescription: source?.shortDescription ?? "",
    fullDescription: source?.fullDescription ?? "",
    categoryId: source?.category?.id?.toString() ?? "",
    location: source?.location ?? "",
    duration: source?.duration ?? "",
    groupSize: source?.groupSize ?? "",
    price: source?.price?.toString() ?? "",
    maxGuests: source?.maxGuests?.toString() ?? "",
    highlights: toLines(source?.highlights ?? []),
    included: toLines(source?.included ?? []),
    notIncluded: toLines(source?.notIncluded ?? []),
    bestTime: source?.bestTime ?? "",
    meetingPoint: source?.meetingPoint ?? "",
    routeSlug: source?.routeSlug ?? "",
    didYouKnow: source?.didYouKnow ?? "",
    featured: source?.featured ?? false,
    status: source?.status ?? ("draft" as ExperienceStatus),
  };
}

type Draft = ReturnType<typeof toDraft>;

interface ExperienceFormProps {
  experience?: AdminExperience;
  categories: AdminCategory[];
  onCancel: () => void;
  onSubmit: (values: ExperienceFormValues) => Promise<void>;
}

export default function ExperienceForm({ experience, categories, onCancel, onSubmit }: ExperienceFormProps) {
  const [draft, setDraft] = useState<Draft>(toDraft(experience));
  const [coverImage, setCoverImage] = useState<File | undefined>();
  const [galleryImages, setGalleryImages] = useState<File[]>([]);
  const [stops, setStops] = useState<StopDraft[]>(toStopDrafts(experience));
  const [pricingOptions, setPricingOptions] = useState<PricingOptionDraft[]>(toPricingDrafts(experience));
  const [slots, setSlots] = useState<TimeSlotDraft[]>(toSlotDrafts(experience));
  const [errors, setErrors] = useState<Partial<Record<keyof Draft, string>>>({});
  const [formError, setFormError] = useState<string | undefined>();
  const [submitting, setSubmitting] = useState(false);

  function update<K extends keyof Draft>(key: K, value: Draft[K]) {
    setDraft((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  }

  function addStop() {
    setStops((current) => [
      ...current,
      { name: "", duration: "", bestTime: "", description: "", fact: "" },
    ]);
  }

  function updateStop<K extends keyof StopDraft>(index: number, key: K, value: StopDraft[K]) {
    setStops((current) => current.map((stop, i) => (i === index ? { ...stop, [key]: value } : stop)));
  }

  function removeStop(index: number) {
    setStops((current) => current.filter((_, i) => i !== index));
  }

  function addPricingOption() {
    setPricingOptions((current) => [...current, { key: "", value: "" }]);
  }

  function updatePricingOption<K extends keyof PricingOptionDraft>(
    index: number,
    key: K,
    value: PricingOptionDraft[K],
  ) {
    setPricingOptions((current) =>
      current.map((option, i) => (i === index ? { ...option, [key]: value } : option)),
    );
  }

  function removePricingOption(index: number) {
    setPricingOptions((current) => current.filter((_, i) => i !== index));
  }

  function addSlot() {
    setSlots((current) => [...current, { key: "", value: "" }]);
  }

  function updateSlot<K extends keyof TimeSlotDraft>(index: number, key: K, value: TimeSlotDraft[K]) {
    setSlots((current) => current.map((slot, i) => (i === index ? { ...slot, [key]: value } : slot)));
  }

  function removeSlot(index: number) {
    setSlots((current) => current.filter((_, i) => i !== index));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    const nextErrors: Partial<Record<keyof Draft, string>> = {};
    if (draft.experienceCode.trim().length < 2) nextErrors.experienceCode = "Experience code is required.";
    if (draft.title.trim().length < 2) nextErrors.title = "Title is required.";
    if (!draft.categoryId) nextErrors.categoryId = "Choose a category.";
    if (!draft.price || Number.isNaN(Number(draft.price)) || Number(draft.price) < 0) {
      nextErrors.price = "Enter a valid price.";
    }
    if (!draft.maxGuests || Number.isNaN(Number(draft.maxGuests)) || Number(draft.maxGuests) <= 0) {
      nextErrors.maxGuests = "Enter a valid number of guests.";
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const nonEmptyPricingOptions = pricingOptions.filter(
      (option) => option.key.trim().length > 0 || option.value.trim().length > 0,
    );
    const invalidPricingOption = nonEmptyPricingOptions.find(
      (option) =>
        option.key.trim().length === 0 ||
        !option.value ||
        Number.isNaN(Number(option.value)) ||
        Number(option.value) < 0,
    );
    if (invalidPricingOption) {
      setFormError("Each pricing option needs a label and a valid price.");
      return;
    }

    const nonEmptySlots = slots.filter(
      (slot) => slot.key.trim().length > 0 || slot.value.trim().length > 0,
    );
    const invalidSlot = nonEmptySlots.find(
      (slot) => slot.key.trim().length === 0 || slot.value.trim().length === 0,
    );
    if (invalidSlot) {
      setFormError("Each slot needs a label and a time range.");
      return;
    }

    setFormError(undefined);
    setSubmitting(true);
    try {
      const pricingOptionInputs: PricingOption[] = nonEmptyPricingOptions.map((option) => ({
        key: option.key.trim(),
        value: Number(option.value),
      }));

      const slotInputs: TimeSlot[] = nonEmptySlots.map((slot) => ({
        key: slot.key.trim(),
        value: slot.value.trim(),
      }));

      const stopInputs: ExperienceFormValues["stops"] = stops
        .filter((stop) => stop.name.trim().length > 0)
        .map((stop, index) => ({
          order: index + 1,
          name: stop.name.trim(),
          duration: stop.duration.trim() || undefined,
          bestTime: stop.bestTime.trim() || undefined,
          description: stop.description.trim() || undefined,
          fact: stop.fact.trim() || undefined,
          existingImage: stop.existingImage,
          image: stop.image,
        }));

      await onSubmit({
        experienceCode: draft.experienceCode.trim(),
        title: draft.title.trim(),
        slug: draft.slug.trim(),
        categoryId: draft.categoryId ? Number(draft.categoryId) : null,
        shortDescription: draft.shortDescription.trim(),
        fullDescription: draft.fullDescription.trim(),
        duration: draft.duration.trim(),
        groupSize: draft.groupSize.trim(),
        maxGuests: Number(draft.maxGuests),
        bestTime: draft.bestTime.trim(),
        price: Number(draft.price),
        pricingOptions: pricingOptionInputs,
        slots: slotInputs,
        location: draft.location.trim(),
        meetingPoint: draft.meetingPoint.trim(),
        routeSlug: draft.routeSlug.trim(),
        highlights: fromLines(draft.highlights),
        included: fromLines(draft.included),
        notIncluded: fromLines(draft.notIncluded),
        didYouKnow: draft.didYouKnow.trim(),
        stops: stopInputs,
        featured: draft.featured,
        status: draft.status,
        coverImage,
        galleryImages: galleryImages.length > 0 ? galleryImages : undefined,
      });
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form id="experience-form" onSubmit={handleSubmit} noValidate className="space-y-4">
      {formError && (
        <p className="rounded-xl border border-rose-200 bg-rose-50 px-3.5 py-2.5 text-[13px] text-rose-700">
          {formError}
        </p>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField label="Experience Code" htmlFor="exp-code" required error={errors.experienceCode} hint="Unique, e.g. EXP-1001">
          <input
            id="exp-code"
            value={draft.experienceCode}
            onChange={(event) => update("experienceCode", event.target.value)}
            className={adminInputClass}
          />
        </FormField>
        <FormField label="Name" htmlFor="exp-title" required error={errors.title}>
          <input
            id="exp-title"
            value={draft.title}
            onChange={(event) => update("title", event.target.value)}
            className={adminInputClass}
          />
        </FormField>
      </div>

      <FormField label="Slug" htmlFor="exp-slug" hint="Leave empty to auto-generate from the name.">
        <input
          id="exp-slug"
          value={draft.slug}
          onChange={(event) => update("slug", event.target.value)}
          className={adminInputClass}
        />
      </FormField>

      <FormField label="Short Description" htmlFor="exp-short">
        <textarea
          id="exp-short"
          rows={2}
          value={draft.shortDescription}
          onChange={(event) => update("shortDescription", event.target.value)}
          className={`${adminInputClass} resize-none`}
        />
      </FormField>

      <FormField label="Full Description" htmlFor="exp-full">
        <textarea
          id="exp-full"
          rows={3}
          value={draft.fullDescription}
          onChange={(event) => update("fullDescription", event.target.value)}
          className={`${adminInputClass} resize-none`}
        />
      </FormField>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField label="Category" htmlFor="exp-category" required error={errors.categoryId}>
          <select
            id="exp-category"
            value={draft.categoryId}
            onChange={(event) => update("categoryId", event.target.value)}
            className={adminInputClass}
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </FormField>
        <FormField label="Location" htmlFor="exp-location">
          <input
            id="exp-location"
            value={draft.location}
            onChange={(event) => update("location", event.target.value)}
            className={adminInputClass}
          />
        </FormField>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <FormField label="Duration" htmlFor="exp-duration">
          <input
            id="exp-duration"
            value={draft.duration}
            onChange={(event) => update("duration", event.target.value)}
            className={adminInputClass}
            placeholder="2 – 3 hrs"
          />
        </FormField>
        <FormField label="Price (₹)" htmlFor="exp-price" required error={errors.price}>
          <input
            id="exp-price"
            type="number"
            min={0}
            value={draft.price}
            onChange={(event) => update("price", event.target.value)}
            className={adminInputClass}
          />
        </FormField>
        <FormField label="Max Guests" htmlFor="exp-guests" required error={errors.maxGuests}>
          <input
            id="exp-guests"
            type="number"
            min={1}
            value={draft.maxGuests}
            onChange={(event) => update("maxGuests", event.target.value)}
            className={adminInputClass}
          />
        </FormField>
        <FormField label="Status" htmlFor="exp-status">
          <select
            id="exp-status"
            value={draft.status}
            onChange={(event) => update("status", event.target.value as ExperienceStatus)}
            className={adminInputClass}
          >
            {STATUS_OPTIONS.map((status) => (
              <option key={status} value={status} className="capitalize">
                {status}
              </option>
            ))}
          </select>
        </FormField>
      </div>

      <FormField label="Group Size" htmlFor="exp-group-size" hint='e.g. "2 – 10 People"'>
        <input
          id="exp-group-size"
          value={draft.groupSize}
          onChange={(event) => update("groupSize", event.target.value)}
          className={adminInputClass}
        />
      </FormField>

      <div className="border-t border-admin-border pt-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-[13.5px] font-semibold text-admin-text">Pricing Options</h3>
            <p className="text-[11.5px] text-admin-muted">
              Optional tiered/group pricing (e.g. &ldquo;Group 1-6 (flat)&rdquo;, &ldquo;Per person min. 4 pax&rdquo;) shown on the experience page alongside the &ldquo;Starting from&rdquo; price above.
            </p>
          </div>
          <button
            type="button"
            onClick={addPricingOption}
            className="flex items-center gap-1 rounded-lg border border-admin-border px-2.5 py-1.5 text-[12.5px] font-semibold text-admin-text hover:bg-admin-bg"
          >
            <Plus size={14} aria-hidden="true" />
            Add tier
          </button>
        </div>

        {pricingOptions.length === 0 ? (
          <p className="mt-3 rounded-xl border border-dashed border-admin-border px-3.5 py-4 text-center text-[12.5px] text-admin-muted">
            No pricing tiers yet.
          </p>
        ) : (
          <div className="mt-3 space-y-2.5">
            {pricingOptions.map((option, index) => (
              <div key={index} className="flex items-start gap-2">
                <FormField label="Label" htmlFor={`pricing-key-${index}`} className="flex-1">
                  <input
                    id={`pricing-key-${index}`}
                    value={option.key}
                    onChange={(event) => updatePricingOption(index, "key", event.target.value)}
                    className={adminInputClass}
                    placeholder="Group 1-6 (flat)"
                  />
                </FormField>
                <FormField label="Price (₹)" htmlFor={`pricing-value-${index}`} className="w-32 shrink-0">
                  <input
                    id={`pricing-value-${index}`}
                    type="number"
                    min={0}
                    value={option.value}
                    onChange={(event) => updatePricingOption(index, "value", event.target.value)}
                    className={adminInputClass}
                  />
                </FormField>
                <button
                  type="button"
                  onClick={() => removePricingOption(index)}
                  aria-label={`Remove pricing tier ${index + 1}`}
                  className="mt-6 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-rose-500 hover:bg-rose-50"
                >
                  <Trash2 size={15} aria-hidden="true" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="border-t border-admin-border pt-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-[13.5px] font-semibold text-admin-text">Slots</h3>
            <p className="text-[11.5px] text-admin-muted">
              Bookable time windows (e.g. &ldquo;Morning&rdquo;, &ldquo;6:00 AM - 8:00 AM&rdquo;) — shown on the experience page and offered as choices in the booking form.
            </p>
          </div>
          <button
            type="button"
            onClick={addSlot}
            className="flex items-center gap-1 rounded-lg border border-admin-border px-2.5 py-1.5 text-[12.5px] font-semibold text-admin-text hover:bg-admin-bg"
          >
            <Plus size={14} aria-hidden="true" />
            Add slot
          </button>
        </div>

        {slots.length === 0 ? (
          <p className="mt-3 rounded-xl border border-dashed border-admin-border px-3.5 py-4 text-center text-[12.5px] text-admin-muted">
            No slots yet.
          </p>
        ) : (
          <div className="mt-3 space-y-2.5">
            {slots.map((slot, index) => (
              <div key={index} className="flex items-start gap-2">
                <FormField label="Label" htmlFor={`slot-key-${index}`} className="w-32 shrink-0">
                  <input
                    id={`slot-key-${index}`}
                    value={slot.key}
                    onChange={(event) => updateSlot(index, "key", event.target.value)}
                    className={adminInputClass}
                    placeholder="Morning"
                  />
                </FormField>
                <FormField label="Time range" htmlFor={`slot-value-${index}`} className="flex-1">
                  <input
                    id={`slot-value-${index}`}
                    value={slot.value}
                    onChange={(event) => updateSlot(index, "value", event.target.value)}
                    className={adminInputClass}
                    placeholder="6:00 AM - 8:00 AM"
                  />
                </FormField>
                <button
                  type="button"
                  onClick={() => removeSlot(index)}
                  aria-label={`Remove slot ${index + 1}`}
                  className="mt-6 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-rose-500 hover:bg-rose-50"
                >
                  <Trash2 size={15} aria-hidden="true" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField
          label="Cover Image"
          htmlFor="exp-cover"
          hint={experience?.coverImage ? "Leave empty to keep the current image." : "PNG, JPG or WEBP, max 5MB."}
        >
          {experience?.coverImage && !coverImage && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={experience.coverImage}
              alt=""
              className="mb-2 h-16 w-16 rounded-lg border border-admin-border object-cover"
            />
          )}
          <input
            id="exp-cover"
            type="file"
            accept="image/png,image/jpeg,image/webp"
            onChange={(event) => setCoverImage(event.target.files?.[0])}
            className={adminInputClass}
          />
        </FormField>
        <FormField
          label="Gallery Images"
          htmlFor="exp-gallery"
          hint={experience?.galleryImages?.length ? "Selecting files replaces the entire existing gallery." : "PNG, JPG or WEBP, max 5MB each."}
        >
          <input
            id="exp-gallery"
            type="file"
            accept="image/png,image/jpeg,image/webp"
            multiple
            onChange={(event) => setGalleryImages(Array.from(event.target.files ?? []))}
            className={adminInputClass}
          />
        </FormField>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <FormField label="Highlights" htmlFor="exp-highlights" hint="One per line.">
          <textarea
            id="exp-highlights"
            rows={3}
            value={draft.highlights}
            onChange={(event) => update("highlights", event.target.value)}
            className={`${adminInputClass} resize-none`}
          />
        </FormField>
        <FormField label="Included" htmlFor="exp-included" hint="One per line.">
          <textarea
            id="exp-included"
            rows={3}
            value={draft.included}
            onChange={(event) => update("included", event.target.value)}
            className={`${adminInputClass} resize-none`}
          />
        </FormField>
        <FormField label="Not Included" htmlFor="exp-not-included" hint="One per line.">
          <textarea
            id="exp-not-included"
            rows={3}
            value={draft.notIncluded}
            onChange={(event) => update("notIncluded", event.target.value)}
            className={`${adminInputClass} resize-none`}
          />
        </FormField>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <FormField label="Best Time" htmlFor="exp-best-time">
          <input
            id="exp-best-time"
            value={draft.bestTime}
            onChange={(event) => update("bestTime", event.target.value)}
            className={adminInputClass}
          />
        </FormField>
        <FormField label="Meeting Point" htmlFor="exp-meeting-point">
          <input
            id="exp-meeting-point"
            value={draft.meetingPoint}
            onChange={(event) => update("meetingPoint", event.target.value)}
            className={adminInputClass}
          />
        </FormField>
        <FormField label="Route Slug" htmlFor="exp-route" hint="Journey-map route slug, if any.">
          <input
            id="exp-route"
            value={draft.routeSlug}
            onChange={(event) => update("routeSlug", event.target.value)}
            className={adminInputClass}
          />
        </FormField>
      </div>

      <FormField label="Did You Know" htmlFor="exp-did-you-know">
        <textarea
          id="exp-did-you-know"
          rows={2}
          value={draft.didYouKnow}
          onChange={(event) => update("didYouKnow", event.target.value)}
          className={`${adminInputClass} resize-none`}
        />
      </FormField>

      <div className="border-t border-admin-border pt-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-[13.5px] font-semibold text-admin-text">Stops (along the way)</h3>
            <p className="text-[11.5px] text-admin-muted">
              Shown as the journey map and &ldquo;Along the way&rdquo; cards on the experience page.
            </p>
          </div>
          <button
            type="button"
            onClick={addStop}
            className="flex items-center gap-1 rounded-lg border border-admin-border px-2.5 py-1.5 text-[12.5px] font-semibold text-admin-text hover:bg-admin-bg"
          >
            <Plus size={14} aria-hidden="true" />
            Add stop
          </button>
        </div>

        {stops.length === 0 ? (
          <p className="mt-3 rounded-xl border border-dashed border-admin-border px-3.5 py-4 text-center text-[12.5px] text-admin-muted">
            No stops yet.
          </p>
        ) : (
          <div className="mt-3 space-y-3">
            {stops.map((stop, index) => (
              <div key={index} className="rounded-xl border border-admin-border p-3.5">
                <div className="flex items-start justify-between gap-2">
                  <span className="mt-2 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-admin-bg text-[11px] font-bold text-admin-muted">
                    {index + 1}
                  </span>
                  <div className="grid min-w-0 flex-1 grid-cols-1 gap-3 sm:grid-cols-2">
                    <FormField label="Name" htmlFor={`stop-name-${index}`}>
                      <input
                        id={`stop-name-${index}`}
                        value={stop.name}
                        onChange={(event) => updateStop(index, "name", event.target.value)}
                        className={adminInputClass}
                      />
                    </FormField>
                    <div className="grid grid-cols-2 gap-3">
                      <FormField label="Duration" htmlFor={`stop-duration-${index}`}>
                        <input
                          id={`stop-duration-${index}`}
                          value={stop.duration}
                          onChange={(event) => updateStop(index, "duration", event.target.value)}
                          className={adminInputClass}
                          placeholder="15 – 20 min"
                        />
                      </FormField>
                      <FormField label="Best Time" htmlFor={`stop-best-time-${index}`}>
                        <input
                          id={`stop-best-time-${index}`}
                          value={stop.bestTime}
                          onChange={(event) => updateStop(index, "bestTime", event.target.value)}
                          className={adminInputClass}
                        />
                      </FormField>
                    </div>
                    <FormField label="Description" htmlFor={`stop-description-${index}`} className="sm:col-span-2">
                      <textarea
                        id={`stop-description-${index}`}
                        rows={2}
                        value={stop.description}
                        onChange={(event) => updateStop(index, "description", event.target.value)}
                        className={`${adminInputClass} resize-none`}
                      />
                    </FormField>
                    <FormField label="Did You Know (fact)" htmlFor={`stop-fact-${index}`} className="sm:col-span-2">
                      <textarea
                        id={`stop-fact-${index}`}
                        rows={2}
                        value={stop.fact}
                        onChange={(event) => updateStop(index, "fact", event.target.value)}
                        className={`${adminInputClass} resize-none`}
                      />
                    </FormField>
                    <FormField
                      label="Image"
                      htmlFor={`stop-image-${index}`}
                      className="sm:col-span-2"
                      hint={stop.existingImage ? "Leave empty to keep the current image." : undefined}
                    >
                      {stop.existingImage && !stop.image && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={stop.existingImage}
                          alt=""
                          className="mb-2 h-14 w-14 rounded-lg border border-admin-border object-cover"
                        />
                      )}
                      <input
                        id={`stop-image-${index}`}
                        type="file"
                        accept="image/png,image/jpeg,image/webp"
                        onChange={(event) => updateStop(index, "image", event.target.files?.[0])}
                        className={adminInputClass}
                      />
                    </FormField>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeStop(index)}
                    aria-label={`Remove stop ${index + 1}`}
                    className="mt-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-rose-500 hover:bg-rose-50"
                  >
                    <Trash2 size={15} aria-hidden="true" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <label className="flex items-center gap-2 text-[13px] font-medium text-admin-text">
        <input
          type="checkbox"
          checked={draft.featured}
          onChange={(event) => update("featured", event.target.checked)}
          className="h-4 w-4 rounded border-admin-border text-admin-accent focus:ring-admin-accent/30"
        />
        Featured experience
      </label>

      <div className="flex justify-end gap-2.5 border-t border-admin-border pt-4">
        <button type="button" onClick={onCancel} className={adminSecondaryButtonClass}>
          Cancel
        </button>
        <button type="submit" disabled={submitting} className={adminPrimaryButtonClass}>
          {submitting ? "Saving…" : experience ? "Save Changes" : "Add Experience"}
        </button>
      </div>
    </form>
  );
}
