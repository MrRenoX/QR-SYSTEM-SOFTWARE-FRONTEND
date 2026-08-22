export type AdminRole =
  | "super_admin"
  | "content_manager"
  | "booking_manager"
  | "support";

export interface AdminSessionUser {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  avatarUrl?: string;
}

/** Wire shape for `POST /api/v1/admin/auth/login` — see BACKEND_GUIDE.md. */
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  user: AdminSessionUser;
}
