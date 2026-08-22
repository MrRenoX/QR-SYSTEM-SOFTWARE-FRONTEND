"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowUpRight, MessageCircle, X } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  const { t } = useLanguage();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const MENU_ITEMS = [
    { label: t.mobileMenu.items.experiences, href: "/experiences" },
    { label: t.mobileMenu.items.categories, href: "/categories" },
    { label: t.mobileMenu.items.about, href: "/about" },
    { label: t.mobileMenu.items.contact, href: "/contact" },
    { label: t.mobileMenu.items.faqs, href: "/faqs" },
  ] as const;

  useEffect(() => {
    if (!open) return;

    closeRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="shell-fixed z-50">
      <button
        type="button"
        aria-label={t.mobileMenu.closeAriaLabel}
        tabIndex={-1}
        onClick={onClose}
        className="absolute inset-0 h-full w-full animate-fade-in cursor-default bg-ink/35 backdrop-blur-[2px]"
      />

      <div
        ref={panelRef}
        id="main-menu"
        role="dialog"
        aria-modal="true"
        aria-label={t.mobileMenu.mainMenuAriaLabel}
        className="absolute inset-x-0 top-0 animate-slide-in rounded-b-[22px] bg-ivory px-5 pb-7 pt-4 shadow-float"
      >
        <div className="flex items-center justify-between">
          <p className="font-serif text-[19px] font-bold text-ink">{t.mobileMenu.title}</p>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label={t.mobileMenu.closeAriaLabel}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-terracotta text-white transition-transform active:scale-95"
          >
            <X size={20} strokeWidth={2.5} aria-hidden="true" />
          </button>
        </div>

        <nav aria-label={t.mobileMenu.primaryNavAriaLabel} className="mt-5">
          <ul className="divide-y divide-line">
            {MENU_ITEMS.map((item, index) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  style={{ animationDelay: `${index * 45}ms` }}
                  className="arrow-nudge flex animate-fade-up items-center justify-between py-3.5 font-serif text-[21px] font-semibold text-ink transition-colors hover:text-terracotta"
                >
                  {item.label}
                  <ArrowUpRight
                    size={19}
                    className="text-terracotta"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <a
          href="https://wa.me/919695210246"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 flex h-12 items-center justify-center gap-2 rounded-full bg-whatsapp text-[15px] font-semibold text-white"
        >
          <MessageCircle size={16} aria-hidden="true" />
          {t.mobileMenu.chatWhatsapp}
        </a>

        <p className="mt-3 text-center text-[11.5px] text-ink-muted">
          {t.mobileMenu.tagline}
        </p>
      </div>
    </div>
  );
}
