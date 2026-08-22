/** Input shape for `submitQuery()` ("raise a query" on an experience) — see BACKEND_GUIDE.md section 3.3 for the actual `POST /api/v1/query` wire contract, which `services/queryService.ts` maps to/from this. */
export interface QueryRequest {
  name: string;
  roomNumber: string;
  mobile: string;
  question: string;
  experienceId?: number;
  turnstileToken?: string;
}

export interface QueryResponse {
  success: true;
  id?: number;
}
