import sys, os, pickle, math, json
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer
import PyPDF2
import docx2txt

def read_text(path: str) -> str:
    path = path.lower()
    if path.endswith(".pdf"):
        text = []
        with open(path, "rb") as f:
            reader = PyPDF2.PdfReader(f)
            for page in reader.pages:
                text.append(page.extract_text() or "")
        return "\n".join(text)
    elif path.endswith(".docx"):
        return docx2txt.process(path) or ""
    else:
        # .txt or other plain text
        with open(path, "r", errors="ignore", encoding="utf-8") as f:
            return f.read()

def score_resume(resume_text: str, job_text: str, vectorizer: TfidfVectorizer) -> dict:
    # transform both using same TF-IDF space
    R = vectorizer.transform([resume_text])
    J = vectorizer.transform([job_text])
    sim = cosine_similarity(R, J)[0][0]  # 0..1

    # get feature names
    try:
        features = vectorizer.get_feature_names_out()
    except Exception:
        features = vectorizer.get_feature_names()

    r_vec = R.toarray()[0]
    j_vec = J.toarray()[0]

    matched = []
    missing = []

    # consider a term "present" if its TF-IDF > tiny threshold
    threshold = 1e-6

    for idx, val in enumerate(j_vec):
        if val > threshold:
            term = features[idx]
            if r_vec[idx] > threshold:
                matched.append(term)
            else:
                missing.append(term)

    # top resume keywords (by TF-IDF)
    top_indices = r_vec.argsort()[::-1][:10]
    top_resume = [features[i] for i in top_indices if r_vec[i] > threshold][:10]

    # map similarity to 0..100
    score = round(float(sim) * 100, 2)

    return {
        "score": score,
        "matched_keywords": matched,
        "missing_keywords": missing,
        "top_resume_keywords": top_resume,
    }

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("0")
        sys.exit(1)

    resume_path = sys.argv[1]
    job_text = sys.argv[2] if len(sys.argv) >= 3 else "software engineer node react mongodb"

    # load vectorizer “model”
    with open(os.path.join(os.path.dirname(__file__), "model.pkl"), "rb") as f:
        vectorizer = pickle.load(f)

    resume_text = read_text(resume_path)
    result = score_resume(resume_text, job_text, vectorizer)
    # print JSON for the Node backend to parse
    print(json.dumps(result))  # Node reads this from stdout
