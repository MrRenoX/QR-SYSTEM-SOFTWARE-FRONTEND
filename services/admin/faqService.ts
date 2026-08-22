import { apiClient, isApiConfigured } from "../apiClient";
import { getCurrentSession } from "./authService";
import { adminFaqs } from "@/data/admin/faqs";
import type { AdminFAQ, FAQFormValues, FAQStatus } from "@/types/admin/faq";

let mockStore = [...adminFaqs];

/** The Flask API wraps every response in this envelope — see BACKEND_GUIDE.md. */
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
  status: FAQStatus;
  created_at: string;
  updated_at: string;
}

function mapFAQ(raw: FAQApiResponse): AdminFAQ {
  return {
    id: raw.id,
    category: raw.category,
    question: raw.question,
    answer: raw.answer,
    displayOrder: raw.display_order,
    status: raw.status,
    createdAt: raw.created_at,
    updatedAt: raw.updated_at,
  };
}

function authHeaders(): Record<string, string> {
  const session = getCurrentSession();
  return session ? { Authorization: `Bearer ${session.token}` } : {};
}

function toBody(values: FAQFormValues) {
  return {
    category: values.category,
    question: values.question,
    answer: values.answer,
    display_order: values.displayOrder,
    status: values.status,
  };
}

export async function getFAQs(): Promise<AdminFAQ[]> {
  if (!isApiConfigured()) return mockStore;

  const result = await apiClient.get<ApiEnvelope<FAQApiResponse[]>>("/api/v1/admin/faq", {
    headers: authHeaders(),
  });
  if (!result.ok) return [];
  return result.data.data.map(mapFAQ);
}

export async function createFAQ(values: FAQFormValues): Promise<AdminFAQ> {
  if (!isApiConfigured()) {
    const now = new Date().toISOString();
    const created: AdminFAQ = { id: Date.now(), ...values, createdAt: now, updatedAt: now };
    mockStore = [...mockStore, created];
    return created;
  }

  const result = await apiClient.post<ApiEnvelope<FAQApiResponse>>("/api/v1/admin/faq", toBody(values), {
    headers: authHeaders(),
  });
  if (!result.ok) throw new Error(result.message);
  return mapFAQ(result.data.data);
}

export async function updateFAQ(id: number, values: FAQFormValues): Promise<AdminFAQ | undefined> {
  if (!isApiConfigured()) {
    let updated: AdminFAQ | undefined;
    mockStore = mockStore.map((item) => {
      if (item.id !== id) return item;
      updated = { ...item, ...values, updatedAt: new Date().toISOString() };
      return updated;
    });
    return updated;
  }

  const result = await apiClient.put<ApiEnvelope<FAQApiResponse>>(`/api/v1/admin/faq/${id}`, toBody(values), {
    headers: authHeaders(),
  });
  if (!result.ok) throw new Error(result.message);
  return mapFAQ(result.data.data);
}

export async function setFAQStatus(id: number, status: FAQStatus): Promise<void> {
  if (!isApiConfigured()) {
    mockStore = mockStore.map((item) => (item.id === id ? { ...item, status } : item));
    return;
  }

  const result = await apiClient.patch<ApiEnvelope<FAQApiResponse>>(
    `/api/v1/admin/faq/${id}`,
    { status },
    { headers: authHeaders() },
  );
  if (!result.ok) throw new Error(result.message);
}

export async function deleteFAQ(id: number): Promise<void> {
  if (!isApiConfigured()) {
    mockStore = mockStore.filter((item) => item.id !== id);
    return;
  }

  const result = await apiClient.delete<ApiEnvelope<null>>(`/api/v1/admin/faq/${id}`, {
    headers: authHeaders(),
  });
  if (!result.ok) throw new Error(result.message);
}
