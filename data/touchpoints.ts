import type { JourneyStop, Touchpoint } from "@/lib/types";

/** Ordered route shown on the experience detail page, keyed by experience slug. */
export const journeyRoutes: Record<string, JourneyStop[]> = {
  "ram-lala-darshan": [
    { order: 1, name: "Evoke Rambagh", duration: "Pick-up", image: "/images/touchpoints/evoke-rambagh.jpg" },
    { order: 2, name: "Chhoti Devkali Mandir", duration: "15 – 20 min", image: "/images/touchpoints/chhoti-devkali.jpg" },
    { order: 3, name: "Hanumangarhi", duration: "20 – 30 min", image: "/images/touchpoints/hanumangarhi.jpg" },
    { order: 4, name: "Bhakti Path", duration: "15 min", image: "/images/touchpoints/bhakti-path.jpg" },
    { order: 5, name: "Shri Ram Janmabhoomi", duration: "45 – 60 min", image: "/images/touchpoints/ram-janmabhoomi.jpg" },
  ],
  "hanumangarhi-darshan": [
    { order: 1, name: "Evoke Rambagh", duration: "Pick-up", image: "/images/touchpoints/evoke-rambagh.jpg" },
    { order: 2, name: "Hanumangarhi Steps", duration: "20 min", image: "/images/touchpoints/hanumangarhi.jpg" },
    { order: 3, name: "Sweet Shop Lane", duration: "20 min", image: "/images/touchpoints/bazaar-lane.jpg" },
    { order: 4, name: "Kanak Bhawan", duration: "25 min", image: "/images/touchpoints/kanak-bhawan.jpg" },
  ],
  "ayodhya-heritage-walk": [
    { order: 1, name: "Evoke Rambagh", duration: "Pick-up", image: "/images/touchpoints/evoke-rambagh.jpg" },
    { order: 2, name: "Old Haveli Lanes", duration: "30 min", image: "/images/touchpoints/bazaar-lane.jpg" },
    { order: 3, name: "Kanak Bhawan", duration: "25 min", image: "/images/touchpoints/kanak-bhawan.jpg" },
    { order: 4, name: "Guptar Ghat", duration: "30 min", image: "/images/touchpoints/guptar-ghat.jpg" },
  ],
  "sarayu-aarti-experience": [
    { order: 1, name: "Evoke Rambagh", duration: "Pick-up", image: "/images/touchpoints/evoke-rambagh.jpg" },
    { order: 2, name: "Naya Ghat", duration: "20 min", image: "/images/touchpoints/naya-ghat.jpg" },
    { order: 3, name: "Sarayu Aarti", duration: "45 min", image: "/images/touchpoints/sarayu-aarti.jpg" },
  ],
  "local-crafts-culture": [
    { order: 1, name: "Evoke Rambagh", duration: "Pick-up", image: "/images/touchpoints/evoke-rambagh.jpg" },
    { order: 2, name: "Terracotta Studio", duration: "35 min", image: "/images/touchpoints/terracotta-studio.jpg" },
    { order: 3, name: "Brass Workshop", duration: "30 min", image: "/images/touchpoints/brass-workshop.jpg" },
    { order: 4, name: "Bazaar Lane", duration: "25 min", image: "/images/touchpoints/bazaar-lane.jpg" },
  ],
  "ayodhya-flavors-food-walk": [
    { order: 1, name: "Evoke Rambagh", duration: "Pick-up", image: "/images/touchpoints/evoke-rambagh.jpg" },
    { order: 2, name: "Bazaar Lane", duration: "40 min", image: "/images/touchpoints/bazaar-lane.jpg" },
    { order: 3, name: "Chaat Corner", duration: "30 min", image: "/images/touchpoints/chaat-corner.jpg" },
    { order: 4, name: "Naya Ghat", duration: "30 min", image: "/images/touchpoints/naya-ghat.jpg" },
  ],
};

/** Rich touchpoint detail, keyed by experience slug and shown in the modal. */
export const touchpoints: Record<string, Touchpoint[]> = {
  "ram-lala-darshan": [
    {
      id: 1,
      name: "Chhoti Devkali Mandir",
      description:
        "Sita's family deity, brought with her to Ayodhya. A small shrine that most visitors miss entirely, and the right place to begin.",
      duration: "15 – 20 min",
      bestTime: "Early morning",
      fact: "The shrine is traditionally the first stop for brides from the region, who come to seek the same blessing Sita did.",
      image: "/images/touchpoints/chhoti-devkali.jpg",
      gallery: ["/images/touchpoints/chhoti-devkali.jpg", "/images/touchpoints/bazaar-lane.jpg"],
    },
    {
      id: 2,
      name: "Hanumangarhi",
      description:
        "Perched atop a hill in the middle of the old city, reached by seventy-six steps that pilgrims climb barefoot in every season.",
      duration: "20 – 30 min",
      bestTime: "Morning",
      fact: "Ayodhya's custom is to greet Hanuman before any other darshan — the shrine has never closed a full day in living memory.",
      image: "/images/touchpoints/hanumangarhi.jpg",
      gallery: ["/images/touchpoints/hanumangarhi.jpg", "/images/touchpoints/bhakti-path.jpg"],
    },
    {
      id: 3,
      name: "Bhakti Path",
      description:
        "The widened pilgrim corridor connecting the old city to the temple complex, lined with sandstone lamps and shaded seating.",
      duration: "15 min",
      bestTime: "Morning / Evening",
      fact: "The corridor uses the same Bansi Paharpur sandstone as the temple, quarried in Rajasthan and carved on site.",
      image: "/images/touchpoints/bhakti-path.jpg",
    },
    {
      id: 4,
      name: "Shri Ram Janmabhoomi",
      description:
        "The main darshan, with priority access arranged so that your time inside is unhurried rather than shuffled along.",
      duration: "45 – 60 min",
      bestTime: "Morning",
      fact: "The temple's stone was cut without steel reinforcement, using interlocking joinery meant to stand for a thousand years.",
      image: "/images/touchpoints/ram-janmabhoomi.jpg",
      gallery: ["/images/touchpoints/ram-janmabhoomi.jpg", "/images/touchpoints/bhakti-path.jpg"],
    },
  ],
  "sarayu-aarti-experience": [
    {
      id: 1,
      name: "Naya Ghat",
      description:
        "The broad main ghat where the evening crowd gathers. Your seating is reserved on the upper tier, away from the crush.",
      duration: "20 min",
      bestTime: "Before sunset",
      fact: "Naya Ghat means 'new ghat' — it has carried that name since the eighteenth century.",
      image: "/images/touchpoints/naya-ghat.jpg",
    },
    {
      id: 2,
      name: "Sarayu Aarti",
      description:
        "Lamps, bells and chanting timed to the last light on the water, explained movement by movement by your guide.",
      duration: "45 min",
      bestTime: "Sunset",
      fact: "The aarti's tiered lamps are lit in a fixed order, from the outermost ring inward, so the flame appears to travel toward the river.",
      image: "/images/touchpoints/sarayu-aarti.jpg",
      gallery: ["/images/touchpoints/sarayu-aarti.jpg", "/images/touchpoints/naya-ghat.jpg"],
    },
  ],
};

export function getJourneyRoute(slug: string): JourneyStop[] {
  return journeyRoutes[slug] ?? journeyRoutes["ram-lala-darshan"];
}

export function getTouchpoints(slug: string): Touchpoint[] {
  return touchpoints[slug] ?? touchpoints["ram-lala-darshan"];
}
