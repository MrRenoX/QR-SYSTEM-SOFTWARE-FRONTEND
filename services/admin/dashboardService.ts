import { Bookmark, Calendar, Clock, HelpCircle, Mail, TrendingUp } from "lucide-react";
import { apiClient, isApiConfigured } from "../apiClient";
import { getCurrentSession } from "./authService";
import { dashboardOverview } from "@/data/admin/dashboard";
import type { DashboardOverview } from "@/types/admin/dashboard";
import type { BookingStatus } from "@/types/admin/booking";
import type { QueryStatus } from "@/types/admin/query";
import type { ContactStatus } from "@/types/admin/contact";

/**
 * Single seam between the admin UI and its data source — swapping mock data
 * for `GET /api/v1/admin/dashboard` is a one-file change, same pattern as
 * the public site's services/experienceService.ts.
 */

/** The Flask API wraps every response in this envelope — see BACKEND_GUIDE.md. */
interface ApiEnvelope<T> {
  success: boolean;
  message: string;
  data: T;
}

interface DashboardApiResponse {
  stats: {
    active_experiences: number;
    confirmed_bookings: number;
    new_queries: number;
    pending_bookings: number;
    total_bookings: number;
    total_contacts: number;
    total_experiences: number;
    total_queries: number;
    unread_contacts: number;
  };
  alerts: string[];
  recent_bookings: Array<{
    id: number;
    guest_name: string;
    experience: { id: number; title: string } | null;
    visit_date: string;
    status: BookingStatus;
  }>;
  recent_queries: Array<{
    id: number;
    guest_name: string;
    experience: { id: number; title: string } | null;
    question: string;
    status: QueryStatus;
  }>;
  recent_contacts: Array<{
    id: number;
    name: string;
    subject: string;
    created_at: string;
    status: ContactStatus;
  }>;
}

function mapDashboard(raw: DashboardApiResponse): DashboardOverview {
  return {
    stats: [
      { id: "total-experiences", label: "Total Experiences", value: String(raw.stats.total_experiences), icon: Bookmark, tone: "violet" },
      { id: "active-experiences", label: "Active Experiences", value: String(raw.stats.active_experiences), icon: TrendingUp, tone: "emerald" },
      { id: "total-bookings", label: "Total Bookings", value: String(raw.stats.total_bookings), icon: Calendar, tone: "blue" },
      { id: "pending-bookings", label: "Pending Bookings", value: String(raw.stats.pending_bookings), icon: Clock, tone: "gold" },
      { id: "new-queries", label: "New Queries", value: String(raw.stats.new_queries), icon: HelpCircle, tone: "amber" },
      { id: "unread-contacts", label: "Unread Contacts", value: String(raw.stats.unread_contacts), icon: Mail, tone: "rose" },
    ],
    recentBookings: raw.recent_bookings.map((b) => ({
      id: String(b.id),
      guest: b.guest_name,
      experience: b.experience?.title ?? "—",
      date: b.visit_date,
      status: b.status,
    })),
    recentQueries: raw.recent_queries.map((q) => ({
      id: String(q.id),
      guest: q.guest_name,
      experience: q.experience?.title ?? "—",
      query: q.question,
      status: q.status,
    })),
    recentContacts: raw.recent_contacts.map((c) => ({
      id: String(c.id),
      name: c.name,
      subject: c.subject,
      date: c.created_at,
      status: c.status,
    })),
    alerts: raw.alerts.map((message, index) => ({ id: `alert-${index}`, message })),
  };
}

function authHeaders(): Record<string, string> {
  const session = getCurrentSession();
  return session ? { Authorization: `Bearer ${session.token}` } : {};
}

const EMPTY_OVERVIEW: DashboardOverview = {
  stats: [],
  recentBookings: [],
  recentQueries: [],
  recentContacts: [],
  alerts: [],
};

export async function getDashboardOverview(): Promise<DashboardOverview> {
  if (!isApiConfigured()) return dashboardOverview;

  const result = await apiClient.get<ApiEnvelope<DashboardApiResponse>>("/api/v1/admin/dashboard", {
    headers: authHeaders(),
  });
  if (!result.ok) return EMPTY_OVERVIEW;
  return mapDashboard(result.data.data);
}
