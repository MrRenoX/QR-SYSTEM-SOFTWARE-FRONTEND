"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import { getCurrentSession, logout } from "@/services/admin/authService";
import { getDashboardOverview } from "@/services/admin/dashboardService";
import { canAccessModule, moduleForPath } from "@/lib/admin/permissions";
import type { AdminSessionUser } from "@/types/admin/auth";
import type { DashboardAlert } from "@/types/admin/dashboard";

const TITLES: Record<string, string> = {
  "/dashboard/super-admin": "Overview",
  "/dashboard/super-admin/experiences": "Experiences",
  "/dashboard/super-admin/categories": "Categories",
  "/dashboard/super-admin/faqs": "FAQs",
  "/dashboard/super-admin/bookings": "Bookings",
  "/dashboard/super-admin/queries": "Queries",
  "/dashboard/super-admin/contacts": "Contacts",
  "/dashboard/super-admin/settings": "Website Settings",
  "/dashboard/super-admin/admin-users": "Admin Users",
  "/dashboard/super-admin/audit-logs": "Audit Logs",
};

/**
 * Client-side route guard. This is a convenience redirect, NOT real
 * security — anyone can read past it in devtools. The future Flask API
 * must independently reject unauthorized requests; this only decides what
 * the browser renders.
 */
export default function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<AdminSessionUser | null | undefined>(undefined);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [alerts, setAlerts] = useState<DashboardAlert[]>([]);

  useEffect(() => {
    const session = getCurrentSession();
    if (!session) {
      router.replace("/dashboard/super-admin/login");
      return;
    }
    setUser(session.user);
  }, [router]);

  useEffect(() => {
    getDashboardOverview().then((overview) => setAlerts(overview.alerts));
  }, []);

  useEffect(() => {
    if (!user) return;
    if (!canAccessModule(user.role, moduleForPath(pathname))) {
      router.replace("/dashboard/super-admin");
    }
  }, [user, pathname, router]);

  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  async function handleLogout() {
    await logout();
    router.replace("/dashboard/super-admin/login");
  }

  if (user === undefined) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-admin-bg">
        <span className="h-8 w-8 animate-spin rounded-full border-2 border-admin-border border-t-admin-accent" />
      </div>
    );
  }

  if (!user) return null; // redirecting

  return (
    <div className="flex min-h-screen bg-admin-bg">
      <AdminSidebar
        user={user}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onLogout={handleLogout}
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <AdminHeader
          title={TITLES[pathname] ?? "Dashboard"}
          user={user}
          alerts={alerts}
          onMenuClick={() => setSidebarOpen(true)}
          onLogout={handleLogout}
        />
        <main className="flex-1 overflow-x-hidden px-4 py-5 lg:px-6 lg:py-6">{children}</main>
      </div>
    </div>
  );
}
