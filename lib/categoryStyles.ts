/** Badge treatment for the categories the site launched with. Water reads cool; everything else is terracotta. */
const categoryBadge: Record<string, string> = {
  Spiritual: "bg-terracotta-tint text-terracotta",
  Walks: "bg-terracotta-tint text-terracotta",
  Water: "bg-water-tint text-water",
  "Craft & Culture": "bg-terracotta-tint text-terracotta",
  Culinary: "bg-terracotta-tint text-terracotta",
};

/** Badge classes for a category name, with a terracotta fallback for categories added later via the admin panel. */
export function getCategoryBadgeClass(name: string): string {
  return categoryBadge[name] ?? "bg-terracotta-tint text-terracotta";
}
