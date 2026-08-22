export interface AuditLogEntry {
  id: number;
  createdAt: string;
  adminId: number | null;
  adminName: string;
  action: string;
  module: string;
  description: string;
  ipAddress: string;
  status: "Success" | "Failed";
}
