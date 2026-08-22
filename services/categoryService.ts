import { apiClient, isApiConfigured } from "./apiClient";
import { CATEGORIES } from "@/data/experiences";
import { categoryContent } from "@/lib/categoryContent";
import type { PublicCategory } from "@/types/api/category";

/** The Flask API wraps every response in this envelope — see BACKEND_GUIDE.md. */
interface ApiEnvelope<T> {
  success: boolean;
  message: string;
  data: T;
}

interface CategoryApiResponse {
  id: number;
  name: string;
  description: string | null;
  cover_image: string | null;
  display_order: number;
  status: "active" | "inactive";
  experience_count: number;
  created_at: string;
  updated_at: string;
}

function mapCategory(raw: CategoryApiResponse): PublicCategory {
  return {
    id: raw.id,
    name: raw.name,
    description: raw.description ?? "",
    coverImage: raw.cover_image,
    displayOrder: raw.display_order,
  };
}

function mockCategories(): PublicCategory[] {
  return CATEGORIES.filter((name) => name !== "All").map((name, index) => ({
    id: index + 1,
    name,
    description: categoryContent[name]?.description ?? "",
    coverImage: null,
    displayOrder: index + 1,
  }));
}

/** GET /api/v1/category — active categories only, sorted by display_order. */
export async function getPublicCategories(): Promise<PublicCategory[]> {
  if (!isApiConfigured()) return mockCategories();

  const result = await apiClient.get<ApiEnvelope<CategoryApiResponse[]>>("/api/v1/category");
  if (!result.ok) return [];
  return result.data.data.sort((a, b) => a.display_order - b.display_order).map(mapCategory);
}
