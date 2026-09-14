"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Clock, Sun, X } from "lucide-react";
import type { Touchpoint } from "@/lib/types";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface TouchpointModalProps {
  touchpoint: Touchpoint | null;
  onClose: () => void;
}

export default function TouchpointModal({
  touchpoint,
  onClose,
}: TouchpointModalProps) {
  const { t } = useLanguage();
  const closeRef = useRef<HTMLButtonElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const [activeImage, setActiveImage] = useState(0);
  const gallery = (
    (touchpoint?.gallery && touchpoint.gallery.length > 0)
      ? touchpoint.gallery
      : (touchpoint?.image ? [touchpoint.image] : [])
  ).filter((img): img is string => Boolean(img));

  useEffect(() => {
    if (!touchpoint) return;
    closeRef.current?.focus();
    setActiveImage(0);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [touchpoint, onClose]);

  // Auto-advance the hero gallery, like a slideshow — pauses whenever
  // there's only one photo, and resets each time a new stop is opened.
  useEffect(() => {
    if (!touchpoint || gallery.length <= 1) return;

    const interval = setInterval(() => {
      const node = galleryRef.current;
      if (!node) return;
      const current = Math.round(node.scrollLeft / node.clientWidth);
      const next = (current + 1) % gallery.length;
      node.scrollTo({ left: next * node.clientWidth, behavior: "smooth" });
    }, 3800);

    return () => clearInterval(interval);
  }, [touchpoint, gallery.length]);

  if (!touchpoint) return null;

  function handleGalleryScroll() {
    const node = galleryRef.current;
    if (!node) return;
    const index = Math.round(node.scrollLeft / node.clientWidth);
    setActiveImage(index);
  }

  return (
    <div className="shell-fixed z-50 flex items-end">
      <button
        type="button"
        aria-label={t.touchpoints.modal.closeAriaLabel}
        tabIndex={-1}
        onClick={onClose}
        className="absolute inset-0 h-full w-full animate-fade-in cursor-default bg-ink/45 backdrop-blur-[2px]"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="touchpoint-title"
        className="relative max-h-[88vh] w-full animate-fade-up overflow-y-auto overflow-x-hidden rounded-t-[22px] bg-ivory pb-6 shadow-shell tab:pb-8"
      >
        {/* Drag handle */}
        <div className="flex justify-center pb-2.5 pt-2.5">
          <span className="h-1 w-9 rounded-full bg-ink/15" />
        </div>

        {/* Hero gallery */}
        <div className="relative">
          <div
            ref={galleryRef}
            onScroll={handleGalleryScroll}
            className="scrollbar-hide flex snap-x snap-mandatory overflow-x-auto"
          >
            {gallery.map((src, index) => (
              <div
                key={src + index}
                className="relative h-[230px] w-full shrink-0 snap-center tab:h-[320px] tabLg:h-[380px]"
              >
                <Image
                  src={src}
                  alt={`${touchpoint.name} — view ${index + 1}`}
                  fill
                  priority={index === 0}
                  sizes="390px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          {/* Legibility gradient + title */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink/80 via-ink/25 to-transparent" />
          <h2
            id="touchpoint-title"
            className="pointer-events-none absolute inset-x-4 bottom-3 font-serif text-[22px] font-bold leading-tight text-white [text-shadow:0_1px_6px_rgba(0,0,0,0.35)]"
          >
            {touchpoint.name}
          </h2>

          {gallery.length > 1 && (
            <div className="pointer-events-none absolute left-4 top-3.5 flex gap-1">
              {gallery.map((_, index) => (
                <span
                  key={index}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === activeImage ? "w-4 bg-white" : "w-1.5 bg-white/50"
                  }`}
                />
              ))}
            </div>
          )}

          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label={t.touchpoints.modal.closeAriaLabel}
            className="absolute right-3.5 top-3.5 flex h-9 w-9 items-center justify-center rounded-full bg-ink/40 text-white backdrop-blur-md transition-colors hover:bg-ink/55"
          >
            <X size={17} strokeWidth={2.2} aria-hidden="true" />
          </button>
        </div>

        <div className="px-4 tab:px-7 tabLg:px-8">
          <p className="mt-4 text-[13.5px] leading-[1.6] text-ink-soft tab:mt-5 tab:text-[15px]">
            {touchpoint.description}
          </p>

          <dl className="mt-4 grid grid-cols-2 gap-2.5 tab:mt-5 tab:gap-4">
            <div className="flex items-center gap-2.5 rounded-card border border-line bg-white px-3 py-2.5 shadow-card">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-terracotta-tint">
                <Clock size={15} className="text-terracotta" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <dt className="text-[9.5px] font-semibold uppercase tracking-[0.06em] text-ink-faint">
                  {t.touchpoints.modal.recommended}
                </dt>
                <dd className="truncate text-[12.5px] font-bold text-ink">
                  {touchpoint.duration}
                </dd>
              </div>
            </div>
            <div className="flex items-center gap-2.5 rounded-card border border-line bg-white px-3 py-2.5 shadow-card">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-terracotta-tint">
                <Sun size={15} className="text-terracotta" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <dt className="text-[9.5px] font-semibold uppercase tracking-[0.06em] text-ink-faint">
                  {t.touchpoints.modal.bestTime}
                </dt>
                <dd className="truncate text-[12.5px] font-bold text-ink">
                  {touchpoint.bestTime}
                </dd>
              </div>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
