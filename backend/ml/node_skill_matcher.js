import fs from "fs";
import path from "path";
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdfParse = require('pdf-parse');
import mammoth from "mammoth";

// seed corpus taken from train_skill_matcher.py
const seedCorpus = [
  "machine learning python pandas numpy sklearn deep learning tensorflow keras statistics nlp",
  "data science sql powerbi tableau matplotlib seaborn feature engineering",
  "data engineer airflow spark hadoop kafka databricks pyspark etl pipeline",
  "node.js express mongodb sql rest api authentication jwt docker kubernetes",
  "react javascript typescript next.js tailwindcss css html vite redux",
  "aws azure gcp terraform ci cd github actions linux bash monitoring prometheus grafana",
];

// small stopword list
const STOP = new Set([
  "the",
  "and",
  "or",
  "to",
  "a",
  "of",
  "in",
  "for",
  "on",
  "with",
  "is",
  "by",
  "an",
  "be",
  "are",
]);

function tokenize(text) {
  return (text || "")
    .toLowerCase()
    .split(/[^a-z0-9+.#-]+/)
    .map((t) => t.trim())
    .filter((t) => t && !STOP.has(t));
}

// build vocabulary and IDF from seed corpus (mimics sklearn vectorizer)
const vocabulary = [];
const df = {};
for (const doc of seedCorpus) {
  const terms = new Set(tokenize(doc));
  for (const t of terms) {
    if (!vocabulary.includes(t)) vocabulary.push(t);
    df[t] = (df[t] || 0) + 1;
  }
}

const N = seedCorpus.length;
const idf = {};
for (const term of vocabulary) {
  idf[term] = Math.log((N + 1) / ((df[term] || 0) + 1)) + 1;
}

function tfVectorFromText(text) {
  const tokens = tokenize(text);
  const tf = {};
  for (const t of tokens) {
    if (!vocabulary.includes(t)) continue;
    tf[t] = (tf[t] || 0) + 1;
  }
  // convert to TF-IDF vector (array aligned with vocabulary)
  const vec = vocabulary.map((term) => (tf[term] || 0) * (idf[term] || 0));
  return { vec, tokens };
}

function cosine(a, b) {
  let dot = 0;
  let na = 0;
  let nb = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    na += a[i] * a[i];
    nb += b[i] * b[i];
  }
  if (na === 0 || nb === 0) return 0;
  return dot / (Math.sqrt(na) * Math.sqrt(nb));
}

async function readText(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === ".pdf") {
    const data = await fs.promises.readFile(filePath);
    const res = await pdfParse(data);
    return res.text || "";
  }
  if (ext === ".docx") {
    const res = await mammoth.extractRawText({ path: filePath });
    return res.value || "";
  }
  // fallback to plain text
  return fs.promises.readFile(filePath, "utf8").catch(() => "");
}

export async function scoreResumeFromPath(resumePath, jobText = "software engineer node react mongodb") {
  const resumeText = await readText(resumePath);
  return scoreResume(resumeText, jobText);
}

export function scoreResume(resumeText, jobText = "software engineer node react mongodb") {
  const r = tfVectorFromText(resumeText);
  const j = tfVectorFromText(jobText);

  const sim = cosine(r.vec, j.vec);
  const score = Math.round(sim * 100 * 100) / 100; // two decimals

  // matched / missing keywords: consider job tokens which are in vocabulary
  const matched = [];
  const missing = [];
  const threshold = 0.000001;
  for (let i = 0; i < j.vec.length; i++) {
    if (j.vec[i] > threshold) {
      const term = vocabulary[i];
      if (r.vec[i] > threshold) matched.push(term);
      else missing.push(term);
    }
  }

  // top resume keywords
  const top = [];
  const pairs = r.vec.map((v, idx) => ({ v, term: vocabulary[idx] }));
  pairs.sort((a, b) => b.v - a.v);
  for (const p of pairs.slice(0, 10)) if (p.v > threshold) top.push(p.term);

  return {
    score,
    matched_keywords: matched,
    missing_keywords: missing,
    top_resume_keywords: top,
  };
}

export default { scoreResumeFromPath, scoreResume };
