# YONINGDA backend

This directory contains the separate FastAPI service used by the static YONINGDA
frontend. The ASGI application is `backend.main:app`; account and session
operations require PostgreSQL configuration and applied Alembic migrations.
The source uses Python 3.10+ syntax; no upper Python version is declared. The
current development/test environment is Python 3.13.14.

## Production hosting

This is a generic Python/ASGI deployment guide; no hosting vendor, service, or
backend domain is assumed. From the repository root, install the runtime
dependencies with the platform build/install command:

```sh
python -m pip install -r backend/requirements.txt
```

Set the platform web-service start command to:

```sh
python -m backend.start
```

The launcher binds Uvicorn to `0.0.0.0` and reads the hosting platform's `PORT`
environment variable; it uses port `8000` only when `PORT` is absent (for local
use), and rejects invalid port values. The ASGI import path remains
`backend.main:app`. Runtime dependencies, including Uvicorn and asyncpg, are
listed in `backend/requirements.txt`.

Configure the deployment health check as `GET /api/health`. It returns
`{"status":"healthy","project":"YONINGDA"}` without requiring a database, so
it verifies that the API process responds but does **not** verify database
connectivity, migrations, or authentication readiness. Confirm database setup
separately before enabling account traffic.

### Required host environment settings

Supply these values through the API host's environment/secret settings. Do not
commit populated values or put backend secrets in Vercel frontend settings.

| Variable | Required production configuration |
| --- | --- |
| `DATABASE_URL` | PostgreSQL URL, preferably `postgresql+asyncpg://<USER>:<URL_ENCODED_PASSWORD>@<DB_HOST>:<PORT>/<DATABASE>`; use provider-required TLS settings. Required for account operations. |
| `SESSION_SECRET` | Cryptographically random secret with at least 32 bytes of entropy. Required for CSRF and session authentication. |
| `FRONTEND_ORIGINS` | Exact comma-separated HTTPS origin(s) of the deployed frontend; e.g. `https://<VERCEL_FRONTEND_ORIGIN>`. Add only required preview origins. Never use `*`. |
| `SESSION_COOKIE_SECURE` | `true` in hosted environments. |
| `SESSION_COOKIE_SAMESITE` | `lax` for same-site frontend/API deployments. `none` is only appropriate for a genuinely cross-site setup and still requires Secure cookies; browser third-party-cookie blocking may prevent sessions. |

`SESSION_TTL_MINUTES` is optional and defaults to 720. The backend sets host-only
HttpOnly cookies restricted to `/api/auth`; do not weaken those settings. CORS
uses the exact `FRONTEND_ORIGINS` allowlist with credentials, GET/POST methods,
and only the required JSON/CSRF headers. Login and logout retain their CSRF
bootstrap and validation requirements.

For the static Vercel frontend, the public API origin is configured separately
in the frontend's `api-config.js` after the actual API origin exists. Keep
`DATABASE_URL` and `SESSION_SECRET` exclusively in backend secrets. A same-site
custom-domain arrangement is preferred when the Vercel and API hostnames would
otherwise be cross-site. Do not change cookie or CORS protections to compensate
for third-party-cookie restrictions.

### Explicit database migration step

Provision PostgreSQL and apply migrations once as an explicit
release/deployment step, before sending account traffic. For this project's
Supabase Session Pooler, run the launcher from the repository root:

```powershell
\.venv\Scripts\python.exe -m backend.migrate
```

The launcher prompts for the database password without echoing it, creates the
SQLAlchemy URL in memory, and passes the rendered URL only to the Alembic child
process through its environment. It does not write credentials to `.env` or
persist environment changes. It uses the shared Session Pooler on port `5432`;
do not substitute the transaction-pooler port `6543` for migrations.

This changes the target database schema. Verify the target and take an
appropriate backup first. The application does not run migrations at startup;
startup only configures the service and shutdown disposes its database engine.
Do not run migrations on every worker boot.

### Publish checklist

1. Choose a Python host and configure the runtime/build command, start command,
  environment settings, and `/api/health` check above.
2. Create PostgreSQL and apply migrations explicitly.
3. Confirm the hosted API HTTPS origin, then set it in frontend `api-config.js`.
4. Set `FRONTEND_ORIGINS` to the exact Vercel frontend origin(s), deploy, and
  verify `/api/health` and browser CORS/cookie behavior.
5. Perform registration/login/logout smoke tests only against a disposable
  staging database before enabling production traffic.

No backend domain or hosting account is configured by this repository.

## Local setup (Windows PowerShell)

Run these commands from the repository root. Reuse the existing root `.venv` if
present; the commands create it only when missing:

```powershell
if (-not (Test-Path .venv)) { py -m venv .venv }
.venv\Scripts\Activate.ps1
python -m pip install -r backend\requirements.txt
if (-not (Test-Path backend\.env)) { Copy-Item backend\.env.example backend\.env }
```

If `backend\.env` already exists, keep it and edit it deliberately; do not
replace it with the example. Set `DATABASE_URL` to a PostgreSQL URL,
`SESSION_SECRET` to a freshly generated value of at least 32 random bytes, and
`FRONTEND_ORIGINS` to the exact trusted frontend origins. Generate a secret
locally with `python -c "import secrets; print(secrets.token_urlsafe(48))"` and
paste it directly into the ignored local env file. Never commit real values or
put backend secrets in Vercel frontend environment variables. Tests use isolated
temporary SQLite files, not this configured PostgreSQL database.

For a one-session local database check, set `DATABASE_URL` only in the current
PowerShell process rather than putting the password in a command, source file,
or shell history. The prompt does not echo the password. This example uses the
Supabase transaction pooler and its required asyncpg/SQLAlchemy cache setting:

```powershell
$securePassword = Read-Host "Supabase database password" -AsSecureString
$passwordPointer = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($securePassword)
try {
  $password = [Runtime.InteropServices.Marshal]::PtrToStringBSTR($passwordPointer)
  $encodedPassword = [Uri]::EscapeDataString($password)
  $env:DATABASE_URL = "postgresql+asyncpg://postgres.dydzwzioplblhxetjkbx:$encodedPassword@aws-0-ap-southeast-2.pooler.supabase.com:6543/postgres?prepared_statement_cache_size=0&ssl=require"
}
finally {
  if ($passwordPointer -ne [IntPtr]::Zero) {
    [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($passwordPointer)
  }
  if ($securePassword) { $securePassword.Dispose() }
  Remove-Variable password, encodedPassword, securePassword, passwordPointer -ErrorAction SilentlyContinue
}

if ($env:DATABASE_URL) { "DATABASE_URL is set for this PowerShell process." }
```

Do not print the variable or run commands with its value as an argument. It is
process-scoped and is removed when this PowerShell window closes; clear it
earlier with `Remove-Item Env:DATABASE_URL` when finished. This only configures
the URL; it does not test or connect to the database.

For local browser testing over plain HTTP only, set
`SESSION_COOKIE_SECURE=false` in `backend\.env` and use the same host name for
the frontend and API (for example, `localhost` for both). Keep
`SESSION_COOKIE_SECURE=true` in hosted environments.

## PostgreSQL and migrations

Use either a local PostgreSQL installation or a hosted PostgreSQL service:

1. Create a new empty database and a least-privilege application role. For a
  hosted database, copy its host, port, database name, username, password, and
  TLS requirements from the provider's private connection settings.
2. Set `DATABASE_URL` in the backend environment (local `backend\.env` or the
  backend host's secret configuration) in SQLAlchemy asyncpg format:
  `postgresql+asyncpg://<USER>:<URL_ENCODED_PASSWORD>@<HOST>:<PORT>/<DATABASE>`.
  Replace all placeholders. URL-encode reserved characters in the password.
  Do not expose this URL in frontend configuration, logs, or API responses.
3. Configure the other backend variables described below, especially
  `SESSION_SECRET` and exact `FRONTEND_ORIGINS`.

The application also normalizes `postgresql://` and `postgres://` to the
`postgresql+asyncpg` driver. Prefer the explicit asyncpg form above. A copied
`.env.example` is only a template; its placeholder URL is not a working database
connection.

### Supabase transaction pooler

For the supplied shared transaction pooler, the SQLAlchemy asyncpg URL shape is
`postgresql+asyncpg://<USERNAME>:<URL_ENCODED_PASSWORD>@<POOLER_HOST>:6543/postgres?prepared_statement_cache_size=0&ssl=require`.
Use the exact host and pooler username shown in the Supabase Connect dialog;
reserved password characters must be URL-encoded. In particular, the supplied
host is the transaction-pooler endpoint and port `6543`, and its shared-pooler
username includes the project reference. The asyncpg SQLAlchemy dialect uses
`prepared_statement_cache_size=0` to disable its prepared-statement cache, as
required by Supabase transaction mode. `ssl=require` makes asyncpg require TLS;
it encrypts the connection but does not verify the server certificate. The
current settings pass `DATABASE_URL` directly to SQLAlchemy and do not expose
asyncpg `connect_args` for a custom SSL context. Therefore, certificate
verification with the Supabase root certificate would require a deliberate
configuration-code enhancement; do not assume `ssl=require` verifies identity.

Transaction mode does not preserve session state between transactions and does
not support prepared statements or query pipelining. It can be used by the
application only with the driver limitation above in mind; do not use it for
schema migrations. Supabase recommends its **direct connection** for migrations
and other migration/backup tooling. This backend's Alembic environment uses an
async engine with `NullPool`, but `NullPool` only disables SQLAlchemy's local
pool—it does not turn a transaction-pooler endpoint into a direct or
session-mode connection. Obtain the direct connection string from the Supabase
Connect dialog before any migration. If the local network cannot reach the
direct endpoint, consult Supabase's current migration guidance for an approved
session-mode alternative; do not substitute the transaction-pooler URL.

The checked-in migration chain is `0001_create_users` followed by
`0002_create_user_sessions`. Confirm the target is a new/approved database and
back it up before applying schema changes. From the repository root, apply
migrations explicitly:

```powershell
python -m alembic -c backend\alembic.ini upgrade head
```

This connects to the database named by `DATABASE_URL` and changes its schema.
Application startup never creates or alters tables. Do not run the migration
command against production or a database containing user data without explicit
authorization, a verified migration state, and a backup.

Start the API from the repository root:

```powershell
python -m uvicorn backend.main:app --reload --host 127.0.0.1 --port 8000
```

Check its response in another PowerShell window:

```powershell
Invoke-RestMethod http://127.0.0.1:8000/api/health
```

Expected JSON:

```json
{"status":"healthy","project":"YONINGDA"}
```

## Registration endpoint

`POST http://127.0.0.1:8000/api/auth/register` accepts JSON with `display_name`,
`phone_number`, and `password`. Phone numbers are normalized to the Uzbekistan
`+998XXXXXXXXX` form. Passwords must contain 12–128 characters and are stored
as Argon2id hashes. Successful requests return HTTP 201 with only the account
ID, display name, normalized phone, nullable gender, and active status. Phone
ownership is not verified in this milestone.

For a disposable local/staging database, replace every placeholder with test
values before sending this body. Do not use real user credentials or data:

```json
{
  "display_name": "<DISPLAY_NAME>",
  "phone_number": "<UNIQUE_VALID_UZ_PHONE_NUMBER>",
  "password": "<UNIQUE_STRONG_TEST_PASSWORD>"
}
```

### PowerShell endpoint smoke test

Run this only against a disposable local or staging database. Replace both
placeholders with test values; the phone must be unique and the password must
meet the registration policy. The web session retains the HttpOnly cookies:

```powershell
$baseUrl = "http://127.0.0.1:8000"
$testPhone = "<UNIQUE_VALID_UZ_PHONE_NUMBER>"
$testPassword = "<UNIQUE_STRONG_TEST_PASSWORD>"
$webSession = New-Object Microsoft.PowerShell.Commands.WebRequestSession

# Health (does not require a database)
Invoke-RestMethod -Uri "$baseUrl/api/health"

# Register one disposable test account
$registerBody = @{
    display_name = "<DISPLAY_NAME>"
    phone_number = $testPhone
    password = $testPassword
} | ConvertTo-Json
Invoke-RestMethod -Uri "$baseUrl/api/auth/register" -Method Post `
    -ContentType "application/json" -Body $registerBody

# Fetch CSRF token, then log in while retaining both cookies
$csrf = Invoke-RestMethod -Uri "$baseUrl/api/auth/csrf" -WebSession $webSession
$headers = @{ "X-CSRF-Token" = $csrf.csrf_token }
$loginBody = @{ phone_number = $testPhone; password = $testPassword } | ConvertTo-Json
Invoke-RestMethod -Uri "$baseUrl/api/auth/login" -Method Post `
    -ContentType "application/json" -Headers $headers `
    -WebSession $webSession -Body $loginBody

# Authenticated own-profile request, followed by CSRF-protected logout
Invoke-RestMethod -Uri "$baseUrl/api/auth/me" -WebSession $webSession
Invoke-RestMethod -Uri "$baseUrl/api/auth/logout" -Method Post `
    -Headers $headers -WebSession $webSession
```

After logout, `/api/auth/me` should return HTTP 401. Authentication smoke tests
must not be run against production or a database containing real users.

## Login, CSRF, sessions, and profile

Before `POST /api/auth/login` or `POST /api/auth/logout`, call
`GET /api/auth/csrf` with browser credentials enabled. It sets a short-lived
HttpOnly CSRF cookie and returns the matching signed CSRF value in JSON. Keep
that value in memory and send it as `X-CSRF-Token`; do not persist it or session
credentials in `localStorage`. Cross-origin browser requests must use
`credentials: "include"`. Login accepts JSON `phone_number` and `password` and
returns the same safe user fields as registration. Unknown numbers, incorrect
passwords, and inactive accounts all receive the same generic 401 response.

Successful login sets an opaque, HttpOnly session cookie. The raw cookie token
is never stored in the database; only a keyed SHA-256 verifier is stored in
`user_sessions`. Sessions expire after `SESSION_TTL_MINUTES` (default 720) and
logout marks the matching database session revoked before clearing both
cookies. `GET /api/auth/me` requires a valid, non-expired, non-revoked session
and returns only that user's safe profile fields.

All cookie-authenticated state-changing requests must validate the CSRF cookie
and `X-CSRF-Token` header. The default cookie is Secure, HttpOnly, SameSite=Lax,
host-only (no Domain attribute), and restricted to `/api/auth`. For
cross-origin browser requests, configure `FRONTEND_ORIGINS` with exact trusted
origins; credentialed CORS is never enabled for `*`.

The static frontend loads `api-config.js` before `auth-api.js`. For Vercel,
replace its empty `window.YONINGDA_API_BASE_URL` with the exact HTTPS origin of
the deployed API (origin only; no `/api` suffix or path) before deploying. This
URL is public browser configuration, not a secret. The static project has no
build step, and Vercel does not automatically expose `.env` values to browser
code. Alternatively, a deployment may inject `window.YONINGDA_API_BASE_URL` or
`window.YONINGDA_CONFIG.apiBaseUrl` before `api-config.js` executes. Without a
configured value, the client blocks API requests and displays a configuration
message; it does not fall back to the Vercel frontend origin. A same-origin
`/api` proxy is also possible, but must not be configured until its actual
backend upstream origin is known.

Keep the session cookie `HttpOnly`, host-only, path `/api/auth`; the backend
already sets those attributes. Login and logout require the CSRF bootstrap
cookie plus matching `X-CSRF-Token`; do not disable either check. Same-site
custom domains such as `app.<YOUR_DOMAIN>` and `api.<YOUR_DOMAIN>` or a
same-origin reverse proxy are preferred. Unrelated Vercel/backend domains may
need `SameSite=None; Secure`, but browser third-party-cookie restrictions can
still prevent sessions. Do not weaken cookie, CORS, or CSRF protection to work
around this; configure a same-site architecture instead. No Vercel proxy rewrite
is present or appropriate until the real backend origin is known.

## Configuration and database

- `FRONTEND_ORIGINS` is an exact, comma-separated allowlist. It defaults to
  empty, so cross-origin browser requests are not enabled by default. Credentialed
  CORS allows only configured origins, GET/POST, and the required content/CSRF
  headers. Configure only the exact frontend origin, for example
  `https://<YOUR_CUSTOM_FRONTEND_HOST>` or a stable
  `https://<YOUR_PROJECT>.vercel.app` deployment. Separate preview deployment
  origins must be listed individually; do not use `*`. Hosted origins must use
  HTTPS.
- `DATABASE_URL` is required for registration and optional for health checks.
  It is normalized to SQLAlchemy's `asyncpg` driver when needed. Connection
  errors return a generic 503 response and never include the URL or driver
  details.
- `SESSION_SECRET` must contain at least 32 random bytes for authentication;
  it is used to key session-token hashes and sign CSRF values. Rotating it
  invalidates existing sessions. `SESSION_COOKIE_SECURE` defaults to `true`,
  `SESSION_COOKIE_SAMESITE` defaults to `lax`, and session cookies remain
  host-only.
- Keep `SESSION_SECRET` and `DATABASE_URL` in the backend's secret settings (or
  ignored local `backend\.env`), never in Vercel's frontend environment. The
  CSRF endpoint and login/logout require a valid `SESSION_SECRET`; health can
  still respond when authentication is not configured.
- Alembic migrations live in `backend/migrations`. Apply them explicitly with
  the command above; application startup never creates or alters tables.
- Keep `backend\.env` and real database credentials out of source control.
  Configure production values through the backend host's secret settings, not
  in frontend files, API responses, or logs.
- No shared rate-limit service is configured here, so the API does not claim
  production brute-force protection. Before public deployment, add a shared
  Redis-backed sliding-window limiter (for example, 5 failed attempts per
  15 minutes) keyed by a keyed hash of the normalized phone and the client IP
  obtained only from a trusted proxy. Return 429/Retry-After and never log raw
  phone numbers, passwords, or session tokens. Do not rely on per-process
  in-memory limits across workers.
- Expired session rows remain unusable but are not automatically deleted yet;
  configure a scheduled cleanup after deployment to bound storage growth.

Automated tests are isolated in `backend/tests` and use a temporary SQLite file,
never the configured PostgreSQL database. Install the test tools and run them
from the repository root with:

```powershell
python -m pip install -r backend\requirements-test.txt
python -m pytest backend\tests
```

The frontend has no build script, package manifest, or automated test framework
in this repository; its HTML, CSS, and JavaScript are served as static files.
Authentication is integrated directly into the existing SPA and standalone
login/registration/profile pages. The verify page remains present but clearly
reports that SMS verification is unavailable because the API has no OTP routes.