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
    heading: "Legal Basis for Processing",
    body: [
      "We process your personal information on the basis of your consent, given when you submit a booking or message through this site. You may withdraw this consent at any time by contacting us using the details below.",
      "If you withdraw consent, we may not be able to complete or manage an existing booking, but this won't affect any processing already carried out before withdrawal.",
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
      "We don't sell or rent your information to anyone. We share only what's needed to run your experience — with your assigned guide and the property team, to coordinate your visit.",
      "We also share information with service providers who help us operate this site and communicate with you — including our website hosting provider and WhatsApp Business (Meta), which we use to send booking confirmations and messages. These providers only receive what they need to perform their function and are not permitted to use your information for their own purposes.",
      "Where any of these service providers are located or process data outside India (for example, hosting or messaging infrastructure), we take reasonable steps to ensure your information continues to receive an appropriate standard of protection.",
    ],
  },
  {
    heading: "Data Storage & Security",
    body: [
      "Your booking, query, and contact details are stored securely and retained only as long as needed to provide the service and meet legal or tax requirements — typically for the duration of your visit plus 10 years for record-keeping purposes, after which they are deleted or anonymised.",
      "Your language choice lives only in your browser's local storage and is never sent to us.",
    ],
  },
  {
    heading: "Cookies & Tracking",
    body: [
      "This site doesn't use advertising or analytics cookies. The only thing saved locally is your language preference and, for our staff, an admin login session.",
    ],
  },
  {
    heading: "Your Rights",
    body: [
      "Under applicable data protection law, you can ask us to access the personal information we hold about you, correct inaccurate or incomplete information, delete your information (subject to any legal or record-keeping requirements), and withdraw your consent to processing at any time.",
      "To exercise any of these rights, contact us using the details below. We will respond within a reasonable time and in line with applicable law.",
    ],
  },
  {
    heading: "Data Breach Notification",
    body: [
      "If a breach of your personal information occurs that is likely to affect your rights, we will notify the relevant regulatory authority and affected users as required under applicable law.",
    ],
  },
  {
    heading: "Children's Privacy",
    body: [
      "This service isn't directed at children. Where a booking or message includes a person under 18 (for example, as part of a family booking), we rely on the accompanying parent or guardian to provide this information on the child's behalf and to have their consent to do so. We don't knowingly collect information directly from a child without such guardian involvement.",
    ],
  },
  {
    heading: "Changes to This Policy",
    body: [
      "We may update this policy occasionally. The date at the top will always reflect the latest version. Material changes will be reflected here; continued use of the site after an update means you accept the revised policy.",
    ],
  },
];

export default function PrivacyPolicy() {
  return (
    <section className="px-4 pt-3">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[12px] text-ink-muted">
        <span className="font-semibold text-terracotta">Privacy Policy</span>
      </nav>

      <h1 className="mt-3 font-serif text-[28px] font-bold leading-[1.1] tracking-[-0.02em] text-ink">
        Privacy Policy
      </h1>
      <SectionOrnament />
      <p className="mt-2 text-[11.5px] font-medium uppercase tracking-[0.05em] text-ink-faint">
        Last updated: August 26, 2026
      </p>
      <p className="mt-3 text-[13.5px] leading-[1.55] text-ink-soft">
        Guide Guru Global (&ldquo;we&rdquo;, &ldquo;us&rdquo;) operates Ayodhya Anubhav, the
        guided-experience booking site you&rsquo;re using. This page explains what information we
        collect when you browse, book, or message us, how we use it, and the rights you have over
        it.
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
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
