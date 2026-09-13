/**
 * Badge treatment for the experience card's category tag, which always sits
 * on top of a photo — a dark chip with gold text reads consistently there
 * regardless of category, so every category (including ones added later via
 * the admin panel) shares the same on-photo treatment.
 */
const CARD_BADGE_CLASS = "bg-ink/70 text-terracotta-soft backdrop-blur-[1px]";

export function getCategoryBadgeClass(_name: string): string {
  return CARD_BADGE_CLASS;
}
