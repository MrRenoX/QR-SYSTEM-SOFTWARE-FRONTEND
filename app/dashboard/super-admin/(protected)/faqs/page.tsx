"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Pencil, Plus, Power, Trash2 } from "lucide-react";
import PageHeader from "@/components/admin/PageHeader";
import SearchBar from "@/components/admin/SearchBar";
import FilterSelect from "@/components/admin/FilterSelect";
import DataTable, { type DataTableColumn } from "@/components/admin/DataTable";
import StatusBadge from "@/components/admin/StatusBadge";
import EmptyState from "@/components/admin/EmptyState";
import LoadingState from "@/components/admin/LoadingState";
import Modal from "@/components/admin/Modal";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import FAQForm from "@/components/admin/FAQForm";
import { adminPrimaryButtonClass } from "@/lib/admin/formStyles";
import {
  createFAQ,
  deleteFAQ,
  getFAQs,
  setFAQStatus,
  updateFAQ,
} from "@/services/admin/faqService";
import type { AdminFAQ } from "@/types/admin/faq";

function FAQsPageInner() {
  const searchParams = useSearchParams();
  const [faqs, setFaqs] = useState<AdminFAQ[] | null>(null);
  const [search, setSearch] = useState(() => searchParams.get("q") ?? "");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<AdminFAQ | undefined>(undefined);
  const [deleteTarget, setDeleteTarget] = useState<AdminFAQ | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [pageError, setPageError] = useState<string | undefined>();

  async function refresh() {
    setFaqs(await getFAQs());
  }

  useEffect(() => {
    refresh();
  }, []);

  useEffect(() => {
    if (searchParams.get("new") === "1") {
      setEditing(undefined);
      setFormOpen(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const categories = useMemo(() => [...new Set((faqs ?? []).map((item) => item.category))], [faqs]);

  const filtered = useMemo(() => {
    if (!faqs) return [];
    return faqs.filter((item) => {
      const matchesSearch =
        item.question.toLowerCase().includes(search.toLowerCase()) ||
        item.answer.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = categoryFilter === "All" || item.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [faqs, search, categoryFilter]);

  async function handleFormSubmit(values: Parameters<typeof createFAQ>[0]) {
    if (editing) {
      await updateFAQ(editing.id, values);
    } else {
      await createFAQ(values);
    }
    setFormOpen(false);
    setEditing(undefined);
    await refresh();
  }

  async function handleToggleStatus(item: AdminFAQ) {
    setPageError(undefined);
    try {
      await setFAQStatus(item.id, item.status === "active" ? "inactive" : "active");
      await refresh();
    } catch (err) {
      setPageError(err instanceof Error ? err.message : "Couldn't update status. Please try again.");
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setPageError(undefined);
    setDeleting(true);
    try {
      await deleteFAQ(deleteTarget.id);
      setDeleteTarget(null);
      await refresh();
    } catch (err) {
      setPageError(err instanceof Error ? err.message : "Couldn't delete this FAQ. Please try again.");
    } finally {
      setDeleting(false);
    }
  }

  const columns: DataTableColumn<AdminFAQ>[] = [
    { key: "category", header: "Category", render: (row) => <span className="font-semibold">{row.category}</span> },
    {
      key: "question",
      header: "Question",
      render: (row) => <span className="line-clamp-1 max-w-[280px]">{row.question}</span>,
    },
    { key: "order", header: "Order", render: (row) => row.displayOrder },
    { key: "status", header: "Status", render: (row) => <StatusBadge status={row.status} /> },
    {
      key: "actions",
      header: "",
      className: "text-right",
      render: (row) => (
        <div className="flex justify-end gap-1">
          <button
            type="button"
            onClick={() => {
              setEditing(row);
              setFormOpen(true);
            }}
            aria-label={`Edit FAQ: ${row.question}`}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-admin-muted hover:bg-admin-bg"
          >
            <Pencil size={15} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => handleToggleStatus(row)}
            aria-label={row.status === "active" ? `Deactivate FAQ: ${row.question}` : `Activate FAQ: ${row.question}`}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-admin-muted hover:bg-admin-bg"
          >
            <Power size={15} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => setDeleteTarget(row)}
            aria-label={`Delete FAQ: ${row.question}`}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-rose-500 hover:bg-rose-50"
          >
            <Trash2 size={15} aria-hidden="true" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <PageHeader
        title="FAQs"
        description="Questions and answers shown on the public FAQs page."
        action={
          <button
            type="button"
            onClick={() => {
              setEditing(undefined);
              setFormOpen(true);
            }}
            className={adminPrimaryButtonClass}
          >
            <Plus size={16} aria-hidden="true" />
            Add FAQ
          </button>
        }
      />

      <div className="flex flex-wrap gap-2.5">
        <SearchBar value={search} onChange={setSearch} placeholder="Search question or answer..." className="w-full sm:w-64" />
        <FilterSelect label="Category" value={categoryFilter} onChange={setCategoryFilter} options={categories} />
      </div>

      {pageError && (
        <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-[13px] text-rose-700">
          {pageError}
        </div>
      )}

      <div className="rounded-2xl border border-admin-border bg-admin-card shadow-adminCard">
        {faqs === null ? (
          <LoadingState label="Loading FAQs…" />
        ) : filtered.length === 0 ? (
          <EmptyState title="No FAQs found" description="Try a different search or filter." />
        ) : (
          <DataTable columns={columns} rows={filtered} rowKey={(row) => String(row.id)} />
        )}
      </div>

      <Modal
        open={formOpen}
        onClose={() => {
          setFormOpen(false);
          setEditing(undefined);
        }}
        title={editing ? "Edit FAQ" : "Add FAQ"}
      >
        <FAQForm
          faq={editing}
          categories={categories}
          onCancel={() => {
            setFormOpen(false);
            setEditing(undefined);
          }}
          onSubmit={handleFormSubmit}
        />
      </Modal>

      <ConfirmDialog
        open={deleteTarget !== null}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete FAQ?"
        description={`This will permanently remove "${deleteTarget?.question}". This cannot be undone.`}
        confirmLabel="Delete"
        destructive
        loading={deleting}
      />
    </div>
  );
}

export default function AdminFAQsPage() {
  return (
    <Suspense fallback={<LoadingState label="Loading FAQs…" />}>
      <FAQsPageInner />
    </Suspense>
  );
}
