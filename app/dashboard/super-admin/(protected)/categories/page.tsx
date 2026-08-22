"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Pencil, Plus, Power, Trash2 } from "lucide-react";
import PageHeader from "@/components/admin/PageHeader";
import SearchBar from "@/components/admin/SearchBar";
import DataTable, { type DataTableColumn } from "@/components/admin/DataTable";
import StatusBadge from "@/components/admin/StatusBadge";
import EmptyState from "@/components/admin/EmptyState";
import LoadingState from "@/components/admin/LoadingState";
import Modal from "@/components/admin/Modal";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import CategoryForm from "@/components/admin/CategoryForm";
import { adminPrimaryButtonClass } from "@/lib/admin/formStyles";
import {
  createCategory,
  deleteCategory,
  getCategories,
  setCategoryStatus,
  updateCategory,
} from "@/services/admin/categoryService";
import type { AdminCategory } from "@/types/admin/category";

function CategoriesPageInner() {
  const searchParams = useSearchParams();
  const [categories, setCategories] = useState<AdminCategory[] | null>(null);
  const [search, setSearch] = useState(() => searchParams.get("q") ?? "");
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<AdminCategory | undefined>(undefined);
  const [deleteTarget, setDeleteTarget] = useState<AdminCategory | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [pageError, setPageError] = useState<string | undefined>();

  async function refresh() {
    setCategories(await getCategories());
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

  const filtered = useMemo(() => {
    if (!categories) return [];
    return categories.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));
  }, [categories, search]);

  async function handleFormSubmit(values: Parameters<typeof createCategory>[0]) {
    if (editing) {
      await updateCategory(editing.id, values);
    } else {
      await createCategory(values);
    }
    setFormOpen(false);
    setEditing(undefined);
    await refresh();
  }

  async function handleToggleStatus(item: AdminCategory) {
    setPageError(undefined);
    try {
      await setCategoryStatus(item.id, item.status === "active" ? "inactive" : "active");
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
      await deleteCategory(deleteTarget.id);
      setDeleteTarget(null);
      await refresh();
    } catch (err) {
      setPageError(err instanceof Error ? err.message : "Couldn't delete this category. Please try again.");
    } finally {
      setDeleting(false);
    }
  }

  const columns: DataTableColumn<AdminCategory>[] = [
    {
      key: "image",
      header: "",
      className: "w-[52px]",
      render: (row) =>
        row.coverImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={row.coverImage} alt="" className="h-9 w-9 rounded-lg object-cover" />
        ) : (
          <div className="h-9 w-9 rounded-lg bg-admin-bg" />
        ),
    },
    { key: "name", header: "Name", render: (row) => <span className="font-semibold">{row.name}</span> },
    {
      key: "description",
      header: "Description",
      render: (row) => <span className="line-clamp-1 max-w-[280px] text-admin-muted">{row.description}</span>,
    },
    { key: "count", header: "Experience Count", render: (row) => row.experienceCount },
    { key: "order", header: "Display Order", render: (row) => row.displayOrder },
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
            aria-label={`Edit ${row.name}`}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-admin-muted hover:bg-admin-bg"
          >
            <Pencil size={15} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => handleToggleStatus(row)}
            aria-label={row.status === "active" ? `Deactivate ${row.name}` : `Activate ${row.name}`}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-admin-muted hover:bg-admin-bg"
          >
            <Power size={15} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => setDeleteTarget(row)}
            aria-label={`Delete ${row.name}`}
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
        title="Categories"
        description="Organize experiences into browsable categories."
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
            Add Category
          </button>
        }
      />

      <SearchBar value={search} onChange={setSearch} placeholder="Search categories..." className="w-full sm:w-64" />

      {pageError && (
        <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-[13px] text-rose-700">
          {pageError}
        </div>
      )}

      <div className="rounded-2xl border border-admin-border bg-admin-card shadow-adminCard">
        {categories === null ? (
          <LoadingState label="Loading categories…" />
        ) : filtered.length === 0 ? (
          <EmptyState title="No categories found" description="Try a different search." />
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
        title={editing ? "Edit Category" : "Add Category"}
      >
        <CategoryForm
          category={editing}
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
        title="Delete category?"
        description={`This will permanently remove "${deleteTarget?.name}". This cannot be undone.`}
        confirmLabel="Delete"
        destructive
        loading={deleting}
      />
    </div>
  );
}

export default function AdminCategoriesPage() {
  return (
    <Suspense fallback={<LoadingState label="Loading categories…" />}>
      <CategoriesPageInner />
    </Suspense>
  );
}
