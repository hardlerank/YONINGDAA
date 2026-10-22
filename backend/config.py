"""Environment-based configuration for the YONINGDA API."""

from functools import lru_cache
from pathlib import Path
from typing import Literal
from urllib.parse import urlsplit

from pydantic import Field, SecretStr, field_validator, model_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Settings loaded from environment variables and backend/.env."""

    model_config = SettingsConfigDict(
        env_file=Path(__file__).with_name(".env"),
        env_file_encoding="utf-8",
        env_ignore_empty=True,
        extra="ignore",
    )

    frontend_origins: str = ""
    database_url: str | None = None
    session_secret: SecretStr | None = None
    session_ttl_minutes: int = Field(default=720, ge=5, le=43200)
    session_cookie_secure: bool = True
    session_cookie_samesite: Literal["lax", "strict", "none"] = "lax"

    @field_validator("frontend_origins")
    @classmethod
    def validate_frontend_origins(cls, value: str) -> str:
        """Accept only explicit origins; plain HTTP is limited to loopback."""
        origins: list[str] = []
        for candidate in value.split(","):
            origin = candidate.strip().rstrip("/")
            if not origin:
                continue

            parsed = urlsplit(origin)
            hostname = parsed.hostname
            if (
                parsed.scheme not in {"http", "https"}
                or not hostname
                or parsed.path
                or parsed.query
                or parsed.fragment
                or parsed.username
                or parsed.password
            ):
                raise ValueError(
                    "FRONTEND_ORIGINS must contain explicit HTTP(S) origins "
                    "without paths or credentials."
                )

            if parsed.scheme == "http" and hostname.lower() not in {
                "localhost",
                "127.0.0.1",
                "::1",
            }:
                raise ValueError(
                    "Non-local frontend origins must use HTTPS."
                )

            # Accessing .port also validates malformed/out-of-range ports.
            _ = parsed.port
            origins.append(origin)

        return ",".join(origins)

    @property
    def cors_origins(self) -> list[str]:
        """Return the configured allowlist as exact origins."""
        return [origin for origin in self.frontend_origins.split(",") if origin]

    @field_validator("database_url", mode="before")
    @classmethod
    def normalize_database_url(cls, value: object) -> str | None:
        """Normalize PostgreSQL URLs to the installed asyncpg SQLAlchemy driver."""
        if value is None or not str(value).strip():
            return None

        url = str(value).strip()
        if url.startswith("postgres://"):
            return "postgresql+asyncpg://" + url.removeprefix("postgres://")
        if url.startswith("postgresql://"):
            return "postgresql+asyncpg://" + url.removeprefix("postgresql://")
        if url.startswith("postgresql+asyncpg://"):
            return url

        raise ValueError("DATABASE_URL must use a PostgreSQL URL.")

    @model_validator(mode="after")
    def validate_session_cookie_settings(self) -> "Settings":
        if self.session_cookie_samesite == "none" and not self.session_cookie_secure:
            raise ValueError("SameSite=None cookies require SESSION_COOKIE_SECURE=true.")
        return self


@lru_cache(maxsize=1)
def get_settings() -> Settings:
    """Return process-wide settings without logging their values."""
    return Settings()