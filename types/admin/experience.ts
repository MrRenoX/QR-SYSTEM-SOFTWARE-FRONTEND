export type ExperienceStatus = "active" | "inactive" | "draft";

export interface PricingOption {
  key: string;
  value: number;
}

/** A bookable time window, e.g. `{ key: "Morning", value: "6:00 AM - 8:00 AM" }`. */
export interface TimeSlot {
  key: string;
  value: string;
}

export interface AdminExperienceStop {
  order: number;
  name: string;
  duration: string;
  image: string;
  description?: string;
  bestTime?: string;
  fact?: string;
  gallery?: string[];
}

export interface AdminExperience {
  id: number;
  experienceCode: string;
  slug: string;
  title: string;
  category: { id: number; name: string } | null;
  shortDescription: string;
  fullDescription: string;
  duration: string;
  groupSize: string;
  maxGuests: number;
  bestTime: string;
  price: number;
  /** Optional tiered/group pricing shown alongside the headline "Starting from" price — see BACKEND_GUIDE.md. */
  pricingOptions?: PricingOption[];
  /** Optional bookable time windows shown on the experience page and pre-filled into the booking form. */
  slots?: TimeSlot[];
  location: string;
  meetingPoint: string;
  highlights: string[];
  included: string[];
  notIncluded: string[];
  didYouKnow: string;
  routeSlug: string;
  stops: AdminExperienceStop[];
  coverImage: string | null;
  galleryImages: string[];
  featured: boolean;
  status: ExperienceStatus;
  updatedAt: string;
}

/**
 * A stop as submitted from the form. No `image` URL field — a stop's image
 * is a real file upload (`stop_image_<index>`, index-matched against this
 * array), which the backend saves and fills into `stops[i].image` itself.
 */
export interface ExperienceStopInput {
  order: number;
  name: string;
  duration?: string;
  description?: string;
  bestTime?: string;
  fact?: string;
  gallery?: string[];
  /** Existing image URL, if any. Used in mock mode to preserve the image when no new file is uploaded. */
  existingImage?: string;
  /** New file to upload for this stop. Undefined = leave its existing image untouched. */
  image?: File;
}

export interface ExperienceFormValues {
  experienceCode: string;
  title: string;
  slug: string;
  categoryId: number | null;
  shortDescription: string;
  fullDescription: string;
  duration: string;
  groupSize: string;
  maxGuests: number;
  bestTime: string;
  price: number;
  pricingOptions?: PricingOption[];
  slots?: TimeSlot[];
  location: string;
  meetingPoint: string;
  routeSlug: string;
  highlights: string[];
  included: string[];
  notIncluded: string[];
  didYouKnow: string;
  stops: ExperienceStopInput[];
  featured: boolean;
  status: ExperienceStatus;
  /** New file to upload. Undefined = leave the existing cover image untouched. */
  coverImage?: File;
  /** New files to upload — replaces the entire existing gallery when provided (see BACKEND_GUIDE.md). */
  galleryImages?: File[];
}
