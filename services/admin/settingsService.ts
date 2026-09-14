import { apiClient, isApiConfigured } from "../apiClient";
import { getCurrentSession } from "./authService";
import type { WebsiteSettings } from "@/types/admin/settings";

/** Also used as the merge-fallback for any keys the backend's freeform JSON blobs don't have yet. */
const DEFAULTS: WebsiteSettings = {
  general: {
    websiteName: "Ayodhya Anubhav",
    logoUrl: "/images/branding/logo.png",
    faviconUrl: "/favicon.ico",
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
    googleMaps: "",
  },
  homepage: {
    heroTitle: "Ayodhya Anubhav",
    heroSubtitle: "Thirteen journeys into the many layers of Ayodhya.",
    heroImage: "/images/hero/ayodhya-sarayu-ghat.jpg",
  },
  contact: {
    contactNumber: "+91 96952 10246",
    whatsappNumber: "+91 96952 10246",
    email: "ayodhyaanubhav@gmail.com",
    address: "Experience Desk - Evoke Rambagh, Ayodhya",
    googleMapsUrl: "",
  },
  footer: {
    description:
      "Curated experiences, certified guides, authentic stories and seamless journeys that bring India's destinations to life.",
    copyright: "© 2026 Guide Guru Global. All rights reserved.",
  },
  qrWebsite: {
    humanVerificationEnabled: false,
    publicSiteUrl: "https://ayodhyaanubhav.com",
  },
};

let store: WebsiteSettings = DEFAULTS;

/** The Flask API wraps every response in this envelope — see BACKEND_GUIDE.md. */
interface ApiEnvelope<T> {
  success: boolean;
  message: string;
  data: T;
}

/** Each section is a freeform JSON blob on the backend — only `updated_at` is guaranteed present. */
interface SettingsApiResponse {
  general: Partial<WebsiteSettings["general"]>;
  social: Partial<WebsiteSettings["social"]>;
  homepage: Partial<WebsiteSettings["homepage"]>;
  contact: Partial<WebsiteSettings["contact"]>;
  footer: Partial<WebsiteSettings["footer"]>;
  qr_website: Partial<WebsiteSettings["qrWebsite"]>;
  updated_at: string;
}

function mapSettings(raw: SettingsApiResponse): WebsiteSettings {
  return {
    general: { ...DEFAULTS.general, ...raw.general },
    social: { ...DEFAULTS.social, ...raw.social },
    homepage: { ...DEFAULTS.homepage, ...raw.homepage },
    contact: { ...DEFAULTS.contact, ...raw.contact },
    footer: { ...DEFAULTS.footer, ...raw.footer },
    qrWebsite: { ...DEFAULTS.qrWebsite, ...raw.qr_website },
    updatedAt: raw.updated_at,
  };
}

function authHeaders(): Record<string, string> {
  const session = getCurrentSession();
  return session ? { Authorization: `Bearer ${session.token}` } : {};
}

export async function getSettings(): Promise<WebsiteSettings> {
  if (!isApiConfigured()) return store;

  const result = await apiClient.get<ApiEnvelope<SettingsApiResponse>>("/api/v1/admin/settings", {
    headers: authHeaders(),
  });
  if (!result.ok) return DEFAULTS;
  return mapSettings(result.data.data);
}

export async function updateSettings(next: WebsiteSettings): Promise<WebsiteSettings> {
  if (!isApiConfigured()) {
    store = next;
    return store;
  }

  const result = await apiClient.put<ApiEnvelope<SettingsApiResponse>>(
    "/api/v1/admin/settings",
    {
      general: next.general,
      social: next.social,
      homepage: next.homepage,
      contact: next.contact,
      footer: next.footer,
      qr_website: next.qrWebsite,
    },
    { headers: authHeaders() },
  );
  if (!result.ok) throw new Error(result.message);
  return mapSettings(result.data.data);
}
