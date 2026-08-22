import { apiClient, isApiConfigured } from "../apiClient";
import { getCurrentSession } from "./authService";
import { adminContacts } from "@/data/admin/contacts";
import type { AdminContact, ContactStatus } from "@/types/admin/contact";

let store = [...adminContacts];

/** The Flask API wraps every response in this envelope — see BACKEND_GUIDE.md. */
interface ApiEnvelope<T> {
  success: boolean;
  message: string;
  data: T;
}

interface ContactApiResponse {
  id: number;
  name: string;
  email: string | null;
  mobile: string | null;
  subject: string;
  message: string;
  status: ContactStatus;
  created_at: string;
  updated_at: string;
}

function mapContact(raw: ContactApiResponse): AdminContact {
  return {
    id: raw.id,
    name: raw.name,
    email: raw.email ?? "",
    mobile: raw.mobile ?? "",
    subject: raw.subject,
    message: raw.message,
    status: raw.status,
    createdAt: raw.created_at,
    updatedAt: raw.updated_at,
  };
}

function authHeaders(): Record<string, string> {
  const session = getCurrentSession();
  return session ? { Authorization: `Bearer ${session.token}` } : {};
}

export async function getContacts(): Promise<AdminContact[]> {
  if (!isApiConfigured()) return store;

  const result = await apiClient.get<ApiEnvelope<ContactApiResponse[]>>("/api/v1/admin/contact", {
    headers: authHeaders(),
  });
  if (!result.ok) return [];
  return result.data.data.map(mapContact);
}

export async function getContactById(id: number): Promise<AdminContact | undefined> {
  if (!isApiConfigured()) return store.find((item) => item.id === id);

  const result = await apiClient.get<ApiEnvelope<ContactApiResponse>>(`/api/v1/admin/contact/${id}`, {
    headers: authHeaders(),
  });
  if (!result.ok) return undefined;
  return mapContact(result.data.data);
}

export async function setContactStatus(id: number, status: ContactStatus): Promise<void> {
  if (!isApiConfigured()) {
    store = store.map((item) => (item.id === id ? { ...item, status } : item));
    return;
  }

  const result = await apiClient.patch<ApiEnvelope<ContactApiResponse>>(
    `/api/v1/admin/contact/${id}`,
    { status },
    { headers: authHeaders() },
  );
  if (!result.ok) throw new Error(result.message);
}

export async function deleteContact(id: number): Promise<void> {
  if (!isApiConfigured()) {
    store = store.filter((item) => item.id !== id);
    return;
  }

  const result = await apiClient.delete<ApiEnvelope<null>>(`/api/v1/admin/contact/${id}`, {
    headers: authHeaders(),
  });
  if (!result.ok) throw new Error(result.message);
}
