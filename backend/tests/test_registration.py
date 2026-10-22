"""Registration API tests using an isolated temporary SQLite database."""

import asyncio
from collections.abc import Iterator
from pathlib import Path

import pytest
from argon2 import PasswordHasher
from fastapi.testclient import TestClient
from pydantic import ValidationError
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from sqlalchemy.exc import OperationalError
from sqlalchemy.pool import NullPool

from backend.database import get_db_session
from backend.config import Settings
from backend.main import app
from backend.models import Base, User


@pytest.fixture
def api_client(tmp_path: Path) -> Iterator[tuple[TestClient, async_sessionmaker[AsyncSession]]]:
    """Provide an API client backed by a fresh, file-isolated test database."""
    database_path = tmp_path / "registration-tests.sqlite3"
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
        with TestClient(app, raise_server_exceptions=False) as client:
            yield client, session_factory
    finally:
        app.dependency_overrides.clear()
        asyncio.run(engine.dispose())


def valid_payload(**overrides: str) -> dict[str, str]:
    payload = {
        "display_name": "Test User",
        "phone_number": "+998901234567",
        "password": "ExampleStrongPassword123",
    }
    payload.update(overrides)
    return payload


def test_cors_configuration_requires_explicit_secure_origins() -> None:
    settings = Settings(
        frontend_origins="https://support.example.org,http://localhost:5500"
    )
    assert settings.cors_origins == [
        "https://support.example.org",
        "http://localhost:5500",
    ]

    with pytest.raises(ValidationError):
        Settings(frontend_origins="*")
    with pytest.raises(ValidationError):
        Settings(frontend_origins="http://support.example.org")


def test_health_endpoint_does_not_require_database(api_client) -> None:
    client, _ = api_client

    response = client.get("/api/health")

    assert response.status_code == 200
    assert response.json() == {"status": "healthy", "project": "YONINGDA"}


def test_successful_registration_returns_only_safe_fields(api_client) -> None:
    client, _ = api_client
    password = "ExampleStrongPassword123"

    response = client.post("/api/auth/register", json=valid_payload(password=password))

    assert response.status_code == 201
    assert response.json() == {
        "id": 1,
        "display_name": "Test User",
        "phone_number": "+998901234567",
        "gender": None,
        "is_active": True,
    }
    assert password not in response.text
    assert "password_hash" not in response.json()


@pytest.mark.parametrize(
    "overrides",
    [
        {"display_name": " "},
        {"phone_number": "+12025550123"},
        {"password": "short"},
        {"password": "            "},
        {"unexpected": "field"},
    ],
)
def test_invalid_registration_input_is_rejected(api_client, overrides) -> None:
    client, _ = api_client

    response = client.post("/api/auth/register", json=valid_payload(**overrides))

    assert response.status_code == 422
    assert response.json() == {
        "error": {
            "code": "invalid_request",
            "message": "Request validation failed.",
        }
    }


def test_phone_is_normalized_and_duplicates_are_rejected(api_client) -> None:
    client, _ = api_client
    first = client.post("/api/auth/register", json=valid_payload())
    duplicate = client.post(
        "/api/auth/register",
        json=valid_payload(phone_number="998 (90) 123-45-67"),
    )

    assert first.status_code == 201
    assert duplicate.status_code == 409
    assert duplicate.json()["error"]["code"] == "phone_number_already_registered"


def test_database_stores_argon2id_hash_not_plaintext(api_client) -> None:
    client, session_factory = api_client
    password = "ExampleStrongPassword123"
    response = client.post("/api/auth/register", json=valid_payload(password=password))
    assert response.status_code == 201

    async def load_user() -> User | None:
        async with session_factory() as session:
            return await session.scalar(select(User))

    stored_user = asyncio.run(load_user())

    assert stored_user is not None
    assert stored_user.password_hash != password
    assert stored_user.password_hash.startswith("$argon2id$")
    assert PasswordHasher().verify(stored_user.password_hash, password)


def test_database_errors_return_safe_response(api_client) -> None:
    client, _ = api_client

    async def failed_session() -> Iterator[AsyncSession]:
        raise OperationalError(
            "connect",
            {},
            RuntimeError("private connection detail must not be returned"),
        )
        yield  # Make this an async-generator dependency.

    app.dependency_overrides[get_db_session] = failed_session
    response = client.post("/api/auth/register", json=valid_payload())

    assert response.status_code == 503
    assert response.json() == {
        "error": {
            "code": "database_unavailable",
            "message": "The account service is temporarily unavailable.",
        }
    }
    assert "private connection detail" not in response.text