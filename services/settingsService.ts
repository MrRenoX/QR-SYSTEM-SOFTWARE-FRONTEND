import { apiClient, isApiConfigured } from "./apiClient";
import type { SiteSettings } from "@/lib/types";

interface ApiEnvelope<T> {
  success: boolean;
  message: string;
  data: T;
}

/** Each section is a freeform JSON blob on the backend — nothing is guaranteed present. */
interface SettingsApiResponse {
  general?: Partial<SiteSettings["general"]>;
  social?: Partial<SiteSettings["social"]>;
  homepage?: Partial<SiteSettings["homepage"]>;
  footer?: Partial<SiteSettings["footer"]>;
}

/** Also the fallback used until NEXT_PUBLIC_API_URL is set, or if the public settings route isn't live yet. */
const DEFAULTS: SiteSettings = {
  general: {
    websiteName: "Guide Guru Global",
    phone: "+91 96952 10246",
    email: "ayodhyaanubhav@gmail.com",
    whatsapp: "+91 96952 10246",
    address: "Experience Desk - Evoke Rambagh, Ayodhya",
  },
  social: {
    instagram: "https://www.instagram.com/guideguruglobal",
    facebook: "https://www.facebook.com/share/1DJyVQNgzv/",
    youtube: "https://youtube.com",
    linkedin: "https://www.linkedin.com/showcase/guideguruglobal/",
  },
  homepage: {
    heroTitle: "Ayodhya Anubhav",
    heroSubtitle: "Thirteen journeys into the many layers of Ayodhya.",
  },
  footer: {
    description:
      "Curated experiences, certified guides, authentic stories and seamless journeys that bring India's destinations to life.",
    copyright: "© 2026 Guide Guru Global. All rights reserved.",
  },
};

/**
 * Public, read-only site settings — `GET /api/v1/settings`, no auth, unlike
 * the admin `/api/v1/admin/settings` (which also accepts PUT). Only ever
 * expose branding/contact fields here that are already meant to be publicly
 * visible on the site — never add secrets or internal fields to this route.
 */
export async function getSiteSettings(): Promise<SiteSettings> {
  if (!isApiConfigured()) return DEFAULTS;

  const result = await apiClient.get<ApiEnvelope<SettingsApiResponse>>("/api/v1/settings");
  if (!result.ok) return DEFAULTS;

  const raw = result.data.data;
  return {
    general: { ...DEFAULTS.general, ...raw.general },
    social: { ...DEFAULTS.social, ...raw.social },
    homepage: { ...DEFAULTS.homepage, ...raw.homepage },
    footer: { ...DEFAULTS.footer, ...raw.footer },
  };
}
