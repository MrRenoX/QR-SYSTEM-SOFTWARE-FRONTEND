import type { Experience, FilterName } from "@/lib/types";

export const CATEGORIES: FilterName[] = [
  "All",
  "Spiritual",
  "Walks",
  "Water",
  "Craft & Culture",
  "Culinary",
];

// `stops` isn't stored here — it lives in data/touchpoints.ts and is merged
// in by services/experienceService.ts (mockStopsFor) so this stays the same
// shape as the real API's per-experience record minus the route detail.
export const experiences: Omit<Experience, "stops">[] = [
  {
    id: 1,
    experienceCode: "EXP-0001",
    slug: "ram-lala-darshan",
    category: "Spiritual",
    title: "Ram Lala Darshan",
    description:
      "Experience the divine aura of Ram Lala Darshan with priority access and a soulful storytelling journey.",
    longDescription:
      "Your morning begins before the city does. A storyteller guide walks you through Ramkot as the lamps are still burning, explaining what each courtyard held long before the new temple rose. Priority access means your darshan is unhurried — and the stories stay with you long after.",
    image: "/images/experiences/ram-lala-darshan.jpg",
    duration: "3 – 4 hrs",
    groupSize: "2 – 10 People",
    bestTime: "Morning / Evening",
    price: "₹1,699",
    included: [
      "Certified storyteller guide",
      "Priority darshan assistance",
      "Air-conditioned vehicle from Evoke Rambagh",
      "Bottled water and shoe custody",
    ],
    notIncluded: [
      "Prasad and personal offerings",
      "Photography permits inside sanctums",
      "Meals and gratuities",
    ],
    didYouKnow:
      "The Ramkot ridge has been continuously inhabited for over two thousand years — every temple here stands on something older.",
  },
  {
    id: 2,
    experienceCode: "EXP-0002",
    slug: "hanumangarhi-darshan",
    category: "Spiritual",
    title: "Hanumangarhi Darshan",
    description:
      "Climb the seventy-six steps to Ayodhya's most beloved shrine and hear why the city greets Hanuman first.",
    longDescription:
      "Ayodhya greets Hanuman before Ram. This short, intense walk takes you up the fortified steps of Hanumangarhi, through the sweet-shop lanes below it, and into the rhythm of a shrine that never really closes.",
    image: "/images/experiences/hanumangarhi-darshan.jpg",
    duration: "2 – 3 hrs",
    groupSize: "2 – 8 People",
    bestTime: "Morning / Evening",
    price: "₹999",
    included: [
      "Storyteller guide",
      "Vehicle transfers from Evoke Rambagh",
      "Shoe custody assistance",
    ],
    notIncluded: ["Offerings and prasad", "Meals", "Gratuities"],
    didYouKnow:
      "The seventy-six steps of Hanumangarhi are climbed barefoot by pilgrims who believe a visit here must precede any other darshan in the city.",
  },
  {
    id: 3,
    experienceCode: "EXP-0003",
    slug: "ayodhya-heritage-walk",
    category: "Walks",
    title: "Ayodhya Heritage Walk",
    description:
      "A slow walk through old lanes, forgotten courtyards and the everyday heritage most visitors drive past.",
    longDescription:
      "Away from the pilgrim route, Ayodhya is a working town of havelis, akharas and family shrines. This walk moves at conversation pace, stopping wherever a doorway has a story worth telling.",
    image: "/images/experiences/ayodhya-heritage-walk.jpg",
    duration: "2 – 3 hrs",
    groupSize: "2 – 12 People",
    bestTime: "Morning",
    price: "₹1,299",
    included: [
      "Heritage storyteller guide",
      "Walking route map",
      "Chai stop with a local family",
    ],
    notIncluded: ["Vehicle transfers between stops", "Meals", "Monument fees"],
    didYouKnow:
      "Several lanes in old Ayodhya still carry the names of the crafts once practised there — long after the last workshop closed.",
  },
  {
    id: 4,
    experienceCode: "EXP-0004",
    slug: "sarayu-aarti-experience",
    category: "Water",
    title: "Sarayu Aarti Experience",
    description:
      "Reserved ghat seating for the evening aarti, with the story of the river that the city was built around.",
    longDescription:
      "At dusk the Sarayu turns copper and the ghats fill with lamps. You will have a reserved place to sit, a guide who explains each movement of the ritual, and a boat waiting if you would like to see the ghats from the water.",
    image: "/images/experiences/sarayu-aarti-experience.jpg",
    duration: "1 – 1.5 hrs",
    groupSize: "2 – 6 People",
    bestTime: "Evening",
    price: "₹799",
    included: [
      "Reserved ghat seating",
      "Storyteller guide",
      "Diya and floral offering",
    ],
    notIncluded: ["Boat ride upgrade", "Meals", "Vehicle transfers"],
    didYouKnow:
      "The Sarayu changes course over centuries — parts of the riverbank described in the Ramayana now lie well inland.",
  },
  {
    id: 5,
    experienceCode: "EXP-0005",
    slug: "local-crafts-culture",
    category: "Craft & Culture",
    title: "Local Crafts & Culture",
    description:
      "Meet the families still making Ayodhya's brass, terracotta and textile work by hand, in their own workshops.",
    longDescription:
      "A short circuit of three working studios. You will watch a wheel being thrown, brass being beaten and cloth being block-printed — and you will hear how each family learned the trade from the generation before.",
    image: "/images/experiences/local-crafts-culture.jpg",
    duration: "2 hrs",
    groupSize: "2 – 10 People",
    bestTime: "Afternoon",
    price: "₹899",
    included: [
      "Guided workshop visits",
      "Hands-on demonstration",
      "Vehicle transfers from Evoke Rambagh",
    ],
    notIncluded: ["Craft purchases", "Meals", "Gratuities"],
    didYouKnow:
      "Ayodhya's terracotta workshops still fire in wood kilns, which is why no two pieces come out the same colour.",
  },
  {
    id: 6,
    experienceCode: "EXP-0006",
    slug: "ayodhya-flavors-food-walk",
    category: "Culinary",
    title: "Ayodhya Flavors Food Walk",
    description:
      "Six tasting stops through the old bazaar — kachori, chaat, rabri and the sweets Ayodhya is quietly famous for.",
    longDescription:
      "The bazaar wakes early and eats all day. Your guide knows which counter has been frying since 1950 and which one to skip, and you will finish with hot jalebi where the queue tells you everything.",
    image: "/images/experiences/ayodhya-flavors-food-walk.jpg",
    duration: "2 – 3 hrs",
    groupSize: "2 – 8 People",
    bestTime: "Evening",
    price: "₹1,299",
    included: [
      "Six tasting stops",
      "Food storyteller guide",
      "Bottled water throughout",
    ],
    notIncluded: ["Additional portions", "Vehicle transfers", "Gratuities"],
    didYouKnow:
      "Ayodhya's kachori is fried in a lighter, sweeter oil blend than Lucknow's — a difference locals will happily argue about.",
  },
  {
    id: 7,
    experienceCode: "EXP-0007",
    slug: "sarayu-sunrise-boat",
    category: "Water",
    title: "Sarayu Sunrise Boat",
    description:
      "A quiet country boat at first light, when the ghats belong to the birds and the bathers.",
    image: "/images/experiences/sarayu-sunrise-boat.jpg",
    duration: "1 – 2 hrs",
    groupSize: "2 – 6 People",
    bestTime: "Sunrise",
    price: "₹1,099",
    didYouKnow:
      "Migratory birds from Central Asia winter on the Sarayu's sandbanks between November and February.",
  },
  {
    id: 8,
    experienceCode: "EXP-0008",
    slug: "kanak-bhawan-story-trail",
    category: "Spiritual",
    title: "Kanak Bhawan Story Trail",
    description:
      "The palace-temple gifted to Sita, told through its carvings, its costumes and its daily rituals.",
    image: "/images/experiences/kanak-bhawan-story-trail.jpg",
    duration: "2 hrs",
    groupSize: "2 – 10 People",
    bestTime: "Morning",
    price: "₹1,199",
    didYouKnow:
      "The idols at Kanak Bhawan are dressed in new clothing every single day, in colours chosen by the season.",
  },
  {
    id: 9,
    experienceCode: "EXP-0009",
    slug: "ramkot-temple-circuit",
    category: "Spiritual",
    title: "Ramkot Temple Circuit",
    description:
      "Five temples on the old fort ridge, walked in the order pilgrims have used for centuries.",
    image: "/images/experiences/ramkot-temple-circuit.jpg",
    duration: "3 – 4 hrs",
    groupSize: "2 – 10 People",
    bestTime: "Morning",
    price: "₹1,499",
    didYouKnow:
      "Ramkot means 'the fort of Ram' — the ridge was fortified long before it became a pilgrimage circuit.",
  },
  {
    id: 10,
    experienceCode: "EXP-0010",
    slug: "guptar-ghat-morning-walk",
    category: "Walks",
    title: "Guptar Ghat Morning Walk",
    description:
      "Colonial-era steps, riverside temples and the calmest stretch of the Sarayu, before the heat arrives.",
    image: "/images/experiences/guptar-ghat-morning-walk.jpg",
    duration: "1.5 – 2 hrs",
    groupSize: "2 – 12 People",
    bestTime: "Morning",
    price: "₹699",
    didYouKnow:
      "Guptar Ghat was rebuilt in the nineteenth century by Raja Darshan Singh, which is why its steps look unlike any others in the city.",
  },
  {
    id: 11,
    experienceCode: "EXP-0011",
    slug: "bhakti-path-lantern-walk",
    category: "Walks",
    title: "Bhakti Path Lantern Walk",
    description:
      "The pilgrim corridor after dark, when the sandstone cools and the lamps come on one by one.",
    image: "/images/experiences/bhakti-path-lantern-walk.jpg",
    duration: "1.5 hrs",
    groupSize: "2 – 12 People",
    bestTime: "Evening",
    price: "₹899",
    didYouKnow:
      "The Bhakti Path was widened using the same Bansi Paharpur sandstone quarried for the temple itself.",
  },
  {
    id: 12,
    experienceCode: "EXP-0012",
    slug: "awadhi-thali-experience",
    category: "Culinary",
    title: "Awadhi Thali Experience",
    description:
      "A seated, slow-cooked Awadhi vegetarian thali with the cook explaining every dish as it arrives.",
    image: "/images/experiences/awadhi-thali-experience.jpg",
    duration: "2 hrs",
    groupSize: "2 – 8 People",
    bestTime: "Lunch / Dinner",
    price: "₹1,599",
    didYouKnow:
      "Awadhi dum cooking seals the pot with dough so the steam never escapes — the aroma is released only at your table.",
  },
  {
    id: 13,
    experienceCode: "EXP-0013",
    slug: "terracotta-workshop",
    category: "Craft & Culture",
    title: "Terracotta Workshop",
    description:
      "Two hours at the wheel with a potter's family, and a piece of your own to carry home.",
    image: "/images/experiences/terracotta-workshop.jpg",
    duration: "2 hrs",
    groupSize: "2 – 8 People",
    bestTime: "Afternoon",
    price: "₹1,199",
    didYouKnow:
      "The clay used here is dug from the Sarayu floodplain and rested for a full season before it can be thrown.",
  },
  {
    id: 14,
    experienceCode: "EXP-0014",
    slug: "ramayana-katha-evening",
    category: "Craft & Culture",
    title: "Ramayana Katha Evening",
    description:
      "A live katha performance with translation, followed by conversation with the performers.",
    image: "/images/experiences/ramayana-katha-evening.jpg",
    duration: "1.5 – 2 hrs",
    groupSize: "2 – 12 People",
    bestTime: "Evening",
    price: "₹999",
    didYouKnow:
      "Ayodhya's katha singers still perform from memory — a full recitation cycle can run for nine consecutive nights.",
  },
  {
    id: 15,
    experienceCode: "EXP-0015",
    slug: "sarayu-riverfront-cycle",
    category: "Walks",
    title: "Sarayu Riverfront Cycle",
    description:
      "An easy morning ride along the embankment, from Naya Ghat to the quiet edge of the city.",
    image: "/images/experiences/sarayu-riverfront-cycle.jpg",
    duration: "2 hrs",
    groupSize: "2 – 8 People",
    bestTime: "Sunrise",
    price: "₹949",
    didYouKnow:
      "The riverfront embankment doubles as a flood defence — its height is set by the Sarayu's 1998 high-water mark.",
  },
];
