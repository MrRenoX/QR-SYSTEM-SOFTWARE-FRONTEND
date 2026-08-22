"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Copy,
  ExternalLink,
  MoreVertical,
  Pencil,
  Plus,
  Power,
  Trash2,
} from "lucide-react";
import PageHeader from "@/components/admin/PageHeader";
import SearchBar from "@/components/admin/SearchBar";
import FilterSelect from "@/components/admin/FilterSelect";
import DataTable, { type DataTableColumn } from "@/components/admin/DataTable";
import StatusBadge from "@/components/admin/StatusBadge";
import EmptyState from "@/components/admin/EmptyState";
import LoadingState from "@/components/admin/LoadingState";
import Modal from "@/components/admin/Modal";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import ExperienceForm from "@/components/admin/ExperienceForm";
import { adminPrimaryButtonClass } from "@/lib/admin/formStyles";
import {
  createExperience,
  deleteExperience,
  duplicateExperience,
  getExperiences,
  setExperienceStatus,
  updateExperience,
} from "@/services/admin/experienceService";
import { getCategories } from "@/services/admin/categoryService";
import type { AdminExperience, ExperienceStatus } from "@/types/admin/experience";
import type { AdminCategory } from "@/types/admin/category";

const STATUS_OPTIONS: ExperienceStatus[] = ["active", "inactive", "draft"];

function ExperiencesPageInner() {
  const searchParams = useSearchParams();
  const [experiences, setExperiences] = useState<AdminExperience[] | null>(null);
  const [categories, setCategories] = useState<AdminCategory[]>([]);
  const [search, setSearch] = useState(() => searchParams.get("q") ?? "");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<AdminExperience | undefined>(undefined);
  const [deleteTarget, setDeleteTarget] = useState<AdminExperience | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [pageError, setPageError] = useState<string | undefined>();

  async function refresh() {
    const [exp, cats] = await Promise.all([getExperiences(), getCategories()]);
    setExperiences(exp);
    setCategories(cats);
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
    if (!experiences) return [];
    return experiences.filter((item) => {
      const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = categoryFilter === "All" || item.category?.name === categoryFilter;
      const matchesStatus = statusFilter === "All" || item.status === statusFilter;
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [experiences, search, categoryFilter, statusFilter]);

  async function handleFormSubmit(values: Parameters<typeof createExperience>[0]) {
    if (editing) {
      await updateExperience(editing.id, values);
    } else {
      await createExperience(values);
    }
    setFormOpen(false);
    setEditing(undefined);
    await refresh();
  }

  async function handleToggleStatus(item: AdminExperience) {
    setOpenMenuId(null);
    setPageError(undefined);
    try {
      await setExperienceStatus(item.id, item.status === "active" ? "inactive" : "active");
      await refresh();
    } catch (err) {
      setPageError(err instanceof Error ? err.message : "Couldn't update status. Please try again.");
    }
  }

  async function handleDuplicate(item: AdminExperience) {
    setOpenMenuId(null);
    setPageError(undefined);
    try {
      await duplicateExperience(item.id);
      await refresh();
    } catch (err) {
      setPageError(err instanceof Error ? err.message : "Couldn't duplicate this experience. Please try again.");
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setPageError(undefined);
    setDeleting(true);
    try {
      await deleteExperience(deleteTarget.id);
      setDeleteTarget(null);
      await refresh();
    } catch (err) {
      setPageError(err instanceof Error ? err.message : "Couldn't delete this experience. Please try again.");
    } finally {
      setDeleting(false);
    }
  }

  const columns: DataTableColumn<AdminExperience>[] = [
    {
      key: "image",
      header: "Image",
      render: (row) => (
        <div className="relative h-11 w-14 shrink-0 overflow-hidden rounded-lg bg-admin-bg">
          {row.coverImage && (
            <Image src={row.coverImage} alt="" fill sizes="56px" className="object-cover" />
          )}
        </div>
      ),
    },
    {
      key: "title",
      header: "Experience",
      render: (row) => (
        <div className="min-w-0">
          <p className="truncate font-semibold text-admin-text">{row.title}</p>
          <p className="truncate text-[11.5px] text-admin-muted">{row.location}</p>
        </div>
      ),
    },
    { key: "category", header: "Category", render: (row) => row.category?.name ?? "—" },
    { key: "price", header: "Price", render: (row) => `₹${row.price.toLocaleString("en-IN")}` },
    { key: "duration", header: "Duration", render: (row) => row.duration },
    { key: "status", header: "Status", render: (row) => <StatusBadge status={row.status} /> },
    { key: "updated", header: "Updated", render: (row) => row.updatedAt },
    {
      key: "actions",
      header: "",
      className: "text-right",
      render: (row) => (
        <div className="relative inline-block text-left">
          <button
            type="button"
            onClick={() => setOpenMenuId(openMenuId === row.id ? null : row.id)}
            aria-label={`Actions for ${row.title}`}
            aria-expanded={openMenuId === row.id}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-admin-muted hover:bg-admin-bg"
          >
            <MoreVertical size={16} aria-hidden="true" />
          </button>
          {openMenuId === row.id && (
            <div className="absolute right-0 z-20 mt-1 w-44 overflow-hidden rounded-xl border border-admin-border bg-white shadow-2xl">
              <Link
                href={`/experiences/${row.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpenMenuId(null)}
                className="flex items-center gap-2 px-3.5 py-2.5 text-[13px] text-admin-text hover:bg-admin-bg"
              >
                <ExternalLink size={14} aria-hidden="true" /> View
              </Link>
              <button
                type="button"
                onClick={() => {
                  setEditing(row);
                  setFormOpen(true);
                  setOpenMenuId(null);
                }}
                className="flex w-full items-center gap-2 px-3.5 py-2.5 text-left text-[13px] text-admin-text hover:bg-admin-bg"
              >
                <Pencil size={14} aria-hidden="true" /> Edit
              </button>
              <button
                type="button"
                onClick={() => handleDuplicate(row)}
                className="flex w-full items-center gap-2 px-3.5 py-2.5 text-left text-[13px] text-admin-text hover:bg-admin-bg"
              >
                <Copy size={14} aria-hidden="true" /> Duplicate
              </button>
              <button
                type="button"
                onClick={() => handleToggleStatus(row)}
                className="flex w-full items-center gap-2 px-3.5 py-2.5 text-left text-[13px] text-admin-text hover:bg-admin-bg"
              >
                <Power size={14} aria-hidden="true" /> {row.status === "active" ? "Deactivate" : "Activate"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setDeleteTarget(row);
                  setOpenMenuId(null);
                }}
                className="flex w-full items-center gap-2 px-3.5 py-2.5 text-left text-[13px] text-rose-600 hover:bg-rose-50"
              >
                <Trash2 size={14} aria-hidden="true" /> Delete
              </button>
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <PageHeader
        title="Experiences"
        description="Manage every experience shown on the public site."
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
            Add Experience
          </button>
        }
      />

      <div className="flex flex-wrap gap-2.5">
        <SearchBar value={search} onChange={setSearch} placeholder="Search experiences..." className="w-full sm:w-64" />
        <FilterSelect
          label="Category"
          value={categoryFilter}
          onChange={setCategoryFilter}
          options={categories.map((category) => category.name)}
        />
        <FilterSelect label="Status" value={statusFilter} onChange={setStatusFilter} options={STATUS_OPTIONS} />
      </div>

      {pageError && (
        <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-[13px] text-rose-700">
          {pageError}
        </div>
      )}

      <div className="rounded-2xl border border-admin-border bg-admin-card shadow-adminCard">
        {experiences === null ? (
          <LoadingState label="Loading experiences…" />
        ) : filtered.length === 0 ? (
          <EmptyState title="No experiences found" description="Try a different search or filter." />
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
        title={editing ? "Edit Experience" : "Add Experience"}
        size="lg"
      >
        <ExperienceForm
          experience={editing}
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
        title="Delete experience?"
        description={`This will permanently remove "${deleteTarget?.title}". This cannot be undone.`}
        confirmLabel="Delete"
        destructive
        loading={deleting}
      />
    </div>
  );
}

export default function AdminExperiencesPage() {
  return (
    <Suspense fallback={<LoadingState label="Loading experiences…" />}>
      <ExperiencesPageInner />
    </Suspense>
  );
}
