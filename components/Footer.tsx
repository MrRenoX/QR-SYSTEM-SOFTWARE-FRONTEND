"use client";

import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import WhatsAppIcon from "./icons/WhatsAppIcon";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import type { SiteSettings } from "@/lib/types";

/** wa.me and tel: links want digits (and a leading + for tel:) only, not the display-formatted spacing. */
function toWaLink(phone: string): string {
  return `https://wa.me/${phone.replace(/[^\d]/g, "")}`;
}
function toTelLink(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

export default function Footer({ settings }: { settings: SiteSettings }) {
  const { t } = useLanguage();
  const { general, social, footer } = settings;

  const EXPLORE_LINKS = [
    { label: t.footer.exploreLinks.allExperiences, href: "/experiences" },
    { label: t.footer.exploreLinks.categories, href: "/categories" },
    { label: t.footer.exploreLinks.howItWorks, href: "/#how-it-works" },
  ];

  const COMPANY_LINKS = [
    { label: t.footer.companyLinks.aboutUs, href: "/about" },
    { label: t.footer.companyLinks.contactUs, href: "/contact" },
    { label: t.footer.companyLinks.faqs, href: "/faqs" },
    { label: t.footer.companyLinks.privacyPolicy, href: "/privacy" },
    { label: t.footer.companyLinks.termsConditions, href: "/terms" },
    { label: t.footer.companyLinks.refundPolicy, href: "/refund-policy" },
  ];

  const socials = [
    { Icon: Facebook, label: "Facebook", href: social.facebook },
    { Icon: Instagram, label: "Instagram", href: social.instagram },
    { Icon: WhatsAppIcon, label: "WhatsApp", href: toWaLink(general.whatsapp) },
    { Icon: Linkedin, label: "LinkedIn", href: social.linkedin },
  ];

  return (
    <footer id="contact" className="bg-noir px-4 pb-6 pt-8 tab:px-8 tab:pb-8 tab:pt-9 tabLg:px-10 tabLg:pb-10 tabLg:pt-10">
      <div className="tabLg:grid tabLg:grid-cols-4 tabLg:gap-x-10">
        <div className="flex items-start justify-between gap-3 tab:gap-6 tabLg:contents">
          <div className="min-w-0 tabLg:col-start-1 tabLg:row-start-1">
            <div className="inline-block overflow-hidden rounded-[10px] border border-white/10 bg-white p-1 shadow-float">
              <Image
                src="/images/branding/logo-full.jpg"
                alt={general.websiteName}
                width={128}
                height={100}
                className="h-[28px] w-auto rounded-[6px] tab:h-8"
              />
            </div>
            <p className="mt-2 max-w-[190px] text-[10px] font-medium leading-[1.45] text-white/70 tab:max-w-[240px] tab:text-[11.5px]">
              {footer.description}
            </p>
            <ul className="mt-3 flex gap-2 tab:mt-4">
              {socials.map(({ Icon, label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-7 w-7 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-terracotta hover:text-ink tab:h-8 tab:w-8"
                  >
                    <Icon size={13} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="w-[152px] shrink-0 rounded-[12px] border border-line bg-white p-3 tab:w-[220px] tab:p-4 tabLg:col-start-4 tabLg:row-start-1 tabLg:w-full">
            <h3 className="text-[11.5px] font-bold text-ink tab:text-[13px]">{t.footer.needHelp}</h3>
            <p className="mt-1 text-[9px] leading-[1.35] text-ink-muted tab:text-[11px]">
              {t.footer.needHelpDetail}
            </p>
            <a
              href={toWaLink(general.whatsapp)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex h-7 items-center justify-center gap-1 rounded-[6px] bg-whatsapp text-[10px] font-semibold text-white transition-opacity hover:opacity-90 tab:h-9 tab:text-[12px]"
            >
              <WhatsAppIcon size={11} />
              {t.footer.chatWhatsapp}
            </a>
            <a
              href={toTelLink(general.phone)}
              className="mt-1.5 flex h-7 items-center justify-center gap-1 rounded-[6px] border border-terracotta/50 text-[10px] font-semibold text-terracotta-deep transition-colors hover:bg-terracotta/10 tab:h-9 tab:text-[12px]"
            >
              <Phone size={11} aria-hidden="true" />
              {t.footer.callUs}
            </a>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-x-3 gap-y-4 tab:mt-8 tab:gap-x-8 tabLg:contents">
          <nav aria-label={t.footer.exploreHeading} className="tabLg:col-start-2 tabLg:row-start-1">
            <h3 className="text-[11.5px] font-bold text-white tab:text-[13px]">{t.footer.exploreHeading}</h3>
            <ul className="mt-1.5 space-y-1 tab:mt-2.5 tab:space-y-2">
              {EXPLORE_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[10px] text-white/70 transition-colors hover:text-terracotta tab:text-[12px]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={t.footer.companyHeading} className="tabLg:col-start-3 tabLg:row-start-1">
            <h3 className="text-[11.5px] font-bold text-white tab:text-[13px]">{t.footer.companyHeading}</h3>
            <ul className="mt-1.5 space-y-1 tab:mt-2.5 tab:space-y-2">
              {COMPANY_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[10px] text-white/70 transition-colors hover:text-terracotta tab:text-[12px]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-4 tab:mt-8 tabLg:col-start-4 tabLg:row-start-2 tabLg:mt-4">
          <h3 className="text-[11.5px] font-bold text-white tab:text-[13px]">{t.footer.contactHeading}</h3>
          <ul className="mt-1.5 space-y-1.5 text-[10px] text-white/70 tab:mt-2.5 tab:space-y-2 tab:text-[12px]">
            <li>
              <a href={toTelLink(general.phone)} className="flex items-center gap-1.5 hover:text-terracotta">
                <Phone size={11} className="shrink-0 text-terracotta" aria-hidden="true" />
                {general.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${general.email}`}
                className="flex items-center gap-1.5 break-all hover:text-terracotta"
              >
                <Mail size={11} className="shrink-0 text-terracotta" aria-hidden="true" />
                {general.email}
              </a>
            </li>
            <li className="flex items-start gap-1.5">
              <MapPin size={11} className="mt-0.5 shrink-0 text-terracotta" aria-hidden="true" />
              <span>{general.address}</span>
            </li>
          </ul>
        </div>

        <div className="mt-5 flex items-center gap-2.5 rounded-[10px] border border-line bg-white p-2.5 tab:mt-6 tabLg:col-start-4 tabLg:row-start-3 tabLg:mt-4">
          <Image
            src="/images/branding/website-qr.jpg"
            alt={t.footer.qrAlt}
            width={44}
            height={44}
            className="h-11 w-11 shrink-0 rounded-[5px] border border-line/70 object-cover"
          />
          <div>
            <p className="text-[10px] font-bold text-ink tab:text-[12px]">{t.footer.visitWebsite}</p>
            <p className="text-[9px] leading-[1.35] text-ink-muted tab:text-[11px]">{t.footer.scanQr}</p>
          </div>
        </div>
      </div>

      <p className="mt-5 border-t border-noir-border pt-3 text-center text-[9.5px] text-white/40 tab:mt-8 tab:pt-4 tab:text-[11px]">
        {footer.copyright}
      </p>
    </footer>
  );
}
