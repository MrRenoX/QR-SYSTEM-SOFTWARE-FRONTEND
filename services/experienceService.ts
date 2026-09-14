import { apiClient, isApiConfigured, resolveBaseUrl } from "./apiClient";
import { getPublicCategories } from "./categoryService";
import { CATEGORIES, experiences } from "@/data/experiences";
import { getJourneyRoute, getTouchpoints } from "@/data/touchpoints";
import type { Experience, ExperienceStop, FilterName } from "@/lib/types";

/**
 * Single seam between the UI and the data source — see BACKEND_GUIDE.md
 * (Experience API) for the wire shapes this maps from.
 */

interface ApiEnvelope<T> {
  success: boolean;
  message: string;
  data: T;
}

/**
 * Convert relative image paths to absolute URLs using the API base URL.
 * Backend returns stop images as relative paths (e.g., `/images/touchpoints/...`),
 * but the Image component needs absolute URLs. This normalizes them.
 * Returns null for missing/empty images to avoid empty src attributes.
 */
function toAbsoluteImageUrl(imageUrl: string | null | undefined): string | null {
  if (!imageUrl) return null;
  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    return imageUrl; // Already absolute
  }
  if (imageUrl.startsWith("/")) {
    const baseUrl = resolveBaseUrl();
    return baseUrl ? `${baseUrl}${imageUrl}` : imageUrl;
  }
  return imageUrl;
}

interface ExperienceApiStop {
  order: number;
  name: string;
  duration: string;
  image: string;
  description?: string;
  bestTime?: string;
  fact?: string;
  gallery?: string[];
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
  stops: ExperienceApiStop[];
  featured: boolean;
  status: "active" | "inactive" | "draft";
  created_at: string;
  updated_at: string;
}

function formatPrice(value: number): string {
  return `₹${value.toLocaleString("en-IN")}`;
}

function mapExperience(raw: ExperienceApiResponse): Experience {
  return {
    id: raw.id,
    experienceCode: raw.experience_code,
    slug: raw.slug,
    category: raw.category?.name ?? "",
    title: raw.title,
    description: raw.short_description ?? "",
    longDescription: raw.full_description ?? undefined,
    image: raw.cover_image ?? "",
    galleryImages: raw.gallery_images,
    duration: raw.duration ?? "",
    groupSize: raw.group_size ?? "",
    bestTime: raw.best_time ?? "",
    price: formatPrice(raw.price),
    pricingOptions: raw.pricing_options ?? [],
    slots: raw.slots ?? [],
    included: raw.included,
    notIncluded: raw.not_included,
    didYouKnow: raw.did_you_know ?? undefined,
    routeSlug: raw.route_slug ?? undefined,
    stops: (raw.stops ?? []).map((stop) => ({
      order: stop.order,
      name: stop.name,
      duration: stop.duration,
      image: toAbsoluteImageUrl(stop.image),
      description: stop.description,
      bestTime: stop.bestTime,
      fact: stop.fact,
      gallery: stop.gallery?.map(toAbsoluteImageUrl),
    })),
  };
}

/** Combines the two separate mock data files (journey + touchpoint detail) into the unified `stops` shape the real API returns. */
function mockStopsFor(slug: string): ExperienceStop[] {
  const journey = getJourneyRoute(slug);
  const detail = getTouchpoints(slug);
  return journey.map((stop) => {
    const match = detail.find((touchpoint) => touchpoint.name === stop.name);
    return {
      order: stop.order,
      name: stop.name,
      duration: stop.duration,
      image: stop.image,
      description: match?.description,
      bestTime: match?.bestTime,
      fact: match?.fact,
      gallery: match?.gallery,
    };
  });
}

function mockExperiences(): Experience[] {
  return experiences.map((experience) => ({
    ...experience,
    stops: mockStopsFor(experience.slug),
  }));
}

export async function getExperiences(): Promise<Experience[]> {
  if (!isApiConfigured()) return mockExperiences();

  const result = await apiClient.get<ApiEnvelope<ExperienceApiResponse[]>>("/api/v1/experience");
  if (!result.ok) return [];
  return result.data.data.map(mapExperience);
}

/** There's no get-by-slug endpoint — only get-by-id — so this matches against the (active-only) list. */
export async function getExperienceBySlug(
  slug: string,
): Promise<Experience | undefined> {
  const all = await getExperiences();
  return all.find((experience) => experience.slug === slug);
}

export async function getExperiencesByCategory(
  category: FilterName,
): Promise<Experience[]> {
  const all = await getExperiences();
  if (category === "All") return all;
  return all.filter((experience) => experience.category === category);
}

export async function getCategories(): Promise<FilterName[]> {
  if (!isApiConfigured()) return CATEGORIES;
  const categories = await getPublicCategories();
  return ["All", ...categories.map((category) => category.name)];
}

/** Used by generateStaticParams on the dynamic routes. */
export async function getExperienceSlugs(): Promise<string[]> {
  const all = await getExperiences();
  return all.map((experience) => experience.slug);
}
