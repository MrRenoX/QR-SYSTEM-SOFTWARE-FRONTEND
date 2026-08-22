import type { AdminRole } from "@/types/admin/auth";

/**
 * Mirrors the role → module table in BACKEND_GUIDE.md's Admin Auth API doc.
 * Flask enforces this server-side (403 per endpoint) — this is only used to
 * avoid showing nav items / routes a role can't use, not real security.
 */
export type AdminModule = "dashboard" | "content" | "bookings" | "communications" | "system";

const ROLE_MODULES: Record<AdminRole, AdminModule[]> = {
  super_admin: ["dashboard", "content", "bookings", "communications", "system"],
  content_manager: ["dashboard", "content"],
  booking_manager: ["dashboard", "bookings"],
  support: ["dashboard", "communications"],
};

export function canAccessModule(role: AdminRole, adminModule: AdminModule): boolean {
  return ROLE_MODULES[role].includes(adminModule);
}

/** Best-effort match from a `/dashboard/super-admin/...` pathname to its module. */
export function moduleForPath(pathname: string): AdminModule {
  if (pathname.includes("/experiences") || pathname.includes("/categories") || pathname.includes("/faqs")) {
    return "content";
  }
  if (pathname.includes("/bookings")) return "bookings";
  if (pathname.includes("/queries") || pathname.includes("/contacts")) return "communications";
  if (pathname.includes("/settings") || pathname.includes("/admin-users") || pathname.includes("/audit-logs")) {
    return "system";
  }
  return "dashboard";
}
