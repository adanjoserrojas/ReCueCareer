import os
import json
from mainAPI import extract, transformer, extract, extract_linkedin, _find_by_semantic, _grab_list_after
from supabase import create_client, Client

'''url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")
supabase: Client = create_client(url, key)'''

'''def userLogin(email: str, password: str, username: str) -> None:
    input = supabase'''

if __name__ == "__main__":

    email: str 
    password: str
    username: str

    #user = userLogin(email, password, username) 

    '''if(user): 
        url = input("Enter your job's url: ").strip()
    else:
        print("No user inputed!")'''
    
    url = input("Enter your job's url: ").strip()
    soup = extract(url)
    reqs = transformer(soup)

    print("Scraped Requirements:")
    for r in reqs:
        print(" •", r)

    
    '''data = {
        "job_url": url,
        "requirements": json.dumps(reqs)
    }
    response = supabase.table("job_requirements").insert(data).execute()
    print("Supabase insert response:", response)'''

    
