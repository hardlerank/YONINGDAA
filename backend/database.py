"""Optional SQLAlchemy engine preparation for PostgreSQL."""

from collections.abc import AsyncIterator

from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.ext.asyncio import (
    AsyncEngine,
    AsyncSession,
    async_sessionmaker,
    create_async_engine,
)

from backend.config import get_settings


_database_engine: AsyncEngine | None = None


class DatabaseUnavailableError(Exception):
    """Raised when database-backed functionality is not available."""


class DuplicatePhoneNumberError(Exception):
    """Raised when a normalized phone number already has an account."""


def get_database_engine() -> AsyncEngine | None:
    """Create an engine only when configured; this does not connect to the DB."""
    global _database_engine
    if _database_engine is not None:
        return _database_engine

    database_url = get_settings().database_url
    if database_url is None:
        return None

    _database_engine = create_async_engine(database_url, pool_pre_ping=True)
    return _database_engine


async def get_db_session() -> AsyncIterator[AsyncSession]:
    """Yield one request-scoped session and hide connection details on failure."""
    engine = get_database_engine()
    if engine is None:
        raise DatabaseUnavailableError

    session_factory = async_sessionmaker(engine, expire_on_commit=False)
    try:
        async with session_factory() as session:
            yield session
    except SQLAlchemyError:
        raise DatabaseUnavailableError from None


async def dispose_database_engine() -> None:
    """Dispose the optional engine during application shutdown."""
    global _database_engine
    engine = _database_engine
    if engine is not None:
        await engine.dispose()
        _database_engine = None