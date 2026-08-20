# Terminology Deep-Dive Plan

## Problem

The Chinese translation of the Handbook has **16 out of 30 core terms with inconsistent translations** across 340,000 characters. The coarse scan in `outputs/术语校对摘要.md` identified the top-10 terms to unify, but a full audit needs:

1. **KWIC context** for every occurrence of each term variant
2. **Bilingual alignment** — which English source phrase maps to each Chinese variant
3. **Interactive judgment** — which inconsistencies are errors vs. legitimate context-dependent choices

## Recommended Tool Stack

| Tool | Stars | Role |
|------|-------|------|
| [jieba](https://github.com/fxsjy/jieba) | 33k+ | Chinese word segmentation, locate term variants |
| [python-docx](https://github.com/python-openxml/python-docx) | 4k+ | Parse DOCX paragraphs with position metadata |
| [PyMuPDF](https://github.com/pymupdf/PyMuPDF) | 5k+ | Extract English PDF text for bilingual alignment |
| [pandas](https://github.com/pandas-dev/pandas) | 44k+ | Term × chapter × variant pivot tables |
| [streamlit](https://github.com/streamlit/streamlit) | 36k+ | Interactive audit UI — review each occurrence in context |

**Optional (for deeper bilingual alignment):**

| Tool | Role |
|------|------|
| [LaBSE](https://huggingface.co/sentence-transformers/LaBSE) | Multilingual sentence embeddings for paragraph-level alignment |
| [awesome-align](https://github.com/neulab/awesome-align) | Word-level alignment — see exactly what each English term was translated as |

## Pipeline

```
python-docx: extract DOCX full text (by paragraph number)
    ↓
jieba + regex: match all 30 core terms and their known variants
    ↓
pandas: build KWIC concordance table (term, variant, paragraph, context window)
    ↓
streamlit: interactive audit interface — for each occurrence:
    - show 50-char context window
    - show which variant was used
    - let reviewer mark "unify to X" or "context-appropriate"
    ↓
output: normalized terminology table → feed back to translation maintainer
```

## Existing Work

Scripts in `work/` from the initial analysis:

- `extract_terms.py` / `extract_terms_v2.py` — seed term extraction
- `coarse_scan.py` — full-book frequency scan for 30 core terms
- `coarse_scan_results.json` — raw scan results
- `term_translations.json` — term-to-variant mappings

These provide the starting point. The deep-dive adds KWIC context and an interactive review loop.

## Prompt for New Session

```
I have a 340,000-character Chinese academic translation (DOCX) and the English
original (PDF) of "Handbook of Sport Coaching Research" (2026, 25 chapters).

30 core terms were scanned; 16 have inconsistent translations. Existing scan
scripts and results are in the work/ directory of this repo:
https://github.com/anis105/coaching-study

Build a terminology audit pipeline:
1. python-docx + jieba + pandas → KWIC concordancer showing every occurrence
   of each term variant with 50-char context window and paragraph number
2. streamlit → interactive review UI where I can mark each occurrence as
   "unify to X" or "context-appropriate"
3. Export the decisions as a normalized terminology table (CSV/Excel)

Start by reading CLAUDE.md for project context and work/coarse_scan_results.json
for the existing scan data. The source materials (PDF + DOCX) are gitignored but
present locally.
```

## Success Criteria

- [ ] Every occurrence of all 30 core terms located with paragraph-level position
- [ ] KWIC table with ±25 character context for each hit
- [ ] Interactive UI for reviewing and deciding each term
- [ ] Exported terminology standard table ready to send to translation maintainer
