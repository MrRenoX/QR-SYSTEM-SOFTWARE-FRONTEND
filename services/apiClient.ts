import type { ApiResult } from "@/types/api/common";

const DEFAULT_TIMEOUT_MS = 10_000;

/**
 * Base URL for the future Flask API. Empty until NEXT_PUBLIC_API_URL is set —
 * every request short-circuits to a clean "not configured" result rather
 * than trying (and failing) to reach `/api/...` on this frontend origin.
 */
export function resolveBaseUrl(): string {
  return (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/+$/, "");
}

export function isApiConfigured(): boolean {
  return resolveBaseUrl().length > 0;
}

function friendlyMessageFor(status: number): string {
  switch (status) {
    case 400:
    case 422:
      return "Some details need a second look. Please review the form and try again.";
    case 401:
      return "Your session has expired. Please refresh and try again.";
    case 403:
      return "You don't have permission to do that.";
    case 404:
      return "We couldn't find what you were looking for.";
    case 409:
      return "That conflicts with an existing entry. Please try again.";
    case 429:
      return "Too many attempts — please wait a moment and try again.";
    case 500:
    case 502:
    case 503:
      return "Something went wrong on our end. Please try again shortly.";
    default:
      return "Something went wrong. Please try again.";
  }
}

interface RequestOptions {
  timeoutMs?: number;
  signal?: AbortSignal;
  /** Extra headers, e.g. an admin session's `Authorization: Bearer <token>`. */
  headers?: Record<string, string>;
}

/**
 * Must match TOKEN_KEY/USER_KEY in services/admin/authService.ts — duplicated
 * here (rather than imported) to avoid a circular import, since authService
 * already imports apiClient.
 */
const ADMIN_TOKEN_KEY = "anubhav_admin_token";
const ADMIN_USER_KEY = "anubhav_admin_user";

/**
 * The dashboard's "am I logged in" check only ever looks at the locally
 * stored token/user (see authService.readSession/isAuthenticated) — it never
 * asks the server. That local copy and the real httpOnly session cookie can
 * drift apart (e.g. the backend restarts with a rotated JWT secret, or the
 * cookie simply expires) without the local copy noticing, since it only
 * checks its own embedded `exp` claim, not the signature. The dashboard then
 * renders as if logged in and every request 401s. When that happens, clear
 * the stale local copy and send the admin back to log in properly instead of
 * leaving a broken-looking dashboard on screen.
 */
function handleAdminUnauthorized(path: string) {
  if (typeof window === "undefined") return;
  if (!path.startsWith("/api/v1/admin/")) return;
  if (path === "/api/v1/admin/auth/login") return; // a 401 here just means wrong credentials
  if (window.location.pathname.startsWith("/dashboard/super-admin/login")) return;

  window.localStorage.removeItem(ADMIN_TOKEN_KEY);
  window.localStorage.removeItem(ADMIN_USER_KEY);
  window.sessionStorage.removeItem(ADMIN_TOKEN_KEY);
  window.sessionStorage.removeItem(ADMIN_USER_KEY);
  window.location.href = "/dashboard/super-admin/login";
}

/** FormData bodies (file uploads) must skip JSON.stringify and the JSON Content-Type — the browser sets its own multipart boundary. */
function isFormData(body: unknown): body is FormData {
  return typeof FormData !== "undefined" && body instanceof FormData;
}

async function request<T>(
  path: string,
  init: RequestInit,
  options: RequestOptions = {},
): Promise<ApiResult<T>> {
  const baseUrl = resolveBaseUrl();
  if (!baseUrl) {
    return {
      ok: false,
      status: 0,
      error: "not_configured",
      message: "This feature isn't connected yet. Please try again later.",
    };
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(
    () => controller.abort(),
    options.timeoutMs ?? DEFAULT_TIMEOUT_MS,
  );
  options.signal?.addEventListener("abort", () => controller.abort(), {
    once: true,
  });

  try {
    const res = await fetch(`${baseUrl}${path}`, {
      cache: "no-store",
      // The admin API authenticates via an httpOnly `access_token` cookie
      // (see BACKEND_ISSUE_ADMIN_AUTH_COOKIE.md), set on
      // /admin/auth/login and required on every other /admin/* route.
      // Without "include", the browser neither stores that Set-Cookie
      // (cross-origin: app on ayodhyaanubhav..., API on api.ayodhyaanubhav...)
      // nor sends it back on later requests.
      credentials: "include",
      ...init,
      signal: controller.signal,
      headers: {
        ...(isFormData(init.body) ? {} : { "Content-Type": "application/json" }),
        Accept: "application/json",
        ...options.headers,
        ...init.headers,
      },
    });

    const text = await res.text();
    let body: unknown = null;
    if (text) {
      try {
        body = JSON.parse(text);
      } catch {
        body = null;
      }
    }

    if (!res.ok) {
      if (res.status === 401) handleAdminUnauthorized(path);

      const parsed = (body ?? {}) as {
        message?: string;
        error?: string;
        fields?: Record<string, string>;
      };
      return {
        ok: false,
        status: res.status,
        error: parsed.error ?? "request_failed",
        message: parsed.message ?? friendlyMessageFor(res.status),
        fields: parsed.fields,
      };
    }

    return { ok: true, data: body as T };
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") {
      return {
        ok: false,
        status: 0,
        error: "timeout",
        message: "That took too long. Please check your connection and try again.",
      };
    }
    return {
      ok: false,
      status: 0,
      error: "network_error",
      message: "We couldn't reach the server. Please check your connection and try again.",
    };
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Thin, typed fetch wrapper for the future Flask API. Components never call
 * fetch() directly — they go through a service (services/*Service.ts), which
 * goes through this client. POST/PUT/PATCH/DELETE are never auto-retried.
 */
function serialize(body: unknown): BodyInit | undefined {
  if (body === undefined) return undefined;
  return isFormData(body) ? body : JSON.stringify(body);
}

export const apiClient = {
  get: <T>(path: string, options?: RequestOptions) =>
    request<T>(path, { method: "GET" }, options),
  post: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    request<T>(path, { method: "POST", body: serialize(body) }, options),
  put: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    request<T>(path, { method: "PUT", body: serialize(body) }, options),
  patch: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    request<T>(path, { method: "PATCH", body: serialize(body) }, options),
  delete: <T>(path: string, options?: RequestOptions) =>
    request<T>(path, { method: "DELETE" }, options),
};
