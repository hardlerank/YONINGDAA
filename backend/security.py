"""Password, session-token, and CSRF cryptographic helpers."""

import base64
import hashlib
import hmac
import secrets

from argon2 import PasswordHasher
from argon2.exceptions import VerificationError

from backend.config import get_settings


_password_hasher = PasswordHasher()
SESSION_COOKIE_NAME = "yoningda_session"
CSRF_COOKIE_NAME = "yoningda_csrf"


class AuthConfigurationError(Exception):
    """Raised when required authentication secrets are not configured safely."""


class InvalidCredentialsError(Exception):
    """Raised for any unknown, incorrect, or inactive login account."""


class AuthenticationRequiredError(Exception):
    """Raised when a request has no valid authenticated session."""


def _session_secret() -> bytes:
    configured_secret = get_settings().session_secret
    if configured_secret is None:
        raise AuthConfigurationError

    secret = configured_secret.get_secret_value().encode("utf-8")
    if len(secret) < 32:
        raise AuthConfigurationError
    return secret


def hash_password(password: str) -> str:
    """Return an Argon2id hash; callers must never log the input password."""
    return _password_hasher.hash(password)


def verify_password(password: str, stored_hash: str | None) -> bool:
    """Verify credentials while doing comparable Argon2 work for unknown users."""
    if stored_hash is None:
        _password_hasher.hash(password)
        return False

    try:
        return _password_hasher.verify(stored_hash, password)
    except VerificationError:
        return False


def create_session_token() -> str:
    """Create an unpredictable opaque identifier for an HttpOnly cookie."""
    return secrets.token_urlsafe(32)


def hash_session_token(token: str) -> str:
    """Return a keyed SHA-256 verifier suitable for database storage."""
    return hmac.new(_session_secret(), token.encode("utf-8"), hashlib.sha256).hexdigest()


def create_csrf_token() -> str:
    """Create a signed double-submit token for cookie-authenticated POSTs."""
    nonce = secrets.token_urlsafe(32)
    signature = hmac.new(_session_secret(), nonce.encode("ascii"), hashlib.sha256).digest()
    encoded_signature = base64.urlsafe_b64encode(signature).rstrip(b"=").decode("ascii")
    return f"{nonce}.{encoded_signature}"


def verify_csrf_token(cookie_token: str | None, header_token: str | None) -> bool:
    """Validate matching cookie/header tokens and their server-side signature."""
    if not cookie_token or not header_token or len(cookie_token) > 256:
        return False
    if not hmac.compare_digest(cookie_token, header_token):
        return False

    try:
        nonce, supplied_signature = cookie_token.split(".", maxsplit=1)
        expected_signature = base64.urlsafe_b64encode(
            hmac.new(_session_secret(), nonce.encode("ascii"), hashlib.sha256).digest()
        ).rstrip(b"=").decode("ascii")
    except (UnicodeEncodeError, ValueError):
        return False

    return hmac.compare_digest(supplied_signature, expected_signature)