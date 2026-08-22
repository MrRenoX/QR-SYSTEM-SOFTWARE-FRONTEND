import { apiClient, isApiConfigured } from "./apiClient";
import type { ApiResult } from "@/types/api/common";
import type { QueryRequest, QueryResponse } from "@/types/api/query";

/** Wire shape for `POST /api/v1/query` — see BACKEND_GUIDE.md section 3.3. */
interface QueryApiEnvelope {
  success: boolean;
  message: string;
  data: { id: number };
}

/** See contactService.ts for the mock/live switch-over pattern. */
export async function submitQuery(
  payload: QueryRequest,
): Promise<ApiResult<QueryResponse>> {
  if (!isApiConfigured()) {
    return { ok: true, data: { success: true } };
  }

  const result = await apiClient.post<QueryApiEnvelope>("/api/v1/query", {
    name: payload.name,
    room_number: payload.roomNumber,
    mobile: payload.mobile,
    question: payload.question,
    experience_id: payload.experienceId,
    turnstile_token: payload.turnstileToken,
  });
  if (!result.ok) return result;
  return { ok: true, data: { success: true, id: result.data?.data?.id } };
}
