/**
 * Central UI-string dictionary for the public site. Only static, frontend-owned
 * copy lives here — navigation labels, headings, form labels, buttons, empty
 * states, etc. Admin-managed content (experience titles/descriptions, FAQ
 * question/answers, category names, touchpoint stories, site settings such as
 * hero copy or footer description) comes from the real backend API and is
 * deliberately NOT translated here — see lib/types.ts and services/*.ts.
 *
 * `en` is the structural source of truth: `hi`, `gu` and `ta` are typed
 * against `typeof en`, so a missing or mis-shaped key in any language is a
 * compile-time error rather than a silent runtime fallback gap.
 */

export type Language = "en" | "hi" | "gu" | "ta";

export const LANGUAGE_LABELS: Record<Language, string> = {
  en: "English",
  hi: "हिन्दी",
  gu: "ગુજરાતી",
  ta: "தமிழ்",
};

const en = {
  header: {
    homeAriaLabel: "Guide Guru Global — Home",
    selectLanguageAriaLabel: "Select language",
    openMenuAriaLabel: "Open menu",
  },
  mobileMenu: {
    title: "Menu",
    closeAriaLabel: "Close menu",
    mainMenuAriaLabel: "Main menu",
    primaryNavAriaLabel: "Primary",
    items: {
      experiences: "Experiences",
      categories: "Categories",
      about: "About Us",
      contact: "Get in Touch",
      faqs: "FAQs",
    },
    chatWhatsapp: "Chat on WhatsApp",
    tagline: "Every experience begins and ends at Evoke Rambagh",
  },
  footer: {
    needHelp: "Need Help?",
    needHelpDetail: "We're here to help you plan the perfect experience.",
    chatWhatsapp: "Chat on WhatsApp",
    callUs: "Call Us",
    exploreHeading: "Explore",
    companyHeading: "Company",
    contactHeading: "Contact",
    exploreLinks: {
      allExperiences: "All Experiences",
      categories: "Categories",
      howItWorks: "How It Works",
      customExperiences: "Custom Experiences",
    },
    companyLinks: {
      aboutUs: "About Us",
      contactUs: "Get In Touch",
      faqs: "FAQs",
      privacyPolicy: "Privacy Policy",
      termsConditions: "Terms & Conditions",
      refundPolicy: "Refund & Cancellation Policy",
    },
    visitWebsite: "Visit Guide Guru Global Website",
    scanQr: "Scan to open.",
    qrAlt: "QR code linking to the Guide Guru Global website",
  },
  home: {
    curatedExperiencesHeading: "Curated Experiences",
  },
  hero: {
    welcomeTo: "Welcome to",
    featureCurated: { title: "Curated Experiences", detail: "by Guide Guru Global" },
    featureCertified: { title: "Certified Guides", detail: "" },
    featureBegins: { title: "Every experience begins", detail: "and ends at Evoke Rambagh" },
    expCountLine1: "experiences",
    expCountLine2: "curated for you",
    exploreExperiences: "Explore Experiences",
  },
  introSection: {
    headingLead: "Ayodhya is more than",
    headingHighlight: "700 ancient temples.",
    subtitleLine1: "A city of faith, culture,",
    subtitleLine2: "stories and timeless traditions.",
    didYouKnow: "Did you know?",
    blocks: {
      ancientTemples: { title: "Ancient Temples", detail: "Timeless Heritage" },
      sacredStories: { title: "Sacred Stories", detail: "Passed Down Generations" },
      localExpertise: { title: "Local Expertise", detail: "Authentic Experiences" },
      curatedWithLove: { title: "Curated with Love", detail: "For Every Traveler" },
    },
  },
  trustSection: {
    ariaLabel: "Why guests book with us",
    pillars: {
      guides: { title: "Certified Guides", detail: "Expert & passionate local storytellers" },
      safety: {
        title: "Seamless Journeys",
        detail: "Well-planned routes & comfortable mobility for a smooth experience",
      },
      authentic: {
        title: "Authentic Local Experiences",
        detail: "Go beyond the obvious and discover the real Ayodhya",
      },
      personalized: {
        title: "Curated for You",
        detail: "Thoughtfully curated journeys that match your interests and reveal Ayodhya beyond the familiar",
      },
    },
  },
  howItWorks: {
    heading: "How It Works",
    steps: {
      explore: { title: "1. Explore", detail: "Discover experiences curated for you" },
      choose: { title: "2. Choose", detail: "Pick a date as per the scheduled time slots" },
      shareDetails: { title: "3. Share Details", detail: "Tell us a bit about yourself" },
      bookPay: { title: "4. Book & Pay", detail: "Secure your spot with easy payment" },
      enjoy: { title: "5. Enjoy", detail: "We take care of the rest, you enjoy the journey!" },
    },
  },
  categories: {
    pageHeader: {
      title: "Browse by Category",
      subtitle: "Fourteen ways into Ayodhya — pick where you begin.",
    },
  },
  categoryFilters: {
    all: "All",
  },
  categoryCard: {
    browseAriaLabel: (name: string, count: number) =>
      `Browse ${name} experiences — ${count} available`,
    experienceCount: (count: number) => `${count} ${count === 1 ? "experience" : "experiences"}`,
  },
  experiences: {
    pageHeader: {
      title: "The Experience Menu",
      subtitle: "Choose your journey",
    },
    emptyState: "Nothing in this category yet. Choose another to keep exploring.",
    viewAll: "View all experiences",
  },
  experienceCard: {
    startsFrom: "Starts from",
    perPerson: "/ person",
    durationSr: "Duration",
    groupSizeSr: "Group size",
    ariaLabel: (title: string, category: string, duration: string, price: string) =>
      `${title} — ${category}, ${duration}, from ${price} per person`,
  },
  experienceHero: {
    backAriaLabel: "Back to all experiences",
  },
  experienceInfo: {
    durationLabel: "Duration",
    groupSizeLabel: "Group size",
    bestTimeLabel: "Best time",
    startingFromLabel: "Starting from",
    availableSlots: "Available slots",
    included: "Inclusions",
    notIncluded: "Exclusions",
    didYouKnowHeading: "Did you know?",
    pricingOptions: "Pricing options",
    bestValue: "Best value",
    bookThisExperience: "Book this experience",
    raiseAQuery: "Raise a query",
  },
  journeyRoute: {
    heading: "The journey",
    subtitle: "Begins and ends at Evoke Rambagh",
    stopsCount: (count: number) => `${count} stops`,
    start: "Start",
    end: "End",
  },
  touchpoints: {
    section: {
      heading: "Along the way",
      subtitle: "Tap any stop to see what happens there",
    },
    card: {
      openAriaLabel: (name: string) => `Open details for ${name}`,
    },
    modal: {
      closeAriaLabel: "Close details",
      recommended: "Recommended",
      bestTime: "Best time",
      didYouKnow: "Did you know?",
    },
  },
  bookingForm: {
    backAriaLabel: (title: string) => `Back to ${title}`,
    headerTitle: "Book this experience",
    fromPricePrefix: "From",
    yourDetails: "Your details",
    guestName: "Guest name",
    guestNamePlaceholder: "As per your check-in",
    roomNumber: "Room number",
    roomNumberPlaceholder: "204",
    whatsapp: "WhatsApp / Mobile",
    whatsappPlaceholder: "+91",
    email: "Email",
    emailPlaceholder: "you@example.com",
    date: "Date",
    preferredTime: "Preferred time",
    adults: "Adults",
    children: "Children",
    specialRequest: "Special request",
    specialRequestPlaceholder: "Wheelchair access, language preference, anything else",
    bookingSummary: "Booking summary",
    experienceLabel: "Experience",
    dateLabel: "Date",
    timeLabel: "Time",
    guestsLabel: "Guests",
    pickupLabel: "Pick-up",
    pickupValue: "Evoke Rambagh",
    notSelected: "Not selected",
    guestsSummary: (adults: number, children: number) =>
      `${adults} adult${adults === 1 ? "" : "s"}${
        children ? `, ${children} child${children === 1 ? "" : "ren"}` : ""
      }`,
    estimatedTotalLabel: (guests: number) =>
      `Estimated total (${guests} ${guests === 1 ? "guest" : "guests"})`,
    pricingAppliedLabel: (tier: string) => `Pricing applied: ${tier}`,
    paymentNotice:
      "Payment is not connected yet. Submitting sends your request to reception, who will confirm and share a secure payment link.",
    sendBooking: "Send booking request",
    sending: "Sending…",
    successTitle: "Request received.",
    successBody: (guestName: string, title: string, date: string) =>
      `${guestName || "Your"}'s booking request for ${title}${
        date ? ` on ${date}` : ""
      } has been received. Reception will confirm on WhatsApp and share the payment link.`,
    bookAnother: "Book another experience",
  },
  queryForm: {
    heading: "Raise a query",
    subtitleWithExperience: (title: string) => `Ask anything about ${title}.`,
    subtitleDefault: "Ask anything before you book.",
    name: "Name",
    namePlaceholder: "Your name",
    roomNumber: "Room number",
    roomNumberPlaceholder: "204",
    mobile: "Mobile",
    mobilePlaceholder: "+91",
    question: "Question",
    questionPlaceholder: "What would you like to know?",
    send: "Send query",
    sending: "Sending…",
    successTitle: "Your query has been received.",
    successBody: "Our team replies on WhatsApp, usually within an hour.",
    askAnother: "Ask something else",
  },
  contact: {
    hero: {
      breadcrumbCurrent: "Get in Touch",
      title: "Get in Touch",
    },
    channels: {
      sectionHeadingSr: "Ways to reach us",
      needHelpHeading: "Need Help?",
      experienceDeskIntro: "Our Experience Desk is here for you.",
      question:
        "Have a question, want to book an experience, need help with an existing booking, or simply want a recommendation?",
      assistanceLabel: "For assistance with:",
      assistanceItems: "Bookings · Enquiries · Feedback",
      chatWithUsLabel: "Chat with us on WhatsApp.",
      whatsappButtonLabel: "WhatsApp the Experience Desk",
      callUs: "Call us",
      emailUs: "Email us",
      visitUs: "Visit us",
      getDirections: "Get directions",
      hoursLine: "Every day, 7 AM – 9 PM IST",
      preferToSpeak: "Prefer to speak to someone?",
      visitDeskBody: "Visit the Ayodhya Anubhav Experience Desk at Evoke Rambagh Reception.",
      exploreAskExperience: "Explore. Ask. Experience.",
      exploreExperiences: "Explore Experiences",
    },
    form: {
      heading: "Send us a message",
      subtitle: "Prefer writing it out? Drop us a note and we'll reply on WhatsApp or email.",
      name: "Name",
      namePlaceholder: "Your name",
      contactMethod: "Phone or email",
      contactMethodPlaceholder: "+91 · or · you@example.com",
      message: "Message",
      messagePlaceholder: "How can we help?",
      send: "Send message",
      sending: "Sending…",
      successTitle: "Message sent.",
      successBody: (name: string) =>
        `Thanks, ${name || "there"} — our team will get back to you shortly.`,
      sendAnother: "Send another message",
    },
  },
  faqs: {
    hero: {
      breadcrumbCurrent: "FAQs",
      titleLine1: "Frequently Asked",
      titleLine2: "Questions",
      subtitle:
        "Everything you need to know before booking. Can't find your answer? Our team is a message away.",
    },
    accordion: {
      sectionHeadingSr: "Questions and answers",
    },
    contactCta: {
      stillHaveQuestions: "Still have questions?",
      body: "Our team is happy to help — reach out and we'll get back to you fast.",
      contactTeam: "Contact our team",
    },
  },
  about: {
    hero: {
      breadcrumbCurrent: "About Ayodhya Anubhav",
      title: "About Ayodhya Anubhav",
      subtitle: "Fifteen journeys into the many layers of Ayodhya.",
    },
    story: {
      paragraph1:
        "Ayodhya Anubhav is a destination-specific experience campaign by Guide Guru Global, created especially for Evoke Rambagh, bringing together thoughtfully curated journeys that enable you to discover the many layers of Ayodhya.",
      paragraph2:
        "From its sacred heritage and timeless stories to its living traditions, neighbourhoods, sacred waters, crafts, cuisine, music and people, each experience has been designed to take you beyond the familiar and help you experience Ayodhya in a more meaningful way.",
      poweredByHeading: "Powered by Guide Guru Global",
      poweredByParagraph1:
        "Guide Guru Global is an experience-first travel platform connecting travellers with curated journeys, authentic local stories and passionate storytellers across India's destinations.",
      poweredByParagraph2:
        "We work with luxury hotels, certified local guides and destination communities to create experiences that are thoughtfully planned, locally rooted and easy to discover and book.",
      poweredByParagraph3:
        "With Ayodhya Anubhav, we bring this approach to Ayodhya, creating a collection of journeys that you can discover and book directly through this platform during your stay at Evoke Rambagh.",
      journeyHeading: "Your Ayodhya Journey Starts Here",
      journeyParagraph:
        "Whether you have a few hours, an entire evening or a full day to explore, choose an experience that matches your interests and let us take care of the details.",
    },
    cta: {
      tagline: "Explore. Choose. Experience Ayodhya.",
      explore: "Explore Experiences",
    },
  },
  notFound: {
    code: "404",
    heading: "This page isn't part of the journey.",
    body: "The experience you followed may have been renamed or moved.",
    browseAll: "Browse all experiences",
  },
  error: {
    oops: "Oops",
    heading: "Something went wrong.",
    body: "Please try again — if this keeps happening, reach us on WhatsApp and we'll sort it out.",
    tryAgain: "Try again",
  },
  loading: {
    label: "Loading",
    labelWithEllipsis: "Loading…",
  },
};

export type TranslationDict = typeof en;

const hi: TranslationDict = {
  header: {
    homeAriaLabel: "गाइड गुरु ग्लोबल — मुखपृष्ठ",
    selectLanguageAriaLabel: "भाषा चुनें",
    openMenuAriaLabel: "मेनू खोलें",
  },
  mobileMenu: {
    title: "मेनू",
    closeAriaLabel: "मेनू बंद करें",
    mainMenuAriaLabel: "मुख्य मेनू",
    primaryNavAriaLabel: "मुख्य नेविगेशन",
    items: {
      experiences: "अनुभव",
      categories: "श्रेणियाँ",
      about: "हमारे बारे में",
      contact: "हमसे जुड़ें",
      faqs: "सामान्य प्रश्न",
    },
    chatWhatsapp: "व्हाट्सएप पर चैट करें",
    tagline: "हर अनुभव एवोक रामबाग से शुरू और वहीं समाप्त होता है",
  },
  footer: {
    needHelp: "मदद चाहिए?",
    needHelpDetail: "आपके लिए सही अनुभव चुनने में हम मदद के लिए यहाँ हैं।",
    chatWhatsapp: "व्हाट्सऐप पर बात करें",
    callUs: "हमें कॉल करें",
    exploreHeading: "एक्सप्लोर करें",
    companyHeading: "कंपनी",
    contactHeading: "संपर्क",
    exploreLinks: {
      allExperiences: "सभी अनुभव",
      categories: "श्रेणियाँ",
      howItWorks: "यह कैसे काम करता है",
      customExperiences: "कस्टम अनुभव",
    },
    companyLinks: {
      aboutUs: "हमारे बारे में",
      contactUs: "हमसे जुड़ें",
      faqs: "सामान्य प्रश्न",
      privacyPolicy: "गोपनीयता नीति",
      termsConditions: "नियम व शर्तें",
      refundPolicy: "रद्दीकरण व धनवापसी नीति",
    },
    visitWebsite: "हमारी वेबसाइट देखें",
    scanQr: "इस साइट को अपने फोन पर खोलने के लिए स्कैन करें",
    qrAlt: "गाइड गुरु ग्लोबल की वेबसाइट का क्यूआर कोड",
  },
  home: {
    curatedExperiencesHeading: "चुनिंदा अनुभव",
  },
  hero: {
    welcomeTo: "आपका स्वागत है",
    featureCurated: { title: "चुनिंदा अनुभव", detail: "गाइड गुरु ग्लोबल द्वारा" },
    featureCertified: { title: "प्रमाणित गाइड", detail: "" },
    featureBegins: { title: "हर अनुभव शुरू होता है", detail: "और एवोक रामबाग पर समाप्त होता है" },
    expCountLine1: "अनुभव",
    expCountLine2: "आपके लिए चुने गए",
    exploreExperiences: "अनुभव देखें",
  },
  introSection: {
    headingLead: "अयोध्या सिर्फ",
    headingHighlight: "700 प्राचीन मंदिरों से कहीं बढ़कर है।",
    subtitleLine1: "आस्था, संस्कृति,",
    subtitleLine2: "कहानियों और शाश्वत परंपराओं का शहर।",
    didYouKnow: "क्या आप जानते हैं?",
    blocks: {
      ancientTemples: { title: "प्राचीन मंदिर", detail: "शाश्वत विरासत" },
      sacredStories: { title: "पवित्र कथाएँ", detail: "पीढ़ी दर पीढ़ी चली आईं" },
      localExpertise: { title: "स्थानीय विशेषज्ञता", detail: "प्रामाणिक अनुभव" },
      curatedWithLove: { title: "प्रेम से तैयार", detail: "हर यात्री के लिए" },
    },
  },
  trustSection: {
    ariaLabel: "अतिथि हमारे साथ क्यों बुक करते हैं",
    pillars: {
      guides: { title: "विशेषज्ञ कथावाचक गाइड", detail: "प्रमाणित व जुनूनी स्थानीय लोग" },
      safety: {
        title: "सहज व सुरक्षित यात्राएँ",
        detail: "सुनियोजित मार्ग, सत्यापित वाहन व प्राथमिकता पहुँच",
      },
      authentic: {
        title: "प्रामाणिक स्थानीय अनुभव",
        detail: "सामान्य से आगे बढ़कर असली अयोध्या को जानें",
      },
      personalized: {
        title: "आपके लिए व्यक्तिगत",
        detail: "आपकी रुचियों से मेल खाते चुनिंदा अनुभव",
      },
    },
  },
  howItWorks: {
    heading: "यह कैसे काम करता है",
    steps: {
      explore: { title: "1. एक्सप्लोर करें", detail: "आपके लिए चुने गए अनुभव खोजें" },
      choose: { title: "2. चुनें", detail: "तारीख, समय व अनुभव चुनें" },
      shareDetails: { title: "3. विवरण साझा करें", detail: "अपने बारे में थोड़ा बताएं" },
      bookPay: { title: "4. बुक करें व भुगतान करें", detail: "आसान भुगतान से अपनी जगह सुरक्षित करें" },
      enjoy: { title: "5. आनंद लें", detail: "बाकी हम संभालेंगे, आप यात्रा का आनंद लें!" },
    },
  },
  categories: {
    pageHeader: {
      title: "श्रेणी अनुसार देखें",
      subtitle: "अयोध्या में प्रवेश के पंद्रह रास्ते — चुनें कहाँ से शुरुआत करनी है।",
    },
  },
  categoryFilters: {
    all: "सभी",
  },
  categoryCard: {
    browseAriaLabel: (name: string, count: number) =>
      `${name} अनुभव देखें — ${count} उपलब्ध`,
    experienceCount: (count: number) => `${count} अनुभव`,
  },
  experiences: {
    pageHeader: {
      title: "अनुभव सूची",
      subtitle: "अपनी यात्रा चुनें",
    },
    emptyState: "इस श्रेणी में अभी कुछ नहीं है। एक्सप्लोर करते रहने के लिए दूसरी श्रेणी चुनें।",
    viewAll: "सभी अनुभव देखें",
  },
  experienceCard: {
    startsFrom: "शुरुआती कीमत",
    perPerson: "/ व्यक्ति",
    durationSr: "अवधि",
    groupSizeSr: "समूह का आकार",
    ariaLabel: (title: string, category: string, duration: string, price: string) =>
      `${title} — ${category}, ${duration}, ${price} प्रति व्यक्ति से शुरू`,
  },
  experienceHero: {
    backAriaLabel: "सभी अनुभवों पर वापस जाएं",
  },
  experienceInfo: {
    durationLabel: "अवधि",
    groupSizeLabel: "समूह का आकार",
    bestTimeLabel: "सर्वोत्तम समय",
    startingFromLabel: "शुरुआती कीमत",
    availableSlots: "उपलब्ध स्लॉट",
    included: "समावेश",
    notIncluded: "अपवर्जन",
    didYouKnowHeading: "क्या आप जानते हैं?",
    pricingOptions: "मूल्य विकल्प",
    bestValue: "सर्वोत्तम मूल्य",
    bookThisExperience: "यह अनुभव बुक करें",
    raiseAQuery: "प्रश्न पूछें",
  },
  journeyRoute: {
    heading: "यात्रा मार्ग",
    subtitle: "एवोक रामबाग से शुरू और वहीं समाप्त",
    stopsCount: (count: number) => `${count} पड़ाव`,
    start: "शुरुआत",
    end: "समाप्ति",
  },
  touchpoints: {
    section: {
      heading: "रास्ते में",
      subtitle: "हर पड़ाव पर क्या होता है, जानने के लिए टैप करें",
    },
    card: {
      openAriaLabel: (name: string) => `${name} का विवरण खोलें`,
    },
    modal: {
      closeAriaLabel: "विवरण बंद करें",
      recommended: "अनुशंसित",
      bestTime: "सर्वोत्तम समय",
      didYouKnow: "क्या आप जानते हैं?",
    },
  },
  bookingForm: {
    backAriaLabel: (title: string) => `${title} पर वापस जाएं`,
    headerTitle: "यह अनुभव बुक करें",
    fromPricePrefix: "शुरुआती कीमत",
    yourDetails: "आपका विवरण",
    guestName: "अतिथि का नाम",
    guestNamePlaceholder: "चेक-इन के अनुसार",
    roomNumber: "कमरा नंबर",
    roomNumberPlaceholder: "204",
    whatsapp: "व्हाट्सऐप / मोबाइल",
    whatsappPlaceholder: "+91",
    email: "ईमेल",
    emailPlaceholder: "you@example.com",
    date: "तारीख",
    preferredTime: "पसंदीदा समय",
    adults: "वयस्क",
    children: "बच्चे",
    specialRequest: "विशेष अनुरोध",
    specialRequestPlaceholder: "व्हीलचेयर सुविधा, भाषा प्राथमिकता, या कुछ और",
    bookingSummary: "बुकिंग सारांश",
    experienceLabel: "अनुभव",
    dateLabel: "तारीख",
    timeLabel: "समय",
    guestsLabel: "अतिथि",
    pickupLabel: "पिक-अप",
    pickupValue: "एवोक रामबाग",
    notSelected: "चयनित नहीं",
    guestsSummary: (adults: number, children: number) =>
      `${adults} वयस्क${children ? `, ${children} बच्चे` : ""}`,
    estimatedTotalLabel: (guests: number) => `अनुमानित कुल (${guests} अतिथि)`,
    pricingAppliedLabel: (tier: string) => `लागू मूल्य: ${tier}`,
    paymentNotice:
      "भुगतान अभी जुड़ा नहीं है। सबमिट करने पर आपका अनुरोध रिसेप्शन को भेजा जाएगा, जो पुष्टि कर एक सुरक्षित भुगतान लिंक साझा करेगा।",
    sendBooking: "बुकिंग अनुरोध भेजें",
    sending: "भेजा जा रहा है…",
    successTitle: "अनुरोध प्राप्त हुआ।",
    successBody: (guestName: string, title: string, date: string) =>
      `${guestName || "आपकी"} की ${title} के लिए बुकिंग रिक्वेस्ट${
        date ? ` (${date})` : ""
      } प्राप्त हो गई है। रिसेप्शन व्हाट्सऐप पर पुष्टि करेगा और भुगतान लिंक भेजेगा।`,
    bookAnother: "एक और अनुभव बुक करें",
  },
  queryForm: {
    heading: "प्रश्न पूछें",
    subtitleWithExperience: (title: string) => `${title} के बारे में कुछ भी पूछें।`,
    subtitleDefault: "बुक करने से पहले कुछ भी पूछें।",
    name: "नाम",
    namePlaceholder: "आपका नाम",
    roomNumber: "कमरा नंबर",
    roomNumberPlaceholder: "204",
    mobile: "मोबाइल",
    mobilePlaceholder: "+91",
    question: "प्रश्न",
    questionPlaceholder: "आप क्या जानना चाहेंगे?",
    send: "प्रश्न भेजें",
    sending: "भेजा जा रहा है…",
    successTitle: "आपका प्रश्न प्राप्त हो गया है।",
    successBody: "हमारी टीम व्हाट्सऐप पर आमतौर पर एक घंटे के भीतर जवाब देती है।",
    askAnother: "कुछ और पूछें",
  },
  contact: {
    hero: {
      breadcrumbCurrent: "हमसे जुड़ें",
      title: "हमसे जुड़ें",
    },
    channels: {
      sectionHeadingSr: "हमसे संपर्क करने के तरीके",
      needHelpHeading: "मदद चाहिए?",
      experienceDeskIntro: "हमारा एक्सपीरियंस डेस्क आपके लिए यहाँ है।",
      question:
        "कोई सवाल है, कोई अनुभव बुक करना चाहते हैं, मौजूदा बुकिंग में मदद चाहिए, या बस कोई सुझाव चाहिए?",
      assistanceLabel: "इनमें सहायता के लिए:",
      assistanceItems: "बुकिंग · पूछताछ · फ़ीडबैक",
      chatWithUsLabel: "हमसे व्हाट्सऐप पर बात करें।",
      whatsappButtonLabel: "एक्सपीरियंस डेस्क को व्हाट्सऐप करें",
      callUs: "हमें कॉल करें",
      emailUs: "हमें ईमेल करें",
      visitUs: "हमसे मिलें",
      getDirections: "दिशा-निर्देश पाएं",
      hoursLine: "हर दिन, सुबह 7 बजे – रात 9 बजे तक (IST)",
      preferToSpeak: "किसी से बात करना पसंद करेंगे?",
      visitDeskBody: "एवोक रामबाग रिसेप्शन पर अयोध्या अनुभव एक्सपीरियंस डेस्क पर जाएं।",
      exploreAskExperience: "जानें। पूछें। अनुभव करें।",
      exploreExperiences: "अनुभव देखें",
    },
    form: {
      heading: "हमें संदेश भेजें",
      subtitle: "लिखकर बताना पसंद है? हमें एक संदेश भेजें, हम व्हाट्सऐप या ईमेल पर जवाब देंगे।",
      name: "नाम",
      namePlaceholder: "आपका नाम",
      contactMethod: "फोन या ईमेल",
      contactMethodPlaceholder: "+91 · या · you@example.com",
      message: "संदेश",
      messagePlaceholder: "हम आपकी कैसे मदद कर सकते हैं?",
      send: "संदेश भेजें",
      sending: "भेजा जा रहा है…",
      successTitle: "संदेश भेज दिया गया।",
      successBody: (name: string) =>
        `धन्यवाद, ${name || "आपका"} — हमारी टीम जल्द ही आपसे संपर्क करेगी।`,
      sendAnother: "एक और संदेश भेजें",
    },
  },
  faqs: {
    hero: {
      breadcrumbCurrent: "सामान्य प्रश्न",
      titleLine1: "अक्सर पूछे जाने वाले",
      titleLine2: "प्रश्न",
      subtitle:
        "बुकिंग से पहले जानने योग्य हर बात। अपना जवाब नहीं मिला? हमारी टीम बस एक संदेश दूर है।",
    },
    accordion: {
      sectionHeadingSr: "प्रश्न और उत्तर",
    },
    contactCta: {
      stillHaveQuestions: "अभी भी सवाल हैं?",
      body: "हमारी टीम मदद के लिए खुश है — संपर्क करें और हम जल्द जवाब देंगे।",
      contactTeam: "हमारी टीम से संपर्क करें",
    },
  },
  about: {
    hero: {
      breadcrumbCurrent: "अयोध्या अनुभव के बारे में",
      title: "अयोध्या अनुभव के बारे में",
      subtitle: "अयोध्या की अनेक परतों में पंद्रह यात्राएँ।",
    },
    story: {
      paragraph1:
        "अयोध्या अनुभव, गाइड गुरु ग्लोबल का एक विशेष अनुभव अभियान है, जो खासतौर पर एवोक रामबाग के लिए बनाया गया है — जो सोच-समझकर तैयार की गई यात्राओं के ज़रिए आपको अयोध्या की अनेक परतों को जानने का मौका देता है।",
      paragraph2:
        "इसकी पवित्र विरासत और कालातीत कहानियों से लेकर इसकी जीवंत परंपराओं, मोहल्लों, पवित्र जलस्रोतों, शिल्प, व्यंजनों, संगीत और लोगों तक — हर अनुभव को इस तरह रचा गया है कि आप सामान्य से आगे जाकर अयोध्या को एक गहरे और सार्थक तरीके से महसूस कर सकें।",
      poweredByHeading: "गाइड गुरु ग्लोबल द्वारा संचालित",
      poweredByParagraph1:
        "गाइड गुरु ग्लोबल एक अनुभव-केंद्रित ट्रैवल प्लेटफ़ॉर्म है, जो यात्रियों को भारत के विभिन्न स्थलों पर चुनिंदा यात्राओं, प्रामाणिक स्थानीय कहानियों और जुनूनी कथावाचकों से जोड़ता है।",
      poweredByParagraph2:
        "हम लक्ज़री होटलों, प्रमाणित स्थानीय गाइडों और स्थानीय समुदायों के साथ मिलकर ऐसे अनुभव बनाते हैं जो सोच-समझकर योजनाबद्ध, स्थानीय रूप से जुड़े और आसानी से खोजे व बुक किए जा सकें।",
      poweredByParagraph3:
        "अयोध्या अनुभव के साथ, हम इसी सोच को अयोध्या में लेकर आए हैं — यात्राओं का एक संग्रह जिसे आप एवोक रामबाग में अपने ठहराव के दौरान सीधे इसी प्लेटफ़ॉर्म से खोज और बुक कर सकते हैं।",
      journeyHeading: "आपकी अयोध्या यात्रा यहीं से शुरू होती है",
      journeyParagraph:
        "चाहे आपके पास कुछ घंटे हों, पूरी शाम हो या पूरा दिन घूमने के लिए — अपनी रुचि से मेल खाता अनुभव चुनें और बाकी की ज़िम्मेदारी हम पर छोड़ दें।",
    },
    cta: {
      tagline: "जानें। चुनें। अयोध्या का अनुभव करें।",
      explore: "अनुभव देखें",
    },
  },
  notFound: {
    code: "404",
    heading: "यह पृष्ठ इस यात्रा का हिस्सा नहीं है।",
    body: "आपने जिस अनुभव को खोजा था, उसका नाम बदला गया है या वह हटाया जा चुका है।",
    browseAll: "सभी अनुभव देखें",
  },
  error: {
    oops: "उफ़",
    heading: "कुछ गड़बड़ हो गई।",
    body: "कृपया फिर से कोशिश करें — यदि यह बार-बार हो रहा है, तो व्हाट्सऐप पर हमसे संपर्क करें, हम इसे ठीक कर देंगे।",
    tryAgain: "फिर कोशिश करें",
  },
  loading: {
    label: "लोड हो रहा है",
    labelWithEllipsis: "लोड हो रहा है…",
  },
};

const gu: TranslationDict = {
  header: {
    homeAriaLabel: "ગાઇડ ગુરુ ગ્લોબલ — હોમ",
    selectLanguageAriaLabel: "ભાષા પસંદ કરો",
    openMenuAriaLabel: "મેનૂ ખોલો",
  },
  mobileMenu: {
    title: "મેનૂ",
    closeAriaLabel: "મેનૂ બંધ કરો",
    mainMenuAriaLabel: "મુખ્ય મેનૂ",
    primaryNavAriaLabel: "મુખ્ય નેવિગેશન",
    items: {
      experiences: "અનુભવો",
      categories: "શ્રેણીઓ",
      about: "અમારા વિશે",
      contact: "અમારો સંપર્ક કરો",
      faqs: "વારંવાર પુછાતા પ્રશ્નો",
    },
    chatWhatsapp: "વોટ્સએપ પર ચેટ કરો",
    tagline: "દરેક અનુભવ એવોક રામબાગથી શરૂ થાય છે અને ત્યાં જ પૂર્ણ થાય છે",
  },
  footer: {
    needHelp: "મદદ જોઈએ છે?",
    needHelpDetail: "તમારા માટે યોગ્ય અનુભવ પસંદ કરવામાં અમે મદદ કરવા અહીં છીએ.",
    chatWhatsapp: "વોટ્સએપ પર વાત કરો",
    callUs: "અમને કૉલ કરો",
    exploreHeading: "એક્સપ્લોર કરો",
    companyHeading: "કંપની",
    contactHeading: "સંપર્ક",
    exploreLinks: {
      allExperiences: "તમામ અનુભવો",
      categories: "શ્રેણીઓ",
      howItWorks: "આ કેવી રીતે કામ કરે છે",
      customExperiences: "કસ્ટમ અનુભવો",
    },
    companyLinks: {
      aboutUs: "અમારા વિશે",
      contactUs: "અમારો સંપર્ક કરો",
      faqs: "વારંવાર પુછાતા પ્રશ્નો",
      privacyPolicy: "ગોપનીયતા નીતિ",
      termsConditions: "નિયમો અને શરતો",
      refundPolicy: "રદ્દીકરણ અને રિફંડ નીતિ",
    },
    visitWebsite: "અમારી વેબસાઇટની મુલાકાત લો",
    scanQr: "આ સાઇટ તમારા ફોન પર ખોલવા સ્કેન કરો",
    qrAlt: "ગાઇડ ગુરુ ગ્લોબલની વેબસાઇટ સાથે જોડાયેલ QR કોડ",
  },
  home: {
    curatedExperiencesHeading: "ક્યુરેટેડ અનુભવો",
  },
  hero: {
    welcomeTo: "તમારું સ્વાગત છે",
    featureCurated: { title: "ક્યુરેટેડ અનુભવો", detail: "ગાઇડ ગુરુ ગ્લોબલ દ્વારા" },
    featureCertified: { title: "પ્રમાણિત ગાઇડ", detail: "" },
    featureBegins: { title: "દરેક અનુભવ શરૂ થાય છે", detail: "અને એવોક રામબાગ ખાતે પૂર્ણ થાય છે" },
    expCountLine1: "અનુભવો",
    expCountLine2: "તમારા માટે પસંદ કરેલા",
    exploreExperiences: "અનુભવો જુઓ",
  },
  introSection: {
    headingLead: "અયોધ્યા ફક્ત",
    headingHighlight: "700 પ્રાચીન મંદિરોથી ઘણું વધારે છે.",
    subtitleLine1: "શ્રદ્ધા, સંસ્કૃતિ,",
    subtitleLine2: "કથાઓ અને શાશ્વત પરંપરાઓનું શહેર.",
    didYouKnow: "શું તમે જાણો છો?",
    blocks: {
      ancientTemples: { title: "પ્રાચીન મંદિરો", detail: "શાશ્વત વારસો" },
      sacredStories: { title: "પવિત્ર કથાઓ", detail: "પેઢી દર પેઢી ચાલી આવેલી" },
      localExpertise: { title: "સ્થાનિક નિપુણતા", detail: "પ્રામાણિક અનુભવો" },
      curatedWithLove: { title: "પ્રેમથી તૈયાર", detail: "દરેક પ્રવાસી માટે" },
    },
  },
  trustSection: {
    ariaLabel: "મહેમાનો અમારી સાથે કેમ બુક કરે છે",
    pillars: {
      guides: { title: "નિષ્ણાત કથાકાર ગાઇડ", detail: "પ્રમાણિત અને ઉત્સાહી સ્થાનિકો" },
      safety: {
        title: "સરળ અને સુરક્ષિત યાત્રાઓ",
        detail: "સુઆયોજિત માર્ગો, ચકાસાયેલા વાહનો અને પ્રાથમિકતા પ્રવેશ",
      },
      authentic: {
        title: "પ્રામાણિક સ્થાનિક અનુભવો",
        detail: "સામાન્યથી આગળ વધીને અસલી અયોધ્યાને શોધો",
      },
      personalized: {
        title: "તમારા માટે વ્યક્તિગત",
        detail: "તમારી રુચિઓને અનુરૂપ ક્યુરેટેડ અનુભવો",
      },
    },
  },
  howItWorks: {
    heading: "આ કેવી રીતે કામ કરે છે",
    steps: {
      explore: { title: "1. એક્સપ્લોર કરો", detail: "તમારા માટે ક્યુરેટ કરેલા અનુભવો શોધો" },
      choose: { title: "2. પસંદ કરો", detail: "તારીખ, સમય અને અનુભવ પસંદ કરો" },
      shareDetails: { title: "3. વિગતો શેર કરો", detail: "તમારા વિશે થોડું જણાવો" },
      bookPay: { title: "4. બુક કરો અને ચૂકવણી કરો", detail: "સરળ ચુકવણી સાથે તમારી જગ્યા સુરક્ષિત કરો" },
      enjoy: { title: "5. આનંદ માણો", detail: "બાકીનું અમે સંભાળીશું, તમે યાત્રાનો આનંદ માણો!" },
    },
  },
  categories: {
    pageHeader: {
      title: "શ્રેણી પ્રમાણે જુઓ",
      subtitle: "અયોધ્યામાં પ્રવેશવાના પંદર રસ્તાઓ — પસંદ કરો ક્યાંથી શરૂ કરવું છે.",
    },
  },
  categoryFilters: {
    all: "બધા",
  },
  categoryCard: {
    browseAriaLabel: (name: string, count: number) =>
      `${name} અનુભવો જુઓ — ${count} ઉપલબ્ધ`,
    experienceCount: (count: number) => `${count} અનુભવો`,
  },
  experiences: {
    pageHeader: {
      title: "અનુભવ મેનૂ",
      subtitle: "તમારી યાત્રા પસંદ કરો",
    },
    emptyState: "આ શ્રેણીમાં હજુ કંઈ નથી. શોધ ચાલુ રાખવા બીજી શ્રેણી પસંદ કરો.",
    viewAll: "તમામ અનુભવો જુઓ",
  },
  experienceCard: {
    startsFrom: "શરૂઆતી કિંમત",
    perPerson: "/ વ્યક્તિ",
    durationSr: "સમયગાળો",
    groupSizeSr: "ગ્રુપ સાઇઝ",
    ariaLabel: (title: string, category: string, duration: string, price: string) =>
      `${title} — ${category}, ${duration}, ${price} થી શરૂ, પ્રતિ વ્યક્તિ`,
  },
  experienceHero: {
    backAriaLabel: "તમામ અનુભવો પર પાછા જાઓ",
  },
  experienceInfo: {
    durationLabel: "સમયગાળો",
    groupSizeLabel: "ગ્રુપ સાઇઝ",
    bestTimeLabel: "શ્રેષ્ઠ સમય",
    startingFromLabel: "શરૂઆતી કિંમત",
    availableSlots: "ઉપલબ્ધ સ્લોટ",
    included: "સમાવેશ",
    notIncluded: "બાકાત",
    didYouKnowHeading: "શું તમે જાણો છો?",
    pricingOptions: "કિંમત વિકલ્પો",
    bestValue: "શ્રેષ્ઠ મૂલ્ય",
    bookThisExperience: "આ અનુભવ બુક કરો",
    raiseAQuery: "પ્રશ્ન પૂછો",
  },
  journeyRoute: {
    heading: "યાત્રા માર્ગ",
    subtitle: "એવોક રામબાગથી શરૂ અને ત્યાં જ પૂર્ણ",
    stopsCount: (count: number) => `${count} સ્ટોપ`,
    start: "શરૂઆત",
    end: "અંત",
  },
  touchpoints: {
    section: {
      heading: "રસ્તામાં",
      subtitle: "દરેક સ્ટોપ પર શું થાય છે તે જોવા ટેપ કરો",
    },
    card: {
      openAriaLabel: (name: string) => `${name} ની વિગતો ખોલો`,
    },
    modal: {
      closeAriaLabel: "વિગતો બંધ કરો",
      recommended: "ભલામણ કરેલ",
      bestTime: "શ્રેષ્ઠ સમય",
      didYouKnow: "શું તમે જાણો છો?",
    },
  },
  bookingForm: {
    backAriaLabel: (title: string) => `${title} પર પાછા જાઓ`,
    headerTitle: "આ અનુભવ બુક કરો",
    fromPricePrefix: "શરૂઆતી કિંમત",
    yourDetails: "તમારી વિગતો",
    guestName: "મહેમાનનું નામ",
    guestNamePlaceholder: "ચેક-ઇન મુજબ",
    roomNumber: "રૂમ નંબર",
    roomNumberPlaceholder: "204",
    whatsapp: "વોટ્સએપ / મોબાઇલ",
    whatsappPlaceholder: "+91",
    email: "ઇમેઇલ",
    emailPlaceholder: "you@example.com",
    date: "તારીખ",
    preferredTime: "પસંદગીનો સમય",
    adults: "પુખ્ત વયના",
    children: "બાળકો",
    specialRequest: "ખાસ વિનંતી",
    specialRequestPlaceholder: "વ્હીલચેર સુવિધા, ભાષા પસંદગી, અથવા બીજું કંઈ",
    bookingSummary: "બુકિંગ સારાંશ",
    experienceLabel: "અનુભવ",
    dateLabel: "તારીખ",
    timeLabel: "સમય",
    guestsLabel: "મહેમાનો",
    pickupLabel: "પિક-અપ",
    pickupValue: "એવોક રામબાગ",
    notSelected: "પસંદ કરેલ નથી",
    guestsSummary: (adults: number, children: number) =>
      `${adults} પુખ્ત${children ? `, ${children} બાળકો` : ""}`,
    estimatedTotalLabel: (guests: number) => `અંદાજિત કુલ (${guests} મહેમાનો)`,
    pricingAppliedLabel: (tier: string) => `લાગુ કિંમત: ${tier}`,
    paymentNotice:
      "ચુકવણી હજુ જોડાયેલ નથી. સબમિટ કરવાથી તમારી વિનંતી રિસેપ્શનને મોકલાશે, જે પુષ્ટિ કરીને સુરક્ષિત ચુકવણી લિંક શેર કરશે.",
    sendBooking: "બુકિંગ વિનંતી મોકલો",
    sending: "મોકલાઈ રહ્યું છે…",
    successTitle: "વિનંતી પ્રાપ્ત થઈ.",
    successBody: (guestName: string, title: string, date: string) =>
      `${guestName || "તમારી"} ની ${title} માટેની બુકિંગ વિનંતી${
        date ? ` (${date})` : ""
      } પ્રાપ્ત થઈ ગઈ છે. રિસેપ્શન વોટ્સએપ પર પુષ્ટિ કરશે અને ચુકવણી લિંક શેર કરશે.`,
    bookAnother: "બીજો અનુભવ બુક કરો",
  },
  queryForm: {
    heading: "પ્રશ્ન પૂછો",
    subtitleWithExperience: (title: string) => `${title} વિશે ગમે તે પૂછો.`,
    subtitleDefault: "બુક કરતાં પહેલાં ગમે તે પૂછો.",
    name: "નામ",
    namePlaceholder: "તમારું નામ",
    roomNumber: "રૂમ નંબર",
    roomNumberPlaceholder: "204",
    mobile: "મોબાઇલ",
    mobilePlaceholder: "+91",
    question: "પ્રશ્ન",
    questionPlaceholder: "તમે શું જાણવા માંગો છો?",
    send: "પ્રશ્ન મોકલો",
    sending: "મોકલાઈ રહ્યું છે…",
    successTitle: "તમારો પ્રશ્ન પ્રાપ્ત થયો છે.",
    successBody: "અમારી ટીમ સામાન્ય રીતે એક કલાકમાં વોટ્સએપ પર જવાબ આપે છે.",
    askAnother: "બીજું કંઈક પૂછો",
  },
  contact: {
    hero: {
      breadcrumbCurrent: "અમારો સંપર્ક કરો",
      title: "અમારો સંપર્ક કરો",
    },
    channels: {
      sectionHeadingSr: "અમારો સંપર્ક કરવાની રીતો",
      needHelpHeading: "મદદ જોઈએ છે?",
      experienceDeskIntro: "અમારું એક્સપિરિયન્સ ડેસ્ક તમારા માટે અહીં છે.",
      question:
        "કોઈ પ્રશ્ન છે, અનુભવ બુક કરવો છે, હાલની બુકિંગમાં મદદ જોઈએ છે, અથવા ફક્ત કોઈ ભલામણ જોઈએ છે?",
      assistanceLabel: "આમાં સહાય માટે:",
      assistanceItems: "બુકિંગ · પૂછપરછ · ફીડબેક",
      chatWithUsLabel: "અમારી સાથે વોટ્સએપ પર વાત કરો.",
      whatsappButtonLabel: "એક્સપિરિયન્સ ડેસ્કને વોટ્સએપ કરો",
      callUs: "અમને કૉલ કરો",
      emailUs: "અમને ઇમેઇલ કરો",
      visitUs: "અમારી મુલાકાત લો",
      getDirections: "દિશા-નિર્દેશ મેળવો",
      hoursLine: "દરરોજ, સવારે 7 થી રાત્રે 9 વાગ્યા સુધી (IST)",
      preferToSpeak: "કોઈની સાથે વાત કરવાનું પસંદ કરશો?",
      visitDeskBody: "એવોક રામબાગ રિસેપ્શન ખાતે અયોધ્યા અનુભવ એક્સપિરિયન્સ ડેસ્કની મુલાકાત લો.",
      exploreAskExperience: "જાણો. પૂછો. અનુભવો.",
      exploreExperiences: "અનુભવો જુઓ",
    },
    form: {
      heading: "અમને સંદેશ મોકલો",
      subtitle: "લખીને જણાવવાનું પસંદ છે? અમને એક નોંધ મોકલો, અમે વોટ્સએપ કે ઇમેઇલ પર જવાબ આપીશું.",
      name: "નામ",
      namePlaceholder: "તમારું નામ",
      contactMethod: "ફોન અથવા ઇમેઇલ",
      contactMethodPlaceholder: "+91 · અથવા · you@example.com",
      message: "સંદેશ",
      messagePlaceholder: "અમે તમારી કેવી રીતે મદદ કરી શકીએ?",
      send: "સંદેશ મોકલો",
      sending: "મોકલાઈ રહ્યું છે…",
      successTitle: "સંદેશ મોકલાયો.",
      successBody: (name: string) =>
        `આભાર, ${name || "તમારો"} — અમારી ટીમ ટૂંક સમયમાં તમારો સંપર્ક કરશે.`,
      sendAnother: "બીજો સંદેશ મોકલો",
    },
  },
  faqs: {
    hero: {
      breadcrumbCurrent: "વારંવાર પુછાતા પ્રશ્નો",
      titleLine1: "વારંવાર પુછાતા",
      titleLine2: "પ્રશ્નો",
      subtitle: "બુકિંગ પહેલાં જાણવા જેવું બધું. તમારો જવાબ ન મળ્યો? અમારી ટીમ ફક્ત એક સંદેશ દૂર છે.",
    },
    accordion: {
      sectionHeadingSr: "પ્રશ્નો અને જવાબો",
    },
    contactCta: {
      stillHaveQuestions: "હજુ પણ પ્રશ્નો છે?",
      body: "અમારી ટીમ મદદ કરવા ખુશ છે — સંપર્ક કરો અને અમે ઝડપથી જવાબ આપીશું.",
      contactTeam: "અમારી ટીમનો સંપર્ક કરો",
    },
  },
  about: {
    hero: {
      breadcrumbCurrent: "અયોધ્યા અનુભવ વિશે",
      title: "અયોધ્યા અનુભવ વિશે",
      subtitle: "અયોધ્યાના અનેક પડોમાં પંદર યાત્રાઓ.",
    },
    story: {
      paragraph1:
        "અયોધ્યા અનુભવ એ ગાઇડ ગુરુ ગ્લોબલ દ્વારા ખાસ એવોક રામબાગ માટે બનાવવામાં આવેલું એક સ્થળ-વિશિષ્ટ અનુભવ અભિયાન છે, જે કાળજીપૂર્વક ક્યુરેટ કરેલી યાત્રાઓ દ્વારા તમને અયોધ્યાના અનેક પડ જાણવાની તક આપે છે.",
      paragraph2:
        "તેના પવિત્ર વારસા અને કાલાતીત કથાઓથી લઈને તેની જીવંત પરંપરાઓ, પડોશો, પવિત્ર જળસ્રોતો, હસ્તકલા, વ્યંજનો, સંગીત અને લોકો સુધી — દરેક અનુભવ તમને સામાન્યથી આગળ લઈ જઈ અયોધ્યાને વધુ અર્થપૂર્ણ રીતે અનુભવવા માટે ડિઝાઇન કરવામાં આવ્યો છે.",
      poweredByHeading: "ગાઇડ ગુરુ ગ્લોબલ દ્વારા સંચાલિત",
      poweredByParagraph1:
        "ગાઇડ ગુરુ ગ્લોબલ એક અનુભવ-કેન્દ્રિત ટ્રાવેલ પ્લેટફોર્મ છે, જે પ્રવાસીઓને ભારતના સ્થળો પર ક્યુરેટેડ યાત્રાઓ, પ્રામાણિક સ્થાનિક કથાઓ અને ઉત્સાહી કથાકારો સાથે જોડે છે.",
      poweredByParagraph2:
        "અમે લક્ઝરી હોટેલો, પ્રમાણિત સ્થાનિક ગાઇડ અને સ્થાનિક સમુદાયો સાથે મળીને એવા અનુભવો બનાવીએ છીએ જે કાળજીપૂર્વક આયોજિત, સ્થાનિક રીતે મૂળ ધરાવતા અને શોધવા-બુક કરવામાં સરળ હોય.",
      poweredByParagraph3:
        "અયોધ્યા અનુભવ સાથે, અમે આ અભિગમ અયોધ્યામાં લાવીએ છીએ, યાત્રાઓનો સંગ્રહ બનાવીને જે તમે એવોક રામબાગ ખાતેના તમારા રોકાણ દરમિયાન સીધા આ પ્લેટફોર્મ દ્વારા શોધી અને બુક કરી શકો છો.",
      journeyHeading: "તમારી અયોધ્યા યાત્રા અહીંથી શરૂ થાય છે",
      journeyParagraph:
        "તમારી પાસે થોડા કલાકો હોય, આખી સાંજ હોય કે આખો દિવસ ફરવા માટે — તમારી રુચિ સાથે મેળ ખાતો અનુભવ પસંદ કરો અને બાકીની કાળજી અમને લેવા દો.",
    },
    cta: {
      tagline: "જાણો. પસંદ કરો. અયોધ્યાનો અનુભવ કરો.",
      explore: "અનુભવો જુઓ",
    },
  },
  notFound: {
    code: "404",
    heading: "આ પાનું આ યાત્રાનો ભાગ નથી.",
    body: "તમે અનુસરેલ અનુભવનું નામ બદલાયું હોઈ શકે અથવા તે ખસેડાયો હોઈ શકે.",
    browseAll: "તમામ અનુભવો જુઓ",
  },
  error: {
    oops: "અરેરે",
    heading: "કંઈક ખોટું થયું.",
    body: "કૃપા કરી ફરી પ્રયાસ કરો — જો આ વારંવાર થાય, તો વોટ્સએપ પર અમારો સંપર્ક કરો, અમે તેને ઠીક કરીશું.",
    tryAgain: "ફરી પ્રયાસ કરો",
  },
  loading: {
    label: "લોડ થઈ રહ્યું છે",
    labelWithEllipsis: "લોડ થઈ રહ્યું છે…",
  },
};

const ta: TranslationDict = {
  header: {
    homeAriaLabel: "கைட் குரு குளோபல் — முகப்பு",
    selectLanguageAriaLabel: "மொழியைத் தேர்ந்தெடுக்கவும்",
    openMenuAriaLabel: "மெனுவைத் திற",
  },
  mobileMenu: {
    title: "மெனு",
    closeAriaLabel: "மெனுவை மூடு",
    mainMenuAriaLabel: "முதன்மை மெனு",
    primaryNavAriaLabel: "முதன்மை வழிசெலுத்தல்",
    items: {
      experiences: "அனுபவங்கள்",
      categories: "வகைகள்",
      about: "எங்களைப் பற்றி",
      contact: "எங்களைத் தொடர்பு கொள்ளுங்கள்",
      faqs: "அடிக்கடி கேட்கப்படும் கேள்விகள்",
    },
    chatWhatsapp: "வாட்ஸ்அப்பில் அரட்டையடிக்கவும்",
    tagline: "ஒவ்வொரு அனுபவமும் எவோக் ராம்பாக்கில் தொடங்கி அங்கேயே முடிவடைகிறது",
  },
  footer: {
    needHelp: "உதவி வேண்டுமா?",
    needHelpDetail: "உங்களுக்கான சரியான அனுபவத்தைத் திட்டமிட நாங்கள் இங்கே இருக்கிறோம்.",
    chatWhatsapp: "வாட்ஸ்அப்பில் பேசுங்கள்",
    callUs: "எங்களை அழைக்கவும்",
    exploreHeading: "ஆராயுங்கள்",
    companyHeading: "நிறுவனம்",
    contactHeading: "தொடர்பு",
    exploreLinks: {
      allExperiences: "அனைத்து அனுபவங்களும்",
      categories: "வகைகள்",
      howItWorks: "இது எப்படி செயல்படுகிறது",
      customExperiences: "தனிப்பயன் அனுபவங்கள்",
    },
    companyLinks: {
      aboutUs: "எங்களைப் பற்றி",
      contactUs: "எங்களைத் தொடர்பு கொள்ளுங்கள்",
      faqs: "அடிக்கடி கேட்கப்படும் கேள்விகள்",
      privacyPolicy: "தனியுரிமைக் கொள்கை",
      termsConditions: "விதிமுறைகள் & நிபந்தனைகள்",
      refundPolicy: "ரத்து & திரும்பப் பணம் கொள்கை",
    },
    visitWebsite: "எங்கள் இணையதளத்தைப் பார்வையிடுங்கள்",
    scanQr: "இந்த தளத்தை உங்கள் ஃபோனில் திறக்க ஸ்கேன் செய்யுங்கள்",
    qrAlt: "கைட் குரு குளோபல் இணையதளத்தின் QR குறியீடு",
  },
  home: {
    curatedExperiencesHeading: "தேர்ந்தெடுக்கப்பட்ட அனுபவங்கள்",
  },
  hero: {
    welcomeTo: "வரவேற்கிறோம்",
    featureCurated: { title: "தேர்ந்தெடுக்கப்பட்ட அனுபவங்கள்", detail: "கைட் குரு குளோபல் வழங்கும்" },
    featureCertified: { title: "சான்றளிக்கப்பட்ட வழிகாட்டிகள்", detail: "" },
    featureBegins: { title: "ஒவ்வொரு அனுபவமும் தொடங்குகிறது", detail: "எவோக் ராம்பாக்கில் முடிவடைகிறது" },
    expCountLine1: "அனுபவங்கள்",
    expCountLine2: "உங்களுக்காகத் தேர்ந்தெடுக்கப்பட்டவை",
    exploreExperiences: "அனுபவங்களைப் பார்க்க",
  },
  introSection: {
    headingLead: "அயோத்தி என்பது",
    headingHighlight: "700 பண்டைய கோவில்களுக்கு அப்பாற்பட்டது.",
    subtitleLine1: "நம்பிக்கை, பண்பாடு,",
    subtitleLine2: "கதைகள் மற்றும் காலம் கடந்த மரபுகளின் நகரம்.",
    didYouKnow: "உங்களுக்குத் தெரியுமா?",
    blocks: {
      ancientTemples: { title: "பண்டைய கோவில்கள்", detail: "காலம் கடந்த பாரம்பரியம்" },
      sacredStories: { title: "புனித கதைகள்", detail: "தலைமுறை தலைமுறையாக வழிவழியாக வந்தவை" },
      localExpertise: { title: "உள்ளூர் நிபுணத்துவம்", detail: "உண்மையான அனுபவங்கள்" },
      curatedWithLove: { title: "அன்புடன் வடிவமைக்கப்பட்டது", detail: "ஒவ்வொரு பயணிக்கும்" },
    },
  },
  trustSection: {
    ariaLabel: "விருந்தினர்கள் எங்களுடன் ஏன் முன்பதிவு செய்கிறார்கள்",
    pillars: {
      guides: { title: "நிபுணத்துவமிக்க கதைசொல்லி வழிகாட்டிகள்", detail: "சான்றளிக்கப்பட்ட, ஆர்வமுள்ள உள்ளூர்வாசிகள்" },
      safety: {
        title: "தடையற்ற, பாதுகாப்பான பயணங்கள்",
        detail: "திட்டமிடப்பட்ட வழித்தடங்கள், சரிபார்க்கப்பட்ட வாகனங்கள் & முன்னுரிமை அணுகல்",
      },
      authentic: {
        title: "உண்மையான உள்ளூர் அனுபவங்கள்",
        detail: "வழக்கமானதைத் தாண்டி, உண்மையான அயோத்தியைக் கண்டறியுங்கள்",
      },
      personalized: {
        title: "உங்களுக்கேற்ப தனிப்பயனாக்கப்பட்டது",
        detail: "உங்கள் ஆர்வங்களுக்கேற்ற தேர்ந்தெடுக்கப்பட்ட அனுபவங்கள்",
      },
    },
  },
  howItWorks: {
    heading: "இது எப்படி செயல்படுகிறது",
    steps: {
      explore: { title: "1. ஆராயுங்கள்", detail: "உங்களுக்காகத் தேர்ந்தெடுக்கப்பட்ட அனுபவங்களைக் கண்டறியுங்கள்" },
      choose: { title: "2. தேர்ந்தெடுங்கள்", detail: "தேதி, நேரம் & அனுபவத்தைத் தேர்ந்தெடுங்கள்" },
      shareDetails: { title: "3. விவரங்களைப் பகிரவும்", detail: "உங்களைப் பற்றி கொஞ்சம் சொல்லுங்கள்" },
      bookPay: { title: "4. முன்பதிவு & பணம் செலுத்துங்கள்", detail: "எளிதான கட்டணத்துடன் உங்கள் இடத்தை உறுதி செய்யுங்கள்" },
      enjoy: { title: "5. அனுபவியுங்கள்", detail: "மீதமுள்ளதை நாங்கள் பார்த்துக்கொள்கிறோம், நீங்கள் பயணத்தை அனுபவியுங்கள்!" },
    },
  },
  categories: {
    pageHeader: {
      title: "வகை வாரியாகப் பார்க்க",
      subtitle: "அயோத்தியை அறிய பதினைந்து வழிகள் — எங்கிருந்து தொடங்குவது என்று தேர்ந்தெடுங்கள்.",
    },
  },
  categoryFilters: {
    all: "அனைத்தும்",
  },
  categoryCard: {
    browseAriaLabel: (name: string, count: number) =>
      `${name} அனுபவங்களைப் பார்க்க — ${count} கிடைக்கின்றன`,
    experienceCount: (count: number) => `${count} அனுபவங்கள்`,
  },
  experiences: {
    pageHeader: {
      title: "அனுபவப் பட்டியல்",
      subtitle: "உங்கள் பயணத்தைத் தேர்ந்தெடுங்கள்",
    },
    emptyState: "இந்த வகையில் இன்னும் எதுவும் இல்லை. தொடர்ந்து ஆராய வேறு வகையைத் தேர்ந்தெடுங்கள்.",
    viewAll: "அனைத்து அனுபவங்களையும் பார்க்க",
  },
  experienceCard: {
    startsFrom: "தொடக்க விலை",
    perPerson: "/ நபர்",
    durationSr: "கால அளவு",
    groupSizeSr: "குழு அளவு",
    ariaLabel: (title: string, category: string, duration: string, price: string) =>
      `${title} — ${category}, ${duration}, ஒரு நபருக்கு ${price} முதல்`,
  },
  experienceHero: {
    backAriaLabel: "அனைத்து அனுபவங்களுக்கும் திரும்பு",
  },
  experienceInfo: {
    durationLabel: "கால அளவு",
    groupSizeLabel: "குழு அளவு",
    bestTimeLabel: "சிறந்த நேரம்",
    startingFromLabel: "தொடக்க விலை",
    availableSlots: "கிடைக்கும் நேரங்கள்",
    included: "சேர்க்கைகள்",
    notIncluded: "விலக்குகள்",
    didYouKnowHeading: "உங்களுக்குத் தெரியுமா?",
    pricingOptions: "விலை விருப்பங்கள்",
    bestValue: "சிறந்த மதிப்பு",
    bookThisExperience: "இந்த அனுபவத்தை முன்பதிவு செய்யுங்கள்",
    raiseAQuery: "கேள்வி கேளுங்கள்",
  },
  journeyRoute: {
    heading: "பயண வழி",
    subtitle: "எவோக் ராம்பாக்கில் தொடங்கி அங்கேயே முடிவடைகிறது",
    stopsCount: (count: number) => `${count} நிறுத்தங்கள்`,
    start: "தொடக்கம்",
    end: "முடிவு",
  },
  touchpoints: {
    section: {
      heading: "வழியில்",
      subtitle: "ஒவ்வொரு நிறுத்தத்திலும் என்ன நடக்கும் என்பதைப் பார்க்க தட்டவும்",
    },
    card: {
      openAriaLabel: (name: string) => `${name} விவரங்களைத் திற`,
    },
    modal: {
      closeAriaLabel: "விவரங்களை மூடு",
      recommended: "பரிந்துரைக்கப்படுகிறது",
      bestTime: "சிறந்த நேரம்",
      didYouKnow: "உங்களுக்குத் தெரியுமா?",
    },
  },
  bookingForm: {
    backAriaLabel: (title: string) => `${title}க்குத் திரும்பு`,
    headerTitle: "இந்த அனுபவத்தை முன்பதிவு செய்யுங்கள்",
    fromPricePrefix: "தொடக்க விலை",
    yourDetails: "உங்கள் விவரங்கள்",
    guestName: "விருந்தினர் பெயர்",
    guestNamePlaceholder: "செக்-இன் படி",
    roomNumber: "அறை எண்",
    roomNumberPlaceholder: "204",
    whatsapp: "வாட்ஸ்அப் / மொபைல்",
    whatsappPlaceholder: "+91",
    email: "மின்னஞ்சல்",
    emailPlaceholder: "you@example.com",
    date: "தேதி",
    preferredTime: "விருப்பமான நேரம்",
    adults: "பெரியவர்கள்",
    children: "குழந்தைகள்",
    specialRequest: "சிறப்பு கோரிக்கை",
    specialRequestPlaceholder: "சக்கர நாற்காலி வசதி, மொழி விருப்பம், அல்லது வேறு எதுவும்",
    bookingSummary: "முன்பதிவு சுருக்கம்",
    experienceLabel: "அனுபவம்",
    dateLabel: "தேதி",
    timeLabel: "நேரம்",
    guestsLabel: "விருந்தினர்கள்",
    pickupLabel: "பிக்-அப்",
    pickupValue: "எவோக் ராம்பாக்",
    notSelected: "தேர்ந்தெடுக்கப்படவில்லை",
    guestsSummary: (adults: number, children: number) =>
      `${adults} பெரியவர்${children ? `, ${children} குழந்தைகள்` : ""}`,
    estimatedTotalLabel: (guests: number) => `மதிப்பிடப்பட்ட மொத்தம் (${guests} விருந்தினர்கள்)`,
    pricingAppliedLabel: (tier: string) => `பயன்படுத்தப்பட்ட விலை: ${tier}`,
    paymentNotice:
      "கட்டணம் இன்னும் இணைக்கப்படவில்லை. சமர்ப்பிப்பது உங்கள் கோரிக்கையை ரிசெப்ஷனுக்கு அனுப்பும், அவர்கள் உறுதிசெய்து பாதுகாப்பான கட்டண இணைப்பைப் பகிர்வார்கள்.",
    sendBooking: "முன்பதிவு கோரிக்கையை அனுப்பு",
    sending: "அனுப்பப்படுகிறது…",
    successTitle: "கோரிக்கை பெறப்பட்டது.",
    successBody: (guestName: string, title: string, date: string) =>
      `${guestName || "உங்கள்"} ${title}க்கான முன்பதிவு கோரிக்கை${
        date ? ` (${date})` : ""
      } பெறப்பட்டுள்ளது. ரிசெப்ஷன் வாட்ஸ்அப்பில் உறுதிசெய்து கட்டண இணைப்பைப் பகிரும்.`,
    bookAnother: "மற்றொரு அனுபவத்தை முன்பதிவு செய்யுங்கள்",
  },
  queryForm: {
    heading: "கேள்வி கேளுங்கள்",
    subtitleWithExperience: (title: string) => `${title} பற்றி எதுவும் கேளுங்கள்.`,
    subtitleDefault: "முன்பதிவு செய்யும் முன் எதுவும் கேளுங்கள்.",
    name: "பெயர்",
    namePlaceholder: "உங்கள் பெயர்",
    roomNumber: "அறை எண்",
    roomNumberPlaceholder: "204",
    mobile: "மொபைல்",
    mobilePlaceholder: "+91",
    question: "கேள்வி",
    questionPlaceholder: "நீங்கள் என்ன தெரிந்துகொள்ள விரும்புகிறீர்கள்?",
    send: "கேள்வியை அனுப்பு",
    sending: "அனுப்பப்படுகிறது…",
    successTitle: "உங்கள் கேள்வி பெறப்பட்டது.",
    successBody: "எங்கள் குழு பொதுவாக ஒரு மணி நேரத்திற்குள் வாட்ஸ்அப்பில் பதிலளிக்கும்.",
    askAnother: "வேறு ஏதாவது கேளுங்கள்",
  },
  contact: {
    hero: {
      breadcrumbCurrent: "எங்களைத் தொடர்பு கொள்ளுங்கள்",
      title: "எங்களைத் தொடர்பு கொள்ளுங்கள்",
    },
    channels: {
      sectionHeadingSr: "எங்களைத் தொடர்பு கொள்ளும் வழிகள்",
      needHelpHeading: "உதவி வேண்டுமா?",
      experienceDeskIntro: "எங்கள் அனுபவ மையம் உங்களுக்காக இங்கே உள்ளது.",
      question:
        "ஒரு கேள்வி உள்ளதா, ஒரு அனுபவத்தை முன்பதிவு செய்ய விரும்புகிறீர்களா, ஏற்கனவே உள்ள முன்பதிவில் உதவி வேண்டுமா, அல்லது ஒரு பரிந்துரை வேண்டுமா?",
      assistanceLabel: "இவற்றுக்கு உதவி பெற:",
      assistanceItems: "முன்பதிவுகள் · விசாரணைகள் · கருத்துகள்",
      chatWithUsLabel: "வாட்ஸ்அப்பில் எங்களுடன் பேசுங்கள்.",
      whatsappButtonLabel: "அனுபவ மையத்திற்கு வாட்ஸ்அப் செய்யுங்கள்",
      callUs: "எங்களை அழைக்கவும்",
      emailUs: "எங்களுக்கு மின்னஞ்சல் அனுப்புங்கள்",
      visitUs: "எங்களைப் பார்வையிடுங்கள்",
      getDirections: "வழிகளைப் பெறுங்கள்",
      hoursLine: "தினமும், காலை 7 முதல் இரவு 9 வரை (IST)",
      preferToSpeak: "யாருடனாவது பேச விரும்புகிறீர்களா?",
      visitDeskBody: "எவோக் ராம்பாக் வரவேற்பறையில் உள்ள அயோத்தி அனுபவ மையத்திற்குச் செல்லுங்கள்.",
      exploreAskExperience: "அறியுங்கள். கேளுங்கள். அனுபவியுங்கள்.",
      exploreExperiences: "அனுபவங்களைப் பார்க்க",
    },
    form: {
      heading: "எங்களுக்கு ஒரு செய்தி அனுப்புங்கள்",
      subtitle: "எழுதி சொல்ல விரும்புகிறீர்களா? எங்களுக்கு ஒரு குறிப்பை அனுப்புங்கள், நாங்கள் வாட்ஸ்அப் அல்லது மின்னஞ்சலில் பதிலளிப்போம்.",
      name: "பெயர்",
      namePlaceholder: "உங்கள் பெயர்",
      contactMethod: "தொலைபேசி அல்லது மின்னஞ்சல்",
      contactMethodPlaceholder: "+91 · அல்லது · you@example.com",
      message: "செய்தி",
      messagePlaceholder: "நாங்கள் உங்களுக்கு எவ்வாறு உதவலாம்?",
      send: "செய்தி அனுப்பு",
      sending: "அனுப்பப்படுகிறது…",
      successTitle: "செய்தி அனுப்பப்பட்டது.",
      successBody: (name: string) =>
        `நன்றி, ${name || "உங்களுக்கு"} — எங்கள் குழு விரைவில் உங்களைத் தொடர்பு கொள்ளும்.`,
      sendAnother: "மற்றொரு செய்தி அனுப்பு",
    },
  },
  faqs: {
    hero: {
      breadcrumbCurrent: "அடிக்கடி கேட்கப்படும் கேள்விகள்",
      titleLine1: "அடிக்கடி கேட்கப்படும்",
      titleLine2: "கேள்விகள்",
      subtitle:
        "முன்பதிவு செய்வதற்கு முன் தெரிந்துகொள்ள வேண்டிய அனைத்தும். உங்கள் பதில் கிடைக்கவில்லையா? எங்கள் குழு ஒரு செய்திதான் தொலைவில்.",
    },
    accordion: {
      sectionHeadingSr: "கேள்விகள் மற்றும் பதில்கள்",
    },
    contactCta: {
      stillHaveQuestions: "இன்னும் கேள்விகள் உள்ளதா?",
      body: "எங்கள் குழு உதவ மகிழ்ச்சியடைகிறது — தொடர்பு கொள்ளுங்கள், நாங்கள் விரைவாகப் பதிலளிப்போம்.",
      contactTeam: "எங்கள் குழுவைத் தொடர்பு கொள்ளுங்கள்",
    },
  },
  about: {
    hero: {
      breadcrumbCurrent: "அயோத்தி அனுபவம் பற்றி",
      title: "அயோத்தி அனுபவம் பற்றி",
      subtitle: "அயோத்தியின் பல அடுக்குகளுக்குள் பதினைந்து பயணங்கள்.",
    },
    story: {
      paragraph1:
        "அயோத்தி அனுபவம் என்பது கைட் குரு குளோபல் வழங்கும் ஒரு தளம்-சார்ந்த அனுபவப் பயணத் திட்டமாகும், இது குறிப்பாக எவோக் ராம்பாக்கிற்காக உருவாக்கப்பட்டது — கவனமாக வடிவமைக்கப்பட்ட பயணங்கள் மூலம் அயோத்தியின் பல அடுக்குகளை அறிய உங்களுக்கு வாய்ப்பளிக்கிறது.",
      paragraph2:
        "அதன் புனித பாரம்பரியம் மற்றும் காலம் கடந்த கதைகளிலிருந்து, அதன் உயிரோட்டமுள்ள பாரம்பரியங்கள், சுற்றுப்புறங்கள், புனித நீர்நிலைகள், கைவினைப் பொருட்கள், உணவு வகைகள், இசை மற்றும் மக்கள் வரை — ஒவ்வொரு அனுபவமும் உங்களை பழக்கமானதற்கு அப்பால் அழைத்துச் சென்று, அயோத்தியை இன்னும் அர்த்தமுள்ள வகையில் அனுபவிக்க உதவும் வகையில் வடிவமைக்கப்பட்டுள்ளது.",
      poweredByHeading: "கைட் குரு குளோபல் வழங்குகிறது",
      poweredByParagraph1:
        "கைட் குரு குளோபல் ஒரு அனுபவ-முதன்மையான பயணத் தளமாகும், இது பயணிகளை இந்தியாவின் இடங்களில் தேர்ந்தெடுக்கப்பட்ட பயணங்கள், உண்மையான உள்ளூர் கதைகள் மற்றும் ஆர்வமுள்ள கதைசொல்லிகளுடன் இணைக்கிறது.",
      poweredByParagraph2:
        "நாங்கள் ஆடம்பர ஹோட்டல்கள், சான்றளிக்கப்பட்ட உள்ளூர் வழிகாட்டிகள் மற்றும் உள்ளூர் சமூகங்களுடன் இணைந்து, கவனமாக திட்டமிடப்பட்ட, உள்ளூர் ரீதியாக வேரூன்றிய, எளிதில் கண்டறிந்து முன்பதிவு செய்யக்கூடிய அனுபவங்களை உருவாக்குகிறோம்.",
      poweredByParagraph3:
        "அயோத்தி அனுபவத்துடன், இந்த அணுகுமுறையை அயோத்தியிலும் கொண்டு வருகிறோம் — எவோக் ராம்பாக்கில் உங்கள் தங்குமிடத்தின் போது இந்தத் தளத்தின் மூலமாகவே நீங்கள் கண்டறிந்து முன்பதிவு செய்யக்கூடிய பயணங்களின் தொகுப்பை உருவாக்கியுள்ளோம்.",
      journeyHeading: "உங்கள் அயோத்தி பயணம் இங்கிருந்து தொடங்குகிறது",
      journeyParagraph:
        "உங்களிடம் சில மணிநேரங்களோ, முழு மாலைப் பொழுதோ அல்லது முழு நாளோ இருந்தாலும் — உங்கள் ஆர்வத்திற்கு ஏற்ற அனுபவத்தைத் தேர்ந்தெடுத்து, மீதமுள்ளதை நாங்கள் கவனித்துக் கொள்கிறோம்.",
    },
    cta: {
      tagline: "அறியுங்கள். தேர்ந்தெடுங்கள். அயோத்தியை அனுபவியுங்கள்.",
      explore: "அனுபவங்களைப் பார்க்க",
    },
  },
  notFound: {
    code: "404",
    heading: "இந்தப் பக்கம் இந்தப் பயணத்தின் ஒரு பகுதி அல்ல.",
    body: "நீங்கள் பின்பற்றிய அனுபவம் மறுபெயரிடப்பட்டிருக்கலாம் அல்லது நகர்த்தப்பட்டிருக்கலாம்.",
    browseAll: "அனைத்து அனுபவங்களையும் பார்க்க",
  },
  error: {
    oops: "அச்சச்சோ",
    heading: "ஏதோ தவறு நடந்துவிட்டது.",
    body: "மீண்டும் முயற்சிக்கவும் — இது தொடர்ந்து நடந்தால், வாட்ஸ்அப்பில் எங்களைத் தொடர்பு கொள்ளுங்கள், நாங்கள் அதைச் சரிசெய்வோம்.",
    tryAgain: "மீண்டும் முயற்சிக்கவும்",
  },
  loading: {
    label: "ஏற்றுகிறது",
    labelWithEllipsis: "ஏற்றுகிறது…",
  },
};

export const translations: Record<Language, TranslationDict> = { en, hi, gu, ta };
