import type { FAQGroup } from "@/lib/types";

export const faqGroups: FAQGroup[] = [
  {
    category: "Booking",
    items: [
      {
        question: "How do I book an experience?",
        answer:
          "Browse experiences, open the one you like and tap \"Book this experience.\" Fill in your details and preferred time, and our team confirms it — usually within the hour.",
      },
      {
        question: "Can I book directly from my room?",
        answer:
          "Yes — scan the QR code in your room or the lobby to open this site, then browse and book without calling the front desk.",
      },
      {
        question: "Do I need to book in advance?",
        answer:
          "It's recommended, especially for early morning darshans and boat rides. Same-day bookings are often possible too — message us on WhatsApp to check availability.",
      },
    ],
  },
  {
    category: "Experiences",
    items: [
      {
        question: "Are the guides certified?",
        answer:
          "Yes. Every storyteller guide is certified and local to Ayodhya, chosen for both their knowledge and their storytelling.",
      },
      {
        question: "What's included in the price?",
        answer:
          "Each experience page lists exactly what's included — guide, transport, entry assistance — and what isn't, like offerings or meals, under \"Included\" and \"Not Included.\"",
      },
      {
        question: "Can experiences be customized for groups or families?",
        answer:
          "Absolutely. Message us with your group size and interests and we'll tailor the pace and route to suit you.",
      },
    ],
  },
  {
    category: "Payments & Cancellations",
    items: [
      {
        question: "What payment methods are accepted?",
        answer:
          "We accept UPI, cards and cash. Payment details are shared once your booking is confirmed by our team.",
      },
      {
        question: "What's the cancellation policy?",
        answer:
          "Free cancellation up to 24 hours before your experience, with a full refund. Reach out on WhatsApp and we'll take care of it.",
      },
    ],
  },
  {
    category: "On the Day",
    items: [
      {
        question: "Where do experiences begin?",
        answer:
          "Every experience begins and ends at Evoke Rambagh, unless noted otherwise on the experience page.",
      },
      {
        question: "What should I bring or wear?",
        answer:
          "Modest clothing for temple visits and comfortable walking shoes are a safe default. Anything specific to an experience is noted on its page.",
      },
      {
        question: "What if I'm running late or need to reschedule?",
        answer:
          "Message your guide or our WhatsApp concierge as soon as you can — we'll do our best to adjust the plan around you.",
      },
    ],
  },
];
