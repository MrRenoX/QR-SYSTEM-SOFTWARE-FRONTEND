import { apiClient, isApiConfigured } from "./apiClient";
import { faqGroups as mockFaqGroups } from "@/data/faqs";
import type { FAQGroup } from "@/lib/types";

interface ApiEnvelope<T> {
  success: boolean;
  message: string;
  data: T;
}

interface FAQApiResponse {
  id: number;
  category: string;
  question: string;
  answer: string;
  display_order: number;
}

/** Backend returns a flat, `display_order`-sorted list — group consecutive/matching categories, preserving first-appearance order. */
function groupByCategory(items: FAQApiResponse[]): FAQGroup[] {
  const groups: FAQGroup[] = [];
  for (const item of items) {
    const existing = groups.find((group) => group.category === item.category);
    if (existing) {
      existing.items.push({ question: item.question, answer: item.answer });
    } else {
      groups.push({ category: item.category, items: [{ question: item.question, answer: item.answer }] });
    }
  }
  return groups;
}

/** Public, read-only — see BACKEND_GUIDE.md section 3.6. Falls back to a hardcoded set until the backend route exists. */
export async function getFAQGroups(): Promise<FAQGroup[]> {
  if (!isApiConfigured()) return mockFaqGroups;

  const result = await apiClient.get<ApiEnvelope<FAQApiResponse[]>>("/api/v1/faq");
  if (!result.ok) return mockFaqGroups;
  return groupByCategory(result.data.data);
}
