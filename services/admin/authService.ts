import { apiClient, isApiConfigured } from "../apiClient";
import type { ApiResult } from "@/types/api/common";
import type { AdminSessionUser, LoginRequest, LoginResponse } from "@/types/admin/auth";

const TOKEN_KEY = "anubhav_admin_token";
const USER_KEY = "anubhav_admin_user";

/**
 * Frontend-only session storage. Once Flask is live, `login()` below calls
 * the real endpoint and the token it returns is what actually matters;
 * everything server-side (route authorization, token expiry, RBAC) is
 * enforced by Flask, not this storage layer.
 */
function getStorage(remember: boolean): Storage {
  return remember ? window.localStorage : window.sessionStorage;
}

function base64UrlDecode(input: string): string {
  const base64 = input.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=");
  return atob(padded);
}

/**
 * Best-effort JWT expiry check — decodes the payload without verifying the
 * signature (Flask does the real verification server-side on every
 * request; this is only to stop the UI from showing a stale dashboard for
 * a token that's already expired). Non-JWT-shaped tokens (e.g. the mock
 * `demo.<timestamp>` token used when no backend is configured) are always
 * treated as valid — there's nothing to check.
 */
function isTokenExpired(token: string): boolean {
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  try {
    const payload = JSON.parse(base64UrlDecode(parts[1])) as { exp?: number };
    if (typeof payload.exp !== "number") return true;
    return Date.now() >= payload.exp * 1000;
  } catch {
    return true;
  }
}

function readSession(): { token: string; user: AdminSessionUser } | null {
  if (typeof window === "undefined") return null;
  const store = window.localStorage.getItem(TOKEN_KEY) ? window.localStorage : window.sessionStorage;
  const token = store.getItem(TOKEN_KEY);
  const rawUser = store.getItem(USER_KEY);
  if (!token || !rawUser) return null;
  if (isTokenExpired(token)) {
    clearSession();
    return null;
  }
  try {
    return { token, user: JSON.parse(rawUser) as AdminSessionUser };
  } catch {
    return null;
  }
}

function writeSession(token: string, user: AdminSessionUser, remember: boolean) {
  const store = getStorage(remember);
  store.setItem(TOKEN_KEY, token);
  store.setItem(USER_KEY, JSON.stringify(user));
}

function clearSession() {
  window.localStorage.removeItem(TOKEN_KEY);
  window.localStorage.removeItem(USER_KEY);
  window.sessionStorage.removeItem(TOKEN_KEY);
  window.sessionStorage.removeItem(USER_KEY);
}

export function getCurrentSession() {
  return readSession();
}

export function isAuthenticated(): boolean {
  return readSession() !== null;
}

/** The Flask API wraps every response in this envelope — see BACKEND_GUIDE.md. */
interface ApiEnvelope<T> {
  success: boolean;
  message: string;
  data: T;
}

interface LoginApiResponse {
  access_token: string;
  user: {
    id: number;
    name: string;
    email: string;
    role: AdminSessionUser["role"];
    status: "Active" | "Inactive";
    last_login: string | null;
    created_at: string;
    updated_at: string;
  };
}

/**
 * Demo credentials while there is no `NEXT_PUBLIC_API_URL` configured: any
 * syntactically valid email with a password of 6+ characters signs in as
 * the Super Admin shown in the reference dashboard.
 */
async function mockLogin(payload: LoginRequest): Promise<ApiResult<LoginResponse>> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  if (payload.password.length < 6) {
    return {
      ok: false,
      status: 401,
      error: "invalid_credentials",
      message: "Incorrect email or password.",
    };
  }

  const user: AdminSessionUser = {
    id: "super-admin-1",
    name: "Super Admin",
    email: payload.email,
    role: "super_admin",
  };
  return { ok: true, data: { access_token: `demo.${Date.now()}`, user } };
}

export async function login(
  payload: LoginRequest,
  remember: boolean,
): Promise<ApiResult<LoginResponse>> {
  if (!isApiConfigured()) {
    const result = await mockLogin(payload);
    if (result.ok) writeSession(result.data.access_token, result.data.user, remember);
    return result;
  }

  const result = await apiClient.post<ApiEnvelope<LoginApiResponse>>(
    "/api/v1/admin/auth/login",
    payload,
  );
  if (!result.ok) return result;

  const { access_token, user: rawUser } = result.data.data;
  const user: AdminSessionUser = {
    id: String(rawUser.id),
    name: rawUser.name,
    email: rawUser.email,
    role: rawUser.role,
  };
  writeSession(access_token, user, remember);
  return { ok: true, data: { access_token, user } };
}

export async function logout(): Promise<void> {
  const session = readSession();
  clearSession();
  if (isApiConfigured() && session) {
    // Best-effort — the admin is logged out client-side regardless of outcome.
    // Stateless JWT: there's no server-side blocklist, this call is only an audit-trail record.
    await apiClient.post("/api/v1/admin/auth/logout", undefined, {
      headers: { Authorization: `Bearer ${session.token}` },
    });
  }
}
