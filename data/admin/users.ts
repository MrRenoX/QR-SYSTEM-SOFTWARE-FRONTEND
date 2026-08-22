import type { AdminUserRecord } from "@/types/admin/adminUser";

export const adminUsers: AdminUserRecord[] = [
  { id: 1, name: "Super Admin", email: "superadmin@anubhav.com", role: "super_admin", status: "Active", lastLogin: "2026-08-11T09:02:00" },
  { id: 2, name: "Ritika Sharma", email: "ritika.sharma@anubhav.com", role: "content_manager", status: "Active", lastLogin: "2026-08-10T18:45:00" },
  { id: 3, name: "Manoj Tiwari", email: "manoj.tiwari@anubhav.com", role: "booking_manager", status: "Active", lastLogin: "2026-08-10T16:12:00" },
  { id: 4, name: "Simran Kaur", email: "simran.kaur@anubhav.com", role: "support", status: "Inactive", lastLogin: "2026-07-28T11:20:00" },
];
