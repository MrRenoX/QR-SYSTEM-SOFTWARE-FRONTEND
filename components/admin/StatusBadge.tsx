const TONE_CLASSES = {
  amber: "bg-amber-50 text-amber-700 ring-amber-600/20",
  emerald: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  blue: "bg-blue-50 text-blue-700 ring-blue-600/20",
  rose: "bg-rose-50 text-rose-700 ring-rose-600/20",
  gray: "bg-gray-100 text-gray-600 ring-gray-500/20",
  violet: "bg-violet-50 text-violet-700 ring-violet-600/20",
} as const;

type Tone = keyof typeof TONE_CLASSES;

/** Every status string this admin panel renders, mapped to a consistent tone. */
const STATUS_TONE: Record<string, Tone> = {
  // Bookings
  Pending: "amber",
  Confirmed: "blue",
  Completed: "emerald",
  Cancelled: "gray",
  // Payments
  Paid: "emerald",
  Unpaid: "amber",
  Refunded: "violet",
  Failed: "rose",
  // Queries
  New: "blue",
  "In Progress": "amber",
  Resolved: "emerald",
  Closed: "gray",
  // Contacts
  Unread: "rose",
  Read: "blue",
  Replied: "emerald",
  // Experiences / Categories
  active: "emerald",
  inactive: "gray",
  draft: "amber",
  // Admin users
  Active: "emerald",
  Inactive: "gray",
  // Audit log
  Success: "emerald",
};

export default function StatusBadge({ status }: { status: string }) {
  const tone = STATUS_TONE[status] ?? "gray";
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[12px] font-semibold capitalize ring-1 ring-inset ${TONE_CLASSES[tone]}`}
    >
      {status}
    </span>
  );
}
