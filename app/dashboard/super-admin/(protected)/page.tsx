"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  Calendar,
  FolderPlus,
  Mail,
  MessageCircleQuestion,
  PlusCircle,
  Settings,
} from "lucide-react";
import StatCard from "@/components/admin/StatCard";
import DataTable, { type DataTableColumn } from "@/components/admin/DataTable";
import StatusBadge from "@/components/admin/StatusBadge";
import LoadingState from "@/components/admin/LoadingState";
import { getDashboardOverview } from "@/services/admin/dashboardService";
import type {
  DashboardOverview,
  RecentBookingRow,
  RecentContactRow,
  RecentQueryRow,
} from "@/types/admin/dashboard";

const QUICK_ACTIONS = [
  { label: "Add Experience", description: "Create a new experience", href: "/dashboard/super-admin/experiences?new=1", icon: PlusCircle, tone: "bg-violet-100 text-violet-600" },
  { label: "Add Category", description: "Create a new category", href: "/dashboard/super-admin/categories?new=1", icon: FolderPlus, tone: "bg-emerald-100 text-emerald-600" },
  { label: "Add Booking", description: "Create a manual booking", href: "/dashboard/super-admin/bookings?new=1", icon: Calendar, tone: "bg-blue-100 text-blue-600" },
  { label: "View Queries", description: "Manage all queries", href: "/dashboard/super-admin/queries", icon: MessageCircleQuestion, tone: "bg-amber-100 text-amber-600" },
  { label: "View Contacts", description: "See all contact messages", href: "/dashboard/super-admin/contacts", icon: Mail, tone: "bg-rose-100 text-rose-600" },
  { label: "Website Settings", description: "Manage website configuration", href: "/dashboard/super-admin/settings", icon: Settings, tone: "bg-indigo-100 text-indigo-600" },
] as const;

function RecentCard({ title, viewAllHref, children }: { title: string; viewAllHref: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-admin-border bg-admin-card shadow-adminCard">
      <div className="flex items-center justify-between px-5 pt-4">
        <h2 className="text-[14.5px] font-bold text-admin-text">{title}</h2>
        <Link href={viewAllHref} className="text-[12.5px] font-semibold text-admin-accent hover:underline">
          View All
        </Link>
      </div>
      <div className="mt-2">{children}</div>
    </div>
  );
}

export default function SuperAdminOverviewPage() {
  const [data, setData] = useState<DashboardOverview | null>(null);

  useEffect(() => {
    getDashboardOverview().then(setData);
  }, []);

  if (!data) return <LoadingState label="Loading dashboard…" />;

  const bookingColumns: DataTableColumn<RecentBookingRow>[] = [
    { key: "guest", header: "Guest", render: (row) => <span className="font-semibold">{row.guest}</span> },
    { key: "experience", header: "Experience", render: (row) => row.experience },
    { key: "date", header: "Date", render: (row) => row.date },
    { key: "status", header: "Status", render: (row) => <StatusBadge status={row.status} /> },
  ];

  const queryColumns: DataTableColumn<RecentQueryRow>[] = [
    { key: "guest", header: "Guest", render: (row) => <span className="font-semibold">{row.guest}</span> },
    { key: "experience", header: "Experience", render: (row) => row.experience },
    { key: "query", header: "Query", render: (row) => row.query },
    { key: "status", header: "Status", render: (row) => <StatusBadge status={row.status} /> },
  ];

  const contactColumns: DataTableColumn<RecentContactRow>[] = [
    { key: "name", header: "Name", render: (row) => <span className="font-semibold">{row.name}</span> },
    { key: "subject", header: "Subject", render: (row) => row.subject },
    { key: "date", header: "Date", render: (row) => row.date },
    { key: "status", header: "Status", render: (row) => <StatusBadge status={row.status} /> },
  ];

  return (
    <div className="space-y-5">
      {data.alerts.length > 0 && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
          <ul className="space-y-1.5">
            {data.alerts.map((alert) => (
              <li key={alert.id} className="flex items-start gap-2 text-[13px] text-amber-800">
                <AlertTriangle size={15} className="mt-0.5 shrink-0" aria-hidden="true" />
                {alert.message}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-6">
        {data.stats.map((stat) => (
          <StatCard key={stat.id} stat={stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <RecentCard title="Recent Bookings" viewAllHref="/dashboard/super-admin/bookings">
          <DataTable columns={bookingColumns} rows={data.recentBookings} rowKey={(row) => row.id} minWidth={420} />
        </RecentCard>
        <RecentCard title="Recent Queries" viewAllHref="/dashboard/super-admin/queries">
          <DataTable columns={queryColumns} rows={data.recentQueries} rowKey={(row) => row.id} minWidth={420} />
        </RecentCard>
        <RecentCard title="Recent Contacts" viewAllHref="/dashboard/super-admin/contacts">
          <DataTable columns={contactColumns} rows={data.recentContacts} rowKey={(row) => row.id} minWidth={420} />
        </RecentCard>
      </div>

      <div className="rounded-2xl bg-admin-accentSoft p-5">
        <h2 className="text-[14.5px] font-bold text-admin-text">Quick Actions</h2>
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {QUICK_ACTIONS.map(({ label, description, href, icon: Icon, tone }) => (
            <Link
              key={label}
              href={href}
              className="flex items-center gap-3 rounded-xl border border-admin-border bg-white p-3.5 transition-shadow hover:shadow-adminCard"
            >
              <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${tone}`}>
                <Icon size={18} aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <p className="truncate text-[13.5px] font-semibold text-admin-text">{label}</p>
                <p className="truncate text-[12px] text-admin-muted">{description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
