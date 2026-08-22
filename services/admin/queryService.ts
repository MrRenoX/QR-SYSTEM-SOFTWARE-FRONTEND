import { apiClient, isApiConfigured } from "../apiClient";
import { getCurrentSession } from "./authService";
import { adminQueries } from "@/data/admin/queries";
import type { AdminQuery, QueryStatus } from "@/types/admin/query";

let store = [...adminQueries];

/** The Flask API wraps every response in this envelope — see BACKEND_GUIDE.md. */
interface ApiEnvelope<T> {
  success: boolean;
  message: string;
  data: T;
}

interface QueryApiResponse {
  id: number;
  guest_name: string;
  room_number: string | null;
  mobile: string;
  experience: { id: number; title: string } | null;
  question: string;
  status: QueryStatus;
  created_at: string;
  updated_at: string;
}

function mapQuery(raw: QueryApiResponse): AdminQuery {
  return {
    id: raw.id,
    guestName: raw.guest_name,
    roomNumber: raw.room_number ?? "",
    mobile: raw.mobile,
    experience: raw.experience,
    question: raw.question,
    status: raw.status,
    createdAt: raw.created_at,
    updatedAt: raw.updated_at,
  };
}

function authHeaders(): Record<string, string> {
  const session = getCurrentSession();
  return session ? { Authorization: `Bearer ${session.token}` } : {};
}

export async function getQueries(): Promise<AdminQuery[]> {
  if (!isApiConfigured()) return store;

  const result = await apiClient.get<ApiEnvelope<QueryApiResponse[]>>("/api/v1/admin/query", {
    headers: authHeaders(),
  });
  if (!result.ok) return [];
  return result.data.data.map(mapQuery);
}

export async function getQueryById(id: number): Promise<AdminQuery | undefined> {
  if (!isApiConfigured()) return store.find((item) => item.id === id);

  const result = await apiClient.get<ApiEnvelope<QueryApiResponse>>(`/api/v1/admin/query/${id}`, {
    headers: authHeaders(),
  });
  if (!result.ok) return undefined;
  return mapQuery(result.data.data);
}

export async function setQueryStatus(id: number, status: QueryStatus): Promise<void> {
  if (!isApiConfigured()) {
    store = store.map((item) => (item.id === id ? { ...item, status } : item));
    return;
  }

  const result = await apiClient.patch<ApiEnvelope<QueryApiResponse>>(
    `/api/v1/admin/query/${id}`,
    { status },
    { headers: authHeaders() },
  );
  if (!result.ok) throw new Error(result.message);
}

export async function deleteQuery(id: number): Promise<void> {
  if (!isApiConfigured()) {
    store = store.filter((item) => item.id !== id);
    return;
  }

  const result = await apiClient.delete<ApiEnvelope<null>>(`/api/v1/admin/query/${id}`, {
    headers: authHeaders(),
  });
  if (!result.ok) throw new Error(result.message);
}
