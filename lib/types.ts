/**
 * Category names are dynamic (admin-managed via the real Category API), not
 * a fixed set — this alias just documents intent at call sites.
 */
export type CategoryName = string;

export type FilterName = "All" | CategoryName;

/**
 * A single stop along an experience's route. Combines what the journey map
 * (order/duration/image) and the "along the way" detail cards
 * (description/bestTime/fact/gallery) each need, matching the API's unified
 * `stops` shape — see BACKEND_GUIDE.md.
 */
export interface ExperienceStop {
  order: number;
  name: string;
  duration: string;
  image: string | null;
  description?: string;
  bestTime?: string;
  fact?: string;
  gallery?: (string | null)[];
}

export interface PricingOption {
  key: string;
  value: number;
}

/** A bookable time window, e.g. `{ key: "Morning", value: "6:00 AM - 8:00 AM" }`. */
export interface TimeSlot {
  key: string;
  value: string;
}

export interface Experience {
  id: number;
  slug: string;
  category: CategoryName;
  title: string;
  /** Short line used on cards and list rows */
  description: string;
  /** Longer editorial copy used on the detail page */
  longDescription?: string;
  image: string;
  galleryImages?: string[];
  duration: string;
  groupSize: string;
  bestTime: string;
  price: string;
  /** Optional tiered/group pricing (e.g. "Group 1-6 (flat)" vs "Per person min. 4 pax") shown on the detail page. */
  pricingOptions?: PricingOption[];
  /** Optional bookable time windows (e.g. Morning / Afternoon / Evening) — drives the booking form's "Preferred time" select. */
  slots?: TimeSlot[];
  included?: string[];
  notIncluded?: string[];
  didYouKnow?: string;
  routeSlug?: string;
  stops: ExperienceStop[];
}

export interface Touchpoint {
  id: number;
  name: string;
  description: string;
  duration: string;
  bestTime: string;
  fact: string;
  image: string | null;
  gallery?: (string | null)[];
}

export interface JourneyStop {
  order: number;
  name: string;
  duration: string;
  image: string | null;
}

export interface BookingDraft {
  guestName: string;
  roomNumber: string;
  whatsapp: string;
  email: string;
  date: string;
  preferredTime: string;
  adults: number;
  children: number;
  specialRequest: string;
}

export interface QueryDraft {
  name: string;
  roomNumber: string;
  mobile: string;
  question: string;
}

export interface ContactDraft {
  name: string;
  contact: string;
  message: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQGroup {
  category: string;
  items: FAQItem[];
}

/**
 * The subset of admin-managed site settings the public site actually
 * renders (branding/contact/hero copy) — read-only, unauthenticated. See
 * BACKEND_GUIDE.md's public Settings API for the wire contract.
 */
export interface SiteSettings {
  general: {
    websiteName: string;
    phone: string;
    email: string;
    whatsapp: string;
    address: string;
  };
  social: {
    instagram: string;
    facebook: string;
    youtube: string;
  };
  homepage: {
    heroTitle: string;
    heroSubtitle: string;
  };
  footer: {
    description: string;
    copyright: string;
  };
}
