"""Tests for the platform-port ASGI launcher."""

import pytest

from backend import start


def test_launcher_uses_host_port_and_public_interface(monkeypatch: pytest.MonkeyPatch) -> None:
    called: dict[str, object] = {}

    def capture_run(application: str, **options: object) -> None:
        called["application"] = application
        called.update(options)

    monkeypatch.setenv("PORT", "18432")
    monkeypatch.setattr(start.uvicorn, "run", capture_run)

    start.main()

    assert called == {
        "application": "backend.main:app",
        "host": "0.0.0.0",
        "port": 18432,
    }


def test_launcher_defaults_to_local_port_when_host_port_is_absent(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    called: dict[str, object] = {}
    monkeypatch.delenv("PORT", raising=False)
    monkeypatch.setattr(
        start.uvicorn,
        "run",
        lambda application, **options: called.update(
            application=application, **options
        ),
    )

    start.main()

    assert called["port"] == 8000


@pytest.mark.parametrize("port_value", ["invalid", "0", "65536"])
def test_launcher_rejects_invalid_host_port(
    monkeypatch: pytest.MonkeyPatch, port_value: str
) -> None:
    monkeypatch.setenv("PORT", port_value)

    with pytest.raises(SystemExit, match="PORT must be an integer"):
        start.main()
