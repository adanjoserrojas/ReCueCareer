import os
import re
import json
import base64
from typing import List, Optional, Tuple
from urllib.parse import urlparse, parse_qsl, urlencode, urlunparse

from bs4 import BeautifulSoup
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build


# =========================
# CONFIG (edit these)
# =========================
SCOPES = ["https://www.googleapis.com/auth/gmail.readonly"]

SENDER_EMAIL = "noreply@swelist.com"
SUBJECT_KEYWORD = "New Internships Posted Today"
LOOKBACK_DAYS = 3
MAX_RESULTS = 10


# Use paths relative to THIS file, not the working directory
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
CREDENTIALS_PATH = os.path.join(SCRIPT_DIR, "credentials.json")
TOKEN_PATH = os.path.join(SCRIPT_DIR, "token.json")
OUTPUT_JSON_PATH = os.path.join(SCRIPT_DIR, "extracted_links.json")


def activate_gmail_api():
    """
    Local prototype OAuth flow:
    - credentials.json: OAuth client secrets (Desktop)
    - token.json: stored user token for future runs
    """
    creds = None

    if os.path.exists(TOKEN_PATH):
        creds = Credentials.from_authorized_user_file(TOKEN_PATH, SCOPES)

    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            if not os.path.exists(CREDENTIALS_PATH):
                raise FileNotFoundError(
                    f"Missing credentials.json at: {CREDENTIALS_PATH}\n"
                    "Download OAuth client credentials and place it next to this script."
                )
            flow = InstalledAppFlow.from_client_secrets_file(CREDENTIALS_PATH, SCOPES)
            creds = flow.run_local_server(port=0)

        with open(TOKEN_PATH, "w", encoding="utf-8") as f:
            f.write(creds.to_json())

    return build("gmail", "v1", credentials=creds)


def list_messages(service, user_id: str, query: str, max_results: int = 10) -> List[dict]:
    res = (
        service.users()
        .messages()
        .list(userId=user_id, q=query, maxResults=max_results)
        .execute()
    )
    return res.get("messages", [])


def get_mail_data(service, user_id: str, msg_id: str) -> dict:
    return (
        service.users()
        .messages()
        .get(userId=user_id, id=msg_id, format="full")
        .execute()
    )


def _decode_b64url(data: str) -> str:
    return base64.urlsafe_b64decode(data.encode("utf-8")).decode("utf-8", errors="replace")


def _extract_headers(msg: dict) -> dict:
    headers = msg.get("payload", {}).get("headers", [])
    out = {}
    for h in headers:
        name = (h.get("name") or "").lower()
        out[name] = h.get("value") or ""
    return out


def parse_email_content(msg: dict) -> Tuple[str, str]:
    """
    Walks Gmail multipart payload recursively to collect:
    - text/plain
    - text/html
    """
    payload = msg.get("payload", {})
    text_parts: List[str] = []
    html_parts: List[str] = []

    def walk(part: dict):
        mime = part.get("mimeType", "")
        body = part.get("body", {})
        data = body.get("data")

        if data and mime in ("text/plain", "text/html"):
            decoded = _decode_b64url(data)
            if mime == "text/plain":
                text_parts.append(decoded)
            else:
                html_parts.append(decoded)

        for child in part.get("parts", []) or []:
            walk(child)

    walk(payload)
    return ("\n".join(text_parts).strip(), "\n".join(html_parts).strip())


def extract_links(text: str, html: str) -> List[str]:
    urls: List[str] = []

    if html:
        soup = BeautifulSoup(html, "lxml")
        for a in soup.find_all("a", href=True):
            href = a["href"].strip()
            if href:
                urls.append(href)

    if text:
        # basic URL detector
        urls.extend(re.findall(r"(https?://[^\s<>()\"']+)", text))

    # Deduplicate while preserving order
    seen = set()
    out = []
    for u in urls:
        if u not in seen:
            seen.add(u)
            out.append(u)
    return out


def normalize_url(url: str) -> str:
    """
    Normalize for dedupe:
    - lower scheme/host
    - strip common tracking params
    """
    try:
        p = urlparse(url)
        scheme = (p.scheme or "https").lower()
        netloc = p.netloc.lower()
        path = p.path or "/"

        drop = {
            "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content",
            "gclid", "fbclid", "mc_cid", "mc_eid"
        }
        q = [(k, v) for (k, v) in parse_qsl(p.query, keep_blank_values=True) if k not in drop]
        query = urlencode(q, doseq=True)

        return urlunparse((scheme, netloc, path, "", query, p.fragment))
    except Exception:
        return url


def build_query(sender: str, lookback_days: int) -> str:
    # Use a general subject contains filter, regex will enforce exact structure later.
    return f'from:{sender} subject:"New Internships Posted Today" newer_than:{lookback_days}d'


def find_target_message(service, user_id: str, message_refs: List[dict]) -> Optional[dict]:
    """
    Iterate candidates (newest first), pick the first with:
    - sender email contained in From header
    - subject matches regex: [Number] New Internships Posted Today
    """
    for ref in message_refs:
        msg = get_mail_data(service, user_id, ref["id"])
        headers = _extract_headers(msg)

        subject = headers.get("subject", "")
        from_header = headers.get("from", "")

        print("Candidate:", subject)


        if SENDER_EMAIL not in from_header:
            continue

        if SUBJECT_KEYWORD in subject:
            return msg

    return None


def main():
    service = activate_gmail_api()
    user_id = "me"

    query = build_query(SENDER_EMAIL, LOOKBACK_DAYS)
    candidates = list_messages(service, user_id, query=query, max_results=MAX_RESULTS)

    if not candidates:
        print(f"No candidates found. Query used: {query}")
        return

    msg = find_target_message(service, user_id, candidates)

    # This is killing the program before processing any links
    if not msg:
        print("Found candidates, but none matched the strict subject regex.")
        print("Try increasing LOOKBACK_DAYS or MAX_RESULTS.")
        return

    headers = _extract_headers(msg)
    text, html = parse_email_content(msg)

    raw_links = extract_links(text, html)
    normalized = [normalize_url(u) for u in raw_links]

    # Dedupe after normalization
    final_links = []
    seen = set()
    for u in normalized:
        if u not in seen:
            seen.add(u)
            final_links.append(u)

    print("=== Matched Email ===")
    print("Subject:", headers.get("subject", ""))
    print("From:", headers.get("from", ""))
    print("Date:", headers.get("date", ""))
    print("Message ID:", msg.get("id", ""))
    print("\n=== Links Found ===")
    for i, link in enumerate(final_links, 1):
        print(f"{i}. {link}")

    # Save output
    out = {
        "gmail_message_id": msg.get("id", ""),
        "subject": headers.get("subject", ""),
        "from": headers.get("from", ""),
        "date": headers.get("date", ""),
        "query": query,
        "links": final_links,
    }
    with open(OUTPUT_JSON_PATH, "w", encoding="utf-8") as f:
        json.dump(out, f, indent=2)

    print(f"\nSaved JSON: {OUTPUT_JSON_PATH}")


if __name__ == "__main__":
    main()
