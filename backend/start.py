"""Run the API on the port and interface expected by Python hosts."""

import os

import uvicorn


def main() -> None:
    """Start the ASGI application, honoring the host-provided PORT."""
    port_value = os.environ.get("PORT", "8000")
    try:
        port = int(port_value)
    except ValueError as exc:
        raise SystemExit("PORT must be an integer between 1 and 65535.") from exc

    if not 1 <= port <= 65535:
        raise SystemExit("PORT must be an integer between 1 and 65535.")

    uvicorn.run("backend.main:app", host="0.0.0.0", port=port)


if __name__ == "__main__":
    main()
