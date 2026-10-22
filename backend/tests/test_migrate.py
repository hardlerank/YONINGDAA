"""Tests for the secure Alembic subprocess launcher."""

import os
import subprocess
import sys
import warnings
from urllib.parse import quote

from sqlalchemy.engine import make_url

from backend import migrate


def assert_not_exposed(secret: str, output: str, label: str) -> None:
    if secret and secret in output:
        raise AssertionError(f"{label} was exposed in launcher output")


def test_launcher_passes_rendered_url_only_to_child_environment(monkeypatch, capsys) -> None:
    password = "P@ss:/?#&%word"
    captured: dict[str, object] = {}
    original_database_url = os.environ.get("DATABASE_URL")

    monkeypatch.setattr(migrate.getpass, "getpass", lambda _prompt: password)

    def fake_run(command, **options):
        captured["command"] = command
        captured["cwd"] = options["cwd"]
        captured["database_url"] = options["env"]["DATABASE_URL"]
        return subprocess.CompletedProcess(
            command,
            0,
            f"migration output; password={password}; url={captured['database_url']}\n",
            f"warning password={password}; encoded={quote(password, safe='')}\n",
        )

    monkeypatch.setattr(migrate.subprocess, "run", fake_run)

    assert migrate.main() == 0

    parsed_url = make_url(captured["database_url"])
    if parsed_url.password != password:
        raise AssertionError("child DATABASE_URL did not preserve the prompted password")
    assert parsed_url.host == "aws-0-ap-southeast-2.pooler.supabase.com"
    assert parsed_url.port == 5432
    assert parsed_url.database == "postgres"
    assert parsed_url.username == "postgres.dydzwzioplblhxetjkbx"
    assert parsed_url.query["ssl"] == "require"
    assert captured["command"] == [
        sys.executable,
        "-m",
        "alembic",
        "-c",
        "backend/alembic.ini",
        "upgrade",
        "head",
    ]
    if os.environ.get("DATABASE_URL") != original_database_url:
        raise AssertionError("launcher modified the parent DATABASE_URL")

    output = capsys.readouterr()
    assert "migration output" in output.out
    assert "[REDACTED]" in output.out + output.err
    assert_not_exposed(password, output.out + output.err, "raw password")
    assert_not_exposed(quote(password, safe=""), output.out + output.err, "encoded password")
    assert_not_exposed(captured["database_url"], output.out + output.err, "database URL")


def test_launcher_suppresses_unexpected_exception_details_and_traceback(
    monkeypatch, capsys
) -> None:
    password = "Synthetic@Secret:/?#&%"
    database_url = migrate.build_database_url(password).render_as_string(
        hide_password=False
    )
    encoded_password = quote(password, safe="")

    monkeypatch.setattr(migrate.getpass, "getpass", lambda _prompt: password)

    def raise_unexpected_exception(*_args, **_kwargs):
        raise RuntimeError(
            f"unexpected failure: {password} {encoded_password} {database_url}"
        )

    monkeypatch.setattr(migrate.subprocess, "run", raise_unexpected_exception)

    assert migrate.main() == 1

    output = capsys.readouterr()
    combined_output = output.out + output.err
    assert "RuntimeError" in combined_output
    assert "details suppressed" in combined_output
    assert "Traceback" not in combined_output
    assert_not_exposed(password, combined_output, "raw password")
    assert_not_exposed(encoded_password, combined_output, "encoded password")
    assert_not_exposed(database_url, combined_output, "database URL")


def test_launcher_fails_closed_if_hidden_prompt_is_unavailable(monkeypatch, capsys) -> None:
    password = "Synthetic@Secret:/?#&%"

    def warn_about_visible_input(_prompt: str) -> str:
        warnings.warn(password, migrate.getpass.GetPassWarning, stacklevel=2)
        return password

    def fail_if_launched(*_args, **_kwargs):
        raise AssertionError("Alembic must not launch when secure input is unavailable")

    monkeypatch.setattr(migrate.getpass, "getpass", warn_about_visible_input)
    monkeypatch.setattr(migrate.subprocess, "run", fail_if_launched)

    assert migrate.main() == 1

    output = capsys.readouterr()
    combined_output = output.out + output.err
    assert "GetPassWarning" in combined_output
    assert "Traceback" not in combined_output
    assert_not_exposed(password, combined_output, "password prompt warning")
