/**
 * Input shape for `createBooking()` — maps to the actual
 * `POST /api/v1/booking` wire contract (snake_case, `{success, message,
 * data}` envelope) in `services/bookingService.ts`.
 *
 * Booking is a two-step flow: this only creates a Pending/Unpaid booking and
 * a Razorpay order to pay against — see BookingOrder and
 * `verifyBookingPayment()` for how it actually gets confirmed. Note there is
 * no `amount`/`price` field here on purpose: the backend always computes the
 * charge itself from the experience's own pricing, and ignores anything a
 * client sends for it.
 */
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
  /** Required when the experience has pricingOptions (multiple tiers) — the chosen tier's key. Omit entirely otherwise. */
  pricingOptionKey?: string;
  turnstileToken?: string;
}

/**
 * Step 1 response: the booking now exists (Pending/Unpaid) and a Razorpay
 * order is ready to pay against — nothing is confirmed yet.
 */
export interface BookingOrder {
  bookingId: number;
  bookingRef: string;
  razorpayOrderId: string;
  /** Public key — safe to use client-side to open checkout. */
  razorpayKeyId: string;
  /** Smallest currency unit (paise), matching Razorpay's own convention. Divide by 100 to display rupees. */
  amount: number;
  currency: string;
}

/**
 * Step 2 response: the confirmed, paid booking, returned only once the
 * backend has verified the Razorpay payment signature server-side.
 */
export interface ConfirmedBooking {
  id: number;
  bookingRef: string;
  experienceTitle: string;
  guestName: string;
  roomNumber: string;
  mobile: string;
  email: string;
  visitDate: string;
  preferredTime: string;
  adults: number;
  children: number;
  guests: number;
  /** Rupees (not paise) — the backend's Numeric amount field. */
  amount: number;
  paymentStatus: string;
  status: string;
  razorpayPaymentId: string;
  paymentMethod?: string;
  specialRequest?: string;
}
