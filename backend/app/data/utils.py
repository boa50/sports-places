from typing import TypedDict
import os


class TrustedMessage(TypedDict):
    trusted: bool


def check_trusted_url(url: str) -> TrustedMessage:
    trusted_domains = os.environ.get("TRUSTED_EXTERNAL_DOMAINS")
    print(trusted_domains)

    if trusted_domains is not None:
        for domain in trusted_domains.split(" "):
            if domain in url:
                return {"trusted": True}

    return {"trusted": False}
