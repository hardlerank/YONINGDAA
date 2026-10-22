"""Pydantic request and response schemas for account registration."""

import re
import unicodedata
from typing import Any

from pydantic import BaseModel, ConfigDict, Field, field_validator


_PHONE_SEPARATORS = re.compile(r"[\s().-]")


def normalize_phone_number(value: Any) -> str:
    """Normalize Uzbek local or international input to +998XXXXXXXXX."""
    if not isinstance(value, str):
        raise ValueError("Enter a valid Uzbekistan phone number.")

    compact = _PHONE_SEPARATORS.sub("", value.strip())
    if len(compact) > 32:
        raise ValueError("Enter a valid Uzbekistan phone number.")
    if compact.startswith("00"):
        compact = "+" + compact[2:]

    if compact.startswith("+998"):
        subscriber_number = compact[4:]
    elif compact.startswith("998"):
        subscriber_number = compact[3:]
    elif len(compact) == 9:
        subscriber_number = compact
    else:
        raise ValueError("Enter a valid Uzbekistan phone number.")

    if len(subscriber_number) != 9 or not subscriber_number.isascii() or not subscriber_number.isdigit():
        raise ValueError("Enter a valid Uzbekistan phone number.")

    return f"+998{subscriber_number}"


class RegistrationRequest(BaseModel):
    """Only the minimum information needed to create an account."""

    model_config = ConfigDict(extra="forbid")

    display_name: str = Field(min_length=2, max_length=80)
    phone_number: str
    password: str = Field(min_length=12, max_length=128, repr=False)

    @field_validator("display_name", mode="before")
    @classmethod
    def clean_display_name(cls, value: Any) -> str:
        if not isinstance(value, str):
            raise ValueError("Enter a valid display name.")
        display_name = value.strip()
        if any(unicodedata.category(character) == "Cc" for character in display_name):
            raise ValueError("Enter a valid display name.")
        return display_name

    @field_validator("phone_number", mode="before")
    @classmethod
    def clean_phone_number(cls, value: Any) -> str:
        return normalize_phone_number(value)

    @field_validator("password")
    @classmethod
    def reject_blank_password(cls, value: str) -> str:
        if value.isspace():
            raise ValueError("Password must include non-whitespace characters.")
        return value


class LoginRequest(BaseModel):
    """Credentials accepted for an existing account only."""

    model_config = ConfigDict(extra="forbid")

    phone_number: str
    password: str = Field(max_length=128, repr=False)

    @field_validator("phone_number", mode="before")
    @classmethod
    def clean_phone_number(cls, value: Any) -> str:
        return normalize_phone_number(value)


class UserResponse(BaseModel):
    """Safe account fields; credentials and timestamps are not serialized."""

    model_config = ConfigDict(from_attributes=True)

    id: int
    display_name: str
    phone_number: str
    gender: str | None
    is_active: bool