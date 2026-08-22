# Backend Issue — Production Admin Routes Reject Bearer Tokens, Expect a Cookie

> **Re-confirmed 2026-08-22 — still broken.** Re-tested directly against
> production during a hosting-readiness pass: login still returns no
> `Set-Cookie`, and every protected `/api/v1/admin/*` route still returns
> `{"success":false,"message":"Missing or invalid authentication cookie","data":null}`
> even with a valid `Authorization: Bearer <token>` header. This is the
> single blocker keeping the admin panel from working once deployed —
> everything else in this doc is unchanged and still accurate.

## Main Problem

On the **production** backend (`https://api.ayodhyaanubhav.guideguruglobal.com`),
every protected `/api/v1/admin/*` route (except login itself) returns:

```json
{ "success": false, "message": "Missing or invalid authentication cookie", "data": null }
```

with HTTP `401`, **even when a valid `Authorization: Bearer <token>` header is sent**.

This contradicts:
1. The Admin Auth API doc you shared, which documents Bearer-token auth
   only (`Authorization: Bearer <token>`, error `"Missing or invalid
   Authorization header"` — never mentions a cookie).
2. `BACKEND_GUIDE.md` section 4, which says the same.
3. The actual behavior of the **local** backend instance (`127.0.0.1:5000`)
   tested earlier this session, where Bearer-token auth worked correctly
   end-to-end (login → token → every admin endpoint).

So production is running different (or differently-configured) auth
middleware than what's documented and than what local dev runs.

## Reproduction

```bash
# Login works fine — reaches Flask, returns normal validation error
curl -X POST https://api.ayodhyaanubhav.guideguruglobal.com/api/v1/admin/auth/login \
  -H "Content-Type: application/json" -d '{}'
# → 422 { "message": "Validation failed", "data": [...] }

# Any other admin route — even completely unauthenticated — returns the
# COOKIE error, not the documented "Missing or invalid Authorization header":
curl https://api.ayodhyaanubhav.guideguruglobal.com/api/v1/admin/dashboard
# → 401 { "message": "Missing or invalid authentication cookie", "data": null }

curl https://api.ayodhyaanubhav.guideguruglobal.com/api/v1/admin/booking
# → 401 { "message": "Missing or invalid authentication cookie", "data": null }
```

Response headers confirm this is Flask itself talking (plain `nginx/1.18.0
(Ubuntu)` reverse proxy, identical `{success,message,data}` envelope as
every other endpoint) — **not** a CDN/WAF/Cloudflare Access layer sitting
in front, so this needs to be fixed in the Flask app itself.

## What Needs to Be Fixed

Whatever `@login_required`-style decorator or middleware protects
`/api/v1/admin/*` routes on **production** is checking for a session
cookie instead of parsing the `Authorization` header. Find it (likely a
decorator applied to admin blueprint routes, or a `before_request` hook)
and make sure production runs the same Bearer-token check as local dev —
something like:

```python
# What it should be doing (matches local dev + the documented contract):
auth_header = request.headers.get("Authorization", "")
if not auth_header.startswith("Bearer "):
    return jsonify(success=False, message="Missing or invalid Authorization header", data=None), 401
token = auth_header.removeprefix("Bearer ")
# ...decode/verify JWT...
```

Possible causes to check:
- Production might be running an older/different commit than local dev
  that still has a legacy cookie-based session check.
- A deployment config or `.env` difference (e.g. a `SESSION_TYPE` or auth
  strategy flag) causing a different code path to be selected.
- Two different auth decorators existing in the codebase, with production
  wired to the wrong one.

## Frontend Changes Needed

**None.** The frontend (`services/admin/authService.ts` +
`services/admin/*.ts`) already sends `Authorization: Bearer <token>` on
every admin request, matching the documented contract exactly — confirmed
working against the local backend instance. Once production's admin
routes accept Bearer tokens the same way, the admin panel will work
immediately with no frontend changes.

## Testing

After fixing, confirm with:
```bash
TOKEN=$(curl -s -X POST https://api.ayodhyaanubhav.guideguruglobal.com/api/v1/admin/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"<real-admin-email>","password":"<real-password>"}' \
  | python3 -c "import sys,json; print(json.load(sys.stdin)['data']['access_token'])")

curl -H "Authorization: Bearer $TOKEN" https://api.ayodhyaanubhav.guideguruglobal.com/api/v1/admin/dashboard
# should return real dashboard data, not the cookie error
```
