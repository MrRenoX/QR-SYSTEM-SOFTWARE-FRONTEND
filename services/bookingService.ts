import { apiClient, isApiConfigured } from "./apiClient";
import type { ApiResult } from "@/types/api/common";
import type { BookingRequest, BookingResponse } from "@/types/api/booking";

/** Wire shape for `POST /api/v1/booking` — see BACKEND_GUIDE.md section 3.4. */
interface BookingApiEnvelope {
  success: boolean;
  message: string;
  data: { id: number; booking_ref: string; status: string };
}

/** See contactService.ts for the mock/live switch-over pattern. */
export async function submitBooking(
  payload: BookingRequest,
): Promise<ApiResult<BookingResponse>> {
  if (!isApiConfigured()) {
    return {
      ok: true,
      data: { success: true, status: "pending_confirmation" },
    };
  }

  const result = await apiClient.post<BookingApiEnvelope>("/api/v1/booking", {
    experience_id: payload.experienceId,
    guest_name: payload.guestName,
    room_number: payload.roomNumber,
    mobile: payload.whatsapp,
    email: payload.email,
    visit_date: payload.date,
    preferred_time: payload.preferredTime,
    adults: payload.adults,
    children: payload.children,
    special_request: payload.specialRequest,
    turnstile_token: payload.turnstileToken,
  });
  if (!result.ok) return result;
  return {
    ok: true,
    data: {
      success: true,
      bookingRef: result.data?.data?.booking_ref,
      status: result.data?.data?.status ?? "pending_confirmation",
    },
  };
}
