export type QueryStatus = "New" | "In Progress" | "Resolved" | "Closed";

export interface AdminQuery {
  id: number;
  guestName: string;
  roomNumber: string;
  mobile: string;
  experience: { id: number; title: string } | null;
  question: string;
  status: QueryStatus;
  createdAt: string;
  updatedAt: string;
}
