"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import MobileMenu from "./MobileMenu";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { LANGUAGE_LABELS, type Language } from "@/lib/i18n/translations";

const LANGUAGE_CODES: Language[] = ["en", "hi", "gu", "ta"];

export default function Header() {
  const { language, setLanguage, t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const NAV_ITEMS = [
    { label: t.mobileMenu.items.experiences, href: "/experiences" },
    { label: t.mobileMenu.items.categories, href: "/categories" },
    { label: t.mobileMenu.items.about, href: "/about" },
    { label: t.mobileMenu.items.contact, href: "/contact" },
    { label: t.mobileMenu.items.faqs, href: "/faqs" },
  ] as const;

  return (
    <header className="sticky top-0 z-40 bg-ivory/95 backdrop-blur-sm">
      <div className="flex items-center justify-between gap-4 px-4 py-3 tab:px-6 tabLg:px-8">
        <Link href="/" aria-label={t.header.homeAriaLabel} className="shrink-0">
          <Image
            src="/images/branding/logo.png"
            alt="Guide Guru Global"
            width={51}
            height={40}
            priority
            className="h-[40px] w-auto tab:h-[44px] tabLg:h-[48px]"
          />
        </Link>

        <nav
          aria-label={t.mobileMenu.primaryNavAriaLabel}
          className="hidden min-w-0 flex-1 items-center justify-center gap-6 tab:flex tabLg:flex tabLg:gap-8"
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap text-[14px] font-semibold text-ink transition-colors hover:text-terracotta tabLg:text-[15px]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <div className="relative">
            <button
              type="button"
              onClick={() => setLangOpen((open) => !open)}
              aria-expanded={langOpen}
              aria-haspopup="listbox"
              className="flex h-10 items-center gap-1.5 rounded-full border border-line bg-white px-3.5 text-[13px] font-medium text-ink transition-colors hover:border-terracotta/40"
            >
              {LANGUAGE_LABELS[language]}
              <ChevronDown
                size={15}
                className={`text-ink-muted transition-transform ${langOpen ? "rotate-180" : ""}`}
                aria-hidden="true"
              />
            </button>

            {langOpen && (
              <ul
                role="listbox"
                aria-label={t.header.selectLanguageAriaLabel}
                className="absolute right-0 top-11 z-50 w-36 animate-slide-in overflow-hidden rounded-xl border border-line bg-white py-1 shadow-float"
              >
                {LANGUAGE_CODES.map((code) => (
                  <li key={code}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={code === language}
                      onClick={() => {
                        setLanguage(code);
                        setLangOpen(false);
                      }}
                      className={`w-full px-4 py-2 text-left text-[13px] transition-colors hover:bg-cream ${
                        code === language
                          ? "font-semibold text-terracotta"
                          : "text-ink-soft"
                      }`}
                    >
                      {LANGUAGE_LABELS[code]}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label={t.header.openMenuAriaLabel}
            aria-expanded={menuOpen}
            aria-controls="main-menu"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-terracotta text-white shadow-[0_4px_12px_-4px_rgba(220,74,12,0.6)] transition-transform active:scale-95 tab:hidden tabLg:hidden"
          >
            {menuOpen ? (
              <X size={20} strokeWidth={2.5} aria-hidden="true" />
            ) : (
              <Menu size={20} strokeWidth={2.5} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}
