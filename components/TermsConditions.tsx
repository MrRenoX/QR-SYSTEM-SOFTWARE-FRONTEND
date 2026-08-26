import Link from "next/link";
import SectionOrnament from "./SectionOrnament";

const SECTIONS: { heading: string; body: string[] }[] = [
  {
    heading: "1. About Ayodhya Anubhav",
    body: [
      "Ayodhya Anubhav is a curated collection of experiences designed to help guests discover the many layers of Ayodhya through local guides, stories, heritage, traditions, communities, food, crafts, riverscapes and other destination experiences.",
      "Experiences may involve services delivered by Guide Guru Global, local guides, mobility providers, artisans, venues and other experience partners.",
    ],
  },
  {
    heading: "2. Booking an Experience",
    body: [
      "Guests may discover and book experiences through the Ayodhya Anubhav website, the Ayodhya Anubhav Experience Desk at Evoke Rambagh, WhatsApp or other authorised booking channels.",
      "To make a booking, guests may be required to provide information including name, contact number, number of guests, preferred date and time, and other information reasonably required to deliver the experience.",
      "Guests are responsible for ensuring that the information provided at the time of booking is accurate.",
    ],
  },
  {
    heading: "3. Booking Confirmation & Payment",
    body: [
      "All experiences must be paid for in full before the experience begins.",
      "A booking will be considered confirmed only after successful receipt of the full payment and issuance of a booking confirmation.",
      "Prices applicable at the time of booking will be displayed before payment. Where applicable, taxes and other mandatory charges will be included or separately identified before payment.",
    ],
  },
  {
    heading: "4. Experience Details",
    body: [
      "Each experience page provides relevant information about the experience, including, where applicable, description, duration, route, walking level, inclusions, exclusions, recommended attire or footwear, important guest instructions, and timing and other operational information.",
      "Guests are advised to read the experience details carefully before booking. The experience-specific information displayed at the time of booking will form part of the booking terms.",
    ],
  },
  {
    heading: "5. Guides & Experience Partners",
    body: [
      "Experiences may be delivered with the assistance of certified local guides, mobility providers, artisans, local communities, venues and other experience partners.",
      "Guide Guru Global will make reasonable efforts to ensure that experiences are delivered as described and that appropriate operational arrangements are made.",
      "Where operational circumstances require a change in guide, vehicle, route or other service component, a suitable alternative may be provided.",
    ],
  },
  {
    heading: "6. Transportation & Mobility",
    body: [
      "Where mobility is included, the applicable mode of transportation will be specified on the relevant experience page or communicated at the time of booking.",
      "Guests are required to follow reasonable safety instructions provided by the guide, driver or experience team.",
      "Personal transportation requirements or additional journeys not expressly included in the experience are the responsibility of the guest.",
    ],
  },
  {
    heading: "7. Guest Responsibilities",
    body: [
      "Guests are expected to arrive at the designated meeting or pick-up point on time, follow instructions provided by the guide and experience team, respect religious sites, local customs, communities and cultural practices, comply with applicable rules and instructions at temples, monuments, ghats and other sites visited, take reasonable care of personal belongings, ensure that children accompanying them remain under appropriate adult supervision, and inform the Experience Desk of any relevant mobility, accessibility or other requirements before the experience wherever possible.",
      "Guests may be asked to leave an experience if their conduct poses a safety risk, causes serious disruption or is inappropriate towards guides, staff, local communities or other guests.",
    ],
  },
  {
    heading: "8. Religious & Heritage Sites",
    body: [
      "Some experiences include visits to religious, heritage or culturally sensitive sites. Access to such locations may be subject to site-specific rules, security checks, crowd conditions, government or administrative directions, religious protocols, and restrictions on photography, footwear, personal belongings or other items.",
      "Guests must comply with the rules applicable at each site. Guide Guru Global cannot guarantee access to a particular site where access is restricted or withdrawn by the relevant authority.",
    ],
  },
  {
    heading: "9. Timings & Punctuality",
    body: [
      "Guests are requested to arrive at the confirmed time. Certain experiences may be dependent on fixed timings, including temple darshan, aarti, sunrise and sunset experiences.",
      "Late arrival may result in the experience being shortened, modified or, where the experience can no longer reasonably be delivered, treated as a no-show. The applicable cancellation and refund terms are set out in the Cancellation & Refund Policy.",
    ],
  },
  {
    heading: "10. Changes to Routes or Experience Components",
    body: [
      "Routes, timings, stops or experience components may occasionally need to be modified because of weather or environmental conditions, crowd management, site access or closure, government or administrative directions, religious or civic events, safety considerations, local conditions, or other unforeseen operational circumstances.",
      "Where reasonably possible, guests will be informed and a suitable alternative will be offered.",
    ],
  },
  {
    heading: "12. No-Show",
    body: [
      "A guest who does not arrive at the designated meeting or pick-up point at the confirmed time, without prior communication with the Experience Desk, will be treated as a no-show.",
      "No refund will be provided for a no-show, in accordance with the Cancellation & Refund Policy.",
    ],
  },
  {
    heading: "13. Personal Belongings",
    body: [
      "Guests are responsible for their personal belongings during the experience. Where a venue or religious site requires guests to deposit footwear, mobile phones, bags, cameras or other belongings in designated lockers or storage facilities, guests must follow the applicable procedure and retain any token or receipt provided to them.",
      "Guide Guru Global is not responsible for personal belongings that are lost, misplaced or damaged unless such responsibility is established under applicable law.",
    ],
  },
  {
    heading: "14. Tips, Dakshina & Personal Purchases",
    body: [
      "Unless expressly stated otherwise, the experience price does not include dakshina, tips, donations, personal purchases, food or beverages not specifically included, or other personal expenses. Guests may choose whether and when to make such payments or purchases.",
    ],
  },
  {
    heading: "15. Safety & Guest Suitability",
    body: [
      "Guests should select an experience appropriate to their physical comfort, mobility and personal circumstances. Walking levels and relevant requirements are indicated on individual experience pages.",
      "Guests are encouraged to contact the Experience Desk before booking if they have questions regarding walking, accessibility, age suitability or other requirements.",
    ],
  },
  {
    heading: "16. Children",
    body: [
      "Children are welcome on experiences where the experience is suitable for them. Children above 12 years of age will be charged for the experience.",
      "Where an experience has specific age, mobility or safety considerations, these will be indicated on the relevant experience page or communicated before booking. Children remain the responsibility of their accompanying parent or guardian throughout the experience.",
    ],
  },
  {
    heading: "17. Photography & Recording",
    body: [
      "Guests may take photographs or videos during an experience where permitted by the relevant venue, site authorities and local customs. Photography or recording may be restricted at certain religious, heritage or other locations.",
      "Guests must respect such restrictions and the privacy of other guests, local residents, guides and community members.",
    ],
  },
  {
    heading: "18. Payments & Payment Information",
    body: [
      "Payments made through the website are processed through the designated payment gateway or payment service provider.",
      "Guide Guru Global does not require guests to share their complete card, UPI PIN, password or other confidential payment credentials with our staff. Guests should never share their UPI PIN, card PIN, OTP or banking password with any person claiming to represent Ayodhya Anubhav or Guide Guru Global.",
    ],
  },
  {
    heading: "20. Third-Party Services",
    body: [
      "Certain components of an experience may involve third-party service providers or local experience partners. We make reasonable efforts to work with appropriate partners and coordinate the experience; however, the availability and delivery of third-party components may be subject to their operational conditions and applicable site rules.",
    ],
  },
  {
    heading: "21. Limitation of Liability",
    body: [
      "Guide Guru Global will take reasonable care in planning and coordinating experiences. However, to the extent permitted under applicable law, Guide Guru Global will not be responsible for loss, delay, injury, damage or expense arising from circumstances beyond its reasonable control, including changes in site access, government restrictions, severe weather, crowd conditions, acts of third parties or other unforeseen circumstances.",
      "Nothing in these Terms & Conditions is intended to exclude or limit any liability that cannot legally be excluded or limited under applicable law.",
    ],
  },
  {
    heading: "22. Changes to Experiences",
    body: [
      "Guide Guru Global reserves the right to modify, suspend or discontinue an experience where necessary due to operational, safety, regulatory, site-access or other legitimate reasons.",
      "Where a confirmed booking is materially affected, reasonable efforts will be made to provide an alternative arrangement or refund in accordance with the Cancellation & Refund Policy.",
    ],
  },
  {
    heading: "23. Changes to These Terms",
    body: [
      "These Terms & Conditions may be updated from time to time to reflect changes in our services, operating arrangements or applicable legal requirements. The latest version will be published on this website with the relevant Last Updated date.",
    ],
  },
  {
    heading: "24. Governing Law",
    body: [
      "These Terms & Conditions shall be governed by and interpreted in accordance with the laws of India. Any dispute arising in connection with these Terms & Conditions shall be subject to the jurisdiction of the courts having appropriate jurisdiction, subject to applicable law.",
    ],
  },
];

export default function TermsConditions() {
  return (
    <section className="px-4 pt-3">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[12px] text-ink-muted">
        <span className="font-semibold text-terracotta">Terms & Conditions</span>
      </nav>

      <h1 className="mt-3 font-serif text-[28px] font-bold leading-[1.1] tracking-[-0.02em] text-ink">
        Terms & Conditions
      </h1>
      <SectionOrnament />
      <p className="mt-2 text-[11.5px] font-medium uppercase tracking-[0.05em] text-ink-faint">
        Last updated: August 26, 2026
      </p>
      <p className="mt-3 text-[13.5px] leading-[1.55] text-ink-soft">
        Welcome to Ayodhya Anubhav, a destination-specific experience campaign by Guide Guru
        Global, created for Evoke Rambagh, Ayodhya. By accessing this website, enquiring about, or
        booking an Ayodhya Anubhav experience, you agree to these Terms &amp; Conditions, along
        with our{" "}
        <Link href="/refund-policy" className="font-semibold text-terracotta">
          Cancellation &amp; Refund Policy
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="font-semibold text-terracotta">
          Privacy Policy
        </Link>
        .
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
            11. Cancellation, Refund &amp; Rescheduling
          </h2>
          <div className="mt-1.5 space-y-1.5">
            <p className="text-[13px] leading-[1.55] text-ink-soft">
              All cancellations, refunds and rescheduling requests are governed by the Ayodhya
              Anubhav Cancellation &amp; Refund Policy, which includes separate provisions for
              advance bookings and same-day/on-the-spot bookings, as well as provisions relating
              to no-shows and late arrival.
            </p>
            <Link
              href="/refund-policy"
              className="inline-block text-[13px] font-bold text-terracotta"
            >
              View Cancellation &amp; Refund Policy →
            </Link>
          </div>
        </div>

        <div>
          <h2 className="font-serif text-[16.5px] font-bold text-ink">19. Privacy</h2>
          <div className="mt-1.5 space-y-1.5">
            <p className="text-[13px] leading-[1.55] text-ink-soft">
              Information provided by guests is handled in accordance with our Privacy Policy,
              which explains what information we collect, why we collect it, how it may be used
              and the circumstances in which it may be shared with relevant service providers for
              fulfilling a booking. This is particularly important for the QR booking flow because
              Indian data-protection law requires clear information about the personal data being
              processed and the purposes for which it is processed.
            </p>
            <Link href="/privacy" className="inline-block text-[13px] font-bold text-terracotta">
              View Privacy Policy →
            </Link>
          </div>
        </div>

        <div>
          <h2 className="font-serif text-[16.5px] font-bold text-ink">25. Contact Us</h2>
          <p className="mt-1.5 text-[13px] leading-[1.55] text-ink-soft">
            For bookings, enquiries, cancellations, feedback, complaints or assistance, reach the
            Ayodhya Anubhav Experience Desk at Evoke Rambagh, Ayodhya —{" "}
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
