import type { LucideIcon } from "lucide-react";
import type { BookingStatus } from "./booking";
import type { QueryStatus } from "./query";
import type { ContactStatus } from "./contact";

export type StatTone = "violet" | "emerald" | "blue" | "amber" | "rose" | "gold";

export interface DashboardStat {
  id: string;
  label: string;
  value: string;
  trend?: string;
  icon: LucideIcon;
  tone: StatTone;
}

export interface RecentBookingRow {
  id: string;
  guest: string;
  experience: string;
  date: string;
  status: BookingStatus;
}

export interface RecentQueryRow {
  id: string;
  guest: string;
  experience: string;
  query: string;
  status: QueryStatus;
}

export interface RecentContactRow {
  id: string;
  name: string;
  subject: string;
  date: string;
  status: ContactStatus;
}

export interface DashboardAlert {
  id: string;
  message: string;
}

export interface DashboardOverview {
  stats: DashboardStat[];
  recentBookings: RecentBookingRow[];
  recentQueries: RecentQueryRow[];
  recentContacts: RecentContactRow[];
  alerts: DashboardAlert[];
}
