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
import { deleteContact, getContacts, setContactStatus } from "@/services/admin/contactService";
import type { AdminContact, ContactStatus } from "@/types/admin/contact";

const STATUS_OPTIONS: ContactStatus[] = ["Unread", "Read", "Replied", "Closed"];

function ContactsPageInner() {
  const searchParams = useSearchParams();
  const [contacts, setContacts] = useState<AdminContact[] | null>(null);
  const [search, setSearch] = useState(() => searchParams.get("q") ?? "");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selected, setSelected] = useState<AdminContact | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<AdminContact | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [pageError, setPageError] = useState<string | undefined>();

  async function refresh() {
    setContacts(await getContacts());
  }

  useEffect(() => {
    refresh();
  }, []);

  const filtered = useMemo(() => {
    if (!contacts) return [];
    return contacts.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.subject.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "All" || item.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [contacts, search, statusFilter]);

  async function handleStatusChange(id: number, status: ContactStatus) {
    setPageError(undefined);
    try {
      await setContactStatus(id, status);
      await refresh();
      setSelected((current) => (current && current.id === id ? { ...current, status } : current));
    } catch (err) {
      setPageError(err instanceof Error ? err.message : "Couldn't update status. Please try again.");
    }
  }

  function openContact(row: AdminContact) {
    setSelected(row);
    if (row.status === "Unread") handleStatusChange(row.id, "Read");
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setPageError(undefined);
    setDeleting(true);
    try {
      await deleteContact(deleteTarget.id);
      setDeleteTarget(null);
      setSelected((current) => (current && current.id === deleteTarget.id ? null : current));
      await refresh();
    } catch (err) {
      setPageError(err instanceof Error ? err.message : "Couldn't delete this message. Please try again.");
    } finally {
      setDeleting(false);
    }
  }

  const columns: DataTableColumn<AdminContact>[] = [
    { key: "name", header: "Name", render: (row) => <span className="font-semibold">{row.name}</span> },
    { key: "email", header: "Email", render: (row) => row.email || "—" },
    { key: "mobile", header: "Mobile", render: (row) => row.mobile || "—" },
    { key: "subject", header: "Subject", render: (row) => row.subject },
    {
      key: "preview",
      header: "Message Preview",
      render: (row) => <span className="line-clamp-1 max-w-[220px] text-admin-muted">{row.message}</span>,
    },
    { key: "date", header: "Date", render: (row) => row.createdAt },
    { key: "status", header: "Status", render: (row) => <StatusBadge status={row.status} /> },
    {
      key: "actions",
      header: "",
      className: "text-right",
      render: (row) => (
        <button
          type="button"
          onClick={() => openContact(row)}
          aria-label={`View message from ${row.name}`}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-admin-muted hover:bg-admin-bg"
        >
          <Eye size={16} aria-hidden="true" />
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <PageHeader title="Contacts" description="Messages submitted through the public Contact Us form." />

      <div className="flex flex-wrap gap-2.5">
        <SearchBar value={search} onChange={setSearch} placeholder="Search by name or subject..." className="w-full sm:w-64" />
        <FilterSelect label="Status" value={statusFilter} onChange={setStatusFilter} options={STATUS_OPTIONS} />
      </div>

      {pageError && (
        <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-[13px] text-rose-700">
          {pageError}
        </div>
      )}

      <div className="rounded-2xl border border-admin-border bg-admin-card shadow-adminCard">
        {contacts === null ? (
          <LoadingState label="Loading contacts…" />
        ) : filtered.length === 0 ? (
          <EmptyState title="No contacts found" description="Try a different search or filter." />
        ) : (
          <DataTable columns={columns} rows={filtered} rowKey={(row) => String(row.id)} />
        )}
      </div>

      <Drawer open={selected !== null} onClose={() => setSelected(null)} title={selected?.subject ?? ""} subtitle={selected?.name}>
        {selected && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3 text-[13px]">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-admin-muted">Email</p>
                <p className="mt-0.5 break-all text-admin-text">{selected.email || "—"}</p>
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-admin-muted">Mobile</p>
                <p className="mt-0.5 text-admin-text">{selected.mobile || "—"}</p>
              </div>
              <div className="col-span-2">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-admin-muted">Date</p>
                <p className="mt-0.5 text-admin-text">{selected.createdAt}</p>
              </div>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-admin-muted">Message</p>
              <p className="mt-1 text-[13.5px] leading-[1.5] text-admin-text">{selected.message}</p>
            </div>
            <div className="flex gap-2.5">
              {selected.email && (
                <a
                  href={`mailto:${selected.email}`}
                  className="inline-flex h-10 flex-1 items-center justify-center rounded-xl bg-admin-accent px-4 text-[13.5px] font-semibold text-white hover:bg-admin-accent/90"
                >
                  Reply by Email
                </a>
              )}
              <button
                type="button"
                onClick={() => setDeleteTarget(selected)}
                className="flex h-10 items-center justify-center gap-1.5 rounded-xl border border-rose-200 px-4 text-[12.5px] font-semibold text-rose-600 hover:bg-rose-50"
              >
                <Trash2 size={14} aria-hidden="true" />
                Delete
              </button>
            </div>
            <div>
              <label htmlFor="contact-status" className="text-[11px] font-semibold uppercase tracking-wide text-admin-muted">
                Update Status
              </label>
              <select
                id="contact-status"
                value={selected.status}
                onChange={(event) => handleStatusChange(selected.id, event.target.value as ContactStatus)}
                className={`${adminInputClass} mt-1.5`}
              >
                {STATUS_OPTIONS.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </Drawer>

      <ConfirmDialog
        open={deleteTarget !== null}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete message?"
        description={`This will permanently remove the message from "${deleteTarget?.name}". This cannot be undone.`}
        confirmLabel="Delete"
        destructive
        loading={deleting}
      />
    </div>
  );
}

export default function AdminContactsPage() {
  return (
    <Suspense fallback={<LoadingState label="Loading contacts…" />}>
      <ContactsPageInner />
    </Suspense>
  );
}
