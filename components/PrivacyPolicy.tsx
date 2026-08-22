import Link from "next/link";
import { ChevronRight, House } from "lucide-react";
import SectionOrnament from "./SectionOrnament";

const SECTIONS: { heading: string; body: string[] }[] = [
  {
    heading: "Information We Collect",
    body: [
      "Booking details: your name, room number, WhatsApp number, email, preferred date and time, number of guests, and any special requests you share when booking an experience.",
      "Messages & queries: your name, contact details, and the content of any message or question you send us.",
      "Language preference: which of the site's four languages you choose — saved only in your own browser, never sent to us.",
      "Human verification: a one-time automated check to confirm you're not a bot before using the site. This doesn't collect personal information.",
    ],
  },
  {
    heading: "How We Use Your Information",
    body: [
      "To confirm and manage your booking, and reach you on WhatsApp, phone, or email about it.",
      "To respond to questions and messages you send us.",
      "To coordinate your visit with your guide and, where relevant, the property you're staying at.",
    ],
  },
  {
    heading: "How We Share It",
    body: [
      "We don't sell or rent your information to anyone.",
      "We share only what's needed to run your experience — with your assigned guide and the property team — and with trusted service providers who help us operate this site securely.",
    ],
  },
  {
    heading: "Data Storage & Security",
    body: [
      "Your booking, query, and contact details are stored securely and kept only as long as needed to provide the service and meet any legal requirements.",
      "Your language choice lives only in your browser's local storage and is never sent to us.",
    ],
  },
  {
    heading: "Cookies & Tracking",
    body: [
      "This site doesn't use advertising or analytics cookies. The only thing saved locally is your language preference — and, for our staff, an admin login session.",
    ],
  },
  {
    heading: "Your Rights",
    body: [
      "You can ask us to access, correct, or delete your personal information at any time by contacting us using the details below.",
    ],
  },
  {
    heading: "Children's Privacy",
    body: [
      "This service isn't directed at children, and we don't knowingly collect information from anyone under 18 without a guardian present.",
    ],
  },
  {
    heading: "Changes to This Policy",
    body: [
      "We may update this policy occasionally. The date at the top will always reflect the latest version.",
    ],
  },
];

export default function PrivacyPolicy() {
  return (
    <section className="px-4 pt-3">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[12px] text-ink-muted">
        <Link href="/" className="flex items-center gap-1 hover:text-terracotta">
          <House size={12.5} aria-hidden="true" />
          Home
        </Link>
        <ChevronRight size={12.5} className="text-ink-faint" aria-hidden="true" />
        <span className="font-semibold text-terracotta">Privacy Policy</span>
      </nav>

      <h1 className="mt-3 font-serif text-[28px] font-bold leading-[1.1] tracking-[-0.02em] text-ink">
        Privacy Policy
      </h1>
      <SectionOrnament />
      <p className="mt-2 text-[11.5px] font-medium uppercase tracking-[0.05em] text-ink-faint">
        Last updated: August 21, 2026
      </p>
      <p className="mt-3 text-[13.5px] leading-[1.55] text-ink-soft">
        Guide Guru Global (&ldquo;we&rdquo;, &ldquo;us&rdquo;) operates Ayodhya Anubhav, the
        guided-experience booking site you&rsquo;re using. This page explains what
        information we collect when you browse, book, or message us, and how we use it.
      </p>

      <div className="mt-6 space-y-6">
        {SECTIONS.map((section) => (
          <div key={section.heading}>
            <h2 className="font-serif text-[16.5px] font-bold text-ink">{section.heading}</h2>
            <div className="mt-1.5 space-y-1.5">
              {section.body.map((line) => (
                <p key={line} className="text-[13px] leading-[1.55] text-ink-soft">
                  {line}
                </p>
              ))}
            </div>
          </div>
        ))}

        <div>
          <h2 className="font-serif text-[16.5px] font-bold text-ink">Contact Us</h2>
          <p className="mt-1.5 text-[13px] leading-[1.55] text-ink-soft">
            Questions about your data? Reach us at{" "}
            <a href="mailto:ayodhyaanubhav@gmail.com" className="font-semibold text-terracotta">
              ayodhyaanubhav@gmail.com
            </a>{" "}
            or{" "}
            <a href="tel:+919695210246" className="font-semibold text-terracotta">
              +91 96952 10246
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
