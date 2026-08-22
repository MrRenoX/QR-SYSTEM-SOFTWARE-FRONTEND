import { apiClient, isApiConfigured } from "../apiClient";
import { getCurrentSession } from "./authService";
import { auditLogs } from "@/data/admin/auditLogs";
import type { AuditLogEntry } from "@/types/admin/auditLog";

/** The Flask API wraps every response in this envelope — see BACKEND_GUIDE.md. */
interface ApiEnvelope<T> {
  success: boolean;
  message: string;
  data: T;
}

interface AuditLogApiResponse {
  id: number;
  admin_id: number | null;
  admin_name: string;
  action: string;
  module: string;
  description: string;
  ip_address: string;
  status: "Success" | "Failed";
  created_at: string;
}

function mapAuditLog(raw: AuditLogApiResponse): AuditLogEntry {
  return {
    id: raw.id,
    createdAt: raw.created_at,
    adminId: raw.admin_id,
    adminName: raw.admin_name,
    action: raw.action,
    module: raw.module,
    description: raw.description,
    ipAddress: raw.ip_address,
    status: raw.status,
  };
}

function authHeaders(): Record<string, string> {
  const session = getCurrentSession();
  return session ? { Authorization: `Bearer ${session.token}` } : {};
}

/** Audit logs are read-only from the admin UI — Flask writes a row from every admin mutation, the frontend never writes here directly. */
export async function getAuditLogs(): Promise<AuditLogEntry[]> {
  if (!isApiConfigured()) return auditLogs;

  const result = await apiClient.get<ApiEnvelope<AuditLogApiResponse[]>>("/api/v1/admin/audit-log", {
    headers: authHeaders(),
  });
  if (!result.ok) return [];
  return result.data.data.map(mapAuditLog);
}
