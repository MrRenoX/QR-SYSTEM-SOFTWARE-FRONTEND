/** Input shape for `submitBooking()` — see BACKEND_GUIDE.md section 3.4 for the actual `POST /api/v1/booking` wire contract (snake_case, `{success,message,data}` envelope), which `services/bookingService.ts` maps to/from this. */
export interface BookingRequest {
  experienceId: number;
  guestName: string;
  roomNumber: string;
  whatsapp: string;
  email: string;
  date: string;
  /** The chosen slot's label (key) — dynamic per experience, see Experience.slots. */
  preferredTime: string;
  adults: number;
  children: number;
  specialRequest?: string;
  turnstileToken?: string;
}

export interface BookingResponse {
  success: true;
  bookingRef?: string;
  /** `"pending_confirmation"` in mock mode; the backend's `bookings.status` value (e.g. `"Pending"`) once live. */
  status: string;
}
