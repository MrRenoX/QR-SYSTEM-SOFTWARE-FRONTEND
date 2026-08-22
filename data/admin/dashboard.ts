import { Bookmark, Calendar, Clock, HelpCircle, Mail, TrendingUp } from "lucide-react";
import type { DashboardOverview } from "@/types/admin/dashboard";

export const dashboardOverview: DashboardOverview = {
  stats: [
    { id: "total-experiences", label: "Total Experiences", value: "42", icon: Bookmark, tone: "violet" },
    { id: "active-experiences", label: "Active Experiences", value: "36", icon: TrendingUp, tone: "emerald" },
    { id: "total-bookings", label: "Total Bookings", value: "128", icon: Calendar, tone: "blue" },
    { id: "pending-bookings", label: "Pending Bookings", value: "17", icon: Clock, tone: "gold" },
    { id: "new-queries", label: "New Queries", value: "7", icon: HelpCircle, tone: "amber" },
    { id: "unread-contacts", label: "Unread Contacts", value: "9", icon: Mail, tone: "rose" },
  ],
  recentBookings: [
    { id: "b1", guest: "Rahul Sharma", experience: "Ayodhya Heritage Walk", date: "11 Aug 2026", status: "Pending" },
    { id: "b2", guest: "Amit Verma", experience: "Ram Mandir Darshan", date: "11 Aug 2026", status: "Confirmed" },
    { id: "b3", guest: "Priya Singh", experience: "Saryu Aarti Experience", date: "10 Aug 2026", status: "Pending" },
    { id: "b4", guest: "Sandeep Yadav", experience: "Temple Trail", date: "10 Aug 2026", status: "Completed" },
    { id: "b5", guest: "Meena Gupta", experience: "Heritage Walk", date: "09 Aug 2026", status: "Confirmed" },
  ],
  recentQueries: [
    { id: "q1", guest: "Vikash Pandey", experience: "Ram Mandir Darshan", query: "Best time to visit?", status: "New" },
    { id: "q2", guest: "Neha Patel", experience: "Ayodhya Heritage Walk", query: "Group discount?", status: "In Progress" },
    { id: "q3", guest: "Ankit Tiwari", experience: "Saryu Aarti", query: "Pickup available?", status: "New" },
    { id: "q4", guest: "Karan Singh", experience: "Temple Trail", query: "What to carry?", status: "Resolved" },
    { id: "q5", guest: "Pooja Mishra", experience: "Heritage Walk", query: "Child ticket?", status: "New" },
  ],
  recentContacts: [
    { id: "c1", name: "Ravi Kumar", subject: "General Inquiry", date: "11 Aug 2026", status: "Unread" },
    { id: "c2", name: "Sunita Verma", subject: "Partnership", date: "10 Aug 2026", status: "Read" },
    { id: "c3", name: "Deepak Jain", subject: "Other Question", date: "09 Aug 2026", status: "Unread" },
    { id: "c4", name: "Kavita Singh", subject: "Feedback", date: "09 Aug 2026", status: "Read" },
    { id: "c5", name: "Mohit Agarwal", subject: "Group Booking", date: "08 Aug 2026", status: "Replied" },
  ],
  alerts: [
    { id: "alert-0", message: "1 booking(s) pending confirmation" },
    { id: "alert-1", message: "7 new queries awaiting response" },
  ],
};
