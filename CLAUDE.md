# Coaching Study — AI Context

## What this project is

An interactive visual study guide for **Handbook of Sport Coaching Research** (Callary, Bloom, Rynne & Gearity, 2026, Edward Elgar). Built by a CS researcher (UMD BS/MS) entering the sport coaching research domain.

## Architecture

```
index.html          → HTML skeleton, imports src/main.js
src/style.css       → All styles, CSS custom properties, light/dark themes
src/main.js         → Entry point: tab switching, accordion, event listeners
src/render.js       → DOM-building functions, each tab is one render function
src/data/            → Structured content (pure data, no DOM)
  chapters.js       → 6 deep-read chapter objects
  terms.js          → Top-10 terminology audit entries
  questions.js      → 15 exam Q&A (A/B/C types)
  timeline.js       → 14-day study plan entries
  stats.js          → Overview stats, research threads, cognitive shocks
```

## Key commands

```bash
npm install          # Install Vite
npm run dev          # Dev server at localhost:5173
npm run build        # Production build → dist/
```

## Content rules (must preserve)

1. **Copyright**: All content is paraphrased from the original book. Never copy original paragraphs. Direct quotes limited to <15 EN words or <20 CN characters, for terminology discussion only.
2. **Fidelity**: Every claim cites source location (chapter, DOCX paragraph number). Uncertainties marked as uncertain.
3. **Layered**: Separate "what the book says" (书中观点) from "what it means for us" (对我们的启发).
4. **Language**: All user-facing content in Chinese. Code comments and docs in English.

## Data flow

Content lives in `src/data/*.js` as exported arrays/objects → `src/render.js` functions consume data and return DOM strings → `src/main.js` mounts rendered HTML into tab panels and wires up interactivity.

To add a chapter: edit `src/data/chapters.js`, add an entry following the existing shape. The render function picks it up automatically.

## Source materials (not in repo)

The original PDF and Chinese translation DOCX are `.gitignore`d. Study notes derived from them live in `outputs/`.

## Tech stack

Vanilla JS + CSS, bundled by Vite. No framework. Google Fonts loaded at runtime (Source Serif 4 + DM Sans). Works in light and dark themes.
