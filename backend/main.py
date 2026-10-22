"""Minimal FastAPI application for the YONINGDA project."""

from collections.abc import AsyncIterator
from contextlib import asynccontextmanager
from datetime import datetime, timedelta, timezone
from http import HTTPStatus

from fastapi import Depends, FastAPI, HTTPException, Request, Response
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError, SQLAlchemyError
from sqlalchemy.ext.asyncio import AsyncSession
from starlette.exceptions import HTTPException as StarletteHTTPException
from starlette.middleware.cors import CORSMiddleware

from backend.config import get_settings
from backend.database import (
    DatabaseUnavailableError,
    DuplicatePhoneNumberError,
    dispose_database_engine,
    get_db_session,
)
from backend.models import User, UserSession
from backend.schemas import LoginRequest, RegistrationRequest, UserResponse
from backend.security import (
    AuthConfigurationError,
    AuthenticationRequiredError,
    CSRF_COOKIE_NAME,
    InvalidCredentialsError,
    SESSION_COOKIE_NAME,
    create_csrf_token,
    create_session_token,
    hash_password,
    hash_session_token,
    verify_csrf_token,
    verify_password,
)


@asynccontextmanager
async def lifespan(_: FastAPI) -> AsyncIterator[None]:
    """Dispose the optional database engine cleanly during shutdown."""
    try:
        yield
    finally:
        await dispose_database_engine()


settings = get_settings()

app = FastAPI(
    title="YONINGDA API",
    docs_url=None,
    redoc_url=None,
    openapi_url=None,
    lifespan=lifespan,
)

if settings.cors_origins:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.cors_origins,
        allow_credentials=True,
        allow_methods=["GET", "POST"],
        allow_headers=["Content-Type", "X-CSRF-Token"],
    )


@app.get("/api/health")
async def health() -> dict[str, str]:
    """Report API process health without requiring database credentials."""
    return {"status": "healthy", "project": "YONINGDA"}


@app.post("/api/auth/register", response_model=UserResponse, status_code=201)
async def register(
    payload: RegistrationRequest,
    session: AsyncSession = Depends(get_db_session),
) -> UserResponse:
    """Create an account with a normalized phone number and Argon2id hash."""
    existing_user = await session.scalar(
        select(User.id).where(User.phone_number == payload.phone_number)
    )
    if existing_user is not None:
        raise DuplicatePhoneNumberError

    user = User(
        display_name=payload.display_name,
        phone_number=payload.phone_number,
        password_hash=hash_password(payload.password),
    )
    session.add(user)

    try:
        await session.flush()
        response = UserResponse.model_validate(user)
        await session.commit()
    except IntegrityError:
        await session.rollback()
        raise DuplicatePhoneNumberError from None
    except SQLAlchemyError:
        await session.rollback()
        raise DatabaseUnavailableError from None

    return response


def _cookie_options() -> dict[str, object]:
    current_settings = get_settings()
    return {
        "httponly": True,
        "secure": current_settings.session_cookie_secure,
        "samesite": current_settings.session_cookie_samesite,
        "path": "/api/auth",
    }


def _require_csrf(request: Request) -> None:
    if not verify_csrf_token(
        request.cookies.get(CSRF_COOKIE_NAME),
        request.headers.get("X-CSRF-Token"),
    ):
        raise HTTPException(status_code=403, detail="CSRF validation failed.")


def _set_auth_cookie(response: Response, name: str, value: str) -> None:
    lifetime_seconds = get_settings().session_ttl_minutes * 60
    expires_at = datetime.now(timezone.utc) + timedelta(seconds=lifetime_seconds)
    response.set_cookie(
        name,
        value,
        max_age=lifetime_seconds,
        expires=expires_at,
        **_cookie_options(),
    )


def _clear_auth_cookies(response: Response) -> None:
    options = _cookie_options()
    response.delete_cookie(SESSION_COOKIE_NAME, **options)
    response.delete_cookie(CSRF_COOKIE_NAME, **options)


@app.get("/api/auth/csrf")
async def csrf_token(response: Response) -> dict[str, str]:
    """Issue a short-lived signed CSRF token before login or logout requests."""
    token = create_csrf_token()
    _set_auth_cookie(response, CSRF_COOKIE_NAME, token)
    response.headers["Cache-Control"] = "no-store"
    return {"csrf_token": token}


@app.post("/api/auth/login", response_model=UserResponse)
async def login(
    payload: LoginRequest,
    request: Request,
    response: Response,
    session: AsyncSession = Depends(get_db_session),
) -> UserResponse:
    """Authenticate an existing active user and issue a server-side session."""
    _require_csrf(request)

    user = await session.scalar(
        select(User).where(User.phone_number == payload.phone_number)
    )
    password_matches = verify_password(
        payload.password,
        user.password_hash if user is not None else None,
    )
    if user is None or not user.is_active or not password_matches:
        raise InvalidCredentialsError

    raw_session_token = create_session_token()
    user_session = UserSession(
        user_id=user.id,
        token_hash=hash_session_token(raw_session_token),
        expires_at=datetime.now(timezone.utc)
        + timedelta(minutes=get_settings().session_ttl_minutes),
    )
    session.add(user_session)
    try:
        await session.commit()
    except SQLAlchemyError:
        await session.rollback()
        raise DatabaseUnavailableError from None

    _set_auth_cookie(response, SESSION_COOKIE_NAME, raw_session_token)
    response.headers["Cache-Control"] = "no-store"
    return UserResponse.model_validate(user)


async def get_authenticated_user(
    request: Request,
    session: AsyncSession = Depends(get_db_session),
) -> User:
    raw_session_token = request.cookies.get(SESSION_COOKIE_NAME)
    if not raw_session_token:
        raise AuthenticationRequiredError

    token_hash = hash_session_token(raw_session_token)
    user = await session.scalar(
        select(User)
        .join(UserSession, UserSession.user_id == User.id)
        .where(
            UserSession.token_hash == token_hash,
            UserSession.expires_at > datetime.now(timezone.utc),
            UserSession.revoked_at.is_(None),
            User.is_active.is_(True),
        )
    )
    if user is None:
        raise AuthenticationRequiredError
    return user


@app.get("/api/auth/me", response_model=UserResponse)
async def current_profile(
    response: Response,
    user: User = Depends(get_authenticated_user),
) -> UserResponse:
    """Return only the authenticated user's safe profile fields."""
    response.headers["Cache-Control"] = "no-store"
    return UserResponse.model_validate(user)


@app.post("/api/auth/logout")
async def logout(
    request: Request,
    response: Response,
    session: AsyncSession = Depends(get_db_session),
) -> dict[str, str]:
    """Revoke the server-side session, then clear both auth-related cookies."""
    _require_csrf(request)
    raw_session_token = request.cookies.get(SESSION_COOKIE_NAME)
    if raw_session_token:
        user_session = await session.scalar(
            select(UserSession).where(
                UserSession.token_hash == hash_session_token(raw_session_token)
            )
        )
        if user_session is not None and user_session.revoked_at is None:
            user_session.revoked_at = datetime.now(timezone.utc)
            try:
                await session.commit()
            except SQLAlchemyError:
                await session.rollback()
                raise DatabaseUnavailableError from None

    _clear_auth_cookies(response)
    response.headers["Cache-Control"] = "no-store"
    return {"status": "logged_out"}


@app.exception_handler(DatabaseUnavailableError)
async def handle_database_unavailable(
    request: Request, exc: DatabaseUnavailableError
) -> JSONResponse:
    """Return a safe service-unavailable response for database failures."""
    del request, exc
    return JSONResponse(
        status_code=503,
        content={
            "error": {
                "code": "database_unavailable",
                "message": "The account service is temporarily unavailable.",
            }
        },
    )


@app.exception_handler(AuthConfigurationError)
async def handle_auth_configuration_error(
    request: Request, exc: AuthConfigurationError
) -> JSONResponse:
    del request, exc
    return JSONResponse(
        status_code=503,
        content={
            "error": {
                "code": "authentication_unavailable",
                "message": "Authentication is temporarily unavailable.",
            }
        },
    )


@app.exception_handler(InvalidCredentialsError)
async def handle_invalid_credentials(
    request: Request, exc: InvalidCredentialsError
) -> JSONResponse:
    del request, exc
    return JSONResponse(
        status_code=401,
        content={
            "error": {
                "code": "invalid_credentials",
                "message": "Invalid phone number or password.",
            }
        },
        headers={"WWW-Authenticate": "Session"},
    )


@app.exception_handler(AuthenticationRequiredError)
async def handle_authentication_required(
    request: Request, exc: AuthenticationRequiredError
) -> JSONResponse:
    del request, exc
    return JSONResponse(
        status_code=401,
        content={
            "error": {
                "code": "authentication_required",
                "message": "Authentication is required.",
            }
        },
        headers={"WWW-Authenticate": "Session"},
    )


@app.exception_handler(DuplicatePhoneNumberError)
async def handle_duplicate_phone(
    request: Request, exc: DuplicatePhoneNumberError
) -> JSONResponse:
    """Return a conflict without including submitted registration data."""
    del request, exc
    return JSONResponse(
        status_code=409,
        content={
            "error": {
                "code": "phone_number_already_registered",
                "message": "An account with this phone number already exists.",
            }
        },
    )


@app.exception_handler(SQLAlchemyError)
async def handle_unexpected_database_error(
    request: Request, exc: SQLAlchemyError
) -> JSONResponse:
    """Mask SQL, connection strings, and driver details from API responses."""
    del request, exc
    return JSONResponse(
        status_code=503,
        content={
            "error": {
                "code": "database_unavailable",
                "message": "The account service is temporarily unavailable.",
            }
        },
    )


@app.exception_handler(StarletteHTTPException)
async def handle_http_error(
    request: Request, exc: StarletteHTTPException
) -> JSONResponse:
    """Return predictable HTTP errors without exposing implementation details."""
    del request
    try:
        message = HTTPStatus(exc.status_code).phrase
    except ValueError:
        message = "The request could not be completed."

    return JSONResponse(
        status_code=exc.status_code,
        content={
            "error": {
                "code": f"http_{exc.status_code}",
                "message": message,
            }
        },
        headers=exc.headers,
    )


@app.exception_handler(RequestValidationError)
async def handle_validation_error(
    request: Request, exc: RequestValidationError
) -> JSONResponse:
    """Return a safe validation error without echoing submitted data."""
    del request, exc
    return JSONResponse(
        status_code=422,
        content={
            "error": {
                "code": "invalid_request",
                "message": "Request validation failed.",
            }
        },
    )


@app.exception_handler(Exception)
async def handle_unexpected_error(request: Request, exc: Exception) -> JSONResponse:
    """Hide internal exception details from API responses."""
    del request, exc
    return JSONResponse(
        status_code=500,
        content={
            "error": {
                "code": "internal_server_error",
                "message": "An unexpected error occurred.",
            }
        },
    )