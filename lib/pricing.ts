import type { PricingOption } from "@/lib/types";

export interface BookingPriceResult {
  total: number;
  /** The pricing tier that was applied, or null if it fell back to the flat "Starting from" price. */
  appliedTier: PricingOption | null;
}

/** Matches a "1-6" / "7 - 12" style range in a tier label, e.g. "Group 1-6 (flat)". */
function parseGroupRange(label: string): { min: number; max: number } | null {
  const match = label.match(/(\d+)\s*[-–]\s*(\d+)/);
  if (!match) return null;
  return { min: Number(match[1]), max: Number(match[2]) };
}

/** Matches a "per person min. 4 pax" style label — applies per-guest once the party is at least that big. */
function parseMinPax(label: string): number | null {
  if (!/per\s*person/i.test(label)) return null;
  const match = label.match(/min\.?\s*(\d+)/i);
  return match ? Number(match[1]) : 1;
}

/**
 * Picks the cheapest pricing tier that applies to a given party size, e.g. a
 * flat "Group 1-6" rate vs. a "Per person min. 4 pax" rate — matching
 * whichever the admin's pricing_options entries describe. Falls back to the
 * flat `price` field (full per adult, half per child) when there are no
 * pricing_options, or none of them apply to this many guests.
 */
export function calculateBookingPrice(
  basePrice: number,
  pricingOptions: PricingOption[] | undefined,
  adults: number,
  children: number,
): BookingPriceResult {
  const totalGuests = Math.max(adults + children, 1);

  if (pricingOptions && pricingOptions.length > 0) {
    const candidates: { tier: PricingOption; total: number }[] = [];

    for (const tier of pricingOptions) {
      const minPax = parseMinPax(tier.key);
      if (minPax !== null) {
        if (totalGuests >= minPax) candidates.push({ tier, total: tier.value * totalGuests });
        continue;
      }
      const range = parseGroupRange(tier.key);
      if (range) {
        if (totalGuests >= range.min && totalGuests <= range.max) candidates.push({ tier, total: tier.value });
        continue;
      }
      // No parseable range/pax hint in the label — treat as a flat rate always on offer.
      candidates.push({ tier, total: tier.value });
    }

    if (candidates.length > 0) {
      const cheapest = candidates.reduce((best, current) => (current.total < best.total ? current : best));
      return { total: cheapest.total, appliedTier: cheapest.tier };
    }
  }

  return {
    total: basePrice * Math.max(adults, 1) + basePrice * 0.5 * children,
    appliedTier: null,
  };
}
