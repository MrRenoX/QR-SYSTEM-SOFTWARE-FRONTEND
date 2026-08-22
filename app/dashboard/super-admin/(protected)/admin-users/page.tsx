"use client";

import { useEffect, useState } from "react";
import { Power } from "lucide-react";
import PageHeader from "@/components/admin/PageHeader";
import DataTable, { type DataTableColumn } from "@/components/admin/DataTable";
import StatusBadge from "@/components/admin/StatusBadge";
import EmptyState from "@/components/admin/EmptyState";
import LoadingState from "@/components/admin/LoadingState";
import { getAdminUsers, setAdminUserStatus } from "@/services/admin/adminUserService";
import type { AdminUserRecord } from "@/types/admin/adminUser";

const ROLE_LABEL: Record<string, string> = {
  super_admin: "Super Admin",
  content_manager: "Content Manager",
  booking_manager: "Booking Manager",
  support: "Support",
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUserRecord[] | null>(null);
  const [pageError, setPageError] = useState<string | undefined>();

  async function refresh() {
    setUsers(await getAdminUsers());
  }

  useEffect(() => {
    refresh();
  }, []);

  async function toggleStatus(user: AdminUserRecord) {
    setPageError(undefined);
    try {
      await setAdminUserStatus(user.id, user.status === "Active" ? "Inactive" : "Active");
      await refresh();
    } catch (err) {
      setPageError(err instanceof Error ? err.message : "Couldn't update this admin's status. Please try again.");
    }
  }

  const columns: DataTableColumn<AdminUserRecord>[] = [
    { key: "name", header: "Name", render: (row) => <span className="font-semibold">{row.name}</span> },
    { key: "email", header: "Email", render: (row) => row.email },
    { key: "role", header: "Role", render: (row) => ROLE_LABEL[row.role] ?? row.role },
    { key: "status", header: "Status", render: (row) => <StatusBadge status={row.status} /> },
    { key: "lastLogin", header: "Last Login", render: (row) => row.lastLogin ?? "—" },
    {
      key: "actions",
      header: "",
      className: "text-right",
      render: (row) => (
        <button
          type="button"
          onClick={() => toggleStatus(row)}
          aria-label={row.status === "Active" ? `Deactivate ${row.name}` : `Activate ${row.name}`}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-admin-muted hover:bg-admin-bg"
        >
          <Power size={15} aria-hidden="true" />
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <PageHeader title="Admin Users" description="People with access to this Super Admin panel." />

      {pageError && (
        <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-[13px] text-rose-700">
          {pageError}
        </div>
      )}

      <div className="rounded-2xl border border-admin-border bg-admin-card shadow-adminCard">
        {users === null ? (
          <LoadingState label="Loading admin users…" />
        ) : users.length === 0 ? (
          <EmptyState title="No admin users found" />
        ) : (
          <DataTable columns={columns} rows={users} rowKey={(row) => String(row.id)} />
        )}
      </div>
    </div>
  );
}
