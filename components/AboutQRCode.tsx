"use client";

import Image from "next/image";
import Reveal from "./Reveal";
import SectionOrnament from "./SectionOrnament";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function AboutQRCode() {
  const { t } = useLanguage();

  return (
    <section aria-labelledby="scan-website" className="mt-9 px-4">
      <Reveal className="rounded-panel border border-line bg-cream px-5 py-6 text-center shadow-card">
        <h2
          id="scan-website"
          className="font-serif text-[19px] font-bold tracking-[-0.01em] text-ink"
        >
          {t.about.qrCode.heading}
        </h2>
        <SectionOrnament align="center" />
        <p className="mx-auto mt-2 max-w-[240px] text-[13px] leading-[1.5] text-ink-soft">
          {t.about.qrCode.caption}
        </p>

        <div className="mx-auto mt-4 h-[140px] w-[140px] overflow-hidden rounded-[16px] border border-line bg-white p-2.5 shadow-card">
          <Image
            src="/images/branding/website-qr.jpg"
            alt={t.footer.qrAlt}
            width={140}
            height={140}
            className="h-full w-full object-contain"
          />
        </div>
      </Reveal>
    </section>
  );
}
