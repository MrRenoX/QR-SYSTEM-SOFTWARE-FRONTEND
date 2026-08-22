"use client";

import { ArrowUpRight, Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import Reveal from "./Reveal";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const WHATSAPP_NUMBER = "919695210246";
const PHONE_NUMBER = "+919695210246";
const PHONE_DISPLAY = "+91 96952 10246";
const EMAIL = "ayodhyaanubhav@gmail.com";
const ADDRESS = "Evoke Rambagh, Ayodhya, Uttar Pradesh";

export default function ContactChannels() {
  const { t } = useLanguage();

  return (
    <section aria-labelledby="contact-channels" className="mt-6 px-4">
      <h2 id="contact-channels" className="sr-only">
        {t.contact.channels.sectionHeadingSr}
      </h2>

      <Reveal>
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          className="arrow-nudge flex items-center gap-3.5 rounded-panel bg-whatsapp px-4 py-4 shadow-card transition-opacity hover:opacity-95"
        >
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/20">
            <MessageCircle size={22} className="text-white" aria-hidden="true" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[15.5px] font-bold text-white">
              {t.contact.channels.whatsappTitle}
            </span>
            <span className="block text-[12px] text-white/85">
              {t.contact.channels.whatsappSubtitle}
            </span>
          </span>
          <ArrowUpRight size={18} className="shrink-0 text-white" aria-hidden="true" />
        </a>
      </Reveal>

      <div className="mt-3 grid grid-cols-2 gap-3">
        <Reveal delay={60}>
          <a
            href={`tel:${PHONE_NUMBER}`}
            className="flex h-full flex-col items-start gap-2 rounded-card border border-line bg-white p-3.5 shadow-card transition-colors hover:border-terracotta/40"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-terracotta-tint text-terracotta">
              <Phone size={17} strokeWidth={1.8} aria-hidden="true" />
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.05em] text-ink-faint">
              {t.contact.channels.callUs}
            </span>
            <span className="text-[13.5px] font-bold leading-tight text-ink">
              {PHONE_DISPLAY}
            </span>
          </a>
        </Reveal>

        <Reveal delay={110}>
          <a
            href={`mailto:${EMAIL}`}
            className="flex h-full flex-col items-start gap-2 rounded-card border border-line bg-white p-3.5 shadow-card transition-colors hover:border-terracotta/40"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-terracotta-tint text-terracotta">
              <Mail size={17} strokeWidth={1.8} aria-hidden="true" />
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.05em] text-ink-faint">
              {t.contact.channels.emailUs}
            </span>
            <span className="break-all text-[13px] font-bold leading-tight text-ink">
              {EMAIL}
            </span>
          </a>
        </Reveal>
      </div>

      <Reveal
        delay={160}
        className="mt-3 rounded-card border border-line bg-white p-3.5 shadow-card"
      >
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-terracotta-tint text-terracotta">
            <MapPin size={17} strokeWidth={1.8} aria-hidden="true" />
          </span>
          <div className="min-w-0 flex-1">
            <span className="block text-[11px] font-semibold uppercase tracking-[0.05em] text-ink-faint">
              {t.contact.channels.visitUs}
            </span>
            <span className="mt-0.5 block text-[13.5px] font-bold leading-snug text-ink">
              {ADDRESS}
            </span>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1.5 inline-flex items-center gap-1 text-[12px] font-bold text-terracotta"
            >
              {t.contact.channels.getDirections}
              <ArrowUpRight size={13} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2 border-t border-line pt-3 text-[12px] text-ink-muted">
          <Clock size={14} className="shrink-0 text-terracotta" aria-hidden="true" />
          {t.contact.channels.hoursLine}
        </div>
      </Reveal>
    </section>
  );
}
