import Link from "next/link";
import SectionOrnament from "./SectionOrnament";

interface RefundTier {
  window: string;
  refund: string;
}

const ADVANCE_TIERS: RefundTier[] = [
  { window: "More than 24 hours before the experience", refund: "100% refund" },
  { window: "12–24 hours before the experience", refund: "50% refund" },
  { window: "Less than 12 hours before the experience", refund: "No refund" },
  { window: "No-show", refund: "No refund" },
];

const SAME_DAY_TIERS: RefundTier[] = [
  { window: "4 hours or more before the experience", refund: "100% refund" },
  { window: "2–4 hours before the experience", refund: "50% refund" },
  { window: "Less than 2 hours before the experience", refund: "No refund" },
  { window: "No-show", refund: "No refund" },
];

function RefundTable({ tiers }: { tiers: RefundTier[] }) {
  return (
    <div className="mt-2 overflow-hidden rounded-card border border-line bg-white shadow-card">
      {tiers.map((tier, index) => (
        <div
          key={tier.window}
          className={`flex items-center justify-between gap-3 px-3.5 py-2.5 ${
            index > 0 ? "border-t border-line" : ""
          }`}
        >
          <span className="text-[12.5px] leading-[1.4] text-ink-soft">{tier.window}</span>
          <span className="shrink-0 text-[12.5px] font-bold text-terracotta">{tier.refund}</span>
        </div>
      ))}
    </div>
  );
}

const SECTIONS: { heading: string; body: string[] }[] = [
  {
    heading: "1. Advance Payment",
    body: [
      "All experiences must be paid for in full before the experience begins.",
      "A booking will be considered confirmed only after successful receipt of the full payment.",
    ],
  },
];

export default function RefundPolicy() {
  return (
    <section className="px-4 pt-3">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[12px] text-ink-muted">
        <span className="font-semibold text-terracotta">Cancellation &amp; Refund Policy</span>
      </nav>

      <h1 className="mt-3 font-serif text-[28px] font-bold leading-[1.1] tracking-[-0.02em] text-ink">
        Cancellation &amp; Refund Policy
      </h1>
      <SectionOrnament />
      <p className="mt-2 text-[11.5px] font-medium uppercase tracking-[0.05em] text-ink-faint">
        Last updated: August 26, 2026
      </p>
      <p className="mt-3 text-[13.5px] leading-[1.55] text-ink-soft">
        At Ayodhya Anubhav, every experience is planned and coordinated with local guides,
        mobility partners and other experience providers. The following policy applies to all
        confirmed bookings.
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
          <h2 className="font-serif text-[16.5px] font-bold text-ink">
            2. Cancellation by Guest — Advance Bookings
          </h2>
          <p className="mt-1.5 text-[13px] leading-[1.55] text-ink-soft">
            For bookings made more than 24 hours before the scheduled experience, the following
            cancellation terms apply:
          </p>
          <RefundTable tiers={ADVANCE_TIERS} />
        </div>

        <div>
          <h2 className="font-serif text-[16.5px] font-bold text-ink">
            3. Cancellation by Guest — Same-Day / On-the-Spot Bookings
          </h2>
          <p className="mt-1.5 text-[13px] leading-[1.55] text-ink-soft">
            We understand that guests may decide to explore Ayodhya after arriving at the hotel.
            Same-day bookings are eligible for cancellation, subject to the time remaining before
            the scheduled experience. This applies to bookings made on the same day through the
            Ayodhya Anubhav website, Experience Desk or WhatsApp.
          </p>
          <RefundTable tiers={SAME_DAY_TIERS} />

          <div className="mt-3 rounded-card border border-line bg-cream p-3.5">
            <p className="text-[12px] font-bold uppercase tracking-[0.05em] text-ink-faint">
              Example
            </p>
            <p className="mt-1.5 text-[13px] leading-[1.55] text-ink-soft">
              If a guest books a 5:00 PM experience at 1:00 PM:
            </p>
            <ul className="mt-1.5 space-y-1 text-[13px] leading-[1.55] text-ink-soft">
              <li>Cancellation by 1:00 PM or earlier → 100% refund</li>
              <li>Cancellation between 1:00 PM and 3:00 PM → 50% refund</li>
              <li>Cancellation after 3:00 PM → No refund</li>
              <li>No-show → No refund</li>
            </ul>
          </div>

          <p className="mt-2 text-[13px] leading-[1.55] text-ink-soft">
            For experiences linked to fixed timings, the applicable cancellation period will be
            calculated with reference to the confirmed experience start time.
          </p>
        </div>

        <div>
          <h2 className="font-serif text-[16.5px] font-bold text-ink">4. No-Show</h2>
          <div className="mt-1.5 space-y-1.5">
            <p className="text-[13px] leading-[1.55] text-ink-soft">
              If a guest does not arrive at the designated meeting or pick-up point at the
              confirmed time and has not contacted the Experience Desk in advance, the booking
              will be treated as a no-show.
            </p>
            <p className="text-[13px] leading-[1.55] text-ink-soft">
              No refund will be provided for a no-show.
            </p>
          </div>
        </div>

        <div>
          <h2 className="font-serif text-[16.5px] font-bold text-ink">5. Late Arrival</h2>
          <div className="mt-1.5 space-y-1.5">
            <p className="text-[13px] leading-[1.55] text-ink-soft">
              Guests are requested to arrive at the confirmed time.
            </p>
            <p className="text-[13px] leading-[1.55] text-ink-soft">
              Certain experiences are dependent on fixed timings, including temple darshan,
              aarti, sunrise and sunset experiences. Late arrival may result in the experience
              being shortened, modified or, where the experience can no longer reasonably be
              delivered, treated as a no-show.
            </p>
            <p className="text-[13px] leading-[1.55] text-ink-soft">
              No refund will be applicable where an experience cannot be delivered due to the
              guest&rsquo;s late arrival.
            </p>
          </div>
        </div>

        <div>
          <h2 className="font-serif text-[16.5px] font-bold text-ink">6. Rescheduling</h2>
          <div className="mt-1.5 space-y-1.5">
            <p className="text-[13px] leading-[1.55] text-ink-soft">
              Guests may request to reschedule a confirmed experience by contacting the Ayodhya
              Anubhav Experience Desk.
            </p>
            <p className="text-[13px] leading-[1.55] text-ink-soft">
              Rescheduling is subject to availability and must be requested within the applicable
              cancellation period.
            </p>
            <p className="text-[13px] leading-[1.55] text-ink-soft">
              Where operationally feasible, one rescheduling request may be accommodated. Any
              difference in price between the original and rescheduled experience, where
              applicable, will be payable by the guest.
            </p>
          </div>
        </div>

        <div>
          <h2 className="font-serif text-[16.5px] font-bold text-ink">
            7. Cancellation by Guide Guru Global
          </h2>
          <div className="mt-1.5 space-y-1.5">
            <p className="text-[13px] leading-[1.55] text-ink-soft">
              In exceptional circumstances, Guide Guru Global or its operating partners may need
              to cancel, postpone or materially modify an experience due to circumstances beyond
              reasonable control, including severe weather or environmental conditions,
              government or administrative restrictions, closure or restricted access to a
              destination, safety or security concerns, religious or civic events affecting
              access, and other unforeseen operational circumstances.
            </p>
            <p className="text-[13px] leading-[1.55] text-ink-soft">
              In such cases, we will make reasonable efforts to provide an alternative date, time
              or suitable alternative arrangement, subject to availability.
            </p>
            <p className="text-[13px] leading-[1.55] text-ink-soft">
              If an alternative cannot reasonably be arranged, the guest will receive a full
              refund of the amount paid for the affected experience.
            </p>
          </div>
        </div>

        <div>
          <h2 className="font-serif text-[16.5px] font-bold text-ink">
            8. Changes to an Experience
          </h2>
          <div className="mt-1.5 space-y-1.5">
            <p className="text-[13px] leading-[1.55] text-ink-soft">
              Routes, timings, stops or inclusions may occasionally need to be modified due to
              site access, crowd management, weather, local conditions, safety considerations or
              operational requirements.
            </p>
            <p className="text-[13px] leading-[1.55] text-ink-soft">
              Where a change materially affects the experience, the guest will be informed and
              reasonable alternatives will be considered.
            </p>
          </div>
        </div>

        <div>
          <h2 className="font-serif text-[16.5px] font-bold text-ink">9. Refund Processing</h2>
          <div className="mt-1.5 space-y-1.5">
            <p className="text-[13px] leading-[1.55] text-ink-soft">
              Where a refund is approved, it will be initiated to the original payment method
              used for the booking.
            </p>
            <p className="text-[13px] leading-[1.55] text-ink-soft">
              The time taken for the refund to reflect in the guest&rsquo;s account may vary
              depending on the payment gateway, bank or financial institution.
            </p>
          </div>
        </div>

        <div>
          <h2 className="font-serif text-[16.5px] font-bold text-ink">10. Personal Expenses</h2>
          <p className="mt-1.5 text-[13px] leading-[1.55] text-ink-soft">
            Refunds do not include personal expenses incurred by the guest, including tips,
            dakshina, donations, personal purchases or other expenses not expressly included in
            the booking.
          </p>
        </div>

        <div>
          <h2 className="font-serif text-[16.5px] font-bold text-ink">
            11. How to Request a Cancellation or Refund
          </h2>
          <div className="mt-1.5 space-y-1.5">
            <p className="text-[13px] leading-[1.55] text-ink-soft">
              For cancellations, rescheduling requests or refund-related assistance, please
              contact the Ayodhya Anubhav Experience Desk through the WhatsApp contact provided
              on the{" "}
              <Link href="/contact" className="font-semibold text-terracotta">
                Get in Touch
              </Link>{" "}
              page or your booking confirmation.
            </p>
            <p className="text-[13px] leading-[1.55] text-ink-soft">
              Please keep your booking reference number available when contacting us.
            </p>
          </div>
        </div>

        <div className="rounded-card border border-terracotta/30 bg-terracotta-tint p-3.5">
          <h2 className="font-serif text-[15px] font-bold text-ink">Important Before You Book</h2>
          <p className="mt-1.5 text-[13px] leading-[1.55] text-ink-soft">
            Full payment is required to confirm your experience. Cancellation and refund
            eligibility depends on the time remaining before your scheduled experience. No refund
            is available for no-shows or late arrivals where the experience cannot be delivered.
            By proceeding with payment, you acknowledge and agree to this Cancellation &amp;
            Refund Policy.
          </p>
        </div>

        <div>
          <h2 className="font-serif text-[16.5px] font-bold text-ink">Contact Us</h2>
          <p className="mt-1.5 text-[13px] leading-[1.55] text-ink-soft">
            Questions about this policy? Reach us at{" "}
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
