import type { AdminRole } from "./auth";

export type AdminUserStatus = "Active" | "Inactive";

export interface AdminUserRecord {
  id: number;
  name: string;
  email: string;
  role: AdminRole;
  status: AdminUserStatus;
  lastLogin: string | null;
}
