import { apiClient, isApiConfigured } from "./apiClient";
import type { ApiResult } from "@/types/api/common";
import type { ContactRequest, ContactResponse } from "@/types/api/contact";

/** Wire shape for `POST /api/v1/contact` — see BACKEND_GUIDE.md section 3.5. */
interface ContactApiEnvelope {
  success: boolean;
  message: string;
  data: { id: number };
}

/**
 * Until NEXT_PUBLIC_API_URL is set, there is no Flask endpoint to call —
 * resolve as if the message was sent so the UI flow can be demoed end to
 * end. Once the env var is set this branch stops being hit and every
 * submission goes to the real API; ContactForm does not change.
 */
export async function submitContactMessage(
  payload: ContactRequest,
): Promise<ApiResult<ContactResponse>> {
  if (!isApiConfigured()) {
    return { ok: true, data: { success: true } };
  }

  const result = await apiClient.post<ContactApiEnvelope>("/api/v1/contact", {
    name: payload.name,
    contact: payload.contact,
    message: payload.message,
    turnstile_token: payload.turnstileToken,
  });
  if (!result.ok) return result;
  return { ok: true, data: { success: true, id: result.data?.data?.id } };
}
