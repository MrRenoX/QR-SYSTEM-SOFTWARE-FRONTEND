export type ContactStatus = "Unread" | "Read" | "Replied" | "Closed";

export interface AdminContact {
  id: number;
  name: string;
  email: string;
  mobile: string;
  subject: string;
  message: string;
  status: ContactStatus;
  createdAt: string;
  updatedAt: string;
}
