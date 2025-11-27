import sys, re, PyPDF2, docx2txt
from sentence_transformers import SentenceTransformer, util
import torch

# ---------- Helpers ----------
def read_text(path):
    """Read text from PDF, DOCX, or TXT files"""
    text = ""
    path = path.lower()
    if path.endswith(".pdf"):
        with open(path, "rb") as f:
            reader = PyPDF2.PdfReader(f)
            for page in reader.pages:
                text += page.extract_text() or ""
    elif path.endswith(".docx"):
        text = docx2txt.process(path) or ""
    else:
        with open(path, "r", errors="ignore", encoding="utf-8") as f:
            text = f.read()
    return text


def clean(text):
    """Basic cleaning of text"""
    text = text.lower()
    text = re.sub(r"[^a-z0-9\s\+\#\.]", " ", text)
    text = re.sub(r"\s+", " ", text).strip()
    return text


def normalize_keywords(text):
    """Standardize common skill variants"""
    replacements = {
        "react.js": "react", "reactjs": "react",
        "node.js": "node", "nodejs": "node",
        "js ": "javascript ", "javascript.": "javascript ",
        "html5": "html", "css3": "css",
        "frontend": "front end", "backend": "back end",
        "machinelearning": "machine learning",
        "deeplearning": "deep learning",
        "sql.": "sql", "nosql": "mongodb"
    }
    for k, v in replacements.items():
        text = text.replace(k, v)
    return text


def extract_keywords(text):
    """Extract known technical skills from text"""
    skills = [
        "python","java","javascript","typescript","react","node","express",
        "html","css","tailwind","vite","redux","sql","mongodb","mysql",
        "aws","docker","kubernetes","tensorflow","pytorch",
        "machine learning","deep learning","data science",
        "nlp","flask","fastapi","powerbi","tableau","api","devops"
    ]
    found = [s for s in skills if s in text]
    return list(set(found))


# ---------- Load model once ----------
# (You can switch to 'all-mpnet-base-v2' for higher accuracy)
model = SentenceTransformer('all-mpnet-base-v2')



# ---------- Semantic Scoring ----------
def compute_semantic_score(resume_text, jd_text):
    """Compute sentence-transformer similarity score"""
    emb1 = model.encode(resume_text, convert_to_tensor=True, normalize_embeddings=True)
    emb2 = model.encode(jd_text, convert_to_tensor=True, normalize_embeddings=True)
    sim = torch.nn.functional.cosine_similarity(emb1, emb2, dim=0).item()
    sim = max(0.0, min(sim, 1.0))
    return round(sim * 100, 2)


# ---------- Hybrid Scoring ----------
def hybrid_score(semantic_score, matched, jd_skills):
    """Combine semantic similarity + keyword overlap"""
    if not jd_skills:
        return semantic_score
    keyword_score = (len(matched) / len(jd_skills)) * 100
    final = 0.7 * semantic_score + 0.3 * keyword_score
    return round(final, 2)


# ---------- Main Script ----------
if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("0")
        sys.exit(1)

    resume_path = sys.argv[1]
    jd_text = sys.argv[2]

    # 1. Clean & normalize text
    resume_text = normalize_keywords(clean(read_text(resume_path)))
    jd_text = normalize_keywords(clean(jd_text))

    # 2. Extract skills
    resume_skills = extract_keywords(resume_text)
    jd_skills = extract_keywords(jd_text)

    # 3. Build sentences for semantic model
    skills_resume_sentence = f"This candidate has skills in {', '.join(resume_skills)}."
    skills_jd_sentence = f"The job requires skills in {', '.join(jd_skills)}."

    # 4. Compute semantic score
    semantic = compute_semantic_score(skills_resume_sentence, skills_jd_sentence)

    # 5. Compute matched/missing
    matched = list(set(resume_skills) & set(jd_skills))
    missing = list(set(jd_skills) - set(resume_skills))

    # 6. Combine scores for more accurate output
    score = hybrid_score(semantic, matched, jd_skills)

    # 7. Print results
    print(f"Score: {score}")
    print(f"Matched: {matched}")
    print(f"Missing: {missing}")
