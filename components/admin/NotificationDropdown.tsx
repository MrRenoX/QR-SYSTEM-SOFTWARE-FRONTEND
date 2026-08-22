"use client";

import { AlertTriangle } from "lucide-react";
import type { DashboardAlert } from "@/types/admin/dashboard";

export default function NotificationDropdown({ alerts }: { alerts: DashboardAlert[] }) {
  return (
    <div
      role="menu"
      aria-label="Notifications"
      className="absolute right-0 top-12 z-50 w-80 max-w-[calc(100vw-2rem)] animate-fade-in overflow-hidden rounded-2xl border border-admin-border bg-white shadow-2xl"
    >
      <div className="border-b border-admin-border px-4 py-3">
        <p className="text-[13.5px] font-bold text-admin-text">Notifications</p>
      </div>
      <ul className="max-h-80 overflow-y-auto">
        {alerts.length === 0 ? (
          <li className="px-4 py-6 text-center text-[13px] text-admin-muted">You&apos;re all caught up.</li>
        ) : (
          alerts.map((alert) => (
            <li key={alert.id} className="flex gap-3 border-b border-admin-border px-4 py-3 last:border-0">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                <AlertTriangle size={16} aria-hidden="true" />
              </span>
              <p className="min-w-0 flex-1 text-[13px] text-admin-text">{alert.message}</p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
