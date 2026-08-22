"use client";

import { useEffect, useMemo, useState } from "react";
import PageHeader from "@/components/admin/PageHeader";
import SearchBar from "@/components/admin/SearchBar";
import DataTable, { type DataTableColumn } from "@/components/admin/DataTable";
import StatusBadge from "@/components/admin/StatusBadge";
import EmptyState from "@/components/admin/EmptyState";
import LoadingState from "@/components/admin/LoadingState";
import { getAuditLogs } from "@/services/admin/auditLogService";
import type { AuditLogEntry } from "@/types/admin/auditLog";

export default function AuditLogsPage() {
  const [logs, setLogs] = useState<AuditLogEntry[] | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getAuditLogs().then(setLogs);
  }, []);

  const filtered = useMemo(() => {
    if (!logs) return [];
    return logs.filter(
      (item) =>
        item.adminName.toLowerCase().includes(search.toLowerCase()) ||
        item.action.toLowerCase().includes(search.toLowerCase()) ||
        item.module.toLowerCase().includes(search.toLowerCase()),
    );
  }, [logs, search]);

  const columns: DataTableColumn<AuditLogEntry>[] = [
    { key: "date", header: "Date", render: (row) => row.createdAt },
    { key: "admin", header: "Admin", render: (row) => <span className="font-semibold">{row.adminName}</span> },
    { key: "action", header: "Action", render: (row) => row.action },
    { key: "module", header: "Module", render: (row) => row.module },
    { key: "description", header: "Description", render: (row) => <span className="text-admin-muted">{row.description}</span> },
    { key: "ip", header: "IP", render: (row) => <span className="font-mono text-[12px]">{row.ipAddress}</span> },
    { key: "status", header: "Status", render: (row) => <StatusBadge status={row.status} /> },
  ];

  return (
    <div className="space-y-4">
      <PageHeader title="Audit Logs" description="A record of admin actions across the panel." />

      <SearchBar value={search} onChange={setSearch} placeholder="Search by admin, action or module..." className="w-full sm:w-72" />

      <div className="rounded-2xl border border-admin-border bg-admin-card shadow-adminCard">
        {logs === null ? (
          <LoadingState label="Loading audit logs…" />
        ) : filtered.length === 0 ? (
          <EmptyState title="No audit log entries found" description="Try a different search." />
        ) : (
          <DataTable columns={columns} rows={filtered} rowKey={(row) => String(row.id)} />
        )}
      </div>
    </div>
  );
}
