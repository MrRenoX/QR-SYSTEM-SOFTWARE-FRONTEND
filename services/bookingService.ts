import { apiClient, isApiConfigured } from "./apiClient";
import type { ApiResult } from "@/types/api/common";
import type { BookingOrder, BookingRequest, ConfirmedBooking } from "@/types/api/booking";

interface CreateBookingEnvelope {
  success: boolean;
  message: string;
  data: {
    booking_id: number;
    booking_ref: string;
    razorpay_order_id: string;
    razorpay_key_id: string;
    amount: number;
    currency: string;
  } | null;
}

interface VerifyPaymentEnvelope {
  success: boolean;
  message: string;
  data: {
    id: number;
    booking_ref: string;
    experience: { id: number; title: string };
    guest_name: string;
    room_number: string;
    mobile: string;
    email: string;
    visit_date: string;
    preferred_time: string;
    adults: number;
    children: number;
    guests: number;
    amount: number;
    payment_status: string;
    razorpay_payment_id: string;
    payment_method?: string;
    status: string;
    special_request?: string;
  } | null;
}

/**
 * Step 1 of 2 — creates the booking (Pending/Unpaid) and a Razorpay order to
 * pay it against. Nothing is confirmed yet; the guest still has to complete
 * checkout and have the payment verified (see verifyBookingPayment).
 *
 * There is deliberately no mock/demo fallback here like the other
 * services.*Service.ts modules have: without a real backend there is no
 * real Razorpay order to open checkout against, so a fake "success" would
 * only mislead the UI about a payment that never happened.
 */
export async function createBooking(
  payload: BookingRequest,
): Promise<ApiResult<BookingOrder>> {
  if (!isApiConfigured()) {
    return {
      ok: false,
      status: 0,
      error: "not_configured",
      message: "Booking isn't connected to a live backend in this environment yet.",
    };
  }

  const result = await apiClient.post<CreateBookingEnvelope>("/api/v1/booking", {
    experience_id: payload.experienceId,
    guest_name: payload.guestName,
    room_number: payload.roomNumber,
    mobile: payload.whatsapp,
    email: payload.email,
    visit_date: payload.date,
    preferred_time: payload.preferredTime,
    adults: payload.adults,
    children: payload.children,
    pricing_option_key: payload.pricingOptionKey,
    special_request: payload.specialRequest,
    turnstile_token: payload.turnstileToken,
  });
  if (!result.ok) return result;

  const data = result.data?.data;
  if (!data) {
    return {
      ok: false,
      status: 0,
      error: "invalid_response",
      message: "Something went wrong starting your booking. Please try again.",
    };
  }

  return {
    ok: true,
    data: {
      bookingId: data.booking_id,
      bookingRef: data.booking_ref,
      razorpayOrderId: data.razorpay_order_id,
      razorpayKeyId: data.razorpay_key_id,
      amount: data.amount,
      currency: data.currency,
    },
  };
}

/**
 * Step 2 of 2 — hands the Razorpay checkout `handler` response to the
 * backend exactly as received. The backend verifies its signature against
 * RAZORPAY_KEY_SECRET (which never reaches this frontend) before marking
 * the booking Confirmed/Paid — nothing client-side can fake or skip that.
 * Safe to call more than once for the same payment (e.g. a retry after a
 * network hiccup) — the backend treats an already-verified payment as a
 * success, not an error.
 */
export async function verifyBookingPayment(
  payment: RazorpayHandlerResponse,
): Promise<ApiResult<ConfirmedBooking>> {
  const result = await apiClient.post<VerifyPaymentEnvelope>(
    "/api/v1/booking/verify-payment",
    payment,
  );
  if (!result.ok) return result;

  const data = result.data?.data;
  if (!data) {
    return {
      ok: false,
      status: 0,
      error: "invalid_response",
      message: "We couldn't confirm your payment. Please contact us with your booking reference.",
    };
  }

  return {
    ok: true,
    data: {
      id: data.id,
      bookingRef: data.booking_ref,
      experienceTitle: data.experience?.title ?? "",
      guestName: data.guest_name,
      roomNumber: data.room_number,
      mobile: data.mobile,
      email: data.email,
      visitDate: data.visit_date,
      preferredTime: data.preferred_time,
      adults: data.adults,
      children: data.children,
      guests: data.guests,
      amount: data.amount,
      paymentStatus: data.payment_status,
      status: data.status,
      razorpayPaymentId: data.razorpay_payment_id,
      paymentMethod: data.payment_method,
      specialRequest: data.special_request,
    },
  };
}
