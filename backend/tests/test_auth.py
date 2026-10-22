"""Cookie-session authentication tests isolated to temporary SQLite databases."""

import asyncio
import secrets
from collections.abc import Iterator
from datetime import datetime, timedelta, timezone
from pathlib import Path

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from sqlalchemy.pool import NullPool

from backend.config import get_settings
from backend.database import get_db_session
from backend.main import app
from backend.models import Base, User, UserSession
from backend.security import CSRF_COOKIE_NAME, SESSION_COOKIE_NAME, hash_session_token


@pytest.fixture
def auth_client(
    tmp_path: Path, monkeypatch: pytest.MonkeyPatch
) -> Iterator[tuple[TestClient, async_sessionmaker[AsyncSession]]]:
    """Provide a fresh test database and test-only session secret per case."""
    monkeypatch.setenv("SESSION_SECRET", secrets.token_urlsafe(48))
    monkeypatch.setenv("SESSION_COOKIE_SECURE", "true")
    monkeypatch.setenv("SESSION_COOKIE_SAMESITE", "lax")
    get_settings.cache_clear()

    database_path = tmp_path / "auth-tests.sqlite3"
    engine = create_async_engine(
        f"sqlite+aiosqlite:///{database_path}",
        poolclass=NullPool,
    )

    async def create_schema() -> None:
        async with engine.begin() as connection:
            await connection.run_sync(Base.metadata.create_all)

    asyncio.run(create_schema())
    session_factory = async_sessionmaker(engine, expire_on_commit=False)

    async def override_session() -> Iterator[AsyncSession]:
        async with session_factory() as session:
            yield session

    app.dependency_overrides[get_db_session] = override_session
    try:
        with TestClient(
            app,
            base_url="https://testserver",
            raise_server_exceptions=False,
        ) as client:
            yield client, session_factory
    finally:
        app.dependency_overrides.pop(get_db_session, None)
        get_settings.cache_clear()
        asyncio.run(engine.dispose())


def registration_payload() -> dict[str, str]:
    return {
        "display_name": "Test User",
        "phone_number": "+998901234567",
        "password": "ExampleStrongPassword123",
    }


def csrf_header(client: TestClient) -> dict[str, str]:
    response = client.get("/api/auth/csrf")
    assert response.status_code == 200
    assert response.headers["cache-control"] == "no-store"
    return {"X-CSRF-Token": response.json()["csrf_token"]}


def register_user(client: TestClient) -> dict[str, object]:
    response = client.post("/api/auth/register", json=registration_payload())
    assert response.status_code == 201
    return response.json()


def login_user(client: TestClient) -> tuple[object, dict[str, str]]:
    headers = csrf_header(client)
    response = client.post(
        "/api/auth/login",
        json={
            "phone_number": "+998 (90) 123-45-67",
            "password": "ExampleStrongPassword123",
        },
        headers=headers,
    )
    return response, headers


def test_successful_login_sets_secure_session_cookie_and_hashed_record(auth_client) -> None:
    client, session_factory = auth_client
    user_data = register_user(client)

    response, _ = login_user(client)

    assert response.status_code == 200
    assert response.json() == user_data
    assert response.headers["cache-control"] == "no-store"
    assert "password" not in response.text.lower()
    assert "password_hash" not in response.text
    assert "session_id" not in response.text

    session_cookie = client.cookies.get(SESSION_COOKIE_NAME)
    assert session_cookie
    set_cookie = response.headers.get("set-cookie", "").lower()
    assert "httponly" in set_cookie
    assert "secure" in set_cookie
    assert "samesite=lax" in set_cookie
    assert "path=/api/auth" in set_cookie
    assert "domain=" not in set_cookie
    assert "max-age=" in set_cookie
    assert "expires=" in set_cookie

    async def load_session() -> UserSession | None:
        async with session_factory() as session:
            return await session.scalar(select(UserSession))

    stored_session = asyncio.run(load_session())
    assert stored_session is not None
    assert stored_session.token_hash == hash_session_token(session_cookie)
    assert stored_session.token_hash != session_cookie
    assert len(stored_session.token_hash) == 64
    assert stored_session.revoked_at is None


def test_wrong_password_and_unknown_phone_return_same_generic_error(auth_client) -> None:
    client, _ = auth_client
    register_user(client)
    headers = csrf_header(client)

    wrong_password = client.post(
        "/api/auth/login",
        json={"phone_number": "+998901234567", "password": "IncorrectPassword123"},
        headers=headers,
    )
    unknown_phone = client.post(
        "/api/auth/login",
        json={"phone_number": "+998911112233", "password": "IncorrectPassword123"},
        headers=headers,
    )

    assert wrong_password.status_code == unknown_phone.status_code == 401
    assert wrong_password.json() == unknown_phone.json() == {
        "error": {
            "code": "invalid_credentials",
            "message": "Invalid phone number or password.",
        }
    }
    assert SESSION_COOKIE_NAME not in client.cookies


def test_inactive_account_cannot_log_in(auth_client) -> None:
    client, session_factory = auth_client
    user_data = register_user(client)

    async def deactivate_user() -> None:
        async with session_factory() as session:
            user = await session.get(User, user_data["id"])
            assert user is not None
            user.is_active = False
            await session.commit()

    asyncio.run(deactivate_user())
    headers = csrf_header(client)
    response = client.post(
        "/api/auth/login",
        json={
            "phone_number": "+998901234567",
            "password": "ExampleStrongPassword123",
        },
        headers=headers,
    )

    assert response.status_code == 401
    assert response.json()["error"]["code"] == "invalid_credentials"
    assert SESSION_COOKIE_NAME not in client.cookies


def test_authenticated_me_returns_only_own_safe_profile(auth_client) -> None:
    client, _ = auth_client
    user_data = register_user(client)
    login_response, _ = login_user(client)
    assert login_response.status_code == 200

    response = client.get("/api/auth/me")

    assert response.status_code == 200
    assert response.json() == user_data
    assert response.headers["cache-control"] == "no-store"
    assert set(response.json()) == {
        "id",
        "display_name",
        "phone_number",
        "gender",
        "is_active",
    }
    assert "password" not in response.text.lower()
    assert "session" not in response.text.lower()
    assert "questionnaire" not in response.text.lower()


def test_me_rejects_unauthenticated_requests(auth_client) -> None:
    client, _ = auth_client

    response = client.get("/api/auth/me")

    assert response.status_code == 401
    assert response.json()["error"]["code"] == "authentication_required"


def test_logout_revokes_session_and_clears_cookies(auth_client) -> None:
    client, session_factory = auth_client
    user_data = register_user(client)
    login_response, headers = login_user(client)
    assert login_response.status_code == 200
    raw_session_token = client.cookies.get(SESSION_COOKIE_NAME)
    assert raw_session_token

    response = client.post("/api/auth/logout", headers=headers)

    assert response.status_code == 200
    assert response.json() == {"status": "logged_out"}
    assert SESSION_COOKIE_NAME not in client.cookies
    assert CSRF_COOKIE_NAME not in client.cookies
    assert "max-age=0" in response.headers.get("set-cookie", "").lower()
    assert client.get("/api/auth/me").status_code == 401

    # Clearing the browser cookie alone is insufficient: replaying the old value
    # must also fail because the database record has been revoked.
    stale_cookie_response = client.get(
        "/api/auth/me",
        headers={"Cookie": f"{SESSION_COOKIE_NAME}={raw_session_token}"},
    )
    assert stale_cookie_response.status_code == 401

    async def load_session() -> UserSession | None:
        async with session_factory() as session:
            return await session.scalar(select(UserSession))

    stored_session = asyncio.run(load_session())
    assert stored_session is not None
    assert stored_session.user_id == user_data["id"]
    assert stored_session.revoked_at is not None


def test_login_and_logout_require_csrf_token(auth_client) -> None:
    client, _ = auth_client
    register_user(client)
    credentials = {
        "phone_number": "+998901234567",
        "password": "ExampleStrongPassword123",
    }

    login_response = client.post("/api/auth/login", json=credentials)
    logout_response = client.post("/api/auth/logout")

    assert login_response.status_code == 403
    assert logout_response.status_code == 403


def test_csrf_endpoint_requires_a_real_session_secret(auth_client, monkeypatch) -> None:
    client, _ = auth_client
    monkeypatch.setenv("SESSION_SECRET", "REPLACE_ME")
    get_settings.cache_clear()

    response = client.get("/api/auth/csrf")

    assert response.status_code == 503
    assert response.json() == {
        "error": {
            "code": "authentication_unavailable",
            "message": "Authentication is temporarily unavailable.",
        }
    }


def test_expired_session_is_not_authenticated(auth_client) -> None:
    client, session_factory = auth_client
    register_user(client)
    login_response, _ = login_user(client)
    assert login_response.status_code == 200

    async def expire_session() -> None:
        async with session_factory() as session:
            user_session = await session.scalar(select(UserSession))
            assert user_session is not None
            user_session.expires_at = datetime.now(timezone.utc) - timedelta(minutes=1)
            await session.commit()

    asyncio.run(expire_session())
    assert client.get("/api/auth/me").status_code == 401
