export type FAQStatus = "active" | "inactive";

export interface AdminFAQ {
  id: number;
  category: string;
  question: string;
  answer: string;
  displayOrder: number;
  status: FAQStatus;
  createdAt: string;
  updatedAt: string;
}

export interface FAQFormValues {
  category: string;
  question: string;
  answer: string;
  displayOrder: number;
  status: FAQStatus;
}
