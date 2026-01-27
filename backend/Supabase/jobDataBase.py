import os
import json
from .mainAPI import ( extract, transformer, extract, extract_linkedin, _find_by_semantic, _grab_list_after )
#from supabase import create_client, Client
from .server import stripRequirements, semanticHelper
from typing import Any



if __name__ == "__main__":

    '''email: str 
    password: str
    username: str'''
    
    url = input("Enter your job's url: ").strip()
    soup = extract(url)
    reqs = transformer(soup)

    print("Scraped Requirements:")
    for r in reqs:
        print(" •", r)

    
