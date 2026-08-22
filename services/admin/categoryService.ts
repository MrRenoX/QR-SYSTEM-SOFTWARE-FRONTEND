import { apiClient, isApiConfigured } from "../apiClient";
import { getCurrentSession } from "./authService";
import { adminCategories } from "@/data/admin/categories";
import type { AdminCategory, CategoryFormValues, CategoryStatus } from "@/types/admin/category";

let mockStore = [...adminCategories];

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
  status: CategoryStatus;
  experience_count: number;
  created_at: string;
  updated_at: string;
}

function mapCategory(raw: CategoryApiResponse): AdminCategory {
  return {
    id: raw.id,
    name: raw.name,
    description: raw.description ?? "",
    coverImage: raw.cover_image,
    displayOrder: raw.display_order,
    status: raw.status,
    experienceCount: raw.experience_count,
    createdAt: raw.created_at,
    updatedAt: raw.updated_at,
  };
}

function authHeaders(): Record<string, string> {
  const session = getCurrentSession();
  return session ? { Authorization: `Bearer ${session.token}` } : {};
}

function buildFormData(values: CategoryFormValues): FormData {
  const form = new FormData();
  form.append("name", values.name);
  form.append("description", values.description);
  form.append("display_order", String(values.displayOrder));
  form.append("status", values.status);
  if (values.image) {
    form.append("image", values.image);
  }
  return form;
}

/**
 * Admin category list. NOTE: the backend only exposes GET /api/v1/category,
 * which returns `active`-status categories only (see BACKEND_GUIDE.md) — there
 * is no admin-only "list all" endpoint. Categories deactivated from this panel
 * will disappear from this table until the backend adds one.
 */
export async function getCategories(): Promise<AdminCategory[]> {
  if (!isApiConfigured()) return mockStore;

  const result = await apiClient.get<ApiEnvelope<CategoryApiResponse[]>>("/api/v1/category");
  if (!result.ok) return [];
  return result.data.data.map(mapCategory);
}

export async function createCategory(values: CategoryFormValues): Promise<AdminCategory> {
  if (!isApiConfigured()) {
    const now = new Date().toISOString();
    const created: AdminCategory = {
      id: Date.now(),
      name: values.name,
      description: values.description,
      coverImage: null,
      displayOrder: values.displayOrder,
      status: values.status,
      experienceCount: 0,
      createdAt: now,
      updatedAt: now,
    };
    mockStore = [...mockStore, created];
    return created;
  }

  const result = await apiClient.post<ApiEnvelope<CategoryApiResponse>>(
    "/api/v1/admin/category",
    buildFormData(values),
    { headers: authHeaders() },
  );
  if (!result.ok) throw new Error(result.message);
  return mapCategory(result.data.data);
}

export async function updateCategory(
  id: number,
  values: CategoryFormValues,
): Promise<AdminCategory | undefined> {
  if (!isApiConfigured()) {
    let updated: AdminCategory | undefined;
    mockStore = mockStore.map((item) => {
      if (item.id !== id) return item;
      updated = { ...item, ...values, updatedAt: new Date().toISOString() };
      return updated;
    });
    return updated;
  }

  const result = await apiClient.put<ApiEnvelope<CategoryApiResponse>>(
    `/api/v1/admin/category/${id}`,
    buildFormData(values),
    { headers: authHeaders() },
  );
  if (!result.ok) throw new Error(result.message);
  return mapCategory(result.data.data);
}

export async function setCategoryStatus(id: number, status: CategoryStatus): Promise<void> {
  if (!isApiConfigured()) {
    mockStore = mockStore.map((item) => (item.id === id ? { ...item, status } : item));
    return;
  }

  const form = new FormData();
  form.append("status", status);
  const result = await apiClient.patch<ApiEnvelope<CategoryApiResponse>>(
    `/api/v1/admin/category/${id}`,
    form,
    { headers: authHeaders() },
  );
  if (!result.ok) throw new Error(result.message);
}

export async function deleteCategory(id: number): Promise<void> {
  if (!isApiConfigured()) {
    mockStore = mockStore.filter((item) => item.id !== id);
    return;
  }

  const result = await apiClient.delete<ApiEnvelope<null>>(`/api/v1/admin/category/${id}`, {
    headers: authHeaders(),
  });
  if (!result.ok) throw new Error(result.message);
}
