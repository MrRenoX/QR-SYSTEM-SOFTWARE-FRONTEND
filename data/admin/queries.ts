import type { AdminQuery } from "@/types/admin/query";

export const adminQueries: AdminQuery[] = [
  { id: 1, guestName: "Vikash Pandey", roomNumber: "204", mobile: "+91 98765 43210", experience: { id: 2, title: "Ram Mandir Darshan" }, question: "Best time to visit?", status: "New", createdAt: "2026-08-11T09:14:00", updatedAt: "2026-08-11T09:14:00" },
  { id: 2, guestName: "Neha Patel", roomNumber: "118", mobile: "+91 98765 22334", experience: { id: 1, title: "Ayodhya Heritage Walk" }, question: "Is a group discount available for 6 people?", status: "In Progress", createdAt: "2026-08-10T18:40:00", updatedAt: "2026-08-10T18:40:00" },
  { id: 3, guestName: "Ankit Tiwari", roomNumber: "302", mobile: "+91 98765 44556", experience: { id: 3, title: "Saryu Aarti" }, question: "Is pickup available from the hotel?", status: "New", createdAt: "2026-08-10T16:02:00", updatedAt: "2026-08-10T16:02:00" },
  { id: 4, guestName: "Karan Singh", roomNumber: "210", mobile: "+91 98765 66778", experience: { id: 4, title: "Temple Trail" }, question: "What should I carry for the walk?", status: "Resolved", createdAt: "2026-08-09T08:15:00", updatedAt: "2026-08-09T08:15:00" },
  { id: 5, guestName: "Pooja Mishra", roomNumber: "415", mobile: "+91 98765 88990", experience: { id: 1, title: "Ayodhya Heritage Walk" }, question: "Is there a child ticket rate?", status: "New", createdAt: "2026-08-09T07:03:00", updatedAt: "2026-08-09T07:03:00" },
  { id: 6, guestName: "Rohit Desai", roomNumber: "129", mobile: "+91 98765 10293", experience: { id: 5, title: "Sarayu Sunrise Boat" }, question: "Can we reschedule to next week?", status: "Closed", createdAt: "2026-08-07T10:22:00", updatedAt: "2026-08-07T10:22:00" },
];
