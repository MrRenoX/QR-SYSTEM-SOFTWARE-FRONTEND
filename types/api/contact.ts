/** Input shape for `submitContactMessage()` — see BACKEND_GUIDE.md section 3.5 for the actual `POST /api/v1/contact` wire contract, which `services/contactService.ts` maps to/from this. */
export interface ContactRequest {
  name: string;
  /** Single combined phone-or-email field — backend resolves which by presence of "@". */
  contact: string;
  message: string;
  /** Cloudflare Turnstile token from the entry human-verification gate. */
  turnstileToken?: string;
}

export interface ContactResponse {
  success: true;
  id?: number;
}
