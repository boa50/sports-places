import os

trusted_domains = os.environ.get("TRUSTED_EXTERNAL_DOMAINS")


def check_trusted_url(url: str):
    if trusted_domains is not None:
        for domain in trusted_domains.split(" "):
            if domain in url:
                return {"trusted": True}

    return {"trusted": False}
