"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Eye, Trash2 } from "lucide-react";
import PageHeader from "@/components/admin/PageHeader";
import SearchBar from "@/components/admin/SearchBar";
import FilterSelect from "@/components/admin/FilterSelect";
import DataTable, { type DataTableColumn } from "@/components/admin/DataTable";
import StatusBadge from "@/components/admin/StatusBadge";
import EmptyState from "@/components/admin/EmptyState";
import LoadingState from "@/components/admin/LoadingState";
import Drawer from "@/components/admin/Drawer";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import { adminInputClass } from "@/lib/admin/formStyles";
import { deleteQuery, getQueries, setQueryStatus } from "@/services/admin/queryService";
import type { AdminQuery, QueryStatus } from "@/types/admin/query";

const STATUS_OPTIONS: QueryStatus[] = ["New", "In Progress", "Resolved", "Closed"];

function QueriesPageInner() {
  const searchParams = useSearchParams();
  const [queries, setQueries] = useState<AdminQuery[] | null>(null);
  const [search, setSearch] = useState(() => searchParams.get("q") ?? "");
  const [statusFilter, setStatusFilter] = useState("All");
  const [experienceFilter, setExperienceFilter] = useState("All");
  const [selected, setSelected] = useState<AdminQuery | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<AdminQuery | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [pageError, setPageError] = useState<string | undefined>();

  async function refresh() {
    setQueries(await getQueries());
  }

  useEffect(() => {
    refresh();
  }, []);

  const filtered = useMemo(() => {
    if (!queries) return [];
    return queries.filter((item) => {
      const matchesSearch =
        item.guestName.toLowerCase().includes(search.toLowerCase()) ||
        item.question.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "All" || item.status === statusFilter;
      const matchesExperience = experienceFilter === "All" || item.experience?.title === experienceFilter;
      return matchesSearch && matchesStatus && matchesExperience;
    });
  }, [queries, search, statusFilter, experienceFilter]);

  async function handleStatusChange(id: number, status: QueryStatus) {
    setPageError(undefined);
    try {
      await setQueryStatus(id, status);
      await refresh();
      setSelected((current) => (current && current.id === id ? { ...current, status } : current));
    } catch (err) {
      setPageError(err instanceof Error ? err.message : "Couldn't update status. Please try again.");
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setPageError(undefined);
    setDeleting(true);
    try {
      await deleteQuery(deleteTarget.id);
      setDeleteTarget(null);
      setSelected((current) => (current && current.id === deleteTarget.id ? null : current));
      await refresh();
    } catch (err) {
      setPageError(err instanceof Error ? err.message : "Couldn't delete this query. Please try again.");
    } finally {
      setDeleting(false);
    }
  }

  const columns: DataTableColumn<AdminQuery>[] = [
    { key: "guest", header: "Guest", render: (row) => <span className="font-semibold">{row.guestName}</span> },
    { key: "room", header: "Room", render: (row) => row.roomNumber || "—" },
    { key: "experience", header: "Experience", render: (row) => row.experience?.title ?? "—" },
    { key: "query", header: "Query", render: (row) => <span className="line-clamp-1 max-w-[240px]">{row.question}</span> },
    { key: "created", header: "Created", render: (row) => row.createdAt },
    { key: "status", header: "Status", render: (row) => <StatusBadge status={row.status} /> },
    {
      key: "actions",
      header: "",
      className: "text-right",
      render: (row) => (
        <button
          type="button"
          onClick={() => setSelected(row)}
          aria-label={`View query from ${row.guestName}`}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-admin-muted hover:bg-admin-bg"
        >
          <Eye size={16} aria-hidden="true" />
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <PageHeader title="Queries" description="Questions guests raised about a specific experience." />

      <div className="flex flex-wrap gap-2.5">
        <SearchBar value={search} onChange={setSearch} placeholder="Search by guest or question..." className="w-full sm:w-64" />
        <FilterSelect label="Status" value={statusFilter} onChange={setStatusFilter} options={STATUS_OPTIONS} />
        <FilterSelect
          label="Experience"
          value={experienceFilter}
          onChange={setExperienceFilter}
          options={[...new Set((queries ?? []).map((item) => item.experience?.title).filter((title): title is string => Boolean(title)))]}
        />
      </div>

      {pageError && (
        <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-[13px] text-rose-700">
          {pageError}
        </div>
      )}

      <div className="rounded-2xl border border-admin-border bg-admin-card shadow-adminCard">
        {queries === null ? (
          <LoadingState label="Loading queries…" />
        ) : filtered.length === 0 ? (
          <EmptyState title="No queries found" description="Try a different search or filter." />
        ) : (
          <DataTable columns={columns} rows={filtered} rowKey={(row) => String(row.id)} />
        )}
      </div>

      <Drawer open={selected !== null} onClose={() => setSelected(null)} title={selected?.guestName ?? ""} subtitle={selected?.experience?.title}>
        {selected && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3 text-[13px]">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-admin-muted">Room</p>
                <p className="mt-0.5 text-admin-text">{selected.roomNumber || "—"}</p>
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-admin-muted">Mobile</p>
                <p className="mt-0.5 text-admin-text">{selected.mobile}</p>
              </div>
              <div className="col-span-2">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-admin-muted">Created</p>
                <p className="mt-0.5 text-admin-text">{selected.createdAt}</p>
              </div>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-admin-muted">Question</p>
              <p className="mt-1 text-[13.5px] leading-[1.5] text-admin-text">{selected.question}</p>
            </div>
            <div>
              <label htmlFor="query-status" className="text-[11px] font-semibold uppercase tracking-wide text-admin-muted">
                Update Status
              </label>
              <select
                id="query-status"
                value={selected.status}
                onChange={(event) => handleStatusChange(selected.id, event.target.value as QueryStatus)}
                className={`${adminInputClass} mt-1.5`}
              >
                {STATUS_OPTIONS.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="button"
              onClick={() => setDeleteTarget(selected)}
              className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-rose-200 px-3.5 py-2.5 text-[12.5px] font-semibold text-rose-600 hover:bg-rose-50"
            >
              <Trash2 size={14} aria-hidden="true" />
              Delete query
            </button>
          </div>
        )}
      </Drawer>

      <ConfirmDialog
        open={deleteTarget !== null}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete query?"
        description={`This will permanently remove the query from "${deleteTarget?.guestName}". This cannot be undone.`}
        confirmLabel="Delete"
        destructive
        loading={deleting}
      />
    </div>
  );
}

export default function AdminQueriesPage() {
  return (
    <Suspense fallback={<LoadingState label="Loading queries…" />}>
      <QueriesPageInner />
    </Suspense>
  );
}
