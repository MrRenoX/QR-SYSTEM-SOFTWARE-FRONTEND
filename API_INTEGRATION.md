# API Integration Contract

This documents what the frontend **expects** from the future Flask API. Nothing here is implemented server-side — this is the contract for whoever builds the Flask app, so the two sides can be developed independently and connected without either one changing shape.

## How the frontend is wired for this today

```
Component  →  Service (services/*.ts)  →  apiClient (services/apiClient.ts)  →  Flask API
```

Components never call `fetch()` directly. Every backend-dependent feature goes through a service method that returns a typed `ApiResult<T>` (`types/api/common.ts`):

```ts
type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; status: number; error: string; message: string; fields?: Record<string, string> }
```

`apiClient` (`services/apiClient.ts`) is the single place that calls `fetch`. It handles timeouts (`AbortController`, 10s default), network failures, JSON parsing, and maps HTTP status codes to safe, user-facing messages — it never surfaces a raw stack trace or backend exception to the UI.

## Going live: the only steps required

1. Set `NEXT_PUBLIC_API_URL` (e.g. in `.env.local` or your hosting provider's env config) to the Flask API's base URL.
2. Confirm each endpoint below matches what Flask actually returns. If field names differ, adjust the `types/api/*.ts` interfaces and the one `.data.xxx` access point in the relevant service — **not** the components.
3. If Turnstile is in use, make sure Flask verifies the `turnstileToken` field server-side against Cloudflare's `siteverify` endpoint using `TURNSTILE_SECRET_KEY` (backend-only secret, never in this repo).

Until step 1 is done, every service method below resolves as if the request succeeded, using local mock behavior — this is intentional (see `services/*.ts` — `isApiConfigured()` gates it) so the full guest flow can be demoed and QA'd without a backend.

---

## Endpoints expected

### `GET /api/experiences`
Used by `services/experienceService.ts` → `getExperiences()`. Currently returns `data/experiences.ts` directly.

**Expected response:**
```json
{ "experiences": [ /* ExperienceListItem[], see types/api/experience.ts */ ] }
```

### `GET /api/experiences/:slug`
Used by `getExperienceBySlug(slug)`.

**Expected response:** `{ "experience": ExperienceDetail }` — 404 with a normal error body if the slug doesn't exist (the frontend already calls Next's `notFound()` for this case).

### `GET /api/categories`
Used by `getCategories()`. Returns the list of category names (`"All"` plus each `CategoryName`).

### `GET /api/experiences/:slug/journey`
Used by `getJourney(slug)` → the animated route map on the experience detail page. Returns `JourneyStop[]` (`order`, `name`, `duration`, `image`).

### `GET /api/experiences/:slug/touchpoints`
Used by `getExperienceTouchpoints(slug)` → the "Along the way" section. Returns `Touchpoint[]`.

### `POST /api/contact`
Used by `services/contactService.ts` → `submitContactMessage()`, called from `components/ContactForm.tsx`.

**Request body** (`types/api/contact.ts` — `ContactRequest`):
```json
{ "name": "string (2-100 chars)", "contact": "phone or email", "message": "string (10-2000 chars)", "turnstileToken": "string, optional" }
```
**Success response:** `{ "success": true, "referenceId": "optional string" }`
**Validation is already enforced client-side** (`lib/validation/contact.ts`) — Flask should still re-validate; never trust the frontend as the only gate.

### `POST /api/query`
Used by `services/queryService.ts` → `submitQuery()`, called from `components/QueryForm.tsx` (the "Raise a query" form on each experience page).

**Request body** (`types/api/query.ts` — `QueryRequest`):
```json
{
  "name": "string (2-100 chars)",
  "roomNumber": "string (1-20 chars)",
  "mobile": "string, 7-15 digits",
  "question": "string (10-2000 chars)",
  "experienceSlug": "string, optional — which experience the query is about",
  "turnstileToken": "string, optional"
}
```
**Success response:** `{ "success": true, "referenceId": "optional string" }`

### `POST /api/bookings`
Used by `services/bookingService.ts` → `submitBooking()`, called from `components/BookingForm.tsx`.

**Request body** (`types/api/booking.ts` — `BookingRequest`):
```json
{
  "experienceSlug": "string",
  "guestName": "string (2-100 chars)",
  "roomNumber": "string (1-20 chars)",
  "whatsapp": "string, 7-15 digits",
  "email": "valid email, max 254 chars",
  "date": "YYYY-MM-DD, today or later",
  "preferredTime": "Morning | Afternoon | Evening",
  "adults": "integer, 1-20",
  "children": "integer, 0-20",
  "specialRequest": "string, max 1000 chars, optional",
  "turnstileToken": "string, optional"
}
```
**Success response:** `{ "success": true, "bookingId": "optional string", "status": "pending_confirmation" }`

**Note:** this frontend does **not** implement payment. The booking form is explicit with guests that reception confirms and sends a payment link separately (see the "Payment is not connected yet" notice in `BookingForm.tsx`). Do not build payment collection into this endpoint's request shape without also updating that UI copy.

---

## Error response shape (all endpoints)

The `apiClient` expects failed requests to return a JSON body shaped like:
```json
{ "error": "short_machine_code", "message": "human-readable, safe to show the guest", "fields": { "email": "Enter a valid email address." } }
```
`fields` is optional and only used if you want to surface server-side field validation errors in addition to the client-side checks that already run. If the body doesn't match this shape (or isn't JSON), `apiClient` falls back to a generic message per HTTP status code — it never shows the guest a raw error body.

## Status codes handled

`apiClient` has specific user-facing copy for `400/401/403/404/409/422/429/500/502/503`, plus network failure and timeout (client-side, status `0`). No other frontend changes are needed to support these — just return the right status code.

## What the frontend explicitly does NOT do (by design, this task's scope)

- No server-side Turnstile `siteverify` — the frontend only obtains the token and would pass it along in `turnstileToken`. Verifying it against Cloudflare is Flask's job.
- No authentication/authorization, JWT, sessions, or RBAC.
- No payment processing or webhook handling.
- No rate limiting (that belongs on the Flask side / a reverse proxy).
- No CORS configuration (also a Flask-side concern — this frontend just calls `NEXT_PUBLIC_API_URL`).
