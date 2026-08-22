"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Eye, Plus, Trash2 } from "lucide-react";
import PageHeader from "@/components/admin/PageHeader";
import SearchBar from "@/components/admin/SearchBar";
import FilterSelect from "@/components/admin/FilterSelect";
import DataTable, { type DataTableColumn } from "@/components/admin/DataTable";
import StatusBadge from "@/components/admin/StatusBadge";
import EmptyState from "@/components/admin/EmptyState";
import LoadingState from "@/components/admin/LoadingState";
import Drawer from "@/components/admin/Drawer";
import Modal from "@/components/admin/Modal";
import FormField from "@/components/admin/FormField";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import {
  adminInputClass,
  adminPrimaryButtonClass,
  adminSecondaryButtonClass,
} from "@/lib/admin/formStyles";
import {
  createBooking,
  deleteBooking,
  getBookings,
  setBookingAmount,
  setBookingPaymentStatus,
  setBookingStatus,
} from "@/services/admin/bookingService";
import { getExperiences } from "@/services/admin/experienceService";
import type { AdminBooking, BookingStatus, PaymentStatus } from "@/types/admin/booking";
import type { AdminExperience } from "@/types/admin/experience";

const STATUS_OPTIONS: BookingStatus[] = ["Pending", "Confirmed", "Completed", "Cancelled"];
const PAYMENT_OPTIONS: PaymentStatus[] = ["Unpaid", "Paid", "Refunded", "Failed"];
const FALLBACK_TIMES = ["Morning", "Afternoon", "Evening"];

function AddBookingModal({
  open,
  onClose,
  experiences,
  onCreated,
}: {
  open: boolean;
  onClose: () => void;
  experiences: AdminExperience[];
  onCreated: () => void;
}) {
  const [guestName, setGuestName] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [experienceId, setExperienceId] = useState<number | "">(experiences[0]?.id ?? "");
  const [date, setDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [adults, setAdults] = useState("2");
  const [children, setChildren] = useState("0");
  const [specialRequest, setSpecialRequest] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | undefined>();

  const selectedExperience = experiences.find((item) => item.id === Number(experienceId));
  const timeOptions =
    selectedExperience?.slots && selectedExperience.slots.length > 0
      ? selectedExperience.slots.map((slot) => slot.key)
      : FALLBACK_TIMES;

  function reset() {
    setGuestName("");
    setRoomNumber("");
    setMobile("");
    setEmail("");
    setDate("");
    setPreferredTime("");
    setAdults("2");
    setChildren("0");
    setSpecialRequest("");
    setFormError(undefined);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;
    if (!guestName.trim() || !mobile.trim() || !experienceId || !date || !adults) {
      setFormError("Guest name, mobile, experience, date and adults are required.");
      return;
    }
    setFormError(undefined);
    setSubmitting(true);
    try {
      await createBooking({
        experienceId: Number(experienceId),
        guestName: guestName.trim(),
        roomNumber: roomNumber.trim() || undefined,
        mobile: mobile.trim(),
        email: email.trim() || undefined,
        visitDate: date,
        preferredTime: preferredTime || timeOptions[0],
        adults: Number(adults),
        children: children ? Number(children) : undefined,
        specialRequest: specialRequest.trim() || undefined,
      });
      onCreated();
      onClose();
      reset();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Couldn't add this booking. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Modal open={open} onClose={onClose} title="Add Booking">
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {formError && (
          <p className="rounded-xl border border-rose-200 bg-rose-50 px-3.5 py-2.5 text-[13px] text-rose-700">
            {formError}
          </p>
        )}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField label="Guest Name" htmlFor="bk-guest" required>
            <input id="bk-guest" value={guestName} onChange={(event) => setGuestName(event.target.value)} className={adminInputClass} />
          </FormField>
          <FormField label="Room Number" htmlFor="bk-room">
            <input id="bk-room" value={roomNumber} onChange={(event) => setRoomNumber(event.target.value)} className={adminInputClass} />
          </FormField>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField label="Mobile" htmlFor="bk-mobile" required>
            <input id="bk-mobile" type="tel" value={mobile} onChange={(event) => setMobile(event.target.value)} className={adminInputClass} placeholder="+91" />
          </FormField>
          <FormField label="Email" htmlFor="bk-email">
            <input id="bk-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} className={adminInputClass} />
          </FormField>
        </div>

        <FormField label="Experience" htmlFor="bk-experience" required>
          <select
            id="bk-experience"
            value={experienceId}
            onChange={(event) => setExperienceId(event.target.value ? Number(event.target.value) : "")}
            className={adminInputClass}
          >
            {experiences.map((item) => (
              <option key={item.id} value={item.id}>
                {item.title}
              </option>
            ))}
          </select>
        </FormField>

        <div className="grid grid-cols-2 gap-4">
          <FormField label="Date" htmlFor="bk-date" required>
            <input id="bk-date" type="date" value={date} onChange={(event) => setDate(event.target.value)} className={adminInputClass} />
          </FormField>
          <FormField label="Preferred Time" htmlFor="bk-time">
            <select id="bk-time" value={preferredTime} onChange={(event) => setPreferredTime(event.target.value)} className={adminInputClass}>
              <option value="">Select…</option>
              {timeOptions.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </FormField>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField label="Adults" htmlFor="bk-adults" required>
            <input id="bk-adults" type="number" min={1} value={adults} onChange={(event) => setAdults(event.target.value)} className={adminInputClass} />
          </FormField>
          <FormField label="Children" htmlFor="bk-children">
            <input id="bk-children" type="number" min={0} value={children} onChange={(event) => setChildren(event.target.value)} className={adminInputClass} />
          </FormField>
        </div>

        <FormField label="Special Request" htmlFor="bk-special">
          <textarea id="bk-special" rows={2} value={specialRequest} onChange={(event) => setSpecialRequest(event.target.value)} className={`${adminInputClass} resize-none`} />
        </FormField>

        <div className="flex justify-end gap-2.5 border-t border-admin-border pt-4">
          <button type="button" onClick={onClose} className={adminSecondaryButtonClass}>
            Cancel
          </button>
          <button type="submit" disabled={submitting} className={adminPrimaryButtonClass}>
            {submitting ? "Saving…" : "Add Booking"}
          </button>
        </div>
      </form>
    </Modal>
  );
}

function BookingsPageInner() {
  const searchParams = useSearchParams();
  const [bookings, setBookings] = useState<AdminBooking[] | null>(null);
  const [experiences, setExperiences] = useState<AdminExperience[]>([]);
  const [search, setSearch] = useState(() => searchParams.get("q") ?? "");
  const [statusFilter, setStatusFilter] = useState("All");
  const [paymentFilter, setPaymentFilter] = useState("All");
  const [experienceFilter, setExperienceFilter] = useState("All");
  const [selected, setSelected] = useState<AdminBooking | null>(null);
  const [amountDraft, setAmountDraft] = useState("");
  const [addOpen, setAddOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<AdminBooking | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [pageError, setPageError] = useState<string | undefined>();

  async function refresh() {
    setBookings(await getBookings());
  }

  useEffect(() => {
    refresh();
    getExperiences().then(setExperiences);
  }, []);

  useEffect(() => {
    if (searchParams.get("new") === "1") setAddOpen(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setAmountDraft(selected?.amount != null ? String(selected.amount) : "");
  }, [selected]);

  const filtered = useMemo(() => {
    if (!bookings) return [];
    return bookings.filter((item) => {
      const matchesSearch =
        item.guestName.toLowerCase().includes(search.toLowerCase()) ||
        item.bookingRef.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "All" || item.status === statusFilter;
      const matchesPayment = paymentFilter === "All" || item.paymentStatus === paymentFilter;
      const matchesExperience = experienceFilter === "All" || item.experience?.title === experienceFilter;
      return matchesSearch && matchesStatus && matchesPayment && matchesExperience;
    });
  }, [bookings, search, statusFilter, paymentFilter, experienceFilter]);

  async function handleStatusChange(id: number, status: BookingStatus) {
    setPageError(undefined);
    try {
      await setBookingStatus(id, status);
      await refresh();
      setSelected((current) => (current && current.id === id ? { ...current, status } : current));
    } catch (err) {
      setPageError(err instanceof Error ? err.message : "Couldn't update status. Please try again.");
    }
  }

  async function handlePaymentChange(id: number, paymentStatus: PaymentStatus) {
    setPageError(undefined);
    try {
      await setBookingPaymentStatus(id, paymentStatus);
      await refresh();
      setSelected((current) => (current && current.id === id ? { ...current, paymentStatus } : current));
    } catch (err) {
      setPageError(err instanceof Error ? err.message : "Couldn't update payment status. Please try again.");
    }
  }

  async function handleAmountSave(id: number) {
    if (!amountDraft || Number.isNaN(Number(amountDraft)) || Number(amountDraft) < 0) return;
    const amount = Number(amountDraft);
    if (selected?.amount === amount) return;
    setPageError(undefined);
    try {
      await setBookingAmount(id, amount);
      await refresh();
      setSelected((current) => (current && current.id === id ? { ...current, amount } : current));
    } catch (err) {
      setPageError(err instanceof Error ? err.message : "Couldn't update amount. Please try again.");
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setPageError(undefined);
    setDeleting(true);
    try {
      await deleteBooking(deleteTarget.id);
      setDeleteTarget(null);
      setSelected((current) => (current && current.id === deleteTarget.id ? null : current));
      await refresh();
    } catch (err) {
      setPageError(err instanceof Error ? err.message : "Couldn't delete this booking. Please try again.");
    } finally {
      setDeleting(false);
    }
  }

  const columns: DataTableColumn<AdminBooking>[] = [
    { key: "id", header: "Booking ID", render: (row) => <span className="font-mono text-[12px] text-admin-muted">{row.bookingRef}</span> },
    { key: "guest", header: "Guest", render: (row) => <span className="font-semibold">{row.guestName}</span> },
    { key: "room", header: "Room", render: (row) => row.roomNumber || "—" },
    { key: "experience", header: "Experience", render: (row) => row.experience?.title ?? "—" },
    { key: "date", header: "Date", render: (row) => row.visitDate },
    { key: "guests", header: "Guests", render: (row) => row.guests },
    { key: "amount", header: "Amount", render: (row) => (row.amount != null ? `₹${row.amount.toLocaleString("en-IN")}` : "—") },
    { key: "payment", header: "Payment", render: (row) => <StatusBadge status={row.paymentStatus} /> },
    { key: "status", header: "Status", render: (row) => <StatusBadge status={row.status} /> },
    { key: "created", header: "Created At", render: (row) => row.createdAt },
    {
      key: "actions",
      header: "",
      className: "text-right",
      render: (row) => (
        <button
          type="button"
          onClick={() => setSelected(row)}
          aria-label={`View booking ${row.bookingRef}`}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-admin-muted hover:bg-admin-bg"
        >
          <Eye size={16} aria-hidden="true" />
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <PageHeader
        title="Bookings"
        description="Every booking request submitted from the public site."
        action={
          <button type="button" onClick={() => setAddOpen(true)} className={adminPrimaryButtonClass}>
            <Plus size={16} aria-hidden="true" />
            Add Booking
          </button>
        }
      />

      <div className="flex flex-wrap gap-2.5">
        <SearchBar value={search} onChange={setSearch} placeholder="Search by guest or booking ID..." className="w-full sm:w-64" />
        <FilterSelect label="Status" value={statusFilter} onChange={setStatusFilter} options={STATUS_OPTIONS} />
        <FilterSelect label="Payment" value={paymentFilter} onChange={setPaymentFilter} options={PAYMENT_OPTIONS} />
        <FilterSelect
          label="Experience"
          value={experienceFilter}
          onChange={setExperienceFilter}
          options={[...new Set((bookings ?? []).map((item) => item.experience?.title).filter((title): title is string => Boolean(title)))]}
        />
      </div>

      {pageError && (
        <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-[13px] text-rose-700">
          {pageError}
        </div>
      )}

      <div className="rounded-2xl border border-admin-border bg-admin-card shadow-adminCard">
        {bookings === null ? (
          <LoadingState label="Loading bookings…" />
        ) : filtered.length === 0 ? (
          <EmptyState title="No bookings found" description="Try a different search or filter." />
        ) : (
          <DataTable columns={columns} rows={filtered} rowKey={(row) => String(row.id)} />
        )}
      </div>

      <Drawer
        open={selected !== null}
        onClose={() => setSelected(null)}
        title={selected?.bookingRef ?? ""}
        subtitle={selected?.guestName}
      >
        {selected && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3 text-[13px]">
              <DetailRow label="Room" value={selected.roomNumber || "—"} />
              <DetailRow label="Experience" value={selected.experience?.title ?? "—"} />
              <DetailRow label="Date" value={selected.visitDate} />
              <DetailRow label="Preferred Time" value={selected.preferredTime} />
              <DetailRow label="Guests" value={`${selected.adults} adult${selected.adults === 1 ? "" : "s"}${selected.children ? `, ${selected.children} child${selected.children === 1 ? "" : "ren"}` : ""}`} />
              <DetailRow label="Email" value={selected.email || "—"} />
              <DetailRow label="Mobile" value={selected.mobile} />
              <DetailRow label="Created" value={selected.createdAt} />
            </div>
            {selected.specialRequest && (
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-admin-muted">Special Request</p>
                <p className="mt-1 text-[13px] text-admin-text">{selected.specialRequest}</p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="booking-status" className="text-[11px] font-semibold uppercase tracking-wide text-admin-muted">
                  Status
                </label>
                <select
                  id="booking-status"
                  value={selected.status}
                  onChange={(event) => handleStatusChange(selected.id, event.target.value as BookingStatus)}
                  className={`${adminInputClass} mt-1.5`}
                >
                  {STATUS_OPTIONS.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="booking-payment" className="text-[11px] font-semibold uppercase tracking-wide text-admin-muted">
                  Payment
                </label>
                <select
                  id="booking-payment"
                  value={selected.paymentStatus}
                  onChange={(event) => handlePaymentChange(selected.id, event.target.value as PaymentStatus)}
                  className={`${adminInputClass} mt-1.5`}
                >
                  {PAYMENT_OPTIONS.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="booking-amount" className="text-[11px] font-semibold uppercase tracking-wide text-admin-muted">
                Amount (₹)
              </label>
              <input
                id="booking-amount"
                type="number"
                min={0}
                value={amountDraft}
                onChange={(event) => setAmountDraft(event.target.value)}
                onBlur={() => handleAmountSave(selected.id)}
                className={`${adminInputClass} mt-1.5`}
                placeholder="Not set"
              />
            </div>

            <button
              type="button"
              onClick={() => setDeleteTarget(selected)}
              className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-rose-200 px-3.5 py-2.5 text-[12.5px] font-semibold text-rose-600 hover:bg-rose-50"
            >
              <Trash2 size={14} aria-hidden="true" />
              Delete booking
            </button>
          </div>
        )}
      </Drawer>

      <AddBookingModal open={addOpen} onClose={() => setAddOpen(false)} experiences={experiences} onCreated={refresh} />

      <ConfirmDialog
        open={deleteTarget !== null}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete booking?"
        description={`This will permanently remove the booking for "${deleteTarget?.guestName}". This cannot be undone.`}
        confirmLabel="Delete"
        destructive
        loading={deleting}
      />
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-wide text-admin-muted">{label}</p>
      <p className="mt-0.5 text-admin-text">{value}</p>
    </div>
  );
}

export default function AdminBookingsPage() {
  return (
    <Suspense fallback={<LoadingState label="Loading bookings…" />}>
      <BookingsPageInner />
    </Suspense>
  );
}
