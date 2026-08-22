/**
 * Shared shape every service method resolves to. Callers branch on `ok`
 * instead of catching exceptions — network/timeout/HTTP failures all land
 * here with a safe, user-facing `message` (never a raw stack trace).
 */
export type ApiResult<T> =
  | { ok: true; data: T }
  | {
      ok: false;
      /** 0 for network/timeout failures that never reached the server. */
      status: number;
      error: string;
      message: string;
      /** Field-level messages, when the API returns validation feedback. */
      fields?: Record<string, string>;
    };

export interface ApiErrorBody {
  error: string;
  message: string;
  fields?: Record<string, string>;
}
