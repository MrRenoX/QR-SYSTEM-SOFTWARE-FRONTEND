import { Flame, Footprints, Palette, Sparkles, UtensilsCrossed, Waves } from "lucide-react";

interface CategoryMeta {
  tagline: string;
  description: string;
  icon: typeof Flame;
}

/**
 * Editorial copy + icon for the categories the site launched with. Categories
 * created later via the admin panel aren't in this map — they use their own
 * API-provided description and a generic tagline/icon (see getCategoryMeta).
 */
export const categoryContent: Record<string, CategoryMeta> = {
  Spiritual: {
    tagline: "Darshans & devotion",
    description:
      "Temples, priority darshans and the sacred pulse the city was built around.",
    icon: Flame,
  },
  Walks: {
    tagline: "Old lanes, slow pace",
    description:
      "Havelis, courtyards and everyday heritage most visitors drive straight past.",
    icon: Footprints,
  },
  Water: {
    tagline: "The Sarayu",
    description:
      "Dawn boats and evening aarti, on the river the city has always faced.",
    icon: Waves,
  },
  "Craft & Culture": {
    tagline: "Made by hand",
    description:
      "Terracotta, brass and the artisans keeping centuries-old trades alive.",
    icon: Palette,
  },
  Culinary: {
    tagline: "Awadhi & street food",
    description: "Chaat lanes, thali feasts and the flavours locals grow up on.",
    icon: UtensilsCrossed,
  },
};

/** Tagline + icon for a category name, with a generic fallback for anything not hand-curated above (e.g. categories added later via the admin panel). */
export function getCategoryMeta(name: string): Pick<CategoryMeta, "tagline" | "icon"> {
  const known = categoryContent[name];
  return known ? { tagline: known.tagline, icon: known.icon } : { tagline: "Curated for you", icon: Sparkles };
}
