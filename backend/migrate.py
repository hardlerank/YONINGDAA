"""Launch Alembic with a hidden-password Supabase Session Pooler URL."""

from __future__ import annotations

import getpass
import os
import re
import subprocess
import sys
import warnings
from pathlib import Path
from urllib.parse import quote

from sqlalchemy.engine import URL


POOLER_HOST = "aws-0-ap-southeast-2.pooler.supabase.com"
POOLER_USERNAME = "postgres.dydzwzioplblhxetjkbx"
DATABASE_NAME = "postgres"
REPOSITORY_ROOT = Path(__file__).resolve().parent.parent


def build_database_url(password: str) -> URL:
    """Build a SQLAlchemy URL from the unencoded password exactly once."""
    return URL.create(
        "postgresql+asyncpg",
        username=POOLER_USERNAME,
        password=password,
        host=POOLER_HOST,
        port=5432,
        database=DATABASE_NAME,
        query={"ssl": "require"},
    )


def redact_output(output: str, password: str, database_url: str) -> str:
    """Prevent credentials or connection URLs in Alembic output from surfacing."""
    redacted = output.replace(database_url, "[REDACTED DATABASE URL]")
    redacted = redacted.replace(password, "[REDACTED]")
    redacted = redacted.replace(quote(password, safe=""), "[REDACTED]")
    return re.sub(
        r"(?i)postgres(?:ql)?(?:\+\w+)?://\S+",
        "[REDACTED DATABASE URL]",
        redacted,
    )


def main() -> int:
    """Prompt for a password and run the reviewed Alembic upgrade."""
    password = ""
    database_url = ""
    child_environment: dict[str, str] | None = None
    try:
        # Fail closed if getpass cannot disable terminal echo.
        with warnings.catch_warnings():
            warnings.simplefilter("error", getpass.GetPassWarning)
            password = getpass.getpass("Supabase Session Pooler database password: ")
        if not password:
            print("Migration not started: an empty password was provided.", file=sys.stderr)
            return 2

        url = build_database_url(password)
        database_url = url.render_as_string(hide_password=False)
        child_environment = os.environ.copy()
        child_environment["DATABASE_URL"] = database_url
        command = [
            sys.executable,
            "-m",
            "alembic",
            "-c",
            "backend/alembic.ini",
            "upgrade",
            "head",
        ]
        result = subprocess.run(
            command,
            cwd=REPOSITORY_ROOT,
            env=child_environment,
            capture_output=True,
            text=True,
            check=False,
        )
        stdout = redact_output(result.stdout, password, database_url)
        stderr = redact_output(result.stderr, password, database_url)
        if stdout:
            print(stdout, end="")
        if stderr:
            print(stderr, end="", file=sys.stderr)
        return result.returncode
    except KeyboardInterrupt:
        print("Migration launcher interrupted; details suppressed.", file=sys.stderr)
        return 130
    except SystemExit:
        print("Migration launcher stopped; details suppressed.", file=sys.stderr)
        return 1
    except Exception as exc:
        # Do not display exception text or traceback: it may contain credentials.
        print(
            f"Migration launcher failed ({type(exc).__name__}); details suppressed.",
            file=sys.stderr,
        )
        return 1
    finally:
        if child_environment is not None:
            child_environment.pop("DATABASE_URL", None)
        password = ""
        database_url = ""


if __name__ == "__main__":
    raise SystemExit(main())