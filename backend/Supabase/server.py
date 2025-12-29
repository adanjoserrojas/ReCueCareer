from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, AnyHttpUrl

from sentence_transformers import SentenceTransformer, util
from mainAPI import transformer, extract

from typing import Literal

Label = Literal["tech", "general", "uncertain"]
app = FastAPI()

TECH_ANCHORS = [
    "programming languages and frameworks",
    "software tools and technologies",
    "cloud platforms and devops",
    "tools and tech stacks"
]

GENERAL_ANCHORS = [
    "education timeline and degree year",
    "soft skills such as communication or teamwork",
    "work authorization or eligibility",
    "years of experience or GPA",
    "None framework, Library, Programming Language, or tool related"
]

_model = SentenceTransformer("all-MiniLM-L6-v2")
TECH_EMBS = _model.encode(TECH_ANCHORS, convert_to_tensor=True, normalize_embeddings=True)
GEN_EMBS  = _model.encode(GENERAL_ANCHORS, convert_to_tensor=True, normalize_embeddings=True)

class ExtractIn(BaseModel):
    url: AnyHttpUrl

class ExtractOut(BaseModel):
    techRequirements: list[str]
    generalRequirements: list[str]
    #uncertainRequirements: list[str] idea for later

@app.post("/extract", response_model=ExtractOut)
def stripRequirements(body: ExtractIn):

    techRequirements = []
    generalRequirements = []

    try:
        soup = extract(str(body.url))
        if soup is None:
            raise HTTPException(status_code=502, detail="No requirements extracted from the url. Sorry 😿")
        
        cleanRequirements = transformer(soup) or []
        cleanRequirements = [ 
            strings.strip() 
            for strings in cleanRequirements 
            if strings and isinstance(strings, str)
        ]


        for req in cleanRequirements:
            label = semanticHelper(req)

            if label == "tech":
                techRequirements.append(req)
            else:
                generalRequirements.append(req)
        
        return {
        "techRequirements": techRequirements[:100], 
        "generalRequirements": generalRequirements[:100]
        }

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to extract: {e}")
    
def semanticHelper(text: str, minThreshold: float = 0.12, minMargin: float = 0.04) -> Label:

    t = text.strip()
    if not t:
        return "general"

    emb = _model.encode([t], convert_to_tensor=True, normalize_embeddings=True)
    tech_sims = util.cos_sim(emb, TECH_EMBS).cpu().numpy()[0]
    gen_sims  = util.cos_sim(emb, GEN_EMBS ).cpu().numpy()[0]

    tech_mean = float(tech_sims.mean())
    gen_mean  = float(gen_sims.mean())

    # require margins + min confidence
    if max(tech_mean, gen_mean) < minThreshold or abs(tech_mean - gen_mean) < minMargin:
        return "general"

    return ("tech" if tech_mean >= gen_mean else "general")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)


    





    

