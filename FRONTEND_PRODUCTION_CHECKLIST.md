# Frontend Production Readiness Checklist

Status as of the 2026-08-22 hosting-readiness pass. See `SECURITY_AUDIT.md` for finding-level detail and `API_INTEGRATION.md` for the backend contract.

## ⚠️ Known blocker — not fixable from this repo

**The admin panel will not work once deployed until the backend is fixed.**
Production (`https://api.ayodhyaanubhav.guideguruglobal.com`) rejects every
protected `/api/v1/admin/*` request with `"Missing or invalid authentication
cookie"`, even with a correct `Authorization: Bearer <token>` — re-confirmed
live on 2026-08-22. The frontend already sends the token exactly as
documented; this needs a Flask-side fix. Full repro and fix instructions:
`BACKEND_ISSUE_ADMIN_AUTH_COOKIE.md`. The public guest-facing site
(browsing, booking, contact, query forms) is unaffected — it doesn't touch
admin auth.

## Repo hygiene

- [x] Temporary/debug files removed — `.dev-server.log`, `test-api.js`, stray build cache
- [x] `.gitignore` correct — `node_modules`, `.next`, `.env*` (except `.env.example`), `*.tsbuildinfo` all excluded
- [x] No secrets exposed — repo-wide search found none

## Build & code quality

- [x] TypeScript passes — `npx tsc --noEmit`, zero errors
- [x] ESLint passes — `npm run lint`, zero errors **and zero warnings** (fixed the last 3 `no-unused-vars` warnings via `ignoreRestSiblings` for the destructure-omit pattern used in `services/admin/experienceService.ts`)
- [x] Production build passes — `npm run build`, all **22 routes** generated successfully (12 public site routes incl. `/privacy` and `/terms`, 10 admin dashboard routes)
- [x] `npm run start` smoke-tested — `/`, `/about`, `/contact`, `/faqs`, `/privacy`, `/terms`, `/experiences`, `/categories`, `/dashboard/super-admin/login` all return `200`

## Security headers & CORS

- [x] Security headers configured — `Content-Security-Policy`, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, `Strict-Transport-Security`, all verified present via `curl -I` on the production build
- [x] `X-Powered-By` header removed — added `poweredByHeader: false` to `next.config.ts` (was leaking "Next.js" unnecessarily)
- [x] CSP configured — scoped to `self` + Cloudflare Turnstile + `NEXT_PUBLIC_API_URL`'s origin (read at build time); currently resolves to `https://api.ayodhyaanubhav.guideguruglobal.com` in both `img-src` and `connect-src`
- [x] CORS — **frontend requires no CORS configuration of its own** (browsers enforce CORS based on the *server's* response headers, not anything the frontend sends). Re-verified directly against production: `OPTIONS` preflight and real `POST`/`GET` requests from `http://localhost:*` origins all come back with correct `Access-Control-Allow-Origin` + `Access-Control-Allow-Credentials: true`. If a CORS error ever appears in the browser, it's a backend allow-list issue — see `BACKEND_ISSUE_CORS.md` for the pattern already found and fixed once before (localhost vs 127.0.0.1).
- [x] `images.remotePatterns` — **not empty**, by design: it's populated from `NEXT_PUBLIC_API_URL`'s origin so `next/image` can optimize category/experience cover images the backend serves. (Corrects a stale claim in an earlier version of this checklist that said `[]` — that was before `NEXT_PUBLIC_API_URL` was configured.)
- [x] `apiClient.ts` fetches use `cache: "no-store"` — fixed a bug this session where Next's default fetch caching meant the site would fetch live data once and then silently keep serving that first response forever, never calling the backend again (verified via live network monitoring, see prior conversation)

## Content & branding

- [x] Real contact info live everywhere — WhatsApp/phone (`+91 96952 10246`), email (`ayodhyaanubhav@gmail.com`), Instagram — no dummy `+91 12345 67890` / `hello@guideguruglobal.com` / generic social links remain in first-party code (Facebook/YouTube intentionally still placeholder — no real links provided yet)
- [x] Real logo live everywhere — `public/images/branding/logo.png`, referenced from Header, Footer, admin sidebar, admin login, both verification-gate screens, and the admin settings default
- [x] `/privacy` and `/terms` pages exist and are linked from the footer (previously dead `/#privacy` / `/#terms` anchors)
- [x] 4-language i18n live (English/Hindi/Gujarati/Tamil) — instant switching via `lib/i18n/LanguageContext.tsx`, persisted to `localStorage`; admin-sourced content (experience/FAQ/category text) intentionally not translated, see comment at the top of `lib/i18n/translations.ts`

## Carried over from the original hardening pass (still true)

- [x] Environment variables clean — only `NEXT_PUBLIC_API_URL` and `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, both intentionally public
- [x] Turnstile configured — real widget integration (`components/security/HumanVerification.tsx`), auto-bypasses cleanly when no site key is set
- [x] Forms validated — centralized `lib/validation/*`, enforced client-side with length/format limits on every field
- [x] Double-submit protected — all forms disable their submit button and show a sending state while a request is in flight
- [x] XSS risks audited — the only `dangerouslySetInnerHTML` in the codebase is nowhere in this repo (none was introduced)
- [x] Open redirects prevented — no `redirect()`/`window.location` assignment exists anywhere in the app
- [x] Storage audited — `localStorage`/`sessionStorage` usage is limited to: language preference, Turnstile session gate, and the admin auth token/session (no other PII)
- [x] External links secured — all `target="_blank"` have `rel="noopener noreferrer"`
- [x] Error pages implemented — `app/error.tsx`, `app/not-found.tsx`, `app/loading.tsx`
- [x] Accessibility — form fields have `aria-invalid`/`aria-describedby`, error banners use `role="alert"`, success states use `role="status"`
- [x] Console cleaned — zero `console.log`/`console.error`/`debugger` in first-party code

## Known, documented trade-offs (not defects)

- **`'unsafe-inline'` in CSP `script-src`/`style-src`** — required by Next.js's RSC inline bootstrap scripts and this UI's extensive use of inline `style={{}}` for animation. A nonce-based CSP is a valid stricter follow-up. See `next.config.ts` comments and `SECURITY_AUDIT.md` F-07.
- **`npm audit` findings** — transitive, inside Next.js's own bundled `postcss`/`sharp`, fixed only by a Next major-version upgrade. Deferred deliberately. See `SECURITY_AUDIT.md` F-01.
- **Server-side Turnstile verification** — out of scope for this frontend-only repo by design. The frontend obtains and forwards a token; Flask must call Cloudflare's `siteverify` with the backend-only secret key.
- **Facebook/YouTube footer links** — still placeholder (`facebook.com`, `youtube.com`) pending real links from the client.
