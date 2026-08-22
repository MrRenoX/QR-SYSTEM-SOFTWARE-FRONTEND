import { apiClient, isApiConfigured } from "../apiClient";
import { getCurrentSession } from "./authService";
import { adminUsers } from "@/data/admin/users";
import type { AdminUserRecord, AdminUserStatus } from "@/types/admin/adminUser";

let store = [...adminUsers];

/** The Flask API wraps every response in this envelope — see BACKEND_GUIDE.md. */
interface ApiEnvelope<T> {
  success: boolean;
  message: string;
  data: T;
}

interface AdminUserApiResponse {
  id: number;
  name: string;
  email: string;
  role: AdminUserRecord["role"];
  status: AdminUserStatus;
  last_login: string | null;
  created_at: string;
  updated_at: string;
}

function mapAdminUser(raw: AdminUserApiResponse): AdminUserRecord {
  return {
    id: raw.id,
    name: raw.name,
    email: raw.email,
    role: raw.role,
    status: raw.status,
    lastLogin: raw.last_login,
  };
}

function authHeaders(): Record<string, string> {
  const session = getCurrentSession();
  return session ? { Authorization: `Bearer ${session.token}` } : {};
}

export async function getAdminUsers(): Promise<AdminUserRecord[]> {
  if (!isApiConfigured()) return store;

  const result = await apiClient.get<ApiEnvelope<AdminUserApiResponse[]>>("/api/v1/admin/user", {
    headers: authHeaders(),
  });
  if (!result.ok) return [];
  return result.data.data.map(mapAdminUser);
}

export async function setAdminUserStatus(id: number, status: AdminUserStatus): Promise<void> {
  if (!isApiConfigured()) {
    store = store.map((item) => (item.id === id ? { ...item, status } : item));
    return;
  }

  const result = await apiClient.patch<ApiEnvelope<AdminUserApiResponse>>(
    `/api/v1/admin/user/${id}`,
    { status },
    { headers: authHeaders() },
  );
  if (!result.ok) throw new Error(result.message);
}
