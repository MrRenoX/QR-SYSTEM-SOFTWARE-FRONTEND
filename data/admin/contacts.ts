import type { AdminContact } from "@/types/admin/contact";

export const adminContacts: AdminContact[] = [
  { id: 1, name: "Ravi Kumar", email: "ravi.kumar@example.com", mobile: "+91 98765 11111", subject: "General Inquiry", message: "Hi, I wanted to know if you offer custom multi-day itineraries for a family of five visiting next month.", status: "Unread", createdAt: "2026-08-11T00:00:00", updatedAt: "2026-08-11T00:00:00" },
  { id: 2, name: "Sunita Verma", email: "sunita.verma@example.com", mobile: "+91 98765 22222", subject: "Partnership", message: "We run a boutique travel agency and would like to discuss a referral partnership with Guide Guru Global.", status: "Read", createdAt: "2026-08-10T00:00:00", updatedAt: "2026-08-10T00:00:00" },
  { id: 3, name: "Deepak Jain", email: "deepak.jain@example.com", mobile: "+91 98765 33333", subject: "Other Question", message: "Do your guides speak Gujarati? We'd prefer a guide fluent in Gujarati for our elderly parents.", status: "Unread", createdAt: "2026-08-09T00:00:00", updatedAt: "2026-08-09T00:00:00" },
  { id: 4, name: "Kavita Singh", email: "kavita.singh@example.com", mobile: "+91 98765 44444", subject: "Feedback", message: "Just wanted to say the Ram Lala Darshan experience last week was wonderful — our guide was excellent.", status: "Read", createdAt: "2026-08-09T00:00:00", updatedAt: "2026-08-09T00:00:00" },
  { id: 5, name: "Mohit Agarwal", email: "mohit.agarwal@example.com", mobile: "+91 98765 55555", subject: "Group Booking", message: "Looking to book for a corporate group of 25 people in September. Can someone call me to discuss?", status: "Replied", createdAt: "2026-08-08T00:00:00", updatedAt: "2026-08-08T00:00:00" },
];
