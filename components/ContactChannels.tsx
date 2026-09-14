"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight, Clock, Mail, MapPin, Phone } from "lucide-react";
import Reveal from "./Reveal";
import WhatsAppIcon from "./icons/WhatsAppIcon";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const WHATSAPP_NUMBER = "919695210246";
const PHONE_NUMBER = "+919695210246";
const PHONE_DISPLAY = "+91 96952 10246";
const EMAIL = "ayodhyaanubhav@gmail.com";
const ADDRESS = "Experience Desk - Evoke Rambagh, Ayodhya";

function mapsLink(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export default function ContactChannels() {
  const { t } = useLanguage();

  return (
    <section aria-labelledby="contact-channels" className="mt-6 px-4">
      <h2 id="contact-channels" className="sr-only">
        {t.contact.channels.sectionHeadingSr}
      </h2>

      <Reveal>
        <p className="font-serif text-[19px] font-bold text-ink">
          {t.contact.channels.needHelpHeading}
        </p>
        <p className="mt-0.5 font-serif text-[19px] font-bold text-ink">
          {t.contact.channels.experienceDeskIntro}
        </p>
        <p className="mt-2 text-[13.5px] leading-[1.55] text-ink-soft">
          {t.contact.channels.question}
        </p>
        <p className="mt-2 text-[13px] text-ink-soft">
          {t.contact.channels.assistanceLabel}{" "}
          <span className="font-bold text-ink">{t.contact.channels.assistanceItems}</span>
        </p>
      </Reveal>

      <Reveal delay={40} className="mt-4">
        <p className="text-[13.5px] font-bold text-ink">{t.contact.channels.chatWithUsLabel}</p>
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          className="arrow-nudge mt-2 flex items-center gap-3.5 rounded-panel bg-whatsapp px-4 py-4 shadow-card transition-opacity hover:opacity-95"
        >
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/20">
            <WhatsAppIcon size={22} className="text-white" />
          </span>
          <span className="min-w-0 flex-1 text-[15.5px] font-bold text-white">
            {t.contact.channels.whatsappButtonLabel}
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
              href={mapsLink(ADDRESS)}
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

      <Reveal
        delay={210}
        className="mt-6 border-t border-line pt-5 text-center"
      >
        <p className="font-serif text-[17px] font-bold text-ink">
          {t.contact.channels.preferToSpeak}
        </p>
        <p className="mx-auto mt-1.5 max-w-[280px] text-[13px] leading-[1.55] text-ink-soft">
          {t.contact.channels.visitDeskBody}{" "}
          <a
            href={mapsLink("Evoke Rambagh, Ayodhya, Uttar Pradesh")}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-terracotta underline underline-offset-2"
          >
            {t.contact.channels.getDirections}
          </a>
        </p>
        <p className="mt-3 text-[12.5px] font-bold uppercase tracking-[0.06em] text-ink-faint">
          {t.contact.channels.exploreAskExperience}
        </p>
        <Link
          href="/experiences"
          className="arrow-nudge mt-3 inline-flex h-11 items-center gap-2 rounded-full bg-terracotta-soft pl-4 pr-2 text-[13.5px] font-bold text-ink shadow-goldButton transition-all hover:bg-terracotta active:translate-y-[2px] active:shadow-goldButtonPressed"
        >
          {t.contact.channels.exploreExperiences}
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-terracotta-deep">
            <ArrowRight size={14} strokeWidth={2.4} aria-hidden="true" />
          </span>
        </Link>
      </Reveal>
    </section>
  );
}
