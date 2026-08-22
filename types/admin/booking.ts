export type BookingStatus = "Pending" | "Confirmed" | "Completed" | "Cancelled";
export type PaymentStatus = "Unpaid" | "Paid" | "Refunded" | "Failed";

export interface AdminBooking {
  id: number;
  bookingRef: string;
  experience: { id: number; title: string } | null;
  guestName: string;
  roomNumber: string;
  mobile: string;
  email: string;
  visitDate: string;
  preferredTime: string;
  adults: number;
  children: number;
  guests: number;
  amount: number | null;
  paymentStatus: PaymentStatus;
  status: BookingStatus;
  specialRequest: string;
  createdAt: string;
  updatedAt: string;
}

/** Manual/front-desk entry — posts to the same public `POST /api/v1/booking` the guest form uses (no separate admin-only create endpoint). */
export interface CreateBookingInput {
  experienceId: number;
  guestName: string;
  roomNumber?: string;
  mobile: string;
  email?: string;
  visitDate: string;
  preferredTime: string;
  adults: number;
  children?: number;
  specialRequest?: string;
}
