export interface GeneralSettings {
  websiteName: string;
  logoUrl: string;
  faviconUrl: string;
  phone: string;
  email: string;
  whatsapp: string;
  address: string;
}

export interface SocialSettings {
  instagram: string;
  facebook: string;
  youtube: string;
  linkedin: string;
  googleMaps: string;
}

export interface HomepageSettings {
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
}

export interface ContactSettings {
  contactNumber: string;
  whatsappNumber: string;
  email: string;
  address: string;
  googleMapsUrl: string;
}

export interface FooterSettings {
  description: string;
  copyright: string;
}

export interface QrWebsiteSettings {
  humanVerificationEnabled: boolean;
  publicSiteUrl: string;
}

export interface WebsiteSettings {
  general: GeneralSettings;
  social: SocialSettings;
  homepage: HomepageSettings;
  contact: ContactSettings;
  footer: FooterSettings;
  qrWebsite: QrWebsiteSettings;
  updatedAt?: string;
}
