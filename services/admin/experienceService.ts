import { apiClient, isApiConfigured } from "../apiClient";
import { getCurrentSession } from "./authService";
import { adminExperiences } from "@/data/admin/experiences";
import type {
  AdminExperience,
  AdminExperienceStop,
  ExperienceFormValues,
  ExperienceStatus,
} from "@/types/admin/experience";

let mockStore = [...adminExperiences];

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

/** The Flask API wraps every response in this envelope — see BACKEND_GUIDE.md. */
interface ApiEnvelope<T> {
  success: boolean;
  message: string;
  data: T;
}

interface ExperienceApiResponse {
  id: number;
  experience_code: string;
  slug: string;
  title: string;
  category: { id: number; name: string } | null;
  short_description: string | null;
  full_description: string | null;
  cover_image: string | null;
  gallery_images: string[];
  duration: string | null;
  group_size: string | null;
  max_guests: number | null;
  best_time: string | null;
  price: number;
  pricing_options: { key: string; value: number }[] | null;
  slots: { key: string; value: string }[] | null;
  location: string | null;
  meeting_point: string | null;
  highlights: string[];
  included: string[];
  not_included: string[];
  did_you_know: string | null;
  route_slug: string | null;
  stops: AdminExperienceStop[];
  featured: boolean;
  status: ExperienceStatus;
  updated_at: string;
}

function mapExperience(raw: ExperienceApiResponse): AdminExperience {
  return {
    id: raw.id,
    experienceCode: raw.experience_code,
    slug: raw.slug,
    title: raw.title,
    category: raw.category,
    shortDescription: raw.short_description ?? "",
    fullDescription: raw.full_description ?? "",
    duration: raw.duration ?? "",
    groupSize: raw.group_size ?? "",
    maxGuests: raw.max_guests ?? 0,
    bestTime: raw.best_time ?? "",
    price: raw.price,
    pricingOptions: raw.pricing_options ?? [],
    slots: raw.slots ?? [],
    location: raw.location ?? "",
    meetingPoint: raw.meeting_point ?? "",
    highlights: raw.highlights ?? [],
    included: raw.included ?? [],
    notIncluded: raw.not_included ?? [],
    didYouKnow: raw.did_you_know ?? "",
    routeSlug: raw.route_slug ?? "",
    stops: raw.stops ?? [],
    coverImage: raw.cover_image,
    galleryImages: raw.gallery_images ?? [],
    featured: raw.featured,
    status: raw.status,
    updatedAt: raw.updated_at,
  };
}

/** Mock-mode only: stop inputs carry a File (or nothing) for their image, never a URL — preserve existing image URLs when no new file is uploaded. */
function toMockStops(stops: ExperienceFormValues["stops"]): AdminExperienceStop[] {
  return stops.map(({ image, existingImage, ...stop }) => ({
    ...stop,
    duration: stop.duration ?? "",
    image: image ? "mock-image-placeholder.jpg" : (existingImage ?? ""),
  }));
}

function authHeaders(): Record<string, string> {
  const session = getCurrentSession();
  return session ? { Authorization: `Bearer ${session.token}` } : {};
}

function buildFormData(values: ExperienceFormValues): FormData {
  const form = new FormData();
  form.append("experience_code", values.experienceCode);
  form.append("title", values.title);
  if (values.categoryId != null) form.append("category_id", String(values.categoryId));
  form.append("price", String(values.price));
  form.append("pricing_options", JSON.stringify(values.pricingOptions ?? []));
  form.append("slots", JSON.stringify(values.slots ?? []));
  if (values.slug) form.append("slug", values.slug);
  if (values.routeSlug) form.append("route_slug", values.routeSlug);
  form.append("short_description", values.shortDescription);
  form.append("full_description", values.fullDescription);
  form.append("duration", values.duration);
  form.append("group_size", values.groupSize);
  form.append("max_guests", String(values.maxGuests));
  form.append("best_time", values.bestTime);
  form.append("location", values.location);
  form.append("meeting_point", values.meetingPoint);
  form.append("highlights", JSON.stringify(values.highlights));
  form.append("included", JSON.stringify(values.included));
  form.append("not_included", JSON.stringify(values.notIncluded));
  // Stops carry no "image" or "existingImage" URL — each stop's image is its own file (stop_image_<index>,
  // index-matched to this array), which the backend saves and fills in itself.
  form.append(
    "stops",
    JSON.stringify(values.stops.map(({ image, existingImage, ...stop }) => stop)),
  );
  values.stops.forEach((stop, index) => {
    if (stop.image) form.append(`stop_image_${index}`, stop.image);
  });
  form.append("did_you_know", values.didYouKnow);
  form.append("featured", String(values.featured));
  form.append("status", values.status);
  if (values.coverImage) form.append("cover_image", values.coverImage);
  if (values.galleryImages) {
    for (const file of values.galleryImages) form.append("gallery_images", file);
  }
  return form;
}

/**
 * Admin experience list. NOTE: the backend only exposes GET /api/v1/experience,
 * which returns `active`-status experiences only (see BACKEND_GUIDE.md) — there
 * is no admin-only "list all" endpoint. New experiences default to `draft` and
 * anything set to `inactive`/`draft` will not appear in this table until the
 * backend adds one.
 */
export async function getExperiences(): Promise<AdminExperience[]> {
  if (!isApiConfigured()) return mockStore;

  const result = await apiClient.get<ApiEnvelope<ExperienceApiResponse[]>>("/api/v1/experience");
  if (!result.ok) return [];
  return result.data.data.map(mapExperience);
}

export async function getExperienceById(id: number): Promise<AdminExperience | undefined> {
  if (!isApiConfigured()) return mockStore.find((item) => item.id === id);

  const result = await apiClient.get<ApiEnvelope<ExperienceApiResponse>>(`/api/v1/experience/${id}`);
  if (!result.ok) return undefined;
  return mapExperience(result.data.data);
}

export async function createExperience(values: ExperienceFormValues): Promise<AdminExperience> {
  if (!isApiConfigured()) {
    const created: AdminExperience = {
      id: Date.now(),
      experienceCode: values.experienceCode,
      slug: values.slug || values.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      title: values.title,
      category: null,
      shortDescription: values.shortDescription,
      fullDescription: values.fullDescription,
      duration: values.duration,
      groupSize: values.groupSize,
      maxGuests: values.maxGuests,
      bestTime: values.bestTime,
      price: values.price,
      pricingOptions: values.pricingOptions ?? [],
      slots: values.slots ?? [],
      location: values.location,
      meetingPoint: values.meetingPoint,
      highlights: values.highlights,
      included: values.included,
      notIncluded: values.notIncluded,
      didYouKnow: values.didYouKnow,
      routeSlug: values.routeSlug,
      stops: toMockStops(values.stops),
      coverImage: null,
      galleryImages: [],
      featured: values.featured,
      status: values.status,
      updatedAt: todayIso(),
    };
    mockStore = [created, ...mockStore];
    return created;
  }

  const result = await apiClient.post<ApiEnvelope<ExperienceApiResponse>>(
    "/api/v1/admin/experience",
    buildFormData(values),
    { headers: authHeaders() },
  );
  if (!result.ok) throw new Error(result.message);
  return mapExperience(result.data.data);
}

export async function updateExperience(
  id: number,
  values: ExperienceFormValues,
): Promise<AdminExperience | undefined> {
  if (!isApiConfigured()) {
    let updated: AdminExperience | undefined;
    mockStore = mockStore.map((item) => {
      if (item.id !== id) return item;
      updated = {
        ...item,
        experienceCode: values.experienceCode,
        title: values.title,
        shortDescription: values.shortDescription,
        fullDescription: values.fullDescription,
        duration: values.duration,
        groupSize: values.groupSize,
        maxGuests: values.maxGuests,
        bestTime: values.bestTime,
        price: values.price,
        pricingOptions: values.pricingOptions ?? [],
        slots: values.slots ?? [],
        location: values.location,
        meetingPoint: values.meetingPoint,
        highlights: values.highlights,
        included: values.included,
        notIncluded: values.notIncluded,
        didYouKnow: values.didYouKnow,
        routeSlug: values.routeSlug,
        stops: toMockStops(values.stops),
        featured: values.featured,
        status: values.status,
        updatedAt: todayIso(),
      };
      return updated;
    });
    return updated;
  }

  const result = await apiClient.put<ApiEnvelope<ExperienceApiResponse>>(
    `/api/v1/admin/experience/${id}`,
    buildFormData(values),
    { headers: authHeaders() },
  );
  if (!result.ok) throw new Error(result.message);
  return mapExperience(result.data.data);
}

export async function duplicateExperience(id: number): Promise<AdminExperience | undefined> {
  const source = await getExperienceById(id);
  if (!source) return undefined;

  return createExperience({
    experienceCode: `${source.experienceCode}-COPY-${Date.now().toString().slice(-5)}`,
    title: `${source.title} (Copy)`,
    slug: `${source.slug}-copy`,
    categoryId: source.category?.id ?? null,
    shortDescription: source.shortDescription,
    fullDescription: source.fullDescription,
    duration: source.duration,
    groupSize: source.groupSize,
    maxGuests: source.maxGuests,
    bestTime: source.bestTime,
    price: source.price,
    pricingOptions: source.pricingOptions,
    slots: source.slots,
    location: source.location,
    meetingPoint: source.meetingPoint,
    routeSlug: source.routeSlug,
    highlights: source.highlights,
    included: source.included,
    notIncluded: source.notIncluded,
    didYouKnow: source.didYouKnow,
    stops: source.stops.map(({ image, ...stop }) => stop),
    featured: false,
    status: "draft",
  });
}

export async function setExperienceStatus(id: number, status: ExperienceStatus): Promise<void> {
  if (!isApiConfigured()) {
    mockStore = mockStore.map((item) =>
      item.id === id ? { ...item, status, updatedAt: todayIso() } : item,
    );
    return;
  }

  const form = new FormData();
  form.append("status", status);
  const result = await apiClient.patch<ApiEnvelope<ExperienceApiResponse>>(
    `/api/v1/admin/experience/${id}`,
    form,
    { headers: authHeaders() },
  );
  if (!result.ok) throw new Error(result.message);
}

export async function deleteExperience(id: number): Promise<void> {
  if (!isApiConfigured()) {
    mockStore = mockStore.filter((item) => item.id !== id);
    return;
  }

  const result = await apiClient.delete<ApiEnvelope<null>>(`/api/v1/admin/experience/${id}`, {
    headers: authHeaders(),
  });
  if (!result.ok) throw new Error(result.message);
}
