"use client";

import { useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import PageHeader from "@/components/admin/PageHeader";
import FormField from "@/components/admin/FormField";
import LoadingState from "@/components/admin/LoadingState";
import { adminInputClass, adminPrimaryButtonClass } from "@/lib/admin/formStyles";
import { getSettings, updateSettings } from "@/services/admin/settingsService";
import type { WebsiteSettings } from "@/types/admin/settings";

const TABS = ["General", "Social", "Homepage", "Contact", "Footer", "QR Website"] as const;
type Tab = (typeof TABS)[number];

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<WebsiteSettings | null>(null);
  const [tab, setTab] = useState<Tab>("General");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState<string | undefined>();

  useEffect(() => {
    getSettings().then(setSettings);
  }, []);

  if (!settings) return <LoadingState label="Loading settings…" />;

  function update<K extends Exclude<keyof WebsiteSettings, "updatedAt">>(section: K, patch: Partial<WebsiteSettings[K]>) {
    setSettings((current) => (current ? { ...current, [section]: { ...current[section], ...patch } } : current));
    setSaved(false);
  }

  async function handleSave() {
    if (!settings || saving) return;
    setSaving(true);
    setSaveError(undefined);
    try {
      const updated = await updateSettings(settings);
      setSettings(updated);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : "Couldn't save settings. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-4">
      <PageHeader title="Website Settings" description="Configure the public site's content and details." />

      <div className="scrollbar-hide flex gap-1.5 overflow-x-auto rounded-2xl border border-admin-border bg-admin-card p-1.5 shadow-adminCard">
        {TABS.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setTab(item)}
            className={`shrink-0 rounded-xl px-3.5 py-2 text-[13px] font-semibold transition-colors ${
              tab === item ? "bg-admin-accent text-white" : "text-admin-muted hover:bg-admin-bg"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="rounded-2xl border border-admin-border bg-admin-card p-5 shadow-adminCard">
        {tab === "General" && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField label="Website Name" htmlFor="s-name">
              <input id="s-name" value={settings.general.websiteName} onChange={(e) => update("general", { websiteName: e.target.value })} className={adminInputClass} />
            </FormField>
            <FormField label="Phone" htmlFor="s-phone">
              <input id="s-phone" value={settings.general.phone} onChange={(e) => update("general", { phone: e.target.value })} className={adminInputClass} />
            </FormField>
            <FormField label="Email" htmlFor="s-email">
              <input id="s-email" value={settings.general.email} onChange={(e) => update("general", { email: e.target.value })} className={adminInputClass} />
            </FormField>
            <FormField label="WhatsApp" htmlFor="s-whatsapp">
              <input id="s-whatsapp" value={settings.general.whatsapp} onChange={(e) => update("general", { whatsapp: e.target.value })} className={adminInputClass} />
            </FormField>
            <FormField label="Logo URL" htmlFor="s-logo" hint="Path under /public.">
              <input id="s-logo" value={settings.general.logoUrl} onChange={(e) => update("general", { logoUrl: e.target.value })} className={adminInputClass} />
            </FormField>
            <FormField label="Favicon URL" htmlFor="s-favicon">
              <input id="s-favicon" value={settings.general.faviconUrl} onChange={(e) => update("general", { faviconUrl: e.target.value })} className={adminInputClass} />
            </FormField>
            <FormField label="Address" htmlFor="s-address" className="sm:col-span-2">
              <textarea id="s-address" rows={2} value={settings.general.address} onChange={(e) => update("general", { address: e.target.value })} className={`${adminInputClass} resize-none`} />
            </FormField>
          </div>
        )}

        {tab === "Social" && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField label="Instagram" htmlFor="s-instagram">
              <input id="s-instagram" value={settings.social.instagram} onChange={(e) => update("social", { instagram: e.target.value })} className={adminInputClass} />
            </FormField>
            <FormField label="Facebook" htmlFor="s-facebook">
              <input id="s-facebook" value={settings.social.facebook} onChange={(e) => update("social", { facebook: e.target.value })} className={adminInputClass} />
            </FormField>
            <FormField label="YouTube" htmlFor="s-youtube">
              <input id="s-youtube" value={settings.social.youtube} onChange={(e) => update("social", { youtube: e.target.value })} className={adminInputClass} />
            </FormField>
            <FormField label="LinkedIn" htmlFor="s-linkedin">
              <input id="s-linkedin" value={settings.social.linkedin} onChange={(e) => update("social", { linkedin: e.target.value })} className={adminInputClass} />
            </FormField>
            <FormField label="Google Maps" htmlFor="s-social-maps">
              <input id="s-social-maps" value={settings.social.googleMaps} onChange={(e) => update("social", { googleMaps: e.target.value })} className={adminInputClass} />
            </FormField>
          </div>
        )}

        {tab === "Homepage" && (
          <div className="grid grid-cols-1 gap-4">
            <FormField label="Hero Title" htmlFor="s-hero-title">
              <input id="s-hero-title" value={settings.homepage.heroTitle} onChange={(e) => update("homepage", { heroTitle: e.target.value })} className={adminInputClass} />
            </FormField>
            <FormField label="Hero Subtitle" htmlFor="s-hero-subtitle">
              <textarea id="s-hero-subtitle" rows={2} value={settings.homepage.heroSubtitle} onChange={(e) => update("homepage", { heroSubtitle: e.target.value })} className={`${adminInputClass} resize-none`} />
            </FormField>
            <FormField label="Hero Image" htmlFor="s-hero-image" hint="Path under /public.">
              <input id="s-hero-image" value={settings.homepage.heroImage} onChange={(e) => update("homepage", { heroImage: e.target.value })} className={adminInputClass} />
            </FormField>
          </div>
        )}

        {tab === "Contact" && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField label="Contact Number" htmlFor="s-contact-number">
              <input id="s-contact-number" value={settings.contact.contactNumber} onChange={(e) => update("contact", { contactNumber: e.target.value })} className={adminInputClass} />
            </FormField>
            <FormField label="WhatsApp Number" htmlFor="s-contact-whatsapp">
              <input id="s-contact-whatsapp" value={settings.contact.whatsappNumber} onChange={(e) => update("contact", { whatsappNumber: e.target.value })} className={adminInputClass} />
            </FormField>
            <FormField label="Email" htmlFor="s-contact-email">
              <input id="s-contact-email" value={settings.contact.email} onChange={(e) => update("contact", { email: e.target.value })} className={adminInputClass} />
            </FormField>
            <FormField label="Google Maps URL" htmlFor="s-contact-maps">
              <input id="s-contact-maps" value={settings.contact.googleMapsUrl} onChange={(e) => update("contact", { googleMapsUrl: e.target.value })} className={adminInputClass} />
            </FormField>
            <FormField label="Address" htmlFor="s-contact-address" className="sm:col-span-2">
              <textarea id="s-contact-address" rows={2} value={settings.contact.address} onChange={(e) => update("contact", { address: e.target.value })} className={`${adminInputClass} resize-none`} />
            </FormField>
          </div>
        )}

        {tab === "Footer" && (
          <div className="grid grid-cols-1 gap-4">
            <FormField label="Footer Description" htmlFor="s-footer-desc">
              <textarea id="s-footer-desc" rows={3} value={settings.footer.description} onChange={(e) => update("footer", { description: e.target.value })} className={`${adminInputClass} resize-none`} />
            </FormField>
            <FormField label="Copyright" htmlFor="s-footer-copyright">
              <input id="s-footer-copyright" value={settings.footer.copyright} onChange={(e) => update("footer", { copyright: e.target.value })} className={adminInputClass} />
            </FormField>
          </div>
        )}

        {tab === "QR Website" && (
          <div className="space-y-4">
            <label className="flex items-center gap-2.5 text-[13.5px] font-medium text-admin-text">
              <input
                type="checkbox"
                checked={settings.qrWebsite.humanVerificationEnabled}
                onChange={(e) => update("qrWebsite", { humanVerificationEnabled: e.target.checked })}
                className="h-4 w-4 rounded border-admin-border text-admin-accent focus:ring-admin-accent/30"
              />
              Human verification (Cloudflare Turnstile) enabled on the public site
            </label>
            <p className="rounded-xl bg-admin-bg px-3.5 py-2.5 text-[11.5px] leading-[1.5] text-admin-muted">
              This reflects whether NEXT_PUBLIC_TURNSTILE_SITE_KEY is configured on the public site&apos;s
              deployment — it is informational here and does not itself hold any secret key.
            </p>
            <FormField label="Public Site URL" htmlFor="s-public-url">
              <input id="s-public-url" value={settings.qrWebsite.publicSiteUrl} onChange={(e) => update("qrWebsite", { publicSiteUrl: e.target.value })} className={adminInputClass} />
            </FormField>
          </div>
        )}
      </div>

      {saveError && (
        <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-[13px] text-rose-700">
          {saveError}
        </div>
      )}

      <div className="flex items-center gap-3">
        <button type="button" onClick={handleSave} disabled={saving} className={adminPrimaryButtonClass}>
          {saving ? "Saving…" : "Save Changes"}
        </button>
        {saved && (
          <span className="flex items-center gap-1.5 text-[13px] font-medium text-emerald-600">
            <CheckCircle2 size={16} aria-hidden="true" />
            Saved
          </span>
        )}
      </div>
    </div>
  );
}
