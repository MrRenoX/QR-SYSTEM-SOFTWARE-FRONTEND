# Backend API - CORS Blocks `127.0.0.1` Origin

## Main Problem

The Flask backend's CORS allow-list only accepts requests from `localhost`
origins (`http://localhost:3000`, `:3001`, `:3002`). It does **not** allow
`http://127.0.0.1:3000` (or any other `127.0.0.1:*` port), even though
that's the same machine and the same running frontend.

Browsers treat `localhost` and `127.0.0.1` as **different origins** for CORS
purposes — so anyone opening the admin panel via `http://127.0.0.1:3000`
instead of `http://localhost:3000` gets every API call blocked with a CORS
error, even though the backend itself is running fine.

Confirmed directly against the running backend:

```bash
# Allowed — origin is in the allow-list
curl -s -D - -o /dev/null -H "Origin: http://localhost:3000" http://127.0.0.1:5000/api/v1/experience
# → Access-Control-Allow-Origin: http://localhost:3000

# Blocked — same machine, same port, different scheme host
curl -s -D - -o /dev/null -H "Origin: http://127.0.0.1:3000" http://127.0.0.1:5000/api/v1/experience
# → (no Access-Control-Allow-Origin header at all)
```

---

## What Needs to Be Fixed in Flask

Find where CORS is configured — almost certainly a `flask_cors.CORS(...)`
call (the `Vary: Origin` header and per-origin reflection behavior in the
current responses are flask-cors's signature). Search the backend repo for:

```bash
grep -rn "CORS" --include="*.py" .
```

It likely looks something like this today:

### Current Code (WRONG — narrow, hardcoded list)

```python
from flask_cors import CORS

CORS(app, origins=[
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:3002",
])
```

### Fixed Code (CORRECT — also allow the 127.0.0.1 equivalents)

```python
from flask_cors import CORS

CORS(app, origins=[
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:3002",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:3001",
    "http://127.0.0.1:3002",
])
```

### Better long-term fix (regex — survives Next.js auto-bumping to new ports)

Next.js dev auto-increments the port (3000 → 3001 → 3002 → ...) whenever
the previous one is already in use, so a fixed list of ports is fragile —
it broke exactly this way during frontend testing. A regex that allows any
localhost/127.0.0.1 port in development is more robust:

```python
import re
from flask_cors import CORS

CORS(app, origins=[
    re.compile(r"^http://(localhost|127\.0\.0\.1):\d+$"),
])
```

(Only do this for local/dev config — keep a strict fixed allow-list for
staging/production origins.)

---

## Testing

After changing it, restart the Flask server and re-run:

```bash
curl -s -D - -o /dev/null -H "Origin: http://127.0.0.1:3000" http://127.0.0.1:5000/api/v1/experience
```

You should now see `Access-Control-Allow-Origin: http://127.0.0.1:3000` in
the response headers. Then reload the admin panel at `http://127.0.0.1:3000`
and the CORS error should be gone.

---

## Frontend Changes Already Done

✅ None needed — this is purely a backend CORS configuration issue, not a
frontend bug (see `API_INTEGRATION.md`: "No CORS configuration — that's a
Flask-side concern"). In the meantime, opening the admin panel via
`http://localhost:3000` instead of `http://127.0.0.1:3000` avoids the issue
entirely without any backend change.
