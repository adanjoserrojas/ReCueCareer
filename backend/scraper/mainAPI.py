import re
import json
import requests
from bs4 import BeautifulSoup
from urllib.parse import urlparse
from sentence_transformers import SentenceTransformer, util
'''from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options'''

KEYHEADERS = [
    "Basic Qualifications", "Required Qualifications", "Requirements", 
    "Prerequisites", "What we’re looking for", "Position Consideration Requirements", 
    "Required Skills", "Skills", "Skill Set", "Qualifications"
]
HEADER_TAGS = ("h2","h3","strong","b")  # tags that might label sections
RE_STEMS = re.compile(r"(qualif|requir|responsib|duti|posit)", re.I) # 2) regex stem matcher

# ——————————————————————————————
# 1) Per‐site extractors (Option 1)
# ——————————————————————————————

def extract_linkedin(url):
    """
    LinkedIn guest‐API extractor.
    Drop your existing LinkedIn logic here (e.g. guest API call or JSON-LD).
    """
    # Example: pull job ID and hit LinkedIn’s guest API
    m = re.search(r'/jobs/view/([0-9]+)', url)
    job_id = m.group(1) if m else None
    api_url = f"https://www.linkedin.com/jobs-guest/jobs/api/jobPosting/{job_id}"
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) '
                      'AppleWebKit/537.36 (KHTML, like Gecko) '
                      'Chrome/137.0.0.0 Safari/537.36'
    }
    resp = requests.get(api_url, headers=headers)
    resp.raise_for_status()
    return BeautifulSoup(resp.text, 'html.parser')

# ——————————————————————————————
# 2) Dispatcher
# ——————————————————————————————

# in your dispatcher
def extract(url: str = None):
    
    domain = urlparse(url).netloc.lower()

    if "linkedin.com" in domain:
        return extract_linkedin(url)


# Semantic Similarity
try:
    
    _model = SentenceTransformer('all-MiniLM-L6-v2')
    _anchor = _model.encode(
        "job requirements qualifications responsibilities duties skills",
        convert_to_tensor=True
    )
except ImportError:
    _model = _anchor = None

def _find_by_semantic(tag_text, threshold = 0.7): 
    if not _model:
        return False
    emb = _model.encode(tag_text, convert_to_tensor=True)
    sim  = util.cos_sim(emb, _anchor).item()
    return sim >= threshold

def transformer(soup):

    # narrow focus to the main description block
    container = soup.find('div', id='job-details') or soup
    headers = container.find_all(HEADER_TAGS)

    # 1) Static keyword match
    for h in headers:
        # print("Using transformer 1")
        txt = h.get_text(strip=True)
        if any(txt.startswith(k) for k in KEYHEADERS):
            return _grab_list_after(h)

    # 2) Regex stem match
    for h in headers:
         # print("Using transformer 2")
        if RE_STEMS.search(h.get_text()):
            return _grab_list_after(h)

    # 3) Semantic similarity
    for h in headers:
        # print("Using transformer 3")
        txt = h.get_text(strip=True)
        if _find_by_semantic(txt):
            return _grab_list_after(h)

    # 4) Density fallback: pick the largest <ul> under container
    uls = container.find_all('ul')
    if uls:
        print("Using transformer 4")
        best = max(uls, key=lambda u: len(u.find_all('li')))
        return [li.get_text(strip=True) for li in best.find_all('li')]

    print(" No requirements section found by any strategy.")
    return []

def _grab_list_after(header_tag):
    """
    Given a header tag, find the next <ul> (job-criteria or plain) and return list items.
    """
    ul = header_tag.find_next("ul")
    if not ul:
        return []
    return [li.get_text(strip=True) for li in ul.find_all("li")]


# Initial transformer function would only look for 'Basic Qualifications'

'''def transformer(soup):
    # 1) Find the header with "Basic Qualifications"
    header = soup.find(
        lambda tag: tag.name in ("h3", "strong") 
                    and tag.get_text(strip=True).startswith("Basic Qualifications")
    )
    if not header:
        print(" Couldn't find a Basic Qualifications header.")
        return

    # 2) Find the very next <ul> whose class contains "_job-criteria-list"  
    ul = header.find_next("ul", class_=lambda c: c and "_job-criteria-list" in c)
    if not ul:
        print(" Couldn't find the qualifications list.")
        return

    # 3) Collect each <li> under that <ul>
    quals = [li.get_text(strip=True) for li in ul.find_all("li")]

    return quals

if __name__ == '__main__':
    soup = extract()
    basic_quals = transformer(soup)
    if basic_quals:
        print("\nBasic Qualifications:\n")
        for q in basic_quals:
            print("–", q)

'''        
# Old Extract Function that supports LinkedIn only
'''
def extract():
    headers = {
        'User-Agent': (
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) '
            'AppleWebKit/537.36 (KHTML, like Gecko) '
            'Chrome/137.0.0.0 Safari/537.36'
        ),
        'Accept': 'text/html,application/xhtml+xml'
    }
    url = input("Enter your job's URL: ")
    # extract the numeric job ID from the URL
    m = re.search(r'/jobs/view/([0-9]+)', url)
    if not m:
        raise ValueError("Couldn't parse a job ID from that URL.")
    job_id = m.group(1)

    # ← Use the guest API endpoint for job details :contentReference[oaicite:0]{index=0}
    api_url = f'https://www.linkedin.com/jobs-guest/jobs/api/jobPosting/{job_id}'
    resp = requests.get(api_url, headers=headers)
    resp.raise_for_status()

    # the endpoint returns an HTML fragment containing the full description  
    return BeautifulSoup(resp.text, 'html.parser')
'''
# Old HandShake Extractor

'''def extract_handShake(url):
    # 1) Fetch the job page HTML
    headers = {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                    "AppleWebKit/537.36 (KHTML, like Gecko) "
                    "Chrome/137.0.0.0 Safari/537.36"
    }
    resp = requests.get(url, headers=headers)
    resp.raise_for_status()
    soup = BeautifulSoup(resp.text, "html.parser")

    # 2) Look for JSON-LD <script> blocks
    for tag in soup.find_all("script", type="application/ld+json"):
        try:
            data = json.loads(tag.string)
        except Exception:
            continue

        # Sometimes data is a list
        items = data if isinstance(data, list) else [data]
        for obj in items:
            if obj.get("@type") == "JobPosting":
                html_blob = obj.get("description") or ""
                return BeautifulSoup(f"<div id='job-details'>{html_blob}</div>", "html.parser")

    # 3) If no JSON-LD, fallback to scraping the main HTML
    #    (e.g. grab the biggest <div> or <article> that looks like the job body)
    main = soup.find("div", class_="job-posting") or soup  
    return BeautifulSoup(str(main), "html.parser")'''

# Old Indeed Extractor

'''def extract_indeed(url):
    """
    Indeed extractor with full browser‐style headers.
    Tries JSON-LD first; else falls back to HTML scraping.
    """
    headers = {
        "User-Agent": (
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
            "AppleWebKit/537.36 (KHTML, like Gecko) "
            "Chrome/137.0.0.0 Safari/537.36"
        ),
        "Accept": "text/html,application/xhtml+xml,application/xml;"
                  "q=0.9,image/avif,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
        "Referer": "https://www.indeed.com",
        "Connection": "keep-alive",
    }

    resp = requests.get(url, headers=headers)
    resp.raise_for_status()
    soup = BeautifulSoup(resp.text, 'html.parser')

    # Try JSON-LD jobPosting first
    for script in soup.find_all("script", type="application/ld+json"):
        try:
            data = json.loads(script.string)
        except Exception:
            continue
        # Handle list or single object
        items = data if isinstance(data, list) else [data]
        for obj in items:
            if obj.get("@type") == "JobPosting":
                description = obj.get("description", "")
                return BeautifulSoup(
                    f"<div id='job-details'>{description}</div>",
                    'html.parser'
                )

    # Fallback: return the main job description container if known
    main = (
        soup.find("div", id="jobDescriptionText") or
        soup.find("div", class_="jobsearch-JobComponent-description") or
        soup
    )
    return BeautifulSoup(str(main), 'html.parser')
'''

'''
def extract_generic(url):
    headers = {
        "User-Agent": (
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) " 
            "AppleWebKit/537.36 (KHTML, like Gecko) "
            "Chrome/137.0.0.0 Safari/537.36"
        ),
        "Accept": "text/html,application/xhtml+xml,application/xml;"
                  "q=0.9,image/avif,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
        "Referer": url,         # some sites look for a referer
        "Connection": "keep-alive",
    }
    resp = requests.get(url, headers=headers)
    resp.raise_for_status()
    return BeautifulSoup(resp.text, 'html.parser')
'''

# Selenium Extractor 