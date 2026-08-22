import Link from "next/link";
import { ChevronRight, House } from "lucide-react";
import SectionOrnament from "./SectionOrnament";

const SECTIONS: { heading: string; body: string[] }[] = [
  {
    heading: "Bookings & Confirmation",
    body: [
      "Submitting the booking form is a request, not a confirmed reservation. Our team confirms availability by WhatsApp, phone, or email — usually within the hour.",
      "Please provide accurate guest details, room number, and contact information so we can reach you.",
    ],
  },
  {
    heading: "Pricing & Payment",
    body: [
      "Prices shown on the site are indicative and may vary by group size or season; your final amount is confirmed along with your booking.",
      "Payment is collected in person — we don't process online payments through this website.",
    ],
  },
  {
    heading: "Cancellations & Rescheduling",
    body: [
      "To cancel or reschedule, message us on WhatsApp or call as early as possible so we can adjust guide and transport arrangements.",
      "Same-day changes are handled on a best-effort basis and aren't guaranteed.",
    ],
  },
  {
    heading: "During Your Experience",
    body: [
      "Please follow your guide's instructions, arrive on time for pickup, and respect local customs and sacred sites.",
      "Some experiences take place at third-party locations — temples, boat operators, workshops — that have their own rules, which you agree to follow.",
    ],
  },
  {
    heading: "Your Responsibility & Safety",
    body: [
      "Experiences may involve walking, travel by vehicle or boat, and time outdoors — take part at your own discretion and let your guide know of any health or mobility needs in advance.",
      "We're not liable for delays, closures, or changes caused by circumstances outside our reasonable control, such as weather, local events, or government restrictions.",
    ],
  },
  {
    heading: "Website Content",
    body: [
      "Text, images, and branding on this site belong to Guide Guru Global and may not be reused without our permission.",
    ],
  },
  {
    heading: "Changes to These Terms",
    body: [
      "We may update these terms from time to time. Continued use of the site after a change means you accept the updated terms.",
    ],
  },
  {
    heading: "Governing Law",
    body: [
      "These terms are governed by the laws of India, and any dispute is subject to the courts of Uttar Pradesh.",
    ],
  },
];

export default function TermsConditions() {
  return (
    <section className="px-4 pt-3">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[12px] text-ink-muted">
        <Link href="/" className="flex items-center gap-1 hover:text-terracotta">
          <House size={12.5} aria-hidden="true" />
          Home
        </Link>
        <ChevronRight size={12.5} className="text-ink-faint" aria-hidden="true" />
        <span className="font-semibold text-terracotta">Terms & Conditions</span>
      </nav>

      <h1 className="mt-3 font-serif text-[28px] font-bold leading-[1.1] tracking-[-0.02em] text-ink">
        Terms & Conditions
      </h1>
      <SectionOrnament />
      <p className="mt-2 text-[11.5px] font-medium uppercase tracking-[0.05em] text-ink-faint">
        Last updated: August 21, 2026
      </p>
      <p className="mt-3 text-[13.5px] leading-[1.55] text-ink-soft">
        These terms govern your use of Ayodhya Anubhav and any experience you book
        through Guide Guru Global. By submitting a booking or message, you agree to them.
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
            Questions about these terms? Reach us at{" "}
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
