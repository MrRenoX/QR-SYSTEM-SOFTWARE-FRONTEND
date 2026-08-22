import type { AuditLogEntry } from "@/types/admin/auditLog";

export const auditLogs: AuditLogEntry[] = [
  { id: 1, createdAt: "2026-08-11T09:14:00", adminId: 1, adminName: "Super Admin", action: "Updated Experience", module: "Experiences", description: "Updated Ayodhya Heritage Walk", ipAddress: "103.21.244.10", status: "Success" },
  { id: 2, createdAt: "2026-08-10T18:50:00", adminId: 2, adminName: "Ritika Sharma", action: "Created Category", module: "Categories", description: "Added category 'Culinary'", ipAddress: "103.21.244.18", status: "Success" },
  { id: 3, createdAt: "2026-08-10T16:20:00", adminId: 3, adminName: "Manoj Tiwari", action: "Confirmed Booking", module: "Bookings", description: "Confirmed booking AYB-1041 for Amit Verma", ipAddress: "103.21.244.22", status: "Success" },
  { id: 4, createdAt: "2026-08-09T20:05:00", adminId: 1, adminName: "Super Admin", action: "Deactivated Experience", module: "Experiences", description: "Deactivated Local Crafts & Culture", ipAddress: "103.21.244.10", status: "Success" },
  { id: 5, createdAt: "2026-08-09T11:41:00", adminId: 4, adminName: "Simran Kaur", action: "Replied to Contact", module: "Contacts", description: "Replied to Mohit Agarwal's group booking inquiry", ipAddress: "103.21.244.30", status: "Success" },
  { id: 6, createdAt: "2026-08-08T15:12:00", adminId: 1, adminName: "Super Admin", action: "Updated Settings", module: "Settings", description: "Updated homepage hero title", ipAddress: "103.21.244.10", status: "Success" },
  { id: 7, createdAt: "2026-08-08T13:00:00", adminId: null, adminName: "Unknown", action: "Login Attempt", module: "Auth", description: "Failed login attempt (incorrect password)", ipAddress: "45.132.90.4", status: "Failed" },
];
